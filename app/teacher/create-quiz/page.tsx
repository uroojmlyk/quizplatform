



// 'use client';

// import { useEffect, useState, useRef } from 'react'; // ✅ useRef import karo
// import { useRouter } from 'next/navigation';
// import { 
//   PlusCircle, 
//   Trash2, 
//   ArrowLeft, 
//   Save,
//   Globe,
//   Users,
//   Lock,
//   ChevronDown,
//   ChevronUp,
//   X
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

// interface Student {
//   _id: string;
//   name: string;
//   email: string;
// }

// export default function CreateQuizPage() {
//   const router = useRouter();
//   const fetchedRef = useRef(false); // ✅ Prevent double fetch
  
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
  
//   // Quiz fields
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [visibility, setVisibility] = useState<'public' | 'private' | 'assigned'>('public');
//   const [assignedStudents, setAssignedStudents] = useState<string[]>([]); // ✅ Empty array
//   const [questions, setQuestions] = useState<Question[]>([
//     {
//       id: `q_${Date.now()}_0`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     }
//   ]);
  
//   // Students list
//   const [students, setStudents] = useState<Student[]>([]);
//   const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
//   const [showStudentSelector, setShowStudentSelector] = useState(false);
//   const [studentSearch, setStudentSearch] = useState('');
//   const [teacherId, setTeacherId] = useState<string>('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (!user.id || user.role !== 'teacher') {
//       router.push('/login');
//       return;
//     }
//     setTeacherId(user.id);
    
//     // ✅ Prevent double fetch in Strict Mode
//     if (!fetchedRef.current) {
//       fetchedRef.current = true;
//       fetchStudents();
//     }
//   }, []);

//   useEffect(() => {
//     if (studentSearch.trim() === '') {
//       setFilteredStudents(students);
//     } else {
//       const filtered = students.filter(s => 
//         s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
//         s.email.toLowerCase().includes(studentSearch.toLowerCase())
//       );
//       setFilteredStudents(filtered);
//     }
//   }, [studentSearch, students]);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch('/api/users?role=student');
//       const data = await res.json();
      
//       // ✅ Debug - check _id format
//       console.log('API Response:', data);
//       console.log('First student _id:', data.data?.[0]?._id);
//       console.log('_id type:', typeof data.data?.[0]?._id);
      
//       if (data.success) {
//         // ✅ Normalize _id if it's an object (MongoDB ObjectId issue)
//         const normalized = data.data.map((s: any) => ({
//           ...s,
//           _id: s._id?.$oid || s._id?.toString() || s._id
//         }));
        
//         setStudents(normalized);
//         setFilteredStudents(normalized);
//       }
//     } catch (error) {
//       showToast.error('Failed to fetch students');
//     }
//   };

//   const addQuestion = () => {
//     const newQuestion: Question = {
//       id: `q_${Date.now()}_${questions.length}`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const removeQuestion = (index: number) => {
//     if (questions.length <= 1) {
//       showToast.error('Quiz must have at least one question');
//       return;
//     }
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const updateQuestion = (index: number, field: keyof Question, value: any) => {
//     const updated = [...questions];
//     updated[index] = { ...updated[index], [field]: value };
//     setQuestions(updated);
//   };

//   const updateOption = (qIndex: number, oIndex: number, value: string) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   // ✅ FIXED: toggleStudent with functional update
//   const toggleStudent = (studentId: string) => {
//     setAssignedStudents(prev => {
//       if (prev.includes(studentId)) {
//         return prev.filter(id => id !== studentId);
//       } else {
//         return [...prev, studentId];
//       }
//     });
//   };

//   // ✅ selectAllStudents
//   const selectAllStudents = () => {
//     const allIds = filteredStudents.map(s => s._id);
//     setAssignedStudents(allIds);
//   };

//   // ✅ clearAllStudents
//   const clearAllStudents = () => {
//     setAssignedStudents([]);
//   };

//   const validateQuiz = () => {
//     if (!title.trim()) {
//       showToast.error('Please enter a quiz title');
//       return false;
//     }

//     for (let i = 0; i < questions.length; i++) {
//       const q = questions[i];
//       if (!q.text.trim()) {
//         showToast.error(`Question ${i + 1} is empty`);
//         return false;
//       }
//       for (let j = 0; j < q.options.length; j++) {
//         if (!q.options[j].trim()) {
//           showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`);
//           return false;
//         }
//       }
//     }

//     if (visibility === 'assigned' && assignedStudents.length === 0) {
//       showToast.error('Please select at least one student');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateQuiz()) return;

//     setSaving(true);
//     const toastId = showToast.loading('Creating quiz...');

//     try {
//       const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//       const quizData = {
//         title,
//         description,
//         duration,
//         questions,
//         totalMarks,
//         createdBy: teacherId,
//         createdByName: JSON.parse(localStorage.getItem('user') || '{}').name,
//         visibility,
//         assignedTo: visibility === 'assigned' ? assignedStudents : []
//       };

//       const res = await fetch('/api/quizzes/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(quizData)
//       });

//       const data = await res.json();

//       if (data.success) {
//         showToast.success('Quiz created successfully!');
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to create quiz');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       <Toaster position="top-right" />
      
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-2xl font-light text-white">create new quiz</h1>
//           </div>
          
//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors border border-indigo-500/30 disabled:opacity-50"
//           >
//             <Save className="w-4 h-4" />
//             {saving ? 'saving...' : 'save quiz'}
//           </button>
//         </div>

//         {/* Quiz Details */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">quiz details</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-xs text-white/40 mb-1">title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                 placeholder="e.g., JavaScript Fundamentals"
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm resize-none"
//                 placeholder="Describe your quiz..."
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">duration (minutes)</label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(Number(e.target.value))}
//                 min="1"
//                 className="w-24 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Visibility Settings */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">visibility</h2>
          
//           <div className="space-y-3">
//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer hover:bg-white/[0.04]">
//               <div className="flex items-center gap-3">
//                 <Globe className="w-5 h-5 text-blue-400" />
//                 <div>
//                   <p className="text-sm text-white">public</p>
//                   <p className="text-xs text-white/30">visible to all students</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 checked={visibility === 'public'}
//                 onChange={() => setVisibility('public')}
//                 className="w-4 h-4 accent-indigo-500"
//               />
//             </label>

//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer hover:bg-white/[0.04]">
//               <div className="flex items-center gap-3">
//                 <Users className="w-5 h-5 text-green-400" />
//                 <div>
//                   <p className="text-sm text-white">assigned students only</p>
//                   <p className="text-xs text-white/30">only visible to selected students</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 checked={visibility === 'assigned'}
//                 onChange={() => {
//                   setVisibility('assigned');
//                   setShowStudentSelector(true);
//                 }}
//                 className="w-4 h-4 accent-indigo-500"
//               />
//             </label>
//           </div>

//           {/* Student Selector */}
//           {visibility === 'assigned' && (
//             <div className="mt-4 border-t border-white/[0.05] pt-4">
//               <div className="flex items-center justify-between mb-3">
//                 <button
//                   onClick={() => setShowStudentSelector(!showStudentSelector)}
//                   className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30"
//                 >
//                   {showStudentSelector ? 'hide' : 'show'} student list
//                   {showStudentSelector ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
//                 </button>

//                 <div className="flex gap-2">
//                   <button onClick={selectAllStudents} className="text-xs text-indigo-400 hover:text-indigo-300">
//                     select all
//                   </button>
//                   <span className="text-white/20">|</span>
//                   <button onClick={clearAllStudents} className="text-xs text-red-400 hover:text-red-300">
//                     clear
//                   </button>
//                 </div>
//               </div>

//               {/* Selected Students Tags */}
//               {assignedStudents.length > 0 && (
//                 <div className="mb-3 p-2 bg-white/[0.02] rounded-lg">
//                   <p className="text-xs text-white/40 mb-2">selected students:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {assignedStudents.map(id => {
//                       const student = students.find(s => s._id === id);
//                       return student ? (
//                         <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-md text-xs border border-indigo-500/30">
//                           {student.name}
//                           <X className="w-3 h-3 cursor-pointer hover:text-indigo-300" onClick={() => toggleStudent(id)} />
//                         </span>
//                       ) : null;
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Student List Dropdown */}
//               {showStudentSelector && (
//                 <div className="border border-white/[0.05] rounded-lg overflow-hidden">
//                   <div className="p-2 border-b border-white/[0.05] relative">
//                     <input
//                       type="text"
//                       value={studentSearch}
//                       onChange={(e) => setStudentSearch(e.target.value)}
//                       placeholder="search students..."
//                       className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs pr-8"
//                     />
//                     {studentSearch && (
//                       <button
//                         onClick={() => setStudentSearch('')}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     )}
//                   </div>

