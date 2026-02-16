'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pokemon } from '@/hooks/usePokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

const typeGlows: Record<string, string> = {
  normal: 'rgba(168, 168, 120, 0.3)',
  fire: 'rgba(240, 128, 48, 0.4)',
  water: 'rgba(104, 144, 240, 0.4)',
  electric: 'rgba(248, 208, 48, 0.4)',
  grass: 'rgba(120, 200, 80, 0.4)',
  ice: 'rgba(152, 216, 216, 0.4)',
  fighting: 'rgba(192, 48, 40, 0.4)',
  poison: 'rgba(160, 64, 160, 0.4)',
  ground: 'rgba(224, 192, 104, 0.4)',
  flying: 'rgba(168, 144, 240, 0.4)',
  psychic: 'rgba(248, 88, 136, 0.4)',
  bug: 'rgba(168, 184, 32, 0.4)',
  rock: 'rgba(184, 160, 56, 0.4)',
  ghost: 'rgba(112, 88, 152, 0.4)',
  dragon: 'rgba(112, 56, 248, 0.4)',
  dark: 'rgba(112, 88, 72, 0.4)',
  steel: 'rgba(184, 184, 208, 0.4)',
  fairy: 'rgba(238, 153, 172, 0.4)',
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const primaryType = pokemon.types[0].type.name;
  const glowColor = typeGlows[primaryType] || typeGlows.normal;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className="pokemon-container"
    >
      <div className="content-wrapper">
        {/* Left side - Image in Card Frame */}
        <div className="image-section">
          <div className="stack">
            <div className="card">
              <div className="image-frame">
                {!imageLoaded && (
                  <div className="image-loader">
                    <div className="pokeball-spinner">
                      <div className="pokeball-top"></div>
                      <div className="pokeball-middle"></div>
                      <div className="pokeball-bottom"></div>
                    </div>
                  </div>
                )}
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="pokemon-image"
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Stats Container */}
        <div className="stats-section">
          <h2 className="pokemon-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>

          <div className="pokemon-types">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="type-badge"
                style={{ backgroundColor: typeColors[type.type.name] || '#777' }}
              >
                {type.type.name.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="pokemon-info">
            <div className="info-item">
              <span className="info-label">Height</span>
              <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="info-item">
              <span className="info-label">Weight</span>
              <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
          </div>

          <div className="pokemon-stats">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat-row">
                <span className="stat-name">
                  {stat.stat.name.replace('-', ' ').toUpperCase()}
                </span>
                <div className="stat-bar-container">
                  <motion.div
                    className="stat-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                      backgroundColor: typeColors[primaryType] || '#777',
                    }}
                  />
                </div>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .pokemon-container {
          width: 100%;
          max-width: 1100px;
        }

        .content-wrapper {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          justify-content: center;
        }

        /* Card Frame Styles */
        .image-section {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
        }

        .stack {
          width: 100%;
          max-width: 350px;
          transition: 0.25s ease;
        }

        .stack:hover {
          transform: rotate(5deg);
        }

        .stack:hover .card:before {
          transform: translatey(-2%) rotate(-4deg);
        }

        .stack:hover .card:after {
          transform: translatey(2%) rotate(4deg);
        }

        .card {
          aspect-ratio: 3 / 2;
          border: 4px solid #1f2937;
          background-color: #fff;
          position: relative;
          transition: 0.15s ease;
          cursor: pointer;
          padding: 5%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .card:before,
        .card:after {
          content: "";
          display: block;
          position: absolute;
          height: 100%;
          width: 100%;
          border: 4px solid #1f2937;
          background-color: #fff;
          transform-origin: center center;
          z-index: -1;
          transition: 0.15s ease;
          top: 0;
          left: 0;
        }

        .card:before {
          transform: translatey(-2%) rotate(-6deg);
        }

        .card:after {
          transform: translatey(2%) rotate(6deg);
        }

        .image-frame {
          width: 100%;
          height: 100%;
          border: 4px solid #1f2937;
          background-color: #eee;
          aspect-ratio: 1 / 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .pokemon-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          transition: opacity 0.3s ease;
        }

        .image-loader {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .pokeball-spinner {
          width: 50px;
          height: 50px;
          position: relative;
          animation: spin 1s linear infinite;
        }

        .pokeball-top {
          width: 100%;
          height: 50%;
          background: #f44336;
          border-radius: 50px 50px 0 0;
          border: 3px solid #1f2937;
          border-bottom: none;
        }

        .pokeball-middle {
          width: 100%;
          height: 4px;
          background: #1f2937;
          position: relative;
        }

        .pokeball-middle::after {
          content: '';
          width: 16px;
          height: 16px;
          background: white;
          border: 3px solid #1f2937;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .pokeball-bottom {
          width: 100%;
          height: 50%;
          background: white;
          border-radius: 0 0 50px 50px;
          border: 3px solid #1f2937;
          border-top: none;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Stats Section */
        .stats-section {
          flex: 1.5;
          background: #fff;
          padding: 1.25rem;
          border-radius: 0;
          border: 4px solid #1f2937;
          box-shadow: 
            8px 8px 0 0 #1f2937,
            8px 0 0 0 #1f2937,
            0 8px 0 0 #1f2937;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-height: 350px;
          overflow-y: auto;
        }

        .pokemon-name {
          font-size: 1.25rem;
          font-weight: bold;
          color: #1f2937;
          margin: 0;
          text-transform: capitalize;
          font-family: var(--font-press-start);
          text-align: center;
        }

        .pokemon-types {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .type-badge {
          padding: 0.4rem 0.8rem;
          border-radius: 0;
          color: white;
          font-weight: bold;
          font-size: 0.75rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          border: 3px solid #1f2937;
          box-shadow: 4px 4px 0 0 #1f2937;
        }

        .pokemon-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .info-item {
          background: #f3f4f6;
          padding: 0.75rem;
          border: 3px solid #1f2937;
          text-align: center;
          box-shadow: 4px 4px 0 0 #1f2937;
        }

        .info-label {
          display: block;
          font-size: 0.7rem;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .info-value {
          display: block;
          font-size: 1rem;
          color: #1f2937;
          font-weight: bold;
        }

        .pokemon-stats {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .stat-row {
          display: grid;
          grid-template-columns: 110px 1fr 45px;
          gap: 0.5rem;
          align-items: center;
        }

        .stat-name {
          font-size: 0.65rem;
          color: #1f2937;
          font-weight: 700;
        }

        .stat-bar-container {
          height: 10px;
          background: #e5e7eb;
          border: 2px solid #1f2937;
          overflow: hidden;
        }

        .stat-bar {
          height: 100%;
          box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
        }

        .stat-value {
          font-size: 0.8rem;
          color: #1f2937;
          font-weight: bold;
          text-align: right;
        }

        /* Custom Scrollbar */
        .stats-section::-webkit-scrollbar {
          width: 8px;
        }

        .stats-section::-webkit-scrollbar-track {
          background: #e5e7eb;
          border: 2px solid #1f2937;
        }

        .stats-section::-webkit-scrollbar-thumb {
          background: #1f2937;
        }

        @media (max-width: 900px) {
          .content-wrapper {
            flex-direction: column;
            align-items: center;
          }

          .stack {
            max-width: 300px;
          }

          .stats-section {
            width: 100%;
            max-width: 400px;
          }

          .pokemon-name {
            font-size: 1.25rem;
          }

          .stat-row {
            grid-template-columns: 90px 1fr 40px;
          }

          .stat-name {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </motion.div>
  );
}
