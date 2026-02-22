

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createQuiz } from '@/lib/mockData';
// import { PlusCircle, Trash2, Save, ArrowLeft } from 'lucide-react';

// export default function CreateQuizPage() {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
  
//   // ✅ FIXED: ab id bhi hai initial state mein
//   const [questions, setQuestions] = useState([
//     { 
//       id: Date.now().toString(),
//       text: '', 
//       options: ['', '', '', ''], 
//       correctOption: 0, 
//       marks: 10 
//     }
//   ]);

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

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!title.trim()) {
//       alert('Please enter a quiz title');
//       return;
//     }

//     for (let i = 0; i < questions.length; i++) {
//       if (!questions[i].text.trim()) {
//         alert(`Question ${i + 1} is empty`);
//         return;
//       }
//       for (let j = 0; j < questions[i].options.length; j++) {
//         if (!questions[i].options[j].trim()) {
//           alert(`Option ${j + 1} of Question ${i + 1} is empty`);
//           return;
//         }
//       }
//     }

//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
    
//     const newQuiz = {
//       title,
//       description,
//       duration,
//       totalMarks,
//       questions,
//       createdBy: user.id,
//       createdByName: user.name
//     };

//     try {
//       createQuiz(newQuiz);
//       alert('Quiz created successfully! ✅');
//       router.push('/teacher/dashboard');
//     } catch (error) {
//       alert('Error saving quiz. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => router.back()}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Create New Quiz</h1>
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
//             >
//               <Save className="w-4 h-4" />
//               <span className="hidden sm:inline">Save Quiz</span>
//               <span className="sm:hidden">Save</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//           {/* Basic Info */}
//           <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
//             <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quiz Details</h2>
            
//             <div className="space-y-3 sm:space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Quiz Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm sm:text-base"
//                   placeholder="e.g., JavaScript Basics"
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
//                   className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm sm:text-base resize-y"
//                   placeholder="Describe what this quiz covers..."
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
//                   className="w-24 sm:w-32 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm sm:text-base"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Questions */}
//           <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
//               <h2 className="text-base sm:text-lg font-semibold text-gray-900">Questions</h2>
//               <button
//                 type="button"
//                 onClick={addQuestion}
//                 className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
//               >
//                 <PlusCircle className="w-4 h-4" />
//                 Add Question
//               </button>
//             </div>

//             {questions.map((q, qIndex) => (
//               <div key={qIndex} className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
//                   <h3 className="font-medium text-gray-700 text-sm sm:text-base">
//                     Question {qIndex + 1}
//                   </h3>
//                   {questions.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeQuestion(qIndex)}
//                       className="flex items-center gap-1 text-red-600 hover:text-red-700 p-1 text-sm w-fit"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       <span className="sm:hidden">Remove</span>
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   type="text"
//                   value={q.text}
//                   onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                   className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg mb-3 text-gray-900 bg-white text-sm sm:text-base"
//                   placeholder="Enter your question"
//                   required
//                 />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
//                   {q.options.map((opt, oIndex) => (
//                     <div key={oIndex} className="flex items-center gap-2">
//                       <span className="text-sm font-medium text-gray-500 w-5">
//                         {String.fromCharCode(65 + oIndex)}.
//                       </span>
//                       <input
//                         type="text"
//                         value={opt}
//                         onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                         placeholder={`Option ${oIndex + 1}`}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white text-sm"
//                         required
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//                   <div className="flex-1">
//                     <label className="block text-xs text-gray-500 mb-1">Correct Answer</label>
//                     <select
//                       value={q.correctOption}
//                       onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white text-sm"
//                     >
//                       {q.options.map((_, i) => (
//                         <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="w-full sm:w-24">
//                     <label className="block text-xs text-gray-500 mb-1">Marks</label>
//                     <input
//                       type="number"
//                       value={q.marks}
//                       onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                       min="1"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white text-sm"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {questions.length > 0 && (
//               <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
//                 <div className="bg-gray-100 px-3 sm:px-4 py-2 rounded-lg">
//                   <span className="text-xs sm:text-sm text-gray-600">Total Marks: </span>
//                   <span className="font-semibold text-gray-900 text-sm sm:text-base">
//                     {questions.reduce((sum, q) => sum + (q.marks || 0), 0)}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Save Button */}
//           <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
//             <button
//               type="submit"
//               className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
//             >
//               <Save className="w-5 h-5" />
//               Save Quiz
//             </button>
//           </div>

//           {/* Desktop Save Button */}
//           <div className="hidden sm:flex justify-end pt-4">
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
//             >
//               Create Quiz
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }     








'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle, 
  Trash2, 
  Save, 
  ArrowLeft, 
  Sparkles,
  HelpCircle,
  Clock,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  
  const [questions, setQuestions] = useState([
    { 
      id: Date.now().toString(),
      text: '', 
      options: ['', '', '', ''], 
      correctOption: 0, 
      marks: 10 
    }
  ]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
      
      const newQuiz = {
        title,
        description,
        duration,
        totalMarks,
        questions,
        createdBy: user.id,
        createdByName: user.name
      };

      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuiz)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Quiz created successfully! ✅');
        router.push('/teacher/dashboard');
      } else {
        alert(data.error || 'Error saving quiz');
        setLoading(false);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      setLoading(false);
    }
  };

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
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
                      Create New Quiz
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">Design your quiz questions</p>
                  </div>
                </div>
              </div>

              {/* Desktop Save Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="hidden sm:flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Quiz</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Form */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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
                    key={q.id}
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
                      value={q.text}
                      onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-3 bg-[#111117] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base mb-4"
                      placeholder="Enter your question"
                      required
                    />

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-medium text-gray-500 w-5">
                            {String.fromCharCode(65 + oIndex)}.
                          </span>
                          <input
                            type="text"
                            value={opt}
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
                          value={q.correctOption}
                          onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
                          className="w-full px-4 py-2 sm:py-2.5 bg-[#111117] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                        >
                          {q.options.map((_, i) => (
                            <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full sm:w-28">
                        <label className="block text-xs text-gray-500 mb-1.5 ml-1">Marks</label>
                        <input
                          type="number"
                          value={q.marks}
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
          </form>
        </div>

        {/* Mobile Save Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#111117] border-t border-[#2a2a35] p-4 sm:hidden">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving Quiz...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>

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