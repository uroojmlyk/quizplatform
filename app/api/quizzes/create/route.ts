// // app/api/quizzes/create/route.ts
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log('📦 Creating quiz with data:', body);
    
//     const { 
//       title, 
//       description, 
//       duration, 
//       questions, 
//       totalMarks, 
//       createdBy, 
//       createdByName,
//       visibility,
//       assignedTo 
//     } = body;

//     if (!title || !createdBy) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     // Format questions correctly
//     const formattedQuestions = questions.map((q: any) => ({
//       text: q.text,
//       options: q.options,
//       correctAnswer: q.correctOption, // Store as correctAnswer
//       marks: q.marks
//     }));

//     const quizData = {
//       title,
//       description: description || '',
//       duration: Number(duration),
//       questions: formattedQuestions,
//       totalMarks: Number(totalMarks),
//       createdBy: new ObjectId(createdBy),
//       createdByName,
//       createdAt: new Date(),
//       isPublished: true,
//       visibility: visibility || 'public',
//       assignedTo: assignedTo?.map((id: string) => new ObjectId(id)) || []
//     };

//     console.log('📤 Inserting quiz:', quizData);

//     const result = await db.collection('quizzes').insertOne(quizData);

//     console.log('✅ Quiz created with ID:', result.insertedId);

//     return NextResponse.json({ 
//       success: true, 
//       data: { ...quizData, _id: result.insertedId } 
//     });

//   } catch (error) {
//     console.error('❌ Error creating quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to create quiz' },
//       { status: 500 }
//     );
//   }
// }

// // ✅ OPTIONAL: GET method bhi handle kar sakte ho
// export async function GET() {
//   return NextResponse.json(
//     { success: false, error: 'Method not allowed' },
//     { status: 405 }
//   );
// }








import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      duration,
      questions,
      totalMarks,
      createdBy,
      createdByName,
      visibility,
      assignedTo
    } = body;

    if (!title || !questions || questions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Title and questions are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // ✅ KEY FIX: assignedTo strings ko ObjectId mein convert karo
    // Database mein ObjectId store hoga taake query match ho sake
    const assignedToObjectIds =
      visibility === 'assigned' && Array.isArray(assignedTo)
        ? assignedTo
            .filter((id: string) => ObjectId.isValid(id))
            .map((id: string) => new ObjectId(id))
        : [];

    const newQuiz = {
      title: title.trim(),
      description: description?.trim() || '',
      duration: Number(duration) || 30,
      questions,
      totalMarks: Number(totalMarks) || 0,
      createdBy,
      createdByName,
      visibility: visibility || 'public',
      assignedTo: assignedToObjectIds, // ✅ ObjectIds saved in DB
      createdAt: new Date(),
    };

    console.log('Creating quiz with assignedTo:', assignedToObjectIds);

    const result = await db.collection('quizzes').insertOne(newQuiz);

    return NextResponse.json(
      {
        success: true,
        message: 'Quiz created successfully',
        quizId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating quiz:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to create quiz: ' + errorMessage },
      { status: 500 }
    );
  }
}