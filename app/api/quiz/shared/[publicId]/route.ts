import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await params;

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Find quiz by publicId
    const quiz = await db.collection('quizzes').findOne({
      'shareableLinks.publicId': publicId
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // Check if link expired
    const link = quiz.shareableLinks;
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Link has expired' },
        { status: 410 }
      );
    }

    // Check max attempts
    if (link.maxAttempts && link.currentAttempts >= link.maxAttempts) {
      return NextResponse.json(
        { success: false, error: 'Maximum attempts reached' },
        { status: 403 }
      );
    }

    // Increment attempt count
    await db.collection('quizzes').updateOne(
      { 'shareableLinks.publicId': publicId },
      { $inc: { 'shareableLinks.currentAttempts': 1 } }
    );

    // Return quiz without answers
    const quizData = {
      id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      totalMarks: quiz.totalMarks,
      questions: quiz.questions.map((q: any) => ({
        text: q.text,
        options: q.options,
        marks: q.marks
        // DON'T send correctAnswer
      })),
      allowAnonymous: link.allowAnonymous
    };

    return NextResponse.json({
      success: true,
      data: quizData,
      isPublic: link.isPublic
    });

  } catch (error) {
    console.error('Error fetching shared quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
}