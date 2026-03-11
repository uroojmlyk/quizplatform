


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Users, BookOpen, CheckCircle, Clock, TrendingUp, UserPlus,
//   Award, ChevronRight, Calendar, Activity, Target, Zap, BarChart3,
//   ArrowUpRight, ArrowDownRight, MoreHorizontal,
// } from 'lucide-react';

// const T = {
//   accent: '#10b981',
//   accentHover: '#34d399',
//   accentBg: 'rgba(16,185,129,0.08)',
//   accentBorder: 'rgba(16,185,129,0.18)',
//   card: 'rgba(255,255,255,0.025)',
//   border: 'rgba(255,255,255,0.06)',
//   muted: 'rgba(255,255,255,0.4)',
//   dim: 'rgba(255,255,255,0.22)',
// };

// interface Stats {
//   totalUsers: number; totalQuizzes: number; activeUsers: number;
//   completionRate: number; newUsersToday: number; quizzesToday: number;
//   totalAttempts: number; avgScore: number;
// }
// interface RecentActivity {
//   id: string; type: 'user' | 'quiz' | 'result';
//   message: string; time: string; userId?: string; quizId?: string;
// }

// // ── Stat card ──────────────────────────────────────────────────────
// function StatCard({ icon: Icon, value, label, badge, trend }: {
//   icon: any; value: string | number; label: string;
//   badge: string; trend?: string;
// }) {
//   return (
//     <div className="rounded-2xl p-5 transition-all duration-200"
//       style={{ background: T.card, border: `1px solid ${T.border}` }}
//       onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
//       onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
//       <div className="flex items-start justify-between mb-4">
//         <div className="w-9 h-9 rounded-xl flex items-center justify-center"
//           style={{ background: T.accentBg }}>
//           <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18, color: T.accent }} />
//         </div>
//         <span className="text-[11px] font-medium px-2 py-1 rounded-full"
//           style={{ background: T.accentBg, color: T.accentHover }}>
//           {badge}
//         </span>
//       </div>
//       <p className="text-2xl font-bold text-white">{value}</p>
//       <p className="text-sm mt-0.5" style={{ color: T.muted }}>{label}</p>
//       {trend && (
//         <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: T.accent }}>
//           <ArrowUpRight className="w-3.5 h-3.5" />
//           <span>{trend}</span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [stats] = useState<Stats>({
//     totalUsers: 12456, totalQuizzes: 342, activeUsers: 5678,
//     completionRate: 78, newUsersToday: 124, quizzesToday: 23,
//     totalAttempts: 45678, avgScore: 72,
//   });
//   const [recentActivity] = useState<RecentActivity[]>([
//     { id: '1', type: 'user',   message: 'New user registered',          time: '2 min ago'  },
//     { id: '2', type: 'quiz',   message: 'JavaScript Quiz created',       time: '15 min ago' },
//     { id: '3', type: 'result', message: 'Quiz completed by 45 students', time: '1 hr ago'   },
//     { id: '4', type: 'user',   message: 'Teacher account approved',      time: '2 hrs ago'  },
//     { id: '5', type: 'quiz',   message: 'React Quiz attempted 50 times', time: '3 hrs ago'  },
//   ]);

//   const activityIcon = (type: string) => {
//     const map: any = {
//       user:   <UserPlus  style={{ width: 14, height: 14, color: T.accent }} />,
//       quiz:   <BookOpen  style={{ width: 14, height: 14, color: T.accent }} />,
//       result: <CheckCircle style={{ width: 14, height: 14, color: T.accent }} />,
//     };
//     return map[type] || <Clock style={{ width: 14, height: 14, color: T.muted }} />;
//   };

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto">

