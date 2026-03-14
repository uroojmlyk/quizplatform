



// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ArrowLeft,
//   Edit,
//   Trash2,
//   Clock,
//   Users,
//   BarChart3,
//   Copy,
//   Check,
//   Link2,
//   Settings,
//   Eye,
//   Calendar,
//   Sparkles,
//   ChevronRight,
//   AlertCircle,
//   Award,
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// interface Question {
//   id: string;
//   text: string;
//   options: string[];
//   correctOption: number;
//   marks: number;
// }

// interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: Question[];
//   createdBy: string;
//   createdByName: string;
//   createdAt: string;
//   visibility?: string;
//   assignedTo?: string[];
//   shareableLinks?: {
//     publicId: string;
//     isPublic: boolean;
//     allowAnonymous: boolean;
//     expiresAt?: string;
//     maxAttempts?: number;
//     currentAttempts?: number;
//     createdAt: string;
//   };
// }

// export default function TeacherQuizDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);

//   const [showShareSettings, setShowShareSettings] = useState(false);
//   const [shareUrl, setShareUrl] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [linkSettings, setLinkSettings] = useState({
//     isPublic: false,
//     allowAnonymous: true,
//     expiresAt: '',
//     maxAttempts: '',
//   });

//   useEffect(() => {
//     fetchQuiz();
//   }, [params.id]);

//   const fetchQuiz = async () => {
//     try {
//       const res = await fetch(`/api/quizzes/${params.id}`);
//       const data = await res.json();
//       if (data.success) {
//         setQuiz(data.data);
//         if (data.data.shareableLinks?.publicId) {
//           setShareUrl(`${window.location.origin}/quiz/shared/${data.data.shareableLinks.publicId}`);
//           setLinkSettings({
//             isPublic: data.data.shareableLinks.isPublic || false,
//             allowAnonymous: data.data.shareableLinks.allowAnonymous ?? true,
//             expiresAt: data.data.shareableLinks.expiresAt?.split('T')[0] || '',
//             maxAttempts: data.data.shareableLinks.maxAttempts?.toString() || '',
//           });
//         }
//       } else {
//         showToast.error('Failed to load quiz');
//       }
//     } catch {
//       showToast.error('Error loading quiz');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       const res = await fetch(`/api/quizzes/${params.id}`, { method: 'DELETE' });
//       if (res.ok) {
//         showToast.success('Quiz deleted successfully');
//         router.push('/teacher/dashboard');
//       } else {
//         showToast.error('Failed to delete quiz');
//       }
//     } catch {
//       showToast.error('Error deleting quiz');
//     } finally {
//       setDeleting(false);
//       setDeleteModal(false);
//     }
//   };

//   const generateShareLink = async () => {
//     setGenerating(true);
//     showToast.loading('Generating link...');
//     try {
//       const res = await fetch('/api/quiz/share', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ quizId: params.id, settings: linkSettings }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         // ✅ FIX: window.location.origin use karo - backend localhost return karta tha
//         setShareUrl(`${window.location.origin}/quiz/shared/${data.publicId}`);
//         showToast.success('Link generated!');
//         fetchQuiz();
//       } else {
//         showToast.error(data.error || 'Failed to generate link');
//       }
//     } catch {
//       showToast.error('Network error');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(shareUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//     showToast.success('Copied to clipboard!');
//   };

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-12 h-12 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-5 h-5 text-emerald-400/60 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!quiz) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/[0.05]">
//             <AlertCircle className="w-8 h-8 text-white/20" />
//           </div>
//           <p className="text-white/40 text-sm">Quiz not found</p>
//           <button onClick={() => router.back()} className="mt-4 text-sm text-emerald-400 hover:text-emerald-300">
//             Go back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#070709] text-white" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
//       <Toaster position="top-right" />

