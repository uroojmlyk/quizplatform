'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, Loader2, Sparkles } from 'lucide-react';
import { showToast } from '@/lib/toast';

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    verifyEmail();
  }, []);

  // Redirect countdown
  useEffect(() => {
    if (verified || alreadyVerified) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        router.push('/dashboard');
      }
    }
  }, [verified, alreadyVerified, countdown, router]);

  const verifyEmail = async () => {
    try {
      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.alreadyVerified) {
          setAlreadyVerified(true);
          showToast.success('Email already verified!');
        } else {
          setVerified(true);
          showToast.success('Email verified successfully!');
          
          // Update local storage user data
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            user.verified = true;
            localStorage.setItem('user', JSON.stringify(user));
          }
        }
      } else {
        setError(data.error || 'Verification failed');
        showToast.error(data.error || 'Verification failed');
      }
    } catch (error) {
      setError('Failed to verify email');
      showToast.error('Network error');
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Toaster />
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
        {(verified || alreadyVerified) ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {alreadyVerified ? 'Already Verified!' : 'Email Verified!'}
            </h1>
            <p className="text-gray-600 mb-6">
              {alreadyVerified 
                ? 'Your email was already verified. You have full access to all features.'
                : 'Your email has been successfully verified. You now have full access to all features.'}
            </p>
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                Redirecting to dashboard in {countdown} seconds...
              </div>
              <Link
                href="/dashboard"
                className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
              >
                Go to Dashboard Now
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-gray-500 text-sm mb-6">
              The verification link may have expired or is invalid. Please request a new verification email.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/resend-verification')}
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
              >
                Resend Verification Email
              </button>
              <Link
                href="/login"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}