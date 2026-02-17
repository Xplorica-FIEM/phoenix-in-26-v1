'use client';

import React from 'react';
import { TrainerCard } from '@/components/TrainerCard';

export default function Trainers() {
  const trainers = [
    {
      name: 'abcdef',
      role: 'MENTOR',
      department: 'CSE',
      year: '4th Year',
      mobile: '+91 90000 00000',
      socialHandles: ['@abcdef', 'github/abcdef'],
      photoUrl: undefined,
    },
    {
      name: 'SAGE RED',
      role: 'Backend Engineer',
      department: 'Infrastructure',
      year: '3rd Year',
      mobile: '+91 95555 12345',
      socialHandles: ['@sagered', 'linkedin/sagered'],
      photoUrl: undefined,
    },
    {
      name: 'MASTER GREEN',
      role: 'UI/UX Designer',
      department: 'Design',
      year: '2nd Year',
      mobile: '+91 98888 22222',
      socialHandles: ['@mastergreen', 'dribbble/mastergreen'],
      photoUrl: undefined,
    },
    {
      name: 'ELITE YELLOW',
      role: 'Full Stack',
      department: 'Engineering',
      year: '4th Year',
      mobile: '+91 97777 33333',
      socialHandles: ['@eliteyellow', 'github/eliteyellow'],
      photoUrl: undefined,
    },
    {
      name: 'ORBIT SILVER',
      role: 'Data Analyst',
      department: 'Insights',
      year: '3rd Year',
      mobile: '+91 96666 44444',
      socialHandles: ['@orbitsilver', 'linkedin/orbitsilver'],
      photoUrl: undefined,
    },
    {
      name: 'VOLT AZURE',
      role: 'Mobile Developer',
      department: 'Apps',
      year: '2nd Year',
      mobile: '+91 98888 55555',
      socialHandles: ['@voltazure', 'github/voltazure'],
      photoUrl: undefined,
    },
    {
      name: 'NOVA PEARL',
      role: 'Product Designer',
      department: 'Design',
      year: '4th Year',
      mobile: '+91 97777 66666',
      socialHandles: ['@novapearl', 'dribbble/novapearl'],
      photoUrl: undefined,
    },
    {
      name: 'EMBER BRONZE',
      role: 'QA Engineer',
      department: 'Quality',
      year: '3rd Year',
      mobile: '+91 95555 77777',
      socialHandles: ['@emberbronze', 'github/emberbronze'],
      photoUrl: undefined,
    },
    {
      name: 'AURORA TEAL',
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      year: '4th Year',
      mobile: '+91 94444 88888',
      socialHandles: ['@aurorateal', 'linkedin/aurorateal'],
      photoUrl: undefined,
    },
    {
      name: 'ZENITH IVORY',
      role: 'Security Analyst',
      department: 'Security',
      year: '2nd Year',
      mobile: '+91 93333 99999',
      socialHandles: ['@zenithivory', 'github/zenithivory'],
      photoUrl: undefined,
    },
    {
      name: 'PIXEL ROSE',
      role: 'UI Engineer',
      department: 'Frontend',
      year: '3rd Year',
      mobile: '+91 92222 11111',
      socialHandles: ['@pixelrose', 'dribbble/pixelrose'],
      photoUrl: undefined,
    },
    {
      name: 'COSMOS JADE',
      role: 'Backend Engineer',
      department: 'Services',
      year: '4th Year',
      mobile: '+91 91111 22222',
      socialHandles: ['@cosmosjade', 'github/cosmosjade'],
      photoUrl: undefined,
    },
  ];

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[215px] md:pt-[225px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center max-w-6xl text-center space-y-12 w-full">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg">
              Trainers
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4">
              Meet the masters who shape innovation and excellence across every domain
            </p>
          </div>

          {/* Trainer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {trainers.map((trainer, index) => (
              <div key={index} className="flex justify-center">
                <TrainerCard
                  name={trainer.name}
                  role={trainer.role}
                  department={trainer.department}
                  year={trainer.year}
                  mobile={trainer.mobile}
                  socialHandles={trainer.socialHandles}
                  photoUrl={trainer.photoUrl}
                />
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-12 pt-8 border-t border-blue-400/20 w-full">
            <p className="text-sm md:text-base text-blue-300/70 font-mono tracking-wide">
              [ Interested in joining our elite team? ]
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-2">
              Contact us to learn more about opportunities
            </p>
          </div>
        </main>
      </div>
    </>
  );
}


