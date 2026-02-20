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
  const isHomePage = pathname === '/'
  // Initialize ready to true for non-home pages to prevent flicker
  const [ready, setReady] = useState(pathname !== '/')

  useEffect(() => {
    // If already ready (non-home page), do nothing
    if (ready) return

    // Check session storage for home page
    const hasLoaded = sessionStorage.getItem('phoenix_loaded')
    if (hasLoaded) {
      setReady(true)
    }
  }, [pathname, ready])

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('phoenix_loaded', 'true')
    setReady(true)
  }

  // Determine if we should show the preloader
  const showPreloader = isHomePage && !ready

  return (
    <>
      {showPreloader && (
        <PreloaderOverlay onComplete={handlePreloaderComplete} />
      )}

      {/* Navbar selection - Fixed for sub-pages, Relative for Home Hero */}
      <nav
        className={`${isHomePage ? 'relative' : 'fixed top-0 left-0 w-full'} z-50 transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {isHomePage ? <PokeNavbarHeroResponsive /> : <Navbar />}
      </nav>

      {/* Page content */}
      <main
        className={`relative z-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {children}
      </main>
    </>
  )
}