//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-emerald-600/6 rounded-full blur-[130px]" />
//         <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-teal-600/5 rounded-full blur-[100px]" />
//         <div
//           className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage:
//               'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
//             backgroundSize: '60px 60px',
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
//         >
//           <div className="flex items-center gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05, x: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 transition-all"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </motion.button>
//             <div>
//               <h1 className="text-xl sm:text-2xl font-light text-white">Quiz Details</h1>
//               <p className="text-xs text-white/30 mt-0.5">Manage and share this quiz</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 ml-10 sm:ml-0">
//             <Link href={`/teacher/edit-quiz/${quiz.id}`}>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm font-medium transition-all cursor-pointer"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit
//               </motion.div>
//             </Link>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setDeleteModal(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium transition-all"
//             >
//               <Trash2 className="w-4 h-4" />
//               Delete
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Quiz Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6"
//         >
//           <div className="flex flex-col sm:flex-row items-start gap-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-white/[0.05]">
//               <Sparkles className="w-5 h-5 text-emerald-400" />
//             </div>
//             <div className="flex-1">
//               <h2 className="text-xl font-light text-white mb-2">{quiz.title}</h2>
//               <p className="text-white/40 text-sm mb-4">{quiz.description}</p>
//               <div className="flex flex-wrap gap-4 text-xs text-white/30">
//                 <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {quiz.duration} min</span>
//                 <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> {quiz.questions.length} questions</span>
//                 <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {quiz.totalMarks} marks</span>
//                 <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(quiz.createdAt)}</span>
//               </div>
//               {quiz.visibility === 'assigned' && quiz.assignedTo && quiz.assignedTo.length > 0 && (
//                 <div className="mt-4 pt-4 border-t border-white/[0.05]">
//                   <p className="text-xs text-white/40 mb-2 flex items-center gap-1">
//                     <Users className="w-3 h-3" /> Assigned to {quiz.assignedTo.length} student(s)
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Shareable Link Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.15 }}
//           className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6"
//         >
//           <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
//             <Link2 className="w-4 h-4 text-emerald-400" />
//             Shareable Link
//           </h3>

//           <div className="space-y-4">
//             <button
//               onClick={() => setShowShareSettings(!showShareSettings)}
//               className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
//             >
//               <Settings className="w-4 h-4" />
//               Link Settings
//               <ChevronRight className={`w-3 h-3 transition-transform ${showShareSettings ? 'rotate-90' : ''}`} />
//             </button>

//             <AnimatePresence>
//               {showShareSettings && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="p-4 bg-white/[0.02] rounded-xl space-y-3 border border-white/[0.05] overflow-hidden"
//                 >
//                   <label className="flex items-center justify-between cursor-pointer group">
//                     <span className="text-xs text-white/40 group-hover:text-white/60">Public link (no login required)</span>
//                     <input
//                       type="checkbox"
//                       checked={linkSettings.isPublic}
//                       onChange={(e) => setLinkSettings({ ...linkSettings, isPublic: e.target.checked })}
//                       className="w-4 h-4 accent-emerald-500"
//                     />
//                   </label>
//                   <label className="flex items-center justify-between cursor-pointer group">
//                     <span className="text-xs text-white/40 group-hover:text-white/60">Allow anonymous submissions</span>
//                     <input
//                       type="checkbox"
//                       checked={linkSettings.allowAnonymous}
//                       onChange={(e) => setLinkSettings({ ...linkSettings, allowAnonymous: e.target.checked })}
//                       className="w-4 h-4 accent-emerald-500"
//                     />
//                   </label>
//                   <div>
//                     <label className="block text-xs text-white/40 mb-1">Expiry date (optional)</label>
//                     <input
//                       type="date"
//                       value={linkSettings.expiresAt}
//                       onChange={(e) => setLinkSettings({ ...linkSettings, expiresAt: e.target.value })}
//                       className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500/50"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs text-white/40 mb-1">Max attempts (optional)</label>
//                     <input
//                       type="number"
//                       value={linkSettings.maxAttempts}
//                       onChange={(e) => setLinkSettings({ ...linkSettings, maxAttempts: e.target.value })}
//                       placeholder="Unlimited"
//                       className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500/50"
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={generateShareLink}
//               disabled={generating}
//               className="w-full sm:w-auto px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 hover:border-emerald-500/40 rounded-xl text-emerald-400 text-sm font-medium transition-all disabled:opacity-50"
//             >
//               {generating ? 'Generating...' : quiz.shareableLinks?.publicId ? 'Regenerate Link' : 'Generate Link'}
//             </motion.button>

//             <AnimatePresence>
//               {shareUrl && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.05]"
//                 >
//                   <p className="text-xs text-white/40 mb-2">Share this link with students:</p>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={shareUrl}
//                       readOnly
//                       className="flex-1 min-w-0 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-sm text-white/60 focus:outline-none truncate"
//                     />
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={copyToClipboard}
//                       className="px-3 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-lg text-emerald-400 transition-all"
//                     >
//                       {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                     </motion.button>
//                   </div>
//                   {quiz.shareableLinks && (
//                     <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/30">
//                       <span className="flex items-center gap-1">
//                         <Eye className="w-3 h-3" /> {quiz.shareableLinks.currentAttempts || 0} attempts
//                       </span>
//                       {quiz.shareableLinks.expiresAt && (
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" /> Expires {formatDate(quiz.shareableLinks.expiresAt)}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>

