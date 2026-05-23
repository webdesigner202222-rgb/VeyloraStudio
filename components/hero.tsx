"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Navbar } from "./navbar"

const stats = [
  { value: 48, suffix: "h", label: "demo gotowe", benefit: "Widzisz stronę zanim zapłacisz" },
  { value: 14, suffix: " dni", label: "średni czas realizacji", benefit: "Od projektu do wdrożenia" },
  { value: 0, suffix: " zł", label: "zaliczka za demo", benefit: "Płacisz tylko gdy jesteś zadowolony" },
]

export function Hero() {
  // Animation states
  const [pageVisible, setPageVisible] = useState(false)
  const [navbarVisible, setNavbarVisible] = useState(false)
  const [navbarLineProgress, setNavbarLineProgress] = useState(0)
  const [logoVisible, setLogoVisible] = useState(false)
  const [navLinksVisible, setNavLinksVisible] = useState([false, false, false, false])
  const [heroLineDrawn, setHeroLineDrawn] = useState(false)
  const [heroLineProgress, setHeroLineProgress] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(false)
  const [statsVisible, setStatsVisible] = useState([false, false, false])
  const [showDot, setShowDot] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  const fullText = "Strony które zamykają klientów."
  const typingSpeed = 40

  // Cinematic entrance sequence
  useEffect(() => {
    // Step 0: Immediately scroll to top BEFORE any animations
    window.scrollTo(0, 0)
    
    // Step 1: Page starts white (already default), then transition to cream
    setPageVisible(true)
    
    // Step 2 (0ms): Show navbar container (invisible content)
    setNavbarVisible(true)
    
    // Step 2 (0ms): Navbar bottom border line draws from center outward
    // Duration: 500ms, easing: ease-out
    setTimeout(() => {
      setNavbarLineProgress(1)
    }, 50) // Small delay to ensure component is mounted

    // Step 3 (500ms after line starts = when line completes):
    // Logo fades in, then nav links with 50ms stagger
    const logoTimer = setTimeout(() => {
      setLogoVisible(true)
      
      // Nav links fade in with 50ms stagger
      setTimeout(() => setNavLinksVisible([true, false, false, false]), 200)
      setTimeout(() => setNavLinksVisible([true, true, false, false]), 250)
      setTimeout(() => setNavLinksVisible([true, true, true, false]), 300)
      setTimeout(() => setNavLinksVisible([true, true, true, true]), 350)
    }, 500 + 400) // 500ms line animation + 400ms delay

    // Step 4: After navbar complete, continue with hero sequence
    // Hero vertical line draws
    const heroLineTimer = setTimeout(() => {
      setHeroLineDrawn(true)
      // Animate line progress
      const lineAnimationDuration = 600
      const startTime = Date.now()
      
      const animateLine = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / lineAnimationDuration, 1)
        setHeroLineProgress(progress)
        
        if (progress < 1) {
          requestAnimationFrame(animateLine)
        }
      }
      requestAnimationFrame(animateLine)
    }, 500 + 400 + 400) // After navbar animation completes

    // Step 5: Text starts typing
    const typingTimer = setTimeout(() => {
      setShowCursor(true)
    }, 500 + 400 + 400 + 400) // After line starts drawing

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(heroLineTimer)
      clearTimeout(typingTimer)
    }
  }, [])

  // Typing effect
  useEffect(() => {
    if (!showCursor) return

    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        // Hide cursor after typing completes
        setTimeout(() => setShowCursor(false), 200)
        
        // Step 6: Stats appear after typing + 200ms
        setTimeout(() => {
          setStatsVisible([true, false, false])
          setTimeout(() => setStatsVisible([true, true, false]), 150)
          setTimeout(() => setStatsVisible([true, true, true]), 300)
          
          // Step 7: Show dot after stats + 500ms
          setTimeout(() => setShowDot(true), 500)
        }, 200)
        
        // Step 8: Subtitle and CTAs appear
        setTimeout(() => setSubtitleVisible(true), 100)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [showCursor])

  return (
    <>
      <Navbar 
        visible={navbarVisible} 
        showDot={showDot} 
        lineProgress={navbarLineProgress}
        logoVisible={logoVisible}
        linksVisible={navLinksVisible}
      />
      
      <section 
        className="relative flex min-h-screen pt-16 bg-white"
      >
        <div className="mx-auto flex w-full max-w-7xl px-6 lg:px-8">
          {/* Left Side - 55% */}
          <div className="flex w-full flex-col justify-center py-20 lg:w-[55%] lg:pr-16">
            {/* Label */}
            <p 
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-opacity duration-400"
              style={{ 
                opacity: subtitleVisible ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            >
              Studio webowe · Bielsko-Biała
            </p>

            {/* Headline with typing effect */}
            <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.1] text-foreground md:text-6xl lg:text-7xl">
              {typedText}
              {showCursor && (
                <span className="inline-block w-[3px] h-[1em] bg-foreground ml-1 animate-pulse" style={{ verticalAlign: 'baseline' }}>|</span>
              )}
            </h1>

            {/* Horizontal line */}
            <div 
              className="mt-8 h-px w-20 bg-foreground transition-opacity duration-400"
              style={{ 
                opacity: subtitleVisible ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            />

            {/* Sub text */}
            <p 
              className="mt-6 text-base text-muted-foreground md:text-lg transition-opacity duration-400"
              style={{ 
                opacity: subtitleVisible ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            >
              Strony dla gabinetów, restauracji i lokalnych firm — które faktycznie przynoszą klientów.
            </p>

            {/* CTAs */}
            <div 
              className="mt-10 flex flex-wrap items-center gap-4 transition-opacity duration-400"
              style={{ 
                opacity: subtitleVisible ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            >
              <Link
                href="#kontakt"
                className="group rounded-full bg-foreground px-9 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:bg-[#333] hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Zamów bezpłatne demo</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
              </Link>
              <Link
                href="#realizacje"
                className="group rounded-full border border-foreground bg-transparent px-9 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background flex items-center gap-2"
              >
                <span>Zobacz realizacje</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
              </Link>
            </div>
          </div>

          {/* Right Side - 45% */}
          <div className="relative hidden w-[45%] lg:flex">
            {/* Vertical divider with drawing animation */}
            <div 
              className="absolute left-0 top-1/2 w-px bg-foreground"
              style={{ 
                height: '66.67%',
                transform: `translateY(-50%) scaleY(${heroLineProgress})`,
                transformOrigin: 'top',
                boxShadow: heroLineProgress < 1 && heroLineProgress > 0 
                  ? `0 ${heroLineProgress * 100}% 0 0 rgba(255,255,255,0.8), 0 ${heroLineProgress * 100}% 4px 2px rgba(255,255,255,0.4)` 
                  : 'none'
              }}
            />
            {/* Glow effect at drawing point */}
            {heroLineProgress > 0 && heroLineProgress < 1 && (
              <div 
                className="absolute left-0 w-px h-1 bg-white"
                style={{
                  top: `calc(16.67% + ${heroLineProgress * 66.67}%)`,
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 8px 2px rgba(255,255,255,0.8)',
                  opacity: 1 - heroLineProgress
                }}
              />
            )}

            {/* Large watermark */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none font-serif text-[20rem] font-bold leading-none text-foreground/5">
              01
            </div>

            {/* Stats */}
            <div className="relative z-10 flex flex-col justify-center pl-16">
              {stats.map((stat, index) => (
                <div key={stat.label}>
                  <div 
                    className="py-6 transition-opacity duration-300"
                    style={{ 
                      opacity: statsVisible[index] ? 1 : 0,
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                    }}
                  >
                    <p className="font-serif text-4xl font-bold text-foreground">
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {stat.benefit}
                    </p>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="h-px w-16 bg-foreground/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
