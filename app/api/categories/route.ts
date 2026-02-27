import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('quizDB');

    // Get all quizzes
    const quizzes = await db.collection('quizzes').find({}).toArray();

    // Extract unique categories from quiz titles or add a category field
    // For now, we'll create categories based on quiz titles
    const categories = [
      { id: 'all', name: 'All Quizzes', count: quizzes.length },
      { id: 'programming', name: 'Programming', count: 0 },
      { id: 'mathematics', name: 'Mathematics', count: 0 },
      { id: 'science', name: 'Science', count: 0 },
      { id: 'language', name: 'Language', count: 0 },
      { id: 'general', name: 'General Knowledge', count: 0 },
    ];

    // Count quizzes in each category (based on title keywords)
    quizzes.forEach(quiz => {
      const title = quiz.title.toLowerCase();
      if (title.includes('program') || title.includes('coding') || title.includes('javascript') || title.includes('python')) {
        categories[1].count++;
      } else if (title.includes('math') || title.includes('algebra') || title.includes('calculus')) {
        categories[2].count++;
      } else if (title.includes('science') || title.includes('physics') || title.includes('chemistry')) {
        categories[3].count++;
      } else if (title.includes('english') || title.includes('urdu') || title.includes('language')) {
        categories[4].count++;
      } else {
        categories[5].count++;
      }
    });

    return NextResponse.json({
      success: true,
      data: categories.filter(c => c.count > 0) // Only show categories with quizzes
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}