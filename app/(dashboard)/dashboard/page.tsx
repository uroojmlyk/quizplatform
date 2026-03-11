

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Toaster, toast as hotToast } from 'react-hot-toast';
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
//   visibility?: string;
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
//   const [showAchievements, setShowAchievements] = useState(false);

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
//       // ✅ FIXED: Use student-specific API
//       const quizzesRes = await fetch(`/api/quizzes/student?studentId=${userId}`);
//       const quizzesData = await quizzesRes.json();
      
//       console.log('Quizzes for student:', quizzesData); // Debug
      
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
//         // Store previous results count to check for new achievements
//         const previousResults = results.length;
//         setResults(resultsData.data);
        
//         // ✅ REAL ACHIEVEMENTS - Only show for new results
//         if (resultsData.data.length > previousResults) {
//           const newResultsCount = resultsData.data.length - previousResults;
          
//           // Check for first quiz completion
//           if (previousResults === 0 && resultsData.data.length >= 1) {
//             showToast.achievement(
//               'First Quiz Completed! 🎯',
//               'Great start! Keep up the momentum'
//             );
//           }
          
//           // Check for milestone (5 quizzes)
//           if (previousResults < 5 && resultsData.data.length >= 5) {
//             showToast.achievement(
//               'Milestone Reached! ⭐',
//               'You\'ve completed 5 quizzes'
//             );
//           }
          
//           // Check for milestone (10 quizzes)
//           if (previousResults < 10 && resultsData.data.length >= 10) {
//             showToast.achievement(
//               'Double Digits! 🔥',
//               'You\'ve completed 10 quizzes'
//             );
//           }
          
//           // Check for perfect scores in new results
//           const newResults = resultsData.data.slice(previousResults);
//           const hasPerfectScore = newResults.some((r: Result) => r.percentage === 100);
          
//           if (hasPerfectScore) {
//             showToast.achievement(
//               'Perfect Score! 🏆',
//               'You aced a quiz with 100%'
//             );
//           }
          
//           // Show score toast for each new result
//           newResults.forEach((result: Result) => {
//             showToast.score(result.score, result.totalMarks, result.percentage);
//           });
//         }
        
//         // Show weekly stats (only once per session)
//         const lastWeek = new Date();
//         lastWeek.setDate(lastWeek.getDate() - 7);
        
//         const weeklyResults = resultsData.data.filter((r: Result) => 
//           new Date(r.submittedAt) > lastWeek
//         ).length;
        
