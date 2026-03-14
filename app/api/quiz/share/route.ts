



// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { randomBytes } from 'crypto';

// export async function POST(req: Request) {
//   try {
//     const { quizId, settings } = await req.json();

//     if (!quizId) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz ID required' },
//         { status: 400 }
//       );
//     }

//     if (!ObjectId.isValid(quizId)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid Quiz ID' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     const publicId = randomBytes(6).toString('hex');

//     const result = await db.collection('quizzes').updateOne(
//       { _id: new ObjectId(quizId) },
//       {
//         $set: {
//           shareableLinks: {
//             publicId,
//             isPublic: settings?.isPublic || false,
//             allowAnonymous: settings?.allowAnonymous ?? true,
//             expiresAt: settings?.expiresAt || null,
//             maxAttempts: settings?.maxAttempts ? Number(settings.maxAttempts) : null,
//             currentAttempts: 0,
//             createdAt: new Date(),
//           },
//         },
//       }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }

//     // ✅ FIX: server side pe NEXT_PUBLIC_APP_URL use karo, localhost nahi
//     const baseUrl = process.env.NEXT_PUBLIC_APP_URL
//       ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
//       : 'https://quizplatform-zeta.vercel.app';

//     const shareUrl = `${baseUrl}/quiz/shared/${publicId}`;

//     return NextResponse.json({
//       success: true,
//       shareUrl,
//       publicId,
//     });

//   } catch (error) {
//     console.error('Error generating share link:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to generate link' },
//       { status: 500 }
//     );
//   }
// }







import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { randomBytes } from 'crypto';

export async function POST(req: Request) {
  try {
    const { quizId, settings } = await req.json();

    if (!quizId) {
      return NextResponse.json(
        { success: false, error: 'Quiz ID required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(quizId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Quiz ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    const publicId = randomBytes(6).toString('hex');

    const result = await db.collection('quizzes').updateOne(
      { _id: new ObjectId(quizId) },
      {
        $set: {
          shareableLinks: {
            publicId,
            isPublic: settings?.isPublic || false,
            allowAnonymous: settings?.allowAnonymous ?? true,
            expiresAt: settings?.expiresAt || null,
            maxAttempts: settings?.maxAttempts ? Number(settings.maxAttempts) : null,
            currentAttempts: 0,
            createdAt: new Date(),
          },
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // ✅ FIX: server side pe NEXT_PUBLIC_APP_URL use karo, localhost nahi
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
      ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
      : 'https://quizplatform-zeta.vercel.app';

    const shareUrl = `${baseUrl}/quiz/shared/${publicId}`;

    return NextResponse.json({
      success: true,
      shareUrl,
      publicId,
    });

  } catch (error) {
    console.error('Error generating share link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate link' },
      { status: 500 }
    );
  }
}