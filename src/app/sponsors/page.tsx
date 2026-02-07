import React from 'react';
import Navbar from '@/components/Navbar';

export default function Sponsors() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[215px] md:pt-[225px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center max-w-4xl text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-500 drop-shadow-lg">
            Sponsors
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Our partners who make this possible. Interested in sponsoring? 
            Get in touch.
          </p>
        </main>
      </div>
    </>
  );
}
