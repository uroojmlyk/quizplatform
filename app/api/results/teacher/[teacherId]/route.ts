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
    
    // Pehle teacher ki quizzes ke IDs find karo
    const quizzes = await db.collection('quizzes')
      .find({ createdBy: teacherId })
      .toArray();
    
    const quizIds = quizzes.map(q => q._id.toString());
    
    // Phir un quizzes ke results fetch karo
    const results = await db.collection('results')
      .find({ quizId: { $in: quizIds } })
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
      submittedAt: result.submittedAt
    }));
    
    return NextResponse.json({ success: true, data: formattedResults });
    
  } catch (error) {
    console.error('Error fetching teacher results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}