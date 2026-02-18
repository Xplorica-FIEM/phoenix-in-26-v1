'use client';

import React, { useEffect, useRef, useState } from 'react';

type RarityLevel = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

interface Stat {
  name: string;
  value: number;
}

interface TrainerCardProps {
  name: string;
  role: string;
  department: string;
  year: string;
  mobile: string;
  email?: string;
  socialHandles?: string[];
  photoUrl?: string;
  rarity?: RarityLevel;
  stats?: Stat[];
  signatureMove?: string;
  signatureMoveDescription?: string;
  hiddenAbility?: string;
  hiddenAbilityDescription?: string;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({
  name,
  role,
  department,
  year,
  mobile,
  email,
  socialHandles = [],
  photoUrl,
  rarity = 'Common',
  stats,
  signatureMove = 'Thunder Bolt',
  signatureMoveDescription = 'Unleash powerful strikes with precision',
  hiddenAbility = 'Adaptive Mind',
  hiddenAbilityDescription = 'Learns and improves from every challenge',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);
  
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; life: number }>>([]);
  const particlesRef = useRef(particles);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  // Rarity color config
  const rarityConfig: Record<RarityLevel, { glow: string; border: string; bg: string; text: string }> = {
    Common: {
      glow: 'rgba(100, 150, 255, 0.3)',
      border: 'border-blue-400/30',
      bg: 'from-blue-900/40 via-blue-800/30 to-blue-900/40',
      text: 'from-cyan-300 via-blue-300 to-purple-300',
    },
    Rare: {
      glow: 'rgba(100, 200, 255, 0.5)',
      border: 'border-cyan-400/50',
      bg: 'from-cyan-900/50 via-blue-800/40 to-cyan-900/50',
      text: 'from-cyan-200 via-cyan-300 to-blue-300',
    },
    Epic: {
      glow: 'rgba(150, 100, 255, 0.5)',
      border: 'border-purple-400/50',
      bg: 'from-purple-900/50 via-blue-800/40 to-purple-900/50',
      text: 'from-purple-200 via-pink-300 to-purple-300',
    },
    Legendary: {
      glow: 'rgba(255, 200, 100, 0.6)',
      border: 'border-yellow-400/60',
      bg: 'from-yellow-900/50 via-orange-800/40 to-yellow-900/50',
      text: 'from-yellow-200 via-orange-300 to-yellow-300',
    },
    Mythic: {
      glow: 'rgba(200, 100, 255, 0.7)',
      border: 'border-pink-400/60',
      bg: 'from-pink-900/50 via-purple-800/50 to-fuchsia-900/50',
      text: 'from-pink-200 via-purple-300 to-fuchsia-300',
    },
  };

  const config = rarityConfig[rarity];

  // Handle Canvas Sizing and Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });
    resizeObserver.observe(container);

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.02,
            life: p.life - 0.005,
            vx: p.vx * 0.99,
          }))
          .filter((p) => p.life > 0 && p.y < canvas.height)
          .concat(
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

  // Animated stat bars on mount
  useEffect(() => {
    if (!stats || stats.length === 0) return;

    const statElements = document.querySelectorAll('[data-stat-fill]');
    statElements.forEach((el) => {
      const target = el.getAttribute('data-stat-value');
      if (!target) return;

      const targetValue = parseInt(target);
      const fill = el as HTMLElement;

      let currentValue = 0;
      const animate = () => {
        if (currentValue < targetValue) {
          currentValue += targetValue / 20;
          fill.style.width = `${Math.min(currentValue, targetValue)}%`;
          requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }, [stats]);

  // Default stats if not provided
  const displayStats = stats || [
    { name: 'Coding Power', value: 85 },
    { name: 'Logic IQ', value: 90 },
    { name: 'Creativity', value: 78 },
    { name: 'Speed', value: 75 },
    { name: 'Leadership', value: 88 },
  ];

  // Create shine position based on mouse position
  const shinePosition = {
    left: `${(mousePos.x / (innerCardRef.current?.clientWidth || 1)) * 100}%`,
    top: `${(mousePos.y / (innerCardRef.current?.clientHeight || 1)) * 100}%`,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-sm mx-auto group"
    >
      {/* Outer glow effect based on rarity */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-lg"
        style={{
          background: `radial-gradient(ellipse at center, ${config.glow}, transparent)`,
          animation: `glow 2s ease-in-out infinite`,
        }}
      />

      {/* Main card container */}
      <div
        ref={innerCardRef}
        className="relative w-full overflow-hidden rounded-xl"
      >
        <div
          className={`bg-gradient-to-br ${config.bg} backdrop-blur-xl border ${config.border} shadow-2xl transition-all duration-300`}
          style={{
            boxShadow: `0 0 40px ${config.glow}, inset 0 0 20px ${config.glow.replace('0.3', '0.1').replace('0.5', '0.2').replace('0.6', '0.3').replace('0.7', '0.4')}`,
          }}
        >
          {/* CANVAS Background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* Holographic shine overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${shinePosition.left} ${shinePosition.top}, rgba(255, 255, 255, 0.8), transparent 50%)`,
              animation: `shimmerMove 3s ease-in-out infinite`,
            }}
          />

          {/* Rarity badge */}
          <div className="absolute top-3 right-3 z-20">
            <div className={`px-3 py-1 rounded-full text-xs font-bold font-orbitron text-white backdrop-blur-md border ${config.border} uppercase`}
              style={{
                background: config.glow.replace('0.3', '0.2').replace('0.5', '0.3').replace('0.6', '0.4').replace('0.7', '0.5'),
              }}
            >
              {rarity}
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 p-5">
            
            {/* Top Section */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-orbitron"
                  style={{ backgroundImage: `linear-gradient(to right, ${config.text})` }}
                >
                  TRAINER CARD
                </h2>
              </div>
              <div className="relative w-10 h-10">
                <div className={`absolute inset-0 rounded-full border border-yellow-400/40 animate-spin`} style={{ animationDuration: '3s' }} />
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
              
              {email && (
                <div className="mt-2 ml-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold">[ Email ]</label>
                  <p className="text-xs font-semibold text-blue-100 mt-1">{email}</p>
                </div>
              )}
              
              <div className="mt-2 ml-2">
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
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.2); }
        }

        @keyframes shimmerMove {
          0% { transform: translateX(-100%) translateY(-100%); }
          50% { transform: translateX(100%) translateY(100%); }
          100% { transform: translateX(-100%) translateY(-100%); }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};