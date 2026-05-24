"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const categories = ["Ogólne", "Techniczne", "Płatność", "Współpraca", "Hosting"] as const
type Category = typeof categories[number]

const faqData: Record<Category, { question: string; answer: string }[]> = {
  "Ogólne": [
    {
      question: "Czym dokładnie zajmuje się Veylora?",
      answer: "Veylora to premium studio webowe z Bielska-Białej. Tworzymy strony internetowe dla lokalnych polskich firm — restauracji, barbershopów, gabinetów medycznych, kancelarii prawnych, studiów detailingu i siłowni. Naszym wyróżnikiem jest model demo-first: widzisz gotową stronę zanim zapłacisz złotówkę."
    },
    {
      question: "Czy mogę zobaczyć stronę zanim zapłacę?",
      answer: "Tak — i to jest fundament naszego modelu pracy. W ciągu 48 godzin od kontaktu przygotowujemy pełne demo Home Page Twojej przyszłej strony. Dopiero po Twojej akceptacji pobieramy zaliczkę. Zero zobowiązań na etapie demo."
    },
    {
      question: "Dla jakich branż tworzycie strony?",
      answer: "Specjalizujemy się w: gabinetach medycznych i kosmetycznych, restauracjach i kawiarniach, barbershopach i salonach fryzjerskich, studiach detailingu, kancelariach prawnych i notarialnych oraz siłowniach i klubach fitness. Każdą branżę znamy na tyle dobrze, żeby strona nie wyglądała generycznie."
    },
    {
      question: "Czy obsługujecie firmy spoza Bielska-Białej?",
      answer: "Tak, obsługujemy klientów z całej Polski. Cały proces — od briefu przez demo po wdrożenie — odbywa się zdalnie. Komunikujemy się przez email, telefon i WhatsApp. Lokalny klient z Bielska-Białej ma dokładnie taki sam standard obsługi jak firma z Warszawy czy Krakowa."
    },
    {
      question: "Jak długo trwa realizacja strony?",
      answer: "Standardowy czas realizacji to 14 dni od zaakceptowania demo i opłacenia zaliczki. W pakiecie Premium z rozbudowaną animacją i większą liczbą podstron czas może wynieść do 21 dni. Zawsze ustalamy konkretną datę wdrożenia przed rozpoczęciem pracy."
    },
    {
      question: "Czy mogę sam edytować treść strony po wdrożeniu?",
      answer: "Aktualizacje treści realizujemy na życzenie — w ramach pakietu support lub jako płatna usługa dodatkowa (99 zł/h). Strony budujemy na nowoczesnych platformach, które umożliwiają edycję, jednak nie oferujemy panelu CMS w standardzie — skupiamy się na jakości wizualnej, nie na systemach zarządzania."
    },
    {
      question: "Czy robicie sklepy internetowe?",
      answer: "Tak, sklepy wyceniamy indywidualnie. Napisz do nas z krótkim opisem projektu — ilość produktów, funkcje, integracje — a wrócimy z wyceną w ciągu 24 godzin."
    }
  ],
  "Techniczne": [
    {
      question: "Na jakiej technologii budujecie strony?",
      answer: "Budujemy na nowoczesnych platformach no-code i low-code — szybkich, stabilnych i łatwych do aktualizacji. Wybór technologii zależy od pakietu i potrzeb projektu. Każda strona jest w pełni responsywna, zoptymalizowana pod kątem szybkości ładowania i gotowa na indeksowanie przez Google."
    },
    {
      question: "Czy strona będzie działać dobrze na telefonie?",
      answer: "Responsywność mobilna jest standardem — nie opcją. Każda strona którą tworzymy jest projektowana mobile-first i testowana na urządzeniach iOS i Android przed wdrożeniem. Ponad 60% ruchu w internecie pochodzi z telefonów — traktujemy to poważnie."
    },
    {
      question: "Jak szybko będzie ładować się strona?",
      answer: "Optymalizacja prędkości jest wbudowana w nasz proces. Strony osiągają wyniki Lighthouse 90+ w kategorii Performance. Kompresujemy obrazy, minimalizujemy kod i korzystamy z CDN. Szybkość ładowania ma bezpośredni wpływ na pozycję w Google — dlatego nie robimy z niej kompromisu."
    },
    {
      question: "Czy strona będzie zoptymalizowana pod SEO?",
      answer: "Podstawowa optymalizacja SEO (meta tagi, struktura nagłówków, sitemap, schema markup) jest dostępna od pakietu Standard. Pakiet Premium zawiera zaawansowane SEO — analiza słów kluczowych, optymalizacja treści, Google Search Console. Pakiet Starter nie zawiera SEO."
    },
    {
      question: "Czy mogę podpiąć własną domenę?",
      answer: "Tak. Jeśli masz już domenę — podpinamy ją bez dodatkowych kosztów. Jeśli potrzebujesz nowej domeny — pomagamy ją zarejestrować i konfigurujemy DNS. Zajmujemy się całą stroną techniczną wdrożenia."
    },
    {
      question: "Czy strona będzie miała certyfikat SSL (HTTPS)?",
      answer: "Tak, każda strona którą wdrażamy działa na HTTPS z ważnym certyfikatem SSL. To standard bezpieczeństwa wymagany przez przeglądarki i premiowany przez Google w wynikach wyszukiwania."
    }
  ],
  "Płatność": [
    {
      question: "Jak wygląda model płatności?",
      answer: "50% zaliczki opłacasz po akceptacji demo i podjęciu decyzji o współpracy. Pozostałe 50% płacisz dopiero po wdrożeniu strony i Twojej finalnej akceptacji. Demo jest całkowicie bezpłatne — nie pobieramy żadnych opłat przed pokazaniem efektu."
    },
    {
      question: "Jakie są dostępne formy płatności?",
      answer: "Akceptujemy przelew bankowy (dane w fakturze pro-forma) oraz płatności online. Wystawiamy faktury VAT. W przypadku klientów zagranicznych możliwy jest przelew SEPA."
    },
    {
      question: "Czy ceny są negocjowalne?",
      answer: "Ceny pakietów są stałe i transparentne. Nie negocjujemy stawek bazowych — zamiast tego dostosowujemy zakres projektu do budżetu klienta. Jeśli Twój budżet jest niższy niż cena pakietu Standard, możemy omówić uproszczoną wersję projektu."
    },
    {
      question: "Co się stanie jeśli nie spodoba mi się efekt końcowy?",
      answer: "Przed wdrożeniem przechodzimy przez rundę poprawek. Jeśli po poprawkach nadal nie jesteś zadowolony — szczegółowe warunki opisuje umowa którą podpisujemy przed rozpoczęciem pracy. Demo jest bezpłatne właśnie po to, żeby ryzyko po Twojej stronie było minimalne."
    },
    {
      question: "Czy wystawiacie faktury VAT?",
      answer: "Tak, wystawiamy faktury VAT na dane firmowe lub osobiste. Faktura pro-forma jest wysyłana przed płatnością zaliczki, faktura VAT po zaksięgowaniu wpłaty."
    }
  ],
  "Współpraca": [
    {
      question: "Jak wygląda pierwszy krok do współpracy?",
      answer: "Wypełnij formularz kontaktowy lub napisz bezpośrednio na kontakt.veylora@outlook.com. Opisz swoją firmę i branżę — im więcej szczegółów, tym lepsze demo. Odezwiemy się w ciągu 24 godzin z pytaniami doprecyzowującymi i terminem dostarczenia demo."
    },
    {
      question: "Czy muszę przygotować jakieś materiały przed demo?",
      answer: "Nie — na etapie demo korzystamy z materiałów zastępczych (teksty, zdjęcia). Potrzebujemy tylko: nazwy firmy, branży, lokalizacji i ogólnego poczucia jakiego stylu szukasz. Prawdziwe treści i zdjęcia zbieramy po akceptacji demo, przed pełną realizacją."
    },
    {
      question: "Ile rund poprawek jest wliczonych w cenę?",
      answer: "Pakiet Starter: 1 runda poprawek. Pakiet Standard: 2 rundy. Pakiet Premium: 3 rundy + dedykowany priorytet. Każda kolejna runda poza limitem pakietu: 99 zł/h."
    },
    {
      question: "Czy mogę śledzić postęp prac?",
      answer: "Tak. Po opłaceniu zaliczki udostępniamy link do wersji staging — możesz obserwować postęp prac na żywo. Komunikujemy się przez email i WhatsApp, zawsze z odpowiedzią w ciągu kilku godzin w godzinach roboczych."
    },
    {
      question: "Co się dzieje po wdrożeniu strony?",
      answer: "Po wdrożeniu przekazujemy dostępy do domeny, hostingu i platformy. Wysyłamy krótki przewodnik po tym co zostało wdrożone. Pakiet Premium zawiera 3 miesiące supportu technicznego. W pozostałych pakietach support jest dostępny jako usługa dodatkowa."
    }
  ],
  "Hosting": [
    {
      question: "Co zawiera hosting w cenie pakietu?",
      answer: "Pakiet Starter i Standard zawierają 12 miesięcy hostingu. Pakiet Premium zawiera 24 miesiące. Hosting obejmuje: przestrzeń na serwerze, certyfikat SSL, backupy oraz utrzymanie technicznej sprawności strony. Konfiguracja i migracja są wliczone w cenę."
    },
    {
      question: "Co się dzieje po wygaśnięciu okresu hostingu?",
      answer: "Przed końcem okresu wysyłamy przypomnienie z minimum 30-dniowym wyprzedzeniem. Przedłużenie hostingu kosztuje 200–400 zł rocznie w zależności od pakietu. Możesz też przenieść stronę na własny hosting — przekazujemy wszystkie pliki i dane dostępowe."
    },
    {
      question: "Czy strona będzie moja własnością?",
      answer: "Tak. Po opłaceniu pełnej kwoty strona wraz z domeną i wszystkimi plikami przechodzi na własność klienta. Nie stosujemy lock-inów — możesz przenieść stronę do innego dostawcy w dowolnym momencie."
    },
    {
      question: "Czy zapewniacie backupy strony?",
      answer: "Tak, wykonujemy automatyczne backupy. W przypadku awarii technicznej przywracamy stronę z backupu bez dodatkowych kosztów. Bezpieczeństwo danych i ciągłość działania strony są częścią usługi hostingowej."
    }
  ]
}

