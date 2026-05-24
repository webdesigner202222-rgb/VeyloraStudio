"use client"

import { useState, useRef, useEffect } from "react"

interface FaqItem {
  question: string
  answer: string
}

interface FaqCategory {
  category: string
  items: FaqItem[]
}

const faqData: FaqCategory[] = [
  {
    category: "OGÓLNE",
    items: [
      {
        question: "Dla jakich firm robicie strony?",
        answer: "Dla każdej lokalnej firmy która chce profesjonalnie wyglądać online. Restauracje, gabinety medyczne, barbershopy, kancelarie, siłownie, sklepy, usługi remontowe, szkoły językowe — piszcie śmiało. Jeśli prowadzisz biznes, zrobimy Ci stronę.",
      },
      {
        question: "Czy robicie sklepy internetowe?",
        answer: "Tak, sklepy wyceniamy indywidualnie. Napisz do nas z opisem projektu — przygotujemy bezpłatną wycenę w 24h.",
      },
      {
        question: "Skąd macie pewność że strona będzie dobra?",
        answer: "Zanim zapłacisz złotówkę — zobaczysz gotowe demo swojej strony. Jeśli Ci się nie spodoba, nie ma żadnych zobowiązań.",
      },
      {
        question: "Czy działacie tylko w Bielsku-Białej?",
        answer: "Nie — obsługujemy klientów z całej Polski. Cały proces odbywa się zdalnie, sprawnie i bez zbędnych spotkań.",
      },
    ],
  },
  {
    category: "PROCES I CZAS",
    items: [
      {
        question: "Ile trwa realizacja strony?",
        answer: "Standardowo 14 dni roboczych od momentu akceptacji demo i wpłaty zaliczki. Dla pakietu Starter bywa krócej — nawet 7 dni.",
      },
      {
        question: "Jak wygląda demo strony?",
        answer: "W ciągu 48h od kontaktu przygotowujemy wizualizację Home Page Twojej przyszłej strony. Widzisz prawdziwy projekt — nie szkice ani makiety.",
      },
      {
        question: "Czy mogę śledzić postęp prac?",
        answer: "Tak. Na bieżąco pokazujemy kolejne etapy realizacji i czekamy na Twój feedback przed przejściem dalej.",
      },
      {
        question: "Co jeśli chcę zmiany po oddaniu strony?",
        answer: "Drobne poprawki w pierwszych 7 dniach od wdrożenia są bezpłatne. Późniejsze zmiany: 99 zł/h.",
      },
    ],
  },
  {
    category: "PŁATNOŚĆ",
    items: [
      {
        question: "Jak wygląda płatność?",
        answer: "50% zaliczki po akceptacji demo, pozostałe 50% po wdrożeniu strony i Twojej finalnej akceptacji. Płatność przelewem bankowym.",
      },
      {
        question: "Czy mogę płacić w ratach?",
        answer: "W indywidualnych przypadkach tak — napisz do nas i wspólnie ustalimy warunki.",
      },
      {
        question: "Czy są jakieś ukryte koszty?",
        answer: "Nie. Cena z oferty to cena finalna. Jedyne dodatkowe koszty to domena (~50 zł/rok) i przedłużenie hostingu po pierwszym roku (200-400 zł/rok) — i zawsze informujemy o tym z wyprzedzeniem.",
      },
      {
        question: "Czy wystawiacie faktury?",
        answer: "Tak, na życzenie wystawiamy rachunek lub fakturę VAT.",
      },
    ],
  },
  {
    category: "TECHNIKALIA",
    items: [
      {
        question: "Czy strona będzie moja własnością?",
        answer: "Tak, w 100%. Po pełnej płatności strona wraz z domeną przechodzi na własność klienta.",
      },
      {
        question: "Czy mogę sam edytować treść strony?",
        answer: "Aktualizacje treści realizujemy na życzenie w ramach pakietu support lub jako płatna usługa dodatkowa (99 zł/h). Dzięki temu strona zawsze wygląda profesjonalnie.",
      },
      {
        question: "Co się dzieje po 12 miesiącach hostingu?",
        answer: "Na 30 dni przed końcem okresu wysyłamy przypomnienie z propozycją przedłużenia. Koszt: 200-400 zł rocznie w zależności od pakietu.",
      },
      {
        question: "Na jakiej technologii budujecie strony?",
        answer: "Używamy nowoczesnych platform no-code (Framer, Webflow, Next.js) które są szybkie, stabilne i bezpieczne. Strony ładują się błyskawicznie i działają perfekcyjnie na mobile.",
      },
      {
        question: "Czy strona będzie widoczna w Google?",
        answer: "Każda strona otrzymuje podstawową optymalizację SEO. W pakiecie Standard i Premium dodajemy Google Analytics i Search Console. Pełne pozycjonowanie to osobna usługa.",
      },
    ],
  },
]

