// Type definitions for trainer data

export type TrainerCategory = 
  | 'LEAD TRAINER' 
  | 'ELITE FOUR' 
  | 'GYM TRAINERS' 
  | 'SUPPORT TEAM' 
  | 'COORDINATOR';

export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export type PokemonType = 
  | 'Electric'  // Frontend
  | 'Fire'      // Backend
  | 'Water'     // DevOps
  | 'Grass'     // Design
  | 'Psychic'   // Management
  | 'Dragon';   // Full Stack

export interface TrainerStats {
  power: number;
  speed: number;
  logic: number;
  creativity: number;
  leadership: number;
}

export interface Trainer {
  id: number;
  name: string;
  role: string;
  department: string;
  category: TrainerCategory;
  rarity: Rarity;
  image: string;
  pokemonType: PokemonType;
  signatureMove: string;
  hiddenAbility: string;
  skills: string[];
  stats: TrainerStats;
}
