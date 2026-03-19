

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import {
//   BookOpen, Award, LogOut, ChevronRight, BarChart3,
//   Target, Star, CheckCircle, PlayCircle, Trophy, Flame,
//   User, Search, Lock, ArrowRight, GraduationCap, Timer, X, Zap,
//   Sparkles, TrendingUp, Clock, Users, Eye, Gift
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// // ✅ Design tokens matching teacher/admin dashboard
// const T = {
//   bg: '#070709',
//   bgCard: '#0f0f12',
//   accent: '#10b981',
//   accentLight: '#34d399',
//   accentDark: '#059669',
//   accentGlow: 'rgba(16,185,129,0.16)',
//   accentBorder: 'rgba(16,185,129,0.2)',
//   accentBg: 'rgba(16,185,129,0.08)',
//   border: 'rgba(255,255,255,0.06)',
//   textMuted: 'rgba(255,255,255,0.4)',
//   textDim: 'rgba(255,255,255,0.25)',
// };

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
//     <div className="min-h-screen bg-[#070709] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
//       <Toaster position="top-right" />

//       {/* Ambient bg */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-emerald-600/7 rounded-full blur-[120px]" />
//         <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-teal-600/5 rounded-full blur-[100px]" />
//       </div>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/80 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2.5 min-w-0">
//             <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
//               <GraduationCap className="w-3.5 h-3.5 text-white" />
//             </div>
//             <span className="font-semibold text-white/90 text-sm hidden sm:block">QuizPortal</span>
//           </div>

//           <AnimatePresence>
//             {showSearch && (
//               <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100%' }} exit={{ opacity: 0, width: 0 }} className="flex-1 max-w-sm">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textMuted }} />
//                   <input
//                     autoFocus type="text" value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
//                     placeholder="Search quizzes..."
//                     className="w-full pl-9 pr-8 py-2 bg-white/[0.04] border rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none"
//                     style={{ borderColor: T.border }}
//                     onFocus={e => (e.target.style.borderColor = T.accentBorder)}
//                     onBlur={e => { e.target.style.borderColor = T.border; if (!searchQuery) setShowSearch(false); }}
//                   />
//                   {searchQuery && (
//                     <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: T.textMuted }}>
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="flex items-center gap-2 shrink-0">
//             <button onClick={() => setShowSearch(!showSearch)} className="p-2 rounded-xl transition-all hover:bg-white/[0.04]" style={{ color: T.textMuted }}>
//               <Search className="w-4 h-4" />
//             </button>
//             <Link href="/profile">
//               <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border }}>
//                 <div className="w-5 h-5 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
//                   {user?.name?.charAt(0)?.toUpperCase() || 'S'}
//                 </div>
//                 <span className="text-xs hidden sm:block max-w-[80px] truncate" style={{ color: T.textMuted }}>{user?.name}</span>
//               </div>
//             </Link>
//             <button onClick={handleLogout} className="p-2 rounded-xl transition-all hover:bg-red-500/5" style={{ color: T.textMuted }}>
//               <LogOut className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-5 pb-8 space-y-4">

//         {/* Hero Header */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
//           <div>
//             <p className="text-xs mb-1" style={{ color: T.textMuted }}>{greeting} 👋</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
//               {user?.name?.split(' ')[0]}<span style={{ color: T.accentLight }}>.</span>
//             </h1>
//             <p className="text-xs mt-1.5" style={{ color: T.textMuted }}>
//               {availableQuizzes.length > 0
//                 ? `${availableQuizzes.length} quiz${availableQuizzes.length !== 1 ? 'zes' : ''} waiting`
//                 : 'All caught up! Great work.'}
//             </p>
//           </div>

//           {/* Progress ring */}
//           <div className="flex items-center gap-3 rounded-2xl px-4 py-2.5 w-fit border" style={{ background: T.bgCard, borderColor: T.border }}>
//             <div className="relative w-10 h-10">
//               <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
//                 <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
//                 <circle cx="22" cy="22" r="18" fill="none" stroke="url(#grad)" strokeWidth="3"
//                   strokeDasharray={`${Math.min(100, averageScore) * 1.13} 113`} strokeLinecap="round" />
//                 <defs>
//                   <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor={T.accentLight} />
//                     <stop offset="100%" stopColor={T.accent} />
//                   </linearGradient>
//                 </defs>
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-[10px] font-bold text-white">{averageScore}%</span>
//               </div>
//             </div>
//             <div>
//               <p className="text-[10px]" style={{ color: T.textMuted }}>avg score</p>
//               <p className="text-xs font-medium text-white">{completedCount} done</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats - 2x2 mobile, 4 col desktop */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
//           {[
//             { label: 'Available', value: availableQuizzes.length, icon: BookOpen,    color: T.accentLight,  bg: T.accentBg,  border: T.accentBorder  },
//             { label: 'Completed', value: completedCount,          icon: CheckCircle, color: '#10b981',       bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
//             { label: 'Assigned',  value: assignedCount,           icon: Target,      color: '#f59e0b',       bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
//             { label: 'Streak',    value: `${streak}d`,            icon: Flame,       color: '#f97316',       bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
//           ].map((stat) => (
//             <div key={stat.label} className="rounded-2xl p-3.5 border" style={{ background: T.bgCard, borderColor: stat.border }}>
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5" style={{ background: stat.bg }}>
//                 <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
//               </div>
//               <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
//               <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: T.textMuted }}>{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Mobile view tabs */}
//         <div className="flex items-center rounded-xl p-1 lg:hidden border" style={{ background: T.bgCard, borderColor: T.border }}>
//           {(['quizzes', 'results', 'stats'] as const).map(tab => (
//             <button
//               key={tab}
//               onClick={() => setMobileView(tab)}
//               className={`flex-1 py-2 rounded-lg text-[11px] font-medium transition-all capitalize ${
//                 mobileView === tab
//                   ? 'text-white border' 
//                   : 'text-white/30'
//               }`}
//               style={mobileView === tab ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight } : {}}
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
//               <div className="rounded-2xl overflow-hidden border" style={{ background: T.bgCard, borderColor: T.border }}>
//                 <div className="p-4 border-b" style={{ borderColor: T.border }}>
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
//                     <div>
//                       <h2 className="text-sm font-semibold text-white">Available Quizzes</h2>
//                       <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>Pick a challenge and start learning</p>
//                     </div>
//                     <div className="flex items-center gap-1 rounded-xl p-1 w-fit" style={{ background: 'rgba(255,255,255,0.03)' }}>
//                       {(['all', 'assigned', 'public'] as const).map(tab => (
//                         <button
//                           key={tab}
//                           onClick={() => setActiveTab(tab)}
//                           className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
//                             activeTab === tab
//                               ? 'text-white border' 
//                               : 'text-white/30 hover:text-white/60'
//                           }`}
//                           style={activeTab === tab ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight } : {}}
//                         >
//                           {tab}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   {searchQuery && (
//                     <div className="flex items-center gap-2 mt-2.5">
//                       <p className="text-xs" style={{ color: T.textMuted }}>Results for "<span style={{ color: T.accentLight }}>{searchQuery}</span>"</p>
//                       <button onClick={() => setSearchQuery('')} className="text-white/25"><X className="w-3 h-3" /></button>
//                     </div>
//                   )}
//                 </div>

//                 {filteredQuizzes.length === 0 ? (
//                   <div className="p-10 text-center">
//                     <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
//                       <BookOpen className="w-6 h-6" style={{ color: T.textMuted }} />
//                     </div>
//                     <p className="text-sm" style={{ color: T.textMuted }}>{searchQuery ? 'No quizzes match' : 'No quizzes available'}</p>
//                     {activeTab !== 'all' && (
//                       <button onClick={() => setActiveTab('all')} className="mt-2.5 text-xs" style={{ color: T.accentLight }}>
//                         View all quizzes
//                       </button>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="divide-y" style={{ borderColor: T.border }}>
//                     {filteredQuizzes.slice(0, 6).map((quiz) => (
//                       <div key={quiz.id} className="p-3.5 sm:p-4 hover:bg-white/[0.02] transition-colors group">
//                         <div className="flex items-center gap-3">
//                           <div className="hidden sm:flex w-9 h-9 rounded-xl border items-center justify-center shrink-0 group-hover transition-colors"
//                             style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border }}>
//                             {quiz.visibility === 'assigned'
//                               ? <Lock className="w-4 h-4" style={{ color: '#f59e0b' }} />
//                               : <BookOpen className="w-4 h-4" style={{ color: T.accentLight }} />}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex flex-wrap items-center gap-1.5 mb-1">
//                               <h3 className="text-sm font-semibold text-white group-hover transition-colors truncate"
//                                 style={{ color: T.accentLight }}>
//                                 {quiz.title}
//                               </h3>
//                               {quiz.visibility === 'assigned' && (
//                                 <span className="text-[9px] px-1.5 py-0.5 rounded-full border shrink-0"
//                                   style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>
//                                   assigned
//                                 </span>
//                               )}
//                             </div>
//                             <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] text-white/20">
//                               <span className="flex items-center gap-1"><Timer className="w-3 h-3" style={{ color: T.textMuted }} /> {quiz.duration}m</span>
//                               <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" style={{ color: T.textMuted }} /> {quiz.questions?.length || 0} Qs</span>
//                               <span className="flex items-center gap-1"><Star className="w-3 h-3" style={{ color: T.textMuted }} /> {quiz.totalMarks}pts</span>
//                             </div>
//                           </div>
//                           <button
//                             onClick={() => router.push(`/quiz/${quiz.id}`)}
//                             className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all shrink-0 border"
//                             style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight }}
//                             whilehover={{ scale: 1.02 }}
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
//                   <div className="p-3.5 border-t" style={{ borderColor: T.border }}>
//                     <Link href="/quizzes" className="flex items-center justify-center gap-2 text-xs transition-colors" style={{ color: T.textMuted }}>
//                       View {filteredQuizzes.length - 6} more <ArrowRight className="w-3 h-3" />
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Completed Quizzes */}
//             {results.length > 0 && (
//               <div className={mobileView !== 'results' ? 'hidden lg:block' : ''}>
//                 <div className="rounded-2xl overflow-hidden border" style={{ background: T.bgCard, borderColor: T.border }}>
//                   <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor: T.border }}>
//                     <div>
//                       <h3 className="text-sm font-semibold text-white">Completed Quizzes</h3>
//                       <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>{results.length} submitted</p>
//                     </div>
//                     <Link href="/results" className="text-xs flex items-center gap-1 transition-colors" style={{ color: T.textMuted }}>
//                       All <ChevronRight className="w-3 h-3" />
//                     </Link>
//                   </div>
//                   <div className="divide-y" style={{ borderColor: T.border }}>
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
//                               <p className="text-xs" style={{ color: T.textMuted }}>{formatDate(result.submittedAt)}</p>
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
//             <div className="rounded-2xl p-4 border" style={{ background: T.bgCard, borderColor: T.border }}>
//               <h3 className="text-sm font-semibold text-white mb-4">Performance</h3>
//               {results.length === 0 ? (
//                 <div className="text-center py-5">
//                   <Award className="w-7 h-7 mx-auto mb-2" style={{ color: T.textMuted }} />
//                   <p className="text-xs" style={{ color: T.textMuted }}>Complete a quiz to see stats</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <div className="flex justify-between text-xs mb-2">
//                       <span style={{ color: T.textMuted }}>Average score</span>
//                       <span className="font-bold" style={{ color: T.accentLight }}>{averageScore}%</span>
//                     </div>
//                     <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
//                       <div className="h-full rounded-full transition-all duration-700"
//                         style={{ width: `${averageScore}%`, background: `linear-gradient(to right, ${T.accentLight}, ${T.accent})` }} />
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
//                     <div className="flex items-center gap-2">
//                       <Zap className="w-4 h-4" style={{ color: '#f59e0b' }} />
//                       <span className="text-xs" style={{ color: T.textMuted }}>Total points</span>
//                     </div>
//                     <span className="text-sm font-bold text-white">{totalPoints}</span>
//                   </div>
//                   <div>
//                     <p className="text-xs mb-2" style={{ color: T.textMuted }}>Recent scores</p>
//                     <div className="space-y-1.5">
//                       {results.slice(0, 4).map((r) => (
//                         <div key={r.id} className="flex items-center gap-2">
//                           <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
//                             <div className={`h-full rounded-full transition-all duration-700 ${r.percentage >= 70 ? 'bg-emerald-400' : 'bg-yellow-400'}`}
//                               style={{ width: `${r.percentage}%` }} />
//                           </div>
//                           <span className="text-[10px] w-8 text-right" style={{ color: T.textMuted }}>{r.percentage}%</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Streak */}
//             <div className="rounded-2xl p-4 border" style={{ background: 'rgba(249,115,22,0.05)', borderColor: 'rgba(249,115,22,0.2)' }}>
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-sm font-semibold text-white">Study Streak</h3>
//                 <Flame className="w-4 h-4" style={{ color: '#f97316' }} />
//               </div>
//               <div className="flex items-end gap-2 mb-3">
//                 <span className="text-4xl font-black text-white">{streak}</span>
//                 <span className="text-sm mb-1" style={{ color: T.textMuted }}>days</span>
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
//               <p className="text-[10px] mt-2" style={{ color: T.textDim }}>Last 7 days</p>
//             </div>

