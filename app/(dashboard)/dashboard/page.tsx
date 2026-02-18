

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   BookOpen, 
//   Award, 
//   Clock, 
//   TrendingUp, 
//   LogOut, 
//   User, 
//   ChevronRight, 
//   Sparkles,
//   Zap,
//   BarChart3,
//   Target,
//   Activity
// } from 'lucide-react';

// export default function StudentDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [quizzes, setQuizzes] = useState<any[]>([]);
//   const [results, setResults] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(storedUser);
//     setUser(userData);
    
//     // Mock data - replace with actual
//     setQuizzes([
//       { id: '1', title: 'JavaScript Fundamentals', description: 'Test your JS basics', duration: 30, questions: 10, totalMarks: 100, createdByName: 'Dr. Sarah' },
//       { id: '2', title: 'React Hooks Mastery', description: 'Advanced React concepts', duration: 45, questions: 15, totalMarks: 150, createdByName: 'Prof. John' },
//     ]);
    
//     setResults([
//       { id: '1', quizTitle: 'JavaScript Fundamentals', percentage: 85, score: 85, totalMarks: 100, submittedAt: new Date().toISOString() },
//       { id: '2', quizTitle: 'CSS Grid', percentage: 92, score: 92, totalMarks: 100, submittedAt: new Date(Date.now() - 86400000).toISOString() },
//     ]);
    
//     setIsLoading(false);
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const stats = [
//     { 
//       title: 'Available Quizzes', 
//       value: quizzes.length, 
//       icon: BookOpen, 
//       change: '+2 this week',
//       gradient: 'from-blue-500 to-cyan-500',
//       bg: 'bg-blue-500/10',
//       text: 'text-blue-400'
//     },
//     { 
//       title: 'Completed', 
//       value: results.length, 
//       icon: Award, 
//       change: '85% avg',
//       gradient: 'from-green-500 to-emerald-500',
//       bg: 'bg-green-500/10',
//       text: 'text-green-400'
//     },
//     { 
//       title: 'Average Score', 
//       value: results.length ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) + '%' : '0%', 
//       icon: Target, 
//       change: 'Top 15%',
//       gradient: 'from-purple-500 to-pink-500',
//       bg: 'bg-purple-500/10',
//       text: 'text-purple-400'
//     },
//     { 
//       title: 'Study Time', 
//       value: '12.5 hrs', 
//       icon: Activity, 
//       change: 'This week',
//       gradient: 'from-orange-500 to-red-500',
//       bg: 'bg-orange-500/10',
//       text: 'text-orange-400'
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0A0A0F]">
//       {/* Animated Background */}
//       <div className="fixed inset-0">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="backdrop-blur-xl bg-[#111117]/80 border-b border-[#2a2a35] sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20">
//                   <Sparkles className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                   QuizMaster
//                 </span>
//               </div>

