

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import { 
//   BookOpen, 
//   Award, 
//   Clock, 
//   LogOut, 
//   ChevronRight, 
//   Sparkles,
//   Zap,
//   BarChart3,
//   Target,
//   Activity,
//   Calendar,
//   Star,
//   User,
//   Compass,
//   TrendingUp,
//   CheckCircle,
//   PlayCircle
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   questions: any[];
//   totalMarks: number;
//   createdByName: string;
//   difficulty?: 'beginner' | 'intermediate' | 'advanced';
//   category?: string;
//   attempts?: number;
// }

// interface Result {
//   id: string;
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
//   const [greeting, setGreeting] = useState('');

//   useEffect(() => {
//     // Set greeting based on time
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting('good morning');
//     else if (hour < 18) setGreeting('good afternoon');
//     else setGreeting('good evening');

//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(storedUser);
//     setUser(userData);
//     fetchData(userData.id);
//   }, [router]);

//   const fetchData = async (userId: string) => {
//     try {
//       const quizzesRes = await fetch('/api/quizzes');
//       const quizzesData = await quizzesRes.json();
      
//       if (quizzesData.success) {
//         // Add mock difficulty for demo
//         const quizzesWithMeta = quizzesData.data.map((q: Quiz) => ({
//           ...q,
//           difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any,
//           category: ['development', 'design', 'business', 'data'][Math.floor(Math.random() * 4)],
//           attempts: Math.floor(Math.random() * 50)
//         }));
//         setQuizzes(quizzesWithMeta);
//       }

//       const resultsRes = await fetch(`/api/results/user/${userId}`);
//       const resultsData = await resultsRes.json();
      
//       if (resultsData.success) {
//         setResults(resultsData.data);
//         if (resultsData.data.length > 0) {
//           showToast.success('results loaded');
//         }
//       }
//     } catch (error) {
//       showToast.error('failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     showToast.success('logged out successfully');
//     router.push('/login');
//   };

//   const handleStartQuiz = (quizId: string) => {
//     showToast.loading('loading quiz...');
//     router.push(`/quiz/${quizId}`);
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now.getTime() - date.getTime());
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) return 'today';
//     if (diffDays === 1) return 'yesterday';
//     if (diffDays < 7) return `${diffDays} days ago`;
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   const completedQuizIds = results.map(r => r.quizTitle);
//   const availableQuizzes = quizzes.filter(quiz => 
//     !results.some(result => result.quizTitle === quiz.title)
//   );

//   // Stats calculation
//   const completedQuizzes = results.length;
//   const availableQuizzesCount = availableQuizzes.length;
//   const averageScore = results.length 
//     ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
//     : 0;
  
//   // Calculate total points (mock for demo)
//   const totalPoints = results.reduce((acc, r) => acc + r.score, 0);
  
//   // Calculate streak (mock for demo)
//   const streak = 7;
//   const bestStreak = 12;

//   const stats = [
//     { 
//       title: 'available', 
//       value: availableQuizzesCount, 
//       icon: BookOpen, 
//       change: `${availableQuizzesCount} quiz${availableQuizzesCount !== 1 ? 'zes' : ''} to explore`,
//       gradient: 'from-indigo-500 to-purple-500',
//       bg: 'bg-indigo-500/10',
//       text: 'text-indigo-400',
//       delay: 0
//     },
//     { 
//       title: 'completed', 
//       value: completedQuizzes, 
//       icon: CheckCircle, 
//       change: `${completedQuizzes} quiz${completedQuizzes !== 1 ? 'zes' : ''} done`,
//       gradient: 'from-emerald-500 to-green-500',
//       bg: 'bg-emerald-500/10',
//       text: 'text-emerald-400',
//       delay: 100
//     },
//     { 
//       title: 'average score', 
//       value: `${averageScore}%`, 
//       icon: Target, 
//       change: averageScore >= 70 ? 'good progress' : 'keep practicing',
//       gradient: 'from-purple-500 to-pink-500',
//       bg: 'bg-purple-500/10',
//       text: 'text-purple-400',
//       delay: 200
//     },
//     { 
//       title: 'streak', 
//       value: `${streak} days`, 
//       icon: Activity, 
//       change: `best: ${bestStreak} days`,
//       gradient: 'from-orange-500 to-amber-500',
//       bg: 'bg-orange-500/10',
//       text: 'text-orange-400',
//       delay: 300
//     },
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif]">
//         <Toaster />
//         <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        
//         <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
//           {/* Header Skeleton */}
//           <div className="flex justify-between items-center mb-12">
//             <div>
//               <div className="w-32 h-8 bg-white/[0.02] rounded animate-pulse"></div>
//               <div className="w-48 h-4 bg-white/[0.02] rounded mt-2 animate-pulse"></div>
//             </div>
//             <div className="w-40 h-10 bg-white/[0.02] rounded-full animate-pulse"></div>
//           </div>

