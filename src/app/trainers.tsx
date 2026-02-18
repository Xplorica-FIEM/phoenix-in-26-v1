'use client';

import React from 'react';
import { TrainerCard } from '@/components/TrainerCard';

export default function TrainerComparison() {
  const trainerData = {
    name: 'CHAMPION BLUE',
    role: 'Lead Developer',
    department: 'Frontend',
    year: '2024',
    mobile: '+91 1234567890',
    rarity: 'Legendary' as const,
    stats: [
      { name: 'Coding Power', value: 92 },
      { name: 'Logic IQ', value: 96 },
      { name: 'Creativity', value: 88 },
      { name: 'Speed', value: 85 },
      { name: 'Leadership', value: 90 },
    ],
    signatureMove: 'Debug Storm',
    signatureMoveDescription: 'Identifies and fixes critical bugs with precision.',
    hiddenAbility: 'Code Optimization',
    hiddenAbilityDescription: 'Turns messy code into elegant solutions instantly.',
    socialHandles: ['GitHub', 'LinkedIn', 'Twitter'],
  };

  const miniTrainers = [
    {
      name: 'SAGE RED',
      role: 'Backend Engineer',
      department: 'Backend',
      year: '2023',
      mobile: '+91 9876543210',
      rarity: 'Rare' as const,
      stats: [
        { name: 'Coding Power', value: 88 },
        { name: 'Logic IQ', value: 92 },
        { name: 'Creativity', value: 75 },
        { name: 'Speed', value: 82 },
        { name: 'Leadership', value: 80 },
      ],
      signatureMove: 'API Fortress',
      signatureMoveDescription: 'Builds robust APIs that never go down.',
      hiddenAbility: 'Database Mastery',
      hiddenAbilityDescription: 'Optimizes queries to lightning speed.',
      socialHandles: ['GitHub', 'Stack Overflow'],
    },
    {
      name: 'MASTER GREEN',
      role: 'UI/UX Designer',
      department: 'Design',
      year: '2022',
      mobile: '+91 5555555555',
      rarity: 'Epic' as const,
      stats: [
        { name: 'Coding Power', value: 75 },
        { name: 'Logic IQ', value: 80 },
        { name: 'Creativity', value: 98 },
        { name: 'Speed', value: 88 },
        { name: 'Leadership', value: 85 },
      ],
      signatureMove: 'Pixel Perfect',
      signatureMoveDescription: 'Creates designs that convert users.',
      hiddenAbility: 'User Empathy',
      hiddenAbilityDescription: 'Understands user needs intuitively.',
      socialHandles: ['Dribbble', 'Behance'],
    },
    {
      name: 'ELITE YELLOW',
      role: 'Full Stack',
      department: 'Full Stack',
      year: '2023',
      mobile: '+91 7777777777',
      rarity: 'Rare' as const,
      stats: [
        { name: 'Coding Power', value: 85 },
        { name: 'Logic IQ', value: 88 },
        { name: 'Creativity', value: 82 },
        { name: 'Speed', value: 90 },
        { name: 'Leadership', value: 78 },
      ],
      signatureMove: 'Stack Surge',
      signatureMoveDescription: 'Seamlessly connects frontend and backend.',
      hiddenAbility: 'Problem Solving',
      hiddenAbilityDescription: 'Finds the optimal solution every time.',
      socialHandles: ['GitHub', 'Dev.to'],
    },
    {
      name: 'CRYSTAL PINK',
      role: 'Lead Designer',
      department: 'Design',
      year: '2021',
      mobile: '+91 6666666666',
      rarity: 'Mythic' as const,
      stats: [
        { name: 'Coding Power', value: 80 },
        { name: 'Logic IQ', value: 85 },
        { name: 'Creativity', value: 99 },
        { name: 'Speed', value: 92 },
        { name: 'Leadership', value: 95 },
      ],
      signatureMove: 'Vision Manifest',
      signatureMoveDescription: 'Transforms ideas into stunning reality.',
      hiddenAbility: 'Design Intuition',
      hiddenAbilityDescription: 'Sets trends that others follow.',
      socialHandles: ['Portfolio', 'Instagram'],
    },
  ];

  return (
    <section className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[215px] md:pt-[225px] bg-cover bg-center bg-no-repeat" id='trainers'>
      <main className="flex flex-col items-center max-w-7xl text-center space-y-16 w-full">
        {/* Full Size Card */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg mb-8">
            Trainer Cards
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-orbitron text-blue-300 mb-4">Full Size Card - Legendary Trainer</h2>
            <p className="text-sm text-blue-300/70 mb-4">Click card to flip and view stats • Hover for 3D tilt and shine effects</p>
            <div className="flex justify-center">
              <TrainerCard
                name={trainerData.name}
                role={trainerData.role}
                department={trainerData.department}
                year={trainerData.year}
                mobile={trainerData.mobile}
                rarity={trainerData.rarity}
                stats={trainerData.stats}
                signatureMove={trainerData.signatureMove}
                signatureMoveDescription={trainerData.signatureMoveDescription}
                hiddenAbility={trainerData.hiddenAbility}
                hiddenAbilityDescription={trainerData.hiddenAbilityDescription}
                socialHandles={trainerData.socialHandles}
              />
            </div>
          </div>
        </div>

        {/* Mini Cards Grid */}
        <div>
          <h2 className="text-xl font-orbitron text-blue-300 mb-6">Trainer Collection - Various Rarities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {miniTrainers.map((trainer, index) => (
              <div key={index} className="flex justify-center">
                <TrainerCard
                  name={trainer.name}
                  role={trainer.role}
                  department={trainer.department}
                  year={trainer.year}
                  mobile={trainer.mobile}
                  rarity={trainer.rarity}
                  stats={trainer.stats}
                  signatureMove={trainer.signatureMove}
                  signatureMoveDescription={trainer.signatureMoveDescription}
                  hiddenAbility={trainer.hiddenAbility}
                  hiddenAbilityDescription={trainer.hiddenAbilityDescription}
                  socialHandles={trainer.socialHandles}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info section */}
        <div className="mt-12 pt-8 border-t border-blue-400/20 w-full">
          <p className="text-sm md:text-base text-blue-300/70 font-mono tracking-wide">
            [ ENHANCED TRAINER CARDS ]
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-2">
            ✨ 3D Tilt Hover • 🔄 Flip Animation • ⭐ Rarity Glows • 📊 Animated Stats • 🌟 Holographic Shine
          </p>
        </div>
      </main>
    </section>
  );
}
