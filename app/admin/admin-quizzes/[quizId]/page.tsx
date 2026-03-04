// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   ArrowLeft, 
//   BookOpen, 
//   Clock, 
//   Edit, 
//   Trash2,
//   Users,
//   BarChart3,
//   Calendar,
//   Award,
//   CheckCircle,
//   XCircle
// } from 'lucide-react';

// interface Question {
//   text: string;
//   options: string[];
//   correctAnswer: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   title: string;
//   description: string;
//   createdByName: string;
//   createdBy: string;
//   totalMarks: number;
//   questions: Question[];
//   createdAt: string;
//   attempts: number;
// }

// export default function QuizDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const quizId = params.quizId as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   useEffect(() => {
//     if (quizId) {
//       fetchQuizDetails();
//     }
//   }, [quizId]);

//   const fetchQuizDetails = async () => {
//     try {
//       const res = await fetch(`/api/admin/quizzes/${quizId}`);
//       const data = await res.json();
      
//       if (data.success) {
//         setQuiz(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching quiz:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const res = await fetch(`/api/admin/quizzes/${quizId}`, {
//         method: 'DELETE',
//       });
      
//       if (res.ok) {
//         router.push('/admin/admin-quizzes');
//       }
//     } catch (error) {
//       console.error('Error deleting quiz:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   if (!quiz) {
//     return (
//       <div className="text-center py-12">
//         <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
//         <p className="text-white/40">Quiz not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => router.back()}
//             className="p-2 hover:bg-white/5 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-white/60" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-semibold text-white">{quiz.title}</h1>
//             <p className="text-sm text-white/40 mt-1">{quiz.description}</p>
//           </div>
//         </div>
//         <div className="flex gap-3">
//           <Link
//             href={`/teacher/edit-quiz/${quizId}`}
//             className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 border border-blue-500/20"
//           >
//             <Edit className="w-4 h-4" />
//             Edit Quiz
//           </Link>
//           <button
//             onClick={() => setShowDeleteModal(true)}
//             className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2 border border-red-500/20"
//           >
//             <Trash2 className="w-4 h-4" />
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
//           <div className="flex items-center gap-3 mb-2">
//             <Award className="w-5 h-5 text-purple-400" />
//             <span className="text-sm text-white/60">Total Marks</span>
//           </div>
//           <p className="text-2xl font-semibold text-white">{quiz.totalMarks}</p>
//         </div>

//         <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
//           <div className="flex items-center gap-3 mb-2">
//             <BookOpen className="w-5 h-5 text-blue-400" />
//             <span className="text-sm text-white/60">Questions</span>
//           </div>
//           <p className="text-2xl font-semibold text-white">{quiz.questions.length}</p>
//         </div>

//         <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
//           <div className="flex items-center gap-3 mb-2">
//             <Users className="w-5 h-5 text-green-400" />
//             <span className="text-sm text-white/60">Attempts</span>
//           </div>
//           <p className="text-2xl font-semibold text-white">{quiz.attempts || 0}</p>
//         </div>

//         <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
//           <div className="flex items-center gap-3 mb-2">
//             <Calendar className="w-5 h-5 text-orange-400" />
//             <span className="text-sm text-white/60">Created</span>
//           </div>
//           <p className="text-sm text-white">{new Date(quiz.createdAt).toLocaleDateString()}</p>
//           <p className="text-xs text-white/30 mt-1">by {quiz.createdByName}</p>
//         </div>
//       </div>

//       {/* Questions List */}
//       <div className="bg-[#111117] border border-white/10 rounded-xl overflow-hidden">
//         <div className="p-5 border-b border-white/10">
//           <h2 className="text-base font-medium text-white">Questions</h2>
//         </div>
        
