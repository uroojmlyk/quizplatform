// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   ArrowLeft, 
//   Clock, 
//   Users, 
//   BarChart3,
//   BookOpen,
//   Sparkles,
//   Grid,
//   Filter,
//   ChevronDown
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

// interface CategoryInfo {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   color: string;
// }

// const categoryMap: Record<string, CategoryInfo> = {
//   'web-dev': {
//     id: 'web-dev',
//     name: 'Web Development',
//     description: 'HTML, CSS, JavaScript, React, Next.js and more',
//     icon: '🌐',
//     color: 'from-blue-500 to-cyan-500'
//   },
//   'programming': {
//     id: 'programming',
//     name: 'Programming',
//     description: 'Python, Java, C++, Data Structures, Algorithms',
//     icon: '💻',
//     color: 'from-purple-500 to-pink-500'
//   },
//   'database': {
//     id: 'database',
//     name: 'Database',
//     description: 'MongoDB, SQL, MySQL, PostgreSQL, Prisma',
//     icon: '🗄️',
//     color: 'from-green-500 to-emerald-500'
//   },
//   'aptitude': {
//     id: 'aptitude',
//     name: 'Aptitude',
//     description: 'Mathematics, Logical Reasoning, Quantitative Aptitude',
//     icon: '🧠',
//     color: 'from-orange-500 to-red-500'
//   },
//   'general': {
//     id: 'general',
//     name: 'General Knowledge',
//     description: 'Science, History, Geography, Current Affairs',
//     icon: '📚',
//     color: 'from-yellow-500 to-amber-500'
//   }
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const router = useRouter();
//   const slug = params.slug as string;
  
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'highest'>('popular');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const category = categoryMap[slug] || {
//     id: slug,
//     name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
//     description: 'Quizzes in this category',
//     icon: '📋',
//     color: 'from-gray-500 to-gray-600'
//   };

//   useEffect(() => {
//     fetchQuizzes();
//   }, [slug, sortBy, page]);

//   const fetchQuizzes = async () => {
//     try {
//       const res = await fetch(`/api/public/quizzes?category=${slug}&sort=${sortBy}&page=${page}&limit=9`);
//       const data = await res.json();
//       if (data.success) {
//         if (page === 1) {
//           setQuizzes(data.data);
//         } else {
//           setQuizzes(prev => [...prev, ...data.data]);
//         }
//         setHasMore(data.data.length === 9);
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

//   const loadMore = () => {
//     setPage(prev => prev + 1);
//   };

//   if (loading && page === 1) {
//     return (
//       <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <BookOpen className="w-5 h-5 text-white/40 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0B0B0F]">
//       {/* Header with Category Info */}
//       <div className={`bg-gradient-to-r ${category.color} bg-opacity-5 border-b border-white/10`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </button>

//           <div className="flex items-center gap-4">
//             <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl`}>
//               {category.icon}
//             </div>
//             <div>
//               <h1 className="text-3xl font-medium text-white mb-2">{category.name}</h1>
//               <p className="text-white/60">{category.description}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Filter className="w-4 h-4 text-white/40" />
//             <span className="text-sm text-white/40">Sort by:</span>
//             <div className="flex gap-2 ml-2">
//               {[
//                 { value: 'popular', label: 'Most Popular' },
//                 { value: 'newest', label: 'Newest' },
//                 { value: 'highest', label: 'Highest Rated' }
//               ].map((option) => (
//                 <button
//                   key={option.value}
//                   onClick={() => {
//                     setSortBy(option.value as any);
//                     setPage(1);
//                   }}
//                   className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
//                     sortBy === option.value
//                       ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
//                       : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
//                   }`}
//                 >
//                   {option.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="text-sm text-white/40">
//             {quizzes.length} quizzes
//           </div>
//         </div>
//       </div>

//       {/* Quizzes Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {quizzes.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {quizzes.map((quiz) => (
//                 <div
//                   key={quiz._id}
//                   onClick={() => handleStartQuiz(quiz._id)}
//                   className="group bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
//                       <BookOpen className="w-5 h-5 text-purple-400" />
//                     </div>
//                     <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
//                       {quiz.category || category.name}
//                     </span>
//                   </div>

//                   <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{quiz.title}</h3>
//                   <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

//                   <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
//                     <span className="flex items-center gap-1">
//                       <Clock className="w-3 h-3" />
//                       {quiz.duration} min
//                     </span>
//                     <span>•</span>
//                     <span>{quiz.questions?.length || 0} questions</span>
//                     <span>•</span>
//                     <span>{quiz.totalMarks} marks</span>
//                   </div>

//                   <div className="flex items-center justify-between pt-4 border-t border-white/10">
//                     <div className="flex items-center gap-2 text-xs">
//                       <Users className="w-3 h-3 text-white/30" />
//                       <span className="text-white/40">{quiz.attempts || 0} plays</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-xs">
//                       <BarChart3 className="w-3 h-3 text-white/30" />
//                       <span className="text-white/40">{quiz.avgScore || 0}% avg</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Load More */}
//             {hasMore && (
//               <div className="text-center mt-8">
//                 <button
//                   onClick={loadMore}
//                   className="px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
//                 >
//                   Load More
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-12 bg-[#111117] rounded-xl border border-white/10">
//             <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
//             <p className="text-white/40">No quizzes found in this category</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  BarChart3,
  BookOpen,
  Sparkles,
  Grid,
  Filter,
  ChevronDown,
  ChevronRight,
  Star,
  PlayCircle,
  TrendingUp,
  Award
} from 'lucide-react';

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
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  rating?: number;
}

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  stats: {
    quizzes: number;
    students: number;
    avgRating: number;
  };
}

