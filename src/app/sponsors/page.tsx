'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

const sponsors = [
  { name: 'Sponsor 1' },
  { name: 'Sponsor 2' },
  { name: 'Sponsor 3' },
  { name: 'Sponsor 4' },
  { name: 'Sponsor 5' },
  { name: 'Sponsor 6' },
  { name: 'Sponsor 7' },
  { name: 'Sponsor 8' },
];

export default function Sponsors() {
  const duplicated = [...sponsors, ...sponsors];

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[180px] md:pt-[190px] bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center w-full text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-500 drop-shadow-lg">
            Sponsors
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Our partners who make this possible. Interested in sponsoring?
            Get in touch.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center !mt-4">
            <button className="retro-button">
              <div><span>Sponsor Us</span></div>
            </button>
            <button className="retro-button">
              <div><span>Schedule a Call</span></div>
            </button>
          </div>

          {/* Marquee */}
          <div className="w-full overflow-hidden py-4">
            <div className="marquee-track flex gap-10">
              {duplicated.map((s, i) => (
                <div key={i} className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  {/* Dummy profile icon – replace with <Image src={...} /> later */}
                  <svg className="w-14 h-14 md:w-20 md:h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .retro-button {
          --stone-50: #fafaf9;
          --stone-800: #292524;
          --yellow-400: #facc15;

          font-size: 1rem;
          cursor: pointer;
          position: relative;
          font-family: "Rubik", sans-serif;
          font-weight: bold;
          line-height: 1;
          padding: 1px;
          transform: translate(-4px, -4px);
          outline: 2px solid transparent;
          outline-offset: 5px;
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
            3px 3px 0 2px var(--stone-50),
            3.5px 3.5px 0 2px var(--stone-50),
            4px 4px 0 2px var(--stone-50);
        }

        .retro-button:hover {
          transform: translate(0, 0);
          box-shadow: 0 0 0 2px var(--stone-50);
        }

        .retro-button:active,
        .retro-button:focus-visible {
          outline-color: var(--yellow-400);
        }

        .retro-button:focus-visible {
          outline-style: dashed;
        }

        .retro-button > div {
          position: relative;
          pointer-events: none;
          background-color: var(--yellow-400);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
        }

        .retro-button > div::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          opacity: 0.5;
          background-image: radial-gradient(
              rgb(255 255 255 / 80%) 20%,
              transparent 20%
            ),
            radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
          background-position:
            0 0,
            4px 4px;
          background-size: 8px 8px;
          mix-blend-mode: hard-light;
          animation: dots 0.5s infinite linear;
        }

        .retro-button > div > span {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.25rem;
          gap: 0.25rem;
          filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.25));
        }

        .retro-button > div > span:active {
          transform: translateY(2px);
        }

        @keyframes dots {
          0% {
            background-position:
              0 0,
              4px 4px;
          }
          100% {
            background-position:
              8px 0,
              12px 4px;
          }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: scroll 25s linear infinite;
          width: max-content;
        }
      `}</style>
    </>
  );
}