//         {/* Questions Preview */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6"
//         >
//           <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
//             <BarChart3 className="w-4 h-4 text-emerald-400" />
//             Questions ({quiz.questions.length})
//           </h3>
//           <div className="space-y-4">
//             {quiz.questions.map((q, idx) => (
//               <motion.div
//                 key={q.id || idx}
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.05 }}
//                 className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] hover:border-white/10 transition-all"
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     <span className="w-5 h-5 bg-emerald-500/10 rounded-lg flex items-center justify-center text-[10px] text-emerald-400">
//                       {idx + 1}
//                     </span>
//                     <span className="text-xs text-white/40">Question</span>
//                   </div>
//                   <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
//                     {q.marks} marks
//                   </span>
//                 </div>
//                 <p className="text-sm text-white/80 mb-4">{q.text}</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {q.options.map((opt, optIdx) => (
//                     <div
//                       key={optIdx}
//                       className={`text-xs p-2.5 rounded-lg border ${
//                         q.correctOption === optIdx
//                           ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
//                           : 'bg-white/[0.02] text-white/40 border-white/[0.05]'
//                       }`}
//                     >
//                       <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>
//                       {opt}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Delete Modal */}
//       <AnimatePresence>
//         {deleteModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//             onClick={() => setDeleteModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-[#0f0f12] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
//             >
//               <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <Trash2 className="w-5 h-5 text-red-400" />
//               </div>
//               <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
//               <p className="text-sm text-white/40 text-center mb-6">
//                 "<span className="text-white/60">{quiz.title}</span>" will be permanently deleted.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setDeleteModal(false)}
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
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  Users,
  BarChart3,
  Copy,
  Check,
  Link2,
  Settings,
  Eye,
  Calendar,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Award,
} from 'lucide-react';
import { showToast } from '@/lib/toast';
import { Toaster } from 'react-hot-toast';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: Question[];
  createdBy: string;
  createdByName: string;
  createdAt: string;
  visibility?: string;
  assignedTo?: string[];
  shareableLinks?: {
    publicId: string;
    isPublic: boolean;
    allowAnonymous: boolean;
    expiresAt?: string;
    maxAttempts?: number;
    currentAttempts?: number;
    createdAt: string;
  };
}

