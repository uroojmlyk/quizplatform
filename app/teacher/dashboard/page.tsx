

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Toaster, toast as hotToast } from 'react-hot-toast';
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
//   BookOpen,
//   Star,
//   Target,
//   Activity,
//   Settings,
//   HelpCircle,
//   GraduationCap,
//   Zap,
//   Gift
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
//   difficulty?: 'beginner' | 'intermediate' | 'advanced';
//   category?: string;
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
//   const [greeting, setGreeting] = useState('');
//   const [previousStats, setPreviousStats] = useState({
//     quizzes: 0,
//     results: 0,
//     students: 0
//   });

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
//         // Store previous count for achievements
//         const prevQuizzes = quizzes.length;
        
//         // Add mock difficulty for demo
//         const quizzesWithMeta = quizzesData.data.map((q: Quiz) => ({
//           ...q,
//           difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any,
//           category: ['web development', 'programming', 'database', 'design', 'business'][Math.floor(Math.random() * 5)]
//         }));
        
//         setQuizzes(quizzesWithMeta);
        
//         // Check for new quiz creation achievement
//         if (quizzesWithMeta.length > prevQuizzes && prevQuizzes > 0) {
//           const newQuizzes = quizzesWithMeta.length - prevQuizzes;
//           showToast.achievement(
//             newQuizzes === 1 ? 'New Quiz Created! 🎯' : 'Quizzes Added! 📚',
//             newQuizzes === 1 
//               ? 'Your students will love this new challenge'
//               : `You've added ${newQuizzes} new quizzes`
//           );
//         }
        
//         // First quiz milestone
//         if (prevQuizzes === 0 && quizzesWithMeta.length === 1) {
//           showToast.achievement(
//             'First Quiz! 🏆',
//             'Congratulations on creating your first quiz'
//           );
//         }
        
//         // Milestone achievements
//         if (prevQuizzes < 5 && quizzesWithMeta.length >= 5) {
//           showToast.achievement(
//             'Quiz Master! ⭐',
//             'You\'ve created 5 quizzes - amazing work!'
//           );
//         }
        
//         if (prevQuizzes < 10 && quizzesWithMeta.length >= 10) {
//           showToast.achievement(
//             'Double Digits! 🔥',
//             '10 quizzes created - you\'re on fire!'
//           );
//         }
//       }

//       if (resultsData.success) {
//         // Store previous stats
//         const prevResults = results.length;
//         const prevStudents = results.length ? new Set(results.map(r => r.userName)).size : 0;
        
//         setResults(resultsData.data);
        
//         // Calculate new stats
//         const currentStudents = new Set(resultsData.data.map(r => r.userName)).size;
//         const newResults = resultsData.data.length - prevResults;
//         const newStudents = currentStudents - prevStudents;
        
//         // Show meaningful notifications based on activity
//         if (newResults > 0) {
//           // Student activity toast
//           showToast.stats(newResults, newStudents);
          
//           // Check for perfect scores
//           const perfectScores = resultsData.data
//             .slice(prevResults)
//             .filter((r: Result) => r.percentage === 100);
          
//           if (perfectScores.length > 0) {
//             showToast.achievement(
//               perfectScores.length === 1 ? 'Perfect Score! 🏆' : 'Perfect Scores! 🏆',
//               `${perfectScores.length} student${perfectScores.length > 1 ? 's' : ''} aced ${perfectScores.length === 1 ? 'a quiz' : 'quizzes'}`
//             );
//           }
          
//           // Check for struggling students (scores below 40)
//           const strugglingStudents = resultsData.data
//             .slice(prevResults)
//             .filter((r: Result) => r.percentage < 40);
          
//           if (strugglingStudents.length > 0) {
//             showToast.custom((t) => (
//               <div className={`${
//                 t.visible ? 'animate-enter' : 'animate-leave'
//               } max-w-md w-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl shadow-2xl pointer-events-auto`}>
//                 <div className="p-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
//                       <HelpCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-white">Attention Needed</p>
//                       <p className="text-xs text-white/40">
//                         {strugglingStudents.length} student{strugglingStudents.length > 1 ? 's' : ''} scored below 40%
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ), { duration: 6000 });
//           }
//         }
        
//         // Weekly summary (only once per week)
//         const lastWeek = new Date();
//         lastWeek.setDate(lastWeek.getDate() - 7);
        
//         const weeklyResults = resultsData.data.filter((r: Result) => 
//           new Date(r.submittedAt) > lastWeek
//         ).length;
        
//         const weeklySummaryShown = sessionStorage.getItem('weeklyTeacherSummary');
//         if (weeklyResults > 0 && !weeklySummaryShown) {
//           showToast.custom((t) => (
//             <div className={`${
//               t.visible ? 'animate-enter' : 'animate-leave'
//             } max-w-md w-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl shadow-2xl pointer-events-auto`}>
//               <div className="p-4">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
//                     <TrendingUp className="w-4 h-4 text-indigo-400" />
//                   </div>
//                   <p className="text-sm font-medium text-white">Weekly Summary</p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="bg-white/[0.02] rounded-lg p-2">
//                     <p className="text-[10px] text-white/30">submissions</p>
//                     <p className="text-sm font-light text-white">{weeklyResults}</p>
//                   </div>
//                   <div className="bg-white/[0.02] rounded-lg p-2">
//                     <p className="text-[10px] text-white/30">active students</p>
//                     <p className="text-sm font-light text-white">{new Set(resultsData.data.map(r => r.userName)).size}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ), { duration: 5000 });
          
//           sessionStorage.setItem('weeklyTeacherSummary', 'true');
//         }
//       }

//       // Regular dashboard update toast (only if there's actual new data)
//       if (quizzesData.success || resultsData.success) {
//         const toastId = showToast.loading('refreshing dashboard...');
//         setTimeout(() => {
//           hotToast.dismiss(toastId);
//           showToast.success('dashboard updated');
//         }, 800);
//       }
      
//     } catch (error) {
//       showToast.error('failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditQuiz = (quiz: Quiz) => {
//     const quizId = quiz._id || quiz.id;
    
//     if (!quizId) {
//       showToast.error('quiz id not found');
//       return;
//     }
    
//     const toastId = showToast.loading('loading editor...');
//     setTimeout(() => {
//       hotToast.dismiss(toastId);
//       router.push(`/teacher/edit-quiz/${quizId}`);
//     }, 800);
//   };

