



// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { User, Mail, Lock, UserPlus, Sparkles, Eye, EyeOff, Github, Chrome, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

// export default function SignupPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
  
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

//   const [validation, setValidation] = useState({
//     name: null as boolean | null,
//     email: null as boolean | null,
//     password: null as boolean | null,
//     confirmPassword: null as boolean | null
//   });

//   // Real-time validation
//   useEffect(() => {
//     // Name validation
//     if (form.name.length > 0) {
//       setValidation(prev => ({ ...prev, name: form.name.trim().length >= 2 }));
//     } else {
//       setValidation(prev => ({ ...prev, name: null }));
//     }

//     // Email validation
//     if (form.email.length > 0) {
//       const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
//       setValidation(prev => ({ ...prev, email: isValid }));
//     } else {
//       setValidation(prev => ({ ...prev, email: null }));
//     }

//     // Password validation (min 8 chars, 1 number, 1 special)
//     if (form.password.length > 0) {
//       const hasMinLength = form.password.length >= 8;
//       const hasNumber = /\d/.test(form.password);
//       const hasSpecial = /[!@#$%^&*]/.test(form.password);
//       const isValid = hasMinLength && hasNumber && hasSpecial;
//       setValidation(prev => ({ ...prev, password: isValid }));
//     } else {
//       setValidation(prev => ({ ...prev, password: null }));
//     }

//     // Confirm password validation
//     if (form.confirmPassword.length > 0) {
//       setValidation(prev => ({ 
//         ...prev, 
//         confirmPassword: form.password === form.confirmPassword && form.password.length > 0 
//       }));
//     } else {
//       setValidation(prev => ({ ...prev, confirmPassword: null }));
//     }
//   }, [form]);

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
//     } else if (form.name.trim().length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
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
//     } else if (form.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//       valid = false;
//     } else if (!/\d/.test(form.password)) {
//       newErrors.password = 'Password must contain at least one number';
//       valid = false;
//     } else if (!/[!@#$%^&*]/.test(form.password)) {
//       newErrors.password = 'Password must contain at least one special character';
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
//         setSuccess(true);
        
//         // Auto login after signup
//         const loginRes = await fetch('/api/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: form.email,
//             password: form.password
//           })
//         });

//         const loginData = await loginRes.json();

//         if (loginRes.ok && loginData.success) {
//           localStorage.setItem('token', loginData.token || 'dummy-token');
//           localStorage.setItem('user', JSON.stringify(loginData.user));
          
//           setTimeout(() => {
//             if (loginData.user.role === 'teacher') {
//               router.push('/teacher/dashboard');
//             } else {
//               router.push('/dashboard');
//             }
//           }, 800);
//         }
//       } else {
//         setErrors(prev => ({ ...prev, email: data.error || 'Error creating account' }));
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setErrors(prev => ({ ...prev, email: 'Network error. Please try again.' }));
//       setIsLoading(false);
//     }
//   };

//   // Password strength indicators
//   const getPasswordStrength = () => {
//     if (!form.password) return null;
    
//     const hasMinLength = form.password.length >= 8;
//     const hasNumber = /\d/.test(form.password);
//     const hasSpecial = /[!@#$%^&*]/.test(form.password);
    
//     const strength = [hasMinLength, hasNumber, hasSpecial].filter(Boolean).length;
    
//     if (strength === 3) return { text: 'strong', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
//     if (strength === 2) return { text: 'medium', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
//     return { text: 'weak', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
//   };

