

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { 
//   PlusCircle, 
//   Edit, 
//   Trash2, 
//   LogOut, 
//   Sparkles,
//   Users,
//   BarChart3,
//   Clock,
//   Award,
//   TrendingUp,
//   ChevronRight,
//   FileText,
//   Loader2,
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface Quiz {
//   _id: string;
//   id?: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: any[];
//   createdAt: string;
// }

// interface Result {
//   _id: string;
//   quizId: string;
//   quizTitle: string;
//   userName: string;
//   score: number;
//   totalMarks: number;
//   percentage: number;
//   submittedAt: string;
// }

// export default function TeacherDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [results, setResults] = useState<Result[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(storedUser);
//     if (userData.role !== 'teacher') {
//       router.push('/dashboard');
//       return;
//     }

//     setUser(userData);
//     fetchData(userData.id || userData._id);
//   }, [router]);

//   const fetchData = async (teacherId: string) => {
//     try {
//       setLoading(true);
      
//       const [quizzesRes, resultsRes] = await Promise.all([
//         fetch(`/api/quizzes/teacher/${teacherId}`),
//         fetch(`/api/results/teacher/${teacherId}`)
//       ]);

//       const quizzesData = await quizzesRes.json();
//       const resultsData = await resultsRes.json();

//       if (quizzesData.success) {
//         setQuizzes(quizzesData.data);
//       }

//       if (resultsData.success) {
//         setResults(resultsData.data);
//       }

//       showToast.success('Dashboard updated');
//     } catch (error) {
//       showToast.error('Failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditQuiz = (quiz: Quiz) => {
//     const quizId = quiz._id || quiz.id;
//     console.log('🔍 Editing quiz:', quiz);
//     console.log('🔍 Using quizId:', quizId);
    
//     if (!quizId) {
//       showToast.error('Quiz ID not found');
//       return;
//     }
    
//     router.push(`/teacher/edit-quiz/${quizId}`);
//   };

//   const handleDeleteQuiz = async (quizId: string, quizTitle: string) => {
//     if (!confirm(`Are you sure you want to delete "${quizTitle}"? This action cannot be undone.`)) {
//       return;
//     }

//     setDeletingId(quizId);
    
//     try {
//       const res = await fetch(`/api/quizzes/${quizId}`, {
//         method: 'DELETE',
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setQuizzes(quizzes.filter(q => (q._id !== quizId && q.id !== quizId)));
//         showToast.success('Quiz deleted successfully');
//       } else {
//         showToast.error(data.error || 'Failed to delete quiz');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     showToast.success('Logged out successfully');
//     router.push('/login');
//   };

//   // Calculate statistics
//   const totalQuizzes = quizzes.length;
//   const totalStudents = results.length ? new Set(results.map(r => r.userName)).size : 0;
//   const totalSubmissions = results.length;
//   const averageScore = results.length 
//     ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
//     : 0;

//   const stats = [
//     { 
//       title: 'Total Quizzes', 
//       value: totalQuizzes, 
//       icon: FileText, 
//       change: 'Created by you',
//       gradient: 'from-blue-500 to-cyan-500',
//       bg: 'bg-blue-500/10',
//       text: 'text-blue-400'
//     },
//     { 
//       title: 'Total Students', 
//       value: totalStudents, 
//       icon: Users, 
//       change: 'Attempted quizzes',
//       gradient: 'from-green-500 to-emerald-500',
//       bg: 'bg-green-500/10',
//       text: 'text-green-400'
//     },
//     { 
//       title: 'Submissions', 
//       value: totalSubmissions, 
//       icon: BarChart3, 
//       change: 'Total attempts',
//       gradient: 'from-purple-500 to-pink-500',
//       bg: 'bg-purple-500/10',
//       text: 'text-purple-400'
//     },
//     { 
//       title: 'Avg Score', 
//       value: `${averageScore}%`, 
//       icon: TrendingUp, 
//       change: averageScore >= 70 ? 'Good performance' : 'Needs improvement',
//       gradient: 'from-orange-500 to-red-500',
//       bg: 'bg-orange-500/10',
//       text: 'text-orange-400'
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
      
//       {/* Animated Background */}
//       <div className="fixed inset-0">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16 sm:h-20">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
//                   <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 </div>
//                 <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                   Teacher Dashboard
//                 </span>
//               </div>

//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#1a1a23] rounded-xl border border-[#2a2a35]">
//                   <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
//                     {user?.name?.charAt(0) || 'T'}
//                   </div>
//                   <div className="hidden sm:block">
//                     <p className="text-sm font-medium text-white">{user?.name}</p>
//                     <p className="text-xs text-gray-400">Teacher</p>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 sm:p-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
//                   title="Logout"
//                 >
//                   <LogOut className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           {/* Welcome Section */}
//           <div className="relative mb-6 sm:mb-8 group">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
//             <div className="relative bg-gradient-to-r from-[#1a1a23] to-[#111117] border border-[#2a2a35] rounded-2xl p-4 sm:p-6 overflow-hidden">
//               <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
//               <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div>
//                   <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
//                     Welcome back, {user?.name}! 👋
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-400">
//                     Manage your quizzes and track student performance
//                   </p>
//                 </div>
//                 <button 
//                   onClick={() => router.push('/teacher/create-quiz')}
//                   className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 w-full sm:w-auto"
//                 >
//                   <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
//                   Create New Quiz
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={`stat-${index}`}
//                 className="group relative"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl"
//                      style={{ background: `linear-gradient(to right, ${stat.gradient})` }}></div>
//                 <div className="relative bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5 hover:border-transparent transition-all">
//                   <div className="flex items-center justify-between mb-2 sm:mb-3">
//                     <div className={`p-2 sm:p-2.5 ${stat.bg} rounded-lg`}>
//                       <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.text}`} />
//                     </div>
//                     <span className="text-[10px] sm:text-xs text-gray-500">{stat.change}</span>
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-400">{stat.title}</p>
//                   <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Quizzes and Results Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* My Quizzes */}
//             <div className="lg:col-span-2">
//               <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//                 <div className="p-4 sm:p-5 border-b border-[#2a2a35] flex justify-between items-center">
//                   <div>
//                     <h2 className="text-base sm:text-lg font-semibold text-white">My Quizzes</h2>
//                     <p className="text-xs sm:text-sm text-gray-400 mt-1">
//                       {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} created
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => router.push('/teacher/create-quiz')}
//                     className="flex items-center gap-1 px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600 border border-purple-600/20 hover:border-purple-500 rounded-lg text-purple-400 hover:text-white transition-all text-xs sm:text-sm"
//                   >
//                     <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span className="hidden sm:inline">New Quiz</span>
//                   </button>
//                 </div>
                
//                 {quizzes.length === 0 ? (
//                   <div className="p-8 sm:p-10 text-center">
//                     <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3" />
//                     <p className="text-sm sm:text-base text-gray-400 mb-2">No quizzes yet</p>
//                     <button
//                       onClick={() => router.push('/teacher/create-quiz')}
//                       className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
//                     >
//                       Create your first quiz →
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-[#2a2a35]">
//                     {quizzes.map((quiz) => {
//                       const quizResults = results.filter(r => r.quizId === quiz._id);
//                       const avgScore = quizResults.length
//                         ? Math.round(quizResults.reduce((acc, r) => acc + r.percentage, 0) / quizResults.length)
//                         : 0;

//                       return (
//                         <div key={`quiz-${quiz._id || quiz.id}`} className="p-4 sm:p-5 hover:bg-[#1a1a23] transition-colors group">
//                           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-purple-400 transition-colors">
//                                   {quiz.title}
//                                 </h3>
//                                 <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
//                                   quizResults.length > 0
//                                     ? 'bg-green-500/20 text-green-400 border border-green-500/30'
//                                     : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
//                                 }`}>
//                                   {quizResults.length} attempt{quizResults.length !== 1 ? 's' : ''}
//                                 </span>
//                               </div>
//                               <p className="text-xs sm:text-sm text-gray-400 line-clamp-1 mb-2">
//                                 {quiz.description}
//                               </p>
//                               <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
//                                 <span className="flex items-center gap-1">
//                                   <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {quiz.duration} mins
//                                 </span>
//                                 <span>•</span>
//                                 <span>{quiz.questions?.length || 0} questions</span>
//                                 <span>•</span>
//                                 <span>{quiz.totalMarks} marks</span>
//                                 {quizResults.length > 0 && (
//                                   <>
//                                     <span>•</span>
//                                     <span className="text-purple-400">Avg: {avgScore}%</span>
//                                   </>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => handleEditQuiz(quiz)}
//                                 className="p-2 hover:bg-[#252530] rounded-lg transition-colors group/edit"
//                                 title="Edit Quiz"
//                               >
//                                 <Edit className="w-4 h-4 text-gray-400 group-hover/edit:text-blue-400" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteQuiz(quiz._id, quiz.title)}
//                                 disabled={deletingId === quiz._id}
//                                 className="p-2 hover:bg-[#252530] rounded-lg transition-colors group/delete"
//                                 title="Delete Quiz"
//                               >
//                                 {deletingId === quiz._id ? (
//                                   <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
//                                 ) : (
//                                   <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-400" />
//                                 )}
//                               </button>
//                               <button
//                                 onClick={() => router.push(`/teacher/quiz-results/${quiz._id}`)}
//                                 className="flex items-center gap-1 px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600 border border-purple-600/20 hover:border-purple-500 rounded-lg text-purple-400 hover:text-white transition-all text-xs"
//                               >
//                                 <span>Details</span>
//                                 <ChevronRight className="w-3 h-3" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Recent Results */}
//             <div>
//               <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5">
//                 <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
//                   <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                   Recent Results
//                 </h3>
                
//                 {results.length === 0 ? (
//                   <div className="text-center py-4 sm:py-6">
//                     <Award className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 mx-auto mb-2" />
//                     <p className="text-xs sm:text-sm text-gray-400">No results yet</p>
//                     <p className="text-xs text-gray-500 mt-1">Students haven't taken any quizzes</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-2 sm:space-y-3">
//                     {results.slice(0, 5).map((result, index) => (
//                       <div key={`result-${result._id || index}`} className="flex items-center justify-between p-2 sm:p-3 bg-[#1a1a23] rounded-lg hover:bg-[#252530] transition-colors">
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2 mb-1">
//                             <p className="text-xs sm:text-sm font-medium text-white truncate">
//                               {result.userName}
//                             </p>
//                             <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${
//                               result.percentage >= 70 
//                                 ? 'bg-green-500/20 text-green-400 border border-green-500/30'
//                                 : result.percentage >= 40
//                                 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
//                                 : 'bg-red-500/20 text-red-400 border border-red-500/30'
//                             }`}>
//                               {result.percentage >= 70 ? 'Good' : result.percentage >= 40 ? 'Avg' : 'Poor'}
//                             </span>
//                           </div>
//                           <p className="text-[10px] sm:text-xs text-gray-400 truncate">
//                             {result.quizTitle}
//                           </p>
//                           <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">
//                             {new Date(result.submittedAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <div className="ml-2 text-right">
//                           <div className={`text-xs sm:text-sm font-bold ${
//                             result.percentage >= 70 
//                               ? 'text-green-400' 
//                               : result.percentage >= 40
//                               ? 'text-yellow-400'
//                               : 'text-red-400'
//                           }`}>
//                             {result.score}/{result.totalMarks}
//                           </div>
//                           <div className="text-[8px] sm:text-[10px] text-gray-500">
//                             {result.percentage}%
//                           </div>
//                         </div>
//                       </div>
//                     ))}
                    
//                     {results.length > 5 && (
//                       <button 
//                         onClick={() => router.push('/teacher/all-results')}
//                         className="w-full mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors text-center py-2"
//                       >
//                         View all {results.length} results →
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.5; }
//           50% { opacity: 1; }
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//       `}</style>
//     </div>
//   );
// }















'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  LogOut, 
  Sparkles,
  Users,
  BarChart3,
  Clock,
  Award,
  TrendingUp,
  ChevronRight,
  FileText,
  Loader2,
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface Quiz {
  _id: string;
  id?: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: any[];
  createdAt: string;
}

interface Result {
  _id: string;
  quizId: string;
  quizTitle: string;
  userName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.role !== 'teacher') {
      router.push('/dashboard');
      return;
    }

    setUser(userData);
    fetchData(userData.id || userData._id);
  }, [router]);

  const fetchData = async (teacherId: string) => {
    try {
      setLoading(true);
      
      const [quizzesRes, resultsRes] = await Promise.all([
        fetch(`/api/quizzes/teacher/${teacherId}`),
        fetch(`/api/results/teacher/${teacherId}`)
      ]);

      const quizzesData = await quizzesRes.json();
      const resultsData = await resultsRes.json();

      if (quizzesData.success) {
        setQuizzes(quizzesData.data);
      }

      if (resultsData.success) {
        setResults(resultsData.data);
      }

      showToast.success('Dashboard updated');
    } catch (error) {
      showToast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleEditQuiz = (quiz: Quiz) => {
    const quizId = quiz._id || quiz.id;
    console.log('🔍 Editing quiz:', quiz);
    console.log('🔍 Using quizId:', quizId);
    
    if (!quizId) {
      showToast.error('Quiz ID not found');
      return;
    }
    
    router.push(`/teacher/edit-quiz/${quizId}`);
  };

  const handleDeleteQuiz = async (quizId: string, quizTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${quizTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(quizId);
    
    try {
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setQuizzes(quizzes.filter(q => (q._id !== quizId && q.id !== quizId)));
        showToast.success('Quiz deleted successfully');
      } else {
        showToast.error(data.error || 'Failed to delete quiz');
      }
    } catch (error) {
      showToast.error('Network error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast.success('Logged out successfully');
    router.push('/login');
  };

  // Calculate statistics
  const totalQuizzes = quizzes.length;
  const totalStudents = results.length ? new Set(results.map(r => r.userName)).size : 0;
  const totalSubmissions = results.length;
  const averageScore = results.length 
    ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
    : 0;

  const stats = [
    { 
      title: 'Total Quizzes', 
      value: totalQuizzes, 
      icon: FileText, 
      change: 'Created by you',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400'
    },
    { 
      title: 'Total Students', 
      value: totalStudents, 
      icon: Users, 
      change: 'Attempted quizzes',
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-500/10',
      text: 'text-green-400'
    },
    { 
      title: 'Submissions', 
      value: totalSubmissions, 
      icon: BarChart3, 
      change: 'Total attempts',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400'
    },
    { 
      title: 'Avg Score', 
      value: `${averageScore}%`, 
      icon: TrendingUp, 
      change: averageScore >= 70 ? 'Good performance' : 'Needs improvement',
      gradient: 'from-orange-500 to-red-500',
      bg: 'bg-orange-500/10',
      text: 'text-orange-400'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Toaster />
      
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Teacher Dashboard
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#1a1a23] rounded-xl border border-[#2a2a35]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {user?.name?.charAt(0) || 'T'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400">Teacher</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 sm:p-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Welcome Section */}
          <div className="relative mb-6 sm:mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-r from-[#1a1a23] to-[#111117] border border-[#2a2a35] rounded-2xl p-4 sm:p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Welcome back, {user?.name}! 👋
                  </h1>
                  <p className="text-sm sm:text-base text-gray-400">
                    Manage your quizzes and track student performance
                  </p>
                </div>
                <button 
                  onClick={() => router.push('/teacher/create-quiz')}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 w-full sm:w-auto"
                >
                  <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create New Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div
                key={`stat-${index}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl"
                     style={{ background: `linear-gradient(to right, ${stat.gradient})` }}></div>
                <div className="relative bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5 hover:border-transparent transition-all">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className={`p-2 sm:p-2.5 ${stat.bg} rounded-lg`}>
                      <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.text}`} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500">{stat.change}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quizzes and Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* My Quizzes */}
            <div className="lg:col-span-2">
              <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-[#2a2a35] flex justify-between items-center">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-white">My Quizzes</h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} created
                    </p>
                  </div>
                  <button
                    onClick={() => router.push('/teacher/create-quiz')}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600 border border-purple-600/20 hover:border-purple-500 rounded-lg text-purple-400 hover:text-white transition-all text-xs sm:text-sm"
                  >
                    <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">New Quiz</span>
                  </button>
                </div>
                
                {quizzes.length === 0 ? (
                  <div className="p-8 sm:p-10 text-center">
                    <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-sm sm:text-base text-gray-400 mb-2">No quizzes yet</p>
                    <button
                      onClick={() => router.push('/teacher/create-quiz')}
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      Create your first quiz →
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#2a2a35]">
                    {quizzes.map((quiz) => {
                      const quizResults = results.filter(r => r.quizId === quiz._id);
                      const avgScore = quizResults.length
                        ? Math.round(quizResults.reduce((acc, r) => acc + r.percentage, 0) / quizResults.length)
                        : 0;

                      return (
                        <div key={`quiz-${quiz._id || quiz.id}`} className="p-4 sm:p-5 hover:bg-[#1a1a23] transition-colors group">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-purple-400 transition-colors">
                                  {quiz.title}
                                </h3>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                  quizResults.length > 0
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                }`}>
                                  {quizResults.length} attempt{quizResults.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-400 line-clamp-1 mb-2">
                                {quiz.description}
                              </p>
                              <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {quiz.duration} mins
                                </span>
                                <span>•</span>
                                <span>{quiz.questions?.length || 0} questions</span>
                                <span>•</span>
                                <span>{quiz.totalMarks} marks</span>
                                {quizResults.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="text-purple-400">Avg: {avgScore}%</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditQuiz(quiz)}
                                className="p-2 hover:bg-[#252530] rounded-lg transition-colors group/edit"
                                title="Edit Quiz"
                              >
                                <Edit className="w-4 h-4 text-gray-400 group-hover/edit:text-blue-400" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuiz(quiz._id, quiz.title)}
                                disabled={deletingId === quiz._id}
                                className="p-2 hover:bg-[#252530] rounded-lg transition-colors group/delete"
                                title="Delete Quiz"
                              >
                                {deletingId === quiz._id ? (
                                  <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-400" />
                                )}
                              </button>
                              <button
                                onClick={() => router.push(`/teacher/quiz-results/${quiz._id}`)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600 border border-purple-600/20 hover:border-purple-500 rounded-lg text-purple-400 hover:text-white transition-all text-xs"
                              >
                                <span>Details</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Results */}
            <div>
              <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  Recent Results
                </h3>
                
                {results.length === 0 ? (
                  <div className="text-center py-4 sm:py-6">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-gray-400">No results yet</p>
                    <p className="text-xs text-gray-500 mt-1">Students haven't taken any quizzes</p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {results.slice(0, 5).map((result, index) => (
                      <div key={`result-${result._id || index}`} className="flex items-center justify-between p-2 sm:p-3 bg-[#1a1a23] rounded-lg hover:bg-[#252530] transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs sm:text-sm font-medium text-white truncate">
                              {result.userName}
                            </p>
                            <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${
                              result.percentage >= 70 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : result.percentage >= 40
                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {result.percentage >= 70 ? 'Good' : result.percentage >= 40 ? 'Avg' : 'Poor'}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                            {result.quizTitle}
                          </p>
                          <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">
                            {new Date(result.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-2 text-right">
                          <div className={`text-xs sm:text-sm font-bold ${
                            result.percentage >= 70 
                              ? 'text-green-400' 
                              : result.percentage >= 40
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}>
                            {result.score}/{result.totalMarks}
                          </div>
                          <div className="text-[8px] sm:text-[10px] text-gray-500">
                            {result.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {results.length > 5 && (
                      <button 
                        onClick={() => router.push('/teacher/all-results')}
                        className="w-full mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors text-center py-2"
                      >
                        View all {results.length} results →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}