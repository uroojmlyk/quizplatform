


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard, Users, BookOpen, BarChart3,
//   LogOut, Settings, Menu, X, Sparkles, ChevronRight, Bell,
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// const T = {
//   bg: '#080810',
//   sidebar: '#0a0a14',
//   accent: '#34d399',
//   accentHover: '#34d399',
//   accentBg: 'rgba(52,211,153,0.07)',
//   accentBorder: 'rgba(52,211,153,0.18)',
//   border: 'rgba(255,255,255,0.07)',
//   muted: 'rgba(255,255,255,0.38)',
// };

// const NAV = [
//   { name: 'Dashboard', href: '/admin',              icon: LayoutDashboard },
//   { name: 'Users',     href: '/admin/admin-users',   icon: Users           },
//   { name: 'Quizzes',   href: '/admin/admin-quizzes', icon: BookOpen        },
//   { name: 'Reports',   href: '/admin/reports',       icon: BarChart3       },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const router   = useRouter();
//   const pathname = usePathname();
//   const [open,    setOpen]    = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user,    setUser]    = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token      = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const userData = JSON.parse(storedUser);
//     if (userData.role?.toLowerCase().trim() !== 'admin') { router.push('/dashboard'); return; }
//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   const handleLogout = () => {
//     showToast.loading('Logging out...');
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   const crumb = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'dashboard';

//   if (!isAdmin) return (
//     <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
//       <div className="relative">
//         <div className="w-10 h-10 rounded-full border-2 animate-spin"
//           style={{ borderColor: `${T.accent}25`, borderTopColor: T.accent }} />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Sparkles className="w-4 h-4 animate-pulse" style={{ color: `${T.accent}70` }} />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');`}</style>
//       <Toaster position="top-right" />

//       {/* Mobile backdrop */}
//       {open && (
//         <div className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
//           style={{ background: 'rgba(0,0,0,0.75)' }}
//           onClick={() => setOpen(false)} />
//       )}

//       {/* ─── Sidebar ─── */}
//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col
//           transform transition-transform duration-300 ease-in-out
//           lg:translate-x-0
//           ${open ? 'translate-x-0' : '-translate-x-full'}`}
//         style={{ background: T.sidebar, borderRight: `1px solid ${T.border}` }}
//       >
//         {/* Logo row */}
//         <div className="h-14 flex items-center justify-between px-4 shrink-0"
//           style={{ borderBottom: `1px solid ${T.border}` }}>
//           <div className="flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg flex items-center justify-center"
//               style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
//               <span className="text-white/80 font-bold text-sm">F</span>
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-white">Ficer</p>
//               <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>admin panel</p>
//             </div>
//           </div>
//           <button className="lg:hidden p-1.5 rounded-lg" style={{ color: T.muted }}
//             onClick={() => setOpen(false)}>
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
//           {NAV.map((item) => {
//             const active = pathname === item.href;
//             return (
//               <Link key={item.name} href={item.href} onClick={() => setOpen(false)}
//                 className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//                 style={active
//                   ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
//                   : { border: '1px solid transparent', color: T.muted }}
//                 onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
//                 onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.muted; }}
//               >
//                 <div className="flex items-center gap-3">
//                   <item.icon className="w-4 h-4 shrink-0" />
//                   {item.name}
//                 </div>
//                 {active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.accentHover }} />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-3 space-y-0.5 shrink-0" style={{ borderTop: `1px solid ${T.border}` }}>
//           {/* Settings */}
//           <Link href="/admin/settings" onClick={() => setOpen(false)}
//             className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//             style={pathname === '/admin/settings'
//               ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
//               : { border: '1px solid transparent', color: T.muted }}
//             onMouseEnter={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
//             onMouseLeave={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = T.muted; }}
//           >
//             <Settings className="w-4 h-4 shrink-0" />
//             Settings
//           </Link>
//           {/* Logout */}
//           <button onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//             style={{ border: '1px solid transparent', color: T.muted }}
//             onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
//             onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = 'transparent'; }}
//           >
//             <LogOut className="w-4 h-4 shrink-0" />
//             Logout
//           </button>
//           {/* User card */}
//           <div className="mt-2 px-3 py-3 rounded-xl"
//             style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
//                 style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
//                 <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.2)' }}>{user?.email || ''}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* ─── Main ─── */}
//       <div className="lg:pl-64">
//         {/* Topbar */}
//         <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-5 backdrop-blur-xl"
//           style={{ background: `${T.bg}dd`, borderBottom: `1px solid ${T.border}` }}>
//           <div className="flex items-center gap-3">
//             <button onClick={() => setOpen(true)}
//               className="lg:hidden p-2 rounded-xl transition-all"
//               style={{ color: T.muted, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               <Menu className="w-4 h-4" />
//             </button>
//             {/* Page name on mobile */}
//             <span className="lg:hidden text-xs font-semibold capitalize text-white/60">{crumb}</span>
//             <div className="hidden lg:flex items-center gap-2 text-xs">
//               <span style={{ color: 'rgba(255,255,255,0.2)' }}>admin</span>
//               <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.12)' }} />
//               <span className="font-semibold capitalize" style={{ color: 'rgba(255,255,255,0.55)' }}>{crumb}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="relative p-2 rounded-xl transition-all"
//               style={{ color: T.muted, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               <Bell className="w-4 h-4" />
//               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
//             </button>
//             <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl"
//               style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
//               <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
//                 style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <span className="hidden sm:block text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
//                 {user?.name || 'Admin'}
//               </span>
//             </div>
//           </div>
//         </header>

//         <main className="p-3 sm:p-5 lg:p-6 pb-20 lg:pb-6 overflow-x-hidden">{children}</main>
//       </div>

//       {/* ── Mobile Bottom Nav ── */}
//       <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center h-14 border-t"
//         style={{ background: `${T.sidebar}f2`, borderColor: T.border, backdropFilter: 'blur(20px)' }}>
//         {[...NAV, { name: 'Settings', href: '/admin/settings', icon: Settings }].map(item => {
//           const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
//           return (
//             <Link key={item.name} href={item.href}
//               className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1"
//               style={{ color: active ? T.accentHover : T.muted }}>
//               <div className="w-7 h-7 flex items-center justify-center rounded-xl"
//                 style={{ background: active ? T.accentBg : 'transparent' }}>
//                 <item.icon style={{ width: 16, height: 16 }} />
//               </div>
//               <span style={{ fontSize: 9, fontWeight: 500 }}>{item.name}</span>
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }






// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard, Users, BookOpen, BarChart3,
//   LogOut, Settings, Menu, X, Sparkles, ChevronRight, Bell,
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// const T = {
//   bg: '#060809',
//   sidebar: '#070a0c',
//   accent: '#10b981',
//   accentHover: '#34d399',
//   accentBg: 'rgba(16,185,129,0.1)',
//   accentBorder: 'rgba(16,185,129,0.2)',
//   border: 'rgba(255,255,255,0.055)',
//   muted: 'rgba(255,255,255,0.35)',
// };

