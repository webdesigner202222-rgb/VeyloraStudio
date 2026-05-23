"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const cards = [
  {
    number: "01",
    label: "KROK PIERWSZY",
    title: "Kontakt w 24h",
    body: "Opisujesz nam swoj biznes i potrzeby. Odezwiemy sie w ciagu jednej doby. Omawiamy Twoje cele i dobieramy najlepsze rozwiazanie.",
  },
  {
    number: "02",
    label: "KROK DRUGI",
    title: "Demo w 48h",
    body: "Przygotowujemy pelna wizualizacje Home Page Twojej przyszlej strony — bez zadnych zobowiazan. Zobaczysz jak moze wygladac Twoja strona zanim zaplacisz chocby zlotowke.",
  },
  {
    number: "03",
    label: "KROK TRZECI",
    title: "Zaliczka 50%",
    body: "Podoba Ci sie? Wplacasz polowe kwoty i zaczynamy pelna realizacje. Reszta platna dopiero po wdrozeniu i Twojej finalnej akceptacji.",
  },
  {
    number: "04",
    label: "KROK CZWARTY",
    title: "Live w 14 dni",
    body: "Strona online. Hosting skonfigurowany. Domena podpieta. Gotowe do pozyskiwania nowych klientow od pierwszego dnia.",
  },
]

