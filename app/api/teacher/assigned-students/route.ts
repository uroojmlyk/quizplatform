import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get('teacherId');

    if (!teacherId) {
      return NextResponse.json(
        { success: false, error: 'Teacher ID required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizmaster');

    // Get teacher with assigned students
    const teacher = await db.collection('users').findOne(
      { _id: new ObjectId(teacherId) },
      { projection: { assignedStudents: 1 } }
    );

    if (!teacher || !teacher.assignedStudents?.length) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Get full student details
    const students = await db.collection('users').find({
      _id: { $in: teacher.assignedStudents.map((id: string) => new ObjectId(id)) }
    }).project({
      name: 1,
      email: 1,
      createdAt: 1
    }).toArray();

    return NextResponse.json({ success: true, data: students });

  } catch (error) {
    console.error('Error fetching assigned students:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}