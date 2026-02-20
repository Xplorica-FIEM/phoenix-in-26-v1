'use client';

import { Trainer } from '@/types/trainer';

interface TrainerCardProps {
  trainer: Trainer;
  onOpenModal: (trainer: Trainer) => void;
}

/* =========================
   Retro Pokémon Type Colors
========================= */
const TYPE_COLORS: Record<string, string> = {
  Common: 'border-gray-500',
  Rare: 'border-blue-500',
  Epic: 'border-purple-600',
  Legendary: 'border-yellow-500',
  Mythic: 'border-red-600',
};

/* =========================
   Component
========================= */
export default function TrainerCard({
  trainer,
  onOpenModal,
}: TrainerCardProps) {
  /* =========================
     Safe Destructuring
  ========================= */
  const {
    id = 0,
    name = 'UNKNOWN',
    role = 'TRAINER',
    department,
    rarity = 'Common',
    category = 'GENERAL',
  } = trainer ?? {};

  const colorClass = TYPE_COLORS[rarity] ?? TYPE_COLORS.Common;

  /* =========================
     SAFE Department Handling
  ========================= */
  const safeDepartment = department ?? 'UNKNOWN_DEPT';

  const [deptName, phaseName] = safeDepartment.includes(',')
    ? safeDepartment.split(',').map((s) => s.trim())
    : [safeDepartment, 'PHASE_2'];

  /* =========================
     Render
  ========================= */
  return (
    <div
      onClick={() => onOpenModal(trainer)}
      className="relative w-full h-[500px] cursor-pointer group"
    >
      <div
        className={`
          h-full w-full
          bg-[#d8e6c9]
          border-4 ${colorClass}
          shadow-[8px_8px_0px_#000]
          font-mono
          flex flex-col
          transition-all duration-200
          group-hover:translate-x-1
          group-hover:translate-y-1
          group-hover:shadow-[4px_4px_0px_#000]
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="bg-[#2f4f2f] text-[#d8e6c9] px-4 py-2 flex justify-between items-center border-b-4 border-black">
          <span className="text-sm tracking-widest">
            No.{id.toString().padStart(3, '0')}
          </span>

          <span className="text-xs uppercase">
            {rarity}
          </span>
        </div>

        {/* ================= IMAGE AREA ================= */}
        <div className="flex items-center justify-center bg-[#b7c9a8] h-52 border-b-4 border-black relative">
          <div className="w-32 h-32 border-4 border-black bg-[#d8e6c9] flex items-center justify-center text-5xl">
            👤
          </div>

          <div className="absolute bottom-2 right-3 text-[10px] text-black">
            HT: 5'10" WT: 160lb
          </div>
        </div>

        {/* ================= INFO AREA ================= */}
        <div className="flex-1 p-4 flex flex-col gap-3 text-black text-sm">
          <div>
            <h3 className="text-lg tracking-wide font-bold uppercase">
              {name}
            </h3>
            <p className="text-xs uppercase">{role}</p>
          </div>

          <div className="text-xs space-y-1">
            <p>
              TYPE: <span className="uppercase">{deptName}</span>
            </p>
            <p>
              PHASE: <span className="uppercase">{phaseName}</span>
            </p>
            <p>
              CLASS: <span className="uppercase">{category}</span>
            </p>
          </div>

          <div className="mt-auto border-t-2 border-black pt-2 text-[11px] leading-relaxed">
            A skilled trainer specializing in {deptName}.
            <br />
            Click to open full Pokédex entry.
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="bg-[#2f4f2f] h-6 border-t-4 border-black flex items-center px-3">
          <div className="w-3 h-3 bg-red-600 border-2 border-black mr-2"></div>
          <div className="w-3 h-3 bg-yellow-400 border-2 border-black mr-2"></div>
          <div className="w-3 h-3 bg-green-500 border-2 border-black"></div>
        </div>
      </div>
    </div>
  );
}