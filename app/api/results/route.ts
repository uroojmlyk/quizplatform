


// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ userId: string }> }
// ) {
//   try {
//     const { userId } = await params;
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const results = await db.collection('results')
//       .find({ userId })
//       .sort({ submittedAt: -1 })
//       .toArray();
    
//     console.log(`Found ${results.length} results for user ${userId}`); // Debug
    
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
//     console.error('Error fetching user results:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch results' },
//       { status: 500 }
//     );
//   }
// }







import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📥 Received result:', body);
    
    const { quizId, quizTitle, userId, userName, score, totalMarks, percentage } = body;
    
    // Validation
    if (!quizId || !userId) {
      console.error('❌ Missing required fields:', { quizId, userId });
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    // Check if result already exists
    const existing = await db.collection('results').findOne({
      quizId,
      userId
    });
    
    if (existing) {
      console.log('⚠️ Result already exists:', existing);
      return NextResponse.json(
        { success: false, error: 'Quiz already attempted' },
        { status: 400 }
      );
    }
    
    const newResult = {
      quizId,
      quizTitle,
      userId,
      userName,
      score,
      totalMarks,
      percentage,
      submittedAt: new Date()
    };
    
    console.log('📤 Saving to database:', newResult);
    
    const result = await db.collection('results').insertOne(newResult);
    
    console.log('✅ Result saved with ID:', result.insertedId);
    
    return NextResponse.json({
      success: true,
      message: 'Result saved successfully',
      result: {
        id: result.insertedId.toString(),
        ...newResult,
        submittedAt: newResult.submittedAt.toISOString()
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('❌ Error saving result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save result. Please try again.' },
      { status: 500 }
    );
  }
}