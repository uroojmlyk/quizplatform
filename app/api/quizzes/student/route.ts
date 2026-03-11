

// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const studentId = searchParams.get('studentId');

//     if (!studentId) {
//       return NextResponse.json(
//         { success: false, error: 'Student ID required' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     // Get student's info
//     const student = await db.collection('users').findOne(
//       { _id: new ObjectId(studentId) },
//       { projection: { assignedTeachers: 1, classes: 1 } }
//     );

//     // ✅ FIX: Convert studentId to ObjectId for database comparison
//     const studentObjectId = new ObjectId(studentId);

//     // Get all quizzes student can see
//     const quizzes = await db.collection('quizzes').find({
//       $or: [
//         // Public quizzes
//         { visibility: 'public' },
        
//         // ✅ FIX: Compare with ObjectId
//         { 
//           visibility: 'assigned',
//           assignedTo: studentObjectId  // ObjectId se compare karo
//         },
        
//         // Quizzes from assigned teachers
//         {
//           createdBy: { $in: student?.assignedTeachers || [] }
//         }
//       ]
//     }).sort({ createdAt: -1 }).toArray();

//     // Format for frontend
//     const formattedQuizzes = quizzes.map(quiz => ({
//       id: quiz._id.toString(),
//       title: quiz.title,
//       description: quiz.description,
//       duration: quiz.duration,
//       totalMarks: quiz.totalMarks,
//       questions: quiz.questions,
//       createdBy: quiz.createdBy?.toString(),
//       createdByName: quiz.createdByName,
//       createdAt: quiz.createdAt,
//       visibility: quiz.visibility || 'public',
//       assignedTo: quiz.assignedTo?.map((id: ObjectId) => id.toString())
//     }));

//     return NextResponse.json({ 
//       success: true, 
//       data: formattedQuizzes,
//       count: formattedQuizzes.length 
//     });

//   } catch (error) {
//     console.error('Error fetching student quizzes:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quizzes' },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const studentId = searchParams.get('studentId');

//     if (!studentId || !ObjectId.isValid(studentId)) {
//       return NextResponse.json(
//         { success: false, error: 'Valid Student ID required' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     const studentObjectId = new ObjectId(studentId);

//     // ✅ FIXED QUERY:
//     // Public quizzes → sab students ko dikh sakti hain
//     // Assigned quizzes → SIRF woh students jinke ObjectId assignedTo array mein hain
//     const quizzes = await db.collection('quizzes').find({
//       $or: [
//         { visibility: 'public' },
//         {
//           visibility: 'assigned',
//           assignedTo: studentObjectId   // ObjectId match — DB mein bhi ObjectId store hoti hai
//         }
//       ]
//     }).sort({ createdAt: -1 }).toArray();

//     const formattedQuizzes = quizzes.map(quiz => ({
//       id: quiz._id.toString(),
//       title: quiz.title,
//       description: quiz.description,
//       duration: quiz.duration,
//       totalMarks: quiz.totalMarks,
//       questions: quiz.questions,
//       createdBy: quiz.createdBy?.toString(),
//       createdByName: quiz.createdByName,
//       createdAt: quiz.createdAt,
//       visibility: quiz.visibility || 'public',
//       assignedTo: quiz.assignedTo?.map((id: ObjectId) => id.toString()) || []
//     }));

//     return NextResponse.json({
//       success: true,
//       data: formattedQuizzes,
//       count: formattedQuizzes.length
//     });

//   } catch (error) {
//     console.error('Error fetching student quizzes:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quizzes' },
//       { status: 500 }
//     );
//   }
// }








import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    if (!studentId || !ObjectId.isValid(studentId)) {
      return NextResponse.json(
        { success: false, error: 'Valid Student ID required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    const studentObjectId = new ObjectId(studentId);

    // ✅ FIX: visibility field missing (old quizzes) ko bhi public treat karo
    const quizzes = await db.collection('quizzes').find({
      $or: [
        { visibility: 'public' },
        { visibility: { $exists: false } },  // field hi nahi hai
        { visibility: null },                 // field null hai
        {
          visibility: 'assigned',
          assignedTo: studentObjectId
        }
      ]
    }).sort({ createdAt: -1 }).toArray();

    const formattedQuizzes = quizzes.map(quiz => ({
      id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      totalMarks: quiz.totalMarks,
      questions: quiz.questions,
      createdBy: quiz.createdBy?.toString(),
      createdByName: quiz.createdByName,
      createdAt: quiz.createdAt,
      visibility: quiz.visibility || 'public',
      assignedTo: quiz.assignedTo?.map((id: ObjectId) => id.toString()) || []
    }));

    return NextResponse.json({
      success: true,
      data: formattedQuizzes,
      count: formattedQuizzes.length
    });

  } catch (error) {
    console.error('Error fetching student quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}