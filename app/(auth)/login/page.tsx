


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
//   const [emailValid, setEmailValid] = useState<boolean | null>(null);
//   const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

//   // Email validation
//   useEffect(() => {
//     if (email.length > 0) {
//       const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//       setEmailValid(isValid);
//     } else {
//       setEmailValid(null);
//     }
//   }, [email]);

//   // Password validation (min 6 chars)
//   useEffect(() => {
//     if (password.length > 0) {
//       setPasswordValid(password.length >= 6);
//     } else {
//       setPasswordValid(null);
//     }
//   }, [password]);

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
//     setEmailValid(true);
//     setPasswordValid(true);
//   };

//   return (
//     <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden font-['Inter',sans-serif] selection:bg-indigo-500/20 selection:text-white">
//       {/* Premium Gradient Background */}
//       <div className="fixed inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,100,150,0.1),transparent)]"></div>
        
//         {/* Grid Pattern */}
//         <div className="absolute inset-0 opacity-20" style={{
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
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl mb-4 border border-white/[0.05]">
//                   <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//                     <Sparkles className="w-6 h-6 text-white" />
//                   </div>
//                 </div>
//                 <h2 className="text-2xl font-light text-white mb-1 tracking-tight">
//                   welcome back
//                 </h2>
//                 <p className="text-sm text-white/30 font-light">
//                   sign in to your account
//                 </p>
//               </motion.div>

//               {/* Success Message */}
//               <AnimatePresence>
//                 {success && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3"
//                   >
//                     <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center">
//                       <CheckCircle className="w-4 h-4 text-emerald-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-emerald-400 font-medium">Login successful!</p>
//                       <p className="text-xs text-emerald-400/60">Redirecting to dashboard...</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Error Message */}
//               <AnimatePresence>
//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
//                   >
//                     <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center">
//                       <AlertCircle className="w-4 h-4 text-red-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-red-400 font-medium">Authentication failed</p>
//                       <p className="text-xs text-red-400/60">{error}</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Email Field */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <label className="text-xs font-medium text-white/40 ml-1">
//                       email address
//                     </label>
//                     {emailValid === true && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
//                       >
//                         valid
//                       </motion.span>
//                     )}
//                     {emailValid === false && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full"
//                       >
//                         invalid format
//                       </motion.span>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
//                       focusedField === 'email' 
//                         ? 'text-indigo-400' 
//                         : emailValid === true 
//                           ? 'text-emerald-400' 
//                           : emailValid === false 
//                             ? 'text-red-400' 
//                             : 'text-white/20'
//                     }`} />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       onFocus={() => setFocusedField('email')}
//                       onBlur={() => setFocusedField(null)}
//                       className={`w-full pl-10 pr-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
//                         focusedField === 'email'
//                           ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
//                           : emailValid === true
//                             ? 'border-emerald-500/30'
//                             : emailValid === false
//                               ? 'border-red-500/30'
//                               : 'border-white/[0.05]'
//                       }`}
//                       placeholder="your@email.com"
//                       disabled={isLoading || success}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <label className="text-xs font-medium text-white/40 ml-1">
//                       password
//                     </label>
//                     {passwordValid === true && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
//                       >
//                         strong
//                       </motion.span>
//                     )}
//                     {passwordValid === false && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full"
//                       >
//                         too short
//                       </motion.span>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
//                       focusedField === 'password' 
//                         ? 'text-indigo-400' 
//                         : passwordValid === true 
//                           ? 'text-emerald-400' 
//                           : passwordValid === false 
//                             ? 'text-red-400' 
//                             : 'text-white/20'
//                     }`} />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       onFocus={() => setFocusedField('password')}
//                       onBlur={() => setFocusedField(null)}
//                       className={`w-full pl-10 pr-12 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
//                         focusedField === 'password'
//                           ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
//                           : passwordValid === true
//                             ? 'border-emerald-500/30'
//                             : passwordValid === false
//                               ? 'border-red-500/30'
//                               : 'border-white/[0.05]'
//                       }`}
//                       placeholder="••••••••"
//                       disabled={isLoading || success}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
//                     >
//                       {showPassword ? 
//                         <EyeOff className="w-4 h-4" /> : 
//                         <Eye className="w-4 h-4" />
//                       }
//                     </button>
//                   </div>
//                 </div>

