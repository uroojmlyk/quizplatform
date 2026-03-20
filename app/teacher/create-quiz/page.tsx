// 'use client';




// import { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   PlusCircle, Trash2, ArrowLeft, Save, Globe, Users, Lock,
//   ChevronDown, ChevronUp, X, GraduationCap, CheckCircle,
//   HelpCircle, FileText, Clock, Star
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { showToast } from '@/lib/toast';

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
//   const fetchedRef = useRef(false);

//   const [saving, setSaving] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [visibility, setVisibility] = useState<'public' | 'private' | 'assigned'>('public');
//   const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
//   const [questions, setQuestions] = useState<Question[]>([
//     { id: `q_${Date.now()}_0`, text: '', options: ['', '', '', ''], correctOption: 0, marks: 10 }
//   ]);

//   const [students, setStudents] = useState<Student[]>([]);
//   const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
//   const [showStudentSelector, setShowStudentSelector] = useState(false);
//   const [studentSearch, setStudentSearch] = useState('');
//   const [teacherId, setTeacherId] = useState('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (!user.id || user.role !== 'teacher') { router.push('/login'); return; }
//     setTeacherId(user.id);
//     if (!fetchedRef.current) { fetchedRef.current = true; fetchStudents(); }
//   }, []);

//   useEffect(() => {
//     setFilteredStudents(
//       studentSearch.trim() === ''
//         ? students
//         : students.filter(s =>
//             s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
//             s.email.toLowerCase().includes(studentSearch.toLowerCase())
//           )
//     );
//   }, [studentSearch, students]);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch('/api/users?role=student');
//       const data = await res.json();
//       if (data.success) {
//         const normalized = data.data.map((s: any) => ({
//           ...s, _id: s._id?.$oid || s._id?.toString() || s._id
//         }));
//         setStudents(normalized);
//         setFilteredStudents(normalized);
//       }
//     } catch {
//       showToast.error('Failed to fetch students');
//     }
//   };

//   const addQuestion = () => {
//     setQuestions(prev => [...prev, {
//       id: `q_${Date.now()}_${prev.length}`,
//       text: '', options: ['', '', '', ''], correctOption: 0, marks: 10
//     }]);
//   };

//   const removeQuestion = (index: number) => {
//     if (questions.length <= 1) { showToast.error('Quiz must have at least one question'); return; }
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

//   const toggleStudent = (id: string) => {
//     setAssignedStudents(prev =>
//       prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
//     );
//   };

//   const selectAllStudents = () => setAssignedStudents(filteredStudents.map(s => s._id));
//   const clearAllStudents = () => setAssignedStudents([]);

//   const validateQuiz = () => {
//     if (!title.trim()) { showToast.error('Please enter a quiz title'); return false; }
//     for (let i = 0; i < questions.length; i++) {
//       if (!questions[i].text.trim()) { showToast.error(`Question ${i + 1} is empty`); return false; }
//       for (let j = 0; j < questions[i].options.length; j++) {
//         if (!questions[i].options[j].trim()) { showToast.error(`Option ${j + 1} of Question ${i + 1} is empty`); return false; }
//       }
//     }
//     if (visibility === 'assigned' && assignedStudents.length === 0) {
//       showToast.error('Please select at least one student'); return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateQuiz()) return;
//     setSaving(true);
//     const toastId = showToast.loading('Creating quiz...');
//     try {
//       const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
//       const res = await fetch('/api/quizzes/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title, description, duration, questions, totalMarks,
//           createdBy: teacherId,
//           createdByName: JSON.parse(localStorage.getItem('user') || '{}').name,
//           visibility,
//           assignedTo: visibility === 'assigned' ? assignedStudents : []
//         })
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.dismiss(toastId);
//         showToast.success('Quiz created!');
//         setTimeout(() => router.push('/teacher/dashboard'), 1200);
//       } else {
//         toast.dismiss(toastId);
//         showToast.error(data.error || 'Failed to create quiz');
//       }
//     } catch {
//       toast.dismiss(toastId);
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const totalMarks = questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);

//   return (
//     <div className="min-h-screen bg-[#070709] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>

