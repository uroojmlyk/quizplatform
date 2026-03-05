

// 'use client';

// import { Suspense } from 'react';
// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { Toaster } from 'react-hot-toast';
// import { 
//   Clock,
//   Sparkles,
//   ChevronRight,
//   Filter,
//   ArrowUpDown,
//   Grid3x3,
//   LayoutList
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import CategoryFilter from '@/components/quizzes/category-filter';
// import SearchBar from '@/components/quizzes/search-bar';
// import qs from 'query-string';

// interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: any[];
//   createdByName: string;
//   createdAt: string;
// }

// // Main component that uses search params
// function QuizzesContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'marks'>('newest');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [currentPage, setCurrentPage] = useState(1);
//   const quizzesPerPage = 9;

//   useEffect(() => {
//     fetchQuizzes();
    
//     // Get category from URL if present
//     const category = searchParams.get('category');
//     if (category) {
//       setSelectedCategory(category);
//     }
//   }, [searchParams]);

//   const fetchQuizzes = async () => {
//     try {
//       const res = await fetch('/api/quizzes');
//       const data = await res.json();

//       if (data.success) {
//         setQuizzes(data.data);
//         setFilteredQuizzes(data.data);
//       }
//     } catch (error) {
//       showToast.error('Failed to load quizzes');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter and sort quizzes
//   useEffect(() => {
//     let filtered = [...quizzes];

