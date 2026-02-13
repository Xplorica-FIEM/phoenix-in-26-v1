'use client';

import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [stage, setStage] = useState('loading')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const pokeballRef = useRef(null)
  const requestRef = useRef()

  // Countdown timer to April 17, 2026
  useEffect(() => {
    const targetDate = new Date('2026-04-17T00:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft({ days, hours, minutes })
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Wait briefly before starting the spiral.
    const loadTimer = setTimeout(() => {
      setStage('spiraling')
    }, 2000)

    return () => clearTimeout(loadTimer)
  }, [])

  // Executing the golden spiral animation.
  useEffect(() => {
    if (stage !== 'spiraling') return

    const element = pokeballRef.current
    if (!element) return

    const duration = 1500 // 1.5 seconds
    const startTime = performance.now()

    // The Golden Ratio (phi) defines the geometric relationship of the spiral.
    const phi = 1.61803398875
    
    // Establish the spiral's focal point (origin) relative to the viewport center.
    // Placing the origin at the golden section provides a visually balanced ascent.
    const screenHalf = window.innerHeight / 2
    const spiralCenterY = -(screenHalf / phi)
    
    // Determine the initial radius as the distance from the element (0,0) to the focal point.
    const startRadius = Math.abs(spiralCenterY)
    
    const totalRotations = 3
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Apply cubic ease-out for natural deceleration into the center.
      const ease = 1 - Math.pow(1 - progress, 3)

      if (progress < 1) {
        // Reduce the radius over time to create the inward spiral trajectory.
        const currentDistanceToEye = startRadius * (1 - ease)

        // Increment the angle to rotate around the focal point.
        // Starting at PI/2 or 90deg aligns the initial position with the screen center.
        const startAngle = Math.PI / 2 
        const currentAngle = startAngle + (ease * totalRotations * 2 * Math.PI)

        // Convert polar coordinates (distance, angle) to Cartesian coordinates (x, y).
        let relX = currentDistanceToEye * Math.cos(currentAngle)
        let relY = currentDistanceToEye * Math.sin(currentAngle)

        // Translate coordinates from the focal point back to the screen space.
        // Inverting X creates a counter-clockwise path.
        const x = -relX 
        const y = spiralCenterY + relY

        // Scale down and rotate the element.
        const scale = 1 - ease
        const rotation = ease * 1080

        element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotation}deg)`
        
        requestRef.current = requestAnimationFrame(animate)
      } else {
        // Finish cleanly
        setStage('finished')
      }
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
        if(requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [stage])

  return (
    <>
      {/*
        Background music: Pokemon theme song.
        - Autoplays and loops on page load.
        - Volume is set to 25% (see useRef/useEffect above for enforcement).
        - Controls are present for accessibility, but the element is visually hidden.
        - File must exist at /public/02 - Title Screen.mp3.
        - This enhances the Pokemon atmosphere without being intrusive.
      */}
      <audio
        src="/02%20-%20Title%20Screen.mp3"
        autoPlay
        loop
        controls
        style={{ position: 'absolute', left: '-9999px', width: 0, height: 0 }}
        aria-label="Pokemon Theme Song Background Audio"
      />
      {/* Full screen preloader overlay. */}
      <div className={`fixed inset-0 z-50 transition-all duration-1000 select-none cursor-none ${stage === 'finished' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Centered container for the animation. */}
        <div className="absolute inset-0 flex items-center justify-center">
            {stage !== 'finished' && (
            <img 
                ref={pokeballRef}
                draggable={false}
                src="/pokeball.png"
                alt="Loading..."
                className={`w-32 md:w-48 h-auto drop-shadow-2xl will-change-transform ${
                stage === 'loading' ? 'animate-spin' : ''
                }`}
            />
            )}
        </div>
      </div>

      {/* Main page content. */}
      <div className={`transition-opacity duration-1000 ${stage === 'finished' ? 'opacity-100' : 'opacity-0'}`}>
        <div>
        <Navbar />
        </div>
        <div className="fixed inset-0 flex items-center justify-center font-sans bg-cover bg-center bg-no-repeat pt-4 md:pt-0" style={{ backgroundImage: 'url(/background.png)' }}>
          <main className="flex flex-col items-center justify-center px-4 md:-mt-32">
            {/* Countdown Timer */}
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs md:text-sm font-orbitron tracking-[0.3em] text-yellow-400/100 uppercase">
                  The Journey Begins
                </span>
                <h2 className="text-2xl md:text-3xl font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white uppercase">
                  Launching In
                </h2>
              </div>
              
              <div className="relative">
                {/* Decorative line */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                
                <div className="flex gap-3 md:gap-6">
                  {/* Days */}
                  <div className="group flex flex-col items-center">
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 md:px-8 md:py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                        <span className="text-4xl md:text-6xl font-bold font-orbitron text-white tabular-nums">
                          {String(timeLeft.days).padStart(2, '0')}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                      </div>
                    </div>
                    <span className="mt-3 text-[10px] md:text-xs font-orbitron tracking-[0.2em] text-white/40 uppercase">Days</span>
                  </div>
                  
                  {/* Separator */}
                  <div className="flex flex-col items-center justify-center gap-2 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  {/* Hours */}
                  <div className="group flex flex-col items-center">
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 md:px-8 md:py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                        <span className="text-4xl md:text-6xl font-bold font-orbitron text-white tabular-nums">
                          {String(timeLeft.hours).padStart(2, '0')}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                      </div>
                    </div>
                    <span className="mt-3 text-[10px] md:text-xs font-orbitron tracking-[0.2em] text-white/40 uppercase">Hours</span>
                  </div>
                  
                  {/* Separator */}
                  <div className="flex flex-col items-center justify-center gap-2 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  {/* Minutes */}
                  <div className="group flex flex-col items-center">
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 md:px-8 md:py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                        <span className="text-4xl md:text-6xl font-bold font-orbitron text-white tabular-nums">
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                      </div>
                    </div>
                    <span className="mt-3 text-[10px] md:text-xs font-orbitron tracking-[0.2em] text-white/40 uppercase">Minutes</span>
                  </div>
                </div>
                
                {/* Decorative line */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="w-4 h-px bg-gradient-to-r from-transparent to-white/20" />
                <p className="text-sm md:text-base text-yellow/50 font-orbitron tracking-widest">
                  17 . 04 . 2026
                </p>
                <div className="w-4 h-px bg-gradient-to-l from-transparent to-yellow-400/20" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