//         // Check if we haven't shown weekly stats in this session
//         const weeklyStatsShown = sessionStorage.getItem('weeklyStatsShown');
//         if (weeklyResults > 0 && !weeklyStatsShown) {
//           showToast.stats(weeklyResults, resultsData.data.length);
//           sessionStorage.setItem('weeklyStatsShown', 'true');
//         }
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       showToast.error('failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     const toastId = showToast.loading('logging out...');
    
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       sessionStorage.clear(); // Clear session storage
//       hotToast.dismiss(toastId);
//       showToast.success('logged out successfully');
      
//       setTimeout(() => router.push('/login'), 1000);
//     }, 800);
//   };

//   const handleStartQuiz = (quizId: string) => {
//     const toastId = showToast.loading('loading quiz...');
    
//     // Dismiss loading after 1 second
//     setTimeout(() => {
//       hotToast.dismiss(toastId);
//       router.push(`/quiz/${quizId}`);
//     }, 1000);
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
  
//   // Calculate total points
//   const totalPoints = results.reduce((acc, r) => acc + r.score, 0);
  
//   // Calculate streak based on recent activity
//   const calculateStreak = () => {
//     if (results.length === 0) return 0;
    
//     const sortedResults = [...results].sort((a, b) => 
//       new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
//     );
    
//     let streak = 1;
//     let currentDate = new Date(sortedResults[0].submittedAt);
    
//     for (let i = 1; i < sortedResults.length; i++) {
//       const prevDate = new Date(sortedResults[i].submittedAt);
//       const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
//       if (diffDays === 1) {
//         streak++;
//         currentDate = prevDate;
//       } else if (diffDays > 1) {
//         break;
//       }
//     }
    
//     return streak;
//   };
  
//   const streak = calculateStreak();
//   const bestStreak = 12; // This would come from user stats in real app

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
//       <Toaster position="top-right" />
      
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
//                             {quiz.visibility === 'assigned' && (
//                               <span className="text-[10px] px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/30">
//                                 assigned
//                               </span>
//                             )}
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






// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster, toast as hotToast } from 'react-hot-toast';
// import {
//   BookOpen,
//   Award,
//   Clock,
//   LogOut,
//   ChevronRight,
//   Sparkles,
//   BarChart3,
//   Target,
//   Activity,
//   Star,
//   CheckCircle,
//   PlayCircle,
//   Trophy,
//   Flame,
//   TrendingUp,
//   User,
//   Bell,
//   Search,
//   Filter,
//   Lock,
//   Zap,
//   ArrowRight,
//   GraduationCap,
//   Timer
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
//   visibility?: string;
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
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'public'>('all');
//   const [showSearch, setShowSearch] = useState(false);

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting('Good morning');
//     else if (hour < 18) setGreeting('Good afternoon');
//     else setGreeting('Good evening');

//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }

//     const userData = JSON.parse(storedUser);
//     setUser(userData);
//     fetchData(userData.id);
//   }, [router]);

//   const fetchData = async (userId: string) => {
//     try {
//       const [quizzesRes, resultsRes] = await Promise.all([
//         fetch(`/api/quizzes/student?studentId=${userId}`),
//         fetch(`/api/results/user/${userId}`)
//       ]);

//       const quizzesData = await quizzesRes.json();
//       const resultsData = await resultsRes.json();

//       if (quizzesData.success) {
//         setQuizzes(quizzesData.data);
//       }
//       if (resultsData.success) {
//         setResults(resultsData.data);
//       }
//     } catch (error) {
//       showToast.error('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     sessionStorage.clear();
//     router.push('/login');
//   };

//   const handleStartQuiz = (quizId: string) => {
//     router.push(`/quiz/${quizId}`);
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
//     if (diffDays === 0) return 'Today';
//     if (diffDays === 1) return 'Yesterday';
//     if (diffDays < 7) return `${diffDays}d ago`;
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   // Stats
//   const completedQuizIds = results.map(r => r.quizTitle);
//   const availableQuizzes = quizzes.filter(q => !results.some(r => r.quizTitle === q.title));
//   const completedCount = results.length;
//   const averageScore = results.length
//     ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)
//     : 0;
//   const totalPoints = results.reduce((acc, r) => acc + r.score, 0);
//   const assignedCount = quizzes.filter(q => q.visibility === 'assigned').length;

//   // Filtered quizzes
//   const filteredQuizzes = availableQuizzes.filter(q => {
//     const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       q.description?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesTab =
//       activeTab === 'all' ? true :
//       activeTab === 'assigned' ? q.visibility === 'assigned' :
//       q.visibility === 'public';
//     return matchesSearch && matchesTab;
//   });

//   // Streak
//   const calculateStreak = () => {
//     if (!results.length) return 0;
//     const sorted = [...results].sort((a, b) =>
//       new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
//     );
//     let streak = 1;
//     let cur = new Date(sorted[0].submittedAt);
//     for (let i = 1; i < sorted.length; i++) {
//       const prev = new Date(sorted[i].submittedAt);
//       const diff = Math.floor((cur.getTime() - prev.getTime()) / 86400000);
//       if (diff === 1) { streak++; cur = prev; }
//       else if (diff > 1) break;
//     }
//     return streak;
//   };
//   const streak = calculateStreak();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
//             <GraduationCap className="w-6 h-6 text-white animate-pulse" />
//           </div>
//           <div className="flex gap-1.5">
//             {[0,1,2].map(i => (
//               <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500/60 animate-bounce"
//                 style={{ animationDelay: `${i * 0.15}s` }} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#070709] text-white" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
//       <Toaster position="top-right" />

//       {/* Background */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px]" />
//         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/6 rounded-full blur-[100px]" />
//         <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
//         {/* Grid */}
//         <div className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
//             backgroundSize: '60px 60px'
//           }} />
//       </div>

//       <div className="relative z-10">
//         {/* Top Nav */}
//         <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/80 backdrop-blur-xl">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
//             {/* Logo */}
//             <div className="flex items-center gap-3 shrink-0">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
//                 <GraduationCap className="w-4 h-4 text-white" />
//               </div>
//               <span className="font-semibold text-white/90 hidden sm:block text-sm tracking-wide">QuizPortal</span>
//             </div>

//             {/* Search — hidden on mobile unless toggled */}
//             <AnimatePresence>
//               {showSearch && (
//                 <motion.div
//                   initial={{ opacity: 0, width: 0 }}
//                   animate={{ opacity: 1, width: '100%' }}
//                   exit={{ opacity: 0, width: 0 }}
//                   className="flex-1 max-w-md"
//                 >
//                   <input
//                     autoFocus
//                     type="text"
//                     value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
//                     placeholder="Search quizzes..."
//                     className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
//                     onBlur={() => { if (!searchQuery) setShowSearch(false); }}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Right Actions */}
//             <div className="flex items-center gap-2 shrink-0">
//               <button
//                 onClick={() => setShowSearch(!showSearch)}
//                 className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all"
//               >
//                 <Search className="w-4 h-4" />
//               </button>

//               <Link href="/profile">
//                 <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer">
//                   <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
//                     {user?.name?.charAt(0)?.toUpperCase() || 'S'}
//                   </div>
//                   <span className="text-xs text-white/60 hidden sm:block max-w-[100px] truncate">{user?.name}</span>
//                 </div>
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="p-2 rounded-xl text-white/30 hover:text-red-400/70 hover:bg-red-500/5 transition-all"
//                 title="Logout"
//               >
//                 <LogOut className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </nav>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

//           {/* Hero Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
//           >
//             <div>
//               <p className="text-white/30 text-sm mb-1 tracking-wide">{greeting} 👋</p>
//               <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
//                 {user?.name?.split(' ')[0]}<span className="text-violet-400">.</span>
//               </h1>
//               <p className="text-white/30 text-sm mt-2">
//                 {availableQuizzes.length > 0
//                   ? `${availableQuizzes.length} quiz${availableQuizzes.length !== 1 ? 'zes' : ''} waiting for you`
//                   : 'All caught up! Great work.'}
//               </p>
//             </div>

//             {/* Mini progress ring */}
//             <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl px-5 py-3">
//               <div className="relative w-12 h-12">
//                 <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
//                   <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
//                   <circle cx="22" cy="22" r="18" fill="none" stroke="url(#grad)" strokeWidth="3"
//                     strokeDasharray={`${Math.min(100, averageScore) * 1.13} 113`}
//                     strokeLinecap="round" />
//                   <defs>
//                     <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
//                       <stop offset="0%" stopColor="#8b5cf6" />
//                       <stop offset="100%" stopColor="#6366f1" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className="text-xs font-bold text-white">{averageScore}%</span>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-xs text-white/40">avg score</p>
//                 <p className="text-sm font-medium text-white">{completedCount} done</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Stats Row */}
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="grid grid-cols-2 sm:grid-cols-4 gap-3"
//           >
//             {[
//               { label: 'Available', value: availableQuizzes.length, icon: BookOpen, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
//               { label: 'Completed', value: completedCount, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
//               { label: 'Assigned', value: assignedCount, icon: Target, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
//               { label: 'Streak', value: `${streak}d`, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
//             ].map((stat, i) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 + i * 0.05 }}
//                 whileHover={{ y: -2 }}
//                 className={`relative overflow-hidden bg-white/[0.02] border ${stat.border} rounded-2xl p-4 hover:bg-white/[0.04] transition-all`}
//               >
//                 <div className={`w-8 h-8 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
//                   <stat.icon className={`w-4 h-4 ${stat.color}`} />
//                 </div>
//                 <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
//                 <p className="text-xs text-white/30 mt-0.5">{stat.label}</p>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Main Content Grid */}
//           <div className="grid lg:grid-cols-3 gap-6">

//             {/* Left: Quizzes Panel */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="lg:col-span-2 space-y-4"
//             >
//               {/* Panel Header */}
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//                 <div className="p-5 border-b border-white/[0.05]">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                     <div>
//                       <h2 className="text-base font-semibold text-white">Available Quizzes</h2>
//                       <p className="text-xs text-white/30 mt-0.5">Pick a challenge and start learning</p>
//                     </div>
//                     {/* Tabs */}
//                     <div className="flex items-center gap-1 bg-white/[0.03] rounded-xl p-1 w-fit">
//                       {(['all', 'assigned', 'public'] as const).map(tab => (
//                         <button
//                           key={tab}
//                           onClick={() => setActiveTab(tab)}
//                           className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                             activeTab === tab
//                               ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
//                               : 'text-white/30 hover:text-white/60'
//                           }`}
//                         >
//                           {tab}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Search bar inside panel */}
//                 {searchQuery && (
//                   <div className="px-5 py-2 border-b border-white/[0.05] bg-white/[0.01]">
//                     <p className="text-xs text-white/30">
//                       Showing results for "<span className="text-violet-400">{searchQuery}</span>"
//                     </p>
//                   </div>
//                 )}

//                 {/* Quiz List */}
//                 {filteredQuizzes.length === 0 ? (
//                   <div className="p-12 text-center">
//                     <div className="w-14 h-14 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <BookOpen className="w-7 h-7 text-white/20" />
//                     </div>
//                     <p className="text-white/40 text-sm">
//                       {searchQuery ? 'No quizzes match your search' : 'No quizzes available'}
//                     </p>
//                     {activeTab !== 'all' && (
//                       <button
//                         onClick={() => setActiveTab('all')}
//                         className="mt-3 text-xs text-violet-400 hover:text-violet-300"
//                       >
//                         View all quizzes
//                       </button>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-white/[0.04]">
//                     {filteredQuizzes.slice(0, 6).map((quiz, i) => (
//                       <motion.div
//                         key={quiz.id}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: i * 0.06 }}
//                         className="p-5 hover:bg-white/[0.02] transition-colors group"
//                       >
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                           {/* Quiz Icon */}
//                           <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] items-center justify-center shrink-0 group-hover:border-violet-500/30 transition-colors">
//                             {quiz.visibility === 'assigned'
//                               ? <Lock className="w-4 h-4 text-amber-400/70" />
//                               : <BookOpen className="w-4 h-4 text-violet-400/70" />
//                             }
//                           </div>

//                           <div className="flex-1 min-w-0">
//                             <div className="flex flex-wrap items-center gap-2 mb-1">
//                               <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
//                                 {quiz.title}
//                               </h3>
//                               {quiz.visibility === 'assigned' && (
//                                 <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 shrink-0">
//                                   assigned
//                                 </span>
//                               )}
//                             </div>
//                             {quiz.description && (
//                               <p className="text-xs text-white/30 mb-2 line-clamp-1">{quiz.description}</p>
//                             )}
//                             <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/20">
//                               <span className="flex items-center gap-1">
//                                 <Timer className="w-3 h-3" /> {quiz.duration}m
//                               </span>
//                               <span className="flex items-center gap-1">
//                                 <BarChart3 className="w-3 h-3" /> {quiz.questions?.length || 0} Qs
//                               </span>
//                               <span className="flex items-center gap-1">
//                                 <Star className="w-3 h-3" /> {quiz.totalMarks} marks
//                               </span>
//                               <span className="text-white/10">by {quiz.createdByName}</span>
//                             </div>
//                           </div>

//                           <motion.button
//                             whileHover={{ scale: 1.03 }}
//                             whileTap={{ scale: 0.97 }}
//                             onClick={() => handleStartQuiz(quiz.id)}
//                             className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 rounded-xl text-violet-400 text-sm font-medium transition-all whitespace-nowrap shrink-0"
//                           >
//                             <PlayCircle className="w-4 h-4" />
//                             Start
//                           </motion.button>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}

//                 {filteredQuizzes.length > 6 && (
//                   <div className="p-4 border-t border-white/[0.04]">
//                     <Link href="/quizzes" className="flex items-center justify-center gap-2 text-xs text-white/30 hover:text-violet-400 transition-colors">
//                       View {filteredQuizzes.length - 6} more quizzes
//                       <ArrowRight className="w-3 h-3" />
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Completed Quizzes Preview */}
//               {results.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.35 }}
//                   className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-sm font-semibold text-white">Completed</h3>
//                     <Link href="/results" className="text-xs text-white/30 hover:text-violet-400 flex items-center gap-1 transition-colors">
//                       All results <ChevronRight className="w-3 h-3" />
//                     </Link>
//                   </div>
//                   <div className="space-y-2">
//                     {results.slice(0, 3).map(result => (
//                       <Link href={`/results/${result.id}`} key={result.id}>
//                         <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
//                           <div className="flex items-center gap-3 min-w-0">
//                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
//                               result.percentage >= 70 ? 'bg-emerald-500/10' : 'bg-yellow-500/10'
//                             }`}>
//                               <Trophy className={`w-4 h-4 ${result.percentage >= 70 ? 'text-emerald-400' : 'text-yellow-400'}`} />
//                             </div>
//                             <div className="min-w-0">
//                               <p className="text-sm text-white/70 truncate group-hover:text-white transition-colors">{result.quizTitle}</p>
//                               <p className="text-xs text-white/25">{formatDate(result.submittedAt)}</p>
//                             </div>
//                           </div>
//                           <div className={`text-sm font-bold px-3 py-1 rounded-lg ${
//                             result.percentage >= 70
//                               ? 'bg-emerald-500/10 text-emerald-400'
//                               : 'bg-yellow-500/10 text-yellow-400'
//                           }`}>
//                             {result.percentage}%
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </motion.div>

