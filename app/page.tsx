

// 'use client';
// import Link from 'next/link';
// import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
// import {
//   ArrowRight, Sparkles, Zap, Shield, TrendingUp,
//   Users, BookOpen, Star, Rocket, Play,
//   CheckCircle2, Clock, ChevronRight, Brain, Share2,
//   BarChart3, GraduationCap, Building2,
//   CheckCircle, Link2, PieChart, Menu, X
// } from 'lucide-react';
// import { useRef, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const G = {
//   accent: '#34d399',
//   accentDark: '#059669',
//   accentGlow: 'rgba(52,211,153,0.15)',
//   accentBorder: 'rgba(52,211,153,0.18)',
//   accentBg: 'rgba(52,211,153,0.07)',
//   bg: '#060608',
//   card: 'rgba(255,255,255,0.018)',
//   border: 'rgba(255,255,255,0.06)',
// };

// function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
//   const sizes = {
//     sm: { box: 'w-6 h-6', icon: 'w-3 h-3', text: 'text-sm' },
//     md: { box: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg' },
//     lg: { box: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl' },
//   };
//   const s = sizes[size];
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className={`${s.box} rounded-xl flex items-center justify-center relative overflow-hidden shrink-0`}
//         style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, boxShadow: `0 0 16px ${G.accentGlow}` }}>
//         <Sparkles className={`${s.icon} text-white relative z-10`} />
//         <div className="absolute inset-0 opacity-30"
//           style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%)' }} />
//       </div>
//       <div className="flex items-baseline gap-0">
//         <span className={`${s.text} font-black tracking-tight text-white`}>ficer</span>
//         <span className={`${s.text} font-light tracking-tight`} style={{ color: G.accent }}>quiz</span>
//       </div>
//     </div>
//   );
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
//       style={{ background: G.accentBg, borderColor: G.accentBorder }}>
//       <div className="w-1.5 h-1.5 rounded-full" style={{ background: G.accent }} />
//       <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: G.accent }}>
//         {children}
//       </span>
//     </div>
//   );
// }

// function ProductDemoSection() {
//   const [activeTab, setActiveTab] = useState(0);
//   const tabs = [
//     {
//       label: 'AI Generator', icon: Brain,
//       title: 'Describe. Generate. Done.',
//       desc: 'Type a topic, choose difficulty, and AI builds a complete quiz in seconds — with smart distractors and scoring.',
//       mockLines: [
//         { prompt: true, text: '> Create quiz on "React Hooks" — 10 questions, intermediate' },
//         { prompt: false, text: '✦ Generating questions...' },
//         { prompt: false, text: '✦ Adding smart distractors...' },
//         { prompt: false, text: '✦ Writing explanations...' },
//         { prompt: false, text: '✓ Quiz ready — 10 questions, ~12 min' },
//       ],
//     },
//     {
//       label: 'Live Analytics', icon: PieChart,
//       title: 'Real-time insight dashboard.',
//       desc: 'Watch responses pour in. Score distributions, time-per-question heatmaps, and AI-generated improvement suggestions.',
//       bars: [85, 62, 91, 48, 77, 95, 53],
//     },
//     {
//       label: 'Share & Embed', icon: Link2,
//       title: 'One link. Any platform.',
//       desc: 'Share a tamper-proof link, embed in your LMS, or export to PDF. No accounts needed for participants.',
//       mockLink: 'https://ficerquiz.app/q/react-hooks-2024',
//     },
//   ];

//   return (
//     <section className="relative border-t py-16 sm:py-24 lg:py-28" style={{ borderColor: G.border }}>
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-[600px] h-[1px]"
//         style={{ background: `linear-gradient(90deg, transparent, ${G.accent}40, transparent)` }} />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-14">
//           <SectionLabel>Product Demo</SectionLabel>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4">
//             see it in{' '}
//             <span className="font-semibold"
//               style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               action
//             </span>
//           </h2>
//           <p className="text-white/30 text-sm max-w-lg mx-auto leading-relaxed">
//             From blank page to published quiz in seconds. No setup, no friction.
//           </p>
//         </motion.div>

//         {/* Tabs — scrollable on mobile */}
//         <div className="flex justify-start sm:justify-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
//           {tabs.map((tab, i) => (
//             <button key={i} onClick={() => setActiveTab(i)}
//               className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0"
//               style={activeTab === i ? {
//                 background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`,
//                 color: '#021a0f', boxShadow: `0 0 20px ${G.accentGlow}`
//               } : {
//                 background: G.card, border: `1px solid ${G.border}`, color: 'rgba(255,255,255,0.4)'
//               }}>
//               <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }} className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
//           <div className="order-2 lg:order-1">
//             <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">{tabs[activeTab].title}</h3>
//             <p className="text-white/40 leading-relaxed mb-6 sm:mb-8 text-sm">{tabs[activeTab].desc}</p>
//             <Link href="/signup"
//               className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
//               style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f', boxShadow: `0 0 24px ${G.accentGlow}` }}>
//               Try it free <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//           <div className="order-1 lg:order-2">
//             <div className="rounded-2xl overflow-hidden border"
//               style={{ background: '#0a0f0c', borderColor: G.accentBorder }}>
//               <div className="flex items-center gap-2 px-4 py-3 border-b"
//                 style={{ borderColor: 'rgba(52,211,153,0.08)', background: 'rgba(52,211,153,0.04)' }}>
//                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
//                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
//                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
//                 <span className="ml-3 text-xs text-white/20 font-mono truncate">
//                   {activeTab === 0 ? 'ficerquiz — ai terminal' : activeTab === 1 ? 'analytics.ficerquiz.app' : 'share.ficerquiz.app'}
//                 </span>
//               </div>
//               <div className="p-4 sm:p-5 min-h-[200px] sm:min-h-[240px]">
//                 {activeTab === 0 && (
//                   <div className="space-y-2 font-mono text-xs">
//                     {tabs[0].mockLines!.map((line, i) => (
//                       <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.18 }}
//                         className={line.prompt ? 'text-white/70' : i === 4 ? 'text-emerald-400 font-semibold' : 'text-emerald-600'}>
//                         {line.text}
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//                 {activeTab === 1 && (
//                   <div>
//                     <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-28 sm:h-36 mb-3">
//                       {tabs[1].bars!.map((h, i) => (
//                         <motion.div key={i} className="flex-1 rounded-t-lg"
//                           initial={{ height: 0 }} animate={{ height: `${h}%` }}
//                           transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
//                           style={{ background: `linear-gradient(180deg, ${G.accent}, ${G.accentDark})`, minHeight: 4 }} />
//                       ))}
//                     </div>
//                     <div className="flex justify-between text-[10px] text-white/20 font-mono">
//                       {['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'].map(q => <span key={q}>{q}</span>)}
//                     </div>
//                     <div className="mt-4 flex gap-2 sm:gap-4">
//                       {[['Avg Score', '73%'], ['Completion', '91%'], ['Top Q', 'Q6']].map(([l, v]) => (
//                         <div key={l} className="flex-1 rounded-xl p-2 sm:p-2.5 text-center"
//                           style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
//                           <p className="text-[9px] sm:text-[10px] text-white/30">{l}</p>
//                           <p className="text-xs sm:text-sm font-bold" style={{ color: G.accent }}>{v}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === 2 && (
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3 p-3 rounded-xl border"
//                       style={{ background: 'rgba(52,211,153,0.05)', borderColor: G.accentBorder }}>
//                       <Link2 className="w-4 h-4 shrink-0" style={{ color: G.accent }} />
//                       <span className="text-xs font-mono text-white/50 truncate">{tabs[2].mockLink}</span>
//                       <button className="ml-auto shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
//                         style={{ background: G.accent, color: '#021a0f' }}>Copy</button>
//                     </div>
//                     {[{ label: 'Embed in LMS', icon: BookOpen }, { label: 'Export to PDF', icon: BookOpen }, { label: 'Slack / Teams', icon: Share2 }]
//                       .map(({ label, icon: Icon }) => (
//                         <div key={label} className="flex items-center gap-3 p-3 rounded-xl border"
//                           style={{ background: G.card, borderColor: G.border }}>
//                           <Icon className="w-4 h-4 text-white/25" />
//                           <span className="text-xs text-white/40">{label}</span>
//                           <ChevronRight className="w-3.5 h-3.5 text-white/15 ml-auto" />
//                         </div>
//                       ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// function HowItWorksSection() {
//   const steps = [
//     {
//       number: '01', icon: Brain, title: 'Create with AI',
//       desc: 'Describe your topic, set difficulty and question count. AI generates a complete quiz in seconds — ready to publish or customize.',
//       detail: ['Choose any topic', 'Set difficulty level', 'AI writes questions', 'Edit anytime'],
//     },
//     {
//       number: '02', icon: Share2, title: 'Share instantly',
//       desc: 'Get a clean link instantly. No login required for participants. Share via email, embed in your site, or post anywhere.',
//       detail: ['One-click generation', 'Embed anywhere', 'No accounts needed', 'Access controls'],
//     },
//     {
//       number: '03', icon: BarChart3, title: 'Track results',
//       desc: 'Real-time dashboard shows who scored what, how long each question took, and where learners struggled.',
//       detail: ['Live score tracking', 'Per-question stats', 'Export CSV / PDF', 'AI suggestions'],
//     },
//   ];

//   return (
//     <section className="relative border-t py-16 sm:py-24 lg:py-28" style={{ borderColor: G.border }}>
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-[600px] h-[1px]"
//         style={{ background: `linear-gradient(90deg, transparent, ${G.accent}40, transparent)` }} />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-20">
//           <SectionLabel>How It Works</SectionLabel>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4">
//             three steps to{' '}
//             <span className="font-semibold"
//               style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               launch
//             </span>
//           </h2>
//           <p className="text-white/30 text-sm max-w-md mx-auto">From zero to published quiz in under two minutes.</p>
//         </motion.div>

//         {/* Mobile: vertical stack, Desktop: alternating */}
//         <div className="space-y-12 sm:space-y-16 lg:space-y-20">
//           {steps.map((step, i) => (
//             <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}
//               className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
//               <div>
//                 <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
//                   <span className="text-4xl sm:text-5xl font-black tracking-tighter"
//                     style={{ color: `${G.accent}20` }}>{step.number}</span>
//                   <div className="w-px h-8 sm:h-10 bg-white/5" />
//                   <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0"
//                     style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
//                     <step.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: G.accent }} />
//                   </div>
//                 </div>
//                 <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">{step.title}</h3>
//                 <p className="text-white/40 leading-relaxed mb-6 sm:mb-8 text-sm">{step.desc}</p>
//                 <ul className="space-y-2 sm:space-y-2.5">
//                   {step.detail.map((d, di) => (
//                     <li key={di} className="flex items-center gap-3 text-sm text-white/50">
//                       <CheckCircle className="w-4 h-4 shrink-0" style={{ color: G.accent }} />
//                       {d}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//                 className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 border relative overflow-hidden"
//                 style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.04) 0%, rgba(255,255,255,0.01) 100%)', borderColor: G.accentBorder }}>
//                 <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
//                   style={{ background: `radial-gradient(circle, ${G.accentGlow} 0%, transparent 70%)` }} />
//                 {i === 0 && (
//                   <div className="relative z-10 space-y-3">
//                     <div className="text-xs text-white/20 font-mono mb-4">ficer_ai_generator</div>
//                     {[{ label: 'Topic', value: 'React Hooks', color: G.accent }, { label: 'Questions', value: '10', color: '#6ee7b7' }, { label: 'Difficulty', value: 'Intermediate', color: G.accent }]
//                       .map(({ label, value, color }) => (
//                         <div key={label} className="flex items-center justify-between p-3 rounded-xl"
//                           style={{ background: 'rgba(52,211,153,0.05)', border: `1px solid ${G.accentBorder}` }}>
//                           <span className="text-xs text-white/30">{label}</span>
//                           <span className="text-xs font-semibold" style={{ color }}>{value}</span>
//                         </div>
//                       ))}
//                     <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
//                       className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
//                       style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f' }}>
//                       <Sparkles className="w-4 h-4" /> Generating...
//                     </motion.div>
//                   </div>
//                 )}
//                 {i === 1 && (
//                   <div className="relative z-10">
//                     <div className="flex items-center gap-2 p-3 rounded-xl mb-4"
//                       style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
//                       <Link2 className="w-4 h-4 shrink-0" style={{ color: G.accent }} />
//                       <span className="text-xs font-mono text-white/40 truncate">ficerquiz.app/q/abc-123</span>
//                     </div>
//                     <div className="grid grid-cols-3 gap-2">
//                       {[{ icon: '✉', label: 'Email' }, { icon: '🔗', label: 'Embed' }, { icon: '📱', label: 'Mobile' }, { icon: '📄', label: 'PDF' }, { icon: '💬', label: 'Slack' }, { icon: '🎓', label: 'LMS' }]
//                         .map(({ icon, label }) => (
//                           <div key={label} className="flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl text-center"
//                             style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${G.border}` }}>
//                             <span className="text-base sm:text-lg">{icon}</span>
//                             <span className="text-[9px] sm:text-[10px] text-white/30">{label}</span>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 )}
//                 {i === 2 && (
//                   <div className="relative z-10 space-y-3">
//                     {[{ name: 'Sarah K.', score: 92, time: '8m 12s' }, { name: 'Ahmed R.', score: 78, time: '11m 04s' }, { name: 'Mia L.', score: 85, time: '9m 33s' }]
//                       .map((r, ri) => (
//                         <div key={ri} className="flex items-center gap-3 p-3 rounded-xl"
//                           style={{ background: 'rgba(52,211,153,0.04)', border: `1px solid ${G.accentBorder}` }}>
//                           <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
//                             style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})` }}>{r.name[0]}</div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs font-medium text-white/70 truncate">{r.name}</p>
//                             <p className="text-[10px] text-white/25">{r.time}</p>
//                           </div>
//                           <div className="text-sm font-bold shrink-0"
//                             style={{ color: r.score >= 85 ? G.accent : r.score >= 75 ? '#fbbf24' : '#f87171' }}>{r.score}%</div>
//                         </div>
//                       ))}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function UseCasesSection() {
//   const [active, setActive] = useState(0);
//   const cases = [
//     {
//       icon: GraduationCap, audience: 'Teachers', tagline: 'Assess smarter, teach better.',
//       desc: 'Build assessments in minutes. Track which concepts your class struggles with and get AI recommendations to close knowledge gaps.',
//       points: ['Auto-grade MCQs instantly', 'Class-wide performance analytics', 'Align to learning objectives', 'Parent-friendly score reports'],
//       stat: { val: '4×', label: 'faster quiz creation' },
//     },
//     {
//       icon: BookOpen, audience: 'Students', tagline: 'Study with purpose.',
//       desc: 'Practice with AI-generated quizzes on any subject. See exactly where you\'re strong and what to study next.',
//       points: ['Personalized practice questions', 'Spaced repetition reminders', 'Performance trend charts', 'Peer challenge links'],
//       stat: { val: '2.4×', label: 'better retention' },
//     },
//     {
//       icon: Building2, audience: 'Teams', tagline: 'Knowledge is your moat.',
//       desc: 'Run onboarding tests, compliance assessments, and skill checks at scale. Full audit trail for enterprise teams.',
//       points: ['Bulk invite via CSV', 'Custom branding & domain', 'SOC2-compliant data handling', 'Slack & Notion integrations'],
//       stat: { val: '91%', label: 'completion rate avg' },
//     },
//   ];

