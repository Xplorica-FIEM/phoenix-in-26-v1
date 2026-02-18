'use client'

import { useState } from 'react'
import PreloaderOverlay from '@/components/PreloaderOverlay'
import PokeNavbarHeroResponsive from '@/components/navbar/PokeNavbarHeroResponsive'

export default function AppShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [ready, setReady] = useState(false)

  return (
    <>
      {!ready && (
        <PreloaderOverlay onComplete={() => setReady(true)} />
      )}

      {/* Navbar */}
      <nav
        className={`relative z-50 transition-opacity duration-1000 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <PokeNavbarHeroResponsive />
      </nav>

      {/* Page content */}
      <main
        className={`relative z-0 transition-opacity duration-1000 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </main>
    </>
  )
}