//   const passwordStrength = getPasswordStrength();

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
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative"
//         >
//           {/* Glass Card */}
//           <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-2xl overflow-hidden">
//             <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>
            
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
//                   create account
//                 </h2>
//                 <p className="text-sm text-white/30 font-light">
//                   join the ficer community
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
//                       <p className="text-sm text-emerald-400 font-medium">Account created!</p>
//                       <p className="text-xs text-emerald-400/60">Redirecting to dashboard...</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Name Field */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <label className="text-xs font-medium text-white/40 ml-1">
//                       full name
//                     </label>
//                     {validation.name === true && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
//                       >
//                         valid
//                       </motion.span>
//                     )}
//                     {validation.name === false && (
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
//                     <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
//                       focusedField === 'name' 
//                         ? 'text-indigo-400' 
//                         : validation.name === true 
//                           ? 'text-emerald-400' 
//                           : validation.name === false 
//                             ? 'text-red-400' 
//                             : 'text-white/20'
//                     }`} />
//                     <input
//                       type="text"
//                       value={form.name}
//                       onChange={(e) => setForm({...form, name: e.target.value})}
//                       onFocus={() => setFocusedField('name')}
//                       onBlur={() => setFocusedField(null)}
//                       className={`w-full pl-10 pr-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
//                         focusedField === 'name'
//                           ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
//                           : validation.name === true
//                             ? 'border-emerald-500/30'
//                             : validation.name === false
//                               ? 'border-red-500/30'
//                               : 'border-white/[0.05]'
//                       }`}
//                       placeholder="John Doe"
//                       disabled={isLoading || success}
//                     />
//                   </div>
//                   {errors.name && (
//                     <motion.p 
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-xs text-red-400/80 ml-1"
//                     >
//                       {errors.name}
//                     </motion.p>
//                   )}
//                 </div>

//                 {/* Email Field */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <label className="text-xs font-medium text-white/40 ml-1">
//                       email address
//                     </label>
//                     {validation.email === true && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
//                       >
//                         valid
//                       </motion.span>
//                     )}
//                     {validation.email === false && (
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
//                         : validation.email === true 
//                           ? 'text-emerald-400' 
//                           : validation.email === false 
//                             ? 'text-red-400' 
//                             : 'text-white/20'
//                     }`} />
//                     <input
//                       type="email"
//                       value={form.email}
//                       onChange={(e) => setForm({...form, email: e.target.value})}
//                       onFocus={() => setFocusedField('email')}
//                       onBlur={() => setFocusedField(null)}
//                       className={`w-full pl-10 pr-4 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
//                         focusedField === 'email'
//                           ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
//                           : validation.email === true
//                             ? 'border-emerald-500/30'
//                             : validation.email === false
//                               ? 'border-red-500/30'
//                               : 'border-white/[0.05]'
//                       }`}
//                       placeholder="you@example.com"
//                       disabled={isLoading || success}
//                     />
//                   </div>
//                   {errors.email && (
//                     <motion.p 
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-xs text-red-400/80 ml-1"
//                     >
//                       {errors.email}
//                     </motion.p>
//                   )}
//                 </div>

//                 {/* Password Field */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <label className="text-xs font-medium text-white/40 ml-1">
//                       password
//                     </label>
//                     {passwordStrength && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className={`text-[10px] ${passwordStrength.color} ${passwordStrength.bg} px-2 py-0.5 rounded-full border ${passwordStrength.border}`}
//                       >
//                         {passwordStrength.text}
//                       </motion.span>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
//                       focusedField === 'password' 
//                         ? 'text-indigo-400' 
//                         : validation.password === true 
//                           ? 'text-emerald-400' 
//                           : validation.password === false 
//                             ? 'text-red-400' 
//                             : 'text-white/20'
//                     }`} />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={form.password}
//                       onChange={(e) => setForm({...form, password: e.target.value})}
//                       onFocus={() => setFocusedField('password')}
//                       onBlur={() => setFocusedField(null)}
//                       className={`w-full pl-10 pr-12 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
//                         focusedField === 'password'
//                           ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
//                           : validation.password === true
//                             ? 'border-emerald-500/30'
//                             : validation.password === false
//                               ? 'border-red-500/30'
//                               : 'border-white/[0.05]'
//                       }`}
//                       placeholder="••••••••"
//                       disabled={isLoading || success}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
//                     >
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>

