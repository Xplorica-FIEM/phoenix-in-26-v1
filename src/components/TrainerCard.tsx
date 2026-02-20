'use client';

import React, { memo } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaPhoneAlt, FaEnvelope, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

export type RarityLevel = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface TrainerCardProps {
  name: string;
  role: string;
  department: string;
  mobile: string;
  email?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  github?: string;
  photoUrl?: string;
  rarity?: RarityLevel;
}

const TYPE_COLORS: Record<RarityLevel, string> = {
  Common: 'bg-slate-400',
  Rare: 'bg-blue-400',
  Epic: 'bg-purple-400',
  Legendary: 'bg-yellow-400',
  Mythic: 'bg-pink-400',
};

export const TrainerCard = memo(({
  name,
  role,
  department,
  mobile,
  email,
  linkedin,
  facebook,
  instagram,
  github,
  photoUrl,
  rarity = 'Common',
}: TrainerCardProps) => {
  const colorClass = TYPE_COLORS[rarity];

  const [deptName, yearName] = department.includes(',')
    ? department.split(',').map(s => s.trim())
    : [department, 'PHASE_2'];

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Inquiry regarding Phoenix 2026 Personnel");
    const body = encodeURIComponent(`Hello ${name}, I would like to connect via the Phoenix 2026 Directory.`);
    const mailtoURL = `mailto:${email}?subject=${subject}&body=${body}`;
    const gmailWebURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = mailtoURL;
    } else {
      window.open(gmailWebURL, "_blank", "noopener,noreferrer");
    }
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!mobile) return;
    window.location.href = `tel:${mobile}`;
  };

  return (
    <div className="group relative bg-white border-4 border-black rounded-2xl overflow-hidden hover:-translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0_rgba(0,0,0,1)] shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all flex flex-col w-full max-w-sm will-change-transform">
      {/* Header Section */}
      <div className={`h-14 border-b-4 border-black flex items-center justify-between px-4 ${colorClass}`}>
        <div className="flex flex-col">
          <span className="text-[8px] font-black uppercase tracking-tighter text-black/40 leading-none">PERSONNEL_ID // XPLORICA</span>
          <span className="text-xs font-black uppercase text-black mt-0.5">{rarity} DIVISION</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded border border-black/10">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_4px_rgba(220,38,38,0.5)]" />
            <span className="text-[8px] font-black text-black uppercase tracking-widest">Active</span>
          </div>

          <div className="w-9 h-9 rounded-lg border-2 border-black bg-white/50 flex items-center justify-center shadow-[2px_2px_0_rgba(0,0,0,1)]">
            <div className="w-4 h-4 rounded-full bg-black opacity-10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Photo Area */}
      <div className="relative h-60 bg-slate-100 border-b-4 border-black group-hover:bg-slate-50 transition-colors overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-20 grayscale">
            <span className="text-6xl text-slate-400">👤</span>
            <span className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Signal Offline</span>
          </div>
        )}

        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:12px_12px]" />

        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-black/30" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-black/30" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-black/30" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-black/30" />
      </div>

      {/* Info Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-black uppercase text-slate-900 leading-tight tracking-tighter group-hover:text-yellow-600 transition-colors">
            {name}
          </h3>
          <div className="inline-block mt-1.5 px-2.5 py-1 bg-yellow-400 border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0_rgba(0,0,0,1)]">
            {role}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5 pb-4 border-b-2 border-slate-100">
          <div className="space-y-0.5 min-w-0">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Division</label>
            <p className="text-xs font-bold text-slate-900 uppercase truncate">{deptName}</p>
          </div>
          <div className="space-y-0.5 min-w-0">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Clearance</label>
            <p className="text-xs font-bold text-slate-900 uppercase truncate">{yearName}</p>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <button
              onClick={handlePhoneClick}
              className="flex items-center gap-2 text-slate-700 hover:text-yellow-600 transition-colors w-fit group/contact shrink-0"
            >
              <FaPhoneAlt className="text-[10px] shrink-0" />
              <span className="text-[10px] font-black font-mono tracking-tighter truncate">{mobile}</span>
            </button>
            {email && (
              <button
                onClick={handleEmailClick}
                title={email}
                className="flex items-center gap-2 text-slate-500 hover:text-yellow-600 transition-colors w-full group/contact min-w-0"
              >
                <FaEnvelope className="text-[10px] shrink-0" />
                <span className="text-[9px] font-bold font-mono truncate text-left group-hover/contact:underline">
                  {email}
                </span>
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {linkedin && linkedin !== '#' && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 border-2 border-black text-white flex items-center justify-center text-sm shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-blue-600 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
                <FaLinkedin />
              </a>
            )}
            {instagram && instagram !== '#' && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 border-2 border-black text-white flex items-center justify-center text-sm shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-pink-600 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
                <FaInstagram />
              </a>
            )}
            {facebook && facebook !== '#' && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 border-2 border-black text-white flex items-center justify-center text-sm shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-blue-800 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
                <FaFacebook />
              </a>
            )}
            {github && github !== '#' && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 border-2 border-black text-white flex items-center justify-center text-sm shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-slate-700 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

TrainerCard.displayName = 'TrainerCard';