

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
  const quizId = params.Id as string;
  
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
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
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
      <div className="min-h-screen bg-[#0A0A0F]">
        <Toaster />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <QuizDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <Toaster />
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-[#0A0A0F]">
        <Toaster />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
            <p className="text-gray-400 mb-6">{quiz.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#1a1a23] rounded-lg p-4">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Duration</span>
                </div>
                <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
              </div>
              <div className="bg-[#1a1a23] rounded-lg p-4">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Questions</span>
                </div>
                <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
              </div>
            </div>

            <div className="border-t border-[#2a2a35] pt-6">
              <h2 className="text-lg font-medium text-white mb-4">Instructions:</h2>
              <ul className="space-y-2 text-gray-400 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  You have {quiz.duration} minutes to complete this quiz
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Each question has multiple choice options
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  You can navigate between questions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Your answers are automatically saved
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  Don't submit before time runs out
                </li>
              </ul>

              <button
                onClick={handleStartQuiz}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Toaster />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-gray-400 bg-[#1a1a23] px-3 py-1.5 rounded-lg border border-[#2a2a35]">
                {currentQuestion + 1} / {quiz.questions.length}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 h-1.5 bg-[#1a1a23] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                <span className="text-sm font-bold text-purple-400">{currentQuestion + 1}</span>
              </span>
              <div>
                <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
                <p className="text-sm text-gray-500 mt-2">Marks: {quiz.questions[currentQuestion].marks}</p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {quiz.questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              const letter = String.fromCharCode(65 + index);
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all transform hover:scale-[1.02] ${
                    isSelected
                      ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                      : 'border-[#2a2a35] bg-[#1a1a23] hover:border-purple-500/50 hover:bg-[#252530]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-500 text-white' 
                        : 'border-gray-500 text-gray-400'
                    }`}>
                      {letter}
                    </span>
                    <span className={`text-sm sm:text-base ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {option}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-[#2a2a35]">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
                currentQuestion === 0
                  ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
                  : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50 border border-[#2a2a35]'
              }`}
            >
              ← Previous
            </button>
            
            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className={`px-8 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  submitting
                    ? 'bg-green-600/50 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 transform hover:scale-105'
                } text-white shadow-lg shadow-green-600/25`}
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quiz</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-8 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-600/25"
              >
                <span>Next</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <span>Quick Navigation</span>
            <span className="text-xs bg-[#1a1a23] px-2 py-0.5 rounded-full">
              {selectedAnswers.filter(a => a !== -1).length}/{quiz.questions.length} Answered
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => {
              const isAnswered = selectedAnswers[index] !== -1;
              const isCurrent = currentQuestion === index;
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/25'
                      : isAnswered
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30'
                      : 'bg-[#1a1a23] text-gray-400 border border-[#2a2a35] hover:border-purple-500/50 hover:text-white'
                  }`}
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












// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import { 
//   ArrowLeft, Clock, HelpCircle, AlertCircle, 
//   CheckCircle, XCircle, Timer, BookOpen, Award,
//   ChevronLeft, ChevronRight, Send, Sparkles
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// // ✅ Design tokens matching dashboard
// const T = {
//   bg: '#070709',
//   bgCard: '#0f0f12',
//   accent: '#10b981',
//   accentLight: '#34d399',
//   accentDark: '#059669',
//   accentGlow: 'rgba(16,185,129,0.16)',
//   accentBorder: 'rgba(16,185,129,0.2)',
//   accentBg: 'rgba(16,185,129,0.08)',
//   border: 'rgba(255,255,255,0.06)',
//   textMuted: 'rgba(255,255,255,0.4)',
//   textDim: 'rgba(255,255,255,0.25)',
// };

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
//   const quizId = params.id as string;
  
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
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-12 h-12 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-5 h-5 text-emerald-400/60 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !quiz) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-md w-full rounded-2xl p-8 text-center border"
//           style={{ background: T.bgCard, borderColor: T.border }}
//         >
//           <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
//             style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
//             <AlertCircle className="w-8 h-8" style={{ color: '#ef4444' }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
//           <p className="text-sm mb-6" style={{ color: T.textMuted }}>{error}</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
//             style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
//           >
//             Back to Dashboard
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     return (
//       <div className="min-h-screen bg-[#070709]">
//         <Toaster position="top-right" />
        
//         {/* Ambient bg */}
//         <div className="fixed inset-0 pointer-events-none overflow-hidden">
//           <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-emerald-600/7 rounded-full blur-[120px]" />
//         </div>

//         <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
//           <motion.button
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-sm transition-colors mb-8 group"
//             style={{ color: T.textMuted }}
//             whileHover={{ color: '#fff' }}
//           >
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//             Back
//           </motion.button>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="rounded-2xl p-8 border"
//             style={{ background: T.bgCard, borderColor: T.border }}
//           >
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 rounded-xl flex items-center justify-center"
//                 style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//                 <BookOpen className="w-6 h-6" style={{ color: T.accentLight }} />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">{quiz.title}</h1>
//                 <p className="text-sm mt-1" style={{ color: T.textMuted }}>{quiz.description}</p>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="rounded-xl p-4 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
//                 <div className="flex items-center gap-2 mb-2" style={{ color: T.accentLight }}>
//                   <Clock className="w-4 h-4" />
//                   <span className="text-xs font-medium">Duration</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.duration} mins</p>
//               </div>
//               <div className="rounded-xl p-4 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
//                 <div className="flex items-center gap-2 mb-2" style={{ color: T.accentLight }}>
//                   <HelpCircle className="w-4 h-4" />
//                   <span className="text-xs font-medium">Questions</span>
//                 </div>
//                 <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
//               </div>
//             </div>

//             <div className="border-t pt-6" style={{ borderColor: T.border }}>
//               <h2 className="text-sm font-semibold text-white mb-4">Instructions:</h2>
//               <ul className="space-y-2 mb-8">
//                 {[
//                   `You have ${quiz.duration} minutes to complete this quiz`,
//                   'Each question has multiple choice options',
//                   'You can navigate between questions',
//                   'Your answers are automatically saved',
//                   'Don\'t submit before time runs out'
//                 ].map((instruction, idx) => (
//                   <li key={idx} className="flex items-center gap-2 text-xs" style={{ color: T.textMuted }}>
//                     {idx < 4 ? (
//                       <CheckCircle className="w-4 h-4 shrink-0" style={{ color: T.accentLight }} />
//                     ) : (
//                       <XCircle className="w-4 h-4 shrink-0" style={{ color: '#ef4444' }} />
//                     )}
//                     {instruction}
//                   </li>
//                 ))}
//               </ul>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleStartQuiz}
//                 className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
//                 style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
//               >
//                 Start Quiz
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#070709]" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
//       <Toaster position="top-right" />
      
//       {/* Ambient bg */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-emerald-600/7 rounded-full blur-[120px]" />
//       </div>

//       {/* Header */}
//       <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: 'rgba(7,7,9,0.85)', borderColor: T.border }}>
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <h1 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-full">{quiz.title}</h1>
//             <div className="flex items-center gap-2 sm:gap-4">
//               <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border"
//                 style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)' }}>
//                 <Timer className="w-3.5 h-3.5" style={{ color: '#f59e0b' }} />
//                 <span className="font-mono text-sm sm:text-base" style={{ color: '#f59e0b' }}>{formatTime(timeLeft)}</span>
//               </div>
//               <div className="px-3 py-1.5 rounded-lg border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border }}>
//                 <span className="text-xs sm:text-sm" style={{ color: T.textMuted }}>
//                   {currentQuestion + 1} / {quiz.questions.length}
//                 </span>
//               </div>
//             </div>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
//             <motion.div 
//               className="h-full rounded-full"
//               initial={{ width: 0 }}
//               animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
//               transition={{ duration: 0.3 }}
//               style={{ background: `linear-gradient(to right, ${T.accentLight}, ${T.accent})` }}
//             />
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 max-w-3xl mx-auto px-4 py-6 sm:py-8">
//         <motion.div
//           key={currentQuestion}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -20 }}
//           className="rounded-2xl p-4 sm:p-6 border"
//           style={{ background: T.bgCard, borderColor: T.border }}
//         >
//           {/* Question */}
//           <div className="mb-6 sm:mb-8">
//             <div className="flex items-start gap-3">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//                 <span className="text-sm font-bold" style={{ color: T.accentLight }}>{currentQuestion + 1}</span>
//               </div>
//               <div className="flex-1">
//                 <p className="text-base sm:text-lg text-white leading-relaxed">{quiz.questions[currentQuestion].text}</p>
//                 <p className="text-xs mt-2" style={{ color: T.textMuted }}>Marks: {quiz.questions[currentQuestion].marks}</p>
//               </div>
//             </div>
//           </div>

//           {/* Options */}
//           <div className="space-y-3 mb-6 sm:mb-8">
//             {quiz.questions[currentQuestion].options.map((option, index) => {
//               const isSelected = selectedAnswers[currentQuestion] === index;
//               const letter = String.fromCharCode(65 + index);
              
//               return (
//                 <motion.button
//                   key={index}
//                   whileHover={{ scale: 1.01 }}
//                   whileTap={{ scale: 0.99 }}
//                   onClick={() => handleAnswerSelect(index)}
//                   className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all ${
//                     isSelected ? 'border' : ''
//                   }`}
//                   style={isSelected ? {
//                     background: T.accentBg,
//                     borderColor: T.accentBorder
//                   } : {
//                     background: 'rgba(255,255,255,0.02)',
//                     borderColor: T.border
//                   }}
//                 >
//                   <span className="flex items-center gap-3">
//                     <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium shrink-0 ${
//                       isSelected 
//                         ? 'text-white border' 
//                         : 'text-white/40'
//                     }`}
//                       style={isSelected ? {
//                         background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`,
//                         borderColor: T.accentBorder
//                       } : {
//                         borderColor: T.border
//                       }}>
//                       {letter}
//                     </span>
//                     <span className="text-xs sm:text-sm" style={{ color: isSelected ? '#fff' : T.textMuted }}>
//                       {option}
//                     </span>
//                   </span>
//                 </motion.button>
//               );
//             })}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-4 border-t" style={{ borderColor: T.border }}>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 0}
//               className={`px-4 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
//                 currentQuestion === 0
//                   ? 'opacity-40 cursor-not-allowed'
//                   : 'hover:opacity-80'
//               }`}
//               style={currentQuestion !== 0 ? {
//                 background: 'rgba(255,255,255,0.03)',
//                 border: `1px solid ${T.border}`,
//                 color: T.textMuted
//               } : {}}
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Previous
//             </motion.button>
            
//             {currentQuestion === quiz.questions.length - 1 ? (
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleSubmitQuiz}
//                 disabled={submitting}
//                 className="px-6 sm:px-8 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
//                 style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
//               >
//                 {submitting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Submitting...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Submit Quiz</span>
//                     <Send className="w-4 h-4" />
//                   </>
//                 )}
//               </motion.button>
//             ) : (
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleNextQuestion}
//                 className="px-6 sm:px-8 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
//                 style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
//               >
//                 <span>Next</span>
//                 <ChevronRight className="w-4 h-4" />
//               </motion.button>
//             )}
//           </div>
//         </motion.div>

//         {/* Question Navigator */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="mt-4 sm:mt-6 rounded-2xl p-4 border"
//           style={{ background: T.bgCard, borderColor: T.border }}
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-xs font-medium" style={{ color: T.textMuted }}>Quick Navigation</h3>
//             <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', color: T.textMuted }}>
//               {selectedAnswers.filter(a => a !== -1).length}/{quiz.questions.length} Answered
//             </span>
//           </div>
//           <div className="flex flex-wrap gap-1.5 sm:gap-2">
//             {quiz.questions.map((_, index) => {
//               const isAnswered = selectedAnswers[index] !== -1;
//               const isCurrent = currentQuestion === index;
              
//               return (
//                 <motion.button
//                   key={index}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setCurrentQuestion(index)}
//                   className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-medium transition-all ${
//                     isCurrent
//                       ? 'text-white border'
//                       : isAnswered
//                       ? 'text-white border'
//                       : ''
//                   }`}
//                   style={isCurrent ? {
//                     background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`,
//                     borderColor: T.accentBorder
//                   } : isAnswered ? {
//                     background: T.accentBg,
//                     borderColor: T.accentBorder,
//                     color: T.accentLight
//                   } : {
//                     background: 'rgba(255,255,255,0.02)',
//                     border: `1px solid ${T.border}`,
//                     color: T.textMuted
//                   }}
//                 >
//                   {index + 1}
//                 </motion.button>
//               );
//             })}
//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }
// // ✅ END OF FILE - NO EXTRA EXPORT