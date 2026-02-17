"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pokemon } from "@/hooks/usePokemon";

interface PokemonCardProps {
    pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const primaryType = pokemon.types[0].type.name;

    return (
        <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-full max-w-5xl"
        >
            {/* OUTER DEVICE SHELL */}
            <div className="bg-red-600 border-[6px] border-gray-900 shadow-[10px_10px_0_#111] rounded-md p-4 text-black">
                {/* TOP DEVICE LIGHTS */}
                <div className="flex gap-2 mb-3">
                    <div className="w-5 h-5 bg-cyan-400 border-2 border-black rounded-full shadow-inner" />
                    <div className="w-3 h-3 bg-yellow-300 border-2 border-black rounded-full" />
                    <div className="w-3 h-3 bg-green-400 border-2 border-black rounded-full" />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* SCREEN */}
                    <div className="bg-gray-200 border-4 border-black p-3 shadow-inner w-full md:w-[40%]">
                        <div className="bg-gray-300 border-4 border-black aspect-square flex items-center justify-center mb-2">
                            <Image
                                src={
                                    pokemon.sprites.other["official-artwork"]
                                        .front_default
                                }
                                alt={pokemon.name}
                                width={300}
                                height={300}
                                className="object-contain drop-shadow-lg"
                                priority
                            />
                        </div>
                        {/* NAME */}
                        <h2 className="text-center font-bold tracking-widest text-lg mb-2 font-press-start uppercase">
                            {pokemon.name}
                        </h2>

                        {/* TYPES */}
                        <div className="flex justify-center gap-2 mb-3 flex-wrap">
                            {pokemon.types.map((t) => (
                                <span
                                    key={t.type.name}
                                    style={{
                                        backgroundColor:
                                            typeColors[t.type.name],
                                    }}
                                    className="px-3 py-1 text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000]"
                                >
                                    {t.type.name.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* DATA PANEL */}
                    <div className="flex-1 bg-gray-100 border-4 border-black p-4 shadow-inner">
                        {/* HEIGHT WEIGHT */}
                        <div className="grid grid-cols-2 gap-2 mb-3 text-center text-xs">
                            <div className="border-2 border-black bg-gray-200 p-2 shadow-[2px_2px_0_#000]">
                                <div className="text-gray-600">HEIGHT</div>
                                <div className="font-bold text-sm">
                                    {(pokemon.height / 10).toFixed(1)} m
                                </div>
                            </div>
                            <div className="border-2 border-black bg-gray-200 p-2 shadow-[2px_2px_0_#000]">
                                <div className="text-gray-600">WEIGHT</div>
                                <div className="font-bold text-sm">
                                    {(pokemon.weight / 10).toFixed(1)} kg
                                </div>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="space-y-2">
                            {pokemon.stats.map((stat) => (
                                <div key={stat.stat.name}>
                                    <div className="flex justify-between text-[10px] font-bold">
                                        <span>
                                            {stat.stat.name
                                                .replace("-", " ")
                                                .toUpperCase()}
                                        </span>
                                        <span>{stat.base_stat}</span>
                                    </div>

                                    <div className="h-3 bg-gray-300 border-2 border-black overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${(stat.base_stat / 255) * 100}%`,
                                            }}
                                            transition={{ duration: 0.8 }}
                                            style={{
                                                backgroundColor:
                                                    typeColors[primaryType] ||
                                                    "#777",
                                            }}
                                            className="h-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM SPEAKER GRILL */}
                <div className="mt-3 grid grid-cols-6 gap-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="h-1 bg-black/40 rounded-sm" />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