//       {/* Ambient bg */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-emerald-600/5 rounded-full blur-[130px]" />
//         <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-teal-600/4 rounded-full blur-[100px]" />
//       </div>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
//         <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2.5 min-w-0">
//             <button
//               onClick={() => router.back()}
//               className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all shrink-0"
//             >
//               <ArrowLeft className="w-4 h-4" />
//             </button>
//             <div className="flex items-center gap-2 min-w-0">
//               <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
//                 <GraduationCap className="w-3 h-3 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-white/80 truncate">Create Quiz</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 shrink-0">
//             <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-xl">
//               <HelpCircle className="w-3.5 h-3.5 text-white/25" />
//               <span className="text-xs text-white/30">{questions.length} Q · {totalMarks} marks</span>
//             </div>
//             <button
//               onClick={handleSubmit}
//               disabled={saving}
//               className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-semibold transition-all disabled:opacity-40"
//             >
//               <Save className="w-3.5 h-3.5 shrink-0" />
//               {saving ? 'Saving…' : 'Publish Quiz'}
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-4xl mx-auto px-4 py-5 pb-10 space-y-4">

//         {/* Page title row */}
//         <div>
//           <h1 className="text-xl sm:text-2xl font-bold text-white">New Quiz</h1>
//           <p className="text-xs text-white/30 mt-1">{questions.length} question{questions.length !== 1 ? 's' : ''} · {totalMarks} total marks</p>
//         </div>

//         {/* ── Quiz Details ── */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
//             <FileText className="w-3.5 h-3.5 text-emerald-400" />
//             <h2 className="text-sm font-semibold text-white">Quiz Details</h2>
//           </div>
//           <div className="p-4 space-y-3">
//             <div>
//               <label className="text-xs text-white/40 mb-1.5 block">Quiz Title *</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={e => setTitle(e.target.value)}
//                 placeholder="e.g., JavaScript Fundamentals"
//                 className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
//               />
//             </div>
//             <div>
//               <label className="text-xs text-white/40 mb-1.5 block">Description</label>
//               <textarea
//                 value={description}
//                 onChange={e => setDescription(e.target.value)}
//                 rows={3}
//                 placeholder="Brief description of what this quiz covers..."
//                 className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
//               />
//             </div>
//             <div className="flex items-center gap-3">
//               <div>
//                 <label className="text-xs text-white/40 mb-1.5 block">Duration</label>
//                 <div className="relative flex items-center gap-2">
//                   <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                   <input
//                     type="number"
//                     value={duration}
//                     onChange={e => setDuration(Number(e.target.value))}
//                     min="1"
//                     className="w-28 pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors"
//                   />
//                 </div>
//               </div>
//               <div className="pt-5">
//                 <span className="text-xs text-white/25">minutes</span>
//               </div>
//               <div className="ml-auto text-right">
//                 <p className="text-xs text-white/30 mb-1">Total Marks</p>
//                 <p className="text-xl font-bold text-emerald-400">{totalMarks}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Visibility ── */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
//             <Globe className="w-3.5 h-3.5 text-emerald-400" />
//             <h2 className="text-sm font-semibold text-white">Visibility</h2>
//           </div>
//           <div className="p-4 space-y-2.5">
//             {/* Public */}
//             <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
//               visibility === 'public'
//                 ? 'bg-emerald-500/8 border-emerald-500/30'
//                 : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
//             }`}>
//               <div className="flex items-center gap-3">
//                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//                   visibility === 'public' ? 'bg-emerald-500/15' : 'bg-white/[0.04]'
//                 }`}>
//                   <Globe className={`w-4 h-4 ${visibility === 'public' ? 'text-emerald-400' : 'text-white/30'}`} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-white">Public</p>
//                   <p className="text-xs text-white/35">Visible to all students</p>
//                 </div>
//               </div>
//               <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
//                 visibility === 'public' ? 'border-emerald-500 bg-emerald-500' : 'border-white/20'
//               }`}>
//                 {visibility === 'public' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//               </div>
//               <input type="radio" name="visibility" checked={visibility === 'public'} onChange={() => setVisibility('public')} className="hidden" />
//             </label>

//             {/* Assigned */}
//             <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
//               visibility === 'assigned'
//                 ? 'bg-amber-500/8 border-amber-500/30'
//                 : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
//             }`}>
//               <div className="flex items-center gap-3">
//                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//                   visibility === 'assigned' ? 'bg-amber-500/15' : 'bg-white/[0.04]'
//                 }`}>
//                   <Users className={`w-4 h-4 ${visibility === 'assigned' ? 'text-amber-400' : 'text-white/30'}`} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-white">Assigned Students Only</p>
//                   <p className="text-xs text-white/35">Only visible to selected students</p>
//                 </div>
//               </div>
//               <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
//                 visibility === 'assigned' ? 'border-amber-500 bg-amber-500' : 'border-white/20'
//               }`}>
//                 {visibility === 'assigned' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//               </div>
//               <input type="radio" name="visibility" checked={visibility === 'assigned'} onChange={() => { setVisibility('assigned'); setShowStudentSelector(true); }} className="hidden" />
//             </label>

