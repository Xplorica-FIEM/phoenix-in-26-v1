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
import { ChevronDown } from "lucide-react";
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

/* ================= COMPONENTS ================= */

const TimerSlot = ({ value, label }: { value: string | number; label: string }) => (
    <div className="flex flex-col items-center mx-1 group">
        <div className="relative w-14 h-14 bg-blue-600 border-[3px] border-white rounded-lg flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-1 border-2 border-blue-800/30 rounded-md pointer-events-none" />
            <span className="font-mono text-2xl font-bold text-white drop-shadow-md z-10">
                {String(value).padStart(2, "0")}
            </span>
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/40 rounded-full" />
        </div>

        <div className="mt-2 bg-yellow-400 border-[1.5px] border-black px-1.5 py-0.5 rounded-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[8px] font-bold font-mono text-black uppercase tracking-wider">
                {label}
            </span>
        </div>
    </div>
);

const targetDate = new Date("2026-04-17T00:00:00");

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
            const nextDocked = y > 200;
            setIsDocked((prev) => {
                if (prev !== nextDocked) return nextDocked;
                return prev;
            });
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

    /* ================= TIMER ================= */

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
            <div className={`fixed top-0 left-0 right-0 h-20 z-50 transition-colors duration-300 flex items-center px-4 ${isDocked ? "bg-transparent" : "bg-transparent"
                }`}>

                {/* LEFT: Pokeball Button */}
                <button
                    onClick={toggleMenu}
                    className={`relative z-50 w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] active:translate-y-1 transition-all ${isDocked ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                    <motion.div
                        animate={menuState === "closed" ? {
                            rotate: [0, -20, 20, -20, 20, 0],
                            transition: {
                                duration: 0.6,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                                ease: "easeInOut"
                            }
                        } : { rotate: 0 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <Image
                            src={getBallImage()}
                            alt="Menu"
                            width={28}
                            height={28}
                            unoptimized
                            className="object-contain"
                        />
                    </motion.div>
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
                    className="origin-top mb-12 w-full max-w-[280px]"
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
                    className="flex justify-center w-full mt-4"
                >
                    {eventStarted ? (
                        <div className="bg-blue-600 border-2 border-white rounded-lg px-6 py-4 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                            <span className="text-red-300 font-bold uppercase animate-pulse">
                                EVENT STARTED
                            </span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <TimerSlot value={timeLeft.d} label="Days" />
                            <TimerSlot value={timeLeft.h} label="Hours" />
                            <TimerSlot value={timeLeft.m} label="Mins" />
                            <TimerSlot value={timeLeft.s} label="Secs" />
                        </div>
                    )}
                </motion.div>

                {/* SCROLL INDICATOR */}
                <motion.div
                    style={{ opacity: timerOpacity }}
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                >
                    <motion.div
                        animate={{
                            y: [0, 20],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="flex flex-col items-center -space-y-4"
                    >
                        <ChevronDown size={28} strokeWidth={2.5} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]" />
                        <ChevronDown size={28} strokeWidth={2.5} className="text-yellow-400/40" />
                    </motion.div>
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
