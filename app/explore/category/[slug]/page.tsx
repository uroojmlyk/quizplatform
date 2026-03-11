



// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { 
//   ArrowLeft, 
//   Clock, 
//   Users, 
//   BarChart3,
//   BookOpen,
//   Sparkles,
//   Grid,
//   Filter,
//   ChevronDown,
//   ChevronRight,
//   Star,
//   PlayCircle,
//   TrendingUp,
//   Award
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
//   difficulty?: 'beginner' | 'intermediate' | 'advanced';
//   rating?: number;
// }

// interface CategoryInfo {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   color: string;
//   gradient: string;
//   stats: {
//     quizzes: number;
//     students: number;
//     avgRating: number;
//   };
// }

// const categoryMap: Record<string, CategoryInfo> = {
//   'web-dev': {
//     id: 'web-dev',
//     name: 'Web Development',
//     description: 'Master modern web development with HTML, CSS, JavaScript, React, and Next.js',
//     icon: '🌐',
//     color: 'from-blue-500 to-cyan-500',
//     gradient: 'from-blue-500/20 to-cyan-500/20',
//     stats: { quizzes: 24, students: 1250, avgRating: 4.8 }
//   },
//   'programming': {
//     id: 'programming',
//     name: 'Programming',
//     description: 'Learn programming fundamentals with Python, Java, C++, and data structures',
//     icon: '💻',
//     color: 'from-purple-500 to-pink-500',
//     gradient: 'from-purple-500/20 to-pink-500/20',
//     stats: { quizzes: 32, students: 2100, avgRating: 4.7 }
//   },
//   'database': {
//     id: 'database',
//     name: 'Database',
//     description: 'Master SQL, MongoDB, Prisma, and database design patterns',
//     icon: '🗄️',
//     color: 'from-emerald-500 to-green-500',
//     gradient: 'from-emerald-500/20 to-green-500/20',
//     stats: { quizzes: 18, students: 980, avgRating: 4.9 }
//   },
//   'aptitude': {
//     id: 'aptitude',
//     name: 'Aptitude',
//     description: 'Sharpen your problem-solving with mathematics and logical reasoning',
//     icon: '🧠',
//     color: 'from-orange-500 to-red-500',
//     gradient: 'from-orange-500/20 to-red-500/20',
//     stats: { quizzes: 45, students: 3200, avgRating: 4.6 }
//   },
//   'general': {
//     id: 'general',
//     name: 'General Knowledge',
//     description: 'Expand your horizons with science, history, geography, and current affairs',
//     icon: '📚',
//     color: 'from-yellow-500 to-amber-500',
//     gradient: 'from-yellow-500/20 to-amber-500/20',
//     stats: { quizzes: 56, students: 4100, avgRating: 4.5 }
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
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

//   const category = categoryMap[slug] || {
//     id: slug,
//     name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
//     description: 'Explore quizzes in this category',
//     icon: '📋',
//     color: 'from-gray-500 to-gray-600',
//     gradient: 'from-gray-500/20 to-gray-600/20',
//     stats: { quizzes: 0, students: 0, avgRating: 0 }
//   };

//   useEffect(() => {
//     fetchQuizzes();
//   }, [slug, sortBy, page]);

//   const fetchQuizzes = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/public/quizzes?category=${slug}&sort=${sortBy}&page=${page}&limit=9`);
//       const data = await res.json();
      
//       if (data.success) {
//         // Add mock metadata for demo
//         const quizzesWithMeta = data.data.map((q: Quiz) => ({
//           ...q,
//           difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any,
//           rating: (Math.random() * 2 + 3).toFixed(1),
//           attempts: Math.floor(Math.random() * 150)
//         }));

//         if (page === 1) {
//           setQuizzes(quizzesWithMeta);
//         } else {
//           setQuizzes(prev => [...prev, ...quizzesWithMeta]);
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
//     router.push(`/quiz/${quizId}`);
//   };

