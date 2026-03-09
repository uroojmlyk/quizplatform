


// export type UserRole = 'student' | 'teacher' | 'admin';

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: UserRole;
//   avatar?: string;
//   // NEW FIELDS - Add these
//   assignedStudents?: string[];  // For teachers: which students they teach
//   assignedTeachers?: string[];  // For students: which teachers they follow
//   classes?: string[];           // For students: which classes they're in
//   createdAt?: Date;              // Add this if not exists
// }

// export interface Question {
//   id: string;
//   text: string;
//   options: string[];
//   correctOption: number;
//   marks: number;
// }

// export interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: Question[];
//   createdBy: string;
//   createdByName?: string;        // Add this for display
//   createdAt: string;
//   isPublished: boolean;
//   // NEW FIELDS - Add these
//   visibility?: 'public' | 'private' | 'assigned';  // Control who can see quiz
//   assignedTo?: string[];         // Array of student IDs (if visibility = 'assigned')
//   classId?: string;               // If belongs to a class
// }

// export interface Result {
//   id: string;
//   quizId: string;
//   quizTitle: string;
//   userId: string;
//   userName: string;
//   score: number;
//   totalMarks: number;
//   percentage: number;
//   submittedAt: string;
// }

// // NEW INTERFACE - Add this at the bottom
// export interface Class {
//   id: string;
//   name: string;
//   description?: string;
//   teacherId: string;
//   teacherName?: string;
//   students: string[];           // Array of student IDs
//   quizzes: string[];             // Array of quiz IDs
//   classCode: string;             // Unique code for joining (e.g., "CS101-2024")
//   createdAt: Date;
// }






export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  // Teacher/Student relationships
  assignedStudents?: string[];  // For teachers: which students they teach
  assignedTeachers?: string[];  // For students: which teachers they follow
  classes?: string[];           // For students: which classes they're in
  createdAt?: Date;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: Question[];
  createdBy: string;
  createdByName?: string;
  createdAt: string;
  isPublished: boolean;
  // Visibility control
  visibility?: 'public' | 'private' | 'assigned';
  assignedTo?: string[];         // Array of student IDs (if visibility = 'assigned')
  classId?: string;
  
  // ✅ NEW: Shareable link fields
  shareableLinks?: {
    publicId: string;             // Unique ID for public link (e.g., "abc123xyz7")
    isPublic: boolean;            // Can be accessed without login?
    allowAnonymous: boolean;       // Anonymous submissions allowed?
    expiresAt?: string;            // Link expiry date (ISO string)
    maxAttempts?: number;          // Max attempts per link
    currentAttempts?: number;      // Current number of attempts
    createdAt: string;             // When link was created
  }
}

export interface Result {
  id: string;
  quizId: string;
  quizTitle: string;
  userId: string;
  userName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
}

// ✅ NEW: Anonymous result interface
export interface AnonymousResult {
  id: string;
  quizId: string;                 // This will be publicId from shareableLinks
  quizTitle: string;
  participantName?: string;        // Optional name (if anonymous allowed)
  participantEmail?: string;       // Optional email
  score: number;
  totalMarks: number;
  percentage: number;
  answers: {
    questionIndex: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  submittedAt: string;
  isAnonymous: boolean;
}

export interface Class {
  id: string;
  name: string;
  description?: string;
  teacherId: string;
  teacherName?: string;
  students: string[];           // Array of student IDs
  quizzes: string[];            // Array of quiz IDs
  classCode: string;            // Unique code for joining (e.g., "CS101-2024")
  createdAt: Date;
}