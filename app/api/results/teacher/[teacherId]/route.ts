//    import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ teacherId: string }> }
// ) {
//   try {
//     const { teacherId } = await params;
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     // Pehle teacher ki quizzes ke IDs find karo
//     const quizzes = await db.collection('quizzes')
//       .find({ createdBy: teacherId })
//       .toArray();
    
//     const quizIds = quizzes.map(q => q._id.toString());
    
//     // Phir un quizzes ke results fetch karo
//     const results = await db.collection('results')
//       .find({ quizId: { $in: quizIds } })
//       .sort({ submittedAt: -1 })
//       .toArray();
    
//     const formattedResults = results.map(result => ({
//       id: result._id.toString(),
//       quizId: result.quizId,
//       quizTitle: result.quizTitle,
//       userId: result.userId,
//       userName: result.userName,
//       score: result.score,
//       totalMarks: result.totalMarks,
//       percentage: result.percentage,
//       submittedAt: result.submittedAt
//     }));
    
//     return NextResponse.json({ success: true, data: formattedResults });
    
//   } catch (error) {
//     console.error('Error fetching teacher results:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch results' },
//       { status: 500 }
//     );
//   }
// }  






import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ teacherId: string }> }
) {
  try {
    const { teacherId } = await params;

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Teacher ki saari quizzes fetch karo
    const quizzes = await db.collection('quizzes')
      .find({ createdBy: teacherId })
      .toArray();

    const quizIds = quizzes.map(q => q._id.toString());
    const quizTitles = new Map(quizzes.map(q => [q._id.toString(), q.title]));

    // shareableLinks publicIds bhi collect karo
    const publicIds = quizzes
      .filter(q => q.shareableLinks?.publicId)
      .map(q => q.shareableLinks.publicId);

    // publicId → quizId map banao results display ke liye
    const publicIdToQuizId = new Map(
      quizzes
        .filter(q => q.shareableLinks?.publicId)
        .map(q => [q.shareableLinks.publicId, q._id.toString()])
    );
    const publicIdToTitle = new Map(
      quizzes
        .filter(q => q.shareableLinks?.publicId)
        .map(q => [q.shareableLinks.publicId, q.title])
    );

    // Regular results (logged-in students)
    const regularResults = quizIds.length > 0
      ? await db.collection('results')
          .find({ quizId: { $in: quizIds } })
          .sort({ submittedAt: -1 })
          .toArray()
      : [];

    // Anonymous results (shared link se)
    const anonymousResults = publicIds.length > 0
      ? await db.collection('anonymous_results')
          .find({ quizId: { $in: publicIds } })
          .sort({ submittedAt: -1 })
          .toArray()
      : [];

    // Regular results format karo
    const formattedRegular = regularResults.map(result => ({
      id: result._id.toString(),
      quizId: result.quizId,
      quizTitle: result.quizTitle || quizTitles.get(result.quizId) || 'Unknown Quiz',
      userId: result.userId || '',
      userName: result.userName || result.studentName || 'Unknown',
      studentName: result.userName || result.studentName || 'Unknown',
      score: result.score ?? 0,
      totalMarks: result.totalMarks ?? 0,
      percentage: result.percentage ?? 0,
      submittedAt: result.submittedAt,
      isAnonymous: false,
    }));

    // Anonymous results format karo
    const formattedAnonymous = anonymousResults.map(result => ({
      id: result._id.toString(),
      quizId: publicIdToQuizId.get(result.quizId) || result.quizId,
      quizTitle: result.quizTitle || publicIdToTitle.get(result.quizId) || 'Unknown Quiz',
      userId: '',
      userName: result.participantName || result.participantEmail || 'Anonymous',
      studentName: result.participantName || result.participantEmail || 'Anonymous',
      score: result.score ?? 0,
      totalMarks: result.totalMarks ?? 0,
      percentage: result.percentage ?? 0,
      submittedAt: result.submittedAt,
      isAnonymous: true,
    }));

    // Dono merge karo aur date se sort karo
    const allResults = [...formattedRegular, ...formattedAnonymous]
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return NextResponse.json({ success: true, data: allResults });

  } catch (error) {
    console.error('Error fetching teacher results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}