export default function TeacherQuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [showShareSettings, setShowShareSettings] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [linkSettings, setLinkSettings] = useState({
    isPublic: false,
    allowAnonymous: true,
    expiresAt: '',
    maxAttempts: '',
  });

  useEffect(() => {
    fetchQuiz();
  }, [params.id]);

  const fetchQuiz = async () => {
    try {
      const res = await fetch(`/api/quizzes/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setQuiz(data.data);
        if (data.data.shareableLinks?.publicId) {
          setShareUrl(`${window.location.origin}/quiz/shared/${data.data.shareableLinks.publicId}`);
          setLinkSettings({
            isPublic: data.data.shareableLinks.isPublic || false,
            allowAnonymous: data.data.shareableLinks.allowAnonymous ?? true,
            expiresAt: data.data.shareableLinks.expiresAt?.split('T')[0] || '',
            maxAttempts: data.data.shareableLinks.maxAttempts?.toString() || '',
          });
        }
      } else {
        showToast.error('Failed to load quiz');
      }
    } catch {
      showToast.error('Error loading quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/quizzes/${params.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast.success('Quiz deleted successfully');
        router.push('/teacher/dashboard');
      } else {
        showToast.error('Failed to delete quiz');
      }
    } catch {
      showToast.error('Error deleting quiz');
    } finally {
      setDeleting(false);
      setDeleteModal(false);
    }
  };

  const generateShareLink = async () => {
    setGenerating(true);
    showToast.loading('Generating link...');
    try {
      const res = await fetch('/api/quiz/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId: params.id, settings: linkSettings }),
      });
      const data = await res.json();
      if (data.success) {
        // ✅ FIX: window.location.origin use karo - backend localhost return karta tha
        setShareUrl(`${window.location.origin}/quiz/shared/${data.publicId}`);
        showToast.success('Link generated!');
        fetchQuiz();
      } else {
        showToast.error(data.error || 'Failed to generate link');
      }
    } catch {
      showToast.error('Network error');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast.success('Copied to clipboard!');
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400/60 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/[0.05]">
            <AlertCircle className="w-8 h-8 text-white/20" />
          </div>
          <p className="text-white/40 text-sm">Quiz not found</p>
          <button onClick={() => router.back()} className="mt-4 text-sm text-emerald-400 hover:text-emerald-300">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
      <Toaster position="top-right" />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-emerald-600/6 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-teal-600/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-xl sm:text-2xl font-light text-white">Quiz Details</h1>
              <p className="text-xs text-white/30 mt-0.5">Manage and share this quiz</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-10 sm:ml-0">
            <Link href={`/teacher/edit-quiz/${quiz.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm font-medium transition-all cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                Edit
              </motion.div>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </motion.button>
          </div>
        </motion.div>

        {/* Quiz Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-white/[0.05]">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-light text-white mb-2">{quiz.title}</h2>
              <p className="text-white/40 text-sm mb-4">{quiz.description}</p>
              <div className="flex flex-wrap gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {quiz.duration} min</span>
                <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> {quiz.questions.length} questions</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {quiz.totalMarks} marks</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(quiz.createdAt)}</span>
              </div>
              {quiz.visibility === 'assigned' && quiz.assignedTo && quiz.assignedTo.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <p className="text-xs text-white/40 mb-2 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Assigned to {quiz.assignedTo.length} student(s)
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Shareable Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6"
        >
          <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-emerald-400" />
            Shareable Link
          </h3>

          <div className="space-y-4">
            <button
              onClick={() => setShowShareSettings(!showShareSettings)}
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Link Settings
              <ChevronRight className={`w-3 h-3 transition-transform ${showShareSettings ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {showShareSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-white/[0.02] rounded-xl space-y-3 border border-white/[0.05] overflow-hidden"
                >
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs text-white/40 group-hover:text-white/60">Public link (no login required)</span>
                    <input
                      type="checkbox"
                      checked={linkSettings.isPublic}
                      onChange={(e) => setLinkSettings({ ...linkSettings, isPublic: e.target.checked })}
                      className="w-4 h-4 accent-emerald-500"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs text-white/40 group-hover:text-white/60">Allow anonymous submissions</span>
                    <input
                      type="checkbox"
                      checked={linkSettings.allowAnonymous}
                      onChange={(e) => setLinkSettings({ ...linkSettings, allowAnonymous: e.target.checked })}
                      className="w-4 h-4 accent-emerald-500"
                    />
                  </label>
                  <div>
                    <label className="block text-xs text-white/40 mb-1">Expiry date (optional)</label>
                    <input
                      type="date"
                      value={linkSettings.expiresAt}
                      onChange={(e) => setLinkSettings({ ...linkSettings, expiresAt: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1">Max attempts (optional)</label>
                    <input
                      type="number"
                      value={linkSettings.maxAttempts}
                      onChange={(e) => setLinkSettings({ ...linkSettings, maxAttempts: e.target.value })}
                      placeholder="Unlimited"
                      className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateShareLink}
              disabled={generating}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 hover:border-emerald-500/40 rounded-xl text-emerald-400 text-sm font-medium transition-all disabled:opacity-50"
            >
              {generating ? 'Generating...' : quiz.shareableLinks?.publicId ? 'Regenerate Link' : 'Generate Link'}
            </motion.button>

            <AnimatePresence>
              {shareUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.05]"
                >
                  <p className="text-xs text-white/40 mb-2">Share this link with students:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 min-w-0 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-sm text-white/60 focus:outline-none truncate"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className="px-3 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-lg text-emerald-400 transition-all"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>
                  {quiz.shareableLinks && (
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {quiz.shareableLinks.currentAttempts || 0} attempts
                      </span>
                      {quiz.shareableLinks.expiresAt && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Expires {formatDate(quiz.shareableLinks.expiresAt)}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Questions Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6"
        >
          <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Questions ({quiz.questions.length})
          </h3>
          <div className="space-y-4">
            {quiz.questions.map((q, idx) => (
              <motion.div
                key={q.id || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-emerald-500/10 rounded-lg flex items-center justify-center text-[10px] text-emerald-400">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-white/40">Question</span>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {q.marks} marks
                  </span>
                </div>
                <p className="text-sm text-white/80 mb-4">{q.text}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`text-xs p-2.5 rounded-lg border ${
                        q.correctOption === optIdx
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-white/[0.02] text-white/40 border-white/[0.05]'
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                      {opt}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f0f12] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
              <p className="text-sm text-white/40 text-center mb-6">
                "<span className="text-white/60">{quiz.title}</span>" will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 text-sm hover:bg-white/[0.08] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 bg-red-500/15 border border-red-500/25 rounded-xl text-red-400 text-sm hover:bg-red-500/25 transition-all disabled:opacity-50 font-medium"
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