import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const { teacherId, studentId, action } = await req.json();

    if (!teacherId || !studentId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizmaster');

    if (action === 'assign') {
      // Assign student to teacher
      await db.collection('users').updateOne(
        { _id: new ObjectId(teacherId) },
        { $addToSet: { assignedStudents: studentId } }
      );

      // Assign teacher to student
      await db.collection('users').updateOne(
        { _id: new ObjectId(studentId) },
        { $addToSet: { assignedTeachers: teacherId } }
      );
    } else {
      // Unassign
      await db.collection('users').updateOne(
        { _id: new ObjectId(teacherId) },
        { $pull: { assignedStudents: studentId } }
      );

      await db.collection('users').updateOne(
        { _id: new ObjectId(studentId) },
        { $pull: { assignedTeachers: teacherId } }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: action === 'assign' ? 'Student assigned' : 'Student unassigned' 
    });

  } catch (error) {
    console.error('Error in assign-student:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}