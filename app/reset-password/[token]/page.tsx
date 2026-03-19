

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';  
// // import { motion } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import { Lock, Eye, EyeOff, CheckCircle, Sparkles, AlertCircle, Key, Heart } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// // ✅ Design tokens matching teacher/admin dashboard
// const T = {
//   bg: '#070709',
//   bgCard: '#0f0f12',
//   accent: '#10b981',
//   accentLight: '#34d399',
//   accentDark: '#059669',
//   accentGlow: 'rgba(16,185,129,0.16)',
//   accentBorder: 'rgba(16,185,129,0.2)',
//   accentBg: 'rgba(16,185,129,0.08)',
//   border: 'rgba(255,255,255,0.06)',
//   textMuted: 'rgba(255,255,255,0.4)',
//   textDim: 'rgba(255,255,255,0.25)',
// };

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const params = useParams();
//   const token = params.token as string;
  
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [reset, setReset] = useState(false);
//   const [error, setError] = useState('');
//   const [validToken, setValidToken] = useState(true);
//   const [countdown, setCountdown] = useState(5);

//   // Check if token exists
//   useEffect(() => {
//     if (!token) {
//       setValidToken(false);
//       setError('Invalid reset link');
//     }
//   }, [token]);

//   // Password strength check
//   const getPasswordStrength = () => {
//     if (password.length === 0) return 0;
//     if (password.length < 6) return 1;
//     if (password.length < 8) return 2;
//     if (password.match(/^(?=.*[A-Z])(?=.*[0-9])/)) return 3;
//     return 2;
//   };

//   const strength = getPasswordStrength();
//   const strengthText = ['', 'Weak', 'Medium', 'Strong'];
//   const strengthColor = ['', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-400'];
//   const strengthTextColor = ['', 'text-amber-400', 'text-emerald-400', 'text-emerald-300'];

