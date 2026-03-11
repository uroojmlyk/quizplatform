




// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { Mail, ArrowLeft, CheckCircle, Sparkles, Lock } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// export default function ForgotPasswordPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setSent(true);
//         showToast.success('Password reset link sent! Check your email.');
//       } else {
//         showToast.error(data.error || 'Failed to send reset link');
//       }
//     } catch (error) {
//       showToast.error('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (sent) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
//         <div className="max-w-md w-full">
//           <div className="bg-[#111117] border border-[#2a2a35] rounded-2xl p-8 text-center">
//             <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
//               <CheckCircle className="w-8 h-8 text-green-400" />
//             </div>
            
//             <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
//             <p className="text-gray-400 mb-4">
//               We've sent a password reset link to:
//             </p>
            
//             <div className="bg-[#1a1a23] border border-[#2a2a35] rounded-xl p-4 mb-6">
//               <p className="text-purple-400 font-medium break-all">{email}</p>
//             </div>
            
//             <div className="space-y-4">
//               <p className="text-sm text-gray-500">
//                 Didn't receive the email? Check your spam folder or
//               </p>
              
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
//               >
//                 Click here to resend
//               </button>
              
//               <Link
//                 href="/login"
//                 className="block text-sm text-gray-500 hover:text-gray-400 transition-colors mt-4"
//               >
//                 ← Back to Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
//       <Toaster />
      
//       <div className="max-w-md w-full">
//         {/* Back Button */}
//         <Link
//           href="/login"
//           className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors group"
//         >
//           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//           Back to Login
//         </Link>

//         {/* Main Card */}
//         <div className="bg-[#111117] border border-[#2a2a35] rounded-2xl p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-purple-600/20">
//               <Lock className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
//             <p className="text-gray-400 text-sm">
//               No worries! Enter your email and we'll send you a reset link.
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Email Address
//               </label>
//               <div className="relative group">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Sending...</span>
//                 </>
//               ) : (
//                 'Send Reset Link'
//               )}
//             </button>
//           </form>

//           {/* Security Note */}
//           <p className="text-xs text-gray-600 text-center mt-6">
//             We'll never share your email with anyone else.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }








'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Mail, ArrowLeft, CheckCircle, Sparkles, Lock, Heart, Send, AlertCircle } from 'lucide-react';
import { showToast } from '@/lib/toast';

// ✅ Design tokens matching teacher/admin dashboard
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

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
        showToast.success('Password reset link sent! Check your email.');
      } else {
        setError(data.error || 'Failed to send reset link');
        showToast.error(data.error || 'Failed to send reset link');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      showToast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-2xl p-8 text-center border"
          style={{ background: T.bgCard, borderColor: T.border }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: T.accentLight }} />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Check Your Email</h1>
          <p className="text-sm mb-4" style={{ color: T.textMuted }}>
            We've sent a password reset link to:
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl mb-6 border"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: T.border }}
          >
            <p className="font-medium break-all" style={{ color: T.accentLight }}>{email}</p>
          </motion.div>
          
          <div className="space-y-4">
            <p className="text-xs" style={{ color: T.textDim }}>
              Didn't receive the email? Check your spam folder or
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="font-medium transition-colors"
              style={{ color: T.accentLight }}
            >
              Click here to resend
            </motion.button>
            
            <Link
              href="/login"
              className="block text-xs transition-colors mt-4"
              style={{ color: T.textDim }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = T.textDim)}
            >
              ← Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <div className="max-w-md w-full">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm transition-colors group"
            style={{ color: T.textMuted }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-8 border"
          style={{ background: T.bgCard, borderColor: T.border }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: `linear-gradient(135deg, ${T.accentBg}, rgba(16,185,129,0.15))`, border: `1px solid ${T.accentBorder}` }}
            >
              <Heart className="w-7 h-7" style={{ color: T.accentLight }} />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Forgot Password?</h1>
            <p className="text-sm" style={{ color: T.textMuted }}>
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 rounded-xl flex items-center gap-2"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" style={{ color: '#ef4444' }} />
                <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: T.textMuted }}>
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors" style={{ color: T.textDim }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all border outline-none"
                  style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    borderColor: T.border,
                    color: '#fff'
                  }}
                  onFocus={e => (e.target.style.borderColor = T.accentBorder)}
                  onBlur={e => (e.target.style.borderColor = T.border)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`, color: '#fff' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Reset Link
                </>
              )}
            </motion.button>
          </form>

          {/* Security Note */}
          <p className="text-xs text-center mt-6" style={{ color: T.textDim }}>
            We'll never share your email with anyone else.
          </p>
        </motion.div>
      </div>
    </div>
  );
}