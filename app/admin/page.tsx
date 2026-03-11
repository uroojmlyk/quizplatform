


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






// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Users, BookOpen, CheckCircle, Clock, TrendingUp, UserPlus,
//   Award, ChevronRight, Calendar, Activity, Target, Zap, BarChart3,
//   ArrowUpRight,
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

// function StatCard({ icon: Icon, value, label, badge, trend }: {
//   icon: any; value: string | number; label: string;
//   badge: string; trend?: string;
// }) {
//   return (
//     <div
//       className="rounded-2xl p-4 sm:p-5 transition-all duration-200"
//       style={{ background: T.card, border: `1px solid ${T.border}` }}
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0"
//           style={{ background: T.accentBg }}>
//           <Icon style={{ width: 16, height: 16, color: T.accent }} />
//         </div>
//         <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full leading-tight text-right max-w-[90px] sm:max-w-none"
//           style={{ background: T.accentBg, color: T.accentHover }}>
//           {badge}
//         </span>
//       </div>
//       <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
//       <p className="text-xs sm:text-sm mt-0.5 leading-snug" style={{ color: T.muted }}>{label}</p>
//       {trend && (
//         <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: T.accent }}>
//           <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
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
//       user:   <UserPlus   style={{ width: 13, height: 13, color: T.accent }} />,
//       quiz:   <BookOpen   style={{ width: 13, height: 13, color: T.accent }} />,
//       result: <CheckCircle style={{ width: 13, height: 13, color: T.accent }} />,
//     };
//     return map[type] || <Clock style={{ width: 13, height: 13, color: T.muted }} />;
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6 w-full max-w-7xl mx-auto">

//       {/* ── Page header ── */}
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
//             <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider" style={{ color: `${T.accent}cc` }}>
//               Admin Dashboard
//             </p>
//           </div>
//           <h1 className="text-lg sm:text-2xl font-bold text-white">Welcome back, Admin</h1>
//           <p className="text-xs sm:text-sm mt-0.5" style={{ color: T.muted }}>Here's what's happening today.</p>
//         </div>
//         {/* Action buttons */}
//         <div className="flex items-center gap-2 shrink-0">
//           <button
//             onClick={() => router.push('/admin/reports')}
//             className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all"
//             style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted }}
//           >
//             <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
//             Reports
//           </button>
//           <button
//             onClick={() => router.push('/admin/admin-users')}
//             className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all"
//             style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})`, boxShadow: `0 4px 20px rgba(16,185,129,0.25)` }}
//           >
//             <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
//             Manage Users
//           </button>
//         </div>
//       </div>

//       {/* ── Primary stat cards — 2×2 on mobile, 4 cols on lg ── */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
//         <StatCard icon={Users}    value={stats.totalUsers.toLocaleString()} label="Total Users"   badge={`+${stats.newUsersToday} today`} trend="12% increase" />
//         <StatCard icon={BookOpen} value={stats.totalQuizzes}                label="Total Quizzes" badge={`+${stats.quizzesToday} today`}  trend="8% increase"  />
//         <StatCard icon={Activity} value={stats.activeUsers.toLocaleString()} label="Active Users" badge="Last 7 days"                      trend="5% increase"  />
//         <StatCard icon={Target}   value={`${stats.completionRate}%`}        label="Completion"    badge="All-time avg"                      trend="3% increase"  />
//       </div>

//       {/* ── Secondary stat cards ── */}
//       <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
//         <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="text-xs sm:text-sm mb-1" style={{ color: T.muted }}>Total Attempts</p>
//               <p className="text-xl sm:text-3xl font-bold text-white">{stats.totalAttempts.toLocaleString()}</p>
//               <p className="text-[10px] sm:text-xs mt-1" style={{ color: T.dim }}>Across all quizzes</p>
//             </div>
//             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
//               <Award style={{ width: 16, height: 16, color: T.accent }} />
//             </div>
//           </div>
//         </div>
//         <div className="rounded-2xl p-4 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="text-xs sm:text-sm mb-1" style={{ color: T.muted }}>Average Score</p>
//               <p className="text-xl sm:text-3xl font-bold text-white">{stats.avgScore}%</p>
//               <p className="text-[10px] sm:text-xs mt-1" style={{ color: T.accent }}>↑ 4% from last month</p>
//             </div>
//             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
//               <TrendingUp style={{ width: 16, height: 16, color: T.accent }} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Bottom: Activity + Quick Actions ── */}
//       {/* On mobile: stacked. On lg: side by side */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//         {/* Activity feed */}
//         <div className="lg:col-span-2 rounded-2xl overflow-hidden"
//           style={{ background: T.card, border: `1px solid ${T.border}` }}>
//           <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4"
//             style={{ borderBottom: `1px solid ${T.border}` }}>
//             <div className="flex items-center gap-2">
//               <Activity className="w-4 h-4" style={{ color: T.accent }} />
//               <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
//             </div>
//             <Link href="/admin/reports"
//               className="text-xs font-medium transition-colors"
//               style={{ color: T.muted }}
//               onMouseEnter={e => e.currentTarget.style.color = T.accentHover}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               View all →
//             </Link>
//           </div>

//           <div className="divide-y" style={{ borderColor: T.border }}>
//             {recentActivity.map((a) => (
//               <div key={a.id}
//                 className="flex items-center gap-3 px-4 sm:px-5 py-3 cursor-pointer transition-colors"
//                 style={{ background: 'transparent' }}
//                 onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
//                 onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//                 onClick={() => {
//                   if (a.type === 'user' && a.userId) router.push(`/admin/admin-users/${a.userId}`);
//                   else if (a.type === 'quiz' && a.quizId) router.push(`/admin/admin-quizzes/${a.quizId}`);
//                 }}>
//                 <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0"
//                   style={{ background: T.accentBg }}>
//                   {activityIcon(a.type)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs sm:text-sm text-white truncate">{a.message}</p>
//                   <div className="flex items-center gap-1 mt-0.5">
//                     <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" style={{ color: T.dim }} />
//                     <p className="text-[10px] sm:text-[11px]" style={{ color: T.dim }}>{a.time}</p>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: T.dim }} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick actions */}
//         <div className="space-y-2.5 sm:space-y-3">
//           <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-1" style={{ color: T.dim }}>
//             Quick Actions
//           </p>

//           {[
//             { href: '/admin/admin-users',   icon: Users,     title: 'User Management', sub: 'View & manage all users' },
//             { href: '/admin/admin-quizzes', icon: BookOpen,  title: 'Quiz Management', sub: 'Monitor all quizzes'     },
//             { href: '/admin/reports',       icon: BarChart3, title: 'Analytics',       sub: 'Reports & insights'      },
//           ].map((item) => (
//             <Link key={item.href} href={item.href}
//               className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl transition-all block"
//               style={{ background: T.card, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = T.accentBorder; e.currentTarget.style.background = 'rgba(16,185,129,0.04)'; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; }}>
//               <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ background: T.accentBg }}>
//                 <item.icon style={{ width: 16, height: 16, color: T.accent }} />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs sm:text-sm font-semibold text-white">{item.title}</p>
//                 <p className="text-[10px] sm:text-xs mt-0.5 truncate" style={{ color: T.muted }}>{item.sub}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }









// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Users, 
//   BookOpen, 
//   CheckCircle, 
//   Clock,
//   TrendingUp,
//   UserPlus,
//   Award,
//   Eye,
//   ChevronRight,
//   Calendar,
//   Activity,
//   Target,
//   Zap,
//   BarChart3
// } from 'lucide-react';

// interface Stats {
//   totalUsers: number;
//   totalQuizzes: number;
//   activeUsers: number;
//   completionRate: number;
//   newUsersToday: number;
//   quizzesToday: number;
//   totalAttempts: number;
//   avgScore: number;
// }