//             {/* Quick Links */}
//             <div className="rounded-2xl p-3.5 space-y-0.5 border" style={{ background: T.bgCard, borderColor: T.border }}>
//               <p className="text-xs mb-3 px-1" style={{ color: T.textMuted }}>Quick Links</p>
//               {[
//                 { label: 'All Quizzes', href: '/quizzes',  icon: BookOpen,  color: T.accentLight  },
//                 { label: 'My Results',  href: '/results',  icon: BarChart3, color: '#10b981' },
//                 { label: 'My Profile',  href: '/profile',  icon: User,      color: '#38bdf8'     },
//               ].map(link => (
//                 <Link key={link.href} href={link.href}>
//                   <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer">
//                     <div className="flex items-center gap-3">
//                       <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: link.color }} />
//                       <span className="text-sm transition-colors" style={{ color: T.textMuted }}>{link.label}</span>
//                     </div>
//                     <ChevronRight className="w-3.5 h-3.5 transition-colors" style={{ color: T.textMuted }} />
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
import { Toaster, toast as hotToast } from 'react-hot-toast';
import {
  BookOpen, Award, Clock, LogOut, ChevronRight, Sparkles,
  Zap, BarChart3, Target, Activity, Star, User, Compass,
  TrendingUp, CheckCircle, PlayCircle, Search, X, Bell,
  Flame, Trophy, ArrowRight, GraduationCap, Lock, Timer,
  Filter, RefreshCw, Eye
} from 'lucide-react';
import { showToast } from '@/lib/toast';

