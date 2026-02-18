"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AboutPhoenix from "@/app/about";

type BallState = "closed" | "opening" | "open" | "closing";

export default function PokeNavbarHeroMobile() {
    const [ballState, setBallState] = useState<BallState>("closed");
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        if (ballState === "closed") {
            setBallState("opening");

            setTimeout(() => {
                setBallState("open");
                setMenuVisible(true);
            }, 220);
        } else if (ballState === "open") {
            setBallState("closing");
            setMenuVisible(false);

            setTimeout(() => {
                setBallState("closed");
            }, 220);
        }
    };

    /* ---------- TIMER ---------- */

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

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const m = Math.floor(diff / (1000 * 60)) % 60;
            const s = Math.floor(diff / 1000) % 60;

            setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
        };

        updateTimer();
        const i = setInterval(updateTimer, 1000);
        return () => clearInterval(i);
    }, []);

    /* ---------- BALL IMAGE ---------- */

    const ballSrc =
        ballState === "closed"
            ? "/pball.png"
            : ballState === "opening"
              ? "/pball-open.png"
              : ballState === "closing"
                ? "/pball-open.png"
                : "/pball-open-full.png";

    return (
        <div className="relative min-h-screen flex flex-col items-center text-white overflow-hidden px-6">
            {/* TOP BAR */}
            <div className="fixed top-4 left-4 right-4 flex items-center justify-between z-50">
                {/* LEFT LOGO */}
                <Link className="flex w-full justify-center pl-9" href="/">
                    <Image
                        src="/logo-text.png"
                        alt="Phoenix"
                        width={120}
                        height={50}
                        priority
                    />
                </Link>

                {/* POKEBALL */}
                <motion.button onClick={toggleMenu}>
                    <motion.div
                        animate={{
                            scale: 1,
                        }}
                        transition={{ duration: 0.25 }}
                    >
                        <Image
                            src={ballSrc}
                            alt="menu"
                            width={46}
                            height={46}
                            priority
                        />
                    </motion.div>
                </motion.button>
            </div>

            {/* SPACING BELOW HEADER */}
            <div className="h-50" />

            {/* TIMER */}
            <div className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-400/40">
                <p className="text-xs tracking-widest text-yellow-300/70 uppercase text-center">
                    launching on
                </p>
                <p className="text-lg tracking-widest text-yellow-300 font-bold font-mono">
                    {timeLeft}
                </p>
            </div>

            {/* ABOUT */}
            <div className="mt-16">
                <AboutPhoenix
                    titleSize="text-3xl"
                    textSize="text-base"
                    iconSize={24}
                />
            </div>

            {/* FULLSCREEN MENU */}
            <AnimatePresence>
                {menuVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/92 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl tracking-widest"
                    >
                        {[
                            { label: "TRAINERS", href: "#trainers" },
                            { label: "GALLERY", href: "#gallery" },
                            { label: "EVENTS", href: "#events" },
                            { label: "SPONSORS", href: "#sponsors" },
                            { label: "CONTACT", href: "#contact" },
                            { label: "GAMES", href: "/games" }, // ← special one you wanted
                        ].map((item) => (
                            <Link key={item.label} href={item.href}>
                                <motion.span whileTap={{ scale: 0.9 }}>
                                    {item.label}
                                </motion.span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
