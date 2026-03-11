

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { 
//   Save, Trash2, ArrowLeft, PlusCircle,
//   HelpCircle, Clock, FileText, CheckCircle,
//   ChevronDown, ChevronUp, Copy, AlertCircle
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
//   title: string;
//   description: string;
//   duration: number;
//   totalMarks: number;
//   questions: Question[];
//   createdBy: string;
//   createdByName: string;
//   createdAt: string;
// }

// const G = '#10b981';
// const GB = 'rgba(16,185,129,0.1)';
// const GBORDER = 'rgba(16,185,129,0.18)';
// const CARD = 'rgba(255,255,255,0.025)';
// const BORDER = 'rgba(255,255,255,0.06)';
// const inputBase = {
//   background: 'rgba(255,255,255,0.04)',
//   border: '1px solid rgba(255,255,255,0.08)',
//   borderRadius: '0.75rem',
//   color: '#fff',
//   fontSize: '0.875rem',
//   outline: 'none',
//   width: '100%',
// };

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

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const id = params?.id as string;
//     if (!id) { setError('Invalid quiz ID'); setLoading(false); return; }
//     fetchQuiz(id);
//   }, [params?.id, router]);

//   const fetchQuiz = async (id: string) => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/quizzes/${id}`);
//       const data = await res.json();
//       if (!res.ok || !data.success) { setError(data.error || 'Quiz not found!'); setLoading(false); return; }
//       const quizData = data.data;
//       setQuiz(quizData);
//       setTitle(quizData.title || '');
//       setDescription(quizData.description || '');
//       setDuration(quizData.duration || 30);
//       const formatted = (quizData.questions || []).map((q: any, i: number) => ({
//         id: q.id || `q_${Date.now()}_${i}`,
//         text: q.text || '',
//         options: q.options || ['', '', '', ''],
//         correctOption: q.correctOption ?? q.correctAnswer ?? 0,
//         marks: q.marks || 10
//       }));
//       setQuestions(formatted);
//       setExpandedQuestions(new Set(formatted.map((_: any, i: number) => i)));
//       setHasChanges(false);
//     } catch { setError('Error loading quiz'); }
//     finally { setLoading(false); }
//   };

//   const toggleQuestion = (i: number) => {
//     setExpandedQuestions(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });
//   };
//   const toggleAll = () => {
//     setExpandedQuestions(prev => prev.size === questions.length ? new Set() : new Set(questions.map((_, i) => i)));
//   };

//   const addQuestion = () => {
//     const newQ: Question = { id: `q_${Date.now()}`, text: '', options: ['', '', '', ''], correctOption: 0, marks: 10 };
//     setQuestions(prev => [...prev, newQ]);
//     setExpandedQuestions(prev => { const s = new Set(prev); s.add(questions.length); return s; });
//     setHasChanges(true);
//   };

//   const removeQuestion = (i: number) => {
//     setQuestions(prev => prev.filter((_, idx) => idx !== i));
//     setHasChanges(true);
//   };

//   const duplicateQuestion = (i: number) => {
//     const copy = { ...questions[i], id: `q_${Date.now()}` };
//     setQuestions(prev => { const arr = [...prev]; arr.splice(i + 1, 0, copy); return arr; });
//     setHasChanges(true);
//   };

//   const updateQuestion = (i: number, field: keyof Question, val: any) => {
//     setQuestions(prev => prev.map((q, idx) => idx === i ? { ...q, [field]: val } : q));
//     setHasChanges(true);
//   };

//   const updateOption = (qi: number, oi: number, val: string) => {
//     setQuestions(prev => prev.map((q, idx) => idx === qi ? { ...q, options: q.options.map((o, j) => j === oi ? val : o) } : q));
//     setHasChanges(true);
//   };

//   const moveQ = (i: number, dir: 'up' | 'down') => {
//     const j = dir === 'up' ? i - 1 : i + 1;
//     if (j < 0 || j >= questions.length) return;
//     setQuestions(prev => { const a = [...prev]; [a[i], a[j]] = [a[j], a[i]]; return a; });
//     setHasChanges(true);
//   };

//   const handleSave = async () => {
//     const id = params?.id as string;
//     if (!id) { showToast.error('Quiz ID not found'); return; }
//     if (!title.trim()) { showToast.error('Please enter a quiz title'); return; }
//     for (let i = 0; i < questions.length; i++) {
//       if (!questions[i].text?.trim()) { showToast.error(`Question ${i + 1} is empty`); return; }
//       for (let j = 0; j < questions[i].options.length; j++) {
//         if (!questions[i].options[j]?.trim()) { showToast.error(`Option ${j + 1} of Q${i + 1} is empty`); return; }
//       }
//     }
//     setSaving(true);
//     try {
//       const formattedQ = questions.map(q => ({ text: q.text, options: q.options, correctAnswer: q.correctOption, marks: q.marks }));
//       const totalMarks = formattedQ.reduce((s, q) => s + (q.marks || 0), 0);
//       const res = await fetch(`/api/quizzes/${id}`, {
//         method: 'PUT', headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: title.trim(), description: description.trim(), duration: Number(duration), totalMarks, questions: formattedQ })
//       });
//       const data = await res.json();
//       if (res.ok && data.success) { showToast.success('Quiz updated successfully!'); setHasChanges(false); setTimeout(() => router.push('/teacher/dashboard'), 1500); }
//       else { showToast.error(data.error || 'Failed to update quiz'); setSaving(false); }
//     } catch { showToast.error('Network error. Please try again.'); setSaving(false); }
//   };

//   const handleDelete = async () => {
//     const id = params?.id as string;
//     if (!id) { showToast.error('Quiz ID not found'); return; }
//     setDeleting(true);
//     try {
//       const res = await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (res.ok && data.success) { showToast.success('Quiz deleted!'); setTimeout(() => router.push('/teacher/dashboard'), 1500); }
//       else { showToast.error(data.error || 'Failed to delete'); setDeleting(false); setShowDeleteConfirm(false); }
//     } catch { showToast.error('Network error'); setDeleting(false); setShowDeleteConfirm(false); }
//   };

//   const totalMarks = questions.reduce((s, q) => s + (Number(q.marks) || 0), 0);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: '#070709' }}>
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-10 h-10 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(16,185,129,0.2)', borderTopColor: G }} />
//           <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Loading</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: '#070709' }}>
//         <div className="text-center">
//           <AlertCircle className="w-10 h-10 mx-auto mb-4" style={{ color: '#f87171' }} />
//           <p className="text-white mb-4">{error || 'Quiz not found!'}</p>
//           <button onClick={() => router.push('/teacher/dashboard')}
//             className="px-4 py-2 rounded-xl text-sm font-medium"
//             style={{ background: GB, color: G, border: `1px solid ${GBORDER}` }}>
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen" style={{ background: '#070709', fontFamily: "'DM Sans','Inter',sans-serif" }}>
//       <Toaster position="top-right" />

//       {/* Sticky Header */}
//       <header className="sticky top-0 z-30 backdrop-blur-xl"
//         style={{ background: 'rgba(7,7,9,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//         <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
//           <button onClick={() => router.back()}
//             className="p-2 rounded-xl transition-all shrink-0"
//             style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}
//             onMouseEnter={e => e.currentTarget.style.color = '#fff'}
//             onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
//             <ArrowLeft className="w-4 h-4" />
//           </button>

//           <div className="flex-1 min-w-0">
//             <h1 className="text-sm font-semibold text-white truncate">Edit Quiz</h1>
//             <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.25)' }}>{quiz.title}</p>
//           </div>

//           <div className="flex items-center gap-2 shrink-0">
//             {hasChanges && (
//               <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: G }} title="Unsaved changes" />
//             )}
//             <button onClick={() => setShowDeleteConfirm(true)}
//               className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all"
//               style={{ color: '#f87171', border: '1px solid rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.06)' }}
//               onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.12)'}
//               onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.06)'}>
//               <Trash2 className="w-3.5 h-3.5" />
//               <span className="hidden sm:block">Delete</span>
//             </button>
//             <button onClick={handleSave} disabled={saving || !hasChanges}
//               className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
//               style={{ background: `linear-gradient(135deg,${G},#34d399)`, color: '#fff', boxShadow: hasChanges ? `0 4px 16px rgba(16,185,129,0.25)` : 'none' }}>
//               <Save className="w-3.5 h-3.5" />
//               {saving ? 'Saving...' : 'Save'}
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

//         {/* Quiz Details Card */}
//         <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
//           <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
//             <FileText className="w-4 h-4" style={{ color: G }} />
//             Quiz Details
//           </h2>

//           <div className="space-y-3">
//             <div>
//               <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Title *</label>
//               <input type="text" value={title} placeholder="Quiz title"
//                 onChange={e => { setTitle(e.target.value); setHasChanges(true); }}
//                 style={{ ...inputBase, padding: '0.625rem 0.875rem' }}
//                 onFocus={e => e.currentTarget.style.borderColor = GBORDER}
//                 onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
//             </div>

//             <div>
//               <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Description</label>
//               <textarea value={description} rows={3} placeholder="Quiz description (optional)"
//                 onChange={e => { setDescription(e.target.value); setHasChanges(true); }}
//                 style={{ ...inputBase, padding: '0.625rem 0.875rem', resize: 'vertical', minHeight: '80px' }}
//                 onFocus={e => e.currentTarget.style.borderColor = GBORDER}
//                 onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex-1">
//                 <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
//                   <Clock className="w-3 h-3 inline mr-1" />Duration (minutes)
//                 </label>
//                 <input type="number" value={duration} min="1"
//                   onChange={e => { setDuration(Number(e.target.value)); setHasChanges(true); }}
//                   style={{ ...inputBase, padding: '0.625rem 0.875rem', width: 'auto', minWidth: '120px' }}
//                   onFocus={e => e.currentTarget.style.borderColor = GBORDER}
//                   onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
//               </div>
//               <div className="text-right">
//                 <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Total Marks</p>
//                 <p className="text-xl font-bold" style={{ color: G }}>{totalMarks}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Questions Section */}
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-sm font-semibold text-white flex items-center gap-2">
//               <HelpCircle className="w-4 h-4" style={{ color: G }} />
//               Questions
//               <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: GB, color: G }}>
//                 {questions.length}
//               </span>
//             </h2>
//             <div className="flex items-center gap-2">
//               <button onClick={toggleAll}
//                 className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
//                 style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}
//                 onMouseEnter={e => e.currentTarget.style.color = '#fff'}
//                 onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
//                 {expandedQuestions.size === questions.length ? 'Collapse All' : 'Expand All'}
//               </button>
//               <button onClick={addQuestion}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
//                 style={{ background: GB, color: G, border: `1px solid ${GBORDER}` }}
//                 onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.15)'}
//                 onMouseLeave={e => e.currentTarget.style.background = GB}>
//                 <PlusCircle className="w-3.5 h-3.5" />
//                 Add Question
//               </button>
//             </div>
//           </div>

//           <div className="space-y-3">
//             {questions.map((q, i) => (
//               <div key={q.id} className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
//                 {/* Question Header */}
//                 <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
//                   style={{ borderBottom: expandedQuestions.has(i) ? `1px solid ${BORDER}` : 'none' }}
//                   onClick={() => toggleQuestion(i)}>
//                   <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
//                     style={{ background: GB, color: G }}>{i + 1}</div>
//                   <p className="flex-1 text-sm truncate" style={{ color: q.text ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>
//                     {q.text || 'New Question'}
//                   </p>
//                   <div className="flex items-center gap-1 shrink-0">
//                     <button onClick={e => { e.stopPropagation(); moveQ(i, 'up'); }} disabled={i === 0}
//                       className="p-1.5 rounded-lg transition-all disabled:opacity-20"
//                       style={{ color: 'rgba(255,255,255,0.3)' }}
//                       onMouseEnter={e => { if (i !== 0) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
//                       onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
//                       <ChevronUp className="w-3.5 h-3.5" />
//                     </button>
//                     <button onClick={e => { e.stopPropagation(); moveQ(i, 'down'); }} disabled={i === questions.length - 1}
//                       className="p-1.5 rounded-lg transition-all disabled:opacity-20"
//                       style={{ color: 'rgba(255,255,255,0.3)' }}
//                       onMouseEnter={e => { if (i !== questions.length - 1) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
//                       onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
//                       <ChevronDown className="w-3.5 h-3.5" />
//                     </button>
//                     {expandedQuestions.has(i) ? <ChevronUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />}
//                   </div>
//                 </div>

//                 {/* Question Body */}
//                 {expandedQuestions.has(i) && (
//                   <div className="p-4 space-y-4">
//                     {/* Question Text */}
//                     <div>
//                       <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Question Text *</label>
//                       <textarea value={q.text} rows={2} placeholder="Enter your question here..."
//                         onChange={e => updateQuestion(i, 'text', e.target.value)}
//                         style={{ ...inputBase, padding: '0.625rem 0.875rem', resize: 'vertical' }}
//                         onFocus={e => e.currentTarget.style.borderColor = GBORDER}
//                         onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
//                     </div>

//                     {/* Options */}
//                     <div>
//                       <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Answer Options</label>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                         {q.options.map((opt, oi) => (
//                           <div key={oi} className="flex items-center gap-2">
//                             <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
//                               style={{ background: q.correctOption === oi ? GB : 'rgba(255,255,255,0.04)', color: q.correctOption === oi ? G : 'rgba(255,255,255,0.3)', border: `1px solid ${q.correctOption === oi ? GBORDER : 'rgba(255,255,255,0.08)'}` }}>
//                               {String.fromCharCode(65 + oi)}
//                             </div>
//                             <input type="text" value={opt} placeholder={`Option ${oi + 1}`}
//                               onChange={e => updateOption(i, oi, e.target.value)}
//                               style={{ ...inputBase, padding: '0.5rem 0.75rem', flex: 1 }}
//                               onFocus={e => e.currentTarget.style.borderColor = GBORDER}
//                               onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Correct Answer + Marks */}
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                       <div className="flex-1">
//                         <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
//                           <CheckCircle className="w-3 h-3 inline mr-1" style={{ color: G }} />
//                           Correct Answer
//                         </label>
//                         <select value={q.correctOption} onChange={e => updateQuestion(i, 'correctOption', Number(e.target.value))}
//                           style={{ ...inputBase, padding: '0.5rem 0.75rem', cursor: 'pointer', width: 'auto', minWidth: '160px' }}>
//                           {q.options.map((_, oi) => (
//                             <option key={oi} value={oi} style={{ background: '#1a1a2e' }}>
//                               Option {String.fromCharCode(65 + oi)}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Marks</label>
//                         <input type="number" value={q.marks} min="1"
//                           onChange={e => updateQuestion(i, 'marks', Number(e.target.value))}
//                           style={{ ...inputBase, padding: '0.5rem 0.75rem', width: '80px' }}
//                           onFocus={e => e.currentTarget.style.borderColor = GBORDER}
//                           onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'} />
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-2 pt-1">
//                       <button onClick={() => duplicateQuestion(i)}
//                         className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
//                         style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}
//                         onMouseEnter={e => e.currentTarget.style.color = '#fff'}
//                         onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
//                         <Copy className="w-3 h-3" /> Duplicate
//                       </button>
//                       <button onClick={() => removeQuestion(i)}
//                         className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
//                         style={{ color: '#f87171', border: '1px solid rgba(239,68,68,0.15)' }}
//                         onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
//                         onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
//                         <Trash2 className="w-3 h-3" /> Remove
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Add question button at bottom */}
//             {questions.length > 0 && (
//               <button onClick={addQuestion}
//                 className="w-full py-3 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2"
//                 style={{ border: `1px dashed rgba(16,185,129,0.2)`, color: 'rgba(16,185,129,0.5)', background: 'transparent' }}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor = GBORDER; e.currentTarget.style.color = G; e.currentTarget.style.background = GB; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)'; e.currentTarget.style.color = 'rgba(16,185,129,0.5)'; e.currentTarget.style.background = 'transparent'; }}>
//                 <PlusCircle className="w-4 h-4" />
//                 Add Question
//               </button>
//             )}

