import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/quizzes - Saari quizzes lao
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    const quizzes = await db.collection('quizzes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Convert _id to id
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
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}

// POST /api/quizzes - Naya quiz banao
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, duration, totalMarks, questions, createdBy, createdByName } = body;
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    const newQuiz = {
      title,
      description,
      duration,
      totalMarks,
      questions,
      createdBy,
      createdByName,
      createdAt: new Date()
    };
    
    const result = await db.collection('quizzes').insertOne(newQuiz);
    
    return NextResponse.json({
      success: true,
      message: 'Quiz created successfully',
      quiz: {
        id: result.insertedId.toString(),
        ...newQuiz
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create quiz' },
      { status: 500 }
    );
  }
}