//   const handleDeleteQuiz = async (quizId: string, quizTitle: string) => {
//     if (!confirm(`are you sure you want to delete "${quizTitle}"? this action cannot be undone.`)) {
//       return;
//     }

//     setDeletingId(quizId);
//     const toastId = showToast.loading('deleting quiz...');
    
//     try {
//       const res = await fetch(`/api/quizzes/${quizId}`, {
//         method: 'DELETE',
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setQuizzes(quizzes.filter(q => (q._id !== quizId && q.id !== quizId)));
//         hotToast.dismiss(toastId);
//         showToast.success('quiz deleted successfully');
//       } else {
//         hotToast.dismiss(toastId);
//         showToast.error(data.error || 'failed to delete quiz');
//       }
//     } catch (error) {
//       hotToast.dismiss(toastId);
//       showToast.error('network error');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const handleLogout = () => {
//     const toastId = showToast.loading('logging out...');
    
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       sessionStorage.clear();
//       hotToast.dismiss(toastId);
//       showToast.success('logged out successfully');
      
//       setTimeout(() => router.push('/login'), 1000);
//     }, 800);
//   };

//   // Calculate statistics
//   const totalQuizzes = quizzes.length;
//   const totalStudents = results.length ? new Set(results.map(r => r.userName)).size : 0;
//   const totalSubmissions = results.length;
//   const averageScore = results.length 
//     ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
//     : 0;
  
//   // Calculate pass rate (score >= 70)
//   const passCount = results.filter(r => r.percentage >= 70).length;
//   const passRate = results.length ? Math.round((passCount / results.length) * 100) : 0;
  
//   // Calculate this week's activity
//   const thisWeek = new Date();
//   thisWeek.setDate(thisWeek.getDate() - 7);
//   const weeklyActivity = results.filter(r => new Date(r.submittedAt) > thisWeek).length;

//   const stats = [
//     { 
//       title: 'quizzes', 
//       value: totalQuizzes, 
//       icon: FileText, 
//       change: `${totalQuizzes} created`,
//       gradient: 'from-indigo-500 to-purple-500',
//       bg: 'bg-indigo-500/10',
//       text: 'text-indigo-400',
//       delay: 0
//     },
//     { 
//       title: 'students', 
//       value: totalStudents, 
//       icon: GraduationCap, 
//       change: `${totalStudents} enrolled`,
//       gradient: 'from-emerald-500 to-green-500',
//       bg: 'bg-emerald-500/10',
//       text: 'text-emerald-400',
//       delay: 100
//     },
//     { 
//       title: 'submissions', 
//       value: totalSubmissions, 
//       icon: BarChart3, 
//       change: `${weeklyActivity} this week`,
//       gradient: 'from-purple-500 to-pink-500',
//       bg: 'bg-purple-500/10',
//       text: 'text-purple-400',
//       delay: 200
//     },
//     { 
//       title: 'avg score', 
//       value: `${averageScore}%`, 
//       icon: TrendingUp, 
//       change: `${passRate}% pass rate`,
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
//         <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        
//         <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
//           {/* Header Skeleton */}
//           <div className="flex justify-between items-center mb-12">
//             <div>
//               <div className="w-32 h-8 bg-white/[0.02] rounded animate-pulse mb-2"></div>
//               <div className="w-48 h-4 bg-white/[0.02] rounded animate-pulse"></div>
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
//               manage your quizzes and track student performance
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
//                   {user?.name?.charAt(0) || 'T'}
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

//         {/* Welcome Card with Create Quiz Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="relative mb-12"
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          
//           <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 overflow-hidden">
//             <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
//               <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full filter blur-3xl"></div>
//             </div>
            