function WordReveal({ text, isOpen }: { text: string; isOpen: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')
  
  if (prefersReducedMotion) {
    return <span>{text}</span>
  }
  
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(1.5px)" }}
          animate={isOpen ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(2px)" }}
          transition={{
            duration: isOpen ? 0.25 : 0.12,
            delay: isOpen ? i * 0.025 : (words.length - 1 - i) * 0.012,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

function PlusToX({ isOpen }: { isOpen: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <div className="relative w-4 h-4 flex items-center justify-center">
      {/* Horizontal bar (always visible) */}
      <motion.div
        className="absolute w-3.5 h-[1.5px] bg-[#111]"
        animate={{
          rotate: isOpen ? 45 : 0
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.34, 1.1, 0.64, 1] }}
      />
      {/* Vertical bar */}
      <motion.div
        className="absolute w-3.5 h-[1.5px] bg-[#111]"
        animate={{
          rotate: isOpen ? -45 : 90,
          scaleX: isOpen ? 1 : 1
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 0.2, 
          delay: prefersReducedMotion ? 0 : (isOpen ? 0.1 : 0),
          ease: [0.34, 1.1, 0.64, 1] 
        }}
      />
    </div>
  )
}

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<Category>("Ogólne")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [dividerAnimations, setDividerAnimations] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const currentItems = faqData[activeCategory]
  
  // Reset divider animations when category changes
  useEffect(() => {
    if (hasAnimated) {
      setDividerAnimations([])
      setTimeout(() => {
        currentItems.forEach((_, index) => {
          setTimeout(() => {
            setDividerAnimations(prev => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }, index * 80)
        })
      }, 240) // Wait for exit animation
    }
  }, [activeCategory, hasAnimated, currentItems])

  // Intersection observer for initial divider animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            currentItems.forEach((_, index) => {
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
  }, [hasAnimated, currentItems])

  const handleCategoryChange = (category: Category) => {
    if (category === activeCategory) return
    setOpenIndex(null)
    setDividerAnimations([])
    setActiveCategory(category)
  }

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-[#FAF9F6]" ref={sectionRef}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Label */}
        <p 
          className="text-[11px] uppercase tracking-[0.2em] text-[#666]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          — FAQ
        </p>

        {/* Headline */}
        <h2 
          className="mt-4 text-[48px] md:text-[64px] font-bold text-[#111]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Częste pytania.
        </h2>
        
        {/* Descriptor */}
        <p 
          className="mt-3 text-[15px] text-[#888]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Wybierz kategorię, aby zobaczyć odpowiedzi na najczęściej zadawane pytania.
        </p>

        {/* Category Tabs */}
        <div 
          className="mt-14 flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {categories.map((category, idx) => (
            <div key={category} className="flex items-center">
              <button
                onClick={() => handleCategoryChange(category)}
                className="relative cursor-pointer"
              >
                <span
                  className={`text-[13px] uppercase tracking-[0.15em] transition-all duration-300 ${
                    activeCategory === category 
                      ? "text-[#111] font-semibold" 
                      : "text-[#999] font-normal hover:text-[#666]"
                  }`}
                >
                  {category}
                </span>
                {/* Active underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-px bg-[#111]"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: activeCategory === category ? 1 : 0,
                    opacity: activeCategory === category ? 1 : 0
                  }}
                  transition={{ 
                    scaleX: { duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: prefersReducedMotion ? 0 : 0.1 }
                  }}
                  style={{ 
                    width: "100%", 
                    transformOrigin: "left" 
                  }}
                />
              </button>
              {idx < categories.length - 1 && (
                <span className="mx-4 text-[#ccc]">·</span>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                filter: prefersReducedMotion ? "blur(0px)" : "blur(2px)" 
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {currentItems.map((item, index) => {
                const isOpen = openIndex === index
                const isHovered = hoveredIndex === index
                const isOtherOpen = openIndex !== null && openIndex !== index
                const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
                
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, filter: prefersReducedMotion ? "blur(0px)" : "blur(2px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.4,
                      delay: prefersReducedMotion ? 0 : 0.06 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative"
                  >
                    {/* Top divider for first item */}
                    {index === 0 && (
                      <div 
                        className="h-px bg-[#e0ddd8] transition-all duration-500 ease-out"
                        style={{
                          width: dividerAnimations[0] ? '100%' : '0%',
                        }}
                      />
                    )}
                    
                    <div className="overflow-hidden">
                      <button
                        onClick={() => toggleItem(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="flex w-full items-center justify-between py-5 text-left group"
                      >
                        <span 
                          className="pr-4 text-[15px] md:text-[15px] transition-all duration-300"
                          style={{ 
                            fontFamily: "Inter, sans-serif",
                            fontWeight: isOpen ? 500 : 400,
                            color: "#111",
                            letterSpacing: isHovered && !isOpen ? "0.01em" : "0",
                            opacity: isOtherOpen ? 0.35 : (isOtherHovered ? 0.5 : 1),
                            filter: isOtherOpen && !prefersReducedMotion ? "blur(0.4px)" : "blur(0px)"
                          }}
                        >
                          {item.question}
                        </span>
                        <div 
                          className="shrink-0 transition-transform duration-200"
                          style={{
                            transform: isHovered ? "scale(1.1)" : "scale(1)",
                            opacity: isOtherOpen ? 0.35 : (isOtherHovered ? 0.5 : 1)
                          }}
                        >
                          <PlusToX isOpen={isOpen} />
                        </div>
                      </button>
                      
                      {/* Answer */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : 0.1 }
                            }}
                            className="overflow-hidden"
                          >
                            <p 
                              className="pb-7 text-[14px] md:text-[15px] leading-[1.85] text-[#555] max-w-[68ch]"
                              style={{ 
                                fontFamily: "Inter, sans-serif",
                                paddingTop: "4px"
                              }}
                            >
                              <WordReveal text={item.answer} isOpen={isOpen} />
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom divider */}
                    <div 
                      className={`h-px transition-all duration-500 ease-out ${
                        isOpen ? 'bg-[#e0ddd8]/50' : 'bg-[#e0ddd8]'
                      }`}
                      style={{
                        width: dividerAnimations[index] ? '100%' : '0%',
                        transitionDelay: `${index * 80}ms`,
                      }}
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
