'use client';

import { useState, useEffect } from 'react';
import { trainers } from '@/data/trainers';
import { Trainer, TrainerCategory } from '@/types/trainer';
import FilterBar from '@/components/trainers/FilterBar';
import TrainerCard from '@/components/trainers/TrainerCard';
import TrainerPokedexModal from '@/components/trainers/TrainerPokedexModal';

export default function TrainersPage() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | TrainerCategory>('ALL');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>(trainers);
  const [isVisible, setIsVisible] = useState(false);

  // Filter trainers based on active category
  useEffect(() => {
    if (activeFilter === 'ALL') {
      setFilteredTrainers(trainers);
    } else {
      setFilteredTrainers(trainers.filter(t => t.category === activeFilter));
    }
  }, [activeFilter]);

  // Trigger fade-in animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Galaxy Background Layer */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-purple-950/20 to-slate-950/10 animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Grid overlay for tech feel */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(34, 211, 238) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(34, 211, 238) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className={`
          text-center py-16 px-4 pt-16 transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <h1 className="text-5xl md:text-7xl font-['Orbitron'] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-glow-pulse">
            MEET THE TRAINERS
          </h1>
          
          {/* Animated underline */}
          <div className="flex justify-center mb-6">
            <div className="h-1 w-64 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full animate-pulse" />
          </div>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            The Master Trainers Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-['Orbitron']">Phoenix</span>
          </p>
        </div>

        {/* Filter Bar */}
        <div className={`
          transition-all duration-1000 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <FilterBar 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Trainers Grid */}
        <div className={`
          container mx-auto px-4 py-12 transition-all duration-1000 delay-400
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTrainers.map((trainer, index) => (
              <div
                key={trainer.id}
                className="animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <TrainerCard 
                  trainer={trainer}
                  onOpenModal={setSelectedTrainer}
                />
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredTrainers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-slate-400 font-['Orbitron']">
                No trainers found in this category
              </p>
              <p className="text-slate-500 mt-2">
                Try selecting a different filter
              </p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/30">
              <div className="text-4xl font-['Orbitron'] font-bold text-cyan-400">
                {trainers.length}
              </div>
              <div className="text-sm text-slate-400 mt-2">Total Trainers</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
              <div className="text-4xl font-['Orbitron'] font-bold text-purple-400">
                {trainers.filter(t => t.rarity === 'Legendary').length}
              </div>
              <div className="text-sm text-slate-400 mt-2">Legendary</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30">
              <div className="text-4xl font-['Orbitron'] font-bold text-yellow-400">
                {trainers.filter(t => t.category === 'ELITE FOUR').length}
              </div>
              <div className="text-sm text-slate-400 mt-2">Elite Four</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-xl border border-green-500/30">
              <div className="text-4xl font-['Orbitron'] font-bold text-green-400">
                6
              </div>
              <div className="text-sm text-slate-400 mt-2">Departments</div>
            </div>
          </div>
        </div>

        {/* Pokédex Modal */}
        <TrainerPokedexModal 
          trainer={selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
        />
      </div>
    </div>
  );
}
