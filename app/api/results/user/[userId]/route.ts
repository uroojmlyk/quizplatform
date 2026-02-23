


import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    
    console.log('🔍 Fetching results for userId:', userId); // Debug
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    // Check if collection exists
    const collections = await db.listCollections({ name: 'results' }).toArray();
    console.log('📁 Results collection exists:', collections.length > 0);
    
    const results = await db.collection('results')
      .find({ userId })
      .sort({ submittedAt: -1 })
      .toArray();
    
    console.log(`📊 Found ${results.length} results:`, results); // Debug
    
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
    
    return NextResponse.json({ 
      success: true, 
      data: formattedResults,
      count: formattedResults.length 
    });
    
  } catch (error) {
    console.error('❌ Error fetching user results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}