//             <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/[0.05]">
//                   <Gift className="w-8 h-8 text-indigo-400" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-light text-white mb-1">ready to create something new?</h2>
//                   <p className="text-sm text-white/30">design a quiz and challenge your students</p>
//                 </div>
//               </div>
              
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => {
//                   const toastId = showToast.loading('opening creator...');
//                   setTimeout(() => {
//                     hotToast.dismiss(toastId);
//                     router.push('/teacher/create-quiz');
//                   }, 800);
//                 }}
//                 className="flex items-center gap-2 px-6 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all group"
//               >
//                 <PlusCircle className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
//                 <span className="text-sm text-white/60 group-hover:text-white">create new quiz</span>
//               </motion.button>
//             </div>
//           </div>
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
//           {/* My Quizzes */}
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
//                     <h2 className="text-lg font-light text-white">my quizzes</h2>
//                     <p className="text-sm text-white/30 mt-1">
//                       {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} created
//                     </p>
//                   </div>
//                   <Link 
//                     href="/teacher/quizzes"
//                     className="text-xs text-white/30 hover:text-indigo-400 transition-colors flex items-center gap-1"
//                   >
//                     view all
//                     <ChevronRight className="w-3 h-3" />
//                   </Link>
//                 </div>
//               </div>
              
//               {quizzes.length === 0 ? (
//                 <div className="p-12 text-center">
//                   <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <FileText className="w-8 h-8 text-white/20" />
//                   </div>
//                   <p className="text-white/40 text-sm mb-2">no quizzes yet</p>
//                   <p className="text-white/20 text-xs">create your first quiz to get started</p>
//                 </div>
//               ) : (
//                 <div className="divide-y divide-white/[0.05]">
//                   {quizzes.slice(0, 4).map((quiz, index) => {
//                     const quizResults = results.filter(r => r.quizId === quiz._id);
//                     const avgScore = quizResults.length
//                       ? Math.round(quizResults.reduce((acc, r) => acc + r.percentage, 0) / quizResults.length)
//                       : 0;
                    
//                     const passRate = quizResults.length
//                       ? Math.round((quizResults.filter(r => r.percentage >= 70).length / quizResults.length) * 100)
//                       : 0;

//                     return (
//                       <motion.div
//                         key={`quiz-${quiz._id || quiz.id}`}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.1 * index }}
//                         className="p-6 hover:bg-white/[0.02] transition-colors group"
//                       >
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-2">
//                               <h3 className="text-base font-medium text-white group-hover:text-indigo-400 transition-colors">
//                                 {quiz.title}
//                               </h3>
//                               {quiz.difficulty && (
//                                 <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
//                                   quiz.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
//                                   quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
//                                   'bg-red-500/10 text-red-400 border-red-500/30'
//                                 }`}>
//                                   {quiz.difficulty}
//                                 </span>
//                               )}
//                               <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
//                                 quizResults.length > 0
//                                   ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
//                                   : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
//                               }`}>
//                                 {quizResults.length} attempt{quizResults.length !== 1 ? 's' : ''}
//                               </span>
//                             </div>
//                             <p className="text-sm text-white/30 mb-3 line-clamp-1">{quiz.description}</p>
//                             <div className="flex items-center gap-4 text-xs text-white/20">
//                               <span className="flex items-center gap-1">
//                                 <Clock className="w-3 h-3" /> {quiz.duration} min
//                               </span>
//                               <span>·</span>
//                               <span>{quiz.questions?.length || 0} questions</span>
//                               <span>·</span>
//                               <span>{quiz.totalMarks} marks</span>
//                               {quizResults.length > 0 && (
//                                 <>
//                                   <span>·</span>
//                                   <span className="text-indigo-400/60">avg {avgScore}%</span>
//                                   <span>·</span>
//                                   <span className="text-emerald-400/60">{passRate}% pass</span>
//                                 </>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center gap-2">
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => handleEditQuiz(quiz)}
//                               className="p-2 bg-white/[0.02] hover:bg-indigo-500/20 border border-white/[0.05] hover:border-indigo-500/50 rounded-lg text-white/40 hover:text-indigo-400 transition-all"
//                               title="edit quiz"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </motion.button>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => handleDeleteQuiz(quiz._id, quiz.title)}
//                               disabled={deletingId === quiz._id}
//                               className="p-2 bg-white/[0.02] hover:bg-red-500/20 border border-white/[0.05] hover:border-red-500/50 rounded-lg text-white/40 hover:text-red-400 transition-all disabled:opacity-50"
//                               title="delete quiz"
//                             >
//                               {deletingId === quiz._id ? (
//                                 <Loader2 className="w-4 h-4 animate-spin" />
//                               ) : (
//                                 <Trash2 className="w-4 h-4" />
//                               )}
//                             </motion.button>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => {
//                                 const toastId = showToast.loading('loading results...');
//                                 setTimeout(() => {
//                                   hotToast.dismiss(toastId);
//                                   router.push(`/teacher/quiz-results/${quiz._id}`);
//                                 }, 800);
//                               }}
//                               className="flex items-center gap-1 px-3 py-2 bg-white/[0.02] hover:bg-indigo-500/20 border border-white/[0.05] hover:border-indigo-500/50 rounded-lg text-white/40 hover:text-indigo-400 transition-all text-xs"
//                             >
//                               <span>details</span>
//                               <ChevronRight className="w-3 h-3" />
//                             </motion.button>
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
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
//                   {results.slice(0, 5).map((result, index) => (
//                     <motion.div
//                       key={`result-${result._id || index}`}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.1 * index }}
//                       className="p-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl transition-colors"
//                     >
//                       <div className="flex items-center justify-between mb-1">
//                         <div className="flex items-center gap-2">
//                           <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-[10px]">
//                             {result.userName?.charAt(0) || 'U'}
//                           </div>
//                           <p className="text-sm text-white/80 truncate max-w-[100px]">{result.userName}</p>
//                         </div>
//                         <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
//                           result.percentage >= 70 
//                             ? 'bg-emerald-500/10 text-emerald-400' 
//                             : result.percentage >= 40
//                             ? 'bg-yellow-500/10 text-yellow-400'
//                             : 'bg-red-500/10 text-red-400'
//                         }`}>
//                           {result.percentage}%
//                         </span>
//                       </div>
//                       <p className="text-xs text-white/30 truncate mb-1">{result.quizTitle}</p>
//                       <p className="text-[10px] text-white/20">{new Date(result.submittedAt).toLocaleDateString()}</p>
//                     </motion.div>
//                   ))}
                  
//                   {results.length > 5 && (
//                     <Link 
//                       href="/teacher/all-results"
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
//                   <Target className="w-4 h-4 text-indigo-400/60" />
//                   <span className="text-xs text-white/40">pass rate</span>
//                 </div>
//                 <p className="text-xl font-light text-white mb-1">{passRate}%</p>
//                 <p className="text-[10px] text-white/20">of students passed</p>
//               </div>
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Zap className="w-4 h-4 text-purple-400/60" />
//                   <span className="text-xs text-white/40">engagement</span>
//                 </div>
//                 <p className="text-xl font-light text-white mb-1">
//                   {results.length ? Math.round((results.length / (totalStudents || 1)) * 100) : 0}%
//                 </p>
//                 <p className="text-[10px] text-white/20">submission rate</p>
//               </div>
//             </div>

//             {/* Tips Card */}
//             <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
//                   <HelpCircle className="w-4 h-4 text-indigo-400" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-white/80 mb-1">pro tip</p>
//                   <p className="text-xs text-white/30">add images to your quizzes to increase engagement by 40%</p>
//                 </div>
//               </div>
//             </div>

//             {/* Settings Link */}
//             <Link href="/teacher/settings">
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer"
//               >
//                 <div className="flex items-center gap-3">
//                   <Settings className="w-5 h-5 text-indigo-400/60" />
//                   <span className="text-sm text-white/80">dashboard settings</span>
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

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import {
//   PlusCircle,
//   BookOpen,
//   Users,
//   BarChart3,
//   LogOut,
//   Edit3,
//   Trash2,
//   Clock,
//   Star,
//   ChevronRight,
//   TrendingUp,
//   Award,
//   Eye,
//   MoreVertical,
//   Search,
//   Filter,
//   Globe,
//   Lock,
//   CheckCircle,
//   AlertCircle,
//   GraduationCap,
//   Layers,
//   Target,
//   Zap,
//   ArrowUpRight,
//   FileText,
//   X
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: any[];
//   createdAt: string;
//   visibility: 'public' | 'private' | 'assigned';
//   assignedTo?: string[];
//   attempts?: number;
// }

// interface Result {
//   id: string;
//   quizId: string;
//   quizTitle: string;
//   studentName: string;
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
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterVisibility, setFilterVisibility] = useState<'all' | 'public' | 'assigned'>('all');
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [deleteModal, setDeleteModal] = useState<{ open: boolean; quiz: Quiz | null }>({ open: false, quiz: null });
//   const [deleting, setDeleting] = useState(false);
//   const [activeTab, setActiveTab] = useState<'quizzes' | 'results'>('quizzes');

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const userData = JSON.parse(storedUser);
//     if (userData.role !== 'teacher') { router.push('/login'); return; }
//     setUser(userData);
//     fetchData(userData.id);
//   }, [router]);

