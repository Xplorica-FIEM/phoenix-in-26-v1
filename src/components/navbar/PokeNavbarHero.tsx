"use client";

import AboutPhoenix from "@/app/about";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokeNavbarHero() {
    const { scrollY } = useScroll();

    /* ---------------- SCROLL ANIMATION ---------------- */

    // logo travels upward
    const logoY = useTransform(scrollY, [0, 260], [10, -280]);
    const logoScale = useTransform(scrollY, [0, 260], [1.15, 0.65]);

    // navbar fade in
    const navOpacity = useTransform(scrollY, [160, 260], [0, 1]);

    // nav links reveal
    const linkOpacity = useTransform(scrollY, [160, 260], [0, 1]);
    const leftSlide = useTransform(scrollY, [160, 260], [-60, 100]);
    const rightSlide = useTransform(scrollY, [160, 260], [60, -100]);

    // countdown fades away
    const countdownY = useTransform(scrollY, [0, 160], [0, -50]);
    const countdownOpacity = useTransform(scrollY, [0, 140], [1, 0]);

    /* ---------------- DOCK LOGO ---------------- */

    const [docked, setDocked] = useState(false);

    const [timerDocked, setTimerDocked] = useState(false);

    useEffect(() => {
        return scrollY.on("change", (y) => {
            setDocked(y > 260);
            setTimerDocked(y > 180); // timer docks earlier
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
        <div className="relative h-[220vh] text-white">
            {/* ================= STICKY NAVBAR ================= */}
            <motion.div
                style={{ opacity: navOpacity }}
                className="fixed top-0 left-0 w-full h-20 z-40"
            >
                <div className="relative h-full flex items-center justify-center mt-10">
                    {/* LEFT LINKS */}
                    <motion.div
                        style={{ opacity: linkOpacity, x: leftSlide }}
                        className="absolute left-10 flex gap-10 tracking-widest text-lg"
                    >
                        <Link
                            className="hover:text-yellow-400 transition"
                            href="#trainers"
                        >
                            TRAINERS
                        </Link>
                        <Link
                            className="hover:text-cyan-400 transition"
                            href="#gallery"
                        >
                            GALLERY
                        </Link>
                        <Link
                            className="hover:text-pink-400 transition"
                            href="#events"
                        >
                            EVENTS
                        </Link>
                    </motion.div>

                    {/* RIGHT LINKS */}
                    <motion.div
                        style={{ opacity: linkOpacity, x: rightSlide }}
                        className="absolute right-10 flex gap-10 tracking-widest text-lg"
                    >
                        <Link
                            className="hover:text-green-400 transition"
                            href="#sponsors"
                        >
                            SPONSORS
                        </Link>
                        <Link
                            className="hover:text-blue-400 transition"
                            href="#contact"
                        >
                            CONTACT
                        </Link>
                        <Link
                            className="hover:text-red-400 transition"
                            href="/games"
                        >
                            GAMES
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* ================= HERO ================= */}
            <div className="sticky top-0 h-screen pt-20">
                <div className="flex flex-col items-center justify-center h-full">
                    {/* LOGO */}
                    <Link className="flex w-full justify-center pl-9" href="/">
                        <motion.div
                            style={
                                !docked
                                    ? { y: logoY, scale: logoScale }
                                    : { scale: 0.65 } // 👈 lock final scale
                            }
                            className={
                                docked
                                    ? "fixed -top-4.5 left-1/2 -translate-x-1/2 z-50"
                                    : ""
                            }
                        >
                            <Image
                                src="/logo-text.png"
                                alt="Phoenix 2026"
                                width={420}
                                height={200}
                                priority
                            />
                        </motion.div>
                    </Link>
                    {/* COUNTDOWN */}
                    <motion.div
                        style={{ y: countdownY, opacity: countdownOpacity }}
                        className="mt-8"
                    >
                        <div className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-400/50 shadow-[0_8px_32px_0_rgba(250,204,21,0.1)]">
                            <p className="text-xs tracking-widest text-yellow-300/70 mb-1 uppercase text-center">
                                launching on
                            </p>
                            <p className="text-2xl tracking-widest text-yellow-300 font-bold font-mono">
                                {timeLeft}
                            </p>
                        </div>
                    </motion.div>
                </div>
                {/* STICKY CORNER TIMER */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: timerDocked ? 1 : 0,
                        y: timerDocked ? 0 : -10,
                    }}
                    transition={{ duration: 0.25 }}
                    className="fixed bottom-5 right-6 z-50 pointer-events-none"
                >
                    <div className="px-4 py-1 rounded-full bg-black/40 backdrop-blur-md text-sm tracking-widest text-yellow-300 border border-yellow-400/30 shadow-lg">
                        <div className="text-center">Launching on</div>
                        {timeLeft}
                    </div>
                </motion.div>
            </div>

            {/* ================= ABOUT SECTION ================= */}
            <div className="relative flex items-end justify-center -z-10 ">
                <AboutPhoenix />
            </div>
        </div>
    );
}
