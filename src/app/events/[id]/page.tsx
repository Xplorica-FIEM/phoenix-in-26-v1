'use client';

import { useParams, useRouter } from 'next/navigation';

/* ---------------- DATA ---------------- */

export const EVENTS = [
  {
    id: 1,
    title: 'Hackathon X',
    subtitle: 'Full Stack Battle',
    themeId: 'sinnoh',
    category: 'Tech Events',
    type: 'electric',

    status: 'live',
    endsIn: '2h 30m',
    progress: 90,
    endDate: 'Feb 17, 2026',

    participants: '2–4 per team',
    eventFee: '₹200 / team',

    description:
      'The ultimate 48-hour coding marathon where teams battle to build scalable, production-grade applications using modern stacks.',

    rules: [
      'Maximum 4 members per team',
      'No pre-written code allowed',
      'Deployment is mandatory',
      'API integration required',
    ],

    prizes: [
      '₹50,000 Cash Prize',
      'Internship Opportunities',
      'Exclusive Tech Swag',
    ],

    contacts: [
      { name: 'Aritra', phone: '9876543210' },
      { name: 'Sneha', phone: '9123456780' },
    ],
  },

  {
    id: 2,
    title: 'AI Summit',
    subtitle: 'Neural Networks',
    themeId: 'unova',
    category: 'Tech Events',
    type: 'psychic',

    status: 'upcoming',
    endsIn: '5 days',
    progress: 10,
    endDate: 'Feb 22, 2026',

    participants: 'Individual',
    eventFee: '₹150',

    description:
      'A deep dive into Generative AI, LLMs, and real-world ML systems with expert-led talks and workshops.',

    rules: [
      'Laptop mandatory',
      'Basic Python knowledge required',
      'Workshop attendance compulsory',
    ],

    prizes: [
      'NVIDIA Cloud Credits',
      'AI Certification',
      'Networking Dinner Pass',
    ],

    contacts: [
      { name: 'Rohit', phone: '9988776655' },
    ],
  },

  {
    id: 3,
    title: 'Speed Code',
    subtitle: 'Algorithm Race',
    themeId: 'kanto',
    category: 'Competitions',
    type: 'fire',

    status: 'live',
    endsIn: '45 mins',
    progress: 95,
    endDate: 'Feb 17, 2026',

    participants: 'Solo',
    eventFee: '₹100',

    description:
      'Solve high-difficulty algorithmic problems under extreme time pressure. Speed and optimization matter.',

    rules: [
      'Individual participation only',
      'Languages: C++, Java, Python',
      'No external help allowed',
    ],

    prizes: [
      'Gaming Mouse',
      'Premium Coding Subscriptions',
      'Champion Trophy',
    ],

    contacts: [
      { name: 'Neel', phone: '9012345678' },
    ],
  },

  {
    id: 4,
    title: 'UX Sprint',
    subtitle: 'Design Systems',
    themeId: 'kalos',
    category: 'Workshops',
    type: 'grass',

    status: 'upcoming',
    endsIn: '3 days',
    progress: 30,
    endDate: 'Feb 20, 2026',

    participants: 'Solo / Duo',
    eventFee: '₹120',

    description:
      'Learn to design scalable UI systems in Figma with accessibility, tokens, and components.',

    rules: [
      'Figma account required',
      'Accessibility focus mandatory',
      'Prototype submission required',
    ],

    prizes: [
      'Figma Pro License',
      'Design Toolkit',
      'Wacom Tablet',
    ],

    contacts: [
      { name: 'Ishita', phone: '9345678123' },
    ],
  },

  {
    id: 5,
    title: 'BGMI Tournament',
    subtitle: 'Squad Warfare',
    themeId: 'galar',
    category: 'Gaming Events',
    type: 'water',

    status: 'upcoming',
    endsIn: '9 days',
    progress: 0,
    endDate: 'Feb 26, 2026',

    participants: 'Squads of 4',
    eventFee: '₹300 / squad',

    description:
      'Competitive BGMI matches with point-based rankings across multiple rounds.',

    rules: [
      'Mobile devices only',
      'No emulators allowed',
      'Standard competitive settings',
    ],

    prizes: [
      'Gaming Headsets',
      'UC Vouchers',
      'Champion Medals',
    ],

    contacts: [
      { name: 'Kunal', phone: '8899001122' },
    ],
  },

  {
    id: 6,
    title: 'Webscapes',
    subtitle: 'UI Terrain',
    themeId: 'paldea',
    category: 'Tech Events',
    type: 'grass',

    status: 'upcoming',
    endsIn: '8 days',
    progress: 5,
    endDate: 'Feb 25, 2026',

    participants: 'Solo / Duo',
    eventFee: '₹150',

    description:
      'Build a futuristic, animated web experience with performance and accessibility in mind.',

    rules: [
      'Live URL submission required',
      'Accessibility score ≥ 90',
      'No heavy UI templates',
    ],

    prizes: [
      'Premium UI Licenses',
      'Feature on Official Showcase',
      'Design Resources Bundle',
    ],

    contacts: [
      { name: 'Mehul', phone: '9090909090' },
    ],
  },
];


