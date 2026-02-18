


// // lib/mockData.ts

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'student' | 'teacher';
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
//   createdByName: string;
//   createdAt: string;
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

// // ========== INITIAL DATA ==========
// const INITIAL_USERS: User[] = [
//   { id: '1', name: 'Alex Student', email: 'student@demo.com', role: 'student' },
//   { id: '2', name: 'Dr. Sarah Teacher', email: 'teacher@demo.com', role: 'teacher' },
//   { id: '3', name: 'John Student', email: 'john@demo.com', role: 'student' },
//   { id: '4', name: 'Emma Student', email: 'emma@demo.com', role: 'student' },
//   { id: '5', name: 'Mike Student', email: 'mike@demo.com', role: 'student' },
//     { id: '6', name: 'madie Student', email: 'mikeee@demo.com', role: 'student' },
// ];

// const INITIAL_QUIZZES: Quiz[] = [
//   {
//     id: '101',
//     title: 'JavaScript Fundamentals',
//     description: 'Test your JavaScript basics',
//     duration: 30,
//     totalMarks: 30,
//     questions: [
//       {
//         id: 'q1',
//         text: 'Which is NOT a JavaScript data type?',
//         options: ['String', 'Boolean', 'Integer', 'Object'],
//         correctOption: 2,
//         marks: 10
//       },{
//   id: 'q2',
//   text: 'Which method is used to convert JSON data into a JavaScript object?',
//   options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.toObject()'],
//   correctOption: 1,
//   marks: 10
// },
// {
//   id: 'q3',
//   text: 'Which keyword is used to declare a block-scoped variable?',
//   options: ['var', 'let', 'const', 'Both let and const'],
//   correctOption: 3,
//   marks: 10
// },
// {
//   id: 'q4',
//   text: 'What will typeof null return in JavaScript?',
//   options: ['null', 'object', 'undefined', 'string'],
//   correctOption: 1,
//   marks: 10
// },
// {
//   id: 'q5',
//   text: 'Which array method is used to add an element at the end?',
//   options: ['push()', 'pop()', 'shift()', 'unshift()'],
//   correctOption: 0,
//   marks: 10
// },
// {
//   id: 'q6',
//   text: 'Which symbol is used for strict equality comparison?',
//   options: ['==', '=', '===', '!='],
//   correctOption: 2,
//   marks: 10
// }

//     ],
//     createdBy: '2',
//     createdByName: 'Dr. Sarah Teacher',
//     createdAt: new Date().toISOString()
//   },
//   {
//     id: '102',
//     title: 'React Hooks',
//     description: 'Test your React knowledge',
//     duration: 20,
//     totalMarks: 20,
//     questions: [
//       {
//         id: 'q1',
//         text: 'Which hook is used for side effects?',
//         options: ['useState', 'useEffect', 'useContext', 'useReducer'],
//         correctOption: 1,
//         marks: 10
//       }
//     ],
//     createdBy: '2',
//     createdByName: 'Dr. Sarah Teacher',
//     createdAt: new Date().toISOString()
//   }
// ];

// // ========== LOCALSTORAGE KEYS ==========
// const STORAGE_KEYS = {
//   USERS: 'quiz_users',
//   QUIZZES: 'quiz_quizzes',
//   RESULTS: 'quiz_results'
// };

// // ========== INITIALIZE STORAGE ==========
// if (typeof window !== 'undefined') {
//   // Initialize users if not exists
//   if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
//     localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
//   }
  
//   // Initialize quizzes if not exists
//   if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
//     localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(INITIAL_QUIZZES));
//   }
  
//   // Initialize results if not exists
//   if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
//     localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify([]));
//   }
// }

// // ========== HELPER FUNCTIONS TO READ/WRITE DATA ==========

// // Get users from localStorage
// export const getUsers = (): User[] => {
//   if (typeof window === 'undefined') return [];
//   const data = localStorage.getItem(STORAGE_KEYS.USERS);
//   return data ? JSON.parse(data) : [];
// };

// // Get quizzes from localStorage
// export const getQuizzes = (): Quiz[] => {
//   if (typeof window === 'undefined') return [];
//   const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
//   return data ? JSON.parse(data) : [];
// };

// // Get results from localStorage
// export const getResults = (): Result[] => {
//   if (typeof window === 'undefined') return [];
//   const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
//   return data ? JSON.parse(data) : [];
// };

// // Save users
// export const saveUsers = (users: User[]) => {
//   if (typeof window === 'undefined') return;
//   localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
// };

// // Save quizzes
// export const saveQuizzes = (quizzes: Quiz[]) => {
//   if (typeof window === 'undefined') return;
//   localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
// };

