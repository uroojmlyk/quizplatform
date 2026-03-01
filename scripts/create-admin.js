const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://uroojr335_db_user:YOUR_PASSWORD@cluster0.rasbzhu.mongodb.net/quizDB?retryWrites=true&w=majority";

async function createAdmin() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('quizDB');
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const result = await db.collection('users').insertOne({
      name: 'Admin',
      email: 'admin@quizmaster.com',
      password: hashedPassword,
      role: 'admin',
      verified: true,
      createdAt: new Date()
    });
    
    console.log('✅ Admin created!');
    console.log('Email: admin@quizmaster.com');
    console.log('Password: Admin@123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

createAdmin();