//     // Filter by category
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(quiz => {
//         const title = quiz.title.toLowerCase();
//         switch(selectedCategory) {
//           case 'programming':
//             return title.includes('program') || title.includes('coding') || title.includes('javascript') || title.includes('python');
//           case 'mathematics':
//             return title.includes('math') || title.includes('algebra') || title.includes('calculus');
//           case 'science':
//             return title.includes('science') || title.includes('physics') || title.includes('chemistry');
//           case 'language':
//             return title.includes('english') || title.includes('urdu') || title.includes('language');
//           default:
//             return true;
//         }
//       });
//     }

//     // Filter by search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(quiz =>
//         quiz.title.toLowerCase().includes(query) ||
//         quiz.description.toLowerCase().includes(query) ||
//         quiz.createdByName?.toLowerCase().includes(query)
//       );
//     }

//     // Sort quizzes
//     filtered.sort((a, b) => {
//       switch(sortBy) {
//         case 'newest':
//           return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//         case 'marks':
//           return b.totalMarks - a.totalMarks;
//         default:
//           return 0;
//       }
//     });

//     setFilteredQuizzes(filtered);
//     setCurrentPage(1); // Reset to first page on filter change
//   }, [quizzes, selectedCategory, searchQuery, sortBy]);

//   // Pagination
//   const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);
//   const paginatedQuizzes = filteredQuizzes.slice(
//     (currentPage - 1) * quizzesPerPage,
//     currentPage * quizzesPerPage
//   );

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     // Update URL
//     const url = qs.stringifyUrl({
//       url: '/quizzes',
//       query: { category: category !== 'all' ? category : undefined }
//     });
//     router.push(url);
//   };

//   const handleStartQuiz = (quizId: string) => {
//     showToast.loading('Loading quiz...');
//     router.push(`/quiz/${quizId}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             <div className="lg:col-span-1">
//               <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
//             </div>
//             <div className="lg:col-span-3">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[1,2,3,4,5,6].map(i => (
//                   <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <Toaster />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-2xl font-semibold text-gray-900">Explore Quizzes</h1>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-lg transition-colors ${
//                 viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <Grid3x3 className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-lg transition-colors ${
//                 viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <LayoutList className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-6">
//             <CategoryFilter
//               selectedCategory={selectedCategory}
//               onCategoryChange={handleCategoryChange}
//             />
            
//             {/* Sort Options */}
//             <div className="bg-white rounded-xl border border-gray-200 p-4">
//               <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
//                 <ArrowUpDown className="w-4 h-4" />
//                 Sort By
//               </h3>
//               <div className="space-y-2">
//                 {[
//                   { value: 'newest', label: 'Newest First' },
//                   { value: 'marks', label: 'Highest Marks' },
//                 ].map(option => (
//                   <button
//                     key={option.value}
//                     onClick={() => setSortBy(option.value as any)}
//                     className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
//                       sortBy === option.value
//                         ? 'bg-gray-900 text-white'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     {option.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Search Bar */}
//             <div className="mb-6">
//               <SearchBar onSearch={setSearchQuery} />
//             </div>

//             {/* Results Count */}
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-sm text-gray-500">
//                 Showing {paginatedQuizzes.length} of {filteredQuizzes.length} quizzes
//               </p>
//               {selectedCategory !== 'all' && (
//                 <button
//                   onClick={() => handleCategoryChange('all')}
//                   className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
//                 >
//                   Clear filter
//                   <span className="text-lg">×</span>
//                 </button>
//               )}
//             </div>

//             {/* Quizzes Grid/List */}
//             {paginatedQuizzes.length === 0 ? (
//               <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
//                 <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
//                 <p className="text-gray-500">Try adjusting your search or filter</p>
//               </div>
//             ) : viewMode === 'grid' ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {paginatedQuizzes.map((quiz) => (
//                   <div
//                     key={quiz.id}
//                     className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//                     onClick={() => handleStartQuiz(quiz.id)}
//                   >
//                     <div className="p-5">
//                       <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">{quiz.title}</h3>
//                       <p className="text-sm text-gray-500 mb-4 line-clamp-2">{quiz.description}</p>
//                       <div className="flex items-center gap-3 text-xs text-gray-400">
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" />
//                           {quiz.duration} min
//                         </span>
//                         <span>•</span>
//                         <span>{quiz.questions?.length || 0} questions</span>
//                         <span>•</span>
//                         <span>{quiz.totalMarks} marks</span>
//                       </div>
//                       <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
//                         <span className="text-xs text-gray-400">By {quiz.createdByName}</span>
//                         <button className="text-sm text-gray-900 hover:text-gray-700 font-medium">
//                           Start Quiz
//                           <ChevronRight className="w-4 h-4 inline ml-1" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {paginatedQuizzes.map((quiz) => (
//                   <div
//                     key={quiz.id}
//                     className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
//                     onClick={() => handleStartQuiz(quiz.id)}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h3 className="font-medium text-gray-900 mb-1">{quiz.title}</h3>
//                         <p className="text-sm text-gray-500 mb-3">{quiz.description}</p>
//                         <div className="flex items-center gap-3 text-xs text-gray-400">
//                           <span className="flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {quiz.duration} min
//                           </span>
//                           <span>•</span>
//                           <span>{quiz.questions?.length || 0} questions</span>
//                           <span>•</span>
//                           <span>{quiz.totalMarks} marks</span>
//                           <span>•</span>
//                           <span>By {quiz.createdByName}</span>
//                         </div>
//                       </div>
//                       <button className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-black transition-colors">
//                         Start
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-3 py-1 text-sm text-gray-600">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main export with Suspense boundary
// export default function QuizzesPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             <div className="lg:col-span-1">
//               <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
//             </div>
//             <div className="lg:col-span-3">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[1,2,3,4,5,6].map(i => (
//                   <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     }>
//       <QuizzesContent />
//     </Suspense>
//   );
// }







'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  ChevronRight,
  BookOpen,
  Sparkles,
  Compass,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Award,
  TrendingUp
} from 'lucide-react';

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
  rating?: number;
}