//             {/* Student selector — shows when assigned */}
//             {visibility === 'assigned' && (
//               <div className="mt-1 pt-3 border-t border-white/[0.05] space-y-3">
//                 {/* Controls */}
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => setShowStudentSelector(!showStudentSelector)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-medium transition-all"
//                   >
//                     {showStudentSelector ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
//                     {showStudentSelector ? 'Hide' : 'Show'} Student List
//                   </button>
//                   <div className="flex items-center gap-3 text-xs">
//                     <button onClick={selectAllStudents} className="text-emerald-400 hover:text-emerald-300 transition-colors">Select All</button>
//                     <span className="text-white/15">|</span>
//                     <button onClick={clearAllStudents} className="text-red-400/70 hover:text-red-400 transition-colors">Clear</button>
//                   </div>
//                 </div>

//                 {/* Selected student tags */}
//                 {assignedStudents.length > 0 && (
//                   <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
//                     <p className="text-xs text-white/35 mb-2">{assignedStudents.length} student{assignedStudents.length !== 1 ? 's' : ''} selected</p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {assignedStudents.map(id => {
//                         const s = students.find(st => st._id === id);
//                         return s ? (
//                           <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs border border-amber-500/20">
//                             {s.name}
//                             <X className="w-3 h-3 cursor-pointer hover:text-amber-300" onClick={() => toggleStudent(id)} />
//                           </span>
//                         ) : null;
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Student dropdown */}
//                 {showStudentSelector && (
//                   <div className="border border-white/[0.06] rounded-xl overflow-hidden">
//                     <div className="p-2.5 border-b border-white/[0.05] relative">
//                       <input
//                         type="text"
//                         value={studentSearch}
//                         onChange={e => setStudentSearch(e.target.value)}
//                         placeholder="Search students..."
//                         className="w-full px-3 py-2 pr-8 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/40"
//                       />
//                       {studentSearch && (
//                         <button onClick={() => setStudentSearch('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50">
//                           <X className="w-3.5 h-3.5" />
//                         </button>
//                       )}
//                     </div>
//                     <div className="max-h-52 overflow-y-auto">
//                       {filteredStudents.length === 0 ? (
//                         <div className="p-5 text-center">
//                           <p className="text-xs text-white/30">No students found</p>
//                         </div>
//                       ) : (
//                         filteredStudents.map(student => {
//                           const isSelected = assignedStudents.includes(student._id);
//                           return (
//                             <div
//                               key={student._id}
//                               onClick={() => toggleStudent(student._id)}
//                               className={`flex items-center justify-between px-4 py-3 border-b border-white/[0.04] cursor-pointer select-none transition-colors ${
//                                 isSelected ? 'bg-amber-500/8' : 'hover:bg-white/[0.02]'
//                               }`}
//                             >
//                               <div className="min-w-0">
//                                 <p className="text-sm text-white truncate">{student.name}</p>
//                                 <p className="text-xs text-white/30 truncate">{student.email}</p>
//                               </div>
//                               <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ml-3 transition-colors ${
//                                 isSelected ? 'border-amber-500 bg-amber-500' : 'border-white/20'
//                               }`}>
//                                 {isSelected && (
//                                   <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                                   </svg>
//                                 )}
//                               </div>
//                             </div>
//                           );
//                         })
//                       )}
//                     </div>
//                     <div className="px-4 py-2 border-t border-white/[0.05] bg-white/[0.01]">
//                       <p className="text-[10px] text-white/25 text-center">
//                         {filteredStudents.length} of {students.length} students · {assignedStudents.length} selected
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Questions ── */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
//               <h2 className="text-sm font-semibold text-white">
//                 Questions <span className="text-white/30 font-normal">({questions.length})</span>
//               </h2>
//             </div>
//             <button
//               onClick={addQuestion}
//               className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium transition-all"
//             >
//               <PlusCircle className="w-3.5 h-3.5" />
//               Add
//             </button>
//           </div>

//           <div className="divide-y divide-white/[0.04]">
//             {questions.map((q, qIndex) => (
//               <div key={q.id} className="p-4 space-y-3">
//                 {/* Question header */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
//                       <span className="text-[10px] font-bold text-emerald-400">{qIndex + 1}</span>
//                     </div>
//                     <span className="text-xs text-white/40">Question {qIndex + 1}</span>
//                   </div>
//                   {questions.length > 1 && (
//                     <button
//                       onClick={() => removeQuestion(qIndex)}
//                       className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/8 hover:bg-red-500/15 border border-red-500/15 text-red-400/60 hover:text-red-400 text-xs transition-all"
//                     >
//                       <Trash2 className="w-3 h-3" />
//                       Remove
//                     </button>
//                   )}
//                 </div>

