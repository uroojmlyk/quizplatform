

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, UserPlus, Sparkles, Eye, EyeOff, Github } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'teacher'
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      // API call to signup
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Auto login after signup
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        });

        const loginData = await loginRes.json();

        if (loginRes.ok && loginData.success) {
          localStorage.setItem('token', 'dummy-token');
          localStorage.setItem('user', JSON.stringify(loginData.user));
          
          if (loginData.user.role === 'teacher') {
            router.push('/teacher/dashboard');
          } else {
            router.push('/dashboard');
          }
        }
      } else {
        alert(data.error || 'Error creating account');
        setIsLoading(false);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Signup Card */}
      <div className="relative w-full max-w-md px-4 sm:px-0">
        <div className="backdrop-blur-xl bg-[#111117]/90 rounded-3xl border border-[#2a2a35] shadow-2xl overflow-hidden">
          
          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-[#3b3b4a] to-transparent pointer-events-none"></div>
          
          {/* Content */}
          <div className="relative p-6 sm:p-8">
            {/* Logo */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-600/20 mb-3 sm:mb-4 animate-float">
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">Join QuizMaster today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Field */}
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1a23] border ${
                      errors.name ? 'border-red-500/50' : 'border-[#2a2a35]'
                    } rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-[#1a1a23] border ${
                      errors.email ? 'border-red-500/50' : 'border-[#2a2a35]'
                    } rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    className={`w-full pl-9 sm:pl-10 pr-12 py-2.5 sm:py-3 bg-[#1a1a23] border ${
                      errors.password ? 'border-red-500/50' : 'border-[#2a2a35]'
                    } rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`}
                    placeholder="Create a password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                    className={`w-full pl-9 sm:pl-10 pr-12 py-2.5 sm:py-3 bg-[#1a1a23] border ${
                      errors.confirmPassword ? 'border-red-500/50' : 'border-[#2a2a35]'
                    } rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base`}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 ml-1">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({...form, role: 'student'})}
                    className={`flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
                      form.role === 'student'
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-[#2a2a35] bg-[#1a1a23] text-gray-400 hover:border-gray-500'
                    }`}
                    disabled={isLoading}
                  >
                    <span className="text-base sm:text-lg">👨‍🎓</span>
                    <span className="text-xs sm:text-sm font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({...form, role: 'teacher'})}
                    className={`flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${
                      form.role === 'teacher'
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-[#2a2a35] bg-[#1a1a23] text-gray-400 hover:border-gray-500'
                    }`}
                    disabled={isLoading}
                  >
                    <span className="text-base sm:text-lg">👩‍🏫</span>
                    <span className="text-xs sm:text-sm font-medium">Teacher</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] hover:from-purple-500 hover:to-blue-500 transition-all duration-300 mt-4"
              >
                <div className="relative flex items-center justify-center gap-2 bg-[#0A0A0F] rounded-xl py-2.5 sm:py-3 px-4 group-hover:bg-opacity-90 transition-all">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base text-white font-medium">Creating account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      <span className="text-sm sm:text-base text-white font-medium">Sign Up</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Social Signup */}
            <div className="mt-6 sm:mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2a2a35]"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-4 bg-[#111117] text-gray-400">Or sign up with</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl transition-all group">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.48 12.61v-2.36h9.76c.14.61.22 1.23.22 1.94 0 5.31-3.56 9.07-8.98 9.07-5.46 0-9.9-4.44-9.9-9.9s4.44-9.9 9.9-9.9c2.67 0 4.92.98 6.64 2.58l-2.65 2.56c-1.73-1.66-4.01-2.68-6.99-2.68-5.1 0-9.22 4.12-9.22 9.22s4.12 9.22 9.22 9.22c4.73 0 8.19-3.01 8.96-6.96h-8.96z"/>
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 bg-[#1a1a23] hover:bg-[#252530] border border-[#2a2a35] rounded-xl transition-all group">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white" />
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white">GitHub</span>
                </button>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}