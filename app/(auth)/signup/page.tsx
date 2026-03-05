

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { User, Mail, Lock, UserPlus, Sparkles, Eye, EyeOff, Github } from 'lucide-react';

// export default function SignupPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'student' as 'student' | 'teacher'
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     };

//     if (!form.name.trim()) {
//       newErrors.name = 'Name is required';
//       valid = false;
//     }

//     if (!form.email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(form.email)) {
//       newErrors.email = 'Please enter a valid email';
//       valid = false;
//     }

//     if (!form.password) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     } else if (form.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       valid = false;
//     }

//     if (form.password !== form.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsLoading(true);

//     try {
//       // API call to signup
//       const res = await fetch('/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           role: form.role
//         })
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         // Auto login after signup
//         const loginRes = await fetch('/api/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: form.email,
//             password: form.password
//           })
//         });

//         const loginData = await loginRes.json();

//         if (loginRes.ok && loginData.success) {
//           localStorage.setItem('token', 'dummy-token');
//           localStorage.setItem('user', JSON.stringify(loginData.user));
          
//           if (loginData.user.role === 'teacher') {
//             router.push('/teacher/dashboard');
//           } else {
//             router.push('/dashboard');
//           }
//         }
//       } else {
//         alert(data.error || 'Error creating account');
//         setIsLoading(false);
//       }
//     } catch (error) {
//       alert('Network error. Please try again.');
//       setIsLoading(false);
//     }
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

//       {/* Signup Card */}
//       <div className="relative w-full max-w-md px-4 sm:px-0">
//         <div className="backdrop-blur-xl bg-[#111117]/90 rounded-3xl border border-[#2a2a35] shadow-2xl overflow-hidden">
          
//           {/* Gradient Border */}
//           <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-[#3b3b4a] to-transparent pointer-events-none"></div>
          
//           {/* Content */}
//           <div className="relative p-6 sm:p-8">
//             {/* Logo */}
//             <div className="text-center mb-6 sm:mb-8">
//               <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-600/20 mb-3 sm:mb-4 animate-float">
//                 <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
//               </div>
//               <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                 Create Account
//               </h2>
//               <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">Join QuizMaster today</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
//               {/* Name Field */}
//               <div className="group">
//                 <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//                   <input
//                     type="text"
//                     value={form.name}
//                     onChange={(e) => setForm({...form, name: e.target.value})}
//                     className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1a23] border ${
//                       errors.name ? 'border-red-500/50' : 'border-[#2a2a35]'
//                     } rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`}
//                     placeholder="Enter your full name"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div className="group">
//                 <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//                   <input
//                     type="email"
//                     value={form.email}
//                     onChange={(e) => setForm({...form, email: e.target.value})}
//                     className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1a23] border ${
//                       errors.email ? 'border-red-500/50' : 'border-[#2a2a35]'
//                     } rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`}
//                     placeholder="Enter your email"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.email}</p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="group">
//                 <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={form.password}
//                     onChange={(e) => setForm({...form, password: e.target.value})}
//                     className={`w-full pl-9 sm:pl-10 pr-12 py-2.5 sm:py-3 bg-[#1a1a23] border ${
//                       errors.password ? 'border-red-500/50' : 'border-[#2a2a35]'
//                     } rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`}
//                     placeholder="Create a password"
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.password}</p>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <div className="group">
//                 <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={form.confirmPassword}
//                     onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
//                     className={`w-full pl-9 sm:pl-10 pr-12 py-2.5 sm:py-3 bg-[#1a1a23] border ${
//                       errors.confirmPassword ? 'border-red-500/50' : 'border-[#2a2a35]'
//                     } rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`}
//                     placeholder="Confirm your password"
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.confirmPassword}</p>
//                 )}
//               </div>

