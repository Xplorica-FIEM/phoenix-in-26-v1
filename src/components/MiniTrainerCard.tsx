'use client';

import React from 'react';

interface MiniTrainerCardProps {
  name: string;
  role: string;
  skills: string[];
  photoUrl?: string;
}

export const MiniTrainerCard: React.FC<MiniTrainerCardProps> = ({
  name,
  role,
  skills,
  photoUrl,
}) => {
  return (
    <div className="w-full max-w-xs">
      {/* Mini Card Container */}
      <div
        className="relative w-full bg-gradient-to-br from-blue-900/50 via-blue-800/40 to-blue-900/50 backdrop-blur-lg rounded-xl border border-blue-400/40 shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-cyan-400/60"
        style={{
          boxShadow: '0 0 20px rgba(100, 150, 255, 0.25), inset 0 0 10px rgba(100, 150, 255, 0.08)',
        }}
      >
        {/* Glowing border effect */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(100, 200, 255, 0.15), transparent, rgba(150, 100, 255, 0.15))',
            animation: 'shimmer 4s infinite',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-4">
          {/* Header with title and accent */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 font-orbitron truncate">
                {name}
              </h3>
              <p className="text-xs text-blue-300/80 font-mono mt-0.5 truncate">
                {role}
              </p>
            </div>
            {/* Small pokeball accent */}
            <div className="relative w-8 h-8 ml-2 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-yellow-400/50" />
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 opacity-30" />
            </div>
          </div>

          {/* Compact Photo Section */}
          {photoUrl && (
            <div className="relative mb-3 h-24 rounded-lg overflow-hidden group/photo">
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/30" />
            </div>
          )}

          {/* Skills Section */}
          <div className="border-t border-blue-400/20 pt-2">
            <p className="text-xs font-mono text-pink-400 font-bold mb-1.5">
              Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill, index) => (
                <div
                  key={index}
                  className="px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30 text-xs font-mono text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-200"
                >
                  {skill}
                </div>
              ))}
              {skills.length > 3 && (
                <div className="px-2 py-1 text-xs font-mono text-blue-400/60">
                  +{skills.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Status indicator */}
          <div className="mt-2 pt-2 border-t border-blue-400/10 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs text-blue-400/60 font-mono">Active</span>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.5;
            filter: brightness(1);
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.15);
          }
        }
      `}</style>
    </div>
  );
};