//   return (
//     <section className="relative border-t py-16 sm:py-24 lg:py-28" style={{ borderColor: G.border }}>
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-[600px] h-[1px]"
//         style={{ background: `linear-gradient(90deg, transparent, ${G.accent}40, transparent)` }} />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
//           <SectionLabel>Use Cases</SectionLabel>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4">
//             built for{' '}
//             <span className="font-semibold"
//               style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               everyone
//             </span>
//           </h2>
//         </motion.div>

//         {/* Tabs */}
//         <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
//           {cases.map((c, i) => (
//             <button key={i} onClick={() => setActive(i)}
//               className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-250"
//               style={active === i ? {
//                 background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`,
//                 color: '#021a0f', boxShadow: `0 0 24px ${G.accentGlow}`,
//               } : { background: G.card, border: `1px solid ${G.border}`, color: 'rgba(255,255,255,0.35)' }}>
//               <c.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               {c.audience}
//             </button>
//           ))}
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
//             className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
//             <div className="lg:col-span-2 flex flex-col justify-center">
//               <div className="flex items-center gap-3 mb-5">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0"
//                   style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
//                   {(() => { const Icon = cases[active].icon; return <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: G.accent }} />; })()}
//                 </div>
//                 <span className="text-[11px] text-white/30 uppercase tracking-widest font-semibold">{cases[active].audience}</span>
//               </div>
//               <p className="text-xl sm:text-2xl font-semibold text-white mb-4 leading-tight">{cases[active].tagline}</p>
//               <p className="text-sm text-white/40 leading-relaxed mb-6 sm:mb-8">{cases[active].desc}</p>
//               <div className="inline-flex items-baseline gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border self-start"
//                 style={{ background: G.accentBg, borderColor: G.accentBorder }}>
//                 <span className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: G.accent }}>{cases[active].stat.val}</span>
//                 <span className="text-xs sm:text-sm text-white/40">{cases[active].stat.label}</span>
//               </div>
//             </div>
//             <div className="lg:col-span-3">
//               <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
//                 {cases[active].points.map((point, pi) => (
//                   <motion.div key={pi} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: pi * 0.07 }}
//                     className="group flex flex-col gap-3 p-4 sm:p-5 rounded-2xl border cursor-default transition-all duration-200"
//                     style={{ background: G.card, borderColor: G.border }}
//                     onMouseEnter={e => (e.currentTarget.style.borderColor = G.accentBorder)}
//                     onMouseLeave={e => (e.currentTarget.style.borderColor = G.border)}>
//                     <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: G.accentBg }}>
//                       <CheckCircle2 className="w-4 h-4" style={{ color: G.accent }} />
//                     </div>
//                     <p className="text-sm font-medium text-white/75 leading-snug">{point}</p>
//                   </motion.div>
//                 ))}
//                 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.35 }}
//                   className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border"
//                   style={{ background: `linear-gradient(135deg, rgba(52,211,153,0.06) 0%, rgba(52,211,153,0.02) 100%)`, borderColor: G.accentBorder }}>
//                   <div>
//                     <p className="text-sm font-semibold text-white mb-1">Get started as a {cases[active].audience.toLowerCase()}</p>
//                     <p className="text-xs text-white/30">Free plan — no credit card needed</p>
//                   </div>
//                   <Link href="/signup"
//                     className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all hover:opacity-90 w-full sm:w-auto justify-center"
//                     style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f' }}>
//                     Start free <ArrowRight className="w-4 h-4" />
//                   </Link>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
//   const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
//   const smoothHeroY = useSpring(heroY, { stiffness: 80, damping: 25 });

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const portraits = [
//     'https://images.unsplash.com/photo-1494790108777-28675fd72c4e?w=80&h=80&fit=crop&crop=faces&auto=format&q=80',
//     'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces&auto=format&q=80',
//     'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=faces&auto=format&q=80',
//     'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=faces&auto=format&q=80',
//   ];

//   const featuredQuizzes = [
//     { id: '1', title: 'Web Dev Fundamentals', desc: 'Master HTML, CSS & JavaScript basics', questions: 25, duration: 30, level: 'Beginner', levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=280&fit=crop&auto=format&q=80', category: 'Development', rating: 4.9, students: 1240 },
//     { id: '2', title: 'UI/UX Design Principles', desc: 'Learn design thinking & craft great UX', questions: 20, duration: 25, level: 'Intermediate', levelColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=280&fit=crop&auto=format&q=80', category: 'Design', rating: 4.8, students: 987 },
//     { id: '3', title: 'Data Science Essentials', desc: 'Python, pandas, and data visualization', questions: 30, duration: 45, level: 'Advanced', levelColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=280&fit=crop&auto=format&q=80', category: 'Data', rating: 4.7, students: 764 },
//     { id: '4', title: 'Product Management 101', desc: 'From idea to execution — full lifecycle', questions: 15, duration: 20, level: 'Beginner', levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=280&fit=crop&auto=format&q=80', category: 'Business', rating: 4.9, students: 612 },
//   ];

//   const features = [
//     { icon: Zap, title: 'Lightning Fast', description: 'Sub-100ms response times powered by edge computing infrastructure globally.', stat: '99.9% uptime' },
//     { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption, SOC2 compliance, and privacy-first architecture.', stat: 'SOC2 Type II' },
//     { icon: TrendingUp, title: 'Smart Analytics', description: 'AI-powered insights that adapt to learner behavior and maximize engagement.', stat: '2× engagement' },
//   ];

//   const navLinks = ['Explore', 'Features', 'Pricing'];

//   return (
//     <div ref={containerRef} className="min-h-screen overflow-x-hidden"
//       style={{ background: G.bg, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

//       {/* Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
//           className="absolute top-[-10%] left-[-5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full"
//           style={{ background: `radial-gradient(circle, ${G.accentGlow} 0%, transparent 70%)` }} />
//         <motion.div animate={{ x: [0, -25, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
//           className="absolute bottom-[-10%] right-[-5%] w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full"
//           style={{ background: `radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)` }} />
//         <div className="hidden sm:block absolute inset-0 opacity-[0.015]"
//           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
//         <div className="absolute top-0 inset-x-0 h-px"
//           style={{ background: `linear-gradient(90deg, transparent, ${G.accent}30, transparent)` }} />
//       </div>

//       {/* NAVBAR */}
//       <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }} className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
//         <div className="flex justify-between items-center px-4 sm:px-5 py-3 rounded-2xl border border-white/[0.06] backdrop-blur-xl"
//           style={{ background: scrolled ? 'rgba(6,6,8,0.92)' : 'rgba(255,255,255,0.02)' }}>

//           <Link href="/" className="shrink-0">
//             <Logo size="md" />
//           </Link>

//           {/* Desktop nav */}
//           <div className="hidden md:flex items-center gap-1">
//             {navLinks.map((item) => (
//               <Link key={item} href={`/${item.toLowerCase()}`}
//                 className="px-4 py-2 text-sm text-white/40 hover:text-white/80 rounded-xl hover:bg-white/[0.04] transition-all">
//                 {item}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop CTA */}
//           <div className="hidden md:flex items-center gap-2">
//             <Link href="/login" className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">
//               Sign in
//             </Link>
//             <Link href="/signup"
//               className="px-5 py-2 text-sm font-semibold rounded-xl transition-all hover:opacity-90 hover:scale-[1.02]"
//               style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f', boxShadow: `0 0 20px ${G.accentGlow}` }}>
//               Get started
//             </Link>
//           </div>

//           {/* Mobile: sign in + hamburger */}
//           <div className="flex md:hidden items-center gap-2">
//             <Link href="/login" className="px-3 py-1.5 text-xs text-white/50 hover:text-white transition-colors">
//               Sign in
//             </Link>
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
//               {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div initial={{ opacity: 0, y: -10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -10, scale: 0.97 }} transition={{ duration: 0.2 }}
//               className="absolute top-full left-4 right-4 mt-2 rounded-2xl border border-white/[0.08] backdrop-blur-xl overflow-hidden z-50"
//               style={{ background: 'rgba(6,6,8,0.96)' }}>
//               <div className="p-3 space-y-1">
//                 {navLinks.map((item) => (
//                   <Link key={item} href={`/${item.toLowerCase()}`}
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">
//                     {item}
//                   </Link>
//                 ))}
//                 <div className="pt-2 border-t border-white/[0.06]">
//                   <Link href="/signup" onClick={() => setMobileMenuOpen(false)}
//                     className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all"
//                     style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f' }}>
//                     Get started free <ArrowRight className="w-4 h-4" />
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* HERO */}
//       <main className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-32">
//         <motion.div style={{ y: smoothHeroY, opacity: heroOpacity }} className="text-center">

//           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border mb-8 sm:mb-10"
//             style={{ borderColor: G.accentBorder, background: G.accentBg }}>
//             <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
//               transition={{ duration: 2.5, repeat: Infinity }}
//               className="w-1.5 h-1.5 rounded-full" style={{ background: G.accent }} />
//             <span className="text-[11px] sm:text-xs font-semibold tracking-wide" style={{ color: G.accent }}>
//               Smarter quizzes · Instant insights
//             </span>
//           </motion.div>

//           {/* Hero heading */}
//           <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="text-[2.8rem] sm:text-6xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.88] mb-6 sm:mb-8">
//             <span className="text-white/90">ficer</span>
//             <br />
//             <span className="font-semibold"
//               style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7, #a7f3d0)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               quiz
//             </span>
//           </motion.h1>

//           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.45 }}
//             className="text-base sm:text-lg text-white/30 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
//             Create, share, and track quizzes with{' '}
//             <span className="text-white/60">powerful AI</span>. From classroom to enterprise,{' '}
//             <span className="text-white/60">results in minutes</span>.
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.55 }}
//             className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20 px-4 sm:px-0">
//             <Link href="/signup"
//               className="group flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02] w-full sm:w-auto justify-center"
//               style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f', boxShadow: `0 0 40px ${G.accentGlow}` }}>
//               Start creating free
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link href="/explore"
//               className="group flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl text-sm font-medium text-white/60 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all w-full sm:w-auto justify-center">
//               <Play className="w-4 h-4" />
//               Explore quizzes
//             </Link>
//           </motion.div>

//           {/* Social proof */}
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.7 }}
//             className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
//             <div className="flex items-center gap-3">
//               <div className="flex -space-x-2.5">
//                 {portraits.map((src, i) => (
//                   <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 + i * 0.08 }}
//                     className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 overflow-hidden" style={{ borderColor: G.bg }}>
//                     <img src={src} alt="user" className="w-full h-full object-cover" />
//                   </motion.div>
//                 ))}
//               </div>
//               <div className="text-left">
//                 <div className="text-xs sm:text-sm font-medium text-white">
//                   <span style={{ color: G.accent }}>500+</span> teams trust us
//                 </div>
//                 <div className="text-[10px] sm:text-xs text-white/25">including Fortune 500 companies</div>
//               </div>
//             </div>
//             <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />
//             <div className="flex items-center gap-4 sm:gap-5">
//               {[{ val: '98%', label: 'satisfaction' }, { val: '50k+', label: 'quizzes taken' }].map((s) => (
//                 <div key={s.label} className="text-center">
//                   <div className="text-base sm:text-lg font-semibold text-white">{s.val}</div>
//                   <div className="text-[10px] sm:text-xs text-white/25">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* FEATURED QUIZZES */}
//       <section className="relative border-t py-14 sm:py-24 lg:py-28" style={{ borderColor: G.border }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }} transition={{ duration: 0.6 }}
//             className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
//             <div>
//               <SectionLabel>Featured Quizzes</SectionLabel>
//               <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
//                 explore{' '}
//                 <span className="font-semibold"
//                   style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                   popular
//                 </span>
//               </h2>
//               <p className="text-white/30 mt-2 text-sm">Discover quizzes crafted by our community</p>
//             </div>
//             <Link href="/explore" className="group flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors whitespace-nowrap self-start sm:self-auto">
//               View all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>

//           {/* Quiz grid — 1 col mobile, 2 col tablet, 4 col desktop */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
//             {featuredQuizzes.map((quiz, i) => (
//               <motion.div key={quiz.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
//                 whileHover={{ y: -5 }} onClick={() => router.push(`/quiz/${quiz.id}`)}
//                 className="group cursor-pointer rounded-2xl overflow-hidden border hover:border-white/15 transition-all duration-300"
//                 style={{ background: G.card, borderColor: G.border }}>
//                 <div className="relative h-40 sm:h-44 overflow-hidden">
//                   <img src={quiz.image} alt={quiz.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent" />
//                   <div className="absolute top-3 left-3">
//                     <span className="px-2.5 py-1 text-[10px] font-medium text-white/70 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm">{quiz.category}</span>
//                   </div>
//                   <div className="absolute top-3 right-3">
//                     <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full border ${quiz.levelColor} backdrop-blur-sm`}>{quiz.level}</span>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-white font-medium text-sm mb-1.5 line-clamp-1">{quiz.title}</h3>
//                   <p className="text-white/30 text-xs mb-4 line-clamp-2 leading-relaxed">{quiz.desc}</p>
//                   <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
//                     <div className="flex items-center gap-3 text-[11px] text-white/25">
//                       <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {quiz.questions}</span>
//                       <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {quiz.duration}m</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-1.5 mt-3">
//                     <div className="flex gap-0.5">
//                       {[...Array(5)].map((_, si) => <Star key={si} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
//                     </div>
//                     <span className="text-[10px] text-white/30">{quiz.rating} · {quiz.students.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <ProductDemoSection />
//       <HowItWorksSection />
//       <UseCasesSection />

