// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { ObjectId } from 'mongodb';

// export async function POST(request: Request) {
//   try {
//     const { token, newPassword } = await request.json();

//     // Validation
//     if (!token || !newPassword) {
//       return NextResponse.json(
//         { success: false, error: 'Token and new password are required' },
//         { status: 400 }
//       );
//     }

//     if (newPassword.length < 6) {
//       return NextResponse.json(
//         { success: false, error: 'Password must be at least 6 characters' },
//         { status: 400 }
//       );
//     }

//     // Verify token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
//     } catch (error) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid or expired reset link' },
//         { status: 400 }
//       );
//     }

//     if (!decoded.userId) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid token format' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     // Find user with valid token
//     const user = await db.collection('users').findOne({
//       _id: new ObjectId(decoded.userId),
//       resetToken: token,
//       resetTokenExpiry: { $gt: new Date() },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid or expired reset link' },
//         { status: 400 }
//       );
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update password and remove reset token
//     await db.collection('users').updateOne(
//       { _id: user._id },
//       {
//         $set: { 
//           password: hashedPassword,
//           updatedAt: new Date(),
//         },
//         $unset: { 
//           resetToken: "",
//           resetTokenExpiry: "",
//         },
//       }
//     );

//     return NextResponse.json({
//       success: true,
//       message: 'Password reset successfully. You can now login with your new password.',
//     });

//   } catch (error) {
//     console.error('Reset password error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to reset password. Please try again.' },
//       { status: 500 }
//     );
//   }
// }








import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    // Validation
    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid or expired reset link' },
        { status: 400 }
      );
    }

    if (!decoded.userId) {
      return NextResponse.json(
        { success: false, error: 'Invalid token format' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Find user with valid token
    const user = await db.collection('users').findOne({
      _id: new ObjectId(decoded.userId),
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired reset link' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and remove reset token
    await db.collection('users').updateOne(
      { _id: user._id },
      {
        $set: { 
          password: hashedPassword,
          updatedAt: new Date(),
        },
        $unset: { 
          resetToken: "",
          resetTokenExpiry: "",
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.',
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}