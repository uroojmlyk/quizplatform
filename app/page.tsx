

// 'use client';

// import Link from 'next/link';
// import { ArrowRight, Lock, Database, BarChart3, Compass } from 'lucide-react'; // ✅ Compass icon add kiya

// export default function HomePage() {
//   // Array of student images (using Unsplash URLs)
//   const students = [
//     { 
//       id: 1, 
//       name: 'Alex Chen',
//       image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
//       delay: 0 
//     },
//     { 
//       id: 2, 
//       name: 'Sarah Johnson',
//       image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces',
//       delay: 200 
//     },
//     { 
//       id: 3, 
//       name: 'Michael Park',
//       image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces',
//       delay: 400 
//     },
//     { 
//       id: 4, 
//       name: 'Emma Watson',
//       image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=faces',
//       delay: 600 
//     },
//     { 
//       id: 5, 
//       name: 'James Lee',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
//       delay: 800 
//     },
//      { 
//       id: 6, 
//       name: 'Urooj Rasheed',
//       image: '/women2.jpg',
//       delay: 800 
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0B0B0F]">
//       {/* Subtle radial gradient background */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a1a24,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_#1f1f2a,_transparent_50%)]"></div>
      
//       {/* Navigation */}
//       <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <span className="text-xl font-medium text-white tracking-tight">quizmaster</span>
//             <span className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-white/40 rounded-md border border-white/10">beta</span>
//           </div>
//           <div className="flex items-center gap-6">
//             {/* ✅ EXPLORE LINK ADD KIYA */}
//             <Link 
//               href="/explore"
//               className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1"
//             >
//               <Compass className="w-4 h-4" />
//               Explore
//             </Link>
//             <Link 
//               href="/login"
//               className="text-sm text-white/60 hover:text-white transition-colors"
//             >
//               Log in
//             </Link>
//             <Link 
//               href="/signup"
//               className="text-sm px-5 py-2.5 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all font-medium"
//             >
//               Get started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left column - Text content */}
//           <div>
//             {/* Eyebrow */}
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 mb-8">
//               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
//               <span className="text-xs font-mono text-white/60">v2.0.0 · mongodb + next.js 14</span>
//             </div>

//             {/* Main headline */}
//             <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-6">
//               quiz platform
//               <br />
//               <span className="text-white/40">with real-time analytics</span>
//             </h1>
            
//             {/* Description */}
//             <p className="text-lg text-white/50 max-w-2xl mb-10 leading-relaxed">
//               Full-stack quiz system built with Next.js 14, MongoDB, and REST APIs. 
//               Complete authentication flow, CRUD operations, and performance tracking.
//             </p>

//             {/* CTA buttons */}
//             <div className="flex flex-wrap gap-4 mb-16">
//               <Link 
//                 href="/signup"
//                 className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all font-medium"
//               >
//                 Get started
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <Link 
//                 href="/demo"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all border border-white/10"
//               >
//                 View demo
//               </Link>
//               {/* ✅ EXPLORE BUTTON ADD KIYA */}
//               <Link 
//                 href="/explore"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all border border-purple-500/20"
//               >
//                 <Compass className="w-4 h-4" />
//                 Explore quizzes
//               </Link>
//             </div>

//             {/* Stats grid */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
//               <div>
//                 <div className="text-2xl font-medium text-white mb-1">1.2k+</div>
//                 <div className="text-sm text-white/40">quizzes created</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-medium text-white mb-1">5.8k+</div>
//                 <div className="text-sm text-white/40">active users</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-medium text-white mb-1">92%</div>
//                 <div className="text-sm text-white/40">completion rate</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-medium text-white mb-1">24ms</div>
//                 <div className="text-sm text-white/40">avg. response</div>
//               </div>
//             </div>
//           </div>

//           {/* Right column - Student images with modern animation */}
//           <div className="relative hidden lg:block">
//             {/* Background glow */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl blur-3xl"></div>
            
