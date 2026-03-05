
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff, Github, Chrome, CheckCircle, AlertCircle } from 'lucide-react';

// export default function LoginPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setSuccess(true);
//         localStorage.setItem('token', data.token || 'dummy-token');
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         setTimeout(() => {
//           if (data.user.role === 'teacher') {
//             router.push('/teacher/dashboard');
//           } else if (data.user.role === 'admin') {
//             router.push('/admin');
//           } else {
//             router.push('/dashboard');
//           }
//         }, 800);
//       } else {
//         setError(data.error || 'Invalid email or password');
//         setIsLoading(false);
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   const fillDemo = (role: 'student' | 'teacher') => {
//     setEmail(role === 'student' ? 'student@demo.com' : 'teacher@demo.com');
//     setPassword('password');
//   };

//   return (
//     <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden font-['Inter',sans-serif]">
//       {/* Premium Gradient Background */}
//       <div className="fixed inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,100,150,0.1),transparent)]"></div>
        
//         {/* Grid Pattern */}
//         <div className="absolute inset-0" style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
//           `,
//           backgroundSize: '40px 40px',
//           maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 90%)'
//         }}></div>
//       </div>

//       {/* Main Container */}
//       <div className="relative w-full max-w-md">
//         {/* Floating Elements */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative"
//         >
//           {/* Glass Card */}
//           <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden">
//             {/* Gradient Border */}
//             <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>
            
//             {/* Content */}
//             <div className="relative p-8">
//               {/* Logo & Header */}
//               <motion.div 
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.2, duration: 0.5 }}
//                 className="text-center mb-8"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl mb-4 border border-white/[0.05]">
//                   <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
//                     <Sparkles className="w-6 h-6 text-white" />
//                   </div>
//                 </div>
//                 <h2 className="text-2xl font-light text-white mb-1">
//                   welcome back
//                 </h2>
//                 <p className="text-sm text-white/30">
//                   sign in to your account
//                 </p>
//               </motion.div>

//               {/* Success Message */}
//               <AnimatePresence>
//                 {success && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2"
//                   >
//                     <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
//                     <p className="text-xs text-emerald-400">Login successful! Redirecting...</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Error Message */}
//               <AnimatePresence>
//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2"
//                   >
//                     <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
//                     <p className="text-xs text-red-400">{error}</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Email Field */}
//                 <div className="space-y-2">
//                   <label className="block text-xs font-medium text-white/40 ml-1">
//                     email
//                   </label>
//                   <div className="relative">
//                     <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
//                       focusedField === 'email' ? 'text-indigo-400' : 'text-white/20'
//                     }`} />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       onFocus={() => setFocusedField('email')}
//                       onBlur={() => setFocusedField(null)}
//                       className="w-full pl-9 pr-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
//                       placeholder="your@email.com"
//                       disabled={isLoading || success}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div className="space-y-2">
//                   <label className="block text-xs font-medium text-white/40 ml-1">
//                     password
//                   </label>
//                   <div className="relative">
//                     <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
//                       focusedField === 'password' ? 'text-indigo-400' : 'text-white/20'
//                     }`} />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       onFocus={() => setFocusedField('password')}
//                       onBlur={() => setFocusedField(null)}
//                       className="w-full pl-9 pr-12 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
//                       placeholder="••••••••"
//                       disabled={isLoading || success}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
//                     >
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Forgot Password */}
//                 <div className="flex justify-end">
//                   <Link 
//                     href="/forgot-password" 
//                     className="text-xs text-white/30 hover:text-indigo-400 transition-colors"
//                   >
//                     forgot password?
//                   </Link>
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   type="submit"
//                   disabled={isLoading || success}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-[1px] hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <div className="relative flex items-center justify-center gap-2 bg-[#09090B] rounded-xl py-3 px-4 group-hover:bg-opacity-90 transition-all">
//                     {isLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
//                         <span className="text-sm text-white font-light">signing in...</span>
//                       </>
//                     ) : (
//                       <>
//                         <LogIn className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
//                         <span className="text-sm text-white font-light">sign in</span>
//                       </>
//                     )}
//                   </div>
//                 </motion.button>
//               </form>

//               {/* Social Login */}
//               <div className="mt-8">
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-white/[0.05]"></div>
//                   </div>
//                   <div className="relative flex justify-center text-xs">
//                     <span className="px-4 bg-[#09090B] text-white/20">or continue with</span>
//                   </div>
//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-3">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all group"
//                   >
//                     <Chrome className="w-4 h-4 text-white/40 group-hover:text-white/60" />
//                     <span className="text-xs text-white/40 group-hover:text-white/60">Google</span>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all group"
//                   >
//                     <Github className="w-4 h-4 text-white/40 group-hover:text-white/60" />
//                     <span className="text-xs text-white/40 group-hover:text-white/60">GitHub</span>
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Demo Accounts */}
//               <div className="mt-6 pt-6 border-t border-white/[0.05]">
//                 <p className="text-[10px] font-mono text-white/20 text-center mb-3">
//                   demo credentials
//                 </p>
//                 <div className="grid grid-cols-2 gap-3">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => fillDemo('student')}
//                     disabled={isLoading || success}
//                     className="flex items-center justify-center gap-2 px-3 py-2 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all disabled:opacity-50"
//                   >
//                     <span className="text-sm">🎓</span>
//                     <span className="text-xs text-white/40">student</span>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => fillDemo('teacher')}
//                     disabled={isLoading || success}
//                     className="flex items-center justify-center gap-2 px-3 py-2 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all disabled:opacity-50"
//                   >
//                     <span className="text-sm">👩‍🏫</span>
//                     <span className="text-xs text-white/40">teacher</span>
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Signup Link */}
//               <p className="text-center text-xs text-white/20 mt-6">
//                 don't have an account?{' '}
//                 <Link 
//                   href="/signup" 
//                   className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                 >
//                   sign up
//                 </Link>
//               </p>
//             </div>
//           </div>

