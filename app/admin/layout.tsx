


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








'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, BookOpen, BarChart3,
  LogOut, Settings, Menu, X, Sparkles, ChevronRight, Bell,
} from 'lucide-react';
import { showToast } from '@/lib/toast';
import { Toaster } from 'react-hot-toast';

const T = {
  bg: '#060809',
  sidebar: '#070a0c',
  accent: '#10b981',
  accentHover: '#34d399',
  accentBg: 'rgba(16,185,129,0.1)',
  accentBorder: 'rgba(16,185,129,0.2)',
  border: 'rgba(255,255,255,0.055)',
  muted: 'rgba(255,255,255,0.35)',
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

  // Close sidebar on route change (mobile)
  useEffect(() => { setOpen(false); }, [pathname]);

  const handleLogout = () => {
    showToast.loading('Logging out...');
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      showToast.success('Logged out successfully');
      router.push('/login');
    }, 800);
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
    <div className="min-h-screen" style={{ background: T.bg, fontFamily: "'DM Sans','Inter',sans-serif" }}>
      <Toaster position="top-right" />

      {/* ─── Mobile backdrop ─── */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* ─── Sidebar (desktop always visible, mobile slide-in) ─── */}
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
              style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})`, boxShadow: `0 0 14px rgba(16,185,129,0.3)` }}>
              <Sparkles style={{ width: 14, height: 14, color: '#fff' }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">QuizPortal</p>
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
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href}
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
          <Link href="/admin/settings"
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
                style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
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

      {/* ─── Main area ─── */}
      {/* lg: push right by sidebar width. On mobile: no push, content takes full width */}
      <div className="lg:pl-64 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-5 backdrop-blur-xl"
          style={{ background: `${T.bg}dd`, borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-xl transition-all"
              style={{ color: T.muted, border: `1px solid ${T.border}` }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}>
              <Menu className="w-4 h-4" />
            </button>
            {/* Brand — mobile only */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: `linear-gradient(135deg,${T.accent},${T.accentHover})` }}>
                <Sparkles style={{ width: 10, height: 10, color: '#fff' }} />
              </div>
              <span className="text-xs font-semibold text-white capitalize">{crumb}</span>
            </div>
            {/* Breadcrumb — desktop only */}
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

        {/* Page content — extra bottom padding on mobile so bottom nav doesn't cover content */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 pb-24 lg:pb-6 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* ─── Mobile Bottom Navigation Bar ─── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 px-2"
        style={{
          background: `${T.sidebar}f0`,
          borderTop: `1px solid ${T.border}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all"
              style={{ color: active ? T.accentHover : T.muted }}
            >
              <div
                className="w-8 h-8 flex items-center justify-center rounded-xl transition-all"
                style={{ background: active ? T.accentBg : 'transparent' }}
              >
                <item.icon style={{ width: 18, height: 18 }} />
              </div>
              <span className="text-[10px] font-medium leading-none">{item.name}</span>
            </Link>
          );
        })}
        {/* Settings shortcut in bottom nav */}
        <Link
          href="/admin/settings"
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all"
          style={{ color: pathname === '/admin/settings' ? T.accentHover : T.muted }}
        >
          <div
            className="w-8 h-8 flex items-center justify-center rounded-xl transition-all"
            style={{ background: pathname === '/admin/settings' ? T.accentBg : 'transparent' }}
          >
            <Settings style={{ width: 18, height: 18 }} />
          </div>
          <span className="text-[10px] font-medium leading-none">Settings</span>
        </Link>
      </nav>
    </div>
  );
}