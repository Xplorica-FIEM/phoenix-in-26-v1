"use client";

import AboutPhoenix from "@/app/about";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- REUSABLE NAV BUTTON (Kept your specific styling) ---
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

export default function PokeNavbarHero() {
    const { scrollY } = useScroll();

    /* ---------------- SCROLL ANIMATION CONFIG ---------------- */

    // 1. Logo Animation
    const logoY = useTransform(scrollY, [0, 260], [0, -280]); 
    const logoScale = useTransform(scrollY, [0, 260], [1.2, 0.6]); 

    // 2. Links Animation (Slide in towards center)
    const linkOpacity = useTransform(scrollY, [120, 260], [0, 1]);
    const leftSlide = useTransform(scrollY, [120, 260], [-100, 0]); // Slide Right
    const rightSlide = useTransform(scrollY, [120, 260], [100, 0]); // Slide Left

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
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeLeft("Event has begun");
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const seconds = Math.floor(diff / 1000) % 60;
            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-[220vh] text-white font-orbitron">
            
            {/* ================= NAVBAR CONTAINER ================= */}
            {/* No backgrounds, no filters. Just a transparent container. */}
            <div className="fixed top-0 left-0 w-full h-24 z-40 pointer-events-none">
                
                {/* Flex Container for Aligning Links around the Logo */}
                <div className="relative h-full w-full max-w-[1920px] mx-auto px-4 flex items-center justify-between">
                    
                    {/* LEFT LINKS GROUP */}
                    <motion.div
                        style={{ opacity: linkOpacity, x: leftSlide }}
                        className="flex-1 flex justify-end gap-8 pr-6"
                    >
                        <NavButton href="#trainers" label="Trainers" hoverColor="group-hover:text-cyan-300" />
                        <NavButton href="#gallery" label="Gallery" hoverColor="group-hover:text-yellow-300" />
                        <NavButton href="#events" label="Events" hoverColor="group-hover:text-red-400" />
                    </motion.div>

                    {/* INVISIBLE SPACER: Reserves the exact space for the logo in the center */}
                    <div className="w-[350px] h-full shrink-0" />

                    {/* RIGHT LINKS GROUP */}
                    <motion.div
                        style={{ opacity: linkOpacity, x: rightSlide }}
                        className="flex-1 flex justify-start gap-8 pl-6"
                    >
                        <NavButton href="#sponsors" label="Sponsors" hoverColor="group-hover:text-green-300" />
                        <NavButton href="#contact" label="Contact" hoverColor="group-hover:text-blue-300" />
                        <NavButton href="/games" label="Games" hoverColor="group-hover:text-purple-400" />
                    </motion.div>
                </div>
            </div>

            {/* ================= HERO SECTION ================= */}
            <div className="sticky top-0 h-screen pt-20 overflow-hidden">
                <div className="flex flex-col items-center justify-center h-full w-full">
                    
                    {/* LOGO */}
                    <Link className="z-50" href="/">
                        <motion.div
                            style={
                                !docked
                                    ? { y: logoY, scale: logoScale }
                                    : { scale: 0.6 } // Lock final scale
                            }
                            className={
                                docked
                                    ? "fixed top-0 left-1/2 -translate-x-1/2 mt-2"
                                    : "relative"
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

                    {/* HERO COUNTDOWN */}
                    <motion.div
                        style={{ y: countdownY, opacity: countdownOpacity }}
                        className="mt-10"
                    >
                        <div className="px-10 py-5 text-center">
                            <p className="text-xs tracking-[0.3em] text-yellow-100/60 mb-2 uppercase">
                                Launch Sequence Initiated
                            </p>
                            <p className="text-4xl sm:text-5xl tracking-widest text-yellow-300 font-bold font-mono">
                                {timeLeft}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* FLOATING CORNER TIMER */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: timerDocked ? 1 : 0,
                        y: timerDocked ? 0 : 20,
                    }}
                    transition={{ duration: 0.4 }}
                    className="fixed bottom-6 right-6 z-50 pointer-events-none"
                >
                    <div className="text-sm tracking-widest text-yellow-300 font-mono font-bold">
                        {timeLeft}
                    </div>
                </motion.div>
            </div>

            {/* ================= CONTENT / ABOUT ================= */}
            <div className="relative flex items-end justify-center -z-10 pb-20">
                <AboutPhoenix />
            </div>
        </div>
    );
}