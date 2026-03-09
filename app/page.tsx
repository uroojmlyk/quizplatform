


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
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Sparkles, Zap, Shield, TrendingUp,
  Users, Compass, BookOpen, Star, Rocket, Play,
  CheckCircle2, Clock, ChevronRight, Brain, Share2,
  BarChart3, GraduationCap, Building2, Lightbulb,
  CheckCircle, Terminal, Link2, PieChart
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ─── Design tokens ───────────────────────────────────────────────
const G = {
  accent: '#34d399',       // emerald-400
  accentDark: '#059669',   // emerald-600
  accentGlow: 'rgba(52,211,153,0.18)',
  accentBorder: 'rgba(52,211,153,0.15)',
  accentBg: 'rgba(52,211,153,0.07)',
  bg: '#060608',
  card: 'rgba(255,255,255,0.018)',
  border: 'rgba(255,255,255,0.06)',
};

// ─── Reusable section label ───────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
      style={{ background: G.accentBg, borderColor: G.accentBorder }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: G.accent }} />
      <span className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: G.accent }}>
        {children}
      </span>
    </div>
  );
}

// ─── PRODUCT DEMO SECTION ─────────────────────────────────────────
function ProductDemoSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'AI Generator',
      icon: Brain,
      title: 'Describe. Generate. Done.',
      desc: 'Type a topic, choose difficulty, and our AI builds a complete quiz in under 10 seconds — with distractors, explanations, and scoring rubrics.',
      mockLines: [
        { prompt: true, text: '> Create a quiz on "React Hooks" — 10 questions, intermediate' },
        { prompt: false, text: '✦ Generating questions...' },
        { prompt: false, text: '✦ Adding smart distractors...' },
        { prompt: false, text: '✦ Writing explanations...' },
        { prompt: false, text: '✓ Quiz ready — 10 questions, ~12 min' },
      ],
    },
    {
      label: 'Live Analytics',
      icon: PieChart,
      title: 'Real-time insight dashboard.',
      desc: 'Watch responses pour in. Score distributions, time-per-question heatmaps, and AI-generated improvement suggestions — all live.',
      bars: [85, 62, 91, 48, 77, 95, 53],
    },
    {
      label: 'Share & Embed',
      icon: Link2,
      title: 'One link. Any platform.',
      desc: 'Share a tamper-proof link, embed in your LMS, or export to PDF. Full access controls — no accounts needed for participants.',
      mockLink: 'https://assess.so/q/react-hooks-2024',
    },
  ];

  return (
    <section className="relative border-t py-28" style={{ borderColor: G.border }}>
      {/* ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${G.accent}40, transparent)` }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionLabel>Product Demo</SectionLabel>
          <h2 className="text-5xl font-light tracking-tight text-white mb-4">
            see it in{' '}
            <span className="font-semibold"
              style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              action
            </span>
          </h2>
          <p className="text-white/30 text-sm max-w-lg mx-auto leading-relaxed">
            From blank page to published quiz in seconds. No setup, no friction.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={activeTab === i ? {
                background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`,
                color: '#fff',
                boxShadow: `0 0 24px ${G.accentGlow}`
              } : {
                background: G.card,
                border: `1px solid ${G.border}`,
                color: 'rgba(255,255,255,0.4)'
              }}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Demo panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left: text */}
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-semibold text-white mb-4">
              {tabs[activeTab].title}
            </h3>
            <p className="text-white/40 leading-relaxed mb-8">
              {tabs[activeTab].desc}
            </p>
            <Link href="/signup"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, boxShadow: `0 0 28px ${G.accentGlow}` }}>
              Try it free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: mock UI */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden border"
              style={{ background: '#0a0f0c', borderColor: G.accentBorder }}>

              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: 'rgba(52,211,153,0.08)', background: 'rgba(52,211,153,0.04)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                <span className="ml-3 text-xs text-white/20 font-mono">
                  {activeTab === 0 ? 'assess-ai terminal' : activeTab === 1 ? 'analytics.assess.so' : 'share.assess.so'}
                </span>
              </div>

              <div className="p-5 min-h-[240px]">
                {/* Tab 0: Terminal */}
                {activeTab === 0 && (
                  <div className="space-y-2 font-mono text-xs">
                    {tabs[0].mockLines!.map((line, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.18 }}
                        className={line.prompt ? 'text-white/70' : i === 4 ? 'text-emerald-400 font-semibold' : 'text-emerald-600'}>
                        {line.text}
                      </motion.div>
                    ))}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
                      transition={{ delay: 1.2, duration: 1, repeat: Infinity }}
                      className="w-2 h-4 rounded-sm inline-block mt-1"
                      style={{ background: G.accent }} />
                  </div>
                )}

                {/* Tab 1: Bar chart */}
                {activeTab === 1 && (
                  <div>
                    <div className="flex items-end justify-between gap-2 h-36 mb-3">
                      {tabs[1].bars!.map((h, i) => (
                        <motion.div key={i} className="flex-1 rounded-t-lg"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                          style={{ background: `linear-gradient(180deg, ${G.accent}, ${G.accentDark})`, minHeight: 4 }} />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-white/20 font-mono">
                      {['Q1','Q2','Q3','Q4','Q5','Q6','Q7'].map(q => <span key={q}>{q}</span>)}
                    </div>
                    <div className="mt-4 flex gap-4">
                      {[['Avg Score','73%'],['Completion','91%'],['Top Q','Q6']].map(([l,v]) => (
                        <div key={l} className="flex-1 rounded-xl p-2.5 text-center"
                          style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
                          <p className="text-[10px] text-white/30">{l}</p>
                          <p className="text-sm font-bold" style={{ color: G.accent }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Share link */}
                {activeTab === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{ background: 'rgba(52,211,153,0.05)', borderColor: G.accentBorder }}>
                      <Link2 className="w-4 h-4 shrink-0" style={{ color: G.accent }} />
                      <span className="text-xs font-mono text-white/50 truncate">{tabs[2].mockLink}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-auto shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                        style={{ background: G.accent, color: '#021a0f' }}>
                        Copy
                      </motion.button>
                    </div>
                    {[
                      { label: 'Embed in LMS', icon: Terminal },
                      { label: 'Export to PDF', icon: BookOpen },
                      { label: 'Slack / Teams', icon: Share2 },
                    ].map(({ label, icon: Icon }) => (
                      <div key={label} className="flex items-center gap-3 p-3 rounded-xl border"
                        style={{ background: G.card, borderColor: G.border }}>
                        <Icon className="w-4 h-4 text-white/25" />
                        <span className="text-xs text-white/40">{label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-white/15 ml-auto" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS SECTION ─────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Brain,
      title: 'Create quiz with AI',
      desc: 'Describe your topic, set difficulty and question count. Our AI generates a complete, well-structured quiz in seconds — ready to publish or customize.',
      detail: ['Choose any topic', 'Set difficulty level', 'AI writes questions & explanations', 'Edit or regenerate anytime'],
    },
    {
      number: '02',
      icon: Share2,
      title: 'Share quiz link',
      desc: 'Get a clean, branded link instantly. No login required for participants. Share via email, embed in your site, or post to any platform.',
      detail: ['One-click link generation', 'Embed anywhere', 'No participant accounts needed', 'Expiry & access controls'],
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Track analytics & results',
      desc: 'Real-time dashboard shows who scored what, how long each question took, and where learners struggled — so you can act on it.',
      detail: ['Live score tracking', 'Per-question heatmaps', 'Export CSV / PDF', 'AI improvement suggestions'],
    },
  ];

  return (
    <section className="relative border-t py-28" style={{ borderColor: G.border }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${G.accent}40, transparent)` }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="text-5xl font-light tracking-tight text-white mb-4">
            three steps to{' '}
            <span className="font-semibold"
              style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              launch
            </span>
          </h2>
          <p className="text-white/30 text-sm max-w-md mx-auto">
            From zero to published assessment in under two minutes.
          </p>
        </motion.div>

        {/* Steps — alternating layout */}
        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              {/* Text side */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-black tracking-tighter"
                    style={{ color: `${G.accent}20`, fontVariantNumeric: 'tabular-nums' }}>
                    {step.number}
                  </span>
                  <div className="w-px h-10 bg-white/5" />
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
                    <step.icon className="w-5 h-5" style={{ color: G.accent }} />
                  </div>
                </div>

                <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/40 leading-relaxed mb-8 text-sm">
                  {step.desc}
                </p>

                <ul className="space-y-2.5">
                  {step.detail.map((d, di) => (
                    <motion.li key={di}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + di * 0.08 }}
                      className="flex items-center gap-3 text-sm text-white/50">
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: G.accent }} />
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Visual side */}
              <div className="relative">
                {/* Connection line between steps */}
                {i < steps.length - 1 && (
                  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-px h-20 hidden lg:block"
                    style={{ background: `linear-gradient(180deg, ${G.accentBorder}, transparent)` }} />
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="rounded-3xl p-8 border relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.04) 0%, rgba(255,255,255,0.01) 100%)', borderColor: G.accentBorder }}>

                  {/* Glow */}
                  <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${G.accentGlow} 0%, transparent 70%)` }} />

                  {/* Step-specific illustration */}
                  {i === 0 && (
                    <div className="relative z-10 space-y-3">
                      <div className="text-xs text-white/20 font-mono mb-4">ai_quiz_generator.tsx</div>
                      {[
                        { label: 'Topic', value: 'React Hooks', color: G.accent },
                        { label: 'Questions', value: '10', color: '#6ee7b7' },
                        { label: 'Difficulty', value: 'Intermediate', color: G.accent },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="flex items-center justify-between p-3 rounded-xl"
                          style={{ background: 'rgba(52,211,153,0.05)', border: `1px solid ${G.accentBorder}` }}>
                          <span className="text-xs text-white/30">{label}</span>
                          <span className="text-xs font-semibold" style={{ color }}>{value}</span>
                        </div>
                      ))}
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                        style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f' }}>
                        <Sparkles className="w-4 h-4" />
                        Generating...
                      </motion.div>
                    </div>
                  )}

                  {i === 1 && (
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 p-3 rounded-xl mb-4"
                        style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
                        <Link2 className="w-4 h-4 shrink-0" style={{ color: G.accent }} />
                        <span className="text-xs font-mono text-white/40 truncate">assess.so/q/abc-123</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { icon: '✉', label: 'Email' },
                          { icon: '🔗', label: 'Embed' },
                          { icon: '📱', label: 'Mobile' },
                          { icon: '📄', label: 'PDF' },
                          { icon: '💬', label: 'Slack' },
                          { icon: '🎓', label: 'LMS' },
                        ].map(({ icon, label }) => (
                          <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${G.border}` }}>
                            <span className="text-lg">{icon}</span>
                            <span className="text-[10px] text-white/30">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {i === 2 && (
                    <div className="relative z-10 space-y-3">
                      {[
                        { name: 'Sarah K.', score: 92, time: '8m 12s' },
                        { name: 'Ahmed R.', score: 78, time: '11m 04s' },
                        { name: 'Mia L.', score: 85, time: '9m 33s' },
                      ].map((r, ri) => (
                        <motion.div key={ri}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ri * 0.12 }}
                          className="flex items-center gap-3 p-3 rounded-xl"
                          style={{ background: 'rgba(52,211,153,0.04)', border: `1px solid ${G.accentBorder}` }}>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})` }}>
                            {r.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-white/70 truncate">{r.name}</p>
                            <p className="text-[10px] text-white/25">{r.time}</p>
                          </div>
                          <div className="text-sm font-bold shrink-0"
                            style={{ color: r.score >= 85 ? G.accent : r.score >= 75 ? '#fbbf24' : '#f87171' }}>
                            {r.score}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── USE CASES SECTION ────────────────────────────────────────────
function UseCasesSection() {
  const [active, setActive] = useState(0);

  const cases = [
    {
      icon: GraduationCap,
      audience: 'Teachers',
      tagline: 'Assess smarter, teach better.',
      desc: 'Build formative and summative assessments in minutes. Track which concepts your class struggles with and get AI recommendations to close knowledge gaps.',
      points: [
        'Auto-grade essays and MCQs',
        'Class-wide performance analytics',
        'Align quizzes to learning objectives',
        'Parent-friendly score reports',
      ],
      stat: { val: '4×', label: 'faster quiz creation' },
      color: '#34d399',
    },
    {
      icon: BookOpen,
      audience: 'Students',
      tagline: 'Study with purpose.',
      desc: 'Practice with AI-generated quizzes on any subject. See exactly where you\'re strong, where you\'re weak, and what to study next.',
      points: [
        'Personalized practice questions',
        'Spaced repetition reminders',
        'Performance trend charts',
        'Peer challenge links',
      ],
      stat: { val: '2.4×', label: 'better retention' },
      color: '#6ee7b7',
    },
    {
      icon: Building2,
      audience: 'Companies & Teams',
      tagline: 'Knowledge is your moat.',
      desc: 'Run onboarding tests, compliance assessments, and skill checks at scale. Full audit trail and SSO support for enterprise teams.',
      points: [
        'Bulk invite via CSV or SSO',
        'Custom branding & domain',
        'SOC2-compliant data handling',
        'Slack & Notion integrations',
      ],
      stat: { val: '91%', label: 'completion rate avg' },
      color: '#a7f3d0',
    },
  ];

  return (
    <section className="relative border-t py-28" style={{ borderColor: G.border }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${G.accent}40, transparent)` }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel>Use Cases</SectionLabel>
          <h2 className="text-5xl font-light tracking-tight text-white mb-4">
            built for{' '}
            <span className="font-semibold"
              style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              everyone
            </span>
          </h2>
          <p className="text-white/30 text-sm max-w-md mx-auto">
            Whether you're a solo teacher or a 10,000-person org, Assess Beautifully fits your workflow.
          </p>
        </motion.div>

        {/* Audience tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {cases.map((c, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-250"
              style={active === i ? {
                background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`,
                color: '#021a0f',
                boxShadow: `0 0 28px ${G.accentGlow}`,
              } : {
                background: G.card,
                border: `1px solid ${G.border}`,
                color: 'rgba(255,255,255,0.35)',
              }}>
              <c.icon className="w-4 h-4" />
              {c.audience}
            </button>
          ))}
        </div>

        {/* Active case */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid lg:grid-cols-5 gap-8 items-stretch"
        >
          {/* Left: big text */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
                {(() => { const Icon = cases[active].icon; return <Icon className="w-6 h-6" style={{ color: G.accent }} />; })()}
              </div>
              <span className="text-[11px] text-white/30 uppercase tracking-widest font-semibold">
                {cases[active].audience}
              </span>
            </div>

            <p className="text-2xl font-semibold text-white mb-4 leading-tight">
              {cases[active].tagline}
            </p>
            <p className="text-sm text-white/40 leading-relaxed mb-8">
              {cases[active].desc}
            </p>

            {/* Big stat */}
            <div className="inline-flex items-baseline gap-2 px-5 py-4 rounded-2xl border self-start"
              style={{ background: G.accentBg, borderColor: G.accentBorder }}>
              <span className="text-4xl font-black tracking-tight" style={{ color: G.accent }}>
                {cases[active].stat.val}
              </span>
              <span className="text-sm text-white/40">{cases[active].stat.label}</span>
            </div>
          </div>

          {/* Right: feature grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-4 h-full">
              {cases[active].points.map((point, pi) => (
                <motion.div
                  key={pi}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: pi * 0.07 }}
                  className="group flex flex-col gap-3 p-5 rounded-2xl border cursor-default transition-all duration-200"
                  style={{ background: G.card, borderColor: G.border }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = G.accentBorder)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = G.border)}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: G.accentBg }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: G.accent }} />
                  </div>
                  <p className="text-sm font-medium text-white/75 leading-snug">{point}</p>
                </motion.div>
              ))}

              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="sm:col-span-2 flex items-center justify-between p-5 rounded-2xl border"
                style={{ background: `linear-gradient(135deg, rgba(52,211,153,0.06) 0%, rgba(52,211,153,0.02) 100%)`, borderColor: G.accentBorder }}
              >
                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Get started as a {cases[active].audience.toLowerCase().replace(' & teams', '')}
                  </p>
                  <p className="text-xs text-white/30">Free plan — no credit card needed</p>
                </div>
                <Link href="/signup"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f' }}>
                  Start free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); };
  }, []);

  const portraits = [
    { id: 1, name: 'Elena', image: 'https://images.unsplash.com/photo-1494790108777-28675fd72c4e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
    { id: 2, name: 'Sofia', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
    { id: 3, name: 'Maya', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
    { id: 4, name: 'Zara', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
    { id: 5, name: 'Leila', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80' },
  ];

  const featuredQuizzes = [
    { id: '1', title: 'Web Development Fundamentals', description: 'Master HTML, CSS, and JavaScript basics with hands-on challenges', questions: 25, duration: 30, level: 'Beginner', levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop&auto=format&q=80', author: 'Elena', authorImage: portraits[0].image, category: 'Development', rating: 4.9, students: 1240 },
    { id: '2', title: 'UI/UX Design Principles', description: 'Learn design thinking and craft exceptional user experiences', questions: 20, duration: 25, level: 'Intermediate', levelColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&auto=format&q=80', author: 'Sofia', authorImage: portraits[1].image, category: 'Design', rating: 4.8, students: 987 },
    { id: '3', title: 'Data Science Essentials', description: 'Python, pandas, and data visualization mastery', questions: 30, duration: 45, level: 'Advanced', levelColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80', author: 'Maya', authorImage: portraits[2].image, category: 'Data Science', rating: 4.7, students: 764 },
    { id: '4', title: 'Product Management 101', description: 'From idea to execution — the complete product lifecycle', questions: 15, duration: 20, level: 'Beginner', levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format&q=80', author: 'Zara', authorImage: portraits[3].image, category: 'Business', rating: 4.9, students: 612 },
  ];

  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Sub-100ms response times powered by edge computing infrastructure globally.', stat: '99.9% uptime' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption, SOC2 compliance, and privacy-first architecture.', stat: 'SOC2 Type II' },
    { icon: TrendingUp, title: 'Smart Analytics', description: 'AI-powered insights that adapt to learner behavior and maximize engagement.', stat: '2× engagement' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden"
      style={{ background: G.bg, fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(circle, ${G.accentGlow} 0%, transparent 70%)` }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
          style={{ background: `radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${G.accent}30, transparent)` }} />
      </div>

      {/* ── NAVBAR ── */}
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }} className="relative z-50 max-w-7xl mx-auto px-6 pt-6">
        <div className="flex justify-between items-center px-5 py-3 rounded-2xl border border-white/[0.06] backdrop-blur-xl"
          style={{ background: scrolled ? 'rgba(6,6,8,0.88)' : 'rgba(255,255,255,0.02)' }}>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})` }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold tracking-tight text-lg">
              assess<span className="font-light" style={{ color: G.accent }}>beautifully</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {['Explore', 'Features', 'Pricing'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}
                className="px-4 py-2 text-sm text-white/40 hover:text-white/80 rounded-xl hover:bg-white/[0.04] transition-all">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden sm:block px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/signup"
              className="px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f', boxShadow: `0 0 20px ${G.accentGlow}` }}>
              Get started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div style={{ y: smoothHeroY, opacity: heroOpacity }} className="text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-10"
            style={{ borderColor: G.accentBorder, background: G.accentBg }}>
            <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full" style={{ background: G.accent }} />
            <span className="text-xs font-semibold tracking-wide" style={{ color: G.accent }}>
              v3.0 · redefining assessment
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.88] mb-8">
            <span className="text-white/90">assess</span>
            <br />
            <span className="font-semibold"
              style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7, #a7f3d0)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              beautifully
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-lg text-white/30 max-w-2xl mx-auto mb-12 leading-relaxed">
            <span className="text-white/60">Assess Beautifully</span> combines elegant design with{' '}
            <span className="text-white/60">powerful AI</span> to create assessments people actually love.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <Link href="/signup"
              className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f', boxShadow: `0 0 40px ${G.accentGlow}` }}>
              Start creating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/explore"
              className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-medium text-white/60 hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
              <Play className="w-4 h-4" />
              Explore quizzes
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {portraits.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    className="w-9 h-9 rounded-full border-2 overflow-hidden" style={{ borderColor: G.bg }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white">
                  <span style={{ color: G.accent }}>500+</span> teams trust us
                </div>
                <div className="text-xs text-white/25">including Fortune 500 companies</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />
            <div className="flex items-center gap-4">
              {[{ val: '98%', label: 'satisfaction' }, { val: '50k+', label: 'quizzes taken' }].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-lg font-semibold text-white">{s.val}</div>
                  <div className="text-xs text-white/25">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* ── FEATURED QUIZZES ── */}
      <section className="relative border-t py-28" style={{ borderColor: G.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Featured Quizzes</SectionLabel>
              <h2 className="text-4xl font-light text-white tracking-tight">
                explore{' '}
                <span className="font-semibold"
                  style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  popular
                </span>
              </h2>
              <p className="text-white/30 mt-2 text-sm">Discover quizzes crafted by our community</p>
            </div>
            <Link href="/explore" className="group flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors whitespace-nowrap">
              View all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredQuizzes.map((quiz, i) => (
              <motion.div key={quiz.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }} onClick={() => router.push(`/quiz/${quiz.id}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden border hover:border-white/15 transition-all duration-300"
                style={{ background: G.card, borderColor: G.border }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={quiz.image} alt={quiz.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-medium text-white/70 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm">{quiz.category}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full border ${quiz.levelColor} backdrop-blur-sm`}>{quiz.level}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium text-sm mb-1.5 line-clamp-1">{quiz.title}</h3>
                  <p className="text-white/30 text-xs mb-4 line-clamp-2 leading-relaxed">{quiz.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                    <div className="flex items-center gap-2">
                      <img src={quiz.authorImage} alt={quiz.author} className="w-5 h-5 rounded-full border border-white/10" />
                      <span className="text-[11px] text-white/40">{quiz.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-white/25">
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {quiz.questions}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {quiz.duration}m</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => <Star key={si} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-[10px] text-white/30">{quiz.rating} · {quiz.students.toLocaleString()} students</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: PRODUCT DEMO ── */}
      <ProductDemoSection />

      {/* ── NEW: HOW IT WORKS ── */}
      <HowItWorksSection />

      {/* ── NEW: USE CASES ── */}
      <UseCasesSection />

      {/* ── FEATURES ── */}
      <section className="relative border-t py-28" style={{ borderColor: G.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-5xl font-light tracking-tight text-white mb-4">
              engineered for{' '}
              <span className="font-semibold"
                style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                excellence
              </span>
            </h2>
            <p className="text-white/30 max-w-xl mx-auto text-sm leading-relaxed">
              Every detail has been crafted for the modern assessment experience
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative p-8 rounded-2xl border hover:border-white/12 transition-all duration-300 overflow-hidden"
                style={{ background: G.card, borderColor: G.border }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = G.accentBorder)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = G.border)}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${G.accentGlow} 0%, transparent 60%)` }} />
                <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: G.accentBg, border: `1px solid ${G.accentBorder}` }}>
                  <f.icon className="w-5 h-5" style={{ color: G.accent }} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{f.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed mb-6">{f.description}</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: `${G.accent}60` }} />
                  <span className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">{f.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative border-t py-28" style={{ borderColor: G.border }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-16 sm:p-20 text-center overflow-hidden border"
            style={{ background: `linear-gradient(135deg, rgba(52,211,153,0.07) 0%, rgba(5,150,105,0.05) 50%, rgba(255,255,255,0.01) 100%)`, borderColor: G.accentBorder }}>
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${G.accent}50, transparent)` }} />
            <motion.div className="absolute inset-0 rounded-3xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: `radial-gradient(circle at 50% 50%, ${G.accentGlow} 0%, transparent 60%)` }} />
            <div className="relative z-10">
              <h2 className="text-5xl sm:text-6xl font-light text-white mb-6 tracking-tight">
                ready to{' '}
                <span className="font-semibold"
                  style={{ background: `linear-gradient(135deg, ${G.accent}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  transform?
                </span>
              </h2>
              <p className="text-white/30 mb-10 max-w-md mx-auto text-sm leading-relaxed">
                Join thousands of educators and teams using Assess Beautifully to create impactful learning experiences.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup"
                  className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})`, color: '#021a0f', boxShadow: `0 0 40px ${G.accentGlow}` }}>
                  Claim your workspace
                  <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/explore" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <Compass className="w-4 h-4" />
                  Browse quizzes first
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative border-t py-10" style={{ borderColor: G.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${G.accentDark}, ${G.accent})` }}>
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-white/20">© 2024 Assess Beautifully · redefining assessment</span>
            </div>
            <div className="flex items-center gap-6">
              {['explore', 'legal', 'privacy'].map((l) => (
                <Link key={l} href={`/${l}`} className="text-xs text-white/20 hover:text-white/50 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}