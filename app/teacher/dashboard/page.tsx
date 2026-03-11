


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
//   Link2,
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
//   userName?: string;
//   score: number;
//   totalMarks: number;
//   percentage: number;
//   submittedAt: string;
//   isAnonymous?: boolean;
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
//     fetchData(userData.id || userData._id);
//   }, [router]);

//   const fetchData = async (teacherId: string) => {
//     try {
//       const [quizzesRes, resultsRes] = await Promise.all([
//         fetch(`/api/quizzes/teacher/${teacherId}`),
//         fetch(`/api/results/teacher/${teacherId}`)
//       ]);
//       const quizzesData = await quizzesRes.json();
//       const resultsData = await resultsRes.json();
//       if (quizzesData.success) {
//         const sanitized = (quizzesData.data || []).map((q: any) => ({
//           ...q,
//           id: q._id || q.id || '',
//           title: q.title || 'Untitled Quiz',
//           description: q.description || '',
//           visibility: q.visibility || 'public',
//           questions: q.questions || [],
//           duration: q.duration || 0,
//           totalMarks: q.totalMarks || 0,
//           createdAt: q.createdAt || new Date().toISOString(),
//         }));
//         setQuizzes(sanitized);
//       }
//       if (resultsData.success) {
//         const sanitizedResults = (resultsData.data || []).map((r: any) => ({
//           ...r,
//           id: r._id || r.id || '',
//           quizTitle: r.quizTitle || '',
//           studentName: r.studentName || r.userName || 'Anonymous',
//           percentage: r.percentage ?? 0,
//           score: r.score ?? 0,
//           totalMarks: r.totalMarks ?? 0,
//           submittedAt: r.submittedAt || new Date().toISOString(),
//         }));
//         setResults(sanitizedResults);
//       }
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
//       const res = await fetch(`/api/quizzes/${deleteModal.quiz.id || (deleteModal.quiz as any)._id}`, { method: 'DELETE' });
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
//     const matchSearch = (q.title ?? '').toLowerCase().includes(searchQuery.toLowerCase());
//     const matchFilter = filterVisibility === 'all' ? true : q.visibility === filterVisibility;
//     return matchSearch && matchFilter;
//   });

//   // Stats
//   const totalStudents = new Set(results.map(r => r.studentName || r.userName)).size;
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
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

//           {/* Left: Quizzes + Results tabs */}
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.18 }}
//             className="lg:col-span-2 space-y-4"
//           >
//             {/* Tab Bar */}
//             <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1.5 w-fit overflow-x-auto">
//               {(['quizzes', 'results'] as const).map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize whitespace-nowrap ${
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
//                   <div className="flex items-center gap-1 bg-white/[0.02] rounded-xl p-1 shrink-0 overflow-x-auto">
//                     {(['all', 'public', 'assigned'] as const).map(f => (
//                       <button
//                         key={f}
//                         onClick={() => setFilterVisibility(f)}
//                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize whitespace-nowrap ${
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
//                           {/* Quiz card - clickable */}
//                           <div 
//                             onClick={() => router.push(`/teacher/quizzes/${quiz.id}`)}
//                             className="cursor-pointer"
//                           >
//                             <div className="flex items-start gap-3">
//                               {/* Icon */}
//                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
//                                 quiz.visibility === 'assigned'
//                                   ? 'bg-amber-500/10 border border-amber-500/20'
//                                   : 'bg-emerald-500/8 border border-emerald-500/15'
//                               }`}>
//                                 {quiz.visibility === 'assigned'
//                                   ? <Lock className="w-4 h-4 text-amber-400/70" />
//                                   : <Globe className="w-4 h-4 text-emerald-400/70" />
//                                 }
//                               </div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="flex items-start justify-between gap-2">
//                                   <div className="min-w-0">
//                                     <div className="flex flex-wrap items-center gap-2 mb-1">
//                                       <h3 className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors truncate">
//                                         {quiz.title}
//                                       </h3>
//                                       <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${
//                                         quiz.visibility === 'assigned'
//                                           ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
//                                           : 'bg-emerald-500/8 text-emerald-400 border-emerald-500/15'
//                                       }`}>
//                                         {quiz.visibility}
//                                       </span>
//                                     </div>
//                                     <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/25">
//                                       <span className="flex items-center gap-1">
//                                         <Clock className="w-3 h-3" /> {quiz.duration}m
//                                       </span>
//                                       <span className="flex items-center gap-1">
//                                         <FileText className="w-3 h-3" /> {quiz.questions?.length || 0} Qs
//                                       </span>
//                                       <span className="flex items-center gap-1">
//                                         <Star className="w-3 h-3" /> {quiz.totalMarks} marks
//                                       </span>
//                                       {quizResults.length > 0 && (
//                                         <span className="flex items-center gap-1">
//                                           <Users className="w-3 h-3" /> {quizResults.length} attempts
//                                         </span>
//                                       )}
//                                       {quizAvg !== null && (
//                                         <span className={`flex items-center gap-1 font-medium ${quizAvg >= 70 ? 'text-emerald-400/70' : 'text-amber-400/70'}`}>
//                                           <TrendingUp className="w-3 h-3" /> avg {quizAvg}%
//                                         </span>
//                                       )}
//                                       <span className="text-white/15 hidden sm:inline">{formatDate(quiz.createdAt)}</span>
//                                     </div>
//                                   </div>

