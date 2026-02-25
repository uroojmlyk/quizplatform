



// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// // GET /api/results/quiz/:quizId - Quiz ke saare results
// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ quizId: string }> }  // ✅ Promise type
// ) {
//   try {
//     const { quizId } = await params;  // ✅ await params
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const results = await db.collection('results')
//       .find({ quizId })
//       .sort({ percentage: -1 })
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
//     console.error('Error fetching quiz results:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch results' },
//       { status: 500 }
//     );
//   }
// }    




import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: NextRequest, 
  context: { params: Promise<{ quizId: string }> }  // ✅ Next.js type expects Promise
) {
  try {
    const { quizId } = await context.params;  // ✅ await params

    const client = await clientPromise;
    const db = client.db('quizDB');

    const results = await db.collection('results')
      .find({ quizId })
      .sort({ percentage: -1 })
      .toArray();

    const formattedResults = results.map(result => ({
      id: result._id.toString(),
      quizId: result.quizId,
      quizTitle: result.quizTitle,
      userId: result.userId,
      userName: result.userName,
      score: result.score,
      totalMarks: result.totalMarks,
      percentage: result.percentage,
      submittedAt: result.submittedAt
    }));

    return NextResponse.json({ success: true, data: formattedResults });

  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}