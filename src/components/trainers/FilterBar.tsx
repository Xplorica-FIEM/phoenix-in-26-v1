'use client';

import { TrainerCategory } from '@/types/trainer';

interface FilterBarProps {
  activeFilter: 'ALL' | TrainerCategory;
  onFilterChange: (filter: 'ALL' | TrainerCategory) => void;
}

const categories: Array<'ALL' | TrainerCategory> = [
  'ALL',
  'LEAD TRAINER',
  'ELITE FOUR',
  'GYM TRAINERS',
  'SUPPORT TEAM',
  'COORDINATOR'
];

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex gap-3 px-4 min-w-max justify-center">
        {categories.map((category) => {
          const isActive = activeFilter === category;
          return (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`
                px-6 py-2.5 rounded-full font-['Orbitron'] text-sm
                transition-all duration-300 whitespace-nowrap
                border-2 transform hover:scale-105
                ${isActive 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                  : 'bg-slate-800/40 border-slate-600 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400'
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
