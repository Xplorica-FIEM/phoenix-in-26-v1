'use client';

import { useParams, useRouter } from 'next/navigation';

/* -------- DATA -------- */

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

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-slate-100 border-2 border-black p-4 rounded-xl shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
    <p className="text-[10px] uppercase font-bold text-slate-500">
      {label}
    </p>
    <p className="text-sm font-black text-slate-900 mt-1">
      {value}
    </p>
  </div>
);

/* -------- PAGE -------- */

export default function EventPage() {
  const { id } = useParams();
  const router = useRouter();
  const event = EVENTS.find((e) => e.id === Number(id));

  if (!event) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <button
            onClick={() => router.push('/events')}
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold border-2 border-black px-4 py-2 rounded-lg bg-white shadow-[2px_2px_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition"
          >
            ← Back to Events
          </button>

          <h1 className="font-['Press_Start_2P'] text-3xl leading-tight">
            {event.title}
          </h1>
          <p className="uppercase text-slate-500 text-sm mt-3 tracking-widest">
            {event.subtitle}
          </p>
        </div>

        {/* META GRID */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Meta label="Participants" value={event.participants} />
          <Meta label="Category" value={event.category} />
          <Meta label="Date" value={event.date} />
          <Meta label="Event Fee" value={event.eventFee} />
        </section>

        {/* DESCRIPTION */}
        <section className="mb-10">
          <h3 className="font-black uppercase text-xs mb-3 tracking-wider">
            Description
          </h3>
          <p className="text-sm leading-relaxed max-w-3xl">
            {event.description}
          </p>
        </section>

        {/* RULES */}
        <section className="mb-10">
          <h3 className="font-black uppercase text-xs mb-3 tracking-wider">
            Rules
          </h3>
          <ul className="space-y-2 text-sm max-w-3xl">
            {event.rules.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CONTACTS */}
        <section>
          <h3 className="font-black uppercase text-xs mb-4 tracking-wider">
            Contacts
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
            {event.contacts.map((c, i) => (
              <div
                key={i}
                className="border-2 border-black p-5 rounded-xl bg-white shadow-[3px_3px_0_rgba(0,0,0,0.6)]"
              >
                <p className="font-black text-base">{c.name}</p>
                <p className="text-sm mt-1">{c.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