// ── Design tokens — homepage consistent ─────────────────────────
const T = {
  bg: '#080810',
  card: 'rgba(255,255,255,0.025)',
  cardHover: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  accentGlow: 'rgba(52,211,153,0.12)',
  muted: 'rgba(255,255,255,0.4)',
  dim: 'rgba(255,255,255,0.22)',
  navBg: 'rgba(8,8,16,0.85)',
};

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
  visibility?: string;
}

interface Result {
  id: string;
  quizTitle: string;
  percentage: number;
  score: number;
  totalMarks: number;
  submittedAt: string;
}

// ── Difficulty badge ─────────────────────────────────────────────
function DiffBadge({ d }: { d?: string }) {
  const map: any = {
    beginner: { label: 'Beginner', color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
    intermediate: { label: 'Intermediate', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
    advanced: { label: 'Advanced', color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
  };
  const m = map[d || ''] || map.beginner;
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0"
      style={{ color: m.color, background: m.bg, borderColor: m.border }}>
      {m.label}
    </span>
  );
}

// ── Score badge ──────────────────────────────────────────────────
function ScoreBadge({ pct }: { pct: number }) {
  const color = pct >= 80 ? '#34d399' : pct >= 60 ? '#f59e0b' : '#f87171';
  const bg = pct >= 80 ? 'rgba(52,211,153,0.1)' : pct >= 60 ? 'rgba(245,158,11,0.1)' : 'rgba(248,113,113,0.1)';
  return (
    <span className="text-sm font-bold px-2.5 py-1 rounded-lg shrink-0"
      style={{ color, background: bg }}>{pct}%</span>
  );
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'assigned' | 'public'>('all');
  const [activeTab, setActiveTab] = useState<'quizzes' | 'results'>('quizzes');
  const [notifOpen, setNotifOpen] = useState(false);

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

  const fetchData = async (userId: string, silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const quizzesRes = await fetch(`/api/quizzes/student?studentId=${userId}`);
      const quizzesData = await quizzesRes.json();
      if (quizzesData.success) {
        const withMeta = quizzesData.data.map((q: Quiz) => ({
          ...q,
          difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any,
          category: ['development', 'design', 'business', 'data'][Math.floor(Math.random() * 4)],
          attempts: Math.floor(Math.random() * 50),
        }));
        setQuizzes(withMeta);
      }

      const resultsRes = await fetch(`/api/results/user/${userId}`);
      const resultsData = await resultsRes.json();
      if (resultsData.success) {
        const prev = results.length;
        setResults(resultsData.data);
        if (resultsData.data.length > prev) {
          const newR = resultsData.data.slice(prev);
          if (prev === 0 && resultsData.data.length >= 1) showToast.achievement?.('First Quiz Completed! 🎯', 'Great start!');
          if (prev < 5 && resultsData.data.length >= 5) showToast.achievement?.('Milestone! ⭐', '5 quizzes done');
          if (prev < 10 && resultsData.data.length >= 10) showToast.achievement?.('Double Digits! 🔥', '10 quizzes done');
          if (newR.some((r: Result) => r.percentage === 100)) showToast.achievement?.('Perfect Score! 🏆', '100% on a quiz!');
        }
        const lastWeek = new Date(); lastWeek.setDate(lastWeek.getDate() - 7);
        const weeklyCount = resultsData.data.filter((r: Result) => new Date(r.submittedAt) > lastWeek).length;
        if (weeklyCount > 0 && !sessionStorage.getItem('weeklyStatsShown')) {
          showToast.stats?.(weeklyCount, resultsData.data.length);
          sessionStorage.setItem('weeklyStatsShown', 'true');
        }
      }
    } catch { showToast.error('Failed to load data'); }
    finally { setLoading(false); setRefreshing(false); }
  };

  const handleLogout = () => {
    const id = showToast.loading('Logging out...');
    setTimeout(() => {
      localStorage.removeItem('token'); localStorage.removeItem('user'); sessionStorage.clear();
      hotToast.dismiss(id);
      showToast.success('Logged out successfully');
      setTimeout(() => router.push('/login'), 800);
    }, 600);
  };

  const handleStartQuiz = (quizId: string) => {
    const id = showToast.loading('Loading quiz...');
    setTimeout(() => { hotToast.dismiss(id); router.push(`/quiz/${quizId}`); }, 700);
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // ── Computed ─────────────────────────────────────────────────────
  const availableQuizzes = quizzes.filter(q => !results.some(r => r.quizTitle === q.title));
  const completedCount = results.length;
  const avgScore = results.length ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length) : 0;
  const totalPoints = results.reduce((a, r) => a + r.score, 0);
  const assignedCount = quizzes.filter(q => q.visibility === 'assigned').length;

  const calculateStreak = () => {
    if (!results.length) return 0;
    const sorted = [...results].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    let streak = 1, cur = new Date(sorted[0].submittedAt);
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i].submittedAt);
      const diff = Math.floor((cur.getTime() - prev.getTime()) / 86400000);
      if (diff === 1) { streak++; cur = prev; } else break;
    }
    return streak;
  };
  const streak = calculateStreak();

  const filteredQuizzes = availableQuizzes.filter(q => {
    const matchSearch = !searchQuery ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === 'all' ? true :
      activeFilter === 'assigned' ? q.visibility === 'assigned' : q.visibility !== 'assigned';
    return matchSearch && matchFilter;
  });

  const recentResults = [...results]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 8);

  const statsCards = [
    { label: 'Available', value: availableQuizzes.length, icon: BookOpen, color: T.accent, bg: T.accentBg, border: T.accentBorder },
    { label: 'Completed', value: completedCount, icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: Target, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
    { label: 'Streak', value: `${streak}d`, icon: Flame, color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
  ];

  // ── Loading skeleton ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap');`}</style>
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)' }} />
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
              <GraduationCap className="w-6 h-6 animate-pulse" style={{ color: T.accent }} />
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ background: T.accent, animationDelay: `${i * 0.15}s`, opacity: 0.6 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap'); input::placeholder { color: rgba(255,255,255,0.2); }`}</style>
      <Toaster position="top-right" />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: T.navBg, borderColor: T.border }}>
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="text-white/80 font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-white/90 text-sm hidden sm:block">Ficer</span>
          </div>

          {/* Inline search (expands) */}
          <AnimatePresence>
            {showSearch && (
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100%' }} exit={{ opacity: 0, width: 0 }}
                className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.muted }} />
                  <input autoFocus type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search quizzes..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl text-sm text-white focus:outline-none transition-all"
                    style={{ background: T.card, border: `1px solid ${T.border}` }}
                    onFocus={e => e.target.style.borderColor = T.accentBorder}
                    onBlur={e => { e.target.style.borderColor = T.border; if (!searchQuery) setShowSearch(false); }} />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: T.muted }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button onClick={() => setShowSearch(!showSearch)} className="p-2 rounded-xl transition-all hover:bg-white/[0.04]" style={{ color: T.muted }}>
              <Search className="w-4 h-4" />
            </button>

            {/* Notification bell */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-xl transition-all hover:bg-white/[0.04] relative" style={{ color: T.muted }}>
                <Bell className="w-4 h-4" />
                {availableQuizzes.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    className="absolute right-0 top-full mt-2 w-64 rounded-2xl border p-3 z-50"
                    style={{ background: '#0e0e18', borderColor: T.border }}>
                    <p className="text-xs font-semibold mb-2 px-1" style={{ color: T.muted }}>Notifications</p>
                    {availableQuizzes.length > 0 ? (
                      <div className="p-3 rounded-xl" style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                        <p className="text-sm text-white font-medium">{availableQuizzes.length} quiz{availableQuizzes.length > 1 ? 'zes' : ''} available</p>
                        <p className="text-xs mt-0.5" style={{ color: T.muted }}>Start one to boost your streak!</p>
                      </div>
                    ) : (
                      <p className="text-xs px-1" style={{ color: T.dim }}>No new notifications</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <Link href="/profile">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.05] transition-all cursor-pointer border" style={{ background: T.card, borderColor: T.border }}>
                <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.3)' }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'S'}
                </div>
                <span className="text-xs hidden sm:block max-w-[80px] truncate" style={{ color: T.muted }}>{user?.name}</span>
              </div>
            </Link>

            <button onClick={handleLogout} className="p-2 rounded-xl transition-all hover:bg-red-500/[0.08]" style={{ color: T.muted }}>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5 pb-10 space-y-5">

        {/* Hero header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs mb-1" style={{ color: T.muted }}>{greeting} 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
              {user?.name?.split(' ')[0]}<span style={{ color: T.accent }}>.</span>
            </h1>
            <p className="text-xs mt-1.5" style={{ color: T.muted }}>
              {availableQuizzes.length > 0
                ? `${availableQuizzes.length} quiz${availableQuizzes.length !== 1 ? 'zes' : ''} waiting for you`
                : '🎉 All caught up! Great work.'}
            </p>
          </div>

          {/* Progress ring + refresh */}
          <div className="flex items-center gap-3">
            <button onClick={() => user && fetchData(user.id, true)} disabled={refreshing}
              className="p-2 rounded-xl transition-all hover:bg-white/[0.04]" style={{ color: T.muted }}>
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center gap-3 rounded-2xl px-4 py-2.5 border" style={{ background: T.card, borderColor: T.border }}>
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle cx="22" cy="22" r="18" fill="none" stroke={T.accent} strokeWidth="3"
                    strokeDasharray={`${Math.min(100, avgScore) * 1.13} 113`} strokeLinecap="round" style={{ opacity: 0.7 }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{avgScore}%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px]" style={{ color: T.muted }}>avg score</p>
                <p className="text-xs font-medium text-white">{completedCount} done</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {statsCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl p-3.5 border transition-all duration-200"
              style={{ background: T.card, borderColor: s.border }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5" style={{ background: s.bg }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: T.muted }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile tabs */}
        <div className="flex items-center rounded-xl p-1 lg:hidden border" style={{ background: T.card, borderColor: T.border }}>
          {(['quizzes', 'results'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-[11px] font-medium transition-all capitalize"
              style={activeTab === tab ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent } : { color: 'rgba(255,255,255,0.3)' }}>
              {tab === 'quizzes' ? `Quizzes (${filteredQuizzes.length})` : `Results (${results.length})`}
            </button>
          ))}
        </div>

        {/* Main 2-col grid */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* ── Left: Quizzes ── */}
          <div className={`lg:col-span-2 space-y-4 ${activeTab !== 'quizzes' ? 'hidden lg:block' : ''}`}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="rounded-2xl overflow-hidden border" style={{ background: T.card, borderColor: T.border }}>

              {/* Toolbar */}
              <div className="p-4 border-b" style={{ borderColor: T.border }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-white">Available Quizzes</h2>
                    <p className="text-xs mt-0.5" style={{ color: T.muted }}>Pick a challenge and start learning</p>
                  </div>
                  {/* Filter pills */}
                  <div className="flex items-center gap-1 rounded-xl p-1 w-fit" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {(['all', 'assigned', 'public'] as const).map(f => (
                      <button key={f} onClick={() => setActiveFilter(f)}
                        className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all capitalize"
                        style={activeFilter === f ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accent } : { color: 'rgba(255,255,255,0.3)' }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                {searchQuery && (
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-xs" style={{ color: T.muted }}>Results for <span style={{ color: T.accent }}>"{searchQuery}"</span></p>
                    <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" style={{ color: T.muted }} /></button>
                  </div>
                )}
              </div>

              {/* Quiz list */}
              {filteredQuizzes.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <BookOpen className="w-6 h-6" style={{ color: T.muted }} />
                  </div>
                  <p className="text-sm" style={{ color: T.muted }}>{searchQuery ? 'No quizzes match' : 'No quizzes available'}</p>
                  {activeFilter !== 'all' && (
                    <button onClick={() => setActiveFilter('all')} className="mt-2 text-xs" style={{ color: T.accent }}>
                      View all quizzes
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: T.border }}>
                  {filteredQuizzes.slice(0, 8).map((quiz, i) => (
                    <motion.div key={quiz.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="p-3.5 sm:p-4 group transition-colors cursor-pointer"
                      style={{ background: 'transparent' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className="hidden sm:flex w-9 h-9 rounded-xl border items-center justify-center shrink-0 transition-colors"
                          style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border }}>
                          {quiz.visibility === 'assigned'
                            ? <Lock className="w-4 h-4" style={{ color: '#f59e0b' }} />
                            : <BookOpen className="w-4 h-4" style={{ color: T.accent }} />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <h3 className="text-sm font-semibold text-white/80 truncate group-hover:text-white transition-colors">
                              {quiz.title}
                            </h3>
                            <DiffBadge d={quiz.difficulty} />
                            {quiz.visibility === 'assigned' && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full border"
                                style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>
                                assigned
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px]" style={{ color: T.dim }}>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {quiz.duration}m</span>
                            <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {quiz.questions?.length || 0} Qs</span>
                            <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {quiz.totalMarks}pts</span>
                            {quiz.attempts && quiz.attempts > 0 && (
                              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {quiz.attempts} attempts</span>
                            )}
                          </div>
                        </div>

                        {/* CTA */}
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => handleStartQuiz(quiz.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 border"
                          style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accent }}>
                          <PlayCircle className="w-3.5 h-3.5 shrink-0" />
                          Start
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {filteredQuizzes.length > 8 && (
                <div className="p-3.5 border-t" style={{ borderColor: T.border }}>
                  <Link href="/quizzes" className="flex items-center justify-center gap-2 text-xs transition-colors" style={{ color: T.muted }}>
                    View {filteredQuizzes.length - 8} more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Completed quizzes */}
            {results.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className={`rounded-2xl overflow-hidden border ${activeTab !== 'results' ? 'hidden lg:block' : ''}`}
                style={{ background: T.card, borderColor: T.border }}>
                <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor: T.border }}>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Recent Results</h3>
                    <p className="text-xs mt-0.5" style={{ color: T.muted }}>{results.length} submitted</p>
                  </div>
                  <Link href="/results" className="text-xs flex items-center gap-1 transition-colors" style={{ color: T.muted }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.muted)}>
                    All results <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="divide-y" style={{ borderColor: T.border }}>
                  {recentResults.map((result, i) => (
                    <Link href={`/results/${result.id}`} key={result.id}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                        className="flex items-center justify-between px-4 py-3.5 transition-colors group cursor-pointer"
                        style={{ background: 'transparent' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: result.percentage >= 70 ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)' }}>
                            <Trophy className="w-4 h-4" style={{ color: result.percentage >= 70 ? T.accent : '#f59e0b' }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-white/70 truncate group-hover:text-white transition-colors">{result.quizTitle}</p>
                            <p className="text-xs" style={{ color: T.dim }}>{formatDate(result.submittedAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <ScoreBadge pct={result.percentage} />
                          <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: T.muted }} />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <div className={`space-y-4 ${activeTab !== 'results' && activeTab !== 'quizzes' ? '' : activeTab === 'quizzes' ? 'hidden lg:block' : activeTab === 'results' ? 'hidden lg:block' : ''}`}
            style={{ display: activeTab !== 'quizzes' && activeTab !== 'results' ? undefined : undefined }}>
            {/* always show on desktop */}
            <div className="hidden lg:block space-y-4">
              <SidebarContent
                results={results} avgScore={avgScore} totalPoints={totalPoints}
                streak={streak} T={T} />
            </div>
            {/* mobile: show stats always but quizzes/results handled by tabs */}
            <div className="lg:hidden">
              <SidebarContent
                results={results} avgScore={avgScore} totalPoints={totalPoints}
                streak={streak} T={T} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar content extracted for reuse ─────────────────────────
function SidebarContent({ results, avgScore, totalPoints, streak, T }: {
  results: any[]; avgScore: number; totalPoints: number; streak: number; T: any;
}) {
  return (
    <>
      {/* Performance */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
        className="rounded-2xl p-4 border" style={{ background: T.card, borderColor: T.border }}>
        <h3 className="text-sm font-semibold text-white mb-4">Performance</h3>
        {results.length === 0 ? (
          <div className="text-center py-5">
            <Award className="w-7 h-7 mx-auto mb-2" style={{ color: T.muted }} />
            <p className="text-xs" style={{ color: T.muted }}>Complete a quiz to see stats</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Avg bar */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span style={{ color: T.muted }}>Average score</span>
                <span className="font-bold" style={{ color: T.accent }}>{avgScore}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${avgScore}%` }} transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full" style={{ background: T.accent, opacity: 0.7 }} />
              </div>
            </div>

            {/* Total points */}
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" style={{ color: '#f59e0b' }} />
                <span className="text-xs" style={{ color: T.muted }}>Total points</span>
              </div>
              <span className="text-sm font-bold text-white">{totalPoints}</span>
            </div>

            {/* Mini score bars */}
            <div>
              <p className="text-xs mb-2" style={{ color: T.muted }}>Recent scores</p>
              <div className="space-y-1.5">
                {results.slice(0, 5).map((r: any) => (
                  <div key={r.id} className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${r.percentage}%`, background: r.percentage >= 70 ? T.accent : r.percentage >= 50 ? '#f59e0b' : '#f87171', opacity: 0.7 }} />
                    </div>
                    <span className="text-[10px] w-8 text-right" style={{ color: T.dim }}>{r.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Streak */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
        className="rounded-2xl p-4 border" style={{ background: 'rgba(249,115,22,0.05)', borderColor: 'rgba(249,115,22,0.2)' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Study Streak</h3>
          <Flame className="w-4 h-4" style={{ color: '#f97316' }} />
        </div>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-4xl font-black text-white">{streak}</span>
          <span className="text-sm mb-1" style={{ color: T.muted }}>days</span>
        </div>
        <div className="flex items-end gap-1 h-8">
          {Array.from({ length: 7 }, (_, i) => {
            const day = new Date(); day.setDate(day.getDate() - (6 - i));
            const has = results.some((r: any) => new Date(r.submittedAt).toDateString() === day.toDateString());
            return (
              <div key={i} className="flex-1">
                <div className={`w-full rounded-sm transition-all ${has ? 'h-8' : 'h-2'}`}
                  style={{ background: has ? '#f97316' : 'rgba(255,255,255,0.06)' }} />
              </div>
            );
          })}
        </div>
        <p className="text-[10px] mt-2" style={{ color: T.dim }}>Last 7 days</p>
      </motion.div>

      {/* Quick links */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
        className="rounded-2xl p-3.5 border" style={{ background: T.card, borderColor: T.border }}>
        <p className="text-xs mb-3 px-1 font-medium" style={{ color: T.muted }}>Quick Links</p>
        {[
          { label: 'All Quizzes', href: '/quizzes', icon: BookOpen, color: T.accent },
          { label: 'My Results', href: '/results', icon: BarChart3, color: '#10b981' },
          { label: 'Explore', href: '/explore', icon: Compass, color: '#38bdf8' },
          { label: 'My Profile', href: '/profile', icon: User, color: '#a78bfa' },
        ].map(link => (
          <Link key={link.href} href={link.href}>
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors group cursor-pointer"
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <div className="flex items-center gap-3">
                <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: link.color }} />
                <span className="text-sm transition-colors" style={{ color: T.muted }}>{link.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: T.muted }} />
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Motivational card */}
      {results.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
          className="rounded-2xl p-4 border" style={{ background: T.accentBg, borderColor: T.accentBorder }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(52,211,153,0.15)' }}>
              <TrendingUp className="w-4 h-4" style={{ color: T.accent }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white mb-1">Keep going!</p>
              <p className="text-xs" style={{ color: T.muted }}>You've completed {results.length} quiz{results.length !== 1 ? 'zes' : ''}. Next milestone at {Math.ceil(results.length / 5) * 5}.</p>
              <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${(results.length % 5) * 20}%`, background: T.accent, opacity: 0.7 }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}



