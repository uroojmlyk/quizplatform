// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Toaster } from 'react-hot-toast';
// import { 
//   ArrowLeft,
//   Award,
//   Clock,
//   TrendingUp,
//   Sparkles,
//   Download,
//   Share2
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import QuestionReview from '@/components/results/question-review';
// import AnalyticsChart from '@/components/results/analytics-chart';

// interface ResultData {
//   result: {
//     id: string;
//     quizId: string;
//     quizTitle: string;
//     userName: string;
//     score: number;
//     totalMarks: number;
//     percentage: number;
//     submittedAt: string;
//   };
//   quiz: {
//     id: string;
//     title: string;
//     questions: Array<{
//       number: number;
//       text: string;
//       options: string[];
//       correctAnswer: number;
//       marks: number;
//     }>;
//   } | null;
// }

// // Mock user answers - in real app, these would come from the result data
// const mockUserAnswers = [0, 1, 2, 0, 1]; // Example: question1: option A, question2: option B, etc.
// const mockTimeSpent = [45, 60, 30, 90, 75]; // seconds per question

// export default function ResultDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [resultData, setResultData] = useState<ResultData | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     fetchResult();
//   }, [params.resultId]);

//   const fetchResult = async () => {
//     try {
//       const res = await fetch(`/api/results/${params.resultId}`);
//       const data = await res.json();

//       if (data.success) {
//         setResultData(data.data);
//       } else {
//         showToast.error('Failed to load result');
//       }
//     } catch (error) {
//       showToast.error('Error loading result');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = () => {
//     showToast.success('Downloading PDF...');
//     // Implement PDF download
//   };

//   const shareResult = () => {
//     navigator.clipboard.writeText(window.location.href);
//     showToast.success('Link copied to clipboard!');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (!resultData || !resultData.quiz) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Result Not Found</h1>
//           <button
//             onClick={() => router.back()}
//             className="text-gray-600 hover:text-gray-900"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { result, quiz } = resultData;

//   // Prepare analytics data
//   const analyticsData = quiz.questions.map((q, index) => ({
//     questionNumber: index + 1,
//     correct: mockUserAnswers[index] === q.correctAnswer,
//     marks: q.marks,
//     timeSpent: mockTimeSpent[index]
//   }));

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Toaster />
      
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => router.back()}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold text-gray-900">Quiz Results</h1>
//                 <p className="text-sm text-gray-500">{result.quizTitle}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={shareResult}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 title="Share"
//               >
//                 <Share2 className="w-5 h-5 text-gray-600" />
//               </button>
//               <button
//                 onClick={downloadPDF}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 title="Download PDF"
//               >
//                 <Download className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Score Card */}
//         <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//             <div>
//               <p className="text-purple-100 text-sm mb-2">Student</p>
//               <h2 className="text-2xl font-bold mb-4">{result.userName}</h2>
//               <div className="flex items-center gap-2 text-purple-100">
//                 <Clock className="w-4 h-4" />
//                 <span className="text-sm">
//                   {new Date(result.submittedAt).toLocaleString()}
//                 </span>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-purple-100 text-sm mb-2">Score</p>
//               <div className="text-5xl font-bold mb-2">{result.score}/{result.totalMarks}</div>
//               <div className="flex items-center gap-2 justify-end">
//                 <TrendingUp className="w-5 h-5 text-purple-200" />
//                 <span className="text-xl font-semibold">{result.percentage}%</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Analytics Charts */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Analytics</h2>
//           <AnalyticsChart data={analyticsData} />
//         </div>

//         {/* Question Review */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h2>
//           <div className="space-y-4">
//             {quiz.questions.map((question, index) => (
//               <QuestionReview
//                 key={index}
//                 question={question}
//                 userAnswer={mockUserAnswers[index]}
//                 timeSpent={mockTimeSpent[index]}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Back to Dashboard */}
//         <div className="mt-8 text-center">
//           <Link
//             href="/dashboard"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { 
  ArrowLeft,
  Award,
  Clock,
  TrendingUp,
  Sparkles,
  Download,
  Share2,
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar,
  Users,
  Target,
  Zap,
  ChevronRight
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface ResultData {
  result: {
    id: string;
    quizId: string;
    quizTitle: string;
    quizDescription?: string;
    userName: string;
    userEmail?: string;
    score: number;
    totalMarks: number;
    percentage: number;
    submittedAt: string;
  };
  quiz: {
    id: string;
    title: string;
    description?: string;
    questions: Array<{
      number: number;
      text: string;
      options: string[];
      correctAnswer: number;
      marks: number;
    }>;
  } | null;
  answers?: Array<{
    question: string;
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
    marks: number;
    timeSpent?: number;
  }>;
}

