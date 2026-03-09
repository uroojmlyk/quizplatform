// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db('quizDB');
    
//     const users = await db.collection('users')
//       .find({})
//       .project({ password: 0 }) // Password ko exclude karo
//       .toArray();
    
//     const formattedUsers = users.map(user => ({
//       id: user._id.toString(),
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       createdAt: user.createdAt
//     }));
    
//     return NextResponse.json({ 
//       success: true, 
//       data: formattedUsers,
//       count: formattedUsers.length 
//     });
    
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch users' },
//       { status: 500 }
//     );
//   }
// }    




import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role'); // Optional: filter by role

    const client = await clientPromise;
    const db = client.db('quizDB');
    
    const query: any = {};
    if (role) {
      query.role = role;
    }
    
    const users = await db.collection('users')
      .find(query)
      .project({ password: 0 }) // Password ko exclude karo
      .toArray();
    
    const formattedUsers = users.map(user => ({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || '',
      createdAt: user.createdAt,
      // NEW FIELDS (if they exist in DB)
      assignedStudents: user.assignedStudents || [],
      assignedTeachers: user.assignedTeachers || [],
      classes: user.classes || []
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: formattedUsers,
      count: formattedUsers.length 
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}