export const THEMES = {
  kanto: {
    panel: 'bg-[#f8fafc]',
    accent: 'red-500',
    accentSoft: 'bg-red-50',
    accentDark: 'red-700',

    description: 'bg-white border-t-[6px] border-t-red-500',
    rules: 'bg-white border-t-[6px] border-t-red-600',
    contact: 'bg-white border-l-[6px] border-l-red-500',

    backButton: 'bg-red-100 text-red-900',
    backButtonHover: 'hover:bg-red-200',
    ruleArrow: 'text-red-600',
  },

  johto: {
    panel: 'bg-[#f8fafc]',
    accent: 'yellow-500',
    accentSoft: 'bg-yellow-50',
    accentDark: 'yellow-700',

    description: 'bg-white border-t-[6px] border-t-yellow-500',
    rules: 'bg-white border-t-[6px] border-t-yellow-600',
    contact: 'bg-white border-l-[6px] border-l-yellow-500',

    backButton: 'bg-yellow-100 text-yellow-900',
    backButtonHover: 'hover:bg-yellow-200',
    ruleArrow: 'text-yellow-600',
  },

  hoenn: {
    panel: 'bg-[#f8fafc]',
    accent: 'emerald-500',
    accentSoft: 'bg-emerald-50',
    accentDark: 'emerald-700',

    description: 'bg-white border-t-[6px] border-t-emerald-500',
    rules: 'bg-white border-t-[6px] border-t-emerald-600',
    contact: 'bg-white border-l-[6px] border-l-emerald-500',

    backButton: 'bg-emerald-100 text-emerald-900',
    backButtonHover: 'hover:bg-emerald-200',
    ruleArrow: 'text-emerald-600',
  },

  sinnoh: {
    panel: 'bg-[#f8fafc]',
    accent: 'sky-500',
    accentSoft: 'bg-sky-50',
    accentDark: 'sky-700',

    description: 'bg-white border-t-[6px] border-t-sky-500',
    rules: 'bg-white border-t-[6px] border-t-sky-600',
    contact: 'bg-white border-l-[6px] border-l-sky-500',

    backButton: 'bg-sky-100 text-sky-900',
    backButtonHover: 'hover:bg-sky-200',
    ruleArrow: 'text-sky-600',
  },

  unova: {
    panel: 'bg-[#f8fafc]',
    accent: 'slate-600',
    accentSoft: 'bg-slate-100',
    accentDark: 'slate-800',

    description: 'bg-white border-t-[6px] border-t-slate-700',
    rules: 'bg-white border-t-[6px] border-t-slate-800',
    contact: 'bg-white border-l-[6px] border-l-slate-700',

    backButton: 'bg-slate-200 text-slate-900',
    backButtonHover: 'hover:bg-slate-300',
    ruleArrow: 'text-slate-700',
  },

  kalos: {
    panel: 'bg-[#f8fafc]',
    accent: 'indigo-500',
    accentSoft: 'bg-indigo-50',
    accentDark: 'indigo-700',

    description: 'bg-white border-t-[6px] border-t-indigo-500',
    rules: 'bg-white border-t-[6px] border-t-indigo-600',
    contact: 'bg-white border-l-[6px] border-l-indigo-500',

    backButton: 'bg-indigo-100 text-indigo-900',
    backButtonHover: 'hover:bg-indigo-200',
    ruleArrow: 'text-indigo-600',
  },

  alola: {
    panel: 'bg-[#f8fafc]',
    accent: 'orange-500',
    accentSoft: 'bg-orange-50',
    accentDark: 'orange-700',

    description: 'bg-white border-t-[6px] border-t-orange-500',
    rules: 'bg-white border-t-[6px] border-t-orange-600',
    contact: 'bg-white border-l-[6px] border-l-orange-500',

    backButton: 'bg-orange-100 text-orange-900',
    backButtonHover: 'hover:bg-orange-200',
    ruleArrow: 'text-orange-600',
  },

  galar: {
    panel: 'bg-[#f8fafc]',
    accent: 'violet-500',
    accentSoft: 'bg-violet-50',
    accentDark: 'violet-700',

    description: 'bg-white border-t-[6px] border-t-violet-500',
    rules: 'bg-white border-t-[6px] border-t-violet-600',
    contact: 'bg-white border-l-[6px] border-l-violet-500',

    backButton: 'bg-violet-100 text-violet-900',
    backButtonHover: 'hover:bg-violet-200',
    ruleArrow: 'text-violet-600',
  },

  paldea: {
    panel: 'bg-[#f8fafc]',
    accent: 'fuchsia-500',
    accentSoft: 'bg-fuchsia-50',
    accentDark: 'fuchsia-700',

    description: 'bg-white border-t-[6px] border-t-fuchsia-500',
    rules: 'bg-white border-t-[6px] border-t-fuchsia-600',
    contact: 'bg-white border-l-[6px] border-l-fuchsia-500',

    backButton: 'bg-fuchsia-100 text-fuchsia-900',
    backButtonHover: 'hover:bg-fuchsia-200',
    ruleArrow: 'text-fuchsia-600',
  },
} as const;

