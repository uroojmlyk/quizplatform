'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { 
  ArrowLeft,
  Award,
  Clock,
  TrendingUp,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { showToast } from '@/lib/toast';
import QuestionReview from '@/components/results/question-review';
import AnalyticsChart from '@/components/results/analytics-chart';

interface ResultData {
  result: {
    id: string;
    quizId: string;
    quizTitle: string;
    userName: string;
    score: number;
    totalMarks: number;
    percentage: number;
    submittedAt: string;
  };
  quiz: {
    id: string;
    title: string;
    questions: Array<{
      number: number;
      text: string;
      options: string[];
      correctAnswer: number;
      marks: number;
    }>;
  } | null;
}

// Mock user answers - in real app, these would come from the result data
const mockUserAnswers = [0, 1, 2, 0, 1]; // Example: question1: option A, question2: option B, etc.
const mockTimeSpent = [45, 60, 30, 90, 75]; // seconds per question

export default function ResultDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<ResultData | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!resultData || !resultData.quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Result Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { result, quiz } = resultData;

  // Prepare analytics data
  const analyticsData = quiz.questions.map((q, index) => ({
    questionNumber: index + 1,
    correct: mockUserAnswers[index] === q.correctAnswer,
    marks: q.marks,
    timeSpent: mockTimeSpent[index]
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Quiz Results</h1>
                <p className="text-sm text-gray-500">{result.quizTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={shareResult}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={downloadPDF}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Score Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-purple-100 text-sm mb-2">Student</p>
              <h2 className="text-2xl font-bold mb-4">{result.userName}</h2>
              <div className="flex items-center gap-2 text-purple-100">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(result.submittedAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm mb-2">Score</p>
              <div className="text-5xl font-bold mb-2">{result.score}/{result.totalMarks}</div>
              <div className="flex items-center gap-2 justify-end">
                <TrendingUp className="w-5 h-5 text-purple-200" />
                <span className="text-xl font-semibold">{result.percentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Analytics</h2>
          <AnalyticsChart data={analyticsData} />
        </div>

        {/* Question Review */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h2>
          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <QuestionReview
                key={index}
                question={question}
                userAnswer={mockUserAnswers[index]}
                timeSpent={mockTimeSpent[index]}
              />
            ))}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}