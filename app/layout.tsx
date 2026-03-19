import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

export const metadata: Metadata = {
  title: "Ficer",
  description: "Professional Quiz Platform — Create, share, and track quizzes.",
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
          position="top-right"
          reverseOrder={false}
          gutter={10}
          containerStyle={{ top: 16, right: 16 }}
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0e0e18',
              color: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              fontSize: '13px',
              fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
              fontWeight: '500',
              padding: '12px 16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              maxWidth: '360px',
            },
            success: {
              duration: 3500,
              iconTheme: { primary: '#34d399', secondary: '#0a1410' },
              style: {
                background: '#0a1410',
                border: '1px solid rgba(52,211,153,0.25)',
              },
            },
            error: {
              duration: 4500,
              iconTheme: { primary: '#f87171', secondary: '#140a0a' },
              style: {
                background: '#140a0a',
                border: '1px solid rgba(239,68,68,0.25)',
              },
            },
            loading: {
              style: {
                background: '#0e0e18',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.6)',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}