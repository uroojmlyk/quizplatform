// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     // Get total users
//     const totalUsers = await db.collection('users').countDocuments();

//     // Get total quizzes
//     const totalQuizzes = await db.collection('quizzes').countDocuments();

//     // Get active users (logged in within last 7 days)
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
//     const activeUsers = await db.collection('users').countDocuments({
//       lastLogin: { $gte: sevenDaysAgo }
//     });

//     // Calculate completion rate
//     const results = await db.collection('results').aggregate([
//       {
//         $group: {
//           _id: null,
//           avgPercentage: { $avg: '$percentage' }
//         }
//       }
//     ]).toArray();

//     const completionRate = results.length > 0 ? Math.round(results[0].avgPercentage) : 0;

//     return NextResponse.json({
//       success: true,
//       data: {
//         totalUsers,
//         totalQuizzes,
//         activeUsers,
//         completionRate
//       }
//     });

//   } catch (error) {
//     console.error('Dashboard stats error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch dashboard stats' },
//       { status: 500 }
//     );
//   }
// }







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

    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get new users today
    const newUsersToday = await db.collection('users').countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Get quizzes created today
    const quizzesToday = await db.collection('quizzes').countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Get total attempts
    const totalAttempts = await db.collection('results').countDocuments();

    // Calculate average score
    const avgScoreResult = await db.collection('results').aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: '$percentage' }
        }
      }
    ]).toArray();

    const avgScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avg) : 0;

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

    // Get recent activity (last 10 items)
    const recentUsers = await db.collection('users')
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    const recentQuizzes = await db.collection('quizzes')
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    const recentResults = await db.collection('results')
      .find({})
      .sort({ submittedAt: -1 })
      .limit(3)
      .toArray();

    // Format recent activity
    const recentActivity = [
      ...recentUsers.map(user => ({
        id: `user-${user._id}`,
        type: 'user',
        message: `New user registered: ${user.name}`,
        time: formatRelativeTime(user.createdAt),
        userId: user._id.toString()
      })),
      ...recentQuizzes.map(quiz => ({
        id: `quiz-${quiz._id}`,
        type: 'quiz',
        message: `New quiz created: ${quiz.title}`,
        time: formatRelativeTime(quiz.createdAt),
        quizId: quiz._id.toString()
      })),
      ...recentResults.map(result => ({
        id: `result-${result._id}`,
        type: 'result',
        message: `${result.userName} completed ${result.quizTitle}`,
        time: formatRelativeTime(result.submittedAt),
        userId: result.userId,
        quizId: result.quizId
      }))
    ].sort((a, b) => {
      // Sort by time (most recent first) - simplified for demo
      return -1;
    }).slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalQuizzes,
        activeUsers,
        completionRate,
        newUsersToday,
        quizzesToday,
        totalAttempts,
        avgScore
      },
      recentActivity
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}