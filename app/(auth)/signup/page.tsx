



// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2, CheckCircle } from 'lucide-react';

// // ── Design tokens (same as login) ─────────────────────────────────
// const T = {
//   bg: '#060809',
//   accent: '#10b981',
//   accentHover: '#34d399',
//   accentBg: 'rgba(16,185,129,0.07)',
//   accentBorder: 'rgba(16,185,129,0.22)',
//   accentGlow: 'rgba(16,185,129,0.18)',
//   focusShadow: '0 0 0 3px rgba(16,185,129,0.1)',
//   cardBorder: 'rgba(255,255,255,0.07)',
//   textMuted: 'rgba(255,255,255,0.32)',
//   textDim: 'rgba(255,255,255,0.18)',
// };

// // ── Reusable input (identical to login) ───────────────────────────
// function AuthInput({ label, icon: Icon, error, isFocused, isValid, rightSlot, ...props }: {
//   label: string; icon: any; error?: string;
//   isFocused?: boolean; isValid?: boolean | null;
//   rightSlot?: React.ReactNode; [k: string]: any;
// }) {
//   const border = isFocused ? T.accentBorder : error ? 'rgba(239,68,68,0.3)' : isValid ? 'rgba(16,185,129,0.2)' : T.cardBorder;
//   const iconClr = isFocused ? T.accentHover : error ? 'rgba(239,68,68,0.5)' : isValid ? T.accent : 'rgba(255,255,255,0.2)';
//   return (
//     <div className="space-y-1.5">
//       <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
//         {label}
//       </label>
//       <div className="relative">
//         <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-150"
//           style={{ color: iconClr }} />
//         <input {...props}
//           className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
//           style={{
//             background: isFocused ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.03)',
//             border: `1px solid ${border}`,
//             color: 'rgba(255,255,255,0.88)',
//             boxShadow: isFocused ? T.focusShadow : 'none',
//             caretColor: T.accentHover,
//           }} />
//         {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
//       </div>
//       <AnimatePresence mode="wait">
//         {error && (
//           <motion.p key="e" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
//             className="text-[11px] pl-1" style={{ color: 'rgba(239,68,68,0.75)' }}>
//             {error}
//           </motion.p>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ── Left branding panel ───────────────────────────────────────────
// function BrandPanel() {
//   const stats = [
//     { val: '10K+', label: 'Students' },
//     { val: '500+', label: 'Teachers' },
//     { val: '25K+', label: 'Quizzes' },
//     { val: '98%', label: 'Satisfaction' },
//   ];

//   return (
//     <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-14 overflow-hidden">
//       <div className="absolute inset-0"
//         style={{ background: `radial-gradient(ellipse 80% 60% at 0% 50%, ${T.accentGlow} 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 100% 90%, rgba(16,185,129,0.05) 0%, transparent 60%)` }} />
//       <div className="hidden sm:block absolute inset-0 opacity-[0.015]"
//         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
//       <div className="absolute right-0 top-16 bottom-16 w-px"
//         style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }} />

//       {/* Logo */}
//       <div className="relative z-10 flex items-center gap-3">
//         <div className="w-9 h-9 rounded-xl flex items-center justify-center"
//           style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover})`, boxShadow: `0 0 20px ${T.accentGlow}` }}>
//           <Sparkles style={{ width: 18, height: 18, color: '#fff' }} />
//         </div>
//         <span className="text-sm font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.65)' }}>QuizPortal</span>
//       </div>

//       {/* Hero */}
//       <div className="relative z-10 space-y-8">
//         <div>
//           <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: `${T.accentHover}55` }}>
//             Join the Community
//           </p>
//           <h2 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-4"
//             style={{ color: 'rgba(255,255,255,0.88)' }}>
//             Start your<br />
//             <span style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               learning journey.
//             </span>
//           </h2>
//           <p className="text-sm leading-relaxed max-w-xs" style={{ color: T.textMuted }}>
//             Join thousands of students and teachers already using QuizPortal.
//           </p>
//         </div>

