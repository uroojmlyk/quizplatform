

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { 
//   Clock, 
//   AlertCircle, 
//   CheckCircle, 
//   ChevronLeft, 
//   ChevronRight,
//   Sparkles,
//   Flag,
//   Circle,
//   CircleDot
// } from 'lucide-react';

// export default function TakeQuizPage() {
//   const router = useRouter();
//   const params = useParams();
//   const [quiz, setQuiz] = useState<any>(null);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [error, setError] = useState('');

//   // Load user and quiz data
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     try {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);

//       const quizId = params?.id as string;
      
//       if (!quizId) {
//         setError('Invalid quiz ID');
//         setLoading(false);
//         return;
//       }

//       fetchQuiz(quizId, userData.id);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       router.push('/login');
//     }
//   }, [params?.id]);

//   // Fetch quiz data
//   const fetchQuiz = async (quizId: string, userId: string) => {
//     try {
//       const quizRes = await fetch(`/api/quizzes/${quizId}`);
//       const quizData = await quizRes.json();

//       if (!quizRes.ok || !quizData.success) {
//         setError('Quiz not found!');
//         setLoading(false);
//         return;
//       }

//       // Check if already attempted
//       try {
//         const checkRes = await fetch(`/api/results/check?userId=${userId}&quizId=${quizId}`);
//         if (checkRes.ok) {
//           const checkData = await checkRes.json();
//           if (checkData.attempted) {
//             alert('You have already taken this quiz!');
//             router.push('/dashboard');
//             return;
//           }
//         }
//       } catch (error) {
//         console.error('Error checking attempt:', error);
//         // Continue anyway - let them try
//       }

//       setQuiz(quizData.data);
//       setTimeLeft(quizData.data.duration * 60);
//       setAnswers(new Array(quizData.data.questions.length).fill(-1));
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching quiz:', error);
//       setError('Error loading quiz');
//       setLoading(false);
//     }
//   };

//   // Timer effect
//   useEffect(() => {
//     if (!quiz || timeLeft <= 0 || isSubmitting) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleAutoSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, quiz, isSubmitting]);

//   // Handle answer selection
//   const handleAnswer = (optionIndex: number) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = optionIndex;
//     setAnswers(newAnswers);
//   };

//   // Auto submit when time runs out
//   const handleAutoSubmit = () => {
//     if (isSubmitting) return;
//     alert('⏰ Time is up! Submitting your quiz...');
//     handleSubmit();
//   };

//   // Submit quiz
//   const handleSubmit = async () => {
//     if (!quiz || !user || isSubmitting) {
//       console.log('Submission blocked:', { quiz: !!quiz, user: !!user, isSubmitting });
//       return;
//     }
    
//     console.log('Starting quiz submission...');
//     setIsSubmitting(true);
//     setShowConfirm(false);

//     // Calculate score
//     let score = 0;
//     quiz.questions.forEach((q: any, index: number) => {
//       if (answers[index] === q.correctOption) {
//         score += q.marks;
//       }
//     });

//     const percentage = Math.round((score / quiz.totalMarks) * 100);

//     console.log('Submitting result:', {
//       quizId: quiz.id,
//       quizTitle: quiz.title,
//       userId: user.id,
//       userName: user.name,
//       score,
//       totalMarks: quiz.totalMarks,
//       percentage
//     });

//     try {
//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           quizId: quiz.id,
//           quizTitle: quiz.title,
//           userId: user.id,
//           userName: user.name,
//           score,
//           totalMarks: quiz.totalMarks,
//           percentage,
//           submittedAt: new Date().toISOString()
//         })
//       });

//       console.log('Response status:', res.status);
      
//       let data;
//       try {
//         data = await res.json();
//         console.log('Response data:', data);
//       } catch (e) {
//         console.error('Failed to parse response:', e);
//         throw new Error('Invalid server response');
//       }

//       if (res.ok && data.success) {
//         alert(`🎉 Quiz submitted! Your score: ${score}/${quiz.totalMarks} (${percentage}%)`);
//         router.push('/dashboard');
//       } else {
//         alert(data.error || 'Error saving result');
//         setIsSubmitting(false);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       alert('Network error. Please check your connection and try again.');
//       setIsSubmitting(false);
//     }
//   };

//   // Format time
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Timer color based on time left
//   const getTimeColor = () => {
//     if (timeLeft < 60) return 'text-red-400 bg-red-500/10 border-red-500/20';
//     if (timeLeft < 180) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
//     return 'text-green-400 bg-green-500/10 border-green-500/20';
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
//           <p className="text-red-400 mb-4">{error || 'Quiz not found!'}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
//   const answeredCount = answers.filter(a => a !== -1).length;

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       {/* Animated Background */}
//       <div className="fixed inset-0">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
//       </div>

//       {/* Header */}
//       <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => router.back()}
//                 className="p-2 hover:bg-[#1a1a23] rounded-xl transition-colors group"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
//               </button>
//               <div>
//                 <h1 className="text-base sm:text-lg font-semibold text-white">{quiz.title}</h1>
//                 <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
//                   Question {currentQuestion + 1} of {quiz.questions.length}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1a1a23] rounded-lg border border-[#2a2a35]">
//                 <CheckCircle className="w-4 h-4 text-green-400" />
//                 <span className="text-xs text-gray-300">{answeredCount}/{quiz.questions.length}</span>
//               </div>

//               <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getTimeColor()}`}>
//                 <Clock className="w-4 h-4" />
//                 <span className="font-mono font-medium text-sm">{formatTime(timeLeft)}</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-3 h-1.5 bg-[#1a1a23] rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Question Area */}
//           <div className="lg:col-span-3">
//             <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-5 sm:p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
//                     {quiz.questions[currentQuestion].marks} marks
//                   </span>
//                   {answers[currentQuestion] !== -1 && (
//                     <span className="text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
//                       <CheckCircle className="w-3 h-3" /> Answered
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <h2 className="text-lg sm:text-xl text-white mb-6">
//                 {quiz.questions[currentQuestion].text}
//               </h2>

//               {/* Options - Working Version */}
//               <div className="space-y-3 mb-6">
//                 {quiz.questions[currentQuestion].options.map((opt: string, idx: number) => {
//                   const isSelected = answers[currentQuestion] === idx;
//                   return (
//                     <div
//                       key={idx}
//                       onClick={() => handleAnswer(idx)}
//                       className={`flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer transition-all ${
//                         isSelected
//                           ? 'border-purple-500 bg-purple-500/10'
//                           : 'border-[#2a2a35] hover:border-purple-500/50 hover:bg-[#1a1a23]'
//                       }`}
//                     >
//                       <div className="flex items-center w-full">
//                         <div className="relative mr-3">
//                           {isSelected ? (
//                             <CircleDot className="w-5 h-5 text-purple-500" />
//                           ) : (
//                             <Circle className="w-5 h-5 text-gray-500" />
//                           )}
//                         </div>
//                         <span className="text-sm sm:text-base text-gray-300">
//                           <span className="font-medium text-purple-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
//                           {opt}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex items-center justify-between pt-4 border-t border-[#2a2a35]">
//                 <button
//                   onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
//                   disabled={currentQuestion === 0}
//                   className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   Previous
//                 </button>

//                 {currentQuestion === quiz.questions.length - 1 ? (
//                   <button
//                     onClick={() => setShowConfirm(true)}
//                     disabled={isSubmitting}
//                     className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-medium hover:from-green-500 hover:to-emerald-500 transition-all disabled:opacity-50"
//                   >
//                     <Flag className="w-4 h-4" />
//                     Submit Quiz
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => setCurrentQuestion(prev => prev + 1)}
//                     className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all"
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Question Navigator */}
//           <div className="lg:col-span-1">
//             <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sticky top-24">
//               <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
//                 Questions
//               </h3>
              
