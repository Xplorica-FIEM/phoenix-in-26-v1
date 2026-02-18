'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Assets & small utilities
// - Keep local icons and tiny helpers here so the page component stays
//   focused on layout and interaction logic. This reduces indirection
//   and keeps visual concerns colocated with the page that uses them.

const PokeballIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 5A45 45 0 0 0 5 50a45 45 0 0 0 45 45 45 45 0 0 0 45-45A45 45 0 0 0 50 5zm0 82a37 37 0 0 1-37-37c0-18.1 13-33.2 30-36.4V46h14V13.6C87 16.8 100 31.9 100 50a37 37 0 0 1-37 37z" />
    <circle cx="50" cy="50" r="12" />
    <path d="M50 38a12 12 0 0 0-12 12h-9a21 21 0 1 1 42 0h-9a12 12 0 0 0-12-12z" />
  </svg>
);

const getTypeColor = (type) => {
  const colors = {
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

const EventModal = ({ event, onClose }) => {
  if (!event) return null;
  const typeColor = getTypeColor(event.type);

  // Prevent background scrolling while modal is open to avoid scroll bleed
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    // STRATEGY: 
    // z-40: Puts it BEHIND your Navbar (z-50)
    // pt-28 md:pt-32: Pushes the modal down so it starts visually UNDER the navbar height
    <div className="fixed inset-0 z-40 flex items-start justify-center px-4 pb-4 pt-32 md:pt-48 font-sans">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Main Modal Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-slate-50 border-[6px] border-black rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-[slideInUp_0.3s_ease-out]">
        
        {/* HEADER BAR */}
        <div className="w-full h-14 bg-slate-900 flex items-center justify-between px-4 border-b-4 border-black shrink-0">
           
           {/* DECORATIVE TERMINATE BUTTONS (Function as Close) */}
           <div className="flex gap-3 group cursor-pointer p-2" onClick={onClose} title="Terminate Connection">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-transparent group-hover:border-white transition-all shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-transparent group-hover:border-white/50 opacity-80 transition-all"></div>
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-transparent group-hover:border-white/50 opacity-80 transition-all"></div>
           </div>

           <div className="text-[10px] md:text-xs text-slate-400 font-mono uppercase tracking-widest hidden sm:block">
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
                        {event.status === 'live' ? '● Live Signal' : 'Signal Pending'}
                    </span>
                  </div>
               </div>
               
               {/* Quick Stats */}
               <div className="grid grid-cols-2 gap-3">
                 <div className="bg-white p-3 rounded-lg border-2 border-slate-300">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Class</p>
                    <p className="text-xs md:text-sm font-black text-slate-800">{event.category.split(' ')[0]}</p>
                 </div>
                 <div className="bg-white p-3 rounded-lg border-2 border-slate-300">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Type</p>
                    <p className="text-xs md:text-sm font-black text-slate-800 capitalize">{event.type}</p>
                 </div>
               </div>
               
               {/* HP Bar */}
               <div className="mt-auto bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                 <div className="flex justify-between text-xs font-bold uppercase mb-2">
                    <span className="text-slate-800">Remaining Time</span>
                    <span className="text-red-600">{event.endsIn}</span>
                 </div>
                 <div className="w-full h-4 bg-slate-200 rounded-full border-2 border-slate-400 relative overflow-hidden">
                    <div 
                        className={`h-full ${event.progress > 80 ? 'bg-red-500' : event.progress > 50 ? 'bg-yellow-400' : 'bg-green-500'} border-r-2 border-white/50`} 
                        style={{ width: `${100 - event.progress}%` }}
                    ></div>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                 </div>
               </div>
            </div>

            {/* RIGHT COL: Detailed Text */}
            <div className="w-full lg:w-2/3 p-6 sm:p-10 bg-white relative">
               {/* Dot Grid Background */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
               </div>

               <div className="relative z-10 flex flex-col gap-6 md:gap-8">
                  <div>
                    <h2 className="text-2xl md:text-5xl font-black text-slate-900 font-['Press_Start_2P',sans-serif] leading-tight mb-2">
                        {event.title}
                    </h2>
                    <p className="text-sm md:text-xl font-bold text-slate-500 uppercase tracking-wide">
                        {event.subtitle}
                    </p>
                  </div>
                  
                  <hr className="border-t-4 border-slate-100" />
                  
                  <div>
                    <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-black"></span> Mission Briefing
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
                        {event.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 bg-blue-500"></span> Rules
                      </h3>
                      <ul className="space-y-2">
                        {event.rules.map((rule, idx) => (
                            <li key={idx} className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-slate-400 font-mono select-none">{`>`}</span>
                                {rule}
                            </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 bg-yellow-500"></span> Rewards
                      </h3>
                      <ul className="space-y-2">
                        {event.prizes.map((prize, idx) => (
                            <li key={idx} className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-yellow-500">★</span>
                                {prize}
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small presentational components
// - Page-specific UI (cards, filter bar, empty state) are kept local to
//   minimize prop drilling and make the page self-contained for maintenance.

const EmptyState = () => (
  <div className="w-full h-64 flex flex-col items-center justify-center border-4 border-dashed border-slate-300 rounded-xl bg-slate-100/50">
    <PokeballIcon className="w-16 h-16 text-slate-300 mb-4 animate-spin-slow" />
    <p className="font-bold text-slate-400 text-base md:text-lg">NO DATA FOUND</p>
  </div>
);

const FilterBar = ({ categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-4 border-black pb-6 md:pb-8 bg-white p-4 md:p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-xl relative z-20">
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] md:border-t-[40px] border-t-blue-600 border-r-[30px] md:border-r-[40px] border-r-transparent"></div>
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] md:border-b-[40px] border-b-red-600 border-l-[30px] md:border-l-[40px] border-l-transparent"></div>

      {/* Header Text */}
      <div className="relative z-10 w-full md:w-auto">
        <h2 className="text-[10px] md:text-xs font-bold tracking-widest text-slate-500 mb-1 uppercase font-sans">System Region: Kanto-01</h2>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 font-['Press_Start_2P',sans-serif] tracking-tighter drop-shadow-sm">
          EVENT<span className="text-red-600">DEX</span>
        </h1>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto z-10">
        
        {/* Dropdown */}
        <div className="relative w-full md:min-w-[200px]">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full h-12 bg-slate-100 border-2 border-black flex items-center justify-between px-4 hover:bg-yellow-100 transition-colors focus:ring-4 ring-yellow-400/50">
            <span className="font-bold text-xs sm:text-sm uppercase truncate font-['Press_Start_2P',sans-serif] text-slate-900">
              {selectedCategory === 'All Categories' ? 'SELECT TYPE' : selectedCategory}
            </span>
            <span className={`transform transition-transform text-slate-900 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-50 max-h-60 overflow-y-auto">
              {categories.map((cat) => (
                <div key={cat} onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); }} className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer font-bold text-xs uppercase transition-colors text-slate-900">
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 h-12 pl-4 pr-10 bg-slate-100 border-2 border-black font-bold focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_#eab308] transition-all placeholder:text-slate-400 text-sm text-slate-900"
          />
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event }) => {
  const router = useRouter();
  const typeColor = getTypeColor(event.type);
  const isLive = event.status === 'live';

  const goToEvent = () => {
    router.push(`/events/${event.id}`);
  };

  return (
    <div
      onClick={goToEvent}
      className="cursor-pointer group relative w-full max-w-sm md:max-w-none mx-auto bg-white border-4 border-black rounded-2xl p-1 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[8px_8px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] md:hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-200 flex flex-col"
    >
      <div className="bg-slate-100 border-2 border-slate-200 rounded-xl overflow-hidden h-full flex flex-col relative z-10">
        <div className="relative h-40 bg-slate-800 overflow-hidden border-b-4 border-black group-hover:bg-slate-700 transition-colors">
          <div className="absolute top-2 right-2 z-20">
            <span
              className={`inline-block px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/50 rounded shadow-sm ${
                isLive ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
              }`}
            >
              {isLive ? '● Live' : 'Upcoming'}
            </span>
          </div>

          <div className={`absolute inset-0 opacity-40 ${typeColor} mix-blend-overlay`} />

          <div className="absolute inset-0 flex items-center justify-center">
            <PokeballIcon className="w-20 h-20 text-white/20 group-hover:text-white/40 transition-all duration-300 group-hover:scale-110 rotate-12" />
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-black leading-tight text-slate-900 line-clamp-2 uppercase">
                {event.title}
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">
                {event.subtitle}
              </p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 border-black ${typeColor}`} />
          </div>

          <div className="mt-4 mb-2">
            <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
              <span className="text-slate-800">Time:</span>
              <span className={isLive ? 'text-red-600' : 'text-slate-600'}>
                {event.endsIn}
              </span>
            </div>

            <div className="w-full h-3 bg-slate-200 rounded-full border-2 border-slate-400 overflow-hidden">
              <div
                className={`h-full ${
                  event.progress > 80
                    ? 'bg-red-500'
                    : event.progress > 50
                    ? 'bg-yellow-400'
                    : 'bg-green-500'
                }`}
                style={{ width: `${100 - event.progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t-2 border-dashed border-slate-200">
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-center">
              <span className="block text-[9px] text-slate-400 font-bold uppercase">
                Date
              </span>
              <span className="block text-[10px] font-bold text-slate-800">
                {event.endDate.split(',')[0]}
              </span>
            </div>

            <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-center">
              <span className="block text-[9px] text-slate-400 font-bold uppercase">
                Class
              </span>
              <span className="block text-[10px] font-bold text-slate-800 truncate">
                {event.category.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToEvent();
            }}
            className="w-full mt-4 group/btn relative h-10 bg-yellow-400 border-2 border-black rounded-lg shadow-[2px_2px_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all flex items-center justify-center overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200" />
            <span className="relative z-10 font-black text-xs uppercase tracking-wider font-['Press_Start_2P',sans-serif]">
              {isLive ? 'JOIN' : 'DETAILS'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Page controller (state + data shaping)
// - Handles local UI state, filtering, and the expanded modal state.
// - Keeps transformation/filtering logic inside the component so derived
//   data is easy to reason about and doesn't require global state.

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All Categories', 'Tech Events', 'Gaming Events', 'Sports Events', 'Cultural Events', 'Workshops', 'Competitions'];
  
  const dummyEvents = [
    { 
      id: 1, 
      title: 'Hackathon X', 
      subtitle: 'Full Stack Battle', 
      image: '/placeholder-image.jpg', 
      status: 'live', 
      endsIn: '2h 30m', 
      progress: 90, 
      endDate: 'Feb 17, 2026', 
      category: 'Tech Events', 
      type: 'electric',
      description: 'The ultimate 48-hour coding marathon. Teams will compete to build the most innovative full-stack application using modern frameworks. Energy drinks provided, sleep not included.',
      rules: ['Max team size: 4 members', 'No pre-written code allowed', 'Must deploy to Vercel/Netlify', 'API integration required'],
      prizes: ['$5000 Grand Prize', 'Mechanical Keyboards for Runner-ups', 'Internship opportunities']
    },
    { 
      id: 2, 
      title: 'AI Summit', 
      subtitle: 'Neural Networks', 
      image: '/placeholder-image.jpg', 
      status: 'upcoming', 
      endsIn: '5 days', 
      progress: 10, 
      endDate: 'Feb 22, 2026', 
      category: 'Tech Events', 
      type: 'psychic',
      description: 'A deep dive into the future of Generative AI and LLMs. Featuring keynote speakers from top tech giants and hands-on workshops on training your own models.',
      rules: ['Laptop required for workshops', 'Basic Python knowledge assumed', 'Networking session mandatory'],
      prizes: ['NVIDIA Credits', 'AI Course Certification', 'Networking Dinner']
    },
    { 
      id: 3, 
      title: 'Speed Code', 
      subtitle: 'Algorithm Race', 
      image: '/placeholder-image.jpg', 
      status: 'live', 
      endsIn: '45 mins', 
      progress: 95, 
      endDate: 'Feb 17, 2026', 
      category: 'Competitions', 
      type: 'fire',
      description: 'Fast-paced algorithmic problem solving. Solve 5 Leetcode-style hard problems in under 60 minutes. Speed and memory optimization are key.',
      rules: ['Individual participation only', 'C++, Java, Python supported', 'No internet help allowed'],
      prizes: ['Gaming Mouse', 'Premium coding subscriptions', 'Trophy']
    },
    { 
      id: 4, 
      title: 'UX Sprint', 
      subtitle: 'Design System', 
      image: '/placeholder-image.jpg', 
      status: 'upcoming', 
      endsIn: '3 days', 
      progress: 30, 
      endDate: 'Feb 20, 2026', 
      category: 'Workshops', 
      type: 'grass',
      description: 'Learn to build scalable design systems from scratch in Figma. Understanding tokens, components, and auto-layout mastery.',
      rules: ['Figma account required', 'Submission via prototype link', 'Focus on accessibility'],
      prizes: ['Figma Pro License', 'Design Books Bundle', 'Wacom Tablet']
    },
    { 
      id: 5, 
      title: 'Game Jam', 
      subtitle: 'Retro Dev', 
      image: '/placeholder-image.jpg', 
      status: 'upcoming', 
      endsIn: '7 days', 
      progress: 0, 
      endDate: 'Feb 24, 2026', 
      category: 'Gaming Events', 
      type: 'water',
      description: 'Create a retro-styled 8-bit game in 72 hours. Theme will be announced at the start of the event. Pixel art and chiptune music encouraged.',
      rules: ['Theme interpretation matters', 'Assets must be original', 'Web build required'],
      prizes: ['Nintendo Switch', 'Game Dev Assets Pack', 'Steam Vouchers']
    },
  ];

  const processedEvents = useMemo(() => {
    let filtered = dummyEvents.filter(event => {
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

    return filtered.reduce((acc, event) => {
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
          Object.entries(processedEvents).map(([category, events]) => (
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
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
    </section>
  );
}