//                   <div className="max-h-60 overflow-y-auto">
//                     {filteredStudents.length === 0 ? (
//                       <div className="p-4 text-center">
//                         <p className="text-xs text-white/30">no students found</p>
//                       </div>
//                     ) : (
//                       filteredStudents.map((student) => {
//                         const isSelected = assignedStudents.includes(student._id);
//                         return (
//                           <div
//                             key={student._id}
//                             onClick={() => toggleStudent(student._id)}
//                             className={`flex items-center justify-between p-3 border-b border-white/[0.05] cursor-pointer select-none transition-colors ${
//                               isSelected ? 'bg-indigo-500/10' : 'hover:bg-white/[0.03]'
//                             }`}
//                           >
//                             <div>
//                               <p className="text-sm text-white">{student.name}</p>
//                               <p className="text-xs text-white/30">{student.email}</p>
//                             </div>
//                             <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 pointer-events-none transition-colors ${
//                               isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'
//                             }`}>
//                               {isSelected && (
//                                 <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                                 </svg>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })
//                     )}
//                   </div>

//                   <div className="p-2 border-t border-white/[0.05] bg-white/[0.02]">
//                     <p className="text-[10px] text-white/30 text-center">
//                       showing {filteredStudents.length} of {students.length} students • {assignedStudents.length} selected
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Questions */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-medium text-white">questions</h2>
//             <button onClick={addQuestion} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30">
//               <PlusCircle className="w-3 h-3" />
//               add question
//             </button>
//           </div>

//           <div className="space-y-4">
//             {questions.map((q, qIndex) => (
//               <div key={q.id} className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs text-white/40">question {qIndex + 1}</span>
//                   {questions.length > 1 && (
//                     <button onClick={() => removeQuestion(qIndex)} className="text-red-400/60 hover:text-red-400">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   type="text"
//                   value={q.text}
//                   onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm mb-3"
//                   placeholder={`Question ${qIndex + 1}`}
//                 />

//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                   {q.options.map((opt, oIndex) => (
//                     <input
//                       key={oIndex}
//                       type="text"
//                       value={opt}
//                       onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                       className="px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                       placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <label className="block text-xs text-white/40 mb-1">correct answer</label>
//                     <select
//                       value={q.correctOption}
//                       onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     >
//                       {q.options.map((_, i) => (
//                         <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="w-24">
//                     <label className="block text-xs text-white/40 mb-1">marks</label>
//                     <input
//                       type="number"
//                       value={q.marks}
//                       onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                       min="1"
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









// 'use client';

// import { useEffect, useState, useRef } from 'react'; // ✅ useRef import karo
// import { useRouter } from 'next/navigation';
// import { 
//   PlusCircle, 
//   Trash2, 
//   ArrowLeft, 
//   Save,
//   Globe,
//   Users,
//   Lock,
//   ChevronDown,
//   ChevronUp,
//   X
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

// interface Student {
//   _id: string;
//   name: string;
//   email: string;
// }

// export default function CreateQuizPage() {
//   const router = useRouter();
//   const fetchedRef = useRef(false); // ✅ Prevent double fetch
  
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
  
//   // Quiz fields
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [visibility, setVisibility] = useState<'public' | 'private' | 'assigned'>('public');
//   const [assignedStudents, setAssignedStudents] = useState<string[]>([]); // ✅ Empty array
//   const [questions, setQuestions] = useState<Question[]>([
//     {
//       id: `q_${Date.now()}_0`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     }
//   ]);
  
//   // Students list
//   const [students, setStudents] = useState<Student[]>([]);
//   const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
//   const [showStudentSelector, setShowStudentSelector] = useState(false);
//   const [studentSearch, setStudentSearch] = useState('');
//   const [teacherId, setTeacherId] = useState<string>('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (!user.id || user.role !== 'teacher') {
//       router.push('/login');
//       return;
//     }
//     setTeacherId(user.id);
    
//     // ✅ Prevent double fetch in Strict Mode
//     if (!fetchedRef.current) {
//       fetchedRef.current = true;
//       fetchStudents();
//     }
//   }, []);

//   useEffect(() => {
//     if (studentSearch.trim() === '') {
//       setFilteredStudents(students);
//     } else {
//       const filtered = students.filter(s => 
//         s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
//         s.email.toLowerCase().includes(studentSearch.toLowerCase())
//       );
//       setFilteredStudents(filtered);
//     }
//   }, [studentSearch, students]);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch('/api/users?role=student');
//       const data = await res.json();
      
//       // ✅ Debug - check _id format
//       console.log('API Response:', data);
//       console.log('First student _id:', data.data?.[0]?._id);
//       console.log('_id type:', typeof data.data?.[0]?._id);
      
//       if (data.success) {
//         // ✅ Normalize _id if it's an object (MongoDB ObjectId issue)
//         const normalized = data.data.map((s: any) => ({
//           ...s,
//           _id: s._id?.$oid || s._id?.toString() || s._id
//         }));
        
//         setStudents(normalized);
//         setFilteredStudents(normalized);
//       }
//     } catch (error) {
//       showToast.error('Failed to fetch students');
//     }
//   };

//   const addQuestion = () => {
//     const newQuestion: Question = {
//       id: `q_${Date.now()}_${questions.length}`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const removeQuestion = (index: number) => {
//     if (questions.length <= 1) {
//       showToast.error('Quiz must have at least one question');
//       return;
//     }
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const updateQuestion = (index: number, field: keyof Question, value: any) => {
//     const updated = [...questions];
//     updated[index] = { ...updated[index], [field]: value };
//     setQuestions(updated);
//   };

//   const updateOption = (qIndex: number, oIndex: number, value: string) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   // ✅ FIXED: toggleStudent with functional update
//   const toggleStudent = (studentId: string) => {
//     setAssignedStudents(prev => {
//       if (prev.includes(studentId)) {
//         return prev.filter(id => id !== studentId);
//       } else {
//         return [...prev, studentId];
//       }
//     });
//   };

//   // ✅ selectAllStudents
//   const selectAllStudents = () => {
//     const allIds = filteredStudents.map(s => s._id);
//     setAssignedStudents(allIds);
//   };

//   // ✅ clearAllStudents
//   const clearAllStudents = () => {
//     setAssignedStudents([]);
//   };

//   const validateQuiz = () => {
//     if (!title.trim()) {
//       showToast.error('Please enter a quiz title');
//       return false;
//     }

//     for (let i = 0; i < questions.length; i++) {
//       const q = questions[i];
//       if (!q.text.trim()) {
//         showToast.error(`Question ${i + 1} is empty`);
//         return false;
//       }
//       for (let j = 0; j < q.options.length; j++) {
//         if (!q.options[j].trim()) {
//           showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`);
//           return false;
//         }
//       }
//     }

//     if (visibility === 'assigned' && assignedStudents.length === 0) {
//       showToast.error('Please select at least one student');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateQuiz()) return;

//     setSaving(true);
//     const toastId = showToast.loading('Creating quiz...');

//     try {
//       const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//       const quizData = {
//         title,
//         description,
//         duration,
//         questions,
//         totalMarks,
//         createdBy: teacherId,
//         createdByName: JSON.parse(localStorage.getItem('user') || '{}').name,
//         visibility,
//         assignedTo: visibility === 'assigned' ? assignedStudents : []
//       };

//       const res = await fetch('/api/quizzes/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(quizData)
//       });

//       const data = await res.json();

//       if (data.success) {
//         showToast.success('Quiz created successfully!');
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to create quiz');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       <Toaster position="top-right" />
      
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-2xl font-light text-white">create new quiz</h1>
//           </div>
          
//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors border border-indigo-500/30 disabled:opacity-50"
//           >
//             <Save className="w-4 h-4" />
//             {saving ? 'saving...' : 'save quiz'}
//           </button>
//         </div>

//         {/* Quiz Details */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">quiz details</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-xs text-white/40 mb-1">title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                 placeholder="e.g., JavaScript Fundamentals"
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm resize-none"
//                 placeholder="Describe your quiz..."
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">duration (minutes)</label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(Number(e.target.value))}
//                 min="1"
//                 className="w-24 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Visibility Settings */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">visibility</h2>
          
//           <div className="space-y-3">
//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer hover:bg-white/[0.04]">
//               <div className="flex items-center gap-3">
//                 <Globe className="w-5 h-5 text-blue-400" />
//                 <div>
//                   <p className="text-sm text-white">public</p>
//                   <p className="text-xs text-white/30">visible to all students</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 checked={visibility === 'public'}
//                 onChange={() => setVisibility('public')}
//                 className="w-4 h-4 accent-indigo-500"
//               />
//             </label>

//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer hover:bg-white/[0.04]">
//               <div className="flex items-center gap-3">
//                 <Users className="w-5 h-5 text-green-400" />
//                 <div>
//                   <p className="text-sm text-white">assigned students only</p>
//                   <p className="text-xs text-white/30">only visible to selected students</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 checked={visibility === 'assigned'}
//                 onChange={() => {
//                   setVisibility('assigned');
//                   setShowStudentSelector(true);
//                 }}
//                 className="w-4 h-4 accent-indigo-500"
//               />
//             </label>
//           </div>

//           {/* Student Selector */}
//           {visibility === 'assigned' && (
//             <div className="mt-4 border-t border-white/[0.05] pt-4">
//               <div className="flex items-center justify-between mb-3">
//                 <button
//                   onClick={() => setShowStudentSelector(!showStudentSelector)}
//                   className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30"
//                 >
//                   {showStudentSelector ? 'hide' : 'show'} student list
//                   {showStudentSelector ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
//                 </button>

//                 <div className="flex gap-2">
//                   <button onClick={selectAllStudents} className="text-xs text-indigo-400 hover:text-indigo-300">
//                     select all
//                   </button>
//                   <span className="text-white/20">|</span>
//                   <button onClick={clearAllStudents} className="text-xs text-red-400 hover:text-red-300">
//                     clear
//                   </button>
//                 </div>
//               </div>

//               {/* Selected Students Tags */}
//               {assignedStudents.length > 0 && (
//                 <div className="mb-3 p-2 bg-white/[0.02] rounded-lg">
//                   <p className="text-xs text-white/40 mb-2">selected students:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {assignedStudents.map(id => {
//                       const student = students.find(s => s._id === id);
//                       return student ? (
//                         <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-md text-xs border border-indigo-500/30">
//                           {student.name}
//                           <X className="w-3 h-3 cursor-pointer hover:text-indigo-300" onClick={() => toggleStudent(id)} />
//                         </span>
//                       ) : null;
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Student List Dropdown */}
//               {showStudentSelector && (
//                 <div className="border border-white/[0.05] rounded-lg overflow-hidden">
//                   <div className="p-2 border-b border-white/[0.05] relative">
//                     <input
//                       type="text"
//                       value={studentSearch}
//                       onChange={(e) => setStudentSearch(e.target.value)}
//                       placeholder="search students..."
//                       className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs pr-8"
//                     />
//                     {studentSearch && (
//                       <button
//                         onClick={() => setStudentSearch('')}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     )}
//                   </div>

