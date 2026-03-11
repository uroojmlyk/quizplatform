// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { 
//   Clock, 
//   TrendingUp, 
//   Award, 
//   Users,
//   Sparkles,
//   ChevronRight,
//   BookOpen,
//   Zap,
//   Globe,
//   Code,
//   Database,
//   Brain,
//   BarChart3
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

// interface Category {
//   id: string;
//   name: string;
//   icon: any;
//   count: number;
//   color: string;
// }

// export default function ExplorePage() {
//   const [featuredQuizzes, setFeaturedQuizzes] = useState<Quiz[]>([]);
//   const [trendingQuizzes, setTrendingQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);

//   const categories: Category[] = [
//     { id: 'web-dev', name: 'Web Development', icon: Globe, count: 24, color: 'from-blue-500 to-cyan-500' },
//     { id: 'programming', name: 'Programming', icon: Code, count: 32, color: 'from-purple-500 to-pink-500' },
//     { id: 'database', name: 'Database', icon: Database, count: 18, color: 'from-green-500 to-emerald-500' },
//     { id: 'aptitude', name: 'Aptitude', icon: Brain, count: 45, color: 'from-orange-500 to-red-500' },
//     { id: 'general', name: 'General Knowledge', icon: Award, count: 28, color: 'from-yellow-500 to-amber-500' },
//   ];

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       // Fetch featured quizzes
//       const featuredRes = await fetch('/api/public/quizzes?type=featured');
//       const featuredData = await featuredRes.json();
//       if (featuredData.success) {
//         setFeaturedQuizzes(featuredData.data);
//       }

//       // Fetch trending quizzes
//       const trendingRes = await fetch('/api/public/quizzes?type=trending');
//       const trendingData = await trendingRes.json();
//       if (trendingData.success) {
//         setTrendingQuizzes(trendingData.data);
//       }
//     } catch (error) {
//       console.error('Error fetching quizzes:', error);
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
//             <Sparkles className="w-5 h-5 text-white/40 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0B0B0F]">
//       {/* Hero Section */}
//       <section className="relative border-b border-white/10 bg-gradient-to-b from-[#0B0B0F] to-[#111117]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
//               Explore <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Quizzes</span>
//             </h1>
//             <p className="text-lg text-white/60 mb-8">
//               Discover thousands of quizzes created by our community. No login required to play!
//             </p>
//             <div className="flex items-center justify-center gap-4">
//               <Link
//                 href="/explore/trending"
//                 className="px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all flex items-center gap-2"
//               >
//                 <TrendingUp className="w-4 h-4" />
//                 Trending Now
//               </Link>
//               <Link
//                 href="/explore/category/all"
//                 className="px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all border border-white/10"
//               >
//                 Browse All
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-2xl font-medium text-white">Categories</h2>
//           <Link href="/explore/categories" className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1">
//             View all <ChevronRight className="w-4 h-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               href={`/explore/category/${category.id}`}
//               className="group block bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all hover:scale-105"
//             >
//               <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                 <category.icon className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-lg font-medium text-white mb-1">{category.name}</h3>
//               <p className="text-sm text-white/40">{category.count} quizzes</p>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Featured Quizzes */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <Award className="w-5 h-5 text-yellow-400" />
//             <h2 className="text-2xl font-medium text-white">Featured Quizzes</h2>
//           </div>
//           <Link href="/explore/featured" className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1">
//             View all <ChevronRight className="w-4 h-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featuredQuizzes.map((quiz) => (
//             <div
//               key={quiz._id}
//               onClick={() => handleStartQuiz(quiz._id)}
//               className="group bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
//                   <BookOpen className="w-5 h-5 text-purple-400" />
//                 </div>
//                 <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
//                   {quiz.category || 'General'}
//                 </span>
//               </div>

//               <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{quiz.title}</h3>
//               <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

//               <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
//                 <span className="flex items-center gap-1">
//                   <Clock className="w-3 h-3" />
//                   {quiz.duration} min
//                 </span>
//                 <span>•</span>
//                 <span>{quiz.questions?.length || 0} questions</span>
//                 <span>•</span>
//                 <span>{quiz.totalMarks} marks</span>
//               </div>

