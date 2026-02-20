'use client';

import React, { useMemo, useState, useEffect, useRef, useDeferredValue } from 'react';
import { TrainerCard, RarityLevel } from '@/components/TrainerCard';
import TEAM_MEMBERS from '@/data/TEAM_MEMBERS';
import { motion } from 'framer-motion';

// Updated Mapping to match your logic: Mentors = Legendary, etc.
const CATEGORY_MAPPING: Record<string, string> = {
  'Mentor': 'Mentors',
  'CC': 'Core Committee',
  'WC': 'Working Committee',
};

const RARITY_MAPPING: Record<string, RarityLevel> = {
  'Mentor': 'Legendary',
  'CC': 'Rare',
  'WC': 'Common'
};

const INITIAL_BATCH = 4;
const SCROLL_BATCH = 4;

// --- Hardware Skeleton (Matches the Red Pokedex Shape) ---
const CardSkeleton = () => (
  <div className="w-full max-w-[400px] h-[520px] bg-[#dc0a2d]/20 border-b-[8px] border-r-[8px] border-black rounded-tr-[3.5rem] rounded-bl-[2rem] animate-pulse flex flex-col p-6 overflow-hidden">
    <div className="flex gap-3 mb-8">
      <div className="w-12 h-12 rounded-full bg-white/20" />
      <div className="flex gap-1.5 pt-2">
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <div className="w-2 h-2 rounded-full bg-white/10" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="space-y-4">
        <div className="w-full aspect-[1/1.2] bg-black/10 rounded-lg rounded-bl-[2.5rem]" />
        <div className="w-16 h-16 rounded-full bg-black/10 mx-auto" />
      </div>
      <div className="space-y-4">
        <div className="h-48 bg-black/10 rounded-md" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-black/10 rounded-full" />
          <div className="h-4 w-full bg-black/10 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const CardLoadWrapper = ({ children, index, isFiltered }: { children: React.ReactNode, index: number, isFiltered: boolean }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const delay = isFiltered ? (index % SCROLL_BATCH) * 50 : Math.min(index * 100, 1500);
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [index, isFiltered]);

  return (
    <div className="w-full flex justify-center">
      {mounted ? children : <CardSkeleton />}
    </div>
  );
};

export default function TrainerComparison() {
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [isPageMounted, setIsPageMounted] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsPageMounted(true); }, []);

  const categories = ['All', 'Mentors', 'Core Committee', 'Working Committee'];

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

  const visibleMembers = useMemo(() => filteredMembers.slice(0, visibleCount), [filteredMembers, visibleCount]);

  useEffect(() => {
    if (!isPageMounted) return;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredMembers.length) {
          requestAnimationFrame(() => setVisibleCount(prev => prev + SCROLL_BATCH));
        }
      }, { threshold: 0.1, rootMargin: '400px' });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredMembers.length, isPageMounted]);

  return (
    <section className="min-h-screen w-full flex flex-col items-center p-6 pt-32 pb-20 font-mono" id="trainers">
      
      {/* 1. Header Section - Neo Brutalist Hardware Style */}
      <div className="w-full max-w-7xl mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-block bg-[#dc0a2d] border-4 border-black px-6 py-2 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h1 className="text-xl md:text-3xl font-black text-white italic tracking-tighter uppercase">
              Personnel_Index.exe
            </h1>
          </div>
          <p className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest pl-1">
            Phoenix 2026 // Members Database Access
          </p>
        </div>

        {/* 2. Search Module - Pokedex Red Accent */}
        <div className="relative group">
          <div className="absolute inset-0 bg-black rounded-xl translate-x-1.5 translate-y-1.5" />
          <div className="relative flex items-center bg-white border-4 border-black rounded-xl overflow-hidden px-4 h-14 md:w-80 transition-transform group-hover:-translate-y-1">
            <span className="text-xl mr-3">🔍</span>
            <input
              type="text"
              placeholder="Search Personnel..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(INITIAL_BATCH); }}
              className="w-full bg-transparent outline-none font-bold text-black placeholder:text-black/30 uppercase text-xs"
            />
            {search && (
                <button onClick={() => setSearch('')} className="bg-red-500 text-white p-1 rounded-full text-[8px] font-black ml-2">X</button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Category Selectors - "D-Pad" Hardware Style */}
      <div className="w-full max-w-7xl flex flex-wrap gap-3 mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setVisibleCount(INITIAL_BATCH); }}
            className={`
              relative px-5 py-2.5 border-4 border-black font-black uppercase text-[10px] tracking-widest transition-all
              ${activeCategory === cat 
                ? 'bg-[#dc0a2d] text-white -translate-y-1 shadow-[6px_6px_0px_rgba(0,0,0,1)]' 
                : 'bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] shadow-[2px_2px_0px_rgba(0,0,0,1)]'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. The Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 w-full max-w-7xl">
        {!isPageMounted ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {visibleMembers.map((member: any, index: number) => (
              <CardLoadWrapper
                key={`${member.name}-${index}`}
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

            {/* Loading Sentinel */}
            {visibleCount < filteredMembers.length && (
              <div ref={loadMoreRef} className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
                {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            )}
          </>
        )}
      </div>

      {/* 5. Empty State */}
      {filteredMembers.length === 0 && isPageMounted && (
        <div className="w-full max-w-2xl py-20 flex flex-col items-center bg-white border-4 border-dashed border-black/20 rounded-[2rem]">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center text-4xl mb-4">🚫</div>
          <h3 className="text-xl font-black text-black/40 uppercase tracking-widest italic">Signal Lost</h3>
          <p className="text-[10px] text-black/30 mt-1 font-bold">NO_PERSONNEL_FOUND_IN_DATABASE</p>
        </div>
      )}

      {/* Hardware Accents */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-2 opacity-20 pointer-events-none select-none">
          <div className="w-24 h-2 bg-black rounded-full" />
          <div className="w-16 h-2 bg-black rounded-full ml-auto" />
      </div>

    </section>
  );
}