//         <div className="divide-y divide-white/5">
//           {quiz.questions.map((q, index) => (
//             <div key={index} className="p-5 hover:bg-white/5 transition-colors">
//               <div className="flex items-start gap-3">
//                 <div className="w-6 h-6 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <span className="text-xs font-medium text-purple-400">{index + 1}</span>
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm text-white mb-3">{q.text}</p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
//                     {q.options.map((opt, optIndex) => (
//                       <div
//                         key={optIndex}
//                         className={`flex items-center gap-2 p-2 rounded-lg ${
//                           optIndex === q.correctAnswer
//                             ? 'bg-green-500/10 border border-green-500/20'
//                             : 'bg-white/5 border border-white/10'
//                         }`}
//                       >
//                         {optIndex === q.correctAnswer ? (
//                           <CheckCircle className="w-4 h-4 text-green-400" />
//                         ) : (
//                           <XCircle className="w-4 h-4 text-white/20" />
//                         )}
//                         <span className={`text-xs ${
//                           optIndex === q.correctAnswer ? 'text-green-400' : 'text-white/60'
//                         }`}>
//                           {opt}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="text-xs text-white/30">
//                     Marks: {q.marks}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Delete Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
//           <div className="bg-[#111117] border border-white/10 rounded-xl max-w-md w-full p-6">
//             <h3 className="text-lg font-medium text-white mb-4">Delete Quiz</h3>
//             <p className="text-white/40 text-sm mb-6">
//               Are you sure you want to delete "{quiz.title}"? This action cannot be undone.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="flex-1 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
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
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Edit, 
  Trash2,
  Users,
  BarChart3,
  Calendar,
  Award,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  marks: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  createdByName: string;
  createdBy: string;
  duration: number;
  totalMarks: number;
  questions: Question[];
  createdAt: string;
  attempts: number;
}

export default function QuizDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (quizId) {
      fetchQuizDetails();
    }
  }, [quizId]);

  const fetchQuizDetails = async () => {
    try {
      // ✅ Public API use kar rahe hain
      const res = await fetch(`/api/quizzes/${quizId}`);
      const data = await res.json();
      
      if (data.success) {
        setQuiz(data.data);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        router.push('/admin/admin-quizzes');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/40">Quiz not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-white">{quiz.title}</h1>
            <p className="text-sm text-white/40 mt-1">{quiz.description}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/teacher/edit-quiz/${quizId}`}
            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 border border-blue-500/20"
          >
            <Edit className="w-4 h-4" />
            Edit Quiz
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2 border border-red-500/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-white/60">Total Marks</span>
          </div>
          <p className="text-2xl font-semibold text-white">{quiz.totalMarks}</p>
        </div>

        <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-white/60">Questions</span>
          </div>
          <p className="text-2xl font-semibold text-white">{quiz.questions.length}</p>
        </div>

        <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-sm text-white/60">Attempts</span>
          </div>
          <p className="text-2xl font-semibold text-white">{quiz.attempts || 0}</p>
        </div>

        <div className="bg-[#111117] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-white/60">Created</span>
          </div>
          <p className="text-sm text-white">{new Date(quiz.createdAt).toLocaleDateString()}</p>
          <p className="text-xs text-white/30 mt-1">by {quiz.createdByName}</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-[#111117] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="text-base font-medium text-white">Questions</h2>
        </div>
        
        <div className="divide-y divide-white/5">
          {quiz.questions.map((q, index) => (
            <div key={index} className="p-5 hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-purple-400">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white mb-3">{q.text}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIndex) => (
                      <div
                        key={optIndex}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          optIndex === q.correctAnswer
                            ? 'bg-green-500/10 border border-green-500/20'
                            : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        {optIndex === q.correctAnswer ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white/20" />
                        )}
                        <span className={`text-xs ${
                          optIndex === q.correctAnswer ? 'text-green-400' : 'text-white/60'
                        }`}>
                          {opt}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-white/30">
                    Marks: {q.marks}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111117] border border-white/10 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-white mb-4">Delete Quiz</h3>
            <p className="text-white/40 text-sm mb-6">
              Are you sure you want to delete "{quiz.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
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