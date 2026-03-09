import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const { classCode, studentId } = await req.json();

    if (!classCode || !studentId) {
      return NextResponse.json(
        { success: false, error: 'Class code and student ID required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizmaster');

    // Find class by code
    const classData = await db.collection('classes').findOne({
      classCode: classCode.toUpperCase()
    });

    if (!classData) {
      return NextResponse.json(
        { success: false, error: 'Invalid class code' },
        { status: 404 }
      );
    }

    // Check if student already in class
    if (classData.students?.includes(studentId)) {
      return NextResponse.json(
        { success: false, error: 'Already in this class' },
        { status: 400 }
      );
    }

    // Add student to class
    await db.collection('classes').updateOne(
      { _id: classData._id },
      { $addToSet: { students: studentId } }
    );

    // Add class to student's classes
    await db.collection('users').updateOne(
      { _id: new ObjectId(studentId) },
      { $addToSet: { classes: classData._id.toString() } }
    );

    // Add teacher to student's assigned teachers
    await db.collection('users').updateOne(
      { _id: new ObjectId(studentId) },
      { $addToSet: { assignedTeachers: classData.teacherId } }
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined class',
      class: {
        name: classData.name,
        teacherId: classData.teacherId
      }
    });

  } catch (error) {
    console.error('Error joining class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to join class' },
      { status: 500 }
    );
  }
}