//               <div className="flex items-center justify-between pt-4 border-t border-white/10">
//                 <div className="flex items-center gap-2 text-xs">
//                   <Users className="w-3 h-3 text-white/30" />
//                   <span className="text-white/40">{quiz.attempts || 0} plays</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs">
//                   <BarChart3 className="w-3 h-3 text-white/30" />
//                   <span className="text-white/40">{quiz.avgScore || 0}% avg</span>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {featuredQuizzes.length === 0 && (
//             <div className="col-span-3 text-center py-12 bg-[#111117] rounded-xl border border-white/10">
//               <Award className="w-12 h-12 text-white/20 mx-auto mb-4" />
//               <p className="text-white/40">No featured quizzes yet</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Trending Quizzes */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <TrendingUp className="w-5 h-5 text-purple-400" />
//             <h2 className="text-2xl font-medium text-white">Trending Now</h2>
//           </div>
//           <Link href="/explore/trending" className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1">
//             View all <ChevronRight className="w-4 h-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {trendingQuizzes.map((quiz) => (
//             <div
//               key={quiz._id}
//               onClick={() => handleStartQuiz(quiz._id)}
//               className="group bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
//                   <Zap className="w-5 h-5 text-green-400" />
//                 </div>
//                 <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
//                   Hot 🔥
//                 </span>
//               </div>

//               <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{quiz.title}</h3>
//               <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

//               <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
//                 <span className="flex items-center gap-1">
//                   <Clock className="w-3 h-3" />
//                   {quiz.duration} min
//                 </span>
//                 <span>•</span>
//                 <span>{quiz.questions?.length || 0} questions</span>
//                 <span>•</span>
//                 <span>{quiz.totalMarks} marks</span>
//               </div>

//               <div className="flex items-center justify-between pt-4 border-t border-white/10">
//                 <div className="flex items-center gap-2 text-xs">
//                   <Users className="w-3 h-3 text-white/30" />
//                   <span className="text-white/40">{quiz.attempts || 0} plays</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs">
//                   <BarChart3 className="w-3 h-3 text-white/30" />
//                   <span className="text-white/40">{quiz.avgScore || 0}% avg</span>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {trendingQuizzes.length === 0 && (
//             <div className="col-span-3 text-center py-12 bg-[#111117] rounded-xl border border-white/10">
//               <TrendingUp className="w-12 h-12 text-white/20 mx-auto mb-4" />
//               <p className="text-white/40">No trending quizzes yet</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/10 rounded-2xl p-12 text-center">
//           <h2 className="text-3xl font-light text-white mb-4">
//             Want to create your own quiz?
//           </h2>
//           <p className="text-white/60 mb-8 max-w-2xl mx-auto">
//             Join our community of creators. Sign up for free and start sharing your knowledge.
//           </p>
//           <Link
//             href="/signup"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all"
//           >
//             Get Started
//             <ChevronRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Clock, 
  TrendingUp, 
  Award, 
  Users,
  Sparkles,
  ChevronRight,
  BookOpen,
  Zap,
  Globe,
  Code,
  Database,
  Brain,
  BarChart3,
  Star,
  Flame,
  Rocket
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

interface Category {
  id: string;
  name: string;
  icon: any;
  count: number;
  color: string;
  gradient: string;
}

