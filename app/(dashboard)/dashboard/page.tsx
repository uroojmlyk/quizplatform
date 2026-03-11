


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import {
//   BookOpen, Award, LogOut, ChevronRight, BarChart3,
//   Target, Star, CheckCircle, PlayCircle, Trophy, Flame,
//   User, Search, Lock, ArrowRight, GraduationCap, Timer, X, Zap
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface Quiz {
//   id: string; title: string; description: string;
//   duration: number; questions: any[]; totalMarks: number;
//   createdByName: string; visibility?: string;
// }
// interface Result {
//   id: string; quizTitle: string; percentage: number;
//   score: number; totalMarks: number; submittedAt: string;
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
//   const [mobileView, setMobileView] = useState<'quizzes' | 'results' | 'stats'>('quizzes');

//   useEffect(() => {
//     const h = new Date().getHours();
//     setGreeting(h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening');
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
//         fetch(`/api/results/user/${userId}`),
//       ]);
//       const quizzesData = await quizzesRes.json();
//       const resultsData = await resultsRes.json();
//       if (quizzesData.success) setQuizzes(quizzesData.data);
//       if (resultsData.success) setResults(resultsData.data);
//     } catch {
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

//   const formatDate = (d: string) => {
//     const date = new Date(d);
//     const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
//     if (diff === 0) return 'Today';
//     if (diff === 1) return 'Yesterday';
//     if (diff < 7) return `${diff}d ago`;
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   const availableQuizzes = quizzes.filter(q => !results.some(r => r.quizTitle === q.title));
//   const completedCount = results.length;
//   const averageScore = results.length
//     ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length) : 0;
//   const totalPoints = results.reduce((a, r) => a + r.score, 0);
//   const assignedCount = quizzes.filter(q => q.visibility === 'assigned').length;

//   const filteredQuizzes = availableQuizzes.filter(q => {
//     const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       q.description?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchTab = activeTab === 'all' ? true :
//       activeTab === 'assigned' ? q.visibility === 'assigned' : q.visibility === 'public';
//     return matchSearch && matchTab;
//   });

//   const calculateStreak = () => {
//     if (!results.length) return 0;
//     const sorted = [...results].sort((a, b) =>
//       new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
//     let streak = 1; let cur = new Date(sorted[0].submittedAt);
//     for (let i = 1; i < sorted.length; i++) {
//       const prev = new Date(sorted[i].submittedAt);
//       const diff = Math.floor((cur.getTime() - prev.getTime()) / 86400000);
//       if (diff === 1) { streak++; cur = prev; } else if (diff > 1) break;
//     }
//     return streak;
//   };
//   const streak = calculateStreak();
//   const recentResults = [...results]
//     .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
//     .slice(0, 6);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
//             <GraduationCap className="w-6 h-6 text-white animate-pulse" />
//           </div>
//           <div className="flex gap-1.5">
//             {[0, 1, 2].map(i => (
//               <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500/60 animate-bounce"
//                 style={{ animationDelay: `${i * 0.15}s` }} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#070709] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
//       <Toaster position="top-right" />

//       {/* Ambient bg */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-violet-600/7 rounded-full blur-[120px]" />
//         <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px]" />
//       </div>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/80 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2.5 min-w-0">
//             <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
//               <GraduationCap className="w-3.5 h-3.5 text-white" />
//             </div>
//             <span className="font-semibold text-white/90 text-sm hidden sm:block">QuizPortal</span>
//           </div>

//           <AnimatePresence>
//             {showSearch && (
//               <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100%' }} exit={{ opacity: 0, width: 0 }} className="flex-1 max-w-sm">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
//                   <input
//                     autoFocus type="text" value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
//                     placeholder="Search quizzes..."
//                     className="w-full pl-9 pr-8 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
//                     onBlur={() => { if (!searchQuery) setShowSearch(false); }}
//                   />
//                   {searchQuery && (
//                     <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="flex items-center gap-2 shrink-0">
//             <button onClick={() => setShowSearch(!showSearch)} className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all">
//               <Search className="w-4 h-4" />
//             </button>
//             <Link href="/profile">
//               <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer">
//                 <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
//                   {user?.name?.charAt(0)?.toUpperCase() || 'S'}
//                 </div>
//                 <span className="text-xs text-white/60 hidden sm:block max-w-[80px] truncate">{user?.name}</span>
//               </div>
//             </Link>
//             <button onClick={handleLogout} className="p-2 rounded-xl text-white/30 hover:text-red-400/70 hover:bg-red-500/5 transition-all">
//               <LogOut className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-5 pb-8 space-y-4">

//         {/* Hero Header */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
//           <div>
//             <p className="text-white/30 text-xs mb-1">{greeting} 👋</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
//               {user?.name?.split(' ')[0]}<span className="text-violet-400">.</span>
//             </h1>
//             <p className="text-white/30 text-xs mt-1.5">
//               {availableQuizzes.length > 0
//                 ? `${availableQuizzes.length} quiz${availableQuizzes.length !== 1 ? 'zes' : ''} waiting`
//                 : 'All caught up! Great work.'}
//             </p>
//           </div>

//           {/* Progress ring */}
//           <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl px-4 py-2.5 w-fit">
//             <div className="relative w-10 h-10">
//               <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
//                 <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
//                 <circle cx="22" cy="22" r="18" fill="none" stroke="url(#vgrad)" strokeWidth="3"
//                   strokeDasharray={`${Math.min(100, averageScore) * 1.13} 113`} strokeLinecap="round" />
//                 <defs>
//                   <linearGradient id="vgrad" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#8b5cf6" />
//                     <stop offset="100%" stopColor="#6366f1" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-[10px] font-bold text-white">{averageScore}%</span>
//               </div>
//             </div>
//             <div>
//               <p className="text-[10px] text-white/40">avg score</p>
//               <p className="text-xs font-medium text-white">{completedCount} done</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats - 2x2 mobile, 4 col desktop */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
//           {[
//             { label: 'Available', value: availableQuizzes.length, icon: BookOpen,    color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20'  },
//             { label: 'Completed', value: completedCount,          icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
//             { label: 'Assigned',  value: assignedCount,           icon: Target,      color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'  },
//             { label: 'Streak',    value: `${streak}d`,            icon: Flame,       color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20' },
//           ].map((stat) => (
//             <div key={stat.label} className={`bg-white/[0.02] border ${stat.border} rounded-2xl p-3.5`}>
//               <div className={`w-8 h-8 ${stat.bg} rounded-xl flex items-center justify-center mb-2.5`}>
//                 <stat.icon className={`w-4 h-4 ${stat.color}`} />
//               </div>
//               <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
//               <p className="text-[10px] sm:text-xs text-white/30 mt-0.5">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Mobile view tabs */}
//         <div className="flex items-center bg-white/[0.02] border border-white/[0.05] rounded-xl p-1 lg:hidden">
//           {(['quizzes', 'results', 'stats'] as const).map(tab => (
//             <button
//               key={tab}
//               onClick={() => setMobileView(tab)}
//               className={`flex-1 py-2 rounded-lg text-[11px] font-medium transition-all capitalize ${
//                 mobileView === tab ? 'bg-violet-500/15 text-violet-400 border border-violet-500/25' : 'text-white/30'
//               }`}
//             >
//               {tab === 'quizzes' ? `Quizzes (${filteredQuizzes.length})` :
//                tab === 'results' ? `Results (${results.length})` : 'Stats'}
//             </button>
//           ))}
//         </div>

//         {/* Main Grid */}
//         <div className="grid lg:grid-cols-3 gap-4">

//           {/* Left column */}
//           <div className="lg:col-span-2 space-y-4">

//             {/* Available Quizzes */}
//             <div className={mobileView !== 'quizzes' ? 'hidden lg:block' : ''}>
//               <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//                 <div className="p-4 border-b border-white/[0.05]">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
//                     <div>
//                       <h2 className="text-sm font-semibold text-white">Available Quizzes</h2>
//                       <p className="text-xs text-white/30 mt-0.5">Pick a challenge and start learning</p>
//                     </div>
//                     <div className="flex items-center gap-1 bg-white/[0.03] rounded-xl p-1 w-fit">
//                       {(['all', 'assigned', 'public'] as const).map(tab => (
//                         <button
//                           key={tab}
//                           onClick={() => setActiveTab(tab)}
//                           className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
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
//                   {searchQuery && (
//                     <div className="flex items-center gap-2 mt-2.5">
//                       <p className="text-xs text-white/30">Results for "<span className="text-violet-400">{searchQuery}</span>"</p>
//                       <button onClick={() => setSearchQuery('')} className="text-white/25"><X className="w-3 h-3" /></button>
//                     </div>
//                   )}
//                 </div>

//                 {filteredQuizzes.length === 0 ? (
//                   <div className="p-10 text-center">
//                     <div className="w-12 h-12 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-3">
//                       <BookOpen className="w-6 h-6 text-white/20" />
//                     </div>
//                     <p className="text-white/40 text-sm">{searchQuery ? 'No quizzes match' : 'No quizzes available'}</p>
//                     {activeTab !== 'all' && (
//                       <button onClick={() => setActiveTab('all')} className="mt-2.5 text-xs text-violet-400 hover:text-violet-300">
//                         View all quizzes
//                       </button>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-white/[0.04]">
//                     {filteredQuizzes.slice(0, 6).map((quiz) => (
//                       <div key={quiz.id} className="p-3.5 sm:p-4 hover:bg-white/[0.02] transition-colors group">
//                         <div className="flex items-center gap-3">
//                           <div className="hidden sm:flex w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] items-center justify-center shrink-0 group-hover:border-violet-500/30 transition-colors">
//                             {quiz.visibility === 'assigned'
//                               ? <Lock className="w-4 h-4 text-amber-400/70" />
//                               : <BookOpen className="w-4 h-4 text-violet-400/70" />}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex flex-wrap items-center gap-1.5 mb-1">
//                               <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
//                                 {quiz.title}
//                               </h3>
//                               {quiz.visibility === 'assigned' && (
//                                 <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 shrink-0">
//                                   assigned
//                                 </span>
//                               )}
//                             </div>
//                             <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] text-white/20">
//                               <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {quiz.duration}m</span>
//                               <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {quiz.questions?.length || 0} Qs</span>
//                               <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {quiz.totalMarks}pts</span>
//                             </div>
//                           </div>
//                           <button
//                             onClick={() => router.push(`/quiz/${quiz.id}`)}
//                             className="flex items-center gap-1.5 px-3 py-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 rounded-xl text-violet-400 text-xs font-medium transition-all shrink-0"
//                           >
//                             <PlayCircle className="w-3.5 h-3.5 shrink-0" />
//                             Start
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {filteredQuizzes.length > 6 && (
//                   <div className="p-3.5 border-t border-white/[0.04]">
//                     <Link href="/quizzes" className="flex items-center justify-center gap-2 text-xs text-white/30 hover:text-violet-400 transition-colors">
//                       View {filteredQuizzes.length - 6} more <ArrowRight className="w-3 h-3" />
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Completed Quizzes */}
//             {results.length > 0 && (
//               <div className={mobileView !== 'results' ? 'hidden lg:block' : ''}>
//                 <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//                   <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.05]">
//                     <div>
//                       <h3 className="text-sm font-semibold text-white">Completed Quizzes</h3>
//                       <p className="text-xs text-white/25 mt-0.5">{results.length} submitted</p>
//                     </div>
//                     <Link href="/results" className="text-xs text-white/30 hover:text-violet-400 flex items-center gap-1 transition-colors">
//                       All <ChevronRight className="w-3 h-3" />
//                     </Link>
//                   </div>
//                   <div className="divide-y divide-white/[0.04]">
//                     {recentResults.map(result => (
//                       <Link href={`/results/${result.id}`} key={result.id}>
//                         <div className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.02] transition-colors group">
//                           <div className="flex items-center gap-3 min-w-0">
//                             <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
//                               result.percentage >= 70 ? 'bg-emerald-500/10' : 'bg-yellow-500/10'
//                             }`}>
//                               <Trophy className={`w-4 h-4 ${result.percentage >= 70 ? 'text-emerald-400' : 'text-yellow-400'}`} />
//                             </div>
//                             <div className="min-w-0">
//                               <p className="text-sm text-white/70 truncate group-hover:text-white transition-colors">{result.quizTitle}</p>
//                               <p className="text-xs text-white/25">{formatDate(result.submittedAt)}</p>
//                             </div>
//                           </div>
//                           <div className={`text-sm font-bold px-2.5 py-1 rounded-lg shrink-0 ${
//                             result.percentage >= 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
//                           }`}>
//                             {result.percentage}%
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right sidebar */}
//           <div className={`space-y-4 ${mobileView !== 'stats' ? 'hidden lg:block' : ''}`}>

//             {/* Performance */}
//             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
//               <h3 className="text-sm font-semibold text-white mb-4">Performance</h3>
//               {results.length === 0 ? (
//                 <div className="text-center py-5">
//                   <Award className="w-7 h-7 text-white/15 mx-auto mb-2" />
//                   <p className="text-xs text-white/30">Complete a quiz to see stats</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <div className="flex justify-between text-xs mb-2">
//                       <span className="text-white/40">Average score</span>
//                       <span className="font-bold text-violet-400">{averageScore}%</span>
//                     </div>
//                     <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-700"
//                         style={{ width: `${averageScore}%` }} />
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl">
//                     <div className="flex items-center gap-2">
//                       <Zap className="w-4 h-4 text-amber-400" />
//                       <span className="text-xs text-white/50">Total points</span>
//                     </div>
//                     <span className="text-sm font-bold text-white">{totalPoints}</span>
//                   </div>
//                   <div>
//                     <p className="text-xs text-white/30 mb-2">Recent scores</p>
//                     <div className="space-y-1.5">
//                       {results.slice(0, 4).map((r) => (
//                         <div key={r.id} className="flex items-center gap-2">
//                           <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
//                             <div className={`h-full rounded-full transition-all duration-700 ${r.percentage >= 70 ? 'bg-emerald-400' : 'bg-yellow-400'}`}
//                               style={{ width: `${r.percentage}%` }} />
//                           </div>
//                           <span className="text-[10px] text-white/30 w-8 text-right">{r.percentage}%</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Streak */}
//             <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/15 rounded-2xl p-4">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-sm font-semibold text-white">Study Streak</h3>
//                 <Flame className="w-4 h-4 text-orange-400" />
//               </div>
//               <div className="flex items-end gap-2 mb-3">
//                 <span className="text-4xl font-black text-white">{streak}</span>
//                 <span className="text-white/40 text-sm mb-1">days</span>
//               </div>
//               <div className="flex items-end gap-1 h-8">
//                 {Array.from({ length: 7 }, (_, i) => {
//                   const day = new Date();
//                   day.setDate(day.getDate() - (6 - i));
//                   const hasResult = results.some(r => new Date(r.submittedAt).toDateString() === day.toDateString());
//                   return (
//                     <div key={i} className="flex-1">
//                       <div className={`w-full rounded-sm ${hasResult ? 'bg-orange-400 h-8' : 'bg-white/[0.06] h-2'}`} />
//                     </div>
//                   );
//                 })}
//               </div>
//               <p className="text-[10px] text-white/25 mt-2">Last 7 days</p>
//             </div>

//             {/* Quick Links */}
//             <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-3.5 space-y-0.5">
//               <p className="text-xs text-white/30 mb-3 px-1">Quick Links</p>
//               {[
//                 { label: 'All Quizzes', href: '/quizzes',  icon: BookOpen,  color: 'text-violet-400'  },
//                 { label: 'My Results',  href: '/results',  icon: BarChart3, color: 'text-emerald-400' },
//                 { label: 'My Profile',  href: '/profile',  icon: User,      color: 'text-sky-400'     },
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
  BookOpen, Award, LogOut, ChevronRight, BarChart3,
  Target, Star, CheckCircle, PlayCircle, Trophy, Flame,
  User, Search, Lock, ArrowRight, GraduationCap, Timer, X, Zap,
  Sparkles, TrendingUp, Clock, Users, Eye, Gift
} from 'lucide-react';
import { showToast } from '@/lib/toast';

// ✅ Design tokens matching teacher/admin dashboard
const T = {
  bg: '#070709',
  bgCard: '#0f0f12',
  accent: '#10b981',
  accentLight: '#34d399',
  accentDark: '#059669',
  accentGlow: 'rgba(16,185,129,0.16)',
  accentBorder: 'rgba(16,185,129,0.2)',
  accentBg: 'rgba(16,185,129,0.08)',
  border: 'rgba(255,255,255,0.06)',
  textMuted: 'rgba(255,255,255,0.4)',
  textDim: 'rgba(255,255,255,0.25)',
};

interface Quiz {
  id: string; title: string; description: string;
  duration: number; questions: any[]; totalMarks: number;
  createdByName: string; visibility?: string;
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

  const formatDate = (d: string) => {
    const date = new Date(d);
    const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

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
    <div className="min-h-screen bg-[#070709] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-emerald-600/7 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-teal-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-white/90 text-sm hidden sm:block">QuizPortal</span>
          </div>

          <AnimatePresence>
            {showSearch && (
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100%' }} exit={{ opacity: 0, width: 0 }} className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textMuted }} />
                  <input
                    autoFocus type="text" value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search quizzes..."
                    className="w-full pl-9 pr-8 py-2 bg-white/[0.04] border rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none"
                    style={{ borderColor: T.border }}
                    onFocus={e => (e.target.style.borderColor = T.accentBorder)}
                    onBlur={e => { e.target.style.borderColor = T.border; if (!searchQuery) setShowSearch(false); }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: T.textMuted }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setShowSearch(!showSearch)} className="p-2 rounded-xl transition-all hover:bg-white/[0.04]" style={{ color: T.textMuted }}>
              <Search className="w-4 h-4" />
            </button>
            <Link href="/profile">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border }}>
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || 'S'}
                </div>
                <span className="text-xs hidden sm:block max-w-[80px] truncate" style={{ color: T.textMuted }}>{user?.name}</span>
              </div>
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-xl transition-all hover:bg-red-500/5" style={{ color: T.textMuted }}>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5 pb-8 space-y-4">

        {/* Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs mb-1" style={{ color: T.textMuted }}>{greeting} 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {user?.name?.split(' ')[0]}<span style={{ color: T.accentLight }}>.</span>
            </h1>
            <p className="text-xs mt-1.5" style={{ color: T.textMuted }}>
              {availableQuizzes.length > 0
                ? `${availableQuizzes.length} quiz${availableQuizzes.length !== 1 ? 'zes' : ''} waiting`
                : 'All caught up! Great work.'}
            </p>
          </div>

          {/* Progress ring */}
          <div className="flex items-center gap-3 rounded-2xl px-4 py-2.5 w-fit border" style={{ background: T.bgCard, borderColor: T.border }}>
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <circle cx="22" cy="22" r="18" fill="none" stroke="url(#grad)" strokeWidth="3"
                  strokeDasharray={`${Math.min(100, averageScore) * 1.13} 113`} strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={T.accentLight} />
                    <stop offset="100%" stopColor={T.accent} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{averageScore}%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: T.textMuted }}>avg score</p>
              <p className="text-xs font-medium text-white">{completedCount} done</p>
            </div>
          </div>
        </div>

        {/* Stats - 2x2 mobile, 4 col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { label: 'Available', value: availableQuizzes.length, icon: BookOpen,    color: T.accentLight,  bg: T.accentBg,  border: T.accentBorder  },
            { label: 'Completed', value: completedCount,          icon: CheckCircle, color: '#10b981',       bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
            { label: 'Assigned',  value: assignedCount,           icon: Target,      color: '#f59e0b',       bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
            { label: 'Streak',    value: `${streak}d`,            icon: Flame,       color: '#f97316',       bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl p-3.5 border" style={{ background: T.bgCard, borderColor: stat.border }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5" style={{ background: stat.bg }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: T.textMuted }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mobile view tabs */}
        <div className="flex items-center rounded-xl p-1 lg:hidden border" style={{ background: T.bgCard, borderColor: T.border }}>
          {(['quizzes', 'results', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setMobileView(tab)}
              className={`flex-1 py-2 rounded-lg text-[11px] font-medium transition-all capitalize ${
                mobileView === tab
                  ? 'text-white border' 
                  : 'text-white/30'
              }`}
              style={mobileView === tab ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight } : {}}
            >
              {tab === 'quizzes' ? `Quizzes (${filteredQuizzes.length})` :
               tab === 'results' ? `Results (${results.length})` : 'Stats'}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-4">

            {/* Available Quizzes */}
            <div className={mobileView !== 'quizzes' ? 'hidden lg:block' : ''}>
              <div className="rounded-2xl overflow-hidden border" style={{ background: T.bgCard, borderColor: T.border }}>
                <div className="p-4 border-b" style={{ borderColor: T.border }}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Available Quizzes</h2>
                      <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>Pick a challenge and start learning</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-xl p-1 w-fit" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      {(['all', 'assigned', 'public'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                            activeTab === tab
                              ? 'text-white border' 
                              : 'text-white/30 hover:text-white/60'
                          }`}
                          style={activeTab === tab ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight } : {}}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  {searchQuery && (
                    <div className="flex items-center gap-2 mt-2.5">
                      <p className="text-xs" style={{ color: T.textMuted }}>Results for "<span style={{ color: T.accentLight }}>{searchQuery}</span>"</p>
                      <button onClick={() => setSearchQuery('')} className="text-white/25"><X className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>

                {filteredQuizzes.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <BookOpen className="w-6 h-6" style={{ color: T.textMuted }} />
                    </div>
                    <p className="text-sm" style={{ color: T.textMuted }}>{searchQuery ? 'No quizzes match' : 'No quizzes available'}</p>
                    {activeTab !== 'all' && (
                      <button onClick={() => setActiveTab('all')} className="mt-2.5 text-xs" style={{ color: T.accentLight }}>
                        View all quizzes
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: T.border }}>
                    {filteredQuizzes.slice(0, 6).map((quiz) => (
                      <div key={quiz.id} className="p-3.5 sm:p-4 hover:bg-white/[0.02] transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="hidden sm:flex w-9 h-9 rounded-xl border items-center justify-center shrink-0 group-hover transition-colors"
                            style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border }}>
                            {quiz.visibility === 'assigned'
                              ? <Lock className="w-4 h-4" style={{ color: '#f59e0b' }} />
                              : <BookOpen className="w-4 h-4" style={{ color: T.accentLight }} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <h3 className="text-sm font-semibold text-white group-hover transition-colors truncate"
                                style={{ color: T.accentLight }}>
                                {quiz.title}
                              </h3>
                              {quiz.visibility === 'assigned' && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full border shrink-0"
                                  style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>
                                  assigned
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] text-white/20">
                              <span className="flex items-center gap-1"><Timer className="w-3 h-3" style={{ color: T.textMuted }} /> {quiz.duration}m</span>
                              <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" style={{ color: T.textMuted }} /> {quiz.questions?.length || 0} Qs</span>
                              <span className="flex items-center gap-1"><Star className="w-3 h-3" style={{ color: T.textMuted }} /> {quiz.totalMarks}pts</span>
                            </div>
                          </div>
                          <button
                            onClick={() => router.push(`/quiz/${quiz.id}`)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all shrink-0 border"
                            style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight }}
                            whilehover={{ scale: 1.02 }}
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
                  <div className="p-3.5 border-t" style={{ borderColor: T.border }}>
                    <Link href="/quizzes" className="flex items-center justify-center gap-2 text-xs transition-colors" style={{ color: T.textMuted }}>
                      View {filteredQuizzes.length - 6} more <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Completed Quizzes */}
            {results.length > 0 && (
              <div className={mobileView !== 'results' ? 'hidden lg:block' : ''}>
                <div className="rounded-2xl overflow-hidden border" style={{ background: T.bgCard, borderColor: T.border }}>
                  <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor: T.border }}>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Completed Quizzes</h3>
                      <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>{results.length} submitted</p>
                    </div>
                    <Link href="/results" className="text-xs flex items-center gap-1 transition-colors" style={{ color: T.textMuted }}>
                      All <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="divide-y" style={{ borderColor: T.border }}>
                    {recentResults.map(result => (
                      <Link href={`/results/${result.id}`} key={result.id}>
                        <div className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.02] transition-colors group">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              result.percentage >= 70 ? 'bg-emerald-500/10' : 'bg-yellow-500/10'
                            }`}>
                              <Trophy className={`w-4 h-4 ${result.percentage >= 70 ? 'text-emerald-400' : 'text-yellow-400'}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm text-white/70 truncate group-hover:text-white transition-colors">{result.quizTitle}</p>
                              <p className="text-xs" style={{ color: T.textMuted }}>{formatDate(result.submittedAt)}</p>
                            </div>
                          </div>
                          <div className={`text-sm font-bold px-2.5 py-1 rounded-lg shrink-0 ${
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

          {/* Right sidebar */}
          <div className={`space-y-4 ${mobileView !== 'stats' ? 'hidden lg:block' : ''}`}>

            {/* Performance */}
            <div className="rounded-2xl p-4 border" style={{ background: T.bgCard, borderColor: T.border }}>
              <h3 className="text-sm font-semibold text-white mb-4">Performance</h3>
              {results.length === 0 ? (
                <div className="text-center py-5">
                  <Award className="w-7 h-7 mx-auto mb-2" style={{ color: T.textMuted }} />
                  <p className="text-xs" style={{ color: T.textMuted }}>Complete a quiz to see stats</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ color: T.textMuted }}>Average score</span>
                      <span className="font-bold" style={{ color: T.accentLight }}>{averageScore}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${averageScore}%`, background: `linear-gradient(to right, ${T.accentLight}, ${T.accent})` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" style={{ color: '#f59e0b' }} />
                      <span className="text-xs" style={{ color: T.textMuted }}>Total points</span>
                    </div>
                    <span className="text-sm font-bold text-white">{totalPoints}</span>
                  </div>
                  <div>
                    <p className="text-xs mb-2" style={{ color: T.textMuted }}>Recent scores</p>
                    <div className="space-y-1.5">
                      {results.slice(0, 4).map((r) => (
                        <div key={r.id} className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                            <div className={`h-full rounded-full transition-all duration-700 ${r.percentage >= 70 ? 'bg-emerald-400' : 'bg-yellow-400'}`}
                              style={{ width: `${r.percentage}%` }} />
                          </div>
                          <span className="text-[10px] w-8 text-right" style={{ color: T.textMuted }}>{r.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Streak */}
            <div className="rounded-2xl p-4 border" style={{ background: 'rgba(249,115,22,0.05)', borderColor: 'rgba(249,115,22,0.2)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Study Streak</h3>
                <Flame className="w-4 h-4" style={{ color: '#f97316' }} />
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-black text-white">{streak}</span>
                <span className="text-sm mb-1" style={{ color: T.textMuted }}>days</span>
              </div>
              <div className="flex items-end gap-1 h-8">
                {Array.from({ length: 7 }, (_, i) => {
                  const day = new Date();
                  day.setDate(day.getDate() - (6 - i));
                  const hasResult = results.some(r => new Date(r.submittedAt).toDateString() === day.toDateString());
                  return (
                    <div key={i} className="flex-1">
                      <div className={`w-full rounded-sm ${hasResult ? 'bg-orange-400 h-8' : 'bg-white/[0.06] h-2'}`} />
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] mt-2" style={{ color: T.textDim }}>Last 7 days</p>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl p-3.5 space-y-0.5 border" style={{ background: T.bgCard, borderColor: T.border }}>
              <p className="text-xs mb-3 px-1" style={{ color: T.textMuted }}>Quick Links</p>
              {[
                { label: 'All Quizzes', href: '/quizzes',  icon: BookOpen,  color: T.accentLight  },
                { label: 'My Results',  href: '/results',  icon: BarChart3, color: '#10b981' },
                { label: 'My Profile',  href: '/profile',  icon: User,      color: '#38bdf8'     },
              ].map(link => (
                <Link key={link.href} href={link.href}>
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: link.color }} />
                      <span className="text-sm transition-colors" style={{ color: T.textMuted }}>{link.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 transition-colors" style={{ color: T.textMuted }} />
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