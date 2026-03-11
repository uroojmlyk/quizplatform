


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { Toaster, toast as hotToast } from 'react-hot-toast';
// import { 
//   User, 
//   Mail, 
//   Lock, 
//   Camera, 
//   Save,
//   ArrowLeft,
//   LogOut,
//   Calendar,
//   Shield,
//   Key,
//   Edit2,
//   Award,
//   BookOpen,
//   TrendingUp,
//   Sparkles
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatar?: string;
//   createdAt?: string;
//   quizzesTaken?: number;
//   averageScore?: number;
//   achievements?: string[];
// }

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
  
//   // Form states
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [avatar, setAvatar] = useState<string>('');
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string>('');

//   // Mock data for stats
//   const [stats] = useState({
//     quizzesTaken: 12,
//     averageScore: 78,
//     achievements: 3
//   });

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

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
//     } catch (error) {
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
//     if (!name.trim() || !email.trim()) {
//       showToast.error('Name and email are required');
//       return;
//     }

//     setSaving(true);
//     const toastId = showToast.loading('Updating profile...');

//     try {
//       let avatarUrl = avatar;
//       if (avatarFile) {
//         const formData = new FormData();
//         formData.append('avatar', avatarFile);
//         formData.append('userId', user?.id || '');
        
//         const uploadRes = await fetch('/api/profile/avatar', {
//           method: 'POST',
//           body: formData
//         });
        
//         const uploadData = await uploadRes.json();
//         if (uploadData.success) avatarUrl = uploadData.url;
//       }

//       const res = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user?.id,
//           name,
//           email,
//           avatar: avatarUrl
//         })
//       });

//       const data = await res.json();

//       if (data.success) {
//         const updatedUser = { ...user, name, email, avatar: avatarUrl };
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         setUser(updatedUser);
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
//     } catch (error) {
//       hotToast.dismiss(toastId);
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       showToast.error('All fields are required');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       showToast.error('Passwords do not match');
//       return;
//     }

//     if (newPassword.length < 6) {
//       showToast.error('Password must be at least 6 characters');
//       return;
//     }

//     setSaving(true);
//     const toastId = showToast.loading('Changing password...');

//     try {
//       const res = await fetch('/api/change-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user?.id,
//           currentPassword,
//           newPassword
//         })
//       });

//       const data = await res.json();

//       if (data.success) {
//         hotToast.dismiss(toastId);
//         showToast.success('Password changed successfully');
//         setShowPassword(false);
//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         hotToast.dismiss(toastId);
//         showToast.error(data.error || 'Failed to change password');
//       }
//     } catch (error) {
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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B]">
//       <Toaster position="top-right" />
      
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.back()}
//               className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-xl font-light text-white">profile</h1>
//           </div>
          
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-3 py-2 text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 border border-white/[0.05] rounded-xl transition-colors"
//           >
//             <LogOut className="w-4 h-4" />
//             sign out
//           </button>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
//           {/* Header with Avatar */}
//           <div className="p-6 border-b border-white/[0.05]">
//             <div className="flex items-start gap-4">
//               {/* Avatar */}
//               <div className="relative">
//                 <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden border border-white/[0.05]">
//                   {avatarPreview || avatar ? (
//                     <img 
//                       src={avatarPreview || avatar} 
//                       alt={name} 
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <User className="w-8 h-8 text-white/40" />
//                   )}
//                 </div>
                
//                 <label className="absolute -bottom-1 -right-1 p-1 bg-indigo-500/20 border border-white/[0.05] rounded-lg cursor-pointer hover:bg-indigo-500/30 transition-colors">
//                   <Camera className="w-3 h-3 text-indigo-400" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleAvatarChange}
//                   />
//                 </label>
//               </div>

//               {/* User Info */}
//               <div className="flex-1">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-lg font-medium text-white">{name}</h2>
//                     <p className="text-sm text-white/40 mt-0.5">{email}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 capitalize">
//                         {user?.role}
//                       </span>
//                       {user?.createdAt && (
//                         <span className="text-xs text-white/20 flex items-center gap-1">
//                           <Calendar className="w-3 h-3" />
//                           joined {new Date(user.createdAt).toLocaleDateString()}
//                         </span>
//                       )}
//                     </div>
//                   </div>
                  
