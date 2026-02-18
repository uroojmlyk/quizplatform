


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

//     // ✅ Get quiz ID from params
//     const id = params?.id as string;
    
//     if (!id) {
//       alert('Invalid quiz ID');
//       router.push('/teacher/dashboard');
//       return;
//     }

//     setQuizId(id);
    
//     // ✅ Load quiz data
//     const quizData = getQuizById(id);
    
//     if (!quizData) {
//       alert('Quiz not found!');
//       router.push('/teacher/dashboard');
//       return;
//     }

//     // ✅ Set all data
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
//     // ✅ Check if quizId exists
//     if (!quizId) {
//       alert('Quiz ID not found');
//       return;
//     }
    
//     const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
    
//     // ✅ Update quiz using quizId, not quiz?.id
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
//     // ✅ Check if quizId exists
//     if (!quizId) {
//       alert('Quiz ID not found');
//       return;
//     }
    
//     // ✅ Delete quiz using quizId, not quiz?.id
//     const deleted = deleteQuiz(quizId);
    
//     if (deleted) {
//       alert('Quiz deleted successfully! ✅');
//       router.push('/teacher/dashboard');
//     } else {
//       alert('Failed to delete quiz');
//     }
//   };

//   // ✅ Loading state
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

//   // ✅ If no quiz data
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
//                   className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
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
//                         className="px-3 py-2 border border-gray-300 rounded-lg"
//                         required
//                       />
//                     ))}
//                   </div>

//                   <div className="flex gap-4">
//                     <select
//                       value={q.correctOption || 0}
//                       onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="px-3 py-2 border border-gray-300 rounded-lg"
//                     >
//                       {q.options?.map((_: any, i: number) => (
//                         <option key={i} value={i}>Option {i + 1}</option>
//                       ))}
//                     </select>
//                     <input
//                       type="number"
//                       value={q.marks || 10}
//                       onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                       min="1"
//                       className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
//                       required
//                     />
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
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
import { getQuizById, updateQuiz, deleteQuiz } from '@/lib/mockData';
import { Save, Trash2, ArrowLeft, PlusCircle } from 'lucide-react';

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
    
    const quizData = getQuizById(id);
    
    if (!quizData) {
      alert('Quiz not found!');
      router.push('/teacher/dashboard');
      return;
    }

    setQuiz(quizData);
    setTitle(quizData.title || '');
    setDescription(quizData.description || '');
    setDuration(quizData.duration || 30);
    setQuestions(quizData.questions || []);
    setLoading(false);
  }, [params?.id, router]);

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

  const handleSave = () => {
    if (!quizId) {
      alert('Quiz ID not found');
      return;
    }
    
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
    
    const updated = updateQuiz(quizId, {
      title,
      description,
      duration,
      totalMarks,
      questions
    });

    if (updated) {
      alert('Quiz updated successfully! ✅');
      router.push('/teacher/dashboard');
    } else {
      alert('Failed to update quiz');
    }
  };

  const handleDelete = () => {
    if (!quizId) {
      alert('Quiz ID not found');
      return;
    }
    
    const deleted = deleteQuiz(quizId);
    
    if (deleted) {
      alert('Quiz deleted successfully! ✅');
      router.push('/teacher/dashboard');
    } else {
      alert('Failed to delete quiz');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Quiz not found!</p>
          <button
            onClick={() => router.push('/teacher/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Edit Quiz</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quiz Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="Enter quiz title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="Enter quiz description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Add Question
              </button>
            </div>

            {questions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No questions added yet.</p>
            ) : (
              questions.map((q, qIndex) => (
                <div key={qIndex} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">Question {qIndex + 1}</h3>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={q.text || ''}
                    onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 text-gray-900 bg-white"
                    placeholder="Enter question"
                    required
                  />

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {q.options?.map((opt: string, oIndex: number) => (
                      <input
                        key={oIndex}
                        type="text"
                        value={opt || ''}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        placeholder={`Option ${oIndex + 1}`}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                        required
                      />
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Correct Answer</label>
                      <select
                        value={q.correctOption || 0}
                        onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                      >
                        {q.options?.map((_: any, i: number) => (
                          <option key={i} value={i}>Option {i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Marks</label>
                      <input
                        type="number"
                        value={q.marks || 10}
                        onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
                        min="1"
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Total Marks */}
            {questions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600">Total Marks: </span>
                  <span className="font-semibold text-gray-900">
                    {questions.reduce((sum, q) => sum + (q.marks || 0), 0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Quiz?</h3>
            <p className="text-gray-600 mb-4">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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