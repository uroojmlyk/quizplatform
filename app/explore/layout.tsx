import { ReactNode } from 'react';

export default function ExploreLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      {children}
    </div>
  );
}