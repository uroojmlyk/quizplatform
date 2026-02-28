

// 'use client';

// import Link from 'next/link';
// import { ArrowRight, CheckCircle, Database, Lock, BarChart3, Users } from 'lucide-react';

// export default function HomePage() {
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
//           <div className="flex items-center gap-8">
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
//         <div className="max-w-4xl">
//           {/* Eyebrow */}
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 mb-8">
//             <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
//             <span className="text-xs font-mono text-white/60">v2.0.0 · mongodb + next.js 14</span>
//           </div>

//           {/* Main headline */}
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-6">
//             quiz platform
//             <br />
//             <span className="text-white/40">with real-time analytics</span>
//           </h1>
          
//           {/* Description */}
//           <p className="text-lg text-white/50 max-w-2xl mb-10 leading-relaxed">
//             Full-stack quiz system built with Next.js 14, MongoDB, and REST APIs. 
//             Complete authentication flow, CRUD operations, and performance tracking.
//           </p>

//           {/* CTA buttons */}
//           <div className="flex flex-wrap gap-4 mb-16">
//             <Link 
//               href="/signup"
//               className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all font-medium"
//             >
//               Get started
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link 
//               href="/demo"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all border border-white/10"
//             >
//               View demo
//             </Link>
//           </div>

//           {/* Stats grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
//             <div>
//               <div className="text-2xl font-medium text-white mb-1">1.2k+</div>
//               <div className="text-sm text-white/40">quizzes created</div>
//             </div>
//             <div>
//               <div className="text-2xl font-medium text-white mb-1">5.8k+</div>
//               <div className="text-sm text-white/40">active users</div>
//             </div>
//             <div>
//               <div className="text-2xl font-medium text-white mb-1">92%</div>
//               <div className="text-sm text-white/40">completion rate</div>
//             </div>
//             <div>
//               <div className="text-2xl font-medium text-white mb-1">24ms</div>
//               <div className="text-sm text-white/40">avg. response</div>
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
//               <a href="https://github.com" className="text-sm text-white/40 hover:text-white transition-colors">
//                 github
//               </a>
//               <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
//                 documentation
//               </a>
//               <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
//                 api
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }







'use client';

import Link from 'next/link';
import { ArrowRight, Lock, Database, BarChart3 } from 'lucide-react';

export default function HomePage() {
  // Array of student images (using Unsplash URLs)
  const students = [
    { 
      id: 1, 
      name: 'Alex Chen',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
      delay: 0 
    },
    { 
      id: 2, 
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces',
      delay: 200 
    },
    { 
      id: 3, 
      name: 'Michael Park',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces',
      delay: 400 
    },
    { 
      id: 4, 
      name: 'Emma Watson',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=faces',
      delay: 600 
    },
    { 
      id: 5, 
      name: 'James Lee',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      delay: 800 
    },
     { 
      id: 6, 
      name: 'Urooj Rasheed',
      image: '/women2.jpg',
      delay: 800 
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a1a24,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_#1f1f2a,_transparent_50%)]"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-medium text-white tracking-tight">quizmaster</span>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-white/40 rounded-md border border-white/10">beta</span>
          </div>
          <div className="flex items-center gap-8">
            <Link 
              href="/login"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/signup"
              className="text-sm px-5 py-2.5 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all font-medium"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 mb-8">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-mono text-white/60">v2.0.0 · mongodb + next.js 14</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-6">
              quiz platform
              <br />
              <span className="text-white/40">with real-time analytics</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-white/50 max-w-2xl mb-10 leading-relaxed">
              Full-stack quiz system built with Next.js 14, MongoDB, and REST APIs. 
              Complete authentication flow, CRUD operations, and performance tracking.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link 
                href="/signup"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all font-medium"
              >
                Get started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all border border-white/10"
              >
                View demo
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
              <div>
                <div className="text-2xl font-medium text-white mb-1">1.2k+</div>
                <div className="text-sm text-white/40">quizzes created</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-white mb-1">5.8k+</div>
                <div className="text-sm text-white/40">active users</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-white mb-1">92%</div>
                <div className="text-sm text-white/40">completion rate</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-white mb-1">24ms</div>
                <div className="text-sm text-white/40">avg. response</div>
              </div>
            </div>
          </div>

          {/* Right column - Student images with modern animation */}
          <div className="relative hidden lg:block">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl blur-3xl"></div>
            
            {/* Image grid */}
            <div className="relative grid grid-cols-3 gap-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="group relative aspect-square"
                  style={{
                    animation: `floatIn 0.6s ease-out ${student.delay}ms forwards`,
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  {/* Image container with hover effects */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:z-10">
                    {/* Image */}
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Name tooltip on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs text-white/90 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                        {student.name}
                      </p>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {students.slice(0, 3).map((s) => (
                    <img
                      key={`mini-${s.id}`}
                      src={s.image}
                      alt=""
                      className="w-6 h-6 rounded-full border-2 border-white/20"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">+247 students</p>
                  <p className="text-xs text-white/40">joined this week</p>
                </div>
              </div>
            </div>

            {/* Activity indicator */}
            <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-3 animate-float-delayed">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1 h-3 bg-emerald-400/50 rounded-full animate-pulse delay-150"></div>
                </div>
                <span className="text-xs text-white/60">live activity</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features section */}
      <section className="relative z-10 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* Section header */}
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-medium text-white mb-4 tracking-tight">
              built for developers
            </h2>
            <p className="text-white/50">
              Clean architecture, type-safe APIs, and production-ready code.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">auth system</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                JWT-based authentication with role-based access control. 
                Secure password hashing using bcrypt.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">jwt</span>
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">bcrypt</span>
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">middleware</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Database className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">crud operations</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Full CRUD for quizzes with MongoDB. RESTful API design with 
                proper error handling and validation.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">mongodb</span>
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">rest api</span>
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">mongoose</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">result analytics</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Track user performance with detailed analytics. 
                Aggregation pipelines for insights.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">aggregation</span>
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">charts</span>
                <span className="px-2 py-1 text-xs font-mono bg-white/5 text-white/40 rounded border border-white/10">realtime</span>
              </div>
            </div>
          </div>

          {/* Tech stack */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-8">
              <span className="text-sm text-white/30 font-mono">stack</span>
              <div className="flex flex-wrap gap-6">
                {['next.js 14', 'mongodb', 'tailwind', 'typescript', 'rest api', 'jwt'].map((tech) => (
                  <span key={tech} className="text-sm text-white/60 hover:text-white transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium text-white mb-4 tracking-tight">
              ready to build?
            </h2>
            <p className="text-white/50 mb-8">
              Full source code available. Built with production-grade practices.
            </p>
            <Link 
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0B0F] rounded-lg hover:bg-white/90 transition-all font-medium"
            >
              Start building
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/40">© 2024 quizmaster</span>
              <span className="text-xs px-2 py-0.5 bg-white/5 text-white/30 rounded border border-white/10">mit license</span>
            </div>
            <div className="flex gap-8">
              <a href="https://github.com" className="text-sm text-white/40 hover:text-white transition-colors">
                github
              </a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                documentation
              </a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                api
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes floatIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 4s ease-in-out 2s infinite;
        }
        .delay-75 {
          animation-delay: 75ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}