//             {/* Image grid */}
//             <div className="relative grid grid-cols-3 gap-3">
//               {students.map((student) => (
//                 <div
//                   key={student.id}
//                   className="group relative aspect-square"
//                   style={{
//                     animation: `floatIn 0.6s ease-out ${student.delay}ms forwards`,
//                     opacity: 0,
//                     transform: 'translateY(20px)'
//                   }}
//                 >
//                   {/* Image container with hover effects */}
//                   <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:z-10">
//                     {/* Image */}
//                     <img
//                       src={student.image}
//                       alt={student.name}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
                    
//                     {/* Gradient overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
//                     {/* Name tooltip on hover */}
//                     <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                       <p className="text-xs text-white/90 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
//                         {student.name}
//                       </p>
//                     </div>
                    
//                     {/* Status indicator */}
//                     <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Floating stats card */}
//             <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-4 animate-float">
//               <div className="flex items-center gap-3">
//                 <div className="flex -space-x-2">
//                   {students.slice(0, 3).map((s) => (
//                     <img
//                       key={`mini-${s.id}`}
//                       src={s.image}
//                       alt=""
//                       className="w-6 h-6 rounded-full border-2 border-white/20"
//                     />
//                   ))}
//                 </div>
//                 <div>
//                   <p className="text-sm text-white font-medium">+247 students</p>
//                   <p className="text-xs text-white/40">joined this week</p>
//                 </div>
//               </div>
//             </div>

//             {/* Activity indicator */}
//             <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-3 animate-float-delayed">
//               <div className="flex items-center gap-2">
//                 <div className="flex gap-0.5">
//                   <div className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
//                   <div className="w-1 h-6 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
//                   <div className="w-1 h-3 bg-emerald-400/50 rounded-full animate-pulse delay-150"></div>
//                 </div>
//                 <span className="text-xs text-white/60">live activity</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Features section */}
//       <section className="relative z-10 border-t border-white/10 bg-black/20">
//         <div className="max-w-7xl mx-auto px-6 py-24">
//           {/* Section header */}
//           <div className="max-w-2xl mb-16">
//             <h2 className="text-3xl font-medium text-white mb-4 tracking-tight">
//               built for developers
//             </h2>
//             <p className="text-white/50">
//               Clean architecture, type-safe APIs, and production-ready code.
//             </p>
//           </div>

//           {/* Feature grid */}
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Feature 1 */}
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
//               <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
//                 <Lock className="w-5 h-5 text-emerald-400" />
//               </div>
//               <h3 className="text-lg font-medium text-white mb-2">auth system</h3>
//               <p className="text-sm text-white/40 leading-relaxed">
//                 JWT-based authentication with role-based access control. 
//                 Secure password hashing using bcrypt.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-2">
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">jwt</span>
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">bcrypt</span>
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">middleware</span>
//               </div>
//             </div>

//             {/* Feature 2 */}
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
//               <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
//                 <Database className="w-5 h-5 text-blue-400" />
//               </div>
//               <h3 className="text-lg font-medium text-white mb-2">crud operations</h3>
//               <p className="text-sm text-white/40 leading-relaxed">
//                 Full CRUD for quizzes with MongoDB. RESTful API design with 
//                 proper error handling and validation.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-2">
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">mongodb</span>
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">rest api</span>
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">mongoose</span>
//               </div>
//             </div>

//             {/* Feature 3 */}
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
//               <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
//                 <BarChart3 className="w-5 h-5 text-purple-400" />
//               </div>
//               <h3 className="text-lg font-medium text-white mb-2">result analytics</h3>
//               <p className="text-sm text-white/40 leading-relaxed">
//                 Track user performance with detailed analytics. 
//                 Aggregation pipelines for insights.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-2">
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">aggregation</span>
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">charts</span>
//                 <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">realtime</span>
//               </div>
//             </div>
//           </div>

