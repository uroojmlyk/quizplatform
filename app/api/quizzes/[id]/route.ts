

// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }  // ✅ Promise type
// ) {
//   try {
//     const { id } = await params;  // ✅ await params
    
//     if (!ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const quiz = await db.collection('quizzes').findOne({
//       _id: new ObjectId(id)
//     });
    
//     if (!quiz) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json({
//       success: true,
//       data: {
//         id: quiz._id.toString(),
//         title: quiz.title,
//         description: quiz.description,
//         duration: quiz.duration,
//         totalMarks: quiz.totalMarks,
//         questions: quiz.questions,
//         createdBy: quiz.createdBy,
//         createdByName: quiz.createdByName,
//         createdAt: quiz.createdAt
//       }
//     });
    
//   } catch (error) {
//     console.error('Error fetching quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quiz' },
//       { status: 500 }
//     );
//   }
// }  






import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/quizzes/:id - Ek specific quiz lao
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    const quiz = await db.collection('quizzes').findOne({
      _id: new ObjectId(id)
    });
    
    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        id: quiz._id.toString(),
        title: quiz.title,
        description: quiz.description,
        duration: quiz.duration,
        totalMarks: quiz.totalMarks,
        questions: quiz.questions,
        createdBy: quiz.createdBy,
        createdByName: quiz.createdByName,
        createdAt: quiz.createdAt
      }
    });
    
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
}

// PUT /api/quizzes/:id - Quiz update karo
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    const result = await db.collection('quizzes').updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Quiz updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update quiz' },
      { status: 500 }
    );
  }
}

// DELETE /api/quizzes/:id - Quiz delete karo
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    const result = await db.collection('quizzes').deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete quiz' },
      { status: 500 }
    );
  }
}