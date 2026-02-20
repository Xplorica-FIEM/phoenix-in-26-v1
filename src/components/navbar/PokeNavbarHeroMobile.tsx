"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from "framer-motion";
import Link from "next/link";
/* ================= MENU CONFIG ================= */

type MenuItem = {
    label: string;
    href: string;
};

const menuItems: MenuItem[] = [
    { label: "MEMBERS", href: "/trainers" },
    { label: "GALLERY", href: "/gallery" },
    { label: "EVENTS", href: "/#events" },
    { label: "SPONSORS", href: "/#sponsors" },
    { label: "CONTACT", href: "/#contact" },
    { label: "GAMES", href: "/games" },
];

type MenuState = "closed" | "opening" | "open" | "closing";

export default function PokeNavbarHeroMobile() {
    const [menuState, setMenuState] = useState<MenuState>("closed");
    const [isDocked, setIsDocked] = useState(false);

    /* ================= SCROLL ================= */

    const { scrollY } = useScroll();

    const logoY = useTransform(scrollY, [0, 220], [0, -140], { clamp: true });
    const logoScale = useTransform(scrollY, [0, 220], [1.2, 0.75], { clamp: true });

    const timerOpacity = useTransform(scrollY, [0, 150], [1, 0], { clamp: true });
    const timerY = useTransform(scrollY, [0, 150], [0, -30], { clamp: true });

    const miniTimerOpacity = useTransform(scrollY, [180, 260], [0, 1], {
        clamp: true,
    });

    useEffect(() => {
        return scrollY.on("change", (y) => {
            setIsDocked(y > 200);
        });
    }, [scrollY]);

    /* ================= MENU ================= */

    const toggleMenu = () => {
        if (menuState === "closed") {
            setMenuState("opening");
            setTimeout(() => setMenuState("open"), 100);
        } else if (menuState === "open") {
            setMenuState("closing");
            setTimeout(() => setMenuState("closed"), 100);
        }
    };

    const getBallImage = () => {
        switch (menuState) {
            case "closed":
                return "/pball.png";
            case "opening":
            case "closing":
                return "/pball-open.png";
            case "open":
                return "/pball-open-full.png";
            default:
                return "/pball.png";
        }
    };

    /* ================= TIMER ================= */

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

    const miniTimerString = eventStarted
        ? "LIVE"
        : `${String(timeLeft.d).padStart(2, "0")}D ${String(
            timeLeft.h
        ).padStart(2, "0")}H`;

    /* ================= RENDER ================= */

    return (
        <div className="relative h-screen flex flex-col items-center text-white overflow-hidden font-press-start">

            {/* ================= NAVBAR ================= */}
            <div className={`fixed top-0 left-0 right-0 h-20 z-50 transition-colors duration-300 flex items-center px-4 ${isDocked ? "bg-red-600 border-b-4 border-red-800 shadow-lg" : "bg-transparent"
                }`}>

                {/* LEFT: Pokeball Button */}
                <button
                    onClick={toggleMenu}
                    className={`relative z-50 w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] active:translate-y-1 transition-all ${isDocked ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <Image
                        src={getBallImage()}
                        alt="Menu"
                        width={28}
                        height={28}
                        unoptimized
                        className="object-contain"
                    />
                </button>

                {/* CENTER: Logo */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isDocked ? 1 : 0,
                        y: isDocked ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 z-50"
                >
                    <Link
                        href="/"
                        onClick={(e) => {
                            if (window.location.pathname === "/") {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                    >
                        <Image
                            src="/logo-text.png"
                            alt="Phoenix 2026"
                            width={110}
                            height={45}
                            className="object-contain"
                        />
                    </Link>
                </motion.div>

                {/* RIGHT: Mini Timer */}
                <motion.div
                    style={{ opacity: miniTimerOpacity }}
                    className="ml-auto"
                >
                    <div className="bg-blue-600 border-2 border-white rounded px-2 py-1 shadow-[2px_2px_0px_rgba(0,0,0,0.6)]">
                        <span className="font-mono font-bold text-[10px] tracking-tighter">
                            {miniTimerString}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Spacer */}
            <div className="h-24 w-full" />

            {/* ================= HERO ================= */}
            <div className="sticky top-20 h-screen w-full flex flex-col items-center justify-center px-4">

                <motion.div
                    style={{ y: logoY, scale: logoScale }}
                    className="origin-top mb-20 w-full max-w-[280px]"
                >
                    <Image
                        src="/logo-text.png"
                        alt="Phoenix 2026"
                        width={260}
                        height={120}
                        className="object-contain drop-shadow-xl w-full h-auto"
                        priority
                    />
                </motion.div>

                <motion.div
                    style={{ opacity: timerOpacity, y: timerY }}
                    className="w-full max-w-sm mt-8 px-4"
                >
                    <div className="bg-blue-600 border-2 border-white rounded-lg p-1 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                        <div className="bg-blue-500 border-2 border-blue-800 rounded p-4 flex flex-col items-center">
                            <h3 className="text-xs text-yellow-300 mb-2 uppercase tracking-widest">
                                Time Until Launch
                            </h3>

                            {eventStarted ? (
                                <span className="text-red-300 animate-pulse">
                                    EVENT STARTED
                                </span>
                            ) : (
                                <div className="flex gap-2 text-white font-mono font-bold text-lg">
                                    {String(timeLeft.d).padStart(2, "0")}:
                                    {String(timeLeft.h).padStart(2, "0")}:
                                    {String(timeLeft.m).padStart(2, "0")}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ================= DROPDOWN ================= */}
            {/* ================= FULLSCREEN MENU ================= */}
            <AnimatePresence>
                {menuState === "open" && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 left-0 right-0 bottom-0 z-40 bg-black/70 backdrop-blur-sm"
                        onClick={toggleMenu}
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="h-full w-full bg-white"
                        >
                            {/* HEADER */}
                            <div className="h-14 bg-gray-100 border-b-2 border-gray-300 flex items-center px-4">
                                <p className="text-black text-xs font-bold tracking-widest">
                                    MENU
                                </p>
                            </div>

                            {/* MENU ITEMS */}
                            <div className="flex flex-col divide-y divide-gray-200">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={toggleMenu}
                                        className="px-6 py-5 text-sm font-bold text-gray-800 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