//                                   {/* Actions - Edit/Delete */}
//                                   <div className="flex items-center gap-1.5 shrink-0">
//                                     <Link href={`/teacher/quizzes/${quiz.id}`} onClick={e => e.stopPropagation()}>
//                                       <button className="p-2 rounded-lg text-white/25 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all sm:opacity-0 sm:group-hover:opacity-100 opacity-100" title="View & Generate Link">
//                                         <Link2 className="w-3.5 h-3.5" />
//                                       </button>
//                                     </Link>
//                                     <Link href={`/teacher/edit-quiz/${quiz.id}`} onClick={(e) => e.stopPropagation()}>
//                                       <button className="p-2 rounded-lg text-white/25 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all sm:opacity-0 sm:group-hover:opacity-100 opacity-100">
//                                         <Edit3 className="w-3.5 h-3.5" />
//                                       </button>
//                                     </Link>
//                                     <button
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         setDeleteModal({ open: true, quiz });
//                                       }}
//                                       className="p-2 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
//                                     >
//                                       <Trash2 className="w-3.5 h-3.5" />
//                                     </button>
//                                   </div>
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
//                     <div className="p-4 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                       <div>
//                         <p className="text-sm text-white/70 font-medium">Student Submissions</p>
//                         <p className="text-xs text-white/25 mt-0.5">{results.length} total submissions</p>
//                       </div>
//                       <Link href="/teacher/all-results">
//                         <button className="text-xs text-white/30 hover:text-emerald-400 flex items-center gap-1 transition-colors w-fit">
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
//                           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                             <div className="flex items-center gap-3 min-w-0">
//                               <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
//                                 result.percentage >= 70
//                                   ? 'bg-emerald-500/10 text-emerald-400'
//                                   : result.percentage >= 40
//                                   ? 'bg-amber-500/10 text-amber-400'
//                                   : 'bg-red-500/10 text-red-400'
//                               }`}>
//                                 {(result.studentName?.charAt(0) || result.userName?.charAt(0) || 'A')?.toUpperCase()}
//                               </div>
//                               <div className="min-w-0">
//                                 <p className="text-sm text-white/80 font-medium truncate">
//                                   {result.studentName || result.userName || 'Anonymous'}
//                                 </p>
//                                 <p className="text-xs text-white/30 truncate">{result.quizTitle}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-3 shrink-0 sm:ml-auto">
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
  PlusCircle, BookOpen, Users, BarChart3, LogOut,
  Edit3, Trash2, Clock, Star, ChevronRight, TrendingUp,
  Award, Eye, Search, Globe, Lock, GraduationCap, Layers,
  Target, Link2, Zap, ArrowUpRight, FileText, X, Home,
  MoreVertical,
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface Quiz {
  id: string; title: string; description: string;
  duration: number; totalMarks: number; questions: any[];
  createdAt: string; visibility: 'public' | 'private' | 'assigned';
  assignedTo?: string[]; attempts?: number;
}
interface Result {
  id: string; quizId: string; quizTitle: string;
  studentName: string; score: number; totalMarks: number;
  percentage: number; submittedAt: string;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisibility, setFilterVisibility] = useState<'all' | 'public' | 'assigned'>('all');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; quiz: Quiz | null }>({ open: false, quiz: null });
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'quizzes' | 'results' | 'stats'>('quizzes');

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

  const filteredQuizzes = quizzes.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filterVisibility === 'all' ? true : q.visibility === filterVisibility;
    return matchSearch && matchFilter;
  });

  const totalStudents = new Set(results.map(r => r.studentName)).size;
  const avgScore = results.length
    ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length) : 0;
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
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-emerald-600/6 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-teal-600/5 rounded-full blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white/90 text-sm">QuizPortal</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Teacher</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/teacher/create-quiz">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-medium transition-all">
                <PlusCircle className="w-3.5 h-3.5 shrink-0" />
                <span>New Quiz</span>
              </button>
            </Link>
            <Link href="/profile">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || 'T'}
                </div>
                <span className="text-xs text-white/60 hidden sm:block max-w-[80px] truncate">{user?.name}</span>
              </div>
            </Link>
            <button onClick={handleLogout} className="p-1.5 rounded-xl text-white/30 hover:text-red-400/70 hover:bg-red-500/5 transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5 sm:py-8 pb-24 sm:pb-8">

        {/* ── Page Header ── */}
        <div className="mb-5 sm:mb-8">
          <p className="text-white/30 text-xs sm:text-sm mb-1">Welcome back 👋</p>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {user?.name?.split(' ')[0]}<span className="text-emerald-400">.</span>
          </h1>
          <p className="text-white/30 text-xs sm:text-sm mt-1.5">
            {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} · {totalAttempts} total attempts
          </p>
        </div>

        {/* ── Stats — 2×2 on mobile, 4 cols on lg ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          {[
            { label: 'Quizzes',  value: quizzes.length,  icon: Layers,     color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20',  sub: `${quizzes.filter(q => q.visibility === 'public').length} public` },
            { label: 'Attempts', value: totalAttempts,   icon: Target,     color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', sub: 'all quizzes' },
            { label: 'Avg Score',value: `${avgScore}%`,  icon: TrendingUp, color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   sub: avgScore >= 70 ? 'doing well' : 'needs attention' },
            { label: 'Students', value: totalStudents,   icon: Users,      color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',     sub: 'have attempted' },
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
              <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">{stat.label}</p>
              <p className="text-[9px] sm:text-[10px] text-white/20 mt-0.5 truncate">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile Tab Bar ── */}
        <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1 mb-4 sm:hidden">
          {(['quizzes', 'results', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                  : 'text-white/30'
              }`}
            >
              {tab === 'quizzes' ? `Quizzes (${quizzes.length})` : tab === 'results' ? `Results (${results.length})` : 'Stats'}
            </button>
          ))}
        </div>

        {/* ── Main Layout: on desktop side by side, on mobile tabs ── */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">

          {/* ── Left: Quizzes + Results (always visible desktop, tab on mobile) ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Desktop tab bar */}
            <div className="hidden sm:flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-1.5 w-fit">
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
            {(activeTab === 'quizzes') && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-3 sm:p-4 border-b border-white/[0.05] space-y-2.5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search quizzes..."
                      className="w-full pl-9 pr-9 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {/* Filter pills */}
                  <div className="flex items-center gap-1.5">
                    {(['all', 'public', 'assigned'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setFilterVisibility(f)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all capitalize flex-1 sm:flex-none ${
                          filterVisibility === f ? 'bg-white/[0.08] text-white' : 'text-white/30 hover:text-white/60 bg-white/[0.02]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quiz List */}
                {filteredQuizzes.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="w-12 h-12 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-white/15" />
                    </div>
                    <p className="text-white/30 text-sm">{searchQuery ? 'No quizzes match' : 'No quizzes yet'}</p>
                    {!searchQuery && (
                      <Link href="/teacher/create-quiz">
                        <button className="mt-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm">
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
                        ? Math.round(quizResults.reduce((a, r) => a + r.percentage, 0) / quizResults.length) : null;

                      return (
                        <div
                          key={quiz.id}
                          className="p-3.5 sm:p-4 hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
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
                              {/* Title row */}
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <button
                                  onClick={() => router.push(`/teacher/quizzes/${quiz.id}`)}
                                  className="text-left min-w-0"
                                >
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-sm font-semibold text-white/85 hover:text-white transition-colors">
                                      {quiz.title}
                                    </span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full border shrink-0 ${
                                      quiz.visibility === 'assigned'
                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        : 'bg-emerald-500/8 text-emerald-400 border-emerald-500/15'
                                    }`}>
                                      {quiz.visibility}
                                    </span>
                                  </div>
                                </button>
                                {/* Action buttons — always visible on mobile, hover on desktop */}
                                <div className="flex items-center gap-1 shrink-0">
                                  <Link href={`/teacher/quizzes/${quiz.id}`} onClick={e => e.stopPropagation()}>
                                    <button className="p-1.5 rounded-lg text-white/25 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all" title="View">
                                      <Link2 className="w-3.5 h-3.5" />
                                    </button>
                                  </Link>
                                  <Link href={`/teacher/edit-quiz/${quiz.id}`} onClick={e => e.stopPropagation()}>
                                    <button className="p-1.5 rounded-lg text-white/25 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all">
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                  </Link>
                                  <button
                                    onClick={e => { e.stopPropagation(); setDeleteModal({ open: true, quiz }); }}
                                    className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              {/* Meta info */}
                              <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] text-white/25">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {quiz.duration}m</span>
                                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {quiz.questions?.length || 0} Qs</span>
                                <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {quiz.totalMarks}pts</span>
                                {quizResults.length > 0 && (
                                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {quizResults.length}</span>
                                )}
                                {quizAvg !== null && (
                                  <span className={`flex items-center gap-1 font-medium ${quizAvg >= 70 ? 'text-emerald-400/70' : 'text-amber-400/70'}`}>
                                    avg {quizAvg}%
                                  </span>
                                )}
                                <span className="text-white/15">{formatDate(quiz.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {filteredQuizzes.length > 0 && (
                  <div className="p-3 border-t border-white/[0.04] text-center">
                    <p className="text-[10px] text-white/20">{filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} shown</p>
                  </div>
                )}
              </div>
            )}

            {/* Results Tab */}
            {(activeTab === 'results') && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                {results.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="w-12 h-12 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-white/15" />
                    </div>
                    <p className="text-white/30 text-sm">No results yet</p>
                    <p className="text-white/15 text-xs mt-1">Results appear when students complete quizzes</p>
                  </div>
                ) : (
                  <>
                    <div className="p-3.5 sm:p-4 border-b border-white/[0.05] flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/70 font-medium">Student Submissions</p>
                        <p className="text-xs text-white/25 mt-0.5">{results.length} total</p>
                      </div>
                      <Link href="/teacher/all-results">
                        <button className="text-xs text-white/30 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                          View all <ChevronRight className="w-3 h-3" />
                        </button>
                      </Link>
                    </div>
                    <div className="divide-y divide-white/[0.04]">
                      {recentResults.map((result) => (
                        <div key={result.id} className="p-3.5 sm:p-4 hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                                result.percentage >= 70 ? 'bg-emerald-500/10 text-emerald-400' :
                                result.percentage >= 40 ? 'bg-amber-500/10 text-amber-400' :
                                'bg-red-500/10 text-red-400'
                              }`}>
                                {result.studentName?.charAt(0)?.toUpperCase() || 'S'}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm text-white/80 font-medium truncate">{result.studentName}</p>
                                <p className="text-xs text-white/30 truncate">{result.quizTitle}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="text-right">
                                <p className={`text-sm font-bold ${
                                  result.percentage >= 70 ? 'text-emerald-400' :
                                  result.percentage >= 40 ? 'text-amber-400' : 'text-red-400'
                                }`}>{result.percentage}%</p>
                                <p className="text-[10px] text-white/20">{result.score}/{result.totalMarks}</p>
                              </div>
                              <p className="text-[10px] text-white/20 hidden sm:block w-12 text-right">
                                {formatDate(result.submittedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ── Right Sidebar / Stats Tab ── */}
          {/* On mobile: only visible when activeTab === 'stats'. On desktop: always visible */}
          <div className={`space-y-4 ${activeTab === 'stats' ? 'block' : 'hidden lg:block'}`}>

            {/* Performance Overview */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Performance Overview</h3>
              {results.length === 0 ? (
                <div className="text-center py-6">
                  <Award className="w-8 h-8 text-white/15 mx-auto mb-3" />
                  <p className="text-xs text-white/25">No data yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/40">Class average</span>
                      <span className={`font-bold ${avgScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{avgScore}%</span>
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
                  {[
                    { label: 'Excellent (≥90%)', count: results.filter(r => r.percentage >= 90).length, color: 'bg-emerald-400' },
                    { label: 'Good (70–89%)',    count: results.filter(r => r.percentage >= 70 && r.percentage < 90).length, color: 'bg-sky-400' },
                    { label: 'Average (40–69%)', count: results.filter(r => r.percentage >= 40 && r.percentage < 70).length, color: 'bg-amber-400' },
                    { label: 'Below (<40%)',     count: results.filter(r => r.percentage < 40).length, color: 'bg-red-400' },
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

            {/* Quiz Activity */}
            {quizzes.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 sm:p-5">
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
                              <div
                                className="h-full bg-emerald-500/50 rounded-full transition-all"
                                style={{ width: `${quizzes.length > 0 ? (quiz.cnt / Math.max(...quizzes.map(q => results.filter(r => r.quizTitle === q.title).length), 1)) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-white/25 w-6 text-right">{quiz.cnt}</span>
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
                { label: 'Create Quiz',  href: '/teacher/create-quiz', icon: PlusCircle, color: 'text-emerald-400' },
                { label: 'All Results',  href: '/teacher/all-results',  icon: BarChart3,  color: 'text-sky-400'     },
                { label: 'Students',     href: '/teacher/students',     icon: Users,      color: 'text-violet-400'  },
              ].map(link => (
                <Link key={link.href} href={link.href}>
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <link.icon className={`w-4 h-4 ${link.color} opacity-60`} />
                      <span className="text-sm text-white/45">{link.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/15" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      <AnimatePresence>
        {deleteModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteModal({ open: false, quiz: null })}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0f0f12] border border-white/[0.08] rounded-t-3xl sm:rounded-2xl p-6 w-full sm:max-w-sm shadow-2xl"
            >
              {/* Drag handle — mobile only */}
              <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-5 sm:hidden" />
              <div className="w-11 h-11 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
              <p className="text-sm text-white/40 text-center mb-6">
                "<span className="text-white/60">{deleteModal.quiz?.title}</span>" will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ open: false, quiz: null })}
                  className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 text-sm hover:bg-white/[0.08] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 bg-red-500/15 border border-red-500/25 rounded-xl text-red-400 text-sm hover:bg-red-500/25 transition-all disabled:opacity-50 font-medium"
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