//   const loadMore = () => {
//     setPage(prev => prev + 1);
//   };

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

//   if (loading && page === 1) {
//     return (
//       <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif]">
//         <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        
//         <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
//           {/* Back Button Skeleton */}
//           <div className="w-20 h-8 bg-white/[0.02] rounded animate-pulse mb-8"></div>

//           {/* Category Header Skeleton */}
//           <div className="flex items-center gap-6 mb-12">
//             <div className="w-20 h-20 bg-white/[0.02] rounded-2xl animate-pulse"></div>
//             <div className="flex-1">
//               <div className="w-48 h-8 bg-white/[0.02] rounded animate-pulse mb-2"></div>
//               <div className="w-96 h-4 bg-white/[0.02] rounded animate-pulse"></div>
//             </div>
//           </div>

//           {/* Stats Skeleton */}
//           <div className="grid grid-cols-3 gap-4 mb-12">
//             {[1,2,3].map(i => (
//               <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
//                 <div className="w-16 h-4 bg-white/[0.02] rounded mb-2"></div>
//                 <div className="w-24 h-6 bg-white/[0.02] rounded"></div>
//               </div>
//             ))}
//           </div>

//           {/* Filters Skeleton */}
//           <div className="flex items-center gap-3 mb-8">
//             {[1,2,3].map(i => (
//               <div key={i} className="w-24 h-8 bg-white/[0.02] rounded-full animate-pulse"></div>
//             ))}
//           </div>

//           {/* Grid Skeleton */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1,2,3,4,5,6].map(i => (
//               <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
//                 <div className="w-full h-32 bg-white/[0.02] rounded-xl mb-4"></div>
//                 <div className="w-3/4 h-5 bg-white/[0.02] rounded mb-2"></div>
//                 <div className="w-full h-4 bg-white/[0.02] rounded mb-4"></div>
//                 <div className="flex justify-between">
//                   <div className="w-16 h-4 bg-white/[0.02] rounded"></div>
//                   <div className="w-16 h-4 bg-white/[0.02] rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif] selection:bg-indigo-500/20 selection:text-white">
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
//         {/* Back Button */}
//         <motion.button
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors mb-6 group"
//         >
//           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//           <span className="text-sm">back to explore</span>
//         </motion.button>

//         {/* Category Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative mb-12"
//         >
//           <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-3xl blur-3xl`}></div>
          
//           <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 overflow-hidden">
//             <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
//               <div className={`w-full h-full bg-gradient-to-br ${category.color} rounded-full filter blur-3xl`}></div>
//             </div>
            
//             <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
//               <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl shadow-2xl`}>
//                 {category.icon}
//               </div>
              
//               <div className="flex-1">
//                 <h1 className="text-3xl font-light text-white mb-2">{category.name}</h1>
//                 <p className="text-white/40 text-sm max-w-2xl">{category.description}</p>
//               </div>

//               {/* Category Stats */}
//               <div className="flex gap-4">
//                 <div className="text-right">
//                   <p className="text-xs text-white/20">quizzes</p>
//                   <p className="text-xl font-light text-white">{category.stats.quizzes}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-white/20">students</p>
//                   <p className="text-xl font-light text-white">{category.stats.students}+</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-white/20">rating</p>
//                   <p className="text-xl font-light text-white flex items-center gap-1">
//                     {category.stats.avgRating}
//                     <Star className="w-4 h-4 text-yellow-400/60 fill-yellow-400/60" />
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Filters Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="flex flex-wrap items-center justify-between gap-4 mb-8"
//         >
//           <div className="flex items-center gap-2">
//             <Filter className="w-4 h-4 text-white/20" />
//             <span className="text-xs text-white/20">sort by:</span>
//             <div className="flex gap-1">
//               {[
//                 { value: 'popular', label: 'most popular' },
//                 { value: 'newest', label: 'newest' },
//                 { value: 'highest', label: 'highest rated' }
//               ].map((option) => (
//                 <motion.button
//                   key={option.value}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     setSortBy(option.value as any);
//                     setPage(1);
//                   }}
//                   className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
//                     sortBy === option.value
//                       ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                       : 'bg-white/[0.02] text-white/30 hover:text-white/50 border border-white/[0.05]'
//                   }`}
//                 >
//                   {option.label}
//                 </motion.button>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <span className="text-xs text-white/20">{quizzes.length} quizzes</span>
            
