import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-900 text-white font-sans p-8">
      <main className="flex flex-col items-center max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg">
          About Phoenix
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
          Phoenix is a Next.js application designed to demonstrate high-performance animations and sophisticated UI patterns. 
          Built with precision and intent, every interaction is crafted to be smooth and engaging.
        </p>

        <div className="mt-12">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-cyan-300 font-orbitron tracking-widest uppercase hover:text-white transition-colors duration-300"
          >
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">[</span>
            Return Home
            <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">]</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