//           {/* Stats Skeleton */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
//             {[1,2,3,4].map(i => (
//               <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 animate-pulse">
//                 <div className="w-8 h-8 bg-white/[0.02] rounded-lg mb-3"></div>
//                 <div className="w-16 h-4 bg-white/[0.02] rounded mb-2"></div>
//                 <div className="w-24 h-8 bg-white/[0.02] rounded"></div>
//               </div>
//             ))}
//           </div>

//           {/* Content Skeleton */}
//           <div className="grid lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2">
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
//                 <div className="w-40 h-6 bg-white/[0.02] rounded mb-4"></div>
//                 {[1,2,3].map(i => (
//                   <div key={i} className="bg-white/[0.02] rounded-xl p-4 mb-3">
//                     <div className="w-3/4 h-5 bg-white/[0.02] rounded mb-2"></div>
//                     <div className="w-1/2 h-4 bg-white/[0.02] rounded"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
//                 <div className="w-32 h-6 bg-white/[0.02] rounded mb-4"></div>
//                 {[1,2,3].map(i => (
//                   <div key={i} className="bg-white/[0.02] rounded-xl p-3 mb-2">
//                     <div className="w-full h-4 bg-white/[0.02] rounded"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif] selection:bg-indigo-500/20 selection:text-white">
//       <Toaster />
      
//       {/* Premium Background */}
//       <div className="fixed inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,100,150,0.1),transparent)]"></div>
//         <div className="absolute inset-0" style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
//           `,
//           backgroundSize: '40px 40px',
//           maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 90%)'
//         }}></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
//         {/* Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
//         >
//           <div>
//             <motion.h1 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-3xl font-light text-white mb-1"
//             >
//               {greeting}, <span className="font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{user?.name}</span>
//             </motion.h1>
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-white/30 text-sm"
//             >
//               ready for your next challenge?
//             </motion.p>
//           </div>
          
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4 }}
//             className="flex items-center gap-3"
//           >
//             <Link href="/profile">
//               <div className="flex items-center gap-3 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-full hover:bg-white/[0.04] transition-all cursor-pointer">
//                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
//                   {user?.name?.charAt(0) || 'S'}
//                 </div>
//                 <span className="text-sm text-white/60 hidden sm:block">{user?.email}</span>
//               </div>
//             </Link>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-full text-white/40 hover:text-white/60 hover:border-white/10 transition-all"
//             >
//               <LogOut className="w-4 h-4" />
//             </motion.button>
//           </motion.div>
//         </motion.div>

//         {/* Stats Grid */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
//         >
//           {stats.map((stat) => (
//             <motion.div
//               key={stat.title}
//               variants={itemVariants}
//               whileHover={{ y: -2 }}
//               className="group relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-white/10 transition-all"
//             >
//               <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
              
//               <div className="relative">
//                 <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
//                   <stat.icon className={`w-5 h-5 ${stat.text}`} />
//                 </div>
//                 <p className="text-sm text-white/40 mb-1">{stat.title}</p>
//                 <p className="text-2xl font-light text-white mb-2">{stat.value}</p>
//                 <p className="text-xs text-white/20">{stat.change}</p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Main Grid */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Available Quizzes */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="lg:col-span-2"
//           >
//             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//               <div className="p-6 border-b border-white/[0.05]">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-lg font-light text-white">available quizzes</h2>
//                     <p className="text-sm text-white/30 mt-1">start a new challenge</p>
//                   </div>
//                   <Link 
//                     href="/quizzes"
//                     className="text-xs text-white/30 hover:text-indigo-400 transition-colors flex items-center gap-1"
//                   >
//                     view all
//                     <ChevronRight className="w-3 h-3" />
//                   </Link>
//                 </div>
//               </div>
              
