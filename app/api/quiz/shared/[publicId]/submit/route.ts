




// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function POST(
//   req: Request,
//   { params }: { params: Promise<{ publicId: string }> }
// ) {
//   try {
//     const { publicId } = await params;
//     const { answers, participant } = await req.json();

//     if (!answers || !Array.isArray(answers)) {
//       return NextResponse.json(
//         { success: false, error: 'Answers are required' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     // Find the quiz with full data including correct answers
//     const quiz = await db.collection('quizzes').findOne({
//       'shareableLinks.publicId': publicId
//     });

//     if (!quiz) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }

//     const link = quiz.shareableLinks;

//     // Check expiry
//     if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
//       return NextResponse.json(
//         { success: false, error: 'This quiz link has expired' },
//         { status: 410 }
//       );
//     }

//     // Check max attempts
//     if (link.maxAttempts && link.currentAttempts >= link.maxAttempts) {
//       return NextResponse.json(
//         { success: false, error: 'Maximum attempts reached for this link' },
//         { status: 403 }
//       );
//     }

//     // Increment attempt count
//     await db.collection('quizzes').updateOne(
//       { 'shareableLinks.publicId': publicId },
//       { $inc: { 'shareableLinks.currentAttempts': 1 } }
//     );

//     // Server-side score calculation
//     let score = 0;
//     const questions = quiz.questions;

//     questions.forEach((q: any, idx: number) => {
//       const correctIdx = q.correctOption ?? q.correctAnswer ?? 0;
//       if (answers[idx] !== undefined && answers[idx] === correctIdx) {
//         score += Number(q.marks || 10);
//       }
//     });

//     const totalMarks = quiz.totalMarks || questions.reduce((sum: number, q: any) => sum + Number(q.marks || 10), 0);
//     const percentage = Math.round((score / totalMarks) * 100);

//     // Save result to anonymous_results collection
//     const resultDoc = {
//       quizId: publicId,
//       quizTitle: quiz.title,
//       participantName: participant?.name || 'Anonymous',
//       participantEmail: participant?.email || '',
//       score,
//       totalMarks,
//       percentage,
//       answers,
//       submittedAt: new Date(),
//       isAnonymous: true
//     };

//     await db.collection('anonymous_results').insertOne(resultDoc);

//     return NextResponse.json({
//       success: true,
//       result: {
//         score,
//         totalMarks,
//         percentage
//       }
//     });

//   } catch (error) {
//     console.error('Error submitting shared quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to submit quiz' },
//       { status: 500 }
//     );
//   }
// }





// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function POST(
//   req: Request,
//   { params }: { params: Promise<{ publicId: string }> }
// ) {
//   try {
//     const { publicId } = await params;
//     const { answers, participant } = await req.json();

//     if (!answers || !Array.isArray(answers)) {
//       return NextResponse.json(
//         { success: false, error: 'Answers are required' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     // Find the quiz with full data including correct answers
//     const quiz = await db.collection('quizzes').findOne({
//       'shareableLinks.publicId': publicId
//     });

//     if (!quiz) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }

//     const link = quiz.shareableLinks;

//     // Check expiry
//     if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
//       return NextResponse.json(
//         { success: false, error: 'This quiz link has expired' },
//         { status: 410 }
//       );
//     }

//     // Check max attempts
//     if (link.maxAttempts && link.currentAttempts >= link.maxAttempts) {
//       return NextResponse.json(
//         { success: false, error: 'Maximum attempts reached for this link' },
//         { status: 403 }
//       );
//     }

//     // Increment attempt count
//     await db.collection('quizzes').updateOne(
//       { 'shareableLinks.publicId': publicId },
//       { $inc: { 'shareableLinks.currentAttempts': 1 } }
//     );

//     // Server-side score calculation
//     let score = 0;
//     const questions = quiz.questions;

//     questions.forEach((q: any, idx: number) => {
//       const correctIdx = q.correctOption ?? q.correctAnswer ?? 0;
//       if (answers[idx] !== undefined && answers[idx] === correctIdx) {
//         score += Number(q.marks || 10);
//       }
//     });