//                   <div className="max-h-60 overflow-y-auto">
//                     {filteredStudents.length === 0 ? (
//                       <div className="p-4 text-center">
//                         <p className="text-xs text-white/30">no students found</p>
//                       </div>
//                     ) : (
//                       filteredStudents.map((student) => {
//                         const isSelected = assignedStudents.includes(student._id);
//                         return (
//                           <div
//                             key={student._id}
//                             onClick={() => toggleStudent(student._id)}
//                             className={`flex items-center justify-between p-3 border-b border-white/[0.05] cursor-pointer select-none transition-colors ${
//                               isSelected ? 'bg-indigo-500/10' : 'hover:bg-white/[0.03]'
//                             }`}
//                           >
//                             <div>
//                               <p className="text-sm text-white">{student.name}</p>
//                               <p className="text-xs text-white/30">{student.email}</p>
//                             </div>
//                             <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 pointer-events-none transition-colors ${
//                               isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'
//                             }`}>
//                               {isSelected && (
//                                 <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                                 </svg>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })
//                     )}
//                   </div>

//                   <div className="p-2 border-t border-white/[0.05] bg-white/[0.02]">
//                     <p className="text-[10px] text-white/30 text-center">
//                       showing {filteredStudents.length} of {students.length} students • {assignedStudents.length} selected
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Questions */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-medium text-white">questions</h2>
//             <button onClick={addQuestion} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30">
//               <PlusCircle className="w-3 h-3" />
//               add question
//             </button>
//           </div>

//           <div className="space-y-4">
//             {questions.map((q, qIndex) => (
//               <div key={q.id} className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs text-white/40">question {qIndex + 1}</span>
//                   {questions.length > 1 && (
//                     <button onClick={() => removeQuestion(qIndex)} className="text-red-400/60 hover:text-red-400">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   type="text"
//                   value={q.text}
//                   onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm mb-3"
//                   placeholder={`Question ${qIndex + 1}`}
//                 />

//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                   {q.options.map((opt, oIndex) => (
//                     <input
//                       key={oIndex}
//                       type="text"
//                       value={opt}
//                       onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                       className="px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                       placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <label className="block text-xs text-white/40 mb-1">correct answer</label>
//                     <select
//                       value={q.correctOption}
//                       onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     >
//                       {q.options.map((_, i) => (
//                         <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="w-24">
//                     <label className="block text-xs text-white/40 mb-1">marks</label>
//                     <input
//                       type="number"
//                       value={q.marks}
//                       onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                       min="1"
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   PlusCircle, 
//   Trash2, 
//   Save, 
//   ArrowLeft, 
//   Sparkles,
//   HelpCircle,
//   Clock,
//   FileText,
//   CheckCircle,
//   XCircle
// } from 'lucide-react';

// export default function CreateQuizPage() {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [loading, setLoading] = useState(false);
  
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

//   const handleSubmit = async (e: React.FormEvent) => {
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

//     setLoading(true);

//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);
      
//       const newQuiz = {
//         title,
//         description,
//         duration,
//         totalMarks,
//         questions,
//         createdBy: user.id,
//         createdByName: user.name
//       };

//       const res = await fetch('/api/quizzes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newQuiz)
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         alert('Quiz created successfully! ✅');
//         router.push('/teacher/dashboard');
//       } else {
//         alert(data.error || 'Error saving quiz');
//         setLoading(false);
//       }
//     } catch (error) {
//       alert('Network error. Please try again.');
//       setLoading(false);
//     }
//   };

//   const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
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
//               {/* Logo & Back */}
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <button
//                   onClick={() => router.back()}
//                   className="p-2 hover:bg-[#1a1a23] rounded-xl transition-colors group"
//                 >
//                   <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white" />
//                 </button>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
//                     <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                       Create New Quiz
//                     </h1>
//                     <p className="text-xs sm:text-sm text-gray-500">Design your quiz questions</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Desktop Save Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="hidden sm:flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Save Quiz</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Form */}
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
//             {/* Quiz Details Card */}
//             <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//               <div className="p-4 sm:p-6 border-b border-[#2a2a35] bg-[#1a1a23]/50">
//                 <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
//                   <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                   Quiz Details
//                 </h2>
//                 <p className="text-xs sm:text-sm text-gray-400 mt-1">Basic information about your quiz</p>
//               </div>
              
//               <div className="p-4 sm:p-6 space-y-4">
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                     Quiz Title <span className="text-red-400">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
//                     placeholder="e.g., JavaScript Fundamentals"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                     Description
//                   </label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     rows={3}
//                     className="w-full px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base resize-y"
//                     placeholder="Describe what this quiz covers..."
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                     <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
//                     Duration (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     value={duration}
//                     onChange={(e) => setDuration(Number(e.target.value))}
//                     min="1"
//                     className="w-24 sm:w-32 px-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Questions Card */}
//             <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//               <div className="p-4 sm:p-6 border-b border-[#2a2a35] bg-[#1a1a23]/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                 <div>
//                   <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
//                     <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                     Questions
//                   </h2>
//                   <p className="text-xs sm:text-sm text-gray-400 mt-1">Add and configure your questions</p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={addQuestion}
//                   className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a1a23] hover:bg-green-600/20 border border-[#2a2a35] hover:border-green-500/50 rounded-lg text-gray-400 hover:text-green-400 transition-all text-sm"
//                 >
//                   <PlusCircle className="w-4 h-4" />
//                   Add Question
//                 </button>
//               </div>
              
//               <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//                 {questions.map((q, qIndex) => (
//                   <div
//                     key={q.id}
//                     className="bg-[#1a1a23] border border-[#2a2a35] rounded-xl p-4 sm:p-5 hover:border-purple-500/50 transition-all"
//                   >
//                     {/* Question Header */}
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
//                           <span className="text-xs sm:text-sm font-medium text-purple-400">{qIndex + 1}</span>
//                         </div>
//                         <h3 className="text-sm sm:text-base font-medium text-white">Question {qIndex + 1}</h3>
//                       </div>
//                       {questions.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeQuestion(qIndex)}
//                           className="flex items-center gap-1 px-3 py-1.5 bg-[#1a1a23] hover:bg-red-600/20 border border-[#2a2a35] hover:border-red-500/50 rounded-lg text-gray-400 hover:text-red-400 transition-all text-xs sm:text-sm w-fit"
//                         >
//                           <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                           <span className="sm:hidden">Remove</span>
//                         </button>
//                       )}
//                     </div>

//                     {/* Question Text */}
//                     <input
//                       type="text"
//                       value={q.text}
//                       onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                       className="w-full px-4 py-2.5 sm:py-3 bg-[#111117] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base mb-4"
//                       placeholder="Enter your question"
//                       required
//                     />

