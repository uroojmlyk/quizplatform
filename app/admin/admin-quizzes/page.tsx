// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { Search, MoreVertical, Trash2, BookOpen, Eye, Clock } from 'lucide-react';

// // interface Quiz {
// //   _id: string;
// //   title: string;
// //   description: string;
// //   createdByName: string;
// //   totalMarks: number;
// //   questions: any[];
// //   createdAt: string;
// //   attempts: number;
// // }

// // export default function AdminQuizzesPage() {
// //   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);

// //   useEffect(() => {
// //     fetchQuizzes();
// //   }, []);

// //   const fetchQuizzes = async () => {
// //     try {
// //       const res = await fetch('/api/admin/quizzes');
// //       const data = await res.json();
// //       if (data.success) {
// //         setQuizzes(data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching quizzes:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteQuiz = async (quizId: string) => {
// //     try {
// //       const res = await fetch(`/api/admin/quizzes/${quizId}`, {
// //         method: 'DELETE',
// //       });
      
// //       if (res.ok) {
// //         setQuizzes(quizzes.filter(q => q._id !== quizId));
// //         setShowDeleteModal(false);
// //         setSelectedQuiz(null);
// //       }
// //     } catch (error) {
// //       console.error('Error deleting quiz:', error);
// //     }
// //   };

// //   const filteredQuizzes = quizzes.filter(quiz =>
// //     quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     quiz.createdByName?.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       {/* Header */}
// //       <div className="mb-8">
// //         <h1 className="text-2xl font-medium text-white mb-2">Quiz Management</h1>
// //         <p className="text-white/40 text-sm">Monitor and manage all quizzes.</p>
// //       </div>

// //       {/* Search */}
// //       <div className="bg-[#111117] border border-white/10 rounded-xl p-4 mb-6">
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
// //           <input
// //             type="text"
// //             placeholder="Search quizzes by title, description, or creator..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
// //           />
// //         </div>
// //       </div>

// //       {/* Quizzes Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {filteredQuizzes.map((quiz) => (
// //           <div
// //             key={quiz._id}
// //             className="bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors group"
// //           >
// //             {/* Header */}
// //             <div className="flex items-start justify-between mb-4">
// //               <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
// //                 <BookOpen className="w-5 h-5 text-white/40" />
// //               </div>
// //               <button
// //                 onClick={() => {
// //                   setSelectedQuiz(quiz._id);
// //                   setShowDeleteModal(true);
// //                 }}
// //                 className="p-1 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
// //               >
// //                 <Trash2 className="w-4 h-4 text-red-400" />
// //               </button>
// //             </div>

// //             {/* Content */}
// //             <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{quiz.title}</h3>
// //             <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

// //             {/* Meta */}
// //             <div className="space-y-2 mb-4">
// //               <div className="flex items-center gap-2 text-xs text-white/30">
// //                 <span>By {quiz.createdByName || 'Unknown'}</span>
// //               </div>
// //               <div className="flex items-center gap-3 text-xs text-white/30">
// //                 <span className="flex items-center gap-1">
// //                   <Clock className="w-3 h-3" />
// //                   {new Date(quiz.createdAt).toLocaleDateString()}
// //                 </span>
// //                 <span>•</span>
// //                 <span>{quiz.questions?.length || 0} questions</span>
// //                 <span>•</span>
// //                 <span>{quiz.totalMarks} marks</span>
// //               </div>
// //             </div>

// //             {/* Stats */}
// //             <div className="flex items-center justify-between pt-4 border-t border-white/10">
// //               <div className="text-sm text-white/60">
// //                 {quiz.attempts || 0} attempts
// //               </div>
// //               <button className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1">
// //                 <Eye className="w-3 h-3" />
// //                 View
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Empty state */}
// //       {filteredQuizzes.length === 0 && (
// //         <div className="text-center py-12">
// //           <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
// //           <p className="text-white/40">No quizzes found</p>
// //         </div>
// //       )}

// //       {/* Delete Confirmation Modal */}
// //       {showDeleteModal && (
// //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
// //           <div className="bg-[#111117] border border-white/10 rounded-xl max-w-md w-full p-6">
// //             <h3 className="text-lg font-medium text-white mb-4">Delete Quiz</h3>
// //             <p className="text-white/40 text-sm mb-6">
// //               Are you sure you want to delete this quiz? This action cannot be undone.
// //             </p>
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => setShowDeleteModal(false)}
// //                 className="flex-1 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={() => selectedQuiz && handleDeleteQuiz(selectedQuiz)}
// //                 className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Search, Trash2, BookOpen, Eye, Clock, Edit, EyeIcon } from 'lucide-react';