//                 {/* Question text */}
//                 <textarea
//                   value={q.text}
//                   onChange={e => updateQuestion(qIndex, 'text', e.target.value)}
//                   rows={2}
//                   placeholder={`Type question ${qIndex + 1} here...`}
//                   className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
//                 />

//                 {/* Options — 1 col mobile, 2 col sm+ */}
//                 <div>
//                   <p className="text-xs text-white/35 mb-2">Answer Options</p>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     {q.options.map((opt, oIndex) => (
//                       <div
//                         key={oIndex}
//                         className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors ${
//                           q.correctOption === oIndex
//                             ? 'bg-emerald-500/8 border-emerald-500/30'
//                             : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
//                         }`}
//                       >
//                         <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
//                           q.correctOption === oIndex ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.04] text-white/30'
//                         }`}>
//                           {String.fromCharCode(65 + oIndex)}
//                         </div>
//                         <input
//                           type="text"
//                           value={opt}
//                           onChange={e => updateOption(qIndex, oIndex, e.target.value)}
//                           placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
//                           className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none min-w-0"
//                         />
//                         {q.correctOption === oIndex && (
//                           <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Correct answer + marks */}
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <div className="flex-1">
//                     <label className="text-xs text-white/35 mb-1.5 block">Correct Answer</label>
//                     <select
//                       value={q.correctOption}
//                       onChange={e => updateQuestion(qIndex, 'correctOption', Number(e.target.value))}
//                       className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
//                     >
//                       {q.options.map((_, i) => (
//                         <option key={i} value={i} className="bg-[#0f1012]">Option {String.fromCharCode(65 + i)}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-xs text-white/35 mb-1.5 block">Marks</label>
//                     <div className="relative">
//                       <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                       <input
//                         type="number"
//                         value={q.marks}
//                         onChange={e => updateQuestion(qIndex, 'marks', Number(e.target.value))}
//                         min="1"
//                         className="w-full sm:w-24 pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Add question footer */}
//           <div className="p-4 border-t border-white/[0.04]">
//             <button
//               onClick={addQuestion}
//               className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/[0.1] hover:border-emerald-500/30 text-white/30 hover:text-emerald-400 text-sm transition-all hover:bg-emerald-500/5"
//             >
//               <PlusCircle className="w-4 h-4" />
//               Add another question
//             </button>
//           </div>
//         </div>

