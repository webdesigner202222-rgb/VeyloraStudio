"use client"

import { useState, useRef, useEffect } from "react"

const faqItems = [
  {
    question: "Czy moge sam edytowac tresc strony?",
    answer: "Aktualizacje tresci realizujemy na zyczenie w ramach pakietu support lub jako platna usluga dodatkowa (99 zl/h). Dzieki temu strona zawsze wyglada profesjonalnie.",
  },
  {
    question: "Co sie dzieje po 12 miesiacach hostingu?",
    answer: "Po roku bezplatnego hostingu mozesz przedluzyc usluge na kolejny okres lub przeniesc strone na wlasny hosting. Pomozemy w obu przypadkach i zapewnimy plynne przejscie.",
  },
  {
    question: "Czy strona bedzie moja wlasnoscia?",
    answer: "Tak, po oplaceniu calosci projektu strona przechodzi na Twoja wlasnosc. Otrzymujesz pelne prawa do projektu graficznego i kodu strony.",
  },
  {
    question: "Jak wyglada platnosc?",
    answer: "Platnosc dzielimy na dwie czesci: 50% zaliczki po akceptacji demo i 50% po wdrozeniu strony. Akceptujemy przelewy bankowe oraz platnosci online.",
  },
  {
    question: "Czy robicie sklepy internetowe?",
    answer: "Obecnie specjalizujemy sie w stronach wizytowkowych i landing page'ach. Jesli potrzebujesz prostego sklepu z kilkoma produktami, chetnie porozmawiamy o mozliwosciach.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [dividerAnimations, setDividerAnimations] = useState<boolean[]>(faqItems.map(() => false))
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Intersection observer for divider line animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            // Stagger the divider animations
            faqItems.forEach((_, index) => {
              setTimeout(() => {
                setDividerAnimations(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 80)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section className="py-20" ref={sectionRef}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          — FAQ
        </p>

        {/* Headline */}
        <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
          Czeste pytania
        </h2>

        {/* FAQ Items */}
        <div className="mt-12">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            
            return (
              <div key={index} className="relative">
                {/* Top divider with animation */}
                {index === 0 && (
                  <div 
                    className="h-px bg-foreground/20 transition-all duration-500 ease-out"
                    style={{
                      width: dividerAnimations[0] ? '100%' : '0%',
                    }}
                  />
                )}
                
                <div className="overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between py-6 text-left"
                  >
                    <span 
                      className={`pr-4 text-sm transition-all duration-200 ${
                        isOpen ? 'font-semibold' : 'font-medium'
                      } text-foreground`}
                    >
                      {item.question}
                    </span>
                    <span 
                      className="shrink-0 text-lg text-foreground transition-transform duration-300"
                      style={{
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  
                  {/* Answer with smooth max-height animation */}
                  <div
                    ref={(el) => { contentRefs.current[index] = el }}
                    className="overflow-hidden transition-all duration-[450ms] ease-out"
                    style={{
                      maxHeight: isOpen ? '500px' : '0px',
                    }}
                  >
                    <p 
                      className="pb-6 text-sm leading-relaxed text-muted-foreground transition-opacity duration-300"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transitionDelay: isOpen ? '150ms' : '0ms',
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>

                {/* Bottom divider with animation */}
                <div 
                  className={`h-px transition-all duration-500 ease-out ${
                    isOpen ? 'bg-foreground/10' : 'bg-foreground/20'
                  }`}
                  style={{
                    width: dividerAnimations[index] ? '100%' : '0%',
                    transitionDelay: `${index * 80}ms`,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