export function Process() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [showThankYou, setShowThankYou] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [cardAnimating, setCardAnimating] = useState<'none' | 'next' | 'prev'>('none')
  const [checkmarkDrawn, setCheckmarkDrawn] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const totalCards = cards.length

  const openOverlay = () => {
    setIsOpen(true)
    setCurrentCard(0)
    setShowThankYou(false)
    setCheckmarkDrawn(false)
    setTimeout(() => setOverlayVisible(true), 10)
  }

  const closeOverlay = () => {
    setOverlayVisible(false)
    setTimeout(() => {
      setIsOpen(false)
      setCurrentCard(0)
      setShowThankYou(false)
    }, 300)
  }

  const scrollToRealizacje = () => {
    closeOverlay()
    setTimeout(() => {
      const realizacjeSection = document.getElementById("realizacje")
      if (realizacjeSection) {
        realizacjeSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 350)
  }

  const goNext = useCallback(() => {
    if (cardAnimating !== 'none') return
    
    if (showThankYou) return
    
    if (currentCard === totalCards - 1) {
      setCardAnimating('next')
      setTimeout(() => {
        setShowThankYou(true)
        setCardAnimating('none')
        setTimeout(() => setCheckmarkDrawn(true), 100)
      }, 300)
    } else {
      setCardAnimating('next')
      setTimeout(() => {
        setCurrentCard(prev => prev + 1)
        setCardAnimating('none')
      }, 300)
    }
  }, [currentCard, totalCards, showThankYou, cardAnimating])

  const goPrev = useCallback(() => {
    if (cardAnimating !== 'none') return
    
    if (showThankYou) {
      setCardAnimating('prev')
      setTimeout(() => {
        setShowThankYou(false)
        setCheckmarkDrawn(false)
        setCardAnimating('none')
      }, 300)
    } else if (currentCard > 0) {
      setCardAnimating('prev')
      setTimeout(() => {
        setCurrentCard(prev => prev - 1)
        setCardAnimating('none')
      }, 300)
    }
  }, [currentCard, showThankYou, cardAnimating])

  // Touch handlers for swipe
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

  // Click animation for arrow buttons - use class toggle to avoid breaking transform
  const handleArrowClick = (callback: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    button.classList.add('scale-[0.88]')
    setTimeout(() => {
      button.classList.remove('scale-[0.88]')
    }, 200)
    callback()
  }

  // Block body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape') closeOverlay()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, goNext, goPrev])

  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - currentCard
    
    if (diff === 0) {
      // Current card
      let transform = 'translateX(0) translateY(0) scale(1)'
      let opacity = 1
      
      if (cardAnimating === 'next') {
        transform = 'translateX(-100%) scale(1)'
        opacity = 0
      } else if (cardAnimating === 'prev') {
        transform = 'translateX(100%) scale(1)'
        opacity = 0
      }
      
      return {
        transform,
        opacity,
        zIndex: 30,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }
    } else if (diff === 1) {
      // Next card (behind) - scale(0.96), offset 8px, opacity 0.5
      return {
        transform: 'translateY(8px) scale(0.96)',
        opacity: 0.5,
        zIndex: 20,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }
    } else if (diff === 2) {
      // Second next card - scale(0.92), offset 16px, opacity 0.3
      return {
        transform: 'translateY(16px) scale(0.92)',
        opacity: 0.3,
        zIndex: 10,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }
    } else if (diff === 3) {
      // Third next card - scale(0.88), offset 24px, opacity 0.15
      return {
        transform: 'translateY(24px) scale(0.88)',
        opacity: 0.15,
        zIndex: 5,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }
    } else if (diff < 0) {
      // Previous cards (hidden to the left)
      return {
        transform: 'translateX(-100%) scale(0.9)',
        opacity: 0,
        zIndex: 0,
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }
    }
    // Cards far ahead
    return {
      transform: 'translateY(32px) scale(0.84)',
      opacity: 0,
      zIndex: 0,
      transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
    }
  }

  return (
    <section id="proces" className="border-y border-foreground bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          — Proces
        </p>

        {/* Headline - centered */}
        <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
          Jak wyglada wspolpraca z nami
        </h2>

        {/* Trigger Button - centered, pill style */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={openOverlay}
            className="group flex items-center gap-3 rounded-full border-[1.5px] border-foreground bg-transparent px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Wyswietl krotka prezentacje — zobacz jak wyglada proces naszej pracy</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: overlayVisible ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0)',
            backdropFilter: overlayVisible ? 'blur(8px)' : 'blur(0px)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          onClick={closeOverlay}
        >
          {/* Close button */}
          <button
            onClick={closeOverlay}
            className="absolute top-6 right-6 text-white text-3xl hover:opacity-70 transition-opacity z-50"
            aria-label="Zamknij"
          >
            {"\u00D7"}
          </button>

          {/* Card Stack Container */}
          <div
            className="relative w-full max-w-[480px] mx-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrows - chevron icons, both at exact same vertical position */}
            <button
              onClick={handleArrowClick(goPrev)}
              disabled={currentCard === 0 && !showThankYou}
              className={`absolute w-10 h-10 rounded-full border border-white/50 flex items-center justify-center z-50 hidden md:flex transition-opacity duration-200 ${
                currentCard === 0 && !showThankYou ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'
              }`}
              style={{ 
                left: '-64px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              aria-label="Poprzedni"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4L6 8L10 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleArrowClick(goNext)}
              disabled={showThankYou}
              className={`absolute w-10 h-10 rounded-full border border-white/50 flex items-center justify-center z-50 hidden md:flex transition-opacity duration-200 ${
                showThankYou ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'
              }`}
              style={{ 
                right: '-64px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              aria-label="Następny"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Card Stack */}
            <div className="relative h-[400px]">
              {/* Process Cards */}
              {cards.map((card, index) => (
                <div
                  key={card.number}
                  className="absolute inset-0 bg-white rounded-3xl p-10 shadow-2xl"
                  style={getCardStyle(index)}
                >
                  {/* Watermark */}
                  <span className="absolute top-6 right-8 font-serif text-[120px] font-bold leading-none text-foreground/5 select-none">
                    {card.number}
                  </span>

                  {/* Content */}
                  <div className="relative z-10">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      — {card.label}
                    </p>
                    <h3 className="mt-6 font-serif text-3xl font-bold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}

              {/* Thank You Screen */}
              {showThankYou && (
                <div
                  className="absolute inset-0 bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center text-center"
                  style={{
                    opacity: cardAnimating === 'prev' ? 0 : 1,
                    transform: cardAnimating === 'prev' ? 'translateX(100%)' : 'translateX(0)',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    zIndex: 30,
                  }}
                >
                  {/* Checkmark SVG */}
                  <svg
                    className="w-20 h-20 mb-6"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="26"
                      cy="26"
                      r="24"
                      stroke="#111111"
                      strokeWidth="2"
                      fill="none"
                      className={checkmarkDrawn ? 'animate-draw-circle' : ''}
                      style={{ strokeDasharray: 166, strokeDashoffset: checkmarkDrawn ? 0 : 166 }}
                    />
                    <path
                      d="M16 27l7 7 13-14"
                      stroke="#111111"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      className={checkmarkDrawn ? 'animate-draw-check' : ''}
                      style={{ strokeDasharray: 50, strokeDashoffset: checkmarkDrawn ? 0 : 50 }}
                    />
                  </svg>

                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    To byla przyjemnosc.
                  </h3>
                  <p className="mt-4 text-base text-muted-foreground max-w-xs">
                    Mamy nadzieje, ze nasz proces Cie przekonal. Jestesmy gotowi — kiedy Ty bedziesz gotowy.
                  </p>

                  <button
                    onClick={scrollToRealizacje}
                    className="group mt-8 flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:bg-[#333] hover:scale-[1.02]"
                  >
                    <span>Zobacz nasze realizacje</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Step Indicator */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-[0.15em] text-white/70">
                {showThankYou ? 'Koniec' : `0${currentCard + 1} / 0${totalCards}`}
              </p>
              
              {/* Dots */}
              <div className="flex gap-2">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (showThankYou) {
                        setShowThankYou(false)
                        setCheckmarkDrawn(false)
                      }
                      setCurrentCard(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      !showThankYou && currentCard === index
                        ? 'bg-white'
                        : 'border border-white/50 bg-transparent'
                    }`}
                    aria-label={`Karta ${index + 1}`}
                  />
                ))}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    showThankYou
                      ? 'bg-white'
                      : 'border border-white/50 bg-transparent'
                  }`}
                />
              </div>
            </div>

            {/* Mobile nav hints */}
            <p className="mt-4 text-center text-xs text-white/50 md:hidden">
              Przesun palcem aby nawigowac
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