//                   <button
//                     onClick={() => setIsEditing(!isEditing)}
//                     className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/40 hover:text-indigo-400 border border-white/[0.05] rounded-lg hover:border-indigo-500/30 transition-colors"
//                   >
//                     <Edit2 className="w-3 h-3" />
//                     {isEditing ? 'cancel' : 'edit'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Stats Row */}
//           <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/[0.05]">
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <BookOpen className="w-4 h-4 text-indigo-400/60" />
//                 <span className="text-xs text-white/30">quizzes</span>
//               </div>
//               <p className="text-lg font-light text-white">{stats.quizzesTaken}</p>
//             </div>
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <TrendingUp className="w-4 h-4 text-emerald-400/60" />
//                 <span className="text-xs text-white/30">avg score</span>
//               </div>
//               <p className="text-lg font-light text-white">{stats.averageScore}%</p>
//             </div>
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <Award className="w-4 h-4 text-yellow-400/60" />
//                 <span className="text-xs text-white/30">achievements</span>
//               </div>
//               <p className="text-lg font-light text-white">{stats.achievements}</p>
//             </div>
//           </div>

//           {/* Profile Form */}
//           <div className="p-6 space-y-4">
//             <div>
//               <label className="block text-xs text-white/40 mb-1">full name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 disabled={!isEditing}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-xs text-white/40 mb-1">email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={!isEditing}
//                 className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//               />
//             </div>

//             {isEditing && (
//               <button
//                 onClick={handleUpdateProfile}
//                 disabled={saving}
//                 className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 text-sm rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50 border border-indigo-500/30"
//               >
//                 <Save className="w-4 h-4" />
//                 {saving ? 'saving...' : 'save changes'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Password Card */}
//         <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden mt-4">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-sm font-medium text-white">password</h3>
//               <button
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/40 hover:text-indigo-400 border border-white/[0.05] rounded-lg hover:border-indigo-500/30 transition-colors"
//               >
//                 <Key className="w-3 h-3" />
//                 {showPassword ? 'cancel' : 'change'}
//               </button>
//             </div>

//             {showPassword && (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-xs text-white/40 mb-1">current password</label>
//                   <input
//                     type="password"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs text-white/40 mb-1">new password</label>
//                   <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs text-white/40 mb-1">confirm password</label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 text-sm"
//                   />
//                 </div>

//                 <button
//                   onClick={handleChangePassword}
//                   disabled={saving}
//                   className="px-4 py-2 bg-indigo-500/20 text-indigo-400 text-sm rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-50 border border-indigo-500/30"
//                 >
//                   {saving ? 'updating...' : 'update password'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-4 text-center">
//           <p className="text-xs text-white/20">
//             member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { 
//   User, 
//   Mail, 
//   Lock, 
//   Camera, 
//   Save,
//   ArrowLeft,
//   Sparkles,
//   LogOut
// } from 'lucide-react';
// import { showToast } from '@/lib/toast';
// import AvatarUpload from '@/components/ui/avatar-upload';

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
//   const [showPasswordForm, setShowPasswordForm] = useState(false);
  
