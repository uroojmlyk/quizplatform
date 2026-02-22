import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const quizId = searchParams.get('quizId');
    
    if (!userId || !quizId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId or quizId' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    // Check if user has already attempted this quiz
    const existingResult = await db.collection('results').findOne({
      userId,
      quizId
    });
    
    return NextResponse.json({
      success: true,
      attempted: !!existingResult
    });
    
  } catch (error) {
    console.error('Error checking result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check result' },
      { status: 500 }
    );
  }
}