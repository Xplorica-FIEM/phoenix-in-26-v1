'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Assets & small utilities
// - Keep local icons and tiny helpers here so the page component stays
//   focused on layout and interaction logic. This reduces indirection
//   and keeps visual concerns colocated with the page that uses them.

const PokeballIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 5A45 45 0 0 0 5 50a45 45 0 0 0 45 45 45 45 0 0 0 45-45A45 45 0 0 0 50 5zm0 82a37 37 0 0 1-37-37c0-18.1 13-33.2 30-36.4V46h14V13.6C87 16.8 100 31.9 100 50a37 37 0 0 1-37 37z" />
    <circle cx="50" cy="50" r="12" />
    <path d="M50 38a12 12 0 0 0-12 12h-9a21 21 0 1 1 42 0h-9a12 12 0 0 0-12-12z" />
  </svg>
);

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    psychic: 'bg-purple-500',
    default: 'bg-gray-500'
  };
  return colors[type] || colors.default;
};

// Modal component
// - Rendered as a fixed overlay with a controlled z-index so the page can
//   present modal content without interfering with the persistent navbar.
// - Padding/top offset is used so the modal visually begins beneath the navbar.

// const EventModal = ({ event, onClose }) => {
//   if (!event) return null;
//   const typeColor = getTypeColor(event.type);

//   // Prevent background scrolling while modal is open to avoid scroll bleed
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => { document.body.style.overflow = 'unset'; };
//   }, []);

//   return (
//     // STRATEGY: 
//     // z-40: Puts it BEHIND your Navbar (z-50)
//     // pt-28 md:pt-32: Pushes the modal down so it starts visually UNDER the navbar height
//     <div className="fixed inset-0 z-40 flex items-start justify-center px-4 pb-4 pt-32 md:pt-48 font-sans">

//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
//         onClick={onClose}
//       ></div>

//       {/* Main Modal Container */}
//       <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-slate-50 border-[6px] border-black rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-[slideInUp_0.3s_ease-out]">

//         {/* HEADER BAR */}
//         <div className="w-full h-14 bg-slate-900 flex items-center justify-between px-4 border-b-4 border-black shrink-0">

//            {/* DECORATIVE TERMINATE BUTTONS (Function as Close) */}
//            <div className="flex gap-3 group cursor-pointer p-2" onClick={onClose} title="Terminate Connection">
//               <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-transparent group-hover:border-white transition-all shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
//               <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-transparent group-hover:border-white/50 opacity-80 transition-all"></div>
//               <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-transparent group-hover:border-white/50 opacity-80 transition-all"></div>
//            </div>

//            <div className="text-[10px] md:text-xs text-slate-400 font-mono uppercase tracking-widest hidden sm:block">
//              Entry #{event.id.toString().padStart(3, '0')} // Secure Connection
//            </div>
//         </div>

//         {/* SCROLLABLE CONTENT */}
//         <div className="flex-grow overflow-y-auto overflow-x-hidden">
//           <div className="flex flex-col lg:flex-row min-h-full">

//             {/* LEFT COL: Visuals */}
//             <div className="w-full lg:w-1/3 bg-slate-200 p-6 flex flex-col gap-6 border-r-0 lg:border-r-4 border-black relative">
//                <div className="w-full aspect-square bg-slate-800 rounded-xl border-4 border-slate-700 relative overflow-hidden group">
//                   <div className={`absolute inset-0 opacity-30 ${typeColor} mix-blend-overlay`}></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <PokeballIcon className="w-32 h-32 md:w-40 md:h-40 text-white/10 group-hover:text-white/30 transition-all duration-500 rotate-12" />
//                   </div>
//                   <div className="absolute top-4 left-4">
//                     <span className={`inline-block px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider border border-white/50 rounded shadow-md ${event.status === 'live' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
//                         {event.status === 'live' ? '● Live Signal' : 'Signal Pending'}
//                     </span>
//                   </div>
//                </div>

//                {/* Quick Stats */}
//                <div className="grid grid-cols-2 gap-3">
//                  <div className="bg-white p-3 rounded-lg border-2 border-slate-300">
//                     <p className="text-[10px] text-slate-400 font-bold uppercase">Class</p>
//                     <p className="text-xs md:text-sm font-black text-slate-800">{event.category.split(' ')[0]}</p>
//                  </div>
//                  <div className="bg-white p-3 rounded-lg border-2 border-slate-300">
//                     <p className="text-[10px] text-slate-400 font-bold uppercase">Type</p>
//                     <p className="text-xs md:text-sm font-black text-slate-800 capitalize">{event.type}</p>
//                  </div>
//                </div>

//                {/* HP Bar */}
//                <div className="mt-auto bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
//                  <div className="flex justify-between text-xs font-bold uppercase mb-2">
//                     <span className="text-slate-800">Remaining Time</span>
//                     <span className="text-red-600">{event.endsIn}</span>
//                  </div>
//                  <div className="w-full h-4 bg-slate-200 rounded-full border-2 border-slate-400 relative overflow-hidden">
//                     <div 
//                         className={`h-full ${event.progress > 80 ? 'bg-red-500' : event.progress > 50 ? 'bg-yellow-400' : 'bg-green-500'} border-r-2 border-white/50`} 
//                         style={{ width: `${100 - event.progress}%` }}
//                     ></div>
//                     <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
//                  </div>
//                </div>
//             </div>

