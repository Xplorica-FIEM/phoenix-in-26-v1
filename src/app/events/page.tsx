import React from 'react';
import Navbar from '@/components/Navbar';

export default function Events() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[160px] md:pt-[170px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center max-w-4xl text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold font-press-start tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-500 drop-shadow-lg">
            Events
          </h1>
        </main>
      </div>
    </>
  );
}
