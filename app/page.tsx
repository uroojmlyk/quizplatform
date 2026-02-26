

// 'use client';

// import Link from 'next/link';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-4">
//       <div className="w-full max-w-md text-center">
        
//         {/* Simple Logo */}
//         <div className="mb-6">
//           <span className="text-2xl font-medium text-black tracking-tight">
//             QuizMaster
//           </span>
//         </div>

//         {/* Heading */}
//         <h1 className="text-lg text-gray-600 mb-8 font-light">
//           Test your knowledge
//         </h1>

//         {/* Transparent Mini Form for Buttons */}
//         <div className="bg-transparent border border-gray-200 rounded-lg p-3">
//           <div className="flex gap-2">
//             <Link 
//               href="/login" 
//               className="flex-1 px-3 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors text-center"
//             >
//               Log in
//             </Link>
//             <Link 
//               href="/signup" 
//               className="flex-1 px-3 py-2 text-sm bg-white text-black border border-gray-300 rounded hover:bg-gray-50 transition-colors text-center"
//             >
//               Sign up
//             </Link>
//           </div>
//         </div>

//         {/* Simple Feature Text */}
//         <p className="text-xs text-gray-400 mt-6">
//           Create · Track · Analyze
//         </p>
//       </div>
//     </div>
//   );
// }










'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation example
    const newErrors = {
      email: !formData.email ? 'Email is required' : '',
      password: !formData.password ? 'Password is required' : ''
    };
    setErrors(newErrors);
    
    // If no errors, proceed with login
    if (!newErrors.email && !newErrors.password) {
      console.log('Login attempt with:', formData);
      // Add your login logic here
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 md:p-10">
        
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-medium text-black tracking-tight">
              QuizMaster
            </span>
          </Link>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Login to your account
          </h2>
          <p className="text-sm text-gray-500">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`
                w-full h-11 px-4 rounded-md border
                transition-colors duration-150
                focus:outline-none focus:ring-0 focus:border-gray-800
                ${errors.email ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            {/* Error Message Placeholder */}
            {errors.email ? (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            ) : (
              <p className="text-sm text-transparent mt-1 select-none">.</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`
                w-full h-11 px-4 rounded-md border
                transition-colors duration-150
                focus:outline-none focus:ring-0 focus:border-gray-800
                ${errors.password ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            {/* Error Message Placeholder */}
            {errors.password ? (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            ) : (
              <p className="text-sm text-transparent mt-1 select-none">.</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link 
              href="/forgot-password" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-11 bg-gray-900 text-white rounded-md
                     hover:bg-black transition duration-150
                     font-medium text-sm tracking-wide"
          >
            Sign in
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="text-gray-900 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Simple Feature Text */}
        <p className="text-xs text-gray-400 text-center mt-8">
          Create · Track · Analyze
        </p>
      </div>
    </div>
  );
}