// const NAV = [
//   { name: 'Dashboard', href: '/admin',              icon: LayoutDashboard },
//   { name: 'Users',     href: '/admin/admin-users',   icon: Users           },
//   { name: 'Quizzes',   href: '/admin/admin-quizzes', icon: BookOpen        },
//   { name: 'Reports',   href: '/admin/reports',       icon: BarChart3       },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const router   = useRouter();
//   const pathname = usePathname();
//   const [open,    setOpen]    = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user,    setUser]    = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token      = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const userData = JSON.parse(storedUser);
//     if (userData.role?.toLowerCase().trim() !== 'admin') { router.push('/dashboard'); return; }
//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   const handleLogout = () => {
//     showToast.loading('Logging out...');
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   const crumb = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'dashboard';

//   if (!isAdmin) return (
//     <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
//       <div className="relative">
//         <div className="w-10 h-10 rounded-full border-2 animate-spin"
//           style={{ borderColor: `${T.accent}25`, borderTopColor: T.accent }} />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Sparkles className="w-4 h-4 animate-pulse" style={{ color: `${T.accent}70` }} />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
// 
//       {/* Mobile backdrop */}
//       {open && (
//         <div className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
//           style={{ background: 'rgba(0,0,0,0.75)' }}
//           onClick={() => setOpen(false)} />
//       )}

//       {/* ─── Sidebar ─── */}
//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col
//           transform transition-transform duration-300 ease-in-out
//           lg:translate-x-0
//           ${open ? 'translate-x-0' : '-translate-x-full'}`}
//         style={{ background: T.sidebar, borderRight: `1px solid ${T.border}` }}
//       >
//         {/* Logo row */}
//         <div className="h-14 flex items-center justify-between px-4 shrink-0"
//           style={{ borderBottom: `1px solid ${T.border}` }}>
//           <div className="flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg flex items-center justify-center"
//               style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})`, boxShadow: `0 0 14px rgba(16,185,129,0.3)` }}>
//               <Sparkles style={{ width: 14, height: 14, color: '#fff' }} />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-white">QuizPortal</p>
//               <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>admin panel</p>
//             </div>
//           </div>
//           <button className="lg:hidden p-1.5 rounded-lg" style={{ color: T.muted }}
//             onClick={() => setOpen(false)}>
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
//           {NAV.map((item) => {
//             const active = pathname === item.href;
//             return (
//               <Link key={item.name} href={item.href} onClick={() => setOpen(false)}
//                 className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//                 style={active
//                   ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
//                   : { border: '1px solid transparent', color: T.muted }}
//                 onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
//                 onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.muted; }}
//               >
//                 <div className="flex items-center gap-3">
//                   <item.icon className="w-4 h-4 shrink-0" />
//                   {item.name}
//                 </div>
//                 {active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.accentHover }} />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-3 space-y-0.5 shrink-0" style={{ borderTop: `1px solid ${T.border}` }}>
//           {/* Settings */}
//           <Link href="/admin/settings" onClick={() => setOpen(false)}
//             className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//             style={pathname === '/admin/settings'
//               ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
//               : { border: '1px solid transparent', color: T.muted }}
//             onMouseEnter={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
//             onMouseLeave={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = T.muted; }}
//           >
//             <Settings className="w-4 h-4 shrink-0" />
//             Settings
//           </Link>
//           {/* Logout */}
//           <button onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//             style={{ border: '1px solid transparent', color: T.muted }}
//             onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
//             onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = 'transparent'; }}
//           >
//             <LogOut className="w-4 h-4 shrink-0" />
//             Logout
//           </button>
//           {/* User card */}
//           <div className="mt-2 px-3 py-3 rounded-xl"
//             style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
//                 style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
//                 <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.2)' }}>{user?.email || ''}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* ─── Main ─── */}
//       <div className="lg:pl-64">
//         {/* Topbar */}
//         <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-5 backdrop-blur-xl"
//           style={{ background: `${T.bg}dd`, borderBottom: `1px solid ${T.border}` }}>
//           <div className="flex items-center gap-3">
//             <button onClick={() => setOpen(true)}
//               className="lg:hidden p-2 rounded-xl transition-all"
//               style={{ color: T.muted, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               <Menu className="w-4 h-4" />
//             </button>
//             <div className="hidden lg:flex items-center gap-2 text-xs">
//               <span style={{ color: 'rgba(255,255,255,0.2)' }}>admin</span>
//               <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.12)' }} />
//               <span className="font-semibold capitalize" style={{ color: 'rgba(255,255,255,0.55)' }}>{crumb}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="relative p-2 rounded-xl transition-all"
//               style={{ color: T.muted, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               <Bell className="w-4 h-4" />
//               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
//             </button>
//             <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl"
//               style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
//               <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
//                 style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <span className="hidden sm:block text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
//                 {user?.name || 'Admin'}
//               </span>
//             </div>
//           </div>
//         </header>

//         <main className="p-4 sm:p-5 lg:p-6">{children}</main>
//       </div>
//     </div>
//   );
// }








// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard, Users, BookOpen, BarChart3,
//   LogOut, Settings, Menu, X, Sparkles, ChevronRight, Bell,
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// const T = {
//   bg: '#060809',
//   sidebar: '#070a0c',
//   accent: '#10b981',
//   accentHover: '#34d399',
//   accentBg: 'rgba(16,185,129,0.1)',
//   accentBorder: 'rgba(16,185,129,0.2)',
//   border: 'rgba(255,255,255,0.055)',
//   muted: 'rgba(255,255,255,0.35)',
// };

// const NAV = [
//   { name: 'Dashboard', href: '/admin',              icon: LayoutDashboard },
//   { name: 'Users',     href: '/admin/admin-users',   icon: Users           },
//   { name: 'Quizzes',   href: '/admin/admin-quizzes', icon: BookOpen        },
//   { name: 'Reports',   href: '/admin/reports',       icon: BarChart3       },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const router   = useRouter();
//   const pathname = usePathname();
//   const [open,    setOpen]    = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user,    setUser]    = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token      = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const userData = JSON.parse(storedUser);
//     if (userData.role?.toLowerCase().trim() !== 'admin') { router.push('/dashboard'); return; }
//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   // Close sidebar on route change (mobile)
//   useEffect(() => { setOpen(false); }, [pathname]);

//   const handleLogout = () => {
//     showToast.loading('Logging out...');
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   const crumb = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'dashboard';

//   if (!isAdmin) return (
//     <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
//       <div className="relative">
//         <div className="w-10 h-10 rounded-full border-2 animate-spin"
//           style={{ borderColor: `${T.accent}25`, borderTopColor: T.accent }} />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Sparkles className="w-4 h-4 animate-pulse" style={{ color: `${T.accent}70` }} />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
// 
//       {/* ─── Mobile backdrop ─── */}
//       {open && (
//         <div
//           className="fixed inset-0 z-40 lg:hidden"
//           style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* ─── Sidebar (desktop always visible, mobile slide-in) ─── */}
//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col
//           transform transition-transform duration-300 ease-in-out
//           lg:translate-x-0
//           ${open ? 'translate-x-0' : '-translate-x-full'}`}
//         style={{ background: T.sidebar, borderRight: `1px solid ${T.border}` }}
//       >
//         {/* Logo row */}
//         <div className="h-14 flex items-center justify-between px-4 shrink-0"
//           style={{ borderBottom: `1px solid ${T.border}` }}>
//           <div className="flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg flex items-center justify-center"
//               style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})`, boxShadow: `0 0 14px rgba(16,185,129,0.3)` }}>
//               <Sparkles style={{ width: 14, height: 14, color: '#fff' }} />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-white">QuizPortal</p>
//               <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>admin panel</p>
//             </div>
//           </div>
//           <button className="lg:hidden p-1.5 rounded-lg" style={{ color: T.muted }}
//             onClick={() => setOpen(false)}>
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
//           {NAV.map((item) => {
//             const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
//             return (
//               <Link key={item.name} href={item.href}
//                 className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//                 style={active
//                   ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
//                   : { border: '1px solid transparent', color: T.muted }}
//                 onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
//                 onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.muted; }}
//               >
//                 <div className="flex items-center gap-3">
//                   <item.icon className="w-4 h-4 shrink-0" />
//                   {item.name}
//                 </div>
//                 {active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.accentHover }} />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-3 space-y-0.5 shrink-0" style={{ borderTop: `1px solid ${T.border}` }}>
//           <Link href="/admin/settings"
//             className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//             style={pathname === '/admin/settings'
//               ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
//               : { border: '1px solid transparent', color: T.muted }}
//             onMouseEnter={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
//             onMouseLeave={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = T.muted; }}
//           >
//             <Settings className="w-4 h-4 shrink-0" />
//             Settings
//           </Link>
//           <button onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
//             style={{ border: '1px solid transparent', color: T.muted }}
//             onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
//             onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = 'transparent'; }}
//           >
//             <LogOut className="w-4 h-4 shrink-0" />
//             Logout
//           </button>
//           {/* User card */}
//           <div className="mt-2 px-3 py-3 rounded-xl"
//             style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
//                 style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
//                 <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.2)' }}>{user?.email || ''}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* ─── Main area ─── */}
//       {/* lg: push right by sidebar width. On mobile: no push, content takes full width */}
//       <div className="lg:pl-64 flex flex-col min-h-screen">

//         {/* Topbar */}
//         <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-5 backdrop-blur-xl"
//           style={{ background: `${T.bg}dd`, borderBottom: `1px solid ${T.border}` }}>
//           <div className="flex items-center gap-3">
//             {/* Hamburger — mobile only */}
//             <button
//               onClick={() => setOpen(true)}
//               className="lg:hidden p-2 rounded-xl transition-all"
//               style={{ color: T.muted, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               <Menu className="w-4 h-4" />
//             </button>
//             {/* Brand — mobile only */}
//             <div className="lg:hidden flex items-center gap-2">
//               <div className="w-5 h-5 rounded-md flex items-center justify-center"
//                 style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
//                 <Sparkles style={{ width: 10, height: 10, color: '#fff' }} />
//               </div>
//               <span className="text-xs font-semibold text-white capitalize">{crumb}</span>
//             </div>
//             {/* Breadcrumb — desktop only */}
//             <div className="hidden lg:flex items-center gap-2 text-xs">
//               <span style={{ color: 'rgba(255,255,255,0.2)' }}>admin</span>
//               <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.12)' }} />
//               <span className="font-semibold capitalize" style={{ color: 'rgba(255,255,255,0.55)' }}>{crumb}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button className="relative p-2 rounded-xl transition-all"
//               style={{ color: T.muted, border: `1px solid ${T.border}` }}
//               onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
//               onMouseLeave={e => e.currentTarget.style.color = T.muted}>
//               <Bell className="w-4 h-4" />
//               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
//             </button>
//             <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl"
//               style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
//               <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
//                 style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <span className="hidden sm:block text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
//                 {user?.name || 'Admin'}
//               </span>
//             </div>
//           </div>
//         </header>

//         {/* Page content — extra bottom padding on mobile so bottom nav doesn't cover content */}
//         <main className="flex-1 p-4 sm:p-5 lg:p-6 pb-24 lg:pb-6 overflow-x-hidden">
//           {children}
//         </main>
//       </div>

//       {/* ─── Mobile Bottom Navigation Bar ─── */}
//       <nav
//         className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 px-2"
//         style={{
//           background: `${T.sidebar}f0`,
//           borderTop: `1px solid ${T.border}`,
//           backdropFilter: 'blur(20px)',
//           WebkitBackdropFilter: 'blur(20px)',
//         }}
//       >
//         {NAV.map((item) => {
//           const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all"
//               style={{ color: active ? T.accentHover : T.muted }}
//             >
//               <div
//                 className="w-8 h-8 flex items-center justify-center rounded-xl transition-all"
//                 style={{ background: active ? T.accentBg : 'transparent' }}
//               >
//                 <item.icon style={{ width: 18, height: 18 }} />
//               </div>
//               <span className="text-[10px] font-medium leading-none">{item.name}</span>
//             </Link>
//           );
//         })}
//         {/* Settings shortcut in bottom nav */}
//         <Link
//           href="/admin/settings"
//           className="flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all"
//           style={{ color: pathname === '/admin/settings' ? T.accentHover : T.muted }}
//         >
//           <div
//             className="w-8 h-8 flex items-center justify-center rounded-xl transition-all"
//             style={{ background: pathname === '/admin/settings' ? T.accentBg : 'transparent' }}
//           >
//             <Settings style={{ width: 18, height: 18 }} />
//           </div>
//           <span className="text-[10px] font-medium leading-none">Settings</span>
//         </Link>
//       </nav>
//     </div>
//   );
// }







// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   LayoutDashboard, 
//   Users, 
//   BookOpen, 
//   BarChart3, 
//   LogOut,
//   Settings,
//   Menu,
//   X
// } from 'lucide-react';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !user) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(user);
//     if (userData.role !== 'admin') {
//       router.push('/dashboard');
//       return;
//     }

//     setIsAdmin(true);
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//     { name: 'Users', href: '/admin/admin-users', icon: Users },
//     { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//     { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
//   ];

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0B0B0F]">
//       {/* Mobile sidebar backdrop */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 z-50 h-full w-64 bg-[#111117] border-r border-white/10
//         transform transition-transform duration-300 ease-in-out
//         lg:translate-x-0
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Logo */}
//         <div className="h-16 flex items-center gap-2 px-6 border-b border-white/10">
//           <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
//             <span className="text-xs font-bold text-[#0B0B0F]">A</span>
//           </div>
//           <span className="text-sm font-medium text-white">Admin Panel</span>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors mb-1"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <item.icon className="w-4 h-4" />
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
//           <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors w-full">
//             <Settings className="w-4 h-4" />
//             Settings
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         {/* Header */}
//         <header className="sticky top-0 z-30 h-16 bg-[#111117]/80 backdrop-blur-xl border-b border-white/10">
//           <div className="flex items-center justify-between h-full px-6">
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="p-2 hover:bg-white/5 rounded-lg transition-colors lg:hidden"
//             >
//               <Menu className="w-5 h-5 text-white/60" />
//             </button>
            
