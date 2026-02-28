// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import clientPromise from '@/lib/mongodb';

// export async function POST(request: Request) {
//   try {
//     const { name, email, password, role } = await request.json();
    
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     // Check if user exists
//     const existingUser = await db.collection('users').findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: 'User already exists' },
//         { status: 400 }
//       );
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Create user
//     const result = await db.collection('users').insertOne({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       createdAt: new Date()
//     });
    
//     return NextResponse.json(
//       { 
//         success: true, 
//         message: 'User created successfully',
//         user: {
//           id: result.insertedId,
//           name,
//           email,
//           role
//         }
//       },
//       { status: 201 }
//     );
    
//   } catch (error) {
//     console.error('Signup error:', error);
//     return NextResponse.json(
//       { error: 'Something went wrong' },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/lib/email';
import { getWelcomeEmailHTML } from '@/lib/templates/welcome-email';

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create verification token
    const verificationToken = jwt.sign(
      { email, name },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Create user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      verified: false,
      verificationToken,
      createdAt: new Date(),
    });

    // Send welcome email
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email/${verificationToken}`;
    
    // Send email in background
    sendEmail({
      to: email,
      subject: 'Welcome to QuizMaster! Please verify your email',
      html: getWelcomeEmailHTML(name, verificationLink),
    }).catch(err => console.error('Background email error:', err));

    // Generate JWT for auto-login
    const token = jwt.sign(
      { userId: result.insertedId.toString(), email, role: role || 'student' },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: result.insertedId.toString(),
        name,
        email,
        role: role || 'student',
        verified: false,
      },
      message: 'Please check your email to verify your account',
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Signup failed. Please try again.' },
      { status: 500 }
    );
  }
}