//               <div className="grid grid-cols-5 gap-2">
//                 {quiz.questions.map((_: any, idx: number) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentQuestion(idx)}
//                     className={`
//                       aspect-square flex items-center justify-center text-xs font-medium rounded-lg transition-all
//                       ${currentQuestion === idx 
//                         ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white ring-2 ring-purple-500 ring-offset-2 ring-offset-[#111117]' 
//                         : answers[idx] !== -1
//                           ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
//                           : 'bg-[#1a1a23] text-gray-400 border border-[#2a2a35] hover:border-purple-500/50 hover:text-white'
//                       }
//                     `}
//                   >
//                     {idx + 1}
//                   </button>
//                 ))}
//               </div>

//               <div className="mt-4 pt-4 border-t border-[#2a2a35] space-y-2">
//                 <div className="flex items-center justify-between text-xs">
//                   <span className="text-gray-400">Answered</span>
//                   <span className="font-medium text-green-400">{answeredCount}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-xs">
//                   <span className="text-gray-400">Remaining</span>
//                   <span className="font-medium text-orange-400">
//                     {quiz.questions.length - answeredCount}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setShowConfirm(true)}
//                 disabled={isSubmitting}
//                 className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white font-medium text-sm hover:from-green-500 hover:to-emerald-500 transition-all disabled:opacity-50"
//               >
//                 <Flag className="w-4 h-4" />
//                 Submit Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl max-w-md w-full p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
//                 <AlertCircle className="w-5 h-5 text-orange-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-white">Submit Quiz?</h3>
//             </div>
            
//             <p className="text-sm text-gray-400 mb-4">
//               You have answered {answeredCount} out of {quiz.questions.length} questions.
//               {answeredCount < quiz.questions.length && (
//                 <span className="block mt-2 text-orange-400">
//                   ⚠️ {quiz.questions.length - answeredCount} questions remaining
//                 </span>
//               )}
//             </p>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="flex-1 px-4 py-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-lg text-gray-300 hover:bg-[#252530] transition-all text-sm"
//               >
//                 Continue
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white font-medium hover:from-green-500 hover:to-emerald-500 transition-all text-sm disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }    






import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">QuizMaster</h1>
        <p className="text-gray-400 mb-8">Welcome to QuizMaster</p>
        <div className="space-x-4">
          <Link href="/login" className="px-6 py-3 bg-purple-600 text-white rounded-lg">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}