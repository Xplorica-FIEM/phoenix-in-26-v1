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
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[215px] md:pt-[225px] bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center w-full text-center space-y-12">
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-500 drop-shadow-lg">
            Sponsors
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Our partners who make this possible. Interested in sponsoring?
            Get in touch.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-8">
            <button className="custom-button sponsor-btn">
              Sponsor Us
            </button>
            <button className="custom-button schedule-btn">
              Schedule a Call
            </button>
          </div>

          {/* Marquee */}
          <div className="w-full overflow-hidden py-8">
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
        .custom-button {
          cursor: pointer;
          position: relative;
          padding: 10px 24px;
          font-size: 18px;
          border: 2px solid;
          border-radius: 34px;
          background-color: transparent;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          overflow: hidden;
        }

        .custom-button::before {
          content: '';
          position: absolute;
          inset: 0;
          margin: auto;
          width: 50px;
          height: 50px;
          border-radius: inherit;
          scale: 0;
          z-index: -1;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .custom-button:hover::before {
          scale: 3;
        }

        .custom-button:hover {
          scale: 1.1;
        }

        .custom-button:active {
          scale: 1;
        }

        .sponsor-btn {
          color: rgb(255, 88, 88);
          border-color: rgb(255, 88, 88);
        }

        .sponsor-btn::before {
          background-color: rgb(255, 88, 88);
        }

        .sponsor-btn:hover {
          color: #212121;
          box-shadow: 0 0px 20px rgba(255, 88, 88, 0.4);
        }

        .schedule-btn {
          color: rgb(255, 154, 88);
          border-color: rgb(255, 154, 88);
        }

        .schedule-btn::before {
          background-color: rgb(255, 154, 88);
        }

        .schedule-btn:hover {
          color: #212121;
          box-shadow: 0 0px 20px rgba(255, 154, 88, 0.4);
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
