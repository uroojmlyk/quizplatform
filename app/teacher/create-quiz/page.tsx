

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
//   const [questions, setQuestions] = useState([
//     { text: '', options: ['', '', '', ''], correctOption: 0, marks: 10 }
//   ]);

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

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validation
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
//       const saved = createQuiz(newQuiz);
//       console.log('Saved quiz:', saved);
//       alert('Quiz created successfully! ✅');
//       router.push('/teacher/dashboard');
//     } catch (error) {
//       alert('Error saving quiz. Please try again.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0">
//         <div className="max-w-5xl mx-auto px-4 py-3">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.back()}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-600" />
//             </button>
//             <h1 className="text-xl font-semibold text-gray-900">Create New Quiz</h1>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="max-w-5xl mx-auto px-4 py-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

//             {questions.map((q, qIndex) => (
//               <div key={qIndex} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
//                 {/* Question Header */}
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

//                 {/* Question Text */}
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={q.text}
//                     onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                     placeholder="Enter your question"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>

//                 {/* Options */}
//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                   {q.options.map((opt, oIndex) => (
//                     <div key={oIndex} className="flex items-center gap-2">
//                       <span className="text-sm font-medium text-gray-500 w-6">
//                         {String.fromCharCode(65 + oIndex)}.
//                       </span>
//                       <input
//                         type="text"
//                         value={opt}
//                         onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                         placeholder={`Option ${oIndex + 1}`}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 {/* Correct Answer & Marks */}
//                 <div className="flex gap-4 items-center">
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">Correct Answer</label>
//                     <select
//                       value={q.correctOption}
//                       onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       {q.options.map((_, i) => (
//                         <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">Marks</label>
//                     <input
//                       type="number"
//                       value={q.marks}
//                       onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                       min="1"
//                       className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Total Marks */}
//             <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
//               <div className="bg-gray-100 px-4 py-2 rounded-lg">
//                 <span className="text-sm text-gray-600">Total Marks: </span>
//                 <span className="font-semibold text-gray-900">
//                   {questions.reduce((sum, q) => sum + (q.marks || 0), 0)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <Save className="w-4 h-4" />
//               Save Quiz
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
import { createQuiz } from '@/lib/mockData';
import { PlusCircle, Trash2, Save, ArrowLeft } from 'lucide-react';

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState([
    { text: '', options: ['', '', '', ''], correctOption: 0, marks: 10 }
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

  const handleSubmit = (e: React.FormEvent) => {
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

    try {
      createQuiz(newQuiz);
      alert('Quiz created successfully! ✅');
      router.push('/teacher/dashboard');
    } catch (error) {
      alert('Error saving quiz. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Create New Quiz</h1>
            </div>
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Quiz</span>
                <span className="sm:hidden">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form - Responsive Padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quiz Details</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quiz Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm sm:text-base"
                  placeholder="e.g., JavaScript Basics"
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm sm:text-base resize-y"
                  placeholder="Describe what this quiz covers..."
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
                  className="w-24 sm:w-32 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </div>

          {/* Questions Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Questions</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Add Question</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                {/* Question Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                    Question {qIndex + 1}
                  </h3>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 p-1 text-sm w-fit"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  )}
                </div>

                {/* Question Text */}
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg mb-3 text-gray-900 bg-white text-sm sm:text-base"
                  placeholder="Enter your question"
                  required
                />

                {/* Options Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 w-5">
                        {String.fromCharCode(65 + oIndex)}.
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        placeholder={`Option ${oIndex + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white text-sm"
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Correct Answer & Marks - Responsive */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Correct Answer</label>
                    <select
                      value={q.correctOption}
                      onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white text-sm"
                    >
                      {q.options.map((_: any, i: number) => (
                        <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full sm:w-24">
                    <label className="block text-xs text-gray-500 mb-1">Marks</label>
                    <input
                      type="number"
                      value={q.marks}
                      onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Total Marks - Responsive */}
            {questions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <div className="bg-gray-100 px-3 sm:px-4 py-2 rounded-lg">
                  <span className="text-xs sm:text-sm text-gray-600">Total Marks: </span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {questions.reduce((sum, q) => sum + (q.marks || 0), 0)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Save Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
            >
              <Save className="w-5 h-5" />
              Save Quiz
            </button>
          </div>

          {/* Desktop Save Button */}
          <div className="hidden sm:flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}