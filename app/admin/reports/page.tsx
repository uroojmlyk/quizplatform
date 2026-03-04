'use client';

import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';

interface ReportData {
  userGrowth: Array<{ month: string; users: number }>;
  quizActivity: Array<{ name: string; attempts: number }>;
  performance: Array<{ range: string; count: number }>;
  stats: {
    totalUsers: number;
    totalQuizzes: number;
    totalAttempts: number;
    avgScore: number;
  };
}

export default function AdminReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

  useEffect(() => {
    fetchReports();
  }, [timeRange]);

  const fetchReports = async () => {
    try {
      const res = await fetch(`/api/admin/reports?range=${timeRange}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!data) return;

    const csv = [
      ['Report Type', 'Value'].join(','),
      ['Total Users', data.stats.totalUsers],
      ['Total Quizzes', data.stats.totalQuizzes],
      ['Total Attempts', data.stats.totalAttempts],
      ['Average Score', `${data.stats.avgScore}%`],
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white mb-2">Reports & Analytics</h1>
          <p className="text-white/40 text-sm">Platform insights and performance metrics.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/20"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
          <p className="text-sm text-white/40 mb-1">Total Users</p>
          <p className="text-3xl font-medium text-white">{data.stats.totalUsers}</p>
        </div>
        <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
          <p className="text-sm text-white/40 mb-1">Total Quizzes</p>
          <p className="text-3xl font-medium text-white">{data.stats.totalQuizzes}</p>
        </div>
        <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
          <p className="text-sm text-white/40 mb-1">Total Attempts</p>
          <p className="text-3xl font-medium text-white">{data.stats.totalAttempts}</p>
        </div>
        <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
          <p className="text-sm text-white/40 mb-1">Average Score</p>
          <p className="text-3xl font-medium text-white">{data.stats.avgScore}%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-medium text-white/60 mb-4">User Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1a1a23', 
                    border: '1px solid #2a2a35',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Activity Chart */}
        <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-medium text-white/60 mb-4">Quiz Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.quizActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1a1a23', 
                    border: '1px solid #2a2a35',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="attempts" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="bg-[#111117] border border-white/10 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-sm font-medium text-white/60 mb-4">Score Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.performance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {data.performance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#1a1a23', 
                    border: '1px solid #2a2a35',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {data.performance.map((item, index) => (
                <div key={item.range} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-white/60">{item.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}