//         {/* Bottom publish bar */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-white/60 font-medium">{questions.length} question{questions.length !== 1 ? 's' : ''} ready</p>
//             <p className="text-xs text-white/30 mt-0.5">{totalMarks} total marks · {duration} min</p>
//           </div>
//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm font-semibold transition-all disabled:opacity-40"
//           >
//             <Save className="w-4 h-4 shrink-0" />
//             {saving ? 'Publishing…' : 'Publish Quiz'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlusCircle, Trash2, ArrowLeft, Save, Globe, Users,
  ChevronDown, ChevronUp, X, GraduationCap, CheckCircle,
  HelpCircle, FileText, Clock, Star, Sparkles, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { showToast } from '@/lib/toast';

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

  // ── AI state ──
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(5);
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [aiLoading, setAiLoading] = useState(false);

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

  // ── AI Generate ──
  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) { showToast.error('Please enter a topic'); return; }
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, numberOfQuestions: aiCount, difficulty: aiDifficulty })
      });
      const data = await res.json();
      if (data.success && data.questions?.length > 0) {
        setQuestions(prev => {
          const hasOnlyEmpty = prev.length === 1 && !prev[0].text.trim();
          return hasOnlyEmpty ? data.questions : [...prev, ...data.questions];
        });
        showToast.success(`${data.questions.length} questions generated!`);
        setShowAiPanel(false);
        setAiTopic('');
      } else {
        showToast.error(data.error || 'Failed to generate questions');
      }
    } catch {
      showToast.error('Network error');
    } finally {
      setAiLoading(false);
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
    const toastId = showToast.loading('Creating quiz...');
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
        toast.dismiss(toastId);
        showToast.success('Quiz created!');
        setTimeout(() => router.push('/teacher/dashboard'), 1200);
      } else {
        toast.dismiss(toastId);
        showToast.error(data.error || 'Failed to create quiz');
      }
    } catch {
      toast.dismiss(toastId);
      showToast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const totalMarks = questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);

  return (
    <div className="min-h-screen bg-[#070709] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>

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

        {/* Page title */}
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${visibility === 'public' ? 'bg-emerald-500/15' : 'bg-white/[0.04]'}`}>
                  <Globe className={`w-4 h-4 ${visibility === 'public' ? 'text-emerald-400' : 'text-white/30'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Public</p>
                  <p className="text-xs text-white/35">Visible to all students</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${visibility === 'public' ? 'border-emerald-500 bg-emerald-500' : 'border-white/20'}`}>
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${visibility === 'assigned' ? 'bg-amber-500/15' : 'bg-white/[0.04]'}`}>
                  <Users className={`w-4 h-4 ${visibility === 'assigned' ? 'text-amber-400' : 'text-white/30'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Assigned Students Only</p>
                  <p className="text-xs text-white/35">Only visible to selected students</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${visibility === 'assigned' ? 'border-amber-500 bg-amber-500' : 'border-white/20'}`}>
                {visibility === 'assigned' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input type="radio" name="visibility" checked={visibility === 'assigned'} onChange={() => { setVisibility('assigned'); setShowStudentSelector(true); }} className="hidden" />
            </label>

            {/* Student selector */}
            {visibility === 'assigned' && (
              <div className="mt-1 pt-3 border-t border-white/[0.05] space-y-3">
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
                        <div className="p-5 text-center"><p className="text-xs text-white/30">No students found</p></div>
                      ) : (
                        filteredStudents.map(student => {
                          const isSelected = assignedStudents.includes(student._id);
                          return (
                            <div
                              key={student._id}
                              onClick={() => toggleStudent(student._id)}
                              className={`flex items-center justify-between px-4 py-3 border-b border-white/[0.04] cursor-pointer select-none transition-colors ${isSelected ? 'bg-amber-500/8' : 'hover:bg-white/[0.02]'}`}
                            >
                              <div className="min-w-0">
                                <p className="text-sm text-white truncate">{student.name}</p>
                                <p className="text-xs text-white/30 truncate">{student.email}</p>
                              </div>
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ml-3 transition-colors ${isSelected ? 'border-amber-500 bg-amber-500' : 'border-white/20'}`}>
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

        {/* ── Questions Section ── */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">
                Questions <span className="text-white/30 font-normal">({questions.length})</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {/* ── AI Generate Button ── */}
              <button
                onClick={() => setShowAiPanel(!showAiPanel)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-semibold transition-all ${
                  showAiPanel
                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                    : 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 text-purple-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Generate
              </button>
              <button
                onClick={addQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </div>

          {/* ── AI Panel ── */}
          {showAiPanel && (
            <div className="mx-4 mt-4 p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-purple-300">AI Question Generator</p>
                  <p className="text-[11px] text-white/30">Powered by Groq · Free · Any topic</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Topic / Subject</label>
                  <input
                    type="text"
                    value={aiTopic}
                    onChange={e => setAiTopic(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAiGenerate()}
                    placeholder="e.g. Photosynthesis, World War II, Python loops..."
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-purple-500/20 focus:border-purple-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">Number of Questions</label>
                    <select
                      value={aiCount}
                      onChange={e => setAiCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-white/[0.03] border border-purple-500/20 rounded-xl text-sm text-white focus:outline-none"
                    >
                      {[3, 5, 8, 10, 15].map(n => (
                        <option key={n} value={n} style={{ background: '#0f1012' }}>{n} questions</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">Difficulty</label>
                    <select
                      value={aiDifficulty}
                      onChange={e => setAiDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                      className="w-full px-3 py-2.5 bg-white/[0.03] border border-purple-500/20 rounded-xl text-sm text-white focus:outline-none"
                    >
                      <option value="easy" style={{ background: '#0f1012' }}>Easy</option>
                      <option value="medium" style={{ background: '#0f1012' }}>Medium</option>
                      <option value="hard" style={{ background: '#0f1012' }}>Hard</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={handleAiGenerate}
                    disabled={aiLoading || !aiTopic.trim()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-300 text-sm font-semibold transition-all disabled:opacity-40"
                  >
                    {aiLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Generate Questions</>
                    )}
                  </button>
                  <button
                    onClick={() => { setShowAiPanel(false); setAiTopic(''); }}
                    className="text-xs text-white/30 hover:text-white/50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Questions list */}
          <div className="divide-y divide-white/[0.04]">
            {questions.map((q, qIndex) => (
              <div key={q.id} className="p-4 space-y-3">
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

                <textarea
                  value={q.text}
                  onChange={e => updateQuestion(qIndex, 'text', e.target.value)}
                  rows={2}
                  placeholder={`Type question ${qIndex + 1} here...`}
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
                />

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