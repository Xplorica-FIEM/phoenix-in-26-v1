'use client';

import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  const [stage, setStage] = useState('loading')
  const pokeballRef = useRef(null)
  const requestRef = useRef()

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
      {/* Full screen preloader overlay. */}
      <div className={`fixed inset-0 z-50 transition-all duration-1000 ${stage === 'finished' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Centered container for the animation. */}
        <div className="absolute inset-0 flex items-center justify-center">
            {stage !== 'finished' && (
            <img 
                ref={pokeballRef}
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
        <div className="flex min-h-screen items-center justify-center font-sans bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
          <div className="absolute inset-0 bg-white/20 dark:bg-black/30 backdrop-blur-md"></div>
          <main className="relative flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-12 px-4 md:py-32 md:px-16 sm:items-start">
              <div className="absolute top-0 left-0 right-0 min-h-[15px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 p-4 pt-12 md:pt-8 pointer-events-none">
                <Link href="/about" className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
                  <span className="group-hover:text-cyan-300 transition-colors duration-75">About</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
                </Link>
                <button className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
                  <span className="group-hover:text-cyan-300 transition-colors duration-75">Trainers</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
                </button>
                <div className="relative w-48 h-24 md:w-64 md:h-32 flex-shrink-0 drop-shadow-2xl order-first md:order-none">
                  <Image
                    src="/logo-text.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <button className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
                  <span className="group-hover:text-red-300 transition-colors duration-75">Events</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
                </button>
                <button className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
                  <span className="group-hover:text-red-300 transition-colors duration-75">Sponsors</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
                </button>
              </div>
          </main>
        </div>
      </div>
    </>
  );
}