//                   {/* Password requirements */}
//                   {focusedField === 'password' && form.password.length > 0 && validation.password === false && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: -5 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="mt-2 p-2 bg-white/[0.02] border border-white/[0.05] rounded-lg"
//                     >
//                       <p className="text-[10px] text-white/40 mb-1">password must contain:</p>
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <div className={`w-1 h-1 rounded-full ${form.password.length >= 8 ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
//                           <span className={`text-[10px] ${form.password.length >= 8 ? 'text-emerald-400/60' : 'text-white/20'}`}>
//                             at least 8 characters
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <div className={`w-1 h-1 rounded-full ${/\d/.test(form.password) ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
//                           <span className={`text-[10px] ${/\d/.test(form.password) ? 'text-emerald-400/60' : 'text-white/20'}`}>
//                             at least one number
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <div className={`w-1 h-1 rounded-full ${/[!@#$%^&*]/.test(form.password) ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
//                           <span className={`text-[10px] ${/[!@#$%^&*]/.test(form.password) ? 'text-emerald-400/60' : 'text-white/20'}`}>
//                             at least one special character (!@#$%^&*)
//                           </span>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {errors.password && (
//                     <motion.p 
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-xs text-red-400/80 ml-1"
//                     >
//                       {errors.password}
//                     </motion.p>
//                   )}
//                 </div>

//                 {/* Confirm Password Field */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <label className="text-xs font-medium text-white/40 ml-1">
//                       confirm password
//                     </label>
//                     {validation.confirmPassword === true && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="text-[10px] text-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 rounded-full"
//                       >
//                         match
//                       </motion.span>
//                     )}
//                     {validation.confirmPassword === false && (
//                       <motion.span 
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full"
//                       >
//                         don't match
//                       </motion.span>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
//                       focusedField === 'confirmPassword' 
//                         ? 'text-indigo-400' 
//                         : validation.confirmPassword === true 
//                           ? 'text-emerald-400' 
//                           : validation.confirmPassword === false 
//                             ? 'text-red-400' 
//                             : 'text-white/20'
//                     }`} />
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       value={form.confirmPassword}
//                       onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
//                       onFocus={() => setFocusedField('confirmPassword')}
//                       onBlur={() => setFocusedField(null)}
//                       className={`w-full pl-10 pr-12 py-3 bg-white/[0.02] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
//                         focusedField === 'confirmPassword'
//                           ? 'border-indigo-500/50 ring-2 ring-indigo-500/10'
//                           : validation.confirmPassword === true
//                             ? 'border-emerald-500/30'
//                             : validation.confirmPassword === false
//                               ? 'border-red-500/30'
//                               : 'border-white/[0.05]'
//                       }`}
//                       placeholder="••••••••"
//                       disabled={isLoading || success}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
//                     >
//                       {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   {errors.confirmPassword && (
//                     <motion.p 
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-xs text-red-400/80 ml-1"
//                     >
//                       {errors.confirmPassword}
//                     </motion.p>
//                   )}
//                 </div>

//                 {/* Role Selection */}
//                 <div className="space-y-2">
//                   <label className="text-xs font-medium text-white/40 ml-1">
//                     i am a
//                   </label>
//                   <div className="grid grid-cols-2 gap-3">
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setForm({...form, role: 'student'})}
//                       className={`flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
//                         form.role === 'student'
//                           ? 'border-indigo-500/50 bg-indigo-500/10'
//                           : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]'
//                       }`}
//                       disabled={isLoading || success}
//                     >
//                       <span className="text-lg">🎓</span>
//                       <span className={`text-xs font-medium ${
//                         form.role === 'student' ? 'text-indigo-400' : 'text-white/40'
//                       }`}>student</span>
//                     </motion.button>
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setForm({...form, role: 'teacher'})}
//                       className={`flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
//                         form.role === 'teacher'
//                           ? 'border-indigo-500/50 bg-indigo-500/10'
//                           : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]'
//                       }`}
//                       disabled={isLoading || success}
//                     >
//                       <span className="text-lg">👩‍🏫</span>
//                       <span className={`text-xs font-medium ${
//                         form.role === 'teacher' ? 'text-indigo-400' : 'text-white/40'
//                       }`}>teacher</span>
//                     </motion.button>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   type="submit"
//                   disabled={isLoading || success || !validation.name || !validation.email || !validation.password || !validation.confirmPassword}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-[1px] hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4"
//                 >
//                   <div className="relative flex items-center justify-center gap-2 bg-[#09090B] rounded-xl py-3.5 px-4 group-hover:bg-opacity-90 transition-all">
//                     {isLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
//                         <span className="text-sm text-white font-light">creating account...</span>
//                       </>
//                     ) : (
//                       <>
//                         <UserPlus className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
//                         <span className="text-sm text-white font-light">create account</span>
//                         <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors group-hover:translate-x-1 transition-transform" />
//                       </>
//                     )}
//                   </div>
//                 </motion.button>
//               </form>

//               {/* Social Signup */}
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

//               {/* Login Link */}
//               <p className="text-center text-xs text-white/20 mt-6">
//                 already have an account?{' '}
//                 <Link 
//                   href="/login" 
//                   className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
//                 >
//                   sign in
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

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, CheckCircle, BookOpen } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student' as 'student' | 'teacher'
  });

  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const [validation, setValidation] = useState({
    name: null as boolean | null,
    email: null as boolean | null,
    password: null as boolean | null,
    confirmPassword: null as boolean | null
  });

  // Real-time validation — preserved from original
  useEffect(() => {
    setValidation(prev => ({
      ...prev,
      name: form.name.length > 0 ? form.name.trim().length >= 2 : null,
      email: form.email.length > 0 ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) : null,
      password: form.password.length > 0
        ? form.password.length >= 8 && /\d/.test(form.password) && /[!@#$%^&*]/.test(form.password)
        : null,
      confirmPassword: form.confirmPassword.length > 0
        ? form.password === form.confirmPassword && form.password.length > 0
        : null,
    }));
  }, [form]);

  const validateForm = () => {
    const e = { name: '', email: '', password: '', confirmPassword: '' };
    let valid = true;
    if (!form.name.trim()) { e.name = 'Name is required'; valid = false; }
    else if (form.name.trim().length < 2) { e.name = 'Name must be at least 2 characters'; valid = false; }
    if (!form.email.trim()) { e.email = 'Email is required'; valid = false; }
    else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; valid = false; }
    if (!form.password) { e.password = 'Password is required'; valid = false; }
    else if (form.password.length < 8) { e.password = 'Minimum 8 characters'; valid = false; }
    else if (!/\d/.test(form.password)) { e.password = 'Must contain at least one number'; valid = false; }
    else if (!/[!@#$%^&*]/.test(form.password)) { e.password = 'Must contain a special character (!@#$%^&*)'; valid = false; }
    if (form.password !== form.confirmPassword) { e.confirmPassword = 'Passwords do not match'; valid = false; }
    setErrors(e);
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
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password })
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.success) {
          localStorage.setItem('token', loginData.token || 'dummy-token');
          localStorage.setItem('user', JSON.stringify(loginData.user));
          setTimeout(() => router.push(loginData.user.role === 'teacher' ? '/teacher/dashboard' : '/dashboard'), 900);
        }
      } else {
        setErrors(prev => ({ ...prev, email: data.error || 'Error creating account' }));
        setIsLoading(false);
      }
    } catch {
      setErrors(prev => ({ ...prev, email: 'Network error. Try again.' }));
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!form.password) return null;
    const s = [form.password.length >= 8, /\d/.test(form.password), /[!@#$%^&*]/.test(form.password)].filter(Boolean).length;
    if (s === 3) return { text: 'Strong', w: 'w-full', color: 'bg-emerald-400', label: 'text-emerald-400' };
    if (s === 2) return { text: 'Medium', w: 'w-2/3', color: 'bg-amber-400', label: 'text-amber-400' };
    return { text: 'Weak', w: 'w-1/3', color: 'bg-red-400', label: 'text-red-400' };
  };
  const strength = getPasswordStrength();

  // Field border helper
  const fieldBorder = (field: keyof typeof validation, focusKey: string) => {
    if (focusedField === focusKey) return 'border-amber-500/35 bg-amber-400/[0.04] shadow-[0_0_0_3px_rgba(212,170,80,0.07)]';
    if (validation[field] === true) return 'border-emerald-500/30 bg-emerald-400/[0.02]';
    if (validation[field] === false) return 'border-red-500/25';
    return 'border-white/[0.07] hover:border-white/[0.12]';
  };

  const iconColor = (field: keyof typeof validation, focusKey: string) => {
    if (focusedField === focusKey) return 'text-amber-400';
    if (validation[field] === true) return 'text-emerald-400';
    if (validation[field] === false) return 'text-red-400/60';
    return 'text-white/18';
  };

  return (
    <div className="min-h-screen bg-[#080809] flex overflow-hidden" style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>

      {/* ─── Left decorative panel (desktop) ─── */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-14 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 70% at 10% 50%, rgba(168,130,60,0.09) 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 90% 90%, rgba(100,70,200,0.06) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="absolute right-0 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <GraduationCap className="w-5 h-5 text-[#080809]" />
          </div>
          <span className="text-white/70 font-semibold text-sm tracking-wide">QuizPortal</span>
        </div>

        {/* Hero */}
        <div className="relative z-10 space-y-7">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500/50 mb-5 font-semibold">Join the Community</p>
            <h2 className="text-[2.5rem] font-bold text-white/90 leading-[1.1] tracking-tight">
              Start your<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #d4a850 0%, #f0c96a 50%, #c49030 100%)' }}>
                learning journey.
              </span>
            </h2>
            <p className="text-sm text-white/28 mt-4 leading-relaxed max-w-xs">
              Join thousands of students and teachers already using QuizPortal.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: '10K+', label: 'Students' },
              { val: '500+', label: 'Teachers' },
              { val: '25K+', label: 'Quizzes' },
              { val: '98%', label: 'Satisfaction' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                <p className="text-lg font-bold text-amber-400/80">{s.val}</p>
                <p className="text-[11px] text-white/28">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 border-l-2 border-amber-500/20 pl-4">
          <p className="text-xs text-white/18 italic leading-relaxed">"Education is the passport to the future,<br />for tomorrow belongs to those who prepare for it today."</p>
          <p className="text-[10px] text-white/12 mt-2">— Malcolm X</p>
        </div>
      </div>

      {/* ─── Right form panel ─── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative overflow-y-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(168,130,60,0.05),transparent)]" />

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8 relative z-10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-[#080809]" />
          </div>
          <span className="text-white/70 font-semibold text-sm">QuizPortal</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="w-full max-w-[410px] relative z-10">

          <div className="mb-7">
            <h1 className="text-[1.7rem] font-bold text-white tracking-tight leading-tight mb-2">Create your account</h1>
            <p className="text-sm text-white/32">Free forever. No credit card needed.</p>
          </div>

          {/* Success banner */}
          <AnimatePresence>
            {success && (
              <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-5 px-4 py-3.5 rounded-xl bg-emerald-500/8 border border-emerald-500/18 flex items-center gap-3">
                <div className="w-7 h-7 bg-emerald-500/15 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-emerald-400 font-semibold">Account created!</p>
                  <p className="text-xs text-emerald-400/55">Redirecting to your dashboard…</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Role toggle — placed at top for context */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">I am a</label>
              <div className="grid grid-cols-2 gap-2.5">
                {(['student', 'teacher'] as const).map(r => (
                  <motion.button key={r} type="button" whileTap={{ scale: 0.97 }}
                    onClick={() => setForm(p => ({ ...p, role: r }))}
                    disabled={isLoading || success}
                    className={`relative flex flex-col items-center gap-1.5 py-3.5 px-4 rounded-xl border transition-all duration-200 overflow-hidden ${
                      form.role === r
                        ? 'border-amber-500/40 bg-amber-400/[0.07]'
                        : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12]'
                    }`}>
                    {form.role === r && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 w-4 h-4 bg-amber-400/20 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      </motion.div>
                    )}
                    <span className="text-xl">{r === 'student' ? '🎓' : '📚'}</span>
                    <span className={`text-xs font-semibold capitalize transition-colors ${form.role === r ? 'text-amber-400' : 'text-white/35'}`}>{r}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Full Name</label>
                {validation.name === true && <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] text-emerald-400/70 bg-emerald-500/10 px-2 py-0.5 rounded-full">✓ valid</motion.span>}
                {validation.name === false && <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full">too short</motion.span>}
              </div>
              <div className="relative">
                <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${iconColor('name', 'name')}`} />
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                  placeholder="Ali Hassan" disabled={isLoading || success}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white/90 placeholder:text-white/18 bg-white/[0.03] border outline-none transition-all duration-200 disabled:opacity-50 ${fieldBorder('name', 'name')}`} />
              </div>
              {errors.name && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400/65 pl-1">{errors.name}</motion.p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Email</label>
                {validation.email === true && <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] text-emerald-400/70 bg-emerald-500/10 px-2 py-0.5 rounded-full">✓ valid</motion.span>}
                {validation.email === false && <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full">invalid format</motion.span>}
              </div>
              <div className="relative">
                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${iconColor('email', 'email')}`} />
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com" disabled={isLoading || success}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white/90 placeholder:text-white/18 bg-white/[0.03] border outline-none transition-all duration-200 disabled:opacity-50 ${fieldBorder('email', 'email')}`} />
              </div>
              {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400/65 pl-1">{errors.email}</motion.p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Password</label>
                {strength && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-[10px] ${strength.label} bg-white/[0.04] px-2 py-0.5 rounded-full`}>{strength.text}</motion.span>}
              </div>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${iconColor('password', 'password')}`} />
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                  placeholder="••••••••" disabled={isLoading || success}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white/90 placeholder:text-white/18 bg-white/[0.03] border outline-none transition-all duration-200 disabled:opacity-50 ${fieldBorder('password', 'password')}`} />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors p-0.5">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {form.password && (
                <div className="flex items-center gap-2 px-1">
                  <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: strength?.w || '0%' }} className={`h-full rounded-full transition-all duration-500 ${strength?.color}`} />
                  </div>
                </div>
              )}
              {/* Requirements tooltip */}
              <AnimatePresence>
                {focusedField === 'password' && form.password.length > 0 && validation.password === false && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-1 px-3 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-1.5">
                    {[
                      { rule: 'At least 8 characters', ok: form.password.length >= 8 },
                      { rule: 'Contains a number', ok: /\d/.test(form.password) },
                      { rule: 'Contains special char (!@#$%^&*)', ok: /[!@#$%^&*]/.test(form.password) },
                    ].map(r => (
                      <div key={r.rule} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${r.ok ? 'bg-emerald-400' : 'bg-white/20'}`} />
                        <span className={`text-[11px] transition-colors ${r.ok ? 'text-emerald-400/70' : 'text-white/25'}`}>{r.rule}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400/65 pl-1">{errors.password}</motion.p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Confirm Password</label>
                {validation.confirmPassword === true && <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] text-emerald-400/70 bg-emerald-500/10 px-2 py-0.5 rounded-full">✓ match</motion.span>}
                {validation.confirmPassword === false && <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] text-red-400/60 bg-red-500/10 px-2 py-0.5 rounded-full">no match</motion.span>}
              </div>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${iconColor('confirmPassword', 'confirmPassword')}`} />
                <input type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword}
                  onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                  onFocus={() => setFocusedField('confirmPassword')} onBlur={() => setFocusedField(null)}
                  placeholder="••••••••" disabled={isLoading || success}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white/90 placeholder:text-white/18 bg-white/[0.03] border outline-none transition-all duration-200 disabled:opacity-50 ${fieldBorder('confirmPassword', 'confirmPassword')}`} />
                <button type="button" onClick={() => setShowConfirmPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors p-0.5">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400/65 pl-1">{errors.confirmPassword}</motion.p>}
            </div>

            {/* Submit */}
            <div className="pt-1">
              <motion.button type="submit"
                disabled={isLoading || success || validation.name === false || validation.email === false || validation.password === false || validation.confirmPassword === false}
                whileHover={{ scale: (isLoading || success) ? 1 : 1.015 }}
                whileTap={{ scale: (isLoading || success) ? 1 : 0.985 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: (isLoading || success) ? 'rgba(212,170,80,0.15)' : 'linear-gradient(135deg, #c9953a 0%, #e8bb55 50%, #c08028 100%)', color: (isLoading || success) ? 'rgba(212,170,80,0.6)' : '#080809', boxShadow: (isLoading || success) ? 'none' : '0 4px 28px rgba(200,150,50,0.22), 0 1px 0 rgba(255,220,100,0.3) inset' }}>
                {isLoading ? (
                  <><div className="w-4 h-4 border-2 border-amber-400/35 border-t-amber-400 rounded-full animate-spin" /><span>Creating account…</span></>
                ) : success ? (
                  <><CheckCircle className="w-4 h-4" /><span>Done! Redirecting…</span></>
                ) : (
                  <><span>Create account</span><ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-[10px] text-white/18 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Google', icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)"/><path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)"/><path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z"/><path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z"/></svg> },
              { label: 'GitHub', icon: <svg className="w-4 h-4 text-white/38" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
            ].map(s => (
              <button key={s.label} type="button" className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all text-sm text-white/35 hover:text-white/58">
                {s.icon}{s.label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-white/22 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-400/65 hover:text-amber-400/90 transition-colors font-semibold">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}