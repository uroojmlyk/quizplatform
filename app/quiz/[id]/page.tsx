


'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, HelpCircle, AlertCircle } from 'lucide-react';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  marks: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  totalMarks: number;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      console.log('Fetching quiz with ID:', quizId);
      
      const res = await fetch(`/api/quizzes/${quizId}`);
      const data = await res.json();
      
      console.log('Quiz data received:', data);
      
      if (data.success) {
        setQuiz(data.data);
        setSelectedAnswers(new Array(data.data.questions.length).fill(-1));
        setTimeLeft(data.data.duration * 60);
      } else {
        setError(data.error || 'Quiz not found');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
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
    let score = 0;
    quiz?.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score += question.marks;
      }
    });

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const resultData = {
        quizId: quiz?._id,
        quizTitle: quiz?.title,
        userId: user.id || user._id,
        userName: user.name,
        score,
        totalMarks: quiz?.totalMarks,
        percentage: Math.round((score / (quiz?.totalMarks || 1)) * 100),
        submittedAt: new Date().toISOString()
      };

      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultData)
      });

      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Found</h1>
          <p className="text-gray-400 mb-4">{error || 'The quiz you are looking for does not exist'}</p>
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
                <li>• You have {quiz.duration} minutes to complete this quiz</li>
                <li>• Each question has multiple choice options</li>
                <li>• You can navigate between questions</li>
                <li>• Your answers are automatically saved</li>
                <li>• Submit before time runs out</li>
              </ul>

              <button
                onClick={handleStartQuiz}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
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
      <header className="sticky top-0 z-50 bg-[#111117]/80 backdrop-blur-xl border-b border-[#2a2a35]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium text-white">{quiz.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-orange-400">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-gray-400">
                {currentQuestion + 1} / {quiz.questions.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-6">
          <div className="mb-8">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm">
                {currentQuestion + 1}
              </span>
              <p className="text-white text-lg">{quiz.questions[currentQuestion].text}</p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-purple-600/20 border-purple-500 text-white'
                    : 'bg-[#1a1a23] border-[#2a2a35] text-gray-400 hover:border-purple-500/50 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg transition-all ${
                currentQuestion === 0
                  ? 'bg-[#1a1a23] text-gray-600 cursor-not-allowed'
                  : 'bg-[#1a1a23] text-gray-400 hover:text-white hover:border-purple-500/50'
              }`}
            >
              Previous
            </button>
            
            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              >
                Next
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 bg-[#111117] border border-[#2a2a35] rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-lg text-sm transition-all ${
                  currentQuestion === index
                    ? 'bg-purple-600 text-white'
                    : selectedAnswers[index] !== -1
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                    : 'bg-[#1a1a23] text-gray-400 hover:text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}