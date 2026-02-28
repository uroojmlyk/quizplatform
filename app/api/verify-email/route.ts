import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Validation
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification link' },
        { status: 400 }
      );
    }

    if (!decoded.email) {
      return NextResponse.json(
        { success: false, error: 'Invalid token format' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Find user with matching email and verification token
    const user = await db.collection('users').findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification link or user not found' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (user.verified) {
      return NextResponse.json({
        success: true,
        message: 'Email already verified',
        alreadyVerified: true,
      });
    }

    // Update user as verified
    await db.collection('users').updateOne(
      { _id: user._id },
      {
        $set: { 
          verified: true,
          verifiedAt: new Date(),
        },
        $unset: { 
          verificationToken: "",
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! You can now access all features.',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        verified: true,
      },
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify email. Please try again.' },
      { status: 500 }
    );
  }
}