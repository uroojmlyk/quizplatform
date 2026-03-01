import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params;

    if (!ObjectId.isValid(quizId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Delete the quiz
    const result = await db.collection('quizzes').deleteOne({
      _id: new ObjectId(quizId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // Also delete all results associated with this quiz
    await db.collection('results').deleteMany({
      quizId: quizId
    });

    return NextResponse.json({
      success: true,
      message: 'Quiz and associated results deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete quiz' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const { quizId } = await params;

    if (!ObjectId.isValid(quizId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    const quiz = await db.collection('quizzes').findOne({
      _id: new ObjectId(quizId)
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // Get attempt count
    const attempts = await db.collection('results').countDocuments({
      quizId: quizId
    });

    return NextResponse.json({
      success: true,
      data: {
        _id: quiz._id.toString(),
        title: quiz.title,
        description: quiz.description,
        createdByName: quiz.createdByName,
        totalMarks: quiz.totalMarks,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        attempts
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