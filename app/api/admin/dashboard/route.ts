import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('quizDB');

    // Get total users
    const totalUsers = await db.collection('users').countDocuments();

    // Get total quizzes
    const totalQuizzes = await db.collection('quizzes').countDocuments();

    // Get active users (logged in within last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const activeUsers = await db.collection('users').countDocuments({
      lastLogin: { $gte: sevenDaysAgo }
    });

    // Calculate completion rate
    const results = await db.collection('results').aggregate([
      {
        $group: {
          _id: null,
          avgPercentage: { $avg: '$percentage' }
        }
      }
    ]).toArray();

    const completionRate = results.length > 0 ? Math.round(results[0].avgPercentage) : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalQuizzes,
        activeUsers,
        completionRate
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}