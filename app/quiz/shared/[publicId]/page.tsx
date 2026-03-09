'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Award, 
  Users, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Send,
  Loader2
} from 'lucide-react';
import { showToast } from '@/lib/toast';
import { Toaster } from 'react-hot-toast';

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: {
    text: string;
    options: string[];
    marks: number;
  }[];
  allowAnonymous: boolean;
}

interface Answer {
  questionIndex: number;
  selectedOption: number;
}

export default function SharedQuizPage() {
  const { publicId } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [started, setStarted] = useState(false);
  const [participant, setParticipant] = useState({ name: '', email: '' });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState<{ score: number; percentage: number } | null>(null);

  useEffect(() => {
    fetchQuiz();
  }, [publicId]);

  useEffect(() => {
    if (started && quiz && !completed) {
      setTimeLeft(quiz.duration * 60);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, quiz, completed]);

  const fetchQuiz = async () => {
    try {
      const res = await fetch(`/api/quiz/shared/${publicId}`);
      const data = await res.json();
      
      if (data.success) {
        setQuiz(data.data);
        setAnswers(new Array(data.data.questions.length).fill(null).map(() => ({ questionIndex: -1, selectedOption: -1 })));
      } else {
        setError(data.error || 'Quiz not found');
      }
    } catch (error) {
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    if (!quiz?.allowAnonymous && !participant.name) {
      showToast.error('Please enter your name');
      return;
    }
    setStarted(true);
  };

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = { questionIndex, selectedOption: optionIndex };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleAutoSubmit = () => {
    handleSubmit(true);
  };

  const handleSubmit = async (autoSubmit = false) => {
    // Check if all questions answered
    const unanswered = answers.findIndex(a => a.selectedOption === -1);
    if (unanswered !== -1 && !autoSubmit) {
      showToast.error(`Please answer question ${unanswered + 1}`);
      setCurrentQuestion(unanswered);
      return;
    }

    setSubmitting(true);
    const toastId = showToast.loading(autoSubmit ? 'Time\'s up! Submitting...' : 'Submitting quiz...');

    try {
      // Calculate score (in real app, this would be done on server)
      let score = 0;
      quiz?.questions.forEach((q, idx) => {
        // This is mock - actual validation should be on server
        if (answers[idx]?.selectedOption === 0) { // Mock: first option is correct
          score += q.marks;
        }
      });

      const percentage = Math.round((score / (quiz?.totalMarks || 1)) * 100);

      const res = await fetch(`/api/quiz/shared/${publicId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers.map(a => a.selectedOption),
          participant,
          score,
          totalMarks: quiz?.totalMarks,
          percentage,
          quizTitle: quiz?.title
        })
      });

      const data = await res.json();

      if (data.success) {
        setResult({ score, percentage });
        setCompleted(true);
        showToast.success('Quiz submitted successfully!');
      } else {
        showToast.error(data.error || 'Submission failed');
      }
    } catch (error) {
      showToast.error('Network error');
    } finally {
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
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400/60 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-xl font-light text-white mb-2">Quiz Not Found</h1>
          <p className="text-white/40 text-sm mb-6">This quiz link may be invalid or expired.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (completed && result) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-light text-white mb-2">Quiz Completed!</h1>
            <p className="text-white/40 text-sm mb-6">Thank you for participating</p>
            
            <div className="bg-white/[0.02] rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/40">Your Score</span>
                <span className="text-2xl font-light text-white">{result.score}/{quiz.totalMarks}</span>
              </div>
              <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.percentage}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full rounded-full ${
                    result.percentage >= 70 ? 'bg-emerald-400' :
                    result.percentage >= 40 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                />
              </div>
              <p className={`text-right text-sm mt-2 ${
                result.percentage >= 70 ? 'text-emerald-400' :
                result.percentage >= 40 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {result.percentage}%
              </p>
            </div>

            <button
              onClick={() => router.push('/')}
              className="w-full py-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
            >
              Go to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-[#070709] text-white">
        <Toaster position="top-right" />
        
        <div className="max-w-md mx-auto px-4 pt-12">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/40 hover:text-white/60 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8"
          >
            <h1 className="text-2xl font-light text-white mb-2">{quiz.title}</h1>
            <p className="text-white/40 text-sm mb-6">{quiz.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <Clock className="w-4 h-4" /> {quiz.duration} minutes
              </div>
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <Award className="w-4 h-4" /> {quiz.totalMarks} total marks
              </div>
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <Users className="w-4 h-4" /> {quiz.questions.length} questions
              </div>
            </div>

            {quiz.allowAnonymous && (
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={participant.name}
                  onChange={(e) => setParticipant({...participant, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
                />
                <input
                  type="email"
                  placeholder="Your email (optional)"
                  value={participant.email}
                  onChange={(e) => setParticipant({...participant, email: e.target.value})}
                  className="w-full px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            )}

            <button
              onClick={handleStart}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-light hover:shadow-lg transition-all"
            >
              Start Quiz
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      <Toaster position="top-right" />
      
      {/* Timer Bar */}
      <div className="sticky top-0 z-10 bg-[#070709]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/40">Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span className={`font-mono ${timeLeft < 60 ? 'text-red-400' : 'text-white/60'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              className="h-full bg-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-sm text-emerald-400">
              {currentQuestion + 1}
            </span>
            <span className="text-sm text-white/40">
              {quiz.questions[currentQuestion].marks} marks
            </span>
          </div>

          <h2 className="text-lg text-white mb-6">{quiz.questions[currentQuestion].text}</h2>

          <div className="space-y-3">
            {quiz.questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion, idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  answers[currentQuestion]?.selectedOption === idx
                    ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/[0.02] border-white/[0.05] text-white/60 hover:border-white/10'
                }`}
              >
                <span className="text-sm">
                  <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 disabled:opacity-30 hover:bg-white/[0.04] transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Quiz
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}