//               <div className="flex items-center gap-4">
//                 {/* User Menu */}
//                 <div className="flex items-center gap-3 px-3 py-2 bg-[#1a1a23] rounded-xl border border-[#2a2a35]">
//                   <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
//                     {user?.name?.charAt(0) || 'U'}
//                   </div>
//                   <div className="hidden sm:block">
//                     <p className="text-sm font-medium text-white">{user?.name}</p>
//                     <p className="text-xs text-gray-400">{user?.role}</p>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all"
//                 >
//                   <LogOut className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Welcome Section */}
//           <div className="relative mb-8 group">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
//             <div className="relative bg-gradient-to-r from-[#1a1a23] to-[#111117] border border-[#2a2a35] rounded-2xl p-6 overflow-hidden">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
//               <div className="relative z-10">
//                 <h1 className="text-2xl font-bold text-white mb-2">
//                   Welcome back, {user?.name}! <span className="inline-block animate-wave">👋</span>
//                 </h1>
//                 <p className="text-gray-400 mb-4">Ready for your next challenge?</p>
//                 <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 flex items-center gap-2 w-fit">
//                   <Zap className="w-4 h-4" />
//                   Start New Quiz
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="group relative animate-fadeInUp"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl"
//                      style={{ background: `linear-gradient(to right, ${stat.gradient})` }}></div>
//                 <div className="relative bg-[#111117] border border-[#2a2a35] rounded-xl p-5 hover:border-transparent transition-all">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className={`p-2.5 ${stat.bg} rounded-lg`}>
//                       <stat.icon className={`w-5 h-5 ${stat.text}`} />
//                     </div>
//                     <span className="text-xs text-gray-500">{stat.change}</span>
//                   </div>
//                   <p className="text-sm text-gray-400">{stat.title}</p>
//                   <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Main Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Available Quizzes */}
//             <div className="lg:col-span-2">
//               <div className="bg-[#111117] border border-[#2a2a35] rounded-xl overflow-hidden">
//                 <div className="p-5 border-b border-[#2a2a35]">
//                   <h2 className="text-lg font-semibold text-white">Available Quizzes</h2>
//                   <p className="text-sm text-gray-400 mt-1">Start a new quiz challenge</p>
//                 </div>
//                 <div className="divide-y divide-[#2a2a35]">
//                   {quizzes.map((quiz, index) => (
//                     <div key={quiz.id} className="p-5 hover:bg-[#1a1a23] transition-colors group">
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1">
//                           <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">
//                             {quiz.title}
//                           </h3>
//                           <p className="text-sm text-gray-400 mt-1 line-clamp-1">{quiz.description}</p>
//                           <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
//                             <span className="flex items-center gap-1">
//                               <Clock className="w-3.5 h-3.5" /> {quiz.duration} mins
//                             </span>
//                             <span>•</span>
//                             <span>{quiz.questions} questions</span>
//                             <span>•</span>
//                             <span>{quiz.totalMarks} marks</span>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => router.push(`/quiz/${quiz.id}`)}
//                           className="ml-4 p-2.5 bg-purple-600/10 hover:bg-purple-600 border border-purple-600/20 hover:border-purple-500 rounded-xl text-purple-400 hover:text-white transition-all"
//                         >
//                           <ChevronRight className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Sidebar */}
//             <div className="space-y-6">
//               {/* Recent Results */}
//               <div className="bg-[#111117] border border-[#2a2a35] rounded-xl p-5">
//                 <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
//                   <BarChart3 className="w-5 h-5 text-purple-400" />
//                   Recent Results
//                 </h3>
//                 <div className="space-y-3">
//                   {results.map((result) => (
//                     <div key={result.id} className="flex items-center justify-between p-3 bg-[#1a1a23] rounded-lg">
//                       <div>
//                         <p className="text-sm font-medium text-white">{result.quizTitle}</p>
//                         <p className="text-xs text-gray-400 mt-1">
//                           {new Date(result.submittedAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         result.percentage >= 70 
//                           ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
//                           : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
//                       }`}>
//                         {result.percentage}%
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-5">
//                 <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
//                 <div className="space-y-2">
//                   <button className="w-full text-left px-4 py-3 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-lg transition-colors flex items-center gap-3">
//                     <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
//                       <BookOpen className="w-4 h-4 text-purple-400" />
//                     </div>
//                     <span className="text-sm text-gray-300">Browse All Quizzes</span>
//                   </button>
//                   <button className="w-full text-left px-4 py-3 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-lg transition-colors flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
//                       <Award className="w-4 h-4 text-blue-400" />
//                     </div>
//                     <span className="text-sm text-gray-300">View Achievements</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }
        
//         @keyframes wave {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(15deg); }
//           75% { transform: rotate(-15deg); }
//         }
        
//         .animate-wave {
//           animation: wave 1s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }    







'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  const quizzes = [
    { id: '1', title: 'JavaScript Basics', description: 'Test your JS knowledge', duration: 30, questions: 10 },
    { id: '2', title: 'React Fundamentals', description: 'Learn React basics', duration: 45, questions: 15 },
  ];

  const results = [
    { id: '1', quiz: 'HTML/CSS', score: '85%', date: 'Feb 15, 2024' },
    { id: '2', quiz: 'Python', score: '92%', date: 'Feb 14, 2024' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">QuizMaster</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Average</p>
            <p className="text-2xl font-bold text-gray-900">88%</p>
          </div>
        </div>

        {/* Available Quizzes */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Available Quizzes</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">{quiz.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
              <div className="flex gap-3 text-xs text-gray-400 mt-2">
                <span>{quiz.duration} mins</span>
                <span>{quiz.questions} questions</span>
              </div>
              <button
                onClick={() => router.push(`/quiz/${quiz.id}`)}
                className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded text-sm hover:bg-blue-700"
              >
                Start
              </button>
            </div>
          ))}
        </div>

        {/* Results */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Results</h2>
        <div className="bg-white rounded-lg border border-gray-200">
          {results.map(result => (
            <div key={result.id} className="p-3 border-b last:border-0 flex justify-between">
              <span className="text-gray-900">{result.quiz}</span>
              <span className="text-green-600 font-medium">{result.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}