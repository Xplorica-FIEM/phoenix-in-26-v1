'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePokemon } from '@/hooks/usePokemon';
import PokemonCard from './PokemonCard';

interface PokedexModalProps {
  isPage?: boolean;
}

export default function PokedexModal({ isPage = false }: PokedexModalProps) {
  const [searchInput, setSearchInput] = useState('');
  const { pokemon, loading, error, fetchPokemon, fetchRandomPokemon } = usePokemon();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchPokemon(searchInput.trim());
    }
  };

  const handleRandom = () => {
    fetchRandomPokemon();
  };

  return (
    <motion.div
      initial={isPage ? { opacity: 0, y: 0 } : { opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="pokedex-modal"
    >
      <div className="modal-header">
        <h1 className="modal-title">Pokédex</h1>
        <p className="modal-subtitle">Search for any Pokémon</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter Pokémon name or ID..."
            className="search-input"
          />
          <button type="submit" className="retro-button yellow">
            <div>
              <span>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                Search
              </span>
            </div>
          </button>
        </form>

        <button onClick={handleRandom} className="retro-button red">
          <div>
            <span>
              🎲 Random Pokémon
            </span>
          </div>
        </button>
      </div>

      <div className="content-section">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-state"
            >
              <div className="pokeball-spinner">
                <div className="pokeball-top"></div>
                <div className="pokeball-middle"></div>
                <div className="pokeball-bottom"></div>
              </div>
              <p className="loading-text">Loading Pokémon...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="error-state"
            >
              <div className="error-icon">❌</div>
              <p className="error-text">{error}</p>
              <p className="error-hint">Try searching for another Pokémon</p>
            </motion.div>
          )}

          {pokemon && !loading && !error && (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          )}

          {!pokemon && !loading && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state"
            >
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .pokedex-modal {
          background: rgba(17, 24, 39, 0.98);
          border-radius: 20px;
          padding: 2rem;
          max-width: 1200px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          backdrop-filter: blur(20px);
          border: 3px solid #eab308;
          box-shadow: 0 0 40px rgba(234, 179, 8, 0.3), 8px 8px 0 #eab308;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .modal-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #eab308;
          font-family: var(--font-press-start);
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
          margin-bottom: 0.5rem;
        }

        .modal-subtitle {
          color: #d1d5db;
          font-size: 0.875rem;
        }

        .search-section {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .search-form {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-input {
          flex: 1;
          padding: 0.875rem 1rem;
          background: rgba(31, 41, 55, 0.8);
          border: 2px solid #eab308;
          border-radius: 8px;
          color: #f3f4f6;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: 4px 4px 0 rgba(234, 179, 8, 0.3);
        }

        .search-input:focus {
          border-color: #fbbf24;
          box-shadow: 6px 6px 0 rgba(234, 179, 8, 0.5);
          transform: translateY(-2px);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .retro-button {
          --stone-50: #fafaf9;
          --stone-800: #292524;

          font-size: 1rem;
          cursor: pointer;
          position: relative;
          font-family: "Rubik", sans-serif;
          font-weight: bold;
          line-height: 1;
          padding: 0;
          border: none;
          transform: translate(-4px, -4px);
          outline: 2px solid transparent;
          outline-offset: 5px;
          border-radius: 9999px;
          background-color: var(--stone-800);
          color: var(--stone-800);
          transition: transform 150ms ease, box-shadow 150ms ease;
          text-align: center;
          overflow: visible;
        }

        .retro-button.yellow {
          box-shadow:
            0.5px 0.5px 0 0 var(--stone-800),
            1px 1px 0 0 var(--stone-800),
            1.5px 1.5px 0 0 var(--stone-800),
            2px 2px 0 0 var(--stone-800),
            2.5px 2.5px 0 0 var(--stone-800),
            3px 3px 0 0 var(--stone-800),
            3.5px 3.5px 0 0 var(--stone-800),
            4px 4px 0 0 var(--stone-800),
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

        .retro-button.red {
          box-shadow:
            0.5px 0.5px 0 0 var(--stone-800),
            1px 1px 0 0 var(--stone-800),
            1.5px 1.5px 0 0 var(--stone-800),
            2px 2px 0 0 var(--stone-800),
            2.5px 2.5px 0 0 var(--stone-800),
            3px 3px 0 0 var(--stone-800),
            3.5px 3.5px 0 0 var(--stone-800),
            4px 4px 0 0 var(--stone-800),
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
          outline-color: #eab308;
        }

        .retro-button:focus-visible {
          outline-style: dashed;
        }

        .retro-button > div {
          position: relative;
          pointer-events: none;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 9999px;
          overflow: hidden;
          margin: 1px;
        }

        .retro-button.yellow > div {
          background-color: #facc15;
        }

        .retro-button.red > div {
          background-color: #ef4444;
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
          background-position: 0 0, 4px 4px;
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
          gap: 0.5rem;
          filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.25));
          color: var(--stone-800);
        }

        .retro-button > div > span:active {
          transform: translateY(2px);
        }

        .icon {
          width: 18px;
          height: 18px;
          stroke-width: 2.5;
        }

        @keyframes dots {
          0% {
            background-position: 0 0, 4px 4px;
          }
          100% {
            background-position: 8px 0, 12px 4px;
          }
        }

        .content-section {
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-state,
        .error-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 1rem;
        }

        .pokeball-spinner {
          width: 80px;
          height: 80px;
          position: relative;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .pokeball-top {
          width: 80px;
          height: 40px;
          background: #ef4444;
          border-top-left-radius: 80px;
          border-top-right-radius: 80px;
          border: 4px solid #1f2937;
          border-bottom: none;
        }

        .pokeball-middle {
          width: 80px;
          height: 8px;
          background: #1f2937;
          position: relative;
        }

        .pokeball-middle::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          background: white;
          border: 4px solid #1f2937;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .pokeball-bottom {
          width: 80px;
          height: 40px;
          background: white;
          border-bottom-left-radius: 80px;
          border-bottom-right-radius: 80px;
          border: 4px solid #1f2937;
          border-top: none;
        }

        .loading-text {
          color: #eab308;
          font-size: 1rem;
          font-weight: 600;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .error-icon,
        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .error-text,
        .empty-text {
          color: #f3f4f6;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .error-text {
          color: #ef4444;
        }

        .error-hint,
        .empty-hint {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .pokedex-modal {
            padding: 1.5rem;
            max-height: 85vh;
          }

          .modal-title {
            font-size: 1.75rem;
          }

          .search-form {
            flex-direction: column;
          }

          .retro-button {
            width: 100%;
          }

          .content-section {
            min-height: 300px;
          }
        }

        /* Custom scrollbar */
        .pokedex-modal::-webkit-scrollbar {
          width: 8px;
        }

        .pokedex-modal::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }

        .pokedex-modal::-webkit-scrollbar-thumb {
          background: #eab308;
          border-radius: 4px;
        }

        .pokedex-modal::-webkit-scrollbar-thumb:hover {
          background: #fbbf24;
        }
      `}</style>
    </motion.div>
  );
}
