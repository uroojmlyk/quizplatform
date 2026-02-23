
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   BookOpen, 
//   Award, 
//   Clock, 
//   TrendingUp, 
//   LogOut, 
//   User, 
//   ChevronRight, 
//   Sparkles,
//   Zap,
//   BarChart3,
//   Target,
//   Activity,
//   Calendar,
//   Star
// } from 'lucide-react';

// interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   questions: any[];
//   totalMarks: number;
//   createdByName: string;
// }

// interface Result {
//   id: string;
//   quizId: string;
//   quizTitle: string;
//   percentage: number;
//   score: number;
//   totalMarks: number;
//   submittedAt: string;
// }

// export default function StudentDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [results, setResults] = useState<Result[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(storedUser);
//     setUser(userData);
    
//     // Fetch data from APIs
//     fetchData(userData.id);
//   }, [router]);

//   const fetchData = async (userId: string) => {
//     try {
//       // Fetch all quizzes
//       const quizzesRes = await fetch('/api/quizzes');
//       const quizzesData = await quizzesRes.json();
      
//       if (quizzesData.success) {
//         setQuizzes(quizzesData.data);
//       }

//       // Fetch user results
//       const resultsRes = await fetch(`/api/results/user/${userId}`);
//       const resultsData = await resultsRes.json();
      
//       console.log('Results for user:', userId, resultsData);
      
//       if (resultsData.success) {
//         setResults(resultsData.data);
//       } else {
//         console.error('Failed to fetch results:', resultsData.error);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now.getTime() - date.getTime());
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) return 'Today';
//     if (diffDays === 1) return 'Yesterday';
//     if (diffDays < 7) return `${diffDays} days ago`;
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   // ✅ FIXED: quizId se compare kar rahe hain, title se nahi
//   const attemptedQuizIds = results.map(r => r.quizId);
//   const availableQuizzes = quizzes.filter(quiz => 
//     !attemptedQuizIds.includes(quiz.id)
//   );

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

//   const completedQuizzes = results.length;
//   const availableQuizzesCount = availableQuizzes.length;
//   const averageScore = results.length 
//     ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
//     : 0;

//   const stats = [
//     { 
//       title: 'Available Quizzes', 
//       value: availableQuizzesCount, 
//       icon: BookOpen, 
//       change: 'Ready to start',
//       gradient: 'from-blue-500 to-cyan-500',
//       bg: 'bg-blue-500/10',
//       text: 'text-blue-400'
//     },
//     { 
//       title: 'Completed', 
//       value: completedQuizzes, 
//       icon: Award, 
//       change: `${completedQuizzes} total`,
//       gradient: 'from-green-500 to-emerald-500',
//       bg: 'bg-green-500/10',
//       text: 'text-green-400'
//     },
//     { 
//       title: 'Average Score', 
//       value: `${averageScore}%`, 
//       icon: Target, 
//       change: averageScore >= 70 ? 'Good job! 👏' : 'Keep practicing! 💪',
//       gradient: 'from-purple-500 to-pink-500',
//       bg: 'bg-purple-500/10',
//       text: 'text-purple-400'
//     },
//     { 
//       title: 'Study Streak', 
//       value: '7 days', 
//       icon: Activity, 
//       change: '🔥 +2 this week',
//       gradient: 'from-orange-500 to-red-500',
//       bg: 'bg-orange-500/10',
//       text: 'text-orange-400'
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       {/* Animated Background */}
//       <div className="fixed inset-0">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full filter blur-3xl"></div>
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16 sm:h-20">
//               {/* Logo */}
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
//                   <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 </div>
//                 <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                   QuizMaster
//                 </span>
//               </div>

//               {/* User Menu */}
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#1a1a23] rounded-xl border border-[#2a2a35]">
//                   <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
//                     {user?.name?.charAt(0) || 'U'}
//                   </div>
//                   <div className="hidden sm:block">
//                     <p className="text-sm font-medium text-white">{user?.name}</p>
//                     <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
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
//                   <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
//                     Welcome back, {user?.name}! 
//                     <span className="inline-block animate-wave text-2xl sm:text-3xl">👋</span>
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-400">Ready for your next challenge?</p>
//                 </div>
//                 <button 
//                   onClick={() => router.push('/quiz')}
//                   className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 w-full sm:w-auto"
//                 >
//                   <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
//                   Start New Quiz
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="group relative animate-fadeInUp"
//                 style={{ animationDelay: `${index * 100}ms` }}
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

//           {/* Main Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* Available Quizzes */}
//             <div className="lg:col-span-2">
//               <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//                 <div className="p-4 sm:p-5 border-b border-[#2a2a35]">
//                   <h2 className="text-base sm:text-lg font-semibold text-white">Available Quizzes</h2>
//                   <p className="text-xs sm:text-sm text-gray-400 mt-1">Start a new quiz challenge</p>
//                 </div>
                