//             {/* View Toggle */}
//             <div className="flex items-center gap-1 border-l border-white/[0.05] pl-3">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-1.5 rounded transition-all ${
//                   viewMode === 'grid' 
//                     ? 'bg-white/[0.05] text-white' 
//                     : 'text-white/20 hover:text-white/40'
//                 }`}
//               >
//                 <Grid className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-1.5 rounded transition-all ${
//                   viewMode === 'list' 
//                     ? 'bg-white/[0.05] text-white' 
//                     : 'text-white/20 hover:text-white/40'
//                 }`}
//               >
//                 <ChevronDown className="w-4 h-4 rotate-90" />
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Quizzes Grid/List */}
//         {quizzes.length > 0 ? (
//           <>
//             {viewMode === 'grid' ? (
//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {quizzes.map((quiz) => (
//                   <motion.div
//                     key={quiz._id}
//                     variants={itemVariants}
//                     whileHover={{ y: -4 }}
//                     onClick={() => handleStartQuiz(quiz._id)}
//                     className="group bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-white/10 transition-all cursor-pointer"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10 flex items-center justify-center`}>
//                         <BookOpen className={`w-6 h-6 text-${category.color.split('-')[1]}-400`} />
//                       </div>
//                       {quiz.difficulty && (
//                         <span className={`text-[10px] px-2 py-1 rounded-full border ${
//                           quiz.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
//                           quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
//                           'bg-red-500/10 text-red-400 border-red-500/30'
//                         }`}>
//                           {quiz.difficulty}
//                         </span>
//                       )}
//                     </div>

//                     <h3 className="text-lg font-medium text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">
//                       {quiz.title}
//                     </h3>
//                     <p className="text-sm text-white/30 mb-4 line-clamp-2">{quiz.description}</p>

//                     <div className="flex items-center gap-3 text-xs text-white/20 mb-4">
//                       <span className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" /> {quiz.duration} min
//                       </span>
//                       <span>·</span>
//                       <span>{quiz.questions?.length || 0} questions</span>
//                     </div>

//                     <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
//                       <div className="flex items-center gap-3 text-xs">
//                         <span className="flex items-center gap-1">
//                           <Users className="w-3 h-3 text-white/20" />
//                           <span className="text-white/30">{quiz.attempts || 0}</span>
//                         </span>
//                         {quiz.rating && (
//                           <span className="flex items-center gap-1">
//                             <Star className="w-3 h-3 text-yellow-400/40" />
//                             <span className="text-white/30">{quiz.rating}</span>
//                           </span>
//                         )}
//                       </div>
//                       <PlayCircle className="w-5 h-5 text-white/20 group-hover:text-indigo-400 transition-colors" />
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             ) : (
//               // List View
//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="space-y-3"
//               >
//                 {quizzes.map((quiz) => (
//                   <motion.div
//                     key={quiz._id}
//                     variants={itemVariants}
//                     whileHover={{ x: 4 }}
//                     onClick={() => handleStartQuiz(quiz._id)}
//                     className="group bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 hover:border-white/10 transition-all cursor-pointer"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-1">
//                           <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-10 flex items-center justify-center`}>
//                             <BookOpen className={`w-4 h-4 text-${category.color.split('-')[1]}-400`} />
//                           </div>
//                           <h3 className="text-base font-medium text-white group-hover:text-indigo-400 transition-colors">
//                             {quiz.title}
//                           </h3>
//                           {quiz.difficulty && (
//                             <span className={`text-[10px] px-2 py-0.5 rounded-full ${
//                               quiz.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400' :
//                               quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
//                               'bg-red-500/10 text-red-400'
//                             }`}>
//                               {quiz.difficulty}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-sm text-white/30 mb-2">{quiz.description}</p>
//                         <div className="flex items-center gap-4 text-xs text-white/20">
//                           <span className="flex items-center gap-1">
//                             <Clock className="w-3 h-3" /> {quiz.duration} min
//                           </span>
//                           <span>·</span>
//                           <span>{quiz.questions?.length || 0} questions</span>
//                           <span>·</span>
//                           <span className="flex items-center gap-1">
//                             <Users className="w-3 h-3" /> {quiz.attempts || 0} attempts
//                           </span>
//                           {quiz.rating && (
//                             <>
//                               <span>·</span>
//                               <span className="flex items-center gap-1">
//                                 <Star className="w-3 h-3 text-yellow-400/40" /> {quiz.rating}
//                               </span>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                       <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-indigo-400 transition-colors" />
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}

