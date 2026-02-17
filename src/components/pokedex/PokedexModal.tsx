"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePokemon } from "@/hooks/usePokemon";
import PokemonCard from "./PokemonCard";
import RetroButton from "@/components/RetroButton";

interface PokedexModalProps {
    onClose?: () => void;
}

export default function PokedexModal({ onClose }: PokedexModalProps) {
    const [searchInput, setSearchInput] = useState("");
    const { pokemon, loading, error, fetchPokemon, fetchRandomPokemon } =
        usePokemon();

    // lock background scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // ESC key closes modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            fetchPokemon(searchInput.trim());
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="
        bg-gray-900/95 backdrop-blur-xl
        border-[3px] border-yellow-400
        rounded-2xl
        p-6 md:p-8
        max-w-[1200px] w-full
        max-h-[90vh] overflow-y-auto
        shadow-[0_0_40px_rgba(234,179,8,0.3),8px_8px_0_#eab308]
      "
        >
            {/* HEADER */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl text-yellow-400 font-press-start drop-shadow">
                    Pokédex
                </h1>
                <p className="text-gray-400 text-sm mt-2">
                    Search for any Pokémon
                </p>
            </div>

            {/* SEARCH SECTION */}
            <div className="flex flex-col gap-4 mb-6">
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Enter Pokémon name or ID..."
                        className="
              flex-1 px-4 py-3
              bg-gray-800
              border-2 border-yellow-400
              text-gray-100 placeholder-gray-500
              rounded-md outline-none
              focus:ring-2 focus:ring-yellow-300
              shadow-[4px_4px_0_rgba(234,179,8,0.35)]
            "
                    />

                    <RetroButton type="submit">🔍 Search</RetroButton>
                </form>

                <div className="flex justify-center">
                    <RetroButton onClick={fetchRandomPokemon}>
                        🎲 Random Pokémon
                    </RetroButton>
                </div>
            </div>

            {/* CONTENT */}
            <div className="min-h-[300px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {/* LOADING */}
                    {loading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="w-20 h-20 animate-spin relative">
                                <div className="absolute top-0 w-full h-1/2 bg-red-500 rounded-t-full border-4 border-black border-b-0" />
                                <div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full border-4 border-black border-t-0" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 bg-white border-4 border-black rounded-full" />
                                </div>
                            </div>
                            <p className="text-yellow-400 font-semibold animate-pulse">
                                Loading Pokémon...
                            </p>
                        </motion.div>
                    )}

                    {/* ERROR */}
                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <div className="text-5xl mb-2">❌</div>
                            <p className="text-red-400 font-semibold">
                                {error}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Try searching for another Pokémon
                            </p>
                        </motion.div>
                    )}

                    {/* CARD */}
                    {pokemon && !loading && !error && (
                        <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    )}

                    {/* EMPTY */}
                    {!pokemon && !loading && !error && (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-500 text-sm"
                        >
                            Enter a Pokémon name or try random.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
