// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ teacherId: string }> }
// ) {
//   try {
//     const { teacherId } = await params;
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const quizzes = await db.collection('quizzes')
//       .find({ createdBy: teacherId })
//       .sort({ createdAt: -1 })
//       .toArray();
    
//     const formattedQuizzes = quizzes.map(quiz => ({
//       id: quiz._id.toString(),
//       title: quiz.title,
//       description: quiz.description,
//       duration: quiz.duration,
//       totalMarks: quiz.totalMarks,
//       questions: quiz.questions,
//       createdBy: quiz.createdBy,
//       createdByName: quiz.createdByName,
//       createdAt: quiz.createdAt
//     }));
    
//     return NextResponse.json({ success: true, data: formattedQuizzes });
    
//   } catch (error) {
//     console.error('Error fetching teacher quizzes:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quizzes' },
//       { status: 500 }
//     );
//   }
// }









// import { NextResponse } from 'next/server';
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
    
//     // Regular results fetch karo
//     const results = await db.collection('results')
//       .find({ quizId: { $in: quizIds } })
//       .sort({ submittedAt: -1 })
//       .toArray();
    
//     // ✅ Anonymous results bhi fetch karo (jin quizzes ke publicId se submit hue)
//     // Har quiz ke shareableLinks.publicId bhi collect karo
//     const publicIds = quizzes
//       .map(q => q.shareableLinks?.publicId)
//       .filter(id => id); // Remove undefined/null

//     const anonymousResults = publicIds.length > 0 
//       ? await db.collection('anonymous_results')
//           .find({ quizId: { $in: publicIds } })
//           .toArray()
//       : [];

//     // Format regular results
//     const formattedRegular = results.map(result => ({
//       id: result._id.toString(),
//       quizId: result.quizId,
//       quizTitle: result.quizTitle,
//       userId: result.userId,
//       userName: result.userName,
//       userEmail: result.userEmail,
//       score: result.score,
//       totalMarks: result.totalMarks,
//       percentage: result.percentage,
//       submittedAt: result.submittedAt,
//       isAnonymous: result.isAnonymous || false
//     }));

//     // Format anonymous results
//     const formattedAnonymous = anonymousResults.map(result => ({
//       id: result._id.toString(),
//       quizId: result.quizId,
//       quizTitle: result.quizTitle,
//       userId: null,
//       userName: result.participantName || 'Anonymous',
//       userEmail: result.participantEmail || null,
//       score: result.score,
//       totalMarks: result.totalMarks,
//       percentage: result.percentage,
//       submittedAt: result.submittedAt,
//       isAnonymous: true,
//       source: 'shared_link'
//     }));

//     // Combine and sort by date
//     const allResults = [...formattedRegular, ...formattedAnonymous]
//       .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

//     return NextResponse.json({ success: true, data: allResults });
    
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
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ teacherId: string }> }
) {
  try {
    const { teacherId } = await params;

    if (!teacherId) {
      return NextResponse.json(
        { success: false, error: 'Teacher ID required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // ✅ FIX: createdBy dono formats mein ho sakta hai — ObjectId ya String
    // Dono cases handle karo
    let query: object;

    if (ObjectId.isValid(teacherId)) {
      query = {
        $or: [
          { createdBy: new ObjectId(teacherId) },  // ObjectId format (new quizzes)
          { createdBy: teacherId }                  // String format (purani quizzes)
        ]
      };
    } else {
      query = { createdBy: teacherId };
    }

    const quizzes = await db.collection('quizzes')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`✅ Found ${quizzes.length} quizzes for teacher: ${teacherId}`);

    const formattedQuizzes = quizzes.map(quiz => ({
      id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      totalMarks: quiz.totalMarks,
      questions: quiz.questions,
      createdBy: quiz.createdBy?.toString(),
      createdByName: quiz.createdByName,
      createdAt: quiz.createdAt,
      visibility: quiz.visibility || 'public',
      assignedTo: quiz.assignedTo?.map((id: ObjectId) => id.toString()) || []
    }));

    return NextResponse.json({ success: true, data: formattedQuizzes });

  } catch (error) {
    console.error('Error fetching teacher quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}