//                 {/* Forgot Password */}
//                 <div className="flex justify-end">
//                   <Link 
//                     href="/forgot-password" 
//                     className="text-xs text-white/20 hover:text-indigo-400 transition-colors"
//                   >
//                     forgot password?
//                   </Link>
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   type="submit"
//                   disabled={isLoading || success || !emailValid || !passwordValid}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-[1px] hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
//                 >
//                   <div className="relative flex items-center justify-center gap-2 bg-[#09090B] rounded-xl py-3.5 px-4 group-hover:bg-opacity-90 transition-all">
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
//                     whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)' }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex items-center justify-center gap-2 px-3 py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all group"
//                   >
//                     <Chrome className="w-4 h-4 text-white/40 group-hover:text-white/60" />
//                     <span className="text-xs text-white/40 group-hover:text-white/60">Google</span>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)' }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex items-center justify-center gap-2 px-3 py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all group"
//                   >
//                     <Github className="w-4 h-4 text-white/40 group-hover:text-white/60" />
//                     <span className="text-xs text-white/40 group-hover:text-white/60">GitHub</span>
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Demo Accounts */}
//               <div className="mt-6 pt-6 border-t border-white/[0.05]">
//                 <p className="text-[10px] font-mono text-white/20 text-center mb-3 tracking-wider">
//                   demo credentials
//                 </p>
//                 <div className="grid grid-cols-2 gap-3">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => fillDemo('student')}
//                     disabled={isLoading || success}
//                     className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all disabled:opacity-50 group"
//                   >
//                     <span className="text-base">🎓</span>
//                     <span className="text-xs text-white/40 group-hover:text-white/60">student</span>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => fillDemo('teacher')}
//                     disabled={isLoading || success}
//                     className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-xl transition-all disabled:opacity-50 group"
//                   >
//                     <span className="text-base">👩‍🏫</span>
//                     <span className="text-xs text-white/40 group-hover:text-white/60">teacher</span>
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Signup Link */}
//               <p className="text-center text-xs text-white/20 mt-6">
//                 don't have an account?{' '}
//                 <Link 
//                   href="/signup" 
//                   className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
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
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2 }}
//             className="absolute top-1/2 -right-8 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// }







