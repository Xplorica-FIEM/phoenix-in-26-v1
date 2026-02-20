'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import RichTextRenderer from '@/components/RichTextRenderer';
import { ChevronLeft, Trophy, Phone, Zap } from 'lucide-react';

interface EventDetail {
    event_id: number;
    name: string;
    fee: string;
    status: string;
    category: string;
    max_participants: number;
    max_attempts_per_team: number;
    details: { key: string; value: string }[] | null;
    schedules: {
        schedule_id: number;
        label: string;
        startTime: string;
        endTime: string;
    }[];
    prizes: {
        prize_id: number;
        title: string;
        value: string;
    }[];
}

const THEMES = {
    electric: {
        panel: 'bg-yellow-50/90',
        accent: 'yellow-500',
        accentDark: 'yellow-700',
        card: 'bg-white border-yellow-400',
        glow: 'shadow-[0_0_20px_rgba(234,179,8,0.2)]',
    },
    fire: {
        panel: 'bg-red-50/90',
        accent: 'red-500',
        accentDark: 'red-700',
        card: 'bg-white border-red-400',
        glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    },
    grass: {
        panel: 'bg-emerald-50/90',
        accent: 'emerald-500',
        accentDark: 'emerald-700',
        card: 'bg-white border-emerald-400',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    },
    water: {
        panel: 'bg-blue-50/90',
        accent: 'blue-500',
        accentDark: 'blue-700',
        card: 'bg-white border-blue-400',
        glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    },
    psychic: {
        panel: 'bg-purple-50/90',
        accent: 'purple-500',
        accentDark: 'purple-700',
        card: 'bg-white border-purple-400',
        glow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    },
    default: {
        panel: 'bg-slate-50/90',
        accent: 'slate-600',
        accentDark: 'slate-800',
        card: 'bg-white border-slate-400',
        glow: 'shadow-[0_0_20px_rgba(71,85,105,0.2)]',
    },
} as const;

const PokeballIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M50 5A45 45 0 0 0 5 50a45 45 0 0 0 45 45 45 45 0 0 0 45-45A45 45 0 0 0 50 5zm0 82a37 37 0 0 1-37-37c0-18.1 13-33.2 30-36.4V46h14V13.6C87 16.8 100 31.9 100 50a37 37 0 0 1-37 37z" />
        <circle cx="50" cy="50" r="12" />
        <path d="M50 38a12 12 0 0 0-12 12h-9a21 21 0 1 1 42 0h-9a12 12 0 0 0-12-12z" />
    </svg>
);

