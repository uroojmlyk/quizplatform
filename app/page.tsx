// // app/page.tsx
// 'use client';

// import { useRouter } from 'next/navigation';
// import { BookOpen, Users, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';
// import Button from '@/components/ui/Button';

// export default function HomePage() {
//   const router = useRouter();

//   const features = [
//     {
//       icon: <BookOpen className="h-6 w-6 text-blue-600" />,
//       title: 'Multiple Quiz Types',
//       description: 'Create quizzes with different question types including multiple choice, true/false, and more.'
//     },
//     {
//       icon: <Clock className="h-6 w-6 text-blue-600" />,
//       title: 'Timed Assessments',
//       description: 'Set time limits for quizzes to simulate real exam conditions.'
//     },
//     {
//       icon: <Award className="h-6 w-6 text-blue-600" />,
//       title: 'Instant Results',
//       description: 'Get immediate feedback and detailed results after completing quizzes.'
//     },
//     {
//       icon: <Users className="h-6 w-6 text-blue-600" />,
//       title: 'Role-based Access',
//       description: 'Separate dashboards for students, teachers, and administrators.'
//     }
//   ];

//   const howItWorks = [
//     {
//       step: '1',
//       title: 'Create Account',
//       description: 'Sign up as a student or teacher in seconds.'
//     },
//     {
//       step: '2',
//       title: 'Take or Create Quizzes',
//       description: 'Browse available quizzes or create your own.'
//     },
//     {
//       step: '3',
//       title: 'Get Instant Results',
//       description: 'See your score and track your progress.'
//     }
//   ];

//   const stats = [
//     { value: '500+', label: 'Quizzes' },
//     { value: '1000+', label: 'Students' },
//     { value: '50+', label: 'Teachers' },
//     { value: '95%', label: 'Satisfaction' },
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Test Your Knowledge with{' '}
//               <span className="text-yellow-300">QuizMaster</span>
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100">
//               Create, share, and take quizzes on any topic. 
//               Perfect for teachers and students.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button
//                 size="lg"
//                 onClick={() => router.push('/signup')}
//                 className="bg-white text-blue-600 hover:bg-gray-100"
//               >
//                 Get Started Free
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 onClick={() => router.push('/quiz')}
//                 className="border-white text-white hover:bg-white hover:text-blue-600"
//               >
//                 Browse Quizzes
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-12 bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Why Choose QuizMaster?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Everything you need to create and take quizzes in one place
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Get started in three simple steps
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {howItWorks.map((item, index) => (
//               <div key={index} className="text-center relative">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
//                   {item.step}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                 <p className="text-gray-600">{item.description}</p>
//                 {index < howItWorks.length - 1 && (
//                   <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-blue-200">
//                     <div className="absolute right-0 -top-1 w-2 h-2 bg-blue-400 rounded-full"></div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               What Our Users Say
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Join thousands of satisfied students and teachers
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((_, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-md">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <svg
//                       key={i}
//                       className="w-5 h-5 text-yellow-400 fill-current"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   "QuizMaster has transformed how I test my students. 
//                   The interface is intuitive and the results are instant!"
//                 </p>
//                 <div className="font-semibold">- Sarah Johnson, Teacher</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-blue-600 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Start Your Quiz Journey?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Join thousands of students and teachers already using QuizMaster.
//           </p>
//           <Button
//             size="lg"
//             onClick={() => router.push('/signup')}
//             className="bg-white text-blue-600 hover:bg-gray-100"
//           >
//             Create Free Account
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }    




'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">QuizMaster</h1>
          <p className="text-xl text-gray-600 mb-8">Create and take quizzes online</p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">For Teachers</h3>
            <p className="text-gray-600">Create quizzes and track progress</p>
          </div>
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">For Students</h3>
            <p className="text-gray-600">Take quizzes and see results</p>
          </div>
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Free</h3>
            <p className="text-gray-600">Completely free to use</p>
          </div>
        </div>
      </div>
    </div>
  );
}