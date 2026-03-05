
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { 
//   Save, 
//   Trash2, 
//   ArrowLeft, 
//   PlusCircle,
//   Sparkles,
//   HelpCircle,
//   Clock,
//   FileText,
//   CheckCircle,
//   AlertCircle,
//   XCircle,
//   ChevronDown,
//   ChevronUp,
//   Copy,
//   RefreshCw
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface Question {
//   id: string;
//   text: string;
//   options: string[];
//   correctOption: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   id?: string;
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: Question[];
//   createdBy: string;
//   createdByName: string;
//   createdAt: string;
// }

// export default function EditQuizPage() {
//   const router = useRouter();
//   const params = useParams();
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [error, setError] = useState('');
//   const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
//   const [hasChanges, setHasChanges] = useState(false);
//   const [initialDataLoaded, setInitialDataLoaded] = useState(false);

//   // Load quiz data
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const id = params?.id as string;
//     console.log('📥 Quiz ID from params:', id);
    
//     if (!id) {
//       setError('Invalid quiz ID');
//       setLoading(false);
//       return;
//     }

//     fetchQuiz(id);
//   }, [params?.id, router]);

//   const fetchQuiz = async (id: string) => {
//     try {
//       setLoading(true);
//       console.log('📤 Fetching quiz with ID:', id);
      
//       const res = await fetch(`/api/quizzes/${id}`);
//       console.log('📥 Response status:', res.status);
      
//       const data = await res.json();
//       console.log('📥 Quiz data received:', data);

//       if (!res.ok || !data.success) {
//         setError(data.error || 'Quiz not found!');
//         setLoading(false);
//         return;
//       }

//       const quizData = data.data;
//       console.log('✅ Quiz data loaded:', quizData);
      
//       setQuiz(quizData);
//       setTitle(quizData.title || '');
//       setDescription(quizData.description || '');
//       setDuration(quizData.duration || 30);
      
//       const formattedQuestions = (quizData.questions || []).map((q: any, index: number) => ({
//         id: q.id || `q_${Date.now()}_${index}_${Math.random()}`,
//         text: q.text || '',
//         options: q.options || ['', '', '', ''],
//         correctOption: q.correctOption ?? q.correctAnswer ?? 0,
//         marks: q.marks || 10
//       }));
      
//       setQuestions(formattedQuestions);
//       setExpandedQuestions(new Set(formattedQuestions.map((_, i) => i))); // Expand all by default
//       setHasChanges(false);
//       setInitialDataLoaded(true);
//       setLoading(false);
//     } catch (error) {
//       console.error('❌ Error fetching quiz:', error);
//       setError('Error loading quiz');
//       setLoading(false);
//     }
//   };

//   // Toggle question expansion
//   const toggleQuestion = (index: number) => {
//     const newExpanded = new Set(expandedQuestions);
//     if (newExpanded.has(index)) {
//       newExpanded.delete(index);
//     } else {
//       newExpanded.add(index);
//     }
//     setExpandedQuestions(newExpanded);
//   };

//   // Expand/collapse all
//   const toggleAllQuestions = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (expandedQuestions.size === questions.length) {
//       setExpandedQuestions(new Set());
//     } else {
//       setExpandedQuestions(new Set(questions.map((_, i) => i)));
//     }
//   };

//   // Add new question
//   const addQuestion = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     const newQuestion: Question = {
//       id: `q_${Date.now()}_${questions.length}_${Math.random()}`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     };
//     setQuestions([...questions, newQuestion]);
//     setExpandedQuestions(new Set([...expandedQuestions, questions.length]));
//     setHasChanges(true);
//     showToast.success('New question added');
//   };

//   // Duplicate question
//   const duplicateQuestion = (e: React.MouseEvent, index: number) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     const questionToDuplicate = { ...questions[index], id: `q_${Date.now()}_${questions.length}_${Math.random()}` };
//     const newQuestions = [...questions];
//     newQuestions.splice(index + 1, 0, questionToDuplicate);
//     setQuestions(newQuestions);
//     setExpandedQuestions(new Set([...expandedQuestions, index + 1]));
//     setHasChanges(true);
//     showToast.success('Question duplicated');
//   };

//   // Remove question
//   const removeQuestion = (e: React.MouseEvent, index: number) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (questions.length <= 1) {
//       showToast.error('Quiz must have at least one question');
//       return;
//     }
    
//     if (confirm('Are you sure you want to delete this question?')) {
//       const updatedQuestions = questions.filter((_, i) => i !== index);
//       setQuestions(updatedQuestions);
      
//       // Update expanded questions set
//       const newExpanded = new Set(expandedQuestions);
//       newExpanded.delete(index);
//       setExpandedQuestions(newExpanded);
      
//       setHasChanges(true);
//       showToast.success('Question removed');
//     }
//   };

//   // Update question field
//   const updateQuestion = (index: number, field: keyof Question, value: any) => {
//     const updated = [...questions];
//     updated[index] = { ...updated[index], [field]: value };
//     setQuestions(updated);
//     setHasChanges(true);
//   };

//   // Update option
//   const updateOption = (qIndex: number, oIndex: number, value: string) => {
//     const updated = [...questions];
//     if (!updated[qIndex].options) {
//       updated[qIndex].options = ['', '', '', ''];
//     }
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//     setHasChanges(true);
//   };

//   // Move question up
//   const moveQuestionUp = (e: React.MouseEvent, index: number) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (index === 0) return;
//     const updated = [...questions];
//     [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
//     setQuestions(updated);
    
//     // Update expanded questions set
//     const newExpanded = new Set(expandedQuestions);
//     if (newExpanded.has(index)) {
//       newExpanded.delete(index);
//       newExpanded.add(index - 1);
//     }
//     setExpandedQuestions(newExpanded);
    
//     setHasChanges(true);
//   };

//   // Move question down
//   const moveQuestionDown = (e: React.MouseEvent, index: number) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (index === questions.length - 1) return;
//     const updated = [...questions];
//     [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
//     setQuestions(updated);
    
//     // Update expanded questions set
//     const newExpanded = new Set(expandedQuestions);
//     if (newExpanded.has(index)) {
//       newExpanded.delete(index);
//       newExpanded.add(index + 1);
//     }
//     setExpandedQuestions(newExpanded);
    
//     setHasChanges(true);
//   };

//   // Save quiz
//   const handleSave = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     const id = params?.id as string;
    
//     if (!id) {
//       showToast.error('Quiz ID not found');
//       return;
//     }

//     // Validation
//     if (!title.trim()) {
//       showToast.error('Please enter a quiz title');
//       return;
//     }

//     for (let i = 0; i < questions.length; i++) {
//       if (!questions[i].text?.trim()) {
//         showToast.error(`Question ${i + 1} is empty`);
//         return;
//       }
//       for (let j = 0; j < (questions[i].options || []).length; j++) {
//         if (!questions[i].options[j]?.trim()) {
//           showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`);
//           return;
//         }
//       }
//     }
    
//     setSaving(true);

//     try {
//       // Format questions for API
//       const formattedQuestions = questions.map(q => ({
//         text: q.text,
//         options: q.options,
//         correctAnswer: q.correctOption,
//         marks: q.marks
//       }));

//       const totalMarks = formattedQuestions.reduce((sum, q) => sum + (q.marks || 0), 0);
      
//       const payload = {
//         title: title.trim(),
//         description: description.trim(),
//         duration: Number(duration),
//         totalMarks,
//         questions: formattedQuestions
//       };

//       console.log('📤 Saving quiz with payload:', payload);

//       const res = await fetch(`/api/quizzes/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         showToast.success('Quiz updated successfully! 🎉');
//         setHasChanges(false);
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         console.error('❌ Save failed:', data);
//         showToast.error(data.error || 'Failed to update quiz');
//         setSaving(false);
//       }
//     } catch (error) {
//       console.error('❌ Error updating quiz:', error);
//       showToast.error('Network error. Please try again.');
//       setSaving(false);
//     }
//   };

//   // Delete quiz
//   const handleDelete = async () => {
//     const id = params?.id as string;
    
//     if (!id) {
//       showToast.error('Quiz ID not found');
//       return;
//     }
    
//     setDeleting(true);

//     try {
//       const res = await fetch(`/api/quizzes/${id}`, {
//         method: 'DELETE'
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         showToast.success('Quiz deleted successfully! ✅');
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to delete quiz');
//         setDeleting(false);
//         setShowDeleteConfirm(false);
//       }
//     } catch (error) {
//       console.error('❌ Error deleting quiz:', error);
//       showToast.error('Network error. Please try again.');
//       setDeleting(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   // Calculate total marks
//   const totalMarks = questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <Toaster />
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <Toaster />
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
//           <p className="text-red-400 mb-4">{error || 'Quiz not found!'}</p>
//           <button
//             onClick={() => router.push('/teacher/dashboard')}
//             className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all"
//           >
//             Go to Dashboard
//           </button>
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

//       {/* Header */}
//       <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 sm:h-20">
//             {/* Logo & Back */}
//             <div className="flex items-center gap-3 sm:gap-4">
//               <button
//                 onClick={() => {
//                   if (hasChanges) {
//                     if (confirm('You have unsaved changes. Leave anyway?')) {
//                       router.back();
//                     }
//                   } else {
//                     router.back();
//                   }
//                 }}
//                 className="p-2 hover:bg-[#1a1a23] rounded-xl transition-colors group"
//               >
//                 <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white" />
//               </button>
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
//                   <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                     Edit Quiz
//                   </h1>
//                   <p className="text-xs sm:text-sm text-gray-500">
//                     {hasChanges ? '⚠️ Unsaved changes' : 'Update your quiz questions'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Actions */}
//             <div className="hidden sm:flex items-center gap-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(true)}
//                 disabled={deleting}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-red-400 hover:bg-red-600/20 hover:border-red-500/50 transition-all disabled:opacity-50"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 <span>Delete</span>
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={saving || !hasChanges}
//                 className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
//                   hasChanges 
//                     ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-purple-600/25'
//                     : 'bg-gray-600 cursor-not-allowed'
//                 }`}
//               >
//                 {saving ? (
//                   <>
//                     <RefreshCw className="w-4 h-4 animate-spin" />
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>{hasChanges ? 'Save Changes' : 'No Changes'}</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Form */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <div className="space-y-5 sm:space-y-6">
//           {/* Quiz Details Card */}
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//             <div className="p-4 sm:p-6 border-b border-[#2a2a35] bg-[#1a1a23]/50">
//               <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
//                 <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                 Quiz Details
//               </h2>
//               <p className="text-xs sm:text-sm text-gray-400 mt-1">Basic information about your quiz</p>
//             </div>
            
//             <div className="p-4 sm:p-6 space-y-4">
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                   Quiz Title <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => {
//                     setTitle(e.target.value);
//                     setHasChanges(true);
//                   }}
//                   className="w-full px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
//                   placeholder="e.g., JavaScript Fundamentals"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                   Description
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => {
//                     setDescription(e.target.value);
//                     setHasChanges(true);
//                   }}
//                   rows={3}
//                   className="w-full px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base resize-y"
//                   placeholder="Describe what this quiz covers..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                   <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
//                   Duration (minutes)
//                 </label>
//                 <input
//                   type="number"
//                   value={duration}
//                   onChange={(e) => {
//                     setDuration(Number(e.target.value));
//                     setHasChanges(true);
//                   }}
//                   min="1"
//                   className="w-24 sm:w-32 px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Questions Card */}
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//             <div className="p-4 sm:p-6 border-b border-[#2a2a35] bg-[#1a1a23]/50">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                 <div>
//                   <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
//                     <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                     Questions
//                   </h2>
//                   <p className="text-xs sm:text-sm text-gray-400 mt-1">
//                     {questions.length} question{questions.length !== 1 ? 's' : ''} • Total Marks: {totalMarks}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={toggleAllQuestions}
//                     className="flex items-center gap-1 px-3 py-1.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-lg text-gray-400 hover:text-white transition-all text-xs sm:text-sm"
//                   >
//                     {expandedQuestions.size === questions.length ? (
//                       <>Collapse All <ChevronUp className="w-3 h-3" /></>
//                     ) : (
//                       <>Expand All <ChevronDown className="w-3 h-3" /></>
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={addQuestion}
//                     className="flex items-center gap-1 px-3 py-1.5 bg-green-600/10 hover:bg-green-600 border border-green-600/20 hover:border-green-500 rounded-lg text-green-400 hover:text-white transition-all text-xs sm:text-sm"
//                   >
//                     <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" />
//                     Add Question
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//               {questions.map((q, qIndex) => (
//                 <div
//                   key={q.id}
//                   className="bg-[#1a1a23] border border-[#2a2a35] rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
//                 >
//                   {/* Question Header - Always Visible */}
//                   <div 
//                     className="p-4 sm:p-5 bg-[#1a1a23] cursor-pointer hover:bg-[#252530] transition-colors"
//                     onClick={() => toggleQuestion(qIndex)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3 flex-1">
//                         <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
//                           <span className="text-xs sm:text-sm font-medium text-purple-400">{qIndex + 1}</span>
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2">
//                             <h3 className="text-sm sm:text-base font-medium text-white">
//                               {q.text ? (q.text.length > 50 ? q.text.substring(0, 50) + '...' : q.text) : 'New Question'}
//                             </h3>
//                             {!q.text && (
//                               <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-[10px] border border-yellow-500/30">
//                                 Empty
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-xs text-gray-500">
//                             <span>{q.options?.filter(o => o).length || 0}/4 options</span>
//                             <span>•</span>
//                             <span>{q.marks} marks</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <button
//                           onClick={(e) => moveQuestionUp(e, qIndex)}
//                           disabled={qIndex === 0}
//                           className="p-1 hover:bg-[#2a2a35] rounded disabled:opacity-30"
//                         >
//                           <ChevronUp className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={(e) => moveQuestionDown(e, qIndex)}
//                           disabled={qIndex === questions.length - 1}
//                           className="p-1 hover:bg-[#2a2a35] rounded disabled:opacity-30"
//                         >
//                           <ChevronDown className="w-4 h-4" />
//                         </button>
//                         {expandedQuestions.has(qIndex) ? (
//                           <ChevronUp className="w-4 h-4 text-gray-400" />
//                         ) : (
//                           <ChevronDown className="w-4 h-4 text-gray-400" />
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Question Details - Expandable */}
//                   {expandedQuestions.has(qIndex) && (
//                     <div className="p-4 sm:p-5 border-t border-[#2a2a35] bg-[#111117]">
//                       {/* Question Text */}
//                       <div className="mb-4">
//                         <label className="block text-xs text-gray-500 mb-1.5 ml-1">Question Text</label>
//                         <input
//                           type="text"
//                           value={q.text || ''}
//                           onChange={(e) => {
//                             updateQuestion(qIndex, 'text', e.target.value);
//                           }}
//                           onClick={(e) => e.stopPropagation()}
//                           className="w-full px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
//                           placeholder="Enter your question"
//                           required
//                         />
//                       </div>

//                       {/* Options Grid */}
//                       <div className="mb-4">
//                         <label className="block text-xs text-gray-500 mb-1.5 ml-1">Options</label>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                           {q.options?.map((opt: string, oIndex: number) => (
//                             <div key={oIndex} className="flex items-center gap-2">
//                               <span className="text-xs sm:text-sm font-medium text-gray-500 w-5">
//                                 {String.fromCharCode(65 + oIndex)}.
//                               </span>
//                               <input
//                                 type="text"
//                                 value={opt || ''}
//                                 onChange={(e) => {
//                                   updateOption(qIndex, oIndex, e.target.value);
//                                 }}
//                                 onClick={(e) => e.stopPropagation()}
//                                 placeholder={`Option ${oIndex + 1}`}
//                                 className="flex-1 px-4 py-2 sm:py-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
//                                 required
//                               />
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Correct Answer & Marks */}
//                       <div className="flex flex-col sm:flex-row gap-4 mb-4">
//                         <div className="flex-1">
//                           <label className="block text-xs text-gray-500 mb-1.5 ml-1">
//                             <CheckCircle className="w-3 h-3 inline mr-1" />
//                             Correct Answer
//                           </label>
//                           <select
//                             value={q.correctOption || 0}
//                             onChange={(e) => {
//                               updateQuestion(qIndex, 'correctOption', Number(e.target.value));
//                             }}
//                             onClick={(e) => e.stopPropagation()}
//                             className="w-full px-4 py-2 sm:py-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
//                           >
//                             {q.options?.map((_: any, i: number) => (
//                               <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="w-full sm:w-28">
//                           <label className="block text-xs text-gray-500 mb-1.5 ml-1">Marks</label>
//                           <input
//                             type="number"
//                             value={q.marks || 10}
//                             onChange={(e) => {
//                               updateQuestion(qIndex, 'marks', Number(e.target.value));
//                             }}
//                             onClick={(e) => e.stopPropagation()}
//                             min="1"
//                             className="w-full px-4 py-2 sm:py-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Question Actions */}
//                       <div className="flex justify-end gap-2 pt-2 border-t border-[#2a2a35]">
//                         <button
//                           onClick={(e) => duplicateQuestion(e, qIndex)}
//                           className="flex items-center gap-1 px-3 py-1.5 bg-[#1a1a23] hover:bg-blue-600/20 border border-[#2a2a35] hover:border-blue-500/50 rounded-lg text-gray-400 hover:text-blue-400 transition-all text-xs"
//                         >
//                           <Copy className="w-3 h-3" />
//                           Duplicate
//                         </button>
//                         <button
//                           onClick={(e) => removeQuestion(e, qIndex)}
//                           className="flex items-center gap-1 px-3 py-1.5 bg-[#1a1a23] hover:bg-red-600/20 border border-[#2a2a35] hover:border-red-500/50 rounded-lg text-gray-400 hover:text-red-400 transition-all text-xs"
//                         >
//                           <Trash2 className="w-3 h-3" />
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Actions */}
//       <div className="fixed bottom-0 left-0 right-0 bg-[#111117] border-t border-[#2a2a35] p-4 sm:hidden">
//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowDeleteConfirm(true)}
//             disabled={deleting}
//             className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-red-400 hover:bg-red-600/20 hover:border-red-500/50 transition-all disabled:opacity-50"
//           >
//             <Trash2 className="w-5 h-5" />
//             <span>Delete</span>
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving || !hasChanges}
//             className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-medium transition-all disabled:opacity-50 ${
//               hasChanges 
//                 ? 'bg-gradient-to-r from-purple-600 to-blue-600'
//                 : 'bg-gray-600'
//             }`}
//           >
//             {saving ? (
//               <>
//                 <RefreshCw className="w-4 h-4 animate-spin" />
//                 <span>Saving...</span>
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5" />
//                 <span>Save</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl max-w-md w-full p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
//                 <AlertCircle className="w-5 h-5 text-red-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-white">Delete Quiz?</h3>
//             </div>
            
