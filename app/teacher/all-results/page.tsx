// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { 
//   ArrowLeft,
//   Sparkles,
//   BarChart3,
//   Award,
//   Search,
//   Download,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   TrendingUp,
//   Clock,
//   Users
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

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

// export default function AllResultsPage() {
//   const router = useRouter();
//   const [results, setResults] = useState<Result[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState<'date' | 'percentage' | 'quiz'>('date');
//   const [filterQuiz, setFilterQuiz] = useState<string>('all');
//   const resultsPerPage = 10;

//   useEffect(() => {
//     fetchAllResults();
//   }, []);

//   const fetchAllResults = async () => {
//     try {
//       setLoading(true);
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       const teacherId = user.id || user._id;
      
//       const res = await fetch(`/api/results/teacher/${teacherId}`);
//       const data = await res.json();

//       if (data.success) {
//         setResults(data.data);
//         showToast.success(`Loaded ${data.data.length} results`);
//       } else {
//         showToast.error('Failed to load results');
//       }
//     } catch (error) {
//       showToast.error('Error loading results');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get unique quiz titles for filter
//   const uniqueQuizzes = ['all', ...new Set(results.map(r => r.quizTitle))];

//   // Filter and sort results
//   const filteredResults = results
//     .filter(r => {
//       const matchesSearch = r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            r.quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesQuiz = filterQuiz === 'all' || r.quizTitle === filterQuiz;
//       return matchesSearch && matchesQuiz;
//     })
//     .sort((a, b) => {
//       switch(sortBy) {
//         case 'percentage':
//           return b.percentage - a.percentage;
//         case 'quiz':
//           return a.quizTitle.localeCompare(b.quizTitle);
//         default:
//           return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
//       }
//     });

//   // Pagination
//   const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
//   const paginatedResults = filteredResults.slice(
//     (currentPage - 1) * resultsPerPage,
//     currentPage * resultsPerPage
//   );

//   const getScoreColor = (percentage: number) => {
//     if (percentage >= 80) return 'text-green-400 bg-green-500/10 border-green-500/30';
//     if (percentage >= 60) return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
//     if (percentage >= 40) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
//     return 'text-red-400 bg-red-500/10 border-red-500/30';
//   };

//   const downloadCSV = () => {
//     const csv = [
//       ['Student', 'Quiz', 'Score', 'Total', 'Percentage', 'Date'].join(','),
//       ...filteredResults.map(r => [
//         r.userName,
//         `"${r.quizTitle}"`,
//         r.score,
//         r.totalMarks,
//         `${r.percentage}%`,
//         new Date(r.submittedAt).toLocaleDateString()
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `results-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
      
//       {/* Animated Background */}
//       <div className="fixed inset-0">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16 sm:h-20">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <button
//                   onClick={() => router.back()}
//                   className="p-2 hover:bg-[#1a1a23] rounded-xl transition-colors group"
//                 >
//                   <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white" />
//                 </button>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
//                     <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                       All Results
//                     </h1>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       {filteredResults.length} total submissions
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={downloadCSV}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-gray-300 hover:bg-[#252530] transition-all"
//               >
//                 <Download className="w-4 h-4" />
//                 <span className="hidden sm:inline">Export CSV</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           {/* Filters */}
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5 mb-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search by student or quiz..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
//                 />
//               </div>
              
//               <div className="flex gap-3">
//                 <select
//                   value={filterQuiz}
//                   onChange={(e) => setFilterQuiz(e.target.value)}
//                   className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500"
//                 >
//                   {uniqueQuizzes.map(quiz => (
//                     <option key={quiz} value={quiz}>
//                       {quiz === 'all' ? 'All Quizzes' : quiz}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value as any)}
//                   className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500"
//                 >
//                   <option value="date">Latest First</option>
//                   <option value="percentage">Highest Score</option>
//                   <option value="quiz">Quiz Name</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Results Table */}
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-[#2a2a35] bg-[#1a1a23]/50">
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Student
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Quiz
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Score
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Percentage
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#2a2a35]">
//                   {paginatedResults.map((result) => (
//                     <tr key={result._id} className="hover:bg-[#1a1a23] transition-colors">
//                       <td className="px-4 sm:px-6 py-3">
//                         <div className="flex items-center gap-2">
//                           <div className="w-6 h-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
//                             <span className="text-xs font-medium text-purple-400">
//                               {result.userName.charAt(0)}
//                             </span>
//                           </div>
//                           <span className="text-sm text-white">{result.userName}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3">
//                         <span className="text-sm text-gray-300">{result.quizTitle}</span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3">
//                         <span className="text-sm text-white font-medium">
//                           {result.score}/{result.totalMarks}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(result.percentage)}`}>
//                           {result.percentage}%
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3">
//                         <span className="text-sm text-gray-400">
//                           {new Date(result.submittedAt).toLocaleDateString()}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-[#2a2a35]">
//                 <div className="text-sm text-gray-400">
//                   Showing {(currentPage - 1) * resultsPerPage + 1} to {Math.min(currentPage * resultsPerPage, filteredResults.length)} of {filteredResults.length} results
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="p-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
//                   <span className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white text-sm">
//                     {currentPage} / {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }











