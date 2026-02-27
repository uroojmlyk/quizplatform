// 'use client';

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

// export default function QuizzesPage() {
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
//   }, []);

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





'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { 
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Grid3x3,
  LayoutList
} from 'lucide-react';
import { showToast } from '@/lib/toast';
import CategoryFilter from '@/components/quizzes/category-filter';
import SearchBar from '@/components/quizzes/search-bar';
import qs from 'query-string';

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: any[];
  createdByName: string;
  createdAt: string;
}

// Main component that uses search params
function QuizzesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'marks'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 9;

  useEffect(() => {
    fetchQuizzes();
    
    // Get category from URL if present
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch('/api/quizzes');
      const data = await res.json();

      if (data.success) {
        setQuizzes(data.data);
        setFilteredQuizzes(data.data);
      }
    } catch (error) {
      showToast.error('Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort quizzes
  useEffect(() => {
    let filtered = [...quizzes];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(quiz => {
        const title = quiz.title.toLowerCase();
        switch(selectedCategory) {
          case 'programming':
            return title.includes('program') || title.includes('coding') || title.includes('javascript') || title.includes('python');
          case 'mathematics':
            return title.includes('math') || title.includes('algebra') || title.includes('calculus');
          case 'science':
            return title.includes('science') || title.includes('physics') || title.includes('chemistry');
          case 'language':
            return title.includes('english') || title.includes('urdu') || title.includes('language');
          default:
            return true;
        }
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(query) ||
        quiz.description.toLowerCase().includes(query) ||
        quiz.createdByName?.toLowerCase().includes(query)
      );
    }

    // Sort quizzes
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'marks':
          return b.totalMarks - a.totalMarks;
        default:
          return 0;
      }
    });

    setFilteredQuizzes(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [quizzes, selectedCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);
  const paginatedQuizzes = filteredQuizzes.slice(
    (currentPage - 1) * quizzesPerPage,
    currentPage * quizzesPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL
    const url = qs.stringifyUrl({
      url: '/quizzes',
      query: { category: category !== 'all' ? category : undefined }
    });
    router.push(url);
  };

  const handleStartQuiz = (quizId: string) => {
    showToast.loading('Loading quiz...');
    router.push(`/quiz/${quizId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Explore Quizzes</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            
            {/* Sort Options */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Sort By
              </h3>
              <div className="space-y-2">
                {[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'marks', label: 'Highest Marks' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as any)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar onSearch={setSearchQuery} />
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing {paginatedQuizzes.length} of {filteredQuizzes.length} quizzes
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  Clear filter
                  <span className="text-lg">×</span>
                </button>
              )}
            </div>

            {/* Quizzes Grid/List */}
            {paginatedQuizzes.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleStartQuiz(quiz.id)}
                  >
                    <div className="p-5">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">{quiz.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{quiz.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {quiz.duration} min
                        </span>
                        <span>•</span>
                        <span>{quiz.questions?.length || 0} questions</span>
                        <span>•</span>
                        <span>{quiz.totalMarks} marks</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">By {quiz.createdByName}</span>
                        <button className="text-sm text-gray-900 hover:text-gray-700 font-medium">
                          Start Quiz
                          <ChevronRight className="w-4 h-4 inline ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleStartQuiz(quiz.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{quiz.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{quiz.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {quiz.duration} min
                          </span>
                          <span>•</span>
                          <span>{quiz.questions?.length || 0} questions</span>
                          <span>•</span>
                          <span>{quiz.totalMarks} marks</span>
                          <span>•</span>
                          <span>By {quiz.createdByName}</span>
                        </div>
                      </div>
                      <button className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-black transition-colors">
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export with Suspense boundary
export default function QuizzesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <QuizzesContent />
    </Suspense>
  );
}