// interface Quiz {
//   _id: string;
//   title: string;
//   description: string;
//   createdByName: string;
//   totalMarks: number;
//   questions: any[];
//   createdAt: string;
//   attempts: number;
// }

// export default function AdminQuizzesPage() {
//   const router = useRouter();
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const res = await fetch('/api/admin/quizzes');
//       const data = await res.json();
//       if (data.success) {
//         setQuizzes(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching quizzes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteQuiz = async (quizId: string) => {
//     try {
//       const res = await fetch(`/api/admin/quizzes/${quizId}`, {
//         method: 'DELETE',
//       });
      
//       if (res.ok) {
//         setQuizzes(quizzes.filter(q => q._id !== quizId));
//         setShowDeleteModal(false);
//         setSelectedQuiz(null);
//       }
//     } catch (error) {
//       console.error('Error deleting quiz:', error);
//     }
//   };

//   // ✅ View Quiz Details
//   const handleViewQuiz = (quizId: string) => {
//     router.push(`/admin/admin-quizzes/${quizId}`);
//   };

//   // ✅ Edit Quiz
//   const handleEditQuiz = (quizId: string) => {
//     router.push(`/teacher/edit-quiz/${quizId}`);
//   };

//   const filteredQuizzes = quizzes.filter(quiz =>
//     quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     quiz.createdByName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-medium text-white mb-2">Quiz Management</h1>
//           <p className="text-white/40 text-sm">Monitor and manage all quizzes.</p>
//         </div>
//         <div className="text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
//           Total: {quizzes.length} quizzes
//         </div>
//       </div>

//       {/* Search */}
//       <div className="bg-[#111117] border border-white/10 rounded-xl p-4 mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
//           <input
//             type="text"
//             placeholder="Search quizzes by title, description, or creator..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
//           />
//         </div>
//       </div>

//       {/* Quizzes Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredQuizzes.map((quiz) => (
//           <div
//             key={quiz._id}
//             className="bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all group cursor-pointer"
//             onClick={() => handleViewQuiz(quiz._id)} // ✅ Pura card clickable
//           >
//             {/* Header */}
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
//                 <BookOpen className="w-5 h-5 text-purple-400" />
//               </div>
//               <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
//                 <button
//                   onClick={() => handleEditQuiz(quiz._id)}
//                   className="p-1.5 hover:bg-blue-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
//                   title="Edit Quiz"
//                 >
//                   <Edit className="w-4 h-4 text-blue-400" />
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedQuiz(quiz._id);
//                     setShowDeleteModal(true);
//                   }}
//                   className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
//                   title="Delete Quiz"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-400" />
//                 </button>
//               </div>
//             </div>

//             {/* Content */}
//             <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{quiz.title}</h3>
//             <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

//             {/* Meta */}
//             <div className="space-y-2 mb-4">
//               <div className="flex items-center gap-2 text-xs text-white/30">
//                 <span>By {quiz.createdByName || 'Unknown'}</span>
//               </div>
//               <div className="flex items-center gap-3 text-xs text-white/30">
//                 <span className="flex items-center gap-1">
//                   <Clock className="w-3 h-3" />
//                   {new Date(quiz.createdAt).toLocaleDateString()}
//                 </span>
//                 <span>•</span>
//                 <span>{quiz.questions?.length || 0} questions</span>
//                 <span>•</span>
//                 <span>{quiz.totalMarks} marks</span>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="flex items-center justify-between pt-4 border-t border-white/10">
//               <div className="text-sm text-white/60">
//                 {quiz.attempts || 0} attempts
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-white/40">Click to view</span>
//                 <EyeIcon className="w-4 h-4 text-white/40" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty state */}
//       {filteredQuizzes.length === 0 && (
//         <div className="text-center py-12 bg-[#111117] rounded-xl border border-white/10">
//           <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
//           <p className="text-white/40">No quizzes found</p>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
//           <div className="bg-[#111117] border border-white/10 rounded-xl max-w-md w-full p-6">
//             <h3 className="text-lg font-medium text-white mb-4">Delete Quiz</h3>
//             <p className="text-white/40 text-sm mb-6">
//               Are you sure you want to delete this quiz? This action cannot be undone.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="flex-1 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => selectedQuiz && handleDeleteQuiz(selectedQuiz)}
//                 className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Trash2, BookOpen, Clock, Edit, Eye, AlertCircle } from 'lucide-react';

interface Quiz {
  _id: string; title: string; description: string;
  createdByName: string; totalMarks: number;
  questions: any[]; createdAt: string; attempts: number;
}