//                 {availableQuizzes.length === 0 ? (
//                   <div className="p-8 sm:p-10 text-center">
//                     <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3" />
//                     <p className="text-sm sm:text-base text-gray-400">No quizzes available</p>
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-[#2a2a35]">
//                     {availableQuizzes.map((quiz, index) => (
//                       <div key={quiz.id} className="p-4 sm:p-5 hover:bg-[#1a1a23] transition-colors group">
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                           <div className="flex-1">
//                             <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-purple-400 transition-colors">
//                               {quiz.title}
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-1">{quiz.description}</p>
//                             <div className="flex items-center gap-2 sm:gap-3 mt-2 text-[10px] sm:text-xs text-gray-500">
//                               <span className="flex items-center gap-1">
//                                 <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {quiz.duration} mins
//                               </span>
//                               <span>•</span>
//                               <span>{quiz.questions?.length || 0} questions</span>
//                               <span>•</span>
//                               <span>{quiz.totalMarks} marks</span>
//                             </div>
//                           </div>
//                           <button
//                             onClick={() => router.push(`/quiz/${quiz.id}`)}
//                             className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-purple-600/10 hover:bg-purple-600 border border-purple-600/20 hover:border-purple-500 rounded-lg text-purple-400 hover:text-white transition-all text-xs sm:text-sm"
//                           >
//                             <span>Start</span>
//                             <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right Sidebar */}
//             <div className="space-y-4 sm:space-y-6">
//               {/* Recent Results */}
//               <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5">
//                 <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
//                   <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                   Recent Results
//                 </h3>
                
//                 {results.length === 0 ? (
//                   <div className="text-center py-4 sm:py-6">
//                     <Award className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 mx-auto mb-2" />
//                     <p className="text-xs sm:text-sm text-gray-400">No results yet</p>
//                     <p className="text-xs text-gray-500 mt-1">Complete a quiz to see your results here</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-2 sm:space-y-3">
//                     {results.slice(0, 3).map((result) => (
//                       <div key={result.id} className="flex items-center justify-between p-2 sm:p-3 bg-[#1a1a23] rounded-lg">
//                         <div className="flex-1 min-w-0">
//                           <p className="text-xs sm:text-sm font-medium text-white truncate">{result.quizTitle}</p>
//                           <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
//                             {formatDate(result.submittedAt)}
//                           </p>
//                         </div>
//                         <div className={`ml-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
//                           result.percentage >= 70 
//                             ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
//                             : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
//                         }`}>
//                           {result.percentage}%
//                         </div>
//                       </div>
//                     ))}
                    
//                     {results.length > 3 && (
//                       <button 
//                         onClick={() => router.push('/results')}
//                         className="w-full mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors text-center"
//                       >
//                         View all {results.length} results →
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                 <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-xl p-3 sm:p-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
//                     <span className="text-[10px] sm:text-xs text-gray-400">Points</span>
//                   </div>
//                   <p className="text-lg sm:text-xl font-bold text-white">1,250</p>
//                   <p className="text-[8px] sm:text-xs text-gray-500 mt-1">+150 this week</p>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/20 rounded-xl p-3 sm:p-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
//                     <span className="text-[10px] sm:text-xs text-gray-400">Streak</span>
//                   </div>
//                   <p className="text-lg sm:text-xl font-bold text-white">7</p>
//                   <p className="text-[8px] sm:text-xs text-gray-500 mt-1">🔥 Best: 12</p>
//                 </div>
//               </div>

//               {/* Motivational Quote */}
//               <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-4 sm:p-5">
//                 <p className="text-xs sm:text-sm text-gray-300 italic">
//                   "The expert in anything was once a beginner."
//                 </p>
//                 <p className="text-[10px] sm:text-xs text-gray-500 mt-2">Keep learning! 📚</p>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }
        
//         @keyframes wave {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(15deg); }
//           75% { transform: rotate(-15deg); }
//         }
        
//         .animate-wave {
//           animation: wave 1s ease-in-out infinite;
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
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  LogOut, 
  User, 
  ChevronRight, 
  Sparkles,
  Zap,
  BarChart3,
  Target,
  Activity,
  Calendar,
  Star
} from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: any[];
  totalMarks: number;
  createdByName: string;
}