//       {/* FEATURES */}
//       <section className="relative border-t py-14 sm:py-24 lg:py-28" style={{ borderColor: G.border }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4">
//               engineered for{' '}
//               <span className="font-semibold"
//                 style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                 excellence
//               </span>
//             </h2>
//             <p className="text-white/30 max-w-xl mx-auto text-sm leading-relaxed">
//               Every detail crafted for the modern assessment experience
//             </p>
//           </motion.div>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
//             {features.map((f, i) => (
//               <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -4 }}
//                 className="group relative p-6 sm:p-8 rounded-2xl border hover:border-white/12 transition-all duration-300 overflow-hidden"
//                 style={{ background: G.card, borderColor: G.border }}
//                 onMouseEnter={e => (e.currentTarget.style.borderColor = G.accentBorder)}
//                 onMouseLeave={e => (e.currentTarget.style.borderColor = G.border)}>
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
//                   style={{ background: `radial-gradient(circle at 50% 0%, ${G.accentGlow} 0%, transparent 60%)` }} />
//                 <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 sm:mb-6"
//                   style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
//                   <f.icon className="w-5 h-5" style={{ color: G.accent }} />
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-medium text-white mb-3">{f.title}</h3>
//                 <p className="text-white/30 text-sm leading-relaxed mb-5 sm:mb-6">{f.description}</p>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 className="w-3.5 h-3.5" style={{ color: `${G.accent}60` }} />
//                   <span className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">{f.stat}</span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="relative border-t py-14 sm:py-24 lg:py-28" style={{ borderColor: G.border }}>
//         <div className="max-w-5xl mx-auto px-4 sm:px-6">
//           <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }} transition={{ duration: 0.8 }}
//             className="relative rounded-2xl sm:rounded-3xl p-10 sm:p-16 lg:p-20 text-center overflow-hidden border"
//             style={{ background: `linear-gradient(135deg, rgba(52,211,153,0.07) 0%, rgba(5,150,105,0.05) 50%, rgba(255,255,255,0.01) 100%)`, borderColor: G.accentBorder }}>
//             <div className="absolute top-0 inset-x-0 h-px"
//               style={{ background: `linear-gradient(90deg, transparent, ${G.accent}50, transparent)` }} />
//             <motion.div className="absolute inset-0 rounded-2xl sm:rounded-3xl"
//               animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//               style={{ background: `radial-gradient(circle at 50% 50%, ${G.accentGlow} 0%, transparent 60%)` }} />
//             <div className="relative z-10">
//               <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight">
//                 ready to{' '}
//                 <span className="font-semibold"
//                   style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                   transform?
//                 </span>
//               </h2>
//               <p className="text-white/30 mb-8 sm:mb-10 max-w-md mx-auto text-sm leading-relaxed">
//                 Join thousands of educators and teams using Ficer Quiz to create impactful learning experiences.
//               </p>
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
//                 <Link href="/signup"
//                   className="group flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02] w-full sm:w-auto justify-center"
//                   style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f', boxShadow: `0 0 40px ${G.accentGlow}` }}>
//                   Start for free
//                   <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//                 <Link href="/explore"
//                   className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors w-full sm:w-auto justify-center">
//                   Browse quizzes first
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="relative border-t py-8 sm:py-10" style={{ borderColor: G.border }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <Logo size="sm" />
//             <p className="text-xs text-white/20 text-center sm:text-left">© 2024 Ficer Quiz · Smart assessments for everyone</p>
//             <div className="flex items-center gap-4 sm:gap-6">
//               {['explore', 'privacy', 'contact'].map((l) => (
//                 <Link key={l} href={`/${l}`} className="text-xs text-white/20 hover:text-white/50 transition-colors capitalize">{l}</Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style jsx global>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }







// 'use client';

// import Link from 'next/link';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Zap, 
//   Shield, 
//   TrendingUp,
//   Users,
//   Globe,
//   BarChart3,
//   Code2,
//   Rocket,
//   Crown,
//   Compass,
//   BookOpen,
//   Star
// } from 'lucide-react';
// import { useRef, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
//   // Smooth scroll animations
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });
  
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
//   const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
//   // Spring physics for smooth animations
//   const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
//   const smoothY = useSpring(y, springConfig);
//   const smoothScale = useSpring(scale, springConfig);

//   // Mouse move handler for 3D effect
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const { clientX, clientY } = e;
//       const { innerWidth, innerHeight } = window;
      
//       const x = (clientX / innerWidth) * 2 - 1;
//       const y = (clientY / innerHeight) * 2 - 1;
      
//       setMousePosition({ x, y });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Parallax tilt effect
//   const tiltStyle = {
//     transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale3d(1.05, 1.05, 1.05)`,
//     transition: 'transform 0.1s ease-out'
//   };

//   // Beautiful portraits array
//   const portraits = [
//     {
//       id: 1,
//       name: 'Elena',
//       image: 'https://images.unsplash.com/photo-1494790108777-28675fd72c4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Creative Director',
//       gradient: 'from-pink-500/30 to-rose-500/30'
//     },
//     {
//       id: 2,
//       name: 'Sofia',
//       image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Lead Designer',
//       gradient: 'from-purple-500/30 to-indigo-500/30'
//     },
//     {
//       id: 3,
//       name: 'Maya',
//       image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Product Manager',
//       gradient: 'from-blue-500/30 to-cyan-500/30'
//     },
//     {
//       id: 4,
//       name: 'Zara',
//       image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'UX Researcher',
//       gradient: 'from-emerald-500/30 to-teal-500/30'
//     },
//     {
//       id: 5,
//       name: 'Leila',
//       image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Frontend Lead',
//       gradient: 'from-orange-500/30 to-red-500/30'
//     },
//     {
//       id: 6,
//       name: 'Aria',
//       image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Tech Lead',
//       gradient: 'from-violet-500/30 to-purple-500/30'
//     }
//   ];

//   // Sample quizzes data
//   const featuredQuizzes = [
//     {
//       id: '1',
//       title: 'Web Development Fundamentals',
//       description: 'Master HTML, CSS, and JavaScript basics',
//       questions: 25,
//       duration: 30,
//       level: 'Beginner',
//       image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop&auto=format',
//       author: 'Elena',
//       authorImage: portraits[0].image,
//       category: 'Development'
//     },
//     {
//       id: '2',
//       title: 'UI/UX Design Principles',
//       description: 'Learn design thinking and user experience',
//       questions: 20,
//       duration: 25,
//       level: 'Intermediate',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&auto=format',
//       author: 'Sofia',
//       authorImage: portraits[1].image,
//       category: 'Design'
//     },
//     {
//       id: '3',
//       title: 'Data Science Essentials',
//       description: 'Python, pandas, and data visualization',
//       questions: 30,
//       duration: 45,
//       level: 'Advanced',
//       image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format',
//       author: 'Maya',
//       authorImage: portraits[2].image,
//       category: 'Data Science'
//     },
//     {
//       id: '4',
//       title: 'Product Management 101',
//       description: 'From idea to execution - product lifecycle',
//       questions: 15,
//       duration: 20,
//       level: 'Beginner',
//       image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format',
//       author: 'Zara',
//       authorImage: portraits[3].image,
//       category: 'Business'
//     }
//   ];

//   return (
//     <div ref={containerRef} className="min-h-screen bg-[#030304] font-['Inter',sans-serif] overflow-x-hidden">
//       {/* Premium animated background */}
//       <div className="fixed inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#2b0b3f,transparent)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,#0f2b3f,transparent)]"></div>
        
//         <div className="absolute inset-0" style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px',
//           maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
//         }}></div>
        
//         <motion.div 
//           className="absolute top-20 left-[10%] w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"
//           animate={{
//             x: [0, 30, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div 
//           className="absolute bottom-20 right-[10%] w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl"
//           animate={{
//             x: [0, -40, 0],
//             y: [0, 40, 0],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//       </div>

//       {/* Navigation - Clean */}
//       <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6">
//         <motion.div 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="flex justify-between items-center"
//         >
//           <Link href="/" className="group relative">
//             <h1 className="text-3xl font-light tracking-tight">
//               <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
//                 ficer
//               </span>
//               <span className="ml-2 font-medium bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
//                 quiz
//               </span>
//             </h1>
//           </Link>
          
//           <div className="flex items-center gap-2">
//             <Link 
//               href="/explore"
//               className="group px-4 py-2 text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
//             >
//               <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//               <span>Explore</span>
//             </Link>
//             <Link 
//               href="/login"
//               className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
//             >
//               Sign in
//             </Link>
//             <Link 
//               href="/signup"
//               className="relative group ml-2 px-5 py-2 bg-white text-[#030304] rounded-full hover:bg-white/90 transition-all font-medium text-sm overflow-hidden"
//             >
//               <span className="relative z-10">Get started</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </Link>
//           </div>
//         </motion.div>
//       </nav>

//       {/* Hero Section with 3D Portrait Cube */}
//       <main className="relative max-w-7xl mx-auto px-6 pt-16 pb-32">
//         <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
//           {/* Left column */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             style={{ y: smoothY }}
//           >
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/[0.05] mb-8 backdrop-blur-sm"
//             >
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="w-2 h-2 bg-pink-500 rounded-full"
//               />
//               <span className="text-xs font-mono text-white/40">v3.0 · redefining assessment</span>
//             </motion.div>

//             <h1 className="text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[0.9] mb-6">
//               <span className="text-white/90">assess</span>
//               <br />
//               <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-medium">
//                 beautifully
//               </span>
//             </h1>
            
//             <p className="text-xl text-white/30 max-w-xl mb-12 leading-relaxed font-light">
//               <span className="text-white/60">Ficer</span> combines elegant design with 
//               <span className="text-white/60"> powerful analytics</span> to create 
//               assessments people love.
//             </p>

//             {/* Clean buttons */}
//             <div className="flex flex-wrap gap-4 mb-20">
//               <Link 
//                 href="/signup"
//                 className="group px-8 py-4 bg-white text-[#030304] rounded-2xl hover:bg-white/90 transition-all font-medium flex items-center gap-2"
//               >
//                 Start creating
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Link>
              
//               <Link 
//                 href="/explore"
//                 className="group px-8 py-4 bg-white/[0.02] text-white rounded-2xl hover:bg-white/[0.04] transition-all border border-white/[0.05] backdrop-blur-sm flex items-center gap-2"
//               >
//                 <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                 Explore quizzes
//               </Link>
//             </div>

//             {/* Social proof */}
//             <div className="flex items-center gap-8 border-t border-white/[0.02] pt-8">
//               <div className="flex -space-x-3">
//                 {portraits.slice(0, 5).map((portrait, i) => (
//                   <motion.div
//                     key={portrait.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * i }}
//                     className="w-10 h-10 rounded-full border-2 border-[#030304] overflow-hidden"
//                   >
//                     <img 
//                       src={portrait.image} 
//                       alt={portrait.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//               <div>
//                 <div className="text-sm text-white font-medium">Trusted by <span className="text-pink-400">500+</span> teams</div>
//                 <div className="text-xs text-white/30">including Fortune 500 companies</div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right column - 3D Portrait Cube */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.4 }}
//             style={{ y: smoothY, scale: smoothScale }}
//             className="relative hidden lg:block"
//           >
//             <div className="relative w-full aspect-square perspective-2000">
//               <motion.div
//                 animate={{
//                   rotateX: [0, 360],
//                   rotateY: [0, 360],
//                 }}
//                 transition={{
//                   duration: 20,
//                   repeat: Infinity,
//                   ease: "linear"
//                 }}
//                 style={tiltStyle}
//                 className="relative w-full h-full transform-style-3d"
//               >
//                 {/* Cube faces with beautiful portraits */}
//                 {portraits.slice(0, 6).map((portrait, index) => (
//                   <motion.div
//                     key={portrait.id}
//                     className={`absolute inset-0 bg-gradient-to-br ${portrait.gradient} backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden`}
//                     style={{
//                       transform: `rotate${index < 4 ? 'Y' : 'X'}(${index * 90}deg) translateZ(200px)`,
//                       boxShadow: '0 0 50px rgba(0,0,0,0.5)'
//                     }}
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <img 
//                       src={portrait.image} 
//                       alt={portrait.name}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//                       <div>
//                         <p className="text-white font-medium">{portrait.name}</p>
//                         <p className="text-white/60 text-xs">{portrait.role}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </main>

//       {/* Explore Quizzes Section */}
//       <section className="relative border-t border-white/[0.02] bg-black/20 py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex justify-between items-end mb-12"
//           >
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] rounded-full border border-white/[0.05] mb-4">
//                 <Star className="w-3 h-3 text-pink-400" />
//                 <span className="text-xs text-white/40">featured quizzes</span>
//               </div>
//               <h2 className="text-4xl font-light text-white mb-2">
//                 explore 
//                 <span className="ml-2 font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//                   popular
//                 </span>
//               </h2>
//               <p className="text-white/30">Discover quizzes created by our community</p>
//             </div>
            
//             <Link 
//               href="/explore"
//               className="group flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
//             >
//               View all
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>

//           {/* Quiz Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredQuizzes.map((quiz, index) => (
//               <motion.div
//                 key={quiz.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 onClick={() => router.push(`/quiz/${quiz.id}`)}
//                 className="group cursor-pointer"
//               >
//                 <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
//                   {/* Quiz Image */}
//                   <div className="relative h-40 overflow-hidden">
//                     <img 
//                       src={quiz.image} 
//                       alt={quiz.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
//                     {/* Category tag */}
//                     <div className="absolute top-3 left-3 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] text-white/80 border border-white/10">
//                       {quiz.category}
//                     </div>
                    
//                     {/* Level tag */}
//                     <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] text-white/60 border border-white/10">
//                       {quiz.level}
//                     </div>
//                   </div>
                  
//                   {/* Content */}
//                   <div className="p-4">
//                     <h3 className="text-white font-medium mb-1 line-clamp-1">{quiz.title}</h3>
//                     <p className="text-white/30 text-xs mb-3 line-clamp-2">{quiz.description}</p>
                    
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <img 
//                           src={quiz.authorImage} 
//                           alt={quiz.author}
//                           className="w-5 h-5 rounded-full border border-white/20"
//                         />
//                         <span className="text-xs text-white/40">{quiz.author}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-white/30">
//                         <BookOpen className="w-3 h-3" />
//                         <span>{quiz.questions}</span>
//                         <span>·</span>
//                         <span>{quiz.duration}m</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section className="relative border-t border-white/[0.02] bg-black/20 py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-5xl font-light tracking-tight text-white mb-4">
//               engineered for 
//               <span className="ml-3 font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//                 excellence
//               </span>
//             </h2>
//             <p className="text-white/30 max-w-2xl mx-auto">
//               Every detail crafted for the modern assessment experience
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: Zap,
//                 title: 'lightning fast',
//                 description: 'Sub-100ms response times with edge computing',
//                 gradient: 'from-pink-500 to-purple-500',
//                 stats: '99.9% uptime'
//               },
//               {
//                 icon: Shield,
//                 title: 'enterprise security',
//                 description: 'Bank-level encryption and compliance',
//                 gradient: 'from-purple-500 to-indigo-500',
//                 stats: 'SOC2 Type II'
//               },
//               {
//                 icon: TrendingUp,
//                 title: 'adaptive learning',
//                 description: 'AI-powered question adaptation',
//                 gradient: 'from-indigo-500 to-blue-500',
//                 stats: '2x engagement'
//               }
//             ].map((feature, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all duration-300"
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
//                 <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                   <feature.icon className="w-7 h-7 text-white" />
//                 </div>
                
//                 <h3 className="text-2xl font-light text-white mb-3">{feature.title}</h3>
//                 <p className="text-white/30 text-sm leading-relaxed mb-6">{feature.description}</p>
                
//                 <div className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">
//                   {feature.stats}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative border-t border-white/[0.02] py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="relative bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl p-20 text-center overflow-hidden"
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.2, 1],
//                 rotate: [0, 180, 360],
//               }}
//               transition={{
//                 duration: 20,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//               className="absolute inset-0 opacity-20"
//               style={{
//                 backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
//               }}
//             />
            
