"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const faqItems = [
  {
    question: "Czy mogę sam edytować treść strony?",
    answer: "Aktualizacje treści realizujemy na życzenie w ramach pakietu support lub jako płatna usługa dodatkowa (99 zł/h).",
  },
  {
    question: "Co się dzieje po 12 miesiącach hostingu?",
    answer: "Przed końcem okresu wysyłamy przypomnienie. Przedłużenie hostingu to koszt 200–400 zł rocznie w zależności od pakietu.",
  },
  {
    question: "Czy strona będzie moją własnością?",
    answer: "Tak, po pełnej płatności strona wraz z domeną przechodzi na własność klienta.",
  },
  {
    question: "Jak wygląda płatność?",
    answer: "50% zaliczki po akceptacji demo, pozostałe 50% po wdrożeniu i Twojej finalnej akceptacji.",
  },
  {
    question: "Czy robicie sklepy internetowe?",
    answer: "Tak, sklepy wyceniamy indywidualnie — napisz do nas z opisem projektu.",
  },
]

// Word component for staggered reveal
function Word({ 
  word, 
  index, 
  isFirst3Words 
}: { 
  word: string
  index: number
  isFirst3Words: boolean 
}) {
  const shouldReduceMotion = useReducedMotion()
  
  // First 5 words have faster stagger (20ms), rest have 35ms
  const baseDelay = index < 5 ? index * 0.02 : 5 * 0.02 + (index - 5) * 0.035
  // Add 120ms for initial glitch phase
  const totalDelay = 0.12 + baseDelay

  if (shouldReduceMotion) {
    return <span>{word} </span>
  }

  return (
    <motion.span
      initial={{ 
        opacity: 0, 
        filter: "blur(2px)",
        fontSize: isFirst3Words ? "102%" : "100%"
      }}
      animate={{ 
        opacity: 1, 
        filter: "blur(0px)",
        fontSize: "100%"
      }}
      exit={{ 
        opacity: 0, 
        filter: "blur(3px)",
        transition: { 
          duration: 0.18, 
          delay: (faqItems[0].answer.split(" ").length - index) * 0.015,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }}
      transition={{ 
        duration: 0.3, 
        delay: totalDelay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ display: "inline" }}
    >
      {word}{" "}
    </motion.span>
  )
}

// Answer reveal with glitch flicker
function AnswerReveal({ answer, isOpen }: { answer: string; isOpen: boolean }) {
  const shouldReduceMotion = useReducedMotion()
  const words = answer.split(" ")
  const [showContent, setShowContent] = useState(false)
  const [flickerPhase, setFlickerPhase] = useState(0)

  useEffect(() => {
    if (isOpen && !shouldReduceMotion) {
      // Glitch flicker sequence: 0ms, 40ms, 70ms, 100ms, 120ms
      const flickerSequence = [
        { time: 0, opacity: 0.15 },
        { time: 40, opacity: 0 },
        { time: 70, opacity: 0.08 },
        { time: 100, opacity: 0 },
        { time: 120, opacity: 1 },
      ]

      flickerSequence.forEach(({ time, opacity }, i) => {
        setTimeout(() => setFlickerPhase(opacity), time)
      })

      setTimeout(() => setShowContent(true), 120)
    } else if (isOpen && shouldReduceMotion) {
      setShowContent(true)
      setFlickerPhase(1)
    } else {
      setShowContent(false)
      setFlickerPhase(0)
    }
  }, [isOpen, shouldReduceMotion])

  if (shouldReduceMotion) {
    return (
      <p className="pb-6 pt-2 font-sans text-base leading-relaxed text-[#444] max-w-[65ch]">
        {answer}
      </p>
    )
  }

  return (
    <div 
      className="pb-8 pt-6 font-sans text-base leading-[1.8] text-[#444] max-w-[65ch]"
      style={{ 
        opacity: flickerPhase,
        filter: flickerPhase < 1 ? "blur(4px)" : "blur(0px)",
        transition: "opacity 0.04s, filter 0.08s"
      }}
    >
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.span>
            {words.map((word, i) => (
              <Word 
                key={i} 
                word={word} 
                index={i} 
                isFirst3Words={i < 3} 
              />
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

// Plus to X icon transformation
function PlusIcon({ isOpen }: { isOpen: boolean }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className="relative w-5 h-5 flex items-center justify-center">
        <span className="text-lg text-foreground">{isOpen ? "×" : "+"}</span>
      </div>
    )
  }

  return (
    <div className="relative w-5 h-5 flex items-center justify-center">
      {/* Vertical bar of + */}
      <motion.div
        className="absolute w-px h-5 bg-foreground"
        initial={false}
        animate={{
          scaleY: isOpen ? 0 : 1,
          rotate: isOpen ? 45 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: [0.34, 1.1, 0.64, 1]
        }}
      />
      {/* Horizontal bar of + */}
      <motion.div
        className="absolute w-5 h-px bg-foreground"
        initial={false}
        animate={{
          scaleX: isOpen ? 0 : 1,
          rotate: isOpen ? 45 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: [0.34, 1.1, 0.64, 1]
        }}
      />
      {/* X diagonal 1 */}
      <motion.div
        className="absolute w-5 h-px bg-foreground rotate-45"
        initial={false}
        animate={{
          scaleX: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          delay: isOpen ? 0.1 : 0,
          ease: [0.34, 1.1, 0.64, 1]
        }}
      />
      {/* X diagonal 2 */}
      <motion.div
        className="absolute w-5 h-px bg-foreground -rotate-45"
        initial={false}
        animate={{
          scaleX: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          delay: isOpen ? 0.1 : 0,
          ease: [0.34, 1.1, 0.64, 1]
        }}
      />
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [dividerAnimations, setDividerAnimations] = useState<boolean[]>([false, ...faqItems.map(() => false)])
  const [questionAnimations, setQuestionAnimations] = useState<boolean[]>(faqItems.map(() => false))
  const [showOverlay, setShowOverlay] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const toggleItem = useCallback((index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }, [openIndex])

  // Intersection observer for entrance animations
  useEffect(() => {
    if (shouldReduceMotion) {
      setHasAnimated(true)
      setDividerAnimations(faqItems.map(() => true))
      setQuestionAnimations(faqItems.map(() => true))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            // Step 1: Atmosphere overlay (0ms)
            setShowOverlay(true)
            
            // Step 2: Divider lines draw (200ms delay, 120ms stagger)
            const totalDividers = faqItems.length + 1 // top + after each question
            for (let i = 0; i < totalDividers; i++) {
              setTimeout(() => {
                setDividerAnimations(prev => {
                  const newState = [...prev]
                  newState[i] = true
                  return newState
                })
              }, 200 + i * 120)
            }
            
            // Step 3: Questions reveal (400ms delay, 100ms stagger)
            faqItems.forEach((_, index) => {
              setTimeout(() => {
                setQuestionAnimations(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, 400 + index * 100)
            })
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, shouldReduceMotion])

  // Divider line pulse on hover
  const [pulseDivider, setPulseDivider] = useState<number | null>(null)
  
  useEffect(() => {
    if (hoveredIndex !== null && !shouldReduceMotion) {
      setPulseDivider(hoveredIndex)
      const timer = setTimeout(() => setPulseDivider(null), 600)
      return () => clearTimeout(timer)
    }
  }, [hoveredIndex, shouldReduceMotion])

  return (
    <>
      {/* Atmosphere overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          backgroundColor: showOverlay ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0)",
          transition: "background-color 600ms cubic-bezier(0.25, 0.0, 0.0, 1.0)",
        }}
      />
      
      <section className="py-24 relative z-20" ref={sectionRef} id="faq">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Label */}
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            — FAQ
          </p>

          {/* Headline */}
          <h2 className="mt-4 font-serif text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">
            Częste pytania.
          </h2>

          {/* FAQ Items */}
          <div className="mt-20">
            {/* Top divider */}
            <div 
              className="h-px bg-foreground origin-left"
              style={{
                transform: `scaleX(${dividerAnimations[0] ? 1 : 0})`,
                transition: "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index
              const isHovered = hoveredIndex === index
              const isOtherOpen = openIndex !== null && openIndex !== index
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
              
              return (
                <div key={index} className="relative">
                  <div className="overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="flex w-full items-center justify-between py-7 text-left cursor-default group"
                      style={{
                        opacity: questionAnimations[index] ? 1 : 0,
                        filter: questionAnimations[index] ? "blur(0px)" : "blur(3px)",
                        transition: "opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1), filter 500ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                      }}
                    >
                      <span 
                        className="pr-8 font-serif text-2xl md:text-[32px] font-normal text-foreground"
                        style={{
                          letterSpacing: isOpen ? "0.02em" : isHovered ? "0.01em" : "0em",
                          fontWeight: isOpen ? 500 : 400,
                          opacity: isOtherOpen ? 0.3 : isOtherHovered ? 0.55 : 1,
                          filter: isOtherOpen ? "blur(0.5px)" : "none",
                          transition: "letter-spacing 400ms cubic-bezier(0.25, 0.1, 0.25, 1), font-weight 300ms, opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1), filter 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                        }}
                      >
                        {item.question}
                      </span>
                      <div 
                        className="shrink-0"
                        style={{
                          transform: isHovered && !isOpen ? "scale(1.1)" : "scale(1)",
                          opacity: isOtherOpen ? 0.3 : isOtherHovered ? 0.6 : 1,
                          transition: "transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 300ms",
                        }}
                      >
                        <PlusIcon isOpen={isOpen} />
                      </div>
                    </button>
                    
                    {/* Answer with AnimatePresence */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className="overflow-hidden"
                        >
                          <AnswerReveal answer={item.answer} isOpen={isOpen} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom divider */}
                  <div 
                    className="h-px bg-foreground origin-left"
                    style={{
                      transform: `scaleX(${dividerAnimations[index + 1] ? 1 : 0})`,
                      opacity: isOpen ? 0.1 : pulseDivider === index ? 0.4 : 1,
                      transition: `transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 120}ms, opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
