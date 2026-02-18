


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { getQuizById, updateQuiz, deleteQuiz } from '@/lib/mockData';
// import { Save, Trash2, ArrowLeft, PlusCircle } from 'lucide-react';

// export default function EditQuizPage() {
//   const router = useRouter();
//   const params = useParams();
//   const [quiz, setQuiz] = useState<any>(null);
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

//     const quizData = getQuizById(params.id as string);
//     if (!quizData) {
//       alert('Quiz not found');
//       router.push('/teacher/dashboard');
//       return;
//     }

//     setQuiz(quizData);
//     setTitle(quizData.title);
//     setDescription(quizData.description);
//     setDuration(quizData.duration);
//     setQuestions(quizData.questions);
//   }, [params.id]);

//   const addQuestion = () => {
//     setQuestions([...questions, { text: '', options: ['', '', '', ''], correctOption: 0, marks: 10 }]);
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
//     const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
    
//     updateQuiz(quiz.id, {
//       title,
//       description,
//       duration,
//       totalMarks,
//       questions
//     });

//     alert('Quiz updated successfully!');
//     router.push('/teacher/dashboard');
//   };

//   const handleDelete = () => {
//     deleteQuiz(quiz.id);
//     alert('Quiz deleted successfully!');
//     router.push('/teacher/dashboard');
//   };

//   if (!quiz) return <div>Loading...</div>;

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
//         {/* Same form as create quiz */}
//         <div className="space-y-6">
//           {/* Basic Info */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz Details</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
//                 <input
//                   type="number"
//                   value={duration}
//                   onChange={(e) => setDuration(Number(e.target.value))}
//                   min="1"
//                   className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

//             {questions.map((q, qIndex) => (
//               <div key={qIndex} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-medium text-gray-700">Question {qIndex + 1}</h3>
//                   {questions.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeQuestion(qIndex)}
//                       className="text-red-600 hover:text-red-700 p-1"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   type="text"
//                   value={q.text}
//                   onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
//                   placeholder="Enter question"
//                 />

//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                   {q.options.map((opt: string, oIndex: number) => (
//                     <input
//                       key={oIndex}
//                       type="text"
//                       value={opt}
//                       onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                       placeholder={`Option ${oIndex + 1}`}
//                       className="px-3 py-2 border border-gray-300 rounded-lg"
//                     />
//                   ))}
//                 </div>

//                 <div className="flex gap-4">
//                   <select
//                     value={q.correctOption}
//                     onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                     className="px-3 py-2 border border-gray-300 rounded-lg"
//                   >
//                     {q.options.map((_: any, i: number) => (
//                       <option key={i} value={i}>Option {i + 1}</option>
//                     ))}
//                   </select>
//                   <input
//                     type="number"
//                     value={q.marks}
//                     onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                     min="1"
//                     className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Quiz?</h3>
//             <p className="text-gray-600 mb-4">Are you sure? This cannot be undone.</p>
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
import { useRouter } from 'next/navigation';
import { getQuizzesByTeacher, getTeacherResults } from '@/lib/mockData';
import { PlusCircle, Edit, BarChart, LogOut } from 'lucide-react';

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    
    // Check if user is teacher
    if (userData.role !== 'teacher') {
      router.push('/dashboard');
      return;
    }

    setUser(userData);
    
    try {
      // Load quizzes safely
      const teacherQuizzes = getQuizzesByTeacher(userData.id) || [];
      const teacherResults = getTeacherResults(userData.id) || [];
      
      setQuizzes(teacherQuizzes);
      setResults(teacherResults);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const uniqueStudents = results?.length 
    ? [...new Set(results.map(r => r.userId))].length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Teacher Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.name || 'Teacher'}</span>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">My Quizzes</p>
            <p className="text-2xl font-bold text-gray-900">{quizzes?.length || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-2xl font-bold text-gray-900">{uniqueStudents}</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="text-2xl font-bold text-gray-900">
              {results?.length 
                ? Math.round(results.reduce((acc, r) => acc + (r.percentage || 0), 0) / results.length) 
                : 0}%
            </p>
          </div>
        </div>

        {/* Create Quiz Button */}
        <button
          onClick={() => router.push('/teacher/create-quiz')}
          className="flex items-center gap-2 mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Quiz
        </button>

        {/* My Quizzes */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Quizzes</h2>
        
        {!quizzes?.length ? (
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">You haven't created any quizzes yet.</p>
            <p className="text-sm text-gray-400 mt-2">Click "Create New Quiz" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.map((quiz) => (
              <div key={quiz?.id || Math.random()} className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{quiz?.title || 'Untitled'}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{quiz?.description || ''}</p>
                
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span>{quiz?.duration || 0} mins</span>
                  <span>•</span>
                  <span>{quiz?.questions?.length || 0} questions</span>
                  <span>•</span>
                  <span>{quiz?.totalMarks || 0} marks</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => quiz?.id && router.push(`/teacher/edit-quiz/${quiz.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => quiz?.id && router.push(`/teacher/quiz-results/${quiz.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    <BarChart className="w-4 h-4" />
                    Results
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent Results */}
        {results?.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Recent Results</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {results.slice(0, 5).map((result) => (
                <div key={result?.id || Math.random()} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{result?.quizTitle || 'Quiz'}</p>
                    <p className="text-sm text-gray-500">Student: {result?.userName || 'Unknown'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      (result?.percentage || 0) >= 70 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {result?.percentage || 0}%
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{result?.score || 0}/{result?.totalMarks || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
