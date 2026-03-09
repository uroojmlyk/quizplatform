// 'use client';

// import { useEffect, useState } from 'react';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, LineChart, Line
// } from 'recharts';
// import { Download, Calendar, Filter } from 'lucide-react';

// interface ReportData {
//   userGrowth: Array<{ month: string; users: number }>;
//   quizActivity: Array<{ name: string; attempts: number }>;
//   performance: Array<{ range: string; count: number }>;
//   stats: {
//     totalUsers: number;
//     totalQuizzes: number;
//     totalAttempts: number;
//     avgScore: number;
//   };
// }

// export default function AdminReportsPage() {
//   const [data, setData] = useState<ReportData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState('30d');

//   const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

//   useEffect(() => {
//     fetchReports();
//   }, [timeRange]);

//   const fetchReports = async () => {
//     try {
//       const res = await fetch(`/api/admin/reports?range=${timeRange}`);
//       const result = await res.json();
//       if (result.success) {
//         setData(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadCSV = () => {
//     if (!data) return;

//     const csv = [
//       ['Report Type', 'Value'].join(','),
//       ['Total Users', data.stats.totalUsers],
//       ['Total Quizzes', data.stats.totalQuizzes],
//       ['Total Attempts', data.stats.totalAttempts],
//       ['Average Score', `${data.stats.avgScore}%`],
//     ].map(row => row.join(',')).join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `reports-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   if (!data) return null;

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-medium text-white mb-2">Reports & Analytics</h1>
//           <p className="text-white/40 text-sm">Platform insights and performance metrics.</p>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <select
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/20"
//           >
//             <option value="7d">Last 7 days</option>
//             <option value="30d">Last 30 days</option>
//             <option value="90d">Last 90 days</option>
//             <option value="1y">Last year</option>
//           </select>
          
//           <button
//             onClick={downloadCSV}
//             className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
//           >
//             <Download className="w-4 h-4" />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
//           <p className="text-sm text-white/40 mb-1">Total Users</p>
//           <p className="text-3xl font-medium text-white">{data.stats.totalUsers}</p>
//         </div>
//         <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
//           <p className="text-sm text-white/40 mb-1">Total Quizzes</p>
//           <p className="text-3xl font-medium text-white">{data.stats.totalQuizzes}</p>
//         </div>
//         <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
//           <p className="text-sm text-white/40 mb-1">Total Attempts</p>
//           <p className="text-3xl font-medium text-white">{data.stats.totalAttempts}</p>
//         </div>
//         <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
//           <p className="text-sm text-white/40 mb-1">Average Score</p>
//           <p className="text-3xl font-medium text-white">{data.stats.avgScore}%</p>
//         </div>
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* User Growth Chart */}
//         <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
//           <h3 className="text-sm font-medium text-white/60 mb-4">User Growth</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data.userGrowth}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" />
//                 <XAxis dataKey="month" stroke="#666" />
//                 <YAxis stroke="#666" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     background: '#1a1a23', 
//                     border: '1px solid #2a2a35',
//                     borderRadius: '8px'
//                   }}
//                 />
//                 <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Quiz Activity Chart */}
//         <div className="bg-[#111117] border border-white/10 rounded-xl p-6">
//           <h3 className="text-sm font-medium text-white/60 mb-4">Quiz Activity</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data.quizActivity}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" />
//                 <XAxis dataKey="name" stroke="#666" />
//                 <YAxis stroke="#666" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     background: '#1a1a23', 
//                     border: '1px solid #2a2a35',
//                     borderRadius: '8px'
//                   }}
//                 />
//                 <Bar dataKey="attempts" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Performance Distribution */}
//         <div className="bg-[#111117] border border-white/10 rounded-xl p-6 lg:col-span-2">
//           <h3 className="text-sm font-medium text-white/60 mb-4">Score Distribution</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={data.performance}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={100}
//                   paddingAngle={5}
//                   dataKey="count"
//                 >
//                   {data.performance.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   contentStyle={{ 
//                     background: '#1a1a23', 
//                     border: '1px solid #2a2a35',
//                     borderRadius: '8px'
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
            
//             {/* Legend */}
//             <div className="flex flex-wrap justify-center gap-4 mt-4">
//               {data.performance.map((item, index) => (
//                 <div key={item.range} className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full" style={{ background: COLORS[index % COLORS.length] }} />
//                   <span className="text-xs text-white/60">{item.range}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Download, TrendingUp, Users, BookOpen, Award } from 'lucide-react';