//   const fetchData = async (teacherId: string) => {
//     try {
//       const [quizzesRes, resultsRes] = await Promise.all([
//         fetch(`/api/quizzes/teacher/${teacherId}`),
//         fetch(`/api/results/teacher/${teacherId}`)
//       ]);
//       const quizzesData = await quizzesRes.json();
//       const resultsData = await resultsRes.json();
//       if (quizzesData.success) setQuizzes(quizzesData.data || []);
//       if (resultsData.success) setResults(resultsData.data || []);
//     } catch {
//       showToast.error('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteModal.quiz) return;
//     setDeleting(true);
//     try {
//       const res = await fetch(`/api/quizzes/${deleteModal.quiz.id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (data.success) {
//         setQuizzes(prev => prev.filter(q => q.id !== deleteModal.quiz!.id));
//         showToast.success('Quiz deleted');
//         setDeleteModal({ open: false, quiz: null });
//       } else {
//         showToast.error(data.error || 'Failed to delete');
//       }
//     } catch {
//       showToast.error('Network error');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   const formatDate = (d: string) => {
//     const date = new Date(d);
//     const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
//     if (diff === 0) return 'Today';
//     if (diff === 1) return 'Yesterday';
//     if (diff < 7) return `${diff}d ago`;
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   // Filtered quizzes
//   const filteredQuizzes = quizzes.filter(q => {
//     const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchFilter = filterVisibility === 'all' ? true : q.visibility === filterVisibility;
//     return matchSearch && matchFilter;
//   });

//   // Stats
//   const totalStudents = new Set(results.map(r => r.studentName)).size;
//   const avgScore = results.length
//     ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length)
//     : 0;
//   const totalAttempts = results.length;
//   const recentResults = [...results]
//     .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
//     .slice(0, 8);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
//             <GraduationCap className="w-6 h-6 text-white animate-pulse" />
//           </div>
//           <div className="flex gap-1.5">
//             {[0, 1, 2].map(i => (
//               <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce"
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

//       {/* Ambient Background */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-emerald-600/6 rounded-full blur-[130px]" />
//         <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-teal-600/5 rounded-full blur-[100px]" />
//         <div className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
//             backgroundSize: '60px 60px'
//           }} />
//       </div>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
//               <GraduationCap className="w-4 h-4 text-white" />
//             </div>
//             <div className="hidden sm:block">
//               <span className="font-semibold text-white/90 text-sm">QuizPortal</span>
//               <span className="ml-2 text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Teacher</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <Link href="/teacher/create-quiz">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 hover:border-emerald-500/40 rounded-xl text-emerald-400 text-sm font-medium transition-all"
//               >
//                 <PlusCircle className="w-4 h-4" />
//                 <span className="hidden sm:block">New Quiz</span>
//               </motion.button>
//             </Link>

//             <Link href="/profile">
//               <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer">
//                 <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
//                   {user?.name?.charAt(0)?.toUpperCase() || 'T'}
//                 </div>
//                 <span className="text-xs text-white/60 hidden sm:block max-w-[100px] truncate">{user?.name}</span>
//               </div>
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="p-2 rounded-xl text-white/30 hover:text-red-400/70 hover:bg-red-500/5 transition-all"
//             >
//               <LogOut className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

//         {/* Page Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
//         >
//           <div>
//             <p className="text-white/30 text-sm mb-1">Welcome back 👋</p>
//             <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
//               {user?.name?.split(' ')[0]}<span className="text-emerald-400">.</span>
//             </h1>
//             <p className="text-white/30 text-sm mt-2">
//               {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} · {totalAttempts} total attempts
//             </p>
//           </div>

//           <Link href="/teacher/create-quiz">
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/25 rounded-2xl text-emerald-400 font-medium text-sm transition-all cursor-pointer w-fit"
//             >
//               <PlusCircle className="w-4 h-4" />
//               Create New Quiz
//               <ArrowUpRight className="w-3.5 h-3.5" />
//             </motion.div>
//           </Link>
//         </motion.div>

//         {/* Stats Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.08 }}
//           className="grid grid-cols-2 lg:grid-cols-4 gap-3"
//         >
//           {[
//             {
//               label: 'Total Quizzes', value: quizzes.length, icon: Layers,
//               color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20',
//               sub: `${quizzes.filter(q => q.visibility === 'public').length} public`
//             },
//             {
//               label: 'Total Attempts', value: totalAttempts, icon: Target,
//               color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',
//               sub: 'across all quizzes'
//             },
//             {
//               label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp,
//               color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20',
//               sub: avgScore >= 70 ? 'students doing well' : 'needs attention'
//             },
//             {
//               label: 'Students', value: totalStudents, icon: Users,
//               color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20',
//               sub: 'have attempted'
//             },
//           ].map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 + i * 0.05 }}
//               whileHover={{ y: -2 }}
//               className={`bg-white/[0.02] border ${stat.border} rounded-2xl p-4 hover:bg-white/[0.04] transition-all`}
//             >
//               <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
//                 <stat.icon className={`w-4 h-4 ${stat.color}`} />
//               </div>
//               <p className="text-2xl font-bold text-white">{stat.value}</p>
//               <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
//               <p className="text-[10px] text-white/20 mt-1">{stat.sub}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* Left: Quizzes + Results tabs */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.18 }}
//             className="lg:col-span-2 space-y-4"
//           >
//             {/* Tab Bar */}
//             <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1.5 w-fit">
//               {(['quizzes', 'results'] as const).map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
//                     activeTab === tab
//                       ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
//                       : 'text-white/30 hover:text-white/60'
//                   }`}
//                 >
//                   {tab === 'quizzes' ? `Quizzes (${quizzes.length})` : `Results (${results.length})`}
//                 </button>
//               ))}
//             </div>