// // Save results
// export const saveResults = (results: Result[]) => {
//   if (typeof window === 'undefined') return;
//   localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
// };

// // ========== USER FUNCTIONS ==========

// // Find user by email (for login)
// export const findUserByEmail = (email: string): User | undefined => {
//   const users = getUsers();
//   return users.find(u => u.email === email);
// };

// // Get user by ID
// export const getUserById = (id: string): User | undefined => {
//   const users = getUsers();
//   return users.find(u => u.id === id);
// };

// // Add new user (signup)
// export const addUser = (user: Omit<User, 'id'>): User => {
//   const users = getUsers();
//   const newUser = {
//     ...user,
//     id: Date.now().toString()
//   };
//   users.push(newUser);
//   saveUsers(users);
//   return newUser;
// };

// // ========== QUIZ FUNCTIONS ==========

// // Get quiz by ID
// export const getQuizById = (id: string): Quiz | undefined => {
//   const quizzes = getQuizzes();
//   return quizzes.find(q => q.id === id);
// };

// // Get quizzes by teacher ID
// export const getQuizzesByTeacher = (teacherId: string): Quiz[] => {
//   const quizzes = getQuizzes();
//   return quizzes.filter(q => q.createdBy === teacherId);
// };

// // Create new quiz
// export const createQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>): Quiz => {
//   const quizzes = getQuizzes();
//   const newQuiz = {
//     ...quiz,
//     id: Date.now().toString(),
//     createdAt: new Date().toISOString()
//   };
//   quizzes.push(newQuiz);
//   saveQuizzes(quizzes);
//   return newQuiz;
// };

// // ========== RESULT FUNCTIONS ==========

// // Save result
// export const saveResult = (result: Omit<Result, 'id'>): Result => {
//   const results = getResults();
//   const newResult = {
//     ...result,
//     id: Date.now().toString()
//   };
//   results.push(newResult);
//   saveResults(results);
//   return newResult;
// };

// // Get results by user ID (student ke apne results)
// export const getResultsByUser = (userId: string): Result[] => {
//   const results = getResults();
//   return results.filter(r => r.userId === userId);
// };

// // Get results by quiz ID
// export const getResultsByQuiz = (quizId: string): Result[] => {
//   const results = getResults();
//   return results.filter(r => r.quizId === quizId);
// };

// // Get teacher results (results for teacher's quizzes)
// export const getTeacherResults = (teacherId: string): Result[] => {
//   const quizzes = getQuizzesByTeacher(teacherId);
//   const quizIds = quizzes.map(q => q.id);
//   const results = getResults();
//   return results.filter(r => quizIds.includes(r.quizId));
// };

// // Get available quizzes for student (jo abhi tak nahi diye)
// export const getAvailableQuizzesForStudent = (studentId: string): Quiz[] => {
//   const results = getResultsByUser(studentId);
//   const attemptedQuizIds = results.map(r => r.quizId);
//   const quizzes = getQuizzes();
//   return quizzes.filter(q => !attemptedQuizIds.includes(q.id));
// }; 




// lib/mockData.ts

export interface User {
  id?: string;    
  name: string;
  email: string;
  role: 'student' | 'teacher';
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
  createdByName: string;
  createdAt: string;
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

// ========== INITIAL DATA ==========
const INITIAL_USERS: User[] = [
  { id: '1', name: 'Alex Student', email: 'student@demo.com', role: 'student' },
  { id: '2', name: 'Dr. Sarah Teacher', email: 'teacher@demo.com', role: 'teacher' },
  { id: '3', name: 'John Student', email: 'john@demo.com', role: 'student' },
  { id: '4', name: 'Emma Student', email: 'emma@demo.com', role: 'student' },
  { id: '5', name: 'Mike Student', email: 'mike@demo.com', role: 'student' },
];

const INITIAL_QUIZZES: Quiz[] = [
  {
    id: '101',
    title: 'JavaScript Fundamentals',
    description: 'Test your JavaScript basics - variables, functions, loops',
    duration: 30,
    totalMarks: 30,
    questions: [
      {
        id: 'q1',
        text: 'Which is NOT a JavaScript data type?',
        options: ['String', 'Boolean', 'Integer', 'Object'],
        correctOption: 2,
        marks: 10
      },
      {
        id: 'q2',
        text: 'What will "2" + 2 return?',
        options: ['4', '"22"', '22', 'Error'],
        correctOption: 1,
        marks: 10
      },
      {
        id: 'q3',
        text: 'Which method adds elements at the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctOption: 0,
        marks: 10
      }
    ],
    createdBy: '2',
    createdByName: 'Dr. Sarah Teacher',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_RESULTS: Result[] = [
  {
    id: '201',
    quizId: '101',
    quizTitle: 'JavaScript Fundamentals',
    userId: '1',
    userName: 'Alex Student',
    score: 25,
    totalMarks: 30,
    percentage: 83,
    submittedAt: new Date().toISOString()
  }
];

// ========== STORAGE KEYS ==========
const STORAGE_KEYS = {
  USERS: 'quiz_users',
  QUIZZES: 'quiz_quizzes',
  RESULTS: 'quiz_results'
};

// ========== INITIALIZE STORAGE ==========
if (typeof window !== 'undefined') {
  // Initialize users if not exists
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  
  // Initialize quizzes if not exists
  if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(INITIAL_QUIZZES));
  }
  
  // Initialize results if not exists
  if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(INITIAL_RESULTS));
  }
}