export default function QuizzesPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // ✅ IMPORTANT: Initialize as empty array, not null or undefined
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch('/api/quizzes');
      const data = await res.json();
      
      if (data.success) {
        // Add mock metadata for demo
        const quizzesWithMeta = data.data.map((q: Quiz) => ({
          ...q,
          difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as any,
          category: ['development', 'design', 'business', 'data science', 'marketing', 'ai/ml'][Math.floor(Math.random() * 6)],
          attempts: Math.floor(Math.random() * 150),
          rating: (Math.random() * 2 + 3).toFixed(1)
        }));
        
        setQuizzes(quizzesWithMeta);
        setFilteredQuizzes(quizzesWithMeta);
        
        // ✅ SAFELY extract categories with fallback
        const uniqueCategories = quizzesWithMeta
          .map((q: Quiz) => q.category)
          .filter((category): category is string => 
            typeof category === 'string' && category.length > 0
          );
        
        // Remove duplicates using Set
        const uniqueSet = new Set(uniqueCategories);
        setCategories(['all', ...Array.from(uniqueSet)]);
      }
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter quizzes
  useEffect(() => {
    let filtered = quizzes;

    if (searchTerm) {
      filtered = filtered.filter(quiz => 
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(quiz => quiz.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(quiz => quiz.difficulty === selectedDifficulty);
    }

    setFilteredQuizzes(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, quizzes]);

  const handleStartQuiz = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  // CategoryFilter Component with Safe Rendering
  const CategoryFilter = () => {
    // ✅ SAFE CHECK: Ensure categories is array before mapping
    if (!Array.isArray(categories)) {
      console.error('Categories is not an array:', categories);
      return null;
    }

    return (
      <div className="flex flex-wrap items-center gap-2">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-white/[0.02] text-white/40 hover:text-white/60 border border-white/[0.05]'
              }`}
            >
              {category === 'all' ? 'all' : category}
            </button>
          ))
        ) : (
          // Fallback UI when no categories
          <span className="text-xs text-white/20 px-4 py-2">no categories available</span>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif]">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="w-48 h-8 bg-white/[0.02] rounded animate-pulse mb-2"></div>
            <div className="w-64 h-4 bg-white/[0.02] rounded animate-pulse"></div>
          </div>

          {/* Search Skeleton */}
          <div className="w-full h-12 bg-white/[0.02] rounded-xl animate-pulse mb-6"></div>

          {/* Filters Skeleton */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-24 h-10 bg-white/[0.02] rounded-full animate-pulse"></div>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-light text-white mb-2">
            explore <span className="font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">quizzes</span>
          </h1>
          <p className="text-white/30 text-sm">discover challenges created by the community</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search quizzes..."
              className="w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 transition-all text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              filters
            </button>

            {/* ✅ SAFE CategoryFilter Component */}
            <CategoryFilter />

            {/* Difficulty filters */}
            <div className="flex flex-wrap items-center gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-xl text-xs transition-all ${
                    selectedDifficulty === difficulty
                      ? difficulty === 'beginner'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : difficulty === 'intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : difficulty === 'advanced'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'bg-white/[0.02] text-white/40 hover:text-white/60 border border-white/[0.05]'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white/[0.05] text-white' 
                    : 'text-white/20 hover:text-white/40'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white/[0.05] text-white' 
                    : 'text-white/20 hover:text-white/40'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchTerm) && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-white/30">active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs text-indigo-400">
                  {selectedCategory}
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs text-indigo-400">
                  {selectedDifficulty}
                </span>
              )}
              {searchTerm && (
                <span className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs text-indigo-400">
                  "{searchTerm}"
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                clear
              </button>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/20 mb-4"
        >
          showing {filteredQuizzes.length} of {quizzes.length} quizzes
        </motion.p>

        {/* Quizzes Grid/List */}
        {filteredQuizzes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl"
          >
            <div className="w-20 h-20 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Compass className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/40 text-sm mb-2">no quizzes found</p>
            <p className="text-white/20 text-xs">try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-xs text-white/40 hover:text-white/60 transition-all"
            >
              clear filters
            </button>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredQuizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -4 }}
                onClick={() => handleStartQuiz(quiz.id)}
                className="group bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        quiz.difficulty === 'beginner' ? 'bg-emerald-400' :
                        quiz.difficulty === 'intermediate' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}></div>
                      <span className="text-xs text-white/40">{quiz.category}</span>
                    </div>
                    {quiz.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400/60 fill-yellow-400/60" />
                        <span className="text-xs text-white/40">{quiz.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-white/30 mb-4 line-clamp-2">{quiz.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-white/20 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {quiz.duration} min
                    </span>
                    <span>·</span>
                    <span>{quiz.questions?.length || 0} questions</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {quiz.attempts}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className="text-xs text-white/20">by {quiz.createdByName}</span>
                    <button className="text-xs text-indigo-400/60 hover:text-indigo-400 transition-colors flex items-center gap-1">
                      start quiz
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // List View
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {filteredQuizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ x: 4 }}
                onClick={() => handleStartQuiz(quiz.id)}
                className="group bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-medium text-white group-hover:text-indigo-400 transition-colors">
                        {quiz.title}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        quiz.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                        quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {quiz.difficulty}
                      </span>
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
                        <Users className="w-3 h-3" /> {quiz.attempts} attempts
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
      </div>

      <style jsx>{`
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