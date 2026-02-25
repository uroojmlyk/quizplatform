export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
    password: string;
  role: UserRole;
  avatar?: string;
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
  createdAt: string;
  isPublished: boolean;
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