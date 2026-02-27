import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resultId: string }> }
) {
  try {
    const { resultId } = await params;

    if (!ObjectId.isValid(resultId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid result ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Get result
    const result = await db.collection('results').findOne({
      _id: new ObjectId(resultId)
    });

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Result not found' },
        { status: 404 }
      );
    }

    // Get quiz details with questions
    const quiz = await db.collection('quizzes').findOne({
      _id: new ObjectId(result.quizId)
    });

    return NextResponse.json({
      success: true,
      data: {
        result: {
          id: result._id.toString(),
          quizId: result.quizId,
          quizTitle: result.quizTitle,
          userName: result.userName,
          score: result.score,
          totalMarks: result.totalMarks,
          percentage: result.percentage,
          submittedAt: result.submittedAt
        },
        quiz: quiz ? {
          id: quiz._id.toString(),
          title: quiz.title,
          questions: quiz.questions.map((q: any, index: number) => ({
            number: index + 1,
            text: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer,
            marks: q.marks
          }))
        } : null
      }
    });

  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch result' },
      { status: 500 }
    );
  }
}