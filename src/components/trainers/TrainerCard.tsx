'use client';

import { Trainer } from '@/types/trainer';

interface TrainerCardProps {
  trainer: Trainer;
  onOpenModal: (trainer: Trainer) => void;
}

const rarityColors = {
  Common: 'from-gray-500 to-gray-600',
  Rare: 'from-blue-500 to-blue-600',
  Epic: 'from-purple-500 to-purple-600',
  Legendary: 'from-yellow-400 to-orange-500'
};

export default function TrainerCard({ trainer, onOpenModal }: TrainerCardProps) {
  // Determine rarity border color
  const rarityGradient = rarityColors[trainer.rarity];

  return (
    <div 
      className="relative h-[480px]"
      onClick={() => onOpenModal(trainer)}
    >
      {/* Card container - static, no flip animation */}
      <div className="relative w-full h-full cursor-pointer">
        <div className={`
          relative h-full rounded-xl overflow-hidden
          bg-gradient-to-br from-slate-900/90 to-slate-800/90
          backdrop-blur-sm border-2 border-transparent
          bg-clip-padding
          hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]
          transition-shadow duration-300
          before:absolute before:inset-0 before:rounded-xl
          before:p-[2px] before:bg-gradient-to-br before:${rarityGradient}
          before:-z-10 before:blur-sm before:opacity-75
        `}>
          {/* Rarity Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className={`
              px-3 py-1 rounded-full text-xs font-['Orbitron'] font-bold
              bg-gradient-to-r ${rarityGradient}
              shadow-lg
            `}>
              {trainer.rarity.toUpperCase()}
            </span>
          </div>

          {/* Trainer Image */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Placeholder for trainer image */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-6xl">👤</span>
              </div>
            </div>
            {/* Pokédex ID */}
            <div className="absolute top-4 left-4">
              <span className="text-cyan-400 font-['Orbitron'] text-sm">
                #{trainer.id.toString().padStart(3, '0')}
              </span>
            </div>
          </div>

          {/* Trainer Info */}
          <div className="p-6 space-y-3">
            <h3 className="text-2xl font-['Orbitron'] font-bold text-cyan-300">
              {trainer.name}
            </h3>
            <p className="text-sm text-purple-300 font-semibold">
              {trainer.role}
            </p>
            <p className="text-xs text-slate-400">
              {trainer.department}
            </p>
            
            {/* Category Badge */}
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-['Orbitron']">
                {trainer.category}
              </span>
            </div>

            {/* Click hint */}
            <p className="text-xs text-slate-500 italic pt-2">
              Click for full details →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
