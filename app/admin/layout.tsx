// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { 
// //   LayoutDashboard, 
// //   Users, 
// //   BookOpen, 
// //   BarChart3, 
// //   LogOut,
// //   Settings,
// //   Menu,
// //   X
// // } from 'lucide-react';

// // export default function AdminLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const router = useRouter();
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isAdmin, setIsAdmin] = useState(false);

// //   useEffect(() => {
// //     const user = localStorage.getItem('user');
// //     const token = localStorage.getItem('token');

// //     if (!token || !user) {
// //       router.push('/login');
// //       return;
// //     }

// //     const userData = JSON.parse(user);
// //     if (userData.role !== 'admin') {
// //       router.push('/dashboard');
// //       return;
// //     }

// //     setIsAdmin(true);
// //   }, [router]);

// //   const navigation = [
// //     { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
// //     { name: 'Users', href: '/admin/admin-users', icon: Users },
// //     { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
// //     { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
// //   ];

// //   if (!isAdmin) {
// //     return (
// //       <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#0B0B0F]">
// //       {/* Mobile sidebar backdrop */}
// //       {isSidebarOpen && (
// //         <div 
// //           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
// //           onClick={() => setIsSidebarOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <aside className={`
// //         fixed top-0 left-0 z-50 h-full w-64 bg-[#111117] border-r border-white/10
// //         transform transition-transform duration-300 ease-in-out
// //         lg:translate-x-0
// //         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
// //       `}>
// //         {/* Logo */}
// //         <div className="h-16 flex items-center gap-2 px-6 border-b border-white/10">
// //           <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
// //             <span className="text-xs font-bold text-[#0B0B0F]">A</span>
// //           </div>
// //           <span className="text-sm font-medium text-white">Admin Panel</span>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="p-4">
// //           {navigation.map((item) => (
// //             <Link
// //               key={item.name}
// //               href={item.href}
// //               className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors mb-1"
// //               onClick={() => setIsSidebarOpen(false)}
// //             >
// //               <item.icon className="w-4 h-4" />
// //               {item.name}
// //             </Link>
// //           ))}
// //         </nav>

// //         {/* Footer */}
// //         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
// //           <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors w-full">
// //             <Settings className="w-4 h-4" />
// //             Settings
// //           </button>
// //         </div>
// //       </aside>

// //       {/* Main content */}
// //       <div className="lg:pl-64">
// //         {/* Header */}
// //         <header className="sticky top-0 z-30 h-16 bg-[#111117]/80 backdrop-blur-xl border-b border-white/10">
// //           <div className="flex items-center justify-between h-full px-6">
// //             <button
// //               onClick={() => setIsSidebarOpen(true)}
// //               className="p-2 hover:bg-white/5 rounded-lg transition-colors lg:hidden"
// //             >
// //               <Menu className="w-5 h-5 text-white/60" />
// //             </button>
            
// //             <div className="flex items-center gap-4 ml-auto">
// //               <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
// //                 <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
// //                   <span className="text-xs font-medium text-white/60">A</span>
// //                 </div>
// //                 <span className="text-sm text-white/60">Admin</span>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Page content */}
// //         <main className="p-6">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }






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
//       <Toaster position="top-right" />
      
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




'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  LogOut,
  Settings,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Bell
} from 'lucide-react';
import { showToast } from '@/lib/toast';
import { Toaster } from 'react-hot-toast';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/admin-users', icon: Users },
  { name: 'Quizzes', href: '/admin/admin-quizzes', icon: BookOpen },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const userData = JSON.parse(storedUser);
    if (userData.role !== 'admin') { router.push('/dashboard'); return; }
    setUser(userData);
    setIsAdmin(true);
  }, [router]);

  const handleLogout = () => {
    showToast.loading('Logging out...');
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      showToast.success('Logged out successfully');
      router.push('/login');
    }, 800);
  };

  const currentPage = pathname.split('/').filter(Boolean).pop() || 'dashboard';
  const breadcrumb = currentPage.replace(/-/g, ' ');

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050508' }}>
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-400/50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#050508', fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <Toaster position="top-right" />

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ─── SIDEBAR ─── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          background: '#080810',
          borderColor: 'rgba(255,255,255,0.05)'
        }}
      >
        {/* Logo */}
        <div
          className="h-16 flex items-center gap-3 px-5 border-b shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white tracking-tight">ficerquiz</p>
            <p className="text-[10px] text-white/20">admin panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all group ${
                  active
                    ? 'text-white'
                    : 'text-white/35 hover:text-white/70'
                }`}
                style={active ? {
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.2)'
                } : {
                  border: '1px solid transparent'
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-indigo-400' : 'text-white/30 group-hover:text-white/60'}`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t space-y-0.5 shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <Link
            href="/admin/settings"
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all group ${
              pathname === '/admin/settings' ? 'text-white' : 'text-white/35 hover:text-white/70'
            }`}
            style={pathname === '/admin/settings' ? {
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.2)'
            } : { border: '1px solid transparent' }}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 shrink-0 text-white/30 group-hover:text-white/60" />
              <span className="font-medium">Settings</span>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white/35 hover:text-red-400 transition-all group"
            style={{ border: '1px solid transparent' }}
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>

          {/* User card */}
          <div
            className="mt-3 px-3.5 py-3 rounded-xl border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">{user?.name || 'Admin'}</p>
                <p className="text-[10px] text-white/20 truncate">{user?.email || 'admin@example.com'}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="lg:pl-64">
        {/* Header */}
        <header
          className="sticky top-0 z-30 h-14 flex items-center justify-between px-5 border-b backdrop-blur-xl"
          style={{
            background: 'rgba(5,5,8,0.85)',
            borderColor: 'rgba(255,255,255,0.05)'
          }}
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.04] transition-all border border-white/[0.06]"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="text-white/20">admin</span>
              <ChevronRight className="w-3 h-3 text-white/15" />
              <span className="text-white/50 capitalize font-medium">{breadcrumb}</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              className="relative p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.04] border border-white/[0.06] transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
            </button>

            <div
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <span className="hidden sm:block text-xs text-white/40 font-medium">
                {user?.name || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="p-5 sm:p-6 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}