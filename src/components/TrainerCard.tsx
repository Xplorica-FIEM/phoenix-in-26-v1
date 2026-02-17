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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; life: number }>>([]);
  const particlesRef = useRef(particles);

  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  // Handle Canvas Sizing and Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Resize Observer to keep canvas tightly bound to card size
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });
    resizeObserver.observe(container);

    // 2. Initialize particles (Reduced count for performance)
    const initialParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * container.clientWidth,
      y: Math.random() * container.clientHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 0.8 + 0.2,
    }));
    setParticles(initialParticles);

    let animationFrameId: number;

    const animate = () => {
      // Clear with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background inside canvas (optional, or rely on CSS bg)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(100, 180, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(20, 40, 100, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.02, // Light gravity
            life: p.life - 0.005,
            vx: p.vx * 0.99,
          }))
          .filter((p) => p.life > 0 && p.y < canvas.height)
          .concat(
            // Replenish particles
            Math.random() > 0.85
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

      particlesRef.current.forEach((p) => {
        ctx.fillStyle = `rgba(100, 200, 255, ${p.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, 1.5 * p.life), 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    // OUTER WRAPPER: Added 'relative' and 'overflow-hidden' to contain the canvas
    <div 
      ref={containerRef}
      className="relative w-full max-w-sm mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-900/40 backdrop-blur-xl border border-blue-400/30 shadow-2xl group transition-transform hover:-translate-y-1"
      style={{
        boxShadow: '0 0 40px rgba(100, 150, 255, 0.3), inset 0 0 20px rgba(100, 150, 255, 0.1)',
      }}
    >
      
      {/* CANVAS: Z-0 ensures it stays behind text, absolute ensures it overlays the bg */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Glowing border frame effect */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.2), transparent, rgba(150, 100, 255, 0.2))',
          animation: 'shimmer 4s infinite',
        }}
      />

      {/* CONTENT: Z-10 ensures it's clickable and visible above canvas */}
      <div className="relative z-10 p-5">
        
        {/* Top Section */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 font-orbitron">
              TRAINER CARD
            </h2>
          </div>
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border border-yellow-400/40" />
            <div className="absolute inset-2 rounded-full border border-cyan-400/30" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 opacity-40" />
          </div>
        </div>

        {/* Photo Section */}
        <div className="relative mb-4 h-52 rounded-lg overflow-hidden group/photo bg-black/20">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
              <div className="text-center">
                <div className="text-2xl mb-2">👤</div>
                <p className="text-blue-100 text-sm font-mono">No Image</p>
              </div>
            </div>
          )}
          {/* Borders */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-yellow-400/60" />
        </div>

        {/* Info Section */}
        <div className="space-y-2">
          <div className="group/section">
            <label className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">[ Name ]</label>
            <p className="text-lg font-bold text-white font-orbitron mt-1 group-hover/section:text-yellow-300 transition-colors">{name}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">[ Role ]</label>
              <p className="text-xs font-semibold text-blue-100 mt-1">{role}</p>
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">[ Dept ]</label>
              <p className="text-xs font-semibold text-blue-100 mt-1">{department}</p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-blue-400/20 grid grid-cols-2 gap-2">
             <div>
                <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold">[ Year ]</label>
                <p className="text-xs font-semibold text-blue-100 mt-1">{year}</p>
             </div>
             <div>
                <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold">[ Mobile ]</label>
                <p className="text-xs font-semibold text-blue-100 mt-1">{mobile}</p>
             </div>
          </div>
          
          <div className="mt-2">
            <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold block mb-1">[ Socials ]</label>
            <div className="flex flex-wrap gap-1">
              {socialHandles.map((handle, index) => (
                <span key={index} className="px-2 py-0.5 rounded-full bg-cyan-900/30 border border-cyan-400/30 text-[10px] text-cyan-300">
                  {handle}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.2); }
        }
      `}</style>
    </div>
  );
};