//       {/* ── Page header ── */}
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-2 mb-1.5">
//             <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
//             <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: `${T.accent}cc` }}>
//               Admin Dashboard
//             </p>
//           </div>
//           <h1 className="text-xl sm:text-2xl font-bold text-white">Welcome back, Admin</h1>
//           <p className="text-sm mt-1" style={{ color: T.muted }}>Here's what's happening with your platform today.</p>
//         </div>
//         {/* Action buttons */}
//         <div className="flex items-center gap-2.5 flex-shrink-0">
//           <button onClick={() => router.push('/admin/reports')}
//             className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
//             style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted }}
//             onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
//             onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = T.border; }}>
//             <BarChart3 className="w-4 h-4" />
//             <span className="hidden sm:inline">Reports</span>
//           </button>
//           <button onClick={() => router.push('/admin/admin-users')}
//             className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-white transition-all"
//             style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})`, boxShadow: `0 4px 20px rgba(16,185,129,0.25)` }}
//             onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
//             onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
//             <Users className="w-4 h-4" />
//             <span className="hidden sm:inline">Manage Users</span>
//           </button>
//         </div>
//       </div>

//       {/* ── Primary stat cards ── */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//         <StatCard icon={Users}    value={stats.totalUsers.toLocaleString()} label="Total Users"    badge={`+${stats.newUsersToday} today`} trend="12% increase" />
//         <StatCard icon={BookOpen} value={stats.totalQuizzes}                label="Total Quizzes"  badge={`+${stats.quizzesToday} today`}  trend="8% increase"  />
//         <StatCard icon={Activity} value={stats.activeUsers.toLocaleString()} label="Active Users"  badge="Last 7 days"                      trend="5% increase"  />
//         <StatCard icon={Target}   value={`${stats.completionRate}%`}         label="Completion"    badge="All-time avg"                     trend="3% increase"  />
//       </div>

//       {/* ── Secondary stat cards ── */}
//       <div className="grid grid-cols-2 gap-3 sm:gap-4">
//         <div className="rounded-2xl p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm mb-1.5" style={{ color: T.muted }}>Total Attempts</p>
//               <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalAttempts.toLocaleString()}</p>
//               <p className="text-xs mt-1.5" style={{ color: T.dim }}>Across all quizzes</p>
//             </div>
//             <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
//               <Award style={{ width: 20, height: 20, color: T.accent }} />
//             </div>
//           </div>
//         </div>
//         <div className="rounded-2xl p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm mb-1.5" style={{ color: T.muted }}>Average Score</p>
//               <p className="text-2xl sm:text-3xl font-bold text-white">{stats.avgScore}%</p>
//               <p className="text-xs mt-1.5" style={{ color: T.accent }}>↑ 4% from last month</p>
//             </div>
//             <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
//               <TrendingUp style={{ width: 20, height: 20, color: T.accent }} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Bottom: Activity + Quick Actions ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//         {/* Activity feed */}
//         <div className="lg:col-span-2 rounded-2xl overflow-hidden"
//           style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-center justify-between px-5 py-4"
//             style={{ borderBottom: `1px solid ${T.border}` }}>
//             <div className="flex items-center gap-2.5">
//               <Activity className="w-4 h-4" style={{ color: T.accent }} />
//               <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
//             </div>
//             <Link href="/admin/reports" className="text-xs font-medium transition-colors"
//               style={{ color: T.muted }}
//               onMouseEnter={e => e.currentTarget.style.color = T.accentHover}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               View all →
//             </Link>
//           </div>

//           <div className="divide-y" style={{ borderColor: T.border }}>
//             {recentActivity.map((a) => (
//               <div key={a.id}
//                 className="flex items-center gap-3.5 px-5 py-3.5 cursor-pointer transition-colors"
//                 style={{ background: 'transparent' }}
//                 onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
//                 onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//                 onClick={() => {
//                   if (a.type === 'user' && a.userId) router.push(`/admin/admin-users/${a.userId}`);
//                   else if (a.type === 'quiz' && a.quizId) router.push(`/admin/admin-quizzes/${a.quizId}`);
//                 }}>
//                 <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
//                   style={{ background: T.accentBg }}>
//                   {activityIcon(a.type)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-white truncate">{a.message}</p>
//                   <div className="flex items-center gap-1.5 mt-0.5">
//                     <Calendar className="w-3 h-3" style={{ color: T.dim }} />
//                     <p className="text-[11px]" style={{ color: T.dim }}>{a.time}</p>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-4 h-4 shrink-0" style={{ color: T.dim }} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick actions */}
//         <div className="space-y-3">
//           <p className="text-[11px] font-semibold uppercase tracking-wider px-1" style={{ color: T.dim }}>
//             Quick Actions
//           </p>

