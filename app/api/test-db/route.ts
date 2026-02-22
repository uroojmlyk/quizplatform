import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('⏳ Connecting to MongoDB...');
    
    const client = await clientPromise;
    const db = client.db('quizDB');
    
    // Test connection with ping
    await db.command({ ping: 1 });
    
    // Check if we can access collections
    const collections = await db.listCollections().toArray();
    
    console.log('✅ MongoDB connected successfully!');
    
    return NextResponse.json({ 
      success: true, 
      message: '✅ MongoDB connected successfully!',
      database: 'quizDB',
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: '❌ MongoDB connection failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}