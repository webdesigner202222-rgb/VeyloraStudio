"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

type PackageKey = "starter" | "standard" | "premium"

interface Feature {
  text: string
  included: boolean
}

interface PackageData {
  key: PackageKey
  label: string
  name: string
  price: string
  priceNote?: string
  delivery: string
  highlighted: boolean
  cardFeatures: Feature[]
  modalFeatures: Feature[]
  description: string
  supportInfo?: {
    title: string
    items: Feature[]
  }
  supportNote?: string
}

const packages: PackageData[] = [
  {
    key: "starter",
    label: "STARTER",
    name: "Starter",
    price: "1 499 zł",
    delivery: "realizacja ~14 dni",
    highlighted: false,
    cardFeatures: [
      { text: "Landing page (1–3 podstrony)", included: true },
      { text: "Projekt na sprawdzonym layoucie", included: true },
      { text: "Responsywność mobile", included: true },
      { text: "Formularz kontaktowy", included: true },
      { text: "Hosting 12 miesięcy", included: true },
      { text: "1 runda poprawek", included: true },
      { text: "Optymalizacja SEO", included: false },
      { text: "Google Analytics", included: false },
      { text: "Animacje", included: false },
      { text: "Support po realizacji", included: false },
      { text: "Własna domena w cenie", included: false },
    ],
    modalFeatures: [
      { text: "Landing page (1–3 podstrony)", included: true },
      { text: "Projekt graficzny na sprawdzonym, przetestowanym layoucie", included: true },
      { text: "Responsywność mobile (iOS + Android)", included: true },
      { text: "Formularz kontaktowy (wysyłka na email)", included: true },
      { text: "Hosting przez 12 miesięcy (serwer, SSL, backupy)", included: true },
      { text: "1 runda poprawek po dostarczeniu projektu", included: true },
      { text: "Optymalizacja SEO", included: false },
      { text: "Google Analytics", included: false },
      { text: "Animacje i efekty interaktywne", included: false },
      { text: "Support techniczny po realizacji", included: false },
      { text: "Integracja z Google Moja Firma", included: false },
      { text: "Wielojęzyczność", included: false },
    ],
    description: "Pakiet Starter to idealne rozwiązanie dla firm które potrzebują solidnej, profesjonalnej obecności w internecie bez zbędnych dodatków. Otrzymujesz gotową stronę opartą na sprawdzonym układzie — zaprojektowanym tak, żeby działał. Bez eksperymentów, bez ryzyka.",
  },
  {
    key: "standard",
    label: "STANDARD",
    name: "Standard",
    price: "2 999 zł",
    delivery: "realizacja ~14 dni",
    highlighted: true,
    cardFeatures: [
      { text: "Do 5 podstron", included: true },
      { text: "Projekt 100% custom", included: true },
      { text: "Responsywność mobile", included: true },
      { text: "Formularz kontaktowy", included: true },
      { text: "Optymalizacja SEO (podstawowe)", included: true },
      { text: "Google Analytics", included: true },
      { text: "Hosting 12 miesięcy", included: true },
      { text: "2 rundy poprawek", included: true },
      { text: "Proste animacje (hover, scroll reveal)", included: true },
      { text: "Własna domena w cenie", included: true },
      { text: "Zaawansowane animacje custom", included: false },
      { text: "Support po realizacji (dostępny +99 zł/h)", included: false },
    ],
    modalFeatures: [
      { text: "Do 5 podstron (np. Strona główna, O nas, Usługi, Galeria, Kontakt)", included: true },
      { text: "Projekt graficzny 100% custom — unikalny dla Twojej firmy", included: true },
      { text: "Responsywność mobile (iOS + Android)", included: true },
      { text: "Formularz kontaktowy (wysyłka na email, Formspree)", included: true },
      { text: "Podstawowa optymalizacja SEO (meta tagi, nagłówki, sitemap, robots.txt)", included: true },
      { text: "Google Analytics — śledzenie ruchu i zachowań użytkowników", included: true },
      { text: "Hosting przez 12 miesięcy (serwer, SSL, backupy automatyczne)", included: true },
      { text: "2 rundy poprawek po dostarczeniu projektu", included: true },
      { text: "Proste animacje (efekty hover, płynne przewijanie, reveal na scroll)", included: true },
      { text: "Własna domena .pl lub .eu w cenie (rejestracja lub przepięcie)", included: true },
      { text: "Zaawansowane animacje i interakcje custom", included: false },
      { text: "Zaawansowane SEO (analiza słów kluczowych, schema markup)", included: false },
      { text: "Support techniczny po realizacji (dostępny jako dodatek — 99 zł/h)", included: false },
      { text: "Integracja z systemami rezerwacji", included: false },
      { text: "Wielojęzyczność", included: false },
    ],
    description: "Pakiet Standard to nasz bestseller — i nie bez powodu. Dostajesz w pełni custom projekt, podstawowe SEO które daje realną widoczność w Google, oraz proste animacje które sprawiają że strona wygląda nowocześnie. Idealne dla gabinetów, restauracji, barbershopów i kancelarii które chcą strony która faktycznie pracuje na klientów.",
    supportNote: "Jeśli po realizacji będziesz potrzebować pomocy technicznej, oferujemy wsparcie w stawce 99 zł/h. Obejmuje: naprawę błędów technicznych, aktualizacje treści, konsultacje. Odpowiedź w ciągu 48h w dni robocze.",
  },
  {
    key: "premium",
    label: "PREMIUM",
    name: "Premium",
    price: "od 5 499 zł",
    priceNote: "zakres ustalany indywidualnie",
    delivery: "wycena indywidualna",
    highlighted: false,
    cardFeatures: [
      { text: "Bez limitu podstron", included: true },
      { text: "Projekt 100% custom", included: true },
      { text: "Responsywność mobile", included: true },
      { text: "Formularz kontaktowy", included: true },
      { text: "Zaawansowane SEO (słowa kluczowe, schema, GSC)", included: true },
      { text: "Google Analytics + konfiguracja celów", included: true },
      { text: "Hosting 24 miesiące", included: true },
      { text: "3 rundy poprawek", included: true },
      { text: "Animacje i interakcje custom", included: true },
      { text: "Własna domena w cenie", included: true },
      { text: "Support techniczny 3 miesiące (odpowiedź 24h)", included: true },
      { text: "Priorytetowa realizacja", included: true },
    ],
    modalFeatures: [
      { text: "Bez limitu podstron — tyle ile potrzebuje Twój projekt", included: true },
      { text: "Projekt graficzny 100% custom — unikalny, premium, dopracowany", included: true },
      { text: "Responsywność mobile (iOS + Android)", included: true },
      { text: "Formularz kontaktowy z konfiguracją powiadomień", included: true },
      { text: "Zaawansowane SEO: analiza słów kluczowych, schema markup, Google Search Console", included: true },
      { text: "Google Analytics z konfiguracją celów i konwersji", included: true },
      { text: "Hosting przez 24 miesiące (serwer premium, SSL, backupy codzienne)", included: true },
      { text: "3 rundy poprawek — pełna kontrola nad efektem", included: true },
      { text: "Animacje i interakcje custom (jak na stronie Veylora)", included: true },
      { text: "Własna domena .pl lub .eu w cenie", included: true },
      { text: "Support techniczny przez 3 miesiące po wdrożeniu", included: true },
      { text: "Priorytetowa realizacja — Twój projekt idzie pierwszy w kolejce", included: true },
      { text: "Optymalizacja prędkości (Lighthouse 90+)", included: true },
      { text: "Integracja z Google Moja Firma", included: true },
    ],
    description: "Pakiet Premium to pełne doświadczenie Veylora — bez kompromisów. Custom animacje, zaawansowane SEO, wsparcie techniczne przez 3 miesiące i priorytet w kolejce realizacji. Dla firm które traktują swoją stronę internetową jako narzędzie sprzedaży, nie wizytówkę.",
    supportInfo: {
      title: "SUPPORT TECHNICZNY — 3 MIESIĄCE",
      items: [
        { text: "Monitoring dostępności strony", included: true },
        { text: "Naprawa błędów technicznych (strona, formularz, hosting)", included: true },
        { text: "Aktualizacje drobnych treści (teksty, zdjęcia)", included: true },
        { text: "Odpowiedzi na pytania techniczne", included: true },
        { text: "Odpowiedź w ciągu 24h w dni robocze (priorytet)", included: true },
        { text: "Nowych podstron lub funkcji (wycena osobno)", included: false },
        { text: "Przeprojektowania istniejących sekcji", included: false },
        { text: "Integracji z nowymi systemami zewnętrznymi", included: false },
      ],
    },
  },
]

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [openModal, setOpenModal] = useState<PackageKey | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [openModal])

  const handleSelectPackage = useCallback((packageName: string, fromModal: boolean = false) => {
    // If from modal, close it first
    if (fromModal && openModal) {
      setOpenModal(null)
      // Wait for modal close animation
      setTimeout(() => {
        scrollToContact(packageName)
      }, 250)
    } else {
      scrollToContact(packageName)
    }
  }, [openModal])

  const scrollToContact = (packageName: string) => {
    const contactSection = document.getElementById("kontakt")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
      
      // Dispatch custom event after scroll completes (800ms delay as specified)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("selectPackage", { detail: packageName }))
      }, 800)
    }
  }

  const currentPackage = packages.find(p => p.key === openModal)

  return (
    <section id="uslugi" className="py-20 bg-[#FAF9F6]" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Label */}
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#888]">
          — USŁUGI
        </p>

        {/* Headline */}
        <h2 className="mt-6 font-serif text-4xl font-bold text-[#111] md:text-[56px] md:leading-[1.1]">
          Pakiety
        </h2>

        {/* Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.key}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(2px)" }}
              animate={hasAnimated ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`relative flex flex-col bg-[#FAF9F6] p-8 ${
                pkg.highlighted 
                  ? "border-[1.5px] border-[#111]" 
                  : "border border-[#d0cfc9]"
              }`}
              style={{ borderRadius: 0 }}
            >
              {/* Popular badge */}
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#111] px-4 py-1.5 text-[11px] font-medium text-white">
                  Najpopularniejszy
                </div>
              )}

              {/* Package Label */}
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#888]">
                {pkg.label}
              </p>

              {/* Price */}
              <p className="mt-4 font-serif text-[52px] font-bold leading-none text-[#111]">
                {pkg.price}
              </p>
              
              {/* Price note (Premium only) */}
              {pkg.priceNote && (
                <p className="mt-1 text-[11px] text-[#888]">{pkg.priceNote}</p>
              )}

              {/* Delivery time */}
              <p className="mt-2 text-[12px] text-[#888]">{pkg.delivery}</p>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-[#d0cfc9]" />

              {/* Features */}
              <ul className="flex-1 space-y-2">
                {pkg.cardFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <span className="mt-0.5 w-4 shrink-0 text-sm text-[#111]">✓</span>
                    ) : (
                      <span className="mt-0.5 w-4 shrink-0 text-sm text-[#bbb]">✗</span>
                    )}
                    <span
                      className={`text-sm leading-relaxed ${
                        feature.included
                          ? "text-[#111]"
                          : "text-[#bbb] line-through"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-[#d0cfc9]" />

              {/* View full package link */}
              <button
                onClick={() => setOpenModal(pkg.key)}
                className="group mb-4 flex items-center gap-1 text-[13px] text-[#666] transition-colors duration-200 hover:text-[#111]"
              >
                <span className="relative">
                  Zobacz pełny pakiet
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#111] transition-transform duration-200 group-hover:scale-x-100" />
                </span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>

              {/* CTA Button */}
              <motion.button
                onClick={() => handleSelectPackage(pkg.name)}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className={`group flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-[#111] text-white hover:bg-[#333]"
                    : "border-[1.5px] border-[#111] bg-transparent text-[#111] hover:bg-[#111] hover:text-white"
                }`}
              >
                <span>WYBIERZ</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Recommendation text */}
        <p className="mt-8 text-center text-[14px] font-medium text-[#111]">
          Gabinet, restauracja, barbershop? Polecamy pakiet Standard.
        </p>
        
        {/* Footnote */}
        <p className="mt-4 text-center text-[12px] italic text-[#888]">
          * Strony budowane na nowoczesnych platformach no-code — szybkie, stabilne i łatwe do edycji.
        </p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && currentPackage && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setOpenModal(null)}
              className="fixed inset-0 z-50 bg-white/75 backdrop-blur-[20px]"
            />

            {/* Modal Card */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{
                duration: openModal ? 0.35 : 0.2,
                ease: openModal ? [0.34, 1.1, 0.64, 1] : [0.25, 0.1, 0.25, 1],
              }}
              className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[580px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-[#d0cfc9] bg-[#FAF9F6] p-12 md:p-12"
              style={{ borderRadius: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close button */}
              <button
                onClick={() => setOpenModal(null)}
                className="absolute right-6 top-6 text-[20px] text-[#999] transition-colors duration-200 hover:text-[#111]"
                aria-label="Zamknij"
              >
                ×
              </button>

              {/* Package Label */}
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#888]">
                {currentPackage.label}
              </p>

              {/* Package Name + Price */}
              <h3 id="modal-title" className="mt-2 font-serif text-3xl font-bold text-[#111]">
                {currentPackage.name} — {currentPackage.price}
              </h3>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-[#d0cfc9]" />

              {/* Features header */}
              <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.1em] text-[#888]">
                Co zawiera pakiet:
              </p>

              {/* Full feature list */}
              <ul className="space-y-2">
                {currentPackage.modalFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-[2]">
                    {feature.included ? (
                      <span className="mt-1 w-4 shrink-0 text-[15px] text-[#111]">✓</span>
                    ) : (
                      <span className="mt-1 w-4 shrink-0 text-[15px] text-[#bbb]">✗</span>
                    )}
                    <span
                      className={`text-[15px] ${
                        feature.included
                          ? "text-[#111]"
                          : "text-[#bbb] line-through"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Support section for Standard (note box) */}
              {currentPackage.supportNote && (
                <>
                  <div className="my-6 h-px w-full bg-[#d0cfc9]" />
                  <div className="border-l-2 border-[#111] bg-[#F5F4F1] p-4">
                    <p className="mb-2 text-[13px] font-medium text-[#111]">Support dostępny jako dodatek</p>
                    <p className="text-[13px] leading-relaxed text-[#666]">
                      {currentPackage.supportNote}
                    </p>
                  </div>
                </>
              )}

              {/* Support section for Premium (detailed) */}
              {currentPackage.supportInfo && (
                <>
                  <div className="my-6 h-px w-full bg-[#d0cfc9]" />
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[#888]">
                    {currentPackage.supportInfo.title}
                  </p>
                  
                  <p className="mb-2 text-[13px] font-medium text-[#111]">Co obejmuje:</p>
                  <ul className="mb-4 space-y-1">
                    {currentPackage.supportInfo.items.filter(i => i.included).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[14px] text-[#111]">
                        <span className="mt-0.5">✓</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="mb-2 text-[13px] font-medium text-[#111]">Nie obejmuje:</p>
                  <ul className="space-y-1">
                    {currentPackage.supportInfo.items.filter(i => !i.included).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[14px] text-[#bbb] line-through">
                        <span className="mt-0.5 no-underline">✗</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Divider */}
              <div className="my-6 h-px w-full bg-[#d0cfc9]" />

              {/* About section */}
              <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.1em] text-[#888]">
                O pakiecie:
              </p>
              <p className="text-[15px] leading-relaxed text-[#111]">
                {currentPackage.description}
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={() => handleSelectPackage(currentPackage.name, true)}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#111] py-4 text-[14px] font-medium uppercase text-white transition-colors duration-300 hover:bg-[#333]"
              >
                <span>WYBIERZ TEN PAKIET</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
