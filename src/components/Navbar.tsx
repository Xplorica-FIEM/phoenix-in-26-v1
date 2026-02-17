"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type MenuState = "closed" | "opening" | "open" | "closing";

const links = [
    { href: "/trainers", label: "Trainers", color: "cyan" },
    { href: "/gallery", label: "Gallery", color: "yellow" },
    { href: "/events", label: "Events", color: "yellow" },
    { divider: true },
    { href: "/sponsors", label: "Sponsors", color: "red" },
    { href: "/contactus", label: "Contact Us", color: "red" },
    { href: "/games", label: "Games", color: "red" },
];

const colorClasses: Record<string, string> = {
    cyan: "group-hover:text-cyan-300",
    yellow: "group-hover:text-yellow-300",
    red: "group-hover:text-red-300",
};

export default function Navbar() {
    const [menuState, setMenuState] = useState<MenuState>("closed");

    const isOpen = menuState === "open" || menuState === "opening";

    /* ---------- animation sequencing ---------- */
    useEffect(() => {
        if (menuState === "opening") {
            const t = setTimeout(() => setMenuState("open"), 350);
            return () => clearTimeout(t);
        }
        if (menuState === "closing") {
            const t = setTimeout(() => setMenuState("closed"), 450);
            return () => clearTimeout(t);
        }
    }, [menuState]);

    /* ---------- close on ESC ---------- */
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuState("closing");
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    /* ---------- lock scroll when open ---------- */
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    const toggleMenu = () => {
        setMenuState((prev) =>
            prev === "closed" ? "opening" : prev === "open" ? "closing" : prev,
        );
    };

    const closeMenu = () => setMenuState("closing");

    const pokeballSrc =
        menuState === "open"
            ? "/pball-open-full.png"
            : menuState === "opening"
              ? "/pball-open.png"
              : "/pball.png";

    const flashWhite = menuState === "opening";
    const flashRed = menuState === "closing";

    return (
        <nav className="w-full select-none">
            {/* gradient overlay for cinematic fade */}
            <div className="bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                {/* MOBILE HEADER */}
                <div className="flex md:hidden items-center justify-center px-5 pt-4 pb-4">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        className={`relative w-14 h-24 transition-transform duration-300 hover:scale-110 ${
                            !isOpen ? "animate-wiggle" : ""
                        }`}
                    >
                        <Image
                            src={pokeballSrc}
                            alt="Menu"
                            fill
                            priority
                            className="object-contain drop-shadow-lg"
                        />
                    </button>

                    <Link
                        href="/"
                        className="relative w-72 h-36 ml-2 drop-shadow-2xl"
                    >
                        <Image
                            src="/logo-text.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </Link>
                </div>

                {/* DROPDOWN OVERLAY */}
                <div
                    onClick={closeMenu}
                    className={`fixed inset-0 z-40 transition-opacity duration-200 ${
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                />

                <div
                    className={`fixed left-2 right-2 top-36 bottom-2 z-50 transition-all duration-200
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                    <div
                        className={`h-full rounded-lg border border-white/10 backdrop-blur-md overflow-hidden transition-colors duration-200
            ${
                flashRed
                    ? "bg-red-500/80"
                    : flashWhite
                      ? "bg-gradient-to-b from-cyan-100/90 via-blue-200/80 to-cyan-200/90"
                      : "bg-gradient-to-b from-slate-900/95 via-black/95 to-black"
            }`}
                    >
                        <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />

                        <div className="flex flex-col items-center justify-center h-full space-y-6">
                            {links.map((link, i) =>
                                link.divider ? (
                                    <div
                                        key={i}
                                        className="w-48 h-px bg-white/30"
                                    />
                                ) : (
                                    <NavItem
                                        key={link.href}
                                        {...link}
                                        onClick={closeMenu}
                                    />
                                ),
                            )}
                        </div>

                        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-red-400 via-orange-500 to-red-400" />
                    </div>
                </div>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center justify-center gap-6 px-4 pt-4 pb-5">
                    {links.slice(0, 3).map((link) => (
                        <DesktopItem key={link.href} {...link} />
                    ))}

                    <Link
                        href="/"
                        className="relative w-64 h-32 mx-4 drop-shadow-2xl"
                    >
                        <Image
                            src="/logo-text.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </Link>

                    {links.slice(4).map((link) => (
                        <DesktopItem key={link.href} {...link} />
                    ))}
                </div>
            </div>
        </nav>
    );
}

/* ---------- MOBILE ITEM ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NavItem({ href, label, color, onClick }: any) {
    return (
        <Link
            href={href}
            onClick={onClick}   
            className="group flex items-center justify-center px-6 py-4 text-white font-bold tracking-widest uppercase text-xl transition hover:scale-110 font-orbitron"
        >
            <span className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 mr-3">
                [
            </span>
            <span className={`${colorClasses[color]} transition-colors`}>
                {label}
            </span>
            <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ml-3">
                ]
            </span>
        </Link>
    );
}

/* ---------- DESKTOP ITEM ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DesktopItem({ href, label, color }: any) {
    return (
        <Link
            href={href}
            className="group text-white font-bold tracking-widest uppercase transition hover:scale-110 font-orbitron"
        >
            <span className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 mr-2">
                [
            </span>
            <span className={colorClasses[color]}>{label}</span>
            <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ml-2">
                ]
            </span>
        </Link>
    );
}