//                     {/* Options Grid */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
//                       {q.options.map((opt, oIndex) => (
//                         <div key={oIndex} className="flex items-center gap-2">
//                           <span className="text-xs sm:text-sm font-medium text-gray-500 w-5">
//                             {String.fromCharCode(65 + oIndex)}.
//                           </span>
//                           <input
//                             type="text"
//                             value={opt}
//                             onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                             placeholder={`Option ${oIndex + 1}`}
//                             className="flex-1 px-4 py-2 sm:py-2.5 bg-[#111117] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
//                             required
//                           />
//                         </div>
//                       ))}
//                     </div>

//                     {/* Correct Answer & Marks */}
//                     <div className="flex flex-col sm:flex-row gap-4">
//                       <div className="flex-1">
//                         <label className="block text-xs text-gray-500 mb-1.5 ml-1">
//                           <CheckCircle className="w-3 h-3 inline mr-1" />
//                           Correct Answer
//                         </label>
//                         <select
//                           value={q.correctOption}
//                           onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                           className="w-full px-4 py-2 sm:py-2.5 bg-[#111117] border border-[#2a2a35] rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
//                         >
//                           {q.options.map((_, i) => (
//                             <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div className="w-full sm:w-28">
//                         <label className="block text-xs text-gray-500 mb-1.5 ml-1">Marks</label>
//                         <input
//                           type="number"
//                           value={q.marks}
//                           onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                           min="1"
//                           className="w-full px-4 py-2 sm:py-2.5 bg-[#111117] border border-[#2a2a35] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Total Marks */}
//                 {questions.length > 0 && (
//                   <div className="mt-6 pt-4 border-t border-[#2a2a35] flex justify-end">
//                     <div className="bg-[#1a1a23] px-4 py-2 rounded-lg">
//                       <span className="text-xs sm:text-sm text-gray-400">Total Marks: </span>
//                       <span className="font-semibold text-white text-sm sm:text-base ml-2">
//                         {totalMarks}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Mobile Save Button */}
//         <div className="fixed bottom-0 left-0 right-0 bg-[#111117] border-t border-[#2a2a35] p-4 sm:hidden">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Saving Quiz...</span>
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5" />
//                 <span>Save Quiz</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse {
//           animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//       `}</style>
//     </div>
//   );
// }







// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   PlusCircle, 
//   Trash2, 
//   ArrowLeft, 
//   Save,
//   Globe,
//   Users,
//   Lock,
//   ChevronDown,
//   CheckCircle,
//   XCircle
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

// interface Student {
//   _id: string;
//   name: string;
//   email: string;
// }

// export default function CreateQuizPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
  
//   // Quiz fields
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [visibility, setVisibility] = useState<'public' | 'private' | 'assigned'>('public');
//   const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
//   const [questions, setQuestions] = useState<Question[]>([
//     {
//       id: `q_${Date.now()}_0`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     }
//   ]);
  
//   // Students list for assignment
//   const [students, setStudents] = useState<Student[]>([]);
//   const [showStudentSelector, setShowStudentSelector] = useState(false);
//   const [teacherId, setTeacherId] = useState<string>('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (!user.id || user.role !== 'teacher') {
//       router.push('/login');
//       return;
//     }
//     setTeacherId(user.id);
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch('/api/users?role=student');
//       const data = await res.json();
//       if (data.success) {
//         setStudents(data.data);
//       }
//     } catch (error) {
//       showToast.error('Failed to fetch students');
//     }
//   };

