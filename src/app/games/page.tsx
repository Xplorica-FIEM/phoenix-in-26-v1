'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GamesPage() {
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements to match the vibe */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10">
                <Image
                    src="/logo-text.png"
                    alt="Phoenix Logo"
                    width={800}
                    height={400}
                    className="object-contain"
                />
            </div>

            <div className="z-10 flex flex-col items-center max-w-4xl w-full text-center space-y-8">
                {/* Retro Arcade Icon/Image */}
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        rotate: [-2, 2, -2]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative w-32 h-32 md:w-48 md:h-48"
                >
                    <Image
                        src="/pball.png"
                        alt="Games Coming Soon"
                        fill
                        className="object-contain drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]"
                    />
                </motion.div>

                {/* Main Heading */}
                <h1 className="text-3xl md:text-6xl font-press-start text-yellow-400 drop-shadow-[4px_4px_0px_#a16207] leading-tight">
                    ARCADE<br />MODE
                </h1>

                {/* Coming Soon Text */}
                <div className="bg-red-600 border-4 border-black px-6 py-4 md:px-10 md:py-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] animate-pulse">
                    <span className="text-xl md:text-4xl font-black text-white font-press-start uppercase tracking-widest">
                        Coming Soon
                    </span>
                </div>

                {/* Description */}
                <p className="max-w-xl text-emerald-400 font-mono text-sm md:text-lg leading-relaxed uppercase tracking-tighter">
                    The Phoenix Arcade is currently undergoing maintenance.
                    <br />
                    Prepare for high-performance mini-games, leaderboards, and digital rewards
                    launching in the next synchronization.
                </p>

                {/* Placeholder interaction */}
                <div className="mt-8 flex gap-4">
                    <div className="h-3 w-3 rounded-full bg-red-600 animate-ping" />
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 font-press-start uppercase tracking-[0.3em]">
                        Standby for signal...
                    </span>
                </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-10 left-10 text-emerald-500/30 font-mono text-[8px] uppercase hidden md:block">
                SYS_LOADING: PREPARING_GAMELOGS...<br />
                BUFFER_STATUS: 87%
            </div>
            <div className="absolute bottom-10 right-10 text-emerald-500/30 font-mono text-[8px] uppercase hidden md:block">
                PHOENIX_ARCADE_V2.0<br />
                AUTHORIZED_ENTRIES_ONLY
            </div>
        </section>
    );
}
