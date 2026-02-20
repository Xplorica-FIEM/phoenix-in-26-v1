"use client";

import React, { useState } from "react";
import Image from "next/image";
import RetroButton from "@/components/RetroButton";

const currentSponsors = [
    { name: "CodeCrafter", logo: "/sponsors/codecrafter.png" },
    { name: "GFG", logo: "/sponsors/gfg.png" },
    { name: "Pizza Hut", logo: "/sponsors/pizzahut.png" },
    { name: "Red Bull", logo: "/sponsors/redbull.png" },
    { name: "XYZ", logo: "/sponsors/xyz.png" },
];

const pastSponsors = [
    { name: "Tea", logo: "/pev-sponsors/Tea.jpeg" },
    { name: "Time", logo: "/pev-sponsors/Time.jpeg" },
    { name: "Apptech", logo: "/pev-sponsors/apptech.png" },
    { name: "Edugraph", logo: "/pev-sponsors/edugraph.jpg" },
    { name: "Finlatics", logo: "/pev-sponsors/finlatics.png" },
    { name: "Globsyn", logo: "/pev-sponsors/globsyn.jpeg" },
    { name: "Kebab Stop", logo: "/pev-sponsors/kebab_stop.jpeg" },
    { name: "Pizza Hut", logo: "/pev-sponsors/pizzahut.jpeg" },
    { name: "Reel2Real", logo: "/pev-sponsors/reel2real.png" },
    { name: "Unstop", logo: "/pev-sponsors/unstop.jpg" },
];

export default function Sponsors() {
    const duplicatedCurrent = [...currentSponsors, ...currentSponsors, ...currentSponsors];
    const duplicatedPast = [...pastSponsors, ...pastSponsors];
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        setTimeout(() => {
            closeForm();
        }, 3000);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setTimeout(() => setIsSubmitted(false), 300);
    };

    return (
        <>
            <section
                className="py-12 md:py-24 flex flex-col items-center px-4 md:px-8"
                id="sponsors"
            >
                <main className="flex flex-col items-center text-center space-y-6 md:space-y-10 w-full max-w-7xl">
                    <h1 className="text-2xl md:text-5xl font-bold tracking-wider text-yellow-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] md:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] font-press-start uppercase">
                        SPONSORS
                    </h1>

                    <p className="text-sm md:text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
                        Our partners who make this possible. Interested in
                        sponsoring? Get in touch.
                    </p>

                    {/* buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto items-center">
                        <RetroButton onClick={() => window.open('https://linktr.ee/phoenix.fiem', '_blank')} className="w-full sm:w-auto">
                            <span className="text-[10px] md:text-base">Be a Sponsor</span>
                        </RetroButton>

                        <RetroButton onClick={() => setIsFormOpen(true)} className="w-full sm:w-auto">
                            <span className="text-[10px] md:text-base">Schedule a Call</span>
                        </RetroButton>
                    </div>

                    <div className="w-full space-y-12 md:space-y-24 pt-8 md:pt-16">
                        {/* Current Year */}
                        <div className="space-y-6 md:space-y-8">
                            <h2 className="text-xs md:text-3xl font-bold text-white uppercase tracking-widest font-press-start flex flex-wrap justify-center items-center gap-2 md:gap-4 leading-relaxed">
                                <span className="text-yellow-400">#</span> This Year&apos;s Sponsors
                            </h2>
                            <div className="w-full overflow-hidden py-4 md:py-8">
                                <div className="marquee flex gap-6 md:gap-12 w-max items-center animate-scroll">
                                    {duplicatedCurrent.map((sponsor, i) => (
                                        <SponsorBubble key={`current-${i}`} logo={sponsor.logo} name={sponsor.name} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Past Year */}
                        <div className="space-y-6 md:space-y-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            <h2 className="text-[10px] md:text-2xl font-bold text-white/50 uppercase tracking-widest font-press-start flex flex-wrap justify-center items-center gap-2 md:gap-4 leading-relaxed text-center">
                                <span className="text-white/20">#</span> Past Year Partners
                            </h2>
                            <div className="w-full overflow-hidden py-2 md:py-4">
                                <div className="marquee-reverse flex gap-6 md:gap-12 w-max items-center animate-scroll-reverse">
                                    {duplicatedPast.map((sponsor, i) => (
                                        <SponsorBubble key={`past-${i}`} logo={sponsor.logo} name={sponsor.name} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>

            {/* overlay */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
                    onClick={closeForm}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-stone-900 border-4 border-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-1"
                    >
                        <div className="bg-yellow-400 p-8 relative overflow-hidden">
                            {/* dotted overlay */}
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_10%,transparent_10%)] bg-[length:4px_4px]" />

                            <div className="relative z-10 text-stone-900">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="absolute -top-4 -right-4 w-8 h-8 bg-black text-white flex items-center justify-center font-bold border-2 border-white hover:bg-red-600 transition-colors"
                                >
                                    ✕
                                </button>

                                {!isSubmitted ? (
                                    <>
                                        <h2 className="font-press-start text-lg uppercase tracking-wider mb-2">
                                            Schedule Call
                                        </h2>
                                        <p className="font-sans font-bold text-xs mb-6 opacity-70">
                                            TRANSMISSION_INITIATED: JOIN_THE_SQUAD
                                        </p>

                                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-tighter">Email ID</label>
                                                <input
                                                    type="email"
                                                    placeholder="commander@example.com"
                                                    required
                                                    className="w-full bg-white border-4 border-black px-4 py-2 text-sm font-bold focus:outline-none focus:bg-blue-50 transition-colors"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-tighter">WhatsApp Number</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+91 XXXXX XXXXX"
                                                    required
                                                    className="w-full bg-white border-4 border-black px-4 py-2 text-sm font-bold focus:outline-none focus:bg-blue-50 transition-colors"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="mt-4 bg-black text-white font-black py-4 uppercase tracking-widest text-xs border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:bg-stone-800 active:translate-y-1 active:shadow-none transition-all"
                                            >
                                                Send Signal ⚡
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                                            <span className="text-2xl">📡</span>
                                        </div>
                                        <h3 className="font-press-start text-base uppercase mb-4">
                                            Signal Locked
                                        </h3>
                                        <p className="font-sans font-bold text-sm leading-relaxed px-4">
                                            Our recruitment team will establish a connection shortly. Stay tuned.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .marquee {
                    animation: scroll 40s linear infinite;
                }
                .marquee-reverse {
                    animation: scroll-reverse 40s linear infinite;
                }
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50%)); }
                }
                @keyframes scroll-reverse {
                    0% { transform: translateX(calc(-50%)); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </>
    );
}

function SponsorBubble({ logo, name }: { logo?: string; name: string }) {
    return (
        <div className="shrink-0 group relative">
            <div className="w-20 h-20 md:w-44 md:h-44 rounded-xl md:rounded-2xl bg-white border-[3px] md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center p-3 md:p-6 group-hover:-translate-y-2 group-hover:translate-x-1 group-hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden relative">
                {logo ? (
                    <Image
                        src={logo}
                        alt={name}
                        width={140}
                        height={140}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="text-slate-400 font-bold uppercase text-[8px] md:text-xs text-center">{name}</div>
                )}

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-gradient-to-b from-transparent via-blue-400 to-transparent h-4 w-full animate-scan" />
            </div>

            {/* Tag */}
            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-yellow-400 border md:border-2 border-black px-1.5 md:px-2 py-0.5 md:py-1 shadow-[2px_2px_0_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <span className="text-[7px] md:text-[10px] font-black uppercase text-black">{name}</span>
            </div>
        </div>
    );
}
