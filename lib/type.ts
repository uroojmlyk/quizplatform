// export type UserRole = 'student' | 'teacher' | 'admin';

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//     password: string;
//   role: UserRole;
//   avatar?: string;
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
//   createdAt: string;
//   isPublished: boolean;
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








export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  // NEW FIELDS - Add these
  assignedStudents?: string[];  // For teachers: which students they teach
  assignedTeachers?: string[];  // For students: which teachers they follow
  classes?: string[];           // For students: which classes they're in
  createdAt?: Date;              // Add this if not exists
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
  createdByName?: string;        // Add this for display
  createdAt: string;
  isPublished: boolean;
  // NEW FIELDS - Add these
  visibility?: 'public' | 'private' | 'assigned';  // Control who can see quiz
  assignedTo?: string[];         // Array of student IDs (if visibility = 'assigned')
  classId?: string;               // If belongs to a class
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

// NEW INTERFACE - Add this at the bottom
export interface Class {
  id: string;
  name: string;
  description?: string;
  teacherId: string;
  teacherName?: string;
  students: string[];           // Array of student IDs
  quizzes: string[];             // Array of quiz IDs
  classCode: string;             // Unique code for joining (e.g., "CS101-2024")
  createdAt: Date;
}