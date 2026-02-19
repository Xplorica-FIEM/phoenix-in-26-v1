"use client";

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
            <span className="inline-block opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">
                [
            </span>

            <span className={`transition-colors duration-300 ${hoverColor}`}>
                {label}
            </span>

            <span className="inline-block opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">
                ]
            </span>
        </Link>
    );
};

// --- RETRO TIMER SLOT ---
const TimerSlot = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-3 group">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 border-2 border-white rounded-lg flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1">
            <div className="absolute inset-1 border-2 border-blue-800/30 rounded-md pointer-events-none" />
            <span className="font-mono text-3xl sm:text-4xl font-bold text-white drop-shadow-md z-10">
                {String(value).padStart(2, "0")}
            </span>
            <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full" />
        </div>

        <div className="mt-3 bg-yellow-400 border-2 border-black px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[10px] sm:text-xs font-bold font-mono text-black uppercase tracking-wider">
                {label}
            </span>
        </div>
    </div>
);

// --- SHARED CONTAINER ---
const Container = ({ children, className = "" }) => (
    <div className={`max-w-7xl mx-auto px-6 w-full ${className}`}>
        {children}
    </div>
);

export default function PokeNavbarHero() {
    const { scrollY } = useScroll();

    /* ---------------- LOGO ANIMATION (SMOOTH + CLAMPED) ---------------- */

    const logoY = useTransform(scrollY, [0, 260], [0, -170], {
        clamp: true,
    });

    const logoScale = useTransform(scrollY, [0, 260], [1.15, 0.7], {
        clamp: true,
    });

    /* ---------------- NAV LINKS ---------------- */

    const linkOpacity = useTransform(scrollY, [120, 260], [0, 1]);
    const leftSlide = useTransform(scrollY, [120, 260], [-100, 0]);
    const rightSlide = useTransform(scrollY, [120, 260], [100, 0]);

    /* ---------------- HERO COUNTDOWN FADE ---------------- */

    const countdownY = useTransform(scrollY, [0, 200], [0, -50]);
    const countdownOpacity = useTransform(scrollY, [0, 150], [1, 0]);

    /* ---------------- TIMER DOCK STATE ---------------- */

    const [timerDocked, setTimerDocked] = useState(false);

    useEffect(() => {
        return scrollY.on("change", (y) => {
            setTimerDocked(y > 200);
        });
    }, [scrollY]);

    /* ---------------- COUNTDOWN LOGIC ---------------- */

    const targetDate = new Date("2026-04-17T00:00:00");
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
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
        : `${String(timeLeft.days).padStart(2, "0")}d ${String(
              timeLeft.hours
          ).padStart(2, "0")}h ${String(timeLeft.minutes).padStart(
              2,
              "0"
          )}m ${String(timeLeft.seconds).padStart(2, "0")}s`;

    return (
        <div className="relative h-screen text-white font-bold font-orbitron">

            {/* ================= NAVBAR ================= */}
            <div className="fixed top-0 left-0 w-full h-48 z-50 pointer-events-none">
                <Container className="relative h-full grid grid-cols-3 items-center">

                    <motion.div
                        style={{ opacity: linkOpacity, x: leftSlide }}
                        className="flex justify-end items-center gap-8"
                    >
                        <NavButton href="/trainers" label="Trainers" hoverColor="group-hover:text-cyan-300" />
                        <NavButton href="/gallery" label="Gallery" hoverColor="group-hover:text-yellow-300" />
                        <NavButton href="/#events" label="Events" hoverColor="group-hover:text-red-400" />
                    </motion.div>

                    <div />

                    <motion.div
                        style={{ opacity: linkOpacity, x: rightSlide }}
                        className="flex justify-start items-center gap-8"
                    >
                        <NavButton href="/#sponsors" label="Sponsors" hoverColor="group-hover:text-green-300" />
                        <NavButton href="/#contact" label="Contact" hoverColor="group-hover:text-blue-300" />
                        <NavButton href="/games" label="Games" hoverColor="group-hover:text-purple-400" />
                    </motion.div>

                </Container>
            </div>

            {/* ================= HERO ================= */}
            <div className="sticky top-0 h-screen overflow-hidden z-0">

                {/* 🔥 LOGO (ALWAYS FIXED, NEVER SWITCHES) */}
                <motion.div
                    style={{ y: logoY, scale: logoScale }}
                    className="fixed top-48 left-1/2 -translate-x-1/2 origin-top z-[60] pointer-events-auto w-full max-w-[450px] px-4"
                >
                    <Link href="/" className="block">
                        <Image
                            src="/logo-text.png"
                            alt="Phoenix 2026"
                            width={450}
                            height={215}
                            priority
                            className="object-contain w-full h-auto"
                        />
                    </Link>
                </motion.div>

                {/* HERO Timer */}
                <Container className="flex flex-col items-center justify-center h-full">
                    <motion.div
                        style={{ y: countdownY, opacity: countdownOpacity }}
                        className="mt-80"
                    >
                        {!hasStarted && (
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                <TimerSlot value={timeLeft.days} label="Days" />
                                <TimerSlot value={timeLeft.hours} label="Hours" />
                                <TimerSlot value={timeLeft.minutes} label="Mins" />
                                <TimerSlot value={timeLeft.seconds} label="Secs" />
                            </div>
                        )}
                    </motion.div>
                </Container>

                {/* CORNER TIMER */}
                <motion.div
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
        </div>
    );
}