interface ReportData {
  userGrowth: Array<{ month: string; users: number }>;
  quizActivity: Array<{ name: string; attempts: number }>;
  performance: Array<{ range: string; count: number }>;
  stats: { totalUsers: number; totalQuizzes: number; totalAttempts: number; avgScore: number };
}

const COLORS = ['#34d399', '#059669', '#6ee7b7', '#a7f3d0', '#d1fae5'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl text-xs" style={{ background: '#0a0d0b', border: '1px solid rgba(52,211,153,0.15)' }}>
      {label && <p className="text-white/40 mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-semibold" style={{ color: p.color || '#34d399' }}>
          {p.name ? `${p.name}: ` : ''}{p.value}
        </p>
      ))}
    </div>
  );
};

export default function AdminReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => { fetchReports(); }, [timeRange]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reports?range=${timeRange}`);
      const result = await res.json();
      if (result.success) setData(result.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const downloadCSV = () => {
    if (!data) return;
    const csv = [
      ['Metric', 'Value'].join(','),
      ['Total Users', data.stats.totalUsers],
      ['Total Quizzes', data.stats.totalQuizzes],
      ['Total Attempts', data.stats.totalAttempts],
      ['Average Score', `${data.stats.avgScore}%`],
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const card = { background: 'rgba(255,255,255,0.015)', borderColor: 'rgba(52,211,153,0.08)' };

  if (loading) return (
    <div className="flex items-center justify-center h-72">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/15 border-t-emerald-400 animate-spin" />
        </div>
        <p className="text-[11px] text-white/20 tracking-widest uppercase">Loading reports</p>
      </div>
    </div>
  );

  if (!data) return null;

  const statCards = [
    { label: 'Total Users', value: data.stats.totalUsers, icon: Users },
    { label: 'Total Quizzes', value: data.stats.totalQuizzes, icon: BookOpen },
    { label: 'Total Attempts', value: data.stats.totalAttempts, icon: Award },
    { label: 'Avg Score', value: `${data.stats.avgScore}%`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-5 max-w-7xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] text-emerald-500/50 uppercase tracking-widest font-semibold mb-1">Analytics</p>
          <h1 className="text-xl font-semibold text-white">Reports</h1>
          <p className="text-sm text-white/25 mt-0.5">Platform insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={timeRange} onChange={e => setTimeRange(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs text-white/50 outline-none transition-all"
            style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.1)' }}>
            {[['7d','Last 7 days'],['30d','Last 30 days'],['90d','Last 90 days'],['1y','Last year']].map(([v,l]) => (
              <option key={v} value={v} style={{ background: '#0a0d0b' }}>{l}</option>
            ))}
          </select>
          <button onClick={downloadCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white/70 border transition-all"
            style={{ borderColor: 'rgba(52,211,153,0.1)', background: 'rgba(52,211,153,0.03)' }}>
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="p-4 rounded-2xl border" style={card}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
              style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.12)' }}>
              <s.icon className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-white mb-0.5">{s.value}</p>
            <p className="text-xs text-white/30">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* User Growth */}
        <div className="p-5 rounded-2xl border" style={card}>
          <p className="text-[11px] text-emerald-500/50 uppercase tracking-widest font-semibold mb-1">Growth</p>
          <h3 className="text-sm font-semibold text-white/80 mb-4">User Growth</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.userGrowth} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52,211,153,0.06)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="users" stroke="#34d399" strokeWidth={2}
                  dot={{ fill: '#059669', r: 3, strokeWidth: 0 }}
                  activeDot={{ fill: '#34d399', r: 4, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Activity */}
        <div className="p-5 rounded-2xl border" style={card}>
          <p className="text-[11px] text-emerald-500/50 uppercase tracking-widest font-semibold mb-1">Activity</p>
          <h3 className="text-sm font-semibold text-white/80 mb-4">Quiz Attempts</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.quizActivity} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52,211,153,0.06)" />
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="attempts" radius={[4, 4, 0, 0]}
                  fill="url(#barGrad)" />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="p-5 rounded-2xl border lg:col-span-2" style={card}>
          <p className="text-[11px] text-emerald-500/50 uppercase tracking-widest font-semibold mb-1">Distribution</p>
          <h3 className="text-sm font-semibold text-white/80 mb-4">Score Distribution</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-52 h-52 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.performance} cx="50%" cy="50%"
                    innerRadius={55} outerRadius={85}
                    paddingAngle={3} dataKey="count">
                    {data.performance.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {data.performance.map((item, i) => (
                <div key={item.range} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                  <div>
                    <p className="text-xs text-white/50">{item.range}</p>
                    <p className="text-sm font-semibold text-white">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