/* ---------------- META ---------------- */

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white border-2 border-black rounded-lg px-4 py-3 shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
      {label}
    </p>
    <p className="mt-1 text-sm font-extrabold text-slate-900">{value}</p>
  </div>
);

/* ---------------- PAGE ---------------- */

export default function EventPage() {
  const { id } = useParams();
  const router = useRouter();

  const event = EVENTS.find((e) => e.id === Number(id));
  if (!event) return null;

  const theme =
    THEMES[event.themeId as keyof typeof THEMES] ?? THEMES.kanto;

  return (
    <main className="min-h-screen pt-32 pb-28 px-4 ring-1 ring-black/5">
      <div className="max-w-5xl mx-auto">
        <div
          className={`relative ${theme.panel} border-[4px] border-black rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0_rgba(0,0,0,0.9)]`}
        >
          {/* BACK */}
          <button
            onClick={() => router.push('/#events')}
            className={`
              mb-8 inline-flex items-center gap-2
              text-xs font-bold uppercase tracking-widest
              border-2 border-black px-4 py-2 rounded-md
              shadow-[2px_2px_0_rgba(0,0,0,1)]
              transition hover:-translate-y-0.5
              ${theme.backButton}
              ${theme.backButtonHover}
            `}
          >
            ← Back to Events
          </button>


          {/* HEADER */}
          <header className="mb-12">
            <h1 className="font-['Press_Start_2P'] text-xl sm:text-2xl text-slate-900">
              {event.title}
            </h1>
            <p className="uppercase text-slate-600 text-xs mt-3 tracking-[0.25em] font-bold">
              {event.subtitle}
            </p>
          </header>

          {/* META */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            <Meta label="Participants" value={event.participants} />
            <Meta label="Category" value={event.category} />
            <Meta label="Date" value={event.date} />
            <Meta label="Event Fee" value={event.eventFee} />
          </section>

          {/* DESCRIPTION */}
          <section className="mb-12 max-w-3xl">
            <h3 className="font-bold uppercase text-xs mb-3 tracking-widest text-slate-600">
              Description
            </h3>
            <div
              className={`${theme.description} border-2 border-black rounded-xl p-5 shadow-[3px_3px_0_rgba(0,0,0,0.4)]`}
            >
              <p className="text-sm text-slate-800">
                {event.description}
              </p>
            </div>
          </section>

          {/* RULES */}
          <section className="mb-12 max-w-3xl">
            <h3 className="font-bold uppercase text-xs mb-3 tracking-widest text-slate-600">
              Rules
            </h3>
            <ul
              className={`${theme.rules} border-2 border-black rounded-xl p-5 shadow-[3px_3px_0_rgba(0,0,0,0.4)] space-y-2 text-sm text-slate-800`}
            >
              {event.rules.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className={`font-black ${theme.ruleArrow}`}>▶</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CONTACTS */}
          <section>
            <h3 className="font-bold uppercase text-xs mb-4 tracking-widest text-slate-600">
              Contacts
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
              {event.contacts.map((c, i) => (
                <div
                  key={i}
                  className={`${theme.contact} border-2 border-black rounded-xl p-5 shadow-[3px_3px_0_rgba(0,0,0,0.6)]`}
                >
                  <p className="font-extrabold text-slate-900">{c.name}</p>
                  <p className="text-sm font-mono text-slate-700">
                    {c.phone}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