//             <div className="flex items-center gap-4 ml-auto">
//               <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
//                 <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
//                   <span className="text-xs font-medium text-white/60">A</span>
//                 </div>
//                 <span className="text-sm text-white/60">Admin</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }






// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   LayoutDashboard, 
//   Users, 
//   BookOpen, 
//   BarChart3, 
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   Sparkles,
//   ChevronRight,
//   Bell
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(storedUser);
//     if (userData.role !== 'admin') {
//       router.push('/dashboard');
//       return;
//     }

//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//     { name: 'Users', href: '/admin/admin-users', icon: Users },
//     { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//     { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
//   ];

//   const handleLogout = () => {
//     const toastId = showToast.loading('Logging out...');
    
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-10 h-10 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-4 h-4 text-indigo-400/60 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       
//       {/* Mobile sidebar backdrop */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 z-50 h-full w-72 bg-[#09090B] border-r border-white/[0.05]
//         transform transition-all duration-300 ease-in-out
//         lg:translate-x-0
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Logo */}
//         <div className="h-20 flex items-center gap-3 px-6 border-b border-white/[0.05]">
//           <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <div>
//             <span className="text-sm font-light text-white">admin panel</span>
//             <p className="text-[10px] text-white/20">manage your platform</p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-1">
//           {navigation.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;
            
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsSidebarOpen(false)}
//                 className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
//                   isActive
//                     ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                     : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'}`} />
//                   <span>{item.name}</span>
//                 </div>
//                 {isActive && <ChevronRight className="w-3 h-3" />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer with Settings and Logout */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.05] space-y-1">
//           {/* Settings Button - FIXED */}
//           <Link
//             href="/admin/settings"
//             onClick={() => setIsSidebarOpen(false)}
//             className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
//               pathname === '/admin/settings'
//                 ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                 : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <Settings className={`w-4 h-4 ${
//                 pathname === '/admin/settings' ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'
//               }`} />
//               <span>settings</span>
//             </div>
//             {pathname === '/admin/settings' && <ChevronRight className="w-3 h-3" />}
//           </Link>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 w-full transition-all group"
//           >
//             <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
//             <span>logout</span>
//           </button>

//           {/* User Info */}
//           <div className="mt-4 px-4 py-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
//             <p className="text-xs text-white/40 mb-1">signed in as</p>
//             <p className="text-sm text-white">{user?.name || 'Admin'}</p>
//             <p className="text-[10px] text-white/20 mt-1">{user?.email || 'admin@example.com'}</p>
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="lg:pl-72">
//         {/* Header */}
//         <header className="sticky top-0 z-30 h-16 bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.05]">
//           <div className="flex items-center justify-between h-full px-6">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="p-2 hover:bg-white/[0.02] rounded-lg transition-colors lg:hidden border border-white/[0.05]"
//               >
//                 <Menu className="w-5 h-5 text-white/40" />
//               </button>
              
//               {/* Breadcrumb */}
//               <div className="hidden lg:flex items-center gap-2 text-sm">
//                 <span className="text-white/20">admin</span>
//                 <ChevronRight className="w-3 h-3 text-white/20" />
//                 <span className="text-white/60 capitalize">
//                   {pathname.split('/').pop() || 'dashboard'}
//                 </span>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               {/* Notification Bell */}
//               <button className="p-2 hover:bg-white/[0.02] rounded-lg transition-colors border border-white/[0.05] relative">
//                 <Bell className="w-4 h-4 text-white/40" />
//                 <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
//               </button>

//               {/* User Menu */}
//               <div className="flex items-center gap-3 px-3 py-1.5 bg-white/[0.02] rounded-xl border border-white/[0.05]">
//                 <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
//                   <span className="text-xs font-medium text-white">
//                     {user?.name?.charAt(0) || 'A'}
//                   </span>
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-xs text-white/60">admin</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard,
//   Users,
//   BookOpen,
//   BarChart3,
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   Sparkles,
//   ChevronRight,
//   Bell
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// const navigation = [
//   { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//   { name: 'Users', href: '/admin/admin-users', icon: Users },
//   { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//   { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const userData = JSON.parse(storedUser);
//     if (userData.role !== 'admin') { router.push('/dashboard'); return; }
//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   const handleLogout = () => {
//     showToast.loading('Logging out...');
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   const currentPage = pathname.split('/').filter(Boolean).pop() || 'dashboard';
//   const breadcrumb = currentPage.replace(/-/g, ' ');

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: '#050508' }}>
//         <div className="relative">
//           <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-4 h-4 text-indigo-400/50" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen" style={{ background: '#050508', fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
// 
//       {/* Mobile backdrop */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* ─── SIDEBAR ─── */}
//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
//         style={{
//           background: '#080810',
//           borderColor: 'rgba(255,255,255,0.05)'
//         }}
//       >
//         {/* Logo */}
//         <div
//           className="h-16 flex items-center gap-3 px-5 border-b shrink-0"
//           style={{ borderColor: 'rgba(255,255,255,0.05)' }}
//         >
//           <div
//             className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
//             style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
//           >
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <div className="min-w-0">
//             <p className="text-sm font-semibold text-white tracking-tight">ficerquiz</p>
//             <p className="text-[10px] text-white/20">admin panel</p>
//           </div>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
//           {navigation.map((item) => {
//             const active = pathname === item.href;
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsSidebarOpen(false)}
//                 className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all group ${
//                   active
//                     ? 'text-white'
//                     : 'text-white/35 hover:text-white/70'
//                 }`}
//                 style={active ? {
//                   background: 'rgba(99,102,241,0.15)',
//                   border: '1px solid rgba(99,102,241,0.2)'
//                 } : {
//                   border: '1px solid transparent'
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-indigo-400' : 'text-white/30 group-hover:text-white/60'}`} />
//                   <span className="font-medium">{item.name}</span>
//                 </div>
//                 {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-3 border-t space-y-0.5 shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
//           <Link
//             href="/admin/settings"
//             onClick={() => setIsSidebarOpen(false)}
//             className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all group ${
//               pathname === '/admin/settings' ? 'text-white' : 'text-white/35 hover:text-white/70'
//             }`}
//             style={pathname === '/admin/settings' ? {
//               background: 'rgba(99,102,241,0.15)',
//               border: '1px solid rgba(99,102,241,0.2)'
//             } : { border: '1px solid transparent' }}
//           >
//             <div className="flex items-center gap-3">
//               <Settings className="w-4 h-4 shrink-0 text-white/30 group-hover:text-white/60" />
//               <span className="font-medium">Settings</span>
//             </div>
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white/35 hover:text-red-400 transition-all group"
//             style={{ border: '1px solid transparent' }}
//           >
//             <LogOut className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Logout</span>
//           </button>

