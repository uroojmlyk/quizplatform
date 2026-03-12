









// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

// // ── Design tokens ─────────────────────────────────────────────────
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

// // ── Reusable input ────────────────────────────────────────────────
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
//           <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-5"
//             style={{ color: `${T.accentHover}55` }}>
//             Online Learning Platform
//           </p>
//           <h2 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-4"
//             style={{ color: 'rgba(255,255,255,0.88)' }}>
//             Where great<br />
//             <span style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               teaching lives.
//             </span>
//           </h2>
//           <p className="text-sm leading-relaxed max-w-xs" style={{ color: T.textMuted }}>
//             Create quizzes, track student progress, and deliver results in real time.
//           </p>
//         </div>

//         <div className="space-y-3">
//           {['AI-powered quiz generator', 'Real-time performance analytics', 'Assigned & public quiz modes'].map((f, i) => (
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
//       </div>

//       {/* Quote */}
//       <div className="relative z-10 pl-4" style={{ borderLeft: `2px solid ${T.accentBorder}` }}>
//         <p className="text-xs italic leading-relaxed" style={{ color: T.textDim }}>
//           "The beautiful thing about learning is<br />that no one can take it away from you."
//         </p>
//         <p className="text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.1)' }}>— B.B. King</p>
//       </div>
//     </div>
//   );
// }

// // ── LOGIN PAGE ────────────────────────────────────────────────────
// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({ email: '', password: '', general: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [focused, setFocused] = useState<string | null>(null);

//   const validate = () => {
//     const e = { email: '', password: '', general: '' };
//     let ok = true;
//     if (!form.email.trim()) { e.email = 'Email is required'; ok = false; }
//     else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; ok = false; }
//     if (!form.password) { e.password = 'Password is required'; ok = false; }
//     setErrors(e);
//     return ok;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setIsLoading(true);
//     setErrors(prev => ({ ...prev, general: '' }));
//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: form.email, password: form.password }),
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         localStorage.setItem('token', data.token || 'token');
//         localStorage.setItem('user', JSON.stringify(data.user));
//         const role = data.user.role?.toLowerCase().trim();
//         if (role === 'admin') router.push('/admin');
//         else if (role === 'teacher') router.push('/teacher/dashboard');
//         else router.push('/dashboard');
//       } else {
//         setErrors(prev => ({ ...prev, general: data.error || 'Invalid credentials' }));
//         setIsLoading(false);
//       }
//     } catch {
//       setErrors(prev => ({ ...prev, general: 'Network error. Try again.' }));
//       setIsLoading(false);
//     }
//   };

//   const EyeBtn = (
//     <button type="button" onClick={() => setShowPassword(p => !p)}
//       className="transition-colors p-0.5 rounded"
//       style={{ color: 'rgba(255,255,255,0.22)' }}
//       onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
//       onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
//       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//     </button>
//   );

//   return (
//     <div className="min-h-screen flex overflow-hidden"
//       style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>

//       <BrandPanel />

//       {/* ─── Right: form ─── */}
//       <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
//         <div className="absolute inset-0 pointer-events-none"
//           style={{ background: `radial-gradient(ellipse 70% 45% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />

//         {/* Mobile logo */}
//         <div className="lg:hidden flex items-center gap-2.5 mb-10 relative z-10">
//           <div className="w-8 h-8 rounded-xl flex items-center justify-center"
//             style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover})` }}>
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>QuizPortal</span>
//         </div>

//         <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
//           className="w-full max-w-[390px] relative z-10">

//           <div className="mb-8">
//             <h1 className="text-[1.75rem] font-bold tracking-tight leading-tight mb-2"
//               style={{ color: 'rgba(255,255,255,0.95)' }}>
//               Welcome back
//             </h1>
//             <p className="text-sm" style={{ color: T.textMuted }}>Sign in to continue your session</p>
//           </div>

