'use client';

import { useState } from 'react';

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Pokemon {
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStat[];
}

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (nameOrId: string | number) => {
    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nameOrId.toString().toLowerCase()}`
      );
      
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }

      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokémon');
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Gen 1-8
    await fetchPokemon(randomId);
  };

  return {
    pokemon,
    loading,
    error,
    fetchPokemon,
    fetchRandomPokemon,
  };
};