// interface RecentActivity {
//   id: string;
//   type: 'user' | 'quiz' | 'result';
//   message: string;
//   time: string;
//   userId?: string;
//   quizId?: string;
// }

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [stats, setStats] = useState<Stats>({
//     totalUsers: 0,
//     totalQuizzes: 0,
//     activeUsers: 0,
//     completionRate: 0,
//     newUsersToday: 0,
//     quizzesToday: 0,
//     totalAttempts: 0,
//     avgScore: 0
//   });
//   const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Fetch main stats
//       const statsRes = await fetch('/api/admin/dashboard');
//       const statsData = await statsRes.json();
      
//       if (statsData.success) {
//         setStats(statsData.data);
//       }

//       // Fetch recent activity
//       const activityRes = await fetch('/api/admin/recent-activity');
//       const activityData = await activityRes.json();
      
//       if (activityData.success) {
//         setRecentActivity(activityData.data);
//       } else {
//         // Fallback mock data
//         setRecentActivity([
//           { id: '1', type: 'user', message: 'New user registered', time: '2 minutes ago' },
//           { id: '2', type: 'quiz', message: 'New quiz created', time: '15 minutes ago' },
//           { id: '3', type: 'result', message: 'Quiz completed', time: '1 hour ago' },
//           { id: '4', type: 'user', message: 'Teacher account approved', time: '2 hours ago' },
//           { id: '5', type: 'quiz', message: 'Quiz attempted 50 times', time: '3 hours ago' },
//         ]);
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActivityIcon = (type: string) => {
//     switch(type) {
//       case 'user': return <UserPlus className="w-4 h-4 text-blue-400" />;
//       case 'quiz': return <BookOpen className="w-4 h-4 text-purple-400" />;
//       case 'result': return <CheckCircle className="w-4 h-4 text-green-400" />;
//       default: return <Clock className="w-4 h-4 text-gray-400" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="relative">
//           <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Zap className="w-5 h-5 text-white/40 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with Quick Actions */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
//           <p className="text-sm text-white/40 mt-1">
//             Welcome back, Admin. Here's what's happening with your platform.
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => router.push('/admin/reports')}
//             className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 border border-white/10"
//           >
//             <TrendingUp className="w-4 h-4" />
//             View Reports
//           </button>
//           <button
//             onClick={() => router.push('/admin/admin-users')}
//             className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-sm text-white transition-colors flex items-center gap-2"
//           >
//             <Users className="w-4 h-4" />
//             Manage Users
//           </button>
//         </div>
//       </div>

//       {/* Main Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[
//           {
//             title: 'Total Users',
//             value: stats.totalUsers,
//             icon: Users,
//             change: `+${stats.newUsersToday} today`,
//             href: '/admin/admin-users',
//             accent: '#6366f1'
//           },
//           {
//             title: 'Total Quizzes',
//             value: stats.totalQuizzes,
//             icon: BookOpen,
//             change: `+${stats.quizzesToday} today`,
//             href: '/admin/admin-quizzes',
//             accent: '#8b5cf6'
//           },
//           {
//             title: 'Active Users',
//             value: stats.activeUsers,
//             icon: Activity,
//             change: 'last 7 days',
//             href: '/admin/admin-users?filter=active',
//             accent: '#10b981'
//           },
//           {
//             title: 'Completion Rate',
//             value: `${stats.completionRate}%`,
//             icon: Target,
//             change: 'avg. score',
//             href: '/admin/reports',
//             accent: '#f59e0b'
//           },
//         ].map((stat) => (
//           <Link
//             key={stat.title}
//             href={stat.href}
//             className="group block bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 hover:border-white/10 transition-all hover:scale-[1.02] cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div 
//                 className="p-3 rounded-lg border"
//                 style={{ background: `${stat.accent}18`, borderColor: `${stat.accent}25` }}
//               >
//                 <stat.icon className="w-5 h-5" style={{ color: stat.accent }} />
//               </div>
//               <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
//             </div>
//             <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
//             <p className="text-sm text-white/40 mb-2">{stat.title}</p>
//             <p className="text-xs text-white/20 flex items-center gap-1">
//               <Clock className="w-3 h-3" />
//               {stat.change}
//             </p>
//           </Link>
//         ))}
//       </div>

//       {/* Secondary Stats Row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {[
//           { title: 'Total Attempts', value: stats.totalAttempts, icon: Award, change: 'all time', accent: '#ec4899' },
//           { title: 'Avg. Score', value: `${stats.avgScore}%`, icon: TrendingUp, change: 'overall', accent: '#f59e0b' },
//         ].map((stat) => (
//           <div
//             key={stat.title}
//             className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between"
//           >
//             <div>
//               <p className="text-sm text-white/40 mb-1">{stat.title}</p>
//               <p className="text-2xl font-semibold text-white">{stat.value}</p>
//               <p className="text-xs text-white/20 mt-1">{stat.change}</p>
//             </div>
//             <div 
//               className="p-3 rounded-lg border"
//               style={{ background: `${stat.accent}18`, borderColor: `${stat.accent}25` }}
//             >
//               <stat.icon className="w-5 h-5" style={{ color: stat.accent }} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity with Links */}
//       <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden">
//         <div className="p-5 border-b border-white/[0.05] flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Activity className="w-5 h-5 text-purple-400" />
//             <h2 className="text-base font-medium text-white">Recent Activity</h2>
//           </div>
//           <Link
//             href="/admin/reports"
//             className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
//           >
//             View all
//             <ChevronRight className="w-3 h-3" />
//           </Link>
//         </div>
        
//         <div className="divide-y divide-white/[0.05]">
//           {recentActivity.map((activity) => (
//             <div
//               key={activity.id}
//               className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors group cursor-pointer"
//               onClick={() => {
//                 if (activity.type === 'user' && activity.userId) {
//                   router.push(`/admin/admin-users/${activity.userId}`);
//                 } else if (activity.type === 'quiz' && activity.quizId) {
//                   router.push(`/admin/admin-quizzes/${activity.quizId}`);
//                 }
//               }}
//             >
//               <div className="w-8 h-8 rounded-full bg-white/[0.02] flex items-center justify-center group-hover:scale-110 transition-transform">
//                 {getActivityIcon(activity.type)}
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm text-white/80 group-hover:text-white transition-colors">
//                   {activity.message}
//                 </p>
//                 <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
//                   <Calendar className="w-3 h-3" />
//                   {activity.time}
//                 </p>
//               </div>
//               <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Quick Actions Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[
//           { href: '/admin/admin-users', icon: Users, title: 'User Management', desc: 'View, edit, and manage all users', accent: '#6366f1' },
//           { href: '/admin/admin-quizzes', icon: BookOpen, title: 'Quiz Management', desc: 'Monitor and manage all quizzes', accent: '#8b5cf6' },
//           { href: '/admin/reports', icon: BarChart3, title: 'Analytics', desc: 'View reports and insights', accent: '#f59e0b' },
//         ].map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className="group bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] rounded-xl p-4 hover:scale-[1.02] transition-all"
//           >
//             <div className="flex items-center gap-3 mb-2">
//               <div 
//                 className="w-9 h-9 rounded-lg flex items-center justify-center"
//                 style={{ background: `${item.accent}18` }}
//               >
//                 <item.icon className="w-4 h-4" style={{ color: item.accent }} />
//               </div>
//               <span className="text-sm font-medium text-white">{item.title}</span>
//             </div>
//             <p className="text-xs text-white/40">{item.desc}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }








// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Users, BookOpen, CheckCircle, Clock, TrendingUp, UserPlus,
//   Award, ChevronRight, Calendar, Activity, Target, Zap, BarChart3
// } from 'lucide-react';

// interface Stats {
//   totalUsers: number; totalQuizzes: number; activeUsers: number;
//   completionRate: number; newUsersToday: number; quizzesToday: number;
//   totalAttempts: number; avgScore: number;
// }
// interface RecentActivity {
//   id: string; type: 'user' | 'quiz' | 'result'; message: string;
//   time: string; userId?: string; quizId?: string;
// }

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [stats, setStats] = useState<Stats>({
//     totalUsers: 0, totalQuizzes: 0, activeUsers: 0, completionRate: 0,
//     newUsersToday: 0, quizzesToday: 0, totalAttempts: 0, avgScore: 0
//   });
//   const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => { fetchDashboardData(); }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [sRes, aRes] = await Promise.all([
//         fetch('/api/admin/dashboard'),
//         fetch('/api/admin/recent-activity')
//       ]);
//       const sData = await sRes.json();
//       if (sData.success) setStats(sData.data);
//       const aData = await aRes.json();
//       if (aData.success) setRecentActivity(aData.data);
//       else setRecentActivity([
//         { id: '1', type: 'user', message: 'New user registered', time: '2 minutes ago' },
//         { id: '2', type: 'quiz', message: 'New quiz created', time: '15 minutes ago' },
//         { id: '3', type: 'result', message: 'Quiz completed', time: '1 hour ago' },
//         { id: '4', type: 'user', message: 'Teacher account approved', time: '2 hours ago' },
//         { id: '5', type: 'quiz', message: 'Quiz attempted 50 times', time: '3 hours ago' },
//       ]);
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   };

//   const getActivityIcon = (type: string) => {
//     const map: any = {
//       user: <UserPlus className="w-3.5 h-3.5 text-emerald-400" />,
//       quiz: <BookOpen className="w-3.5 h-3.5 text-emerald-300" />,
//       result: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />,
//     };
//     return map[type] || <Clock className="w-3.5 h-3.5 text-white/30" />;
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center h-72">
//       <div className="flex flex-col items-center gap-3">
//         <div className="relative w-9 h-9">
//           <div className="absolute inset-0 rounded-full border-2 border-emerald-500/15 border-t-emerald-400 animate-spin" />
//         </div>
//         <p className="text-[11px] text-white/20 tracking-widest uppercase">Loading</p>
//       </div>
//     </div>
//   );

//   const statCards = [
//     { title: 'Total Users', value: stats.totalUsers, icon: Users, sub: `+${stats.newUsersToday} today`, href: '/admin/admin-users' },
//     { title: 'Total Quizzes', value: stats.totalQuizzes, icon: BookOpen, sub: `+${stats.quizzesToday} today`, href: '/admin/admin-quizzes' },
//     { title: 'Active Users', value: stats.activeUsers, icon: Activity, sub: 'last 7 days', href: '/admin/admin-users' },
//     { title: 'Completion Rate', value: `${stats.completionRate}%`, icon: Target, sub: 'all time avg', href: '/admin/reports' },
//   ];

//   return (
//     <div className="space-y-6 max-w-7xl">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <p className="text-[11px] text-emerald-500/50 uppercase tracking-widest font-semibold mb-1">Overview</p>
//           <h1 className="text-xl font-semibold text-white">Dashboard</h1>
//           <p className="text-sm text-white/25 mt-0.5">Welcome back. Here's what's happening.</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <button onClick={() => router.push('/admin/reports')}
//             className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white/70 border transition-all"
//             style={{ borderColor: 'rgba(52,211,153,0.1)', background: 'rgba(52,211,153,0.03)' }}>
//             <BarChart3 className="w-3.5 h-3.5" /> Reports
//           </button>
//           <button onClick={() => router.push('/admin/admin-users')}
//             className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
//             style={{ background: 'linear-gradient(135deg, #059669, #34d399)', boxShadow: '0 0 20px rgba(52,211,153,0.2)' }}>
//             <Users className="w-3.5 h-3.5" /> Manage Users
//           </button>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//         {statCards.map((card, i) => (
//           <Link key={card.title} href={card.href}
//             className="group block p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02]"
//             style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(52,211,153,0.08)' }}
//             onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.25)')}
//             onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.08)')}>
//             <div className="flex items-start justify-between mb-3">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center"
//                 style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.12)' }}>
//                 <card.icon className="w-4 h-4 text-emerald-400" />
//               </div>
//               <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover:text-emerald-500/40 transition-colors" />
//             </div>
//             <p className="text-xl font-bold text-white mb-0.5">{card.value}</p>
//             <p className="text-xs text-white/35">{card.title}</p>
//             <p className="text-[10px] text-emerald-500/50 mt-1.5 flex items-center gap-1">
//               <Clock className="w-2.5 h-2.5" />{card.sub}
//             </p>
//           </Link>
//         ))}
//       </div>

//       {/* Secondary stats */}
//       <div className="grid sm:grid-cols-2 gap-3">
//         {[
//           { title: 'Total Attempts', value: stats.totalAttempts, icon: Award, sub: 'all time' },
//           { title: 'Average Score', value: `${stats.avgScore}%`, icon: TrendingUp, sub: 'across all quizzes' },
//         ].map((s) => (
//           <div key={s.title} className="flex items-center justify-between p-4 rounded-2xl border"
//             style={{ background: 'rgba(255,255,255,0.015)', borderColor: 'rgba(52,211,153,0.07)' }}>
//             <div>
//               <p className="text-xs text-white/30 mb-1">{s.title}</p>
//               <p className="text-2xl font-bold text-white">{s.value}</p>
//               <p className="text-[10px] text-white/20 mt-1">{s.sub}</p>
//             </div>
//             <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
//               style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.12)' }}>
//               <s.icon className="w-5 h-5 text-emerald-400" />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Row */}
//       <div className="grid lg:grid-cols-3 gap-4">

//         {/* Activity Feed */}
//         <div className="lg:col-span-2 rounded-2xl border overflow-hidden"
//           style={{ background: 'rgba(255,255,255,0.015)', borderColor: 'rgba(52,211,153,0.07)' }}>
//           <div className="flex items-center justify-between px-5 py-3.5"
//             style={{ borderBottom: '1px solid rgba(52,211,153,0.06)' }}>
//             <div className="flex items-center gap-2">
//               <Activity className="w-4 h-4 text-emerald-400" />
//               <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
//             </div>
//             <Link href="/admin/reports"
//               className="flex items-center gap-1 text-[11px] text-white/25 hover:text-emerald-400 transition-colors">
//               View all <ChevronRight className="w-3 h-3" />
//             </Link>
//           </div>
//           {recentActivity.map((a) => (
//             <div key={a.id}
//               className="flex items-center gap-3.5 px-5 py-3 cursor-pointer group transition-colors"
//               style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
//               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,211,153,0.03)')}
//               onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
//               onClick={() => {
//                 if (a.type === 'user' && a.userId) router.push(`/admin/admin-users/${a.userId}`);
//                 else if (a.type === 'quiz' && a.quizId) router.push(`/admin/admin-quizzes/${a.quizId}`);
//               }}>
//               <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ background: 'rgba(52,211,153,0.07)' }}>
//                 {getActivityIcon(a.type)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors truncate">{a.message}</p>
//                 <p className="text-[10px] text-white/20 mt-0.5 flex items-center gap-1">
//                   <Calendar className="w-2.5 h-2.5" />{a.time}
//                 </p>
//               </div>
//               <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover:text-emerald-500/40 transition-colors shrink-0" />
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="space-y-2.5">
//           <p className="text-[11px] text-white/20 uppercase tracking-widest font-semibold px-1">Quick Actions</p>
//           {[
//             { href: '/admin/admin-users', icon: Users, title: 'User Management', desc: 'View & manage all users' },
//             { href: '/admin/admin-quizzes', icon: BookOpen, title: 'Quiz Management', desc: 'Monitor all quizzes' },
//             { href: '/admin/reports', icon: BarChart3, title: 'Analytics', desc: 'Reports & insights' },
//           ].map((item) => (
//             <Link key={item.href} href={item.href}
//               className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:scale-[1.02] group"
//               style={{ background: 'rgba(52,211,153,0.03)', borderColor: 'rgba(52,211,153,0.08)' }}
//               onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.2)')}
//               onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(52,211,153,0.08)')}>
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
//                 style={{ background: 'rgba(52,211,153,0.08)' }}>
//                 <item.icon className="w-4 h-4 text-emerald-400" />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{item.title}</p>
//                 <p className="text-[11px] text-white/25">{item.desc}</p>
//               </div>
//               <ChevronRight className="ml-auto w-3.5 h-3.5 text-white/10 group-hover:text-emerald-400 transition-colors shrink-0" />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Users, BookOpen, CheckCircle, Clock, TrendingUp, UserPlus,
//   Award, ChevronRight, Calendar, Activity, Target, Zap, BarChart3,
//   ArrowUpRight, ArrowDownRight, MoreHorizontal
// } from 'lucide-react';

// interface Stats {
//   totalUsers: number; totalQuizzes: number; activeUsers: number;
//   completionRate: number; newUsersToday: number; quizzesToday: number;
//   totalAttempts: number; avgScore: number;
// }
// interface RecentActivity {
//   id: string; type: 'user' | 'quiz' | 'result'; message: string;
//   time: string; userId?: string; quizId?: string;
// }

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [stats, setStats] = useState<Stats>({
//     totalUsers: 12456, totalQuizzes: 342, activeUsers: 5678, completionRate: 78,
//     newUsersToday: 124, quizzesToday: 23, totalAttempts: 45678, avgScore: 72
//   });
//   const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
//     { id: '1', type: 'user', message: 'New user registered', time: '2 minutes ago' },
//     { id: '2', type: 'quiz', message: 'JavaScript Quiz created', time: '15 minutes ago' },
//     { id: '3', type: 'result', message: 'Quiz completed by 45 students', time: '1 hour ago' },
//     { id: '4', type: 'user', message: 'Teacher account approved', time: '2 hours ago' },
//     { id: '5', type: 'quiz', message: 'React Quiz attempted 50 times', time: '3 hours ago' },
//   ]);
//   const [loading, setLoading] = useState(false);

//   const getActivityIcon = (type: string) => {
//     const map: any = {
//       user: <UserPlus className="w-4 h-4 text-emerald-400" />,
//       quiz: <BookOpen className="w-4 h-4 text-emerald-400" />,
//       result: <CheckCircle className="w-4 h-4 text-emerald-400" />,
//     };
//     return map[type] || <Clock className="w-4 h-4 text-gray-500" />;
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center h-96">
//       <div className="flex flex-col items-center gap-3">
//         <div className="relative w-12 h-12">
//           <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
//         </div>
//         <p className="text-sm text-gray-500">Loading dashboard...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider">Admin Dashboard</p>
//           </div>
//           <h1 className="text-2xl font-semibold text-white">Welcome back, Admin</h1>
//           <p className="text-sm text-gray-500 mt-1">Here's what's happening with your platform today.</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={() => router.push('/admin/reports')}
//             className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
//           >
//             <BarChart3 className="w-4 h-4 inline-block mr-2" />
//             Reports
//           </button>
//           <button 
//             onClick={() => router.push('/admin/admin-users')}
//             className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all duration-200"
//           >
//             <Users className="w-4 h-4 inline-block mr-2" />
//             Manage Users
//           </button>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-[#0A0A0A] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
//               <Users className="w-5 h-5 text-emerald-400" />
//             </div>
//             <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
//               +{stats.newUsersToday} today
//             </span>
//           </div>
//           <p className="text-2xl font-semibold text-white">{stats.totalUsers.toLocaleString()}</p>
//           <p className="text-sm text-gray-500 mt-1">Total Users</p>
//           <div className="flex items-center gap-1 mt-3 text-xs text-emerald-400">
//             <ArrowUpRight className="w-3.5 h-3.5" />
//             <span>12% increase</span>
//           </div>
//         </div>

//         <div className="bg-[#0A0A0A] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
//               <BookOpen className="w-5 h-5 text-emerald-400" />
//             </div>
//             <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
//               +{stats.quizzesToday} today
//             </span>
//           </div>
//           <p className="text-2xl font-semibold text-white">{stats.totalQuizzes}</p>
//           <p className="text-sm text-gray-500 mt-1">Total Quizzes</p>
//           <div className="flex items-center gap-1 mt-3 text-xs text-emerald-400">
//             <ArrowUpRight className="w-3.5 h-3.5" />
//             <span>8% increase</span>
//           </div>
//         </div>

//         <div className="bg-[#0A0A0A] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
//               <Activity className="w-5 h-5 text-emerald-400" />
//             </div>
//             <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-full">
//               Last 7 days
//             </span>
//           </div>
//           <p className="text-2xl font-semibold text-white">{stats.activeUsers.toLocaleString()}</p>
//           <p className="text-sm text-gray-500 mt-1">Active Users</p>
//           <div className="flex items-center gap-1 mt-3 text-xs text-emerald-400">
//             <ArrowUpRight className="w-3.5 h-3.5" />
//             <span>5% increase</span>
//           </div>
//         </div>

//         <div className="bg-[#0A0A0A] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
//               <Target className="w-5 h-5 text-emerald-400" />
//             </div>
//             <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-full">
//               All time avg
//             </span>
//           </div>
//           <p className="text-2xl font-semibold text-white">{stats.completionRate}%</p>
//           <p className="text-sm text-gray-500 mt-1">Completion Rate</p>
//           <div className="flex items-center gap-1 mt-3 text-xs text-emerald-400">
//             <ArrowUpRight className="w-3.5 h-3.5" />
//             <span>3% increase</span>
//           </div>
//         </div>
//       </div>

//       {/* Secondary Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div className="bg-[#0A0A0A] rounded-xl border border-gray-800 p-6">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-500 mb-2">Total Attempts</p>
//               <p className="text-3xl font-semibold text-white">{stats.totalAttempts.toLocaleString()}</p>
//               <p className="text-xs text-gray-600 mt-2">Across all quizzes</p>
//             </div>
//             <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
//               <Award className="w-6 h-6 text-emerald-400" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-[#0A0A0A] rounded-xl border border-gray-800 p-6">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-500 mb-2">Average Score</p>
//               <p className="text-3xl font-semibold text-white">{stats.avgScore}%</p>
//               <p className="text-xs text-gray-600 mt-2">↑ 4% from last month</p>
//             </div>
//             <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
//               <TrendingUp className="w-6 h-6 text-emerald-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//         {/* Activity Feed */}
//         <div className="lg:col-span-2 bg-[#0A0A0A] rounded-xl border border-gray-800 overflow-hidden">
//           <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//             <div className="flex items-center gap-3">
//               <Activity className="w-5 h-5 text-emerald-400" />
//               <h2 className="text-sm font-medium text-white">Recent Activity</h2>
//             </div>
//             <Link 
//               href="/admin/reports"
//               className="text-xs text-gray-500 hover:text-emerald-400 transition-colors"
//             >
//               View all →
//             </Link>
//           </div>
//           <div className="divide-y divide-gray-800">
//             {recentActivity.map((activity) => (
//               <div 
//                 key={activity.id}
//                 className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 transition-colors cursor-pointer"
//                 onClick={() => {
//                   if (activity.type === 'user' && activity.userId) router.push(`/admin/admin-users/${activity.userId}`);
//                   else if (activity.type === 'quiz' && activity.quizId) router.push(`/admin/admin-quizzes/${activity.quizId}`);
//                 }}
//               >
//                 <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
//                   {getActivityIcon(activity.type)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-gray-300 truncate">{activity.message}</p>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Calendar className="w-3 h-3 text-gray-600" />
//                     <p className="text-xs text-gray-600">{activity.time}</p>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-4 h-4 text-gray-600" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="space-y-3">
//           <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-1">Quick Actions</h3>
          
//           <Link href="/admin/admin-users" 
//             className="block bg-[#0A0A0A] rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-all duration-200"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
//                 <Users className="w-5 h-5 text-emerald-400" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-white">User Management</p>
//                 <p className="text-xs text-gray-500 mt-0.5">View & manage all users</p>
//               </div>
//             </div>
//           </Link>

//           <Link href="/admin/admin-quizzes" 
//             className="block bg-[#0A0A0A] rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-all duration-200"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
//                 <BookOpen className="w-5 h-5 text-emerald-400" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-white">Quiz Management</p>
//                 <p className="text-xs text-gray-500 mt-0.5">Monitor all quizzes</p>
//               </div>
//             </div>
//           </Link>

//           <Link href="/admin/reports" 
//             className="block bg-[#0A0A0A] rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-all duration-200"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
//                 <BarChart3 className="w-5 h-5 text-emerald-400" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-white">Analytics</p>
//                 <p className="text-xs text-gray-500 mt-0.5">Reports & insights</p>
//               </div>
//             </div>
//           </Link>
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
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
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

// ── Stat card ──────────────────────────────────────────────────────
function StatCard({ icon: Icon, value, label, badge, trend }: {
  icon: any; value: string | number; label: string;
  badge: string; trend?: string;
}) {
  return (
    <div className="rounded-2xl p-3.5 sm:p-5 transition-all duration-200"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = T.accentBorder)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: T.accentBg }}>
          <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18, color: T.accent }} />
        </div>
        <span className="text-[11px] font-medium px-2 py-1 rounded-full"
          style={{ background: T.accentBg, color: T.accentHover }}>
          {badge}
        </span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm mt-0.5" style={{ color: T.muted }}>{label}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: T.accent }}>
          <ArrowUpRight className="w-3.5 h-3.5" />
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
      user:   <UserPlus  style={{ width: 14, height: 14, color: T.accent }} />,
      quiz:   <BookOpen  style={{ width: 14, height: 14, color: T.accent }} />,
      result: <CheckCircle style={{ width: 14, height: 14, color: T.accent }} />,
    };
    return map[type] || <Clock style={{ width: 14, height: 14, color: T.muted }} />;
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full overflow-x-hidden">

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
            <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: `${T.accent}cc` }}>
              Admin Dashboard
            </p>
          </div>
          <h1 className="text-xl font-bold text-white">Welcome back, Admin</h1>
          <p className="text-xs mt-1" style={{ color: T.muted }}>Platform overview for today.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => router.push('/admin/reports')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted }}>
            <BarChart3 className="w-3.5 h-3.5 shrink-0" />
            Reports
          </button>
          <button onClick={() => router.push('/admin/admin-users')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
            <Users className="w-3.5 h-3.5 shrink-0" />
            Manage Users
          </button>
        </div>
      </div>

      {/* ── Primary stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Users}    value={stats.totalUsers.toLocaleString()} label="Total Users"    badge={`+${stats.newUsersToday} today`} trend="12% increase" />
        <StatCard icon={BookOpen} value={stats.totalQuizzes}                label="Total Quizzes"  badge={`+${stats.quizzesToday} today`}  trend="8% increase"  />
        <StatCard icon={Activity} value={stats.activeUsers.toLocaleString()} label="Active Users"  badge="Last 7 days"                      trend="5% increase"  />
        <StatCard icon={Target}   value={`${stats.completionRate}%`}         label="Completion"    badge="All-time avg"                     trend="3% increase"  />
      </div>

      {/* ── Secondary stat cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl p-3.5 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm mb-1.5" style={{ color: T.muted }}>Total Attempts</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalAttempts.toLocaleString()}</p>
              <p className="text-xs mt-1.5" style={{ color: T.dim }}>Across all quizzes</p>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
              <Award style={{ width: 18, height: 18, color: T.accent }} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-3.5 sm:p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm mb-1.5" style={{ color: T.muted }}>Average Score</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stats.avgScore}%</p>
              <p className="text-xs mt-1.5" style={{ color: T.accent }}>↑ 4% from last month</p>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.accentBg }}>
              <TrendingUp style={{ width: 18, height: 18, color: T.accent }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Activity + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Activity feed */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between px-4 py-3.5"
            style={{ borderBottom: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4" style={{ color: T.accent }} />
              <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
            </div>
            <Link href="/admin/reports" className="text-xs font-medium transition-colors"
              style={{ color: T.muted }}
              onMouseEnter={e => e.currentTarget.style.color = T.accentHover}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}>
              View all →
            </Link>
          </div>

          <div className="divide-y" style={{ borderColor: T.border }}>
            {recentActivity.map((a) => (
              <div key={a.id}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                onClick={() => {
                  if (a.type === 'user' && a.userId) router.push(`/admin/admin-users/${a.userId}`);
                  else if (a.type === 'quiz' && a.quizId) router.push(`/admin/admin-quizzes/${a.quizId}`);
                }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: T.accentBg }}>
                  {activityIcon(a.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{a.message}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3 h-3" style={{ color: T.dim }} />
                    <p className="text-[11px]" style={{ color: T.dim }}>{a.time}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0" style={{ color: T.dim }} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider px-1" style={{ color: T.dim }}>
            Quick Actions
          </p>

          {[
            { href: '/admin/admin-users',   icon: Users,    title: 'User Management',  sub: 'View & manage all users'  },
            { href: '/admin/admin-quizzes', icon: BookOpen, title: 'Quiz Management',  sub: 'Monitor all quizzes'       },
            { href: '/admin/reports',       icon: BarChart3,title: 'Analytics',        sub: 'Reports & insights'        },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3.5 p-4 rounded-2xl transition-all block"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.accentBorder; e.currentTarget.style.background = 'rgba(16,185,129,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: T.accentBg }}>
                <item.icon style={{ width: 18, height: 18, color: T.accent }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs mt-0.5" style={{ color: T.muted }}>{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}