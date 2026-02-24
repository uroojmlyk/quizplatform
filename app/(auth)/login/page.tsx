

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

//     // Simulate API call
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
//                 👨‍🎓 Student
//               </button>
//               <button
//                 onClick={() => fillDemo('teacher')}
//                 disabled={isLoading}
//                 className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-700 text-sm font-medium disabled:opacity-50"
//               >
//                 👩‍🏫 Teacher
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
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff, Github} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // API call to login
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.role === 'teacher') {
          router.push('/teacher/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.error || 'Invalid email or password');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  const fillDemo = (role: 'student' | 'teacher') => {
    setEmail(role === 'student' ? 'student@demo.com' : 'teacher@demo.com');
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md px-4 sm:px-0">
        <div className="backdrop-blur-xl bg-[#111117]/90 rounded-3xl border border-[#2a2a35] shadow-2xl overflow-hidden">
          
          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-[#3b3b4a] to-transparent pointer-events-none"></div>
          
          {/* Content */}
          <div className="relative p-6 sm:p-8">
            {/* Logo */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-600/20 mb-3 sm:mb-4 animate-float">
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">Sign in to continue your journey</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-red-400 text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email Field */}
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
                    placeholder="Enter your email"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-12 py-2.5 sm:py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link 
                  href="/forgot-password" 
                  className="text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center gap-2 bg-[#0A0A0F] rounded-xl py-2.5 sm:py-3 px-4 group-hover:bg-opacity-90 transition-all">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base text-white font-medium">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      <span className="text-sm sm:text-base text-white font-medium">Sign In</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6 sm:mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2a2a35]"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-4 bg-[#111117] text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl transition-all group">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.48 12.61v-2.36h9.76c.14.61.22 1.23.22 1.94 0 5.31-3.56 9.07-8.98 9.07-5.46 0-9.9-4.44-9.9-9.9s4.44-9.9 9.9-9.9c2.67 0 4.92.98 6.64 2.58l-2.65 2.56c-1.73-1.66-4.01-2.68-6.99-2.68-5.1 0-9.22 4.12-9.22 9.22s4.12 9.22 9.22 9.22c4.73 0 8.19-3.01 8.96-6.96h-8.96z"/>
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl transition-all group">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white" />
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white">GitHub</span>
                </button>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#2a2a35]">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center mb-3">
                Demo Accounts
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => fillDemo('student')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl transition-all disabled:opacity-50"
                >
                  <span className="text-sm sm:text-base">👨‍🎓</span>
                  <span className="text-xs sm:text-sm text-gray-300">Student</span>
                </button>
                <button
                  onClick={() => fillDemo('teacher')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl transition-all disabled:opacity-50"
                >
                  <span className="text-sm sm:text-base">👩‍🏫</span>
                  <span className="text-xs sm:text-sm text-gray-300">Teacher</span>
                </button>
              </div>
            </div>

            {/* Signup Link */}
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}