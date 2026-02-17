import { Geist, Geist_Mono, Orbitron, Press_Start_2P } from "next/font/google";

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const orbitron = Orbitron({
    variable: "--font-orbitron",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const pressStart2P = Press_Start_2P({
    variable: "--font-press-start",
    subsets: ["latin"],
    weight: ["400"],
});
