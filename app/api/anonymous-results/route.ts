import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get('quizId'); // This will be publicId

    const client = await clientPromise;
    const db = client.db('quizDB');

    const query: any = {};
    if (quizId) {
      query.quizId = quizId;
    }

    const results = await db.collection('anonymous_results')
      .find(query)
      .sort({ submittedAt: -1 })
      .toArray();

    const formattedResults = results.map(r => ({
      id: r._id.toString(),
      quizId: r.quizId,
      quizTitle: r.quizTitle,
      participantName: r.participantName,
      score: r.score,
      totalMarks: r.totalMarks,
      percentage: r.percentage,
      submittedAt: r.submittedAt
    }));

    return NextResponse.json({
      success: true,
      data: formattedResults,
      count: formattedResults.length
    });

  } catch (error) {
    console.error('Error fetching anonymous results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}