//           {/* General error */}
//           <AnimatePresence>
//             {errors.general && (
//               <motion.div initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
//                 className="mb-5 px-4 py-3 rounded-xl text-sm"
//                 style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(239,68,68,0.85)' }}>
//                 {errors.general}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <AuthInput label="Email" icon={Mail} type="email" value={form.email} placeholder="you@example.com"
//               disabled={isLoading} isFocused={focused === 'email'} error={errors.email}
//               onChange={(e: any) => setForm(p => ({ ...p, email: e.target.value }))}
//               onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />

//             <div className="space-y-1">
//               <AuthInput label="Password" icon={Lock}
//                 type={showPassword ? 'text' : 'password'} value={form.password} placeholder="••••••••"
//                 disabled={isLoading} isFocused={focused === 'password'} error={errors.password}
//                 rightSlot={EyeBtn}
//                 onChange={(e: any) => setForm(p => ({ ...p, password: e.target.value }))}
//                 onFocus={() => setFocused('password')} onBlur={() => setFocused(null)} />
//               <div className="flex justify-end pt-0.5">
//                 <Link href="/forgot-password" className="text-[11px] font-medium transition-colors"
//                   style={{ color: `${T.accent}75` }}
//                   onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
//                   onMouseLeave={e => (e.currentTarget.style.color = `${T.accent}75`)}>
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>

//             <div className="pt-1">
//               <motion.button type="submit" disabled={isLoading}
//                 whileHover={{ scale: isLoading ? 1 : 1.015 }} whileTap={{ scale: isLoading ? 1 : 0.985 }}
//                 className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 disabled:cursor-not-allowed"
//                 style={{
//                   background: isLoading ? T.accentBg : `linear-gradient(135deg, ${T.accent} 0%, ${T.accentHover} 100%)`,
//                   color: isLoading ? T.accent : '#022c1e',
//                   boxShadow: isLoading ? 'none' : `0 4px 24px ${T.accentGlow}, 0 1px 0 rgba(255,255,255,0.1) inset`,
//                   border: isLoading ? `1px solid ${T.accentBorder}` : '1px solid transparent',
//                 }}>
//                 {isLoading
//                   ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
//                       style={{ borderColor: `${T.accent}30`, borderTopColor: T.accent }} /><span>Signing in…</span></>
//                   : <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>}
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
//             New to QuizPortal?{' '}
//             <Link href="/signup" className="font-semibold transition-colors"
//               style={{ color: `${T.accent}90` }}
//               onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
//               onMouseLeave={e => (e.currentTarget.style.color = `${T.accent}90`)}>
//               Create account
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }









// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap } from 'lucide-react';

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({ email: '', password: '', general: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [focused, setFocused] = useState<string | null>(null);

//   const validate = () => {
//     const e = { email: '', password: '', general: '' };
//     let ok = true;
//     if (!form.email.trim()) { e.email = 'Email is required'; ok = false; }
//     else if (!/\S+@\S+\.\S+/.test(form.email)) { e.email = 'Enter a valid email'; ok = false; }
//     if (!form.password) { e.password = 'Password is required'; ok = false; }
//     setErrors(e);
//     return ok;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setIsLoading(true);
//     setErrors(prev => ({ ...prev, general: '' }));
//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: form.email, password: form.password })
//       });
//       const data = await res.json();
//       if (res.ok && data.success) {
//         localStorage.setItem('token', data.token || 'token');
//         localStorage.setItem('user', JSON.stringify(data.user));
//         const role = data.user.role?.toLowerCase().trim();
//         if (role === 'admin') {
//           router.push('/admin');
//         } else if (role === 'teacher') {
//           router.push('/teacher/dashboard');
//         } else {
//           router.push('/dashboard');
//         }
//       } else {
//         setErrors(prev => ({ ...prev, general: data.error || 'Invalid credentials' }));
//         setIsLoading(false);
//       }
//     } catch {
//       setErrors(prev => ({ ...prev, general: 'Network error. Try again.' }));
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-[#080809] flex overflow-hidden"
//       style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
//     >
//       {/* ─── Left decorative panel ─── */}
//       <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-14 overflow-hidden">
//         <div className="absolute inset-0"
//           style={{ background: 'radial-gradient(ellipse 90% 70% at 10% 50%, rgba(168,130,60,0.09) 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 90% 90%, rgba(100,70,200,0.07) 0%, transparent 60%)' }} />
//         <div className="absolute inset-0 opacity-[0.03]"
//           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
//         <div className="absolute right-0 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

//         {/* Logo */}
//         <div className="relative z-10 flex items-center gap-3">
//           <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
//             <GraduationCap className="w-5 h-5 text-[#080809]" />
//           </div>
//           <span className="text-white/70 font-semibold text-sm tracking-wide">QuizPortal</span>
//         </div>

//         {/* Hero text */}
//         <div className="relative z-10 space-y-6">
//           <div>
//             <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500/50 mb-5 font-semibold">Online Learning Platform</p>
//             <h2 className="text-[2.6rem] font-bold text-white/90 leading-[1.1] tracking-tight">
//               Where great<br />
//               <span className="text-transparent bg-clip-text"
//                 style={{ backgroundImage: 'linear-gradient(135deg, #d4a850 0%, #f0c96a 50%, #c49030 100%)' }}>
//                 teaching lives.
//               </span>
//             </h2>
//             <p className="text-sm text-white/28 mt-4 leading-relaxed max-w-xs">
//               Create quizzes, track student progress, and deliver results in real time.
//             </p>
//           </div>

//           <div className="space-y-3 pt-2">
//             {[
//               { label: 'Smart quiz creation with AI', dot: 'bg-amber-400' },
//               { label: 'Live performance analytics', dot: 'bg-violet-400' },
//               { label: 'Assigned & public quiz modes', dot: 'bg-teal-400' },
//             ].map((f, i) => (
//               <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
//                 className="flex items-center gap-3">
//                 <div className={`w-1.5 h-1.5 rounded-full ${f.dot} shrink-0`} />
//                 <p className="text-xs text-white/30">{f.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Quote */}
//         <div className="relative z-10 border-l-2 border-amber-500/20 pl-4">
//           <p className="text-xs text-white/20 italic leading-relaxed">
//             "The beautiful thing about learning is<br />that no one can take it away from you."
//           </p>
//           <p className="text-[10px] text-white/12 mt-2">— B.B. King</p>
//         </div>
//       </div>

//       {/* ─── Right form panel ─── */}
//       <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(168,130,60,0.05),transparent)]" />

//         {/* Mobile logo */}
//         <div className="lg:hidden flex items-center gap-2.5 mb-10 relative z-10">
//           <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
//             <GraduationCap className="w-4 h-4 text-[#080809]" />
//           </div>
//           <span className="text-white/70 font-semibold text-sm">QuizPortal</span>
//         </div>

//         <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
//           className="w-full max-w-[390px] relative z-10">

//           <div className="mb-8">
//             <h1 className="text-[1.75rem] font-bold text-white tracking-tight leading-tight mb-2">Welcome back</h1>
//             <p className="text-sm text-white/32">Sign in to continue your session</p>
//           </div>

//           {/* General error */}
//           <AnimatePresence>
//             {errors.general && (
//               <motion.div initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }} className="mb-5 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/15 text-red-400/90 text-sm">
//                 {errors.general}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email */}
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Email</label>
//               <div className="relative">
//                 <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${focused === 'email' ? 'text-amber-400' : errors.email ? 'text-red-400/50' : 'text-white/18'}`} />
//                 <input type="email" value={form.email}
//                   onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
//                   onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
//                   placeholder="you@example.com" disabled={isLoading}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white/90 placeholder:text-white/18 bg-white/[0.03] border outline-none transition-all duration-200 disabled:opacity-50 ${
//                     focused === 'email' ? 'border-amber-500/35 bg-amber-400/[0.04] shadow-[0_0_0_3px_rgba(212,170,80,0.07)]'
//                     : errors.email ? 'border-red-500/25' : 'border-white/[0.07] hover:border-white/[0.12]'}`} />
//               </div>
//               {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400/70 pl-1">{errors.email}</motion.p>}
//             </div>

//             {/* Password */}
//             <div className="space-y-1.5">
//               <div className="flex items-center justify-between">
//                 <label className="text-[11px] font-semibold text-white/35 tracking-widest uppercase">Password</label>
//                 <Link href="/forgot-password" className="text-[11px] text-amber-400/55 hover:text-amber-400/85 transition-colors">Forgot?</Link>
//               </div>
//               <div className="relative">
//                 <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${focused === 'password' ? 'text-amber-400' : errors.password ? 'text-red-400/50' : 'text-white/18'}`} />
//                 <input type={showPassword ? 'text' : 'password'} value={form.password}
//                   onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
//                   onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
//                   placeholder="••••••••" disabled={isLoading}
//                   className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white/90 placeholder:text-white/18 bg-white/[0.03] border outline-none transition-all duration-200 disabled:opacity-50 ${
//                     focused === 'password' ? 'border-amber-500/35 bg-amber-400/[0.04] shadow-[0_0_0_3px_rgba(212,170,80,0.07)]'
//                     : errors.password ? 'border-red-500/25' : 'border-white/[0.07] hover:border-white/[0.12]'}`} />
//                 <button type="button" onClick={() => setShowPassword(p => !p)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors p-0.5">
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//               {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400/70 pl-1">{errors.password}</motion.p>}
//             </div>

//             {/* Submit */}
//             <div className="pt-1.5">
//               <motion.button type="submit" disabled={isLoading}
//                 whileHover={{ scale: isLoading ? 1 : 1.015 }} whileTap={{ scale: isLoading ? 1 : 0.985 }}
//                 className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed"
//                 style={{ background: isLoading ? 'rgba(212,170,80,0.15)' : 'linear-gradient(135deg, #c9953a 0%, #e8bb55 50%, #c08028 100%)', color: isLoading ? 'rgba(212,170,80,0.6)' : '#080809', boxShadow: isLoading ? 'none' : '0 4px 28px rgba(200,150,50,0.22), 0 1px 0 rgba(255,220,100,0.3) inset' }}>
//                 {isLoading ? (
//                   <><div className="w-4 h-4 border-2 border-amber-400/35 border-t-amber-400 rounded-full animate-spin" /><span>Signing in…</span></>
//                 ) : (
//                   <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>
//                 )}
//               </motion.button>
//             </div>
//           </form>

//           {/* Divider */}
//           <div className="my-6 flex items-center gap-4">
//             <div className="flex-1 h-px bg-white/[0.05]" />
//             <span className="text-[10px] text-white/18 tracking-widest uppercase">or</span>
//             <div className="flex-1 h-px bg-white/[0.05]" />
//           </div>

//           {/* Social buttons */}
//           <div className="grid grid-cols-2 gap-3">
//             {[
//               { label: 'Google', icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)"/><path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)"/><path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z"/><path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z"/></svg> },
//               { label: 'GitHub', icon: <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
//             ].map(s => (
//               <button key={s.label} type="button"
//                 className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all text-sm text-white/38 hover:text-white/60">
//                 {s.icon}{s.label}
//               </button>
//             ))}
//           </div>

//           <p className="text-center text-xs text-white/22 mt-7">
//             New to QuizPortal?{' '}
//             <Link href="/signup" className="text-amber-400/65 hover:text-amber-400/90 transition-colors font-semibold">Create account</Link>
//           </p>
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
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

// ── Design tokens ─────────────────────────────────────────────────
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

// ── Reusable input ────────────────────────────────────────────────
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
          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-5"
            style={{ color: `${T.accentHover}55` }}>
            Online Learning Platform
          </p>
          <h2 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-4"
            style={{ color: 'rgba(255,255,255,0.88)' }}>
            Where great<br />
            <span style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              teaching lives.
            </span>
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: T.textMuted }}>
            Create quizzes, track student progress, and deliver results in real time.
          </p>
        </div>

        <div className="space-y-3">
          {['AI-powered quiz generator', 'Real-time performance analytics', 'Assigned & public quiz modes'].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                <CheckCircle2 style={{ width: 11, height: 11, color: T.accent }} />
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{f}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative z-10 pl-4" style={{ borderLeft: `2px solid ${T.accentBorder}` }}>
        <p className="text-xs italic leading-relaxed" style={{ color: T.textDim }}>
          "The beautiful thing about learning is<br />that no one can take it away from you."
        </p>
        <p className="text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.1)' }}>— B.B. King</p>
      </div>
    </div>
  );
}

