import React from 'react';

export default function Trainers() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[215px] md:pt-[225px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center max-w-4xl text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg">
            Trainers
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Meet the elite trainers who have mastered the art of code and design.
            Coming soon.
          </p>
        </main>
      </div>
    </>
  );
}
