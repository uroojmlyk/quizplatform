// 'use client';

// import { useEffect, useState } from 'react';
// import { Users, BookOpen, CheckCircle, Clock } from 'lucide-react';

// interface Stats {
//   totalUsers: number;
//   totalQuizzes: number;
//   activeUsers: number;
//   completionRate: number;
// }

// export default function AdminDashboard() {
//   const [stats, setStats] = useState<Stats>({
//     totalUsers: 0,
//     totalQuizzes: 0,
//     activeUsers: 0,
//     completionRate: 0
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const res = await fetch('/api/admin/dashboard');
//       const data = await res.json();
      
//       if (data.success) {
//         setStats(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statCards = [
//     {
//       title: 'Total Users',
//       value: stats.totalUsers,
//       icon: Users,
//       change: '+12 this week',
//       color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
//     },
//     {
//       title: 'Total Quizzes',
//       value: stats.totalQuizzes,
//       icon: BookOpen,
//       change: '+5 this week',
//       color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
//     },
//     {
//       title: 'Active Users',
//       value: stats.activeUsers,
//       icon: Clock,
//       change: 'last 7 days',
//       color: 'bg-green-500/10 text-green-400 border-green-500/20'
//     },
//     {
//       title: 'Completion Rate',
//       value: `${stats.completionRate}%`,
//       icon: CheckCircle,
//       change: '+8% vs last month',
//       color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-medium text-white mb-2">Dashboard Overview</h1>
//         <p className="text-white/40 text-sm">Welcome back, Admin. Here's what's happening.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {statCards.map((stat) => (
//           <div
//             key={stat.title}
//             className="bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={`p-3 rounded-lg border ${stat.color}`}>
//                 <stat.icon className="w-5 h-5" />
//               </div>
//             </div>
//             <p className="text-2xl font-medium text-white mb-1">{stat.value}</p>
//             <p className="text-sm text-white/40 mb-2">{stat.title}</p>
//             <p className="text-xs text-white/20">{stat.change}</p>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity Placeholder */}
//       <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
//         <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
//         <div className="space-y-4">
//           {[1, 2, 3, 4, 5].map((i) => (
//             <div key={i} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
//               <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
//                 <span className="text-xs text-white/40">{i}</span>
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm text-white/80">New user registered</p>
//                 <p className="text-xs text-white/30">2 minutes ago</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }








'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock,
  TrendingUp,
  UserPlus,
  Award,
  Eye,
  ChevronRight,
  Calendar,
  Activity,
  Target,
  Zap
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalQuizzes: number;
  activeUsers: number;
  completionRate: number;
  newUsersToday: number;
  quizzesToday: number;
  totalAttempts: number;
  avgScore: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'quiz' | 'result';
  message: string;
  time: string;
  userId?: string;
  quizId?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalQuizzes: 0,
    activeUsers: 0,
    completionRate: 0,
    newUsersToday: 0,
    quizzesToday: 0,
    totalAttempts: 0,
    avgScore: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch main stats
      const statsRes = await fetch('/api/admin/dashboard');
      const statsData = await statsRes.json();
      
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch recent activity
      const activityRes = await fetch('/api/admin/recent-activity');
      const activityData = await activityRes.json();
      
      if (activityData.success) {
        setRecentActivity(activityData.data);
      } else {
        // Fallback mock data
        setRecentActivity([
          { id: '1', type: 'user', message: 'New user registered', time: '2 minutes ago' },
          { id: '2', type: 'quiz', message: 'New quiz created', time: '15 minutes ago' },
          { id: '3', type: 'result', message: 'Quiz completed', time: '1 hour ago' },
          { id: '4', type: 'user', message: 'Teacher account approved', time: '2 hours ago' },
          { id: '5', type: 'quiz', message: 'Quiz attempted 50 times', time: '3 hours ago' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      change: `+${stats.newUsersToday} today`,
      href: '/admin/admin-users',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      hoverColor: 'hover:bg-blue-500/20'
    },
    {
      title: 'Total Quizzes',
      value: stats.totalQuizzes,
      icon: BookOpen,
      change: `+${stats.quizzesToday} today`,
      href: '/admin/admin-quizzes',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      hoverColor: 'hover:bg-purple-500/20'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Activity,
      change: 'last 7 days',
      href: '/admin/admin-users?filter=active',
      color: 'bg-green-500/10 text-green-400 border-green-500/20',
      hoverColor: 'hover:bg-green-500/20'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: Target,
      change: 'avg. score',
      href: '/admin/reports',
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      hoverColor: 'hover:bg-orange-500/20'
    },
  ];

  const miniStats = [
    {
      title: 'Total Attempts',
      value: stats.totalAttempts,
      icon: Award,
      change: 'all time',
      color: 'text-pink-400'
    },
    {
      title: 'Avg. Score',
      value: `${stats.avgScore}%`,
      icon: TrendingUp,
      change: 'overall',
      color: 'text-yellow-400'
    },
  ];

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'user': return <UserPlus className="w-4 h-4 text-blue-400" />;
      case 'quiz': return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'result': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white/40 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-white/40 mt-1">
            Welcome back, Admin. Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/admin/reports')}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 border border-white/10"
          >
            <TrendingUp className="w-4 h-4" />
            View Reports
          </button>
          <button
            onClick={() => router.push('/admin/admin-users')}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-sm text-white transition-colors flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Manage Users
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="group block bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg border ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
            </div>
            <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-white/40 mb-2">{stat.title}</p>
            <p className="text-xs text-white/20 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {stat.change}
            </p>
          </Link>
        ))}
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {miniStats.map((stat) => (
          <div
            key={stat.title}
            className="bg-[#111117] border border-white/10 rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-white/40 mb-1">{stat.title}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs text-white/20 mt-1">{stat.change}</p>
            </div>
            <div className={`p-3 rounded-lg bg-white/5 border border-white/10 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity with Links */}
      <div className="bg-[#111117] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-medium text-white">Recent Activity</h2>
          </div>
          <Link
            href="/admin/reports"
            className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
          >
            View all
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="divide-y divide-white/5">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors group cursor-pointer"
              onClick={() => {
                if (activity.type === 'user' && activity.userId) {
                  router.push(`/admin/admin-users/${activity.userId}`);
                } else if (activity.type === 'quiz' && activity.quizId) {
                  router.push(`/admin/admin-quizzes/${activity.quizId}`);
                }
              }}
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                  {activity.message}
                </p>
                <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/admin-users"
          className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/20 rounded-xl p-4 hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">User Management</span>
          </div>
          <p className="text-xs text-white/40">View, edit, and manage all users</p>
        </Link>

        <Link
          href="/admin/admin-quizzes"
          className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/20 rounded-xl p-4 hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Quiz Management</span>
          </div>
          <p className="text-xs text-white/40">Monitor and manage all quizzes</p>
        </Link>

        <Link
          href="/admin/reports"
          className="bg-gradient-to-br from-orange-600/20 to-orange-600/5 border border-orange-500/20 rounded-xl p-4 hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-white">Analytics</span>
          </div>
          <p className="text-xs text-white/40">View reports and insights</p>
        </Link>
      </div>
    </div>
  );
}