// Flatten all items for animation indexing
const allItemsCount = faqData.reduce((acc, cat) => acc + cat.items.length, 0)

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [dividerAnimations, setDividerAnimations] = useState<boolean[]>(
    Array(allItemsCount + faqData.length).fill(false)
  )
  const sectionRef = useRef<HTMLDivElement>(null)

  const toggleItem = (key: string) => {
    setOpenIndex(openIndex === key ? null : key)
  }

  // Intersection observer for divider line animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)

            // Stagger the divider animations
            const totalDividers = allItemsCount + faqData.length
            for (let i = 0; i < totalDividers; i++) {
              setTimeout(() => {
                setDividerAnimations((prev) => {
                  const newState = [...prev]
                  newState[i] = true
                  return newState
                })
              }, i * 40)
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  let dividerIndex = 0

  return (
    <section className="py-20" ref={sectionRef}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          — FAQ
        </p>

        {/* Headline */}
        <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
          Częste pytania
        </h2>

        {/* FAQ Categories */}
        <div className="mt-12">
          {faqData.map((category, catIdx) => {
            const categoryDividerIdx = dividerIndex
            dividerIndex++

            return (
              <div key={category.category}>
                {/* Category header */}
                <div className={catIdx > 0 ? "mt-8" : ""}>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground pb-3">
                    {category.category}
                  </p>
                  {/* Category top divider */}
                  <div
                    className="h-px bg-foreground/30 transition-all duration-500 ease-out"
                    style={{
                      width: dividerAnimations[categoryDividerIdx] ? "100%" : "0%",
                    }}
                  />
                </div>

                {/* FAQ Items */}
                {category.items.map((item, itemIdx) => {
                  const itemKey = `${catIdx}-${itemIdx}`
                  const isOpen = openIndex === itemKey
                  const currentDividerIdx = dividerIndex
                  dividerIndex++

                  return (
                    <div key={itemKey} className="relative">
                      <div className="overflow-hidden">
                        <button
                          onClick={() => toggleItem(itemKey)}
                          className="flex w-full items-center justify-between py-5 text-left"
                        >
                          <span
                            className={`pr-4 text-sm transition-all duration-200 ${
                              isOpen ? "font-semibold" : "font-medium"
                            } text-foreground`}
                          >
                            {item.question}
                          </span>
                          <span
                            className="shrink-0 text-lg text-foreground transition-transform duration-300"
                            style={{
                              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            }}
                          >
                            +
                          </span>
                        </button>

                        {/* Answer with smooth max-height animation */}
                        <div
                          className="overflow-hidden transition-all duration-[450ms] ease-out"
                          style={{
                            maxHeight: isOpen ? "500px" : "0px",
                          }}
                        >
                          <p
                            className="pb-5 text-sm leading-relaxed text-muted-foreground transition-opacity duration-300"
                            style={{
                              opacity: isOpen ? 1 : 0,
                              transitionDelay: isOpen ? "150ms" : "0ms",
                            }}
                          >
                            {item.answer}
                          </p>
                        </div>
                      </div>

                      {/* Bottom divider with animation */}
                      <div
                        className={`h-px transition-all duration-500 ease-out ${
                          isOpen ? "bg-foreground/10" : "bg-foreground/20"
                        }`}
                        style={{
                          width: dividerAnimations[currentDividerIdx] ? "100%" : "0%",
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
