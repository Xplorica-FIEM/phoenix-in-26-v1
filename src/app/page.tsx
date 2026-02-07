'use client';

import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";

export default function Home() {
  const [stage, setStage] = useState('loading') // 'loading' | 'spiraling' | 'finished'
  const pokeballRef = useRef(null)
  const requestRef = useRef()

  useEffect(() => {
    // 1. Loading Phase
    const loadTimer = setTimeout(() => {
      setStage('spiraling')
    }, 2000)

    return () => clearTimeout(loadTimer)
  }, [])

  // 2. The Golden Spiral (Center -> Upwards -> Inward)
  useEffect(() => {
    if (stage !== 'spiraling') return

    const element = pokeballRef.current
    if (!element) return

    const duration = 1500 // 1.5 seconds
    const startTime = performance.now()

    // --- GOLDEN RATIO SPIRAL  ---
    const phi = 1.61803398875
    
    // 1. Calculate the "Eye" of the spiral (The End Point)
    // at the Golden Section.
    // If center is 0, top is -innerHeight/2.
    const screenHalf = window.innerHeight / 2
    const spiralCenterY = -(screenHalf / phi) // The mathematical destination
    
    // 2. Determine Start Conditions
    // The object starts at (0,0).
    // The spiral center is at (0, spiralCenterY).
    // Therefore, the starting radius (distance from object to spiral eye) is just the absolute distance.
    const startRadius = Math.abs(spiralCenterY)
    
    // 3. Spiral Physics
    const totalRotations = 3 // 3 full turns into the center
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1) // 0 to 1

      // Easing: Cubic ease-out to make it feel like a natural throw/magnetic pull
      // Fast start (grows out), slows down as it tightens (spirals in)
      const ease = 1 - Math.pow(1 - progress, 3)

      if (progress < 1) {
        // --- INVERSE LOGARITHMIC SPIRAL MATH ---
        
        // A. RADIUS: Decays from StartRadius -> 0
        // As it gets closer to the eye, it gets tighter.
        const currentDistanceToEye = startRadius * (1 - ease)

        // B. ANGLE: Increases as we approach the center (Conservation of Angular Momentum)
        // Start at Math.PI/2 (90 degrees) which is "Down" relative to the spiral center.
        // Since the Spiral Center is ABOVE the object, looking "Down" points to the Object at (0,0).
        const startAngle = Math.PI / 2 
        const currentAngle = startAngle + (ease * totalRotations * 2 * Math.PI)

        // C. CARTESIAN CONVERSION (Relative to Spiral Center)
        // Basic polar coordinates
        let relX = currentDistanceToEye * Math.cos(currentAngle)
        let relY = currentDistanceToEye * Math.sin(currentAngle)

        // D. ABSOLUTE POSITIONING
        // Shift points so they rotate around the calculated Spiral Center
        // Negate X to make it spiral counter-clockwise(golden spiral) (Right -> Up -> Left)
        // or keep positive for clockwise(reverse golden spiral). Let's do Counter-clockwise for a nice arc.
        const x = -relX 
        const y = spiralCenterY + relY // Shift Y by the spiral center offset

        // E. SCALE & ROTATION
        // Shrink to 0 as it enters the eye
        const scale = 1 - ease
        const rotation = ease * 1080

        // Apply
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
      {/* --- PRELOADER ANIMATION OVERLAY --- */}
      <div className={`fixed inset-0 z-50 transition-all duration-1000 ${stage === 'finished' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Background Video for Loader */}
        <div className="absolute inset-0 bg-black overflow-hidden -z-10">
            <video
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-all duration-[1500ms] ease-out ${
                stage !== 'finished' ? 'blur-xl scale-110 brightness-50' : 'blur-0 scale-100 brightness-100'
            }`}
            >
            <source src="/rayloop.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Animation Container - CENTERED AT (0,0) */}
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

      {/* --- ORIGINAL PAGE CONTENT --- */}
      <div className={`transition-opacity duration-1000 ${stage === 'finished' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex min-h-screen items-center justify-center font-sans bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
          <div className="absolute inset-0 bg-white/20 dark:bg-black/30 backdrop-blur-md"></div>
          <main className="relative flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-12 px-4 md:py-32 md:px-16 sm:items-start">
              <div className="absolute top-0 left-0 right-0 min-h-[15px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 p-4 pt-12 md:pt-8 pointer-events-none">
                <button className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
                  <span className="group-hover:text-cyan-300 transition-colors duration-75">About</span>
                  <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
                </button>
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
