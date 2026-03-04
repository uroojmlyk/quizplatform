'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  TrendingUp, 
  Award, 
  Users,
  Sparkles,
  ChevronRight,
  BookOpen,
  Zap,
  Globe,
  Code,
  Database,
  Brain,
  BarChart3
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

interface Category {
  id: string;
  name: string;
  icon: any;
  count: number;
  color: string;
}

export default function ExplorePage() {
  const [featuredQuizzes, setFeaturedQuizzes] = useState<Quiz[]>([]);
  const [trendingQuizzes, setTrendingQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { id: 'web-dev', name: 'Web Development', icon: Globe, count: 24, color: 'from-blue-500 to-cyan-500' },
    { id: 'programming', name: 'Programming', icon: Code, count: 32, color: 'from-purple-500 to-pink-500' },
    { id: 'database', name: 'Database', icon: Database, count: 18, color: 'from-green-500 to-emerald-500' },
    { id: 'aptitude', name: 'Aptitude', icon: Brain, count: 45, color: 'from-orange-500 to-red-500' },
    { id: 'general', name: 'General Knowledge', icon: Award, count: 28, color: 'from-yellow-500 to-amber-500' },
  ];

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      // Fetch featured quizzes
      const featuredRes = await fetch('/api/public/quizzes?type=featured');
      const featuredData = await featuredRes.json();
      if (featuredData.success) {
        setFeaturedQuizzes(featuredData.data);
      }

      // Fetch trending quizzes
      const trendingRes = await fetch('/api/public/quizzes?type=trending');
      const trendingData = await trendingRes.json();
      if (trendingData.success) {
        setTrendingQuizzes(trendingData.data);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white/40 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      {/* Hero Section */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-[#0B0B0F] to-[#111117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Explore <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Quizzes</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">
              Discover thousands of quizzes created by our community. No login required to play!
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/explore/trending"
                className="px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Trending Now
              </Link>
              <Link
                href="/explore/category/all"
                className="px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all border border-white/10"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium text-white">Categories</h2>
          <Link href="/explore/categories" className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/explore/category/${category.id}`}
              className="group block bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">{category.name}</h3>
              <p className="text-sm text-white/40">{category.count} quizzes</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Quizzes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-yellow-400" />
            <h2 className="text-2xl font-medium text-white">Featured Quizzes</h2>
          </div>
          <Link href="/explore/featured" className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredQuizzes.map((quiz) => (
            <div
              key={quiz._id}
              onClick={() => handleStartQuiz(quiz._id)}
              className="group bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                  {quiz.category || 'General'}
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

          {featuredQuizzes.length === 0 && (
            <div className="col-span-3 text-center py-12 bg-[#111117] rounded-xl border border-white/10">
              <Award className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No featured quizzes yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Quizzes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-medium text-white">Trending Now</h2>
          </div>
          <Link href="/explore/trending" className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingQuizzes.map((quiz) => (
            <div
              key={quiz._id}
              onClick={() => handleStartQuiz(quiz._id)}
              className="group bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                  Hot 🔥
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

          {trendingQuizzes.length === 0 && (
            <div className="col-span-3 text-center py-12 bg-[#111117] rounded-xl border border-white/10">
              <TrendingUp className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No trending quizzes yet</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Want to create your own quiz?
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Join our community of creators. Sign up for free and start sharing your knowledge.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all"
          >
            Get Started
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}