


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Toaster, toast as hotToast } from 'react-hot-toast';
// import {
//   User, Mail, Lock, Camera, Save, ArrowLeft, LogOut,
//   Calendar, Key, Edit2, Award, BookOpen, TrendingUp,
//   GraduationCap, Eye, EyeOff, CheckCircle, X
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatar?: string;
//   createdAt?: string;
// }

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPasswordSection, setShowPasswordSection] = useState(false);
//   const [showCurrentPw, setShowCurrentPw] = useState(false);
//   const [showNewPw, setShowNewPw] = useState(false);
//   const [showConfirmPw, setShowConfirmPw] = useState(false);

//   // Profile form
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [avatar, setAvatar] = useState('');
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState('');

//   // Password form
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // Stats (mock — same as original)
//   const [stats] = useState({ quizzesTaken: 12, averageScore: 78, achievements: 3 });

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (!token || !storedUser) { router.push('/login'); return; }
//     const userData = JSON.parse(storedUser);
//     fetchUserProfile(userData.id || userData._id);
//   }, [router]);

//   const fetchUserProfile = async (userId: string) => {
//     try {
//       const res = await fetch(`/api/profile?userId=${userId}`);
//       const data = await res.json();
//       if (data.success) {
//         setUser(data.data);
//         setName(data.data.name);
//         setEmail(data.data.email);
//         setAvatar(data.data.avatar || '');
//       }
//     } catch {
//       showToast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setAvatarFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setAvatarPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     if (!name.trim() || !email.trim()) { showToast.error('Name and email are required'); return; }
//     setSaving(true);
//     const toastId = showToast.loading('Updating profile...');
//     try {
//       let avatarUrl = avatar;
//       if (avatarFile) {
//         const formData = new FormData();
//         formData.append('avatar', avatarFile);
//         formData.append('userId', user?.id || '');
//         const uploadRes = await fetch('/api/profile/avatar', { method: 'POST', body: formData });
//         const uploadData = await uploadRes.json();
//         if (uploadData.success) avatarUrl = uploadData.url;
//       }
//       const res = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: user?.id, name, email, avatar: avatarUrl })
//       });
//       const data = await res.json();
//       if (data.success) {
//         const updatedUser = { ...user, name, email, avatar: avatarUrl };
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         setUser(updatedUser as UserData);
//         setAvatar(avatarUrl);
//         setAvatarPreview('');
//         setAvatarFile(null);
//         setIsEditing(false);
//         hotToast.dismiss(toastId);
//         showToast.success('Profile updated successfully');
//       } else {
//         hotToast.dismiss(toastId);
//         showToast.error(data.error || 'Update failed');
//       }
//     } catch {
//       hotToast.dismiss(toastId);
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword) { showToast.error('All fields are required'); return; }
//     if (newPassword !== confirmPassword) { showToast.error('Passwords do not match'); return; }
//     if (newPassword.length < 6) { showToast.error('Password must be at least 6 characters'); return; }
//     setSaving(true);
//     const toastId = showToast.loading('Changing password...');
//     try {
//       const res = await fetch('/api/change-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: user?.id, currentPassword, newPassword })
//       });
//       const data = await res.json();
//       if (data.success) {
//         hotToast.dismiss(toastId);
//         showToast.success('Password changed successfully');
//         setShowPasswordSection(false);
//         setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
//       } else {
//         hotToast.dismiss(toastId);
//         showToast.error(data.error || 'Failed to change password');
//       }
//     } catch {
//       hotToast.dismiss(toastId);
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = () => {
//     const toastId = showToast.loading('Logging out...');
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       hotToast.dismiss(toastId);
//       showToast.success('Logged out successfully');
//       router.push('/login');
//     }, 800);
//   };

//   const cancelEdit = () => {
//     setIsEditing(false);
//     setName(user?.name || '');
//     setEmail(user?.email || '');
//     setAvatarPreview('');
//     setAvatarFile(null);
//   };

//   // Role-based accent colors
//   const isTeacher = user?.role === 'teacher';
//   const accent = isTeacher ? 'emerald' : 'violet';
//   const accentClass = isTeacher
//     ? { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', focus: 'focus:border-emerald-500/50', btn: 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/25 text-emerald-400' }
//     : { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', focus: 'focus:border-violet-500/50', btn: 'bg-violet-500/15 hover:bg-violet-500/25 border-violet-500/25 text-violet-400' };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${isTeacher ? 'from-emerald-500 to-teal-600' : 'from-violet-500 to-indigo-600'} flex items-center justify-center`}>
//             <GraduationCap className="w-6 h-6 text-white animate-pulse" />
//           </div>
//           <div className="flex gap-1.5">
//             {[0,1,2].map(i => (
//               <div key={i} className={`w-1.5 h-1.5 rounded-full ${isTeacher ? 'bg-emerald-500/60' : 'bg-violet-500/60'} animate-bounce`}
//                 style={{ animationDelay: `${i * 0.15}s` }} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const inputClass = `w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] ${accentClass.focus} rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed`;

//   return (
//     <div className="min-h-screen bg-[#070709] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}>
//       <Toaster position="top-right" />

//       {/* Ambient bg */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className={`absolute top-0 left-1/4 w-[500px] h-[400px] ${isTeacher ? 'bg-emerald-600/5' : 'bg-violet-600/6'} rounded-full blur-[120px]`} />
//         <div className={`absolute bottom-0 right-1/4 w-[400px] h-[300px] ${isTeacher ? 'bg-teal-600/4' : 'bg-indigo-600/4'} rounded-full blur-[100px]`} />
//       </div>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
//         <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2.5">
//             <button
//               onClick={() => router.back()}
//               className="p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all"
//             >
//               <ArrowLeft className="w-4 h-4" />
//             </button>
//             <div className="flex items-center gap-2">
//               <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${isTeacher ? 'from-emerald-500 to-teal-600' : 'from-violet-500 to-indigo-600'} flex items-center justify-center`}>
//                 <GraduationCap className="w-3 h-3 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-white/80">My Profile</span>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-1.5 px-3 py-2 text-xs text-white/35 hover:text-red-400/80 hover:bg-red-500/8 border border-white/[0.06] hover:border-red-500/20 rounded-xl transition-all"
//           >
//             <LogOut className="w-3.5 h-3.5" />
//             <span className="hidden sm:inline">Sign Out</span>
//           </button>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-2xl mx-auto px-4 py-5 pb-10 space-y-4">

//         {/* ── Profile Card ── */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           {/* Avatar + name header */}
//           <div className="p-4 sm:p-5 border-b border-white/[0.05]">
//             <div className="flex items-start gap-4">
//               {/* Avatar */}
//               <div className="relative shrink-0">
//                 <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center overflow-hidden">
//                   {avatarPreview || avatar ? (
//                     <img src={avatarPreview || avatar} alt={name} className="w-full h-full object-cover" />
//                   ) : (
//                     <span className={`text-2xl font-bold ${accentClass.text}`}>
//                       {name?.charAt(0)?.toUpperCase() || 'U'}
//                     </span>
//                   )}
//                 </div>
//                 <label className={`absolute -bottom-1 -right-1 p-1.5 ${accentClass.bg} border ${accentClass.border} rounded-lg cursor-pointer hover:opacity-80 transition-opacity`}>
//                   <Camera className={`w-3 h-3 ${accentClass.text}`} />
//                   <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
//                 </label>
//               </div>

//               {/* Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="min-w-0">
//                     <h2 className="text-base sm:text-lg font-semibold text-white truncate">{name}</h2>
//                     <p className="text-xs sm:text-sm text-white/40 mt-0.5 truncate">{email}</p>
//                     <div className="flex flex-wrap items-center gap-2 mt-2">
//                       <span className={`text-[10px] px-2 py-0.5 ${accentClass.bg} ${accentClass.text} rounded-full border ${accentClass.border} capitalize font-medium`}>
//                         {user?.role}
//                       </span>
//                       {user?.createdAt && (
//                         <span className="text-[10px] text-white/25 flex items-center gap-1">
//                           <Calendar className="w-3 h-3" />
//                           Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => isEditing ? cancelEdit() : setIsEditing(true)}
//                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border ${
//                       isEditing
//                         ? 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white/70'
//                         : `${accentClass.bg} ${accentClass.border} ${accentClass.text} hover:opacity-80`
//                     }`}
//                   >
//                     {isEditing ? <X className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
//                     {isEditing ? 'Cancel' : 'Edit'}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Avatar change notice */}
//             {avatarPreview && (
//               <div className={`mt-3 flex items-center gap-2 px-3 py-2 ${accentClass.bg} border ${accentClass.border} rounded-xl`}>
//                 <CheckCircle className={`w-3.5 h-3.5 ${accentClass.text} shrink-0`} />
//                 <span className={`text-xs ${accentClass.text}`}>New photo ready — save to apply</span>
//               </div>
//             )}
//           </div>

//           {/* Stats row */}
//           <div className="grid grid-cols-3 divide-x divide-white/[0.05] border-b border-white/[0.05]">
//             {[
//               { label: 'Quizzes', value: stats.quizzesTaken, icon: BookOpen, color: accentClass.text },
//               { label: 'Avg Score', value: `${stats.averageScore}%`, icon: TrendingUp, color: 'text-emerald-400' },
//               { label: 'Badges', value: stats.achievements, icon: Award, color: 'text-amber-400' },
//             ].map(stat => (
//               <div key={stat.label} className="flex flex-col items-center py-4 px-2">
//                 <stat.icon className={`w-4 h-4 ${stat.color} opacity-70 mb-1.5`} />
//                 <p className="text-base sm:text-lg font-bold text-white">{stat.value}</p>
//                 <p className="text-[10px] text-white/30 mt-0.5">{stat.label}</p>
//               </div>
//             ))}
//           </div>

//           {/* Edit form */}
//           <div className="p-4 sm:p-5 space-y-3">
//             <div>
//               <label className="text-xs text-white/40 mb-1.5 block">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={e => setName(e.target.value)}
//                   disabled={!isEditing}
//                   placeholder="Your full name"
//                   className={`${inputClass} pl-9`}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-xs text-white/40 mb-1.5 block">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   disabled={!isEditing}
//                   placeholder="your@email.com"
//                   className={`${inputClass} pl-9`}
//                 />
//               </div>
//             </div>

//             {isEditing && (
//               <div className="flex items-center gap-2 pt-1">
//                 <button
//                   onClick={handleUpdateProfile}
//                   disabled={saving}
//                   className={`flex items-center gap-1.5 px-4 py-2.5 ${accentClass.btn} border rounded-xl text-sm font-semibold transition-all disabled:opacity-40`}
//                 >
//                   <Save className="w-3.5 h-3.5 shrink-0" />
//                   {saving ? 'Saving…' : 'Save Changes'}
//                 </button>
//                 <button
//                   onClick={cancelEdit}
//                   className="px-4 py-2.5 bg-white/[0.03] border border-white/[0.07] rounded-xl text-sm text-white/50 hover:text-white/70 transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}

//             {!isEditing && (
//               <p className="text-xs text-white/25">Click Edit to update your name, email, or profile photo.</p>
//             )}
//           </div>
//         </div>

//         {/* ── Password Card ── */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           <div className="p-4 sm:p-5">
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-2">
//                 <Key className="w-3.5 h-3.5 text-white/35" />
//                 <h3 className="text-sm font-semibold text-white">Password</h3>
//               </div>
//               <button
//                 onClick={() => {
//                   setShowPasswordSection(!showPasswordSection);
//                   setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
//                 }}
//                 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
//                   showPasswordSection
//                     ? 'bg-white/[0.04] border-white/[0.08] text-white/50'
//                     : `${accentClass.bg} ${accentClass.border} ${accentClass.text}`
//                 }`}
//               >
//                 {showPasswordSection ? <X className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
//                 {showPasswordSection ? 'Cancel' : 'Change'}
//               </button>
//             </div>

//             {!showPasswordSection && (
//               <p className="text-xs text-white/25 mt-2">Click Change to update your password.</p>
//             )}

//             {showPasswordSection && (
//               <div className="mt-4 space-y-3">
//                 {/* Current password */}
//                 <div>
//                   <label className="text-xs text-white/40 mb-1.5 block">Current Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                     <input
//                       type={showCurrentPw ? 'text' : 'password'}
//                       value={currentPassword}
//                       onChange={e => setCurrentPassword(e.target.value)}
//                       placeholder="Enter current password"
//                       className={`${inputClass} pl-9 pr-10`}
//                     />
//                     <button onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50">
//                       {showCurrentPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* New password */}
//                 <div>
//                   <label className="text-xs text-white/40 mb-1.5 block">New Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                     <input
//                       type={showNewPw ? 'text' : 'password'}
//                       value={newPassword}
//                       onChange={e => setNewPassword(e.target.value)}
//                       placeholder="Min. 6 characters"
//                       className={`${inputClass} pl-9 pr-10`}
//                     />
//                     <button onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50">
//                       {showNewPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
//                     </button>
//                   </div>
//                   {newPassword.length > 0 && newPassword.length < 6 && (
//                     <p className="text-xs text-red-400/70 mt-1">Too short — must be at least 6 characters</p>
//                   )}
//                 </div>

//                 {/* Confirm password */}
//                 <div>
//                   <label className="text-xs text-white/40 mb-1.5 block">Confirm New Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
//                     <input
//                       type={showConfirmPw ? 'text' : 'password'}
//                       value={confirmPassword}
//                       onChange={e => setConfirmPassword(e.target.value)}
//                       placeholder="Repeat new password"
//                       className={`${inputClass} pl-9 pr-10`}
//                     />
//                     <button onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50">
//                       {showConfirmPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
//                     </button>
//                   </div>
//                   {confirmPassword.length > 0 && newPassword !== confirmPassword && (
//                     <p className="text-xs text-red-400/70 mt-1">Passwords do not match</p>
//                   )}
//                   {confirmPassword.length > 0 && newPassword === confirmPassword && newPassword.length >= 6 && (
//                     <p className="text-xs text-emerald-400/70 mt-1 flex items-center gap-1">
//                       <CheckCircle className="w-3 h-3" /> Passwords match
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   onClick={handleChangePassword}
//                   disabled={saving}
//                   className={`flex items-center gap-1.5 px-4 py-2.5 ${accentClass.btn} border rounded-xl text-sm font-semibold transition-all disabled:opacity-40`}
//                 >
//                   <Key className="w-3.5 h-3.5 shrink-0" />
//                   {saving ? 'Updating…' : 'Update Password'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-xs text-white/20">
//           Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
//         </p>
//       </div>
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import {
  User, Mail, Lock, Camera, Save, ArrowLeft, LogOut,
  Calendar, Key, Edit2, Award, BookOpen, TrendingUp,
  GraduationCap, Eye, EyeOff, CheckCircle, X, Sparkles
} from 'lucide-react';
import { showToast } from '@/lib/toast';

// ✅ Design tokens matching dashboard
const T = {
  bg: '#070709',
  bgCard: '#0f0f12',
  accent: '#10b981',
  accentLight: '#34d399',
  accentDark: '#059669',
  accentGlow: 'rgba(16,185,129,0.16)',
  accentBorder: 'rgba(16,185,129,0.2)',
  accentBg: 'rgba(16,185,129,0.08)',
  border: 'rgba(255,255,255,0.06)',
  textMuted: 'rgba(255,255,255,0.4)',
  textDim: 'rgba(255,255,255,0.25)',
};

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // Profile form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Stats (mock)
  const [stats] = useState({ quizzesTaken: 12, averageScore: 78, achievements: 3 });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token || !storedUser) { router.push('/login'); return; }
    const userData = JSON.parse(storedUser);
    fetchUserProfile(userData.id || userData._id);
  }, [router]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const res = await fetch(`/api/profile?userId=${userId}`);
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        setName(data.data.name);
        setEmail(data.data.email);
        setAvatar(data.data.avatar || '');
      }
    } catch {
      showToast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim() || !email.trim()) { showToast.error('Name and email are required'); return; }
    setSaving(true);
    const toastId = showToast.loading('Updating profile...');
    try {
      let avatarUrl = avatar;
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        formData.append('userId', user?.id || '');
        const uploadRes = await fetch('/api/profile/avatar', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.success) avatarUrl = uploadData.url;
      }
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, name, email, avatar: avatarUrl })
      });
      const data = await res.json();
      if (data.success) {
        const updatedUser = { ...user, name, email, avatar: avatarUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser as UserData);
        setAvatar(avatarUrl);
        setAvatarPreview('');
        setAvatarFile(null);
        setIsEditing(false);
        hotToast.dismiss(toastId);
        showToast.success('Profile updated successfully');
      } else {
        hotToast.dismiss(toastId);
        showToast.error(data.error || 'Update failed');
      }
    } catch {
      hotToast.dismiss(toastId);
      showToast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) { showToast.error('All fields are required'); return; }
    if (newPassword !== confirmPassword) { showToast.error('Passwords do not match'); return; }
    if (newPassword.length < 6) { showToast.error('Password must be at least 6 characters'); return; }
    setSaving(true);
    const toastId = showToast.loading('Changing password...');
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, currentPassword, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        hotToast.dismiss(toastId);
        showToast.success('Password changed successfully');
        setShowPasswordSection(false);
        setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      } else {
        hotToast.dismiss(toastId);
        showToast.error(data.error || 'Failed to change password');
      }
    } catch {
      hotToast.dismiss(toastId);
      showToast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    const toastId = showToast.loading('Logging out...');
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      hotToast.dismiss(toastId);
      showToast.success('Logged out successfully');
      router.push('/login');
    }, 800);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setName(user?.name || '');
    setEmail(user?.email || '');
    setAvatarPreview('');
    setAvatarFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="flex gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const inputClass = `w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] focus:border-emerald-500/50 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed`;

  return (
    <div className="min-h-screen bg-[#070709] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <Toaster position="top-right" />

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-emerald-600/7 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-teal-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070709]/85 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 rounded-xl transition-all"
              style={{ color: T.textMuted }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-white/80">My Profile</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl transition-all border"
            style={{ color: T.textMuted, borderColor: T.border }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; e.currentTarget.style.background = 'rgba(239,68,68,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </motion.button>
        </div>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-5 pb-10 space-y-4">

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden border"
          style={{ background: T.bgCard, borderColor: T.border }}
        >
          {/* Avatar + name header */}
          <div className="p-4 sm:p-5 border-b" style={{ borderColor: T.border }}>
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl border flex items-center justify-center overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: T.border }}>
                  {avatarPreview || avatar ? (
                    <img src={avatarPreview || avatar} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold" style={{ color: T.accentLight }}>
                      {name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-lg cursor-pointer border"
                  style={{ background: T.accentBg, borderColor: T.accentBorder }}
                >
                  <Camera className="w-3 h-3" style={{ color: T.accentLight }} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={!isEditing} />
                </motion.label>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-white truncate">{name}</h2>
                    <p className="text-xs sm:text-sm mt-0.5 truncate" style={{ color: T.textMuted }}>{email}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full border capitalize font-medium"
                        style={{ background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight }}>
                        {user?.role}
                      </span>
                      {user?.createdAt && (
                        <span className="text-[10px] flex items-center gap-1" style={{ color: T.textDim }}>
                          <Calendar className="w-3 h-3" />
                          Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => isEditing ? cancelEdit() : setIsEditing(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border ${
                      isEditing
                        ? 'bg-white/[0.04] border-white/[0.08] text-white/50'
                        : 'border'
                    }`}
                    style={!isEditing ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight } : {}}
                  >
                    {isEditing ? <X className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Avatar change notice */}
            <AnimatePresence>
              {avatarPreview && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl border"
                  style={{ background: T.accentBg, borderColor: T.accentBorder }}
                >
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: T.accentLight }} />
                  <span className="text-xs" style={{ color: T.accentLight }}>New photo ready — save to apply</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 divide-x" style={{ borderColor: T.border }}>
            {[
              { label: 'Quizzes', value: stats.quizzesTaken, icon: BookOpen, color: T.accentLight },
              { label: 'Avg Score', value: `${stats.averageScore}%`, icon: TrendingUp, color: '#10b981' },
              { label: 'Badges', value: stats.achievements, icon: Award, color: '#f59e0b' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center py-4 px-2">
                <stat.icon className="w-4 h-4 opacity-70 mb-1.5" style={{ color: stat.color }} />
                <p className="text-base sm:text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] mt-0.5" style={{ color: T.textMuted }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Edit form */}
          <div className="p-4 sm:p-5 space-y-3">
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: T.textMuted }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textDim }} />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Your full name"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: T.textMuted }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textDim }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={!isEditing}
                  placeholder="your@email.com"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 pt-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdateProfile}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 border"
                    style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
                  >
                    <Save className="w-3.5 h-3.5 shrink-0" />
                    {saving ? 'Saving…' : 'Save Changes'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={cancelEdit}
                    className="px-4 py-2.5 rounded-xl text-sm transition-all border"
                    style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border, color: T.textMuted }}
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {!isEditing && (
              <p className="text-xs" style={{ color: T.textDim }}>Click Edit to update your name, email, or profile photo.</p>
            )}
          </div>
        </motion.div>

        {/* Password Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden border"
          style={{ background: T.bgCard, borderColor: T.border }}
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Key className="w-3.5 h-3.5" style={{ color: T.textMuted }} />
                <h3 className="text-sm font-semibold text-white">Password</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowPasswordSection(!showPasswordSection);
                  setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  showPasswordSection
                    ? 'bg-white/[0.04] border-white/[0.08] text-white/50'
                    : 'border'
                }`}
                style={!showPasswordSection ? { background: T.accentBg, borderColor: T.accentBorder, color: T.accentLight } : {}}
              >
                {showPasswordSection ? <X className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                {showPasswordSection ? 'Cancel' : 'Change'}
              </motion.button>
            </div>

            {!showPasswordSection && (
              <p className="text-xs mt-2" style={{ color: T.textDim }}>Click Change to update your password.</p>
            )}

            <AnimatePresence>
              {showPasswordSection && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3 overflow-hidden"
                >
                  {/* Current password */}
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: T.textMuted }}>Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textDim }} />
                      <input
                        type={showCurrentPw ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        className={`${inputClass} pl-9 pr-10`}
                      />
                      <button onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: T.textDim }}>
                        {showCurrentPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* New password */}
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: T.textMuted }}>New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textDim }} />
                      <input
                        type={showNewPw ? 'text' : 'password'}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className={`${inputClass} pl-9 pr-10`}
                      />
                      <button onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: T.textDim }}>
                        {showNewPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {newPassword.length > 0 && newPassword.length < 6 && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs mt-1"
                          style={{ color: '#ef4444' }}
                        >
                          Too short — must be at least 6 characters
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: T.textMuted }}>Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textDim }} />
                      <input
                        type={showConfirmPw ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className={`${inputClass} pl-9 pr-10`}
                      />
                      <button onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: T.textDim }}>
                        {showConfirmPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs mt-1"
                          style={{ color: '#ef4444' }}
                        >
                          Passwords do not match
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {confirmPassword.length > 0 && newPassword === confirmPassword && newPassword.length >= 6 && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs mt-1 flex items-center gap-1"
                          style={{ color: T.accentLight }}
                        >
                          <CheckCircle className="w-3 h-3" /> Passwords match
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 border"
                    style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
                  >
                    <Key className="w-3.5 h-3.5 shrink-0" />
                    {saving ? 'Updating…' : 'Update Password'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-xs"
          style={{ color: T.textDim }}
        >
          Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
        </motion.p>
      </div>
    </div>
  );
}
