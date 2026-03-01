import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('quizDB');

    const quizzes = await db.collection('quizzes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Get attempt counts for each quiz
    const results = await db.collection('results').aggregate([
      {
        $group: {
          _id: '$quizId',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    const attemptMap = new Map();
    results.forEach(r => attemptMap.set(r._id, r.count));

    const formattedQuizzes = quizzes.map(quiz => ({
      _id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      createdByName: quiz.createdByName,
      totalMarks: quiz.totalMarks,
      questions: quiz.questions,
      createdAt: quiz.createdAt,
      attempts: attemptMap.get(quiz._id.toString()) || 0
    }));

    return NextResponse.json({
      success: true,
      data: formattedQuizzes
    });

  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}