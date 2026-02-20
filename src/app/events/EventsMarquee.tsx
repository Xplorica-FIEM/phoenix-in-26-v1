'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
    id: number;
    title: string;
    subtitle: string;
    status: string;
    category: string;
    type: string;
}

const PokeballIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M50 5A45 45 0 0 0 5 50a45 45 0 0 0 45 45 45 45 0 0 0 45-45A45 45 0 0 0 50 5zm0 82a37 37 0 0 1-37-37c0-18.1 13-33.2 30-36.4V46h14V13.6C87 16.8 100 31.9 100 50a37 37 0 0 1-37 37z" />
        <circle cx="50" cy="50" r="12" />
        <path d="M50 38a12 12 0 0 0-12 12h-9a21 21 0 1 1 42 0h-9a12 12 0 0 0-12-12z" />
    </svg>
);

const EventMarqueeCard = ({ event }: { event: Event }) => {
    const router = useRouter();
    const isLive = event.status === 'open';

    return (
        <div
            onClick={() => router.push(`/events/${event.id}`)}
            className="shrink-0 group relative mx-2 md:mx-6 cursor-pointer"
        >
            <div className="w-32 h-32 md:w-64 md:h-64 bg-white border-[3px] md:border-4 border-black rounded-[1.5rem] md:rounded-[2.5rem] shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-3 md:p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] md:group-hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] relative overflow-hidden">

                {/* Visual Icon Area */}
                <div className="flex-grow flex items-center justify-center relative w-full">
                    <div className="absolute inset-0 bg-slate-50 rounded-xl md:rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <PokeballIcon className="w-8 h-8 md:w-24 md:h-24 text-slate-100 group-hover:text-fuchsia-500/20 transition-all duration-500 relative z-10" />

                    {/* Status Tag */}
                    <div className="absolute -top-1 -right-1 md:top-0 md:right-0">
                        <span className={`text-[6px] md:text-[8px] font-black px-1 md:px-2 py-0.5 rounded border md:border-2 border-black uppercase tracking-tighter ${isLive ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'}`}>
                            {isLive ? 'ACTIVE' : 'LOCKED'}
                        </span>
                    </div>
                </div>

                <div className="w-full mt-2 md:mt-4 text-center z-10">
                    <h3 className="text-[8px] md:text-sm font-black text-slate-900 uppercase tracking-tighter line-clamp-2 leading-tight">
                        {event.title}
                    </h3>
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-5 bg-gradient-to-b from-transparent via-fuchsia-400 to-transparent h-4 w-full animate-scan" />
            </div>

            {/* Hover Floating Category Tag */}
            <div className="absolute -bottom-1 md:-bottom-2 right-2 md:right-4 bg-yellow-400 border md:border-2 border-black px-2 md:px-3 py-0.5 md:py-1 shadow-[2px_2px_0_rgba(0,0,0,1)] md:shadow-[4px_4px_0_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-all duration-300 -rotate-2 z-20">
                <span className="text-[7px] md:text-[9px] font-black uppercase text-black">{event.category}</span>
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
}

export default function EventsMarquee() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://phoenix-app-2-0-backend-nodejs-qqwx.onrender.com/api/catalog/events');
                const result = await response.json();
                if (result.status === 'success' && result.data) {
                    const mapped = result.data
                        .filter((item: RawEvent) => item.status !== 'draft')
                        .map((item: RawEvent) => ({
                            id: item.event_id,
                            title: item.name,
                            subtitle: item.short_description || '',
                            status: item.status,
                            category: item.category || 'General',
                            type: item.category?.toLowerCase().includes('tech') ? 'electric' : 'default'
                        }));
                    setEvents(mapped);
                }
            } catch (error) {
                console.error('Marquee fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const groupedEvents = useMemo(() => {
        // Filter and group
        const grouped = events.reduce((acc: Record<string, Event[]>, event) => {
            const catLower = event.category.toLowerCase();
            if (catLower.includes('management')) return acc; // Exclude management from marquee

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

        // Sort groups based on the defined order
        return Object.entries(grouped).sort(([a], [b]) => getIndex(a) - getIndex(b));
    }, [events]);

    if (loading || events.length === 0) return null;

    return (
        <section className="py-12 md:py-24 w-full flex flex-col items-center bg-transparent overflow-hidden" id="events">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-10 md:mb-16 px-4">
                <h2 className="text-2xl md:text-5xl font-black text-yellow-400 font-press-start tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] md:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] uppercase">
                    DATA MODULES
                </h2>
                <button
                    onClick={() => router.push('/events')}
                    className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-xl font-black text-[10px] md:text-xs uppercase shadow-[4px_4px_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-y-1 active:shadow-none transition-all flex items-center gap-2 border-[2px] md:border-[3px] border-black"
                >
                    ENTER FULL EVENTDEX <span className="text-red-600 animate-pulse">📡</span>
                </button>
            </div>

            <div className="w-full space-y-16 md:space-y-24">
                {groupedEvents.map(([category, catEvents], idx) => (
                    <div key={category} className="space-y-6 md:space-y-10 group/row">
                        {/* Row Header */}
                        <div className="w-full flex justify-center px-4">
                            <h3 className="text-xs md:text-3xl font-black text-white/40 uppercase tracking-widest font-press-start flex flex-wrap justify-center items-center gap-2 md:gap-4 group-hover/row:text-white transition-colors duration-500 text-center leading-relaxed">
                                <span className="text-yellow-400">#</span> {category} SESSIONS
                            </h3>
                        </div>

                        {/* Scrolling Marquee Area */}
                        <div className="w-full relative py-2 md:py-4 overflow-hidden">
                            <div className={`flex marquee-${idx % 2 === 0 ? 'normal' : 'reverse'} hover:[animation-play-state:paused]`}>
                                {/* Multiplied for seamlessness */}
                                {[...catEvents, ...catEvents, ...catEvents, ...catEvents].map((event, i) => (
                                    <EventMarqueeCard key={`${event.id}-${i}`} event={event} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .marquee-normal {
                    animation: scroll 40s linear infinite;
                    width: max-content;
                }
                .marquee-reverse {
                    animation: scroll-reverse 40s linear infinite;
                    width: max-content;
                }
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                @keyframes scan {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(500%); }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </section>
    );
}