// ── LOGIN PAGE ────────────────────────────────────────────────────
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
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('token', data.token || 'token');
        localStorage.setItem('user', JSON.stringify(data.user));
        const role = data.user.role?.toLowerCase().trim();
        if (role === 'admin') router.push('/admin');
        else if (role === 'teacher') router.push('/teacher/dashboard');
        else router.push('/dashboard');
      } else {
        setErrors(prev => ({ ...prev, general: data.error || 'Invalid credentials' }));
        setIsLoading(false);
      }
    } catch {
      setErrors(prev => ({ ...prev, general: 'Network error. Try again.' }));
      setIsLoading(false);
    }
  };

  const EyeBtn = (
    <button type="button" onClick={() => setShowPassword(p => !p)}
      className="transition-colors p-0.5 rounded"
      style={{ color: 'rgba(255,255,255,0.22)' }}
      onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="min-h-screen flex overflow-hidden"
      style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>

      <BrandPanel />

      {/* ─── Right: form ─── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 45% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10 relative z-10">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover})` }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>QuizPortal</span>
        </div>

        <div className="w-full max-w-[390px] relative z-10">

          <div className="mb-8">
            <h1 className="text-[1.75rem] font-bold tracking-tight leading-tight mb-2"
              style={{ color: 'rgba(255,255,255,0.95)' }}>
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: T.textMuted }}>Sign in to continue your session</p>
          </div>

          {/* General error */}
          {errors.general && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(239,68,68,0.85)' }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput label="Email" icon={Mail} type="email" value={form.email} placeholder="you@example.com"
              disabled={isLoading} isFocused={focused === 'email'} error={errors.email}
              onChange={(e: any) => setForm(p => ({ ...p, email: e.target.value }))}
              onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />

            <div className="space-y-1">
              <AuthInput label="Password" icon={Lock}
                type={showPassword ? 'text' : 'password'} value={form.password} placeholder="••••••••"
                disabled={isLoading} isFocused={focused === 'password'} error={errors.password}
                rightSlot={EyeBtn}
                onChange={(e: any) => setForm(p => ({ ...p, password: e.target.value }))}
                onFocus={() => setFocused('password')} onBlur={() => setFocused(null)} />
              <div className="flex justify-end pt-0.5">
                <Link href="/forgot-password" className="text-[11px] font-medium transition-colors"
                  style={{ color: `${T.accent}75` }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${T.accent}75`)}>
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-1">
              <button type="submit" disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed"
                style={{
                  background: isLoading ? T.accentBg : `linear-gradient(135deg, ${T.accent} 0%, ${T.accentHover} 100%)`,
                  color: isLoading ? T.accent : '#022c1e',
                  boxShadow: isLoading ? 'none' : `0 4px 24px ${T.accentGlow}, 0 1px 0 rgba(255,255,255,0.1) inset`,
                  border: isLoading ? `1px solid ${T.accentBorder}` : '1px solid transparent',
                }}>
                {isLoading
                  ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: `${T.accent}30`, borderTopColor: T.accent }} /><span>Signing in…</span></>
                  : <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>}
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
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.cardBorder}`, color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}>
                {s.icon}{s.label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs mt-7" style={{ color: 'rgba(255,255,255,0.22)' }}>
            New to QuizPortal?{' '}
            <Link href="/signup" className="font-semibold transition-colors"
              style={{ color: `${T.accent}90` }}
              onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
              onMouseLeave={e => (e.currentTarget.style.color = `${T.accent}90`)}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}