// ========== READ FUNCTIONS ==========
export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const getQuizzes = (): Quiz[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  return data ? JSON.parse(data) : [];
};

export const getResults = (): Result[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
  return data ? JSON.parse(data) : [];
};

// ========== WRITE FUNCTIONS ==========
export const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const saveQuizzes = (quizzes: Quiz[]) => {
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
};

export const saveResults = (results: Result[]) => {
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
};

// ========== USER FUNCTIONS ==========
export const findUserByEmail = (email: string): User | undefined => {
  return getUsers().find(u => u.email === email);
};

export const getUserById = (id: string): User | undefined => {
  return getUsers().find(u => u.id === id);
};

export const addUser = (user: Omit<User, 'id'>): User => {
  const users = getUsers();
  const newUser = { 
    ...user, 
    id: Date.now().toString() 
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// ========== QUIZ FUNCTIONS ==========
export const getQuizById = (id: string): Quiz | undefined => {
  return getQuizzes().find(q => q.id === id);
};

export const getQuizzesByTeacher = (teacherId: string): Quiz[] => {
  return getQuizzes().filter(q => q.createdBy === teacherId);
};

export const createQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>): Quiz => {
  const quizzes = getQuizzes();
  const newQuiz = {
    ...quiz,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  quizzes.push(newQuiz);
  saveQuizzes(quizzes);
  console.log('Quiz saved:', newQuiz); // Debug
  return newQuiz;
};

export const updateQuiz = (quizId: string, updatedQuiz: Partial<Quiz>): Quiz | undefined => {
  const quizzes = getQuizzes();
  const index = quizzes.findIndex(q => q.id === quizId);
  if (index !== -1) {
    quizzes[index] = { ...quizzes[index], ...updatedQuiz };
    saveQuizzes(quizzes);
    console.log('Quiz updated:', quizzes[index]); // Debug
    return quizzes[index];
  }
  return undefined;
};

export const deleteQuiz = (quizId: string): boolean => {
  const quizzes = getQuizzes().filter(q => q.id !== quizId);
  saveQuizzes(quizzes);
  console.log('Quiz deleted:', quizId); // Debug
  return true;
};

// ========== RESULT FUNCTIONS ==========
export const saveResult = (result: Omit<Result, 'id'>): Result => {
  const results = getResults();
  const newResult = { 
    ...result, 
    id: Date.now().toString() 
  };
  results.push(newResult);
  saveResults(results);
  console.log('Result saved:', newResult); // Debug
  return newResult;
};

export const getResultsByUser = (userId: string): Result[] => {
  return getResults().filter(r => r.userId === userId);
};

export const getResultsByQuiz = (quizId: string): Result[] => {
  return getResults().filter(r => r.quizId === quizId);
};

export const getTeacherResults = (teacherId: string): Result[] => {
  const teacherQuizzes = getQuizzesByTeacher(teacherId).map(q => q.id);
  return getResults().filter(r => teacherQuizzes.includes(r.quizId));
};

export const getAvailableQuizzesForStudent = (studentId: string): Quiz[] => {
  const attemptedQuizIds = getResultsByUser(studentId).map(r => r.quizId);
  return getQuizzes().filter(q => !attemptedQuizIds.includes(q.id));
};

export const hasAttemptedQuiz = (studentId: string, quizId: string): boolean => {
  return getResultsByUser(studentId).some(r => r.quizId === quizId);
};

// ========== UTILITY FUNCTIONS ==========
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.QUIZZES);
  localStorage.removeItem(STORAGE_KEYS.RESULTS);
  // Reinitialize
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(INITIAL_QUIZZES));
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(INITIAL_RESULTS));
  console.log('All data reset to initial state');
};