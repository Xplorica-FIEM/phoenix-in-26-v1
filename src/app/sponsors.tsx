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
                className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
                onClick={closeForm}
            >
                {/* stop close on panel click */}
                <div
                onClick={(e) => e.stopPropagation()}
                className="
                    relative
                    w-full max-w-md
                    translate-x-[-6px] translate-y-[-6px]
                    transition-all duration-150
                    bg-stone-800
                    shadow-[0.5px_0.5px_0_0_#292524,1px_1px_0_0_#292524,1.5px_1.5px_0_0_#292524,2px_2px_0_0_#292524,2.5px_2.5px_0_0_#292524,3px_3px_0_0_#292524,3.5px_3.5px_0_0_#292524,4px_4px_0_0_#292524,4.5px_4.5px_0_0_#292524,5px_5px_0_0_#292524,0_0_0_2px_#fafaf9,0.5px_0.5px_0_2px_#fafaf9,1px_1px_0_2px_#fafaf9,1.5px_1.5px_0_2px_#fafaf9,2px_2px_0_2px_#fafaf9,2.5px_2.5px_0_2px_#fafaf9,3px_3px_0_2px_#fafaf9,3.5px_3.5px_0_2px_#fafaf9,4px_4px_0_2px_#fafaf9]
                "
                >
                {/* Inner Yellow Face */}
                <div className="relative bg-yellow-400 border border-white/30 overflow-hidden p-8">

                    {/* dotted overlay (same as RetroButton) */}
                    <div className="absolute inset-0 opacity-50 mix-blend-hard-light animate-dots bg-[radial-gradient(rgba(255,255,255,0.8)_20%,transparent_20%),radial-gradient(rgba(255,255,255,1)_20%,transparent_20%)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]" />

                    <div className="relative text-stone-900">

                    {/* Close */}
                    <button
                        type="button"
                        onClick={closeForm}
                        className="absolute top-2 right-3 text-lg font-bold"
                    >
                        ✕
                    </button>

                    {!isSubmitted ? (
                        <>
                        {/* Heading */}
                        <h2 className="font-press-start text-lg uppercase tracking-wider mb-3">
                            Schedule Call
                        </h2>

                        <p className="font-sans font-semibold text-sm mb-6">
                            Let’s discuss sponsorship.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">

                            <input
                            type="email"
                            placeholder="Enter Email"
                            required
                            className="
                                bg-white
                                border-2 border-stone-700
                                px-4 py-2
                                text-sm
                                font-semibold
                                focus:outline-none
                            "
                            />

                            <input
                            type="tel"
                            placeholder="Enter WhatsApp Number"
                            required
                            className="
                                bg-white
                                border-2 border-stone-700
                                px-4 py-2
                                text-sm
                                font-semibold
                                focus:outline-none
                            "
                            />

                            <RetroButton type="submit" className="mt-4 w-full font-bold">
                            SEND SIGNAL
                            </RetroButton>

                        </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                        <h3 className="font-press-start text-base uppercase mb-3">
                            Transmission Sent
                        </h3>
                        <p className="font-sans font-semibold text-sm">
                            Our team will contact you shortly.
                        </p>
                        </div>
                    )}
                    </div>
      </div>
    </div>
  </div>
)}

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
