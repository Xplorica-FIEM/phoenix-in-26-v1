'use client';

import React, { useMemo, useState, useEffect, useRef, useDeferredValue } from 'react';
import { TrainerCard, RarityLevel } from '@/components/TrainerCard';
import TEAM_MEMBERS from '@/data/TEAM_MEMBERS';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_MAPPING: Record<string, string> = {
  'Facilitator': 'Facilitators',
  'Mentor': 'Mentors',
  'Core Committee': 'Core Committee',
  'Working Committee': 'Working Committee',
  'Coordinator': 'Coordinators'
};

const RARITY_MAPPING: Record<string, RarityLevel> = {
  'Facilitator': 'Mythic',
  'Mentor': 'Legendary',
  'Coordinator': 'Epic',
  'Core Committee': 'Rare',
  'Working Committee': 'Common'
};

const INITIAL_BATCH = 4; // Smaller initial batch for mobile responsiveness
const SCROLL_BATCH = 4;

// --- Card Wrapper for Individual Mounting ---
const CardLoadWrapper = ({ children, index, isFiltered }: { children: React.ReactNode, index: number, isFiltered: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Card-wise progressive display to "compile in background"
    // Use a staggered timeout for initial load or filter changes
    const delay = isFiltered ? (index % SCROLL_BATCH) * 100 : Math.min(index * 150, 2000);
    const timer = setTimeout(() => {
      setMounted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [index, isFiltered]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={mounted ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full flex justify-center"
    >
      {mounted ? children : <CardSkeleton />}
    </motion.div>
  );
};

// --- Skeleton Card for smooth loading ---
const CardSkeleton = () => (
  <div className="w-full max-w-sm h-[480px] bg-slate-800/50 border-4 border-black rounded-2xl animate-pulse flex flex-col">
    <div className="h-12 border-b-4 border-black bg-slate-700/50" />
    <div className="h-56 border-b-4 border-black bg-slate-700/30" />
    <div className="p-5 flex-grow space-y-4">
      <div className="h-6 w-3/4 bg-slate-700/50 rounded" />
      <div className="h-4 w-1/2 bg-slate-700/30 rounded" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="space-y-2">
          <div className="h-3 w-1/2 bg-slate-700/20 rounded" />
          <div className="h-4 w-full bg-slate-700/30 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-1/2 bg-slate-700/20 rounded" />
          <div className="h-4 w-full bg-slate-700/30 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default function TrainerComparison() {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [isPageMounted, setIsPageMounted] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsPageMounted(true);
  }, []);

  const categories = ['All', 'Facilitators', 'Mentors', 'Core Committee', 'Working Committee', 'Coordinators'];

  const filteredMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((m: any) => {
      const matchesSearch = m.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
        (m.position && m.position.toLowerCase().includes(deferredSearch.toLowerCase())) ||
        (m.depertment && m.depertment.toLowerCase().includes(deferredSearch.toLowerCase()));

      const categoryLabel = CATEGORY_MAPPING[m.position] || 'Others';
      const matchesCat = activeCategory === 'All' || categoryLabel === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [deferredSearch, activeCategory]);

  const visibleMembers = useMemo(() => {
    return filteredMembers.slice(0, visibleCount);
  }, [filteredMembers, visibleCount]);

  useEffect(() => {
    if (!isPageMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredMembers.length) {
          // Wrap in requestAnimationFrame for smoother frame timing
          requestAnimationFrame(() => {
            setVisibleCount(prev => prev + SCROLL_BATCH);
          });
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredMembers.length, isPageMounted]);

  return (
    <section className="min-h-screen w-full flex flex-col items-center p-6 pt-40 pb-20 relative overflow-hidden bg-transparent" id='trainers'>
      {/* Background Decor (Simplified for Performance) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <main className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Header Section */}
        <div className="w-full mb-16 text-center">
          <div className="inline-block bg-yellow-400 border-4 border-black px-6 md:px-8 py-3 md:py-4 shadow-[8px_8px_0_rgba(0,0,0,1)] mb-4">
            <h1 className="text-lg md:text-3xl font-black font-press-start text-black tracking-tighter uppercase whitespace-nowrap">
              RESEARCH DIVISION
            </h1>
          </div>
          <p className="text-yellow-400 font-mono text-[9px] md:text-sm uppercase tracking-[0.4em] font-black">
            Authorized Personnel Directory // 2026_PHX
          </p>
        </div>

        {/* Scanner Control Bar */}
        <div className="w-full mb-10 flex flex-col md:flex-row gap-4 items-center justify-between bg-white border-4 border-black p-4 md:p-6 rounded-2xl shadow-[8px_8px_0_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex w-12 h-12 bg-yellow-400 border-4 border-black items-center justify-center shrink-0">
              <span className="text-2xl font-black text-black">?</span>
            </div>
            <div className="text-left">
              <h2 className="text-slate-900 font-black uppercase text-lg tracking-tighter leading-tight">Member Scanner</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none">DATABASE_SIZE: {filteredMembers.length} UNITS</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Scanning database..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(INITIAL_BATCH);
                }}
                className="w-full md:w-72 h-12 pl-4 pr-10 bg-slate-100 border-2 border-black font-bold focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_#eab308] transition-all placeholder:text-slate-400 text-sm text-slate-900"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="w-full flex flex-wrap justify-center gap-2 md:gap-4 mb-12 px-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(INITIAL_BATCH);
              }}
              className={`px-3 md:px-6 py-2 border-4 border-black font-black uppercase text-[8px] md:text-[10px] tracking-widest transition-all whitespace-nowrap ${activeCategory === cat
                ? 'bg-yellow-400 text-black translate-x-1 -translate-y-1 shadow-[0_0_0_rgba(0,0,0,1)]'
                : 'bg-white text-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_rgba(0,0,0,1)]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Member Grid - Auto-optimized loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-2">
          {!isPageMounted ? (
            // Static skeletal state before hydration
            Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          ) : (
            <>
              {visibleMembers.map((member: any, index: number) => (
                <CardLoadWrapper
                  key={`${member.name}-${deferredSearch}-${activeCategory}`}
                  index={index}
                  isFiltered={search !== '' || activeCategory !== 'All'}
                >
                  <TrainerCard
                    name={member.name}
                    role={member.position}
                    department={member.depertment}
                    mobile={member.phone}
                    email={member.email}
                    linkedin={member.linkedin}
                    instagram={member.instagram}
                    facebook={member.facebook}
                    photoUrl={member.image}
                    rarity={RARITY_MAPPING[member.position] || 'Common'}
                  />
                </CardLoadWrapper>
              ))}

              {/* Load More Sentinel or final skeletons */}
              {visibleCount < filteredMembers.length && (
                <div ref={loadMoreRef} className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <CardSkeleton key={`skeleton-append-${i}`} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {filteredMembers.length === 0 && isPageMounted && (
          <div className="py-24 flex flex-col items-center bg-black/40 border-4 border-dashed border-white/10 rounded-3xl w-full">
            <h3 className="text-xl font-black text-white uppercase tracking-widest opacity-50">Signal Lost</h3>
            <p className="text-xs text-white/30 mt-2 font-mono uppercase tracking-widest leading-normal">ER_404_MEMBER_NOT_FOUND</p>
          </div>
        )}

        {/* Load More Sentinel */}
        <div ref={loadMoreRef} className="h-20 w-full mt-10" />
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
