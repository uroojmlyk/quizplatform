// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { 
//   ArrowLeft, 
//   TrendingUp, 
//   Clock, 
//   Users, 
//   BarChart3,
//   BookOpen,
//   Zap,
//   Sparkles,
//   ChevronRight,
//   Flame
// } from 'lucide-react';

// interface Quiz {
//   _id: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: any[];
//   createdByName: string;
//   category: string;
//   attempts: number;
//   avgScore: number;
// }

// export default function TrendingPage() {
//   const router = useRouter();
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

//   useEffect(() => {
//     fetchTrendingQuizzes();
//   }, [timeRange]);

//   const fetchTrendingQuizzes = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/public/quizzes?type=trending&range=${timeRange}&limit=12`);
//       const data = await res.json();
//       if (data.success) {
//         setQuizzes(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching trending quizzes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = (quizId: string) => {
//     window.location.href = `/quiz/${quizId}`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0B0B0F]">
//       {/* Header */}
//       <div className="border-b border-white/10 bg-[#111117]/50 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.back()}
//               className="p-2 hover:bg-white/5 rounded-lg transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5 text-white/60" />
//             </button>
//             <div>
//               <h1 className="text-xl font-medium text-white">Trending Quizzes</h1>
//               <p className="text-sm text-white/40">Most popular quizzes right now</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Time Range Filter */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex items-center gap-3">
//           <span className="text-sm text-white/40">Time range:</span>
//           <div className="flex gap-2">
//             {[
//               { value: 'week', label: 'This Week' },
//               { value: 'month', label: 'This Month' },
//               { value: 'all', label: 'All Time' }
//             ].map((range) => (
//               <button
//                 key={range.value}
//                 onClick={() => setTimeRange(range.value as any)}
//                 className={`px-4 py-2 rounded-lg text-sm transition-colors ${
//                   timeRange === range.value
//                     ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20'
//                     : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
//                 }`}
//               >
//                 {range.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Quizzes Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {quizzes.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {quizzes.map((quiz, index) => (
//               <div
//                 key={quiz._id}
//                 onClick={() => handleStartQuiz(quiz._id)}
//                 className="group bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-all cursor-pointer relative overflow-hidden"
//               >
//                 {/* Rank Badge */}
//                 <div className="absolute top-4 right-4">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
//                     index === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
//                     index === 1 ? 'bg-gray-400/20 text-gray-400 border border-gray-400/30' :
//                     index === 2 ? 'bg-amber-600/20 text-amber-600 border border-amber-600/30' :
//                     'bg-white/5 text-white/30 border border-white/10'
//                   }`}>
//                     #{index + 1}
//                   </div>
//                 </div>

//                 <div className="flex items-start justify-between mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
//                     <Flame className="w-5 h-5 text-orange-400" />
//                   </div>
//                   <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
//                     {quiz.attempts} plays
//                   </span>
//                 </div>

//                 <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{quiz.title}</h3>
//                 <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

//                 <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
//                   <span className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     {quiz.duration} min
//                   </span>
//                   <span>•</span>
//                   <span>{quiz.questions?.length || 0} questions</span>
//                   <span>•</span>
//                   <span>{quiz.totalMarks} marks</span>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-white/10">
//                   <div className="flex items-center gap-2 text-xs">
//                     <Users className="w-3 h-3 text-white/30" />
//                     <span className="text-white/40">{quiz.attempts} plays</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-xs">
//                     <BarChart3 className="w-3 h-3 text-white/30" />
//                     <span className="text-white/40">{quiz.avgScore}% avg</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-[#111117] rounded-xl border border-white/10">
//             <TrendingUp className="w-12 h-12 text-white/20 mx-auto mb-4" />
//             <p className="text-white/40">No trending quizzes found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }












'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  Users, 
  BarChart3,
  BookOpen,
  Zap,
  Sparkles,
  ChevronRight,
  Flame,
  Star,
  Award
} from 'lucide-react';

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
  _id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: any[];
  createdByName: string;
  category: string;
  attempts: number;
  avgScore: number;
}

