



import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizMaster",
  description: "Interactive Quiz Platform - Test your knowledge with fun quizzes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Toaster 
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a23',
              color: '#fff',
              border: '1px solid #2a2a35',
            },
            success: {
              icon: '🎉',
              style: {
                border: '1px solid #22c55e',
              },
            },
            error: {
              icon: '❌',
              style: {
                border: '1px solid #ef4444',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}