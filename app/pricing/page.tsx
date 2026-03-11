// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Sparkles, CheckCircle, ArrowRight, Zap, Building2, Star, ChevronLeft } from 'lucide-react';

// const T = {
//   bg: '#0B0B0F',
//   bgCard: '#111117',
//   accent: '#a855f7',
//   accentLight: '#c084fc',
//   accentDark: '#7c3aed',
//   accentGlow: 'rgba(168,85,247,0.16)',
//   accentBorder: 'rgba(168,85,247,0.2)',
//   accentBg: 'rgba(168,85,247,0.08)',
//   border: 'rgba(255,255,255,0.08)',
// };

// const plans = [
//   {
//     name: 'Free',
//     icon: Star,
//     price: '$0',
//     period: 'forever',
//     tagline: 'Perfect for individual teachers and small classes.',
//     cta: 'Get started free',
//     href: '/signup',
//     highlight: false,
//     features: [
//       'Up to 3 active quizzes',
//       'Up to 30 participants per quiz',
//       'Basic analytics',
//       'Shareable quiz links',
//       'Manual question creation',
//       'Export results as CSV',
//     ],
//   },
//   {
//     name: 'Pro',
//     icon: Zap,
//     price: '$9',
//     period: 'per month',
//     tagline: 'For power users — teachers, tutors, and growing teams.',
//     cta: 'Start Pro free for 14 days',
//     href: '/signup?plan=pro',
//     highlight: true,
//     badge: 'Most Popular',
//     features: [
//       'Unlimited quizzes',
//       'Unlimited participants',
//       'AI quiz generator',
//       'Live analytics dashboard',
//       'Anti-cheat controls',
//       'Auto leaderboard',
//       'Scheduled quizzes',
//       'Class & group management',
//       'PDF & CSV export',
//       'Priority support',
//     ],
//   },
//   {
//     name: 'Team',
//     icon: Building2,
//     price: '$29',
//     period: 'per month',
//     tagline: 'For schools, academies, and companies running assessments at scale.',
//     cta: 'Contact us',
//     href: '/signup?plan=team',
//     highlight: false,
//     features: [
//       'Everything in Pro',
//       'Up to 20 admin users',
//       'Custom branding & domain',
//       'Bulk CSV invite',
//       'SSO / SAML login',
//       'Compliance audit trail',
//       'Dedicated onboarding',
//       'SLA-backed support',
//     ],
//   },
// ];

// const faqs = [
//   { q: 'Do participants need to create an account?', a: 'No. Participants just click the link and take the quiz — no sign-up, no app download needed.' },
//   { q: 'Can I try Pro for free?', a: 'Yes! Pro comes with a 14-day free trial. No credit card required to start.' },
//   { q: 'What happens to my quizzes if I downgrade?', a: 'Your quizzes and results are preserved. Only your ability to create new ones beyond the free limit is paused.' },
//   { q: 'Is my data safe?', a: 'Yes. ficerquiz uses bank-level encryption and never sells your data. You own everything you create.' },
// ];

// export default function PricingPage() {
//   return (
//     <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
//       <div className="fixed inset-0 pointer-events-none" style={{
//         backgroundImage: 'linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)',
//         backgroundSize: '60px 60px',
//       }} />
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
//           style={{ background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)` }} />
//       </div>

//       {/* Navbar */}
//       <nav className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
//         <div className="flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl"
//           style={{ background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
//           <Link href="/" className="flex items-center gap-2">
//             <Sparkles className="w-5 h-5" style={{ color: T.accentLight }} />
//             <span className="text-white font-bold text-xl">
//               ficer<span className="font-light" style={{ color: T.accentLight }}>quiz</span>
//             </span>
//           </Link>
//           <div className="flex items-center gap-2">
//             <Link href="/login" className="hidden sm:block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Sign in</Link>
//             <Link href="/signup" className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:opacity-90"
//               style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})` }}>
//               Get started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section className="relative px-4 sm:px-6 pt-20 pb-16 text-center">
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
//           <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors mb-8">
//             <ChevronLeft className="w-4 h-4" /> Back to home
//           </Link>
//           <h1 className="font-extrabold tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}>
//             Simple, honest{' '}
//             <span style={{ background: `linear-gradient(135deg, ${T.accentLight}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               pricing
//             </span>
//           </h1>
//           <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto">
//             Start free. Upgrade when you need more. Cancel anytime — no questions asked.
//           </p>
//         </motion.div>
//       </section>

//       {/* Plans */}
//       <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-24">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
//           {plans.map((plan, i) => (
//             <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.1 }}
//               className="relative flex flex-col rounded-2xl border overflow-hidden"
//               style={{
//                 background: plan.highlight ? `linear-gradient(160deg, rgba(168,85,247,0.1) 0%, ${T.bgCard} 50%)` : T.bgCard,
//                 borderColor: plan.highlight ? T.accentBorder : T.border,
//                 boxShadow: plan.highlight ? `0 0 60px ${T.accentGlow}` : 'none',
//               }}>

//               {plan.highlight && (
//                 <div className="absolute top-0 inset-x-0 h-px"
//                   style={{ background: `linear-gradient(90deg, transparent, ${T.accent}80, transparent)` }} />
//               )}

//               {plan.badge && (
//                 <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide"
//                   style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentLight }}>
//                   {plan.badge}
//                 </div>
//               )}

//               <div className="p-6 sm:p-8 flex-1 flex flex-col">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 rounded-xl flex items-center justify-center"
//                     style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
//                     <plan.icon className="w-5 h-5" style={{ color: T.accentLight }} />
//                   </div>
//                   <span className="text-lg font-bold text-white">{plan.name}</span>
//                 </div>

