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
      <div className="flex md:hidden items-center justify-center gap-3 w-full px-4 pt-3 pb-2 bg-gradient-to-b from-black/60 to-transparent">
        {/* Pokeball Menu Button - left of logo */}
        <div className="relative pointer-events-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative w-14 h-24 transition-transform duration-300 hover:scale-110 focus:outline-none ${!isMenuOpen ? 'animate-wiggle' : ''}`}
            aria-label="Toggle menu"
          >
            <Image
              src={pokeballImage}
              alt="Menu"
              fill
              className="object-contain drop-shadow-lg transition-opacity duration-100"
            />
          </button>
          
          {/* Fullscreen Dropdown Menu Overlay */}
          <div className={`fixed left-[5px] right-[5px] top-[calc(9rem+5px)] bottom-[5px] transition-all duration-300 ${showDropdown ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="h-full bg-gradient-to-b from-slate-900/98 via-slate-950/98 to-black/98 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
              {/* Top accent bar - cyan/blue gradient */}
              <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />
              
              <div className="flex flex-col items-center justify-center h-full py-8 space-y-6">
                <Link 
                  href="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-center px-6 py-4 text-white font-bold font-orbitron tracking-widest uppercase text-xl transition-all duration-100 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                >
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-3">[</span>
                  <span className="group-hover:text-cyan-300 transition-colors duration-100">About</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-3">]</span>
                </Link>
                <Link 
                  href="/trainers" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-center px-6 py-4 text-white font-bold font-orbitron tracking-widest uppercase text-xl transition-all duration-100 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                >
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-3">[</span>
                  <span className="group-hover:text-cyan-300 transition-colors duration-100">Trainers</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-3">]</span>
                </Link>
                
                {/* Divider */}
                <div className="w-48 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                
                <Link 
                  href="/events" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-center px-6 py-4 text-white font-bold font-orbitron tracking-widest uppercase text-xl transition-all duration-100 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                >
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-3">[</span>
                  <span className="group-hover:text-red-300 transition-colors duration-100">Events</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-3">]</span>
                </Link>
                <Link 
                  href="/sponsors" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-center px-6 py-4 text-white font-bold font-orbitron tracking-widest uppercase text-xl transition-all duration-100 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                >
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-3">[</span>
                  <span className="group-hover:text-red-300 transition-colors duration-100">Sponsors</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-100 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-3">]</span>
                </Link>
              </div>
              
              {/* Bottom accent bar - red/orange gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-orange-500 to-red-400" />
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="relative w-72 h-36 flex-shrink-0 drop-shadow-2xl pointer-events-auto">
          <Link href="/">
            <Image
              src="/logo-text.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>
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
