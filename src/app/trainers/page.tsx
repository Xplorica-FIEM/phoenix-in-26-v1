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
    {
      name: 'TITAN GOLD',
      role: 'Frontend Lead',
      department: 'Engineering',
      year: '4th Year',
      mobile: '+91 90555 33333',
      socialHandles: ['@titangold', 'github/titangold'],
      photoUrl: undefined,
    },
    {
      name: 'PRISM INDIGO',
      role: 'ML Engineer',
      department: 'AI Research',
      year: '3rd Year',
      mobile: '+91 96444 44444',
      socialHandles: ['@prismindigo', 'linkedin/prismindigo'],
      photoUrl: undefined,
    },
    {
      name: 'SONIC CRIMSON',
      role: 'Performance Analyst',
      department: 'Optimization',
      year: '2nd Year',
      mobile: '+91 99333 55555',
      socialHandles: ['@soniccrimson', 'github/soniccrimson'],
      photoUrl: undefined,
    },
    {
      name: 'ECLIPSE SILVER',
      role: 'Database Admin',
      department: 'Infrastructure',
      year: '3rd Year',
      mobile: '+91 94222 66666',
      socialHandles: ['@eclipsesilver', 'linkedin/eclipsesilver'],
      photoUrl: undefined,
    },
    {
      name: 'BLAZE CRIMSON',
      role: 'Frontend Developer',
      department: 'Engineering',
      year: '2nd Year',
      mobile: '+91 91111 77777',
      socialHandles: ['@blazecrimson', 'github/blazecrimson'],
      photoUrl: undefined,
    },
    {
      name: 'STORM NAVY',
      role: 'Backend Engineer',
      department: 'Services',
      year: '4th Year',
      mobile: '+91 98888 88888',
      socialHandles: ['@stormnavy', 'linkedin/stormnavy'],
      photoUrl: undefined,
    },
    {
      name: 'CRYSTAL VIOLET',
      role: 'UX Designer',
      department: 'Design',
      year: '3rd Year',
      mobile: '+91 95555 99999',
      socialHandles: ['@crystalviolet', 'dribbble/crystalviolet'],
      photoUrl: undefined,
    },
    {
      name: 'PULSE MAGENTA',
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      year: '2nd Year',
      mobile: '+91 92222 11110',
      socialHandles: ['@pulsemagenta', 'github/pulsemagenta'],
      photoUrl: undefined,
    },
    {
      name: 'FROST CYAN',
      role: 'Full Stack Developer',
      department: 'Engineering',
      year: '3rd Year',
      mobile: '+91 99999 22220',
      socialHandles: ['@frostcyan', 'github/frostcyan'],
      photoUrl: undefined,
    },
    {
      name: 'NEXUS LIME',
      role: 'ML Engineer',
      department: 'AI Research',
      year: '4th Year',
      mobile: '+91 90000 33330',
      socialHandles: ['@nexuslime', 'linkedin/nexuslime'],
      photoUrl: undefined,
    },
    {
      name: 'VORTEX ORANGE',
      role: 'QA Automation',
      department: 'Quality',
      year: '2nd Year',
      mobile: '+91 91111 44440',
      socialHandles: ['@vortekorange', 'github/vortekorange'],
      photoUrl: undefined,
    },
    {
      name: 'LUMINA GOLD',
      role: 'Product Manager',
      department: 'Product',
      year: '4th Year',
      mobile: '+91 92222 55550',
      socialHandles: ['@luminagold', 'linkedin/luminagold'],
      photoUrl: undefined,
    },
    {
      name: 'APEX SLATE',
      role: 'Security Engineer',
      department: 'Security',
      year: '3rd Year',
      mobile: '+91 93333 66660',
      socialHandles: ['@apexslate', 'github/apexslate'],
      photoUrl: undefined,
    },
    {
      name: 'SURGE TURQUOISE',
      role: 'Cloud Architect',
      department: 'Infrastructure',
      year: '4th Year',
      mobile: '+91 94444 77770',
      socialHandles: ['@surgeturquoise', 'linkedin/surgeturquoise'],
      photoUrl: undefined,
    },
    {
      name: 'QUANTUM PLUM',
      role: 'Data Scientist',
      department: 'Data Science',
      year: '3rd Year',
      mobile: '+91 95555 88880',
      socialHandles: ['@quantumplum', 'linkedin/quantumplum'],
      photoUrl: undefined,
    },
    {
      name: 'RADIANCE CORAL',
      role: 'UI Engineer',
      department: 'Frontend',
      year: '2nd Year',
      mobile: '+91 96666 99990',
      socialHandles: ['@radiancecoral', 'github/radiancecoral'],
      photoUrl: undefined,
    },
    {
      name: 'ECLIPSE GOLD',
      role: 'Systems Engineer',
      department: 'Infrastructure',
      year: '4th Year',
      mobile: '+91 97777 10001',
      socialHandles: ['@eclipsegold', 'github/eclipsegold'],
      photoUrl: undefined,
    },
    {
      name: 'NOVA LIME',
      role: 'Full Stack Engineer',
      department: 'Engineering',
      year: '3rd Year',
      mobile: '+91 98888 20002',
      socialHandles: ['@novalime', 'github/novalime'],
      photoUrl: undefined,
    },
    {
      name: 'CIPHER BRONZE',
      role: 'Cryptography Expert',
      department: 'Security',
      year: '4th Year',
      mobile: '+91 99999 30003',
      socialHandles: ['@cipherbronze', 'linkedin/cipherbronze'],
      photoUrl: undefined,
    },
    {
      name: 'FLUX SILVER',
      role: 'Network Engineer',
      department: 'Infrastructure',
      year: '3rd Year',
      mobile: '+91 90000 40004',
      socialHandles: ['@fluxsilver', 'github/fluxsilver'],
      photoUrl: undefined,
    },
    {
      name: 'PRISM SCARLET',
      role: 'Graphics Developer',
      department: 'Engineering',
      year: '2nd Year',
      mobile: '+91 91111 50005',
      socialHandles: ['@prismscarlet', 'github/prismscarlet'],
      photoUrl: undefined,
    },
    {
      name: 'DYNAMO AQUA',
      role: 'Performance Engineer',
      department: 'Optimization',
      year: '4th Year',
      mobile: '+91 92222 60006',
      socialHandles: ['@dynamoaqua', 'github/dynamoaqua'],
      photoUrl: undefined,
    },
    {
      name: 'LUMINOX KHAKI',
      role: 'Tech Lead',
      department: 'Engineering',
      year: '4th Year',
      mobile: '+91 93333 70007',
      socialHandles: ['@luminoxkhaki', 'linkedin/luminoxkhaki'],
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