//             {/* RIGHT COL: Detailed Text */}
//             <div className="w-full lg:w-2/3 p-6 sm:p-10 bg-white relative">
//                {/* Dot Grid Background */}
//                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
//                     style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
//                </div>

//                <div className="relative z-10 flex flex-col gap-6 md:gap-8">
//                   <div>
//                     <h2 className="text-2xl md:text-5xl font-black text-slate-900 font-['Press_Start_2P',sans-serif] leading-tight mb-2">
//                         {event.title}
//                     </h2>
//                     <p className="text-sm md:text-xl font-bold text-slate-500 uppercase tracking-wide">
//                         {event.subtitle}
//                     </p>
//                   </div>

//                   <hr className="border-t-4 border-slate-100" />

//                   <div>
//                     <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
//                         <span className="w-2 h-2 bg-black"></span> Mission Briefing
//                     </h3>
//                     <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
//                         {event.description}
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//                     <div>
//                       <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
//                          <span className="w-2 h-2 bg-blue-500"></span> Rules
//                       </h3>
//                       <ul className="space-y-2">
//                         {event.rules.map((rule, idx) => (
//                             <li key={idx} className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
//                                 <span className="text-slate-400 font-mono select-none">{`>`}</span>
//                                 {rule}
//                             </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div>
//                       <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
//                          <span className="w-2 h-2 bg-yellow-500"></span> Rewards
//                       </h3>
//                       <ul className="space-y-2">
//                         {event.prizes.map((prize, idx) => (
//                             <li key={idx} className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
//                                 <span className="text-yellow-500">★</span>
//                                 {prize}
//                             </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Small presentational components
// - Page-specific UI (cards, filter bar, empty state) are kept local to
//   minimize prop drilling and make the page self-contained for maintenance.

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white border-2 border-black rounded-lg px-4 py-3 shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
      {label}
    </p>
    <p className="mt-1 text-sm font-extrabold text-slate-900">{value}</p>
  </div>
);

const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-500 border-orange-400',
  water: 'bg-blue-500 border-blue-400',
  grass: 'bg-green-500 border-green-400',
  electric: 'bg-yellow-400 border-yellow-300',
  psychic: 'bg-purple-500 border-purple-400',
  default: 'bg-slate-500 border-slate-400',
};