//             {/* Quizzes Tab */}
//             {activeTab === 'quizzes' && (
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//                 {/* Toolbar */}
//                 <div className="p-4 border-b border-white/[0.05] flex flex-col sm:flex-row gap-3">
//                   {/* Search */}
//                   <div className="relative flex-1">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                     <input
//                       type="text"
//                       value={searchQuery}
//                       onChange={e => setSearchQuery(e.target.value)}
//                       placeholder="Search quizzes..."
//                       className="w-full pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40"
//                     />
//                     {searchQuery && (
//                       <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
//                         <X className="w-3.5 h-3.5" />
//                       </button>
//                     )}
//                   </div>
//                   {/* Filter */}
//                   <div className="flex items-center gap-1 bg-white/[0.02] rounded-xl p-1 shrink-0">
//                     {(['all', 'public', 'assigned'] as const).map(f => (
//                       <button
//                         key={f}
//                         onClick={() => setFilterVisibility(f)}
//                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
//                           filterVisibility === f
//                             ? 'bg-white/[0.08] text-white'
//                             : 'text-white/30 hover:text-white/60'
//                         }`}
//                       >
//                         {f}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quiz List */}
//                 {filteredQuizzes.length === 0 ? (
//                   <div className="p-12 text-center">
//                     <div className="w-14 h-14 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <BookOpen className="w-7 h-7 text-white/15" />
//                     </div>
//                     <p className="text-white/30 text-sm">
//                       {searchQuery ? 'No quizzes match your search' : 'No quizzes yet'}
//                     </p>
//                     {!searchQuery && (
//                       <Link href="/teacher/create-quiz">
//                         <button className="mt-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm hover:bg-emerald-500/20 transition-all">
//                           Create your first quiz
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-white/[0.04]">
//                     {filteredQuizzes.map((quiz, i) => {
//                       const quizResults = results.filter(r => r.quizTitle === quiz.title);
//                       const quizAvg = quizResults.length
//                         ? Math.round(quizResults.reduce((a, r) => a + r.percentage, 0) / quizResults.length)
//                         : null;

//                       return (
//                         <motion.div
//                           key={quiz.id}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: i * 0.04 }}
//                           className="p-4 hover:bg-white/[0.02] transition-colors group relative"
//                         >
//                           <div className="flex items-start gap-3">
//                             {/* Icon */}
//                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
//                               quiz.visibility === 'assigned'
//                                 ? 'bg-amber-500/10 border border-amber-500/20'
//                                 : 'bg-emerald-500/8 border border-emerald-500/15'
//                             }`}>
//                               {quiz.visibility === 'assigned'
//                                 ? <Lock className="w-4 h-4 text-amber-400/70" />
//                                 : <Globe className="w-4 h-4 text-emerald-400/70" />
//                               }
//                             </div>

//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-start justify-between gap-2">
//                                 <div className="min-w-0">
//                                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                                     <h3 className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors truncate">
//                                       {quiz.title}
//                                     </h3>
//                                     <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${
//                                       quiz.visibility === 'assigned'
//                                         ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
//                                         : 'bg-emerald-500/8 text-emerald-400 border-emerald-500/15'
//                                     }`}>
//                                       {quiz.visibility}
//                                     </span>
//                                   </div>
//                                   <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/25">
//                                     <span className="flex items-center gap-1">
//                                       <Clock className="w-3 h-3" /> {quiz.duration}m
//                                     </span>
//                                     <span className="flex items-center gap-1">
//                                       <FileText className="w-3 h-3" /> {quiz.questions?.length || 0} Qs
//                                     </span>
//                                     <span className="flex items-center gap-1">
//                                       <Star className="w-3 h-3" /> {quiz.totalMarks} marks
//                                     </span>
//                                     {quizResults.length > 0 && (
//                                       <span className="flex items-center gap-1">
//                                         <Users className="w-3 h-3" /> {quizResults.length} attempts
//                                       </span>
//                                     )}
//                                     {quizAvg !== null && (
//                                       <span className={`flex items-center gap-1 font-medium ${quizAvg >= 70 ? 'text-emerald-400/70' : 'text-amber-400/70'}`}>
//                                         <TrendingUp className="w-3 h-3" /> avg {quizAvg}%
//                                       </span>
//                                     )}
//                                     <span className="text-white/15">{formatDate(quiz.createdAt)}</span>
//                                   </div>
//                                 </div>

//                                 {/* Actions */}
//                                 <div className="flex items-center gap-1.5 shrink-0">
//                                   <Link href={`/teacher/edit-quiz/${quiz.id}`}>
//                                     <button className="p-2 rounded-lg text-white/25 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all opacity-0 group-hover:opacity-100">
//                                       <Edit3 className="w-3.5 h-3.5" />
//                                     </button>
//                                   </Link>
//                                   <button
//                                     onClick={() => setDeleteModal({ open: true, quiz })}
//                                     className="p-2 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
//                                   >
//                                     <Trash2 className="w-3.5 h-3.5" />
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}

//                 {filteredQuizzes.length > 0 && (
//                   <div className="p-3 border-t border-white/[0.04] text-center">
//                     <p className="text-[11px] text-white/20">{filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} shown</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Results Tab */}
//             {activeTab === 'results' && (
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//                 {results.length === 0 ? (
//                   <div className="p-12 text-center">
//                     <div className="w-14 h-14 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <BarChart3 className="w-7 h-7 text-white/15" />
//                     </div>
//                     <p className="text-white/30 text-sm">No results yet</p>
//                     <p className="text-white/15 text-xs mt-1">Results appear when students complete quizzes</p>
//                   </div>
//                 ) : (
//                   <>
//                     {/* Results Header */}
//                     <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
//                       <div>
//                         <p className="text-sm text-white/70 font-medium">Student Submissions</p>
//                         <p className="text-xs text-white/25 mt-0.5">{results.length} total submissions</p>
//                       </div>
//                       <Link href="/teacher/all-results">
//                         <button className="text-xs text-white/30 hover:text-emerald-400 flex items-center gap-1 transition-colors">
//                           View all <ChevronRight className="w-3 h-3" />
//                         </button>
//                       </Link>
//                     </div>

