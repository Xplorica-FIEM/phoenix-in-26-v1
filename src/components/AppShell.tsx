'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import PreloaderOverlay from '@/components/PreloaderOverlay'
import PokeNavbarHeroResponsive from '@/components/navbar/PokeNavbarHeroResponsive'
import Navbar from '@/components/Navbar'

export default function AppShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const isHomePage = pathname === '/'

  useEffect(() => {
    // If not home page, ready immediately
    if (!isHomePage) {
      setReady(true)
      return
    }

    // Check session storage
    const hasLoaded = sessionStorage.getItem('phoenix_loaded')
    if (hasLoaded) {
      setReady(true)
    }
  }, [isHomePage])

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('phoenix_loaded', 'true')
    setReady(true)
  }

  // Determine if we should show the preloader
  // Only on home page and only if not loaded in this session
  const showPreloader = isHomePage && !ready

  return (
    <>
      {showPreloader && (
        <PreloaderOverlay onComplete={handlePreloaderComplete} />
      )}

      {/* Navbar selection */}
      <nav
        className={`relative z-50 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {isHomePage ? <PokeNavbarHeroResponsive /> : <Navbar />}
      </nav>

      {/* Page content */}
      <main
        className={`relative z-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {children}
      </main>
    </>
  )
}
