'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EventsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page's event section
    router.replace('/#events');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-yellow-400 border-slate-800 rounded-full animate-spin"></div>
        <p className="font-['Orbitron',sans-serif] text-slate-400 text-xs tracking-[0.3em] uppercase animate-pulse">
          Redirecting to Signal...
        </p>
      </div>
    </div>
  );
}