//             <h2 className="text-5xl font-light text-white mb-6 relative z-10">
//               ready to 
//               <span className="ml-3 font-medium bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
//                 transform?
//               </span>
//             </h2>
            
//             <p className="text-white/30 mb-10 max-w-2xl mx-auto relative z-10">
//               Join thousands of creators using Ficer
//             </p>
            
//             <Link
//               href="/signup"
//               className="group relative inline-flex px-8 py-4 bg-white text-[#030304] rounded-2xl hover:bg-white/90 transition-all font-medium items-center gap-2 overflow-hidden z-10"
//             >
//               <span className="relative z-10">Claim your workspace</span>
//               <Rocket className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative border-t border-white/[0.02] py-8">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex justify-between items-center text-xs text-white/20">
//             <div>© 2024 ficer · redefining assessment</div>
//             <div className="flex gap-8">
//               <Link href="/explore" className="hover:text-white/40 transition-colors">explore</Link>
//               <Link href="/legal" className="hover:text-white/40 transition-colors">legal</Link>
//               <Link href="/privacy" className="hover:text-white/40 transition-colors">privacy</Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         .perspective-2000 {
//           perspective: 2000px;
//         }
//         .transform-style-3d {
//           transform-style: preserve-3d;
//         }
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// }




// 'use client';

// import Link from 'next/link';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Zap, 
//   Shield, 
//   TrendingUp,
//   Users,
//   Compass,
//   BookOpen,
//   Star,
//   Rocket,
//   Play,
//   CheckCircle2,
//   Clock,
//   ChevronRight
// } from 'lucide-react';
// import { useRef, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrolled, setScrolled] = useState(false);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
//   const smoothHeroY = useSpring(heroY, { stiffness: 80, damping: 25 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 2;
//       const y = (e.clientY / window.innerHeight - 0.5) * 2;
//       setMousePosition({ x, y });
//     };
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const portraits = [
//     { id: 1, name: 'Elena', image: 'https://images.unsplash.com/photo-1494790108777-28675fd72c4e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//     { id: 2, name: 'Sofia', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//     { id: 3, name: 'Maya', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//     { id: 4, name: 'Zara', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//     { id: 5, name: 'Leila', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//   ];

//   const featuredQuizzes = [
//     {
//       id: '1',
//       title: 'Web Development Fundamentals',
//       description: 'Master HTML, CSS, and JavaScript basics with hands-on challenges',
//       questions: 25,
//       duration: 30,
//       level: 'Beginner',
//       levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
//       image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop&auto=format&q=80',
//       author: 'Elena',
//       authorImage: portraits[0].image,
//       category: 'Development',
//       rating: 4.9,
//       students: 1240
//     },
//     {
//       id: '2',
//       title: 'UI/UX Design Principles',
//       description: 'Learn design thinking and craft exceptional user experiences',
//       questions: 20,
//       duration: 25,
//       level: 'Intermediate',
//       levelColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&auto=format&q=80',
//       author: 'Sofia',
//       authorImage: portraits[1].image,
//       category: 'Design',
//       rating: 4.8,
//       students: 987
//     },
//     {
//       id: '3',
//       title: 'Data Science Essentials',
//       description: 'Python, pandas, and data visualization mastery',
//       questions: 30,
//       duration: 45,
//       level: 'Advanced',
//       levelColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
//       image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80',
//       author: 'Maya',
//       authorImage: portraits[2].image,
//       category: 'Data Science',
//       rating: 4.7,
//       students: 764
//     },
//     {
//       id: '4',
//       title: 'Product Management 101',
//       description: 'From idea to execution — the complete product lifecycle',
//       questions: 15,
//       duration: 20,
//       level: 'Beginner',
//       levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
//       image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format&q=80',
//       author: 'Zara',
//       authorImage: portraits[3].image,
//       category: 'Business',
//       rating: 4.9,
//       students: 612
//     }
//   ];

//   const features = [
//     {
//       icon: Zap,
//       title: 'Lightning Fast',
//       description: 'Sub-100ms response times powered by edge computing infrastructure globally.',
//       stat: '99.9% uptime',
//       accent: '#6366f1'
//     },
//     {
//       icon: Shield,
//       title: 'Enterprise Security',
//       description: 'Bank-level encryption, SOC2 compliance, and privacy-first architecture.',
//       stat: 'SOC2 Type II',
//       accent: '#8b5cf6'
//     },
//     {
//       icon: TrendingUp,
//       title: 'Smart Analytics',
//       description: 'AI-powered insights that adapt to learner behavior and maximize engagement.',
//       stat: '2× engagement',
//       accent: '#a78bfa'
//     }
//   ];

//   return (
//     <div
//       ref={containerRef}
//       className="min-h-screen overflow-x-hidden"
//       style={{ background: '#050508', fontFamily: "'DM Sans', 'Inter', sans-serif" }}
//     >
//       {/* Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         {/* Main gradient orbs */}
//         <motion.div
//           animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
//           transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
//           className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full"
//           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
//         />
//         <motion.div
//           animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
//           transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
//           className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
//           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
//         />
//         {/* Subtle grid */}
//         <div
//           className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
//             backgroundSize: '64px 64px'
//           }}
//         />
//         {/* Top vignette */}
//         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
//       </div>

//       {/* ─── NAVBAR ─── */}
//       <motion.nav
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-50 max-w-7xl mx-auto px-6 pt-6"
//       >
//         <div
//           className="flex justify-between items-center px-5 py-3 rounded-2xl border border-white/[0.06] backdrop-blur-xl"
//           style={{ background: scrolled ? 'rgba(5,5,8,0.85)' : 'rgba(255,255,255,0.02)' }}
//         >
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2.5">
//             <div
//               className="w-8 h-8 rounded-xl flex items-center justify-center"
//               style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//             >
//               <Sparkles className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-white font-semibold tracking-tight text-lg">
//               ficer<span className="text-indigo-400 font-light">quiz</span>
//             </span>
//           </Link>

//           {/* Nav links */}
//           <div className="hidden md:flex items-center gap-1">
//             {['Explore', 'Features', 'Pricing'].map((item) => (
//               <Link
//                 key={item}
//                 href={`/${item.toLowerCase()}`}
//                 className="px-4 py-2 text-sm text-white/40 hover:text-white/80 rounded-xl hover:bg-white/[0.04] transition-all"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>

//           {/* Auth buttons */}
//           <div className="flex items-center gap-2">
//             <Link
//               href="/login"
//               className="hidden sm:block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
//             >
//               Sign in
//             </Link>
//             <Link
//               href="/signup"
//               className="px-5 py-2 text-sm font-medium text-white rounded-xl transition-all hover:opacity-90 hover:scale-[1.02]"
//               style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//             >
//               Get started
//             </Link>
//           </div>
//         </div>
//       </motion.nav>

//       {/* ─── HERO ─── */}
//       <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
//         <motion.div style={{ y: smoothHeroY, opacity: heroOpacity }} className="text-center">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-10"
//           >
//             <motion.div
//               animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
//               transition={{ duration: 2.5, repeat: Infinity }}
//               className="w-1.5 h-1.5 rounded-full bg-indigo-400"
//             />
//             <span className="text-xs font-medium text-indigo-300/80 tracking-wide">
//               v3.0 · redefining assessment
//             </span>
//           </motion.div>

//           {/* Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.88] mb-8"
//           >
//             <span className="text-white/90">assess</span>
//             <br />
//             <span
//               className="font-semibold"
//               style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
//             >
//               beautifully
//             </span>
//           </motion.h1>

//           {/* Subheading */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.45 }}
//             className="text-lg text-white/30 max-w-2xl mx-auto mb-12 leading-relaxed"
//           >
//             <span className="text-white/60">Ficer</span> combines elegant design with{' '}
//             <span className="text-white/60">powerful analytics</span> to create
//             assessments people actually love.
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.55 }}
//             className="flex flex-wrap items-center justify-center gap-4 mb-20"
//           >
//             <Link
//               href="/signup"
//               className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-2xl"
//               style={{
//                 background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//                 boxShadow: '0 0 40px rgba(99,102,241,0.3)'
//               }}
//             >
//               Start creating
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               href="/explore"
//               className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-medium text-white/60 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
//             >
//               <Play className="w-4 h-4" />
//               Explore quizzes
//             </Link>
//           </motion.div>

//           {/* Social Proof */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.7 }}
//             className="flex flex-col sm:flex-row items-center justify-center gap-6"
//           >
//             <div className="flex items-center gap-3">
//               <div className="flex -space-x-2.5">
//                 {portraits.map((p, i) => (
//                   <motion.div
//                     key={p.id}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 + i * 0.08 }}
//                     className="w-9 h-9 rounded-full border-2 overflow-hidden"
//                     style={{ borderColor: '#050508' }}
//                   >
//                     <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
//                   </motion.div>
//                 ))}
//               </div>
//               <div className="text-left">
//                 <div className="text-sm font-medium text-white">
//                   <span className="text-indigo-400">500+</span> teams trust Ficer
//                 </div>
//                 <div className="text-xs text-white/25">including Fortune 500 companies</div>
//               </div>
//             </div>

//             <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />

//             <div className="flex items-center gap-4">
//               {[
//                 { val: '98%', label: 'satisfaction' },
//                 { val: '50k+', label: 'quizzes taken' },
//               ].map((s) => (
//                 <div key={s.label} className="text-center">
//                   <div className="text-lg font-semibold text-white">{s.val}</div>
//                   <div className="text-xs text-white/25">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* ─── FEATURED QUIZZES ─── */}
//       <section className="relative border-t border-white/[0.04] py-28">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
//           >
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-5">
//                 <Star className="w-3 h-3 text-indigo-400" />
//                 <span className="text-xs font-medium text-indigo-400/80">Featured quizzes</span>
//               </div>
//               <h2 className="text-4xl font-light text-white tracking-tight">
//                 explore{' '}
//                 <span
//                   className="font-semibold"
//                   style={{ background: 'linear-gradient(135deg, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
//                 >
//                   popular
//                 </span>
//               </h2>
//               <p className="text-white/30 mt-2 text-sm">Discover quizzes crafted by our community</p>
//             </div>
//             <Link
//               href="/explore"
//               className="group flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors whitespace-nowrap"
//             >
//               View all
//               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
//             {featuredQuizzes.map((quiz, i) => (
//               <motion.div
//                 key={quiz.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -6 }}
//                 onClick={() => router.push(`/quiz/${quiz.id}`)}
//                 className="group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/15 transition-all duration-300"
//                 style={{ background: 'rgba(255,255,255,0.02)' }}
//               >
//                 {/* Image */}
//                 <div className="relative h-44 overflow-hidden">
//                   <img
//                     src={quiz.image}
//                     alt={quiz.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
//                   <div className="absolute top-3 left-3">
//                     <span className="px-2.5 py-1 text-[10px] font-medium text-white/70 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm">
//                       {quiz.category}
//                     </span>
//                   </div>
//                   <div className="absolute top-3 right-3">
//                     <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full border ${quiz.levelColor} backdrop-blur-sm`}>
//                       {quiz.level}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <h3 className="text-white font-medium text-sm mb-1.5 line-clamp-1">{quiz.title}</h3>
//                   <p className="text-white/30 text-xs mb-4 line-clamp-2 leading-relaxed">{quiz.description}</p>

//                   {/* Stats row */}
//                   <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
//                     <div className="flex items-center gap-2">
//                       <img src={quiz.authorImage} alt={quiz.author} className="w-5 h-5 rounded-full border border-white/10" />
//                       <span className="text-[11px] text-white/40">{quiz.author}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-[11px] text-white/25">
//                       <span className="flex items-center gap-1">
//                         <BookOpen className="w-3 h-3" /> {quiz.questions}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" /> {quiz.duration}m
//                       </span>
//                     </div>
//                   </div>

//                   {/* Rating */}
//                   <div className="flex items-center gap-1.5 mt-3">
//                     <div className="flex gap-0.5">
//                       {[...Array(5)].map((_, si) => (
//                         <Star key={si} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
//                       ))}
//                     </div>
//                     <span className="text-[10px] text-white/30">{quiz.rating} · {quiz.students.toLocaleString()} students</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── FEATURES ─── */}
//       <section className="relative border-t border-white/[0.04] py-28">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-5xl font-light tracking-tight text-white mb-4">
//               engineered for{' '}
//               <span
//                 className="font-semibold"
//                 style={{ background: 'linear-gradient(135deg, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
//               >
//                 excellence
//               </span>
//             </h2>
//             <p className="text-white/30 max-w-xl mx-auto text-sm leading-relaxed">
//               Every detail has been crafted for the modern assessment experience
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-5">
//             {features.map((f, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -4 }}
//                 className="group relative p-8 rounded-2xl border border-white/[0.06] hover:border-white/12 transition-all duration-300 overflow-hidden"
//                 style={{ background: 'rgba(255,255,255,0.018)' }}
//               >
//                 {/* Hover glow */}
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
//                   style={{ background: `radial-gradient(circle at 50% 0%, ${f.accent}12 0%, transparent 60%)` }}
//                 />

//                 <div
//                   className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6"
//                   style={{ background: `${f.accent}18`, border: `1px solid ${f.accent}25` }}
//                 >
//                   <f.icon className="w-5 h-5" style={{ color: f.accent }} />
//                 </div>

//                 <h3 className="text-xl font-medium text-white mb-3">{f.title}</h3>
//                 <p className="text-white/30 text-sm leading-relaxed mb-6">{f.description}</p>

//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/60" />
//                   <span className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">{f.stat}</span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─── */}
//       <section className="relative border-t border-white/[0.04] py-28">
//         <div className="max-w-5xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.97 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative rounded-3xl p-16 sm:p-20 text-center overflow-hidden border border-white/[0.06]"
//             style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(168,85,247,0.05) 100%)' }}
//           >
//             {/* Decorative top line */}
//             <div
//               className="absolute top-0 inset-x-0 h-px"
//               style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }}
//             />

//             <motion.div
//               className="absolute inset-0 rounded-3xl"
//               animate={{ opacity: [0.3, 0.6, 0.3] }}
//               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//               style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 60%)' }}
//             />

//             <div className="relative z-10">
//               <h2 className="text-5xl sm:text-6xl font-light text-white mb-6 tracking-tight">
//                 ready to{' '}
//                 <span
//                   className="font-semibold"
//                   style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
//                 >
//                   transform?
//                 </span>
//               </h2>

//               <p className="text-white/30 mb-10 max-w-md mx-auto text-sm leading-relaxed">
//                 Join thousands of educators using Ficer to create impactful learning experiences.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                 <Link
//                   href="/signup"
//                   className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
//                   style={{
//                     background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//                     boxShadow: '0 0 40px rgba(99,102,241,0.3)'
//                   }}
//                 >
//                   Claim your workspace
//                   <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//                 <Link
//                   href="/explore"
//                   className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
//                 >
//                   <Compass className="w-4 h-4" />
//                   Browse quizzes first
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ─── FOOTER ─── */}
//       <footer className="relative border-t border-white/[0.04] py-10">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-2.5">
//               <div
//                 className="w-6 h-6 rounded-lg flex items-center justify-center"
//                 style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//               >
//                 <Sparkles className="w-3 h-3 text-white" />
//               </div>
//               <span className="text-xs text-white/20">© 2024 ficer · redefining assessment</span>
//             </div>
//             <div className="flex items-center gap-6">
//               {['explore', 'legal', 'privacy'].map((l) => (
//                 <Link key={l} href={`/${l}`} className="text-xs text-white/20 hover:text-white/50 transition-colors">
//                   {l}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }









// 'use client';

// import Link from 'next/link';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ArrowRight, Play, CheckCircle, Clock, Users, BarChart3,
//   Brain, Zap, Shield, Star, BookOpen,
//   GraduationCap, Sparkles
// } from 'lucide-react';

// function MouseGlow() {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const move = (e: MouseEvent) => {
//       if (ref.current) {
//         ref.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
//       }
//     };
//     window.addEventListener('mousemove', move);
//     return () => window.removeEventListener('mousemove', move);
//   }, []);
//   return (
//     <div ref={ref} className="pointer-events-none fixed z-0 transition-transform duration-700 ease-out"
//       style={{ top: 0, left: 0, width: 600, height: 600, borderRadius: '50%',
//         background: 'radial-gradient(circle, rgba(52,211,153,0.055) 0%, transparent 70%)' }} />
//   );
// }

// const NODES = [
//   { label: 'Mathematics', sub: '2,847 quizzes', x: '6%', y: '28%', delay: '0s' },
//   { label: 'Science', sub: '1,203 quizzes', x: '5%', y: '64%', delay: '0.4s' },
//   { label: 'History', sub: '940 quizzes', x: '87%', y: '24%', delay: '0.2s' },
//   { label: 'English', sub: '3,412 quizzes', x: '86%', y: '62%', delay: '0.6s' },
// ];

// function StatPill({ value, label }: { value: string; label: string }) {
//   return (
//     <div className="flex flex-col items-center px-6 py-4 rounded-xl"
//       style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
//       <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
//       <span className="text-xs text-white/40 mt-0.5 tracking-wide">{label}</span>
//     </div>
//   );
// }

// function FeatureCard({ icon: Icon, title, desc, accent }: {
//   icon: React.ElementType; title: string; desc: string; accent: string;
// }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div className="p-6 rounded-2xl transition-all duration-300 cursor-default"
//       style={{
//         background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
//         border: `1px solid ${hovered ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.07)'}`,
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}>
//       <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accent }}>
//         <Icon className="w-5 h-5 text-white" />
//       </div>
//       <h3 className="text-white font-semibold text-[15px] mb-2">{title}</h3>
//       <p className="text-white/45 text-[13.5px] leading-relaxed">{desc}</p>
//     </div>
//   );
// }

// function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
//   return (
//     <div className="flex gap-5">
//       <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
//         style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
//         {num}
//       </div>
//       <div>
//         <h4 className="text-white font-semibold text-[15px] mb-1">{title}</h4>
//         <p className="text-white/45 text-[13.5px] leading-relaxed">{desc}</p>
//       </div>
//     </div>
//   );
// }

// function Testimonial({ quote, name, role, score }: {
//   quote: string; name: string; role: string; score: string;
// }) {
//   return (
//     <div className="p-6 rounded-2xl flex flex-col gap-4"
//       style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
//       <div className="flex gap-0.5">
//         {[...Array(5)].map((_, i) => (
//           <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
//         ))}
//       </div>
//       <p className="text-white/60 text-[13.5px] leading-relaxed italic">"{quote}"</p>
//       <div className="flex items-center justify-between mt-auto pt-3"
//         style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
//         <div>
//           <p className="text-white text-sm font-medium">{name}</p>
//           <p className="text-white/35 text-xs">{role}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-emerald-400 font-bold text-sm">{score}</p>
//           <p className="text-white/30 text-[11px]">avg score</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const BRANDS = ['Cambridge', 'MIT OCW', 'Khan Academy', 'Coursera', 'edX', 'Udemy', 'Duolingo'];

// export default function HomePage() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <div style={{ background: '#080810', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');
//         @keyframes floatNode { from { transform: translateY(0px); } to { transform: translateY(-10px); } }
//         @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes pulseGlow { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
//         .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
//         .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
//         .fade-up-3 { animation: fadeUp 0.7s 0.35s ease both; }
//         .fade-up-4 { animation: fadeUp 0.7s 0.5s ease both; }
//         .fade-in-slow { animation: fadeIn 1.2s 0.6s ease both; }
//         .nav-blur { background: rgba(8,8,16,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
//         .btn-primary { background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.3); color: #34d399; transition: all 0.2s; }
//         .btn-primary:hover { background: rgba(52,211,153,0.2); border-color: rgba(52,211,153,0.5); box-shadow: 0 0 20px rgba(52,211,153,0.15); }
//         .btn-white { background: #fff; color: #080810; transition: all 0.2s; }
//         .btn-white:hover { background: rgba(255,255,255,0.88); }
//         .glow-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(52,211,153,0.35), transparent); }
//         .float-node { animation: floatNode 6s ease-in-out infinite alternate; }
//       `}</style>

//       <MouseGlow />

//       {/* NAV */}
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur' : ''}`}>
//         <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg flex items-center justify-center"
//               style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.25)' }}>
//               <span className="text-emerald-400 font-bold text-sm">F</span>
//             </div>
//             <span className="text-white font-semibold text-[15px] tracking-tight">Ficer</span>
//           </div>
//           <div className="hidden md:flex items-center gap-1">
//             {['Features', 'How it Works', 'Pricing', 'FAQ'].map(item => (
//               <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
//                 className="px-3.5 py-2 text-[13px] text-white/55 hover:text-white/90 transition-colors rounded-lg hover:bg-white/[0.04]">
//                 {item}
//               </a>
//             ))}
//             <div className="mx-2 h-4 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
//             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
//               style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)', color: '#34d399' }}>
//               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
//                 style={{ animation: 'pulseGlow 2s infinite' }} />
//               Live Platform
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Link href="/login" className="px-4 py-2 text-[13px] text-white/60 hover:text-white transition-colors">
//               Sign in
//             </Link>
//             <Link href="/signup" className="btn-primary px-4 py-2 rounded-lg text-[13px] font-medium flex items-center gap-1.5">
//               Get Started <ArrowRight className="w-3.5 h-3.5" />
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
//         {/* BG Glows */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute" style={{ top: '5%', left: '15%', width: 420, height: 420, borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
//           <div className="absolute" style={{ top: '10%', right: '10%', width: 350, height: 350, borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(148,163,184,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />
//           <div className="absolute" style={{ bottom: '10%', left: '30%', width: 500, height: 300, borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
//         </div>
//         {/* Grid */}
//         <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
//           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
//             backgroundSize: '60px 60px' }} />
//         {/* Floating nodes */}
//         {NODES.map(n => (
//           <div key={n.label} className="absolute hidden lg:flex flex-col items-start float-node"
//             style={{ left: n.x, top: n.y, animationDelay: n.delay }}>
//             <div className="flex items-center gap-1.5 mb-1">
//               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
//               <span className="text-white/80 text-[13px] font-medium">{n.label}</span>
//             </div>
//             <span className="text-white/30 text-[11px] ml-3">{n.sub}</span>
//           </div>
//         ))}
//         {/* Connecting lines (like reference) */}
//         <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ opacity: 0.08 }}>
//           <line x1="12%" y1="32%" x2="38%" y2="50%" stroke="white" strokeWidth="0.5" />
//           <line x1="12%" y1="66%" x2="38%" y2="54%" stroke="white" strokeWidth="0.5" />
//           <line x1="88%" y1="28%" x2="62%" y2="50%" stroke="white" strokeWidth="0.5" />
//           <line x1="87%" y1="64%" x2="62%" y2="54%" stroke="white" strokeWidth="0.5" />
//         </svg>

//         {/* Center content */}
//         <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
//           <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
//             style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)' }}>
//             <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
//             <span className="text-[12px] text-emerald-400 font-medium tracking-wide">Unlock Your Learning Potential →</span>
//           </div>
//           <h1 className="fade-up-2 text-white leading-[1.08] tracking-[-0.03em] mb-6"
//             style={{ fontSize: 'clamp(2.8rem, 6vw, 4.6rem)', fontFamily: "'DM Serif Display', serif" }}>
//             One-click for{' '}
//             <span style={{ background: 'linear-gradient(135deg, #34d399, #6ee7b7, #a7f3d0)',
//               WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               Smarter Quizzes
//             </span>
//           </h1>
//           <p className="fade-up-3 text-white/50 text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
//             Ficer is the professional quiz platform where teachers create, students learn,
//             and results speak for themselves. Real-time scoring, zero friction.
//           </p>
//           <div className="fade-up-4 flex items-center justify-center gap-3 flex-wrap">
//             <Link href="/signup" className="btn-white px-7 py-3.5 rounded-xl font-semibold text-[14px] flex items-center gap-2 shadow-lg">
//               Open Platform <ArrowRight className="w-4 h-4" />
//             </Link>
//             <Link href="/login" className="btn-primary px-7 py-3.5 rounded-xl font-medium text-[14px] flex items-center gap-2">
//               <Play className="w-4 h-4" /> Discover More
//             </Link>
//           </div>
//           <div className="fade-in-slow mt-14 flex items-center justify-center gap-2 flex-wrap">
//             <StatPill value="12K+" label="Active Students" />
//             <StatPill value="850+" label="Quiz Topics" />
//             <StatPill value="98%" label="Satisfaction" />
//             <StatPill value="4.9★" label="Rated" />
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-8 flex items-center gap-2 text-white/30 text-xs">
//           <div className="w-5 h-5 rounded-full flex items-center justify-center"
//             style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
//             <div className="w-1.5 h-1.5 rounded-full bg-white/40" style={{ animation: 'pulseGlow 2s infinite' }} />
//           </div>
//           01 / Scroll down
//         </div>
//         <div className="absolute bottom-8 right-8 text-right hidden md:block">
//           <p className="text-white/25 text-xs mb-1">Quiz horizons</p>
//           <div className="w-8 h-px ml-auto" style={{ background: 'rgba(255,255,255,0.2)' }} />
//         </div>
//       </section>

//       {/* BRAND STRIP */}
//       <div className="glow-line" />
//       <div className="py-7" style={{ background: 'rgba(255,255,255,0.012)' }}>
//         <p className="text-center text-white/20 text-[11px] tracking-[0.2em] uppercase mb-5">Trusted by educators from</p>
//         <div className="flex items-center justify-center gap-8 flex-wrap px-8">
//           {BRANDS.map(b => (
//             <span key={b} className="text-white/20 text-[13px] font-medium tracking-tight hover:text-white/40 transition-colors cursor-default">{b}</span>
//           ))}
//         </div>
//       </div>
//       <div className="glow-line" />

//       {/* FEATURES */}
//       <section id="features" className="py-28 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
//               style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.15)' }}>
//               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//               <span className="text-[11px] text-emerald-400 font-semibold tracking-widest uppercase">Platform Features</span>
//             </div>
//             <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4"
//               style={{ fontFamily: "'DM Serif Display', serif" }}>
//               Everything you need to teach, test &amp; track
//             </h2>
//             <p className="text-white/45 text-[15px] max-w-lg mx-auto leading-relaxed">
//               Built for modern educators. Whether you're a solo teacher or running a full school, Ficer scales with you.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <FeatureCard icon={Brain} title="AI-Powered Quizzes" desc="Auto-generate questions from any topic. Save hours building assessments from scratch." accent="rgba(52,211,153,0.15)" />
//             <FeatureCard icon={Zap} title="Instant Results" desc="Students get scores the moment they submit. No waiting, no manual grading." accent="rgba(251,191,36,0.12)" />
//             <FeatureCard icon={BarChart3} title="Deep Analytics" desc="Track per-student performance, identify weak topics, and act on real data." accent="rgba(96,165,250,0.12)" />
//             <FeatureCard icon={Shield} title="Anti-Cheat Engine" desc="Time limits, randomized questions, and one-attempt locks keep results honest." accent="rgba(248,113,113,0.12)" />
//             <FeatureCard icon={Users} title="Class Management" desc="Assign quizzes to specific students or entire classes with a single click." accent="rgba(167,139,250,0.12)" />
//             <FeatureCard icon={BookOpen} title="Shareable Links" desc="Share any quiz via a public link — perfect for open assessments and homework." accent="rgba(52,211,153,0.1)" />
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section id="how-it-works" className="py-24 px-6"
//         style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//         <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
//               style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.15)' }}>
//               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//               <span className="text-[11px] text-emerald-400 font-semibold tracking-widest uppercase">How It Works</span>
//             </div>
//             <h2 className="text-white text-3xl font-bold tracking-tight mb-4"
//               style={{ fontFamily: "'DM Serif Display', serif" }}>
//               Up and running in under 3 minutes
//             </h2>
//             <p className="text-white/45 text-[14px] leading-relaxed mb-10">
//               No setup headaches. No documentation to read. Just sign up and start building assessments that students actually want to take.
//             </p>
//             <div className="flex flex-col gap-7">
//               <Step num="01" title="Create your account" desc="Sign up as a teacher in 30 seconds. Instantly get your dashboard and quiz builder." />
//               <Step num="02" title="Build your first quiz" desc="Add questions, set a time limit, and choose who can see it — public or assigned only." />
//               <Step num="03" title="Share & track results" desc="Send students the link. Watch live submissions, review scores, and export reports." />
//             </div>
//           </div>
//           {/* Quiz UI mockup */}
//           <div className="relative">
//             <div className="rounded-2xl p-5 overflow-hidden"
//               style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
//               <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//                 <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(248,113,113,0.5)' }} />
//                 <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(251,191,36,0.5)' }} />
//                 <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(52,211,153,0.5)' }} />
//                 <div className="flex-1 mx-3 h-5 rounded-md" style={{ background: 'rgba(255,255,255,0.05)' }} />
//               </div>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-white/70 text-sm font-medium">Biology — Chapter 4</span>
//                   <div className="flex items-center gap-1 text-emerald-400 text-xs">
//                     <Clock className="w-3 h-3" /> 15 min
//                   </div>
//                 </div>
//                 <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
//                 <p className="text-white/80 text-[13px]">Which organelle is known as the powerhouse of the cell?</p>
//                 {['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'].map((opt, i) => (
//                   <div key={opt} className="flex items-center gap-3 p-2.5 rounded-lg"
//                     style={{
//                       background: i === 1 ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.03)',
//                       border: `1px solid ${i === 1 ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.06)'}`,
//                     }}>
//                     <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
//                       style={{ background: i === 1 ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.07)',
//                         color: i === 1 ? '#34d399' : 'rgba(255,255,255,0.4)',
//                         border: `1px solid ${i === 1 ? 'rgba(52,211,153,0.4)' : 'transparent'}` }}>
//                       {String.fromCharCode(65 + i)}
//                     </div>
//                     <span className={`text-[12px] ${i === 1 ? 'text-emerald-400' : 'text-white/50'}`}>{opt}</span>
//                     {i === 1 && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 ml-auto" />}
//                   </div>
//                 ))}
//                 <button className="w-full mt-2 py-2.5 rounded-lg text-sm font-medium text-white"
//                   style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.1))', border: '1px solid rgba(52,211,153,0.25)' }}>
//                   Submit Answer →
//                 </button>
//               </div>
//             </div>
//             <div className="absolute -bottom-5 -right-4 px-4 py-3 rounded-xl shadow-xl"
//               style={{ background: '#0f1019', border: '1px solid rgba(52,211,153,0.2)' }}>
//               <p className="text-emerald-400 font-bold text-lg leading-none">92%</p>
//               <p className="text-white/35 text-[11px] mt-0.5">Class average</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section className="py-28 px-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-14">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
//               style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.15)' }}>
//               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//               <span className="text-[11px] text-emerald-400 font-semibold tracking-widest uppercase">What Users Say</span>
//             </div>
//             <h2 className="text-white text-3xl font-bold tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
//               Real educators. Real results.
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-4">
//             <Testimonial quote="I used to spend hours marking papers. Now I assign a Ficer quiz and results are ready before class ends." name="Sara Malik" role="High School Biology Teacher" score="88%" />
//             <Testimonial quote="My students are actually excited about quizzes now. The interface is clean and the timer keeps them focused." name="Ahmed Raza" role="University Lecturer, CS" score="91%" />
//             <Testimonial quote="The analytics show exactly which questions are too hard or too easy. Absolute game changer for my classes." name="Fatima Noor" role="Online Tutor, Mathematics" score="95%" />
//           </div>
//         </div>
//       </section>

