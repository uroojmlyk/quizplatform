// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';
// import { Mail, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
// import { showToast } from '@/lib/toast';

// export default function ForgotPasswordPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const [canResend, setCanResend] = useState(true);

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
//         setCanResend(false);
//         showToast.success('Password reset link sent! Check your email.');
        
//         // Start countdown for resend
//         let timer = 60;
//         const interval = setInterval(() => {
//           timer -= 1;
//           setCountdown(timer);
//           if (timer === 0) {
//             clearInterval(interval);
//             setCanResend(true);
//             setCountdown(60);
//           }
//         }, 1000);
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
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Mail className="w-8 h-8 text-green-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
//           <p className="text-gray-600 mb-4">
//             We've sent a password reset link to:
//           </p>
//           <p className="text-lg font-medium text-gray-900 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
//             {email}
//           </p>
//           <div className="space-y-4">
//             <p className="text-sm text-gray-500">
//               Didn't receive the email? Check your spam folder or
//             </p>
//             {canResend ? (
//               <button
//                 onClick={handleSubmit}
//                 className="text-purple-600 hover:text-purple-700 font-medium"
//               >
//                 Click here to resend
//               </button>
//             ) : (
//               <p className="text-sm text-gray-400">
//                 Resend available in {countdown} seconds
//               </p>
//             )}
//             <Link
//               href="/login"
//               className="block text-sm text-gray-600 hover:text-gray-900 mt-4"
//             >
//               Back to Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <Toaster />
      
//       <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
//         {/* Back Button */}
//         <Link
//           href="/login"
//           className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Login
//         </Link>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mb-4">
//             <Sparkles className="w-6 h-6 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
//           <p className="text-gray-600 text-sm mt-2">
//             No worries! Enter your email and we'll send you a reset link.
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Sending...</span>
//               </>
//             ) : (
//               'Send Reset Link'
//             )}
//           </button>
//         </form>

//         {/* Security Note */}
//         <p className="text-xs text-gray-400 text-center mt-6">
//           We'll never share your email with anyone else.
//         </p>
//       </div>
//     </div>
//   );
// }








'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { Mail, ArrowLeft, CheckCircle, Sparkles, Lock } from 'lucide-react';
import { showToast } from '@/lib/toast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        showToast.error(data.error || 'Failed to send reset link');
      }
    } catch (error) {
      showToast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-[#111117] border border-[#2a2a35] rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-gray-400 mb-4">
              We've sent a password reset link to:
            </p>
            
            <div className="bg-[#1a1a23] border border-[#2a2a35] rounded-xl p-4 mb-6">
              <p className="text-purple-400 font-medium break-all">{email}</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or
              </p>
              
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Click here to resend
              </button>
              
              <Link
                href="/login"
                className="block text-sm text-gray-500 hover:text-gray-400 transition-colors mt-4"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
      <Toaster />
      
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        {/* Main Card */}
        <div className="bg-[#111117] border border-[#2a2a35] rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-purple-600/20">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
            <p className="text-gray-400 text-sm">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Security Note */}
          <p className="text-xs text-gray-600 text-center mt-6">
            We'll never share your email with anyone else.
          </p>
        </div>
      </div>
    </div>
  );
}