//           {/* User card */}
//           <div
//             className="mt-3 px-3.5 py-3 rounded-xl border"
//             style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
//           >
//             <div className="flex items-center gap-2.5">
//               <div
//                 className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold text-white shrink-0"
//                 style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//               >
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs font-medium text-white truncate">{user?.name || 'Admin'}</p>
//                 <p className="text-[10px] text-white/20 truncate">{user?.email || 'admin@example.com'}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* ─── MAIN CONTENT ─── */}
//       <div className="lg:pl-64">
//         {/* Header */}
//         <header
//           className="sticky top-0 z-30 h-14 flex items-center justify-between px-5 border-b backdrop-blur-xl"
//           style={{
//             background: 'rgba(5,5,8,0.85)',
//             borderColor: 'rgba(255,255,255,0.05)'
//           }}
//         >
//           {/* Left */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.04] transition-all border border-white/[0.06]"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//             {/* Breadcrumb */}
//             <div className="hidden lg:flex items-center gap-2 text-xs">
//               <span className="text-white/20">admin</span>
//               <ChevronRight className="w-3 h-3 text-white/15" />
//               <span className="text-white/50 capitalize font-medium">{breadcrumb}</span>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="flex items-center gap-2">
//             <button
//               className="relative p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.04] border border-white/[0.06] transition-all"
//             >
//               <Bell className="w-4 h-4" />
//               <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
//             </button>

//             <div
//               className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border"
//               style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
//             >
//               <div
//                 className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white shrink-0"
//                 style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//               >
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <span className="hidden sm:block text-xs text-white/40 font-medium">
//                 {user?.name || 'Admin'}
//               </span>
//             </div>
//           </div>
//         </header>

//         {/* Page */}
//         <main className="p-5 sm:p-6 lg:p-7">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }







// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   LayoutDashboard, 
//   Users, 
//   BookOpen, 
//   BarChart3, 
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   Sparkles,
//   ChevronRight,
//   Bell
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(storedUser);
//     if (userData.role !== 'admin') {
//       router.push('/dashboard');
//       return;
//     }

//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//     { name: 'Users', href: '/admin/admin-users', icon: Users },
//     { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//     { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
//   ];

//   const handleLogout = () => {
//     const toastId = showToast.loading('Logging out...');
    
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-10 h-10 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-4 h-4 text-indigo-400/60 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       
//       {/* Mobile sidebar backdrop */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 z-50 h-full w-72 bg-[#09090B] border-r border-white/[0.05]
//         transform transition-all duration-300 ease-in-out
//         lg:translate-x-0
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Logo */}
//         <div className="h-20 flex items-center gap-3 px-6 border-b border-white/[0.05]">
//           <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <div>
//             <span className="text-sm font-light text-white">admin panel</span>
//             <p className="text-[10px] text-white/20">manage your platform</p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-1">
//           {navigation.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;
            
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsSidebarOpen(false)}
//                 className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
//                   isActive
//                     ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                     : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'}`} />
//                   <span>{item.name}</span>
//                 </div>
//                 {isActive && <ChevronRight className="w-3 h-3" />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer with Settings and Logout */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.05] space-y-1">
//           {/* Settings Button */}
//           <Link
//             href="/admin/settings"
//             onClick={() => setIsSidebarOpen(false)}
//             className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
//               pathname === '/admin/settings'
//                 ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                 : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <Settings className={`w-4 h-4 ${
//                 pathname === '/admin/settings' ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'
//               }`} />
//               <span>settings</span>
//             </div>
//             {pathname === '/admin/settings' && <ChevronRight className="w-3 h-3" />}
//           </Link>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 w-full transition-all group"
//           >
//             <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
//             <span>logout</span>
//           </button>

//           {/* User Info */}
//           <div className="mt-4 px-4 py-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
//             <p className="text-xs text-white/40 mb-1">signed in as</p>
//             <p className="text-sm text-white">{user?.name || 'Admin'}</p>
//             <p className="text-[10px] text-white/20 mt-1">{user?.email || 'admin@example.com'}</p>
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="lg:pl-72">
//         {/* Header */}
//         <header className="sticky top-0 z-30 h-16 bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.05]">
//           <div className="flex items-center justify-between h-full px-6">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="p-2 hover:bg-white/[0.02] rounded-lg transition-colors lg:hidden border border-white/[0.05]"
//               >
//                 <Menu className="w-5 h-5 text-white/40" />
//               </button>
              
//               {/* Breadcrumb */}
//               <div className="hidden lg:flex items-center gap-2 text-sm">
//                 <span className="text-white/20">admin</span>
//                 <ChevronRight className="w-3 h-3 text-white/20" />
//                 <span className="text-white/60 capitalize">
//                   {pathname.split('/').pop() || 'dashboard'}
//                 </span>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               {/* Notification Bell */}
//               <button className="p-2 hover:bg-white/[0.02] rounded-lg transition-colors border border-white/[0.05] relative">
//                 <Bell className="w-4 h-4 text-white/40" />
//                 <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
//               </button>

//               {/* User Menu */}
//               <div className="flex items-center gap-3 px-3 py-1.5 bg-white/[0.02] rounded-xl border border-white/[0.05]">
//                 <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
//                   <span className="text-xs font-medium text-white">
//                     {user?.name?.charAt(0) || 'A'}
//                   </span>
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-xs text-white/60">admin</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }






// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   LayoutDashboard, 
//   Users, 
//   BookOpen, 
//   BarChart3, 
//   LogOut,
//   Settings,
//   Menu,
//   X
// } from 'lucide-react';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !user) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(user);
//     if (userData.role !== 'admin') {
//       router.push('/dashboard');
//       return;
//     }

//     setIsAdmin(true);
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//     { name: 'Users', href: '/admin/admin-users', icon: Users },
//     { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//     { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
//   ];

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0B0B0F]">
//       {/* Mobile sidebar backdrop */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 z-50 h-full w-64 bg-[#111117] border-r border-white/10
//         transform transition-transform duration-300 ease-in-out
//         lg:translate-x-0
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Logo */}
//         <div className="h-16 flex items-center gap-2 px-6 border-b border-white/10">
//           <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
//             <span className="text-xs font-bold text-[#0B0B0F]">A</span>
//           </div>
//           <span className="text-sm font-medium text-white">Admin Panel</span>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors mb-1"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <item.icon className="w-4 h-4" />
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
//           <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors w-full">
//             <Settings className="w-4 h-4" />
//             Settings
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         {/* Header */}
//         <header className="sticky top-0 z-30 h-16 bg-[#111117]/80 backdrop-blur-xl border-b border-white/10">
//           <div className="flex items-center justify-between h-full px-6">
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="p-2 hover:bg-white/5 rounded-lg transition-colors lg:hidden"
//             >
//               <Menu className="w-5 h-5 text-white/60" />
//             </button>
            
//             <div className="flex items-center gap-4 ml-auto">
//               <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
//                 <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
//                   <span className="text-xs font-medium text-white/60">A</span>
//                 </div>
//                 <span className="text-sm text-white/60">Admin</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }






// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   LayoutDashboard, 
//   Users, 
//   BookOpen, 
//   BarChart3, 
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   Sparkles,
//   ChevronRight,
//   Bell
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(storedUser);
//     if (userData.role !== 'admin') {
//       router.push('/dashboard');
//       return;
//     }

//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//     { name: 'Users', href: '/admin/admin-users', icon: Users },
//     { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//     { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
//   ];

