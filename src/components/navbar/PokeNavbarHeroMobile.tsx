"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AboutPhoenix from "@/app/about";

// Define the shape of our menu items
type MenuItem = {
    label: string;
    href: string;
};

const menuItems: MenuItem[] = [
    { label: "TRAINERS", href: "#trainers" },
    { label: "GALLERY", href: "#gallery" },
    { label: "EVENTS", href: "#events" },
    { label: "SPONSORS", href: "#sponsors" },
    { label: "CONTACT", href: "#contact" },
    { label: "GAMES", href: "/games" },
];

type MenuState = "closed" | "opening" | "open" | "closing";

export default function PokeNavbarHeroMobile() {
    const [menuState, setMenuState] = useState<MenuState>("closed");

    // 3-Stage Animation Logic
    const toggleMenu = () => {
        if (menuState === "closed") {
            // Start opening sequence
            setMenuState("opening");
            setTimeout(() => {
                setMenuState("open");
            }, 150); // Delay for the 'half-open' frame
        } else if (menuState === "open") {
            // Start closing sequence
            setMenuState("closing");
            setTimeout(() => {
                setMenuState("closed");
            }, 150); // Delay for the 'half-open' frame
        }
    };

    // Determine which image to show based on state
    const getBallImage = () => {
        switch (menuState) {
            case "closed": return "/pball.png";
            case "opening": return "/pball-open.png";
            case "closing": return "/pball-open.png";
            case "open": return "/pball-open-full.png";
            default: return "/pball.png";
        }
    };

    /* ---------- TIMER LOGIC ---------- */
    const targetDate = new Date("2026-04-17T00:00:00");
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const [eventStarted, setEventStarted] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                setEventStarted(true);
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const m = Math.floor(diff / (1000 * 60)) % 60;
            const s = Math.floor(diff / 1000) % 60;

            setTimeLeft({ d, h, m, s });
        };

        updateTimer();
        const i = setInterval(updateTimer, 1000);
        return () => clearInterval(i);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center text-white overflow-hidden font-press-start">
            
            {/* BACKGROUND PATTERN (Grid Line effect) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
            />

            {/* TOP HEADER BAR */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-red-600 border-b-4 border-red-800 z-50 shadow-md flex items-center justify-between px-4">
                {/* LOGO TEXT - Restored */}
                <Link href="/" className="relative z-50 mt-2">
                    <Image
                        src="/logo-text.png"
                        alt="Phoenix 2026"
                        width={140}
                        height={60}
                        className="object-contain drop-shadow-md"
                        priority
                    />
                </Link>

                {/* MENU TOGGLE BUTTON - No Rotation, frame-by-frame animation */}
                <button 
                    onClick={toggleMenu}
                    className="relative z-50 group active:translate-y-1 transition-transform outline-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    <div className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center transition-colors duration-200 ${menuState === 'open' ? 'bg-gray-800' : 'bg-white'} shadow-[2px_2px_0px_rgba(0,0,0,0.5)]`}>
                        <Image
                            src={getBallImage()}
                            alt="Menu"
                            width={36}
                            height={36}
                            className="object-contain"
                            priority
                            unoptimized // Optional: helps with crisp pixel art if image is small
                        />
                    </div>
                </button>
            </div>

            {/* SPACER FOR FIXED HEADER */}
            <div className="h-28 w-full" />

            {/* RETRO TIMER BOX (Save Screen Style) */}
            <div className="z-10 w-[90%] max-w-sm mb-8">
                <div className="bg-blue-600 border-2 border-white rounded-lg p-1 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                    <div className="bg-blue-500 border-2 border-blue-800 rounded p-4 flex flex-col items-center">
                        <h3 className="text-xs text-yellow-300 mb-2 uppercase tracking-widest drop-shadow-md">
                            Time Until Launch
                        </h3>
                        <div className="flex gap-2 text-white font-mono font-bold text-lg md:text-xl drop-shadow-sm">
                            {eventStarted ? (
                                <span className="text-red-300 animate-pulse">EVENT STARTED</span>
                            ) : (
                                <>
                                    <div className="flex flex-col items-center">
                                        <span>{String(timeLeft.d).padStart(2, '0')}</span>
                                        <span className="text-[8px] text-blue-200">DAY</span>
                                    </div>
                                    <span>:</span>
                                    <div className="flex flex-col items-center">
                                        <span>{String(timeLeft.h).padStart(2, '0')}</span>
                                        <span className="text-[8px] text-blue-200">HR</span>
                                    </div>
                                    <span>:</span>
                                    <div className="flex flex-col items-center">
                                        <span>{String(timeLeft.m).padStart(2, '0')}</span>
                                        <span className="text-[8px] text-blue-200">MIN</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ABOUT SECTION WRAPPER */}
            <div className="w-full px-4 pb-20 z-0">
                <AboutPhoenix
                    titleSize="text-2xl"
                    textSize="text-sm"
                    iconSize={20}
                />
            </div>

            {/* === RETRO OVERLAY MENU === */}
            <AnimatePresence>
                {menuState === "open" && (
                    <>
                        {/* Dimmed Background */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => toggleMenu()}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        />

                        {/* The "Start Menu" Box - Slides in from Right */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-24 right-4 z-50 w-48"
                        >
                            <div className="bg-white border-2 border-gray-700 rounded-md shadow-[6px_6px_0px_rgba(0,0,0,0.5)] overflow-hidden">
                                {/* Header of the Menu Box */}
                                <div className="bg-gray-100 border-b-2 border-gray-300 p-2">
                                    <p className="text-black text-xs font-bold">MENU</p>
                                </div>
                                
                                {/* Menu List */}
                                <div className="flex flex-col py-1">
                                    {menuItems.map((item) => (
                                        <Link 
                                            key={item.label} 
                                            href={item.href}
                                            onClick={() => toggleMenu()}
                                            className="group relative px-4 py-3 hover:bg-blue-500 transition-colors cursor-pointer"
                                        >
                                            {/* The Retro Arrow Cursor */}
                                            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-black font-bold opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity">
                                                ▶
                                            </span>
                                            
                                            <span className="text-xs font-bold text-gray-800 ml-2 group-hover:text-white font-press-start">
                                                {item.label}
                                            </span>
                                        </Link>
                                    ))}
                                    
                                    {/* Close Option */}
                                    <button 
                                        onClick={() => toggleMenu()}
                                        className="group relative px-4 py-3 hover:bg-red-500 text-left transition-colors border-t-2 border-gray-100 w-full"
                                    >
                                        <span className="absolute left-1 top-1/2 -translate-y-1/2 text-black font-bold opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity">
                                            ▶
                                        </span>
                                        <span className="text-xs font-bold text-gray-800 ml-2 group-hover:text-white font-press-start">
                                            CLOSE
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}