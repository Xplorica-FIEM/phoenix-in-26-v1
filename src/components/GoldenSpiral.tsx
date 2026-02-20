'use client'

import { useEffect, useRef } from 'react'

interface GoldenSpiralProps {
  duration?: number
  rotations?: number
  onFinish?: () => void
}

export default function GoldenSpiral({
  duration = 1500,
  rotations = 3,
  onFinish
}: GoldenSpiralProps) {
  const elementRef = useRef<HTMLImageElement | null>(null)
  const requestRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const startTime = performance.now()

    // The Golden Ratio (phi) defines the geometric relationship of the spiral.
    const phi = 1.61803398875

    // Establish the spiral's focal point (origin) relative to the viewport center.
    // Placing the origin at the golden section provides a visually balanced ascent.
    const screenHalf = window.innerHeight / 2
    const spiralCenterY = -(screenHalf / phi)

    // Determine the initial radius as the distance from the element (0,0) to the focal point.
    const startRadius = Math.abs(spiralCenterY)

    element.style.willChange = 'transform'

    const animate = (currentTime: number) => {
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
        const currentAngle =
          startAngle + ease * rotations * 2 * Math.PI

        // Convert polar coordinates (distance, angle) to Cartesian coordinates (x, y).
        const relX = currentDistanceToEye * Math.cos(currentAngle)
        const relY = currentDistanceToEye * Math.sin(currentAngle)

        // Translate coordinates from the focal point back to the screen space.
        // Inverting X creates a counter-clockwise path.
        const x = -relX
        const y = spiralCenterY + relY

        // Scale down and rotate the element.
        const scale = 1 - ease
        const rotation = ease * 1080

        element.style.transform =
          `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotation}deg)`

        requestRef.current = requestAnimationFrame(animate)
      } else {
        element.style.willChange = 'auto'
        onFinish?.()
      }
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      element.style.willChange = 'auto'
    }
  }, [duration, rotations, onFinish])

  return (
    <img
      ref={elementRef}
      draggable={false}
      src="/pokeball.png"
      alt="Loading..."
      className="w-32 md:w-48 h-auto drop-shadow-2xl"
    />
  )
}
