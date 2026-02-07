'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pokeballImage, setPokeballImage] = useState('/pball.png');
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle pokeball animation sequence
  useEffect(() => {
    if (isMenuOpen) {
      // Opening sequence: pball.png → pball-open.png → pball-open-full.png
      setPokeballImage('/pball-open.png');
      const timer = setTimeout(() => {
        setPokeballImage('/pball-open-full.png');
        setShowDropdown(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Hide dropdown immediately when closing
      setShowDropdown(false);
      // Closing sequence: pball-open-full.png → pball-open.png → pball.png
      if (pokeballImage !== '/pball.png') {
        setPokeballImage('/pball-open.png');
        const timer = setTimeout(() => {
          setPokeballImage('/pball.png');
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col items-center w-full px-4 pt-4 pb-5 bg-gradient-to-b from-black/60 to-transparent">
        {/* Logo */}
        <div className="relative w-48 h-24 flex-shrink-0 drop-shadow-2xl pointer-events-auto">
          <Link href="/">
            <Image
              src="/logo-text.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        
        {/* Pokeball Menu Button - below logo */}
        <div className="relative pointer-events-auto mt-1">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-10 h-16 transition-transform duration-300 hover:scale-110 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Image
              src={pokeballImage}
              alt="Menu"
              fill
              className="object-contain drop-shadow-lg transition-opacity duration-100"
            />
          </button>
          
          {/* Dropdown Menu */}
          <div className={`absolute left-1/2 -translate-x-1/2 mt-4 w-52 transition-all duration-300 origin-top ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg border-2 border-cyan-400/60 overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />
              
              <div className="p-2 space-y-1">
                <Link 
                  href="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-md text-white font-orbitron tracking-wider uppercase text-sm transition-all duration-200 hover:bg-cyan-500/20 hover:translate-x-1"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="group-hover:text-cyan-300 transition-colors duration-200">About</span>
                </Link>
                <Link 
                  href="/trainers" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-md text-white font-orbitron tracking-wider uppercase text-sm transition-all duration-200 hover:bg-cyan-500/20 hover:translate-x-1"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="group-hover:text-cyan-300 transition-colors duration-200">Trainers</span>
                </Link>
                
                {/* Divider */}
                <div className="mx-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <Link 
                  href="/events" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-md text-white font-orbitron tracking-wider uppercase text-sm transition-all duration-200 hover:bg-red-500/20 hover:translate-x-1"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="group-hover:text-red-300 transition-colors duration-200">Events</span>
                </Link>
                <Link 
                  href="/sponsors" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-md text-white font-orbitron tracking-wider uppercase text-sm transition-all duration-200 hover:bg-red-500/20 hover:translate-x-1"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="group-hover:text-red-300 transition-colors duration-200">Sponsors</span>
                </Link>
              </div>
              
              {/* Bottom accent bar */}
              <div className="h-1 bg-gradient-to-r from-red-400 via-orange-500 to-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center gap-12 px-4 pt-4 pb-5 bg-gradient-to-b from-black/60 to-transparent">
        <Link href="/about" className="inline-flex items-center justify-center group pointer-events-auto text-white font-bold text-lg tracking-widest uppercase font-orbitron transition-all duration-100 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          <span className="inline-block opacity-0 translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
          <span className="group-hover:text-cyan-300 transition-colors duration-100">About</span>
          <span className="inline-block opacity-0 -translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
        </Link>
        <Link href="/trainers" className="inline-flex items-center justify-center group pointer-events-auto text-white font-bold text-lg tracking-widest uppercase font-orbitron transition-all duration-100 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          <span className="inline-block opacity-0 translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
          <span className="group-hover:text-cyan-300 transition-colors duration-100">Trainers</span>
          <span className="inline-block opacity-0 -translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
        </Link>
        <div className="relative w-64 h-32 flex-shrink-0 drop-shadow-2xl pointer-events-auto">
          <Link href="/">
            <Image
              src="/logo-text.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <Link href="/events" className="inline-flex items-center justify-center group pointer-events-auto text-white font-bold text-lg tracking-widest uppercase font-orbitron transition-all duration-100 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          <span className="inline-block opacity-0 translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
          <span className="group-hover:text-red-300 transition-colors duration-100">Events</span>
          <span className="inline-block opacity-0 -translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
        </Link>
        <Link href="/sponsors" className="inline-flex items-center justify-center group pointer-events-auto text-white font-bold text-lg tracking-widest uppercase font-orbitron transition-all duration-100 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          <span className="inline-block opacity-0 translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
          <span className="group-hover:text-red-300 transition-colors duration-100">Sponsors</span>
          <span className="inline-block opacity-0 -translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
