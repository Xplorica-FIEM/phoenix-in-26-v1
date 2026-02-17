'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TrainerCardProps {
  name: string;
  role: string;
  department: string;
  year: string;
  mobile: string;
  socialHandles?: string[];
  photoUrl?: string;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({
  name,
  role,
  department,
  year,
  mobile,
  socialHandles = [],
  photoUrl,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; life: number }>>([]);
  const particlesRef = useRef(particles);

  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  // Initialize and animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Initialize particles
    const initialParticles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 0.8 + 0.2,
    }));
    setParticles(initialParticles);

    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebula background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(100, 180, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(50, 100, 200, 0.08)');
      gradient.addColorStop(1, 'rgba(20, 40, 100, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (let i = 0; i < 40; i++) {
        const x = (i * 73) % canvas.width;
        const y = (i * 127) % canvas.height;
        const twinkle = Math.sin(Date.now() / 2000 + i) * 0.5 + 0.5;
        const size = Math.sin(Date.now() / 3000 + i) * 0.5 + 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.05, // Gravity effect
            life: p.life - 0.005,
            vx: p.vx * 0.99, // Friction
          }))
          .filter((p) => p.life > 0 && p.y < canvas.height)
          .concat(
            Math.random() > 0.7
              ? [{
                  x: Math.random() * canvas.width,
                  y: 0,
                  vx: (Math.random() - 0.5) * 0.3,
                  vy: Math.random() * 0.3 + 0.2,
                  life: 1,
                }]
              : []
          )
      );

      // Draw particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = `rgba(100, 200, 255, ${p.life * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, 1.5 * p.life), 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = `rgba(150, 220, 255, ${p.life * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, 3 * p.life), 0, Math.PI * 2);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Canvas for particle effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 rounded-xl pointer-events-none"
      />

      {/* Main Card Container */}
      <div className="relative w-full bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-900/40 backdrop-blur-xl rounded-xl border border-blue-400/30 shadow-2xl overflow-hidden group"
        style={{
          boxShadow: '0 0 40px rgba(100, 150, 255, 0.3), inset 0 0 20px rgba(100, 150, 255, 0.1)',
        }}>
        
        {/* Glowing border frame effect */}
        <div className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.2), transparent, rgba(150, 100, 255, 0.2))',
            animation: 'shimmer 4s infinite',
          }}
        />

        {/* Light rays background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-5">
          {/* Top Section - Title and badge */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 font-orbitron">
                TRAINER CARD
              </h2>
            </div>
            {/* Pokéball accent */}
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border border-yellow-400/40" />
              <div className="absolute inset-2 rounded-full border border-cyan-400/30" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 opacity-40" />
            </div>
          </div>

          {/* Photo/Avatar Section */}
          <div className="relative mb-4 h-52 rounded-lg overflow-hidden group/photo">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20" />
            
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border border-yellow-400/50 flex items-center justify-center mb-3">
                    <span className="text-2xl">👤</span>
                  </div>
                  <p className="text-blue-100 text-sm font-mono">Photo Space</p>
                </div>
              </div>
            )}

            {/* Glowing overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-300/0 to-yellow-400/0 group-hover/photo:from-cyan-400/20 group-hover/photo:via-cyan-300/10 group-hover/photo:to-yellow-400/10 transition-all duration-300" />
            
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-yellow-400/60" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400/60" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-yellow-400/60" />
          </div>

          {/* Info Sections */}
          <div className="space-y-2">
            {/* Name Section */}
            <div className="group/section">
              <label className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                [ Name ]
              </label>
              <p className="text-lg font-bold text-white font-orbitron mt-1 group-hover/section:text-yellow-300 transition-colors">
                {name}
              </p>
              <div className="h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent mt-1.5 group-hover/section:from-yellow-400/50 transition-all" />
            </div>

            {/* Role and Department */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="group/section">
                <label className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  [ Role ]
                </label>
                <p className="text-xs font-semibold text-blue-100 mt-1 group-hover/section:text-cyan-300 transition-colors">
                  {role}
                </p>
              </div>
              <div className="group/section">
                <label className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  [ Department ]
                </label>
                <p className="text-xs font-semibold text-blue-100 mt-1 group-hover/section:text-cyan-300 transition-colors">
                  {department}
                </p>
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-3 pt-2 border-t border-blue-400/20 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="group/section">
                  <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold">
                    [ Year ]
                  </label>
                  <p className="text-xs font-semibold text-blue-100 mt-1 group-hover/section:text-cyan-300 transition-colors">
                    {year}
                  </p>
                </div>
                <div className="group/section">
                  <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold">
                    [ Mobile ]
                  </label>
                  <p className="text-xs font-semibold text-blue-100 mt-1 group-hover/section:text-cyan-300 transition-colors">
                    {mobile}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold">
                  [ Social Handles ]
                </label>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {socialHandles.map((handle, index) => (
                    <div
                      key={index}
                      className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-[11px] font-mono text-cyan-300 hover:from-cyan-500/40 hover:to-blue-500/40 hover:border-cyan-300/60 transition-all duration-300 cursor-default"
                    >
                      {handle}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="mt-3 pt-2 border-t border-blue-400/20">
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                    style={{
                      animation: `pulse ${0.6 + i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-blue-400/60 font-mono">AUTHENTICATED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.5;
            filter: brightness(1);
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.2);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
