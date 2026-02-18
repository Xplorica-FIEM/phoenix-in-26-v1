'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// --- Dummy Data ---
const dummyEvents = [
  { id: 1, title: 'Event 1', subtitle: 'Tech Workshop', image: '/placeholder-image.jpg', status: 'live', endsIn: '2 hours 30 mins', endDate: 'Feb 17, 2026', category: 'Tech Events' },
  { id: 2, title: 'Event 2', subtitle: 'AI Hackathon', image: '/placeholder-image.jpg', status: 'upcoming', endsIn: '5 days', endDate: 'Feb 22, 2026', category: 'Tech Events' },
  { id: 3, title: 'Event 3', subtitle: 'Code Marathon', image: '/placeholder-image.jpg', status: 'live', endsIn: '45 mins', endDate: 'Feb 17, 2026', category: 'Tech Events' },
  { id: 4, title: 'Event 4', subtitle: 'Design Sprint', image: '/placeholder-image.jpg', status: 'upcoming', endsIn: '3 days', endDate: 'Feb 20, 2026', category: 'Tech Events' },
];

export default function Events() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories', 'Tech Events', 'Gaming Events', 'Sports Events', 'Cultural Events', 'Workshops', 'Competitions'
  ];

  // Group events logic
  const groupedEvents = dummyEvents.reduce((acc, event) => {
    if (!acc[event.category]) acc[event.category] = [];
    acc[event.category].push(event);
    return acc;
  }, {});

  // Sort events logic
  Object.keys(groupedEvents).forEach(category => {
    groupedEvents[category].sort((a, b) => {
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (a.status !== 'live' && b.status === 'live') return 1;
      return 0;
    });
  });

  return (
    <section className="min-h-screen w-full flex flex-col items-center font-sans p-4 pt-36 md:pt-40 pb-8 text-white" id="events">
      
      {/* --- HEADER & SEARCH ROW --- */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 mb-8">
        
        {/* Title Container (Centered on MD+) */}
        <div className="md:col-start-2 text-center">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-yellow-400 drop-shadow-[4px_4px_0_rgba(31,41,55,1)] font-['Press_Start_2P',sans-serif]">
            Events
          </h1>
        </div>

        {/* Search & Filter Container (Right Aligned) */}
        <div className="md:col-start-3 justify-self-center md:justify-self-end flex items-center gap-0">
          
          {/* CATEGORY DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-[50px] h-[40px] bg-yellow-500 border-[2.5px] border-gray-800 flex items-center justify-center transition-all duration-200 hover:shadow-[-3px_-3px_0px_#1f2937] active:shadow-[-1px_-1px_0px_#1f2937] active:translate-x-[-2px] active:translate-y-[-2px]"
            >
              <span className="text-black font-bold text-base">▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-[45px] left-0 md:right-0 md:left-auto bg-black border-[2.5px] border-yellow-500 min-w-[200px] z-50 shadow-[5px_5px_0px_rgba(0,0,0,0.5)]">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className="p-3 text-yellow-500 cursor-pointer text-sm font-semibold uppercase tracking-wide border-b border-yellow-500 last:border-b-0 hover:bg-yellow-500 hover:text-black transition-colors"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INPUT CONTAINER */}
          <div className="relative w-[220px] group">
            <input
              type="text"
              placeholder="search for events"
              className="w-full h-[40px] p-2.5 bg-black border-[2.5px] border-yellow-500 text-yellow-500 text-sm uppercase tracking-widest placeholder:text-yellow-500/60 placeholder:lowercase focus:outline-none focus:shadow-[-5px_-5px_0px_#eab308] transition-all duration-200"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 group-hover:animate-bounce">
              <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5H20" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 8H17" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 22L20 20" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* --- EVENTS GRID --- */}
      <div className="w-full px-4 flex flex-col gap-12">
        {Object.entries(groupedEvents).map(([category, events]) => (
          <div key={category} className={`w-full${category == 'Tech Events' ? ' flex flex-col items-center' : '' }`}> 
            
            {/* Category Heading */}
            <h2 className={`text-xl md:text-2xl font-bold text-yellow-500 uppercase font-['Press_Start_2P',sans-serif] mb-6 tracking-widest drop-shadow-[3px_3px_0_#1f2937]${category === 'Tech Events' ? ' text-center relative inline-block pb-0 after:hidden' : ' relative inline-block pb-3 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-yellow-500 after:shadow-[2px_2px_0_#1f2937]'}`}> 
              {category}
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {events.map((item, index) => (
                <div
                  key={item.id}
                  className="group w-full max-w-[240px] mx-auto min-h-[340px] bg-neutral-800 shadow-[7px_5px_10px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_8px_20px_rgba(255,215,0,0.3)] animate-[slideInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  
                  {/* Floating Brackets on Hover */}
                  <span className="absolute top-1/2 -left-8 text-5xl font-bold text-yellow-500 opacity-0 transition-all duration-300 z-10 pointer-events-none drop-shadow-[0_0_10px_#eab308] group-hover:opacity-100 group-hover:-left-4">
                    [
                  </span>
                  <span className="absolute top-1/2 -right-8 text-5xl font-bold text-yellow-500 opacity-0 transition-all duration-300 z-10 pointer-events-none drop-shadow-[0_0_10px_#eab308] group-hover:opacity-100 group-hover:-right-4">
                    ]
                  </span>

                  {/* Status Bar */}
                  <div className={`h-[30px] flex items-center justify-center text-[11px] font-bold uppercase tracking-widest font-['Press_Start_2P',sans-serif] border-b-[3px] border-gray-800 ${
                    item.status === 'live' ? 'bg-red-500 text-white animate-pulse' : 'bg-yellow-500 text-gray-800'
                  }`}>
                    {item.status === 'live' ? '● LIVE' : '⏱ UPCOMING'}
                  </div>

                  {/* Image/Header Area */}
                  <div className="h-[80px] bg-yellow-500 relative">
                    <div className="absolute top-[15px] left-[15px] w-[50px] h-[50px] bg-white/20 rounded-lg overflow-hidden">
                      <Image src="/pball.png" alt="Pokeball" fill className="object-contain" />
                    </div>
                    <p className="text-gray-800 text-sm font-bold absolute top-[18px] left-[75px] m-0">
                      {item.title}
                    </p>
                    <p className="text-gray-700 text-xs font-semibold absolute top-[42px] left-[75px] m-0">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Description / Main Image Placeholder */}
                  <div className="bg-[#414141] m-[10px] h-[150px] rounded-lg overflow-hidden relative flex items-center justify-center">
                    {/* <Image src={item.image} fill className="object-cover" alt="Event" /> */}
                    <span className="text-gray-500 text-xs">Image Placeholder</span>
                  </div>

                  {/* Button */}
                  <div className="flex justify-center items-center py-2.5">
                    <button className="relative z-10 text-sm cursor-pointer font-bold leading-none p-[1px] -translate-x-[3px] -translate-y-[3px] outline-[2px] outline-transparent rounded-full bg-gray-800 text-gray-800 transition-all duration-150 hover:translate-x-0 hover:translate-y-0 shadow-[0.5px_0.5px_0_0_#1f2937,1px_1px_0_0_#1f2937,1.5px_1.5px_0_0_#1f2937,2px_2px_0_0_#1f2937,2.5px_2.5px_0_0_#1f2937,3px_3px_0_0_#1f2937,0_0_0_2px_#fafaf9,0.5px_0.5px_0_2px_#fafaf9,1px_1px_0_2px_#fafaf9,1.5px_1.5px_0_2px_#fafaf9,2px_2px_0_2px_#fafaf9,2.5px_2.5px_0_2px_#fafaf9,3px_3px_0_2px_#fafaf9] hover:shadow-[0_0_0_2px_#fafaf9]">
                      <div className="relative pointer-events-none bg-yellow-500 border-2 border-white/20 rounded-full overflow-hidden">
                        {/* Dot Pattern Overlay */}
                        <div className="absolute inset-0 opacity-30 mix-blend-hard-light animate-[dots_0.5s_infinite_linear]" 
                             style={{ 
                               backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 20%, transparent 20%), radial-gradient(rgba(255,255,255,0.8) 20%, transparent 20%)',
                               backgroundSize: '6px 6px',
                               backgroundPosition: '0 0, 3px 3px'
                             }} 
                        />
                        
                        <span className="relative flex items-center justify-center px-4 py-2 gap-1 drop-shadow-sm text-gray-800 text-xs font-bold active:translate-y-[1px]">
                          <span className="opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">[</span>
                          <span className="mx-0.5">View Details</span>
                          <span className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">]</span>
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="p-2 text-center border-t-2 border-yellow-500">
                    <p className="text-yellow-500 text-[11px] font-semibold uppercase tracking-wide m-0 mb-1">
                      {item.status === 'live' ? 'Ends in:' : 'Starts in:'} <strong className="text-white">{item.endsIn}</strong>
                    </p>
                    <p className="text-gray-400 text-[10px] m-0">{item.endDate}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- Keyframes (Inline for ease of use, or move to tailwind.config.js) --- */}
      {/* Keyframes removed as background effects are no longer needed */}
    </section>
  );
}