"use client";

import AboutPhoenix from "@/app/about";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- REUSABLE NAV BUTTON ---
const NavButton = ({ href, label, hoverColor }) => {
    return (
        <Link
            href={href}
            className="group inline-flex items-center justify-center pointer-events-auto text-white font-bold text-lg tracking-widest uppercase font-orbitron transition-all duration-300 hover:scale-110"
        >
            {/* Left Bracket */}
            <span className="inline-block opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">
                [
            </span>
            
            {/* The Text */}
            <span className={`transition-colors duration-300 ${hoverColor}`}>
                {label}
            </span>

            {/* Right Bracket */}
            <span className="inline-block opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">
                ]
            </span>
        </Link>
    );
};

// --- RETRO POKEMON TIMER COMPONENT ---
const TimerSlot = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-3 group">
        
        {/* The Retro Blue Box (Gen 3 Menu Style) */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 border-2 border-white rounded-lg flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1">
            
            {/* Inner Dark Blue Shadow/Inset */}
            <div className="absolute inset-1 border-2 border-blue-800/30 rounded-md pointer-events-none" />
            
            {/* The Number */}
            <span className="font-mono text-3xl sm:text-4xl font-bold text-white drop-shadow-md z-10">
                {String(value).padStart(2, '0')}
            </span>

            {/* Corner Highlight (Shiny Effect) */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full" />
        </div>

        {/* The Label Badge */}
        <div className="mt-3 bg-yellow-400 border-2 border-black px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[10px] sm:text-xs font-bold font-mono text-black uppercase tracking-wider">
                {label}
            </span>
        </div>
    </div>
);

export default function PokeNavbarHero() {
    const { scrollY } = useScroll();

    /* ---------------- SCROLL ANIMATION CONFIG ---------------- */

    // 1. Logo Animation
    const logoY = useTransform(scrollY, [0, 260], [0, -280]);
    const logoScale = useTransform(scrollY, [0, 260], [1.2, 0.6]);

    // 2. Links Animation
    const linkOpacity = useTransform(scrollY, [120, 260], [0, 1]);
    const leftSlide = useTransform(scrollY, [120, 260], [-100, 0]);
    const rightSlide = useTransform(scrollY, [120, 260], [100, 0]);

    // 3. Hero Countdown Fade Out
    const countdownY = useTransform(scrollY, [0, 200], [0, -50]);
    const countdownOpacity = useTransform(scrollY, [0, 150], [1, 0]);

    /* ---------------- LOGIC STATE ---------------- */
    const [docked, setDocked] = useState(false);
    const [timerDocked, setTimerDocked] = useState(false);

    useEffect(() => {
        return scrollY.on("change", (y) => {
            setDocked(y > 260);
            setTimerDocked(y > 200);
        });
    }, [scrollY]);

    /* ---------------- COUNTDOWN TIMER ---------------- */
    const targetDate = new Date("2026-04-17T00:00:00");
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            if (diff <= 0) {
                setHasStarted(true);
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const seconds = Math.floor(diff / 1000) % 60;
            
            setTimeLeft({ days, hours, minutes, seconds });
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const dockedTimerString = hasStarted 
        ? "EVENT STARTED" 
        : `${String(timeLeft.days).padStart(2,'0')}d ${String(timeLeft.hours).padStart(2,'0')}h ${String(timeLeft.minutes).padStart(2,'0')}m ${String(timeLeft.seconds).padStart(2,'0')}s`;

    return (
        <div className="relative min-h-[220vh] text-white font-bold font-orbitron">
            
            {/* ================= NAVBAR CONTAINER ================= */}
            {/* Z-50: Above Everything */}
            <div className="fixed top-0 left-0 w-full h-48 z-50 pointer-events-none">
                <div className="relative h-full w-full max-w-[1920px] mx-auto px-4 flex items-center justify-between">
                    
                    {/* LEFT LINKS */}
                    <motion.div
                        style={{ opacity: linkOpacity, x: leftSlide }}
                        className="flex-1 flex justify-end items-center gap-8 pr-4" 
                    >
                        <NavButton href="#trainers" label="Trainers" hoverColor="group-hover:text-cyan-300" />
                        <NavButton href="#gallery" label="Gallery" hoverColor="group-hover:text-yellow-300" />
                        <NavButton href="#events" label="Events" hoverColor="group-hover:text-red-400" />
                    </motion.div>

                    {/* SPACER */}
                    <div className="w-[420px] h-full shrink-0" />

                    {/* RIGHT LINKS */}
                    <motion.div
                        style={{ opacity: linkOpacity, x: rightSlide }}
                        className="flex-1 flex justify-start items-center gap-8 pl-4"
                    >
                        <NavButton href="#sponsors" label="Sponsors" hoverColor="group-hover:text-green-300" />
                        <NavButton href="#contact" label="Contact" hoverColor="group-hover:text-blue-300" />
                        <NavButton href="/games" label="Games" hoverColor="group-hover:text-purple-400" />
                    </motion.div>
                </div>
            </div>

            {/* ================= HERO SECTION ================= */}
            {/* Z-0: Base Layer (Sticky) */}
            <div className="sticky top-0 h-screen pt-20 overflow-hidden z-0">
                <div className="flex flex-col items-center justify-center h-full w-full">
                    
                    {/* LOGO */}
                    {/* Z-60: Highest Priority */}
                    <Link className="z-[60]" href="/">
                        <motion.div
                            style={
                                !docked
                                    ? { y: logoY, scale: logoScale }
                                    : { scale: 0.7 } 
                            }
                            className={
                                docked
                                    ? "fixed -top-4 left-1/2 -translate-x-1/2 pointer-events-auto" 
                                    : "relative pointer-events-auto"
                            }
                        >
                            <Image
                                src="/logo-text.png"
                                alt="Phoenix 2026"
                                width={450}
                                height={215}
                                priority
                                className="object-contain"
                            />
                        </motion.div>
                    </Link>

                    {/* HERO COUNTDOWN (RETRO THEMED) */}
                    <motion.div
                        style={{ y: countdownY, opacity: countdownOpacity }}
                        className="mt-12"
                    >
                        <div className="px-10 py-5 text-center flex flex-col items-center">
                            
                            {/* Retro Dialog Box Text */}
                            <div className="mb-8 bg-white border-2 border-black rounded-lg px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                                <p className="text-black font-bold font-mono text-sm sm:text-base uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
                                    Launching In
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
                                </p>
                            </div>

                            {hasStarted ? (
                                <p className="text-4xl text-yellow-300 font-bold font-mono animate-pulse drop-shadow-md">
                                    EVENT HAS BEGUN
                                </p>
                            ) : (
                                // THEMED TIMER
                                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                                    <TimerSlot value={timeLeft.days} label="Days" />
                                    <TimerSlot value={timeLeft.hours} label="Hours" />
                                    <TimerSlot value={timeLeft.minutes} label="Mins" />
                                    <TimerSlot value={timeLeft.seconds} label="Secs" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* FLOATING CORNER TIMER (Pixel Style) */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: timerDocked ? 1 : 0,
                        y: timerDocked ? 0 : 20,
                    }}
                    transition={{ duration: 0.4 }}
                    className="fixed bottom-6 right-6 z-50 pointer-events-none"
                >
                    <div className="px-4 py-2 bg-blue-600 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white font-mono font-bold text-sm tracking-widest rounded-sm">
                        {dockedTimerString}
                    </div>
                </motion.div>
            </div>

            {/* ================= CONTENT / ABOUT ================= */}
            {/* Z-20: Middle Layer (Scrolls over Hero) */}
            {/* bg-black is required here to visually cover the sticky hero text */}
            <div className="relative flex items-end justify-center -z-10 pb-20">
                <AboutPhoenix />
            </div>
        </div>
    );
}