//   const handleLogout = () => {
//     const toastId = showToast.loading('Logging out...');
    
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-10 h-10 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-4 h-4 text-indigo-400/60 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       
//       {/* Mobile sidebar backdrop */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 z-50 h-full w-72 bg-[#09090B] border-r border-white/[0.05]
//         transform transition-all duration-300 ease-in-out
//         lg:translate-x-0
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Logo */}
//         <div className="h-20 flex items-center gap-3 px-6 border-b border-white/[0.05]">
//           <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <div>
//             <span className="text-sm font-light text-white">admin panel</span>
//             <p className="text-[10px] text-white/20">manage your platform</p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-1">
//           {navigation.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;
            
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsSidebarOpen(false)}
//                 className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
//                   isActive
//                     ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                     : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'}`} />
//                   <span>{item.name}</span>
//                 </div>
//                 {isActive && <ChevronRight className="w-3 h-3" />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer with Settings and Logout */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.05] space-y-1">
//           {/* Settings Button - FIXED */}
//           <Link
//             href="/admin/settings"
//             onClick={() => setIsSidebarOpen(false)}
//             className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
//               pathname === '/admin/settings'
//                 ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                 : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <Settings className={`w-4 h-4 ${
//                 pathname === '/admin/settings' ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'
//               }`} />
//               <span>settings</span>
//             </div>
//             {pathname === '/admin/settings' && <ChevronRight className="w-3 h-3" />}
//           </Link>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 w-full transition-all group"
//           >
//             <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
//             <span>logout</span>
//           </button>

//           {/* User Info */}
//           <div className="mt-4 px-4 py-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
//             <p className="text-xs text-white/40 mb-1">signed in as</p>
//             <p className="text-sm text-white">{user?.name || 'Admin'}</p>
//             <p className="text-[10px] text-white/20 mt-1">{user?.email || 'admin@example.com'}</p>
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="lg:pl-72">
//         {/* Header */}
//         <header className="sticky top-0 z-30 h-16 bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.05]">
//           <div className="flex items-center justify-between h-full px-6">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="p-2 hover:bg-white/[0.02] rounded-lg transition-colors lg:hidden border border-white/[0.05]"
//               >
//                 <Menu className="w-5 h-5 text-white/40" />
//               </button>
              
//               {/* Breadcrumb */}
//               <div className="hidden lg:flex items-center gap-2 text-sm">
//                 <span className="text-white/20">admin</span>
//                 <ChevronRight className="w-3 h-3 text-white/20" />
//                 <span className="text-white/60 capitalize">
//                   {pathname.split('/').pop() || 'dashboard'}
//                 </span>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               {/* Notification Bell */}
//               <button className="p-2 hover:bg-white/[0.02] rounded-lg transition-colors border border-white/[0.05] relative">
//                 <Bell className="w-4 h-4 text-white/40" />
//                 <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
//               </button>

//               {/* User Menu */}
//               <div className="flex items-center gap-3 px-3 py-1.5 bg-white/[0.02] rounded-xl border border-white/[0.05]">
//                 <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
//                   <span className="text-xs font-medium text-white">
//                     {user?.name?.charAt(0) || 'A'}
//                   </span>
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-xs text-white/60">admin</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard,
//   Users,
//   BookOpen,
//   BarChart3,
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   Sparkles,
//   ChevronRight,
//   Bell
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// const navigation = [
//   { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//   { name: 'Users', href: '/admin/admin-users', icon: Users },
//   { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//   { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const userData = JSON.parse(storedUser);
//     if (userData.role !== 'admin') { router.push('/dashboard'); return; }
//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   const handleLogout = () => {
//     showToast.loading('Logging out...');
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   const currentPage = pathname.split('/').filter(Boolean).pop() || 'dashboard';
//   const breadcrumb = currentPage.replace(/-/g, ' ');

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: '#050508' }}>
//         <div className="relative">
//           <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-4 h-4 text-indigo-400/50" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen" style={{ background: '#050508', fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
// 
//       {/* Mobile backdrop */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* ─── SIDEBAR ─── */}
//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
//         style={{
//           background: '#080810',
//           borderColor: 'rgba(255,255,255,0.05)'
//         }}
//       >
//         {/* Logo */}
//         <div
//           className="h-16 flex items-center gap-3 px-5 border-b shrink-0"
//           style={{ borderColor: 'rgba(255,255,255,0.05)' }}
//         >
//           <div
//             className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
//             style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
//           >
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <div className="min-w-0">
//             <p className="text-sm font-semibold text-white tracking-tight">ficerquiz</p>
//             <p className="text-[10px] text-white/20">admin panel</p>
//           </div>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
//           {navigation.map((item) => {
//             const active = pathname === item.href;
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsSidebarOpen(false)}
//                 className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all group ${
//                   active
//                     ? 'text-white'
//                     : 'text-white/35 hover:text-white/70'
//                 }`}
//                 style={active ? {
//                   background: 'rgba(99,102,241,0.15)',
//                   border: '1px solid rgba(99,102,241,0.2)'
//                 } : {
//                   border: '1px solid transparent'
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-indigo-400' : 'text-white/30 group-hover:text-white/60'}`} />
//                   <span className="font-medium">{item.name}</span>
//                 </div>
//                 {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-3 border-t space-y-0.5 shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
//           <Link
//             href="/admin/settings"
//             onClick={() => setIsSidebarOpen(false)}
//             className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all group ${
//               pathname === '/admin/settings' ? 'text-white' : 'text-white/35 hover:text-white/70'
//             }`}
//             style={pathname === '/admin/settings' ? {
//               background: 'rgba(99,102,241,0.15)',
//               border: '1px solid rgba(99,102,241,0.2)'
//             } : { border: '1px solid transparent' }}
//           >
//             <div className="flex items-center gap-3">
//               <Settings className="w-4 h-4 shrink-0 text-white/30 group-hover:text-white/60" />
//               <span className="font-medium">Settings</span>
//             </div>
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white/35 hover:text-red-400 transition-all group"
//             style={{ border: '1px solid transparent' }}
//           >
//             <LogOut className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
//             <span className="font-medium">Logout</span>
//           </button>

//           {/* User card */}
//           <div
//             className="mt-3 px-3.5 py-3 rounded-xl border"
//             style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
//           >
//             <div className="flex items-center gap-2.5">
//               <div
//                 className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold text-white shrink-0"
//                 style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//               >
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs font-medium text-white truncate">{user?.name || 'Admin'}</p>
//                 <p className="text-[10px] text-white/20 truncate">{user?.email || 'admin@example.com'}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* ─── MAIN CONTENT ─── */}
//       <div className="lg:pl-64">
//         {/* Header */}
//         <header
//           className="sticky top-0 z-30 h-14 flex items-center justify-between px-5 border-b backdrop-blur-xl"
//           style={{
//             background: 'rgba(5,5,8,0.85)',
//             borderColor: 'rgba(255,255,255,0.05)'
//           }}
//         >
//           {/* Left */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.04] transition-all border border-white/[0.06]"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//             {/* Breadcrumb */}
//             <div className="hidden lg:flex items-center gap-2 text-xs">
//               <span className="text-white/20">admin</span>
//               <ChevronRight className="w-3 h-3 text-white/15" />
//               <span className="text-white/50 capitalize font-medium">{breadcrumb}</span>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="flex items-center gap-2">
//             <button
//               className="relative p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.04] border border-white/[0.06] transition-all"
//             >
//               <Bell className="w-4 h-4" />
//               <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
//             </button>

