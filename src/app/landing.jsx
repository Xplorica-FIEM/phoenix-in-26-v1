import React, { useState, useEffect, useRef } from 'react'

const Landing = () => {
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

    // --- GOLDEN RATIO GEOMETRY ---
    const phi = 1.61803398875
    
    // 1. Calculate the "Eye" of the spiral (The End Point)
    // We place it in the upper half, at the Golden Section.
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
        // We start at Math.PI/2 (90 degrees) which is "Down" relative to the spiral center.
        // Since the Spiral Center is ABOVE the object, looking "Down" points to the Object at (0,0).
        const startAngle = Math.PI / 2 
        const currentAngle = startAngle + (ease * totalRotations * 2 * Math.PI)

        // C. CARTESIAN CONVERSION (Relative to Spiral Center)
        // Basic polar coordinates
        let relX = currentDistanceToEye * Math.cos(currentAngle)
        let relY = currentDistanceToEye * Math.sin(currentAngle)

        // D. ABSOLUTE POSITIONING
        // Shift points so they rotate around the calculated Spiral Center
        // We negate X to make it spiral clockwise (Right -> Up -> Left)
        // or keep positive for counter-clockwise. Let's do Clockwise for a nice arc.
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

    return () => cancelAnimationFrame(requestRef.current)
  }, [stage])

  return (
    <>
      {/* Background Video */}
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
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
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-1000 ${
           stage === 'finished' ? 'opacity-100' : 'opacity-0' 
        }`} />
      </div>

      {/* Animation Container - CENTERED AT (0,0) */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          stage === 'finished' ? 'opacity-0' : 'opacity-100'
        }`}
      >
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

      {/* Header Logo */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ${
        stage === 'finished' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex justify-center py-6">
          <img 
            src="/logo-text.png" 
            alt="Phoenix 2026" 
            className="h-20 md:h-28 w-auto drop-shadow-lg animate-float"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className={`relative z-10 min-h-screen flex flex-col items-center justify-center transition-all duration-[1500ms] delay-300 ${
        stage === 'finished' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl text-white mb-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              <span className="font-overcame-outline text-glow-yellow">COMING SOON</span>
          </h1>
          <p className="text-sm text-white/80 max-w-2xl mx-auto">
            STAY TUNED...A NEW JOURNEY AWAITS!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-6 transition-all duration-1000 delay-500 ${
        stage === 'finished' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8 mb-4">
            <a 
              href="https://linktr.ee/phoenix.fiem" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group transition-all duration-300 transform hover:scale-110"
              aria-label="Linktree"
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-white group-hover:border-yellow-400 group-hover:drop-shadow-[0_0_10px_#facc15] transition-all duration-300"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
              >
                {/* Outer border */}
                <circle cx="32" cy="32" r="30" stroke="#000000" strokeWidth="4" fill="#ffffff" />
                {/* Top half - normal: red, hover: gold */}
                <path 
                  d="M32 32 m-30 0 a30 30 0 0 1 60 0" 
                  fill="#ef4444" 
                  className="group-hover:fill-yellow-400 transition-all duration-300" 
                />
                {/* Bottom half - always white */}
                <path 
                  d="M32 32 m-30 0 a30 30 0 0 0 60 0" 
                  fill="#fff" 
                />
                {/* Center black band */}
                <rect x="2" y="29" width="60" height="6" rx="3" fill="#111" />
                {/* Center white circle */}
                <circle cx="32" cy="32" r="10" fill="#fff" stroke="#111" strokeWidth="4" />
                {/* Center button - normal: red, hover: gold */}
                <circle 
                  cx="32" cy="32" r="5" 
                  fill="#ffffff" 
                  className="group-hover:fill-white-400 transition-all duration-300" 
                  stroke="#111" strokeWidth="2"
                />
              </svg>
            </a>
          </div>
          <p className="text-center text-white/50 text-xs md:text-sm tracking-wider uppercase">
            © 2026 Phoenix. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

const SocialIcon = ({ href, d }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
  >
    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d={d}/>
    </svg>
  </a>
)

export default Landing