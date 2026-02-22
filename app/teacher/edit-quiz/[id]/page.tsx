
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { getQuizById, updateQuiz, deleteQuiz } from '@/lib/mockData';
// import { Save, Trash2, ArrowLeft, PlusCircle } from 'lucide-react';

// export default function EditQuizPage() {
//   const router = useRouter();
//   const params = useParams();
//   const [quiz, setQuiz] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [quizId, setQuizId] = useState<string>('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [questions, setQuestions] = useState<any[]>([]);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const id = params?.id as string;
    
//     if (!id) {
//       alert('Invalid quiz ID');
//       router.push('/teacher/dashboard');
//       return;
//     }

//     setQuizId(id);
    
//     const quizData = getQuizById(id);
    
//     if (!quizData) {
//       alert('Quiz not found!');
//       router.push('/teacher/dashboard');
//       return;
//     }

//     setQuiz(quizData);
//     setTitle(quizData.title || '');
//     setDescription(quizData.description || '');
//     setDuration(quizData.duration || 30);
//     setQuestions(quizData.questions || []);
//     setLoading(false);
//   }, [params?.id, router]);

//   const addQuestion = () => {
//     setQuestions([...questions, { 
//       id: Date.now().toString(),
//       text: '', 
//       options: ['', '', '', ''], 
//       correctOption: 0, 
//       marks: 10 
//     }]);
//   };

//   const removeQuestion = (index: number) => {
//     if (questions.length > 1) {
//       setQuestions(questions.filter((_, i) => i !== index));
//     }
//   };

//   const updateQuestion = (index: number, field: string, value: any) => {
//     const updated = [...questions];
//     updated[index] = { ...updated[index], [field]: value };
//     setQuestions(updated);
//   };

//   const updateOption = (qIndex: number, oIndex: number, value: string) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   const handleSave = () => {
//     if (!quizId) {
//       alert('Quiz ID not found');
//       return;
//     }
    
//     const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
    
//     const updated = updateQuiz(quizId, {
//       title,
//       description,
//       duration,
//       totalMarks,
//       questions
//     });

//     if (updated) {
//       alert('Quiz updated successfully! ✅');
//       router.push('/teacher/dashboard');
//     } else {
//       alert('Failed to update quiz');
//     }
//   };

//   const handleDelete = () => {
//     if (!quizId) {
//       alert('Quiz ID not found');
//       return;
//     }
    
//     const deleted = deleteQuiz(quizId);
    
//     if (deleted) {
//       alert('Quiz deleted successfully! ✅');
//       router.push('/teacher/dashboard');
//     } else {
//       alert('Failed to delete quiz');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading quiz...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!quiz) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">Quiz not found!</p>
//           <button
//             onClick={() => router.push('/teacher/dashboard')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0">
//         <div className="max-w-5xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => router.back()}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <h1 className="text-xl font-semibold text-gray-900">Edit Quiz</h1>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowDeleteConfirm(true)}
//                 className="flex items-center gap-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Delete
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 <Save className="w-4 h-4" />
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="max-w-5xl mx-auto px-4 py-6">
//         <div className="space-y-6">
//           {/* Basic Info */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz Details</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Quiz Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
//                   placeholder="Enter quiz title"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
//                   placeholder="Enter quiz description"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Duration (minutes)
//                 </label>
//                 <input
//                   type="number"
//                   value={duration}
//                   onChange={(e) => setDuration(Number(e.target.value))}
//                   min="1"
//                   className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Questions */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
//               <button
//                 type="button"
//                 onClick={addQuestion}
//                 className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
//               >
//                 <PlusCircle className="w-4 h-4" />
//                 Add Question
//               </button>
//             </div>

//             {questions.length === 0 ? (
//               <p className="text-gray-500 text-center py-4">No questions added yet.</p>
//             ) : (
//               questions.map((q, qIndex) => (
//                 <div key={qIndex} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
//                   <div className="flex justify-between items-center mb-3">
//                     <h3 className="font-medium text-gray-700">Question {qIndex + 1}</h3>
//                     {questions.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeQuestion(qIndex)}
//                         className="text-red-600 hover:text-red-700 p-1"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>

//                   <input
//                     type="text"
//                     value={q.text || ''}
//                     onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 text-gray-900 bg-white"
//                     placeholder="Enter question"
//                     required
//                   />

//                   <div className="grid grid-cols-2 gap-3 mb-3">
//                     {q.options?.map((opt: string, oIndex: number) => (
//                       <input
//                         key={oIndex}
//                         type="text"
//                         value={opt || ''}
//                         onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                         placeholder={`Option ${oIndex + 1}`}
//                         className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
//                         required
//                       />
//                     ))}
//                   </div>

