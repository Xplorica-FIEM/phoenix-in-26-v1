"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type MenuState = "closed" | "opening" | "open" | "closing";

const links = [
    { href: "/trainers", label: "MEMBERS", color: "cyan" },
    { href: "/gallery", label: "GALLERY", color: "yellow" },
    { href: "/#events", label: "EVENTS", color: "red" },
    { href: "/#sponsors", label: "SPONSORS", color: "cyan" },
    { href: "/#contact", label: "CONTACT", color: "yellow" },
    { href: "/games", label: "GAMES", color: "red" },
];

const colorClasses: Record<string, string> = {
    cyan: "group-hover:text-cyan-300",
    yellow: "group-hover:text-yellow-300",
    red: "group-hover:text-red-400",
};

export default function UnifiedNavbar({ isScrolled = true }: { isScrolled?: boolean }) {
    const pathname = usePathname();
    const [menuState, setMenuState] = useState<MenuState>("closed");
    const isOpen = menuState === "open" || menuState === "opening";

    const toggleMenu = () => {
        setMenuState((prev) =>
            prev === "closed" ? "opening" : prev === "open" ? "closing" : prev,
        );
    };

    const closeMenu = () => setMenuState("closing");

    useEffect(() => {
        if (menuState === "opening") {
            const t = setTimeout(() => setMenuState("open"), 300);
            return () => clearTimeout(t);
        }
        if (menuState === "closing") {
            const t = setTimeout(() => setMenuState("closed"), 300);
            return () => clearTimeout(t);
        }
    }, [menuState]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    const pokeballSrc =
        menuState === "open"
            ? "/pball-open-full.png"
            : menuState === "opening" || menuState === "closing"
                ? "/pball-open.png"
                : "/pball.png";

    return (
        <nav className="w-full select-none font-press-start">
            {/* MOBILE NAVBAR (Red Header Style) */}
            <div className={`flex md:hidden fixed top-0 left-0 right-0 h-20 items-center px-4 z-[100] transition-colors duration-300 ${isScrolled ? "bg-red-600 border-b-4 border-red-800 shadow-lg" : "bg-transparent"
                }`}>
                {/* Pokeball Button on Left */}
                <button
                    onClick={toggleMenu}
                    className={`relative w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] active:translate-y-1 transition-transform ${!isOpen ? "animate-wiggle" : ""
                        }`}
                >
                    <Image
                        src={pokeballSrc}
                        alt="Menu"
                        width={28}
                        height={28}
                        unoptimized
                        className="object-contain"
                    />
                </button>

                {/* Centered Logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link href="/" onClick={closeMenu}>
                        <Image
                            src="/logo-text.png"
                            alt="Phoenix 2026"
                            width={110}
                            height={45}
                            className="object-contain"
                        />
                    </Link>
                </div>

                {/* Empty right slot for balance */}
                <div className="ml-auto w-12" />
            </div>

            {/* DESKTOP NAVBAR (Centered Logo Style) */}
            <div className={`hidden md:flex fixed top-0 left-0 right-0 h-24 items-center justify-center gap-6 px-10 transition-all duration-300 z-[100] ${isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-xl" : "bg-transparent"
                }`}>
                {links.slice(0, 3).map((link) => (
                    <DesktopItem key={link.href} {...link} />
                ))}

                <Link href="/" className="relative w-48 h-20 mx-4 drop-shadow-2xl transition-transform hover:scale-105 active:scale-95">
                    <Image
                        src="/logo-text.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </Link>

                {links.slice(3).map((link) => (
                    <DesktopItem key={link.href} {...link} />
                ))}
            </div>

            {/* FULLSCREEN MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm md:hidden"
                        onClick={closeMenu}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="h-full w-4/5 max-w-sm bg-white border-r-4 border-black flex flex-col pt-24"
                        >
                            <div className="h-10 bg-red-600 border-b-2 border-red-800 flex items-center px-6">
                                <span className="text-[10px] text-white font-bold tracking-widest uppercase">Navigation Menu</span>
                            </div>

                            <div className="flex flex-col divide-y divide-gray-100 py-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="px-8 py-5 text-sm font-bold text-gray-800 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-4"
                                    >
                                        <span className={`w-2 h-2 rounded-full ${link.color === 'cyan' ? 'bg-cyan-400' :
                                            link.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'
                                            }`} />
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto p-8 border-t border-gray-100 flex justify-center">
                                <Image src="/pball.png" alt="Pokeball" width={40} height={40} className="animate-wiggle" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function DesktopItem({ href, label, color }: { href: string; label: string; color: string }) {
    return (
        <Link
            href={href}
            className="group text-white font-bold tracking-widest uppercase transition-all duration-300 hover:scale-110 font-orbitron text-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
        >
            <span className="inline-block opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 mr-2 text-white/50">
                [
            </span>
            <span className={`${colorClasses[color]} transition-colors`}>{label}</span>
            <span className="inline-block opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ml-2 text-white/50">
                ]
            </span>
        </Link>
    );
}