'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { 
  ArrowLeft,
  Sparkles,
  BarChart3,
  Award,
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface Result {
  _id: string;
  quizId: string;
  quizTitle: string;
  userName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
}

export default function AllResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'percentage' | 'quiz'>('date');
  const [filterQuiz, setFilterQuiz] = useState<string>('all');
  const resultsPerPage = 10;

  useEffect(() => {
    fetchAllResults();
  }, []);

  const fetchAllResults = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const teacherId = user.id || user._id;
      
      const res = await fetch(`/api/results/teacher/${teacherId}`);
      const data = await res.json();

      if (data.success) {
        setResults(data.data);
        showToast.success(`Loaded ${data.data.length} results`);
      } else {
        showToast.error('Failed to load results');
      }
    } catch (error) {
      showToast.error('Error loading results');
    } finally {
      setLoading(false);
    }
  };

  // Get unique quiz titles for filter
  const uniqueQuizzes = ['all', ...new Set(results.map(r => r.quizTitle))];

  // Filter and sort results
  const filteredResults = results
    .filter(r => {
      const matchesSearch = r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           r.quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesQuiz = filterQuiz === 'all' || r.quizTitle === filterQuiz;
      return matchesSearch && matchesQuiz;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'percentage':
          return b.percentage - a.percentage;
        case 'quiz':
          return a.quizTitle.localeCompare(b.quizTitle);
        default:
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (percentage >= 60) return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    if (percentage >= 40) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const downloadCSV = () => {
    const csv = [
      ['Student', 'Quiz', 'Score', 'Total', 'Percentage', 'Date'].join(','),
      ...filteredResults.map(r => [
        r.userName,
        `"${r.quizTitle}"`,
        r.score,
        r.totalMarks,
        `${r.percentage}%`,
        new Date(r.submittedAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Toaster />
      
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-[#1a1a23] rounded-xl transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white" />
                </button>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      All Results
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {filteredResults.length} total submissions
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-gray-300 hover:bg-[#252530] transition-all"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Filters */}
          <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by student or quiz..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={filterQuiz}
                  onChange={(e) => setFilterQuiz(e.target.value)}
                  className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {uniqueQuizzes.map((quiz, index) => (
                    <option key={`quiz-filter-${index}`} value={quiz}>
                      {quiz === 'all' ? 'All Quizzes' : quiz}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="date">Latest First</option>
                  <option value="percentage">Highest Score</option>
                  <option value="quiz">Quiz Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a35] bg-[#1a1a23]/50">
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Quiz
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a35]">
                  {paginatedResults.map((result, index) => (
                    <tr key={result?._id || `result-row-${index}`} className="hover:bg-[#1a1a23] transition-colors">
                      <td className="px-4 sm:px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium text-purple-400">
                              {result.userName?.charAt(0) || '?'}
                            </span>
                          </div>
                          <span className="text-sm text-white">{result.userName}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3">
                        <span className="text-sm text-gray-300">{result.quizTitle}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3">
                        <span className="text-sm text-white font-medium">
                          {result.score}/{result.totalMarks}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(result.percentage)}`}>
                          {result.percentage}%
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3">
                        <span className="text-sm text-gray-400">
                          {new Date(result.submittedAt).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-[#2a2a35]">
                <div className="text-sm text-gray-400">
                  Showing {(currentPage - 1) * resultsPerPage + 1} to {Math.min(currentPage * resultsPerPage, filteredResults.length)} of {filteredResults.length} results
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white text-sm">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}