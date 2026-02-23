
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
    
//     if (!ObjectId.isValid(id)) {
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
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
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
//         createdAt: quiz.createdAt
//       }
//     });
    
//   } catch (error) {
//     console.error('Error fetching quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quiz' },
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
//     const body = await request.json();
    
//     if (!ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const result = await db.collection('quizzes').updateOne(
//       { _id: new ObjectId(id) },
//       { $set: body }
//     );
    
//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz updated successfully'
//     });
    
//   } catch (error) {
//     console.error('Error updating quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to update quiz' },
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
    
//     if (!ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid quiz ID' },
//         { status: 400 }
//       );
//     }
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const result = await db.collection('quizzes').deleteOne({
//       _id: new ObjectId(id)
//     });
    
//     if (result.deletedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz deleted successfully'
//     });
    
//   } catch (error) {
//     console.error('Error deleting quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to delete quiz' },
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
//         createdAt: quiz.createdAt
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Error fetching quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quiz: ' + error.message },
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
    
//     const result = await db.collection('quizzes').updateOne(
//       { _id: new ObjectId(id) },
//       { $set: body }
//     );
    
//     console.log('📊 Update result:', JSON.stringify(result, null, 2));
    
//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     if (result.modifiedCount === 0) {
//       console.log('⚠️ No changes made to quiz');
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
//     return NextResponse.json(
//       { success: false, error: 'Failed to update quiz: ' + error.message },
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
    
//     console.log('✅ Quiz found, deleting...');
    
//     const result = await db.collection('quizzes').deleteOne({
//       _id: new ObjectId(id)
//     });
    
//     console.log('📊 Delete result:', JSON.stringify(result, null, 2));
    
//     if (result.deletedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz deleted successfully');
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz deleted successfully'
//     });
    
//   } catch (error) {
//     console.error('❌ Error deleting quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to delete quiz: ' + error.message },
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
//         createdAt: quiz.createdAt
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Error fetching quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quiz: ' + error.message },
//       { status: 500 }
//     );
//   }
// }

// // PUT /api/quizzes/:id - Quiz update karo ✅ FIXED
// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log('🔄 PUT request for quiz ID:', id);
    
//     const body = await request.json();
//     console.log('📦 Update data received');
    
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
    
//     // ✅ FIX: id fields ko remove karo update data se
//     const updateData = { ...body };
//     delete updateData.id;
//     delete updateData._id;
//     delete updateData.createdBy;  // createdBy change nahi karna
//     delete updateData.createdAt;  // createdAt change nahi karna
    
//     const result = await db.collection('quizzes').updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData }
//     );
    
//     console.log('📊 Update result:', result);
    
//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz updated successfully');
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz updated successfully'
//     });
    
//   } catch (error) {
//     console.error('❌ Error updating quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to update quiz: ' + error.message },
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
    
//     console.log('✅ Quiz found, deleting...');
    
//     const result = await db.collection('quizzes').deleteOne({
//       _id: new ObjectId(id)
//     });
    
//     console.log('📊 Delete result:', result);
    
//     if (result.deletedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }
    
//     console.log('✅ Quiz deleted successfully');
    
//     return NextResponse.json({
//       success: true,
//       message: 'Quiz deleted successfully'
//     });
    
//   } catch (error) {
//     console.error('❌ Error deleting quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to delete quiz: ' + error.message },
//       { status: 500 }
//     );
//   }
// }  




import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/quizzes/:id - Ek specific quiz lao ✅ FIXED
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('📥 GET request for quiz ID:', id);
    console.log('📥 ID type:', typeof id);
    console.log('📥 ID length:', id.length);
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    let quiz = null;
    
    // Pehle try karo ObjectId se search
    if (ObjectId.isValid(id)) {
      console.log('🔍 Searching with ObjectId...');
      quiz = await db.collection('quizzes').findOne({
        _id: new ObjectId(id)
      });
    }
    
    // Agar ObjectId se nahi mila to string id field se search karo
    if (!quiz) {
      console.log('🔍 Searching with string id field...');
      quiz = await db.collection('quizzes').findOne({ 
        id: id 
      });
    }
    
    // Agar ab bhi nahi mila to error
    if (!quiz) {
      console.log('❌ Quiz not found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Quiz found:', quiz.title);
    
    return NextResponse.json({
      success: true,
      data: {
        id: quiz._id?.toString() || quiz.id,
        title: quiz.title,
        description: quiz.description,
        duration: quiz.duration,
        totalMarks: quiz.totalMarks,
        questions: quiz.questions,
        createdBy: quiz.createdBy,
        createdByName: quiz.createdByName,
        createdAt: quiz.createdAt
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz: ' + error.message },
      { status: 500 }
    );
  }
}

// PUT /api/quizzes/:id - Quiz update karo ✅ FIXED
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔄 PUT request for quiz ID:', id);
    
    const body = await request.json();
    console.log('📦 Update data received');
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    let existingQuiz = null;
    let query = {};
    
    // Pehle ObjectId se search karo
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
      existingQuiz = await db.collection('quizzes').findOne(query);
    }
    
    // Agar nahi mila to string id se search karo
    if (!existingQuiz) {
      query = { id: id };
      existingQuiz = await db.collection('quizzes').findOne(query);
    }
    
    if (!existingQuiz) {
      console.log('❌ Quiz not found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Quiz found, updating...');
    
    // id fields ko remove karo update data se
    const updateData = { ...body };
    delete updateData.id;
    delete updateData._id;
    delete updateData.createdBy;
    delete updateData.createdAt;
    
    const result = await db.collection('quizzes').updateOne(
      query,
      { $set: updateData }
    );
    
    console.log('📊 Update result:', result);
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Quiz updated successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Quiz updated successfully'
    });
    
  } catch (error) {
    console.error('❌ Error updating quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update quiz: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/quizzes/:id - Quiz delete karo ✅ FIXED
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🗑️ DELETE request for quiz ID:', id);
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    let existingQuiz = null;
    let query = {};
    
    // Pehle ObjectId se search karo
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
      existingQuiz = await db.collection('quizzes').findOne(query);
    }
    
    // Agar nahi mila to string id se search karo
    if (!existingQuiz) {
      query = { id: id };
      existingQuiz = await db.collection('quizzes').findOne(query);
    }
    
    if (!existingQuiz) {
      console.log('❌ Quiz not found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Quiz found, deleting...');
    
    const result = await db.collection('quizzes').deleteOne(query);
    
    console.log('📊 Delete result:', result);
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Quiz deleted successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
    
  } catch (error) {
    console.error('❌ Error deleting quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete quiz: ' + error.message },
      { status: 500 }
    );
  }
}