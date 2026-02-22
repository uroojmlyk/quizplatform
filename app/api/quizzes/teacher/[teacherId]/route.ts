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
    
    const quizzes = await db.collection('quizzes')
      .find({ createdBy: teacherId })
      .sort({ createdAt: -1 })
      .toArray();
    
    const formattedQuizzes = quizzes.map(quiz => ({
      id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      totalMarks: quiz.totalMarks,
      questions: quiz.questions,
      createdBy: quiz.createdBy,
      createdByName: quiz.createdByName,
      createdAt: quiz.createdAt
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