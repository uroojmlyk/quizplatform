// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const type = searchParams.get('type') || 'featured';
//     const category = searchParams.get('category');
//     const limit = parseInt(searchParams.get('limit') || '6');

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     let query = {};
//     if (category && category !== 'all') {
//       query = { category: category };
//     }

//     let quizzes = [];
    
//     if (type === 'trending') {
//       // Get quizzes with most attempts in last 7 days
//       const sevenDaysAgo = new Date();
//       sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//       const trendingIds = await db.collection('results').aggregate([
//         {
//           $match: {
//             submittedAt: { $gte: sevenDaysAgo }
//           }
//         },
//         {
//           $group: {
//             _id: '$quizId',
//             attempts: { $sum: 1 },
//             avgScore: { $avg: '$percentage' }
//           }
//         },
//         { $sort: { attempts: -1 } },
//         { $limit: limit }
//       ]).toArray();

//       const quizIds = trendingIds.map(t => t._id);
      
//       quizzes = await db.collection('quizzes')
//         .find({ _id: { $in: quizIds.map(id => new ObjectId(id)) } })
//         .toArray();

//       // Add attempt counts
//       quizzes = quizzes.map(quiz => {
//         const trending = trendingIds.find(t => t._id === quiz._id.toString());
//         return {
//           ...quiz,
//           _id: quiz._id.toString(),
//           attempts: trending?.attempts || 0,
//           avgScore: Math.round(trending?.avgScore || 0)
//         };
//       });
//     } else {
//       // Featured or category quizzes
//       quizzes = await db.collection('quizzes')
//         .find(query)
//         .sort({ createdAt: -1 })
//         .limit(limit)
//         .toArray();

//       // Get attempt counts for each quiz
//       const quizIds = quizzes.map(q => q._id.toString());
//       const attempts = await db.collection('results').aggregate([
//         {
//           $match: {
//             quizId: { $in: quizIds }
//           }
//         },
//         {
//           $group: {
//             _id: '$quizId',
//             count: { $sum: 1 },
//             avgScore: { $avg: '$percentage' }
//           }
//         }
//       ]).toArray();

//       const attemptMap = new Map();
//       attempts.forEach(a => {
//         attemptMap.set(a._id, {
//           count: a.count,
//           avgScore: Math.round(a.avgScore || 0)
//         });
//       });

//       quizzes = quizzes.map(quiz => ({
//         _id: quiz._id.toString(),
//         title: quiz.title,
//         description: quiz.description,
//         duration: quiz.duration,
//         totalMarks: quiz.totalMarks,
//         questions: quiz.questions,
//         createdByName: quiz.createdByName,
//         category: quiz.category || 'General',
//         attempts: attemptMap.get(quiz._id.toString())?.count || 0,
//         avgScore: attemptMap.get(quiz._id.toString())?.avgScore || 0
//       }));
//     }

//     return NextResponse.json({
//       success: true,
//       data: quizzes
//     });

//   } catch (error) {
//     console.error('Error fetching public quizzes:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quizzes' },
//       { status: 500 }
//     );
//   }
// }











import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';  // ✅ IMPORT ADD KARO

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'featured';
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '6');

    const client = await clientPromise;
    const db = client.db('quizDB');

    let query = {};
    if (category && category !== 'all') {
      query = { category: category };
    }

    let quizzes = [];
    
    if (type === 'trending') {
      // Get quizzes with most attempts in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const trendingIds = await db.collection('results').aggregate([
        {
          $match: {
            submittedAt: { $gte: sevenDaysAgo }
          }
        },
        {
          $group: {
            _id: '$quizId',
            attempts: { $sum: 1 },
            avgScore: { $avg: '$percentage' }
          }
        },
        { $sort: { attempts: -1 } },
        { $limit: limit }
      ]).toArray();

      const quizIds = trendingIds.map(t => t._id);
      
      // ✅ FIXED: Proper ObjectId conversion
      const objectIds = quizIds.map(id => {
        try {
          return new ObjectId(id);
        } catch {
          return null;
        }
      }).filter(id => id !== null);
      
      quizzes = await db.collection('quizzes')
        .find({ _id: { $in: objectIds } })
        .toArray();

      // Add attempt counts
      quizzes = quizzes.map(quiz => {
        const trending = trendingIds.find(t => t._id === quiz._id.toString());
        return {
          _id: quiz._id.toString(),
          title: quiz.title,
          description: quiz.description,
          duration: quiz.duration,
          totalMarks: quiz.totalMarks,
          questions: quiz.questions,
          createdByName: quiz.createdByName,
          category: quiz.category || 'General',
          attempts: trending?.attempts || 0,
          avgScore: Math.round(trending?.avgScore || 0)
        };
      });
    } else {
      // Featured or category quizzes
      quizzes = await db.collection('quizzes')
        .find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();

      // Get attempt counts for each quiz
      const quizIds = quizzes.map(q => q._id.toString());
      const attempts = await db.collection('results').aggregate([
        {
          $match: {
            quizId: { $in: quizIds }
          }
        },
        {
          $group: {
            _id: '$quizId',
            count: { $sum: 1 },
            avgScore: { $avg: '$percentage' }
          }
        }
      ]).toArray();

      const attemptMap = new Map();
      attempts.forEach(a => {
        attemptMap.set(a._id, {
          count: a.count,
          avgScore: Math.round(a.avgScore || 0)
        });
      });

      quizzes = quizzes.map(quiz => ({
        _id: quiz._id.toString(),
        title: quiz.title,
        description: quiz.description,
        duration: quiz.duration,
        totalMarks: quiz.totalMarks,
        questions: quiz.questions,
        createdByName: quiz.createdByName,
        category: quiz.category || 'General',
        attempts: attemptMap.get(quiz._id.toString())?.count || 0,
        avgScore: attemptMap.get(quiz._id.toString())?.avgScore || 0
      }));
    }

    return NextResponse.json({
      success: true,
      data: quizzes
    });

  } catch (error) {
    console.error('Error fetching public quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}