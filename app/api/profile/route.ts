// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');

//     if (!userId || !ObjectId.isValid(userId)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user ID' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     const user = await db.collection('users').findOne(
//       { _id: new ObjectId(userId) },
//       { projection: { password: 0 } }
//     );

//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: {
//         id: user._id.toString(),
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         avatar: user.avatar || '',
//         createdAt: user.createdAt
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch profile' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: Request) {
//   try {
//     const body = await request.json();
//     const { userId, name, email, avatar } = body;

//     if (!userId || !ObjectId.isValid(userId)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid user ID' },
//         { status: 400 }
//       );
//     }

//     if (!name || !email) {
//       return NextResponse.json(
//         { success: false, error: 'Name and email are required' },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db('quizDB');

//     const result = await db.collection('users').updateOne(
//       { _id: new ObjectId(userId) },
//       { 
//         $set: { 
//           name, 
//           email, 
//           ...(avatar && { avatar }),
//           updatedAt: new Date() 
//         } 
//       }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Profile updated successfully'
//     });

//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to update profile' },
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
    const userId = searchParams.get('userId');

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    const user = await db.collection('users').findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        createdAt: user.createdAt,
        // NEW FIELDS
        assignedStudents: user.assignedStudents || [],
        assignedTeachers: user.assignedTeachers || [],
        classes: user.classes || []
      }
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, email, avatar, bio, location, website } = body;

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizDB');

    const updateData: any = { 
      name, 
      email,
      updatedAt: new Date() 
    };

    if (avatar !== undefined) updateData.avatar = avatar;
    if (bio !== undefined) updateData.bio = bio;
    if (location !== undefined) updateData.location = location;
    if (website !== undefined) updateData.website = website;

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}