//       {/* CTA BANNER */}
//       <section id="pricing" className="py-8 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
//             style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)' }}>
//             <div className="absolute inset-0 pointer-events-none"
//               style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.1) 0%, transparent 70%)' }} />
//             <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
//                 style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
//                 <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
//                 <span className="text-[11px] text-emerald-400 font-semibold tracking-widest uppercase">100% Free to Start</span>
//               </div>
//               <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4"
//                 style={{ fontFamily: "'DM Serif Display', serif" }}>
//                 Start teaching smarter today
//               </h2>
//               <p className="text-white/45 text-[15px] mb-10 max-w-md mx-auto leading-relaxed">
//                 No credit card. No trial limits. Create your first quiz in 2 minutes and see why thousands of educators choose Ficer.
//               </p>
//               <div className="flex items-center justify-center gap-3 flex-wrap">
//                 <Link href="/signup" className="btn-white px-8 py-3.5 rounded-xl font-semibold text-[14px] flex items-center gap-2 shadow-lg">
//                   Create Free Account <ArrowRight className="w-4 h-4" />
//                 </Link>
//                 <Link href="/login" className="btn-primary px-8 py-3.5 rounded-xl font-medium text-[14px]">
//                   Sign in →
//                 </Link>
//               </div>
//               <div className="mt-8 flex items-center justify-center gap-6 text-[12px] text-white/30 flex-wrap">
//                 {['No credit card', 'Unlimited quizzes', 'Free forever'].map(t => (
//                   <div key={t} className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-400/50" />
//                     {t}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="mt-20 py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded-md flex items-center justify-center"
//               style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)' }}>
//               <span className="text-emerald-400 font-bold text-xs">F</span>
//             </div>
//             <span className="text-white/50 text-sm">Ficer — Professional Quiz Platform</span>
//           </div>
//           <div className="flex items-center gap-5">
//             {[{ label: 'Features', href: '#features' }, { label: 'Sign Up', href: '/signup' }, { label: 'Login', href: '/login' }, { label: 'FAQ', href: '#faq' }].map(item => (
//               <Link key={item.label} href={item.href} className="text-white/30 hover:text-white/60 text-sm transition-colors">
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//           <p className="text-white/20 text-xs">© 2025 Ficer. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }













// 'use client';

// import Link from 'next/link';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Zap, 
//   Shield, 
//   TrendingUp,
//   Users,
//   Globe,
//   BarChart3,
//   Code2,
//   Rocket,
//   Crown,
//   Compass,
//   BookOpen,
//   Star
// } from 'lucide-react';
// import { useRef, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
//   // Smooth scroll animations
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });
  
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
//   const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
//   // Spring physics for smooth animations
//   const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
//   const smoothY = useSpring(y, springConfig);
//   const smoothScale = useSpring(scale, springConfig);

//   // Mouse move handler for 3D effect
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const { clientX, clientY } = e;
//       const { innerWidth, innerHeight } = window;
      
//       const x = (clientX / innerWidth) * 2 - 1;
//       const y = (clientY / innerHeight) * 2 - 1;
      
//       setMousePosition({ x, y });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Parallax tilt effect
//   const tiltStyle = {
//     transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale3d(1.05, 1.05, 1.05)`,
//     transition: 'transform 0.1s ease-out'
//   };

//   // Beautiful portraits array
//   const portraits = [
//     {
//       id: 1,
//       name: 'Elena',
//       image: 'https://images.unsplash.com/photo-1494790108777-28675fd72c4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Creative Director',
//       gradient: 'from-pink-500/30 to-rose-500/30'
//     },
//     {
//       id: 2,
//       name: 'Sofia',
//       image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Lead Designer',
//       gradient: 'from-purple-500/30 to-indigo-500/30'
//     },
//     {
//       id: 3,
//       name: 'Maya',
//       image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Product Manager',
//       gradient: 'from-blue-500/30 to-cyan-500/30'
//     },
//     {
//       id: 4,
//       name: 'Zara',
//       image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'UX Researcher',
//       gradient: 'from-emerald-500/30 to-teal-500/30'
//     },
//     {
//       id: 5,
//       name: 'Leila',
//       image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Frontend Lead',
//       gradient: 'from-orange-500/30 to-red-500/30'
//     },
//     {
//       id: 6,
//       name: 'Aria',
//       image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
//       role: 'Tech Lead',
//       gradient: 'from-violet-500/30 to-purple-500/30'
//     }
//   ];

//   // Sample quizzes data
//   const featuredQuizzes = [
//     {
//       id: '1',
//       title: 'Web Development Fundamentals',
//       description: 'Master HTML, CSS, and JavaScript basics',
//       questions: 25,
//       duration: 30,
//       level: 'Beginner',
//       image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop&auto=format',
//       author: 'Elena',
//       authorImage: portraits[0].image,
//       category: 'Development'
//     },
//     {
//       id: '2',
//       title: 'UI/UX Design Principles',
//       description: 'Learn design thinking and user experience',
//       questions: 20,
//       duration: 25,
//       level: 'Intermediate',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&auto=format',
//       author: 'Sofia',
//       authorImage: portraits[1].image,
//       category: 'Design'
//     },
//     {
//       id: '3',
//       title: 'Data Science Essentials',
//       description: 'Python, pandas, and data visualization',
//       questions: 30,
//       duration: 45,
//       level: 'Advanced',
//       image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format',
//       author: 'Maya',
//       authorImage: portraits[2].image,
//       category: 'Data Science'
//     },
//     {
//       id: '4',
//       title: 'Product Management 101',
//       description: 'From idea to execution - product lifecycle',
//       questions: 15,
//       duration: 20,
//       level: 'Beginner',
//       image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format',
//       author: 'Zara',
//       authorImage: portraits[3].image,
//       category: 'Business'
//     }
//   ];

//   return (
//     <div ref={containerRef} className="min-h-screen bg-[#030304] font-['Inter',sans-serif] overflow-x-hidden">
//       {/* Premium animated background */}
//       <div className="fixed inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#2b0b3f,transparent)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,#0f2b3f,transparent)]"></div>
        
//         <div className="absolute inset-0" style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px',
//           maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
//         }}></div>
        
//         <motion.div 
//           className="absolute top-20 left-[10%] w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"
//           animate={{
//             x: [0, 30, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div 
//           className="absolute bottom-20 right-[10%] w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl"
//           animate={{
//             x: [0, -40, 0],
//             y: [0, 40, 0],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//       </div>

//       {/* Navigation - Clean */}
//       <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6">
//         <motion.div 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="flex justify-between items-center"
//         >
//           <Link href="/" className="group relative">
//             <h1 className="text-3xl font-light tracking-tight">
//               <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
//                 ficer
//               </span>
//               <span className="ml-2 font-medium bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
//                 quiz
//               </span>
//             </h1>
//           </Link>
          
//           <div className="flex items-center gap-2">
//             <Link 
//               href="/explore"
//               className="group px-4 py-2 text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
//             >
//               <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//               <span>Explore</span>
//             </Link>
//             <Link 
//               href="/login"
//               className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
//             >
//               Sign in
//             </Link>
//             <Link 
//               href="/signup"
//               className="relative group ml-2 px-5 py-2 bg-white text-[#030304] rounded-full hover:bg-white/90 transition-all font-medium text-sm overflow-hidden"
//             >
//               <span className="relative z-10">Get started</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </Link>
//           </div>
//         </motion.div>
//       </nav>

//       {/* Hero Section with 3D Portrait Cube */}
//       <main className="relative max-w-7xl mx-auto px-6 pt-16 pb-32">
//         <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
//           {/* Left column */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             style={{ y: smoothY }}
//           >
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/[0.05] mb-8 backdrop-blur-sm"
//             >
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="w-2 h-2 bg-pink-500 rounded-full"
//               />
//               <span className="text-xs font-mono text-white/40">v3.0 · redefining assessment</span>
//             </motion.div>

//             <h1 className="text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[0.9] mb-6">
//               <span className="text-white/90">assess</span>
//               <br />
//               <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-medium">
//                 beautifully
//               </span>
//             </h1>
            
//             <p className="text-xl text-white/30 max-w-xl mb-12 leading-relaxed font-light">
//               <span className="text-white/60">Ficer</span> combines elegant design with 
//               <span className="text-white/60"> powerful analytics</span> to create 
//               assessments people love.
//             </p>

//             {/* Clean buttons */}
//             <div className="flex flex-wrap gap-4 mb-20">
//               <Link 
//                 href="/signup"
//                 className="group px-8 py-4 bg-white text-[#030304] rounded-2xl hover:bg-white/90 transition-all font-medium flex items-center gap-2"
//               >
//                 Start creating
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Link>
              
//               <Link 
//                 href="/explore"
//                 className="group px-8 py-4 bg-white/[0.02] text-white rounded-2xl hover:bg-white/[0.04] transition-all border border-white/[0.05] backdrop-blur-sm flex items-center gap-2"
//               >
//                 <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                 Explore quizzes
//               </Link>
//             </div>

//             {/* Social proof */}
//             <div className="flex items-center gap-8 border-t border-white/[0.02] pt-8">
//               <div className="flex -space-x-3">
//                 {portraits.slice(0, 5).map((portrait, i) => (
//                   <motion.div
//                     key={portrait.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * i }}
//                     className="w-10 h-10 rounded-full border-2 border-[#030304] overflow-hidden"
//                   >
//                     <img 
//                       src={portrait.image} 
//                       alt={portrait.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//               <div>
//                 <div className="text-sm text-white font-medium">Trusted by <span className="text-pink-400">500+</span> teams</div>
//                 <div className="text-xs text-white/30">including Fortune 500 companies</div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right column - 3D Portrait Cube */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.4 }}
//             style={{ y: smoothY, scale: smoothScale }}
//             className="relative hidden lg:block"
//           >
//             <div className="relative w-full aspect-square perspective-2000">
//               <motion.div
//                 animate={{
//                   rotateX: [0, 360],
//                   rotateY: [0, 360],
//                 }}
//                 transition={{
//                   duration: 20,
//                   repeat: Infinity,
//                   ease: "linear"
//                 }}
//                 style={tiltStyle}
//                 className="relative w-full h-full transform-style-3d"
//               >
//                 {/* Cube faces with beautiful portraits */}
//                 {portraits.slice(0, 6).map((portrait, index) => (
//                   <motion.div
//                     key={portrait.id}
//                     className={`absolute inset-0 bg-gradient-to-br ${portrait.gradient} backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden`}
//                     style={{
//                       transform: `rotate${index < 4 ? 'Y' : 'X'}(${index * 90}deg) translateZ(200px)`,
//                       boxShadow: '0 0 50px rgba(0,0,0,0.5)'
//                     }}
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <img 
//                       src={portrait.image} 
//                       alt={portrait.name}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//                       <div>
//                         <p className="text-white font-medium">{portrait.name}</p>
//                         <p className="text-white/60 text-xs">{portrait.role}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </main>

//       {/* Explore Quizzes Section */}
//       <section className="relative border-t border-white/[0.02] bg-black/20 py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex justify-between items-end mb-12"
//           >
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] rounded-full border border-white/[0.05] mb-4">
//                 <Star className="w-3 h-3 text-pink-400" />
//                 <span className="text-xs text-white/40">featured quizzes</span>
//               </div>
//               <h2 className="text-4xl font-light text-white mb-2">
//                 explore 
//                 <span className="ml-2 font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//                   popular
//                 </span>
//               </h2>
//               <p className="text-white/30">Discover quizzes created by our community</p>
//             </div>
            
//             <Link 
//               href="/explore"
//               className="group flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
//             >
//               View all
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>

//           {/* Quiz Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredQuizzes.map((quiz, index) => (
//               <motion.div
//                 key={quiz.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 onClick={() => router.push(`/quiz/${quiz.id}`)}
//                 className="group cursor-pointer"
//               >
//                 <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
//                   {/* Quiz Image */}
//                   <div className="relative h-40 overflow-hidden">
//                     <img 
//                       src={quiz.image} 
//                       alt={quiz.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
//                     {/* Category tag */}
//                     <div className="absolute top-3 left-3 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] text-white/80 border border-white/10">
//                       {quiz.category}
//                     </div>
                    
//                     {/* Level tag */}
//                     <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] text-white/60 border border-white/10">
//                       {quiz.level}
//                     </div>
//                   </div>
                  
//                   {/* Content */}
//                   <div className="p-4">
//                     <h3 className="text-white font-medium mb-1 line-clamp-1">{quiz.title}</h3>
//                     <p className="text-white/30 text-xs mb-3 line-clamp-2">{quiz.description}</p>
                    
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <img 
//                           src={quiz.authorImage} 
//                           alt={quiz.author}
//                           className="w-5 h-5 rounded-full border border-white/20"
//                         />
//                         <span className="text-xs text-white/40">{quiz.author}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-white/30">
//                         <BookOpen className="w-3 h-3" />
//                         <span>{quiz.questions}</span>
//                         <span>·</span>
//                         <span>{quiz.duration}m</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section className="relative border-t border-white/[0.02] bg-black/20 py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-5xl font-light tracking-tight text-white mb-4">
//               engineered for 
//               <span className="ml-3 font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//                 excellence
//               </span>
//             </h2>
//             <p className="text-white/30 max-w-2xl mx-auto">
//               Every detail crafted for the modern assessment experience
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: Zap,
//                 title: 'lightning fast',
//                 description: 'Sub-100ms response times with edge computing',
//                 gradient: 'from-pink-500 to-purple-500',
//                 stats: '99.9% uptime'
//               },
//               {
//                 icon: Shield,
//                 title: 'enterprise security',
//                 description: 'Bank-level encryption and compliance',
//                 gradient: 'from-purple-500 to-indigo-500',
//                 stats: 'SOC2 Type II'
//               },
//               {
//                 icon: TrendingUp,
//                 title: 'adaptive learning',
//                 description: 'AI-powered question adaptation',
//                 gradient: 'from-indigo-500 to-blue-500',
//                 stats: '2x engagement'
//               }
//             ].map((feature, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all duration-300"
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
//                 <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                   <feature.icon className="w-7 h-7 text-white" />
//                 </div>
                