//   const addQuestion = () => {
//     const newQuestion: Question = {
//       id: `q_${Date.now()}_${questions.length}`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const removeQuestion = (index: number) => {
//     if (questions.length <= 1) {
//       showToast.error('Quiz must have at least one question');
//       return;
//     }
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const updateQuestion = (index: number, field: keyof Question, value: any) => {
//     const updated = [...questions];
//     updated[index] = { ...updated[index], [field]: value };
//     setQuestions(updated);
//   };

//   const updateOption = (qIndex: number, oIndex: number, value: string) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   const toggleStudent = (studentId: string) => {
//     if (assignedStudents.includes(studentId)) {
//       setAssignedStudents(assignedStudents.filter(id => id !== studentId));
//     } else {
//       setAssignedStudents([...assignedStudents, studentId]);
//     }
//   };

//   const validateQuiz = () => {
//     if (!title.trim()) {
//       showToast.error('Please enter a quiz title');
//       return false;
//     }

//     for (let i = 0; i < questions.length; i++) {
//       const q = questions[i];
//       if (!q.text.trim()) {
//         showToast.error(`Question ${i + 1} is empty`);
//         return false;
//       }
//       for (let j = 0; j < q.options.length; j++) {
//         if (!q.options[j].trim()) {
//           showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`);
//           return false;
//         }
//       }
//     }

//     if (visibility === 'assigned' && assignedStudents.length === 0) {
//       showToast.error('Please select at least one student for assigned quiz');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateQuiz()) return;

//     setSaving(true);
//     const toastId = showToast.loading('Creating quiz...');

//     try {
//       const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//       const quizData = {
//         title,
//         description,
//         duration,
//         questions,
//         totalMarks,
//         createdBy: teacherId,
//         createdByName: JSON.parse(localStorage.getItem('user') || '{}').name,
//         visibility,
//         assignedTo: visibility === 'assigned' ? assignedStudents : []
//       };

//       const res = await fetch('/api/quizzes/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(quizData)
//       });

//       const data = await res.json();

//       if (data.success) {
//         showToast.success('Quiz created successfully!');
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to create quiz');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       <Toaster position="top-right" />
      
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-2xl font-light text-white">create new quiz</h1>
//           </div>
          
//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors border border-indigo-500/30 disabled:opacity-50"
//           >
//             <Save className="w-4 h-4" />
//             {saving ? 'saving...' : 'save quiz'}
//           </button>
//         </div>

//         {/* Quiz Details */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">quiz details</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-xs text-white/40 mb-1">title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                 placeholder="e.g., JavaScript Fundamentals"
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm resize-none"
//                 placeholder="Describe your quiz..."
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">duration (minutes)</label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(Number(e.target.value))}
//                 min="1"
//                 className="w-24 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Visibility Settings */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">visibility</h2>
          
//           <div className="space-y-3">
//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer">
//               <div className="flex items-center gap-3">
//                 <Globe className="w-5 h-5 text-blue-400" />
//                 <div>
//                   <p className="text-sm text-white">public</p>
//                   <p className="text-xs text-white/30">visible to all students</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 checked={visibility === 'public'}
//                 onChange={() => setVisibility('public')}
//                 className="w-4 h-4 accent-indigo-500"
//               />
//             </label>

//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer">
//               <div className="flex items-center gap-3">
//                 <Users className="w-5 h-5 text-green-400" />
//                 <div>
//                   <p className="text-sm text-white">assigned students only</p>
//                   <p className="text-xs text-white/30">only visible to selected students</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 checked={visibility === 'assigned'}
//                 onChange={() => setVisibility('assigned')}
//                 className="w-4 h-4 accent-indigo-500"
//               />
//             </label>

//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer">
//               <div className="flex items-center gap-3">
//                 <Lock className="w-5 h-5 text-purple-400" />
//                 <div>
//                   <p className="text-sm text-white">private (coming soon)</p>
//                   <p className="text-xs text-white/30">requires class code</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 disabled
//                 className="w-4 h-4 opacity-30"
//               />
//             </label>
//           </div>

//           {/* Student Selector for Assigned */}
//           {visibility === 'assigned' && (
//             <div className="mt-4">
//               <button
//                 onClick={() => setShowStudentSelector(!showStudentSelector)}
//                 className="flex items-center gap-2 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-sm border border-indigo-500/30"
//               >
//                 {showStudentSelector ? 'hide' : 'show'} student list
//                 <ChevronDown className={`w-4 h-4 transition-transform ${showStudentSelector ? 'rotate-180' : ''}`} />
//               </button>

//               {showStudentSelector && (
//                 <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
//                   {students.map(student => (
//                     <label
//                       key={student._id}
//                       className="flex items-center justify-between p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer"
//                     >
//                       <div>
//                         <p className="text-sm text-white">{student.name}</p>
//                         <p className="text-xs text-white/30">{student.email}</p>
//                       </div>
//                       <input
//                         type="checkbox"
//                         checked={assignedStudents.includes(student._id)}
//                         onChange={() => toggleStudent(student._id)}
//                         className="w-4 h-4 accent-indigo-500"
//                       />
//                     </label>
//                   ))}
//                 </div>
//               )}

//               {assignedStudents.length > 0 && (
//                 <div className="mt-3">
//                   <p className="text-xs text-white/40 mb-2">{assignedStudents.length} students selected</p>
//                   <div className="flex flex-wrap gap-2">
//                     {assignedStudents.map(id => {
//                       const student = students.find(s => s._id === id);
//                       return student ? (
//                         <span
//                           key={id}
//                           className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-md text-xs border border-indigo-500/30"
//                         >
//                           {student.name}
//                           <XCircle
//                             className="w-3 h-3 cursor-pointer hover:text-indigo-300"
//                             onClick={() => toggleStudent(id)}
//                           />
//                         </span>
//                       ) : null;
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Questions */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-medium text-white">questions</h2>
//             <button
//               onClick={addQuestion}
//               className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30"
//             >
//               <PlusCircle className="w-3 h-3" />
//               add question
//             </button>
//           </div>

//           <div className="space-y-4">
//             {questions.map((q, qIndex) => (
//               <div key={q.id} className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs text-white/40">question {qIndex + 1}</span>
//                   {questions.length > 1 && (
//                     <button
//                       onClick={() => removeQuestion(qIndex)}
//                       className="text-red-400/60 hover:text-red-400"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   type="text"
//                   value={q.text}
//                   onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm mb-3"
//                   placeholder={`Question ${qIndex + 1}`}
//                 />

//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                   {q.options.map((opt, oIndex) => (
//                     <input
//                       key={oIndex}
//                       type="text"
//                       value={opt}
//                       onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                       className="px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                       placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <label className="block text-xs text-white/40 mb-1">correct answer</label>
//                     <select
//                       value={q.correctOption}
//                       onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     >
//                       {q.options.map((_, i) => (
//                         <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="w-24">
//                     <label className="block text-xs text-white/40 mb-1">marks</label>
//                     <input
//                       type="number"
//                       value={q.marks}
//                       onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                       min="1"
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   PlusCircle, 
//   Trash2, 
//   ArrowLeft, 
//   Save,
//   Globe,
//   Users,
//   Lock,
//   ChevronDown,
//   ChevronUp,
//   X,
//   CheckCircle
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

// interface Student {
//   _id: string;
//   name: string;
//   email: string;
// }

// export default function CreateQuizPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
  
//   // Quiz fields
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [visibility, setVisibility] = useState<'public' | 'private' | 'assigned'>('public');
//   const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
//   const [questions, setQuestions] = useState<Question[]>([
//     {
//       id: `q_${Date.now()}_0`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     }
//   ]);
  
//   // Students list for assignment
//   const [students, setStudents] = useState<Student[]>([]);
//   const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
//   const [showStudentSelector, setShowStudentSelector] = useState(false);
//   const [studentSearch, setStudentSearch] = useState('');
//   const [teacherId, setTeacherId] = useState<string>('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (!user.id || user.role !== 'teacher') {
//       router.push('/login');
//       return;
//     }
//     setTeacherId(user.id);
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     if (studentSearch.trim() === '') {
//       setFilteredStudents(students);
//     } else {
//       const filtered = students.filter(s => 
//         s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
//         s.email.toLowerCase().includes(studentSearch.toLowerCase())
//       );
//       setFilteredStudents(filtered);
//     }
//   }, [studentSearch, students]);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch('/api/users?role=student');
//       const data = await res.json();
//       if (data.success) {
//         setStudents(data.data);
//         setFilteredStudents(data.data);
//       }
//     } catch (error) {
//       showToast.error('Failed to fetch students');
//     }
//   };

//   const addQuestion = () => {
//     const newQuestion: Question = {
//       id: `q_${Date.now()}_${questions.length}`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const removeQuestion = (index: number) => {
//     if (questions.length <= 1) {
//       showToast.error('Quiz must have at least one question');
//       return;
//     }
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const updateQuestion = (index: number, field: keyof Question, value: any) => {
//     const updated = [...questions];
//     updated[index] = { ...updated[index], [field]: value };
//     setQuestions(updated);
//   };

//   const updateOption = (qIndex: number, oIndex: number, value: string) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   const toggleStudent = (studentId: string) => {
//     if (assignedStudents.includes(studentId)) {
//       setAssignedStudents(assignedStudents.filter(id => id !== studentId));
//     } else {
//       setAssignedStudents([...assignedStudents, studentId]);
//     }
//   };

//   const selectAllStudents = () => {
//     const allIds = filteredStudents.map(s => s._id);
//     setAssignedStudents(allIds);
//   };

//   const clearAllStudents = () => {
//     setAssignedStudents([]);
//   };

//   const validateQuiz = () => {
//     if (!title.trim()) {
//       showToast.error('Please enter a quiz title');
//       return false;
//     }

//     for (let i = 0; i < questions.length; i++) {
//       const q = questions[i];
//       if (!q.text.trim()) {
//         showToast.error(`Question ${i + 1} is empty`);
//         return false;
//       }
//       for (let j = 0; j < q.options.length; j++) {
//         if (!q.options[j].trim()) {
//           showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`);
//           return false;
//         }
//       }
//     }

//     if (visibility === 'assigned' && assignedStudents.length === 0) {
//       showToast.error('Please select at least one student for assigned quiz');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateQuiz()) return;

//     setSaving(true);
//     const toastId = showToast.loading('Creating quiz...');

//     try {
//       const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

//       // FIXED: assignedTo array ko properly handle kiya gaya hai
//       const quizData = {
//         title,
//         description,
//         duration,
//         questions,
//         totalMarks,
//         createdBy: teacherId,
//         createdByName: JSON.parse(localStorage.getItem('user') || '{}').name,
//         visibility,
//         // Important: assignedTo sirf tab bhejna hai jab visibility 'assigned' ho
//         assignedTo: visibility === 'assigned' ? assignedStudents : []
//       };

//       console.log('Sending quiz data:', quizData); // Debug ke liye

//       const res = await fetch('/api/quizzes/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(quizData)
//       });

//       const data = await res.json();

//       if (data.success) {
//         showToast.success('Quiz created successfully!');
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to create quiz');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getSelectedStudentsCount = () => {
//     return assignedStudents.length;
//   };

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       <Toaster position="top-right" />
      
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-2xl font-light text-white">create new quiz</h1>
//           </div>
          
//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors border border-indigo-500/30 disabled:opacity-50"
//           >
//             <Save className="w-4 h-4" />
//             {saving ? 'saving...' : 'save quiz'}
//           </button>
//         </div>

//         {/* Quiz Details */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">quiz details</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-xs text-white/40 mb-1">title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                 placeholder="e.g., JavaScript Fundamentals"
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm resize-none"
//                 placeholder="Describe your quiz..."
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">duration (minutes)</label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(Number(e.target.value))}
//                 min="1"
//                 className="w-24 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Visibility Settings */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">visibility</h2>
          
//           <div className="space-y-3">
//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer hover:bg-white/[0.04]">
//               <div className="flex items-center gap-3">
//                 <Globe className="w-5 h-5 text-blue-400" />
//                 <div>
//                   <p className="text-sm text-white">public</p>
//                   <p className="text-xs text-white/30">visible to all students</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 checked={visibility === 'public'}
//                 onChange={() => setVisibility('public')}
//                 className="w-4 h-4 accent-indigo-500"
//               />
//             </label>

//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer hover:bg-white/[0.04]">
//               <div className="flex items-center gap-3">
//                 <Users className="w-5 h-5 text-green-400" />
//                 <div>
//                   <p className="text-sm text-white">assigned students only</p>
//                   <p className="text-xs text-white/30">only visible to selected students</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 checked={visibility === 'assigned'}
//                 onChange={() => {
//                   setVisibility('assigned');
//                   setShowStudentSelector(true);
//                 }}
//                 className="w-4 h-4 accent-indigo-500"
//               />
//             </label>

//             <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-not-allowed opacity-50">
//               <div className="flex items-center gap-3">
//                 <Lock className="w-5 h-5 text-purple-400" />
//                 <div>
//                   <p className="text-sm text-white">private (coming soon)</p>
//                   <p className="text-xs text-white/30">requires class code</p>
//                 </div>
//               </div>
//               <input
//                 type="radio"
//                 name="visibility"
//                 disabled
//                 className="w-4 h-4 opacity-30"
//               />
//             </label>
//           </div>

//           {/* Student Selector for Assigned */}
//           {visibility === 'assigned' && (
//             <div className="mt-4 border-t border-white/[0.05] pt-4">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setShowStudentSelector(!showStudentSelector)}
//                     className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
//                   >
//                     {showStudentSelector ? 'hide' : 'show'} student list
//                     {showStudentSelector ? 
//                       <ChevronUp className="w-3 h-3" /> : 
//                       <ChevronDown className="w-3 h-3" />
//                     }
//                   </button>
                  
//                   {assignedStudents.length > 0 && (
//                     <span className="text-xs text-white/40">
//                       {assignedStudents.length} selected
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={selectAllStudents}
//                     className="text-xs text-indigo-400 hover:text-indigo-300"
//                   >
//                     select all
//                   </button>
//                   <span className="text-white/20">|</span>
//                   <button
//                     onClick={clearAllStudents}
//                     className="text-xs text-red-400 hover:text-red-300"
//                   >
//                     clear
//                   </button>
//                 </div>
//               </div>

//               {/* Selected Students Tags - FIXED: Added key prop */}
//               {assignedStudents.length > 0 && (
//                 <div className="mb-3 p-2 bg-white/[0.02] rounded-lg">
//                   <p className="text-xs text-white/40 mb-2">selected students:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {assignedStudents.map(id => {
//                       const student = students.find(s => s._id === id);
//                       return student ? (
//                         <span
//                           key={id} // FIXED: Added key prop here
//                           className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-md text-xs border border-indigo-500/30"
//                         >
//                           {student.name}
//                           <X
//                             className="w-3 h-3 cursor-pointer hover:text-indigo-300"
//                             onClick={() => toggleStudent(id)}
//                           />
//                         </span>
//                       ) : null;
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Student List Dropdown */}
//               {showStudentSelector && (
//                 <div className="border border-white/[0.05] rounded-lg overflow-hidden">
//                   {/* Search */}
//                   <div className="p-2 border-b border-white/[0.05]">
//                     <input
//                       type="text"
//                       value={studentSearch}
//                       onChange={(e) => setStudentSearch(e.target.value)}
//                       placeholder="search students..."
//                       className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50"
//                     />
//                   </div>

//                   {/* Student List - FIXED: Added key prop here */}
//                   <div className="max-h-60 overflow-y-auto">
//                     {filteredStudents.length === 0 ? (
//                       <div className="p-4 text-center">
//                         <p className="text-xs text-white/30">no students found</p>
//                       </div>
//                     ) : (
//                       filteredStudents.map(student => (
//                         <label
//                           key={student._id} // FIXED: Added key prop here
//                           className="flex items-center justify-between p-3 hover:bg-white/[0.02] border-b border-white/[0.05] last:border-b-0 cursor-pointer"
//                         >
//                           <div>
//                             <p className="text-sm text-white">{student.name}</p>
//                             <p className="text-xs text-white/30">{student.email}</p>
//                           </div>
//                           <input
//                             type="checkbox"
//                             checked={assignedStudents.includes(student._id)}
//                             onChange={() => toggleStudent(student._id)}
//                             className="w-4 h-4 accent-indigo-500"
//                           />
//                         </label>
//                       ))
//                     )}
//                   </div>

//                   {/* Footer */}
//                   <div className="p-2 border-t border-white/[0.05] bg-white/[0.02]">
//                     <p className="text-[10px] text-white/30 text-center">
//                       {filteredStudents.length} students • {assignedStudents.length} selected
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Questions */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-medium text-white">questions</h2>
//             <button
//               onClick={addQuestion}
//               className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30 hover:bg-indigo-500/20"
//             >
//               <PlusCircle className="w-3 h-3" />
//               add question
//             </button>
//           </div>

//           <div className="space-y-4">
//             {questions.map((q, qIndex) => (
//               <div key={q.id} className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs text-white/40">question {qIndex + 1}</span>
//                   {questions.length > 1 && (
//                     <button
//                       onClick={() => removeQuestion(qIndex)}
//                       className="text-red-400/60 hover:text-red-400"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   type="text"
//                   value={q.text}
//                   onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm mb-3"
//                   placeholder={`Question ${qIndex + 1}`}
//                 />

//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                   {q.options.map((opt, oIndex) => (
//                     <input
//                       key={oIndex}
//                       type="text"
//                       value={opt}
//                       onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                       className="px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                       placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <label className="block text-xs text-white/40 mb-1">correct answer</label>
//                     <select
//                       value={q.correctOption}
//                       onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     >
//                       {q.options.map((_, i) => (
//                         <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="w-24">
//                     <label className="block text-xs text-white/40 mb-1">marks</label>
//                     <input
//                       type="number"
//                       value={q.marks}
//                       onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                       min="1"
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   PlusCircle, 
//   Trash2, 
//   ArrowLeft, 
//   Save,
//   Globe,
//   Users,
//   ChevronDown,
//   ChevronUp,
//   X
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

// interface Student {
//   _id: string;
//   name: string;
//   email: string;
// }

// export default function CreateQuizPage() {
//   const router = useRouter();
//   const [saving, setSaving] = useState(false);
  
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [visibility, setVisibility] = useState<'public' | 'private' | 'assigned'>('public');
//   const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
//   const [questions, setQuestions] = useState<Question[]>([
//     {
//       id: `q_${Date.now()}_0`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     }
//   ]);
  
//   const [students, setStudents] = useState<Student[]>([]);
//   const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
//   const [showStudentSelector, setShowStudentSelector] = useState(false);
//   const [studentSearch, setStudentSearch] = useState('');
//   const [teacherId, setTeacherId] = useState<string>('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (!user.id || user.role !== 'teacher') {
//       router.push('/login');
//       return;
//     }
//     setTeacherId(user.id);
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     if (studentSearch.trim() === '') {
//       setFilteredStudents(students);
//     } else {
//       const filtered = students.filter(s => 
//         s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
//         s.email.toLowerCase().includes(studentSearch.toLowerCase())
//       );
//       setFilteredStudents(filtered);
//     }
//   }, [studentSearch, students]);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch('/api/users?role=student');
//       const data = await res.json();
//       if (data.success) {
//         setStudents(data.data);
//         setFilteredStudents(data.data);
//       }
//     } catch (error) {
//       showToast.error('Failed to fetch students');
//     }
//   };

//   const addQuestion = () => {
//     const newQuestion: Question = {
//       id: `q_${Date.now()}_${questions.length}`,
//       text: '',
//       options: ['', '', '', ''],
//       correctOption: 0,
//       marks: 10
//     };
//     setQuestions(prev => [...prev, newQuestion]);
//   };

//   const removeQuestion = (index: number) => {
//     if (questions.length <= 1) {
//       showToast.error('Quiz must have at least one question');
//       return;
//     }
//     setQuestions(prev => prev.filter((_, i) => i !== index));
//   };

//   const updateQuestion = (index: number, field: keyof Question, value: any) => {
//     setQuestions(prev => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], [field]: value };
//       return updated;
//     });
//   };

//   const updateOption = (qIndex: number, oIndex: number, value: string) => {
//     setQuestions(prev => {
//       const updated = [...prev];
//       updated[qIndex] = {
//         ...updated[qIndex],
//         options: updated[qIndex].options.map((opt, i) => i === oIndex ? value : opt)
//       };
//       return updated;
//     });
//   };

//   // ✅ FIXED: functional update — sirf clicked student toggle hoga
//   const toggleStudent = (studentId: string) => {
//     setAssignedStudents(prev =>
//       prev.includes(studentId)
//         ? prev.filter(id => id !== studentId)
//         : [...prev, studentId]
//     );
//   };

//   const selectAllStudents = () => {
//     setAssignedStudents(filteredStudents.map(s => s._id));
//   };

//   const clearAllStudents = () => {
//     setAssignedStudents([]);
//   };

//   const validateQuiz = () => {
//     if (!title.trim()) {
//       showToast.error('Please enter a quiz title');
//       return false;
//     }
//     for (let i = 0; i < questions.length; i++) {
//       const q = questions[i];
//       if (!q.text.trim()) {
//         showToast.error(`Question ${i + 1} is empty`);
//         return false;
//       }
//       for (let j = 0; j < q.options.length; j++) {
//         if (!q.options[j].trim()) {
//           showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`);
//           return false;
//         }
//       }
//     }
//     if (visibility === 'assigned' && assignedStudents.length === 0) {
//       showToast.error('Please select at least one student');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateQuiz()) return;
//     setSaving(true);
//     showToast.loading('Creating quiz...');
//     try {
//       const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
//       const quizData = {
//         title,
//         description,
//         duration,
//         questions,
//         totalMarks,
//         createdBy: teacherId,
//         createdByName: JSON.parse(localStorage.getItem('user') || '{}').name,
//         visibility,
//         assignedTo: visibility === 'assigned' ? assignedStudents : []
//       };
//       const res = await fetch('/api/quizzes/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(quizData)
//       });
//       const data = await res.json();
//       if (data.success) {
//         showToast.success('Quiz created successfully!');
//         setTimeout(() => router.push('/teacher/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to create quiz');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       <Toaster position="top-right" />
      
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-2xl font-light text-white">create new quiz</h1>
//           </div>
//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors border border-indigo-500/30 disabled:opacity-50"
//           >
//             <Save className="w-4 h-4" />
//             {saving ? 'saving...' : 'save quiz'}
//           </button>
//         </div>

//         {/* Quiz Details */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">quiz details</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-xs text-white/40 mb-1">title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                 placeholder="e.g., JavaScript Fundamentals"
//               />
//             </div>
//             <div>
//               <label className="block text-xs text-white/40 mb-1">description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm resize-none"
//                 placeholder="Describe your quiz..."
//               />
//             </div>
//             <div>
//               <label className="block text-xs text-white/40 mb-1">duration (minutes)</label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(Number(e.target.value))}
//                 min="1"
//                 className="w-24 px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Visibility Settings */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 mb-6">
//           <h2 className="text-sm font-medium text-white mb-4">visibility</h2>
//           <div className="space-y-3">
//             {/* Public */}
//             <div
//               onClick={() => setVisibility('public')}
//               className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer hover:bg-white/[0.04]"
//             >
//               <div className="flex items-center gap-3">
//                 <Globe className="w-5 h-5 text-blue-400" />
//                 <div>
//                   <p className="text-sm text-white">public</p>
//                   <p className="text-xs text-white/30">visible to all students</p>
//                 </div>
//               </div>
//               <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${visibility === 'public' ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'}`}>
//                 {visibility === 'public' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//               </div>
//             </div>

//             {/* Assigned */}
//             <div
//               onClick={() => { setVisibility('assigned'); setShowStudentSelector(true); }}
//               className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg cursor-pointer hover:bg-white/[0.04]"
//             >
//               <div className="flex items-center gap-3">
//                 <Users className="w-5 h-5 text-green-400" />
//                 <div>
//                   <p className="text-sm text-white">assigned students only</p>
//                   <p className="text-xs text-white/30">only visible to selected students</p>
//                 </div>
//               </div>
//               <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${visibility === 'assigned' ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'}`}>
//                 {visibility === 'assigned' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//               </div>
//             </div>
//           </div>

//           {/* Student Selector */}
//           {visibility === 'assigned' && (
//             <div className="mt-4 border-t border-white/[0.05] pt-4">
//               <div className="flex items-center justify-between mb-3">
//                 <button
//                   onClick={() => setShowStudentSelector(!showStudentSelector)}
//                   className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30"
//                 >
//                   {showStudentSelector ? 'hide' : 'show'} student list
//                   {showStudentSelector ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
//                 </button>
//                 <div className="flex gap-2">
//                   <button onClick={selectAllStudents} className="text-xs text-indigo-400 hover:text-indigo-300">
//                     select all
//                   </button>
//                   <span className="text-white/20">|</span>
//                   <button onClick={clearAllStudents} className="text-xs text-red-400 hover:text-red-300">
//                     clear
//                   </button>
//                 </div>
//               </div>

//               {/* Selected tags */}
//               {assignedStudents.length > 0 && (
//                 <div className="mb-3 p-2 bg-white/[0.02] rounded-lg">
//                   <p className="text-xs text-white/40 mb-2">selected ({assignedStudents.length}):</p>
//                   <div className="flex flex-wrap gap-2">
//                     {assignedStudents.map(id => {
//                       const student = students.find(s => s._id === id);
//                       return student ? (
//                         <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-md text-xs border border-indigo-500/30">
//                           {student.name}
//                           <X
//                             className="w-3 h-3 cursor-pointer hover:text-white"
//                             onClick={(e) => { e.stopPropagation(); toggleStudent(id); }}
//                           />
//                         </span>
//                       ) : null;
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Student List */}
//               {showStudentSelector && (
//                 <div className="border border-white/[0.05] rounded-lg overflow-hidden">
//                   <div className="p-2 border-b border-white/[0.05] relative">
//                     <input
//                       type="text"
//                       value={studentSearch}
//                       onChange={(e) => setStudentSearch(e.target.value)}
//                       placeholder="search students..."
//                       className="w-full px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs pr-8 focus:outline-none focus:border-indigo-500/50"
//                     />
//                     {studentSearch && (
//                       <button
//                         onClick={() => setStudentSearch('')}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     )}
//                   </div>

//                   <div className="max-h-60 overflow-y-auto">
//                     {filteredStudents.length === 0 ? (
//                       <div className="p-4 text-center">
//                         <p className="text-xs text-white/30">no students found</p>
//                       </div>
//                     ) : (
//                       filteredStudents.map((student) => {
//                         const isSelected = assignedStudents.includes(student._id);
//                         return (
//                           // ✅ KEY FIX: div use kiya label ki jagah, onClick se toggle
//                           <div
//                             key={student._id}
//                             onClick={() => toggleStudent(student._id)}
//                             className={`flex items-center justify-between p-3 border-b border-white/[0.05] cursor-pointer select-none transition-colors ${
//                               isSelected ? 'bg-indigo-500/10' : 'hover:bg-white/[0.03]'
//                             }`}
//                           >
//                             <div>
//                               <p className="text-sm text-white">{student.name}</p>
//                               <p className="text-xs text-white/30">{student.email}</p>
//                             </div>
//                             {/* Visual checkbox — pointer-events-none taake double fire na ho */}
//                             <div className={`w-4 h-4 rounded border-2 flex items-center justify-center pointer-events-none transition-colors ${
//                               isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'
//                             }`}>
//                               {isSelected && (
//                                 <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                                 </svg>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })
//                     )}
//                   </div>

//                   <div className="p-2 border-t border-white/[0.05] bg-white/[0.02]">
//                     <p className="text-[10px] text-white/30 text-center">
//                       showing {filteredStudents.length} of {students.length} students • {assignedStudents.length} selected
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Questions */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-medium text-white">questions</h2>
//             <button onClick={addQuestion} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs border border-indigo-500/30 hover:bg-indigo-500/20">
//               <PlusCircle className="w-3 h-3" />
//               add question
//             </button>
//           </div>

//           <div className="space-y-4">
//             {questions.map((q, qIndex) => (
//               <div key={q.id} className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs text-white/40">question {qIndex + 1}</span>
//                   {questions.length > 1 && (
//                     <button onClick={() => removeQuestion(qIndex)} className="text-red-400/60 hover:text-red-400">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   type="text"
//                   value={q.text}
//                   onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
//                   className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm mb-3"
//                   placeholder={`Question ${qIndex + 1}`}
//                 />

//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                   {q.options.map((opt, oIndex) => (
//                     <input
//                       key={oIndex}
//                       type="text"
//                       value={opt}
//                       onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                       className="px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                       placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <label className="block text-xs text-white/40 mb-1">correct answer</label>
//                     <select
//                       value={q.correctOption}
//                       onChange={(e) => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     >
//                       {q.options.map((_, i) => (
//                         <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="w-24">
//                     <label className="block text-xs text-white/40 mb-1">marks</label>
//                     <input
//                       type="number"
//                       value={q.marks}
//                       onChange={(e) => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                       min="1"
//                       className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlusCircle, Trash2, ArrowLeft, Save, Globe, Users, Lock,
  ChevronDown, ChevronUp, X, GraduationCap, CheckCircle,
  HelpCircle, FileText, Clock, Star
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

interface Student {
  _id: string;
  name: string;
  email: string;
}

export default function CreateQuizPage() {
  const router = useRouter();
  const fetchedRef = useRef(false);

  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [visibility, setVisibility] = useState<'public' | 'private' | 'assigned'>('public');
  const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([
    { id: `q_${Date.now()}_0`, text: '', options: ['', '', '', ''], correctOption: 0, marks: 10 }
  ]);

  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [showStudentSelector, setShowStudentSelector] = useState(false);
  const [studentSearch, setStudentSearch] = useState('');
  const [teacherId, setTeacherId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id || user.role !== 'teacher') { router.push('/login'); return; }
    setTeacherId(user.id);
    if (!fetchedRef.current) { fetchedRef.current = true; fetchStudents(); }
  }, []);

  useEffect(() => {
    setFilteredStudents(
      studentSearch.trim() === ''
        ? students
        : students.filter(s =>
            s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
            s.email.toLowerCase().includes(studentSearch.toLowerCase())
          )
    );
  }, [studentSearch, students]);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/users?role=student');
      const data = await res.json();
      if (data.success) {
        const normalized = data.data.map((s: any) => ({
          ...s, _id: s._id?.$oid || s._id?.toString() || s._id
        }));
        setStudents(normalized);
        setFilteredStudents(normalized);
      }
    } catch {
      showToast.error('Failed to fetch students');
    }
  };

  const addQuestion = () => {
    setQuestions(prev => [...prev, {
      id: `q_${Date.now()}_${prev.length}`,
      text: '', options: ['', '', '', ''], correctOption: 0, marks: 10
    }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length <= 1) { showToast.error('Quiz must have at least one question'); return; }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const toggleStudent = (id: string) => {
    setAssignedStudents(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const selectAllStudents = () => setAssignedStudents(filteredStudents.map(s => s._id));
  const clearAllStudents = () => setAssignedStudents([]);

  const validateQuiz = () => {
    if (!title.trim()) { showToast.error('Please enter a quiz title'); return false; }
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text.trim()) { showToast.error(`Question ${i + 1} is empty`); return false; }
      for (let j = 0; j < questions[i].options.length; j++) {
        if (!questions[i].options[j].trim()) { showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`); return false; }
      }
    }
    if (visibility === 'assigned' && assignedStudents.length === 0) {
      showToast.error('Please select at least one student'); return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateQuiz()) return;
    setSaving(true);
    showToast.loading('Creating quiz...');
    try {
      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
      const res = await fetch('/api/quizzes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, duration, questions, totalMarks,
          createdBy: teacherId,
          createdByName: JSON.parse(localStorage.getItem('user') || '{}').name,
          visibility,
          assignedTo: visibility === 'assigned' ? assignedStudents : []
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast.success('Quiz created successfully!');
        setTimeout(() => router.push('/teacher/dashboard'), 1500);
      } else {
        showToast.error(data.error || 'Failed to create quiz');
      }
    } catch {
      showToast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const totalMarks = questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);

  return (
    <div className="min-h-screen bg-[#070709] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-emerald-600/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-teal-600/4 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-white/80 truncate">Create Quiz</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-xl">
              <HelpCircle className="w-3.5 h-3.5 text-white/25" />
              <span className="text-xs text-white/30">{questions.length} Q · {totalMarks} marks</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-semibold transition-all disabled:opacity-40"
            >
              <Save className="w-3.5 h-3.5 shrink-0" />
              {saving ? 'Saving…' : 'Publish Quiz'}
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-5 pb-10 space-y-4">

        {/* Page title row */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">New Quiz</h1>
          <p className="text-xs text-white/30 mt-1">{questions.length} question{questions.length !== 1 ? 's' : ''} · {totalMarks} total marks</p>
        </div>

        {/* ── Quiz Details ── */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Quiz Details</h2>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Quiz Title *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., JavaScript Fundamentals"
                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief description of what this quiz covers..."
                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Duration</label>
                <div className="relative flex items-center gap-2">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    min="1"
                    className="w-28 pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="pt-5">
                <span className="text-xs text-white/25">minutes</span>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-white/30 mb-1">Total Marks</p>
                <p className="text-xl font-bold text-emerald-400">{totalMarks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Visibility ── */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Visibility</h2>
          </div>
          <div className="p-4 space-y-2.5">
            {/* Public */}
            <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
              visibility === 'public'
                ? 'bg-emerald-500/8 border-emerald-500/30'
                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  visibility === 'public' ? 'bg-emerald-500/15' : 'bg-white/[0.04]'
                }`}>
                  <Globe className={`w-4 h-4 ${visibility === 'public' ? 'text-emerald-400' : 'text-white/30'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Public</p>
                  <p className="text-xs text-white/35">Visible to all students</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                visibility === 'public' ? 'border-emerald-500 bg-emerald-500' : 'border-white/20'
              }`}>
                {visibility === 'public' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input type="radio" name="visibility" checked={visibility === 'public'} onChange={() => setVisibility('public')} className="hidden" />
            </label>

            {/* Assigned */}
            <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
              visibility === 'assigned'
                ? 'bg-amber-500/8 border-amber-500/30'
                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  visibility === 'assigned' ? 'bg-amber-500/15' : 'bg-white/[0.04]'
                }`}>
                  <Users className={`w-4 h-4 ${visibility === 'assigned' ? 'text-amber-400' : 'text-white/30'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Assigned Students Only</p>
                  <p className="text-xs text-white/35">Only visible to selected students</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                visibility === 'assigned' ? 'border-amber-500 bg-amber-500' : 'border-white/20'
              }`}>
                {visibility === 'assigned' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input type="radio" name="visibility" checked={visibility === 'assigned'} onChange={() => { setVisibility('assigned'); setShowStudentSelector(true); }} className="hidden" />
            </label>

            {/* Student selector — shows when assigned */}
            {visibility === 'assigned' && (
              <div className="mt-1 pt-3 border-t border-white/[0.05] space-y-3">
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowStudentSelector(!showStudentSelector)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-medium transition-all"
                  >
                    {showStudentSelector ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {showStudentSelector ? 'Hide' : 'Show'} Student List
                  </button>
                  <div className="flex items-center gap-3 text-xs">
                    <button onClick={selectAllStudents} className="text-emerald-400 hover:text-emerald-300 transition-colors">Select All</button>
                    <span className="text-white/15">|</span>
                    <button onClick={clearAllStudents} className="text-red-400/70 hover:text-red-400 transition-colors">Clear</button>
                  </div>
                </div>

                {/* Selected student tags */}
                {assignedStudents.length > 0 && (
                  <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                    <p className="text-xs text-white/35 mb-2">{assignedStudents.length} student{assignedStudents.length !== 1 ? 's' : ''} selected</p>
                    <div className="flex flex-wrap gap-1.5">
                      {assignedStudents.map(id => {
                        const s = students.find(st => st._id === id);
                        return s ? (
                          <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs border border-amber-500/20">
                            {s.name}
                            <X className="w-3 h-3 cursor-pointer hover:text-amber-300" onClick={() => toggleStudent(id)} />
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Student dropdown */}
                {showStudentSelector && (
                  <div className="border border-white/[0.06] rounded-xl overflow-hidden">
                    <div className="p-2.5 border-b border-white/[0.05] relative">
                      <input
                        type="text"
                        value={studentSearch}
                        onChange={e => setStudentSearch(e.target.value)}
                        placeholder="Search students..."
                        className="w-full px-3 py-2 pr-8 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40"
                      />
                      {studentSearch && (
                        <button onClick={() => setStudentSearch('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="max-h-52 overflow-y-auto">
                      {filteredStudents.length === 0 ? (
                        <div className="p-5 text-center">
                          <p className="text-xs text-white/30">No students found</p>
                        </div>
                      ) : (
                        filteredStudents.map(student => {
                          const isSelected = assignedStudents.includes(student._id);
                          return (
                            <div
                              key={student._id}
                              onClick={() => toggleStudent(student._id)}
                              className={`flex items-center justify-between px-4 py-3 border-b border-white/[0.04] cursor-pointer select-none transition-colors ${
                                isSelected ? 'bg-amber-500/8' : 'hover:bg-white/[0.02]'
                              }`}
                            >
                              <div className="min-w-0">
                                <p className="text-sm text-white truncate">{student.name}</p>
                                <p className="text-xs text-white/30 truncate">{student.email}</p>
                              </div>
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ml-3 transition-colors ${
                                isSelected ? 'border-amber-500 bg-amber-500' : 'border-white/20'
                              }`}>
                                {isSelected && (
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-white/[0.05] bg-white/[0.01]">
                      <p className="text-[10px] text-white/25 text-center">
                        {filteredStudents.length} of {students.length} students · {assignedStudents.length} selected
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Questions ── */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">
                Questions <span className="text-white/30 font-normal">({questions.length})</span>
              </h2>
            </div>
            <button
              onClick={addQuestion}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Add
            </button>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {questions.map((q, qIndex) => (
              <div key={q.id} className="p-4 space-y-3">
                {/* Question header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-emerald-400">{qIndex + 1}</span>
                    </div>
                    <span className="text-xs text-white/40">Question {qIndex + 1}</span>
                  </div>
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(qIndex)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/8 hover:bg-red-500/15 border border-red-500/15 text-red-400/60 hover:text-red-400 text-xs transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  )}
                </div>

                {/* Question text */}
                <textarea
                  value={q.text}
                  onChange={e => updateQuestion(qIndex, 'text', e.target.value)}
                  rows={2}
                  placeholder={`Type question ${qIndex + 1} here...`}
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
                />

                {/* Options — 1 col mobile, 2 col sm+ */}
                <div>
                  <p className="text-xs text-white/35 mb-2">Answer Options</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIndex) => (
                      <div
                        key={oIndex}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors ${
                          q.correctOption === oIndex
                            ? 'bg-emerald-500/8 border-emerald-500/30'
                            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          q.correctOption === oIndex ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.04] text-white/30'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </div>
                        <input
                          type="text"
                          value={opt}
                          onChange={e => updateOption(qIndex, oIndex, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none min-w-0"
                        />
                        {q.correctOption === oIndex && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct answer + marks */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-white/35 mb-1.5 block">Correct Answer</label>
                    <select
                      value={q.correctOption}
                      onChange={e => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {q.options.map((_, i) => (
                        <option key={i} value={i} className="bg-[#0f1012]">Option {String.fromCharCode(65 + i)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/35 mb-1.5 block">Marks</label>
                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                      <input
                        type="number"
                        value={q.marks}
                        onChange={e => updateQuestion(qIndex, 'marks', Number(e.target.value))}
                        min="1"
                        className="w-full sm:w-24 pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add question footer */}
          <div className="p-4 border-t border-white/[0.04]">
            <button
              onClick={addQuestion}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/[0.1] hover:border-emerald-500/30 text-white/30 hover:text-emerald-400 text-sm transition-all hover:bg-emerald-500/5"
            >
              <PlusCircle className="w-4 h-4" />
              Add another question
            </button>
          </div>
        </div>

        {/* Bottom publish bar */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60 font-medium">{questions.length} question{questions.length !== 1 ? 's' : ''} ready</p>
            <p className="text-xs text-white/30 mt-0.5">{totalMarks} total marks · {duration} min</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm font-semibold transition-all disabled:opacity-40"
          >
            <Save className="w-4 h-4 shrink-0" />
            {saving ? 'Publishing…' : 'Publish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}