//             {/* Load More */}
//             {hasMore && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className="text-center mt-8"
//               >
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={loadMore}
//                   className="px-6 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/30 hover:text-white/50 transition-all text-sm"
//                 >
//                   load more quizzes
//                 </motion.button>
//               </motion.div>
//             )}
//           </>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl"
//           >
//             <div className="w-20 h-20 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-10 h-10 text-white/20" />
//             </div>
//             <p className="text-white/40 text-sm mb-2">no quizzes found</p>
//             <p className="text-white/20 text-xs">check back later for new content</p>
//           </motion.div>
//         )}
//       </div>

//       <style jsx>{`
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
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
    color: 'from-emerald-500 to-teal-500',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    stats: { quizzes: 24, students: 1250, avgRating: 4.8 }
  },
  'programming': {
    id: 'programming',
    name: 'Programming',
    description: 'Learn programming fundamentals with Python, Java, C++, and data structures',
    icon: '💻',
    color: 'from-emerald-500 to-teal-500',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    stats: { quizzes: 32, students: 2100, avgRating: 4.7 }
  },
  'database': {
    id: 'database',
    name: 'Database',
    description: 'Master SQL, MongoDB, Prisma, and database design patterns',
    icon: '🗄️',
    color: 'from-emerald-500 to-teal-500',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    stats: { quizzes: 18, students: 980, avgRating: 4.9 }
  },
  'aptitude': {
    id: 'aptitude',
    name: 'Aptitude',
    description: 'Sharpen your problem-solving with mathematics and logical reasoning',
    icon: '🧠',
    color: 'from-emerald-500 to-teal-500',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    stats: { quizzes: 45, students: 3200, avgRating: 4.6 }
  },
  'general': {
    id: 'general',
    name: 'General Knowledge',
    description: 'Expand your horizons with science, history, geography, and current affairs',
    icon: '📚',
    color: 'from-emerald-500 to-teal-500',
    gradient: 'from-emerald-500/20 to-teal-500/20',
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
      <div className="min-h-screen bg-[#070709] font-['Inter',sans-serif]">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]"></div>
        
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
    <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      {/* Premium Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(16,185,129,0.1),transparent)]"></div>
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
          className="flex items-center gap-2 transition-colors mb-6 group"
          style={{ color: T.textMuted }}
          whileHover={{ color: '#fff' }}
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
          
          <div className="relative rounded-3xl p-8 overflow-hidden border" style={{ background: T.bgCard, borderColor: T.border }}>
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <div className={`w-full h-full bg-gradient-to-br ${category.color} rounded-full filter blur-3xl`}></div>
            </div>
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl shadow-2xl`}>
                {category.icon}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{category.name}</h1>
                <p className="text-sm max-w-2xl" style={{ color: T.textMuted }}>{category.description}</p>
              </div>

              {/* Category Stats */}
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-xs" style={{ color: T.textDim }}>quizzes</p>
                  <p className="text-xl font-light text-white">{category.stats.quizzes}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: T.textDim }}>students</p>
                  <p className="text-xl font-light text-white">{category.stats.students}+</p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: T.textDim }}>rating</p>
                  <p className="text-xl font-light text-white flex items-center gap-1">
                    {category.stats.avgRating}
                    <Star className="w-4 h-4" style={{ color: `${T.accentLight}80` }} />
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
            <Filter className="w-4 h-4" style={{ color: T.textDim }} />
            <span className="text-xs" style={{ color: T.textDim }}>sort by:</span>
            <div className="flex flex-wrap gap-1">
              {[
                { value: 'popular', label: 'most popular' },
                { value: 'newest', label: 'newest' },
                { value: 'highest', label: 'highest rated' }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSortBy(option.value as any);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    sortBy === option.value
                      ? 'text-white border'
                      : 'text-white/30 hover:text-white/50'
                  }`}
                  style={sortBy === option.value ? {
                    background: T.accentBg,
                    borderColor: T.accentBorder,
                    color: T.accentLight
                  } : {
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${T.border}`
                  }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: T.textDim }}>{quizzes.length} quizzes</span>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 border-l pl-3" style={{ borderColor: T.border }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'grid' 
                    ? 'text-white' 
                    : 'text-white/20 hover:text-white/40'
                }`}
                style={viewMode === 'grid' ? { background: T.accentBg } : {}}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'list' 
                    ? 'text-white' 
                    : 'text-white/20 hover:text-white/40'
                }`}
                style={viewMode === 'list' ? { background: T.accentBg } : {}}
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
                    className="group rounded-2xl p-6 transition-all cursor-pointer border"
                    style={{ background: T.bgCard, borderColor: T.border }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${T.accentGlow} 0%, transparent 70%)` }} />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                          <BookOpen className="w-6 h-6" style={{ color: T.accentLight }} />
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

                      <h3 className="text-lg font-semibold text-white mb-2 group-hover transition-colors line-clamp-1">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

                      <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" style={{ color: T.textMuted }} />
                          {quiz.duration} min
                        </span>
                        <span>•</span>
                        <span>{quiz.questions?.length || 0} questions</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: T.border }}>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" style={{ color: T.textMuted }} />
                            <span style={{ color: T.textMuted }}>{quiz.attempts || 0}</span>
                          </span>
                          {quiz.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" style={{ color: `${T.accentLight}80` }} />
                              <span style={{ color: T.textMuted }}>{quiz.rating}</span>
                            </span>
                          )}
                        </div>
                        <PlayCircle className="w-5 h-5 transition-colors" style={{ color: T.textMuted }} />
                      </div>
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
                    className="group rounded-xl p-4 transition-all cursor-pointer border"
                    style={{ background: T.bgCard, borderColor: T.border }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                            <BookOpen className="w-4 h-4" style={{ color: T.accentLight }} />
                          </div>
                          <h3 className="text-base font-semibold text-white group-hover transition-colors">
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
                        <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: T.textDim }}>
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
                                <Star className="w-3 h-3" style={{ color: `${T.accentLight}80` }} /> {quiz.rating}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 transition-colors" style={{ color: T.textMuted }} />
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
                  className="px-6 py-3 rounded-xl text-sm transition-all"
                  style={{ background: T.bgCard, border: `1px solid ${T.border}`, color: T.textMuted }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
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
            className="text-center py-20 rounded-3xl border"
            style={{ background: T.bgCard, borderColor: T.border }}
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: T.bgCard }}>
              <BookOpen className="w-10 h-10" style={{ color: T.textMuted }} />
            </div>
            <p className="text-sm mb-2" style={{ color: T.textMuted }}>no quizzes found</p>
            <p className="text-xs" style={{ color: T.textDim }}>check back later for new content</p>
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