'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  BarChart3,
  BookOpen,
  Sparkles,
  Grid,
  Filter,
  ChevronDown
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

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const categoryMap: Record<string, CategoryInfo> = {
  'web-dev': {
    id: 'web-dev',
    name: 'Web Development',
    description: 'HTML, CSS, JavaScript, React, Next.js and more',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500'
  },
  'programming': {
    id: 'programming',
    name: 'Programming',
    description: 'Python, Java, C++, Data Structures, Algorithms',
    icon: '💻',
    color: 'from-purple-500 to-pink-500'
  },
  'database': {
    id: 'database',
    name: 'Database',
    description: 'MongoDB, SQL, MySQL, PostgreSQL, Prisma',
    icon: '🗄️',
    color: 'from-green-500 to-emerald-500'
  },
  'aptitude': {
    id: 'aptitude',
    name: 'Aptitude',
    description: 'Mathematics, Logical Reasoning, Quantitative Aptitude',
    icon: '🧠',
    color: 'from-orange-500 to-red-500'
  },
  'general': {
    id: 'general',
    name: 'General Knowledge',
    description: 'Science, History, Geography, Current Affairs',
    icon: '📚',
    color: 'from-yellow-500 to-amber-500'
  }
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'highest'>('popular');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const category = categoryMap[slug] || {
    id: slug,
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: 'Quizzes in this category',
    icon: '📋',
    color: 'from-gray-500 to-gray-600'
  };

  useEffect(() => {
    fetchQuizzes();
  }, [slug, sortBy, page]);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch(`/api/public/quizzes?category=${slug}&sort=${sortBy}&page=${page}&limit=9`);
      const data = await res.json();
      if (data.success) {
        if (page === 1) {
          setQuizzes(data.data);
        } else {
          setQuizzes(prev => [...prev, ...data.data]);
        }
        setHasMore(data.data.length === 9);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quizId: string) => {
    window.location.href = `/quiz/${quizId}`;
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white/40 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      {/* Header with Category Info */}
      <div className={`bg-gradient-to-r ${category.color} bg-opacity-5 border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-medium text-white mb-2">{category.name}</h1>
              <p className="text-white/60">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/40" />
            <span className="text-sm text-white/40">Sort by:</span>
            <div className="flex gap-2 ml-2">
              {[
                { value: 'popular', label: 'Most Popular' },
                { value: 'newest', label: 'Newest' },
                { value: 'highest', label: 'Highest Rated' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value as any);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    sortBy === option.value
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-white/40">
            {quizzes.length} quizzes
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {quizzes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  onClick={() => handleStartQuiz(quiz._id)}
                  className="group bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                      {quiz.category || category.name}
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
                      <span className="text-white/40">{quiz.attempts || 0} plays</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <BarChart3 className="w-3 h-3 text-white/30" />
                      <span className="text-white/40">{quiz.avgScore || 0}% avg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-[#111117] rounded-xl border border-white/10">
            <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">No quizzes found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}