'use client'

import { useEffect, useState } from 'react'
import GoldenSpiral from './GoldenSpiral'

interface PreloaderOverlayProps {
  delay?: number
  onComplete?: () => void
}

export default function PreloaderOverlay({
  delay = 2000,
  onComplete
}: PreloaderOverlayProps) {
  const [stage, setStage] =
    useState<'loading' | 'spiraling' | 'finished'>('loading')

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setStage('spiraling')
    }, delay)

    return () => clearTimeout(loadTimer)
  }, [delay])

  return (
    <div
      className={`
        fixed inset-0 z-50
        transition-opacity duration-1000
        select-none cursor-none
        ${stage === 'finished'
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'}
      `}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        {stage === 'loading' && (
          <img
            src="/pokeball.png"
            draggable={false}
            alt="Loading..."
            className="w-32 md:w-48 h-auto drop-shadow-2xl animate-spin"
          />
        )}

        {stage === 'spiraling' && (
          <GoldenSpiral
            onFinish={() => {
              setStage('finished')
              // Wait for fade out animation before calling onComplete
              setTimeout(() => {
                onComplete?.()
              }, 1000)
            }}
          />
        )}
      </div>
    </div>
  )
}