//                 <div className="mb-4">
//                   <div className="flex items-baseline gap-1.5">
//                     <span className="text-4xl font-extrabold text-white">{plan.price}</span>
//                     <span className="text-sm text-white/30">{plan.period}</span>
//                   </div>
//                 </div>

//                 <p className="text-sm text-white/40 leading-relaxed mb-8">{plan.tagline}</p>

//                 <ul className="space-y-3 mb-10 flex-1">
//                   {plan.features.map((f, fi) => (
//                     <li key={fi} className="flex items-start gap-2.5 text-sm text-white/60">
//                       <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.highlight ? T.accentLight : 'rgba(255,255,255,0.3)' }} />
//                       {f}
//                     </li>
//                   ))}
//                 </ul>

//                 <Link href={plan.href}
//                   className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 mt-auto"
//                   style={plan.highlight ? {
//                     background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`,
//                     color: '#fff',
//                     boxShadow: `0 0 28px ${T.accentGlow}`,
//                   } : {
//                     background: 'rgba(255,255,255,0.05)',
//                     border: `1px solid ${T.border}`,
//                     color: 'rgba(255,255,255,0.7)',
//                   }}>
//                   {plan.cta}
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* FAQs */}
//         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
//           className="mt-24">
//           <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
//             Frequently asked questions
//           </h2>
//           <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
//             {faqs.map((faq, i) => (
//               <div key={i} className="p-6 rounded-2xl border" style={{ background: T.bgCard, borderColor: T.border }}>
//                 <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
//                 <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// }










'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, Zap, Building2, Star, ChevronLeft } from 'lucide-react';

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
};

const plans = [
  {
    name: 'Free',
    icon: Star,
    price: '$0',
    period: 'forever',
    tagline: 'Perfect for individual teachers and small classes.',
    cta: 'Get started free',
    href: '/signup',
    highlight: false,
    features: [
      'Up to 3 active quizzes',
      'Up to 30 participants per quiz',
      'Basic analytics',
      'Shareable quiz links',
      'Manual question creation',
      'Export results as CSV',
    ],
  },
  {
    name: 'Pro',
    icon: Zap,
    price: '$9',
    period: 'per month',
    tagline: 'For power users — teachers, tutors, and growing teams.',
    cta: 'Start Pro free for 14 days',
    href: '/signup?plan=pro',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited quizzes',
      'Unlimited participants',
      'AI quiz generator',
      'Live analytics dashboard',
      'Anti-cheat controls',
      'Auto leaderboard',
      'Scheduled quizzes',
      'Class & group management',
      'PDF & CSV export',
      'Priority support',
    ],
  },
  {
    name: 'Team',
    icon: Building2,
    price: '$29',
    period: 'per month',
    tagline: 'For schools, academies, and companies running assessments at scale.',
    cta: 'Contact us',
    href: '/signup?plan=team',
    highlight: false,
    features: [
      'Everything in Pro',
      'Up to 20 admin users',
      'Custom branding & domain',
      'Bulk CSV invite',
      'SSO / SAML login',
      'Compliance audit trail',
      'Dedicated onboarding',
      'SLA-backed support',
    ],
  },
];

const faqs = [
  { q: 'Do participants need to create an account?', a: 'No. Participants just click the link and take the quiz — no sign-up, no app download needed.' },
  { q: 'Can I try Pro for free?', a: 'Yes! Pro comes with a 14-day free trial. No credit card required to start.' },
  { q: 'What happens to my quizzes if I downgrade?', a: 'Your quizzes and results are preserved. Only your ability to create new ones beyond the free limit is paused.' },
  { q: 'Is my data safe?', a: 'Yes. ficerquiz uses bank-level encryption and never sells your data. You own everything you create.' },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)` }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl"
          style={{ background: 'rgba(255,255,255,0.02)', borderColor: T.border }}>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: T.accentLight }} />
            <span className="text-white font-bold text-xl">
              ficer<span className="font-light" style={{ color: T.accentLight }}>quiz</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden sm:block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})` }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-20 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1 className="font-extrabold tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}>
            Simple, honest{' '}
            <span style={{ background: `linear-gradient(135deg, ${T.accentLight}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              pricing
            </span>
          </h1>
          <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto">
            Start free. Upgrade when you need more. Cancel anytime — no questions asked.
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col rounded-2xl border overflow-hidden"
              style={{
                background: plan.highlight ? `linear-gradient(160deg, ${T.accentBg} 0%, ${T.bgCard} 50%)` : T.bgCard,
                borderColor: plan.highlight ? T.accentBorder : T.border,
                boxShadow: plan.highlight ? `0 0 60px ${T.accentGlow}` : 'none',
              }}>

              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${T.accent}80, transparent)` }} />
              )}

              {plan.badge && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide"
                  style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}`, color: T.accentLight }}>
                  {plan.badge}
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: T.accentBg, border: `1px solid ${T.accentBorder}` }}>
                    <plan.icon className="w-5 h-5" style={{ color: T.accentLight }} />
                  </div>
                  <span className="text-lg font-bold text-white">{plan.name}</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-sm text-white/30">{plan.period}</span>
                  </div>
                </div>

                <p className="text-sm text-white/40 leading-relaxed mb-8">{plan.tagline}</p>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-white/60">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.highlight ? T.accentLight : 'rgba(255,255,255,0.3)' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 mt-auto"
                  style={plan.highlight ? {
                    background: `linear-gradient(135deg, ${T.accentDark}, ${T.accent})`,
                    color: '#fff',
                    boxShadow: `0 0 28px ${T.accentGlow}`,
                  } : {
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${T.border}`,
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl border" style={{ background: T.bgCard, borderColor: T.border }}>
                <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}