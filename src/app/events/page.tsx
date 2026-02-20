'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RollerCoaster } from 'lucide-react';

/* ---------------- ICON ---------------- */

const PokeballIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <circle cx="50" cy="50" r="45" />
    <circle cx="50" cy="50" r="12" fill="white" />
  </svg>
);

/* ---------------- HELPERS ---------------- */

const getTypeColor = (type: string) =>
  ({
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    psychic: 'bg-purple-500',
  }[type] || 'bg-gray-500');

/* ---------------- DATA ---------------- */

const EVENTS = [
  {
    id: 1,
    title: 'Hackathon X',
    subtitle: 'Full Stack Battle',
    type: ['Grass', 'Steel'], // 👈 ADD THIS
    description: 'The ultimate 48-hour coding marathon.',
    participants: '2–4 per team',
    rules: [
      'Max 4 members',
      'No pre-written code',
      'Deployment required',
    ],
    date: '17 Feb 2026',
    eventFee: '₹200 / team',
    category: 'Tech Events',
    contacts: [
      { name: 'Aritra', phone: '9876543210', role: 'Mentor' },
      { name: 'Sneha', phone: '9123456780', role: 'CC' },
    ],
  },
];

/* ---------------- CARD ---------------- */

const EventCard = ({ event }: any) => {
  const router = useRouter();
  const primaryType = Array.isArray(event.type) ? event.type[0]?.toLowerCase() : event.type?.toLowerCase();

  return (
    <div
      onClick={() => router.push(`/events/${event.id}`)}
      className="cursor-pointer bg-white border-4 border-black rounded-2xl p-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
    >
      <div className="h-32 bg-slate-800 rounded-lg relative overflow-hidden">
        <div className={`absolute inset-0 ${getTypeColor(primaryType)} opacity-40`} />
        <PokeballIcon className="absolute inset-0 m-auto w-16 h-16 text-white/30" />
      </div>

      <h3 className="mt-4 font-black uppercase text-lg">{event.title}</h3>
      <p className="text-xs uppercase text-slate-500">{event.subtitle}</p>

      <div className="mt-3 text-[11px] font-bold uppercase space-y-1">
        <div>Date: {event.date}</div>
        <div>Fee: {event.eventFee}</div>
      </div>

      <button className="mt-4 w-full bg-yellow-400 border-2 border-black rounded-md py-2 font-black text-xs">
        VIEW DETAILS
      </button>
    </div>
  );
};

/* ---------------- PAGE ---------------- */

export default function EventsPage() {
  return (
    <section className="min-h-screen bg-black text-white px-6 pt-24">
      <h1 className="text-3xl font-['Press_Start_2P'] mb-8">
        EVENTS
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}
