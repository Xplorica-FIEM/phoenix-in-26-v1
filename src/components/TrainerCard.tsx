'use client';

import React, { memo, useState, useCallback } from 'react';
import {
  FaLinkedin, FaGithub, FaInstagram, FaPhoneAlt,
  FaEnvelope, FaFacebook, FaCaretUp, FaCaretDown,
  FaCaretLeft, FaCaretRight, FaCheck, FaSignal
} from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type RarityLevel = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

interface TrainerCardProps {
  name: string;
  role: string;
  department: string;
  mobile: string;
  email: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  github?: string;
  photoUrl?: string;
  rarity?: RarityLevel;
}

// LED Screen color mapping based on Roles
const SCREEN_THEMES: Record<string, string> = {
  'Mentor': 'bg-[#f8f8d8]', // Yellowish LED
  'CC': 'bg-[#d8f8f8]',     // Bluish LED
  'WC': 'bg-[#ffffff]',     // White LED
};

const DataLine = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-black/10 py-1 text-[8px] font-mono font-black uppercase text-black/80">
    <span className="opacity-40">{label}</span>
    <span className="truncate ml-2 text-right max-w-[75px] font-bold">{value}</span>
  </div>
);

export const TrainerCard = memo(({
  name, role, department, mobile, email,
  linkedin, facebook, instagram, github,
  photoUrl, rarity = 'Common'
}: TrainerCardProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  // Body is always Pokédex Red. Screen color depends on Role.
  const pokedexRed = 'bg-[#dc0a2d]';
  const screenColor = SCREEN_THEMES[role] || 'bg-slate-200'; // Fallback to gray if role not found

  const [deptName, clearance] = department.includes(',')
    ? department.split(',').map((s: string) => s.trim())
    : [department, 'N/A'];

  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (e) { console.error("Copy failed"); }
  }, []);

  const isLongName = name.length > 14;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={`relative w-full max-w-[400px] p-5 ${pokedexRed} rounded-tr-[3.5rem] rounded-bl-[2rem] border-b-[8px] border-r-[8px] border-black shadow-xl font-mono overflow-hidden select-none`}
    >
      {/* 1. TOP HARDWARE HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-sky-300 border-[5px] border-white shadow-[0_0_15px_rgba(125,211,252,0.5)] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-sky-400 border-2 border-white/30" />
          </div>
          <div className="flex gap-1.5 mt-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff0000] border border-black/40 shadow-inner" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f0f000] border border-black/40 shadow-inner" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#50f010] border border-black/40 shadow-inner" />
          </div>
        </div>
        <div className="text-[8px] font-black text-white/60 text-right leading-none uppercase tracking-tighter">
          PHX_SYSTEM_v2.6<br />RANK: {rarity}
        </div>
      </div>

      <div className="grid grid-cols-[1.4fr_1fr] gap-4">

        {/* LEFT COLUMN: BIGGER SCANNER + REFINED DPAD */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-[1/1.2] border-[5px] border-black rounded-lg rounded-bl-[2.5rem] bg-slate-400 overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={name}
                fill
                className="object-cover contrast-[1.05]"
                sizes="250px"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl grayscale opacity-20">👤</div>
            )}
            {/* Visual Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.08)_50%)] bg-[length:100%_4px] pointer-events-none" />
          </div>

          {/* High-Contrast Social Pad */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24 bg-[#333] rounded-full border-4 border-black/60 shadow-2xl flex items-center justify-center">
              {[
                { icon: <FaLinkedin />, href: linkedin, pos: "top-1.5" },
                { icon: <FaGithub />, href: github, pos: "bottom-1.5" },
                { icon: <FaInstagram />, href: instagram, pos: "left-1.5" },
                { icon: <FaFacebook />, href: facebook, pos: "right-1.5" },
              ].map((s, i) => {
                const isValid = s.href && s.href !== '#' && s.href !== '';
                return (
                  <a key={i} href={isValid ? s.href : undefined} target="_blank" rel="noopener noreferrer"
                    className={`absolute ${s.pos} p-2 text-white/80 hover:text-yellow-400 transition-all duration-200 z-10 
                    ${!isValid ? 'opacity-10 grayscale pointer-events-none' : 'hover:scale-125 active:scale-95'}`}>
                    <span className="text-sm">{s.icon}</span>
                  </a>
                );
              })}
              {/* Hardware D-Pad Shapes */}
              <div className="w-6 h-14 bg-[#222] rounded-sm border-x border-white/5 pointer-events-none shadow-inner" />
              <div className="absolute w-14 h-6 bg-[#222] rounded-sm border-y border-white/5 pointer-events-none shadow-inner" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DATA + ACTIONS */}
        <div className="flex flex-col h-full">
          {/* LCD Screen - Color based on Role */}
          <div className={`${screenColor} border-[4px] border-black p-3 rounded-md shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)] flex flex-col relative overflow-hidden min-h-[210px]`}>
            <div className="flex justify-between items-center mb-1 border-b border-black/20 pb-1">
              <span className="text-[7px] font-black bg-black/10 px-1 text-black/60">ID: 26-{name.slice(0, 2).toUpperCase()}</span>
              <FaSignal className="text-[8px] text-black/30" />
            </div>

            <div className="mb-2 mt-1">
              <h3 className={`font-black text-black leading-tight uppercase break-words ${isLongName ? 'text-[11px]' : 'text-[14px]'}`}>
                {name}
              </h3>
              <p className="text-[7px] font-black text-red-700 uppercase leading-tight mt-0.5 tracking-tighter">
                TYPE: {role}
              </p>
            </div>

            <div className="space-y-0.5 mt-auto">
              <DataLine label="DEPT" value={deptName} />
              <DataLine label="RANK" value={rarity} />
              <DataLine label="YEAR" value={clearance} />
            </div>

            {/* Animated Power Bar */}
            <div className="mt-3">
              <div className="flex gap-0.5 h-1.5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`flex-1 ${i < 6 ? 'bg-black/60' : 'bg-black/10'}`} />
                ))}
              </div>
              <span className="text-[6px] font-black opacity-30 mt-1 block uppercase text-right tracking-tighter text-black">PHX_CORE_SYNCED</span>
            </div>

            {/* Subtle scan texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          {/* Actions - Tightly Packed */}
          <div className="mt-4 space-y-3">
            <ActionBtn label="CALL" color="bg-[#50f010]" active={copied === 'tel'} onClick={() => handleCopy(mobile, 'tel')} />
            <ActionBtn label="MAIL" color="bg-[#f0f000]" active={copied === 'mail'} onClick={() => email && handleCopy(email, 'mail')} />

            {/* Small Hardware LED/Vent */}
            <div className="flex justify-end gap-1 mt-1 pr-1">
              <div className="w-8 h-1 bg-black/30 rounded-full" />
              <div className="w-3 h-1 bg-black/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM GRILL */}
      <div className="mt-6 flex justify-center gap-1.5 opacity-20">
        {[...Array(6)].map((_, i) => <div key={i} className="w-10 h-1 bg-black rounded-full shadow-inner" />)}
      </div>
    </motion.div>
  );
});

interface ActionBtnProps {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

const ActionBtn = ({ label, color, active, onClick }: ActionBtnProps) => (
  <button onClick={onClick} className="flex items-center gap-2 group w-full justify-end pr-1 transition-transform active:translate-y-0.5">
    <span className={`text-[9px] font-black italic transition-colors ${active ? 'text-white' : 'text-black/60'}`}>
      {active ? 'SYNCD' : label}
    </span>
    <div className={`w-10 h-4 ${active ? 'bg-white' : color} border-2 border-black rounded-full shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] group-active:shadow-none transition-all`} />
  </button>
);

TrainerCard.displayName = 'TrainerCard';