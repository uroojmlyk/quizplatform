

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        
        {/* Simple Logo */}
        <div className="mb-6">
          <span className="text-2xl font-medium text-black tracking-tight">
            QuizMaster
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-lg text-gray-600 mb-8 font-light">
          Test your knowledge
        </h1>

        {/* Transparent Mini Form for Buttons */}
        <div className="bg-transparent border border-gray-200 rounded-lg p-3">
          <div className="flex gap-2">
            <Link 
              href="/login" 
              className="flex-1 px-3 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors text-center"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="flex-1 px-3 py-2 text-sm bg-white text-black border border-gray-300 rounded hover:bg-gray-50 transition-colors text-center"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Simple Feature Text */}
        <p className="text-xs text-gray-400 mt-6">
          Create · Track · Analyze
        </p>
      </div>
    </div>
  );
}








// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { showToast } from '@/lib/toast';
// import { Toaster } from 'react-hot-toast';

// export default function LoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name as keyof typeof errors]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validation
//     const newErrors = {
//       email: !formData.email ? 'Email is required' : '',
//       password: !formData.password ? 'Password is required' : ''
//     };
//     setErrors(newErrors);
    
//     if (newErrors.email || newErrors.password) return;
    
//     setLoading(true);
    
//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
      
//       const data = await res.json();
      
//       if (res.ok && data.success) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         showToast.success('Login successful!');
        
//         if (data.user.role === 'teacher') {
//           router.push('/teacher/dashboard');
//         } else {
//           router.push('/dashboard');
//         }
//       } else {
//         showToast.error(data.error || 'Invalid credentials');
//       }
//     } catch (error) {
//       showToast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div 
//       className="min-h-screen flex items-center justify-center px-4 py-8 relative"
//       style={{
//         backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <Toaster />
      
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      
//       {/* Transparent Form Card */}
//       <div className="relative z-10 w-full max-w-md">
//         <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <Link href="/" className="inline-block">
//               <span className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">
//                 QuizMaster
//               </span>
//             </Link>
//             <p className="text-white/70 text-sm mt-2">
//               Welcome back! Please login to continue.
//             </p>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email Field */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email address"
//                 className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
//               />
//               {errors.email && (
//                 <p className="text-sm text-red-300 mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
//               />
//               {errors.password && (
//                 <p className="text-sm text-red-300 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Forgot Password */}
//             <div className="text-right">
//               <Link 
//                 href="/forgot-password" 
//                 className="text-sm text-white/70 hover:text-white transition-colors"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-12 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>

//           {/* Sign Up Link */}
//           <p className="text-center text-white/70 text-sm mt-6">
//             Don't have an account?{' '}
//             <Link 
//               href="/signup" 
//               className="text-white font-medium hover:underline"
//             >
//               Sign up
//             </Link>
//           </p>

//           {/* Simple Feature Text */}
//           <p className="text-center text-white/50 text-xs mt-8">
//             Create · Track · Analyze
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }