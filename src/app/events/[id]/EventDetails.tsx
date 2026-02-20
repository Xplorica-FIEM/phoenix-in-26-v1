'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { EVENTS } from '@/data/events';

export const THEMES = {
    kanto: {
        panel: 'bg-rose-100',
        accent: 'red-500',
        accentSoft: 'bg-red-50',
        accentDark: 'red-700',

        description: 'bg-white border-t-[6px] border-t-red-500',
        rules: 'bg-white border-t-[6px] border-t-red-600',
        contact: 'bg-white border-l-[6px] border-l-red-500',

        backButton: 'bg-red-100 text-red-900',
        backButtonHover: 'hover:bg-red-200',
        ruleArrow: 'text-red-600',
    },

    johto: {
        panel: 'bg-amber-100',
        accent: 'yellow-500',
        accentSoft: 'bg-yellow-50',
        accentDark: 'yellow-700',

        description: 'bg-white border-t-[6px] border-t-yellow-500',
        rules: 'bg-white border-t-[6px] border-t-yellow-600',
        contact: 'bg-white border-l-[6px] border-l-yellow-500',

        backButton: 'bg-yellow-100 text-yellow-900',
        backButtonHover: 'hover:bg-yellow-200',
        ruleArrow: 'text-yellow-600',
    },

    hoenn: {
        panel: 'bg-emerald-100',
        accent: 'emerald-500',
        accentSoft: 'bg-emerald-50',
        accentDark: 'emerald-700',

        description: 'bg-white border-t-[6px] border-t-emerald-500',
        rules: 'bg-white border-t-[6px] border-t-emerald-600',
        contact: 'bg-white border-l-[6px] border-l-emerald-500',

        backButton: 'bg-emerald-100 text-emerald-900',
        backButtonHover: 'hover:bg-emerald-200',
        ruleArrow: 'text-emerald-600',
    },

    sinnoh: {
        panel: 'bg-sky-100',
        accent: 'sky-500',
        accentSoft: 'bg-sky-50',
        accentDark: 'sky-700',

        description: 'bg-white border-t-[6px] border-t-sky-500',
        rules: 'bg-white border-t-[6px] border-t-sky-600',
        contact: 'bg-white border-l-[6px] border-l-sky-500',

        backButton: 'bg-sky-100 text-sky-900',
        backButtonHover: 'hover:bg-sky-200',
        ruleArrow: 'text-sky-600',
    },

    unova: {
        panel: 'bg-slate-100',
        accent: 'slate-600',
        accentSoft: 'bg-slate-100',
        accentDark: 'slate-800',

        description: 'bg-white border-t-[6px] border-t-slate-700',
        rules: 'bg-white border-t-[6px] border-t-slate-800',
        contact: 'bg-white border-l-[6px] border-l-slate-700',

        backButton: 'bg-slate-200 text-slate-900',
        backButtonHover: 'hover:bg-slate-300',
        ruleArrow: 'text-slate-700',
    },

    kalos: {
        panel: 'bg-indigo-100',
        accent: 'indigo-500',
        accentSoft: 'bg-indigo-50',
        accentDark: 'indigo-700',

        description: 'bg-white border-t-[6px] border-t-indigo-500',
        rules: 'bg-white border-t-[6px] border-t-indigo-600',
        contact: 'bg-white border-l-[6px] border-l-indigo-500',

        backButton: 'bg-indigo-100 text-indigo-900',
        backButtonHover: 'hover:bg-indigo-200',
        ruleArrow: 'text-indigo-600',
    },

    alola: {
        panel: 'bg-orange-100',
        accent: 'orange-500',
        accentSoft: 'bg-orange-50',
        accentDark: 'orange-700',

        description: 'bg-white border-t-[6px] border-t-orange-500',
        rules: 'bg-white border-t-[6px] border-t-orange-600',
        contact: 'bg-white border-l-[6px] border-l-orange-500',

        backButton: 'bg-orange-100 text-orange-900',
        backButtonHover: 'hover:bg-orange-200',
        ruleArrow: 'text-orange-600',
    },

    galar: {
        panel: 'bg-violet-100',
        accent: 'violet-500',
        accentSoft: 'bg-violet-50',
        accentDark: 'violet-700',

        description: 'bg-white border-t-[6px] border-t-violet-500',
        rules: 'bg-white border-t-[6px] border-t-violet-600',
        contact: 'bg-white border-l-[6px] border-l-violet-500',

        backButton: 'bg-violet-100 text-violet-900',
        backButtonHover: 'hover:bg-violet-200',
        ruleArrow: 'text-violet-600',
    },

    paldea: {
        panel: 'bg-fuchsia-100',
        accent: 'fuchsia-500',
        accentSoft: 'bg-fuchsia-50',
        accentDark: 'fuchsia-700',

        description: 'bg-white border-t-[6px] border-t-fuchsia-500',
        rules: 'bg-white border-t-[6px] border-t-fuchsia-600',
        contact: 'bg-white border-l-[6px] border-l-fuchsia-500',

        backButton: 'bg-fuchsia-100 text-fuchsia-900',
        backButtonHover: 'hover:bg-fuchsia-200',
        ruleArrow: 'text-fuchsia-600',
    },
} as const;

const PokeballIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M50 5A45 45 0 0 0 5 50a45 45 0 0 0 45 45 45 45 0 0 0 45-45A45 45 0 0 0 50 5zm0 82a37 37 0 0 1-37-37c0-18.1 13-33.2 30-36.4V46h14V13.6C87 16.8 100 31.9 100 50a37 37 0 0 1-37 37z" />
        <circle cx="50" cy="50" r="12" />
        <path d="M50 38a12 12 0 0 0-12 12h-9a21 21 0 1 1 42 0h-9a12 12 0 0 0-12-12z" />
    </svg>
);

const StatItem = ({ label, value, theme }: { label: string; value: string; theme: any }) => (
    <div className="flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">
            {label}
        </span>
        <span className={`text-lg md:text-xl font-black text-white leading-none tracking-tight`}>
            {value}
        </span>
    </div>
);

export default function EventDetails({ id }: { id: string }) {
    const router = useRouter();
    const event = EVENTS.find((e) => e.id === Number(id));

    // --- SEO Optimization ---
    useEffect(() => {
        if (event) {
            document.title = `${event.title} (${event.category}) | PHOENIX 2026`;
        }
    }, [event]);

    if (!event) return null;

    const theme = THEMES[event.themeId as keyof typeof THEMES] || THEMES.kanto;

    return (
        <div className="min-h-screen w-full p-4 pt-24 md:p-8 md:pt-32 flex items-start justify-center overflow-y-auto scrollbar-hide">
            <div
                className={`relative border-[6px] border-black rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden w-full max-w-7xl 
        shadow-[12px_12px_0_rgba(0,0,0,1)] ${theme.panel} animate-fadeInUp`}
            >
                <div className={`min-h-[80vh] ${theme.panel} selection:bg-${theme.accent} selection:text-white font-sans overflow-x-hidden`}>
                    {/* HEADER SECTION */}
                    <div className="w-full bg-slate-900 border-b-8 border-black pt-20 pb-12 relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                        </div>

                        <div className="max-w-7xl mx-auto px-6 relative z-10">
                            <button
                                onClick={() => router.push('/#events')}
                                className={`flex items-center gap-2 ${theme.backButton} ${theme.backButtonHover} px-4 py-2 rounded-lg font-black text-xs uppercase tracking-tighter transition-all mb-8 shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1`}
                            >
                                ← Back to Pokédex
                            </button>

                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="space-y-4 max-w-3xl">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 bg-${theme.accent} text-white text-[10px] font-black uppercase tracking-widest rounded`}>
                                            #{event.id.toString().padStart(3, '0')}
                                        </span>
                                        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                            {event.category}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-7xl font-black text-white uppercase leading-tight font-press-start drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
                                        {event.title}
                                    </h1>
                                    <p className={`text-xl md:text-2xl font-bold text-${theme.accent} uppercase tracking-wide`}>
                                        {event.subtitle}
                                    </p>
                                </div>

                                <div className="hidden lg:block">
                                    <div className="w-48 h-48 bg-slate-800 border-4 border-black rounded-3xl relative overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 shadow-[8px_8px_0_rgba(0,0,0,1)]">
                                        <div className={`absolute inset-0 bg-${theme.accent} opacity-20`}></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <PokeballIcon className="w-24 h-24 text-white/20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                            {/* LEFT: Info */}
                            <div className="lg:col-span-8 space-y-16">
                                <section className={`${theme.description} p-8 md:p-12 rounded-3xl shadow-[0_12px_0_0_rgba(0,0,0,0.05)]`}>
                                    <h3 className="text-2xl font-black text-slate-900 uppercase mb-8 flex items-center gap-4">
                                        <span className={`w-3 h-8 bg-${theme.accent}`}></span>
                                        Mission Briefing
                                    </h3>
                                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                                        {event.description}
                                    </p>
                                </section>

                                <section className={`${theme.rules} p-8 md:p-12 rounded-3xl shadow-[0_12px_0_0_rgba(0,0,0,0.05)]`}>
                                    <h3 className="text-2xl font-black text-slate-900 uppercase mb-8 flex items-center gap-4">
                                        <span className={`w-3 h-8 bg-${theme.accent}`}></span>
                                        Engagement Rules
                                    </h3>
                                    <ul className="space-y-6">
                                        {event.rules.map((rule, idx) => (
                                            <li key={idx} className="flex gap-4 group">
                                                <span className={`${theme.ruleArrow} font-black text-xl group-hover:translate-x-1 transition-transform`}>▶</span>
                                                <span className="text-slate-700 text-base md:text-lg font-bold">{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            {/* RIGHT: Stats */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="bg-slate-900 border-4 border-black rounded-3xl p-8 text-white shadow-[12px_12px_0_rgba(0,0,0,1)] relative overflow-hidden group">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${theme.accent} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`}></div>

                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 pb-4 border-b border-white/10">
                                        Key Parameters
                                    </h4>

                                    <div className="space-y-8">
                                        <StatItem label="CLOSING DATE" value={event.endDate} theme={theme} />
                                        <StatItem label="PARTICIPATION" value={event.participants || 'N/A'} theme={theme} />
                                        <StatItem label="CREDIT COST" value={event.eventFee || 'Free'} theme={theme} />
                                    </div>

                                    <button className={`w-full mt-12 bg-${theme.accent} hover:bg-${theme.accentDark} text-white font-black py-5 rounded-2xl border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3`}>
                                        JOIN CONNECTION ⚡
                                    </button>
                                </div>

                                {/* CONTACTS */}
                                {event.contacts && event.contacts.length > 0 && (
                                    <div className={`${theme.contact} p-8 rounded-3xl shadow-[0_8px_0_0_rgba(0,0,0,0.03)]`}>
                                        <h4 className="text-xs font-black uppercase text-slate-400 mb-6">Line Commanders</h4>
                                        <div className="space-y-6">
                                            {event.contacts.map((contact, idx) => (
                                                <div key={idx} className="flex flex-col group">
                                                    <span className="text-slate-900 font-black text-sm uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                                                        {contact.name}
                                                    </span>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-slate-400 font-bold text-[10px] uppercase">
                                                            {contact.role}
                                                        </span>
                                                        <a href={`tel:${contact.phone}`} className="text-slate-900 font-mono text-xs font-black hover:underline underline-offset-4 decoration-2">
                                                            {contact.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
