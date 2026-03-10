

// // import { NextResponse } from 'next/server';
// // import clientPromise from '@/lib/mongodb';
// // import { ObjectId } from 'mongodb';

// // // GET /api/quizzes/:id - Ek specific quiz lao
// // export async function GET(
// //   request: Request,
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await params;
// //     console.log('📥 GET request for quiz ID:', id);
    
// //     if (!ObjectId.isValid(id)) {
// //       console.log('❌ Invalid quiz ID format:', id);
// //       return NextResponse.json(
// //         { success: false, error: 'Invalid quiz ID' },
// //         { status: 400 }
// //       );
// //     }
    
// //     const client = await clientPromise;
// //     const db = client.db('quizDB');
    
// //     const quiz = await db.collection('quizzes').findOne({
// //       _id: new ObjectId(id)
// //     });
    
// //     if (!quiz) {
// //       console.log('❌ Quiz not found with ID:', id);
// //       return NextResponse.json(
// //         { success: false, error: 'Quiz not found' },
// //         { status: 404 }
// //       );
// //     }
    
// //     console.log('✅ Quiz found:', quiz.title);
    
// //     // ✅ Get attempt count for this quiz
// //     const attempts = await db.collection('results').countDocuments({
// //       quizId: id
// //     });
    
// //     console.log('📊 Attempts count:', attempts);
    
// //     return NextResponse.json({
// //       success: true,
// //       data: {
// //         id: quiz._id.toString(),
// //         title: quiz.title,
// //         description: quiz.description,
// //         duration: quiz.duration,
// //         totalMarks: quiz.totalMarks,
// //         questions: quiz.questions,
// //         createdBy: quiz.createdBy,
// //         createdByName: quiz.createdByName,
// //         createdAt: quiz.createdAt,
// //         attempts: attempts  // ✅ YEH ADD KIYA
// //       }
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error fetching quiz:', error);
// //     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
// //     return NextResponse.json(
// //       { success: false, error: 'Failed to fetch quiz: ' + errorMessage },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // PUT /api/quizzes/:id - Quiz update karo
// // export async function PUT(
// //   request: Request,
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await params;
// //     console.log('🔄 PUT request for quiz ID:', id);
    
// //     const body = await request.json();
// //     console.log('📦 Update data received:', JSON.stringify(body, null, 2));
    
// //     if (!ObjectId.isValid(id)) {
// //       console.log('❌ Invalid quiz ID format:', id);
// //       return NextResponse.json(
// //         { success: false, error: 'Invalid quiz ID' },
// //         { status: 400 }
// //       );
// //     }
    
// //     const client = await clientPromise;
// //     const db = client.db('quizDB');
    
// //     // Pehle check karo quiz exist karti hai
// //     const existingQuiz = await db.collection('quizzes').findOne({
// //       _id: new ObjectId(id)
// //     });
    
// //     if (!existingQuiz) {
// //       console.log('❌ Quiz not found with ID:', id);
// //       return NextResponse.json(
// //         { success: false, error: 'Quiz not found' },
// //         { status: 404 }
// //       );
// //     }
    
// //     console.log('✅ Quiz found, updating...');
    
// //     // Properly format update data
// //     const updateData = {
// //       title: body.title,
// //       description: body.description,
// //       duration: Number(body.duration),
// //       totalMarks: Number(body.totalMarks),
// //       questions: body.questions.map((q: any) => ({
// //         text: q.text,
// //         options: q.options,
// //         correctAnswer: Number(q.correctAnswer || q.correctOption || 0),
// //         marks: Number(q.marks || 10)
// //       })),
// //       updatedAt: new Date()
// //     };
    
// //     console.log('📤 Sending update to database:', JSON.stringify(updateData, null, 2));
    
// //     const result = await db.collection('quizzes').updateOne(
// //       { _id: new ObjectId(id) },
// //       { $set: updateData }
// //     );
    
// //     console.log('📊 Update result:', JSON.stringify(result, null, 2));
    
// //     if (result.matchedCount === 0) {
// //       return NextResponse.json(
// //         { success: false, error: 'Quiz not found' },
// //         { status: 404 }
// //       );
// //     }
    
// //     if (result.modifiedCount === 0) {
// //       console.log('⚠️ No changes detected');
// //       return NextResponse.json({
// //         success: true,
// //         message: 'No changes detected'
// //       });
// //     }
    
// //     console.log('✅ Quiz updated successfully');
    
