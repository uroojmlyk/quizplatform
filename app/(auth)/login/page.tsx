

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
//       {error && (
//           <p className="text-[11px] pl-1" style={{ color: 'rgba(239,68,68,0.75)' }}>
//             {error}
//           </p>
//         )}
//     </div>
//   );
// }

// // ── Left branding panel ───────────────────────────────────────────
// function BrandPanel() {
//   return (
//     <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-14 overflow-hidden">
//       <div className="absolute inset-0"
//         style={{ background: `radial-gradient(ellipse 80% 60% at 0% 50%, ${T.accentGlow} 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 100% 90%, rgba(16,185,129,0.05) 0%, transparent 60%)` }} />
//       <div className="absolute inset-0 opacity-[0.025]"
//         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
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
//             <div key={i} className="flex items-center gap-3">
//               <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
//                 style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//                 <CheckCircle2 style={{ width: 11, height: 11, color: T.accent }} />
//               </div>
//               <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{f}</p>
//             </div>
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

//         <div className="w-full max-w-[390px] relative z-10">

//           <div className="mb-8">
//             <h1 className="text-[1.75rem] font-bold tracking-tight leading-tight mb-2"
//               style={{ color: 'rgba(255,255,255,0.95)' }}>
//               Welcome back
//             </h1>
//             <p className="text-sm" style={{ color: T.textMuted }}>Sign in to continue your session</p>
//           </div>

//           {/* General error */}
//           {errors.general && (
//             <div className="mb-5 px-4 py-3 rounded-xl text-sm"
//               style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(239,68,68,0.85)' }}>
//               {errors.general}
//             </div>
//           )}

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
//               <button type="submit" disabled={isLoading}
//                 className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed"
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
//               </button>
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
//         </div>
//       </div>
//     </div>
//   );
// }








'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

const T = {
  bg: '#080810',
  accent: '#34d399',
  accentBg: 'rgba(52,211,153,0.07)',
  accentBorder: 'rgba(52,211,153,0.18)',
  accentGlow: 'rgba(52,211,153,0.15)',
  focusShadow: '0 0 0 3px rgba(52,211,153,0.08)',
  cardBg: 'rgba(255,255,255,0.025)',
  cardBorder: 'rgba(255,255,255,0.07)',
  inputBg: 'rgba(255,255,255,0.03)',
  textMuted: 'rgba(255,255,255,0.4)',
  textDim: 'rgba(255,255,255,0.2)',
};

function AuthInput({ label, icon: Icon, error, isFocused, rightSlot, ...props }: {
  label: string; icon: any; error?: string;
  isFocused?: boolean; rightSlot?: React.ReactNode; [k: string]: any;
}) {
  const border = isFocused ? T.accentBorder : error ? 'rgba(239,68,68,0.3)' : T.cardBorder;
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.textDim }}>
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-150"
          style={{ color: isFocused ? T.accent : error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.2)' }} />
        <input {...props}
          className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
          style={{
            background: isFocused ? 'rgba(52,211,153,0.03)' : T.inputBg,
            border: `1px solid ${border}`,
            color: 'rgba(255,255,255,0.88)',
            boxShadow: isFocused ? T.focusShadow : 'none',
            caretColor: T.accent,
          }} />
        {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && <p className="text-[11px] pl-1" style={{ color: 'rgba(239,68,68,0.75)' }}>{error}</p>}
    </div>
  );
}

function BrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-14 overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 80% 60% at 0% 50%, ${T.accentGlow} 0%, transparent 65%)` }} />
      <div className="absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute right-0 top-16 bottom-16 w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }} />

      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span className="text-white/80 font-bold text-sm">F</span>
        </div>
        <span className="text-white font-semibold text-[15px] tracking-tight">Ficer</span>
      </div>

      <div className="relative z-10 space-y-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: 'rgba(52,211,153,0.5)' }}>
            Online Learning Platform
          </p>
          <h2 className="leading-[1.08] tracking-[-0.03em] mb-4"
            style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontFamily: "'DM Serif Display', serif", color: 'rgba(255,255,255,0.88)' }}>
            Where great<br />
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>teaching lives.</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: T.textMuted }}>
            Create quizzes, track student progress, and deliver results in real time.
          </p>
        </div>
        <div className="space-y-3">
          {['AI-powered quiz generator', 'Real-time performance analytics', 'Assigned & public quiz modes'].map((f) => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                <CheckCircle2 style={{ width: 11, height: 11, color: T.accent }} />
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{f}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 pl-4" style={{ borderLeft: '2px solid rgba(255,255,255,0.08)' }}>
        <p className="text-xs italic leading-relaxed" style={{ color: T.textDim }}>
          "The beautiful thing about learning is<br />that no one can take it away from you."
        </p>
        <p className="text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.12)' }}>— B.B. King</p>
      </div>
    </div>
  );
}

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
      className="transition-colors p-0.5 rounded" style={{ color: 'rgba(255,255,255,0.22)' }}
      onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="min-h-screen flex overflow-hidden"
      style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');
        input::placeholder { color: rgba(255,255,255,0.18); }
      `}</style>

      <BrandPanel />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 40% at 50% 0%, ${T.accentGlow} 0%, transparent 60%)` }} />

        <div className="lg:hidden flex items-center gap-2.5 mb-10 relative z-10">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span className="text-white/80 font-bold text-sm">F</span>
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">Ficer</span>
        </div>

        <div className="w-full max-w-[390px] relative z-10">
          <div className="mb-8">
            <h1 className="text-[1.75rem] font-bold tracking-tight leading-tight mb-2"
              style={{ color: 'rgba(255,255,255,0.95)', fontFamily: "'DM Serif Display', serif" }}>
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: T.textMuted }}>Sign in to continue your session</p>
          </div>

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
                  style={{ color: 'rgba(52,211,153,0.55)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(52,211,153,0.55)')}>
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-1">
              <button type="submit" disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed"
                style={{
                  background: isLoading ? T.accentBg : '#fff',
                  color: isLoading ? T.accent : '#080810',
                  boxShadow: isLoading ? 'none' : '0 4px 20px rgba(0,0,0,0.3)',
                  border: isLoading ? `1px solid ${T.accentBorder}` : '1px solid transparent',
                }}>
                {isLoading
                  ? <><div className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: `${T.accent}30`, borderTopColor: T.accent }} /><span>Signing in…</span></>
                  : <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: T.cardBorder }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: T.cardBorder }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Google', icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.27 12A6.73 6.73 0 0 1 12 5.27c1.73 0 3.28.65 4.47 1.71l3.15-3.15A11.27 11.27 0 0 0 12 .73C6.26.73 1.4 5.03.27 10.73z" transform="translate(0 1)" /><path fill="#FBBC05" d="M.73 14l5-3.87a6.7 6.7 0 0 1 0-4.26L.27 9.73A11.33 11.33 0 0 0 0 12c0 .7.07 1.37.2 2z" transform="translate(.5 0)" /><path fill="#34A853" d="M12 23.27c3.04 0 5.6-1 7.47-2.73l-4.6-3.57A6.73 6.73 0 0 1 5.27 13L.73 16.87C2.93 20.6 7.17 23.27 12 23.27z" /><path fill="#4285F4" d="M23.27 12c0-.73-.07-1.47-.2-2.18H12v4.36h6.33a5.42 5.42 0 0 1-2.33 3.56l4.6 3.57C22.53 19.6 23.27 16 23.27 12z" /></svg> },
              { label: 'GitHub', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.45)' }}><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg> },
            ].map(s => (
              <button key={s.label} type="button"
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm transition-all"
                style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.cardBg; e.currentTarget.style.borderColor = T.cardBorder; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}>
                {s.icon}{s.label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs mt-7" style={{ color: 'rgba(255,255,255,0.22)' }}>
            New to Ficer?{' '}
            <Link href="/signup" className="font-semibold transition-colors"
              style={{ color: 'rgba(52,211,153,0.7)' }}
              onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(52,211,153,0.7)')}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}