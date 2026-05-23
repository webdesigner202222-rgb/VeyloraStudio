"use client"

import { useEffect, useRef, useState } from "react"

const packages = [
  {
    name: "Starter",
    price: "1 499 zl",
    highlighted: false,
    features: [
      { text: "Landing page (1-3 podstrony)", included: true },
      { text: "Projekt na sprawdzonym layoucie", included: true },
      { text: "Responsywnosc mobile", included: true },
      { text: "Formularz kontaktowy", included: true },
      { text: "Optymalizacja SEO", included: false },
      { text: "Google Analytics", included: false },
      { text: "Hosting 12 miesiecy", included: true },
      { text: "Animacje custom", included: false },
      { text: "Support po realizacji", included: false },
    ],
  },
  {
    name: "Standard",
    price: "2 999 zl",
    highlighted: true,
    features: [
      { text: "Do 5 podstron", included: true },
      { text: "Projekt 100% custom", included: true },
      { text: "Responsywnosc mobile", included: true },
      { text: "Formularz kontaktowy", included: true },
      { text: "Optymalizacja SEO", included: true },
      { text: "Google Analytics", included: true },
      { text: "Hosting 12 miesiecy", included: true },
      { text: "Animacje custom", included: false },
      { text: "Support po realizacji", included: false },
    ],
  },
  {
    name: "Premium",
    price: "od 5 499 zl",
    highlighted: false,
    features: [
      { text: "Bez limitu podstron", included: true },
      { text: "Projekt 100% custom", included: true },
      { text: "Responsywnosc mobile", included: true },
      { text: "Formularz kontaktowy", included: true },
      { text: "Zaawansowane SEO", included: true },
      { text: "Google Analytics", included: true },
      { text: "Hosting 24 miesiace", included: true },
      { text: "Animacje i interakcje custom", included: true },
      { text: "Support 3 miesiace", included: true },
    ],
  },
]

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [standardVisible, setStandardVisible] = useState(false)
  const [sideCardsVisible, setSideCardsVisible] = useState(false)
  const [settleAnimation, setSettleAnimation] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            // Phase 1: Standard card slides up
            setStandardVisible(true)
            
            // Phase 2 (300ms after): Side cards slide in
            setTimeout(() => {
              setSideCardsVisible(true)
            }, 300)
            
            // Phase 3 (after all cards land): Settle animation
            setTimeout(() => {
              setSettleAnimation(true)
            }, 900)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const handleSelectPackage = (packageName: string) => {
    const contactSection = document.getElementById("kontakt")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
      
      // Dispatch custom event after scroll completes (800ms delay as specified)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("selectPackage", { detail: packageName }))
      }, 800)
    }
  }

  return (
    <section id="uslugi" className="py-20" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          — Uslugi
        </p>

        {/* Headline */}
        <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
          Pakiety
        </h2>

        {/* Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => {
            const isStandard = index === 1
            const isStarter = index === 0
            const isPremium = index === 2

            let animationStyle: React.CSSProperties = {}
            
            if (isStandard) {
              animationStyle = {
                opacity: standardVisible ? 1 : 0,
                transform: standardVisible 
                  ? `translateY(0) ${settleAnimation ? 'scaleY(1)' : 'scaleY(1)'}`
                  : 'translateY(60px)',
                transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }
              if (settleAnimation) {
                animationStyle.animation = 'settleY 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }
            } else if (isStarter) {
              animationStyle = {
                opacity: sideCardsVisible ? 1 : 0,
                transform: sideCardsVisible ? 'translateX(0)' : 'translateX(-80px)',
                transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }
              if (settleAnimation) {
                animationStyle.animation = 'settleX 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }
            } else if (isPremium) {
              animationStyle = {
                opacity: sideCardsVisible ? 1 : 0,
                transform: sideCardsVisible ? 'translateX(0)' : 'translateX(80px)',
                transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }
              if (settleAnimation) {
                animationStyle.animation = 'settleX 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }
            }

            return (
              <div
                key={pkg.name}
                className={`relative flex flex-col bg-background p-8 ${
                  pkg.highlighted 
                    ? "border-2 border-foreground" 
                    : "border border-foreground"
                }`}
                style={animationStyle}
              >
                {/* Popular badge */}
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-8 bg-foreground px-3 py-1 text-xs font-medium text-background">
                    Najpopularniejszy
                  </div>
                )}

                {/* Package Name */}
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {pkg.name}
                </p>

                {/* Price */}
                <p className="mt-4 font-serif text-4xl font-bold text-foreground">
                  {pkg.price}
                </p>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-foreground/20" />

                {/* Features */}
                <ul className="flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex h-10 items-center gap-3">
                      {feature.included ? (
                        <span className="w-4 shrink-0 text-sm text-foreground">{"\u2713"}</span>
                      ) : (
                        <span className="w-4 shrink-0 text-sm text-muted-foreground">{"\u2717"}</span>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground line-through"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA - Premium Pill Style */}
                <button
                  onClick={() => handleSelectPackage(pkg.name)}
                  className={`group mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                    pkg.highlighted
                      ? "bg-foreground text-background hover:bg-[#333]"
                      : "border-[1.5px] border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  <span>Wybierz</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
                </button>
              </div>
            )
          })}
        </div>

        {/* Note */}
        <p className="mt-6 text-center text-sm font-medium text-foreground">
          Gabinet, restauracja, barbershop? Polecamy pakiet Standard.
        </p>
        <p className="mt-4 text-center text-sm italic text-muted-foreground">
          * Strony budowane na nowoczesnych platformach no-code — szybkie, stabilne i latwe do edycji.
        </p>
      </div>

      <style jsx>{`
        @keyframes settleY {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(1.015); }
          100% { transform: scaleY(1); }
        }
        @keyframes settleX {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(1.01); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}
