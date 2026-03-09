'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { 
  ArrowLeft,
  Award,
  BarChart3,
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface Result {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [filterPercentage, setFilterPercentage] = useState<string>('all');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      router.push('/login');
      return;
    }
    fetchResults(user.id);
  }, []);

  const fetchResults = async (userId: string) => {
    try {
      const res = await fetch(`/api/results/user/${userId}`);
      const data = await res.json();
      
      if (data.success) {
        setResults(data.data);
        setFilteredResults(data.data);
      } else {
        showToast.error('Failed to load results');
      }
    } catch (error) {
      showToast.error('Error loading results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...results];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.quizTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply percentage filter
    if (filterPercentage !== 'all') {
      const [min, max] = filterPercentage.split('-').map(Number);
      filtered = filtered.filter(r => {
        if (max) {
          return r.percentage >= min && r.percentage <= max;
        }
        return r.percentage >= min;
      });
    }

    // Apply sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } else {
      filtered.sort((a, b) => b.percentage - a.percentage);
    }

    setFilteredResults(filtered);
  }, [searchTerm, sortBy, filterPercentage, results]);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-blue-400';
    if (percentage >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-500/10 border-emerald-500/30';
    if (percentage >= 60) return 'bg-blue-500/10 border-blue-500/30';
    if (percentage >= 40) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  const calculateStats = () => {
    if (results.length === 0) return { avgScore: 0, bestScore: 0, totalPoints: 0 };
    
    const avgScore = Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length);
    const bestScore = Math.max(...results.map(r => r.percentage));
    const totalPoints = results.reduce((acc, r) => acc + r.score, 0);
    
    return { avgScore, bestScore, totalPoints };
  };

  const stats = calculateStats();

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

  return (
    <div className="min-h-screen bg-[#09090B]">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white/40 hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-light text-white">my results</h1>
            <p className="text-sm text-white/30 mt-1">
              {results.length} quiz {results.length === 1 ? 'attempt' : 'attempts'}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          >
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-white/40">average score</span>
              </div>
              <p className="text-2xl font-light text-white">{stats.avgScore}%</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-yellow-400/60" />
                <span className="text-xs text-white/40">best score</span>
              </div>
              <p className="text-2xl font-light text-white">{stats.bestScore}%</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/40">total points</span>
              </div>
              <p className="text-2xl font-light text-white">{stats.totalPoints}</p>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="search by quiz name..."
                className="w-full pl-9 pr-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-white/20" />
                <span className="text-xs text-white/30">filter:</span>
                <select
                  value={filterPercentage}
                  onChange={(e) => setFilterPercentage(e.target.value)}
                  className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500/50"
                >
                  <option value="all">all scores</option>
                  <option value="80-100">80% - 100%</option>
                  <option value="60-79">60% - 79%</option>
                  <option value="40-59">40% - 59%</option>
                  <option value="0-39">below 40%</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">sort by:</span>
                <button
                  onClick={() => setSortBy('date')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    sortBy === 'date'
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'bg-white/[0.02] text-white/30 hover:text-white/50 border border-white/[0.05]'
                  }`}
                >
                  latest
                </button>
                <button
                  onClick={() => setSortBy('score')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    sortBy === 'score'
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'bg-white/[0.02] text-white/30 hover:text-white/50 border border-white/[0.05]'
                  }`}
                >
                  highest score
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || filterPercentage !== 'all') && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.05]">
              <span className="text-xs text-white/30">active filters:</span>
              {searchTerm && (
                <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[10px] border border-indigo-500/30">
                  "{searchTerm}"
                </span>
              )}
              {filterPercentage !== 'all' && (
                <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[10px] border border-indigo-500/30">
                  {filterPercentage}%
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterPercentage('all');
                }}
                className="text-[10px] text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
              >
                <XCircle className="w-3 h-3" />
                clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Results List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 bg-white/[0.02] border border-white/[0.05] rounded-xl">
              <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white/20" />
              </div>
              <p className="text-white/40 text-sm mb-2">no results found</p>
              {results.length > 0 && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterPercentage('all');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  clear filters
                </button>
              )}
              {results.length === 0 && (
                <Link
                  href="/quizzes"
                  className="inline-block mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  take a quiz to see results
                </Link>
              )}
            </div>
          ) : (
            filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/results/${result.id}`}
                  className="block group"
                >
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 hover:border-white/10 hover:bg-white/[0.04] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Quiz Info */}
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-white group-hover:text-indigo-400 transition-colors mb-2">
                          {result.quizTitle}
                        </h3>
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

                      {/* Score */}
                      <div className="flex items-center gap-4">
                        <div className={`px-4 py-2 rounded-xl ${getScoreBg(result.percentage)}`}>
                          <p className={`text-xl font-light ${getScoreColor(result.percentage)}`}>
                            {result.percentage}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/60">
                            {result.score}/{result.totalMarks}
                          </p>
                          <p className="text-[10px] text-white/30">marks</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-indigo-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Results Count */}
        {filteredResults.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-white/20 text-center mt-4"
          >
            showing {filteredResults.length} of {results.length} results
          </motion.p>
        )}
      </div>
    </div>
  );
}