export default function AdminQuizzesPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => { fetchQuizzes(); }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch('/api/admin/quizzes');
      const data = await res.json();
      if (data.success) setQuizzes(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      const res = await fetch(`/api/admin/quizzes/${quizId}`, { method: 'DELETE' });
      if (res.ok) {
        setQuizzes(quizzes.filter(q => q._id !== quizId));
        setShowDeleteModal(false);
        setSelectedQuiz(null);
      }
    } catch (e) { console.error(e); }
  };

  const filteredQuizzes = quizzes.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.createdByName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── shared style tokens ──
  const card = {
    background: 'rgba(255,255,255,0.015)',
    borderColor: 'rgba(52,211,153,0.08)'
  };

  if (loading) return (
    <div className="flex items-center justify-center h-72">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/15 border-t-emerald-400 animate-spin" />
        </div>
        <p className="text-[11px] text-white/20 tracking-widest uppercase">Loading quizzes</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-5 max-w-7xl">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] text-emerald-500/50 uppercase tracking-widest font-semibold mb-1">
            Management
          </p>
          <h1 className="text-xl font-semibold text-white">Quizzes</h1>
          <p className="text-sm text-white/25 mt-0.5">Monitor and manage all platform quizzes</p>
        </div>
        <div
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl border text-xs font-medium text-emerald-400"
          style={{ background: 'rgba(52,211,153,0.06)', borderColor: 'rgba(52,211,153,0.15)' }}
        >
          {quizzes.length} total quizzes
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by title, description, or creator..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white/70 placeholder:text-white/20 outline-none transition-all"
          style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.1)' }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.3)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.1)')}
        />
      </div>

      {/* ── Quiz Grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="group rounded-2xl border p-5 cursor-pointer transition-all duration-200 hover:scale-[1.015]"
            style={card}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.08)')}
            onClick={() => router.push(`/admin/admin-quizzes/${quiz._id}`)}
          >
            {/* card top row */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.12)' }}
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </div>

              {/* action buttons — visible on hover */}
              <div
                className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={e => { e.stopPropagation(); router.push(`/teacher/edit-quiz/${quiz._id}`); }}
                  className="p-1.5 rounded-lg text-white/20 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                  title="Edit Quiz"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setSelectedQuiz(quiz._id); setShowDeleteModal(true); }}
                  className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Delete Quiz"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* title & description */}
            <h3 className="text-sm font-semibold text-white/85 mb-1.5 line-clamp-1">
              {quiz.title}
            </h3>
            <p className="text-xs text-white/30 mb-4 line-clamp-2 leading-relaxed">
              {quiz.description}
            </p>

            {/* meta info */}
            <div className="space-y-1.5 mb-4">
              <p className="text-[11px] text-white/25">
                by <span className="text-white/45">{quiz.createdByName || 'Unknown'}</span>
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/25">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(quiz.createdAt).toLocaleDateString()}
                </span>
                <span>·</span>
                <span>{quiz.questions?.length || 0} questions</span>
                <span>·</span>
                <span>{quiz.totalMarks} marks</span>
              </div>
            </div>

            {/* footer */}
            <div
              className="flex items-center justify-between pt-3.5"
              style={{ borderTop: '1px solid rgba(52,211,153,0.06)' }}
            >
              <span className="text-xs font-medium text-emerald-500/60">
                {quiz.attempts || 0} attempts
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-white/25 group-hover:text-emerald-400/60 transition-colors">
                <Eye className="w-3 h-3" /> View details
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Empty State ── */}
      {filteredQuizzes.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-2xl border"
          style={card}
        >
          <BookOpen className="w-10 h-10 text-white/10 mb-3" />
          <p className="text-sm text-white/25">No quizzes found</p>
          {searchTerm && (
            <p className="text-xs text-white/15 mt-1">
              Try a different search term
            </p>
          )}
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className="w-full max-w-sm rounded-2xl border p-6"
            style={{ background: '#0a0d0b', borderColor: 'rgba(239,68,68,0.15)' }}
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(239,68,68,0.1)' }}
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Delete Quiz</h3>
            <p className="text-sm text-white/35 mb-6">
              This action cannot be undone. The quiz and all related data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setSelectedQuiz(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm text-white/50 hover:text-white border transition-all"
                style={{ borderColor: 'rgba(52,211,153,0.1)' }}
              >
                Cancel
              </button>
              <button
                onClick={() => selectedQuiz && handleDeleteQuiz(selectedQuiz)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-red-400 border transition-all hover:bg-red-500/10"
                style={{ borderColor: 'rgba(239,68,68,0.2)' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}