//               {availableQuizzes.length === 0 ? (
//                 <div className="p-12 text-center">
//                   <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <BookOpen className="w-8 h-8 text-white/20" />
//                   </div>
//                   <p className="text-white/40 text-sm mb-2">no quizzes available</p>
//                   <p className="text-white/20 text-xs">check back later for new challenges</p>
//                 </div>
//               ) : (
//                 <div className="divide-y divide-white/[0.05]">
//                   {availableQuizzes.slice(0, 4).map((quiz, index) => (
//                     <motion.div
//                       key={quiz.id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.1 * index }}
//                       className="p-6 hover:bg-white/[0.02] transition-colors group"
//                     >
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <h3 className="text-base font-medium text-white group-hover:text-indigo-400 transition-colors">
//                               {quiz.title}
//                             </h3>
//                             {quiz.difficulty && (
//                               <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
//                                 quiz.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
//                                 quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
//                                 'bg-red-500/10 text-red-400 border-red-500/30'
//                               }`}>
//                                 {quiz.difficulty}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-sm text-white/30 mb-3 line-clamp-1">{quiz.description}</p>
//                           <div className="flex items-center gap-4 text-xs text-white/20">
//                             <span className="flex items-center gap-1">
//                               <Clock className="w-3 h-3" /> {quiz.duration} min
//                             </span>
//                             <span>·</span>
//                             <span>{quiz.questions?.length || 0} questions</span>
//                             <span>·</span>
//                             <span>{quiz.totalMarks} marks</span>
//                             {quiz.attempts && (
//                               <>
//                                 <span>·</span>
//                                 <span>{quiz.attempts} attempts</span>
//                               </>
//                             )}
//                           </div>
//                         </div>
                        
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => handleStartQuiz(quiz.id)}
//                           className="flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.02] hover:bg-indigo-500/20 border border-white/[0.05] hover:border-indigo-500/50 rounded-xl text-white/40 hover:text-indigo-400 transition-all text-sm whitespace-nowrap"
//                         >
//                           <PlayCircle className="w-4 h-4" />
//                           start quiz
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Right Sidebar */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="space-y-6"
//           >
//             {/* Recent Results */}
//             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-light text-white">recent results</h3>
//                 <BarChart3 className="w-4 h-4 text-white/20" />
//               </div>
              
//               {results.length === 0 ? (
//                 <div className="text-center py-6">
//                   <Award className="w-8 h-8 text-white/20 mx-auto mb-2" />
//                   <p className="text-xs text-white/30">no results yet</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {results.slice(0, 3).map((result, index) => (
//                     <Link 
//                       href={`/results/${result.id}`} 
//                       key={result.id}
//                       className="block p-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl transition-colors"
//                     >
//                       <div className="flex items-center justify-between mb-1">
//                         <p className="text-sm text-white/80 truncate max-w-[140px]">{result.quizTitle}</p>
//                         <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
//                           result.percentage >= 70 
//                             ? 'bg-emerald-500/10 text-emerald-400' 
//                             : 'bg-yellow-500/10 text-yellow-400'
//                         }`}>
//                           {result.percentage}%
//                         </span>
//                       </div>
//                       <p className="text-xs text-white/20">{formatDate(result.submittedAt)}</p>
//                     </Link>
//                   ))}
                  
//                   {results.length > 3 && (
//                     <Link 
//                       href="/results"
//                       className="block text-center text-xs text-white/30 hover:text-indigo-400 transition-colors pt-2"
//                     >
//                       view all {results.length} results
//                     </Link>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Star className="w-4 h-4 text-yellow-400/60" />
//                   <span className="text-xs text-white/40">points</span>
//                 </div>
//                 <p className="text-xl font-light text-white mb-1">{totalPoints}</p>
//                 <p className="text-[10px] text-white/20">earned from quizzes</p>
//               </div>
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Activity className="w-4 h-4 text-orange-400/60" />
//                   <span className="text-xs text-white/40">streak</span>
//                 </div>
//                 <p className="text-xl font-light text-white mb-1">{streak}</p>
//                 <p className="text-[10px] text-white/20">current streak</p>
//               </div>
//             </div>