// //     return NextResponse.json({
// //       success: true,
// //       message: 'Quiz updated successfully'
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error updating quiz:', error);
// //     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
// //     return NextResponse.json(
// //       { success: false, error: 'Failed to update quiz: ' + errorMessage },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // DELETE /api/quizzes/:id - Quiz delete karo
// // export async function DELETE(
// //   request: Request,
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await params;
// //     console.log('🗑️ DELETE request for quiz ID:', id);
    
// //     if (!ObjectId.isValid(id)) {
// //       console.log('❌ Invalid quiz ID format:', id);
// //       return NextResponse.json(
// //         { success: false, error: 'Invalid quiz ID' },
// //         { status: 400 }
// //       );
// //     }
    
// //     const client = await clientPromise;
// //     const db = client.db('quizDB');
    
// //     // Pehle check karo quiz exist karti hai
// //     const existingQuiz = await db.collection('quizzes').findOne({
// //       _id: new ObjectId(id)
// //     });
    
// //     if (!existingQuiz) {
// //       console.log('❌ Quiz not found with ID:', id);
// //       return NextResponse.json(
// //         { success: false, error: 'Quiz not found' },
// //         { status: 404 }
// //       );
// //     }
    
// //     console.log('✅ Quiz found:', existingQuiz.title);
// //     console.log('🗑️ Deleting quiz...');
    
// //     const result = await db.collection('quizzes').deleteOne({
// //       _id: new ObjectId(id)
// //     });
    
// //     console.log('📊 Delete result:', JSON.stringify(result, null, 2));
    
// //     if (result.deletedCount === 0) {
// //       return NextResponse.json(
// //         { success: false, error: 'Failed to delete quiz' },
// //         { status: 500 }
// //       );
// //     }
    
// //     console.log('✅ Quiz deleted successfully');
    
// //     return NextResponse.json({
// //       success: true,
// //       message: 'Quiz deleted successfully'
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error deleting quiz:', error);
// //     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
// //     return NextResponse.json(
// //       { success: false, error: 'Failed to delete quiz: ' + errorMessage },
// //       { status: 500 }
// //     );
// //   }
// // }





// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// // GET /api/quizzes/:id - Ek specific quiz lao
// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log('📥 GET request for quiz ID:', id);
    
