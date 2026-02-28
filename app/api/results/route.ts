





// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     console.log('📥 Received result:', body);
    
//     const { quizId, quizTitle, userId, userName, score, totalMarks, percentage } = body;
    
//     // Validation
//     if (!quizId || !userId) {
//       console.error('❌ Missing required fields:', { quizId, userId });
//       return NextResponse.json(
//         { success: false, error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     // Check if result already exists
//     const existing = await db.collection('results').findOne({
//       quizId,
//       userId
//     });
    
//     if (existing) {
//       console.log('⚠️ Result already exists:', existing);
//       return NextResponse.json(
//         { success: false, error: 'Quiz already attempted' },
//         { status: 400 }
//       );
//     }
    
//     const newResult = {
//       quizId,
//       quizTitle,
//       userId,
//       userName,
//       score,
//       totalMarks,
//       percentage,
//       submittedAt: new Date()
//     };
    
//     console.log('📤 Saving to database:', newResult);
    
//     const result = await db.collection('results').insertOne(newResult);
    
//     console.log('✅ Result saved with ID:', result.insertedId);
    
//     return NextResponse.json({
//       success: true,
//       message: 'Result saved successfully',
//       result: {
//         id: result.insertedId.toString(),
//         ...newResult,
//         submittedAt: newResult.submittedAt.toISOString()
//       }
//     }, { status: 201 });
    
//   } catch (error) {
//     console.error('❌ Error saving result:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to save result. Please try again.' },
//       { status: 500 }
//     );
//   }
// }






import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { sendEmail } from '@/lib/email';
import { getQuizResultHTML } from '@/lib/templates/quiz-result';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quizId, quizTitle, userId, userName, score, totalMarks, percentage } = body;

    // Validation
    if (!quizId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Save result
    const result = await db.collection('results').insertOne({
      quizId,
      quizTitle,
      userId,
      userName,
      score,
      totalMarks,
      percentage,
      submittedAt: new Date(),
    });

    // Get user email for sending result notification
    const user = await db.collection('users').findOne({
      _id: new ObjectId(userId)
    });

    // Send result email (in background, don't await)
    if (user?.email) {
      const resultLink = `${process.env.NEXT_PUBLIC_APP_URL}/results/${result.insertedId.toString()}`;
      
      sendEmail({
        to: user.email,
        subject: `📊 Quiz Result: ${quizTitle}`,
        html: getQuizResultHTML(userName, quizTitle, score, totalMarks, percentage, resultLink),
      }).catch(err => console.error('Result email error:', err));
    }

    return NextResponse.json({
      success: true,
      data: {
        id: result.insertedId.toString(),
        quizId,
        quizTitle,
        userId,
        userName,
        score,
        totalMarks,
        percentage,
        submittedAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save result' },
      { status: 500 }
    );
  }
}

// GET results by user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const quizId = searchParams.get('quizId');

    const client = await clientPromise;
    const db = client.db('quizDB');

    let query = {};
    if (userId) query = { userId };
    if (quizId) query = { quizId };

    const results = await db.collection('results')
      .find(query)
      .sort({ submittedAt: -1 })
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
      submittedAt: result.submittedAt,
    }));

    return NextResponse.json({
      success: true,
      data: formattedResults,
    });

  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}