//             {/* Motivational Card */}
//             <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
//                   <Sparkles className="w-4 h-4 text-indigo-400" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-white/80 mb-1">keep learning!</p>
//                   <p className="text-xs text-white/30">you're making great progress</p>
//                   <div className="mt-3 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
//                     <motion.div 
//                       initial={{ width: 0 }}
//                       animate={{ width: `${Math.min(100, (completedQuizzes / 10) * 100)}%` }}
//                       className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
//                     />
//                   </div>
//                   <p className="text-[10px] text-white/20 mt-2">{completedQuizzes} of 10 quizzes completed</p>
//                 </div>
//               </div>
//             </div>

//             {/* Explore Link */}
//             <Link href="/explore">
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer"
//               >
//                 <div className="flex items-center gap-3">
//                   <Compass className="w-5 h-5 text-indigo-400/60" />
//                   <span className="text-sm text-white/80">explore more quizzes</span>
//                 </div>
//                 <ChevronRight className="w-4 h-4 text-white/20" />
//               </motion.div>
//             </Link>
//           </motion.div>
//         </div>
//       </div>

//       <style jsx>{`
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// }








'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { 
  BookOpen, 
  Award, 
  Clock, 
  LogOut, 
  ChevronRight, 
  Sparkles,
  Zap,
  BarChart3,
  Target,
  Activity,
  Calendar,
  Star,
  User,
  Compass,
  TrendingUp,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: any[];
  totalMarks: number;
  createdByName: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  attempts?: number;
}