//     if (!ObjectId.isValid(id)) {
//       console.log('❌ Invalid quiz ID format:', id);
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const quiz = await db.collection('quizzes').findOne({
//       _id: new ObjectId(id)
//     });
    
//     if (!quiz) {
//       console.log('❌ Quiz not found with ID:', id);
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz found:', quiz.title);
    
//     // ✅ Get attempt count for this quiz
//     const attempts = await db.collection('results').countDocuments({
//       quizId: id
//     });
    
//     console.log('📊 Attempts count:', attempts);
    
//     return NextResponse.json({
//       success: true,
//       data: {
//         id: quiz._id.toString(),
//         title: quiz.title,
//         description: quiz.description,
//         duration: quiz.duration,
//         totalMarks: quiz.totalMarks,
//         questions: quiz.questions,
//         createdBy: quiz.createdBy,
//         createdByName: quiz.createdByName,
//         createdAt: quiz.createdAt,
//         attempts: attempts
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Error fetching quiz:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quiz: ' + errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // PUT /api/quizzes/:id - Quiz update karo
// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log('🔄 PUT request for quiz ID:', id);
    
//     const body = await request.json();
//     console.log('📦 Update data received:', JSON.stringify(body, null, 2));
    
//     if (!ObjectId.isValid(id)) {
//       console.log('❌ Invalid quiz ID format:', id);
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     // Pehle check karo quiz exist karti hai
//     const existingQuiz = await db.collection('quizzes').findOne({
//       _id: new ObjectId(id)
//     });
    
//     if (!existingQuiz) {
//       console.log('❌ Quiz not found with ID:', id);
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz found, updating...');
    
//     // Properly format update data
//     const updateData = {
//       title: body.title,
//       description: body.description,
//       duration: Number(body.duration),
//       totalMarks: Number(body.totalMarks),
//       questions: body.questions.map((q: any) => ({
//         text: q.text,
//         options: q.options,
//         correctAnswer: Number(q.correctAnswer || q.correctOption || 0),
//         marks: Number(q.marks || 10)
//       })),
//       updatedAt: new Date()
//     };
    
//     console.log('📤 Sending update to database:', JSON.stringify(updateData, null, 2));
    
//     const result = await db.collection('quizzes').updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData }
//     );
    
//     console.log('📊 Update result:', JSON.stringify(result, null, 2));
    
//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     if (result.modifiedCount === 0) {
//       console.log('⚠️ No changes detected');
//       return NextResponse.json({
//         success: true,
//         message: 'No changes detected'
//       });
//     }
    
//     console.log('✅ Quiz updated successfully');
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz updated successfully'
//     });
    
//   } catch (error) {
//     console.error('❌ Error updating quiz:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: 'Failed to update quiz: ' + errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/quizzes/:id - Quiz delete karo
// export async function DELETE(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log('🗑️ DELETE request for quiz ID:', id);
    
//     if (!ObjectId.isValid(id)) {
//       console.log('❌ Invalid quiz ID format:', id);
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     // Pehle check karo quiz exist karti hai
//     const existingQuiz = await db.collection('quizzes').findOne({
//       _id: new ObjectId(id)
//     });
    
//     if (!existingQuiz) {
//       console.log('❌ Quiz not found with ID:', id);
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz found:', existingQuiz.title);
//     console.log('🗑️ Deleting quiz...');
    
//     const result = await db.collection('quizzes').deleteOne({
//       _id: new ObjectId(id)
//     });
    
//     console.log('📊 Delete result:', JSON.stringify(result, null, 2));
    
//     if (result.deletedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Failed to delete quiz' },
//         { status: 500 }
//       );
//     }
    
//     console.log('✅ Quiz deleted successfully');
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz deleted successfully'
//     });
    
//   } catch (error) {
//     console.error('❌ Error deleting quiz:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: 'Failed to delete quiz: ' + errorMessage },
//       { status: 500 }
//     );
//   }
// }







// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// // GET /api/quizzes/:id - Ek specific quiz lao
// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log('📥 GET request for quiz ID:', id);
    
//     if (!ObjectId.isValid(id)) {
//       console.log('❌ Invalid quiz ID format:', id);
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const quiz = await db.collection('quizzes').findOne({
//       _id: new ObjectId(id)
//     });
    
//     if (!quiz) {
//       console.log('❌ Quiz not found with ID:', id);
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz found:', quiz.title);
    
//     // ✅ Get attempt count for this quiz
//     const attempts = await db.collection('results').countDocuments({
//       quizId: id
//     });
    
//     console.log('📊 Attempts count:', attempts);
    
//     return NextResponse.json({
//       success: true,
//       data: {
//         id: quiz._id.toString(),
//         title: quiz.title,
//         description: quiz.description,
//         duration: quiz.duration,
//         totalMarks: quiz.totalMarks,
//         questions: quiz.questions,
//         createdBy: quiz.createdBy,
//         createdByName: quiz.createdByName,
//         createdAt: quiz.createdAt,
//         attempts: attempts  // ✅ YEH ADD KIYA
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Error fetching quiz:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quiz: ' + errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // PUT /api/quizzes/:id - Quiz update karo
// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log('🔄 PUT request for quiz ID:', id);
    
//     const body = await request.json();
//     console.log('📦 Update data received:', JSON.stringify(body, null, 2));
    
//     if (!ObjectId.isValid(id)) {
//       console.log('❌ Invalid quiz ID format:', id);
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     // Pehle check karo quiz exist karti hai
//     const existingQuiz = await db.collection('quizzes').findOne({
//       _id: new ObjectId(id)
//     });
    
//     if (!existingQuiz) {
//       console.log('❌ Quiz not found with ID:', id);
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz found, updating...');
    
//     // Properly format update data
//     const updateData = {
//       title: body.title,
//       description: body.description,
//       duration: Number(body.duration),
//       totalMarks: Number(body.totalMarks),
//       questions: body.questions.map((q: any) => ({
//         text: q.text,
//         options: q.options,
//         correctAnswer: Number(q.correctAnswer || q.correctOption || 0),
//         marks: Number(q.marks || 10)
//       })),
//       updatedAt: new Date()
//     };
    
//     console.log('📤 Sending update to database:', JSON.stringify(updateData, null, 2));
    
//     const result = await db.collection('quizzes').updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData }
//     );
    
//     console.log('📊 Update result:', JSON.stringify(result, null, 2));
    
//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     if (result.modifiedCount === 0) {
//       console.log('⚠️ No changes detected');
//       return NextResponse.json({
//         success: true,
//         message: 'No changes detected'
//       });
//     }
    
//     console.log('✅ Quiz updated successfully');
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz updated successfully'
//     });
    
//   } catch (error) {
//     console.error('❌ Error updating quiz:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: 'Failed to update quiz: ' + errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/quizzes/:id - Quiz delete karo
// export async function DELETE(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log('🗑️ DELETE request for quiz ID:', id);
    
//     if (!ObjectId.isValid(id)) {
//       console.log('❌ Invalid quiz ID format:', id);
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     // Pehle check karo quiz exist karti hai
//     const existingQuiz = await db.collection('quizzes').findOne({
//       _id: new ObjectId(id)
//     });
    
//     if (!existingQuiz) {
//       console.log('❌ Quiz not found with ID:', id);
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz found:', existingQuiz.title);
//     console.log('🗑️ Deleting quiz...');
    
//     const result = await db.collection('quizzes').deleteOne({
//       _id: new ObjectId(id)
//     });
    
//     console.log('📊 Delete result:', JSON.stringify(result, null, 2));
    
//     if (result.deletedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Failed to delete quiz' },
//         { status: 500 }
//       );
//     }
    
//     console.log('✅ Quiz deleted successfully');
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz deleted successfully'
//     });
    
//   } catch (error) {
//     console.error('❌ Error deleting quiz:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: 'Failed to delete quiz: ' + errorMessage },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/quizzes/:id - Ek specific quiz lao
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('📥 GET request for quiz ID:', id);
    
    if (!ObjectId.isValid(id)) {
      console.log('❌ Invalid quiz ID format:', id);
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    const quiz = await db.collection('quizzes').findOne({
      _id: new ObjectId(id)
    });
    
    if (!quiz) {
      console.log('❌ Quiz not found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Quiz found:', quiz.title);
    
    // ✅ Get attempt count for this quiz
    const attempts = await db.collection('results').countDocuments({
      quizId: id
    });
    
    console.log('📊 Attempts count:', attempts);
    
    return NextResponse.json({
      success: true,
      data: {
        id: quiz._id.toString(),
        title: quiz.title,
        description: quiz.description,
        duration: quiz.duration,
        totalMarks: quiz.totalMarks,
        questions: quiz.questions,
        createdBy: quiz.createdBy,
        createdByName: quiz.createdByName,
        createdAt: quiz.createdAt,
        attempts: attempts,
        visibility: quiz.visibility || 'public',
        assignedTo: quiz.assignedTo || [],
        shareableLinks: quiz.shareableLinks || null
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching quiz:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz: ' + errorMessage },
      { status: 500 }
    );
  }
}

// PUT /api/quizzes/:id - Quiz update karo
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔄 PUT request for quiz ID:', id);
    
    const body = await request.json();
    console.log('📦 Update data received:', JSON.stringify(body, null, 2));
    
    if (!ObjectId.isValid(id)) {
      console.log('❌ Invalid quiz ID format:', id);
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    // Pehle check karo quiz exist karti hai
    const existingQuiz = await db.collection('quizzes').findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingQuiz) {
      console.log('❌ Quiz not found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Quiz found, updating...');
    
    // Properly format update data
    const updateData = {
      title: body.title,
      description: body.description,
      duration: Number(body.duration),
      totalMarks: Number(body.totalMarks),
      questions: body.questions.map((q: any) => ({
        text: q.text,
        options: q.options,
        correctAnswer: Number(q.correctAnswer || q.correctOption || 0),
        marks: Number(q.marks || 10)
      })),
      updatedAt: new Date()
    };
    
    console.log('📤 Sending update to database:', JSON.stringify(updateData, null, 2));
    
    const result = await db.collection('quizzes').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    console.log('📊 Update result:', JSON.stringify(result, null, 2));
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    if (result.modifiedCount === 0) {
      console.log('⚠️ No changes detected');
      return NextResponse.json({
        success: true,
        message: 'No changes detected'
      });
    }
    
    console.log('✅ Quiz updated successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Quiz updated successfully'
    });
    
  } catch (error) {
    console.error('❌ Error updating quiz:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to update quiz: ' + errorMessage },
      { status: 500 }
    );
  }
}

// DELETE /api/quizzes/:id - Quiz delete karo
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🗑️ DELETE request for quiz ID:', id);
    
    if (!ObjectId.isValid(id)) {
      console.log('❌ Invalid quiz ID format:', id);
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    // Pehle check karo quiz exist karti hai
    const existingQuiz = await db.collection('quizzes').findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingQuiz) {
      console.log('❌ Quiz not found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Quiz found:', existingQuiz.title);
    console.log('🗑️ Deleting quiz...');
    
    const result = await db.collection('quizzes').deleteOne({
      _id: new ObjectId(id)
    });
    
    console.log('📊 Delete result:', JSON.stringify(result, null, 2));
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete quiz' },
        { status: 500 }
      );
    }
    
    console.log('✅ Quiz deleted successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
    
  } catch (error) {
    console.error('❌ Error deleting quiz:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to delete quiz: ' + errorMessage },
      { status: 500 }
    );
  }
}