//             {questions.length === 0 && (
//               <div className="text-center py-16 rounded-2xl" style={{ border: `1px dashed rgba(255,255,255,0.06)` }}>
//                 <HelpCircle className="w-10 h-10 mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.1)' }} />
//                 <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>No questions yet</p>
//                 <button onClick={addQuestion}
//                   className="px-4 py-2 rounded-xl text-sm font-medium"
//                   style={{ background: GB, color: G, border: `1px solid ${GBORDER}` }}>
//                   Add First Question
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom Save bar */}
//         <div className="sticky bottom-4 flex justify-end">
//           <div className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl"
//             style={{ background: 'rgba(7,7,9,0.9)', border: `1px solid rgba(255,255,255,0.07)` }}>
//             <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
//               {questions.length} questions · {totalMarks} marks
//             </span>
//             <button onClick={handleSave} disabled={saving || !hasChanges}
//               className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
//               style={{ background: `linear-gradient(135deg,${G},#34d399)`, color: '#fff' }}>
//               <Save className="w-4 h-4" />
//               {saving ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirm Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
//           style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
//           onClick={() => setShowDeleteConfirm(false)}>
//           <div className="w-full max-w-sm rounded-2xl p-6"
//             style={{ background: '#0d1117', border: '1px solid rgba(239,68,68,0.2)' }}
//             onClick={e => e.stopPropagation()}>
//             <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
//               style={{ background: 'rgba(239,68,68,0.1)' }}>
//               <Trash2 className="w-6 h-6" style={{ color: '#f87171' }} />
//             </div>
//             <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
//             <p className="text-sm text-center mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
//               "{quiz?.title}" will be permanently deleted. This cannot be undone.
//             </p>
//             <div className="flex gap-3">
//               <button onClick={() => setShowDeleteConfirm(false)}
//                 className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
//                 style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>
//                 Cancel
//               </button>
//               <button onClick={handleDelete} disabled={deleting}
//                 className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
//                 style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}>
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
  Save, Trash2, ArrowLeft, PlusCircle, HelpCircle,
  Clock, FileText, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, Copy, GraduationCap
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

  // ── Load quiz ──────────────────────────────────────────────────
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const id = params?.id as string;
    if (!id) { setError('Invalid quiz ID'); setLoading(false); return; }
    fetchQuiz(id);
  }, [params?.id, router]);

  const fetchQuiz = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/quizzes/${id}`);
      const data = await res.json();
      if (!res.ok || !data.success) { setError(data.error || 'Quiz not found!'); setLoading(false); return; }
      const quizData = data.data;
      setQuiz(quizData);
      setTitle(quizData.title || '');
      setDescription(quizData.description || '');
      setDuration(quizData.duration || 30);
      const formatted = (quizData.questions || []).map((q: any, i: number) => ({
        id: q.id || `q_${Date.now()}_${i}_${Math.random()}`,
        text: q.text || '',
        options: q.options || ['', '', '', ''],
        correctOption: q.correctOption ?? q.correctAnswer ?? 0,
        marks: q.marks || 10,
      }));
      setQuestions(formatted);
      setExpandedQuestions(new Set(formatted.map((_: any, i: number) => i)));
      setHasChanges(false);
      setLoading(false);
    } catch {
      setError('Error loading quiz');
      setLoading(false);
    }
  };

  // ── Question helpers (logic untouched) ────────────────────────
  const toggleQuestion = (i: number) => {
    setExpandedQuestions(prev => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });
  };

  const toggleAllQuestions = () => {
    setExpandedQuestions(
      expandedQuestions.size === questions.length
        ? new Set()
        : new Set(questions.map((_, i) => i))
    );
  };

  const addQuestion = () => {
    const q: Question = {
      id: `q_${Date.now()}_${questions.length}_${Math.random()}`,
      text: '', options: ['', '', '', ''], correctOption: 0, marks: 10,
    };
    setQuestions([...questions, q]);
    setExpandedQuestions(prev => new Set([...prev, questions.length]));
    setHasChanges(true);
    showToast.success('New question added');
  };

  const duplicateQuestion = (index: number) => {
    const q = { ...questions[index], id: `q_${Date.now()}_${questions.length}_${Math.random()}` };
    const updated = [...questions];
    updated.splice(index + 1, 0, q);
    setQuestions(updated);
    setExpandedQuestions(prev => new Set([...prev, index + 1]));
    setHasChanges(true);
    showToast.success('Question duplicated');
  };

  const removeQuestion = (index: number) => {
    if (questions.length <= 1) { showToast.error('Quiz must have at least one question'); return; }
    if (confirm('Delete this question?')) {
      setQuestions(questions.filter((_, i) => i !== index));
      setExpandedQuestions(prev => { const s = new Set(prev); s.delete(index); return s; });
      setHasChanges(true);
      showToast.success('Question removed');
    }
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    setQuestions(prev => { const u = [...prev]; u[index] = { ...u[index], [field]: value }; return u; });
    setHasChanges(true);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions(prev => {
      const u = [...prev];
      if (!u[qIndex].options) u[qIndex].options = ['', '', '', ''];
      u[qIndex].options[oIndex] = value;
      return u;
    });
    setHasChanges(true);
  };

  const moveQuestionUp = (index: number) => {
    if (index === 0) return;
    setQuestions(prev => { const u = [...prev]; [u[index-1], u[index]] = [u[index], u[index-1]]; return u; });
    setExpandedQuestions(prev => {
      const s = new Set(prev);
      if (s.has(index)) { s.delete(index); s.add(index-1); }
      return s;
    });
    setHasChanges(true);
  };

  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    setQuestions(prev => { const u = [...prev]; [u[index], u[index+1]] = [u[index+1], u[index]]; return u; });
    setExpandedQuestions(prev => {
      const s = new Set(prev);
      if (s.has(index)) { s.delete(index); s.add(index+1); }
      return s;
    });
    setHasChanges(true);
  };

  // ── Save ──────────────────────────────────────────────────────
  const handleSave = async () => {
    const id = params?.id as string;
    if (!id) { showToast.error('Quiz ID not found'); return; }
    if (!title.trim()) { showToast.error('Please enter a quiz title'); return; }
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text?.trim()) { showToast.error(`Question ${i+1} is empty`); return; }
      for (let j = 0; j < (questions[i].options || []).length; j++) {
        if (!questions[i].options[j]?.trim()) { showToast.error(`Option ${j+1} of Question ${i+1} is empty`); return; }
      }
    }
    setSaving(true);
    try {
      const formattedQuestions = questions.map(q => ({
        text: q.text, options: q.options,
        correctAnswer: q.correctOption, marks: q.marks,
      }));
      const totalMarks = formattedQuestions.reduce((s, q) => s + (q.marks || 0), 0);
      const res = await fetch(`/api/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), duration: Number(duration), totalMarks, questions: formattedQuestions }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast.success('Quiz updated successfully! 🎉');
        setHasChanges(false);
        setTimeout(() => router.push('/teacher/dashboard'), 1500);
      } else {
        showToast.error(data.error || 'Failed to update quiz');
        setSaving(false);
      }
    } catch {
      showToast.error('Network error. Please try again.');
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────
  const handleDelete = async () => {
    const id = params?.id as string;
    if (!id) { showToast.error('Quiz ID not found'); return; }
    setDeleting(true);
    try {
      const res = await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast.success('Quiz deleted successfully!');
        setTimeout(() => router.push('/teacher/dashboard'), 1500);
      } else {
        showToast.error(data.error || 'Failed to delete quiz');
        setDeleting(false);
        setShowDeleteConfirm(false);
      }
    } catch {
      showToast.error('Network error. Please try again.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const totalMarks = questions.reduce((s, q) => s + (Number(q.marks) || 0), 0);

  // ── Loading state ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="flex gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────
  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
        <div className="text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 max-w-sm w-full">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <p className="text-white/70 mb-5 text-sm">{error || 'Quiz not found!'}</p>
          <button
            onClick={() => router.push('/teacher/dashboard')}
            className="px-5 py-2.5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/25 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ── Main UI ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#070709] text-white" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-emerald-600/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-teal-600/4 rounded-full blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-semibold text-white/80">Edit Quiz</span>
                {hasChanges && (
                  <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded-full">
                    unsaved
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/35 rounded-xl text-red-400 text-xs font-medium transition-all"
            >
              <Trash2 className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Delete</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Save className="w-3.5 h-3.5 shrink-0" />
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 pb-20 space-y-4">

        {/* ── Quiz title + stats bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">{quiz.title}</h1>
            <p className="text-xs text-white/30 mt-0.5">
              {questions.length} question{questions.length !== 1 ? 's' : ''} · {totalMarks} total marks · {duration} min
            </p>
          </div>
          {hasChanges && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400/80">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Unsaved changes
            </div>
          )}
        </div>

        {/* ── Quiz Details Card ── */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Quiz Details</h2>
          </div>
          <div className="p-4 space-y-3">
            {/* Title */}
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Quiz Title *</label>
              <input
                type="text"
                value={title}
                onChange={e => { setTitle(e.target.value); setHasChanges(true); }}
                placeholder="Enter quiz title..."
                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
              />
            </div>
            {/* Description */}
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Description</label>
              <textarea
                value={description}
                onChange={e => { setDescription(e.target.value); setHasChanges(true); }}
                placeholder="Brief description of the quiz..."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
              />
            </div>
            {/* Duration */}
            <div className="flex items-center gap-3">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Duration (minutes)</label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                    <input
                      type="number"
                      value={duration}
                      onChange={e => { setDuration(Number(e.target.value)); setHasChanges(true); }}
                      min="1"
                      className="w-28 pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                  <span className="text-xs text-white/25">minutes</span>
                </div>
              </div>
              {/* Total marks badge */}
              <div className="ml-auto text-right">
                <p className="text-xs text-white/30 mb-1">Total Marks</p>
                <p className="text-lg font-bold text-emerald-400">{totalMarks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Questions Section ── */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">
                Questions <span className="text-white/30 font-normal">({questions.length})</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAllQuestions}
                className="text-xs text-white/35 hover:text-white/60 transition-colors px-2 py-1 rounded-lg hover:bg-white/[0.04]"
              >
                {expandedQuestions.size === questions.length ? 'Collapse all' : 'Expand all'}
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

          {/* Questions list */}
          <div className="divide-y divide-white/[0.04]">
            {questions.map((q, index) => (
              <div key={q.id}>
                {/* Question header row */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors select-none"
                  onClick={() => toggleQuestion(index)}
                >
                  {/* Number badge */}
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-emerald-400">{index + 1}</span>
                  </div>

                  {/* Question text preview */}
                  <p className="flex-1 text-sm text-white/70 truncate min-w-0">
                    {q.text || <span className="text-white/25 italic">Empty question</span>}
                  </p>

                  {/* Marks badge */}
                  <span className="text-[10px] px-2 py-0.5 bg-white/[0.04] text-white/35 rounded-full shrink-0 hidden sm:block">
                    {q.marks}pts
                  </span>

                  {/* Move + expand controls */}
                  <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => moveQuestionUp(index)}
                      disabled={index === 0}
                      className="p-1 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveQuestionDown(index)}
                      disabled={index === questions.length - 1}
                      className="p-1 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Expand icon */}
                  <div className="text-white/20 shrink-0">
                    {expandedQuestions.has(index)
                      ? <ChevronUp className="w-4 h-4" />
                      : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded question body */}
                {expandedQuestions.has(index) && (
                  <div className="px-4 pb-4 space-y-4 bg-white/[0.01]">
                    {/* Question text */}
                    <div>
                      <label className="text-xs text-white/35 mb-1.5 block">Question Text *</label>
                      <textarea
                        value={q.text}
                        onChange={e => updateQuestion(index, 'text', e.target.value)}
                        onClick={e => e.stopPropagation()}
                        placeholder="Type your question here..."
                        rows={2}
                        className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Options grid — 1 col on mobile, 2 on sm+ */}
                    <div>
                      <label className="text-xs text-white/35 mb-2 block">Answer Options</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIndex) => (
                          <div
                            key={optIndex}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors ${
                              q.correctOption === optIndex
                                ? 'bg-emerald-500/8 border-emerald-500/30'
                                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
                            }`}
                          >
                            {/* Option letter */}
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              q.correctOption === optIndex
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-white/[0.04] text-white/30'
                            }`}>
                              {String.fromCharCode(65 + optIndex)}
                            </div>
                            <input
                              type="text"
                              value={opt}
                              onChange={e => updateOption(index, optIndex, e.target.value)}
                              onClick={e => e.stopPropagation()}
                              placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none min-w-0"
                            />
                            {q.correctOption === optIndex && (
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
                          onChange={e => updateQuestion(index, 'correctOption', Number(e.target.value))}
                          onClick={e => e.stopPropagation()}
                          className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          {q.options.map((_, i) => (
                            <option key={i} value={i} className="bg-[#0f1012]">
                              Option {String.fromCharCode(65 + i)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/35 mb-1.5 block">Marks</label>
                        <input
                          type="number"
                          value={q.marks}
                          onChange={e => updateQuestion(index, 'marks', Number(e.target.value))}
                          onClick={e => e.stopPropagation()}
                          min="1"
                          className="w-full sm:w-24 px-3 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Question actions */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => duplicateQuestion(index)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Duplicate
                      </button>
                      <button
                        onClick={() => removeQuestion(index)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/8 hover:bg-red-500/15 border border-red-500/15 hover:border-red-500/25 text-red-400/70 hover:text-red-400 text-xs transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add question footer button */}
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

        {/* ── Floating save bar (mobile) ── */}
        {hasChanges && (
          <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
            <div className="flex items-center gap-3 bg-[#0f1012]/95 border border-emerald-500/20 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-2xl shadow-black/50">
              <div className="flex items-center gap-1.5 flex-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs text-white/50">Unsaved changes</span>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/20 border border-emerald-500/35 text-emerald-400 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="bg-[#0f0f12] border border-white/[0.08] rounded-t-3xl sm:rounded-2xl p-6 w-full sm:max-w-sm shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-5 sm:hidden" />
            <div className="w-11 h-11 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-base font-semibold text-white text-center mb-2">Delete Quiz?</h3>
            <p className="text-sm text-white/40 text-center mb-6">
              "<span className="text-white/60">{quiz?.title}</span>" will be permanently deleted along with all results.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 text-sm hover:bg-white/[0.08] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-500/15 border border-red-500/25 rounded-xl text-red-400 text-sm hover:bg-red-500/25 transition-all disabled:opacity-50 font-medium"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}