// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     // Get all quizzes
//     const quizzes = await db.collection('quizzes').find({}).toArray();

//     // Extract unique categories from quiz titles or add a category field
//     // For now, we'll create categories based on quiz titles
//     const categories = [
//       { id: 'all', name: 'All Quizzes', count: quizzes.length },
//       { id: 'programming', name: 'Programming', count: 0 },
//       { id: 'mathematics', name: 'Mathematics', count: 0 },
//       { id: 'science', name: 'Science', count: 0 },
//       { id: 'language', name: 'Language', count: 0 },
//       { id: 'general', name: 'General Knowledge', count: 0 },
//     ];

//     // Count quizzes in each category (based on title keywords)
//     quizzes.forEach(quiz => {
//       const title = quiz.title.toLowerCase();
//       if (title.includes('program') || title.includes('coding') || title.includes('javascript') || title.includes('python')) {
//         categories[1].count++;
//       } else if (title.includes('math') || title.includes('algebra') || title.includes('calculus')) {
//         categories[2].count++;
//       } else if (title.includes('science') || title.includes('physics') || title.includes('chemistry')) {
//         categories[3].count++;
//       } else if (title.includes('english') || title.includes('urdu') || title.includes('language')) {
//         categories[4].count++;
//       } else {
//         categories[5].count++;
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       data: categories.filter(c => c.count > 0) // Only show categories with quizzes
//     });

//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch categories' },
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

    // Get all quizzes
    const quizzes = await db.collection('quizzes').find({}).toArray();

    // Define categories with keywords
    const categories = [
      { id: 'web-dev', name: 'Web Development', keywords: ['html', 'css', 'javascript', 'react', 'next', 'vue', 'angular'], icon: 'Globe' },
      { id: 'programming', name: 'Programming', keywords: ['python', 'java', 'c++', 'algorithm', 'data structure', 'coding'], icon: 'Code' },
      { id: 'database', name: 'Database', keywords: ['mongodb', 'sql', 'mysql', 'postgresql', 'prisma', 'database'], icon: 'Database' },
      { id: 'aptitude', name: 'Aptitude', keywords: ['math', 'logical', 'reasoning', 'aptitude', 'quantitative'], icon: 'Brain' },
      { id: 'general', name: 'General Knowledge', keywords: ['gk', 'general', 'science', 'history', 'geography'], icon: 'Award' },
    ];

    // Count quizzes in each category
    const categoriesWithCount = categories.map(cat => {
      const count = quizzes.filter(quiz => {
        const title = quiz.title?.toLowerCase() || '';
        const desc = quiz.description?.toLowerCase() || '';
        const category = quiz.category?.toLowerCase() || '';
        
        return cat.keywords.some(keyword => 
          title.includes(keyword) || 
          desc.includes(keyword) || 
          category.includes(keyword)
        );
      }).length;

      return {
        ...cat,
        count
      };
    });

    // Get trending categories (most active in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trendingCategories = await db.collection('results').aggregate([
      {
        $match: {
          submittedAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $lookup: {
          from: 'quizzes',
          localField: 'quizId',
          foreignField: '_id',
          as: 'quiz'
        }
      },
      {
        $unwind: '$quiz'
      },
      {
        $group: {
          _id: '$quiz.category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]).toArray();

    return NextResponse.json({
      success: true,
      data: {
        all: categoriesWithCount,
        trending: trendingCategories.map(t => ({
          id: t._id || 'general',
          name: categories.find(c => c.id === t._id)?.name || 'General',
          count: t.count
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}