//     const totalMarks = quiz.totalMarks || questions.reduce((sum: number, q: any) => sum + Number(q.marks || 10), 0);
//     const percentage = Math.round((score / totalMarks) * 100);

//     // ✅ SAVE TO ANONYMOUS_RESULTS COLLECTION
//     const resultDoc = {
//       quizId: publicId,
//       quizTitle: quiz.title,
//       participantName: participant?.name || 'Anonymous',
//       participantEmail: participant?.email || '',
//       score,
//       totalMarks,
//       percentage,
//       answers,
//       submittedAt: new Date(),
//       isAnonymous: true
//     };

//     await db.collection('anonymous_results').insertOne(resultDoc);

//     // ✅ ALSO SAVE TO REGULAR RESULTS COLLECTION (FOR TEACHER/ADMIN DASHBOARD)
//     const regularResult = {
//       quizId: quiz._id.toString(),
//       quizTitle: quiz.title,
//       userId: null,
//       userName: participant?.name || 'Anonymous',
//       userEmail: participant?.email || null,
//       score,
//       totalMarks,
//       percentage,
//       submittedAt: new Date(),
//       isAnonymous: true,
//       source: 'shared_link'
//     };

//     await db.collection('results').insertOne(regularResult);

//     return NextResponse.json({
//       success: true,
//       result: {
//         score,
//         totalMarks,
//         percentage
//       }
//     });

//   } catch (error) {
//     console.error('Error submitting shared quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to submit quiz' },
//       { status: 500 }
//     );
//   }
// }








import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await params;
    const { answers, participant } = await req.json();

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { success: false, error: 'Answers are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Quiz find karo shareableLinks.publicId se
    const quiz = await db.collection('quizzes').findOne({
      'shareableLinks.publicId': publicId
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }

    const link = quiz.shareableLinks;

    // Expiry check
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'This quiz link has expired' },
        { status: 410 }
      );
    }

    // Max attempts check
    if (link.maxAttempts && link.currentAttempts >= link.maxAttempts) {
      return NextResponse.json(
        { success: false, error: 'Maximum attempts reached for this link' },
        { status: 403 }
      );
    }

    // Attempt count increment karo
    await db.collection('quizzes').updateOne(
      { 'shareableLinks.publicId': publicId },
      { $inc: { 'shareableLinks.currentAttempts': 1 } }
    );

    // Score calculate karo server side
    let score = 0;
    const questions = quiz.questions;

    questions.forEach((q: any, idx: number) => {
      const correctIdx = q.correctOption ?? q.correctAnswer ?? 0;
      if (answers[idx] !== undefined && answers[idx] === correctIdx) {
        score += Number(q.marks || 10);
      }
    });

    const totalMarks = quiz.totalMarks ||
      questions.reduce((sum: number, q: any) => sum + Number(q.marks || 10), 0);
    const percentage = Math.round((score / totalMarks) * 100);

    const quizObjectId = quiz._id.toString();

    // ✅ FIX: results collection mein save karo (teacher dashboard isse dekhta hai)
    // quizId as actual quiz ObjectId string save karo
    const resultDoc = {
      quizId: quizObjectId,               // ✅ actual quiz _id
      quizTitle: quiz.title,
      userId: participant?.userId || '',
      userName: participant?.name || participant?.email || 'Anonymous',
      studentName: participant?.name || participant?.email || 'Anonymous',
      score,
      totalMarks,
      percentage,
      answers,
      submittedAt: new Date(),
      isAnonymous: !participant?.userId,
      sharePublicId: publicId,            // reference rakhho original publicId ka
    };

    await db.collection('results').insertOne(resultDoc);

    // anonymous_results mein bhi save karo (backward compat)
    await db.collection('anonymous_results').insertOne({
      quizId: publicId,
      quizTitle: quiz.title,
      participantName: participant?.name || 'Anonymous',
      participantEmail: participant?.email || '',
      score,
      totalMarks,
      percentage,
      answers,
      submittedAt: new Date(),
      isAnonymous: true,
    });

    return NextResponse.json({
      success: true,
      result: {
        score,
        totalMarks,
        percentage
      }
    });

  } catch (error) {
    console.error('Error submitting shared quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}