//           {[
//             { href: '/admin/admin-users',   icon: Users,    title: 'User Management',  sub: 'View & manage all users'  },
//             { href: '/admin/admin-quizzes', icon: BookOpen, title: 'Quiz Management',  sub: 'Monitor all quizzes'       },
//             { href: '/admin/reports',       icon: BarChart3,title: 'Analytics',        sub: 'Reports & insights'        },
//           ].map((item) => (
//             <Link key={item.href} href={item.href}
//               className="flex items-center gap-3.5 p-4 rounded-2xl transition-all block"
//               style={{ background: T.card, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = T.accentBorder; e.currentTarget.style.background = 'rgba(16,185,129,0.04)'; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; }}>
//               <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ background: T.accentBg }}>
//                 <item.icon style={{ width: 18, height: 18, color: T.accent }} />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-white">{item.title}</p>
//                 <p className="text-xs mt-0.5" style={{ color: T.muted }}>{item.sub}</p>
//               </div>
//             </Link>
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
  Users, BookOpen, CheckCircle, Clock, TrendingUp, UserPlus,
  Award, ChevronRight, Calendar, Activity, Target, Zap, BarChart3,
  ArrowUpRight,
} from 'lucide-react';

const T = {
  accent: '#10b981',
  accentHover: '#34d399',
  accentBg: 'rgba(16,185,129,0.08)',
  accentBorder: 'rgba(16,185,129,0.18)',
  card: 'rgba(255,255,255,0.025)',
  border: 'rgba(255,255,255,0.06)',
  muted: 'rgba(255,255,255,0.4)',
  dim: 'rgba(255,255,255,0.22)',
};

interface Stats {
  totalUsers: number; totalQuizzes: number; activeUsers: number;
  completionRate: number; newUsersToday: number; quizzesToday: number;
  totalAttempts: number; avgScore: number;
}
interface RecentActivity {
  id: string; type: 'user' | 'quiz' | 'result';
  message: string; time: string; userId?: string; quizId?: string;
}