const categoryMap: Record<string, CategoryInfo> = {
  'web-dev': {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Master modern web development with HTML, CSS, JavaScript, React, and Next.js',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    stats: { quizzes: 24, students: 1250, avgRating: 4.8 }
  },
  'programming': {
    id: 'programming',
    name: 'Programming',
    description: 'Learn programming fundamentals with Python, Java, C++, and data structures',
    icon: '💻',
    color: 'from-purple-500 to-pink-500',
    gradient: 'from-purple-500/20 to-pink-500/20',
    stats: { quizzes: 32, students: 2100, avgRating: 4.7 }
  },
  'database': {
    id: 'database',
    name: 'Database',
    description: 'Master SQL, MongoDB, Prisma, and database design patterns',
    icon: '🗄️',
    color: 'from-emerald-500 to-green-500',
    gradient: 'from-emerald-500/20 to-green-500/20',
    stats: { quizzes: 18, students: 980, avgRating: 4.9 }
  },
  'aptitude': {
    id: 'aptitude',
    name: 'Aptitude',
    description: 'Sharpen your problem-solving with mathematics and logical reasoning',
    icon: '🧠',
    color: 'from-orange-500 to-red-500',
    gradient: 'from-orange-500/20 to-red-500/20',
    stats: { quizzes: 45, students: 3200, avgRating: 4.6 }
  },
  'general': {
    id: 'general',
    name: 'General Knowledge',
    description: 'Expand your horizons with science, history, geography, and current affairs',
    icon: '📚',
    color: 'from-yellow-500 to-amber-500',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    stats: { quizzes: 56, students: 4100, avgRating: 4.5 }
  }
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'highest'>('popular');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = categoryMap[slug] || {
    id: slug,
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: 'Explore quizzes in this category',
    icon: '📋',
    color: 'from-gray-500 to-gray-600',
    gradient: 'from-gray-500/20 to-gray-600/20',
    stats: { quizzes: 0, students: 0, avgRating: 0 }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [slug, sortBy, page]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/public/quizzes?category=${slug}&sort=${sortBy}&page=${page}&limit=9`);
      const data = await res.json();
      
      if (data.success) {
        // Add mock metadata for demo
        const quizzesWithMeta = data.data.map((q: Quiz) => ({
          ...q,
          difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any,
          rating: (Math.random() * 2 + 3).toFixed(1),
          attempts: Math.floor(Math.random() * 150)
        }));

        if (page === 1) {
          setQuizzes(quizzesWithMeta);
        } else {
          setQuizzes(prev => [...prev, ...quizzesWithMeta]);
        }
        setHasMore(data.data.length === 9);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

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

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif]">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Back Button Skeleton */}
          <div className="w-20 h-8 bg-white/[0.02] rounded animate-pulse mb-8"></div>

          {/* Category Header Skeleton */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-white/[0.02] rounded-2xl animate-pulse"></div>
            <div className="flex-1">
              <div className="w-48 h-8 bg-white/[0.02] rounded animate-pulse mb-2"></div>
              <div className="w-96 h-4 bg-white/[0.02] rounded animate-pulse"></div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                <div className="w-16 h-4 bg-white/[0.02] rounded mb-2"></div>
                <div className="w-24 h-6 bg-white/[0.02] rounded"></div>
              </div>
            ))}
          </div>

          {/* Filters Skeleton */}
          <div className="flex items-center gap-3 mb-8">
            {[1,2,3].map(i => (
              <div key={i} className="w-24 h-8 bg-white/[0.02] rounded-full animate-pulse"></div>
            ))}
          </div>

          {/* Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                <div className="w-full h-32 bg-white/[0.02] rounded-xl mb-4"></div>
                <div className="w-3/4 h-5 bg-white/[0.02] rounded mb-2"></div>
                <div className="w-full h-4 bg-white/[0.02] rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="w-16 h-4 bg-white/[0.02] rounded"></div>
                  <div className="w-16 h-4 bg-white/[0.02] rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif] selection:bg-indigo-500/20 selection:text-white">
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
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">back to explore</span>
        </motion.button>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-3xl blur-3xl`}></div>
          
          <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <div className={`w-full h-full bg-gradient-to-br ${category.color} rounded-full filter blur-3xl`}></div>
            </div>
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl shadow-2xl`}>
                {category.icon}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-light text-white mb-2">{category.name}</h1>
                <p className="text-white/40 text-sm max-w-2xl">{category.description}</p>
              </div>

              {/* Category Stats */}
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-xs text-white/20">quizzes</p>
                  <p className="text-xl font-light text-white">{category.stats.quizzes}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/20">students</p>
                  <p className="text-xl font-light text-white">{category.stats.students}+</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/20">rating</p>
                  <p className="text-xl font-light text-white flex items-center gap-1">
                    {category.stats.avgRating}
                    <Star className="w-4 h-4 text-yellow-400/60 fill-yellow-400/60" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/20" />
            <span className="text-xs text-white/20">sort by:</span>
            <div className="flex gap-1">
              {[
                { value: 'popular', label: 'most popular' },
                { value: 'newest', label: 'newest' },
                { value: 'highest', label: 'highest rated' }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSortBy(option.value as any);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    sortBy === option.value
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'bg-white/[0.02] text-white/30 hover:text-white/50 border border-white/[0.05]'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/20">{quizzes.length} quizzes</span>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 border-l border-white/[0.05] pl-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white/[0.05] text-white' 
                    : 'text-white/20 hover:text-white/40'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white/[0.05] text-white' 
                    : 'text-white/20 hover:text-white/40'
                }`}
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quizzes Grid/List */}
        {quizzes.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {quizzes.map((quiz) => (
                  <motion.div
                    key={quiz._id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    onClick={() => handleStartQuiz(quiz._id)}
                    className="group bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10 flex items-center justify-center`}>
                        <BookOpen className={`w-6 h-6 text-${category.color.split('-')[1]}-400`} />
                      </div>
                      {quiz.difficulty && (
                        <span className={`text-[10px] px-2 py-1 rounded-full border ${
                          quiz.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                          'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}>
                          {quiz.difficulty}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-medium text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-white/30 mb-4 line-clamp-2">{quiz.description}</p>

                    <div className="flex items-center gap-3 text-xs text-white/20 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {quiz.duration} min
                      </span>
                      <span>·</span>
                      <span>{quiz.questions?.length || 0} questions</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-white/20" />
                          <span className="text-white/30">{quiz.attempts || 0}</span>
                        </span>
                        {quiz.rating && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400/40" />
                            <span className="text-white/30">{quiz.rating}</span>
                          </span>
                        )}
                      </div>
                      <PlayCircle className="w-5 h-5 text-white/20 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // List View
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {quizzes.map((quiz) => (
                  <motion.div
                    key={quiz._id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    onClick={() => handleStartQuiz(quiz._id)}
                    className="group bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-10 flex items-center justify-center`}>
                            <BookOpen className={`w-4 h-4 text-${category.color.split('-')[1]}-400`} />
                          </div>
                          <h3 className="text-base font-medium text-white group-hover:text-indigo-400 transition-colors">
                            {quiz.title}
                          </h3>
                          {quiz.difficulty && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              quiz.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                              quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              {quiz.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/30 mb-2">{quiz.description}</p>
                        <div className="flex items-center gap-4 text-xs text-white/20">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {quiz.duration} min
                          </span>
                          <span>·</span>
                          <span>{quiz.questions?.length || 0} questions</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {quiz.attempts || 0} attempts
                          </span>
                          {quiz.rating && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400/40" /> {quiz.rating}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Load More */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={loadMore}
                  className="px-6 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/30 hover:text-white/50 transition-all text-sm"
                >
                  load more quizzes
                </motion.button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl"
          >
            <div className="w-20 h-20 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/40 text-sm mb-2">no quizzes found</p>
            <p className="text-white/20 text-xs">check back later for new content</p>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}