//             <div
//               className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border"
//               style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
//             >
//               <div
//                 className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white shrink-0"
//                 style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//               >
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <span className="hidden sm:block text-xs text-white/40 font-medium">
//                 {user?.name || 'Admin'}
//               </span>
//             </div>
//           </div>
//         </header>

//         {/* Page */}
//         <main className="p-5 sm:p-6 lg:p-7">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }







// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   LayoutDashboard, 
//   Users, 
//   BookOpen, 
//   BarChart3, 
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   Sparkles,
//   ChevronRight,
//   Bell
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

//     const userData = JSON.parse(storedUser);
//     if (userData.role?.toLowerCase().trim() !== 'admin') {
//       router.push('/dashboard');
//       return;
//     }

//     setUser(userData);
//     setIsAdmin(true);
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//     { name: 'Users', href: '/admin/admin-users', icon: Users },
//     { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//     { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
//   ];

//   const handleLogout = () => {
//     const toastId = showToast.loading('Logging out...');
    
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
//         <div className="relative">
//           <div className="w-10 h-10 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Sparkles className="w-4 h-4 text-indigo-400/60 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       
//       {/* Mobile sidebar backdrop */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`
//         fixed top-0 left-0 z-50 h-full w-72 bg-[#09090B] border-r border-white/[0.05]
//         transform transition-all duration-300 ease-in-out
//         lg:translate-x-0
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Logo */}
//         <div className="h-20 flex items-center gap-3 px-6 border-b border-white/[0.05]">
//           <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <div>
//             <span className="text-sm font-light text-white">admin panel</span>
//             <p className="text-[10px] text-white/20">manage your platform</p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-1">
//           {navigation.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;
            
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsSidebarOpen(false)}
//                 className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
//                   isActive
//                     ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                     : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'}`} />
//                   <span>{item.name}</span>
//                 </div>
//                 {isActive && <ChevronRight className="w-3 h-3" />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer with Settings and Logout */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.05] space-y-1">
//           {/* Settings Button */}
//           <Link
//             href="/admin/settings"
//             onClick={() => setIsSidebarOpen(false)}
//             className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group ${
//               pathname === '/admin/settings'
//                 ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
//                 : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <Settings className={`w-4 h-4 ${
//                 pathname === '/admin/settings' ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'
//               }`} />
//               <span>settings</span>
//             </div>
//             {pathname === '/admin/settings' && <ChevronRight className="w-3 h-3" />}
//           </Link>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 w-full transition-all group"
//           >
//             <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
//             <span>logout</span>
//           </button>

//           {/* User Info */}
//           <div className="mt-4 px-4 py-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
//             <p className="text-xs text-white/40 mb-1">signed in as</p>
//             <p className="text-sm text-white">{user?.name || 'Admin'}</p>
//             <p className="text-[10px] text-white/20 mt-1">{user?.email || 'admin@example.com'}</p>
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="lg:pl-72">
//         {/* Header */}
//         <header className="sticky top-0 z-30 h-16 bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.05]">
//           <div className="flex items-center justify-between h-full px-6">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="p-2 hover:bg-white/[0.02] rounded-lg transition-colors lg:hidden border border-white/[0.05]"
//               >
//                 <Menu className="w-5 h-5 text-white/40" />
//               </button>
              
//               {/* Breadcrumb */}
//               <div className="hidden lg:flex items-center gap-2 text-sm">
//                 <span className="text-white/20">admin</span>
//                 <ChevronRight className="w-3 h-3 text-white/20" />
//                 <span className="text-white/60 capitalize">
//                   {pathname.split('/').pop() || 'dashboard'}
//                 </span>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               {/* Notification Bell */}
//               <button className="p-2 hover:bg-white/[0.02] rounded-lg transition-colors border border-white/[0.05] relative">
//                 <Bell className="w-4 h-4 text-white/40" />
//                 <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
//               </button>

//               {/* User Menu */}
//               <div className="flex items-center gap-3 px-3 py-1.5 bg-white/[0.02] rounded-xl border border-white/[0.05]">
//                 <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
//                   <span className="text-xs font-medium text-white">
//                     {user?.name?.charAt(0) || 'A'}
//                   </span>
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-xs text-white/60">admin</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }








// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard,
//   Users,
//   BookOpen,
//   BarChart3,
//   LogOut,
//   Settings,
//   Menu,
//   ChevronRight,
//   Bell,
//   Shield
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// const NAV = [
//   { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//   { name: 'Users', href: '/admin/admin-users', icon: Users },
//   { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
//   { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
//   { name: 'Settings', href: '/admin/settings', icon: Settings },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const stored = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !stored) { router.push('/login'); return; }
//     const u = JSON.parse(stored);
//     if (u.role?.toLowerCase().trim() !== 'admin') { router.push('/dashboard'); return; }
//     setUser(u);
//     setIsAdmin(true);
//   }, [router]);

//   const handleLogout = () => {
//     showToast.loading('Logging out...');
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       showToast.success('Logged out');
//       router.push('/login');
//     }, 700);
//   };

//   const breadcrumb = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'dashboard';

//   if (!isAdmin) return (
//     <div className="min-h-screen flex items-center justify-center" style={{ background: '#060608' }}>
//       <div className="flex flex-col items-center gap-4">
//         <div className="relative w-10 h-10">
//           <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
//         </div>
//         <p className="text-xs text-white/20 tracking-widest uppercase">Authenticating</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen" style={{ background: '#060608', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
//       <Toaster position="top-right" toastOptions={{
//         style: { background: '#0f1512', border: '1px solid rgba(52,211,153,0.15)', color: '#fff' }
//       }} />

//       {/* Mobile overlay */}
//       {open && (
//         <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
//       )}

//       {/* ── SIDEBAR ── */}
//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-60 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
//         style={{ background: '#08090d', borderRight: '1px solid rgba(52,211,153,0.07)' }}
//       >
//         {/* Logo */}
//         <div className="h-14 flex items-center gap-3 px-5" style={{ borderBottom: '1px solid rgba(52,211,153,0.07)' }}>
//           <div className="w-7 h-7 rounded-lg flex items-center justify-center"
//             style={{ background: 'linear-gradient(135deg, #059669, #34d399)', boxShadow: '0 0 16px rgba(52,211,153,0.25)' }}>
//             <Shield className="w-3.5 h-3.5 text-white" />
//           </div>
//           <div>
//             <p className="text-[13px] font-semibold text-white tracking-tight leading-none">Admin</p>
//             <p className="text-[10px] text-emerald-500/50 mt-0.5 leading-none">Control Panel</p>
//           </div>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
//           {NAV.map((item) => {
//             const active = item.href === '/admin'
//               ? pathname === '/admin'
//               : pathname.startsWith(item.href);
//             return (
//               <Link key={item.name} href={item.href} onClick={() => setOpen(false)}
//                 className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${active ? 'text-emerald-300' : 'text-white/35 hover:text-white/70'}`}
//                 style={active ? {
//                   background: 'rgba(52,211,153,0.08)',
//                   border: '1px solid rgba(52,211,153,0.15)',
//                 } : { border: '1px solid transparent' }}
//               >
//                 <item.icon className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-emerald-400' : 'text-white/25 group-hover:text-white/50'}`} />
//                 <span>{item.name}</span>
//                 {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-3 shrink-0" style={{ borderTop: '1px solid rgba(52,211,153,0.07)' }}>
//           <button onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/30 hover:text-red-400 transition-all group"
//             style={{ border: '1px solid transparent' }}>
//             <LogOut className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
//             <span>Logout</span>
//           </button>