//           {/* Decorative Elements */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"
//           />
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//             className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// }









'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff, Github, Chrome, CheckCircle, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  // Email validation
  useEffect(() => {
    if (email.length > 0) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailValid(isValid);
    } else {
      setEmailValid(null);
    }
  }, [email]);

  // Password validation (min 6 chars)
  useEffect(() => {
    if (password.length > 0) {
      setPasswordValid(password.length >= 6);
    } else {
      setPasswordValid(null);
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        localStorage.setItem('token', data.token || 'dummy-token');
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setTimeout(() => {
          if (data.user.role === 'teacher') {
            router.push('/teacher/dashboard');
          } else if (data.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
        }, 800);
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
    setEmailValid(true);
    setPasswordValid(true);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden font-['Inter',sans-serif] selection:bg-indigo-500/20 selection:text-white">
      {/* Premium Gradient Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,100,150,0.1),transparent)]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 90%)'
        }}></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        {/* Floating Elements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>
            
            {/* Content */}
            <div className="relative p-8">
              {/* Logo & Header */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl mb-4 border border-white/[0.05]">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-light text-white mb-1 tracking-tight">
                  welcome back
                </h2>
                <p className="text-sm text-white/30 font-light">
                  sign in to your account
                </p>
              </motion.div>

              {/* Success Message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-400 font-medium">Login successful!</p>
                      <p className="text-xs text-emerald-400/60">Redirecting to dashboard...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-red-400 font-medium">Authentication failed</p>
                      <p className="text-xs text-red-400/60">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-white/40 ml-1">
                      email address
                    </label>
                    {emailValid === true && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                      >
                        valid
                      </motion.span>
                    )}
                    {emailValid === false && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full"
                      >
                        invalid format
                      </motion.span>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === 'email' 
                        ? 'text-indigo-400' 
                        : emailValid === true 
                          ? 'text-emerald-400' 
                          : emailValid === false 
                            ? 'text-red-400' 
                            : 'text-white/20'
                    }`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
                        focusedField === 'email'
                          ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
                          : emailValid === true
                            ? 'border-emerald-500/30'
                            : emailValid === false
                              ? 'border-red-500/30'
                              : 'border-white/[0.05]'
                      }`}
                      placeholder="your@email.com"
                      disabled={isLoading || success}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-white/40 ml-1">
                      password
                    </label>
                    {passwordValid === true && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                      >
                        strong
                      </motion.span>
                    )}
                    {passwordValid === false && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full"
                      >
                        too short
                      </motion.span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === 'password' 
                        ? 'text-indigo-400' 
                        : passwordValid === true 
                          ? 'text-emerald-400' 
                          : passwordValid === false 
                            ? 'text-red-400' 
                            : 'text-white/20'
                    }`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-12 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
                        focusedField === 'password'
                          ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
                          : passwordValid === true
                            ? 'border-emerald-500/30'
                            : passwordValid === false
                              ? 'border-red-500/30'
                              : 'border-white/[0.05]'
                      }`}
                      placeholder="••••••••"
                      disabled={isLoading || success}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                    >
                      {showPassword ? 
                        <EyeOff className="w-4 h-4" /> : 
                        <Eye className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-white/20 hover:text-indigo-400 transition-colors"
                  >
                    forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || success || !emailValid || !passwordValid}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-[1px] hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="relative flex items-center justify-center gap-2 bg-[#09090B] rounded-xl py-3.5 px-4 group-hover:bg-opacity-90 transition-all">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-white font-light">signing in...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                        <span className="text-sm text-white font-light">sign in</span>
                      </>
                    )}
                  </div>
                </motion.button>
              </form>

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.05]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-[#09090B] text-white/20">or continue with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-3 py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all group"
                  >
                    <Chrome className="w-4 h-4 text-white/40 group-hover:text-white/60" />
                    <span className="text-xs text-white/40 group-hover:text-white/60">Google</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-3 py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all group"
                  >
                    <Github className="w-4 h-4 text-white/40 group-hover:text-white/60" />
                    <span className="text-xs text-white/40 group-hover:text-white/60">GitHub</span>
                  </motion.button>
                </div>
              </div>

              {/* Demo Accounts */}
              <div className="mt-6 pt-6 border-t border-white/[0.05]">
                <p className="text-[10px] font-mono text-white/20 text-center mb-3 tracking-wider">
                  demo credentials
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fillDemo('student')}
                    disabled={isLoading || success}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all disabled:opacity-50 group"
                  >
                    <span className="text-base">🎓</span>
                    <span className="text-xs text-white/40 group-hover:text-white/60">student</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fillDemo('teacher')}
                    disabled={isLoading || success}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all disabled:opacity-50 group"
                  >
                    <span className="text-base">👩‍🏫</span>
                    <span className="text-xs text-white/40 group-hover:text-white/60">teacher</span>
                  </motion.button>
                </div>
              </div>

              {/* Signup Link */}
              <p className="text-center text-xs text-white/20 mt-6">
                don't have an account?{' '}
                <Link 
                  href="/signup" 
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute top-1/2 -right-8 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
          />
        </motion.div>
      </div>
    </div>
  );
}