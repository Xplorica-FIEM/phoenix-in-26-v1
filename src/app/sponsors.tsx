"use client";

import React, { useState } from "react";
import RetroButton from "@/components/RetroButton";

const sponsors = [
    { name: "Sponsor 1" },
    { name: "Sponsor 2" },
    { name: "Sponsor 3" },
    { name: "Sponsor 4" },
    { name: "Sponsor 5" },
    { name: "Sponsor 6" },
    { name: "Sponsor 7" },
    { name: "Sponsor 8" },
];

export default function Sponsors() {
    const duplicated = [...sponsors, ...sponsors];
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setTimeout(() => setIsSubmitted(false), 300);
    };

    return (
        <>

            <section
                className="min-h-screen flex flex-col items-center p-8 pt-45 md:pt-47.5 bg-cover bg-center bg-fixed"
                id="sponsors"
            >
                <main className="flex flex-col items-center text-center space-y-8 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-yellow-400 drop-shadow-lg font-press-start">
                        SPONSORS
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                        Our partners who make this possible. Interested in
                        sponsoring? Get in touch.
                    </p>

                    {/* buttons */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <RetroButton>Be a Sponsor</RetroButton>

                        <RetroButton onClick={() => setIsFormOpen(true)}>
                            Schedule a Call
                        </RetroButton>
                    </div>

                    <h2 className="text-xl md:text-2xl font-semibold text-yellow-300">
                        This Year&apos;s Sponsor
                    </h2>

                    {/* reverse marquee */}
                    <div className="w-full overflow-hidden py-4">
                        <div className="marquee-reverse flex gap-10 w-max">
                            {duplicated.map((_, i) => (
                                <SponsorBubble key={i} />
                            ))}
                        </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-semibold text-yellow-300">
                        Last Year&apos;s Sponsor
                    </h2>

                    <div className="w-full overflow-hidden py-4">
                        <div className="marquee flex gap-10 w-max">
                            {duplicated.map((_, i) => (
                                <SponsorBubble key={i} />
                            ))}
                        </div>
                    </div>
                </main>
            </section>

            {/* overlay */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-999"
                    onClick={closeForm}
                />
            )}

            {/* sliding drawer */}
            <div
                className={`
          fixed top-0 right-0 h-screen w-87.5 z-1000
          flex items-center justify-center p-5
          transition-transform duration-300
          ${isFormOpen ? "translate-x-0" : "translate-x-full"}
        `}
            >
                <form
                    onSubmit={handleSubmit}
                    className="relative w-full bg-gray-200 border-2 border-[#323232] shadow-[4px_4px_0_#323232] rounded p-6 flex flex-col gap-5"
                >
                    <button
                        type="button"
                        onClick={closeForm}
                        className="absolute top-3 right-3 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10"
                    >
                        ✕
                    </button>

                    {!isSubmitted ? (
                        <>
                            <div className="font-black text-lg">
                                Schedule a Call
                                <div className="text-sm font-semibold text-gray-600">
                                    We&apos;ll get back to you soon
                                </div>
                            </div>

                            <input
                                type="email"
                                placeholder="Enter Email"
                                required
                                className="h-10 border-2 border-[#323232] rounded px-3 font-semibold shadow-[4px_4px_0_#323232] focus:border-blue-500 outline-none"
                            />

                            <input
                                type="tel"
                                placeholder="Enter WhatsApp Number"
                                required
                                className="h-10 border-2 border-[#323232] rounded px-3 font-semibold shadow-[4px_4px_0_#323232] focus:border-blue-500 outline-none"
                            />

                            <button
                                type="submit"
                                className="mx-auto mt-4 w-32 h-10 border-2 border-[#323232] rounded font-semibold shadow-[4px_4px_0_#323232] active:translate-x-0.75 active:translate-y-0.75 active:shadow-none"
                            >
                                Submit →
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center text-white text-3xl">
                                ✓
                            </div>
                            <p className="font-semibold">
                                Our team will contact you shortly
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

function SponsorBubble() {
    return (
        <div  className="shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:scale-110 transition" >
            <svg
                className="w-14 h-14 md:w-20 md:h-20 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
        </div>
    );
}
