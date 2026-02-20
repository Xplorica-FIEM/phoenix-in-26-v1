import type { Metadata } from "next"
import "./globals.css"
import {
  geistMono,
  geistSans,
  orbitron,
  pressStart2P,
} from "@/components/fonts"
import AppShell from "@/components/AppShell"
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6"

export const metadata: Metadata = {
  title: {
    default: "PHOENIX 2026 | The Annual Tech Fest of XplOriCa",
    template: "%s | PHOENIX 2026"
  },
  description: "Join Phoenix 2026, the premier annual tech fest organized by XplOriCa, the official tech club of FIEM. Experience 48-hour hackathons, innovative tech competitions, and a celebration of technology.",
  keywords: ["Phoenix 2026", "FIEM", "XplOriCa", "Tech Fest", "Hackathon", "Coding Competition", "Future Institute of Engineering and Management", "Kolkata Tech Events"],
  authors: [{ name: "XplOriCa Team" }],
  openGraph: {
    title: "PHOENIX 2026 | The Annual Tech Fest of XplOriCa",
    description: "The ultimate tech celebration at FIEM. Hackathons, gaming, and innovation.",
    url: "https://phoenix.xplorica.in",
    siteName: "PHOENIX 2026",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PHOENIX 2026 | XplOriCa",
    description: "The ultimate tech celebration at FIEM. Join the innovation journey.",
  },
}

export default function RootLayout({
  iconSize = 26,
  children,
}: {
  iconSize?: number;
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${orbitron.variable}
          ${pressStart2P.variable}
          antialiased bg-black
        `}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
