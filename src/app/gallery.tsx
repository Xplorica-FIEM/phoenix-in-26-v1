'use client';

import React from 'react';
import Image from 'next/image';

const dummyGalleryItems = [
  { id: 1, title: 'Event 2025', subtitle: 'Phoenix Fest', image: '/placeholder-image.jpg' },
  { id: 2, title: 'Workshop', subtitle: 'Tech Session', image: '/placeholder-image.jpg' },
  { id: 3, title: 'Competition', subtitle: 'Code Arena', image: '/placeholder-image.jpg' },
  { id: 4, title: 'Ceremony', subtitle: 'Opening Day', image: '/placeholder-image.jpg' },
  { id: 5, title: 'Activity', subtitle: 'Team Building', image: '/placeholder-image.jpg' },
  { id: 6, title: 'Awards', subtitle: 'Prize Night', image: '/placeholder-image.jpg' },
];

export default function Gallery() {
  return (
    <>
      <section 
        className="min-h-screen w-full flex flex-col items-center font-sans p-4 pt-[140px] md:pt-[150px] pb-8 bg-cover bg-center bg-no-repeat" 
        id="gallery"
      >
        <main className="flex flex-col items-center max-w-7xl w-full space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-yellow-400 drop-shadow-lg mb-4 font-press-start">
            Gallery
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-4">
            {dummyGalleryItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative w-full max-w-[240px] mx-auto h-[300px] bg-[rgb(38,38,38)] rounded-lg overflow-visible transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[10px_8px_20px_rgba(255,215,0,0.3)] shadow-[7px_5px_10px_rgba(0,0,0,0.5)] opacity-0 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {/* Floating Brackets Effect */}
                <span className="absolute top-1/2 -translate-y-1/2 -left-8 text-5xl font-bold text-yellow-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-left-4 pointer-events-none select-none drop-shadow-[0_0_10px_#eab308] z-10">[</span>
                <span className="absolute top-1/2 -translate-y-1/2 -right-8 text-5xl font-bold text-yellow-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-right-4 pointer-events-none select-none drop-shadow-[0_0_10px_#eab308] z-10">]</span>

                {/* Card Header */}
                <div className="h-20 bg-yellow-500 relative rounded-t-lg">
                  <div className="absolute top-4 left-4 w-[50px] h-[50px] rounded-[10px] overflow-hidden bg-white/20">
                    <Image
                      src="/pball.png"
                      alt="Pokeball"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="absolute top-[18px] left-[75px] text-gray-800 text-sm font-bold m-0 p-0">
                    {item.title}
                  </p>
                  <p className="absolute top-[42px] left-[75px] text-gray-700 text-xs font-semibold m-0 p-0">
                    {item.subtitle}
                  </p>
                </div>

                {/* Image Area */}
                <div className="bg-[#414141] m-2.5 h-[150px] rounded-lg overflow-hidden flex items-center justify-center relative sm:h-[130px] md:h-[150px]">
                  {/* <Image src={item.image} alt={item.title} fill className="object-cover" /> */}
                </div>

                {/* Button Container */}
                <div className="flex justify-center items-center py-2">
                  <button className="relative z-10 font-bold text-sm cursor-pointer p-[1px] -translate-x-[3px] -translate-y-[3px] bg-gray-800 rounded-full transition-transform duration-150 ease-in-out text-gray-800 shadow-[2px_2px_0px_2px_#fafaf9,3px_3px_0px_2px_#1f2937] hover:translate-x-0 hover:translate-y-0 hover:shadow-[0_0_0_2px_#fafaf9] active:outline-none group/btn">
                    <div className="relative bg-yellow-500 rounded-full border-2 border-white/20 overflow-hidden">
                      {/* Dotted Pattern Overlay */}
                      <div className="absolute inset-0 opacity-30 animate-dots bg-[length:6px_6px] mix-blend-hard-light" 
                           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 20%, transparent 20%), radial-gradient(rgba(255,255,255,0.8) 20%, transparent 20%)' }}>
                      </div>
                      
                      <span className="relative flex items-center justify-center px-4 py-2 gap-1 text-xs text-gray-800 drop-shadow-[0_-1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px]">
                        <span className="opacity-0 translate-x-[5px] transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:translate-x-0">[</span>
                        <span className="mx-0.5">View Recaps</span>
                        <span className="opacity-0 -translate-x-[5px] transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:translate-x-0">]</span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>

      {/* 
        We use a minimal style block for custom Keyframes 
        because Tailwind configuration is not accessible here.
      */}
      <style jsx global>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        @keyframes dots {
          0% { background-position: 0 0, 3px 3px; }
          100% { background-position: 6px 0, 9px 3px; }
        }
        .animate-dots {
          animation: dots 0.5s infinite linear;
        }
      `}</style>
    </>
  );
}