//   // Form states
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [avatar, setAvatar] = useState<string>('');

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     if (!token || !storedUser) {
//       router.push('/login');
//       return;
//     }

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
//     } catch (error) {
//       showToast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     if (!name.trim() || !email.trim()) {
//       showToast.error('Name and email are required');
//       return;
//     }

//     setSaving(true);
//     try {
//       const res = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user?.id,
//           name,
//           email,
//           avatar
//         })
//       });

//       const data = await res.json();

//       if (data.success) {
//         const updatedUser = { ...user, name, email, avatar };
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         setUser(updatedUser);
//         setIsEditing(false);
//         showToast.success('Profile updated successfully');
//       } else {
//         showToast.error(data.error || 'Update failed');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       showToast.error('All fields are required');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       showToast.error('New passwords do not match');
//       return;
//     }

//     if (newPassword.length < 6) {
//       showToast.error('Password must be at least 6 characters');
//       return;
//     }

//     setSaving(true);
//     try {
//       const res = await fetch('/api/change-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user?.id,
//           currentPassword,
//           newPassword
//         })
//       });

//       const data = await res.json();

//       if (data.success) {
//         showToast.success('Password changed successfully');
//         setShowPasswordForm(false);
//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         showToast.error(data.error || 'Failed to change password');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     showToast.success('Logged out successfully');
//     router.push('/login');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <Toaster />
      
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.back()}
//               className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-600" />
//             </button>
//             <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             <LogOut className="w-4 h-4" />
//             <span>Logout</span>
//           </button>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           {/* Profile Header */}
//           <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-8 text-white">
//             <div className="flex items-center gap-6">
//               {/* Avatar */}
//               <div className="relative group">
//                 <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border-4 border-white/20">
//                   {avatar ? (
//                     <img src={avatar} alt={name} className="w-full h-full object-cover" />
//                   ) : (
//                     <User className="w-12 h-12 text-white/60" />
//                   )}
//                 </div>
//                 <button
//                   onClick={() => document.getElementById('avatar-upload')?.click()}
//                   className="absolute bottom-0 right-0 p-1.5 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <Camera className="w-4 h-4" />
//                 </button>
//                 <AvatarUpload 
//                   userId={user?.id} 
//                   onUpload={(url) => {
//                     setAvatar(url);
//                     handleUpdateProfile();
//                   }} 
//                 />
//               </div>
              
//               <div>
//                 <h2 className="text-2xl font-semibold">{name}</h2>
//                 <p className="text-white/80 text-sm mt-1">{email}</p>
//                 <p className="text-white/60 text-xs mt-2 capitalize">{user?.role}</p>
//               </div>
//             </div>
//           </div>

//           {/* Profile Content */}
//           <div className="p-6">
//             {/* Edit Profile Section */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
//                 >
//                   {isEditing ? 'Cancel' : 'Edit'}
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     disabled={!isEditing}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     disabled={!isEditing}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
//                   />
//                 </div>

//                 {isEditing && (
//                   <button
//                     onClick={handleUpdateProfile}
//                     disabled={saving}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50"
//                   >
//                     <Save className="w-4 h-4" />
//                     {saving ? 'Saving...' : 'Save Changes'}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Change Password Section */}
//             <div className="border-t border-gray-200 pt-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium text-gray-900">Password</h3>
//                 <button
//                   onClick={() => setShowPasswordForm(!showPasswordForm)}
//                   className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
//                 >
//                   {showPasswordForm ? 'Cancel' : 'Change Password'}
//                 </button>
//               </div>

//               {showPasswordForm && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Current Password
//                     </label>
//                     <input
//                       type="password"
//                       value={currentPassword}
//                       onChange={(e) => setCurrentPassword(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Confirm New Password
//                     </label>
//                     <input
//                       type="password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
//                     />
//                   </div>