export default function TrendingPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    fetchTrendingQuizzes();
  }, [timeRange]);

  const fetchTrendingQuizzes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/public/quizzes?type=trending&range=${timeRange}&limit=12`);
      const data = await res.json();
      if (data.success) {
        setQuizzes(data.data);
      }
    } catch (error) {
      console.error('Error fetching trending quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quizId: string) => {
    window.location.href = `/quiz/${quizId}`;
  };

  // Rank badge colors based on position
  const getRankColor = (index: number) => {
    if (index === 0) return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' };
    if (index === 1) return { bg: 'bg-gray-400/20', text: 'text-gray-400', border: 'border-gray-400/30' };
    if (index === 2) return { bg: 'bg-emerald-600/20', text: 'text-emerald-600', border: 'border-emerald-600/30' };
    return { bg: 'bg-white/5', text: 'text-white/30', border: 'border-white/10' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Flame className="w-5 h-5 text-emerald-400/60 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)` }} />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: 'rgba(7,7,9,0.85)', borderColor: T.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 rounded-lg transition-all"
              style={{ background: T.bgCard, border: `1px solid ${T.border}`, color: T.textMuted }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Trending Quizzes</h1>
              <p className="text-sm" style={{ color: T.textMuted }}>Most popular quizzes right now</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <span className="text-xs" style={{ color: T.textMuted }}>Time range:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'all', label: 'All Time' }
            ].map((range) => (
              <motion.button
                key={range.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTimeRange(range.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range.value
                    ? 'text-white border'
                    : 'text-white/40 hover:text-white/60'
                }`}
                style={timeRange === range.value ? {
                  background: T.accentBg,
                  borderColor: T.accentBorder,
                  color: T.accentLight
                } : {
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${T.border}`
                }}
              >
                {range.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quizzes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {quizzes.length > 0 ? (
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {quizzes.map((quiz, index) => {
              const rankColor = getRankColor(index);
              return (
                <motion.div
                  key={quiz._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleStartQuiz(quiz._id)}
                  className="group relative rounded-xl p-6 transition-all cursor-pointer overflow-hidden"
                  style={{ background: T.bgCard, border: `1px solid ${T.border}` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${T.accentGlow} 0%, transparent 70%)` }} />

                  {/* Rank Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${rankColor.bg} ${rankColor.text} ${rankColor.border}`}>
                      #{index + 1}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                        {index === 0 ? (
                          <Award className="w-5 h-5" style={{ color: T.accentLight }} />
                        ) : index === 1 ? (
                          <Star className="w-5 h-5" style={{ color: T.accentLight }} />
                        ) : index === 2 ? (
                          <Zap className="w-5 h-5" style={{ color: T.accentLight }} />
                        ) : (
                          <Flame className="w-5 h-5" style={{ color: T.accentLight }} />
                        )}
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full"
                        style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentLight }}>
                        {quiz.attempts} plays
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{quiz.title}</h3>
                    <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/30 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" style={{ color: T.textMuted }} />
                        {quiz.duration} min
                      </span>
                      <span>•</span>
                      <span>{quiz.questions?.length || 0} questions</span>
                      <span>•</span>
                      <span>{quiz.totalMarks} marks</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: T.border }}>
                      <div className="flex items-center gap-2 text-xs">
                        <Users className="w-3 h-3" style={{ color: T.textMuted }} />
                        <span style={{ color: T.textMuted }}>{quiz.attempts} plays</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <BarChart3 className="w-3 h-3" style={{ color: T.textMuted }} />
                        <span style={{ color: T.textMuted }}>{quiz.avgScore}% avg</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 rounded-xl"
            style={{ background: T.bgCard, border: `1px solid ${T.border}` }}
          >
            <TrendingUp className="w-12 h-12 mx-auto mb-4" style={{ color: T.textMuted }} />
            <p className="text-sm" style={{ color: T.textMuted }}>No trending quizzes found</p>
            <button
              onClick={() => setTimeRange('week')}
              className="mt-4 px-4 py-2 rounded-lg text-sm transition-all"
              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentLight }}
            >
              Try this week
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}