//                 <h3 className="text-2xl font-light text-white mb-3">{feature.title}</h3>
//                 <p className="text-white/30 text-sm leading-relaxed mb-6">{feature.description}</p>
                
//                 <div className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">
//                   {feature.stats}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative border-t border-white/[0.02] py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="relative bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl p-20 text-center overflow-hidden"
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.2, 1],
//                 rotate: [0, 180, 360],
//               }}
//               transition={{
//                 duration: 20,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//               className="absolute inset-0 opacity-20"
//               style={{
//                 backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
//               }}
//             />
            
//             <h2 className="text-5xl font-light text-white mb-6 relative z-10">
//               ready to 
//               <span className="ml-3 font-medium bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
//                 transform?
//               </span>
//             </h2>
            
//             <p className="text-white/30 mb-10 max-w-2xl mx-auto relative z-10">
//               Join thousands of creators using Ficer
//             </p>
            
//             <Link
//               href="/signup"
//               className="group relative inline-flex px-8 py-4 bg-white text-[#030304] rounded-2xl hover:bg-white/90 transition-all font-medium items-center gap-2 overflow-hidden z-10"
//             >
//               <span className="relative z-10">Claim your workspace</span>
//               <Rocket className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative border-t border-white/[0.02] py-8">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex justify-between items-center text-xs text-white/20">
//             <div>© 2024 ficer · redefining assessment</div>
//             <div className="flex gap-8">
//               <Link href="/explore" className="hover:text-white/40 transition-colors">explore</Link>
//               <Link href="/legal" className="hover:text-white/40 transition-colors">legal</Link>
//               <Link href="/privacy" className="hover:text-white/40 transition-colors">privacy</Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         .perspective-2000 {
//           perspective: 2000px;
//         }
//         .transform-style-3d {
//           transform-style: preserve-3d;
//         }
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// }




// 'use client';

// import Link from 'next/link';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Zap, 
//   Shield, 
//   TrendingUp,
//   Users,
//   Compass,
//   BookOpen,
//   Star,
//   Rocket,
//   Play,
//   CheckCircle2,
//   Clock,
//   ChevronRight
// } from 'lucide-react';
// import { useRef, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrolled, setScrolled] = useState(false);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
//   const smoothHeroY = useSpring(heroY, { stiffness: 80, damping: 25 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 2;
//       const y = (e.clientY / window.innerHeight - 0.5) * 2;
//       setMousePosition({ x, y });
//     };
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const portraits = [
//     { id: 1, name: 'Elena', image: 'https://images.unsplash.com/photo-1494790108777-28675fd72c4e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//     { id: 2, name: 'Sofia', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//     { id: 3, name: 'Maya', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//     { id: 4, name: 'Zara', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//     { id: 5, name: 'Leila', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
//   ];

//   const featuredQuizzes = [
//     {
//       id: '1',
//       title: 'Web Development Fundamentals',
//       description: 'Master HTML, CSS, and JavaScript basics with hands-on challenges',
//       questions: 25,
//       duration: 30,
//       level: 'Beginner',
//       levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
//       image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop&auto=format&q=80',
//       author: 'Elena',
//       authorImage: portraits[0].image,
//       category: 'Development',
//       rating: 4.9,
//       students: 1240
//     },
//     {
//       id: '2',
//       title: 'UI/UX Design Principles',
//       description: 'Learn design thinking and craft exceptional user experiences',
//       questions: 20,
//       duration: 25,
//       level: 'Intermediate',
//       levelColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
//       image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&auto=format&q=80',
//       author: 'Sofia',
//       authorImage: portraits[1].image,
//       category: 'Design',
//       rating: 4.8,
//       students: 987
//     },
//     {
//       id: '3',
//       title: 'Data Science Essentials',
//       description: 'Python, pandas, and data visualization mastery',
//       questions: 30,
//       duration: 45,
//       level: 'Advanced',
//       levelColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
//       image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80',
//       author: 'Maya',
//       authorImage: portraits[2].image,
//       category: 'Data Science',
//       rating: 4.7,
//       students: 764
//     },
//     {
//       id: '4',
//       title: 'Product Management 101',
//       description: 'From idea to execution — the complete product lifecycle',
//       questions: 15,
//       duration: 20,
//       level: 'Beginner',
//       levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
//       image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format&q=80',
//       author: 'Zara',
//       authorImage: portraits[3].image,
//       category: 'Business',
//       rating: 4.9,
//       students: 612
//     }
//   ];

//   const features = [
//     {
//       icon: Zap,
//       title: 'Lightning Fast',
//       description: 'Sub-100ms response times powered by edge computing infrastructure globally.',
//       stat: '99.9% uptime',
//       accent: '#6366f1'
//     },
//     {
//       icon: Shield,
//       title: 'Enterprise Security',
//       description: 'Bank-level encryption, SOC2 compliance, and privacy-first architecture.',
//       stat: 'SOC2 Type II',
//       accent: '#8b5cf6'
//     },
//     {
//       icon: TrendingUp,
//       title: 'Smart Analytics',
//       description: 'AI-powered insights that adapt to learner behavior and maximize engagement.',
//       stat: '2× engagement',
//       accent: '#a78bfa'
//     }
//   ];

//   return (
//     <div
//       ref={containerRef}
//       className="min-h-screen overflow-x-hidden"
//       style={{ background: '#050508', fontFamily: "'DM Sans', 'Inter', sans-serif" }}
//     >
//       {/* Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         {/* Main gradient orbs */}
//         <motion.div
//           animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
//           transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
//           className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full"
//           style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
//         />
//         <motion.div
//           animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
//           transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
//           className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
//           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
//         />
//         {/* Subtle grid */}
//         <div
//           className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
//             backgroundSize: '64px 64px'
//           }}
//         />
//         {/* Top vignette */}
//         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
//       </div>

//       {/* ─── NAVBAR ─── */}
//       <motion.nav
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-50 max-w-7xl mx-auto px-6 pt-6"
//       >
//         <div
//           className="flex justify-between items-center px-5 py-3 rounded-2xl border border-white/[0.06] backdrop-blur-xl"
//           style={{ background: scrolled ? 'rgba(5,5,8,0.85)' : 'rgba(255,255,255,0.02)' }}
//         >
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2.5">
//             <div
//               className="w-8 h-8 rounded-xl flex items-center justify-center"
//               style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//             >
//               <Sparkles className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-white font-semibold tracking-tight text-lg">
//               ficer<span className="text-indigo-400 font-light">quiz</span>
//             </span>
//           </Link>

//           {/* Nav links */}
//           <div className="hidden md:flex items-center gap-1">
//             {['Explore', 'Features', 'Pricing'].map((item) => (
//               <Link
//                 key={item}
//                 href={`/${item.toLowerCase()}`}
//                 className="px-4 py-2 text-sm text-white/40 hover:text-white/80 rounded-xl hover:bg-white/[0.04] transition-all"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>

//           {/* Auth buttons */}
//           <div className="flex items-center gap-2">
//             <Link
//               href="/login"
//               className="hidden sm:block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
//             >
//               Sign in
//             </Link>
//             <Link
//               href="/signup"
//               className="px-5 py-2 text-sm font-medium text-white rounded-xl transition-all hover:opacity-90 hover:scale-[1.02]"
//               style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//             >
//               Get started
//             </Link>
//           </div>
//         </div>
//       </motion.nav>

//       {/* ─── HERO ─── */}
//       <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
//         <motion.div style={{ y: smoothHeroY, opacity: heroOpacity }} className="text-center">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-10"
//           >
//             <motion.div
//               animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
//               transition={{ duration: 2.5, repeat: Infinity }}
//               className="w-1.5 h-1.5 rounded-full bg-indigo-400"
//             />
//             <span className="text-xs font-medium text-indigo-300/80 tracking-wide">
//               v3.0 · redefining assessment
//             </span>
//           </motion.div>

//           {/* Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.88] mb-8"
//           >
//             <span className="text-white/90">assess</span>
//             <br />
//             <span
//               className="font-semibold"
//               style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
//             >
//               beautifully
//             </span>
//           </motion.h1>

//           {/* Subheading */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.45 }}
//             className="text-lg text-white/30 max-w-2xl mx-auto mb-12 leading-relaxed"
//           >
//             <span className="text-white/60">Ficer</span> combines elegant design with{' '}
//             <span className="text-white/60">powerful analytics</span> to create
//             assessments people actually love.
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.55 }}
//             className="flex flex-wrap items-center justify-center gap-4 mb-20"
//           >
//             <Link
//               href="/signup"
//               className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-2xl"
//               style={{
//                 background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//                 boxShadow: '0 0 40px rgba(99,102,241,0.3)'
//               }}
//             >
//               Start creating
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               href="/explore"
//               className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-medium text-white/60 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
//             >
//               <Play className="w-4 h-4" />
//               Explore quizzes
//             </Link>
//           </motion.div>

//           {/* Social Proof */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.7 }}
//             className="flex flex-col sm:flex-row items-center justify-center gap-6"
//           >
//             <div className="flex items-center gap-3">
//               <div className="flex -space-x-2.5">
//                 {portraits.map((p, i) => (
//                   <motion.div
//                     key={p.id}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 + i * 0.08 }}
//                     className="w-9 h-9 rounded-full border-2 overflow-hidden"
//                     style={{ borderColor: '#050508' }}
//                   >
//                     <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
//                   </motion.div>
//                 ))}
//               </div>
//               <div className="text-left">
//                 <div className="text-sm font-medium text-white">
//                   <span className="text-indigo-400">500+</span> teams trust Ficer
//                 </div>
//                 <div className="text-xs text-white/25">including Fortune 500 companies</div>
//               </div>
//             </div>

//             <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />

//             <div className="flex items-center gap-4">
//               {[
//                 { val: '98%', label: 'satisfaction' },
//                 { val: '50k+', label: 'quizzes taken' },
//               ].map((s) => (
//                 <div key={s.label} className="text-center">
//                   <div className="text-lg font-semibold text-white">{s.val}</div>
//                   <div className="text-xs text-white/25">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* ─── FEATURED QUIZZES ─── */}
//       <section className="relative border-t border-white/[0.04] py-28">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
//           >
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-5">
//                 <Star className="w-3 h-3 text-indigo-400" />
//                 <span className="text-xs font-medium text-indigo-400/80">Featured quizzes</span>
//               </div>
//               <h2 className="text-4xl font-light text-white tracking-tight">
//                 explore{' '}
//                 <span
//                   className="font-semibold"
//                   style={{ background: 'linear-gradient(135deg, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
//                 >
//                   popular
//                 </span>
//               </h2>
//               <p className="text-white/30 mt-2 text-sm">Discover quizzes crafted by our community</p>
//             </div>
//             <Link
//               href="/explore"
//               className="group flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors whitespace-nowrap"
//             >
//               View all
//               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
//             {featuredQuizzes.map((quiz, i) => (
//               <motion.div
//                 key={quiz.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -6 }}
//                 onClick={() => router.push(`/quiz/${quiz.id}`)}
//                 className="group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/15 transition-all duration-300"
//                 style={{ background: 'rgba(255,255,255,0.02)' }}
//               >
//                 {/* Image */}
//                 <div className="relative h-44 overflow-hidden">
//                   <img
//                     src={quiz.image}
//                     alt={quiz.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
//                   <div className="absolute top-3 left-3">
//                     <span className="px-2.5 py-1 text-[10px] font-medium text-white/70 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm">
//                       {quiz.category}
//                     </span>
//                   </div>
//                   <div className="absolute top-3 right-3">
//                     <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full border ${quiz.levelColor} backdrop-blur-sm`}>
//                       {quiz.level}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <h3 className="text-white font-medium text-sm mb-1.5 line-clamp-1">{quiz.title}</h3>
//                   <p className="text-white/30 text-xs mb-4 line-clamp-2 leading-relaxed">{quiz.description}</p>

//                   {/* Stats row */}
//                   <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
//                     <div className="flex items-center gap-2">
//                       <img src={quiz.authorImage} alt={quiz.author} className="w-5 h-5 rounded-full border border-white/10" />
//                       <span className="text-[11px] text-white/40">{quiz.author}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-[11px] text-white/25">
//                       <span className="flex items-center gap-1">
//                         <BookOpen className="w-3 h-3" /> {quiz.questions}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" /> {quiz.duration}m
//                       </span>
//                     </div>
//                   </div>

//                   {/* Rating */}
//                   <div className="flex items-center gap-1.5 mt-3">
//                     <div className="flex gap-0.5">
//                       {[...Array(5)].map((_, si) => (
//                         <Star key={si} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
//                       ))}
//                     </div>
//                     <span className="text-[10px] text-white/30">{quiz.rating} · {quiz.students.toLocaleString()} students</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── FEATURES ─── */}
//       <section className="relative border-t border-white/[0.04] py-28">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-5xl font-light tracking-tight text-white mb-4">
//               engineered for{' '}
//               <span
//                 className="font-semibold"
//                 style={{ background: 'linear-gradient(135deg, #a5b4fc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
//               >
//                 excellence
//               </span>
//             </h2>
//             <p className="text-white/30 max-w-xl mx-auto text-sm leading-relaxed">
//               Every detail has been crafted for the modern assessment experience
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-5">
//             {features.map((f, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -4 }}
//                 className="group relative p-8 rounded-2xl border border-white/[0.06] hover:border-white/12 transition-all duration-300 overflow-hidden"
//                 style={{ background: 'rgba(255,255,255,0.018)' }}
//               >
//                 {/* Hover glow */}
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
//                   style={{ background: `radial-gradient(circle at 50% 0%, ${f.accent}12 0%, transparent 60%)` }}
//                 />

//                 <div
//                   className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6"
//                   style={{ background: `${f.accent}18`, border: `1px solid ${f.accent}25` }}
//                 >
//                   <f.icon className="w-5 h-5" style={{ color: f.accent }} />
//                 </div>

//                 <h3 className="text-xl font-medium text-white mb-3">{f.title}</h3>
//                 <p className="text-white/30 text-sm leading-relaxed mb-6">{f.description}</p>