//   // Redirect countdown
//   useEffect(() => {
//     if (reset && countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//     if (reset && countdown === 0) {
//       router.push('/login');
//     }
//   }, [reset, countdown, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // Validation
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, newPassword: password }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setReset(true);
//         showToast.success('Password reset successfully!');
//       } else {
//         setError(data.error || 'Failed to reset password');
//         showToast.error(data.error || 'Failed to reset password');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       showToast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!validToken) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-md w-full rounded-2xl p-8 text-center border"
//           style={{ background: T.bgCard, borderColor: T.border }}
//         >
//           <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
//             style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
//             <AlertCircle className="w-8 h-8" style={{ color: '#ef4444' }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-2">Invalid Reset Link</h1>
//           <p className="text-sm mb-6" style={{ color: T.textMuted }}>
//             This password reset link is invalid or has expired.
//           </p>
//           <Link
//             href="/forgot-password"
//             className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
//             style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
//           >
//             Request New Link
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   if (reset) {
//     return (
//       <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-md w-full rounded-2xl p-8 text-center border"
//           style={{ background: T.bgCard, borderColor: T.border }}
//         >
//           <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
//             style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//             <CheckCircle className="w-8 h-8" style={{ color: T.accentLight }} />
//           </div>
//           <h1 className="text-2xl font-bold text-white mb-2">Password Reset!</h1>
//           <p className="text-sm mb-6" style={{ color: T.textMuted }}>
//             Your password has been successfully reset. You can now login with your new password.
//           </p>
//           <div className="space-y-4">
//             <p className="text-xs" style={{ color: T.textDim }}>
//               Redirecting to login in {countdown} seconds...
//             </p>
//             <Link
//               href="/login"
//               className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
//               style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
//             >
//               Go to Login Now
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
//       <Toaster position="top-right" />
      
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full rounded-2xl p-8 border"
//         style={{ background: T.bgCard, borderColor: T.border }}
//       >
//         {/* Header */}
//         <div className="text-center mb-8">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 15 }}
//             className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 mx-auto"
//             style={{ background: `linear-gradient(135deg, ${T.accentBg}, rgba(16,185,129,0.15))`, border: `1px solid ${T.accentBorder}` }}
//           >
//             <Heart className="w-7 h-7" style={{ color: T.accentLight }} />
//           </motion.div>
//           <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Reset Password</h1>
//           <p className="text-sm" style={{ color: T.textMuted }}>
//             Enter your new password below.
//           </p>
//         </div>

//         {/* Error Message */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="mb-4 p-3 rounded-xl flex items-center gap-2"
//               style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
//             >
//               <AlertCircle className="w-4 h-4 shrink-0" style={{ color: '#ef4444' }} />
//               <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* New Password */}
//           <div>
//             <label className="block text-sm font-medium mb-2" style={{ color: T.textMuted }}>
//               New Password
//             </label>
//             <div className="relative group">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors" style={{ color: T.textDim }} />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-10 py-3 rounded-xl text-sm transition-all border outline-none"
//                 style={{ 
//                   background: 'rgba(255,255,255,0.03)', 
//                   borderColor: T.border,
//                   color: '#fff'
//                 }}
//                 onFocus={e => (e.target.style.borderColor = T.accentBorder)}
//                 onBlur={e => (e.target.style.borderColor = T.border)}
//                 placeholder="Enter new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
//                 style={{ color: T.textDim }}
//                 whileHover={{ color: '#fff' }}
//               >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
            
//             {/* Password Strength Meter */}
//             {password.length > 0 && (
//               <motion.div 
//                 initial={{ opacity: 0, y: -5 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-3"
//               >
//                 <div className="flex gap-1 h-1 mb-1">
//                   {[1, 2, 3].map((level) => (
//                     <motion.div
//                       key={level}
//                       initial={{ width: 0 }}
//                       animate={{ width: '100%' }}
//                       className={`flex-1 rounded-full transition-all ${
//                         level <= strength ? strengthColor[strength] : 'bg-white/10'
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <p className={`text-xs ${strengthTextColor[strength]}`}>
//                   {strengthText[strength]} password
//                 </p>
//               </motion.div>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium mb-2" style={{ color: T.textMuted }}>
//               Confirm Password
//             </label>
//             <div className="relative group">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors" style={{ color: T.textDim }} />
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-10 py-3 rounded-xl text-sm transition-all border outline-none"
//                 style={{ 
//                   background: 'rgba(255,255,255,0.03)', 
//                   borderColor: T.border,
//                   color: '#fff'
//                 }}
//                 onFocus={e => (e.target.style.borderColor = T.accentBorder)}
//                 onBlur={e => (e.target.style.borderColor = T.border)}
//                 placeholder="Confirm new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
//                 style={{ color: T.textDim }}
//                 whileHover={{ color: '#fff' }}
//               >
//                 {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
//             <AnimatePresence>
//               {confirmPassword && password !== confirmPassword && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -5 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="text-xs mt-1"
//                   style={{ color: '#ef4444' }}
//                 >
//                   Passwords do not match
//                 </motion.p>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
//             style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Resetting...</span>
//               </>
//             ) : (
//               <>
//                 <Key className="w-4 h-4" />
//                 Reset Password
//               </>
//             )}
//           </motion.button>
//         </form>

//         {/* Back to Login */}
//         <p className="text-center text-sm mt-6" style={{ color: T.textDim }}>
//           Remember your password?{' '}
//           <Link 
//             href="/login" 
//             className="font-medium transition-colors hover:underline"
//             style={{ color: T.accentLight }}
//           >
//             Sign in
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }










'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { showToast } from '@/lib/toast';

