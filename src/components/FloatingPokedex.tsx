'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FloatingPokedex = () => {
  return (
    <>
      <div className="floating-pokedex">
        <Link href="/pokedex">
          <Image
            src="/pokedex.png"
            alt="Pokédex"
            width={120}
            height={120}
            className="pokedex-image"
          />
        </Link>
      </div>

      <style jsx>{`
        .floating-pokedex {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 40;
          cursor: pointer;
          animation: float 3s ease-in-out infinite;
          transition: transform 0.3s ease, filter 0.3s ease;
          filter: drop-shadow(0 4px 12px rgba(234, 179, 8, 0.4));
        }

        .floating-pokedex:hover {
          transform: scale(1.1) !important;
          filter: drop-shadow(0 8px 20px rgba(234, 179, 8, 0.6));
        }

        .floating-pokedex:active {
          transform: scale(0.95) !important;
        }

        .pokedex-image {
          width: 120px;
          height: 120px;
          object-fit: contain;
          border-radius: 12px;
          display: block;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @media (max-width: 768px) {
          .floating-pokedex {
            bottom: 20px;
            left: 20px;
          }

          .pokedex-image {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingPokedex;
