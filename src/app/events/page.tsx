'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Local definition of Event since we're in a page
interface Event {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  status: string;
  endsIn: string;
  progress: number;
  endDate: string;
  category: string;
  type: string;
  themeId: string;
  description: string;
  participants: string;
  eventFee: string;
}

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
            className="w-full h-10 bg-slate-50 border-[2px] border-slate-200 flex items-center justify-between px-4 hover:border-slate-400 transition-colors uppercase font-bold text-[9px] tracking-tight text-slate-600 shadow-sm rounded"
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

const EventCard = ({ event }: { event: Event }) => {
  const router = useRouter();
  const typeColor = getTypeColor(event.type);
  const isLive = event.status === 'live';

  return (
    <div
      onClick={() => router.push(`/events/${event.id}`)}
      className="cursor-pointer group relative w-full bg-white border-4 border-black rounded-3xl p-1 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 flex flex-col"
    >
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden h-full flex flex-col relative z-10">
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

          <div className="grid grid-cols-2 gap-2 mt-auto pb-4">
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-[7px] text-slate-400 font-black uppercase tracking-tighter">DATE</span>
              <span className="block text-[9px] font-black text-slate-900 truncate">{event.endDate}</span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-center">
              <span className="block text-[7px] text-slate-400 font-black uppercase tracking-tighter">CLASS</span>
              <span className="block text-[9px] font-black text-slate-900 truncate">{event.category}</span>
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

interface RawEvent {
  event_id: number;
  name: string;
  short_description?: string;
  status: string;
  category?: string;
  max_participants: number;
  fee: string;
}

export default function EventsPage() {
  const [apiEvents, setApiEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://phoenix-app-2-0-backend-nodejs-qqwx.onrender.com/api/catalog/events');
        const result = await response.json();

        if (result.status === 'success' && result.data) {
          const mappedEvents: Event[] = result.data
            .filter((item: RawEvent) => item.status !== 'draft')
            .map((item: RawEvent) => {
              const category = item.category?.toLowerCase() || 'default';
              let type = 'default';
              let themeId = 'unova';

              if (category.includes('tech')) { type = 'electric'; themeId = 'sinnoh'; }
              else if (category.includes('gaming')) { type = 'fire'; themeId = 'kanto'; }
              else if (category.includes('non')) { type = 'grass'; themeId = 'paldea'; }
              else if (category.includes('carnival')) { type = 'water'; themeId = 'alola'; }

              return {
                id: item.event_id,
                title: item.name,
                subtitle: item.short_description || 'Innovation Awaits',
                image: '/placeholder-image.jpg',
                status: item.status === 'open' ? 'live' : 'upcoming',
                endsIn: 'Limited Time',
                progress: 50,
                endDate: 'April 2026',
                category: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'General',
                type: type,
                themeId: themeId,
                description: item.short_description || '',
                participants: item.max_participants > 1 ? `Up to ${item.max_participants} members` : 'Individual',
                eventFee: item.fee === '0.00' ? 'Free' : `₹${parseFloat(item.fee).toFixed(0)}`,
              };
            });
          setApiEvents(mappedEvents);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = useMemo(() => {
    return ['All Categories', ...Array.from(new Set(apiEvents.map(e => e.category)))];
  }, [apiEvents]);

  const processedEvents = useMemo(() => {
    const filtered = apiEvents.filter(event => {
      const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const grouped = filtered.reduce((acc: Record<string, Event[]>, event: Event) => {
      if (!acc[event.category]) acc[event.category] = [];
      acc[event.category].push(event);
      return acc;
    }, {});

    const getIndex = (cat: string) => {
      const low = cat.toLowerCase();
      if (low.includes('non')) return 1;
      if (low.includes('technical')) return 0;
      if (low.includes('gaming')) return 2;
      if (low.includes('photography')) return 3;
      return 99;
    };

    return Object.entries(grouped).sort(([a], [b]) => getIndex(a) - getIndex(b)) as [string, Event[]][];
  }, [apiEvents, selectedCategory, searchQuery]);

  return (
    <section className="min-h-screen w-full flex flex-col items-center font-sans text-slate-900 relative pb-24 pt-32">
      <div className="w-full max-w-7xl z-10 px-4 md:px-8 flex flex-col gap-12">
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {loading ? (
          <div className="w-full flex justify-center py-20">
            <PokeballIcon className="w-16 h-16 text-red-600 animate-spin" />
          </div>
        ) : processedEvents.length === 0 ? (
          <EmptyState />
        ) : (
          processedEvents.map(([category, events]: [string, Event[]]) => (
            <div key={category} className="w-full">
              <div className="flex items-center gap-6 mb-10">
                <div className="h-[1px] flex-grow bg-white/10"></div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                  <h2 className="text-base md:text-xl font-black uppercase tracking-[0.2em] text-white text-center">
                    {category}
                  </h2>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                </div>
                <div className="h-[1px] flex-grow bg-white/10"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {events.map((event: Event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx global>{`
                .animate-spin-slow { animation: spin 8s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
    </section>
  );
}