//                   <div className="flex gap-4">
//                     <div>
//                       <label className="block text-xs text-gray-500 mb-1">Correct Answer</label>
//                       <select
//                         value={q.correctOption || 0}
//                         onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                         className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
//                       >
//                         {q.options?.map((_: any, i: number) => (
//                           <option key={i} value={i}>Option {i + 1}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-500 mb-1">Marks</label>
//                       <input
//                         type="number"
//                         value={q.marks || 10}
//                         onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                         min="1"
//                         className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* Total Marks */}
//             {questions.length > 0 && (
//               <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
//                 <div className="bg-gray-100 px-4 py-2 rounded-lg">
//                   <span className="text-sm text-gray-600">Total Marks: </span>
//                   <span className="font-semibold text-gray-900">
//                     {questions.reduce((sum, q) => sum + (q.marks || 0), 0)}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Quiz?</h3>
//             <p className="text-gray-600 mb-4">Are you sure? This action cannot be undone.</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
import { useRouter, useParams } from 'next/navigation';
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
  AlertCircle
} from 'lucide-react';

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [quizId, setQuizId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const id = params?.id as string;
    
    if (!id) {
      alert('Invalid quiz ID');
      router.push('/teacher/dashboard');
      return;
    }

    setQuizId(id);
    fetchQuiz(id);
  }, [params?.id, router]);

  const fetchQuiz = async (id: string) => {
    try {
      const res = await fetch(`/api/quizzes/${id}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert('Quiz not found!');
        router.push('/teacher/dashboard');
        return;
      }

      const quizData = data.data;
      setQuiz(quizData);
      setTitle(quizData.title || '');
      setDescription(quizData.description || '');
      setDuration(quizData.duration || 30);
      setQuestions(quizData.questions || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Error loading quiz');
      router.push('/teacher/dashboard');
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { 
      id: Date.now().toString(),
      text: '', 
      options: ['', '', '', ''], 
      correctOption: 0, 
      marks: 10 
    }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSave = async () => {
    if (!quizId) {
      alert('Quiz ID not found');
      return;
    }

    // Validation
    if (!title.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text.trim()) {
        alert(`Question ${i + 1} is empty`);
        return;
      }
      for (let j = 0; j < questions[i].options.length; j++) {
        if (!questions[i].options[j].trim()) {
          alert(`Option ${j + 1} of Question ${i + 1} is empty`);
          return;
        }
      }
    }
    
    setSaving(true);

    try {
      const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
      
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          duration,
          totalMarks,
          questions
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Quiz updated successfully! ✅');
        router.push('/teacher/dashboard');
      } else {
        alert(data.error || 'Failed to update quiz');
        setSaving(false);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!quizId) {
      alert('Quiz ID not found');
      return;
    }
    
    setDeleting(true);

    try {
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Quiz deleted successfully! ✅');
        router.push('/teacher/dashboard');
      } else {
        alert(data.error || 'Failed to delete quiz');
        setDeleting(false);
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
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

  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">Quiz not found!</p>
          <button
            onClick={() => router.push('/teacher/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo & Back */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-[#1a1a23] rounded-xl transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Edit Quiz
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">Update your quiz questions</p>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-red-400 hover:bg-red-600/20 hover:border-red-500/50 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-5 sm:space-y-6">
          {/* Quiz Details Card */}
          <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-[#2a2a35] bg-[#1a1a23]/50">
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                Quiz Details
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Basic information about your quiz</p>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Quiz Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
                  placeholder="e.g., JavaScript Fundamentals"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base resize-y"
                  placeholder="Describe what this quiz covers..."
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                  className="w-24 sm:w-32 px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </div>

          {/* Questions Card */}
          <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-[#2a2a35] bg-[#1a1a23]/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  Questions
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Add and configure your questions</p>
              </div>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a1a23] hover:bg-green-600/20 border border-[#2a2a35] hover:border-green-500/50 rounded-lg text-gray-400 hover:text-green-400 transition-all text-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Add Question
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {questions.map((q, qIndex) => (
                <div
                  key={q.id || qIndex}
                  className="bg-[#1a1a23] border border-[#2a2a35] rounded-xl p-4 sm:p-5 hover:border-purple-500/50 transition-all"
                >
                  {/* Question Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-medium text-purple-400">{qIndex + 1}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-medium text-white">Question {qIndex + 1}</h3>
                    </div>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#1a1a23] hover:bg-red-600/20 border border-[#2a2a35] hover:border-red-500/50 rounded-lg text-gray-400 hover:text-red-400 transition-all text-xs sm:text-sm w-fit"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="sm:hidden">Remove</span>
                      </button>
                    )}
                  </div>

                  {/* Question Text */}
                  <input
                    type="text"
                    value={q.text || ''}
                    onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 bg-[#111117] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base mb-4"
                    placeholder="Enter your question"
                    required
                  />

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {q.options?.map((opt: string, oIndex: number) => (
                      <div key={oIndex} className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-500 w-5">
                          {String.fromCharCode(65 + oIndex)}.
                        </span>
                        <input
                          type="text"
                          value={opt || ''}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          placeholder={`Option ${oIndex + 1}`}
                          className="flex-1 px-4 py-2 sm:py-2.5 bg-[#111117] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  {/* Correct Answer & Marks */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        Correct Answer
                      </label>
                      <select
                        value={q.correctOption || 0}
                        onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
                        className="w-full px-4 py-2 sm:py-2.5 bg-[#111117] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                      >
                        {q.options?.map((_: any, i: number) => (
                          <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full sm:w-28">
                      <label className="block text-xs text-gray-500 mb-1.5 ml-1">Marks</label>
                      <input
                        type="number"
                        value={q.marks || 10}
                        onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
                        min="1"
                        className="w-full px-4 py-2 sm:py-2.5 bg-[#111117] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Total Marks */}
              {questions.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#2a2a35] flex justify-end">
                  <div className="bg-[#1a1a23] px-4 py-2 rounded-lg">
                    <span className="text-xs sm:text-sm text-gray-400">Total Marks: </span>
                    <span className="font-semibold text-white text-sm sm:text-base ml-2">
                      {totalMarks}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111117] border-t border-[#2a2a35] p-4 sm:hidden">
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-red-400 hover:bg-red-600/20 hover:border-red-500/50 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111117] border border-[#2a2a35] rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Delete Quiz?</h3>
            </div>
            
            <p className="text-sm text-gray-400 mb-4">
              Are you sure you want to delete "{quiz?.title}"? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-300 hover:bg-[#252530] transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-medium hover:from-red-500 hover:to-red-400 transition-all text-sm disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}