//             {/* Right Sidebar */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="space-y-4"
//             >
//               {/* Score Overview */}
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
//                 <h3 className="text-sm font-semibold text-white mb-4">Performance</h3>

//                 {results.length === 0 ? (
//                   <div className="text-center py-6">
//                     <Award className="w-8 h-8 text-white/15 mx-auto mb-3" />
//                     <p className="text-xs text-white/30">Complete a quiz to see your stats</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {/* Score bar */}
//                     <div>
//                       <div className="flex justify-between text-xs mb-2">
//                         <span className="text-white/40">Average score</span>
//                         <span className="font-bold text-violet-400">{averageScore}%</span>
//                       </div>
//                       <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${averageScore}%` }}
//                           transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
//                           className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
//                         />
//                       </div>
//                     </div>

//                     {/* Points */}
//                     <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
//                       <div className="flex items-center gap-2">
//                         <Zap className="w-4 h-4 text-amber-400" />
//                         <span className="text-xs text-white/50">Total points</span>
//                       </div>
//                       <span className="text-sm font-bold text-white">{totalPoints}</span>
//                     </div>

//                     {/* Recent scores */}
//                     <div>
//                       <p className="text-xs text-white/30 mb-2">Recent scores</p>
//                       <div className="space-y-1.5">
//                         {results.slice(0, 4).map((r, i) => (
//                           <div key={r.id} className="flex items-center gap-2">
//                             <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
//                               <motion.div
//                                 initial={{ width: 0 }}
//                                 animate={{ width: `${r.percentage}%` }}
//                                 transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
//                                 className={`h-full rounded-full ${r.percentage >= 70 ? 'bg-emerald-400' : 'bg-yellow-400'}`}
//                               />
//                             </div>
//                             <span className="text-[10px] text-white/30 w-8 text-right">{r.percentage}%</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Streak Card */}
//               <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/15 rounded-2xl p-5">
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="text-sm font-semibold text-white">Study Streak</h3>
//                   <Flame className="w-4 h-4 text-orange-400" />
//                 </div>
//                 <div className="flex items-end gap-2 mb-3">
//                   <span className="text-4xl font-black text-white">{streak}</span>
//                   <span className="text-white/40 text-sm mb-1">days</span>
//                 </div>
//                 {/* 7-day mini chart */}
//                 <div className="flex items-end gap-1 h-8">
//                   {Array.from({ length: 7 }, (_, i) => {
//                     const day = new Date();
//                     day.setDate(day.getDate() - (6 - i));
//                     const hasResult = results.some(r => {
//                       const d = new Date(r.submittedAt);
//                       return d.toDateString() === day.toDateString();
//                     });
//                     return (
//                       <div key={i} className="flex-1 flex flex-col items-center gap-1">
//                         <div className={`w-full rounded-sm transition-all ${
//                           hasResult ? 'bg-orange-400 h-full' : 'bg-white/[0.06] h-2'
//                         }`} />
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <p className="text-[10px] text-white/25 mt-2">Last 7 days activity</p>
//               </div>