const EmptyState = () => (
  <div className="w-full h-64 flex flex-col items-center justify-center border-4 border-dashed border-slate-300 rounded-xl bg-slate-100/50">
    <PokeballIcon className="w-16 h-16 text-slate-300 mb-4 animate-spin-slow" />
    <p className="font-bold text-slate-400 text-base md:text-lg">NO DATA FOUND</p>
  </div>
);

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full bg-slate-900 border-4 border-black p-4 md:p-6 rounded-2xl shadow-[8px_8px_0_rgba(0,0,0,1)] relative z-20">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="hidden md:flex w-12 h-12 bg-yellow-400 border-4 border-black items-center justify-center shrink-0">
          <span className="text-xl font-black">?</span>
        </div>
        <div className="flex-grow md:flex-grow-0">
          <h2 className="text-white font-black uppercase text-lg tracking-tighter leading-tight">Field Data</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Scanner Active</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto z-10">
        <div className="relative w-full md:min-w-[200px]">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full h-12 bg-slate-100 border-2 border-black flex items-center justify-between px-4 hover:bg-yellow-100 transition-colors focus:ring-4 ring-yellow-400/50">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
              {selectedCategory}
            </span>
            <span className={`transform transition-transform text-slate-900 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-50 max-h-60 overflow-y-auto">
              {categories.map((cat: string) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-xs font-bold uppercase hover:bg-yellow-400 transition-colors border-b border-black last:border-0"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 h-12 pl-4 pr-10 bg-slate-100 border-2 border-black font-bold focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_#eab308] transition-all placeholder:text-slate-400 text-sm text-slate-900"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onClick }: { event: Event; onClick: () => void }) => {
  const isLive = event.status === 'live';
  const colorClass = TYPE_COLORS[event.type] || TYPE_COLORS.default;
  const router = useRouter();

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/events/${event.id}`);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border-4 border-black rounded-2xl overflow-hidden hover:-translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0_rgba(0,0,0,1)] shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all cursor-pointer flex flex-col"
    >
      <div className="relative h-40 bg-slate-800 overflow-hidden border-b-4 border-black group-hover:bg-slate-700 transition-colors">
        <div className="absolute top-2 right-2 z-20">
          <span
            className={`inline-block px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/50 rounded shadow-sm ${isLive ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
              }`}
          >
            {isLive ? '● Live' : 'Upcoming'}
          </span>
        </div>

        <div className={`absolute bottom-0 left-0 w-full h-1 z-10 ${colorClass}`} />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-base font-black uppercase text-slate-900 leading-tight tracking-tight group-hover:text-yellow-600 transition-colors">
              {event.title}
            </h3>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">
              {event.subtitle}
            </p>
          </div>
          <div className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_rgba(0,0,0,1)] ${colorClass}`}>
            <div className="w-4 h-4 rounded-full bg-white opacity-40 animate-pulse" />
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div>
            <div className="flex justify-between text-[10px] font-black uppercase mb-1">
              <span className="text-slate-500">Time Remaining</span>
              <span className="text-slate-900">{event.endsIn}</span>
            </div>

            <div className="w-full h-3 bg-slate-200 rounded-full border-2 border-slate-400 overflow-hidden">
              <div
                className={`h-full ${event.progress > 80
                  ? 'bg-red-500'
                  : event.progress > 50
                    ? 'bg-yellow-400'
                    : 'bg-green-500'
                  }`}
                style={{ width: `${100 - event.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t-2 border-slate-50">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">Event Date</span>
              <span className="text-[10px] font-black text-slate-900">{event.endDate}</span>
            </div>
            <button
              onClick={handleDetailsClick}
              className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded group-hover:bg-yellow-500 group-hover:text-black transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { EVENTS, Event } from '@/data/events';

// Asset components remain here... (Meta, TYPE_COLORS, PokeballIcon, getTypeColor, EmptyState, FilterBar, EventCard)

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEvent, setExpandedEvent] = useState<Event | null>(null);
  const router = useRouter();

  const categories = ['All Categories', ...Array.from(new Set(EVENTS.map(e => e.category)))];

  const processedEvents = useMemo(() => {
    let filtered = EVENTS.filter(event => {
      const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    filtered.sort((a, b) => {
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (a.status !== 'live' && b.status === 'live') return 1;
      return 0;
    });

    return filtered.reduce((acc: Record<string, Event[]>, event: Event) => {
      if (!acc[event.category]) acc[event.category] = [];
      acc[event.category].push(event);
      return acc;
    }, {});
  }, [selectedCategory, searchQuery]);

  return (
    <section className="min-h-screen w-full flex flex-col items-center font-sans text-slate-900 relative overflow-x-hidden selection:bg-yellow-400 selection:text-black" id="events">

      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-[0.05]"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full max-w-7xl z-10 px-4 pt-20 md:pt-24 pb-12 flex flex-col gap-6 md:gap-8">

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {Object.keys(processedEvents).length === 0 ? (
          <EmptyState />
        ) : (
          Object.entries(processedEvents).map(([category, events]: [string, Event[]]) => (
            <div key={category} className="w-full animate-[fadeIn_0.5s_ease-out]">

              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-black rotate-45"></div>
                <h2 className="text-base md:text-xl font-bold uppercase tracking-wider font-['Press_Start_2P',sans-serif] text-slate-100">
                  {category}
                </h2>
                <div className="h-1 flex-grow bg-black opacity-20 rounded-full"></div>
              </div>

              {/* Mobile Optimization: grid-cols-1 by default, max-w-sm to control card width */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => setExpandedEvent(event)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {expandedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setExpandedEvent(null)}
          />
          <div className="relative w-full max-w-4xl bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0_rgba(0,0,0,1)] flex flex-col md:flex-row animate-[dialogOpen_0.3s_ease-out]">
            <div className="w-full md:w-1/3 bg-slate-100 p-6 flex flex-col border-r-4 border-black">
              <div className="aspect-square bg-slate-800 rounded-xl relative overflow-hidden mb-6 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                <div className={`absolute inset-0 ${TYPE_COLORS[expandedEvent.type] || TYPE_COLORS.default} opacity-20`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PokeballIcon className="w-32 h-32 text-white/10 rotate-12" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Status</span>
                  <span className={`text-xs font-black uppercase ${expandedEvent.status === 'live' ? 'text-red-500' : 'text-blue-500'}`}>
                    {expandedEvent.status}
                  </span>
                </div>
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Timeline</span>
                  <span className="text-xs font-black text-slate-900">{expandedEvent.endDate}</span>
                </div>
              </div>
            </div>

            <div className="flex-grow p-6 md:p-8 flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-2">
                  {expandedEvent.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded uppercase">
                    {expandedEvent.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">
                    {expandedEvent.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex-grow space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b-2 border-slate-100 pb-1">
                    Signal Information
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {expandedEvent.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    Mission Directives
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {expandedEvent.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] font-bold text-slate-700">
                        <span className="text-yellow-500">▶</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-4 border-slate-100 flex gap-4">
                <button
                  onClick={() => router.push(`/events/${expandedEvent.id}`)}
                  className="flex-grow bg-slate-900 hover:bg-yellow-500 hover:text-black text-white font-black py-3 rounded-xl transition-all uppercase tracking-widest text-xs"
                >
                  Deep Scan Details
                </button>
                <button
                  onClick={() => setExpandedEvent(null)}
                  className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-3 rounded-xl transition-all uppercase tracking-widest text-xs border-2 border-black/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
    </section>
  );
}