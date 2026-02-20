'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EVENTS, Event } from '@/data/events';

// Assets & small utilities
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
    grass: 'bg-emerald-500',
    electric: 'bg-yellow-400',
    psychic: 'bg-purple-500',
    default: 'bg-slate-500'
  };
  return colors[type] || colors.default;
};

// Modal component
const EventModal = ({ event, onClose }: { event: Event | null; onClose: () => void }) => {
  if (!event) return null;
  const typeColor = getTypeColor(event.type);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pb-4 pt-24 md:pt-32 font-sans">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-6xl h-fit max-h-[85vh] bg-slate-50 border-[4px] md:border-[6px] border-black rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-[slideInUp_0.3s_ease-out]">

        {/* HEADER BAR */}
        <div className="w-full h-12 md:h-14 bg-slate-900 flex items-center justify-between px-4 border-b-4 border-black shrink-0">
          <div className="flex gap-2 md:gap-3 group cursor-pointer p-2" onClick={onClose} title="Terminate Connection">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 border-2 border-transparent group-hover:border-white transition-all shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-400 border-2 border-transparent group-hover:border-white/50 opacity-80 transition-all"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 border-2 border-transparent group-hover:border-white/50 opacity-80 transition-all"></div>
          </div>

          <div className="text-[9px] md:text-xs text-slate-400 font-mono uppercase tracking-widest hidden sm:block">
            Entry #{event.id.toString().padStart(3, '0')} // Secure Connection
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col lg:flex-row min-h-full">

            {/* LEFT COL: Visuals */}
            <div className="w-full lg:w-1/3 bg-slate-200 p-6 flex flex-col gap-6 border-r-0 lg:border-r-4 border-black relative">
              <div className="w-full aspect-square bg-slate-800 rounded-xl border-4 border-slate-700 relative overflow-hidden group">
                <div className={`absolute inset-0 opacity-30 ${typeColor} mix-blend-overlay`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PokeballIcon className="w-32 h-32 md:w-40 md:h-40 text-white/10 group-hover:text-white/30 transition-all duration-500 rotate-12" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1.5 text-xs font-bold text-white uppercase tracking-wider border border-white/50 rounded shadow-md ${event.status === 'live' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
                    {event.status === 'live' ? '● Live Signal' : 'Signal Found'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border-2 border-slate-300 shadow-sm">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Category</p>
                  <p className="text-xs md:text-sm font-black text-slate-800 truncate">{event.category}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-slate-300 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Type</p>
                  <p className="text-xs md:text-sm font-black text-slate-800 capitalize">{event.type}</p>
                </div>
              </div>

              <div className="mt-auto bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                  <span className="text-slate-800 tracking-tighter">Event Timeline</span>
                  <span className="text-red-600 font-black">{event.endsIn}</span>
                </div>
                <div className="w-full h-4 bg-slate-200 rounded-full border-2 border-slate-400 relative overflow-hidden">
                  <div
                    className={`h-full ${event.progress > 80 ? 'bg-red-500' : event.progress > 50 ? 'bg-yellow-400' : 'bg-green-500'} border-r-2 border-white/50`}
                    style={{ width: `${100 - event.progress}%` }}
                  ></div>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')" }}></div>
                </div>
              </div>
            </div>

            {/* RIGHT COL: Detailed Text */}
            <div className="w-full lg:w-2/3 p-6 sm:p-10 bg-white relative">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              </div>

              <div className="relative z-10 flex flex-col gap-6 md:gap-8">
                <div>
                  <h2 className="text-xl md:text-4xl font-black text-slate-900 font-press-start leading-tight mb-3 uppercase">
                    {event.title}
                  </h2>
                  <p className="text-sm md:text-xl font-bold text-slate-500 uppercase tracking-wide">
                    {event.subtitle}
                  </p>
                </div>

                <hr className="border-t-4 border-slate-100" />

                <div>
                  <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-black rotate-45"></span> Mission Briefing
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
                    {event.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rotate-45"></span> Engagement Rules
                    </h3>
                    <ul className="space-y-2">
                      {event.rules.map((rule, idx) => (
                        <li key={idx} className="text-[11px] md:text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-slate-400 font-mono select-none font-black">{`>`}</span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {event.prizes && event.prizes.length > 0 && (
                    <div>
                      <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rotate-45"></span> Rewards
                      </h3>
                      <ul className="space-y-2">
                        {event.prizes.map((prize, idx) => (
                          <li key={idx} className="text-[11px] md:text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-yellow-500 font-black">★</span>
                            {prize}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => router.push(`/events/${event.id}`)}
                  className="w-full h-12 md:h-14 bg-slate-900 text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-xl hover:bg-yellow-400 hover:text-black transition-all border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                  Enter Deep Scan Simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="w-full h-64 flex flex-col items-center justify-center border-4 border-dashed border-slate-300 rounded-xl bg-slate-100/50">
    <PokeballIcon className="w-16 h-16 text-slate-300 mb-4 animate-spin-slow" />
    <p className="font-bold text-slate-400 text-base md:text-lg">NO DATA FOUND</p>
  </div>
);

const FilterBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}: {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center gap-6 border-[3px] md:border-4 border-black pb-5 pt-5 bg-white px-6 md:px-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-xl relative z-20">
      {/* Corner Decorators */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[35px] border-t-blue-600 border-r-[35px] border-r-transparent"></div>
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[35px] border-b-red-600 border-l-[35px] border-l-transparent"></div>

      <div className="relative z-10">
        <h2 className="text-[8px] md:text-[9.5px] font-black tracking-[0.2em] text-slate-400 mb-0.5 uppercase">System Region: Kanto-01</h2>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 font-press-start tracking-tighter">
          EVENT<span className="text-red-600">DEX</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto z-10">
        <div className="relative md:w-52">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-10 bg-slate-50 border-[2px] border-slate-200 flex items-center justify-between px-4 hover:border-slate-400 transition-colors uppercase font-bold text-[9px] tracking-tight text-slate-600 shadow-sm"
          >
            <span className="truncate">
              {selectedCategory === 'All Categories' ? 'SELECT TYPE' : selectedCategory}
            </span>
            <span className={`transform transition-transform text-slate-400 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-50 rounded overflow-hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); }}
                  className="w-full text-left p-3 hover:bg-slate-900 hover:text-white cursor-pointer font-bold text-[9px] uppercase transition-colors text-slate-900 border-b border-slate-100 last:border-0"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative md:w-60">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-4 bg-slate-50 border-[2px] border-slate-200 rounded-sm font-bold text-[10px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onClick }: { event: Event; onClick: () => void }) => {
  const router = useRouter();
  const typeColor = getTypeColor(event.type);
  const isLive = event.status === 'live';

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group relative w-full bg-white border-4 border-black rounded-3xl p-1 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 flex flex-col"
    >
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden h-full flex flex-col relative z-10">
        {/* Top Visual Section */}
        <div className={`relative h-32 ${typeColor} overflow-hidden border-b-2 border-black group-hover:brightness-110 transition-all`}>
          <div className="absolute top-2 right-2 z-20">
            <span
              className={`inline-block px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-wider border border-white/50 rounded-md shadow-sm opacity-90 ${isLive ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
                }`}
            >
              {isLive ? '+ LIVE' : 'UPCOMING'}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 group-hover:scale-105 transition-transform duration-500">
              <PokeballIcon className="w-12 h-12 text-white/40 rotate-12" />
            </div>
          </div>

          <div className="absolute bottom-1 right-3">
            <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${typeColor}`} />
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow bg-white">
          <div className="mb-4">
            <h3 className="text-sm md:text-base font-black leading-tight text-slate-900 truncate uppercase tracking-tighter group-hover:text-red-600 transition-colors">
              {event.title}
            </h3>
            <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest truncate">
              {event.subtitle}
            </p>
          </div>

          <div className="mb-5 space-y-1">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-tight">
              <span className="text-slate-400">TIME</span>
              <span className={isLive ? 'text-red-500' : 'text-slate-900'}>{event.endsIn}</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full border border-black overflow-hidden relative">
              <div
                className={`h-full transition-all duration-1000 ${event.progress > 80 ? 'bg-red-500' : event.progress > 50 ? 'bg-yellow-400' : 'bg-emerald-500'
                  }`}
                style={{ width: `${100 - event.progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto pb-4">
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-[7px] text-slate-400 font-black uppercase tracking-tighter">DATE</span>
              <span className="block text-[9px] font-black text-slate-900 truncate">{event.endDate.split(',')[0]}</span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-[7px] text-slate-400 font-black uppercase tracking-tighter">CLASS</span>
              <span className="block text-[9px] font-black text-slate-900 truncate">{event.category.split(' ')[0]}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/events/${event.id}`);
            }}
            className="w-full h-10 bg-yellow-400 text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-lg border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
          >
            {isLive ? 'JOIN' : 'DETAILS'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEvent, setExpandedEvent] = useState<Event | null>(null);

  const categories = useMemo(() => {
    return ['All Categories', ...Array.from(new Set(EVENTS.map(e => e.category)))];
  }, []);

  const processedEvents = useMemo(() => {
    let filtered = EVENTS.filter(event => {
      const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    filtered.sort((a, b) => {
      if (a.category === 'Hackathon' && b.category !== 'Hackathon') return -1;
      if (a.category !== 'Hackathon' && b.category === 'Hackathon') return 1;
      if (a.category === 'Technical Events' && b.category !== 'Technical Events') return -1;
      if (a.category !== 'Technical Events' && b.category === 'Technical Events') return 1;
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
    <section className="min-h-screen w-full flex flex-col items-center font-sans text-slate-900 relative overflow-x-hidden selection:bg-yellow-400 selection:text-black pb-24" id="events">

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="w-full max-w-7xl z-10 px-4 md:px-8 pt-24 md:pt-32 flex flex-col gap-12">

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
          Object.entries(processedEvents).map(([category, events]) => (
            <div key={category} className="w-full animate-[fadeIn_0.5s_ease-out]">

              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <h2 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-white">
                  {category}
                </h2>
                <div className="h-[1px] flex-grow bg-white/10 ml-4"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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

      <EventModal event={expandedEvent} onClose={() => setExpandedEvent(null)} />

      <style jsx global>{`
        @keyframes slideInUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}