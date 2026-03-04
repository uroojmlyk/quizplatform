'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  Users, 
  BarChart3,
  BookOpen,
  Zap,
  Sparkles,
  ChevronRight,
  Flame
} from 'lucide-react';

interface Quiz {
  _id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  questions: any[];
  createdByName: string;
  category: string;
  attempts: number;
  avgScore: number;
}

export default function TrendingPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    fetchTrendingQuizzes();
  }, [timeRange]);

  const fetchTrendingQuizzes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/public/quizzes?type=trending&range=${timeRange}&limit=12`);
      const data = await res.json();
      if (data.success) {
        setQuizzes(data.data);
      }
    } catch (error) {
      console.error('Error fetching trending quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quizId: string) => {
    window.location.href = `/quiz/${quizId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#111117]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white/60" />
            </button>
            <div>
              <h1 className="text-xl font-medium text-white">Trending Quizzes</h1>
              <p className="text-sm text-white/40">Most popular quizzes right now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/40">Time range:</span>
          <div className="flex gap-2">
            {[
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'all', label: 'All Time' }
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value as any)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  timeRange === range.value
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz._id}
                onClick={() => handleStartQuiz(quiz._id)}
                className="group bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Rank Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    index === 1 ? 'bg-gray-400/20 text-gray-400 border border-gray-400/30' :
                    index === 2 ? 'bg-amber-600/20 text-amber-600 border border-amber-600/30' :
                    'bg-white/5 text-white/30 border border-white/10'
                  }`}>
                    #{index + 1}
                  </div>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                    {quiz.attempts} plays
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{quiz.title}</h3>
                <p className="text-sm text-white/40 mb-4 line-clamp-2">{quiz.description}</p>

                <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {quiz.duration} min
                  </span>
                  <span>•</span>
                  <span>{quiz.questions?.length || 0} questions</span>
                  <span>•</span>
                  <span>{quiz.totalMarks} marks</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="w-3 h-3 text-white/30" />
                    <span className="text-white/40">{quiz.attempts} plays</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <BarChart3 className="w-3 h-3 text-white/30" />
                    <span className="text-white/40">{quiz.avgScore}% avg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#111117] rounded-xl border border-white/10">
            <TrendingUp className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">No trending quizzes found</p>
          </div>
        )}
      </div>
    </div>
  );
}