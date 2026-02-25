// // lib/dbOperations.ts
// import clientPromise from './mongodb';
// import { User, Quiz, Result } from './types';

// // ========== DATABASE CONNECTION ==========
// const dbName = 'quizDB';
// const collections = {
//   users: 'users',
//   quizzes: 'quizzes',
//   results: 'results'
// };

// // ========== USER OPERATIONS ==========
// export async function createUser(user: Omit<User, 'id'>): Promise<User> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const newUser = {
//     ...user,
//     createdAt: new Date()
//   };
  
//   const result = await db.collection(collections.users).insertOne(newUser);
//   return { ...newUser, id: result.insertedId.toString() } as User;
// }

// export async function findUserByEmail(email: string): Promise<User | null> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const user = await db.collection(collections.users).findOne({ email });
//   if (!user) return null;
  
//   return {
//     id: user._id.toString(),
//     name: user.name,
//     email: user.email,
//     role: user.role
//   };
// }

// export async function getUserById(id: string): Promise<User | null> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const user = await db.collection(collections.users).findOne({ _id: new ObjectId(id) });
//   if (!user) return null;
  
//   return {
//     id: user._id.toString(),
//     name: user.name,
//     email: user.email,
//     role: user.role
//   };
// }

// // ========== QUIZ OPERATIONS ==========
// export async function createQuiz(quiz: Omit<Quiz, 'id' | 'createdAt'>): Promise<Quiz> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const newQuiz = {
//     ...quiz,
//     createdAt: new Date()
//   };
  
//   const result = await db.collection(collections.quizzes).insertOne(newQuiz);
//   return { ...newQuiz, id: result.insertedId.toString() } as Quiz;
// }

// export async function getAllQuizzes(): Promise<Quiz[]> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const quizzes = await db.collection(collections.quizzes).find({}).toArray();
//   return quizzes.map(q => ({
//     id: q._id.toString(),
//     title: q.title,
//     description: q.description,
//     duration: q.duration,
//     totalMarks: q.totalMarks,
//     questions: q.questions,
//     createdBy: q.createdBy,
//     createdAt: q.createdAt,
//     isPublished: q.isPublished
//   }));
// }

// export async function getQuizById(id: string): Promise<Quiz | null> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const quiz = await db.collection(collections.quizzes).findOne({ _id: new ObjectId(id) });
//   if (!quiz) return null;
  
//   return {
//     id: quiz._id.toString(),
//     title: quiz.title,
//     description: quiz.description,
//     duration: quiz.duration,
//     totalMarks: quiz.totalMarks,
//     questions: quiz.questions,
//     createdBy: quiz.createdBy,
//     createdAt: quiz.createdAt,
//     isPublished: quiz.isPublished
//   };
// }

// export async function getQuizzesByTeacher(teacherId: string): Promise<Quiz[]> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const quizzes = await db.collection(collections.quizzes).find({ createdBy: teacherId }).toArray();
//   return quizzes.map(q => ({
//     id: q._id.toString(),
//     title: q.title,
//     description: q.description,
//     duration: q.duration,
//     totalMarks: q.totalMarks,
//     questions: q.questions,
//     createdBy: q.createdBy,
//     createdAt: q.createdAt,
//     isPublished: q.isPublished
//   }));
// }

// // ========== RESULT OPERATIONS ==========
// export async function saveResult(result: Omit<Result, 'id'>): Promise<Result> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const newResult = {
//     ...result,
//     submittedAt: new Date()
//   };
  
//   const dbResult = await db.collection(collections.results).insertOne(newResult);
//   return { ...newResult, id: dbResult.insertedId.toString() } as Result;
// }

// export async function getResultsByUser(userId: string): Promise<Result[]> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const results = await db.collection(collections.results).find({ userId }).toArray();
//   return results.map(r => ({
//     id: r._id.toString(),
//     quizId: r.quizId,
//     quizTitle: r.quizTitle,
//     userId: r.userId,
//     userName: r.userName,
//     score: r.score,
//     totalMarks: r.totalMarks,
//     percentage: r.percentage,
//     submittedAt: r.submittedAt
//   }));
// }

// export async function getResultsByQuiz(quizId: string): Promise<Result[]> {
//   const client = await clientPromise;
//   const db = client.db(dbName);
  
//   const results = await db.collection(collections.results).find({ quizId }).toArray();
//   return results.map(r => ({
//     id: r._id.toString(),
//     quizId: r.quizId,
//     quizTitle: r.quizTitle,
//     userId: r.userId,
//     userName: r.userName,
//     score: r.score,
//     totalMarks: r.totalMarks,
//     percentage: r.percentage,
//     submittedAt: r.submittedAt
//   }));
// }

// export async function getAvailableQuizzesForStudent(studentId: string): Promise<Quiz[]> {
//   const attemptedResults = await getResultsByUser(studentId);
//   const attemptedQuizIds = attemptedResults.map(r => r.quizId);
  
//   const allQuizzes = await getAllQuizzes();
//   return allQuizzes.filter(q => !attemptedQuizIds.includes(q.id));
// }





// lib/dbOperations.ts
import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';
import { User, Quiz, Result } from './type';  // ✅ Fixed: './type' instead of './types'

// ========== DATABASE CONNECTION ==========
const dbName = 'quizDB';
const collections = {
  users: 'users',
  quizzes: 'quizzes',
  results: 'results'
};