//             <p className="text-sm text-gray-400 mb-4">
//               Are you sure you want to delete "{quiz?.title}"? This action cannot be undone.
//             </p>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="flex-1 px-4 py-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-300 hover:bg-[#252530] transition-all text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={deleting}
//                 className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-medium hover:from-red-500 hover:to-red-400 transition-all text-sm disabled:opacity-50"
//               >
//                 {deleting ? 'Deleting...' : 'Delete'}
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
import { useRouter, useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { 
  Save, 
  Trash2, 
  ArrowLeft, 
  PlusCircle,
  Sparkles,
  HelpCircle,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  RefreshCw
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: Question[];
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [hasChanges, setHasChanges] = useState(false);

  // Load quiz data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const id = params?.id as string;
    console.log('📥 Quiz ID from params:', id);
    
    if (!id) {
      setError('Invalid quiz ID');
      setLoading(false);
      return;
    }

    fetchQuiz(id);
  }, [params?.id, router]);

  const fetchQuiz = async (id: string) => {
    try {
      setLoading(true);
      console.log('📤 Fetching quiz with ID:', id);
      
      const res = await fetch(`/api/quizzes/${id}`);
      console.log('📥 Response status:', res.status);
      
      const data = await res.json();
      console.log('📥 Quiz data received:', data);

      if (!res.ok || !data.success) {
        setError(data.error || 'Quiz not found!');
        setLoading(false);
        return;
      }

      const quizData = data.data;
      console.log('✅ Quiz data loaded:', quizData);
      
      setQuiz(quizData);
      setTitle(quizData.title || '');
      setDescription(quizData.description || '');
      setDuration(quizData.duration || 30);
      
      const formattedQuestions = (quizData.questions || []).map((q: any, index: number) => ({
        id: q.id || `q_${Date.now()}_${index}_${Math.random()}`,
        text: q.text || '',
        options: q.options || ['', '', '', ''],
        correctOption: q.correctOption ?? q.correctAnswer ?? 0,
        marks: q.marks || 10
      }));
      
      setQuestions(formattedQuestions);
      setExpandedQuestions(new Set(formattedQuestions.map((_, i) => i)));
      setHasChanges(false);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching quiz:', error);
      setError('Error loading quiz');
      setLoading(false);
    }
  };

  // Toggle question expansion
  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Expand/collapse all
  const toggleAllQuestions = () => {
    if (expandedQuestions.size === questions.length) {
      setExpandedQuestions(new Set());
    } else {
      setExpandedQuestions(new Set(questions.map((_, i) => i)));
    }
  };

  // Add new question
  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q_${Date.now()}_${questions.length}_${Math.random()}`,
      text: '',
      options: ['', '', '', ''],
      correctOption: 0,
      marks: 10
    };
    setQuestions([...questions, newQuestion]);
    setExpandedQuestions(prev => new Set([...prev, questions.length]));
    setHasChanges(true);
    showToast.success('New question added');
  };

  // Duplicate question
  const duplicateQuestion = (index: number) => {
    const questionToDuplicate = { 
      ...questions[index], 
      id: `q_${Date.now()}_${questions.length}_${Math.random()}` 
    };
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, questionToDuplicate);
    setQuestions(newQuestions);
    setExpandedQuestions(prev => new Set([...prev, index + 1]));
    setHasChanges(true);
    showToast.success('Question duplicated');
  };

  // Remove question
  const removeQuestion = (index: number) => {
    if (questions.length <= 1) {
      showToast.error('Quiz must have at least one question');
      return;
    }
    
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter((_, i) => i !== index));
      setExpandedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      setHasChanges(true);
      showToast.success('Question removed');
    }
  };

  // Update question field
  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setHasChanges(true);
  };

  // Update option
  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions(prev => {
      const updated = [...prev];
      if (!updated[qIndex].options) {
        updated[qIndex].options = ['', '', '', ''];
      }
      updated[qIndex].options[oIndex] = value;
      return updated;
    });
    setHasChanges(true);
  };

  // Move question up
  const moveQuestionUp = (index: number) => {
    if (index === 0) return;
    
    setQuestions(prev => {
      const updated = [...prev];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      return updated;
    });
    
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
        newSet.add(index - 1);
      }
      return newSet;
    });
    
    setHasChanges(true);
  };

  // Move question down
  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    
    setQuestions(prev => {
      const updated = [...prev];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      return updated;
    });
    
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
        newSet.add(index + 1);
      }
      return newSet;
    });
    
    setHasChanges(true);
  };

  // Save quiz
  const handleSave = async () => {
    const id = params?.id as string;
    
    if (!id) {
      showToast.error('Quiz ID not found');
      return;
    }

    if (!title.trim()) {
      showToast.error('Please enter a quiz title');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text?.trim()) {
        showToast.error(`Question ${i + 1} is empty`);
        return;
      }
      for (let j = 0; j < (questions[i].options || []).length; j++) {
        if (!questions[i].options[j]?.trim()) {
          showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`);
          return;
        }
      }
    }
    
    setSaving(true);

    try {
      const formattedQuestions = questions.map(q => ({
        text: q.text,
        options: q.options,
        correctAnswer: q.correctOption,
        marks: q.marks
      }));

      const totalMarks = formattedQuestions.reduce((sum, q) => sum + (q.marks || 0), 0);
      
      const payload = {
        title: title.trim(),
        description: description.trim(),
        duration: Number(duration),
        totalMarks,
        questions: formattedQuestions
      };

      console.log('📤 Saving quiz with payload:', payload);

      const res = await fetch(`/api/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast.success('Quiz updated successfully! 🎉');
        setHasChanges(false);
        setTimeout(() => router.push('/teacher/dashboard'), 1500);
      } else {
        console.error('❌ Save failed:', data);
        showToast.error(data.error || 'Failed to update quiz');
        setSaving(false);
      }
    } catch (error) {
      console.error('❌ Error updating quiz:', error);
      showToast.error('Network error. Please try again.');
      setSaving(false);
    }
  };

  // Delete quiz
  const handleDelete = async () => {
    const id = params?.id as string;
    
    if (!id) {
      showToast.error('Quiz ID not found');
      return;
    }
    
    setDeleting(true);

    try {
      const res = await fetch(`/api/quizzes/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast.success('Quiz deleted successfully! ✅');
        setTimeout(() => router.push('/teacher/dashboard'), 1500);
      } else {
        showToast.error(data.error || 'Failed to delete quiz');
        setDeleting(false);
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      console.error('❌ Error deleting quiz:', error);
      showToast.error('Network error. Please try again.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const totalMarks = questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);

  if (loading) {
    return <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">Loading...</div>;
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Quiz not found!'}</p>
          <button onClick={() => router.push('/teacher/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Toaster />
      
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Edit Quiz</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
            <button 
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Quiz Details */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-lg mb-4">Quiz Details</h2>
          
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setHasChanges(true);
            }}
            placeholder="Quiz Title"
            className="w-full p-2 mb-4 bg-gray-800 rounded"
          />

          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setHasChanges(true);
            }}
            placeholder="Description"
            className="w-full p-2 mb-4 bg-gray-800 rounded"
            rows={3}
          />

          <input
            type="number"
            value={duration}
            onChange={(e) => {
              setDuration(Number(e.target.value));
              setHasChanges(true);
            }}
            min="1"
            className="w-24 p-2 bg-gray-800 rounded"
          />
        </div>

        {/* Questions Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">
            Questions ({questions.length}) - Total Marks: {totalMarks}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={toggleAllQuestions}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              {expandedQuestions.size === questions.length ? 'Collapse All' : 'Expand All'}
            </button>
            <button
              onClick={addQuestion}
              className="px-3 py-1 bg-green-600 rounded"
            >
              Add Question
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-gray-900 rounded-lg overflow-hidden">
              {/* Question Header */}
              <div 
                className="p-4 bg-gray-800 cursor-pointer flex justify-between items-center"
                onClick={() => toggleQuestion(index)}
              >
                <div>
                  <span className="font-bold mr-2">Q{index + 1}:</span>
                  {q.text || 'New Question'}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveQuestionUp(index);
                    }}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-700 rounded disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveQuestionDown(index);
                    }}
                    disabled={index === questions.length - 1}
                    className="p-1 hover:bg-gray-700 rounded disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {expandedQuestions.has(index) ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              {/* Question Details */}
              {expandedQuestions.has(index) && (
                <div className="p-4">
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Question text"
                    className="w-full p-2 mb-4 bg-gray-800 rounded"
                  />

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <span>{String.fromCharCode(65 + optIndex)}.</span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(index, optIndex, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          placeholder={`Option ${optIndex + 1}`}
                          className="flex-1 p-2 bg-gray-800 rounded"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 mb-4">
                    <select
                      value={q.correctOption}
                      onChange={(e) => updateQuestion(index, 'correctOption', Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-gray-800 rounded"
                    >
                      {q.options.map((_, i) => (
                        <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={q.marks}
                      onChange={(e) => updateQuestion(index, 'marks', Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      min="1"
                      className="w-20 p-2 bg-gray-800 rounded"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => duplicateQuestion(index)}
                      className="px-3 py-1 bg-blue-600 rounded"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => removeQuestion(index)}
                      className="px-3 py-1 bg-red-600 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md">
            <h3 className="text-lg mb-4">Delete Quiz?</h3>
            <p className="mb-4">Are you sure you want to delete "{quiz?.title}"?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 rounded"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}