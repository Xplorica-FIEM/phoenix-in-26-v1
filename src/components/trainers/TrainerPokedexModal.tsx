'use client';

import { useEffect } from 'react';
import { Trainer } from '@/types/trainer';

interface TrainerPokedexModalProps {
  trainer: Trainer | null;
  onClose: () => void;
}

const rarityColors = {
  Common: 'from-gray-500 to-gray-600',
  Rare: 'from-blue-500 to-blue-600',
  Epic: 'from-purple-500 to-purple-600',
  Legendary: 'from-yellow-400 to-orange-500'
};

const typeColors = {
  Electric: 'bg-yellow-400/80',
  Fire: 'bg-red-500/80',
  Water: 'bg-blue-500/80',
  Grass: 'bg-green-500/80',
  Psychic: 'bg-pink-500/80',
  Dragon: 'bg-purple-600/80'
};

export default function TrainerPokedexModal({ trainer, onClose }: TrainerPokedexModalProps) {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (trainer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [trainer]);

  if (!trainer) return null;

  const rarityGradient = rarityColors[trainer.rarity];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 border-2 border-red-500 rounded-full text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Left: Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 mx-auto md:mx-0">
                <div className={`
                  absolute inset-0 rounded-xl
                  bg-gradient-to-br ${rarityGradient}
                  blur-xl opacity-30
                `} />
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/30 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for trainer image */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-8xl">👤</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Basic Info */}
            <div className="flex-1 space-y-4">
              {/* Pokédex Number */}
              <div className="flex items-center gap-4">
                <span className="text-cyan-400 font-['Orbitron'] text-2xl font-bold">
                  #{trainer.id.toString().padStart(3, '0')}
                </span>
                <span className={`
                  px-4 py-1.5 rounded-full text-sm font-['Orbitron'] font-bold
                  bg-gradient-to-r ${rarityGradient}
                  shadow-lg
                `}>
                  {trainer.rarity.toUpperCase()}
                </span>
              </div>

              {/* Name */}
              <h2 className="text-4xl md:text-5xl font-['Orbitron'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {trainer.name}
              </h2>

              {/* Role & Department */}
              <div className="space-y-2">
                <p className="text-lg text-purple-300 font-semibold">
                  {trainer.role}
                </p>
                <p className="text-sm text-slate-400">
                  {trainer.department} • {trainer.category}
                </p>
              </div>

              {/* Pokémon Type */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">Type:</span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${typeColors[trainer.pokemonType]} text-white shadow-lg`}>
                  {trainer.pokemonType}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8" />

          {/* Stats Section */}
          <div className="mb-8">
            <h3 className="text-xl font-['Orbitron'] text-cyan-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> TRAINER STATS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(trainer.stats).map(([stat, value]) => (
                <div key={stat} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300 capitalize font-['Orbitron']">
                      {stat}
                    </span>
                    <span className="text-lg text-cyan-300 font-mono font-bold">
                      {value}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${value}%`,
                        boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="text-xl font-['Orbitron'] text-cyan-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span> SKILLS & ABILITIES
            </h3>
            <div className="flex flex-wrap gap-3">
              {trainer.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-sm text-slate-200 hover:bg-slate-700 hover:border-cyan-500 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Signature Move */}
          <div className="mb-8">
            <h3 className="text-xl font-['Orbitron'] text-cyan-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">💫</span> SIGNATURE MOVE
            </h3>
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6 rounded-xl border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <p className="text-xl font-semibold text-white">
                {trainer.signatureMove}
              </p>
            </div>
          </div>

          {/* Hidden Ability */}
          <div>
            <h3 className="text-xl font-['Orbitron'] text-purple-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span> HIDDEN ABILITY
            </h3>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <p className="text-slate-200 italic">
                {trainer.hiddenAbility}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-center text-sm text-slate-500 font-['Orbitron']">
              Press <kbd className="px-2 py-1 bg-slate-700 rounded text-cyan-400">ESC</kbd> or click outside to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
