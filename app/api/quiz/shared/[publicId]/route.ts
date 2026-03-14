// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// // ✅ GET method - Quiz data fetch karne ke liye
// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ publicId: string }> }
// ) {
//   try {
//     const { publicId } = await params;

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     // Find quiz by publicId
//     const quiz = await db.collection('quizzes').findOne({
//       'shareableLinks.publicId': publicId
//     });

//     if (!quiz) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }

//     // Check if link expired
//     const link = quiz.shareableLinks;
//     if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
//       return NextResponse.json(
//         { success: false, error: 'Link has expired' },
//         { status: 410 }
//       );
//     }

//     // Check max attempts
//     if (link.maxAttempts && link.currentAttempts >= link.maxAttempts) {
//       return NextResponse.json(
//         { success: false, error: 'Maximum attempts reached' },
//         { status: 403 }
//       );
//     }

//     // Return quiz without answers
//     const quizData = {
//       id: quiz._id.toString(),
//       title: quiz.title,
//       description: quiz.description,
//       duration: quiz.duration,
//       totalMarks: quiz.totalMarks,
//       questions: quiz.questions.map((q: any) => ({
//         text: q.text,
//         options: q.options,
//         marks: q.marks
//         // DON'T send correctAnswer
//       })),
//       allowAnonymous: link.allowAnonymous
//     };

//     return NextResponse.json({
//       success: true,
//       data: quizData,
//       isPublic: link.isPublic
//     });

//   } catch (error) {
//     console.error('Error fetching shared quiz:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch quiz' },
//       { status: 500 }
//     );
//   }
// }

// // ✅ POST method - Result submit karne ke liye (aapka existing code)
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
//     if (link.maxAttempts && link.currentAttempts > link.maxAttempts) {
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

//     // Save result
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









import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await params;

    const client = await clientPromise;
    const db = client.db('quizDB');

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

    // Check if link expired
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Link has expired' },
        { status: 410 }
      );
    }

    // Check max attempts
    if (link.maxAttempts && link.currentAttempts >= link.maxAttempts) {
      return NextResponse.json(
        { success: false, error: 'Maximum attempts reached' },
        { status: 403 }
      );
    }

    // ✅ FIX: currentAttempts increment SIRF submit pe hona chahiye, GET pe nahi
    // Pehle GET pe bhi increment ho raha tha - isliye link jaldi expire hoti thi

    const quizData = {
      id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      totalMarks: quiz.totalMarks,
      questions: quiz.questions.map((q: any) => ({
        text: q.text,
        options: q.options,
        marks: q.marks,
        // correctAnswer/correctOption NAHI bhejna - security
      })),
      allowAnonymous: link.allowAnonymous,
    };

    return NextResponse.json({
      success: true,
      data: quizData,
      isPublic: link.isPublic,
    });

  } catch (error) {
    console.error('Error fetching shared quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
}