const T = {
  bg: '#080810',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  accentGlow: 'rgba(52,211,153,0.15)',
  cardBg: 'rgba(255,255,255,0.025)',
  cardBorder: 'rgba(255,255,255,0.07)',
  inputBg: 'rgba(255,255,255,0.03)',
  textMuted: 'rgba(255,255,255,0.4)',
  textDim: 'rgba(255,255,255,0.2)',
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState('');
  const [validToken, setValidToken] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setValidToken(false); setError('Invalid reset link'); }
  }, [token]);

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    if (password.match(/^(?=.*[A-Z])(?=.*[0-9])/)) return 3;
    return 2;
  };

  const strength = getPasswordStrength();
  const strengthMeta = [
    null,
    { text: 'Weak', color: '#ef4444', w: 'w-1/3' },
    { text: 'Medium', color: '#f59e0b', w: 'w-2/3' },
    { text: 'Strong', color: T.accent, w: 'w-full' },
  ];

  useEffect(() => {
    if (reset && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (reset && countdown === 0) router.push('/login');
  }, [reset, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      if (data.success) {
        setReset(true);
        showToast.success('Password reset successfully!');
      } else {
        setError(data.error || 'Failed to reset password');
        showToast.error(data.error || 'Failed to reset password');
      }
    } catch {
      setError('Network error. Please try again.');
      showToast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = { background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" };
  const fontImport = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap'); input::placeholder { color: rgba(255,255,255,0.18); }`;

  if (!validToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
        <style>{fontImport}</style>
        <div className="max-w-md w-full rounded-2xl p-8 text-center border" style={{ background: T.cardBg, borderColor: T.cardBorder }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle className="w-8 h-8" style={{ color: '#ef4444' }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>Invalid Reset Link</h1>
          <p className="text-sm mb-6" style={{ color: T.textMuted }}>This password reset link is invalid or has expired.</p>
          <Link href="/forgot-password"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#fff', color: '#080810' }}>
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  if (reset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
        <style>{fontImport}</style>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />
        <div className="max-w-md w-full rounded-2xl p-8 text-center border relative z-10" style={{ background: T.cardBg, borderColor: T.cardBorder }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
            <CheckCircle className="w-8 h-8" style={{ color: T.accent }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>Password Reset!</h1>
          <p className="text-sm mb-4" style={{ color: T.textMuted }}>Your password has been updated successfully.</p>
          <p className="text-xs mb-6" style={{ color: T.textDim }}>Redirecting to login in {countdown}s…</p>
          <Link href="/login"
            className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#fff', color: '#080810' }}>
            Sign in now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={pageStyle}>
      <style>{fontImport}</style>
      <Toaster position="top-right" />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span className="text-white/80 font-bold text-sm">F</span>
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">Ficer</span>
        </div>

        <div className="rounded-2xl p-8 border" style={{ background: T.cardBg, borderColor: T.cardBorder }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
            <Lock className="w-6 h-6" style={{ color: T.accent }} />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}>Reset Password</h1>
          <p className="text-sm mb-6" style={{ color: T.textMuted }}>
            Create a new password for your account.
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(239,68,68,0.85)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New password */}
            <div className="space-y-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.textDim }}>
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
                    style={{ color: focused === 'pw' ? T.accent : 'rgba(255,255,255,0.2)' }} />
                  <input type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocused('pw')} onBlur={() => setFocused(null)}
                    placeholder="Min. 6 characters" required disabled={loading}
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
                    style={{
                      background: focused === 'pw' ? 'rgba(52,211,153,0.03)' : T.inputBg,
                      border: `1px solid ${focused === 'pw' ? T.accentBorder : T.cardBorder}`,
                      color: 'rgba(255,255,255,0.88)',
                      boxShadow: focused === 'pw' ? '0 0 0 3px rgba(52,211,153,0.08)' : 'none',
                      caretColor: T.accent,
                    }} />
                  <button type="button" onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors p-0.5 rounded"
                    style={{ color: 'rgba(255,255,255,0.22)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {password && strengthMeta[strength] && (
                <div className="space-y-1">
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className={`h-full rounded-full transition-all duration-300 ${strengthMeta[strength]!.w}`}
                      style={{ background: strengthMeta[strength]!.color }} />
                  </div>
                  <p className="text-[10px] pl-0.5 font-medium" style={{ color: strengthMeta[strength]!.color }}>
                    {strengthMeta[strength]!.text} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.textDim }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
                  style={{ color: focused === 'confirm' ? T.accent : 'rgba(255,255,255,0.2)' }} />
                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocused('confirm')} onBlur={() => setFocused(null)}
                  placeholder="Repeat your password" required disabled={loading}
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
                  style={{
                    background: focused === 'confirm' ? 'rgba(52,211,153,0.03)' : T.inputBg,
                    border: `1px solid ${focused === 'confirm' ? T.accentBorder : confirmPassword && password !== confirmPassword ? 'rgba(239,68,68,0.3)' : T.cardBorder}`,
                    color: 'rgba(255,255,255,0.88)',
                    boxShadow: focused === 'confirm' ? '0 0 0 3px rgba(52,211,153,0.08)' : 'none',
                    caretColor: T.accent,
                  }} />
                <button type="button" onClick={() => setShowConfirmPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors p-0.5 rounded"
                  style={{ color: 'rgba(255,255,255,0.22)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed"
                style={{
                  background: loading ? T.accentBg : '#fff',
                  color: loading ? T.accent : '#080810',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(0,0,0,0.3)',
                  border: loading ? `1px solid ${T.accentBorder}` : '1px solid transparent',
                }}>
                {loading
                  ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: `${T.accent}30`, borderTopColor: T.accent }} /><span>Resetting…</span></>
                  : <><Lock className="w-4 h-4" /><span>Reset Password</span></>}
              </button>
            </div>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Remember your password?{' '}
            <Link href="/login" className="font-semibold transition-colors"
              style={{ color: 'rgba(52,211,153,0.7)' }}
              onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(52,211,153,0.7)')}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}