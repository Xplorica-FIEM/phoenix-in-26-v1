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
import AboutPhoenix from "@/app/about";

/* ================= MENU CONFIG ================= */

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
        <div className="relative min-h-[200vh] flex flex-col items-center text-white overflow-hidden font-press-start">

            {/* ================= NAVBAR ================= */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-red-600 border-b-4 border-red-800 z-50 shadow-md flex items-center px-4">

                {/* LEFT: Docked Logo Appears */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isDocked ? 1 : 0,
                        y: isDocked ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="z-50"
                >
                    <Link href="/">
                        <Image
                            src="/logo-text.png"
                            alt="Phoenix 2026"
                            width={110}
                            height={45}
                            className="object-contain"
                        />
                    </Link>
                </motion.div>

                {/* CENTER: Pokeball */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <button
                        onClick={toggleMenu}
                        className="relative z-50 active:translate-y-1 transition-transform"
                    >
                        <div
                            className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center transition-colors duration-200 ${
                                menuState === "open"
                                    ? "bg-gray-800"
                                    : "bg-white"
                            } shadow-[2px_2px_0px_rgba(0,0,0,0.5)]`}
                        >
                            <Image
                                src={getBallImage()}
                                alt="Menu"
                                width={36}
                                height={36}
                                unoptimized
                            />
                        </div>
                    </button>
                </div>

                {/* RIGHT: Bigger Mini Timer */}
                <motion.div
                    style={{ opacity: miniTimerOpacity }}
                    className="ml-auto"
                >
                    <div className="bg-blue-600 border-2 border-white rounded px-3 py-2 shadow-[3px_3px_0px_rgba(0,0,0,0.6)]">
                        <span className="font-mono font-bold text-sm tracking-wider">
                            {miniTimerString}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Spacer */}
            <div className="h-24 w-full" />

            {/* ================= HERO ================= */}
            <div className="sticky top-20 h-[70vh] w-full flex flex-col items-center justify-center">

                <motion.div
                    style={{ y: logoY, scale: logoScale }}
                    className="origin-top mb-6"
                >
                    <Image
                        src="/logo-text.png"
                        alt="Phoenix 2026"
                        width={260}
                        height={120}
                        className="object-contain drop-shadow-xl"
                        priority
                    />
                </motion.div>

                <motion.div
                    style={{ opacity: timerOpacity, y: timerY }}
                    className="w-[90%] max-w-sm"
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

            {/* ================= ABOUT ================= */}
            <div className="w-full px-4 pb-20">
                <AboutPhoenix
                    titleSize="text-2xl"
                    textSize="text-sm"
                    iconSize={20}
                />
            </div>

            {/* ================= DROPDOWN ================= */}
            <AnimatePresence>
                {menuState === "open" && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-56"
                        >
                            <div className="bg-white border-2 border-gray-700 rounded-md shadow-[6px_6px_0px_rgba(0,0,0,0.5)] overflow-hidden">
                                <div className="bg-gray-100 border-b-2 border-gray-300 p-2">
                                    <p className="text-black text-xs font-bold">
                                        MENU
                                    </p>
                                </div>

                                <div className="flex flex-col py-1">
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={toggleMenu}
                                            className="px-4 py-3 hover:bg-blue-500 hover:text-white text-xs font-bold text-gray-800"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                    <button
                                        onClick={toggleMenu}
                                        className="px-4 py-3 hover:bg-red-500 hover:text-white text-xs font-bold text-gray-800 border-t-2 border-gray-100 text-left"
                                    >
                                        CLOSE
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
