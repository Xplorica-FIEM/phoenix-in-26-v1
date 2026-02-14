'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import PokedexModal from '@/components/pokedex/PokedexModal';

export default function PokedexPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex items-center justify-center p-4 pt-[140px] md:pt-[150px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <PokedexModal isPage={true} />
      </div>
    </>
  );
}