//               {/* Role Selection */}
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 ml-1">
//                   I am a
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setForm({...form, role: 'student'})}
//                     className={`flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
//                       form.role === 'student'
//                         ? 'border-purple-500 bg-purple-500/10 text-purple-400'
//                         : 'border-[#2a2a35] bg-[#1a1a23] text-gray-400 hover:border-gray-500'
//                     }`}
//                     disabled={isLoading}
//                   >
//                     <span className="text-base sm:text-lg">👨‍🎓</span>
//                     <span className="text-xs sm:text-sm font-medium">Student</span>
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setForm({...form, role: 'teacher'})}
//                     className={`flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
//                       form.role === 'teacher'
//                         ? 'border-purple-500 bg-purple-500/10 text-purple-400'
//                         : 'border-[#2a2a35] bg-[#1a1a23] text-gray-400 hover:border-gray-500'
//                     }`}
//                     disabled={isLoading}
//                   >
//                     <span className="text-base sm:text-lg">👩‍🏫</span>
//                     <span className="text-xs sm:text-sm font-medium">Teacher</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] hover:from-purple-500 hover:to-blue-500 transition-all duration-300 mt-4"
//               >
//                 <div className="relative flex items-center justify-center gap-2 bg-[#0A0A0F] rounded-xl py-2.5 sm:py-3 px-4 group-hover:bg-opacity-90 transition-all">
//                   {isLoading ? (
//                     <>
//                       <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
//                       <span className="text-sm sm:text-base text-white font-medium">Creating account...</span>
//                     </>
//                   ) : (
//                     <>
//                       <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
//                       <span className="text-sm sm:text-base text-white font-medium">Sign Up</span>
//                     </>
//                   )}
//                 </div>
//               </button>
//             </form>

//             {/* Social Signup */}
//             <div className="mt-6 sm:mt-8">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-[#2a2a35]"></div>
//                 </div>
//                 <div className="relative flex justify-center text-xs sm:text-sm">
//                   <span className="px-4 bg-[#111117] text-gray-400">Or sign up with</span>
//                 </div>
//               </div>

//               <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3">
//                 <button className="flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl transition-all group">
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
//                     <path fill="#EA4335" d="M12.48 12.61v-2.36h9.76c.14.61.22 1.23.22 1.94 0 5.31-3.56 9.07-8.98 9.07-5.46 0-9.9-4.44-9.9-9.9s4.44-9.9 9.9-9.9c2.67 0 4.92.98 6.64 2.58l-2.65 2.56c-1.73-1.66-4.01-2.68-6.99-2.68-5.1 0-9.22 4.12-9.22 9.22s4.12 9.22 9.22 9.22c4.73 0 8.19-3.01 8.96-6.96h-8.96z"/>
//                   </svg>
//                   <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white">Google</span>
//                 </button>
//                 <button className="flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl transition-all group">
//                   <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white" />
//                   <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white">GitHub</span>
//                 </button>
//               </div>
//             </div>

//             {/* Login Link */}
//             <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
//               Already have an account?{' '}
//               <Link 
//                 href="/login" 
//                 className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }









