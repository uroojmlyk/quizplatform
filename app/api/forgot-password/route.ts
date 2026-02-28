import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/lib/email';
import { getPasswordResetHTML } from '@/lib/templates/password-reset';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validation
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Find user
    const user = await db.collection('users').findOne({ email });
    
    // For security, always return success even if user doesn't exist
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      });
    }

    // Create reset token
    const resetToken = jwt.sign(
      { 
        userId: user._id.toString(), 
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Save token to user
    await db.collection('users').updateOne(
      { _id: user._id },
      { 
        $set: { 
          resetToken,
          resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        }
      }
    );

    // Send reset email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;
    
    // Send email in background
    sendEmail({
      to: email,
      subject: '🔐 Reset Your QuizMaster Password',
      html: getPasswordResetHTML(user.name, resetLink),
    }).catch(err => console.error('Password reset email error:', err));

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.',
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}