//         {/* Features */}
//         <div className="space-y-3">
//           {['Free forever — no credit card needed', 'Create unlimited quizzes with AI', 'Share with students in one click'].map((f, i) => (
//             <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3">
//               <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
//                 style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//                 <CheckCircle2 style={{ width: 11, height: 11, color: T.accent }} />
//               </div>
//               <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{f}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Stats grid */}
//         <div className="grid grid-cols-2 gap-3">
//           {stats.map((s, i) => (
//             <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 + i * 0.08 }}
//               className="rounded-xl p-3"
//               style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//               <p className="text-lg font-bold" style={{ color: T.accentHover }}>{s.val}</p>
//               <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Quote */}
//       <div className="relative z-10 pl-4" style={{ borderLeft: `2px solid ${T.accentBorder}` }}>
//         <p className="text-xs italic leading-relaxed" style={{ color: T.textDim }}>
//           "Education is the passport to the future,<br />for tomorrow belongs to those who prepare."
//         </p>
//         <p className="text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.1)' }}>— Malcolm X</p>
//       </div>
//     </div>
//   );
// }

// // ── SIGNUP PAGE ───────────────────────────────────────────────────
// export default function SignupPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     name: '', email: '', password: '', confirmPassword: '',
//     role: 'student' as 'student' | 'teacher',
//   });

//   const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

//   const [validation, setValidation] = useState({
//     name: null as boolean | null,
//     email: null as boolean | null,
//     password: null as boolean | null,
//     confirmPassword: null as boolean | null,
//   });

//   // Real-time validation — preserved exactly from original
//   useEffect(() => {
//     setValidation(prev => ({
//       ...prev,
//       name: form.name.length > 0 ? form.name.trim().length >= 2 : null,
//       email: form.email.length > 0 ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) : null,
//       password: form.password.length > 0
//         ? form.password.length >= 8 && /\d/.test(form.password) && /[!@#$%^&*]/.test(form.password)
//         : null,
//       confirmPassword: form.confirmPassword.length > 0
//         ? form.password === form.confirmPassword && form.password.length > 0
//         : null,
//     }));
//   }, [form]);

//   const validateForm = () => {
//     const e = { name: '', email: '', password: '', confirmPassword: '' };
//     let valid = true;
//     if (!form.name.trim()) { e.name = 'Name is required'; valid = false; }
//     else if (form.name.trim().length < 2) { e.name = 'Name must be at least 2 characters'; valid = false; }
//     if (!form.email.trim()) { e.email = 'Email is required'; valid = false; }
//     else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; valid = false; }
//     if (!form.password) { e.password = 'Password is required'; valid = false; }
//     else if (form.password.length < 8) { e.password = 'Minimum 8 characters'; valid = false; }
//     else if (!/\d/.test(form.password)) { e.password = 'Must contain at least one number'; valid = false; }
//     else if (!/[!@#$%^&*]/.test(form.password)) { e.password = 'Must contain a special character (!@#$%^&*)'; valid = false; }
//     if (form.password !== form.confirmPassword) { e.confirmPassword = 'Passwords do not match'; valid = false; }
//     setErrors(e);
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
//         body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         setSuccess(true);
//         const loginRes = await fetch('/api/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: form.email, password: form.password }),
//         });
//         const loginData = await loginRes.json();
//         if (loginRes.ok && loginData.success) {
//           localStorage.setItem('token', loginData.token || 'dummy-token');
//           localStorage.setItem('user', JSON.stringify(loginData.user));
//           setTimeout(() => router.push(loginData.user.role === 'teacher' ? '/teacher/dashboard' : '/dashboard'), 900);
//         }
//       } else {
//         setErrors(prev => ({ ...prev, email: data.error || 'Error creating account' }));
//         setIsLoading(false);
//       }
//     } catch {
//       setErrors(prev => ({ ...prev, email: 'Network error. Try again.' }));
//       setIsLoading(false);
//     }
//   };

//   // Password strength — preserved exactly
//   const getPasswordStrength = () => {
//     if (!form.password) return null;
//     const s = [
//       form.password.length >= 8,
//       /\d/.test(form.password),
//       /[!@#$%^&*]/.test(form.password),
//     ].filter(Boolean).length;
//     if (s === 3) return { text: 'Strong', w: 'w-full', color: T.accent, label: T.accent };
//     if (s === 2) return { text: 'Medium', w: 'w-2/3', color: '#f59e0b', label: '#f59e0b' };
//     return { text: 'Weak', w: 'w-1/3', color: '#ef4444', label: '#ef4444' };
//   };
//   const strength = getPasswordStrength();

//   const EyeBtn = (show: boolean, toggle: () => void) => (
//     <button type="button" onClick={toggle}
//       className="transition-colors p-0.5 rounded"
//       style={{ color: 'rgba(255,255,255,0.22)' }}
//       onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
//       onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
//       {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//     </button>
//   );