interface Result {
  id: string;
  quizId: string;
  quizTitle: string;
  percentage: number;
  score: number;
  totalMarks: number;
  submittedAt: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    
    fetchData(userData.id);
  }, [router]);

  const fetchData = async (userId: string) => {
    try {
      const quizzesRes = await fetch('/api/quizzes');
      const quizzesData = await quizzesRes.json();
      
      if (quizzesData.success) {
        setQuizzes(quizzesData.data);
      }

      const resultsRes = await fetch(`/api/results/user/${userId}`);
      const resultsData = await resultsRes.json();
      
      if (resultsData.success) {
        setResults(resultsData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // ✅ FIXED: Quiz IDs se compare karo
  const attemptedQuizIds = results.map(r => r.quizId);
  const availableQuizzes = quizzes.filter(quiz => 
    !attemptedQuizIds.includes(quiz.id)
  );

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

  const completedQuizzes = results.length;
  const availableQuizzesCount = availableQuizzes.length;
  const averageScore = results.length 
    ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
    : 0;

  const stats = [
    { 
      title: 'Available Quizzes', 
      value: availableQuizzesCount, 
      icon: BookOpen, 
      change: 'Ready to start',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400'
    },
    { 
      title: 'Completed', 
      value: completedQuizzes, 
      icon: Award, 
      change: `${completedQuizzes} total`,
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-500/10',
      text: 'text-green-400'
    },
    { 
      title: 'Average Score', 
      value: `${averageScore}%`, 
      icon: Target, 
      change: averageScore >= 70 ? 'Good job! 👏' : 'Keep practicing! 💪',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400'
    },
    { 
      title: 'Study Streak', 
      value: '7 days', 
      icon: Activity, 
      change: '🔥 +2 this week',
      gradient: 'from-orange-500 to-red-500',
      bg: 'bg-orange-500/10',
      text: 'text-orange-400'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full filter blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  QuizMaster
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#1a1a23] rounded-xl border border-[#2a2a35]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
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

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="relative mb-6 sm:mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-r from-[#1a1a23] to-[#111117] border border-[#2a2a35] rounded-2xl p-4 sm:p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    Welcome back, {user?.name}! 
                    <span className="inline-block animate-wave text-2xl sm:text-3xl">👋</span>
                  </h1>
                  <p className="text-sm sm:text-base text-gray-400">Ready for your next challenge?</p>
                </div>
                <button 
                  onClick={() => router.push('/quiz')}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 w-full sm:w-auto"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start New Quiz
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-[#2a2a35]">
                  <h2 className="text-base sm:text-lg font-semibold text-white">Available Quizzes</h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Start a new quiz challenge</p>
                </div>
                
                {availableQuizzes.length === 0 ? (
                  <div className="p-8 sm:p-10 text-center">
                    <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-sm sm:text-base text-gray-400">No quizzes available</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#2a2a35]">
                    {availableQuizzes.map((quiz) => (
                      <div key={quiz.id} className="p-4 sm:p-5 hover:bg-[#1a1a23] transition-colors group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-purple-400 transition-colors">
                              {quiz.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-1">{quiz.description}</p>
                            <div className="flex items-center gap-2 sm:gap-3 mt-2 text-[10px] sm:text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {quiz.duration} mins
                              </span>
                              <span>•</span>
                              <span>{quiz.questions?.length || 0} questions</span>
                              <span>•</span>
                              <span>{quiz.totalMarks} marks</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              console.log('🔘 Starting quiz:', quiz.id);
                              router.push(`/quiz/${quiz.id}`);
                            }}
                            className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-purple-600/10 hover:bg-purple-600 border border-purple-600/20 hover:border-purple-500 rounded-lg text-purple-400 hover:text-white transition-all text-xs sm:text-sm"
                          >
                            <span>Start</span>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  Recent Results
                </h3>
                
                {results.length === 0 ? (
                  <div className="text-center py-4 sm:py-6">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-gray-400">No results yet</p>
                    <p className="text-xs text-gray-500 mt-1">Complete a quiz to see your results here</p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {results.slice(0, 3).map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-2 sm:p-3 bg-[#1a1a23] rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-white truncate">{result.quizTitle}</p>
                          <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                            {formatDate(result.submittedAt)}
                          </p>
                        </div>
                        <div className={`ml-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                          result.percentage >= 70 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {result.percentage}%
                        </div>
                      </div>
                    ))}
                    
                    {results.length > 3 && (
                      <button 
                        onClick={() => router.push('/results')}
                        className="w-full mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors text-center"
                      >
                        View all {results.length} results →
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] sm:text-xs text-gray-400">Points</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-white">1,250</p>
                  <p className="text-[8px] sm:text-xs text-gray-500 mt-1">+150 this week</p>
                </div>
                <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/20 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                    <span className="text-[10px] sm:text-xs text-gray-400">Streak</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-white">7</p>
                  <p className="text-[8px] sm:text-xs text-gray-500 mt-1">🔥 Best: 12</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-300 italic">
                  "The expert in anything was once a beginner."
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-2">Keep learning! 📚</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}