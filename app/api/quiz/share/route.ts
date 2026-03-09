import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const { quizId, settings } = await req.json();

    if (!quizId) {
      return NextResponse.json(
        { success: false, error: 'Quiz ID required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Generate unique public ID (e.g., "abc123xyz7")
    const publicId = nanoid(10);

    // Check if already exists
    const existing = await db.collection('quizzes').findOne({
      'shareableLinks.publicId': publicId
    });

    if (existing) {
      // Try again with different ID
      return new NextResponse(null, { status: 409 });
    }

    // Update quiz with shareable link
    await db.collection('quizzes').updateOne(
      { _id: new ObjectId(quizId) },
      {
        $set: {
          shareableLinks: {
            publicId,
            isPublic: settings.isPublic || false,
            allowAnonymous: settings.allowAnonymous || true,
            expiresAt: settings.expiresAt || null,
            maxAttempts: settings.maxAttempts || null,
            currentAttempts: 0,
            createdAt: new Date()
          }
        }
      }
    );

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/quiz/shared/${publicId}`;

    return NextResponse.json({
      success: true,
      shareUrl,
      publicId
    });

  } catch (error) {
    console.error('Error generating share link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate link' },
      { status: 500 }
    );
  }
}