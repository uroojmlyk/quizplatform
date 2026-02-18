
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Mail, Lock, LogIn, Eye, EyeOff, Sparkles } from 'lucide-react';

// export default function LoginPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setTimeout(() => {
//       const user = { id: '1', name: 'Alex', email, role: email.includes('teacher') ? 'teacher' : 'student' };
//       localStorage.setItem('token', 'dummy-token');
//       localStorage.setItem('user', JSON.stringify(user));
//       setIsLoading(false);
//       router.push('/dashboard');
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
//         {/* Grid Overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
//       </div>

//       {/* Login Card */}
//       <div className="relative w-full max-w-md">
//         {/* Glass Card */}
//         <div className="backdrop-blur-xl bg-[#111117]/90 rounded-3xl border border-[#2a2a35] shadow-2xl overflow-hidden">
          
//           {/* Gradient Border */}
//           <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-[#3b3b4a] to-transparent pointer-events-none"></div>
          
//           {/* Content */}
//           <div className="relative p-8">
//             {/* Logo */}
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-600/20 mb-4 animate-float">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                 Welcome Back
//               </h2>
//               <p className="text-gray-400 mt-2">Sign in to continue your journey</p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Email</label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-12 pr-12 py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2 cursor-pointer group">
//                   <input type="checkbox" className="w-4 h-4 bg-[#1a1a23] border-[#2a2a35] rounded text-purple-500 focus:ring-purple-500/20 focus:ring-offset-0" />
//                   <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
//                 </label>
//                 <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
//               >
//                 <div className="relative flex items-center justify-center gap-2 bg-[#0A0A0F] rounded-xl py-3 px-4 group-hover:bg-opacity-90 transition-all">
//                   {isLoading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
//                       <span className="text-white font-medium">Signing in...</span>
//                     </>
//                   ) : (
//                     <>
//                       <LogIn className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
//                       <span className="text-white font-medium">Sign In</span>
//                     </>
//                   )}
//                 </div>
//               </button>
//             </form>

//             {/* Demo Accounts */}
//             <div className="mt-8 pt-6 border-t border-[#2a2a35]">
//               <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 text-center">Demo Access</p>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   onClick={() => {
//                     setEmail('student@demo.com');
//                     setPassword('password');
//                   }}
//                   className="px-4 py-2.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl text-sm text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2"
//                 >
//                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                   Student
//                 </button>
//                 <button
//                   onClick={() => {
//                     setEmail('teacher@demo.com');
//                     setPassword('password');
//                   }}
//                   className="px-4 py-2.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl text-sm text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2"
//                 >
//                   <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
//                   Teacher
//                 </button>
//               </div>
//             </div>

//             <p className="text-center text-sm text-gray-500 mt-6">
//               Don't have an account?{' '}
//               <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { findUserByEmail } from '@/lib/mockData';
// import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from 'lucide-react';

// export default function LoginPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     setTimeout(() => {
//       const user = findUserByEmail(email);
      
//       if (user) {
//         localStorage.setItem('token', 'dummy-token');
//         localStorage.setItem('user', JSON.stringify(user));
        
//         if (user.role === 'teacher') {
//           router.push('/teacher/dashboard');
//         } else {
//           router.push('/dashboard');
//         }
//       } else {
//         setError('Invalid email or password');
//         setIsLoading(false);
//       }
//     }, 1500);
//   };

//   const fillDemo = (role: 'student' | 'teacher') => {
//     setEmail(role === 'student' ? 'student@demo.com' : 'teacher@demo.com');
//     setPassword('password');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
//             <Sparkles className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
//           <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
//         </div>

//         {/* Login Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
//                   placeholder="Enter your email"
//                   disabled={isLoading}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
//                   placeholder="Enter your password"
//                   disabled={isLoading}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password */}
//             <div className="flex justify-end">
//               <Link 
//                 href="/forgot-password" 
//                 className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-600/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Signing in...</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center gap-2">
//                   <LogIn className="w-5 h-5" />
//                   <span>Sign In</span>
//                 </div>
//               )}
//             </button>
//           </form>

//           {/* Demo Accounts */}
//           <div className="mt-6 pt-6 border-t border-gray-100">
//             <p className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center mb-3">
//               Demo Accounts
//             </p>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 onClick={() => fillDemo('student')}
//                 disabled={isLoading}
//                 className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-700 text-sm font-medium disabled:opacity-50"
//               >
//                 <User className="w-4 h-4" />
//                 Student
//               </button>
//               <button
//                 onClick={() => fillDemo('teacher')}
//                 disabled={isLoading}
//                 className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-700 text-sm font-medium disabled:opacity-50"
//               >
//                 <User className="w-4 h-4" />
//                 Teacher
//               </button>
//             </div>
//           </div>

//           {/* Signup Link */}
//           <p className="text-center text-sm text-gray-500 mt-6">
//             Don't have an account?{' '}
//             <Link 
//               href="/signup" 
//               className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }        







'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { findUserByEmail } from '@/lib/mockData';
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const user = findUserByEmail(email);
      
      if (user) {
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify(user));
        
        if (user.role === 'teacher') {
          router.push('/teacher/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1500);
  };

  const fillDemo = (role: 'student' | 'teacher') => {
    setEmail(role === 'student' ? 'student@demo.com' : 'teacher@demo.com');
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-600/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center mb-3">
              Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => fillDemo('student')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-700 text-sm font-medium disabled:opacity-50"
              >
                👨‍🎓 Student
              </button>
              <button
                onClick={() => fillDemo('teacher')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-700 text-sm font-medium disabled:opacity-50"
              >
                👩‍🏫 Teacher
              </button>
            </div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link 
              href="/signup" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}