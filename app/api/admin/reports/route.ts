import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    switch(range) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    // Get total stats
    const [totalUsers, totalQuizzes, totalAttempts] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('quizzes').countDocuments(),
      db.collection('results').countDocuments()
    ]);

    // Get average score
    const avgScoreResult = await db.collection('results').aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: '$percentage' }
        }
      }
    ]).toArray();

    const avgScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avg) : 0;

    // Get user growth (monthly for last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowth = await db.collection('users').aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]).toArray();

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedUserGrowth = userGrowth.map(item => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      users: item.count
    }));

    // Get quiz activity
    const quizActivity = await db.collection('results').aggregate([
      {
        $group: {
          _id: '$quizTitle',
          attempts: { $sum: 1 }
        }
      },
      {
        $sort: { attempts: -1 }
      },
      {
        $limit: 5
      }
    ]).toArray();

    const formattedQuizActivity = quizActivity.map(item => ({
      name: item._id.length > 20 ? item._id.substring(0, 20) + '...' : item._id,
      attempts: item.attempts
    }));

    // Get score distribution
    const scoreRanges = [
      { range: '0-20%', min: 0, max: 20 },
      { range: '21-40%', min: 21, max: 40 },
      { range: '41-60%', min: 41, max: 60 },
      { range: '61-80%', min: 61, max: 80 },
      { range: '81-100%', min: 81, max: 100 }
    ];

    const performance = [];
    for (const range of scoreRanges) {
      const count = await db.collection('results').countDocuments({
        percentage: { $gte: range.min, $lte: range.max }
      });
      performance.push({
        range: range.range,
        count
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        userGrowth: formattedUserGrowth,
        quizActivity: formattedQuizActivity,
        performance,
        stats: {
          totalUsers,
          totalQuizzes,
          totalAttempts,
          avgScore
        }
      }
    });

  } catch (error) {
    console.error('Error generating reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate reports' },
      { status: 500 }
    );
  }
}