'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Sparkles, Eye, EyeOff, Github, Chrome, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'teacher'
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validation, setValidation] = useState({
    name: null as boolean | null,
    email: null as boolean | null,
    password: null as boolean | null,
    confirmPassword: null as boolean | null
  });

  // Real-time validation
  useEffect(() => {
    // Name validation
    if (form.name.length > 0) {
      setValidation(prev => ({ ...prev, name: form.name.trim().length >= 2 }));
    } else {
      setValidation(prev => ({ ...prev, name: null }));
    }

    // Email validation
    if (form.email.length > 0) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      setValidation(prev => ({ ...prev, email: isValid }));
    } else {
      setValidation(prev => ({ ...prev, email: null }));
    }

    // Password validation (min 8 chars, 1 number, 1 special)
    if (form.password.length > 0) {
      const hasMinLength = form.password.length >= 8;
      const hasNumber = /\d/.test(form.password);
      const hasSpecial = /[!@#$%^&*]/.test(form.password);
      const isValid = hasMinLength && hasNumber && hasSpecial;
      setValidation(prev => ({ ...prev, password: isValid }));
    } else {
      setValidation(prev => ({ ...prev, password: null }));
    }

    // Confirm password validation
    if (form.confirmPassword.length > 0) {
      setValidation(prev => ({ 
        ...prev, 
        confirmPassword: form.password === form.confirmPassword && form.password.length > 0 
      }));
    } else {
      setValidation(prev => ({ ...prev, confirmPassword: null }));
    }
  }, [form]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    } else if (!/\d/.test(form.password)) {
      newErrors.password = 'Password must contain at least one number';
      valid = false;
    } else if (!/[!@#$%^&*]/.test(form.password)) {
      newErrors.password = 'Password must contain at least one special character';
      valid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        
        // Auto login after signup
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        });

        const loginData = await loginRes.json();

        if (loginRes.ok && loginData.success) {
          localStorage.setItem('token', loginData.token || 'dummy-token');
          localStorage.setItem('user', JSON.stringify(loginData.user));
          
          setTimeout(() => {
            if (loginData.user.role === 'teacher') {
              router.push('/teacher/dashboard');
            } else {
              router.push('/dashboard');
            }
          }, 800);
        }
      } else {
        setErrors(prev => ({ ...prev, email: data.error || 'Error creating account' }));
        setIsLoading(false);
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, email: 'Network error. Please try again.' }));
      setIsLoading(false);
    }
  };

  // Password strength indicators
  const getPasswordStrength = () => {
    if (!form.password) return null;
    
    const hasMinLength = form.password.length >= 8;
    const hasNumber = /\d/.test(form.password);
    const hasSpecial = /[!@#$%^&*]/.test(form.password);
    
    const strength = [hasMinLength, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (strength === 3) return { text: 'strong', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (strength === 2) return { text: 'medium', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    return { text: 'weak', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
  };

  const passwordStrength = getPasswordStrength();

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>
            
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
                  create account
                </h2>
                <p className="text-sm text-white/30 font-light">
                  join the ficer community
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
                      <p className="text-sm text-emerald-400 font-medium">Account created!</p>
                      <p className="text-xs text-emerald-400/60">Redirecting to dashboard...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-white/40 ml-1">
                      full name
                    </label>
                    {validation.name === true && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                      >
                        valid
                      </motion.span>
                    )}
                    {validation.name === false && (
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
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === 'name' 
                        ? 'text-indigo-400' 
                        : validation.name === true 
                          ? 'text-emerald-400' 
                          : validation.name === false 
                            ? 'text-red-400' 
                            : 'text-white/20'
                    }`} />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
                        focusedField === 'name'
                          ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
                          : validation.name === true
                            ? 'border-emerald-500/30'
                            : validation.name === false
                              ? 'border-red-500/30'
                              : 'border-white/[0.05]'
                      }`}
                      placeholder="John Doe"
                      disabled={isLoading || success}
                    />
                  </div>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-400/80 ml-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-white/40 ml-1">
                      email address
                    </label>
                    {validation.email === true && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                      >
                        valid
                      </motion.span>
                    )}
                    {validation.email === false && (
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
                        : validation.email === true 
                          ? 'text-emerald-400' 
                          : validation.email === false 
                            ? 'text-red-400' 
                            : 'text-white/20'
                    }`} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
                        focusedField === 'email'
                          ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
                          : validation.email === true
                            ? 'border-emerald-500/30'
                            : validation.email === false
                              ? 'border-red-500/30'
                              : 'border-white/[0.05]'
                      }`}
                      placeholder="you@example.com"
                      disabled={isLoading || success}
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-400/80 ml-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-white/40 ml-1">
                      password
                    </label>
                    {passwordStrength && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`text-[10px] ${passwordStrength.color} ${passwordStrength.bg} px-2 py-0.5 rounded-full border ${passwordStrength.border}`}
                      >
                        {passwordStrength.text}
                      </motion.span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === 'password' 
                        ? 'text-indigo-400' 
                        : validation.password === true 
                          ? 'text-emerald-400' 
                          : validation.password === false 
                            ? 'text-red-400' 
                            : 'text-white/20'
                    }`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({...form, password: e.target.value})}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-12 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
                        focusedField === 'password'
                          ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
                          : validation.password === true
                            ? 'border-emerald-500/30'
                            : validation.password === false
                              ? 'border-red-500/30'
                              : 'border-white/[0.05]'
                      }`}
                      placeholder="••••••••"
                      disabled={isLoading || success}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password requirements */}
                  {focusedField === 'password' && form.password.length > 0 && validation.password === false && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg"
                    >
                      <p className="text-[10px] text-white/40 mb-1">password must contain:</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-1 h-1 rounded-full ${form.password.length >= 8 ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
                          <span className={`text-[10px] ${form.password.length >= 8 ? 'text-emerald-400/60' : 'text-white/20'}`}>
                            at least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-1 h-1 rounded-full ${/\d/.test(form.password) ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
                          <span className={`text-[10px] ${/\d/.test(form.password) ? 'text-emerald-400/60' : 'text-white/20'}`}>
                            at least one number
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-1 h-1 rounded-full ${/[!@#$%^&*]/.test(form.password) ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
                          <span className={`text-[10px] ${/[!@#$%^&*]/.test(form.password) ? 'text-emerald-400/60' : 'text-white/20'}`}>
                            at least one special character (!@#$%^&*)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-400/80 ml-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-white/40 ml-1">
                      confirm password
                    </label>
                    {validation.confirmPassword === true && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                      >
                        match
                      </motion.span>
                    )}
                    {validation.confirmPassword === false && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full"
                      >
                        don't match
                      </motion.span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === 'confirmPassword' 
                        ? 'text-indigo-400' 
                        : validation.confirmPassword === true 
                          ? 'text-emerald-400' 
                          : validation.confirmPassword === false 
                            ? 'text-red-400' 
                            : 'text-white/20'
                    }`} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-12 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
                        focusedField === 'confirmPassword'
                          ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
                          : validation.confirmPassword === true
                            ? 'border-emerald-500/30'
                            : validation.confirmPassword === false
                              ? 'border-red-500/30'
                              : 'border-white/[0.05]'
                      }`}
                      placeholder="••••••••"
                      disabled={isLoading || success}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-400/80 ml-1"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/40 ml-1">
                    i am a
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setForm({...form, role: 'student'})}
                      className={`flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
                        form.role === 'student'
                          ? 'border-indigo-500/50 bg-indigo-500/10'
                          : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]'
                      }`}
                      disabled={isLoading || success}
                    >
                      <span className="text-lg">🎓</span>
                      <span className={`text-xs font-medium ${
                        form.role === 'student' ? 'text-indigo-400' : 'text-white/40'
                      }`}>student</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setForm({...form, role: 'teacher'})}
                      className={`flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
                        form.role === 'teacher'
                          ? 'border-indigo-500/50 bg-indigo-500/10'
                          : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]'
                      }`}
                      disabled={isLoading || success}
                    >
                      <span className="text-lg">👩‍🏫</span>
                      <span className={`text-xs font-medium ${
                        form.role === 'teacher' ? 'text-indigo-400' : 'text-white/40'
                      }`}>teacher</span>
                    </motion.button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || success || !validation.name || !validation.email || !validation.password || !validation.confirmPassword}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-[1px] hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4"
                >
                  <div className="relative flex items-center justify-center gap-2 bg-[#09090B] rounded-xl py-3.5 px-4 group-hover:bg-opacity-90 transition-all">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-white font-light">creating account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                        <span className="text-sm text-white font-light">create account</span>
                        <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>
              </form>

              {/* Social Signup */}
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

              {/* Login Link */}
              <p className="text-center text-xs text-white/20 mt-6">
                already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  sign in
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