function StatCard({ icon: Icon, value, label, badge, trend }: {
  icon: any; value: string | number; label: string;
  badge: string; trend?: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 sm:p-5 transition-all duration-200"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: T.accentBg }}>
          <Icon style={{ width: 16, height: 16, color: T.accent }} />
        </div>
        <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full leading-tight text-right max-w-[90px] sm:max-w-none"
          style={{ background: T.accentBg, color: T.accentHover }}>
          {badge}
        </span>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
      <p className="text-xs sm:text-sm mt-0.5 leading-snug" style={{ color: T.muted }}>{label}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: T.accent }}>
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats] = useState<Stats>({
    totalUsers: 12456, totalQuizzes: 342, activeUsers: 5678,
    completionRate: 78, newUsersToday: 124, quizzesToday: 23,
    totalAttempts: 45678, avgScore: 72,
  });
  const [recentActivity] = useState<RecentActivity[]>([
    { id: '1', type: 'user',   message: 'New user registered',          time: '2 min ago'  },
    { id: '2', type: 'quiz',   message: 'JavaScript Quiz created',       time: '15 min ago' },
    { id: '3', type: 'result', message: 'Quiz completed by 45 students', time: '1 hr ago'   },
    { id: '4', type: 'user',   message: 'Teacher account approved',      time: '2 hrs ago'  },
    { id: '5', type: 'quiz',   message: 'React Quiz attempted 50 times', time: '3 hrs ago'  },
  ]);

  const activityIcon = (type: string) => {
    const map: any = {
      user:   <UserPlus   style={{ width: 13, height: 13, color: T.accent }} />,
      quiz:   <BookOpen   style={{ width: 13, height: 13, color: T.accent }} />,
      result: <CheckCircle style={{ width: 13, height: 13, color: T.accent }} />,
    };
    return map[type] || <Clock style={{ width: 13, height: 13, color: T.muted }} />;
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-7xl mx-auto">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider" style={{ color: `${T.accent}cc` }}>
              Admin Dashboard
            </p>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-white">Welcome back, Admin</h1>
          <p className="text-xs sm:text-sm mt-0.5" style={{ color: T.muted }}>Here's what's happening today.</p>
        </div>
        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => router.push('/admin/reports')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all"
            style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted }}
          >
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            Reports
          </button>
          <button
            onClick={() => router.push('/admin/admin-users')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all"
            style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})`, boxShadow: `0 4px 20px rgba(16,185,129,0.25)` }}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            Manage Users
          </button>
        </div>
      </div>

      {/* ── Primary stat cards — 2×2 on mobile, 4 cols on lg ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <StatCard icon={Users}    value={stats.totalUsers.toLocaleString()} label="Total Users"   badge={`+${stats.newUsersToday} today`} trend="12% increase" />
        <StatCard icon={BookOpen} value={stats.totalQuizzes}                label="Total Quizzes" badge={`+${stats.quizzesToday} today`}  trend="8% increase"  />
        <StatCard icon={Activity} value={stats.activeUsers.toLocaleString()} label="Active Users" badge="Last 7 days"                      trend="5% increase"  />
        <StatCard icon={Target}   value={`${stats.completionRate}%`}        label="Completion"    badge="All-time avg"                      trend="3% increase"  />
      </div>

      {/* ── Secondary stat cards ── */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
        <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm mb-1" style={{ color: T.muted }}>Total Attempts</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{stats.totalAttempts.toLocaleString()}</p>
              <p className="text-[10px] sm:text-xs mt-1" style={{ color: T.dim }}>Across all quizzes</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
              <Award style={{ width: 16, height: 16, color: T.accent }} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm mb-1" style={{ color: T.muted }}>Average Score</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{stats.avgScore}%</p>
              <p className="text-[10px] sm:text-xs mt-1" style={{ color: T.accent }}>↑ 4% from last month</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
              <TrendingUp style={{ width: 16, height: 16, color: T.accent }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Activity + Quick Actions ── */}
      {/* On mobile: stacked. On lg: side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Activity feed */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4"
            style={{ borderBottom: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" style={{ color: T.accent }} />
              <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
            </div>
            <Link href="/admin/reports"
              className="text-xs font-medium transition-colors"
              style={{ color: T.muted }}
              onMouseEnter={e => e.currentTarget.style.color = T.accentHover}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}>
              View all →
            </Link>
          </div>

          <div className="divide-y" style={{ borderColor: T.border }}>
            {recentActivity.map((a) => (
              <div key={a.id}
                className="flex items-center gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                onClick={() => {
                  if (a.type === 'user' && a.userId) router.push(`/admin/admin-users/${a.userId}`);
                  else if (a.type === 'quiz' && a.quizId) router.push(`/admin/admin-quizzes/${a.quizId}`);
                }}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: T.accentBg }}>
                  {activityIcon(a.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-white truncate">{a.message}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" style={{ color: T.dim }} />
                    <p className="text-[10px] sm:text-[11px]" style={{ color: T.dim }}>{a.time}</p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: T.dim }} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-2.5 sm:space-y-3">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-1" style={{ color: T.dim }}>
            Quick Actions
          </p>

          {[
            { href: '/admin/admin-users',   icon: Users,     title: 'User Management', sub: 'View & manage all users' },
            { href: '/admin/admin-quizzes', icon: BookOpen,  title: 'Quiz Management', sub: 'Monitor all quizzes'     },
            { href: '/admin/reports',       icon: BarChart3, title: 'Analytics',       sub: 'Reports & insights'      },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl transition-all block"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.accentBorder; e.currentTarget.style.background = 'rgba(16,185,129,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; }}>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: T.accentBg }}>
                <item.icon style={{ width: 16, height: 16, color: T.accent }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white">{item.title}</p>
                <p className="text-[10px] sm:text-xs mt-0.5 truncate" style={{ color: T.muted }}>{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}