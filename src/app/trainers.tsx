'use client';

import React from 'react';
import { TrainerCard } from '@/components/TrainerCard';

export default function TrainerComparison() {
  const trainerData = {
    name: 'abcdef',
    role: 'mentor',
    department: 'cse',
    year: '4th',
    mobile: '+91 1234567890',
    email: 'abcdef@example.com',
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
    socialHandles: ['GitHub'],
  };

  const miniTrainers = [
    {
      name: 'rohan roy',
      role: 'core member',
      department: 'cse',
      year: '3rd',
      mobile: '+91 9876543210',
      email: 'rohanroy@example.com',
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
      socialHandles: ['GitHub'],
    },
    {
      name: 'RANIT SEN',
      role: 'coe member',
      department: 'cseds',
      year: '3rd',
      mobile: '+91 5555555555',
      email: 'ranitsen@example.com',
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
      socialHandles: ['GitHub'],
    },
    {
      name: 'Rima Roy',
      role: 'working member',
      department: 'cseds',
      year: '2nd',
      mobile: '+91 7777777777',
      email: 'rimaroy@example.com',
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
      socialHandles: ['GitHub'],
    },
    {
      name: 'priya das',
      role: 'coordinator',
      department: 'ece',
      year: '2nd',
      mobile: '+91 6666666666',
      email: 'priyadas@example.com',
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
      socialHandles: ['GitHub'],
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
            <div className="flex justify-center">
              <TrainerCard
                name={trainerData.name}
                role={trainerData.role}
                department={trainerData.department}
                year={trainerData.year}
                mobile={trainerData.mobile}
                email={trainerData.email}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full auto-rows-fr">
            {miniTrainers.map((trainer, index) => (
              <div key={index} className="flex justify-center h-full">
                <TrainerCard
                  name={trainer.name}
                  role={trainer.role}
                  department={trainer.department}
                  year={trainer.year}
                  mobile={trainer.mobile}
                  email={trainer.email}
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
      </main>
    </section>
  );
}