//                     <div className="divide-y divide-white/[0.04]">
//                       {recentResults.map((result, i) => (
//                         <motion.div
//                           key={result.id}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: i * 0.04 }}
//                           className="p-4 hover:bg-white/[0.02] transition-colors"
//                         >
//                           <div className="flex items-center justify-between gap-3">
//                             <div className="flex items-center gap-3 min-w-0">
//                               <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
//                                 result.percentage >= 70
//                                   ? 'bg-emerald-500/10 text-emerald-400'
//                                   : result.percentage >= 40
//                                   ? 'bg-amber-500/10 text-amber-400'
//                                   : 'bg-red-500/10 text-red-400'
//                               }`}>
//                                 {result.studentName?.charAt(0)?.toUpperCase() || 'S'}
//                               </div>
//                               <div className="min-w-0">
//                                 <p className="text-sm text-white/80 font-medium truncate">{result.studentName}</p>
//                                 <p className="text-xs text-white/30 truncate">{result.quizTitle}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-3 shrink-0">
//                               <div className="text-right">
//                                 <p className={`text-sm font-bold ${
//                                   result.percentage >= 70 ? 'text-emerald-400' :
//                                   result.percentage >= 40 ? 'text-amber-400' : 'text-red-400'
//                                 }`}>
//                                   {result.percentage}%
//                                 </p>
//                                 <p className="text-[10px] text-white/20">{result.score}/{result.totalMarks}</p>
//                               </div>
//                               <p className="text-[10px] text-white/20 hidden sm:block w-14 text-right">
//                                 {formatDate(result.submittedAt)}
//                               </p>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </motion.div>

//           {/* Right Sidebar */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.25 }}
//             className="space-y-4"
//           >
//             {/* Performance Overview */}
//             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
//               <h3 className="text-sm font-semibold text-white mb-4">Performance Overview</h3>

//               {results.length === 0 ? (
//                 <div className="text-center py-6">
//                   <Award className="w-8 h-8 text-white/15 mx-auto mb-3" />
//                   <p className="text-xs text-white/25">No data yet</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {/* Avg score bar */}
//                   <div>
//                     <div className="flex justify-between text-xs mb-2">
//                       <span className="text-white/40">Class average</span>
//                       <span className={`font-bold ${avgScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
//                         {avgScore}%
//                       </span>
//                     </div>
//                     <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${avgScore}%` }}
//                         transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
//                         className={`h-full rounded-full ${avgScore >= 70
//                           ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
//                           : 'bg-gradient-to-r from-amber-500 to-orange-500'
//                         }`}
//                       />
//                     </div>
//                   </div>

//                   {/* Grade breakdown */}
//                   {[
//                     { label: 'Excellent (≥90%)', count: results.filter(r => r.percentage >= 90).length, color: 'bg-emerald-400' },
//                     { label: 'Good (70–89%)', count: results.filter(r => r.percentage >= 70 && r.percentage < 90).length, color: 'bg-sky-400' },
//                     { label: 'Average (40–69%)', count: results.filter(r => r.percentage >= 40 && r.percentage < 70).length, color: 'bg-amber-400' },
//                     { label: 'Below (< 40%)', count: results.filter(r => r.percentage < 40).length, color: 'bg-red-400' },
//                   ].map(g => (
//                     <div key={g.label} className="flex items-center gap-2">
//                       <div className={`w-2 h-2 rounded-full ${g.color} shrink-0`} />
//                       <div className="flex-1 flex items-center justify-between">
//                         <span className="text-xs text-white/35">{g.label}</span>
//                         <span className="text-xs font-medium text-white/60">{g.count}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Top Quizzes by attempts */}
//             {quizzes.length > 0 && (
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
//                 <h3 className="text-sm font-semibold text-white mb-4">Quiz Activity</h3>
//                 <div className="space-y-3">
//                   {quizzes
//                     .map(q => ({ ...q, cnt: results.filter(r => r.quizTitle === q.title).length }))
//                     .sort((a, b) => b.cnt - a.cnt)
//                     .slice(0, 4)
//                     .map((quiz, i) => (
//                       <div key={quiz.id} className="flex items-center gap-3">
//                         <div className="w-5 h-5 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0">
//                           <span className="text-[9px] text-white/30 font-bold">{i + 1}</span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-xs text-white/60 truncate">{quiz.title}</p>
//                           <div className="flex items-center gap-1 mt-0.5">
//                             <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
//                               <motion.div
//                                 initial={{ width: 0 }}
//                                 animate={{ width: `${quizzes.length > 0 ? (quiz.cnt / Math.max(...quizzes.map(q => results.filter(r => r.quizTitle === q.title).length), 1)) * 100 : 0}%` }}
//                                 transition={{ delay: 0.6 + i * 0.1 }}
//                                 className="h-full bg-emerald-500/50 rounded-full"
//                               />
//                             </div>
//                             <span className="text-[10px] text-white/25 w-8 text-right">{quiz.cnt}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Quick Actions */}
//             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 space-y-1">
//               <p className="text-xs text-white/25 mb-3 px-1">Quick Actions</p>
//               {[
//                 { label: 'Create Quiz', href: '/teacher/create-quiz', icon: PlusCircle, color: 'text-emerald-400' },
//                 { label: 'All Results', href: '/teacher/all-results', icon: BarChart3, color: 'text-sky-400' },
//                 { label: 'Students', href: '/teacher/students', icon: Users, color: 'text-violet-400' },
//               ].map(link => (
//                 <Link key={link.href} href={link.href}>
//                   <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer">
//                     <div className="flex items-center gap-3">
//                       <link.icon className={`w-4 h-4 ${link.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
//                       <span className="text-sm text-white/45 group-hover:text-white/80 transition-colors">{link.label}</span>
//                     </div>
//                     <ChevronRight className="w-3.5 h-3.5 text-white/15 group-hover:text-white/35 transition-colors" />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteModal.open && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//             onClick={() => setDeleteModal({ open: false, quiz: null })}
//           >
//             <motion.div
//               initial={{ scale: 0.92, opacity: 0, y: 10 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.92, opacity: 0 }}
//               onClick={e => e.stopPropagation()}
//               className="bg-[#0f0f12] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
//             >
//               <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <Trash2 className="w-5 h-5 text-red-400" />
//               </div>
//               <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
//               <p className="text-sm text-white/40 text-center mb-6">
//                 "<span className="text-white/60">{deleteModal.quiz?.title}</span>" will be permanently deleted.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setDeleteModal({ open: false, quiz: null })}
//                   className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 text-sm hover:bg-white/[0.08] transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={deleting}
//                   className="flex-1 px-4 py-2.5 bg-red-500/15 border border-red-500/25 rounded-xl text-red-400 text-sm hover:bg-red-500/25 transition-all disabled:opacity-50 font-medium"
//                 >
//                   {deleting ? 'Deleting...' : 'Delete'}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
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
  PlusCircle,
  BookOpen,
  Users,
  BarChart3,
  LogOut,
  Edit3,
  Trash2,
  Clock,
  Star,
  ChevronRight,
  TrendingUp,
  Award,
  Eye,
  MoreVertical,
  Search,
  Filter,
  Globe,
  Lock,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Layers,
  Target,
  Zap,
  ArrowUpRight,
  FileText,
  X
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: any[];
  createdAt: string;
  visibility: 'public' | 'private' | 'assigned';
  assignedTo?: string[];
  attempts?: number;
}

