'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

/* -------- SAME DATA (important for now) -------- */

const EVENTS = [
  {
    id: 1,
    title: 'Hackathon X',
    subtitle: 'Full Stack Battle',
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
      { name: 'Aritra', phone: '9876543210' },
      { name: 'Sneha', phone: '9123456780' },
    ],
  },
];

/* -------- META BLOCK -------- */

const Meta = ({ label, value }: any) => (
  <div className="bg-slate-100 border-2 border-black p-3 rounded-lg">
    <p className="text-[10px] uppercase font-bold text-slate-500">
      {label}
    </p>
    <p className="text-sm font-black text-slate-900">
      {value}
    </p>
  </div>
);

/* -------- PAGE -------- */

export default function EventPage() {
  const { id } = useParams();
  const router = useRouter();
  const event = EVENTS.find((e) => e.id === Number(id));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-28 px-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => router.push('/events')}
      />

      {/* MODAL */}
      <div className="relative max-w-4xl w-full bg-white border-[6px] border-black rounded-3xl shadow-2xl overflow-y-auto max-h-[85vh]">
        <header className="h-14 bg-slate-900 border-b-4 border-black flex items-center px-4">
          <button
            onClick={() => router.push('/events')}
            className="text-white font-bold"
          >
            ✕ Close
          </button>
        </header>

        <div className="p-8 text-slate-900 space-y-8">
          <div>
            <h1 className="font-['Press_Start_2P'] text-2xl">
              {event.title}
            </h1>
            <p className="uppercase text-slate-500 text-sm mt-2">
              {event.subtitle}
            </p>
          </div>

          {/* META */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Meta label="Participants" value={event.participants} />
            <Meta label="Category" value={event.category} />
            <Meta label="Date" value={event.date} />
            <Meta label="Event Fee" value={event.eventFee} />
          </div>

          {/* DESCRIPTION */}
          <div>
            <h3 className="font-black uppercase text-xs mb-2">
              Description
            </h3>
            <p className="text-sm">{event.description}</p>
          </div>

          {/* RULES */}
          <div>
            <h3 className="font-black uppercase text-xs mb-2">
              Rules
            </h3>
            <ul className="space-y-1 text-sm">
              {event.rules.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>

          {/* CONTACTS */}
          <div>
            <h3 className="font-black uppercase text-xs mb-2">
              Contacts
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {event.contacts.map((c, i) => (
                <div
                  key={i}
                  className="border-2 border-black p-4 rounded-lg"
                >
                  <p className="font-black">{c.name}</p>
                  <p className="text-sm">{c.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
