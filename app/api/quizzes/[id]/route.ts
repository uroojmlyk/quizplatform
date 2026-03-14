

// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// // GET /api/quizzes/:id
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

//     const attempts = await db.collection('results').countDocuments({
//       quizId: id
//     });

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
//         visibility: quiz.visibility,
//         assignedTo: quiz.assignedTo,
//         attempts,
//         // ✅ YEH MISSING THA - shareableLinks return nahi ho raha tha
//         shareableLinks: quiz.shareableLinks || null,
//       }
//     });

//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quiz: ' + errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // PUT /api/quizzes/:id
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

//     const existingQuiz = await db.collection('quizzes').findOne({
//       _id: new ObjectId(id)
//     });

//     if (!existingQuiz) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }

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

//     const result = await db.collection('quizzes').updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData }
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
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, error: 'Failed to update quiz: ' + errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/quizzes/:id
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
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
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }

    const attempts = await db.collection('results').countDocuments({
      quizId: id
    });

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
        visibility: quiz.visibility,
        assignedTo: quiz.assignedTo,
        attempts,
        shareableLinks: quiz.shareableLinks || null,
      }
    });

  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz: ' + msg },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

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

    const result = await db.collection('quizzes').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Quiz updated successfully' });

  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to update quiz: ' + msg },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    const result = await db.collection('quizzes').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Quiz deleted successfully' });

  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to delete quiz: ' + msg },
      { status: 500 }
    );
  }
}