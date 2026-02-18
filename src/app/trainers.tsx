'use client';

import React from 'react';
import { TrainerCard } from '@/components/TrainerCard';
import { MiniTrainerCard } from '@/components/MiniTrainerCard';

export default function TrainerComparison() {
  const trainerData = {
    name: 'CHAMPION BLUE',
    role: 'Lead Developer',
    department: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
  };

  const miniTrainers = [
    {
      name: 'SAGE RED',
      role: 'Backend Engineer',
      skills: ['Node.js', 'Python', 'DevOps'],
    },
    {
      name: 'MASTER GREEN',
      role: 'UI/UX Designer',
      skills: ['Figma', 'Animation', 'Branding'],
    },
    {
      name: 'ELITE YELLOW',
      role: 'Full Stack',
      skills: ['JavaScript', 'SQL', 'API Design'],
    },
    {
      name: 'CRYSTAL PINK',
      role: 'Data Scientist',
      skills: ['Python', 'ML', 'Analytics'],
    },
  ];

  return (
    <section className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[215px] md:pt-[225px] bg-cover bg-center bg-no-repeat" id='trainers'>
      <main className="flex flex-col items-center max-w-7xl text-center space-y-16 w-full">
        {/* Full Size Card */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold font-press-start tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg mb-8">
            Trainer Cards
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-orbitron text-blue-300 mb-4">Full Size Card</h2>
            <div className="flex justify-center">
              <TrainerCard
                name={trainerData.name}
                role={trainerData.role}
                department={trainerData.department}
                skills={trainerData.skills}
              />
            </div>
          </div>
        </div>

        {/* Mini Cards Grid */}
        <div>
          <h2 className="text-xl font-orbitron text-blue-300 mb-6">Mini Trainer Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {miniTrainers.map((trainer, index) => (
              <div key={index} className="flex justify-center">
                <MiniTrainerCard
                  name={trainer.name}
                  role={trainer.role}
                  skills={trainer.skills}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info section */}
        <div className="mt-12 pt-8 border-t border-blue-400/20 w-full">
          <p className="text-sm md:text-base text-blue-300/70 font-mono tracking-wide">
            [ Two Sizes Available ]
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-2">
            Use TrainerCard for detailed profiles or MiniTrainerCard for compact layouts
          </p>
        </div>
      </main>
    </section>
  );
}
