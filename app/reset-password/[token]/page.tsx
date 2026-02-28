// 'use client';

// import { useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';
// import { Toaster } from 'react-hot-toast';
// import { Lock, Eye, EyeOff, CheckCircle, Sparkles } from 'lucide-react';
// import { showToast } from '@/lib/toast';

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
//   const [countdown, setCountdown] = useState(5);

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
//   const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];

//   // Redirect countdown
//   if (reset && countdown > 0) {
//     setTimeout(() => setCountdown(countdown - 1), 1000);
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (password.length < 6) {
//       showToast.error('Password must be at least 6 characters');
//       return;
//     }

//     if (password !== confirmPassword) {
//       showToast.error('Passwords do not match');
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
        
//         // Redirect to login after countdown
//         setTimeout(() => router.push('/login'), 5000);
//       } else {
//         showToast.error(data.error || 'Failed to reset password');
//       }
//     } catch (error) {
//       showToast.error('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (reset) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CheckCircle className="w-8 h-8 text-green-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h1>
//           <p className="text-gray-600 mb-6">
//             Your password has been successfully reset. You can now login with your new password.
//           </p>
//           <div className="space-y-4">
//             <div className="text-sm text-gray-500">
//               Redirecting to login in {countdown} seconds...
//             </div>
//             <Link
//               href="/login"
//               className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
//             >
//               Go to Login Now
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
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mb-4">
//             <Sparkles className="w-6 h-6 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
//           <p className="text-gray-600 text-sm mt-2">
//             Enter your new password below.
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* New Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               New Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
//                 placeholder="Enter new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
            
//             {/* Password Strength Meter */}
//             {password.length > 0 && (
//               <div className="mt-2">
//                 <div className="flex gap-1 h-1 mb-1">
//                   {[1, 2, 3].map((level) => (
//                     <div
//                       key={level}
//                       className={`flex-1 rounded-full transition-all ${
//                         level <= strength ? strengthColor[strength] : 'bg-gray-200'
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <p className={`text-xs ${strengthColor[strength].replace('bg-', 'text-')}`}>
//                   {strengthText[strength]} password
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
//                 placeholder="Confirm new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
//             {confirmPassword && password !== confirmPassword && (
//               <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Resetting...</span>
//               </>
//             ) : (
//               'Reset Password'
//             )}
//           </button>
//         </form>

//         {/* Back to Login */}
//         <p className="text-center text-sm text-gray-600 mt-6">
//           Remember your password?{' '}
//           <Link 
//             href="/login" 
//             className="text-gray-900 font-medium hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }






'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { Lock, Eye, EyeOff, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { showToast } from '@/lib/toast';

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

  // Check if token exists
  useEffect(() => {
    if (!token) {
      setValidToken(false);
      setError('Invalid reset link');
    }
  }, [token]);

  // Password strength check
  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    if (password.match(/^(?=.*[A-Z])(?=.*[0-9])/)) return 3;
    return 2;
  };

  const strength = getPasswordStrength();
  const strengthText = ['', 'Weak', 'Medium', 'Strong'];
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];

  // Redirect countdown
  useEffect(() => {
    if (reset && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (reset && countdown === 0) {
      router.push('/login');
    }
  }, [reset, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

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
    } catch (error) {
      setError('Network error. Please try again.');
      showToast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#111117] border border-[#2a2a35] rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Invalid Reset Link</h1>
          <p className="text-gray-400 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  if (reset) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#111117] border border-[#2a2a35] rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Password Reset!</h1>
          <p className="text-gray-400 mb-6">
            Your password has been successfully reset. You can now login with your new password.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Redirecting to login in {countdown} seconds...
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              Go to Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
      <Toaster />
      
      <div className="max-w-md w-full bg-[#111117] border border-[#2a2a35] rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-purple-600/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400 text-sm">
            Enter your new password below.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password Strength Meter */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 h-1 mb-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 rounded-full transition-all ${
                        level <= strength ? strengthColor[strength] : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs ${strengthColor[strength].replace('bg-', 'text-')}`}>
                  {strengthText[strength]} password
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 bg-[#1a1a23] border border-[#2a2a35] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Resetting...</span>
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{' '}
          <Link 
            href="/login" 
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}