interface Result {
  id: string;
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
  const [greeting, setGreeting] = useState('');
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('good morning');
    else if (hour < 18) setGreeting('good afternoon');
    else setGreeting('good evening');

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
        // Add mock difficulty for demo
        const quizzesWithMeta = quizzesData.data.map((q: Quiz) => ({
          ...q,
          difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any,
          category: ['development', 'design', 'business', 'data'][Math.floor(Math.random() * 4)],
          attempts: Math.floor(Math.random() * 50)
        }));
        setQuizzes(quizzesWithMeta);
      }

      const resultsRes = await fetch(`/api/results/user/${userId}`);
      const resultsData = await resultsRes.json();
      
      if (resultsData.success) {
        // Store previous results count to check for new achievements
        const previousResults = results.length;
        setResults(resultsData.data);
        
        // ✅ REAL ACHIEVEMENTS - Only show for new results
        if (resultsData.data.length > previousResults) {
          const newResultsCount = resultsData.data.length - previousResults;
          
          // Check for first quiz completion
          if (previousResults === 0 && resultsData.data.length >= 1) {
            showToast.achievement(
              'First Quiz Completed! 🎯',
              'Great start! Keep up the momentum'
            );
          }
          
          // Check for milestone (5 quizzes)
          if (previousResults < 5 && resultsData.data.length >= 5) {
            showToast.achievement(
              'Milestone Reached! ⭐',
              'You\'ve completed 5 quizzes'
            );
          }
          
          // Check for milestone (10 quizzes)
          if (previousResults < 10 && resultsData.data.length >= 10) {
            showToast.achievement(
              'Double Digits! 🔥',
              'You\'ve completed 10 quizzes'
            );
          }
          
          // Check for perfect scores in new results
          const newResults = resultsData.data.slice(previousResults);
          const hasPerfectScore = newResults.some((r: Result) => r.percentage === 100);
          
          if (hasPerfectScore) {
            showToast.achievement(
              'Perfect Score! 🏆',
              'You aced a quiz with 100%'
            );
          }
          
          // Show score toast for each new result
          newResults.forEach((result: Result) => {
            showToast.score(result.score, result.totalMarks, result.percentage);
          });
        }
        
        // Show weekly stats (only once per session)
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        const weeklyResults = resultsData.data.filter((r: Result) => 
          new Date(r.submittedAt) > lastWeek
        ).length;
        
        // Check if we haven't shown weekly stats in this session
        const weeklyStatsShown = sessionStorage.getItem('weeklyStatsShown');
        if (weeklyResults > 0 && !weeklyStatsShown) {
          showToast.stats(weeklyResults, resultsData.data.length);
          sessionStorage.setItem('weeklyStatsShown', 'true');
        }
      }
    } catch (error) {
      showToast.error('failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    const toastId = showToast.loading('logging out...');
    
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear(); // Clear session storage
      hotToast.dismiss(toastId);
      showToast.success('logged out successfully');
      
      setTimeout(() => router.push('/login'), 1000);
    }, 800);
  };

  const handleStartQuiz = (quizId: string) => {
    const toastId = showToast.loading('loading quiz...');
    
    // Dismiss loading after 1 second
    setTimeout(() => {
      hotToast.dismiss(toastId);
      router.push(`/quiz/${quizId}`);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const completedQuizIds = results.map(r => r.quizTitle);
  const availableQuizzes = quizzes.filter(quiz => 
    !results.some(result => result.quizTitle === quiz.title)
  );

  // Stats calculation
  const completedQuizzes = results.length;
  const availableQuizzesCount = availableQuizzes.length;
  const averageScore = results.length 
    ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
    : 0;
  
  // Calculate total points
  const totalPoints = results.reduce((acc, r) => acc + r.score, 0);
  
  // Calculate streak based on recent activity
  const calculateStreak = () => {
    if (results.length === 0) return 0;
    
    const sortedResults = [...results].sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    
    let streak = 1;
    let currentDate = new Date(sortedResults[0].submittedAt);
    
    for (let i = 1; i < sortedResults.length; i++) {
      const prevDate = new Date(sortedResults[i].submittedAt);
      const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        currentDate = prevDate;
      } else if (diffDays > 1) {
        break;
      }
    }
    
    return streak;
  };
  
  const streak = calculateStreak();
  const bestStreak = 12; // This would come from user stats in real app

  const stats = [
    { 
      title: 'available', 
      value: availableQuizzesCount, 
      icon: BookOpen, 
      change: `${availableQuizzesCount} quiz${availableQuizzesCount !== 1 ? 'zes' : ''} to explore`,
      gradient: 'from-indigo-500 to-purple-500',
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      delay: 0
    },
    { 
      title: 'completed', 
      value: completedQuizzes, 
      icon: CheckCircle, 
      change: `${completedQuizzes} quiz${completedQuizzes !== 1 ? 'zes' : ''} done`,
      gradient: 'from-emerald-500 to-green-500',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      delay: 100
    },
    { 
      title: 'average score', 
      value: `${averageScore}%`, 
      icon: Target, 
      change: averageScore >= 70 ? 'good progress' : 'keep practicing',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      delay: 200
    },
    { 
      title: 'streak', 
      value: `${streak} days`, 
      icon: Activity, 
      change: `best: ${bestStreak} days`,
      gradient: 'from-orange-500 to-amber-500',
      bg: 'bg-orange-500/10',
      text: 'text-orange-400',
      delay: 300
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif]">
        <Toaster />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="w-32 h-8 bg-white/[0.02] rounded animate-pulse"></div>
              <div className="w-48 h-4 bg-white/[0.02] rounded mt-2 animate-pulse"></div>
            </div>
            <div className="w-40 h-10 bg-white/[0.02] rounded-full animate-pulse"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 animate-pulse">
                <div className="w-8 h-8 bg-white/[0.02] rounded-lg mb-3"></div>
                <div className="w-16 h-4 bg-white/[0.02] rounded mb-2"></div>
                <div className="w-24 h-8 bg-white/[0.02] rounded"></div>
              </div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                <div className="w-40 h-6 bg-white/[0.02] rounded mb-4"></div>
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white/[0.02] rounded-xl p-4 mb-3">
                    <div className="w-3/4 h-5 bg-white/[0.02] rounded mb-2"></div>
                    <div className="w-1/2 h-4 bg-white/[0.02] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                <div className="w-32 h-6 bg-white/[0.02] rounded mb-4"></div>
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white/[0.02] rounded-xl p-3 mb-2">
                    <div className="w-full h-4 bg-white/[0.02] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif] selection:bg-indigo-500/20 selection:text-white">
      <Toaster position="top-right" />
      
      {/* Premium Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,100,150,0.1),transparent)]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 90%)'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
        >
          <div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-light text-white mb-1"
            >
              {greeting}, <span className="font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{user?.name}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/30 text-sm"
            >
              ready for your next challenge?
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <Link href="/profile">
              <div className="flex items-center gap-3 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-full hover:bg-white/[0.04] transition-all cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user?.name?.charAt(0) || 'S'}
                </div>
                <span className="text-sm text-white/60 hidden sm:block">{user?.email}</span>
              </div>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-full text-white/40 hover:text-white/60 hover:border-white/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="group relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-white/10 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
              
              <div className="relative">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.text}`} />
                </div>
                <p className="text-sm text-white/40 mb-1">{stat.title}</p>
                <p className="text-2xl font-light text-white mb-2">{stat.value}</p>
                <p className="text-xs text-white/20">{stat.change}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Available Quizzes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/[0.05]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-light text-white">available quizzes</h2>
                    <p className="text-sm text-white/30 mt-1">start a new challenge</p>
                  </div>
                  <Link 
                    href="/quizzes"
                    className="text-xs text-white/30 hover:text-indigo-400 transition-colors flex items-center gap-1"
                  >
                    view all
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              
              {availableQuizzes.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/40 text-sm mb-2">no quizzes available</p>
                  <p className="text-white/20 text-xs">check back later for new challenges</p>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.05]">
                  {availableQuizzes.slice(0, 4).map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-6 hover:bg-white/[0.02] transition-colors group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base font-medium text-white group-hover:text-indigo-400 transition-colors">
                              {quiz.title}
                            </h3>
                            {quiz.difficulty && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                quiz.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                                'bg-red-500/10 text-red-400 border-red-500/30'
                              }`}>
                                {quiz.difficulty}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/30 mb-3 line-clamp-1">{quiz.description}</p>
                          <div className="flex items-center gap-4 text-xs text-white/20">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {quiz.duration} min
                            </span>
                            <span>·</span>
                            <span>{quiz.questions?.length || 0} questions</span>
                            <span>·</span>
                            <span>{quiz.totalMarks} marks</span>
                            {quiz.attempts && (
                              <>
                                <span>·</span>
                                <span>{quiz.attempts} attempts</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStartQuiz(quiz.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.02] hover:bg-indigo-500/20 border border-white/[0.05] hover:border-indigo-500/50 rounded-xl text-white/40 hover:text-indigo-400 transition-all text-sm whitespace-nowrap"
                        >
                          <PlayCircle className="w-4 h-4" />
                          start quiz
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Recent Results */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-light text-white">recent results</h3>
                <BarChart3 className="w-4 h-4 text-white/20" />
              </div>
              
              {results.length === 0 ? (
                <div className="text-center py-6">
                  <Award className="w-8 h-8 text-white/20 mx-auto mb-2" />
                  <p className="text-xs text-white/30">no results yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.slice(0, 3).map((result, index) => (
                    <Link 
                      href={`/results/${result.id}`} 
                      key={result.id}
                      className="block p-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-white/80 truncate max-w-[140px]">{result.quizTitle}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          result.percentage >= 70 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {result.percentage}%
                        </span>
                      </div>
                      <p className="text-xs text-white/20">{formatDate(result.submittedAt)}</p>
                    </Link>
                  ))}
                  
                  {results.length > 3 && (
                    <Link 
                      href="/results"
                      className="block text-center text-xs text-white/30 hover:text-indigo-400 transition-colors pt-2"
                    >
                      view all {results.length} results
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-400/60" />
                  <span className="text-xs text-white/40">points</span>
                </div>
                <p className="text-xl font-light text-white mb-1">{totalPoints}</p>
                <p className="text-[10px] text-white/20">earned from quizzes</p>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-orange-400/60" />
                  <span className="text-xs text-white/40">streak</span>
                </div>
                <p className="text-xl font-light text-white mb-1">{streak}</p>
                <p className="text-[10px] text-white/20">current streak</p>
              </div>
            </div>

            {/* Motivational Card */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-white/80 mb-1">keep learning!</p>
                  <p className="text-xs text-white/30">you're making great progress</p>
                  <div className="mt-3 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (completedQuizzes / 10) * 100)}%` }}
                      className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-white/20 mt-2">{completedQuizzes} of 10 quizzes completed</p>
                </div>
              </div>
            </div>

            {/* Explore Link */}
            <Link href="/explore">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-indigo-400/60" />
                  <span className="text-sm text-white/80">explore more quizzes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}