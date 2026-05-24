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
]

const CARD_SIZE = 300
const CARD_GAP = 24
const PEEK_WIDTH = 40
const TRANSITION_DURATION = 350

export function ForWho() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const totalCards = industries.length
  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex === totalCards - 1

  // Calculate translateX to center the current card
  const getTranslateX = useCallback(() => {
    if (containerWidth === 0) return 0
    const centerOffset = (containerWidth - CARD_SIZE) / 2
    const cardPosition = currentIndex * (CARD_SIZE + CARD_GAP)
    return centerOffset - cardPosition
  }, [containerWidth, currentIndex])

  // Update container width on resize
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

  const goTo = (index: number) => {
    if (isTransitioning) return
    if (index < 0 || index > totalCards - 1) return

    setIsTransitioning(true)
    setCurrentIndex(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, TRANSITION_DURATION)
  }

  const goNext = () => {
    if (isAtEnd) return
    goTo(currentIndex + 1)
  }

  const goPrev = () => {
    if (isAtStart) return
    goTo(currentIndex - 1)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || isTransitioning) return
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

  // Click animation for buttons
  const handleButtonClick = (callback: () => void, disabled: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
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

      {/* Slider Container */}
      <div className="mt-8 relative" ref={containerRef}>
        {/* Cards Track */}
        <div 
          className="flex py-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(${getTranslateX()}px)`,
            transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
          }}
        >
          {industries.map((industry, index) => {
            const isActive = index === currentIndex

            return (
              <div
                key={industry.title}
                className="flex-shrink-0"
                style={{
                  width: CARD_SIZE,
                  height: CARD_SIZE,
                  marginRight: CARD_GAP,
                }}
              >
                <div 
                  className="w-full h-full bg-white border border-foreground p-6 flex flex-col"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(0.95)',
                    opacity: isActive ? 1 : 0.5,
                    transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity ${TRANSITION_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
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

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4 md:px-8">
          <button
            onClick={handleButtonClick(goPrev, isAtStart || isTransitioning)}
            disabled={isAtStart || isTransitioning}
            className={`pointer-events-auto w-8 h-8 rounded-full border border-foreground flex items-center justify-center transition-all duration-200 bg-white ${
              isAtStart
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-foreground hover:text-background'
            }`}
            aria-label="Poprzedni"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleButtonClick(goNext, isAtEnd || isTransitioning)}
            disabled={isAtEnd || isTransitioning}
            className={`pointer-events-auto w-8 h-8 rounded-full border border-foreground flex items-center justify-center transition-all duration-200 bg-white ${
              isAtEnd
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-foreground hover:text-background'
            }`}
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
              onClick={() => goTo(index)}
              disabled={isTransitioning}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
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