//           {/* Tech stack */}
//           <div className="mt-16 pt-16 border-t border-white/10">
//             <div className="flex flex-wrap items-center gap-8">
//               <span className="text-sm text-white/30 font-mono">stack</span>
//               <div className="flex flex-wrap gap-6">
//                 {['next.js 14', 'mongodb', 'tailwind', 'typescript', 'rest api', 'jwt'].map((tech) => (
//                   <span key={tech} className="text-sm text-white/60 hover:text-white transition-colors">
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA section */}
//       <section className="relative z-10 border-t border-white/10">
//         <div className="max-w-7xl mx-auto px-6 py-24">
//           <div className="max-w-2xl">
//             <h2 className="text-3xl font-medium text-white mb-4 tracking-tight">
//               ready to build?
//             </h2>
//             <p className="text-white/50 mb-8">
//               Full source code available. Built with production-grade practices.
//             </p>
//             <Link 
//               href="/signup"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all font-medium"
//             >
//               Start building
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-white/10">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-white/40">© 2024 quizmaster</span>
//               <span className="text-xs px-2 py-0.5 bg-white/5 text-white/30 rounded border border-white/10">mit license</span>
//             </div>
//             <div className="flex gap-8">
//               {/* ✅ EXPLORE LINK FOOTER MEIN BHI */}
//               <Link href="/explore" className="text-sm text-white/40 hover:text-white transition-colors">
//                 explore
//               </Link>
//               <a href="https://github.com" className="text-sm text-white/40 hover:text-white transition-colors">
//                 github
//               </a>
//               <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
//                 documentation
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes floatIn {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float 4s ease-in-out 2s infinite;
//         }
//         .delay-75 {
//           animation-delay: 75ms;
//         }
//         .delay-150 {
//           animation-delay: 150ms;
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
//   Globe,
//   BarChart3,
//   Code2,
//   Rocket,
//   Crown
// } from 'lucide-react';
// import { useRef, useEffect, useState } from 'react';

// export default function HomePage() {
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
      
//       // Calculate normalized mouse position (-1 to 1)
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

//   return (
//     <div ref={containerRef} className="min-h-screen bg-[#030304] font-['Inter',sans-serif] overflow-x-hidden">
//       {/* Premium animated background */}
//       <div className="fixed inset-0">
//         {/* Deep space gradient */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#2b0b3f,transparent)]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,#0f2b3f,transparent)]"></div>
        
//         {/* Animated particle grid */}
//         <div className="absolute inset-0" style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px',
//           maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
//         }}></div>
        
//         {/* Floating orbs */}
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
//           className="absolute bottom-20 right-[10%] w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl"
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

//       {/* Navigation - Ultra minimal */}
//       <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6">
//         <motion.div 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="flex justify-between items-center"
//         >
//           {/* Ficer Quiz Platform - Modern typography */}
//           <Link href="/" className="group relative">
//             <h1 className="text-3xl font-light tracking-tight">
//               <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
//                 ficer
//               </span>
//               <span className="ml-2 font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 quiz
//               </span>
//             </h1>
//             <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           </Link>
          
//           <div className="flex items-center gap-1">
//             {['platform', 'enterprise', 'pricing'].map((item, i) => (
//               <Link 
//                 key={item}
//                 href={`/${item}`}
//                 className="relative px-4 py-2 text-sm text-white/40 hover:text-white transition-colors group"
//               >
//                 {item}
//                 <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300"></span>
//               </Link>
//             ))}
//             <Link 
//               href="/login"
//               className="ml-4 px-5 py-2 text-sm text-white/60 hover:text-white transition-colors"
//             >
//               Sign in
//             </Link>
//             <Link 
//               href="/signup"
//               className="relative group ml-2 px-6 py-2.5 bg-white text-[#030304] rounded-full hover:bg-white/90 transition-all font-medium overflow-hidden"
//             >
//               <span className="relative z-10">Get started →</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </Link>
//           </div>
//         </motion.div>
//       </nav>

//       {/* Hero Section with 3D Parallax */}
//       <main className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
//         <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
//           {/* Left column - Text content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             style={{ y: smoothY }}
//             className="relative"
//           >
//             {/* Animated badge */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/[0.05] mb-8 backdrop-blur-sm"
//             >
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="w-2 h-2 bg-emerald-500 rounded-full"
//               />
//               <span className="text-xs font-mono text-white/40">v3.0 · redefining assessment</span>
//             </motion.div>

//             {/* Main headline - Psychological typography */}
//             <h1 className="text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[0.9] mb-6">
//               <span className="text-white/90">assess</span>
//               <br />
//               <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
//                 without limits
//               </span>
//             </h1>
            
//             {/* Subheadline */}
//             <p className="text-xl text-white/30 max-w-xl mb-12 leading-relaxed font-light">
//               <span className="text-white/60">Ficer</span> combines cognitive science with 
//               <span className="text-white/60"> adaptive technology</span> to create 
//               assessments that feel effortless.
//             </p>

//             {/* CTA buttons with 3D hover */}
//             <div className="flex flex-wrap gap-4 mb-20">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 style={tiltStyle}
//               >
//                 <Link 
//                   href="/signup"
//                   className="group relative px-8 py-4 bg-white text-[#030304] rounded-2xl hover:bg-white/90 transition-all font-medium flex items-center gap-2 overflow-hidden"
//                 >
//                   <span className="relative z-10">Start creating</span>
//                   <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   <motion.div 
//                     className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500"
//                     initial={{ x: '100%' }}
//                     whileHover={{ x: 0 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </Link>
//               </motion.div>
              
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link 
//                   href="/demo"
//                   className="group px-8 py-4 bg-white/[0.02] text-white rounded-2xl hover:bg-white/[0.04] transition-all border border-white/[0.05] backdrop-blur-sm flex items-center gap-2"
//                 >
//                   <Sparkles className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
//                   Experience demo
//                 </Link>
//               </motion.div>
//             </div>

//             {/* Social proof - Minimal */}
//             <div className="flex items-center gap-8 border-t border-white/[0.02] pt-8">
//               <div className="flex -space-x-3">
//                 {[1,2,3,4,5].map((i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * i }}
//                     className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-[#030304] flex items-center justify-center text-xs font-medium text-white"
//                   >
//                     {String.fromCharCode(64 + i)}
//                   </motion.div>
//                 ))}
//               </div>
//               <div>
//                 <div className="text-sm text-white font-medium">Trusted by <span className="text-indigo-400">500+</span> teams</div>
//                 <div className="text-xs text-white/30">including Fortune 500 companies</div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right column - 3D Interactive Cube */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.4 }}
//             style={{ y: smoothY, scale: smoothScale }}
//             className="relative hidden lg:block"
//           >
//             {/* 3D Cube Container */}
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
//                 {/* Cube faces */}
//                 {[
//                   { color: 'from-indigo-500/30 to-purple-500/30', icon: Zap, delay: 0 },
//                   { color: 'from-blue-500/30 to-cyan-500/30', icon: Shield, delay: 0.2 },
//                   { color: 'from-purple-500/30 to-pink-500/30', icon: TrendingUp, delay: 0.4 },
//                   { color: 'from-emerald-500/30 to-teal-500/30', icon: Users, delay: 0.6 },
//                   { color: 'from-orange-500/30 to-red-500/30', icon: Globe, delay: 0.8 },
//                   { color: 'from-pink-500/30 to-rose-500/30', icon: Crown, delay: 1 },
//                 ].map((face, index) => (
//                   <motion.div
//                     key={index}
//                     className={`absolute inset-0 bg-gradient-to-br ${face.color} backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center`}
//                     style={{
//                       transform: `rotate${index < 4 ? 'Y' : 'X'}(${index * 90}deg) translateZ(200px)`,
//                       boxShadow: '0 0 50px rgba(0,0,0,0.5)'
//                     }}
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     <face.icon className="w-20 h-20 text-white/40" />
//                   </motion.div>
//                 ))}
//               </motion.div>

//               {/* Floating stats cards */}
//               <motion.div
//                 animate={{
//                   y: [0, -20, 0],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//                 className="absolute -top-10 -left-10 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-4"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
//                     <BarChart3 className="w-5 h-5 text-indigo-400" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-white font-medium">98% accuracy</div>
//                     <div className="text-xs text-white/30">in assessment</div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 animate={{
//                   y: [0, 20, 0],
//                 }}
//                 transition={{
//                   duration: 5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 1
//                 }}
//                 className="absolute -bottom-10 -right-10 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-4"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
//                     <Rocket className="w-5 h-5 text-purple-400" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-white font-medium">2.5x faster</div>
//                     <div className="text-xs text-white/30">than traditional</div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </main>

//       {/* Features Grid */}
//       <section className="relative border-t border-white/[0.02] bg-black/20">
//         <div className="max-w-7xl mx-auto px-6 py-32">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-20"
//           >
//             <h2 className="text-5xl font-light tracking-tight text-white mb-4">
//               engineered for 
//               <span className="ml-3 font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
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
//                 gradient: 'from-indigo-500 to-purple-500',
//                 stats: '99.9% uptime'
//               },
//               {
//                 icon: Shield,
//                 title: 'enterprise security',
//                 description: 'Bank-level encryption and compliance',
//                 gradient: 'from-purple-500 to-pink-500',
//                 stats: 'SOC2 Type II'
//               },
//               {
//                 icon: TrendingUp,
//                 title: 'adaptive learning',
//                 description: 'AI-powered question adaptation',
//                 gradient: 'from-pink-500 to-orange-500',
//                 stats: '2x engagement'
//               }
//             ].map((feature, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all duration-500"
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
//       <section className="relative border-t border-white/[0.02]">
//         <div className="max-w-7xl mx-auto px-6 py-32">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-20 text-center overflow-hidden"
//           >
//             {/* Animated background */}
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
            
//             <h2 className="text-6xl font-light text-white mb-6 relative z-10">
//               ready to 
//               <span className="ml-3 font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 transform?
//               </span>
//             </h2>
            
//             <p className="text-xl text-white/30 mb-12 max-w-2xl mx-auto relative z-10">
//               Join the future of assessment with Ficer
//             </p>
            
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative z-10 inline-block"
//             >
//               <Link
//                 href="/signup"
//                 className="group relative px-12 py-5 bg-white text-[#030304] rounded-2xl hover:bg-white/90 transition-all font-medium text-lg flex items-center gap-3 overflow-hidden"
//               >
//                 <span className="relative z-10">Claim your workspace</span>
//                 <Rocket className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 <motion.div 
//                   className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500"
//                   initial={{ x: '100%' }}
//                   whileHover={{ x: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Ultra Minimal Footer */}
//       <footer className="relative border-t border-white/[0.02]">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex justify-between items-center text-xs text-white/20">
//             <div>© 2024 ficer · redefining assessment</div>
//             <div className="flex gap-8">
//               <Link href="/legal" className="hover:text-white/40 transition-colors">legal</Link>
//               <Link href="/privacy" className="hover:text-white/40 transition-colors">privacy</Link>
//               <Link href="/terms" className="hover:text-white/40 transition-colors">terms</Link>
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
//       `}</style>
//     </div>
//   );
// }






'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  TrendingUp,
  Users,
  Globe,
  BarChart3,
  Code2,
  Rocket,
  Crown,
  Compass,
  BookOpen,
  Star
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Smooth scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Spring physics for smooth animations
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const smoothY = useSpring(y, springConfig);
  const smoothScale = useSpring(scale, springConfig);

  // Mouse move handler for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax tilt effect
  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale3d(1.05, 1.05, 1.05)`,
    transition: 'transform 0.1s ease-out'
  };

  // Beautiful portraits array
  const portraits = [
    {
      id: 1,
      name: 'Elena',
      image: 'https://images.unsplash.com/photo-1494790108777-28675fd72c4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
      role: 'Creative Director',
      gradient: 'from-pink-500/30 to-rose-500/30'
    },
    {
      id: 2,
      name: 'Sofia',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
      role: 'Lead Designer',
      gradient: 'from-purple-500/30 to-indigo-500/30'
    },
    {
      id: 3,
      name: 'Maya',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
      role: 'Product Manager',
      gradient: 'from-blue-500/30 to-cyan-500/30'
    },
    {
      id: 4,
      name: 'Zara',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
      role: 'UX Researcher',
      gradient: 'from-emerald-500/30 to-teal-500/30'
    },
    {
      id: 5,
      name: 'Leila',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
      role: 'Frontend Lead',
      gradient: 'from-orange-500/30 to-red-500/30'
    },
    {
      id: 6,
      name: 'Aria',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
      role: 'Tech Lead',
      gradient: 'from-violet-500/30 to-purple-500/30'
    }
  ];

  // Sample quizzes data
  const featuredQuizzes = [
    {
      id: '1',
      title: 'Web Development Fundamentals',
      description: 'Master HTML, CSS, and JavaScript basics',
      questions: 25,
      duration: 30,
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop&auto=format',
      author: 'Elena',
      authorImage: portraits[0].image,
      category: 'Development'
    },
    {
      id: '2',
      title: 'UI/UX Design Principles',
      description: 'Learn design thinking and user experience',
      questions: 20,
      duration: 25,
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&auto=format',
      author: 'Sofia',
      authorImage: portraits[1].image,
      category: 'Design'
    },
    {
      id: '3',
      title: 'Data Science Essentials',
      description: 'Python, pandas, and data visualization',
      questions: 30,
      duration: 45,
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format',
      author: 'Maya',
      authorImage: portraits[2].image,
      category: 'Data Science'
    },
    {
      id: '4',
      title: 'Product Management 101',
      description: 'From idea to execution - product lifecycle',
      questions: 15,
      duration: 20,
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format',
      author: 'Zara',
      authorImage: portraits[3].image,
      category: 'Business'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030304] font-['Inter',sans-serif] overflow-x-hidden">
      {/* Premium animated background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#2b0b3f,transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,#0f2b3f,transparent)]"></div>
        
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}></div>
        
        <motion.div 
          className="absolute top-20 left-[10%] w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation - Clean */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center"
        >
          <Link href="/" className="group relative">
            <h1 className="text-3xl font-light tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                ficer
              </span>
              <span className="ml-2 font-medium bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                quiz
              </span>
            </h1>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link 
              href="/explore"
              className="group px-4 py-2 text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Explore</span>
            </Link>
            <Link 
              href="/login"
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link 
              href="/signup"
              className="relative group ml-2 px-5 py-2 bg-white text-[#030304] rounded-full hover:bg-white/90 transition-all font-medium text-sm overflow-hidden"
            >
              <span className="relative z-10">Get started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section with 3D Portrait Cube */}
      <main className="relative max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: smoothY }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/[0.05] mb-8 backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-pink-500 rounded-full"
              />
              <span className="text-xs font-mono text-white/40">v3.0 · redefining assessment</span>
            </motion.div>

            <h1 className="text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[0.9] mb-6">
              <span className="text-white/90">assess</span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-medium">
                beautifully
              </span>
            </h1>
            
            <p className="text-xl text-white/30 max-w-xl mb-12 leading-relaxed font-light">
              <span className="text-white/60">Ficer</span> combines elegant design with 
              <span className="text-white/60"> powerful analytics</span> to create 
              assessments people love.
            </p>

            {/* Clean buttons */}
            <div className="flex flex-wrap gap-4 mb-20">
              <Link 
                href="/signup"
                className="group px-8 py-4 bg-white text-[#030304] rounded-2xl hover:bg-white/90 transition-all font-medium flex items-center gap-2"
              >
                Start creating
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/explore"
                className="group px-8 py-4 bg-white/[0.02] text-white rounded-2xl hover:bg-white/[0.04] transition-all border border-white/[0.05] backdrop-blur-sm flex items-center gap-2"
              >
                <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Explore quizzes
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-8 border-t border-white/[0.02] pt-8">
              <div className="flex -space-x-3">
                {portraits.slice(0, 5).map((portrait, i) => (
                  <motion.div
                    key={portrait.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="w-10 h-10 rounded-full border-2 border-[#030304] overflow-hidden"
                  >
                    <img 
                      src={portrait.image} 
                      alt={portrait.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="text-sm text-white font-medium">Trusted by <span className="text-pink-400">500+</span> teams</div>
                <div className="text-xs text-white/30">including Fortune 500 companies</div>
              </div>
            </div>
          </motion.div>

          {/* Right column - 3D Portrait Cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ y: smoothY, scale: smoothScale }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square perspective-2000">
              <motion.div
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={tiltStyle}
                className="relative w-full h-full transform-style-3d"
              >
                {/* Cube faces with beautiful portraits */}
                {portraits.slice(0, 6).map((portrait, index) => (
                  <motion.div
                    key={portrait.id}
                    className={`absolute inset-0 bg-gradient-to-br ${portrait.gradient} backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden`}
                    style={{
                      transform: `rotate${index < 4 ? 'Y' : 'X'}(${index * 90}deg) translateZ(200px)`,
                      boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={portrait.image} 
                      alt={portrait.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-white font-medium">{portrait.name}</p>
                        <p className="text-white/60 text-xs">{portrait.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Explore Quizzes Section */}
      <section className="relative border-t border-white/[0.02] bg-black/20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] rounded-full border border-white/[0.05] mb-4">
                <Star className="w-3 h-3 text-pink-400" />
                <span className="text-xs text-white/40">featured quizzes</span>
              </div>
              <h2 className="text-4xl font-light text-white mb-2">
                explore 
                <span className="ml-2 font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  popular
                </span>
              </h2>
              <p className="text-white/30">Discover quizzes created by our community</p>
            </div>
            
            <Link 
              href="/explore"
              className="group flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Quiz Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => router.push(`/quiz/${quiz.id}`)}
                className="group cursor-pointer"
              >
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                  {/* Quiz Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={quiz.image} 
                      alt={quiz.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category tag */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] text-white/80 border border-white/10">
                      {quiz.category}
                    </div>
                    
                    {/* Level tag */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] text-white/60 border border-white/10">
                      {quiz.level}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-1 line-clamp-1">{quiz.title}</h3>
                    <p className="text-white/30 text-xs mb-3 line-clamp-2">{quiz.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={quiz.authorImage} 
                          alt={quiz.author}
                          className="w-5 h-5 rounded-full border border-white/20"
                        />
                        <span className="text-xs text-white/40">{quiz.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/30">
                        <BookOpen className="w-3 h-3" />
                        <span>{quiz.questions}</span>
                        <span>·</span>
                        <span>{quiz.duration}m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative border-t border-white/[0.02] bg-black/20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-light tracking-tight text-white mb-4">
              engineered for 
              <span className="ml-3 font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                excellence
              </span>
            </h2>
            <p className="text-white/30 max-w-2xl mx-auto">
              Every detail crafted for the modern assessment experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'lightning fast',
                description: 'Sub-100ms response times with edge computing',
                gradient: 'from-pink-500 to-purple-500',
                stats: '99.9% uptime'
              },
              {
                icon: Shield,
                title: 'enterprise security',
                description: 'Bank-level encryption and compliance',
                gradient: 'from-purple-500 to-indigo-500',
                stats: 'SOC2 Type II'
              },
              {
                icon: TrendingUp,
                title: 'adaptive learning',
                description: 'AI-powered question adaptation',
                gradient: 'from-indigo-500 to-blue-500',
                stats: '2x engagement'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-light text-white mb-3">{feature.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed mb-6">{feature.description}</p>
                
                <div className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-white/[0.02] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl p-20 text-center overflow-hidden"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
            
            <h2 className="text-5xl font-light text-white mb-6 relative z-10">
              ready to 
              <span className="ml-3 font-medium bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                transform?
              </span>
            </h2>
            
            <p className="text-white/30 mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of creators using Ficer
            </p>
            
            <Link
              href="/signup"
              className="group relative inline-flex px-8 py-4 bg-white text-[#030304] rounded-2xl hover:bg-white/90 transition-all font-medium items-center gap-2 overflow-hidden z-10"
            >
              <span className="relative z-10">Claim your workspace</span>
              <Rocket className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.02] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center text-xs text-white/20">
            <div>© 2024 ficer · redefining assessment</div>
            <div className="flex gap-8">
              <Link href="/explore" className="hover:text-white/40 transition-colors">explore</Link>
              <Link href="/legal" className="hover:text-white/40 transition-colors">legal</Link>
              <Link href="/privacy" className="hover:text-white/40 transition-colors">privacy</Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}