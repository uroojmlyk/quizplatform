






'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle, 
  Edit, 
  BarChart, 
  LogOut, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Sparkles,
  Award,
  Clock,
  ChevronRight,
  Download,
  Filter,
  Search
} from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: any[];
  totalMarks: number;
  createdAt: string;
}

interface Result {
  id: string;
  quizId: string;
  quizTitle: string;
  userId: string;
  userName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    
    if (userData.role !== 'teacher') {
      router.push('/dashboard');
      return;
    }

    setUser(userData);
    fetchData(userData.id);
  }, [router]);

  const fetchData = async (teacherId: string) => {
    try {
      // Fetch teacher's quizzes
      const quizzesRes = await fetch(`/api/quizzes/teacher/${teacherId}`);
      const quizzesData = await quizzesRes.json();
      
      if (quizzesData.success) {
        setQuizzes(quizzesData.data);
      }

      // Fetch teacher's results
      const resultsRes = await fetch(`/api/results/teacher/${teacherId}`);
      const resultsData = await resultsRes.json();
      
      if (resultsData.success) {
        setResults(resultsData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const uniqueStudents = [...new Set(results.map(r => r.userId))].length;
  const totalSubmissions = results.length;
  const averageScore = results.length 
    ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
    : 0;

  const stats = [
    { 
      title: 'My Quizzes', 
      value: quizzes.length, 
      icon: BookOpen, 
      change: `${quizzes.length} total`,
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400'
    },
    { 
      title: 'Total Students', 
      value: uniqueStudents, 
      icon: Users, 
      change: `${uniqueStudents} enrolled`,
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-500/10',
      text: 'text-green-400'
    },
    { 
      title: 'Submissions', 
      value: totalSubmissions, 
      icon: Award, 
      change: `${totalSubmissions} total`,
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400'
    },
    { 
      title: 'Average Score', 
      value: `${averageScore}%`, 
      icon: TrendingUp, 
      change: averageScore >= 70 ? 'Good performance' : 'Needs improvement',
      gradient: 'from-orange-500 to-red-500',
      bg: 'bg-orange-500/10',
      text: 'text-orange-400'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full filter blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    QuizMaster
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-purple-400">Teacher</span>
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#1a1a23] rounded-xl border border-[#2a2a35]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {user?.name?.charAt(0) || 'T'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400">Teacher</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 sm:p-2.5 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Welcome Section */}
          <div className="relative mb-6 sm:mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-r from-[#1a1a23] to-[#111117] border border-[#2a2a35] rounded-2xl p-4 sm:p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    Welcome back, {user?.name}! 
                    <span className="inline-block animate-wave text-2xl sm:text-3xl">👋</span>
                  </h1>
                  <p className="text-sm sm:text-base text-gray-400">Manage your quizzes and track student progress</p>
                </div>
                <button 
                  onClick={() => router.push('/teacher/create-quiz')}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25 w-full sm:w-auto"
                >
                  <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create New Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl"
                     style={{ background: `linear-gradient(to right, ${stat.gradient})` }}></div>
                <div className="relative bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5 hover:border-transparent transition-all">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className={`p-2 sm:p-2.5 ${stat.bg} rounded-lg`}>
                      <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.text}`} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500">{stat.change}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search quizzes by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
              />
            </div>
          </div>

          {/* My Quizzes Section */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white">My Quizzes</h2>
              <button className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                Filter
              </button>
            </div>
            
            {filteredQuizzes.length === 0 ? (
              <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-8 sm:p-10 text-center">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-sm sm:text-base text-gray-400">No quizzes found</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">Click "Create New Quiz" to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="group bg-[#111117] border border-[#2a2a35] rounded-xl p-4 sm:p-5 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {quiz.title}
                      </h3>
                      <span className="text-[10px] sm:text-xs text-gray-500">
                        {formatDate(quiz.createdAt)}
                      </span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-400 mb-4 line-clamp-2">
                      {quiz.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {quiz.duration} mins
                      </span>
                      <span>•</span>
                      <span>{quiz.questions?.length || 0} questions</span>
                      <span>•</span>
                      <span>{quiz.totalMarks} marks</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/teacher/edit-quiz/${quiz.id}`)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#1a1a23] hover:bg-yellow-600/20 border border-[#2a2a35] hover:border-yellow-500/50 rounded-lg text-gray-400 hover:text-yellow-400 transition-all text-xs sm:text-sm"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => router.push(`/teacher/quiz-results/${quiz.id}`)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#1a1a23] hover:bg-green-600/20 border border-[#2a2a35] hover:border-green-500/50 rounded-lg text-gray-400 hover:text-green-400 transition-all text-xs sm:text-sm"
                      >
                        <BarChart className="w-3 h-3 sm:w-4 sm:h-4" />
                        Results
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Results Section */}
          {results.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Results</h2>
                <button className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  Export
                </button>
              </div>
              
              <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#1a1a23] border-b border-[#2a2a35]">
                      <tr>
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-400">Student</th>
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-400">Quiz</th>
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-400">Score</th>
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-400">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2a35]">
                      {results.slice(0, 5).map((result) => (
                        <tr key={result.id} className="hover:bg-[#1a1a23] transition-colors">
                          <td className="p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-white">{result.userName}</p>
                          </td>
                          <td className="p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-gray-300">{result.quizTitle}</p>
                          </td>
                          <td className="p-3 sm:p-4">
                            <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                              result.percentage >= 70 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              {result.percentage}%
                            </span>
                          </td>
                          <td className="p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-gray-500">
                              {formatDate(result.submittedAt)}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}