//   return (
//     <div className="min-h-screen flex overflow-hidden"
//       style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>

//       <BrandPanel />

//       {/* ─── Right: form ─── */}
//       <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative overflow-y-auto">
//         <div className="absolute inset-0 pointer-events-none"
//           style={{ background: `radial-gradient(ellipse 70% 45% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />

//         {/* Mobile logo */}
//         <div className="lg:hidden flex items-center gap-2.5 mb-8 relative z-10">
//           <div className="w-8 h-8 rounded-xl flex items-center justify-center"
//             style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover})` }}>
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>QuizPortal</span>
//         </div>

//         <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
//           className="w-full max-w-[410px] relative z-10">

//           <div className="mb-7">
//             <h1 className="text-[1.7rem] font-bold tracking-tight leading-tight mb-2"
//               style={{ color: 'rgba(255,255,255,0.95)' }}>
//               Create your account
//             </h1>
//             <p className="text-sm" style={{ color: T.textMuted }}>Free forever. No credit card needed.</p>
//           </div>

//           {/* Success banner */}
//           <AnimatePresence>
//             {success && (
//               <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mb-5 px-4 py-3.5 rounded-xl flex items-center gap-3"
//                 style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//                 <CheckCircle className="w-4 h-4 shrink-0" style={{ color: T.accent }} />
//                 <div>
//                   <p className="text-sm font-semibold" style={{ color: T.accentHover }}>Account created!</p>
//                   <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Redirecting you…</p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name */}
//             <AuthInput label="Full Name" icon={User} type="text" value={form.name} placeholder="Your name"
//               disabled={isLoading} isFocused={focusedField === 'name'}
//               isValid={validation.name} error={errors.name}
//               onChange={(e: any) => setForm(p => ({ ...p, name: e.target.value }))}
//               onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />

//             {/* Email */}
//             <AuthInput label="Email" icon={Mail} type="email" value={form.email} placeholder="you@example.com"
//               disabled={isLoading} isFocused={focusedField === 'email'}
//               isValid={validation.email} error={errors.email}
//               onChange={(e: any) => setForm(p => ({ ...p, email: e.target.value }))}
//               onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />

//             {/* Password */}
//             <div className="space-y-2">
//               <AuthInput label="Password" icon={Lock}
//                 type={showPassword ? 'text' : 'password'} value={form.password} placeholder="Min. 8 chars + number + symbol"
//                 disabled={isLoading} isFocused={focusedField === 'password'}
//                 isValid={validation.password} error={errors.password}
//                 rightSlot={EyeBtn(showPassword, () => setShowPassword(p => !p))}
//                 onChange={(e: any) => setForm(p => ({ ...p, password: e.target.value }))}
//                 onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)} />

//               {/* Strength bar */}
//               {strength && (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
//                   <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
//                     <motion.div className={`h-full rounded-full ${strength.w}`}
//                       initial={{ width: 0 }} animate={{ width: undefined }}
//                       style={{ background: strength.color }}
//                       transition={{ duration: 0.3 }} />
//                   </div>
//                   <p className="text-[10px] pl-0.5 font-medium" style={{ color: strength.label }}>
//                     {strength.text} password
//                   </p>
//                 </motion.div>
//               )}
//             </div>

//             {/* Confirm password */}
//             <AuthInput label="Confirm Password" icon={Lock}
//               type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} placeholder="Repeat your password"
//               disabled={isLoading} isFocused={focusedField === 'confirm'}
//               isValid={validation.confirmPassword} error={errors.confirmPassword}
//               rightSlot={EyeBtn(showConfirmPassword, () => setShowConfirmPassword(p => !p))}
//               onChange={(e: any) => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
//               onFocus={() => setFocusedField('confirm')} onBlur={() => setFocusedField(null)} />