//                   <button
//                     onClick={handleChangePassword}
//                     disabled={saving}
//                     className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50"
//                   >
//                     {saving ? 'Updating...' : 'Update Password'}
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Account Info */}
//             <div className="border-t border-gray-200 pt-8 mt-8">
//               <h3 className="text-sm font-medium text-gray-500 mb-2">Account Information</h3>
//               <p className="text-sm text-gray-600">
//                 Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Save,
  ArrowLeft,
  Sparkles,
  LogOut,
  Calendar,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Edit2,
  Key,
  AlertCircle,
  Award,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { showToast } from '@/lib/toast';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt?: string;
  lastLogin?: string;
  quizzesTaken?: number;
  averageScore?: number;
  achievements?: string[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'activity'>('profile');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Password validation states
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    number: false,
    special: false,
    match: false
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    fetchUserProfile(userData.id || userData._id);
  }, [router]);

  useEffect(() => {
    // Validate password in real-time
    if (newPassword) {
      setPasswordValidations({
        length: newPassword.length >= 8,
        number: /\d/.test(newPassword),
        special: /[!@#$%^&*]/.test(newPassword),
        match: newPassword === confirmPassword && newPassword.length > 0
      });
    }
  }, [newPassword, confirmPassword]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const res = await fetch(`/api/profile?userId=${userId}`);
      const data = await res.json();

      if (data.success) {
        // Add mock data for demo
        const enhancedUser = {
          ...data.data,
          lastLogin: new Date().toISOString(),
          quizzesTaken: Math.floor(Math.random() * 25),
          averageScore: Math.floor(Math.random() * 30) + 70,
          achievements: ['First Quiz', 'Perfect Score', '5-Day Streak']
        };
        
        setUser(enhancedUser);
        setName(enhancedUser.name);
        setEmail(enhancedUser.email);
        setBio(enhancedUser.bio || '');
        setAvatar(enhancedUser.avatar || '');
      }
    } catch (error) {
      showToast.error('failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim() || !email.trim()) {
      showToast.error('name and email are required');
      return;
    }

    setSaving(true);
    const toastId = showToast.loading('updating profile...');

    try {
      // Upload avatar if changed
      let avatarUrl = avatar;
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        formData.append('userId', user?.id || '');
        
        const uploadRes = await fetch('/api/profile/avatar', {
          method: 'POST',
          body: formData
        });
        
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          avatarUrl = uploadData.url;
        }
      }

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          name,
          email,
          bio,
          avatar: avatarUrl
        })
      });

      const data = await res.json();

      if (data.success) {
        const updatedUser = { ...user, name, email, bio, avatar: avatarUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setAvatar(avatarUrl);
        setAvatarPreview('');
        setAvatarFile(null);
        setIsEditing(false);
        
        hotToast.dismiss(toastId);
        showToast.achievement(
          'Profile Updated! ✨',
          'Your changes have been saved'
        );
      } else {
        hotToast.dismiss(toastId);
        showToast.error(data.error || 'update failed');
      }
    } catch (error) {
      hotToast.dismiss(toastId);
      showToast.error('network error');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast.error('all fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast.error('passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      showToast.error('password must be at least 8 characters');
      return;
    }

    setSaving(true);
    const toastId = showToast.loading('updating password...');

    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          currentPassword,
          newPassword
        })
      });

      const data = await res.json();

      if (data.success) {
        hotToast.dismiss(toastId);
        showToast.achievement(
          'Password Updated! 🔐',
          'Your password has been changed successfully'
        );
        setShowPasswordForm(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        hotToast.dismiss(toastId);
        showToast.error(data.error || 'failed to change password');
      }
    } catch (error) {
      hotToast.dismiss(toastId);
      showToast.error('network error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    const toastId = showToast.loading('logging out...');
    
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      hotToast.dismiss(toastId);
      showToast.success('logged out successfully');
      
      setTimeout(() => router.push('/login'), 1000);
    }, 800);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif]">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Back Button Skeleton */}
          <div className="w-24 h-8 bg-white/[0.02] rounded animate-pulse mb-8"></div>

          {/* Profile Card Skeleton */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
            
            <div className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-white/[0.02] animate-pulse"></div>
                <div className="flex-1">
                  <div className="w-48 h-6 bg-white/[0.02] rounded animate-pulse mb-2"></div>
                  <div className="w-64 h-4 bg-white/[0.02] rounded animate-pulse"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white/[0.02] rounded-2xl p-4">
                    <div className="w-16 h-4 bg-white/[0.02] rounded mb-2"></div>
                    <div className="w-24 h-6 bg-white/[0.02] rounded"></div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white/[0.02] rounded-xl p-4">
                    <div className="w-32 h-4 bg-white/[0.02] rounded mb-2"></div>
                    <div className="w-full h-10 bg-white/[0.02] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] font-['Inter',sans-serif] selection:bg-indigo-500/20 selection:text-white">
      <Toaster position="top-right" />
      
      {/* Premium Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,100,150,0.1),transparent)]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 90%)'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 hover:border-white/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-light text-white">profile settings</h1>
              <p className="text-sm text-white/30">manage your account information</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">logout</span>
          </motion.button>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden backdrop-blur-sm"
        >
          {/* Profile Header with Gradient */}
          <div className="relative h-48 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}></div>
            
            {/* Avatar - Positioned absolutely to overlap */}
            <div className="absolute -bottom-16 left-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-2xl bg-[#09090B] overflow-hidden">
                    {avatarPreview || avatar ? (
                      <img 
                        src={avatarPreview || avatar} 
                        alt={name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white/40" />
                      </div>
                    )}
                  </div>
                </div>
                
                <motion.label
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </motion.label>
              </motion.div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 p-8">
            {/* User Info Row */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            >
              <div>
                <h2 className="text-2xl font-light text-white">{name}</h2>
                <p className="text-sm text-white/40 mt-1">{email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/30 capitalize">
                    {user?.role}
                  </span>
                  {user?.createdAt && (
                    <span className="text-xs text-white/20 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">{isEditing ? 'cancel' : 'edit profile'}</span>
              </motion.button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-indigo-400/60" />
                  <span className="text-xs text-white/40">quizzes taken</span>
                </div>
                <p className="text-xl font-light text-white">{user?.quizzesTaken || 0}</p>
              </div>
              
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400/60" />
                  <span className="text-xs text-white/40">average score</span>
                </div>
                <p className="text-xl font-light text-white">{user?.averageScore || 0}%</p>
              </div>
              
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-400/60" />
                  <span className="text-xs text-white/40">achievements</span>
                </div>
                <p className="text-xl font-light text-white">{user?.achievements?.length || 0}</p>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div 
              variants={itemVariants}
              className="flex gap-2 mb-6 border-b border-white/[0.05] pb-4"
            >
              {[
                { id: 'profile', label: 'profile', icon: User },
                { id: 'security', label: 'security', icon: Shield },
                { id: 'activity', label: 'activity', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-white/40 mb-2">full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
                        isEditing
                          ? 'border-indigo-500/50 focus:ring-indigo-500/10'
                          : 'border-white/[0.05] opacity-75'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2">email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
                        isEditing
                          ? 'border-indigo-500/50 focus:ring-indigo-500/10'
                          : 'border-white/[0.05] opacity-75'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2">bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className={`w-full px-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm resize-none ${
                        isEditing
                          ? 'border-indigo-500/50 focus:ring-indigo-500/10'
                          : 'border-white/[0.05] opacity-75'
                      }`}
                      placeholder="tell us about yourself..."
                    />
                  </div>

                  {isEditing && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateProfile}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white text-sm font-light hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? 'saving...' : 'save changes'}
                    </motion.button>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-4">
                  {!showPasswordForm ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPasswordForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all"
                    >
                      <Key className="w-4 h-4" />
                      <span className="text-sm">change password</span>
                    </motion.button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-white/40 mb-2">current password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-white/40 mb-2">new password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
                        />
                        
                        {/* Password requirements */}
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2">
                            {passwordValidations.length ? (
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <XCircle className="w-3 h-3 text-white/20" />
                            )}
                            <span className={`text-[10px] ${passwordValidations.length ? 'text-emerald-400/60' : 'text-white/20'}`}>
                              at least 8 characters
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {passwordValidations.number ? (
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <XCircle className="w-3 h-3 text-white/20" />
                            )}
                            <span className={`text-[10px] ${passwordValidations.number ? 'text-emerald-400/60' : 'text-white/20'}`}>
                              at least one number
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {passwordValidations.special ? (
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <XCircle className="w-3 h-3 text-white/20" />
                            )}
                            <span className={`text-[10px] ${passwordValidations.special ? 'text-emerald-400/60' : 'text-white/20'}`}>
                              at least one special character
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-white/40 mb-2">confirm password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
                        />
                        {confirmPassword && (
                          <div className="flex items-center gap-2 mt-2">
                            {passwordValidations.match ? (
                              <>
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] text-emerald-400/60">passwords match</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-red-400" />
                                <span className="text-[10px] text-red-400/60">passwords do not match</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleChangePassword}
                          disabled={saving || !Object.values(passwordValidations).every(Boolean)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white text-sm font-light hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
                        >
                          <Shield className="w-4 h-4" />
                          {saving ? 'updating...' : 'update password'}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPasswordForm(false)}
                          className="px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white/40 hover:text-white/60 transition-all text-sm"
                        >
                          cancel
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-4">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">last login</p>
                        <p className="text-xs text-white/30">
                          {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white mb-2">achievements</p>
                        <div className="flex flex-wrap gap-2">
                          {user?.achievements?.map((ach, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/30"
                            >
                              {ach}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes enter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes leave {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
        }
        
        .animate-enter {
          animation: enter 0.2s ease-out;
        }
        
        .animate-leave {
          animation: leave 0.15s ease-in forwards;
        }
      `}</style>
    </div>
  );
}