interface Result {
  id: string;
  quizId: string;
  quizTitle: string;
  studentName: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisibility, setFilterVisibility] = useState<'all' | 'public' | 'assigned'>('all');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; quiz: Quiz | null }>({ open: false, quiz: null });
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'quizzes' | 'results'>('quizzes');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const userData = JSON.parse(storedUser);
    if (userData.role !== 'teacher') { router.push('/login'); return; }
    setUser(userData);
    fetchData(userData.id);
  }, [router]);

  const fetchData = async (teacherId: string) => {
    try {
      const [quizzesRes, resultsRes] = await Promise.all([
        fetch(`/api/quizzes/teacher/${teacherId}`),
        fetch(`/api/results/teacher/${teacherId}`)
      ]);
      const quizzesData = await quizzesRes.json();
      const resultsData = await resultsRes.json();
      if (quizzesData.success) setQuizzes(quizzesData.data || []);
      if (resultsData.success) setResults(resultsData.data || []);
    } catch {
      showToast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.quiz) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/quizzes/${deleteModal.quiz.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setQuizzes(prev => prev.filter(q => q.id !== deleteModal.quiz!.id));
        showToast.success('Quiz deleted');
        setDeleteModal({ open: false, quiz: null });
      } else {
        showToast.error(data.error || 'Failed to delete');
      }
    } catch {
      showToast.error('Network error');
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Filtered quizzes
  const filteredQuizzes = quizzes.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filterVisibility === 'all' ? true : q.visibility === filterVisibility;
    return matchSearch && matchFilter;
  });

  // Stats
  const totalStudents = new Set(results.map(r => r.studentName)).size;
  const avgScore = results.length
    ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length)
    : 0;
  const totalAttempts = results.length;
  const recentResults = [...results]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 8);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-emerald-600/6 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-teal-600/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-white/90 text-sm">QuizPortal</span>
              <span className="ml-2 text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Teacher</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/teacher/create-quiz">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 hover:border-emerald-500/40 rounded-xl text-emerald-400 text-sm font-medium transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:block">New Quiz</span>
              </motion.button>
            </Link>

            <Link href="/profile">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'T'}
                </div>
                <span className="text-xs text-white/60 hidden sm:block max-w-[100px] truncate">{user?.name}</span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-white/30 hover:text-red-400/70 hover:bg-red-500/5 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p className="text-white/30 text-sm mb-1">Welcome back 👋</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {user?.name?.split(' ')[0]}<span className="text-emerald-400">.</span>
            </h1>
            <p className="text-white/30 text-sm mt-2">
              {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} · {totalAttempts} total attempts
            </p>
          </div>

          <Link href="/teacher/create-quiz">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/25 rounded-2xl text-emerald-400 font-medium text-sm transition-all cursor-pointer w-fit"
            >
              <PlusCircle className="w-4 h-4" />
              Create New Quiz
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            {
              label: 'Total Quizzes', value: quizzes.length, icon: Layers,
              color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20',
              sub: `${quizzes.filter(q => q.visibility === 'public').length} public`
            },
            {
              label: 'Total Attempts', value: totalAttempts, icon: Target,
              color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',
              sub: 'across all quizzes'
            },
            {
              label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp,
              color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20',
              sub: avgScore >= 70 ? 'students doing well' : 'needs attention'
            },
            {
              label: 'Students', value: totalStudents, icon: Users,
              color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20',
              sub: 'have attempted'
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ y: -2 }}
              className={`bg-white/[0.02] border ${stat.border} rounded-2xl p-4 hover:bg-white/[0.04] transition-all`}
            >
              <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-white/20 mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left: Quizzes + Results tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Tab Bar */}
            <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1.5 w-fit">
              {(['quizzes', 'results'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {tab === 'quizzes' ? `Quizzes (${quizzes.length})` : `Results (${results.length})`}
                </button>
              ))}
            </div>

            {/* Quizzes Tab */}
            {activeTab === 'quizzes' && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/[0.05] flex flex-col sm:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search quizzes..."
                      className="w-full pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {/* Filter */}
                  <div className="flex items-center gap-1 bg-white/[0.02] rounded-xl p-1 shrink-0">
                    {(['all', 'public', 'assigned'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setFilterVisibility(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                          filterVisibility === f
                            ? 'bg-white/[0.08] text-white'
                            : 'text-white/30 hover:text-white/60'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quiz List */}
                {filteredQuizzes.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-14 h-14 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-7 h-7 text-white/15" />
                    </div>
                    <p className="text-white/30 text-sm">
                      {searchQuery ? 'No quizzes match your search' : 'No quizzes yet'}
                    </p>
                    {!searchQuery && (
                      <Link href="/teacher/create-quiz">
                        <button className="mt-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm hover:bg-emerald-500/20 transition-all">
                          Create your first quiz
                        </button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.04]">
                    {filteredQuizzes.map((quiz, i) => {
                      const quizResults = results.filter(r => r.quizTitle === quiz.title);
                      const quizAvg = quizResults.length
                        ? Math.round(quizResults.reduce((a, r) => a + r.percentage, 0) / quizResults.length)
                        : null;

                      return (
                        <motion.div
                          key={quiz.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="p-4 hover:bg-white/[0.02] transition-colors group relative"
                        >
                          {/* ✅ FIX: Make entire card clickable */}
                          <div 
                            onClick={() => router.push(`/teacher/quizzes/${quiz.id}`)}
                            className="cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              {/* Icon */}
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                                quiz.visibility === 'assigned'
                                  ? 'bg-amber-500/10 border border-amber-500/20'
                                  : 'bg-emerald-500/8 border border-emerald-500/15'
                              }`}>
                                {quiz.visibility === 'assigned'
                                  ? <Lock className="w-4 h-4 text-amber-400/70" />
                                  : <Globe className="w-4 h-4 text-emerald-400/70" />
                                }
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <h3 className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors truncate">
                                        {quiz.title}
                                      </h3>
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${
                                        quiz.visibility === 'assigned'
                                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                          : 'bg-emerald-500/8 text-emerald-400 border-emerald-500/15'
                                      }`}>
                                        {quiz.visibility}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/25">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {quiz.duration}m
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <FileText className="w-3 h-3" /> {quiz.questions?.length || 0} Qs
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" /> {quiz.totalMarks} marks
                                      </span>
                                      {quizResults.length > 0 && (
                                        <span className="flex items-center gap-1">
                                          <Users className="w-3 h-3" /> {quizResults.length} attempts
                                        </span>
                                      )}
                                      {quizAvg !== null && (
                                        <span className={`flex items-center gap-1 font-medium ${quizAvg >= 70 ? 'text-emerald-400/70' : 'text-amber-400/70'}`}>
                                          <TrendingUp className="w-3 h-3" /> avg {quizAvg}%
                                        </span>
                                      )}
                                      <span className="text-white/15">{formatDate(quiz.createdAt)}</span>
                                    </div>
                                  </div>

                                  {/* Actions - Edit/Delete */}
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <Link href={`/teacher/edit-quiz/${quiz.id}`} onClick={(e) => e.stopPropagation()}>
                                      <button className="p-2 rounded-lg text-white/25 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all opacity-0 group-hover:opacity-100">
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>
                                    </Link>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteModal({ open: true, quiz });
                                      }}
                                      className="p-2 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {filteredQuizzes.length > 0 && (
                  <div className="p-3 border-t border-white/[0.04] text-center">
                    <p className="text-[11px] text-white/20">{filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} shown</p>
                  </div>
                )}
              </div>
            )}

            {/* Results Tab */}
            {activeTab === 'results' && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                {results.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-14 h-14 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-7 h-7 text-white/15" />
                    </div>
                    <p className="text-white/30 text-sm">No results yet</p>
                    <p className="text-white/15 text-xs mt-1">Results appear when students complete quizzes</p>
                  </div>
                ) : (
                  <>
                    {/* Results Header */}
                    <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/70 font-medium">Student Submissions</p>
                        <p className="text-xs text-white/25 mt-0.5">{results.length} total submissions</p>
                      </div>
                      <Link href="/teacher/all-results">
                        <button className="text-xs text-white/30 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                          View all <ChevronRight className="w-3 h-3" />
                        </button>
                      </Link>
                    </div>

                    <div className="divide-y divide-white/[0.04]">
                      {recentResults.map((result, i) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="p-4 hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                                result.percentage >= 70
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : result.percentage >= 40
                                  ? 'bg-amber-500/10 text-amber-400'
                                  : 'bg-red-500/10 text-red-400'
                              }`}>
                                {result.studentName?.charAt(0)?.toUpperCase() || 'S'}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm text-white/80 font-medium truncate">{result.studentName}</p>
                                <p className="text-xs text-white/30 truncate">{result.quizTitle}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <p className={`text-sm font-bold ${
                                  result.percentage >= 70 ? 'text-emerald-400' :
                                  result.percentage >= 40 ? 'text-amber-400' : 'text-red-400'
                                }`}>
                                  {result.percentage}%
                                </p>
                                <p className="text-[10px] text-white/20">{result.score}/{result.totalMarks}</p>
                              </div>
                              <p className="text-[10px] text-white/20 hidden sm:block w-14 text-right">
                                {formatDate(result.submittedAt)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            {/* Performance Overview */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Performance Overview</h3>

              {results.length === 0 ? (
                <div className="text-center py-6">
                  <Award className="w-8 h-8 text-white/15 mx-auto mb-3" />
                  <p className="text-xs text-white/25">No data yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Avg score bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/40">Class average</span>
                      <span className={`font-bold ${avgScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {avgScore}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${avgScore}%` }}
                        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${avgScore >= 70
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Grade breakdown */}
                  {[
                    { label: 'Excellent (≥90%)', count: results.filter(r => r.percentage >= 90).length, color: 'bg-emerald-400' },
                    { label: 'Good (70–89%)', count: results.filter(r => r.percentage >= 70 && r.percentage < 90).length, color: 'bg-sky-400' },
                    { label: 'Average (40–69%)', count: results.filter(r => r.percentage >= 40 && r.percentage < 70).length, color: 'bg-amber-400' },
                    { label: 'Below (< 40%)', count: results.filter(r => r.percentage < 40).length, color: 'bg-red-400' },
                  ].map(g => (
                    <div key={g.label} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${g.color} shrink-0`} />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-xs text-white/35">{g.label}</span>
                        <span className="text-xs font-medium text-white/60">{g.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Quizzes by attempts */}
            {quizzes.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Quiz Activity</h3>
                <div className="space-y-3">
                  {quizzes
                    .map(q => ({ ...q, cnt: results.filter(r => r.quizTitle === q.title).length }))
                    .sort((a, b) => b.cnt - a.cnt)
                    .slice(0, 4)
                    .map((quiz, i) => (
                      <div key={quiz.id} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0">
                          <span className="text-[9px] text-white/30 font-bold">{i + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white/60 truncate">{quiz.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${quizzes.length > 0 ? (quiz.cnt / Math.max(...quizzes.map(q => results.filter(r => r.quizTitle === q.title).length), 1)) * 100 : 0}%` }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="h-full bg-emerald-500/50 rounded-full"
                              />
                            </div>
                            <span className="text-[10px] text-white/25 w-8 text-right">{quiz.cnt}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 space-y-1">
              <p className="text-xs text-white/25 mb-3 px-1">Quick Actions</p>
              {[
                { label: 'Create Quiz', href: '/teacher/create-quiz', icon: PlusCircle, color: 'text-emerald-400' },
                { label: 'All Results', href: '/teacher/all-results', icon: BarChart3, color: 'text-sky-400' },
                { label: 'Students', href: '/teacher/students', icon: Users, color: 'text-violet-400' },
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
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteModal({ open: false, quiz: null })}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0f0f12] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
              <p className="text-sm text-white/40 text-center mb-6">
                "<span className="text-white/60">{deleteModal.quiz?.title}</span>" will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ open: false, quiz: null })}
                  className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 text-sm hover:bg-white/[0.08] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 bg-red-500/15 border border-red-500/25 rounded-xl text-red-400 text-sm hover:bg-red-500/25 transition-all disabled:opacity-50 font-medium"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}