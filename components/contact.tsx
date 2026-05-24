"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

// Dust particle component
function DustParticle({ index }: { index: number }) {
  const randomX = (Math.random() - 0.5) * 60
  const randomY = -(20 + Math.random() * 40)
  const duration = 0.6 + Math.random() * 0.3

  return (
    <motion.div
      className="absolute w-[3px] h-[3px] rounded-full bg-black/12"
      style={{ bottom: 0, left: "50%" }}
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{ 
        x: randomX, 
        y: randomY, 
        opacity: 0 
      }}
      transition={{ 
        duration,
        ease: [0.0, 0.8, 0.2, 1.0]
      }}
    />
  )
}

// Envelope SVG component
function Envelope({ 
  isOpen, 
  showForm, 
  showDust,
  isDropping 
}: { 
  isOpen: boolean
  showForm: boolean
  showDust: boolean
  isDropping: boolean
}) {
  return (
    <div 
      className="relative w-[360px] h-[260px] md:w-[360px] md:h-[260px] max-w-[280px] max-h-[200px] md:max-w-none md:max-h-none"
      style={{ perspective: "600px" }}
    >
      {/* Shadow */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          boxShadow: isDropping ? "none" : "0 40px 80px rgba(0,0,0,0.35)",
          transition: "box-shadow 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />
      
      {/* Envelope body */}
      <div 
        className="absolute inset-0 bg-[#0a0a0a] overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundBlendMode: "soft-light",
        }}
      >
        {/* Edge lines */}
        <div className="absolute inset-0 border border-[#1a1a1a]" />
        {/* Bottom fold crease */}
        <div className="absolute bottom-[30%] left-0 right-0 h-px bg-[#1a1a1a]" />
        
        {/* Interior glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[120%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center top, rgba(255,248,230,0.15) 0%, transparent 70%)",
            opacity: isOpen && !isDropping ? 0.8 : 0,
            transition: "opacity 800ms cubic-bezier(0.25, 0.1, 0.25, 1)",
            transitionDelay: isOpen ? "400ms" : "0ms",
          }}
        />
      </div>
      
      {/* Flap (top triangle) */}
      <div 
        className="absolute top-0 left-0 right-0 h-[45%] origin-top"
        style={{
          transformStyle: "preserve-3d",
          transform: isOpen && !isDropping ? "rotateX(-180deg)" : "rotateX(0deg)",
          transition: "transform 1200ms cubic-bezier(0.25, 0.0, 0.0, 1.0)",
          zIndex: isOpen && !isDropping ? 0 : 10,
        }}
      >
        <svg 
          viewBox="0 0 360 117" 
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="flapNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" mode="soft-light" />
            </filter>
          </defs>
          {/* Triangle flap */}
          <path 
            d="M0 0 L180 117 L360 0 Z" 
            fill="#0a0a0a"
            filter="url(#flapNoise)"
          />
          {/* Fold crease at base */}
          <line x1="0" y1="0" x2="180" y2="117" stroke="#1a1a1a" strokeWidth="1" />
          <line x1="180" y1="117" x2="360" y2="0" stroke="#1a1a1a" strokeWidth="1" />
        </svg>
        
        {/* Backface of flap (visible when rotated) */}
        <div 
          className="absolute inset-0 bg-[#0c0c0c]"
          style={{
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
      
      {/* Dust particles */}
      {showDust && (
        <div className="absolute inset-x-0 bottom-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <DustParticle key={i} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

// Floating label input component
function FloatingInput({ 
  label, 
  type = "text", 
  value, 
  onChange,
  isTextarea = false 
}: { 
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  isTextarea?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0
  const isActive = isFocused || hasValue

  const InputComponent = isTextarea ? "textarea" : "input"

  return (
    <div className="relative">
      {/* Floating label */}
      <label 
        className="absolute left-0 font-sans uppercase tracking-[0.15em] pointer-events-none text-foreground"
        style={{
          fontSize: isActive ? "9px" : "11px",
          transform: isActive ? "translateY(-24px)" : "translateY(12px)",
          transition: "all 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {label}
      </label>
      
      <InputComponent
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent font-serif text-lg py-3 text-foreground focus:outline-none resize-none"
        style={{
          borderBottom: `1px solid ${isActive ? "#111" : "#d0cfc9"}`,
          boxShadow: isFocused ? "0 1px 0 0 rgba(17,17,17,0.4)" : "none",
          transition: "border-color 250ms, box-shadow 250ms",
        }}
        rows={isTextarea ? 4 : undefined}
      />
    </div>
  )
}

export function Contact() {
  const [phase, setPhase] = useState<"waiting" | "dropping" | "landed" | "opening" | "formRising" | "form" | "submitting" | "folding" | "closing" | "dropping-out" | "success">("waiting")
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  })
  const [showDust, setShowDust] = useState(false)
  const [shakeViewport, setShakeViewport] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Intersection observer to trigger envelope animation
  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase("form")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && phase === "waiting") {
            setPhase("dropping")
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [phase, shouldReduceMotion])

  // Animation sequence controller
  useEffect(() => {
    if (shouldReduceMotion) return

    const timers: NodeJS.Timeout[] = []

    if (phase === "dropping") {
      // Land at 72% of 900ms = ~650ms
      timers.push(setTimeout(() => {
        setShakeViewport(true)
        setShowDust(true)
        setTimeout(() => setShakeViewport(false), 280)
        setTimeout(() => setShowDust(false), 900)
      }, 650))
      
      // Landed after full drop
      timers.push(setTimeout(() => setPhase("landed"), 900))
    }

    if (phase === "landed") {
      // Pause 800ms then open
      timers.push(setTimeout(() => setPhase("opening"), 800))
    }

    if (phase === "opening") {
      // Flap opens over 1200ms, then pause 400ms
      timers.push(setTimeout(() => setPhase("formRising"), 1600))
    }

    if (phase === "formRising") {
      // Form rises over 900ms
      timers.push(setTimeout(() => setPhase("form"), 900))
    }

    if (phase === "folding") {
      // Form folds down, then flap closes
      timers.push(setTimeout(() => setPhase("closing"), 700))
    }

    if (phase === "closing") {
      // Flap closes over 1000ms, then pause 500ms
      timers.push(setTimeout(() => setPhase("dropping-out"), 1500))
    }

    if (phase === "dropping-out") {
      // Envelope drops out over 800ms
      timers.push(setTimeout(() => setPhase("success"), 800))
    }

    return () => timers.forEach(clearTimeout)
  }, [phase, shouldReduceMotion])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setPhase("submitting")

    try {
      const response = await fetch("https://formspree.io/f/xdabbpjo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        if (shouldReduceMotion) {
          setPhase("success")
        } else {
          setPhase("folding")
        }
      } else {
        setPhase("form")
      }
    } catch {
      setPhase("form")
    }
  }, [formData, shouldReduceMotion])

  const isEnvelopeOpen = phase === "opening" || phase === "formRising" || phase === "form" || phase === "submitting"
  const isEnvelopeDropping = phase === "dropping-out"
  const showEnvelope = phase !== "waiting" && phase !== "success"

  // Reduced motion: simple form
  if (shouldReduceMotion) {
    return (
      <section 
        id="kontakt" 
        ref={sectionRef}
        className="min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden bg-background"
      >
        <div className="w-full max-w-[480px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
            — KONTAKT
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl italic text-foreground mb-12">
            Porozmawiajmy.
          </h2>

          {phase === "success" ? (
            <div className="text-center py-12">
              <p className="font-serif text-3xl md:text-5xl italic text-foreground tracking-[0.05em]">
                Wiadomość wysłana.
              </p>
              <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                ODEZWIEMY SIĘ W CIĄGU 24H
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <FloatingInput
                label="Imię i nazwisko"
                value={formData.name}
                onChange={(v) => setFormData(prev => ({ ...prev, name: v }))}
              />
              <FloatingInput
                label="Nazwa firmy"
                value={formData.company}
                onChange={(v) => setFormData(prev => ({ ...prev, company: v }))}
              />
              <FloatingInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(v) => setFormData(prev => ({ ...prev, email: v }))}
              />
              <FloatingInput
                label="Wiadomość"
                isTextarea
                value={formData.message}
                onChange={(v) => setFormData(prev => ({ ...prev, message: v }))}
              />
              
              <button
                type="submit"
                disabled={!formData.email || phase === "submitting"}
                className="flex items-center gap-3 bg-foreground text-background px-10 py-4 font-sans text-sm uppercase tracking-[0.15em] transition-all hover:opacity-90 disabled:opacity-50"
              >
                <span>{phase === "submitting" ? "Wysyłanie..." : "Wyślij"}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-current">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      </section>
    )
  }

  return (
    <section 
      id="kontakt" 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden bg-background"
      style={{
        transform: shakeViewport ? "translateX(3px)" : "translateX(0)",
        animation: shakeViewport ? "viewportShake 280ms linear" : "none",
      }}
    >
      {/* Ambient grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Section label + headline */}
        <div className="w-full max-w-[480px] mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
            — KONTAKT
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl italic text-foreground">
            Porozmawiajmy.
          </h2>
        </div>

        {/* Envelope + Form container */}
        <div className="relative flex flex-col items-center">
          {/* Envelope */}
          <AnimatePresence>
            {showEnvelope && (
              <motion.div
                initial={{ y: "-120vh", rotate: -1.5 }}
                animate={
                  phase === "dropping" 
                    ? { y: 0, rotate: 0 }
                    : phase === "dropping-out"
                    ? { y: "130vh", rotate: 1 }
                    : { y: 0, rotate: 0 }
                }
                exit={{ opacity: 0 }}
                transition={
                  phase === "dropping" 
                    ? { 
                        duration: 0.9, 
                        ease: [0.22, 0.0, 0.36, 1.0],
                        y: {
                          times: [0, 0.72, 0.78, 0.85, 1],
                          values: ["-120vh", "0px", "-8px", "0px", "0px"],
                          ease: "linear"
                        }
                      }
                    : phase === "dropping-out"
                    ? { duration: 0.8, ease: [0.55, 0.0, 1.0, 0.45] }
                    : { duration: 0 }
                }
                className="relative"
              >
                <Envelope 
                  isOpen={isEnvelopeOpen} 
                  showForm={phase === "form" || phase === "submitting"} 
                  showDust={showDust}
                  isDropping={isEnvelopeDropping}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form rising from envelope */}
          <AnimatePresence>
            {(phase === "formRising" || phase === "form" || phase === "submitting" || phase === "folding") && (
              <motion.div
                initial={{ y: 80, opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                animate={
                  phase === "folding" 
                    ? { y: 120, opacity: 0, clipPath: "inset(0% 0 100% 0)" }
                    : { y: -60, opacity: 1, clipPath: "inset(0% 0 0 0)" }
                }
                exit={{ y: 120, opacity: 0, clipPath: "inset(0% 0 100% 0)" }}
                transition={
                  phase === "folding"
                    ? { duration: 0.7, ease: [0.55, 0.0, 1.0, 0.45] }
                    : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
                }
                className="absolute top-[100px] md:top-[130px] w-[90vw] md:w-[480px] bg-background px-0 md:px-0"
              >
                <form onSubmit={handleSubmit} className="space-y-8 pt-12">
                  <FloatingInput
                    label="Imię i nazwisko"
                    value={formData.name}
                    onChange={(v) => setFormData(prev => ({ ...prev, name: v }))}
                  />
                  <FloatingInput
                    label="Nazwa firmy"
                    value={formData.company}
                    onChange={(v) => setFormData(prev => ({ ...prev, company: v }))}
                  />
                  <FloatingInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(v) => setFormData(prev => ({ ...prev, email: v }))}
                  />
                  <FloatingInput
                    label="Wiadomość"
                    isTextarea
                    value={formData.message}
                    onChange={(v) => setFormData(prev => ({ ...prev, message: v }))}
                  />
                  
                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={!formData.email || phase === "submitting"}
                    className="flex items-center gap-3 bg-foreground text-background px-10 py-4 font-sans text-sm uppercase tracking-[0.15em] disabled:opacity-50 group"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>{phase === "submitting" ? "Wysyłanie..." : "Wyślij"}</span>
                    <motion.svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      className="stroke-current"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: [0.34, 1.2, 0.64, 1] }}
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success message */}
          <AnimatePresence>
            {phase === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.0, 0.0, 1.0] }}
                className="text-center py-12"
              >
                <p className="font-serif text-3xl md:text-5xl italic text-foreground tracking-[0.05em]">
                  Wiadomość wysłana.
                </p>
                <motion.p 
                  className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-[#888]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.0, 0.0, 1.0] }}
                >
                  ODEZWIEMY SIĘ W CIĄGU 24H
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Viewport shake keyframes */}
      <style jsx>{`
        @keyframes viewportShake {
          0% { transform: translateX(0); }
          20% { transform: translateX(3px); }
          40% { transform: translateX(-2px); }
          60% { transform: translateX(1px); }
          80% { transform: translateX(-1px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