'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e = { email: '', password: '', general: '' };
    let ok = true;
    if (!form.email.trim()) { e.email = 'Email is required'; ok = false; }
    else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; ok = false; }
    if (!form.password) { e.password = 'Password is required'; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors(prev => ({ ...prev, general: '' }));
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('token', data.token || 'token');
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push(data.user.role === 'teacher' ? '/teacher/dashboard' : '/dashboard');
      } else {
        setErrors(prev => ({ ...prev, general: data.error || 'Invalid credentials' }));
        setIsLoading(false);
      }
    } catch {
      setErrors(prev => ({ ...prev, general: 'Network error. Try again.' }));
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#080809] flex overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* ─── Left decorative panel ─── */}
      <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-14 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 70% at 10% 50%, rgba(168,130,60,0.09) 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 90% 90%, rgba(100,70,200,0.07) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute right-0 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <GraduationCap className="w-5 h-5 text-[#080809]" />
          </div>
          <span className="text-white/70 font-semibold text-sm tracking-wide">QuizPortal</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500/50 mb-5 font-semibold">Online Learning Platform</p>
            <h2 className="text-[2.6rem] font-bold text-white/90 leading-[1.1] tracking-tight">
              Where great<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #d4a850 0%, #f0c96a 50%, #c49030 100%)' }}>
                teaching lives.
              </span>
            </h2>
            <p className="text-sm text-white/28 mt-4 leading-relaxed max-w-xs">
              Create quizzes, track student progress, and deliver results in real time.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Smart quiz creation with AI', dot: 'bg-amber-400' },
              { label: 'Live performance analytics', dot: 'bg-violet-400' },
              { label: 'Assigned & public quiz modes', dot: 'bg-teal-400' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${f.dot} shrink-0`} />
                <p className="text-xs text-white/30">{f.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 border-l-2 border-amber-500/20 pl-4">
          <p className="text-xs text-white/20 italic leading-relaxed">
            "The beautiful thing about learning is<br />that no one can take it away from you."
          </p>
          <p className="text-[10px] text-white/12 mt-2">— B.B. King</p>
        </div>
      </div>

      {/* ─── Right form panel ─── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(168,130,60,0.05),transparent)]" />

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10 relative z-10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-[#080809]" />
          </div>
          <span className="text-white/70 font-semibold text-sm">QuizPortal</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="w-full max-w-[390px] relative z-10">

          <div className="mb-8">
            <h1 className="text-[1.75rem] font-bold text-white tracking-tight leading-tight mb-2">Welcome back</h1>
            <p className="text-sm text-white/32">Sign in to continue your session</p>
          </div>

          {/* General error */}
          <AnimatePresence>
            {errors.general && (
              <motion.div initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} className="mb-5 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/15 text-red-400/90 text-sm">
                {errors.general}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Email</label>
              <div className="relative">
                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${focused === 'email' ? 'text-amber-400' : errors.email ? 'text-red-400/50' : 'text-white/18'}`} />
                <input type="email" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  placeholder="you@example.com" disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white/90 placeholder:text-white/18 bg-white/[0.03] border outline-none transition-all duration-200 disabled:opacity-50 ${
                    focused === 'email' ? 'border-amber-500/35 bg-amber-400/[0.04] shadow-[0_0_0_3px_rgba(212,170,80,0.07)]'
                    : errors.email ? 'border-red-500/25' : 'border-white/[0.07] hover:border-white/[0.12]'}`} />
              </div>
              {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400/70 pl-1">{errors.email}</motion.p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-amber-400/55 hover:text-amber-400/85 transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${focused === 'password' ? 'text-amber-400' : errors.password ? 'text-red-400/50' : 'text-white/18'}`} />
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                  placeholder="••••••••" disabled={isLoading}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white/90 placeholder:text-white/18 bg-white/[0.03] border outline-none transition-all duration-200 disabled:opacity-50 ${
                    focused === 'password' ? 'border-amber-500/35 bg-amber-400/[0.04] shadow-[0_0_0_3px_rgba(212,170,80,0.07)]'
                    : errors.password ? 'border-red-500/25' : 'border-white/[0.07] hover:border-white/[0.12]'}`} />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors p-0.5">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400/70 pl-1">{errors.password}</motion.p>}
            </div>

            {/* Submit */}
            <div className="pt-1.5">
              <motion.button type="submit" disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.015 }} whileTap={{ scale: isLoading ? 1 : 0.985 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed"
                style={{ background: isLoading ? 'rgba(212,170,80,0.15)' : 'linear-gradient(135deg, #c9953a 0%, #e8bb55 50%, #c08028 100%)', color: isLoading ? 'rgba(212,170,80,0.6)' : '#080809', boxShadow: isLoading ? 'none' : '0 4px 28px rgba(200,150,50,0.22), 0 1px 0 rgba(255,220,100,0.3) inset' }}>
                {isLoading ? (
                  <><div className="w-4 h-4 border-2 border-amber-400/35 border-t-amber-400 rounded-full animate-spin" /><span>Signing in…</span></>
                ) : (
                  <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-[10px] text-white/18 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Google', icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)"/><path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)"/><path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z"/><path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z"/></svg> },
              { label: 'GitHub', icon: <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            ].map(s => (
              <button key={s.label} type="button"
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all text-sm text-white/38 hover:text-white/60">
                {s.icon}{s.label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-white/22 mt-7">
            New to QuizPortal?{' '}
            <Link href="/signup" className="text-amber-400/65 hover:text-amber-400/90 transition-colors font-semibold">Create account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}