export default function ExplorePage() {
  const [featuredQuizzes, setFeaturedQuizzes] = useState<Quiz[]>([]);
  const [trendingQuizzes, setTrendingQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { 
      id: 'web-dev', 
      name: 'Web Development', 
      icon: Globe, 
      count: 24, 
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'programming', 
      name: 'Programming', 
      icon: Code, 
      count: 32, 
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'database', 
      name: 'Database', 
      icon: Database, 
      count: 18, 
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'aptitude', 
      name: 'Aptitude', 
      icon: Brain, 
      count: 45, 
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'general', 
      name: 'General Knowledge', 
      icon: Award, 
      count: 28, 
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-500'
    },
  ];

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      // Fetch featured quizzes
      const featuredRes = await fetch('/api/public/quizzes?type=featured');
      const featuredData = await featuredRes.json();
      if (featuredData.success) {
        setFeaturedQuizzes(featuredData.data);
      }

      // Fetch trending quizzes
      const trendingRes = await fetch('/api/public/quizzes?type=trending');
      const trendingData = await trendingRes.json();
      if (trendingData.success) {
        setTrendingQuizzes(trendingData.data);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quizId: string) => {
    window.location.href = `/quiz/${quizId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400/60 animate-pulse" />
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

      {/* Navbar */}
      <nav className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl"
          style={{ background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: T.accentLight }} />
            <span className="text-white font-bold text-xl">
              ficer<span className="font-light" style={{ color: T.accentLight }}>quiz</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden sm:block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})` }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative border-b border-white/[0.06] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ borderColor: T.accentBorder, background: T.accentBg }}>
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full" style={{ background: T.accentLight }} />
              <span className="text-xs font-semibold" style={{ color: T.accentLight }}>
                Discover · Learn · Grow
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Explore{' '}
              <span style={{ background: `linear-gradient(135deg, ${T.accentLight}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Quizzes
              </span>
            </h1>
            <p className="text-lg text-white/40 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover thousands of quizzes created by our community. No login required to play — just click and learn.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/explore/trending"
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff', boxShadow: `0 0 40px ${T.accentGlow}` }}>
                <TrendingUp className="w-4 h-4" />
                Trending Now
                <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/explore/category/all"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/[0.06]"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, color: 'rgba(255,255,255,0.7)' }}>
                Browse All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: T.accentBg }}>
              <Award className="w-4 h-4" style={{ color: T.accentLight }} />
            </div>
            <h2 className="text-2xl font-bold text-white">Categories</h2>
          </div>
          <Link href="/explore/categories" className="text-sm text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/explore/category/${category.id}`}
                className="group block rounded-xl p-6 transition-all hover:scale-[1.02]"
                style={{ background: T.bgCard, border: `1px solid ${T.border}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                  <category.icon className="w-6 h-6" style={{ color: T.accentLight }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-sm" style={{ color: T.textMuted }}>{category.count} quizzes</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Quizzes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: T.accentBg }}>
              <Star className="w-4 h-4" style={{ color: T.accentLight }} />
            </div>
            <h2 className="text-2xl font-bold text-white">Featured Quizzes</h2>
          </div>
          <Link href="/explore/featured" className="text-sm text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredQuizzes.map((quiz, i) => (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => handleStartQuiz(quiz._id)}
              className="group rounded-xl p-6 transition-all hover:scale-[1.02] cursor-pointer"
              style={{ background: T.bgCard, border: `1px solid ${T.border}` }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                  <BookOpen className="w-5 h-5" style={{ color: T.accentLight }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentLight }}>
                  {quiz.category || 'General'}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{quiz.title}</h3>
              <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

              <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
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
                  <span style={{ color: T.textMuted }}>{quiz.attempts || 0} plays</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <BarChart3 className="w-3 h-3" style={{ color: T.textMuted }} />
                  <span style={{ color: T.textMuted }}>{quiz.avgScore || 0}% avg</span>
                </div>
              </div>
            </motion.div>
          ))}

          {featuredQuizzes.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 text-center py-12 rounded-xl"
              style={{ background: T.bgCard, border: `1px solid ${T.border}` }}
            >
              <Star className="w-12 h-12 mx-auto mb-4" style={{ color: T.textMuted }} />
              <p className="text-sm" style={{ color: T.textMuted }}>No featured quizzes yet</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trending Quizzes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: T.accentBg }}>
              <Flame className="w-4 h-4" style={{ color: T.accentLight }} />
            </div>
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          </div>
          <Link href="/explore/trending" className="text-sm text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingQuizzes.map((quiz, i) => (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => handleStartQuiz(quiz._id)}
              className="group rounded-xl p-6 transition-all hover:scale-[1.02] cursor-pointer"
              style={{ background: T.bgCard, border: `1px solid ${T.border}` }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                  <Zap className="w-5 h-5" style={{ color: T.accentLight }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentLight }}>
                  Hot 🔥
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{quiz.title}</h3>
              <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

              <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
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
                  <span style={{ color: T.textMuted }}>{quiz.attempts || 0} plays</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <BarChart3 className="w-3 h-3" style={{ color: T.textMuted }} />
                  <span style={{ color: T.textMuted }}>{quiz.avgScore || 0}% avg</span>
                </div>
              </div>
            </motion.div>
          ))}

          {trendingQuizzes.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 text-center py-12 rounded-xl"
              style={{ background: T.bgCard, border: `1px solid ${T.border}` }}
            >
              <Flame className="w-12 h-12 mx-auto mb-4" style={{ color: T.textMuted }} />
              <p className="text-sm" style={{ color: T.textMuted }}>No trending quizzes yet</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl p-12 text-center overflow-hidden border"
          style={{ background: `linear-gradient(135deg, ${T.accentBg} 0%, rgba(16,185,129,0.02) 50%, ${T.bg} 100%)`, borderColor: T.accentBorder }}
        >
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${T.accent}60, transparent)` }} />
          <motion.div className="absolute inset-0" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: `radial-gradient(circle at 50% 0%, ${T.accentGlow} 0%, transparent 55%)` }} />

          <div className="relative z-10">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-8 mx-auto"
              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
              <Rocket className="w-6 h-6" style={{ color: T.accentLight }} />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to create your own quiz?
            </h2>
            <p className="text-white/40 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
              Join thousands of creators. Sign up for free and start sharing your knowledge with the world.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, boxShadow: `0 0 40px ${T.accentGlow}` }}>
              Get Started
              <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}