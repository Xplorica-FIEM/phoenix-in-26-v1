'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
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
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-4 pt-[140px] md:pt-[150px] pb-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center max-w-7xl w-full space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold font-press-start tracking-wider text-yellow-400 drop-shadow-lg mb-4">
            Gallery
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-4">
            {dummyGalleryItems.map((item, index) => (
              <div key={item.id} className="gallery-card group" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="imge">
                  <div className="Usericon">
                    <Image
                      src="/pball.png"
                      alt="Pokeball"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="UserName">{item.title}</p>
                  <p className="Id">{item.subtitle}</p>
                </div>
                <div className="Description">
                  {/* Image will be added here */}
                </div>
                <div className="button-container">
                  <button className="retro-button">
                    <div>
                      <span>
                        <span className="bracket-left">[</span>
                        <span className="button-text">View Recaps</span>
                        <span className="bracket-right">]</span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx>{`
        .gallery-card {
          width: 100%;
          max-width: 240px;
          margin: 0 auto;
          height: 300px;
          background: rgb(38, 38, 38);
          box-shadow: 7px 5px 10px rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          animation: slideInUp 0.6s ease-out forwards;
          position: relative;
        }

        .gallery-card::before,
        .gallery-card::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 3rem;
          font-weight: bold;
          color: #eab308;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 10;
          text-shadow: 0 0 10px #eab308;
        }

        .gallery-card::before {
          content: '[';
          left: -30px;
        }

        .gallery-card::after {
          content: ']';
          right: -30px;
        }

        .gallery-card:hover::before {
          opacity: 1;
          left: -15px;
        }

        .gallery-card:hover::after {
          opacity: 1;
          right: -15px;
        }

        .gallery-card:hover {
          transform: translateY(-5px);
          box-shadow: 10px 8px 20px rgba(255, 215, 0, 0.3);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .imge {
          height: 80px;
          background-color: #eab308;
          position: relative;
        }

        .imge .Usericon {
          position: absolute;
          top: 15px;
          left: 15px;
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }

        .imge .UserName {
          color: #1f2937;
          font-size: 14px;
          font-weight: bold;
          position: absolute;
          top: 18px;
          left: 75px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          margin: 0;
        }

        .imge .Id {
          color: #374151;
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          top: 42px;
          left: 75px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          margin: 0;
        }

        .Description {
          background-color: #414141;
          margin: 10px;
          height: 150px;
          border-radius: 8px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .Description img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
        }

        .retro-button {
          --stone-50: #fafaf9;
          --stone-800: #1f2937;
          --yellow-400: #000000;

          font-size: 0.875rem;
          cursor: pointer;
          position: relative;
          z-index: 1;
          font-family: "Rubik", sans-serif;
          font-weight: bold;
          line-height: 1;
          padding: 1px;
          transform: translate(-3px, -3px);
          outline: 2px solid transparent;
          outline-offset: 3px;
          border-radius: 9999px;
          background-color: var(--stone-800);
          color: var(--stone-800);
          transition:
            transform 150ms ease,
            box-shadow 150ms ease;
          text-align: center;
          box-shadow:
            0.5px 0.5px 0 0 var(--stone-800),
            1px 1px 0 0 var(--stone-800),
            1.5px 1.5px 0 0 var(--stone-800),
            2px 2px 0 0 var(--stone-800),
            2.5px 2.5px 0 0 var(--stone-800),
            3px 3px 0 0 var(--stone-800),
            0 0 0 2px var(--stone-50),
            0.5px 0.5px 0 2px var(--stone-50),
            1px 1px 0 2px var(--stone-50),
            1.5px 1.5px 0 2px var(--stone-50),
            2px 2px 0 2px var(--stone-50),
            2.5px 2.5px 0 2px var(--stone-50),
            3px 3px 0 2px var(--stone-50);
        }

        .retro-button:hover {
          transform: translate(0, 0);
          box-shadow: 0 0 0 2px var(--stone-50);
        }

        .retro-button:active {
          outline-color: var(--yellow-400);
        }

        .retro-button > div {
          position: relative;
          pointer-events: none;
          background-color: #eab308;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
        }

        .retro-button > div::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          opacity: 0.3;
          background-image: radial-gradient(
              rgb(255 255 255 / 60%) 20%,
              transparent 20%
            ),
            radial-gradient(rgb(255 255 255 / 80%) 20%, transparent 20%);
          background-position:
            0 0,
            3px 3px;
          background-size: 6px 6px;
          mix-blend-mode: hard-light;
          animation: dots 0.5s infinite linear;
        }

        .retro-button > div > span {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          gap: 0.25rem;
          filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.15));
          color: #1f2937;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .bracket-left,
        .bracket-right {
          display: inline-block;
          opacity: 0;
          transition: all 0.2s ease;
          color: #1f2937;
        }

        .bracket-left {
          transform: translateX(5px);
        }

        .bracket-right {
          transform: translateX(-5px);
        }

        .retro-button:hover .bracket-left {
          opacity: 1;
          transform: translateX(0);
        }

        .retro-button:hover .bracket-right {
          opacity: 1;
          transform: translateX(0);
        }

        .button-text {
          margin: 0 2px;
        }

        .retro-button > div > span:active {
          transform: translateY(1px);
        }

        @keyframes dots {
          0% {
            background-position:
              0 0,
              3px 3px;
          }
          100% {
            background-position:
              6px 0,
              9px 3px;
          }
        }

        @media (max-width: 640px) {
          .gallery-card {
            max-width: 220px;
            height: 280px;
          }

          .Description {
            height: 130px;
          }
        }
      `}</style>
    </>
  );
}