//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/60" />
//                   <span className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">{f.stat}</span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─── */}
//       <section className="relative border-t border-white/[0.04] py-28">
//         <div className="max-w-5xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.97 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative rounded-3xl p-16 sm:p-20 text-center overflow-hidden border border-white/[0.06]"
//             style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(168,85,247,0.05) 100%)' }}
//           >
//             {/* Decorative top line */}
//             <div
//               className="absolute top-0 inset-x-0 h-px"
//               style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }}
//             />

//             <motion.div
//               className="absolute inset-0 rounded-3xl"
//               animate={{ opacity: [0.3, 0.6, 0.3] }}
//               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//               style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 60%)' }}
//             />

//             <div className="relative z-10">
//               <h2 className="text-5xl sm:text-6xl font-light text-white mb-6 tracking-tight">
//                 ready to{' '}
//                 <span
//                   className="font-semibold"
//                   style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
//                 >
//                   transform?
//                 </span>
//               </h2>

//               <p className="text-white/30 mb-10 max-w-md mx-auto text-sm leading-relaxed">
//                 Join thousands of educators using Ficer to create impactful learning experiences.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                 <Link
//                   href="/signup"
//                   className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
//                   style={{
//                     background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//                     boxShadow: '0 0 40px rgba(99,102,241,0.3)'
//                   }}
//                 >
//                   Claim your workspace
//                   <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//                 <Link
//                   href="/explore"
//                   className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
//                 >
//                   <Compass className="w-4 h-4" />
//                   Browse quizzes first
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ─── FOOTER ─── */}
//       <footer className="relative border-t border-white/[0.04] py-10">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-2.5">
//               <div
//                 className="w-6 h-6 rounded-lg flex items-center justify-center"
//                 style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
//               >
//                 <Sparkles className="w-3 h-3 text-white" />
//               </div>
//               <span className="text-xs text-white/20">© 2024 ficer · redefining assessment</span>
//             </div>
//             <div className="flex items-center gap-6">
//               {['explore', 'legal', 'privacy'].map((l) => (
//                 <Link key={l} href={`/${l}`} className="text-xs text-white/20 hover:text-white/50 transition-colors">
//                   {l}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }









'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Play, CheckCircle, Clock, Users, BarChart3,
  Brain, Zap, Shield, Star, BookOpen,
  GraduationCap, Sparkles
} from 'lucide-react';

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed z-0 transition-transform duration-700 ease-out"
      style={{ top: 0, left: 0, width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,215,205,0.045) 0%, transparent 70%)' }} />
  );
}

const NODES = [
  { label: 'Mathematics', sub: '2,847 quizzes', x: '6%', y: '28%', delay: '0s' },
  { label: 'Science', sub: '1,203 quizzes', x: '5%', y: '64%', delay: '0.4s' },
  { label: 'History', sub: '940 quizzes', x: '87%', y: '24%', delay: '0.2s' },
  { label: 'English', sub: '3,412 quizzes', x: '86%', y: '62%', delay: '0.6s' },
];

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-4 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
      <span className="text-xs text-white/40 mt-0.5 tracking-wide">{label}</span>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, accent }: {
  icon: React.ElementType; title: string; desc: string; accent: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="p-6 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.07)'}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accent }}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-white font-semibold text-[15px] mb-2">{title}</h3>
      <p className="text-white/45 text-[13.5px] leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#34d399' }}>
        {num}
      </div>
      <div>
        <h4 className="text-white font-semibold text-[15px] mb-1">{title}</h4>
        <p className="text-white/45 text-[13.5px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Testimonial({ quote, name, role, score }: {
  quote: string; name: string; role: string; score: string;
}) {
  return (
    <div className="p-6 rounded-2xl flex flex-col gap-4"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
        ))}
      </div>
      <p className="text-white/60 text-[13.5px] leading-relaxed italic">"{quote}"</p>
      <div className="flex items-center justify-between mt-auto pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <p className="text-white text-sm font-medium">{name}</p>
          <p className="text-white/35 text-xs">{role}</p>
        </div>
        <div className="text-right">
          <p className="text-emerald-400 font-bold text-sm">{score}</p>
          <p className="text-white/30 text-[11px]">avg score</p>
        </div>
      </div>
    </div>
  );
}

const BRANDS = ['Cambridge', 'MIT OCW', 'Khan Academy', 'Coursera', 'edX', 'Udemy', 'Duolingo'];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: '#080810', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes floatNode { from { transform: translateY(0px); } to { transform: translateY(-10px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulseGlow { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.35s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.5s ease both; }
        .fade-in-slow { animation: fadeIn 1.2s 0.6s ease both; }
        .nav-blur { background: rgba(8,8,16,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .btn-primary { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.13); color: rgba(255,255,255,0.82); transition: all 0.2s; }
        .btn-primary:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.22); }
        .btn-white { background: #fff; color: #080810; transition: all 0.2s; }
        .btn-white:hover { background: rgba(255,255,255,0.88); }
        .glow-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); }
        .float-node { animation: floatNode 6s ease-in-out infinite alternate; }
      `}</style>

      <MouseGlow />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="text-white/80 font-bold text-sm">F</span>
            </div>
            <span className="text-white font-semibold text-[15px] tracking-tight">Ficer</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {['Features', 'How it Works', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="px-3.5 py-2 text-[13px] text-white/55 hover:text-white/90 transition-colors rounded-lg hover:bg-white/[0.04]">
                {item}
              </a>
            ))}
            <div className="mx-2 h-4 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
              style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)', color: '#34d399' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"
                style={{ animation: 'pulseGlow 2s infinite' }} />
              Live Platform
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="px-4 py-2 text-[13px] text-white/60 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary px-4 py-2 rounded-lg text-[13px] font-medium flex items-center gap-1.5">
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* BG Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{ top: '5%', left: '15%', width: 420, height: 420, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(180,200,190,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute" style={{ top: '10%', right: '10%', width: 350, height: 350, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(148,163,184,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />
          <div className="absolute" style={{ bottom: '10%', left: '30%', width: 500, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(180,200,190,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
            backgroundSize: '60px 60px' }} />
        {/* Floating nodes */}
        {NODES.map(n => (
          <div key={n.label} className="absolute hidden lg:flex flex-col items-start float-node"
            style={{ left: n.x, top: n.y, animationDelay: n.delay }}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40/70" />
              <span className="text-white/80 text-[13px] font-medium">{n.label}</span>
            </div>
            <span className="text-white/30 text-[11px] ml-3">{n.sub}</span>
          </div>
        ))}
        {/* Connecting lines (like reference) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ opacity: 0.08 }}>
          <line x1="12%" y1="32%" x2="38%" y2="50%" stroke="white" strokeWidth="0.5" />
          <line x1="12%" y1="66%" x2="38%" y2="54%" stroke="white" strokeWidth="0.5" />
          <line x1="88%" y1="28%" x2="62%" y2="50%" stroke="white" strokeWidth="0.5" />
          <line x1="87%" y1="64%" x2="62%" y2="54%" stroke="white" strokeWidth="0.5" />
        </svg>

        {/* Center content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Sparkles className="w-3.5 h-3.5 text-white/60" />
            <span className="text-[12px] text-white/60 font-medium tracking-wide">Unlock Your Learning Potential →</span>
          </div>
          <h1 className="fade-up-2 text-white leading-[1.08] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 4.6rem)', fontFamily: "'DM Serif Display', serif" }}>
            One-click for{' '}
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>
              Smarter Quizzes
            </span>
          </h1>
          <p className="fade-up-3 text-white/50 text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
            Ficer is the professional quiz platform where teachers create, students learn,
            and results speak for themselves. Real-time scoring, zero friction.
          </p>
          <div className="fade-up-4 flex items-center justify-center gap-3 flex-wrap">
            <Link href="/signup" className="btn-white px-7 py-3.5 rounded-xl font-semibold text-[14px] flex items-center gap-2 shadow-lg">
              Open Platform <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="btn-primary px-7 py-3.5 rounded-xl font-medium text-[14px] flex items-center gap-2">
              <Play className="w-4 h-4" /> Discover More
            </Link>
            <Link href="/quizzes" className="px-7 py-3.5 rounded-xl font-medium text-[14px] flex items-center gap-2 transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
              <BookOpen className="w-4 h-4" /> Browse Quizzes
            </Link>
          </div>
          <div className="fade-in-slow mt-14 flex items-center justify-center gap-2 flex-wrap">
            <StatPill value="12K+" label="Active Students" />
            <StatPill value="850+" label="Quiz Topics" />
            <StatPill value="98%" label="Satisfaction" />
            <StatPill value="4.9★" label="Rated" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-8 flex items-center gap-2 text-white/30 text-xs">
          <div className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" style={{ animation: 'pulseGlow 2s infinite' }} />
          </div>
          01 / Scroll down
        </div>
        <div className="absolute bottom-8 right-8 text-right hidden md:block">
          <p className="text-white/25 text-xs mb-1">Quiz horizons</p>
          <div className="w-8 h-px ml-auto" style={{ background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </section>

      {/* BRAND STRIP */}
      <div className="glow-line" />
      <div className="py-7" style={{ background: 'rgba(255,255,255,0.012)' }}>
        <p className="text-center text-white/20 text-[11px] tracking-[0.2em] uppercase mb-5">Trusted by educators from</p>
        <div className="flex items-center justify-center gap-8 flex-wrap px-8">
          {BRANDS.map(b => (
            <span key={b} className="text-white/20 text-[13px] font-medium tracking-tight hover:text-white/40 transition-colors cursor-default">{b}</span>
          ))}
        </div>
      </div>
      <div className="glow-line" />

      {/* FEATURES */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">Platform Features</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              Everything you need to teach, test &amp; track
            </h2>
            <p className="text-white/45 text-[15px] max-w-lg mx-auto leading-relaxed">
              Built for modern educators. Whether you're a solo teacher or running a full school, Ficer scales with you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon={Brain} title="AI-Powered Quizzes" desc="Auto-generate questions from any topic. Save hours building assessments from scratch." accent="rgba(52,211,153,0.15)" />
            <FeatureCard icon={Zap} title="Instant Results" desc="Students get scores the moment they submit. No waiting, no manual grading." accent="rgba(251,191,36,0.12)" />
            <FeatureCard icon={BarChart3} title="Deep Analytics" desc="Track per-student performance, identify weak topics, and act on real data." accent="rgba(96,165,250,0.12)" />
            <FeatureCard icon={Shield} title="Anti-Cheat Engine" desc="Time limits, randomized questions, and one-attempt locks keep results honest." accent="rgba(248,113,113,0.12)" />
            <FeatureCard icon={Users} title="Class Management" desc="Assign quizzes to specific students or entire classes with a single click." accent="rgba(167,139,250,0.12)" />
            <FeatureCard icon={BookOpen} title="Shareable Links" desc="Share any quiz via a public link — perfect for open assessments and homework." accent="rgba(52,211,153,0.1)" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6"
        style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">How It Works</span>
            </div>
            <h2 className="text-white text-3xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              Up and running in under 3 minutes
            </h2>
            <p className="text-white/45 text-[14px] leading-relaxed mb-10">
              No setup headaches. No documentation to read. Just sign up and start building assessments that students actually want to take.
            </p>
            <div className="flex flex-col gap-7">
              <Step num="01" title="Create your account" desc="Sign up as a teacher in 30 seconds. Instantly get your dashboard and quiz builder." />
              <Step num="02" title="Build your first quiz" desc="Add questions, set a time limit, and choose who can see it — public or assigned only." />
              <Step num="03" title="Share & track results" desc="Send students the link. Watch live submissions, review scores, and export reports." />
            </div>
          </div>
          {/* Quiz UI mockup */}
          <div className="relative">
            <div className="rounded-2xl p-5 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(248,113,113,0.5)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(251,191,36,0.5)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(52,211,153,0.5)' }} />
                <div className="flex-1 mx-3 h-5 rounded-md" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm font-medium">Biology — Chapter 4</span>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs">
                    <Clock className="w-3 h-3" /> 15 min
                  </div>
                </div>
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <p className="text-white/80 text-[13px]">Which organelle is known as the powerhouse of the cell?</p>
                {['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'].map((opt, i) => (
                  <div key={opt} className="flex items-center gap-3 p-2.5 rounded-lg"
                    style={{
                      background: i === 1 ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${i === 1 ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    }}>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: i === 1 ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.07)',
                        color: i === 1 ? '#34d399' : 'rgba(255,255,255,0.4)',
                        border: `1px solid ${i === 1 ? 'rgba(52,211,153,0.4)' : 'transparent'}` }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className={`text-[12px] ${i === 1 ? 'text-emerald-400' : 'text-white/50'}`}>{opt}</span>
                    {i === 1 && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 ml-auto" />}
                  </div>
                ))}
                <button className="w-full mt-2 py-2.5 rounded-lg text-sm font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.1))', border: '1px solid rgba(52,211,153,0.25)' }}>
                  Submit Answer →
                </button>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 px-4 py-3 rounded-xl shadow-xl"
              style={{ background: '#0f1019', border: '1px solid rgba(52,211,153,0.2)' }}>
              <p className="text-emerald-400 font-bold text-lg leading-none">92%</p>
              <p className="text-white/35 text-[11px] mt-0.5">Class average</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">What Users Say</span>
            </div>
            <h2 className="text-white text-3xl font-bold tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Real educators. Real results.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Testimonial quote="I used to spend hours marking papers. Now I assign a Ficer quiz and results are ready before class ends." name="Sara Malik" role="High School Biology Teacher" score="88%" />
            <Testimonial quote="My students are actually excited about quizzes now. The interface is clean and the timer keeps them focused." name="Ahmed Raza" role="University Lecturer, CS" score="91%" />
            <Testimonial quote="The analytics show exactly which questions are too hard or too easy. Absolute game changer for my classes." name="Fatima Noor" role="Online Tutor, Mathematics" score="95%" />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="pricing" className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <GraduationCap className="w-3.5 h-3.5 text-white/50" />
                <span className="text-[11px] text-white/50 font-semibold tracking-widest uppercase">100% Free to Start</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}>
                Start teaching smarter today
              </h2>
              <p className="text-white/45 text-[15px] mb-10 max-w-md mx-auto leading-relaxed">
                No credit card. No trial limits. Create your first quiz in 2 minutes and see why thousands of educators choose Ficer.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link href="/signup" className="btn-white px-8 py-3.5 rounded-xl font-semibold text-[14px] flex items-center gap-2 shadow-lg">
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="btn-primary px-8 py-3.5 rounded-xl font-medium text-[14px]">
                  Sign in →
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-[12px] text-white/30 flex-wrap">
                {['No credit card', 'Unlimited quizzes', 'Free forever'].map(t => (
                  <div key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white/30" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="text-white/70 font-bold text-xs">F</span>
            </div>
            <span className="text-white/50 text-sm">Ficer — Professional Quiz Platform</span>
          </div>
          <div className="flex items-center gap-5">
            {[{ label: 'Features', href: '#features' }, { label: 'Sign Up', href: '/signup' }, { label: 'Login', href: '/login' }, { label: 'FAQ', href: '#faq' }].map(item => (
              <Link key={item.label} href={item.href} className="text-white/30 hover:text-white/60 text-sm transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-white/20 text-xs">© 2025 Ficer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}