export default function EventDetails({ id }: { id: string }) {
    const router = useRouter();
    const [event, setEvent] = useState<EventDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://phoenix-app-2-0-backend-nodejs-qqwx.onrender.com/api/catalog/events/${id}`);
                const result = await response.json();

                if (result.status === 'success' && result.data) {
                    setEvent(result.data);
                } else {
                    setError('Event not found');
                }
            } catch (err) {
                console.error('Failed to fetch event details:', err);
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    useEffect(() => {
        if (event) {
            document.title = `${event.name} | Phoenix 2026`;
        }
    }, [event]);

    if (loading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-press-start text-[10px] animate-pulse">INITIATING SCAN...</p>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-press-start text-white mb-6 uppercase">404 SIGNAL LOST</h2>
                <button
                    onClick={() => router.push('/#events')}
                    className="px-6 py-3 bg-white text-slate-950 font-black rounded border-b-4 border-slate-400 active:border-b-0 active:translate-y-1 transition-all uppercase text-xs"
                >
                    Return to Map
                </button>
            </div>
        );
    }

    // Determine theme based on category
    const cat = event.category?.toLowerCase() || '';
    let themeKey: keyof typeof THEMES = 'default';
    if (cat.includes('tech')) themeKey = 'electric';
    else if (cat.includes('gaming')) themeKey = 'fire';
    else if (cat.includes('non')) themeKey = 'grass';
    else if (cat.includes('carnival')) themeKey = 'water';

    const theme = THEMES[themeKey];

    const shortDescription = event.details?.find(d => d.key === 'short_description')?.value;
    const longDescriptionRaw = event.details?.find(d => d.key === 'long_description')?.value;
    let longDescription = null;

    if (longDescriptionRaw) {
        try {
            longDescription = JSON.parse(longDescriptionRaw);
        } catch (e) {
            console.error('Failed to parse long description JSON', e);
        }
    }

    const rules = event.details?.filter(d => d.key.toLowerCase().includes('rule')) || [];
    const coordinators = event.details?.filter(d => d.key.toLowerCase().includes('coordinator')).map(d => ({
        name: d.key.split('-')[1] || d.key,
        phone: d.value
    })) || [];

    return (
        <div className="min-h-screen w-full bg-transparent flex items-start justify-center p-4 md:p-8 pt-24 md:pt-32 font-sans relative">

            {/* MAIN POKEDEX-LIKE COMPONENT WRAPPER */}
            <div className="relative w-full max-w-7xl border-4 md:border-[6px] border-black rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[12px_12px_0_rgba(0,0,0,1)] flex flex-col backdrop-blur-sm animate-fadeIn">

                {/* DARK HEADER SECTION (TOP ~1/3) */}
                <div className="w-full bg-[#0f172a]/95 p-8 md:p-14 border-b-6 md:border-b-8 border-black relative">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                        <div className="space-y-8 flex-grow">
                            <button
                                onClick={() => router.push('/#events')}
                                className="bg-white text-slate-900 px-4 py-2 rounded font-black text-[10px] uppercase shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:scale-95 transition-all flex items-center gap-2 border-2 border-black group"
                            >
                                <ChevronLeft size={14} strokeWidth={3} className="group-hover:-translate-x-0.5 transition-transform" /> BACK TO POKÉDEX
                            </button>

                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="bg-fuchsia-600 text-white font-press-start text-[8px] md:text-[10px] px-3 py-1.5 rounded shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-black uppercase text-center inline-block">
                                        {event.category || "GENERAL"}
                                    </span>
                                    <span className={cn(
                                        "font-press-start text-[8px] md:text-[10px] px-3 py-1.5 rounded shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-black uppercase transition-all inline-block",
                                        event.status === 'open' ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                                    )}>
                                        {event.status === 'open' ? "REGISTRATION OPEN" : "REGISTRATION CLOSED"}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-8xl font-press-start text-white uppercase leading-none tracking-tighter drop-shadow-[0_4px_0_rgba(0,0,0,1)] hover:text-fuchsia-400 transition-colors cursor-default">
                                    {event.name}
                                </h1>
                                <p className="text-fuchsia-500 font-bold text-xs md:text-lg uppercase tracking-widest mt-4">
                                    {event.details?.find(d => d.key === 'subtitle')?.value || "Signal Detected // Authorized Access"}
                                </p>
                            </div>
                        </div>

                        {/* LARGE ICON PANEL */}
                        <div className="hidden lg:block">
                            <div className="w-52 h-52 bg-slate-800/80 border-4 border-black rounded-[2.5rem] flex items-center justify-center shadow-xl rotate-3 relative overflow-hidden group hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-crosshair">
                                <PokeballIcon className="w-32 h-32 text-white/10 group-hover:text-fuchsia-500/20 group-hover:scale-110 transition-all duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 bg-scanline pointer-events-none opacity-20"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BODY CONTENT (LIGHT THEMED PANEL) */}
                <div className={cn("flex-grow p-6 md:p-12 lg:p-16 relative", theme.panel)}>
                    {/* Retro Grid Background for Body */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 relative z-10">

                        {/* LEFT COLUMN: LARGE DESCRIPTION BOX */}
                        <div className="lg:col-span-8 flex flex-col gap-10">

                            {/* Combined Description & Rules Box */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 relative group">
                                {/* SCROLLABLE CONTENT AREA */}
                                <div className="space-y-12 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                                    <div className="space-y-6">
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase flex items-center gap-4 group-hover:text-fuchsia-600 transition-colors">
                                            <span className="w-3 h-8 bg-fuchsia-600 shadow-[2px_2px_0_rgba(0,0,0,1)]"></span> MISSION BRIEFING
                                        </h3>
                                        <div className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed italic border-l-4 border-fuchsia-100 pl-6">
                                            {shortDescription}
                                        </div>
                                        {longDescription && (
                                            <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed mt-6">
                                                <RichTextRenderer content={longDescription} />
                                            </div>
                                        )}
                                    </div>

                                    {rules.length > 0 && (
                                        <div className="pt-10 border-t-4 border-fuchsia-50">
                                            <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase mb-8 flex items-center gap-4 group-hover:text-fuchsia-600 transition-colors">
                                                <span className="w-3 h-8 bg-slate-900 shadow-[2px_2px_0_rgba(0,0,0,1)]"></span> ENGAGEMENT RULES
                                            </h3>
                                            <div className="space-y-4">
                                                {rules.map((rule, idx) => (
                                                    <div key={idx} className="flex gap-4 items-start group/rule hover:bg-fuchsia-50/50 p-2 rounded-lg transition-colors">
                                                        <span className="text-fuchsia-600 font-black text-xl flex-shrink-0 group-hover/rule:translate-x-1 transition-transform">▶</span>
                                                        <p className="text-slate-800 font-bold text-base md:text-lg">{rule.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: STACKED BOXES */}
                        <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10">

                            {/* 1. PRIZE POOLS BOX */}
                            {event.prizes && event.prizes.length > 0 && (
                                <div className="bg-white rounded-[2rem] p-8 border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[10px_10px_0_rgba(245,158,11,0.2)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                                        <Trophy size={14} className="text-amber-500 group-hover:scale-110 transition-transform" /> PRIZE POOLS
                                    </h4>
                                    <div className="space-y-4">
                                        {event.prizes.map((p, i) => (
                                            <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border-2 border-slate-100 group-hover:border-amber-400 group-hover:bg-amber-50 transition-all duration-300">
                                                <span className="text-xs font-black uppercase text-slate-900">{p.title}</span>
                                                <span className="text-xs font-bold text-fuchsia-600 font-mono shadow-[0_0_8px_rgba(192,38,211,0.2)]">{p.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 2. LINE COMMANDER BOX */}
                            {coordinators.length > 0 && (
                                <div className="bg-white rounded-[2rem] p-8 border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[10px_10px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 group">
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">LINE COMMANDERS</h4>
                                    <div className="space-y-6">
                                        {coordinators.map((c, i) => (
                                            <div key={i} className="group/item">
                                                <p className="text-sm font-black uppercase text-slate-900 group-hover/item:text-fuchsia-600 transition-colors">{c.name}</p>
                                                <div className="flex items-center justify-between mt-1">
                                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                        <Phone size={10} /> ACCESS CODE
                                                    </div>
                                                    <p className="font-mono font-black text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded border-b-2 border-slate-200 group-hover/item:bg-fuchsia-50 group-hover/item:border-fuchsia-200 transition-all select-all">{c.phone}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 3. KEY PARAMETERS BOX + REGISTER BUTTON */}
                            <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-10 border-4 border-black shadow-[10px_10px_0_rgba(0,0,0,1)] hover:shadow-[15px_15px_0_rgba(192,38,211,0.3)] hover:-translate-y-1 transition-all duration-500 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                                <h3 className="text-[9px] font-press-start uppercase tracking-widest text-white/30 mb-8 pb-3 border-b border-white/10 flex justify-between items-center">
                                    KEY PARAMETERS
                                    <Zap size={10} className="text-fuchsia-500 animate-pulse" />
                                </h3>

                                <div className="space-y-8 relative z-10">
                                    <div className="space-y-1 hover:translate-x-1 transition-transform">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">CLOSING DATE</p>
                                        <p className="text-lg font-black text-white uppercase font-press-start text-[10px] tracking-tight">APRIL 17-19, 2026</p>
                                    </div>

                                    <div className="space-y-1 hover:translate-x-1 transition-transform">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">PARTICIPATION</p>
                                        <p className="text-lg font-black text-white uppercase">
                                            {event.max_participants > 1 ? `${event.max_participants} MEMBERS` : 'INDIVIDUAL'}
                                        </p>
                                    </div>

                                    <div className="space-y-1 hover:translate-x-1 transition-transform">
                                        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">CREDIT COST</p>
                                        <p className="text-3xl font-black text-white group-hover:text-fuchsia-400 transition-colors">
                                            {event.fee === '0.00' ? 'FREE' : `₹${parseFloat(event.fee).toFixed(0)}`}
                                        </p>
                                    </div>

                                    {/* Register Button */}
                                    {event.status === 'open' && (
                                        <button className="w-full mt-10 bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition-all rounded-xl py-5 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 active:scale-95 border-b-8 border-fuchsia-800 active:border-b-0 shadow-[0_10px_20px_rgba(192,38,211,0.3)] group-hover:shadow-[0_15px_30px_rgba(192,38,211,0.5)]">
                                            REGISTER NOW ⚡
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* MINIMAL FOOTER LABEL */}
            <div className="fixed bottom-4 right-8 z-[100] hidden md:block">
                <p className="text-[9px] font-press-start text-white/20 uppercase tracking-widest">PHOENIX // SIGNAL STABLE // SYSTEM ACTIVE</p>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                .bg-scanline {
                    background: linear-gradient(
                        to bottom,
                        transparent,
                        transparent 50%,
                        rgba(0, 0, 0, 0.5) 50%,
                        rgba(0, 0, 0, 0.5)
                    );
                    background-size: 100% 4px;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
}