//           {/* User */}
//           <div className="mt-2 px-3.5 py-3 rounded-xl" style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.08)' }}>
//             <div className="flex items-center gap-2.5">
//               <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0"
//                 style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}>
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs font-medium text-white/80 truncate">{user?.name || 'Admin'}</p>
//                 <p className="text-[10px] text-white/25 truncate">{user?.email || 'admin@example.com'}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* ── MAIN ── */}
//       <div className="lg:pl-60">
//         {/* Header */}
//         <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-5"
//           style={{ background: 'rgba(6,6,8,0.9)', borderBottom: '1px solid rgba(52,211,153,0.06)', backdropFilter: 'blur(12px)' }}>
//           <div className="flex items-center gap-3">
//             <button onClick={() => setOpen(true)}
//               className="lg:hidden p-1.5 rounded-lg text-white/30 hover:text-white border transition-all"
//               style={{ borderColor: 'rgba(52,211,153,0.1)', background: 'rgba(52,211,153,0.04)' }}>
//               <Menu className="w-4 h-4" />
//             </button>
//             <div className="hidden lg:flex items-center gap-1.5 text-xs">
//               <span className="text-white/20">admin</span>
//               <ChevronRight className="w-3 h-3 text-white/15" />
//               <span className="text-white/50 capitalize font-medium">{breadcrumb}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button className="relative p-2 rounded-lg text-white/25 hover:text-emerald-400 border transition-all"
//               style={{ borderColor: 'rgba(52,211,153,0.08)', background: 'rgba(52,211,153,0.03)' }}>
//               <Bell className="w-4 h-4" />
//               <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
//             </button>
//             <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
//               style={{ background: 'rgba(52,211,153,0.04)', borderColor: 'rgba(52,211,153,0.1)' }}>
//               <div className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
//                 style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}>
//                 {user?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </div>
//               <span className="hidden sm:block text-xs text-white/40 font-medium">{user?.name || 'Admin'}</span>
//             </div>
//           </div>
//         </header>

//         <main className="p-5 lg:p-7">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, BookOpen, BarChart3,
  LogOut, Settings, Menu, X, Sparkles, ChevronRight, Bell,
} from 'lucide-react';
import { showToast } from '@/lib/toast';

const T = {
  bg: '#080810',
  sidebar: '#0a0a14',
  accent: '#34d399',
  accentHover: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  border: 'rgba(255,255,255,0.07)',
  muted: 'rgba(255,255,255,0.38)',
};

const NAV = [
  { name: 'Dashboard', href: '/admin',              icon: LayoutDashboard },
  { name: 'Users',     href: '/admin/admin-users',   icon: Users           },
  { name: 'Quizzes',   href: '/admin/admin-quizzes', icon: BookOpen        },
  { name: 'Reports',   href: '/admin/reports',       icon: BarChart3       },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [open,    setOpen]    = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user,    setUser]    = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token      = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const userData = JSON.parse(storedUser);
    if (userData.role?.toLowerCase().trim() !== 'admin') { router.push('/dashboard'); return; }
    setUser(userData);
    setIsAdmin(true);
  }, [router]);

  const handleLogout = () => {
    const toastId = showToast.loading('Logging out...');
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      import('react-hot-toast').then(({ default: toast }) => toast.dismiss(toastId));
      showToast.success('Logged out');
      router.push('/login');
    }, 600);
  };

  const crumb = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'dashboard';

  if (!isAdmin) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: `${T.accent}25`, borderTopColor: T.accent }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-4 h-4 animate-pulse" style={{ color: `${T.accent}70` }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');`}</style>

      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setOpen(false)} />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: T.sidebar, borderRight: `1px solid ${T.border}` }}
      >
        {/* Logo row */}
        <div className="h-14 flex items-center justify-between px-4 shrink-0"
          style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="text-white/80 font-bold text-sm">F</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ficer</p>
              <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>admin panel</p>
            </div>
          </div>
          <button className="lg:hidden p-1.5 rounded-lg" style={{ color: T.muted }}
            onClick={() => setOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={active
                  ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
                  : { border: '1px solid transparent', color: T.muted }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.muted; }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </div>
                {active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: T.accentHover }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-0.5 shrink-0" style={{ borderTop: `1px solid ${T.border}` }}>
          {/* Settings */}
          <Link href="/admin/settings" onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={pathname === '/admin/settings'
              ? { background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentHover }
              : { border: '1px solid transparent', color: T.muted }}
            onMouseEnter={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
            onMouseLeave={e => { if (pathname !== '/admin/settings') e.currentTarget.style.color = T.muted; }}
          >
            <Settings className="w-4 h-4 shrink-0" />
            Settings
          </Link>
          {/* Logout */}
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{ border: '1px solid transparent', color: T.muted }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
          {/* User card */}
          <div className="mt-2 px-3 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
                <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.2)' }}>{user?.email || ''}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-5 backdrop-blur-xl"
          style={{ background: `${T.bg}dd`, borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-xl transition-all"
              style={{ color: T.muted, border: `1px solid ${T.border}` }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}>
              <Menu className="w-4 h-4" />
            </button>
            {/* Page name on mobile */}
            <span className="lg:hidden text-xs font-semibold capitalize text-white/60">{crumb}</span>
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>admin</span>
              <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.12)' }} />
              <span className="font-semibold capitalize" style={{ color: 'rgba(255,255,255,0.55)' }}>{crumb}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl transition-all"
              style={{ color: T.muted, border: `1px solid ${T.border}` }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
            </button>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}` }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <span className="hidden sm:block text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {user?.name || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        <main className="p-3 sm:p-5 lg:p-6 pb-20 lg:pb-6 overflow-x-hidden">{children}</main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center h-14 border-t"
        style={{ background: `${T.sidebar}f2`, borderColor: T.border, backdropFilter: 'blur(20px)' }}>
        {[...NAV, { name: 'Settings', href: '/admin/settings', icon: Settings }].map(item => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1"
              style={{ color: active ? T.accentHover : T.muted }}>
              <div className="w-7 h-7 flex items-center justify-center rounded-xl"
                style={{ background: active ? T.accentBg : 'transparent' }}>
                <item.icon style={{ width: 16, height: 16 }} />
              </div>
              <span style={{ fontSize: 9, fontWeight: 500 }}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}