export default function ResultDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'questions'>('overview');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    fetchResult();
  }, [params.resultId]);

  const fetchResult = async () => {
    try {
      const res = await fetch(`/api/results/${params.resultId}`);
      const data = await res.json();

      if (data.success) {
        setResultData(data.data);
      } else {
        showToast.error('Failed to load result');
      }
    } catch (error) {
      showToast.error('Error loading result');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    showToast.success('Downloading PDF...');
    // Implement PDF download
  };

  const shareResult = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast.success('Link copied to clipboard!');
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-blue-400';
    if (percentage >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-500/20 border-emerald-500/30';
    if (percentage >= 60) return 'bg-blue-500/20 border-blue-500/30';
    if (percentage >= 40) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-400/60 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!resultData || !resultData.quiz) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/[0.05]">
            <Award className="w-10 h-10 text-white/20" />
          </div>
          <h1 className="text-xl font-light text-white mb-2">Result Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { result, quiz, answers } = resultData;
  
  // Use mock answers if real ones not available
  const userAnswers = answers || quiz.questions.map((_, index) => ({
    question: quiz.questions[index].text,
    userAnswer: 0,
    correctAnswer: quiz.questions[index].correctAnswer,
    isCorrect: index % 2 === 0, // Mock for demo
    marks: quiz.questions[index].marks,
    timeSpent: Math.floor(Math.random() * 60) + 30 // Mock time spent
  }));

  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const totalQuestions = quiz.questions.length;
  const accuracy = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#09090B]">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-light text-white">result details</h1>
                <p className="text-xs text-white/30">{result.quizTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={shareResult}
                className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60 transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={downloadPDF}
                className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60 transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-white/40">student</span>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">{result.userName}</h2>
              {result.userEmail && (
                <p className="text-sm text-white/30 mb-3">{result.userEmail}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(result.submittedAt).toLocaleDateString()}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(result.submittedAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <Target className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-white/40">score</span>
              </div>
              <div className="flex items-end gap-3">
                <div className={`px-4 py-2 rounded-xl ${getScoreBg(result.percentage)}`}>
                  <p className={`text-3xl font-light ${getScoreColor(result.percentage)}`}>
                    {result.percentage}%
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-light text-white">
                    {result.score}/{result.totalMarks}
                  </p>
                  <p className="text-xs text-white/30">total marks</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">correct</p>
            <p className="text-xl font-light text-white">{correctCount}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">incorrect</p>
            <p className="text-xl font-light text-white">{totalQuestions - correctCount}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">accuracy</p>
            <p className="text-xl font-light text-white">{accuracy}%</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">questions</p>
            <p className="text-xl font-light text-white">{totalQuestions}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-1 mb-6 border-b border-white/[0.05] pb-4"
        >
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            overview
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'questions'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            question review
          </button>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === 'overview' ? (
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                performance summary
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/40">accuracy</span>
                    <span className="text-white/60">{accuracy}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-white/[0.02] rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <p className="text-xs text-white/40">correct</p>
                    <p className="text-lg text-white">{correctCount}</p>
                  </div>
                  <div className="text-center p-3 bg-white/[0.02] rounded-lg">
                    <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <p className="text-xs text-white/40">incorrect</p>
                    <p className="text-lg text-white">{totalQuestions - correctCount}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-white/30">
                    quiz: {quiz.description || 'No description provided'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const answer = userAnswers[index];
                return (
                  <div
                    key={index}
                    className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="w-6 h-6 bg-indigo-500/10 rounded-lg flex items-center justify-center text-xs text-indigo-400">
                          {index + 1}
                        </span>
                        <p className="text-sm text-white">{question.text}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {answer.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className="text-xs text-white/40">{question.marks} marks</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                      <div>
                        <p className="text-white/30 mb-1">your answer</p>
                        <p className={answer.isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                          {question.options[answer.userAnswer] || `Option ${String.fromCharCode(65 + answer.userAnswer)}`}
                        </p>
                      </div>
                      {!answer.isCorrect && (
                        <div>
                          <p className="text-white/30 mb-1">correct answer</p>
                          <p className="text-emerald-400">
                            {question.options[question.correctAnswer] || `Option ${String.fromCharCode(65 + question.correctAnswer)}`}
                          </p>
                        </div>
                      )}
                      {answer.timeSpent && (
                        <div className="col-span-2 mt-2">
                          <p className="text-white/30 text-[10px] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            time spent: {Math.floor(answer.timeSpent / 60)}m {answer.timeSpent % 60}s
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Back to Dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60 transition-colors text-sm"
          >
            back to dashboard
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}