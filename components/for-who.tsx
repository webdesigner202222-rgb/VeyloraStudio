"use client"

import { useState, useRef, useEffect, useCallback } from "react"

const industries = [
  {
    title: "Gabinety",
    desc: "Medyczne, kosmetyczne, stomatologiczne.",
    examples: ["Rezerwacje online", "Cennik", "Zaufanie pacjentów"],
  },
  {
    title: "Restauracje",
    desc: "Dla kawiarni, bistro i fine dining.",
    examples: ["Menu online", "Rezerwacje stolików", "Galeria"],
  },
  {
    title: "Barbershopy",
    desc: "Salony fryzjerskie i barberskie.",
    examples: ["Cennik usług", "Rezerwacja", "Galeria stylizacji"],
  },
  {
    title: "Detailing",
    desc: "Studia detailingu i myjnie premium.",
    examples: ["Pakiety usług", "Realizacje", "Wycena online"],
  },
  {
    title: "Kancelarie",
    desc: "Prawne, notarialne i podatkowe.",
    examples: ["Specjalizacje", "Zespół", "Formularz kontaktu"],
  },
  {
    title: "Siłownie",
    desc: "Kluby fitness i trenerzy personalni.",
    examples: ["Grafik zajęć", "Karnety", "Trenerzy"],
  },
  {
    title: "Hotele",
    desc: "Butikowe, apartamentowe i pensjonaty.",
    examples: ["Rezerwacje pokoi", "Cennik", "Galeria"],
  },
  {
    title: "Psycholodzy",
    desc: "Gabinety psychologiczne i coachingowe.",
    examples: ["Specjalizacje", "Rezerwacja", "O terapeucie"],
  },
  {
    title: "Architekci",
    desc: "Biura projektowe i architektura wnętrz.",
    examples: ["Portfolio", "Realizacje", "Kontakt"],
  },
  {
    title: "Fotografowie",
    desc: "Studia fotograficzne i fotografia ślubna.",
    examples: ["Portfolio", "Cennik", "Rezerwacja sesji"],
  },
  {
    title: "Szkoły językowe",
    desc: "Kursy językowe i korepetytorzy.",
    examples: ["Oferta kursów", "Grafik", "Zapisy online"],
  },
  {
    title: "Firmy budowlane",
    desc: "Wykonawcy, deweloperzy i wykończenia.",
    examples: ["Realizacje", "Wycena", "Obszar działania"],
  },
]

// Card dimensions
const CARD_WIDTH = 280
const CARD_GAP = 32

export function ForWho() {
  const totalCards = industries.length
  // Clone first 2 and last 2 cards for infinite loop
  const clonedIndustries = [
    ...industries.slice(-2), // Last 2 at start
    ...industries,
    ...industries.slice(0, 2), // First 2 at end
  ]
  
  // Start at index 2 (first real card after 2 clones)
  const [currentIndex, setCurrentIndex] = useState(2)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  // Calculate the translateX to center the current card
  const getTranslateX = useCallback((index: number) => {
    if (containerWidth === 0) return 0
    // Center offset: half of container minus half of card
    const centerOffset = (containerWidth - CARD_WIDTH) / 2
    // Position of current card
    const cardPosition = index * (CARD_WIDTH + CARD_GAP)
    return centerOffset - cardPosition
  }, [containerWidth])

  // ResizeObserver to recalculate on window resize
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateWidth = () => {
      setContainerWidth(container.offsetWidth)
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  // Handle silent jump when hitting a clone
  useEffect(() => {
    if (!isTransitioning) {
      // After transition completes, check if we need to jump
      if (currentIndex <= 1) {
        // At clone of last cards, jump to real last cards
        setIsTransitioning(false)
        setCurrentIndex(currentIndex + totalCards)
      } else if (currentIndex >= totalCards + 2) {
        // At clone of first cards, jump to real first cards
        setIsTransitioning(false)
        setCurrentIndex(currentIndex - totalCards)
      }
    }
  }, [currentIndex, isTransitioning, totalCards])

  const goToCard = (index: number) => {
    setIsTransitioning(true)
    setCurrentIndex(index)
    
    // After transition, allow silent jump check
    setTimeout(() => {
      setIsTransitioning(false)
    }, 400)
  }

  const goNext = () => goToCard(currentIndex + 1)
  const goPrev = () => goToCard(currentIndex - 1)

  // Get actual index for dots (0 to totalCards-1)
  const getActualIndex = () => {
    let actual = currentIndex - 2
    if (actual < 0) actual = totalCards + actual
    if (actual >= totalCards) actual = actual - totalCards
    return actual
  }

  // Touch handlers for swipe (min 50px)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext()
      } else {
        goPrev()
      }
    }
    touchStartX.current = null
  }

  // Click animation for buttons - preserve translateY
  const handleButtonClick = (callback: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    button.classList.add('scale-[0.88]')
    setTimeout(() => {
      button.classList.remove('scale-[0.88]')
    }, 200)
    callback()
  }

  return (
    <section className="py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          — Dla kogo
        </p>

        {/* Headline */}
        <h2 className="mt-4 font-serif text-2xl font-bold text-foreground md:text-3xl">
          Tworzymy strony dla:
        </h2>
      </div>

      {/* Slider Container - full width for peek effect */}
      <div className="mt-8 relative" ref={containerRef}>
        {/* Cards Track */}
        <div 
          className="flex py-4"
          ref={trackRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(${getTranslateX(currentIndex)}px)`,
            transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
          }}
        >
          {clonedIndustries.map((industry, index) => {
            const isActive = index === currentIndex

            return (
              <div
                key={`${industry.title}-${index}`}
                className="flex-shrink-0"
                style={{
                  width: CARD_WIDTH,
                  height: CARD_WIDTH,
                  marginRight: CARD_GAP,
                }}
              >
                <div 
                  className="w-full h-full bg-white border border-foreground p-6 flex flex-col transition-all duration-300"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(0.96)',
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {industry.desc}
                  </p>

                  {/* Examples - pushed to bottom */}
                  <ul className="mt-auto space-y-1">
                    {industry.examples.map((example) => (
                      <li key={example} className="text-xs text-muted-foreground/70">
                        · {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Arrows - circular outlined buttons, vertically centered */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4 md:px-8">
          <button
            onClick={handleButtonClick(goPrev)}
            className="pointer-events-auto w-8 h-8 rounded-full border border-foreground flex items-center justify-center transition-all duration-200 bg-white hover:bg-foreground hover:text-background"
            aria-label="Poprzedni"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleButtonClick(goNext)}
            className="pointer-events-auto w-8 h-8 rounded-full border border-foreground flex items-center justify-center transition-all duration-200 bg-white hover:bg-foreground hover:text-background"
            aria-label="Następny"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {industries.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index + 2)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                getActualIndex() === index
                  ? 'bg-foreground'
                  : 'bg-foreground/30'
              }`}
              aria-label={`Karta ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