// ========== USER OPERATIONS ==========
export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const newUser = {
    name: user.name,
    email: user.email,
    password: user.password,  // Add this if you have password field
    role: user.role,
    createdAt: new Date()
  };
  
  const result = await db.collection(collections.users).insertOne(newUser);
  return { 
    id: result.insertedId.toString(), 
    name: user.name,
    email: user.email,
    role: user.role
  } as User;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const user = await db.collection(collections.users).findOne({ email });
  if (!user) return null;
  
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  if (!ObjectId.isValid(id)) return null;
  
  const user = await db.collection(collections.users).findOne({ _id: new ObjectId(id) });
  if (!user) return null;
  
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role
  };
}

// ========== QUIZ OPERATIONS ==========
export async function createQuiz(quiz: Omit<Quiz, 'id' | 'createdAt'>): Promise<Quiz> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const newQuiz = {
    ...quiz,
    createdAt: new Date().toISOString()
  };
  
  const result = await db.collection(collections.quizzes).insertOne(newQuiz);
  return { ...newQuiz, id: result.insertedId.toString() } as Quiz;
}

export async function getAllQuizzes(): Promise<Quiz[]> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const quizzes = await db.collection(collections.quizzes).find({}).toArray();
  return quizzes.map(q => ({
    id: q._id.toString(),
    title: q.title,
    description: q.description,
    duration: q.duration,
    totalMarks: q.totalMarks,
    questions: q.questions,
    createdBy: q.createdBy,
    createdAt: q.createdAt,
    isPublished: q.isPublished
  }));
}

export async function getQuizById(id: string): Promise<Quiz | null> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  if (!ObjectId.isValid(id)) return null;
  
  const quiz = await db.collection(collections.quizzes).findOne({ _id: new ObjectId(id) });
  if (!quiz) return null;
  
  return {
    id: quiz._id.toString(),
    title: quiz.title,
    description: quiz.description,
    duration: quiz.duration,
    totalMarks: quiz.totalMarks,
    questions: quiz.questions,
    createdBy: quiz.createdBy,
    createdAt: quiz.createdAt,
    isPublished: quiz.isPublished
  };
}

export async function getQuizzesByTeacher(teacherId: string): Promise<Quiz[]> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const quizzes = await db.collection(collections.quizzes)
    .find({ createdBy: teacherId })
    .sort({ createdAt: -1 })
    .toArray();
    
  return quizzes.map(q => ({
    id: q._id.toString(),
    title: q.title,
    description: q.description,
    duration: q.duration,
    totalMarks: q.totalMarks,
    questions: q.questions,
    createdBy: q.createdBy,
    createdAt: q.createdAt,
    isPublished: q.isPublished
  }));
}

// ========== RESULT OPERATIONS ==========
export async function saveResult(result: Omit<Result, 'id'>): Promise<Result> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const newResult = {
    ...result,
    submittedAt: new Date().toISOString()
  };
  
  const dbResult = await db.collection(collections.results).insertOne(newResult);
  return { ...newResult, id: dbResult.insertedId.toString() } as Result;
}

export async function getResultsByUser(userId: string): Promise<Result[]> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const results = await db.collection(collections.results)
    .find({ userId })
    .sort({ submittedAt: -1 })
    .toArray();
    
  return results.map(r => ({
    id: r._id.toString(),
    quizId: r.quizId,
    quizTitle: r.quizTitle,
    userId: r.userId,
    userName: r.userName,
    score: r.score,
    totalMarks: r.totalMarks,
    percentage: r.percentage,
    submittedAt: r.submittedAt
  }));
}

export async function getResultsByQuiz(quizId: string): Promise<Result[]> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const results = await db.collection(collections.results)
    .find({ quizId })
    .sort({ percentage: -1 })
    .toArray();
    
  return results.map(r => ({
    id: r._id.toString(),
    quizId: r.quizId,
    quizTitle: r.quizTitle,
    userId: r.userId,
    userName: r.userName,
    score: r.score,
    totalMarks: r.totalMarks,
    percentage: r.percentage,
    submittedAt: r.submittedAt
  }));
}

export async function getAvailableQuizzesForStudent(studentId: string): Promise<Quiz[]> {
  const attemptedResults = await getResultsByUser(studentId);
  const attemptedQuizIds = attemptedResults.map(r => r.quizId);
  
  const allQuizzes = await getAllQuizzes();
  return allQuizzes.filter(q => !attemptedQuizIds.includes(q.id));
}

export async function checkAttempted(userId: string, quizId: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const result = await db.collection(collections.results).findOne({ userId, quizId });
  return !!result;
}

export async function getTeacherResults(teacherId: string): Promise<Result[]> {
  // First get all quizzes by this teacher
  const quizzes = await getQuizzesByTeacher(teacherId);
  const quizIds = quizzes.map(q => q.id);
  
  if (quizIds.length === 0) return [];
  
  const client = await clientPromise;
  const db = client.db(dbName);
  
  const results = await db.collection(collections.results)
    .find({ quizId: { $in: quizIds } })
    .sort({ submittedAt: -1 })
    .toArray();
    
  return results.map(r => ({
    id: r._id.toString(),
    quizId: r.quizId,
    quizTitle: r.quizTitle,
    userId: r.userId,
    userName: r.userName,
    score: r.score,
    totalMarks: r.totalMarks,
    percentage: r.percentage,
    submittedAt: r.submittedAt
  }));
}