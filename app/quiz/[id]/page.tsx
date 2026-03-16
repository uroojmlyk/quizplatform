

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Clock, HelpCircle, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { QuizDetailsSkeleton, QuestionSkeleton } from '@/components/ui/loading-skeleton';

// interface Question {
//   text: string;
//   options: string[];
//   correctAnswer: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   id?: string;
//   title: string;
//   description: string;
//   duration: number;
//   questions: Question[];
//   totalMarks: number;
// }

// export default function QuizPage() {
//   const params = useParams();
//   const router = useRouter();
//   const quizId = params.Id as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (quizId) {
//       console.log('📥 Quiz ID from params:', quizId);
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       console.log('📤 Fetching quiz with ID:', quizId);
      
//       const res = await fetch(`/api/quizzes/${quizId}`);
//       console.log('📥 Response status:', res.status);
      
//       const data = await res.json();
//       console.log('📥 Quiz data received:', data);
      
//       if (data.success) {
//         console.log('✅ Quiz loaded successfully');
//         setQuiz(data.data);
//         setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
//         setTimeLeft(data.data.duration * 60);
//       } else {
//         console.log('❌ Quiz fetch failed:', data.error);
//         setError(data.error || 'Quiz not found');
//       }
//     } catch (error) {
//       console.error('❌ Error fetching quiz:', error);
//       setError('Failed to load quiz');
//     } finally {
//       console.log('⏹️ Setting loading to false');
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = () => {
//     console.log('▶️ Starting quiz');
//     setQuizStarted(true);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleAnswerSelect = (optionIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = optionIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     console.log('📤 Submitting quiz...');
    
//     if (!quiz || submitting) return;
    
//     setSubmitting(true);
    
//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score += question.marks;
//       }
//     });

//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
      
//       const quizIdValue = quiz._id || quiz.id;
//       const userIdValue = user.id || user._id;
      
//       console.log('🔍 Quiz ID value:', quizIdValue);
//       console.log('🔍 User ID value:', userIdValue);
      
//       if (!quizIdValue) {
//         showToast.error('Quiz ID not found');
//         setSubmitting(false);
//         return;
//       }

//       if (!userIdValue) {
//         showToast.error('User not logged in');
//         setSubmitting(false);
//         router.push('/login');
//         return;
//       }

//       const resultData = {
//         quizId: quizIdValue,
//         quizTitle: quiz.title,
//         userId: userIdValue,
//         userName: user.name,
//         score,
//         totalMarks: quiz.totalMarks,
//         percentage: Math.round((score / quiz.totalMarks) * 100),
//         submittedAt: new Date().toISOString()
//       };

//       console.log('📦 Submitting result:', resultData);

//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resultData)
//       });

//       const data = await res.json();
//       console.log('📥 Submit response:', data);

//       if (res.ok && data.success) {
//         showToast.success(`Quiz submitted! Score: ${score}/${quiz.totalMarks}`);
//         setTimeout(() => router.push('/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to submit quiz');
//         setSubmitting(false);
//       }
//     } catch (error) {
//       console.error('❌ Error submitting quiz:', error);
//       showToast.error('Error submitting quiz');
//       setSubmitting(false);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <QuizDetailsSkeleton />
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <Toaster />
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-gray-400 mb-4">{error}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </button>

//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
//             <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
//             <p className="text-gray-400 mb-6">{quiz.description}</p>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <HelpCircle className="w-5 h-5" />
//                   <span className="font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t border-[#2a2a35] pt-6">
//               <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 text-gray-400 mb-8">
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-400" />
//                   You have {quiz.duration} minutes to complete this quiz
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-400" />
//                   Each question has multiple choice options
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-400" />
//                   You can navigate between questions
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-400" />
//                   Your answers are automatically saved
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <XCircle className="w-4 h-4 text-red-400" />
//                   Don't submit before time runs out
//                 </li>
//               </ul>

//               <button
//                 onClick={handleStartQuiz}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
      
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
//                 <Clock className="w-4 h-4" />
//                 <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-gray-400 bg-[#1a1a23] px-3 py-1.5 rounded-lg border border-[#2a2a35]">
//                 {currentQuestion + 1} / {quiz.questions.length}
//               </div>
//             </div>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="mt-3 h-1.5 bg-[#1a1a23] rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
//               style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
//             />
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-3xl mx-auto px-4 py-8">
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
//           {/* Question */}
//           <div className="mb-8">
//             <div className="flex items-start gap-3">
//               <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
//                 <span className="text-sm font-bold text-purple-400">{currentQuestion + 1}</span>
//               </span>
//               <div>
//                 <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
//                 <p className="text-sm text-gray-500 mt-2">Marks: {quiz.questions[currentQuestion].marks}</p>
//               </div>
//             </div>
//           </div>

//           {/* Options */}
//           <div className="space-y-3 mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => {
//               const isSelected = selectedAnswers[currentQuestion] === index;
//               const letter = String.fromCharCode(65 + index);
              
//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswerSelect(index)}
//                   className={`w-full text-left p-4 rounded-xl border transition-all transform hover:scale-[1.02] ${
//                     isSelected
//                       ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
//                       : 'border-[#2a2a35] bg-[#1a1a23] hover:border-purple-500/50 hover:bg-[#252530]'
//                   }`}
//                 >
//                   <span className="flex items-center gap-3">
//                     <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium ${
//                       isSelected 
//                         ? 'border-purple-500 bg-purple-500 text-white' 
//                         : 'border-gray-500 text-gray-400'
//                     }`}>
//                       {letter}
//                     </span>
//                     <span className={`text-sm sm:text-base ${isSelected ? 'text-white' : 'text-gray-300'}`}>
//                       {option}
//                     </span>
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between pt-4 border-t border-[#2a2a35]">
//             <button
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
//                 currentQuestion === 0
//                   ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
//                   : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50 border border-[#2a2a35]'
//               }`}
//             >
//               ← Previous
//             </button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <button
//                 onClick={handleSubmitQuiz}
//                 disabled={submitting}
//                 className={`px-8 py-2 rounded-lg transition-all flex items-center gap-2 ${
//                   submitting
//                     ? 'bg-green-600/50 cursor-not-allowed'
//                     : 'bg-green-600 hover:bg-green-700 transform hover:scale-105'
//                 } text-white shadow-lg shadow-green-600/25`}
//               >
//                 {submitting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Submitting...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Submit Quiz</span>
//                     <CheckCircle className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextQuestion}
//                 className="px-8 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-600/25"
//               >
//                 <span>Next</span>
//                 <span>→</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Question Navigator */}
//         <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
//           <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
//             <span>Quick Navigation</span>
//             <span className="text-xs bg-[#1a1a23] px-2 py-0.5 rounded-full">
//               {selectedAnswers.filter(a => a !== -1).length}/{quiz.questions.length} Answered
//             </span>
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {quiz.questions.map((_, index) => {
//               const isAnswered = selectedAnswers[index] !== -1;
//               const isCurrent = currentQuestion === index;
              
//               return (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentQuestion(index)}
//                   className={`w-10 h-10 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
//                     isCurrent
//                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/25'
//                       : isAnswered
//                       ? 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30'
//                       : 'bg-[#1a1a23] text-gray-400 border border-[#2a2a35] hover:border-purple-500/50 hover:text-white'
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }







// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { ArrowLeft, Clock, HelpCircle, AlertCircle } from 'lucide-react';

// interface Question {
//   text: string;
//   options: string[];
//   correctAnswer: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   id?: string;  // Add optional id field
//   title: string;
//   description: string;
//   duration: number;
//   questions: Question[];
//   totalMarks: number;
// }

// export default function QuizPage() {
//   const params = useParams();
//   const router = useRouter();
//   const quizId = params.Id as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [quizStarted, setQuizStarted] = useState(false);

//   useEffect(() => {
//     if (quizId) {
//       console.log('📥 Quiz ID from params:', quizId);
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       console.log('📤 Fetching quiz with ID:', quizId);
      
//       const res = await fetch(`/api/quizzes/${quizId}`);
//       console.log('📥 Response status:', res.status);
      
//       const data = await res.json();
//       console.log('📥 Quiz data received:', data);
      
//       if (data.success) {
//         console.log('✅ Quiz loaded successfully');
//         console.log('📦 Quiz data structure:', data.data);
//         setQuiz(data.data);
//         setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
//         setTimeLeft(data.data.duration * 60);
//       } else {
//         console.log('❌ Quiz fetch failed:', data.error);
//         setError(data.error || 'Quiz not found');
//       }
//     } catch (error) {
//       console.error('❌ Error fetching quiz:', error);
//       setError('Failed to load quiz');
//     } finally {
//       console.log('⏹️ Setting loading to false');
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = () => {
//     console.log('▶️ Starting quiz');
//     setQuizStarted(true);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleAnswerSelect = (optionIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = optionIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     console.log('📤 Submitting quiz...');
    
//     if (!quiz) {
//       alert('Quiz data not found!');
//       return;
//     }

//     // Debug: Check quiz object
//     console.log('🔍 Quiz object:', quiz);
//     console.log('🔍 Quiz ID from object:', quiz._id);
//     console.log('🔍 Quiz ID from object (id field):', quiz.id);

//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score += question.marks;
//       }
//     });

//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       console.log('🔍 User object:', user);
      
//       // ✅ Get quiz ID properly (try both _id and id)
//       const quizIdValue = quiz._id || quiz.id;
//       const userIdValue = user.id || user._id;
      
//       console.log('🔍 Using quizId:', quizIdValue);
//       console.log('🔍 Using userId:', userIdValue);

//       // Validate required fields
//       if (!quizIdValue) {
//         console.error('❌ Quiz ID missing! Available fields:', Object.keys(quiz));
//         alert('Quiz ID not found. Please try again.');
//         return;
//       }

//       if (!userIdValue) {
//         console.error('❌ User ID missing!');
//         alert('User not logged in. Please login again.');
//         router.push('/login');
//         return;
//       }

//       if (!user.name) {
//         console.error('❌ User name missing!');
//         alert('User information incomplete. Please login again.');
//         router.push('/login');
//         return;
//       }

//       const resultData = {
//         quizId: quizIdValue,
//         quizTitle: quiz.title,
//         userId: userIdValue,
//         userName: user.name,
//         score,
//         totalMarks: quiz.totalMarks,
//         percentage: Math.round((score / quiz.totalMarks) * 100),
//         submittedAt: new Date().toISOString()
//       };

//       console.log('📦 Submitting result:', resultData);

//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resultData)
//       });

//       const data = await res.json();
//       console.log('📥 Submit response:', data);

//       if (res.ok && data.success) {
//         console.log('✅ Quiz submitted, redirecting...');
//         alert(`Quiz submitted! Your score: ${score}/${quiz.totalMarks}`);
//         router.push('/dashboard');
//       } else {
//         console.error('❌ Submit failed:', data.error);
//         alert('Failed to submit quiz: ' + (data.error || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('❌ Error submitting quiz:', error);
//       alert('Error submitting quiz. Please try again.');
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) {
//     console.log('⏳ Rendering loading spinner');
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     console.log('❌ Rendering error state:', error);
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-gray-400 mb-4">{error || 'The quiz you are looking for does not exist'}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     console.log('📝 Rendering start screen');
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </button>

//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
//             <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
//             <p className="text-gray-400 mb-6">{quiz.description}</p>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <HelpCircle className="w-5 h-5" />
//                   <span className="font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t border-[#2a2a35] pt-6">
//               <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 text-gray-400 mb-8">
//                 <li>• You have {quiz.duration} minutes to complete this quiz</li>
//                 <li>• Each question has multiple choice options</li>
//                 <li>• You can navigate between questions</li>
//                 <li>• Your answers are automatically saved</li>
//                 <li>• Submit before time runs out</li>
//               </ul>

//               <button
//                 onClick={handleStartQuiz}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   console.log('📝 Rendering quiz questions');
//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-orange-400">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-gray-400">
//                 {currentQuestion + 1} / {quiz.questions.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 py-8">
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
//           <div className="mb-8">
//             <div className="flex items-start gap-3">
//               <span className="flex-shrink-0 w-6 h-6 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm">
//                 {currentQuestion + 1}
//               </span>
//               <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
//             </div>
//           </div>

//           <div className="space-y-3 mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(index)}
//                 className={`w-full text-left p-4 rounded-lg border transition-all ${
//                   selectedAnswers[currentQuestion] === index
//                     ? 'bg-purple-600/20 border-purple-500 text-white'
//                     : 'bg-[#1a1a23] border-[#2a2a35] text-gray-400 hover:border-purple-500/50 hover:text-white'
//                 }`}
//               >
//                 <span className="flex items-center gap-3">
//                   <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   {option}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-6 py-2 rounded-lg transition-all ${
//                 currentQuestion === 0
//                   ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
//                   : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50'
//               }`}
//             >
//               Previous
//             </button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <button
//                 onClick={handleSubmitQuiz}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
//               >
//                 Submit Quiz
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextQuestion}
//                 className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
//           <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Navigation</h3>
//           <div className="flex flex-wrap gap-2">
//             {quiz.questions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`w-8 h-8 rounded-lg text-sm transition-all ${
//                   currentQuestion === index
//                     ? 'bg-purple-600 text-white'
//                     : selectedAnswers[index] !== -1
//                     ? 'bg-green-600/20 text-green-400 border border-green-500/30'
//                     : 'bg-[#1a1a23] text-gray-400 hover:text-white'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }   












// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Clock, HelpCircle, AlertCircle } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { QuizDetailsSkeleton, QuestionSkeleton } from '@/components/ui/loading-skeleton';

// interface Question {
//   text: string;
//   options: string[];
//   correctAnswer: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   id?: string;
//   title: string;
//   description: string;
//   duration: number;
//   questions: Question[];
//   totalMarks: number;
// }

// export default function QuizPage() {
//   const params = useParams();
//   const router = useRouter();
//   const quizId = params.Id as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [quizStarted, setQuizStarted] = useState(false);

//   useEffect(() => {
//     if (quizId) {
//       console.log('📥 Quiz ID from params:', quizId);
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       console.log('📤 Fetching quiz with ID:', quizId);
      
//       const res = await fetch(`/api/quizzes/${quizId}`);
//       console.log('📥 Response status:', res.status);
      
//       const data = await res.json();
//       console.log('📥 Quiz data received:', data);
      
//       if (data.success) {
//         console.log('✅ Quiz loaded successfully');
//         setQuiz(data.data);
//         setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
//         setTimeLeft(data.data.duration * 60);
//       } else {
//         console.log('❌ Quiz fetch failed:', data.error);
//         setError(data.error || 'Quiz not found');
//       }
//     } catch (error) {
//       console.error('❌ Error fetching quiz:', error);
//       setError('Failed to load quiz');
//     } finally {
//       console.log('⏹️ Setting loading to false');
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = () => {
//     console.log('▶️ Starting quiz');
//     setQuizStarted(true);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleAnswerSelect = (optionIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = optionIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     console.log('📤 Submitting quiz...');
    
//     if (!quiz) {
//       showToast.error('Quiz data not found!');
//       return;
//     }

//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score += question.marks;
//       }
//     });

//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
      
//       const quizIdValue = quiz._id || quiz.id;
//       const userIdValue = user.id || user._id;
      
//       if (!quizIdValue) {
//         showToast.error('Quiz ID not found');
//         return;
//       }

//       if (!userIdValue) {
//         showToast.error('User not logged in');
//         router.push('/login');
//         return;
//       }

//       const resultData = {
//         quizId: quizIdValue,
//         quizTitle: quiz.title,
//         userId: userIdValue,
//         userName: user.name,
//         score,
//         totalMarks: quiz.totalMarks,
//         percentage: Math.round((score / quiz.totalMarks) * 100),
//         submittedAt: new Date().toISOString()
//       };

//       const toastId = showToast.loading('Submitting quiz...');

//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resultData)
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         showToast.success(`Quiz submitted! Score: ${score}/${quiz.totalMarks}`);
//         router.push('/dashboard');
//       } else {
//         showToast.error(data.error || 'Failed to submit quiz');
//       }
//     } catch (error) {
//       console.error('❌ Error submitting quiz:', error);
//       showToast.error('Error submitting quiz');
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] p-4">
//         <Toaster />
//         <div className="max-w-3xl mx-auto">
//           {!quizStarted ? <QuizDetailsSkeleton /> : <QuestionSkeleton />}
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <Toaster />
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-gray-400 mb-4">{error || 'The quiz you are looking for does not exist'}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </button>

//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
//             <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
//             <p className="text-gray-400 mb-6">{quiz.description}</p>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <HelpCircle className="w-5 h-5" />
//                   <span className="font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t border-[#2a2a35] pt-6">
//               <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 text-gray-400 mb-8">
//                 <li>• You have {quiz.duration} minutes to complete this quiz</li>
//                 <li>• Each question has multiple choice options</li>
//                 <li>• You can navigate between questions</li>
//                 <li>• Your answers are automatically saved</li>
//                 <li>• Submit before time runs out</li>
//               </ul>

//               <button
//                 onClick={handleStartQuiz}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
//       <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-orange-400">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-gray-400">
//                 {currentQuestion + 1} / {quiz.questions.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 py-8">
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
//           <div className="mb-8">
//             <div className="flex items-start gap-3">
//               <span className="flex-shrink-0 w-6 h-6 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm">
//                 {currentQuestion + 1}
//               </span>
//               <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
//             </div>
//           </div>

//           <div className="space-y-3 mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(index)}
//                 className={`w-full text-left p-4 rounded-lg border transition-all ${
//                   selectedAnswers[currentQuestion] === index
//                     ? 'bg-purple-600/20 border-purple-500 text-white'
//                     : 'bg-[#1a1a23] border-[#2a2a35] text-gray-400 hover:border-purple-500/50 hover:text-white'
//                 }`}
//               >
//                 <span className="flex items-center gap-3">
//                   <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   {option}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-6 py-2 rounded-lg transition-all ${
//                 currentQuestion === 0
//                   ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
//                   : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50'
//               }`}
//             >
//               Previous
//             </button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <button
//                 onClick={handleSubmitQuiz}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
//               >
//                 Submit Quiz
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextQuestion}
//                 className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
//           <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Navigation</h3>
//           <div className="flex flex-wrap gap-2">
//             {quiz.questions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`w-8 h-8 rounded-lg text-sm transition-all ${
//                   currentQuestion === index
//                     ? 'bg-purple-600 text-white'
//                     : selectedAnswers[index] !== -1
//                     ? 'bg-green-600/20 text-green-400 border border-green-500/30'
//                     : 'bg-[#1a1a23] text-gray-400 hover:text-white'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }







// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Clock, HelpCircle, AlertCircle } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { QuizDetailsSkeleton, QuestionSkeleton } from '@/components/ui/loading-skeleton';

// // ... interfaces same

// export default function QuizPage() {
//   const params = useParams();
//   const router = useRouter();
//   const quizId = params.Id as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [submitting, setSubmitting] = useState(false); // ✅ New state for submission

//   useEffect(() => {
//     if (quizId) {
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/quizzes/${quizId}`);
//       const data = await res.json();
      
//       if (data.success) {
//         setQuiz(data.data);
//         setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
//         setTimeLeft(data.data.duration * 60);
//       } else {
//         setError(data.error || 'Quiz not found');
//       }
//     } catch (error) {
//       setError('Failed to load quiz');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = () => {
//     setQuizStarted(true);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleAnswerSelect = (optionIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = optionIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     if (!quiz || submitting) return; // ✅ Prevent double submission
    
//     setSubmitting(true); // ✅ Show submitting state
    
//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score += question.marks;
//       }
//     });

//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
      
//       const quizIdValue = quiz._id || quiz.id;
//       const userIdValue = user.id || user._id;
      
//       if (!quizIdValue || !userIdValue) {
//         showToast.error('Invalid data');
//         setSubmitting(false);
//         return;
//       }

//       const resultData = {
//         quizId: quizIdValue,
//         quizTitle: quiz.title,
//         userId: userIdValue,
//         userName: user.name,
//         score,
//         totalMarks: quiz.totalMarks,
//         percentage: Math.round((score / quiz.totalMarks) * 100),
//         submittedAt: new Date().toISOString()
//       };

//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resultData)
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         showToast.success(`Quiz submitted! Score: ${score}/${quiz.totalMarks}`);
//         router.push('/dashboard');
//       } else {
//         showToast.error(data.error || 'Failed to submit quiz');
//         setSubmitting(false);
//       }
//     } catch (error) {
//       showToast.error('Error submitting quiz');
//       setSubmitting(false);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // ✅ Better loading state - only show when actually loading
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <QuizDetailsSkeleton />
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <Toaster />
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-gray-400 mb-4">{error}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </button>

//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
//             <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
//             <p className="text-gray-400 mb-6">{quiz.description}</p>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <HelpCircle className="w-5 h-5" />
//                   <span className="font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t border-[#2a2a35] pt-6">
//               <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 text-gray-400 mb-8">
//                 <li>• You have {quiz.duration} minutes to complete this quiz</li>
//                 <li>• Each question has multiple choice options</li>
//                 <li>• You can navigate between questions</li>
//                 <li>• Your answers are automatically saved</li>
//                 <li>• Submit before time runs out</li>
//               </ul>

//               <button
//                 onClick={handleStartQuiz}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
//       <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-orange-400">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-gray-400">
//                 {currentQuestion + 1} / {quiz.questions.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 py-8">
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
//           <div className="mb-8">
//             <div className="flex items-start gap-3">
//               <span className="flex-shrink-0 w-6 h-6 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm">
//                 {currentQuestion + 1}
//               </span>
//               <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
//             </div>
//           </div>

//           <div className="space-y-3 mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(index)}
//                 className={`w-full text-left p-4 rounded-lg border transition-all ${
//                   selectedAnswers[currentQuestion] === index
//                     ? 'bg-purple-600/20 border-purple-500 text-white'
//                     : 'bg-[#1a1a23] border-[#2a2a35] text-gray-400 hover:border-purple-500/50 hover:text-white'
//                 }`}
//               >
//                 <span className="flex items-center gap-3">
//                   <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   {option}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-6 py-2 rounded-lg transition-all ${
//                 currentQuestion === 0
//                   ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
//                   : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50'
//               }`}
//             >
//               Previous
//             </button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <button
//                 onClick={handleSubmitQuiz}
//                 disabled={submitting}
//                 className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
//                   submitting
//                     ? 'bg-green-600/50 cursor-not-allowed'
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {submitting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Submitting...</span>
//                   </>
//                 ) : (
//                   'Submit Quiz'
//                 )}
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextQuestion}
//                 className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
//           <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Navigation</h3>
//           <div className="flex flex-wrap gap-2">
//             {quiz.questions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`w-8 h-8 rounded-lg text-sm transition-all ${
//                   currentQuestion === index
//                     ? 'bg-purple-600 text-white'
//                     : selectedAnswers[index] !== -1
//                     ? 'bg-green-600/20 text-green-400 border border-green-500/30'
//                     : 'bg-[#1a1a23] text-gray-400 hover:text-white'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }









// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Clock, HelpCircle, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { QuizDetailsSkeleton, QuestionSkeleton } from '@/components/ui/loading-skeleton';

// interface Question {
//   text: string;
//   options: string[];
//   correctAnswer: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   id?: string;
//   title: string;
//   description: string;
//   duration: number;
//   questions: Question[];
//   totalMarks: number;
// }

// export default function QuizPage() {
//   const params = useParams();
//   const router = useRouter();
//   // Fix: Vercel (Linux) is case-sensitive, local Mac/Windows is not.
//   // params.Id works locally, params.id works on Vercel. Use both.
//   const quizId = (params.Id ?? params.id) as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (quizId) {
//       console.log('📥 Quiz ID from params:', quizId);
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       console.log('📤 Fetching quiz with ID:', quizId);
      
//       const res = await fetch(`/api/quizzes/${quizId}`);
//       console.log('📥 Response status:', res.status);
      
//       const data = await res.json();
//       console.log('📥 Quiz data received:', data);
      
//       if (data.success) {
//         console.log('✅ Quiz loaded successfully');
//         setQuiz(data.data);
//         setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
//         setTimeLeft(data.data.duration * 60);
//       } else {
//         console.log('❌ Quiz fetch failed:', data.error);
//         setError(data.error || 'Quiz not found');
//       }
//     } catch (error) {
//       console.error('❌ Error fetching quiz:', error);
//       setError('Failed to load quiz');
//     } finally {
//       console.log('⏹️ Setting loading to false');
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = () => {
//     console.log('▶️ Starting quiz');
//     setQuizStarted(true);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleAnswerSelect = (optionIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = optionIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     console.log('📤 Submitting quiz...');
    
//     if (!quiz || submitting) return;
    
//     setSubmitting(true);
    
//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score += question.marks;
//       }
//     });

//     try {
//       const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
//       const user = JSON.parse(userStr || '{}');
      
//       const quizIdValue = quiz._id || quiz.id;
//       const userIdValue = user.id || user._id;
      
//       console.log('🔍 Quiz ID value:', quizIdValue);
//       console.log('🔍 User ID value:', userIdValue);
      
//       if (!quizIdValue) {
//         showToast.error('Quiz ID not found');
//         setSubmitting(false);
//         return;
//       }

//       if (!userIdValue) {
//         showToast.error('User not logged in');
//         setSubmitting(false);
//         router.push('/login');
//         return;
//       }

//       const resultData = {
//         quizId: quizIdValue,
//         quizTitle: quiz.title,
//         userId: userIdValue,
//         userName: user.name,
//         score,
//         totalMarks: quiz.totalMarks,
//         percentage: Math.round((score / quiz.totalMarks) * 100),
//         submittedAt: new Date().toISOString()
//       };

//       console.log('📦 Submitting result:', resultData);

//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resultData)
//       });

//       const data = await res.json();
//       console.log('📥 Submit response:', data);

//       if (res.ok && data.success) {
//         showToast.success(`Quiz submitted! Score: ${score}/${quiz.totalMarks}`);
//         setTimeout(() => router.push('/dashboard'), 1500);
//       } else {
//         showToast.error(data.error || 'Failed to submit quiz');
//         setSubmitting(false);
//       }
//     } catch (error) {
//       console.error('❌ Error submitting quiz:', error);
//       showToast.error('Error submitting quiz');
//       setSubmitting(false);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <QuizDetailsSkeleton />
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <Toaster />
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-gray-400 mb-4">{error}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </button>

//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
//             <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
//             <p className="text-gray-400 mb-6">{quiz.description}</p>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <HelpCircle className="w-5 h-5" />
//                   <span className="font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t border-[#2a2a35] pt-6">
//               <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 text-gray-400 mb-8">
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-400" />
//                   You have {quiz.duration} minutes to complete this quiz
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-400" />
//                   Each question has multiple choice options
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-400" />
//                   You can navigate between questions
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-400" />
//                   Your answers are automatically saved
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <XCircle className="w-4 h-4 text-red-400" />
//                   Don't submit before time runs out
//                 </li>
//               </ul>

//               <button
//                 onClick={handleStartQuiz}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
      
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
//                 <Clock className="w-4 h-4" />
//                 <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-gray-400 bg-[#1a1a23] px-3 py-1.5 rounded-lg border border-[#2a2a35]">
//                 {currentQuestion + 1} / {quiz.questions.length}
//               </div>
//             </div>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="mt-3 h-1.5 bg-[#1a1a23] rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
//               style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
//             />
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-3xl mx-auto px-4 py-8">
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
//           {/* Question */}
//           <div className="mb-8">
//             <div className="flex items-start gap-3">
//               <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
//                 <span className="text-sm font-bold text-purple-400">{currentQuestion + 1}</span>
//               </span>
//               <div>
//                 <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
//                 <p className="text-sm text-gray-500 mt-2">Marks: {quiz.questions[currentQuestion].marks}</p>
//               </div>
//             </div>
//           </div>

//           {/* Options */}
//           <div className="space-y-3 mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => {
//               const isSelected = selectedAnswers[currentQuestion] === index;
//               const letter = String.fromCharCode(65 + index);
              
//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswerSelect(index)}
//                   className={`w-full text-left p-4 rounded-xl border transition-all transform hover:scale-[1.02] ${
//                     isSelected
//                       ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
//                       : 'border-[#2a2a35] bg-[#1a1a23] hover:border-purple-500/50 hover:bg-[#252530]'
//                   }`}
//                 >
//                   <span className="flex items-center gap-3">
//                     <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium ${
//                       isSelected 
//                         ? 'border-purple-500 bg-purple-500 text-white' 
//                         : 'border-gray-500 text-gray-400'
//                     }`}>
//                       {letter}
//                     </span>
//                     <span className={`text-sm sm:text-base ${isSelected ? 'text-white' : 'text-gray-300'}`}>
//                       {option}
//                     </span>
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between pt-4 border-t border-[#2a2a35]">
//             <button
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
//                 currentQuestion === 0
//                   ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
//                   : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50 border border-[#2a2a35]'
//               }`}
//             >
//               ← Previous
//             </button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <button
//                 onClick={handleSubmitQuiz}
//                 disabled={submitting}
//                 className={`px-8 py-2 rounded-lg transition-all flex items-center gap-2 ${
//                   submitting
//                     ? 'bg-green-600/50 cursor-not-allowed'
//                     : 'bg-green-600 hover:bg-green-700 transform hover:scale-105'
//                 } text-white shadow-lg shadow-green-600/25`}
//               >
//                 {submitting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Submitting...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Submit Quiz</span>
//                     <CheckCircle className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextQuestion}
//                 className="px-8 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-600/25"
//               >
//                 <span>Next</span>
//                 <span>→</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Question Navigator */}
//         <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
//           <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
//             <span>Quick Navigation</span>
//             <span className="text-xs bg-[#1a1a23] px-2 py-0.5 rounded-full">
//               {selectedAnswers.filter(a => a !== -1).length}/{quiz.questions.length} Answered
//             </span>
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {quiz.questions.map((_, index) => {
//               const isAnswered = selectedAnswers[index] !== -1;
//               const isCurrent = currentQuestion === index;
              
//               return (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentQuestion(index)}
//                   className={`w-10 h-10 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
//                     isCurrent
//                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/25'
//                       : isAnswered
//                       ? 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30'
//                       : 'bg-[#1a1a23] text-gray-400 border border-[#2a2a35] hover:border-purple-500/50 hover:text-white'
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// // ✅ END OF FILE - NO EXTRA EXPORT









// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { ArrowLeft, Clock, HelpCircle, AlertCircle } from 'lucide-react';

// interface Question {
//   text: string;
//   options: string[];
//   correctAnswer: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   id?: string;  // Add optional id field
//   title: string;
//   description: string;
//   duration: number;
//   questions: Question[];
//   totalMarks: number;
// }

// export default function QuizPage() {
//   const params = useParams();
//   const router = useRouter();
//   const quizId = params.Id as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [quizStarted, setQuizStarted] = useState(false);

//   useEffect(() => {
//     if (quizId) {
//       console.log('📥 Quiz ID from params:', quizId);
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       console.log('📤 Fetching quiz with ID:', quizId);
      
//       const res = await fetch(`/api/quizzes/${quizId}`);
//       console.log('📥 Response status:', res.status);
      
//       const data = await res.json();
//       console.log('📥 Quiz data received:', data);
      
//       if (data.success) {
//         console.log('✅ Quiz loaded successfully');
//         console.log('📦 Quiz data structure:', data.data);
//         setQuiz(data.data);
//         setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
//         setTimeLeft(data.data.duration * 60);
//       } else {
//         console.log('❌ Quiz fetch failed:', data.error);
//         setError(data.error || 'Quiz not found');
//       }
//     } catch (error) {
//       console.error('❌ Error fetching quiz:', error);
//       setError('Failed to load quiz');
//     } finally {
//       console.log('⏹️ Setting loading to false');
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = () => {
//     console.log('▶️ Starting quiz');
//     setQuizStarted(true);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleAnswerSelect = (optionIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = optionIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     console.log('📤 Submitting quiz...');
    
//     if (!quiz) {
//       alert('Quiz data not found!');
//       return;
//     }

//     // Debug: Check quiz object
//     console.log('🔍 Quiz object:', quiz);
//     console.log('🔍 Quiz ID from object:', quiz._id);
//     console.log('🔍 Quiz ID from object (id field):', quiz.id);

//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score += question.marks;
//       }
//     });

//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       console.log('🔍 User object:', user);
      
//       // ✅ Get quiz ID properly (try both _id and id)
//       const quizIdValue = quiz._id || quiz.id;
//       const userIdValue = user.id || user._id;
      
//       console.log('🔍 Using quizId:', quizIdValue);
//       console.log('🔍 Using userId:', userIdValue);

//       // Validate required fields
//       if (!quizIdValue) {
//         console.error('❌ Quiz ID missing! Available fields:', Object.keys(quiz));
//         alert('Quiz ID not found. Please try again.');
//         return;
//       }

//       if (!userIdValue) {
//         console.error('❌ User ID missing!');
//         alert('User not logged in. Please login again.');
//         router.push('/login');
//         return;
//       }

//       if (!user.name) {
//         console.error('❌ User name missing!');
//         alert('User information incomplete. Please login again.');
//         router.push('/login');
//         return;
//       }

//       const resultData = {
//         quizId: quizIdValue,
//         quizTitle: quiz.title,
//         userId: userIdValue,
//         userName: user.name,
//         score,
//         totalMarks: quiz.totalMarks,
//         percentage: Math.round((score / quiz.totalMarks) * 100),
//         submittedAt: new Date().toISOString()
//       };

//       console.log('📦 Submitting result:', resultData);

//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resultData)
//       });

//       const data = await res.json();
//       console.log('📥 Submit response:', data);

//       if (res.ok && data.success) {
//         console.log('✅ Quiz submitted, redirecting...');
//         alert(`Quiz submitted! Your score: ${score}/${quiz.totalMarks}`);
//         router.push('/dashboard');
//       } else {
//         console.error('❌ Submit failed:', data.error);
//         alert('Failed to submit quiz: ' + (data.error || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('❌ Error submitting quiz:', error);
//       alert('Error submitting quiz. Please try again.');
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) {
//     console.log('⏳ Rendering loading spinner');
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     console.log('❌ Rendering error state:', error);
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-gray-400 mb-4">{error || 'The quiz you are looking for does not exist'}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     console.log('📝 Rendering start screen');
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </button>

//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
//             <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
//             <p className="text-gray-400 mb-6">{quiz.description}</p>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <HelpCircle className="w-5 h-5" />
//                   <span className="font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t border-[#2a2a35] pt-6">
//               <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 text-gray-400 mb-8">
//                 <li>• You have {quiz.duration} minutes to complete this quiz</li>
//                 <li>• Each question has multiple choice options</li>
//                 <li>• You can navigate between questions</li>
//                 <li>• Your answers are automatically saved</li>
//                 <li>• Submit before time runs out</li>
//               </ul>

//               <button
//                 onClick={handleStartQuiz}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   console.log('📝 Rendering quiz questions');
//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-orange-400">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-gray-400">
//                 {currentQuestion + 1} / {quiz.questions.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 py-8">
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
//           <div className="mb-8">
//             <div className="flex items-start gap-3">
//               <span className="flex-shrink-0 w-6 h-6 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm">
//                 {currentQuestion + 1}
//               </span>
//               <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
//             </div>
//           </div>

//           <div className="space-y-3 mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(index)}
//                 className={`w-full text-left p-4 rounded-lg border transition-all ${
//                   selectedAnswers[currentQuestion] === index
//                     ? 'bg-purple-600/20 border-purple-500 text-white'
//                     : 'bg-[#1a1a23] border-[#2a2a35] text-gray-400 hover:border-purple-500/50 hover:text-white'
//                 }`}
//               >
//                 <span className="flex items-center gap-3">
//                   <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   {option}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-6 py-2 rounded-lg transition-all ${
//                 currentQuestion === 0
//                   ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
//                   : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50'
//               }`}
//             >
//               Previous
//             </button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <button
//                 onClick={handleSubmitQuiz}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
//               >
//                 Submit Quiz
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextQuestion}
//                 className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
//           <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Navigation</h3>
//           <div className="flex flex-wrap gap-2">
//             {quiz.questions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`w-8 h-8 rounded-lg text-sm transition-all ${
//                   currentQuestion === index
//                     ? 'bg-purple-600 text-white'
//                     : selectedAnswers[index] !== -1
//                     ? 'bg-green-600/20 text-green-400 border border-green-500/30'
//                     : 'bg-[#1a1a23] text-gray-400 hover:text-white'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }   












// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Clock, HelpCircle, AlertCircle } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { QuizDetailsSkeleton, QuestionSkeleton } from '@/components/ui/loading-skeleton';

// interface Question {
//   text: string;
//   options: string[];
//   correctAnswer: number;
//   marks: number;
// }

// interface Quiz {
//   _id: string;
//   id?: string;
//   title: string;
//   description: string;
//   duration: number;
//   questions: Question[];
//   totalMarks: number;
// }

// export default function QuizPage() {
//   const params = useParams();
//   const router = useRouter();
//   const quizId = params.Id as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [quizStarted, setQuizStarted] = useState(false);

//   useEffect(() => {
//     if (quizId) {
//       console.log('📥 Quiz ID from params:', quizId);
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       console.log('📤 Fetching quiz with ID:', quizId);
      
//       const res = await fetch(`/api/quizzes/${quizId}`);
//       console.log('📥 Response status:', res.status);
      
//       const data = await res.json();
//       console.log('📥 Quiz data received:', data);
      
//       if (data.success) {
//         console.log('✅ Quiz loaded successfully');
//         setQuiz(data.data);
//         setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
//         setTimeLeft(data.data.duration * 60);
//       } else {
//         console.log('❌ Quiz fetch failed:', data.error);
//         setError(data.error || 'Quiz not found');
//       }
//     } catch (error) {
//       console.error('❌ Error fetching quiz:', error);
//       setError('Failed to load quiz');
//     } finally {
//       console.log('⏹️ Setting loading to false');
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = () => {
//     console.log('▶️ Starting quiz');
//     setQuizStarted(true);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleAnswerSelect = (optionIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = optionIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     console.log('📤 Submitting quiz...');
    
//     if (!quiz) {
//       showToast.error('Quiz data not found!');
//       return;
//     }

//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score += question.marks;
//       }
//     });

//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
      
//       const quizIdValue = quiz._id || quiz.id;
//       const userIdValue = user.id || user._id;
      
//       if (!quizIdValue) {
//         showToast.error('Quiz ID not found');
//         return;
//       }

//       if (!userIdValue) {
//         showToast.error('User not logged in');
//         router.push('/login');
//         return;
//       }

//       const resultData = {
//         quizId: quizIdValue,
//         quizTitle: quiz.title,
//         userId: userIdValue,
//         userName: user.name,
//         score,
//         totalMarks: quiz.totalMarks,
//         percentage: Math.round((score / quiz.totalMarks) * 100),
//         submittedAt: new Date().toISOString()
//       };

//       const toastId = showToast.loading('Submitting quiz...');

//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resultData)
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         showToast.success(`Quiz submitted! Score: ${score}/${quiz.totalMarks}`);
//         router.push('/dashboard');
//       } else {
//         showToast.error(data.error || 'Failed to submit quiz');
//       }
//     } catch (error) {
//       console.error('❌ Error submitting quiz:', error);
//       showToast.error('Error submitting quiz');
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] p-4">
//         <Toaster />
//         <div className="max-w-3xl mx-auto">
//           {!quizStarted ? <QuizDetailsSkeleton /> : <QuestionSkeleton />}
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <Toaster />
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-gray-400 mb-4">{error || 'The quiz you are looking for does not exist'}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </button>

//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
//             <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
//             <p className="text-gray-400 mb-6">{quiz.description}</p>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <HelpCircle className="w-5 h-5" />
//                   <span className="font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t border-[#2a2a35] pt-6">
//               <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 text-gray-400 mb-8">
//                 <li>• You have {quiz.duration} minutes to complete this quiz</li>
//                 <li>• Each question has multiple choice options</li>
//                 <li>• You can navigate between questions</li>
//                 <li>• Your answers are automatically saved</li>
//                 <li>• Submit before time runs out</li>
//               </ul>

//               <button
//                 onClick={handleStartQuiz}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
//       <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-orange-400">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-gray-400">
//                 {currentQuestion + 1} / {quiz.questions.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 py-8">
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
//           <div className="mb-8">
//             <div className="flex items-start gap-3">
//               <span className="flex-shrink-0 w-6 h-6 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm">
//                 {currentQuestion + 1}
//               </span>
//               <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
//             </div>
//           </div>

//           <div className="space-y-3 mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(index)}
//                 className={`w-full text-left p-4 rounded-lg border transition-all ${
//                   selectedAnswers[currentQuestion] === index
//                     ? 'bg-purple-600/20 border-purple-500 text-white'
//                     : 'bg-[#1a1a23] border-[#2a2a35] text-gray-400 hover:border-purple-500/50 hover:text-white'
//                 }`}
//               >
//                 <span className="flex items-center gap-3">
//                   <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   {option}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-6 py-2 rounded-lg transition-all ${
//                 currentQuestion === 0
//                   ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
//                   : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50'
//               }`}
//             >
//               Previous
//             </button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <button
//                 onClick={handleSubmitQuiz}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
//               >
//                 Submit Quiz
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextQuestion}
//                 className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
//           <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Navigation</h3>
//           <div className="flex flex-wrap gap-2">
//             {quiz.questions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`w-8 h-8 rounded-lg text-sm transition-all ${
//                   currentQuestion === index
//                     ? 'bg-purple-600 text-white'
//                     : selectedAnswers[index] !== -1
//                     ? 'bg-green-600/20 text-green-400 border border-green-500/30'
//                     : 'bg-[#1a1a23] text-gray-400 hover:text-white'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }







// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Clock, HelpCircle, AlertCircle } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { QuizDetailsSkeleton, QuestionSkeleton } from '@/components/ui/loading-skeleton';

// // ... interfaces same

// export default function QuizPage() {
//   const params = useParams();
//   const router = useRouter();
//   const quizId = params.Id as string;
  
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [submitting, setSubmitting] = useState(false); // ✅ New state for submission

//   useEffect(() => {
//     if (quizId) {
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/quizzes/${quizId}`);
//       const data = await res.json();
      
//       if (data.success) {
//         setQuiz(data.data);
//         setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
//         setTimeLeft(data.data.duration * 60);
//       } else {
//         setError(data.error || 'Quiz not found');
//       }
//     } catch (error) {
//       setError('Failed to load quiz');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStartQuiz = () => {
//     setQuizStarted(true);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleAnswerSelect = (optionIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = optionIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < (quiz?.questions.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     if (!quiz || submitting) return; // ✅ Prevent double submission
    
//     setSubmitting(true); // ✅ Show submitting state
    
//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score += question.marks;
//       }
//     });

//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
      
//       const quizIdValue = quiz._id || quiz.id;
//       const userIdValue = user.id || user._id;
      
//       if (!quizIdValue || !userIdValue) {
//         showToast.error('Invalid data');
//         setSubmitting(false);
//         return;
//       }

//       const resultData = {
//         quizId: quizIdValue,
//         quizTitle: quiz.title,
//         userId: userIdValue,
//         userName: user.name,
//         score,
//         totalMarks: quiz.totalMarks,
//         percentage: Math.round((score / quiz.totalMarks) * 100),
//         submittedAt: new Date().toISOString()
//       };

//       const res = await fetch('/api/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resultData)
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         showToast.success(`Quiz submitted! Score: ${score}/${quiz.totalMarks}`);
//         router.push('/dashboard');
//       } else {
//         showToast.error(data.error || 'Failed to submit quiz');
//         setSubmitting(false);
//       }
//     } catch (error) {
//       showToast.error('Error submitting quiz');
//       setSubmitting(false);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // ✅ Better loading state - only show when actually loading
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <QuizDetailsSkeleton />
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <Toaster />
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-gray-400 mb-4">{error}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F]">
//         <Toaster />
//         <div className="max-w-3xl mx-auto px-4 py-12">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back
//           </button>

//           <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
//             <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
//             <p className="text-gray-400 mb-6">{quiz.description}</p>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="bg-[#1a1a23] rounded-lg p-4">
//                 <div className="flex items-center gap-2 text-purple-400 mb-2">
//                   <HelpCircle className="w-5 h-5" />
//                   <span className="font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t border-[#2a2a35] pt-6">
//               <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 text-gray-400 mb-8">
//                 <li>• You have {quiz.duration} minutes to complete this quiz</li>
//                 <li>• Each question has multiple choice options</li>
//                 <li>• You can navigate between questions</li>
//                 <li>• Your answers are automatically saved</li>
//                 <li>• Submit before time runs out</li>
//               </ul>

//               <button
//                 onClick={handleStartQuiz}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       <Toaster />
//       <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-orange-400">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
//               </div>
//               <div className="text-gray-400">
//                 {currentQuestion + 1} / {quiz.questions.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 py-8">
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
//           <div className="mb-8">
//             <div className="flex items-start gap-3">
//               <span className="flex-shrink-0 w-6 h-6 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm">
//                 {currentQuestion + 1}
//               </span>
//               <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
//             </div>
//           </div>

//           <div className="space-y-3 mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(index)}
//                 className={`w-full text-left p-4 rounded-lg border transition-all ${
//                   selectedAnswers[currentQuestion] === index
//                     ? 'bg-purple-600/20 border-purple-500 text-white'
//                     : 'bg-[#1a1a23] border-[#2a2a35] text-gray-400 hover:border-purple-500/50 hover:text-white'
//                 }`}
//               >
//                 <span className="flex items-center gap-3">
//                   <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
//                     {String.fromCharCode(65 + index)}
//                   </span>
//                   {option}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-6 py-2 rounded-lg transition-all ${
//                 currentQuestion === 0
//                   ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
//                   : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50'
//               }`}
//             >
//               Previous
//             </button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <button
//                 onClick={handleSubmitQuiz}
//                 disabled={submitting}
//                 className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
//                   submitting
//                     ? 'bg-green-600/50 cursor-not-allowed'
//                     : 'bg-green-600 hover:bg-green-700'
//                 } text-white`}
//               >
//                 {submitting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Submitting...</span>
//                   </>
//                 ) : (
//                   'Submit Quiz'
//                 )}
//               </button>
//             ) : (
//               <button
//                 onClick={handleNextQuestion}
//                 className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
//           <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Navigation</h3>
//           <div className="flex flex-wrap gap-2">
//             {quiz.questions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`w-8 h-8 rounded-lg text-sm transition-all ${
//                   currentQuestion === index
//                     ? 'bg-purple-600 text-white'
//                     : selectedAnswers[index] !== -1
//                     ? 'bg-green-600/20 text-green-400 border border-green-500/30'
//                     : 'bg-[#1a1a23] text-gray-400 hover:text-white'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }









'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { ArrowLeft, Clock, HelpCircle, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { showToast } from '@/lib/toast';
import { QuizDetailsSkeleton, QuestionSkeleton } from '@/components/ui/loading-skeleton';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  marks: number;
}

interface Quiz {
  _id: string;
  id?: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  totalMarks: number;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  // Fix: Vercel (Linux) is case-sensitive, local Mac/Windows is not.
  // params.Id works locally, params.id works on Vercel. Use both.
  const quizId = (params.Id ?? params.id) as string;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (quizId) {
      console.log('📥 Quiz ID from params:', quizId);
      fetchQuiz();
    }
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      console.log('📤 Fetching quiz with ID:', quizId);
      
      const res = await fetch(`/api/quizzes/${quizId}`);
      console.log('📥 Response status:', res.status);
      
      const data = await res.json();
      console.log('📥 Quiz data received:', data);
      
      if (data.success) {
        console.log('✅ Quiz loaded successfully');
        setQuiz(data.data);
        setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
        setTimeLeft(data.data.duration * 60);
      } else {
        console.log('❌ Quiz fetch failed:', data.error);
        setError(data.error || 'Quiz not found');
      }
    } catch (error) {
      console.error('❌ Error fetching quiz:', error);
      setError('Failed to load quiz');
    } finally {
      console.log('⏹️ Setting loading to false');
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    console.log('▶️ Starting quiz');
    setQuizStarted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    console.log('📤 Submitting quiz...');
    
    if (!quiz || submitting) return;
    
    setSubmitting(true);
    
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score += question.marks;
      }
    });

    try {
      const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      const user = JSON.parse(userStr || '{}');
      
      const quizIdValue = quiz._id || quiz.id;
      const userIdValue = user.id || user._id;
      
      console.log('🔍 Quiz ID value:', quizIdValue);
      console.log('🔍 User ID value:', userIdValue);
      
      if (!quizIdValue) {
        showToast.error('Quiz ID not found');
        setSubmitting(false);
        return;
      }

      if (!userIdValue) {
        showToast.error('User not logged in');
        setSubmitting(false);
        router.push('/login');
        return;
      }

      const resultData = {
        quizId: quizIdValue,
        quizTitle: quiz.title,
        userId: userIdValue,
        userName: user.name,
        score,
        totalMarks: quiz.totalMarks,
        percentage: Math.round((score / quiz.totalMarks) * 100),
        submittedAt: new Date().toISOString()
      };

      console.log('📦 Submitting result:', resultData);

      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultData)
      });

      const data = await res.json();
      console.log('📥 Submit response:', data);

      if (res.ok && data.success) {
        showToast.success(`Quiz submitted! Score: ${score}/${quiz.totalMarks}`);
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        showToast.error(data.error || 'Failed to submit quiz');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('❌ Error submitting quiz:', error);
      showToast.error('Error submitting quiz');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080810' }}>
        <Toaster />
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <HelpCircle className="w-6 h-6 text-white/50 animate-pulse" />
          </div>
          <div className="flex gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#080810' }}>
        <Toaster />
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}>
            <AlertCircle className="w-8 h-8 text-red-400/70" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Quiz Not Found</h1>
          <p className="text-white/35 text-sm mb-6">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen" style={{ background: '#080810', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        `}</style>
        <Toaster />
        {/* Subtle bg glow */}
        <div className="fixed inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '10%', left: '20%', width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,215,205,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/35 hover:text-white/70 mb-10 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Header */}
            <div className="mb-7 pb-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h1 className="text-2xl font-bold text-white mb-2">{quiz.title}</h1>
              <p className="text-white/40 text-sm leading-relaxed">{quiz.description}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  Duration
                </div>
                <p className="text-xl font-bold text-white">{quiz.duration} <span className="text-sm font-normal text-white/35">mins</span></p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Questions
                </div>
                <p className="text-xl font-bold text-white">{quiz.questions.length} <span className="text-sm font-normal text-white/35">total</span></p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-4">Instructions</p>
              <div className="space-y-2.5">
                {[
                  { icon: CheckCircle, text: `You have ${quiz.duration} minutes to complete this quiz`, ok: true },
                  { icon: CheckCircle, text: 'Each question has multiple choice options', ok: true },
                  { icon: CheckCircle, text: 'You can navigate between questions freely', ok: true },
                  { icon: CheckCircle, text: 'Your answers are saved as you go', ok: true },
                  { icon: XCircle, text: "Submit only when you're ready — no re-attempts", ok: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <item.icon className={`w-4 h-4 shrink-0 ${item.ok ? 'text-white/40' : 'text-white/25'}`} />
                    <span className="text-white/45">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }}
            >
              Start Quiz →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#080810', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
      `}</style>
      <Toaster />

      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-medium text-white/70 truncate max-w-[200px] sm:max-w-sm">{quiz.title}</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  color: timeLeft < 60 ? 'rgba(248,113,113,0.9)' : 'rgba(255,255,255,0.7)' }}>
                <Clock className="w-3.5 h-3.5" />
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-white/30 px-2 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {currentQuestion + 1} / {quiz.questions.length}
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`, background: 'rgba(255,255,255,0.3)' }} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Question card */}
        <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-start gap-3 mb-7">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-white/60"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {currentQuestion + 1}
            </div>
            <div>
              <p className="text-white text-base leading-relaxed">{quiz.questions[currentQuestion].text}</p>
              <p className="text-xs text-white/25 mt-1.5">{quiz.questions[currentQuestion].marks} marks</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5 mb-7">
            {quiz.questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              const letter = String.fromCharCode(65 + index);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className="w-full text-left p-4 rounded-xl transition-all"
                  style={{
                    background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                  onMouseEnter={e => { if (!isSelected) { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; } }}
                  onMouseLeave={e => { if (!isSelected) { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.06)'; } }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                      style={{
                        background: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                        color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                      }}>
                      {letter}
                    </span>
                    <span className="text-sm" style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)' }}>
                      {option}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="px-5 py-2 rounded-lg text-sm transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: currentQuestion === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)',
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Previous
            </button>
            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-all flex items-center gap-2"
                style={{
                  background: submitting ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                }}
              >
                {submitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white/70 rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Quiz <CheckCircle className="w-4 h-4" /></>
                )}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 rounded-lg text-sm font-medium text-white/80 transition-all"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Question navigator */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/30">Quick Navigation</p>
            <span className="text-xs text-white/25">
              {selectedAnswers.filter(a => a !== -1).length}/{quiz.questions.length} answered
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => {
              const isAnswered = selectedAnswers[index] !== -1;
              const isCurrent = currentQuestion === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: isCurrent ? 'rgba(255,255,255,0.15)' : isAnswered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isCurrent ? 'rgba(255,255,255,0.25)' : isAnswered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
                    color: isCurrent ? 'rgba(255,255,255,0.9)' : isAnswered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
// ✅ END OF FILE - NO EXTRA EXPORT