//             {/* Role selector */}
//             <div className="space-y-1.5">
//               <label className="block text-[11px] font-semibold uppercase tracking-widest"
//                 style={{ color: 'rgba(255,255,255,0.3)' }}>
//                 I am a
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 {(['student', 'teacher'] as const).map(role => (
//                   <button key={role} type="button" onClick={() => setForm(p => ({ ...p, role }))}
//                     className="py-3 rounded-xl text-sm font-semibold transition-all duration-200 capitalize"
//                     style={form.role === role ? {
//                       background: T.accentBg,
//                       border: `1px solid ${T.accentBorder}`,
//                       color: T.accentHover,
//                       boxShadow: `0 0 16px ${T.accentGlow}`,
//                     } : {
//                       background: 'rgba(255,255,255,0.03)',
//                       border: `1px solid ${T.cardBorder}`,
//                       color: 'rgba(255,255,255,0.35)',
//                     }}>
//                     {role === 'student' ? '🎓' : '📚'} {role.charAt(0).toUpperCase() + role.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="pt-1">
//               <motion.button type="submit" disabled={isLoading || success}
//                 whileHover={{ scale: isLoading ? 1 : 1.015 }} whileTap={{ scale: isLoading ? 1 : 0.985 }}
//                 className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 disabled:cursor-not-allowed"
//                 style={{
//                   background: isLoading || success ? T.accentBg : `linear-gradient(135deg, ${T.accent} 0%, ${T.accentHover} 100%)`,
//                   color: isLoading || success ? T.accent : '#022c1e',
//                   boxShadow: isLoading || success ? 'none' : `0 4px 24px ${T.accentGlow}, 0 1px 0 rgba(255,255,255,0.1) inset`,
//                   border: isLoading || success ? `1px solid ${T.accentBorder}` : '1px solid transparent',
//                 }}>
//                 {isLoading
//                   ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
//                       style={{ borderColor: `${T.accent}30`, borderTopColor: T.accent }} /><span>Creating account…</span></>
//                   : success
//                   ? <><CheckCircle className="w-4 h-4" /><span>Account created!</span></>
//                   : <><span>Create account</span><ArrowRight className="w-4 h-4" /></>}
//               </motion.button>
//             </div>
//           </form>

//           {/* Divider */}
//           <div className="my-6 flex items-center gap-4">
//             <div className="flex-1 h-px" style={{ background: T.cardBorder }} />
//             <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>or</span>
//             <div className="flex-1 h-px" style={{ background: T.cardBorder }} />
//           </div>

//           {/* OAuth */}
//           <div className="grid grid-cols-2 gap-3">
//             {[
//               { label: 'Google', icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)" /><path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)" /><path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z" /><path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z" /></svg> },
//               { label: 'GitHub', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.45)' }}><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg> },
//             ].map(s => (
//               <button key={s.label} type="button"
//                 className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm transition-all"
//                 style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.cardBorder}`, color: 'rgba(255,255,255,0.4)' }}
//                 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}>
//                 {s.icon}{s.label}
//               </button>
//             ))}
//           </div>

//           <p className="text-center text-xs mt-7" style={{ color: 'rgba(255,255,255,0.22)' }}>
//             Already have an account?{' '}
//             <Link href="/login" className="font-semibold transition-colors"
//               style={{ color: `${T.accent}90` }}
//               onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
//               onMouseLeave={e => (e.currentTarget.style.color = `${T.accent}90`)}>
//               Sign in
//             </Link>
//           </p>
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
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2, CheckCircle } from 'lucide-react';
 
// ── Design tokens (same as login) ─────────────────────────────────
const T = {
  bg: '#060809',
  accent: '#10b981',
  accentHover: '#34d399',
  accentBg: 'rgba(16,185,129,0.07)',
  accentBorder: 'rgba(16,185,129,0.22)',
  accentGlow: 'rgba(16,185,129,0.18)',
  focusShadow: '0 0 0 3px rgba(16,185,129,0.1)',
  cardBorder: 'rgba(255,255,255,0.07)',
  textMuted: 'rgba(255,255,255,0.32)',
  textDim: 'rgba(255,255,255,0.18)',
};
 
// ── Reusable input (identical to login) ───────────────────────────
function AuthInput({ label, icon: Icon, error, isFocused, isValid, rightSlot, ...props }: {
  label: string; icon: any; error?: string;
  isFocused?: boolean; isValid?: boolean | null;
  rightSlot?: React.ReactNode; [k: string]: any;
}) {
  const border = isFocused ? T.accentBorder : error ? 'rgba(239,68,68,0.3)' : isValid ? 'rgba(16,185,129,0.2)' : T.cardBorder;
  const iconClr = isFocused ? T.accentHover : error ? 'rgba(239,68,68,0.5)' : isValid ? T.accent : 'rgba(255,255,255,0.2)';
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-150"
          style={{ color: iconClr }} />
        <input {...props}
          className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
          style={{
            background: isFocused ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${border}`,
            color: 'rgba(255,255,255,0.88)',
            boxShadow: isFocused ? T.focusShadow : 'none',
            caretColor: T.accentHover,
          }} />
        {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && (
          <p className="text-[11px] pl-1" style={{ color: 'rgba(239,68,68,0.75)' }}>
            {error}
          </p>
        )}
    </div>
  );
}
 
// ── Left branding panel ───────────────────────────────────────────
function BrandPanel() {
  const stats = [
    { val: '10K+', label: 'Students' },
    { val: '500+', label: 'Teachers' },
    { val: '25K+', label: 'Quizzes' },
    { val: '98%', label: 'Satisfaction' },
  ];
 
  return (
    <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-14 overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 80% 60% at 0% 50%, ${T.accentGlow} 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 100% 90%, rgba(16,185,129,0.05) 0%, transparent 60%)` }} />
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
      <div className="absolute right-0 top-16 bottom-16 w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }} />
 
      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover})`, boxShadow: `0 0 20px ${T.accentGlow}` }}>
          <Sparkles style={{ width: 18, height: 18, color: '#fff' }} />
        </div>
        <span className="text-sm font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.65)' }}>QuizPortal</span>
      </div>
 
      {/* Hero */}
      <div className="relative z-10 space-y-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: `${T.accentHover}55` }}>
            Join the Community
          </p>
          <h2 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-4"
            style={{ color: 'rgba(255,255,255,0.88)' }}>
            Start your<br />
            <span style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              learning journey.
            </span>
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: T.textMuted }}>
            Join thousands of students and teachers already using QuizPortal.
          </p>
        </div>
 
        {/* Features */}
        <div className="space-y-3">
          {['Free forever — no credit card needed', 'Create unlimited quizzes with AI', 'Share with students in one click'].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                <CheckCircle2 style={{ width: 11, height: 11, color: T.accent }} />
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{f}</p>
            </div>
          ))}
        </div>
 
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <div key={i}
              className="rounded-xl p-3"
              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
              <p className="text-lg font-bold" style={{ color: T.accentHover }}>{s.val}</p>
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
 
      {/* Quote */}
      <div className="relative z-10 pl-4" style={{ borderLeft: `2px solid ${T.accentBorder}` }}>
        <p className="text-xs italic leading-relaxed" style={{ color: T.textDim }}>
          "Education is the passport to the future,<br />for tomorrow belongs to those who prepare."
        </p>
        <p className="text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.1)' }}>— Malcolm X</p>
      </div>
    </div>
  );
}
 
// ── SIGNUP PAGE ───────────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
 
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student' as 'student' | 'teacher',
  });
 
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
 
  const [validation, setValidation] = useState({
    name: null as boolean | null,
    email: null as boolean | null,
    password: null as boolean | null,
    confirmPassword: null as boolean | null,
  });
 
  // Real-time validation — preserved exactly from original
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
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password }),
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
 
  // Password strength — preserved exactly
  const getPasswordStrength = () => {
    if (!form.password) return null;
    const s = [
      form.password.length >= 8,
      /\d/.test(form.password),
      /[!@#$%^&*]/.test(form.password),
    ].filter(Boolean).length;
    if (s === 3) return { text: 'Strong', w: 'w-full', color: T.accent, label: T.accent };
    if (s === 2) return { text: 'Medium', w: 'w-2/3', color: '#f59e0b', label: '#f59e0b' };
    return { text: 'Weak', w: 'w-1/3', color: '#ef4444', label: '#ef4444' };
  };
  const strength = getPasswordStrength();
 
  const EyeBtn = (show: boolean, toggle: () => void) => (
    <button type="button" onClick={toggle}
      className="transition-colors p-0.5 rounded"
      style={{ color: 'rgba(255,255,255,0.22)' }}
      onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );
 
  return (
    <div className="min-h-screen flex overflow-hidden"
      style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
 
      <BrandPanel />
 
      {/* ─── Right: form ─── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative overflow-y-auto">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 45% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />
 
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8 relative z-10">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover})` }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>QuizPortal</span>
        </div>
 
        <div className="w-full max-w-[410px] relative z-10">
 
          <div className="mb-7">
            <h1 className="text-[1.7rem] font-bold tracking-tight leading-tight mb-2"
              style={{ color: 'rgba(255,255,255,0.95)' }}>
              Create your account
            </h1>
            <p className="text-sm" style={{ color: T.textMuted }}>Free forever. No credit card needed.</p>
          </div>
 
          {/* Success banner */}
          {success && (
            <div className="mb-5 px-4 py-3.5 rounded-xl flex items-center gap-3"
              style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
              <CheckCircle className="w-4 h-4 shrink-0" style={{ color: T.accent }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: T.accentHover }}>Account created!</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Redirecting you…</p>
              </div>
            </div>
          )}
 
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <AuthInput label="Full Name" icon={User} type="text" value={form.name} placeholder="Your name"
              disabled={isLoading} isFocused={focusedField === 'name'}
              isValid={validation.name} error={errors.name}
              onChange={(e: any) => setForm(p => ({ ...p, name: e.target.value }))}
              onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />
 
            {/* Email */}
            <AuthInput label="Email" icon={Mail} type="email" value={form.email} placeholder="you@example.com"
              disabled={isLoading} isFocused={focusedField === 'email'}
              isValid={validation.email} error={errors.email}
              onChange={(e: any) => setForm(p => ({ ...p, email: e.target.value }))}
              onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
 
            {/* Password */}
            <div className="space-y-2">
              <AuthInput label="Password" icon={Lock}
                type={showPassword ? 'text' : 'password'} value={form.password} placeholder="Min. 8 chars + number + symbol"
                disabled={isLoading} isFocused={focusedField === 'password'}
                isValid={validation.password} error={errors.password}
                rightSlot={EyeBtn(showPassword, () => setShowPassword(p => !p))}
                onChange={(e: any) => setForm(p => ({ ...p, password: e.target.value }))}
                onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)} />
 
              {/* Strength bar — CSS only, no framer */}
              {strength && (
                <div className="space-y-1.5">
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.w}`}
                      style={{ background: strength.color }} />
                  </div>
                  <p className="text-[10px] pl-0.5 font-medium" style={{ color: strength.label }}>
                    {strength.text} password
                  </p>
                </div>
              )}
            </div>
 
            {/* Confirm password */}
            <AuthInput label="Confirm Password" icon={Lock}
              type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} placeholder="Repeat your password"
              disabled={isLoading} isFocused={focusedField === 'confirm'}
              isValid={validation.confirmPassword} error={errors.confirmPassword}
              rightSlot={EyeBtn(showConfirmPassword, () => setShowConfirmPassword(p => !p))}
              onChange={(e: any) => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
              onFocus={() => setFocusedField('confirm')} onBlur={() => setFocusedField(null)} />
 
            {/* Role selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['student', 'teacher'] as const).map(role => (
                  <button key={role} type="button" onClick={() => setForm(p => ({ ...p, role }))}
                    className="py-3 rounded-xl text-sm font-semibold transition-colors duration-200 capitalize"
                    style={form.role === role ? {
                      background: T.accentBg,
                      border: `1px solid ${T.accentBorder}`,
                      color: T.accentHover,
                      boxShadow: `0 0 16px ${T.accentGlow}`,
                    } : {
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${T.cardBorder}`,
                      color: 'rgba(255,255,255,0.35)',
                    }}>
                    {role === 'student' ? '🎓' : '📚'} {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Submit */}
            <div className="pt-1">
              <button type="submit" disabled={isLoading || success}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed"
                style={{
                  background: isLoading || success ? T.accentBg : `linear-gradient(135deg, ${T.accent} 0%, ${T.accentHover} 100%)`,
                  color: isLoading || success ? T.accent : '#022c1e',
                  boxShadow: isLoading || success ? 'none' : `0 4px 24px ${T.accentGlow}, 0 1px 0 rgba(255,255,255,0.1) inset`,
                  border: isLoading || success ? `1px solid ${T.accentBorder}` : '1px solid transparent',
                }}>
                {isLoading
                  ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: `${T.accent}30`, borderTopColor: T.accent }} /><span>Creating account…</span></>
                  : success
                  ? <><CheckCircle className="w-4 h-4" /><span>Account created!</span></>
                  : <><span>Create account</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
 
          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: T.cardBorder }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: T.cardBorder }} />
          </div>
 
          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Google', icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)" /><path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)" /><path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z" /><path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z" /></svg> },
              { label: 'GitHub', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.45)' }}><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg> },
            ].map(s => (
              <button key={s.label} type="button"
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.cardBorder}`, color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}>
                {s.icon}{s.label}
              </button>
            ))}
          </div>
 
          <p className="text-center text-xs mt-7" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold transition-colors"
              style={{ color: `${T.accent}90` }}
              onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
              onMouseLeave={e => (e.currentTarget.style.color = `${T.accent}90`)}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}