//               {/* Quick Links */}
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 space-y-1">
//                 <p className="text-xs text-white/30 mb-3 px-1">Quick Links</p>
//                 {[
//                   { label: 'All Quizzes', href: '/quizzes', icon: BookOpen },
//                   { label: 'My Results', href: '/results', icon: BarChart3 },
//                   { label: 'My Profile', href: '/profile', icon: User },
//                 ].map(link => (
//                   <Link key={link.href} href={link.href}>
//                     <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer">
//                       <div className="flex items-center gap-3">
//                         <link.icon className="w-4 h-4 text-white/30 group-hover:text-violet-400 transition-colors" />
//                         <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">{link.label}</span>
//                       </div>
//                       <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import {
  BookOpen, Award, Clock, LogOut, ChevronRight, BarChart3,
  Target, Star, CheckCircle, PlayCircle, Trophy, Flame,
  TrendingUp, User, Search, Lock, ArrowRight,
  GraduationCap, Timer, X, Zap,
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface Quiz {
  id: string; title: string; description: string;
  duration: number; questions: any[]; totalMarks: number;
  createdByName: string; difficulty?: string; category?: string;
  attempts?: number; visibility?: string;
}
interface Result {
  id: string; quizTitle: string; percentage: number;
  score: number; totalMarks: number; submittedAt: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'public'>('all');
  const [showSearch, setShowSearch] = useState(false);
  // mobile bottom tab
  const [mobileView, setMobileView] = useState<'quizzes' | 'results' | 'stats'>('quizzes');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening');
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    fetchData(userData.id);
  }, [router]);

  const fetchData = async (userId: string) => {
    try {
      const [quizzesRes, resultsRes] = await Promise.all([
        fetch(`/api/quizzes/student?studentId=${userId}`),
        fetch(`/api/results/user/${userId}`),
      ]);
      const quizzesData = await quizzesRes.json();
      const resultsData = await resultsRes.json();
      if (quizzesData.success) setQuizzes(quizzesData.data);
      if (resultsData.success) setResults(resultsData.data);
    } catch {
      showToast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    router.push('/login');
  };

  const handleStartQuiz = (quizId: string) => router.push(`/quiz/${quizId}`);

  const formatDate = (d: string) => {
    const date = new Date(d);
    const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // ── Derived stats ──────────────────────────────────────────────
  const availableQuizzes = quizzes.filter(q => !results.some(r => r.quizTitle === q.title));
  const completedCount = results.length;
  const averageScore = results.length
    ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length) : 0;
  const totalPoints = results.reduce((a, r) => a + r.score, 0);
  const assignedCount = quizzes.filter(q => q.visibility === 'assigned').length;

  const filteredQuizzes = availableQuizzes.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab = activeTab === 'all' ? true :
      activeTab === 'assigned' ? q.visibility === 'assigned' : q.visibility === 'public';
    return matchSearch && matchTab;
  });

  const calculateStreak = () => {
    if (!results.length) return 0;
    const sorted = [...results].sort((a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    let streak = 1; let cur = new Date(sorted[0].submittedAt);
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i].submittedAt);
      const diff = Math.floor((cur.getTime() - prev.getTime()) / 86400000);
      if (diff === 1) { streak++; cur = prev; } else if (diff > 1) break;
    }
    return streak;
  };
  const streak = calculateStreak();
  const recentResults = [...results]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 6);

  // ── Loading ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="flex gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500/60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Main ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#070709] text-white" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-violet-600/7 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-white/90 text-sm hidden sm:block">QuizPortal</span>
          </div>

          {/* Inline search — expands on mobile */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 max-w-sm"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search quizzes..."
                    className="w-full pl-9 pr-9 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
                    onBlur={() => { if (!searchQuery) setShowSearch(false); }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link href="/profile">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || 'S'}
                </div>
                <span className="text-xs text-white/60 hidden sm:block max-w-[80px] truncate">{user?.name}</span>
              </div>
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-xl text-white/30 hover:text-red-400/70 hover:bg-red-500/5 transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5 sm:py-8 pb-24 sm:pb-10 space-y-5 sm:space-y-8">

        {/* ── Hero Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-white/30 text-xs sm:text-sm mb-1">{greeting} 👋</p>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {user?.name?.split(' ')[0]}<span className="text-violet-400">.</span>
            </h1>
            <p className="text-white/30 text-xs sm:text-sm mt-1.5">
              {availableQuizzes.length > 0
                ? `${availableQuizzes.length} quiz${availableQuizzes.length !== 1 ? 'zes' : ''} waiting for you`
                : 'All caught up! Great work.'}
            </p>
          </div>

          {/* Progress ring */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl px-4 py-3 w-fit">
            <div className="relative w-11 h-11">
              <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <circle cx="22" cy="22" r="18" fill="none" stroke="url(#vgrad)" strokeWidth="3"
                  strokeDasharray={`${Math.min(100, averageScore) * 1.13} 113`} strokeLinecap="round" />
                <defs>
                  <linearGradient id="vgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{averageScore}%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-white/40">avg score</p>
              <p className="text-sm font-medium text-white">{completedCount} done</p>
            </div>
          </div>
        </div>

        {/* ── Stats — 2×2 on mobile, 4 on lg ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {[
            { label: 'Available', value: availableQuizzes.length, icon: BookOpen,     color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
            { label: 'Completed', value: completedCount,          icon: CheckCircle,  color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
            { label: 'Assigned',  value: assignedCount,           icon: Target,       color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
            { label: 'Streak',    value: `${streak}d`,            icon: Flame,        color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05 }}
              className={`bg-white/[0.02] border ${stat.border} rounded-2xl p-3.5 sm:p-4 hover:bg-white/[0.04] transition-all`}
            >
              <div className={`w-8 h-8 ${stat.bg} rounded-xl flex items-center justify-center mb-2.5`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-white/30 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile tab bar ── */}
        <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1 sm:hidden">
          {(['quizzes', 'results', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setMobileView(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                mobileView === tab
                  ? 'bg-violet-500/15 text-violet-400 border border-violet-500/25'
                  : 'text-white/30'
              }`}
            >
              {tab === 'quizzes' ? `Quizzes (${filteredQuizzes.length})` :
               tab === 'results' ? `Results (${results.length})` : 'Stats'}
            </button>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">

          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Available Quizzes — visible on desktop always, mobile only on 'quizzes' tab */}
            <div className={`${mobileView !== 'quizzes' ? 'hidden lg:block' : ''}`}>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                {/* Panel header */}
                <div className="p-4 sm:p-5 border-b border-white/[0.05]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Available Quizzes</h2>
                      <p className="text-xs text-white/30 mt-0.5">Pick a challenge and start learning</p>
                    </div>
                    {/* Filter tabs */}
                    <div className="flex items-center gap-1 bg-white/[0.03] rounded-xl p-1 w-fit">
                      {(['all', 'assigned', 'public'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            activeTab === tab
                              ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                              : 'text-white/30 hover:text-white/60'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Active search indicator */}
                  {searchQuery && (
                    <div className="flex items-center gap-2 mt-3">
                      <p className="text-xs text-white/30">
                        Results for "<span className="text-violet-400">{searchQuery}</span>"
                      </p>
                      <button onClick={() => setSearchQuery('')} className="text-white/25 hover:text-white/50">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {filteredQuizzes.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="w-12 h-12 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-white/20" />
                    </div>
                    <p className="text-white/40 text-sm">{searchQuery ? 'No quizzes match' : 'No quizzes available'}</p>
                    {activeTab !== 'all' && (
                      <button onClick={() => setActiveTab('all')} className="mt-3 text-xs text-violet-400 hover:text-violet-300">
                        View all quizzes
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.04]">
                    {filteredQuizzes.slice(0, 6).map((quiz, i) => (
                      <div key={quiz.id} className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors group">
                        <div className="flex items-center gap-3">
                          {/* Icon — hidden on mobile */}
                          <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] items-center justify-center shrink-0 group-hover:border-violet-500/30 transition-colors">
                            {quiz.visibility === 'assigned'
                              ? <Lock className="w-4 h-4 text-amber-400/70" />
                              : <BookOpen className="w-4 h-4 text-violet-400/70" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                                {quiz.title}
                              </h3>
                              {quiz.visibility === 'assigned' && (
                                <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 shrink-0">
                                  assigned
                                </span>
                              )}
                            </div>
                            {quiz.description && (
                              <p className="text-xs text-white/30 mb-1.5 line-clamp-1">{quiz.description}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-2.5 text-[10px] sm:text-[11px] text-white/20">
                              <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {quiz.duration}m</span>
                              <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {quiz.questions?.length || 0} Qs</span>
                              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {quiz.totalMarks}pts</span>
                              <span className="text-white/10 hidden sm:inline">by {quiz.createdByName}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleStartQuiz(quiz.id)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 rounded-xl text-violet-400 text-xs font-medium transition-all whitespace-nowrap shrink-0"
                          >
                            <PlayCircle className="w-3.5 h-3.5 shrink-0" />
                            Start
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredQuizzes.length > 6 && (
                  <div className="p-4 border-t border-white/[0.04]">
                    <Link href="/quizzes" className="flex items-center justify-center gap-2 text-xs text-white/30 hover:text-violet-400 transition-colors">
                      View {filteredQuizzes.length - 6} more quizzes
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Completed quizzes — mobile 'results' tab / desktop always */}
            {results.length > 0 && (
              <div className={`${mobileView !== 'results' ? 'hidden lg:block' : ''}`}>
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-white/[0.05]">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Completed Quizzes</h3>
                      <p className="text-xs text-white/25 mt-0.5">{results.length} submitted</p>
                    </div>
                    <Link href="/results" className="text-xs text-white/30 hover:text-violet-400 flex items-center gap-1 transition-colors">
                      All results <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="divide-y divide-white/[0.04]">
                    {recentResults.map(result => (
                      <Link href={`/results/${result.id}`} key={result.id}>
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 hover:bg-white/[0.02] transition-colors group">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              result.percentage >= 70 ? 'bg-emerald-500/10' : 'bg-yellow-500/10'
                            }`}>
                              <Trophy className={`w-4 h-4 ${result.percentage >= 70 ? 'text-emerald-400' : 'text-yellow-400'}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm text-white/70 truncate group-hover:text-white transition-colors">{result.quizTitle}</p>
                              <p className="text-xs text-white/25">{formatDate(result.submittedAt)}</p>
                            </div>
                          </div>
                          <div className={`text-sm font-bold px-3 py-1 rounded-lg shrink-0 ${
                            result.percentage >= 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {result.percentage}%
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right sidebar — always on desktop, 'stats' tab on mobile ── */}
          <div className={`space-y-4 ${mobileView !== 'stats' ? 'hidden lg:block' : ''}`}>

            {/* Performance */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Performance</h3>
              {results.length === 0 ? (
                <div className="text-center py-6">
                  <Award className="w-8 h-8 text-white/15 mx-auto mb-3" />
                  <p className="text-xs text-white/30">Complete a quiz to see your stats</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/40">Average score</span>
                      <span className="font-bold text-violet-400">{averageScore}%</span>
                    </div>
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${averageScore}%` }}
                        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-white/50">Total points</span>
                    </div>
                    <span className="text-sm font-bold text-white">{totalPoints}</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-2">Recent scores</p>
                    <div className="space-y-1.5">
                      {results.slice(0, 4).map((r, i) => (
                        <div key={r.id} className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${r.percentage}%` }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className={`h-full rounded-full ${r.percentage >= 70 ? 'bg-emerald-400' : 'bg-yellow-400'}`}
                            />
                          </div>
                          <span className="text-[10px] text-white/30 w-8 text-right">{r.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/15 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Study Streak</h3>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-black text-white">{streak}</span>
                <span className="text-white/40 text-sm mb-1">days</span>
              </div>
              <div className="flex items-end gap-1 h-8">
                {Array.from({ length: 7 }, (_, i) => {
                  const day = new Date();
                  day.setDate(day.getDate() - (6 - i));
                  const hasResult = results.some(r => {
                    const d = new Date(r.submittedAt);
                    return d.toDateString() === day.toDateString();
                  });
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-full rounded-sm ${hasResult ? 'bg-orange-400 h-full' : 'bg-white/[0.06] h-2'}`} />
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-white/25 mt-2">Last 7 days activity</p>
            </div>

            {/* Quick Links */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 space-y-1">
              <p className="text-xs text-white/30 mb-3 px-1">Quick Links</p>
              {[
                { label: 'All Quizzes', href: '/quizzes', icon: BookOpen,  color: 'text-violet-400' },
                { label: 'My Results',  href: '/results', icon: BarChart3, color: 'text-emerald-400' },
                { label: 'My Profile',  href: '/profile', icon: User,      color: 'text-sky-400'     },
              ].map(link => (
                <Link key={link.href} href={link.href}>
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <link.icon className={`w-4 h-4 ${link.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                      <span className="text-sm text-white/45 group-hover:text-white/80 transition-colors">{link.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/15 group-hover:text-white/35 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}