'use client';

import { useEffect, useState } from 'react';
import { Users, BookOpen, CheckCircle, Clock } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalQuizzes: number;
  activeUsers: number;
  completionRate: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalQuizzes: 0,
    activeUsers: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      const data = await res.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      change: '+12 this week',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      title: 'Total Quizzes',
      value: stats.totalQuizzes,
      icon: BookOpen,
      change: '+5 this week',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Clock,
      change: 'last 7 days',
      color: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: CheckCircle,
      change: '+8% vs last month',
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-white mb-2">Dashboard Overview</h1>
        <p className="text-white/40 text-sm">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-[#111117] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg border ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-medium text-white mb-1">{stat.value}</p>
            <p className="text-sm text-white/40 mb-2">{stat.title}</p>
            <p className="text-xs text-white/20">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
              <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
                <span className="text-xs text-white/40">{i}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80">New user registered</p>
                <p className="text-xs text-white/30">2 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}