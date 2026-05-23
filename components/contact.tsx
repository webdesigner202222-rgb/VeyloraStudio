"use client"

import { useState, useEffect } from "react"

const industries = [
  "Gabinet medyczny",
  "Restauracja",
  "Barbershop",
  "Detailing",
  "Kancelaria",
  "Silownia",
  "Inna",
]

const projectTypes = [
  "Nowa strona od zera",
  "Redesign istniejacej",
  "Landing page",
  "Nie wiem jeszcze",
]

const budgetOptions = [
  "Do 1 500 zl",
  "1 500 - 3 000 zl",
  "Powyzej 3 000 zl",
  "Nie wiem jeszcze",
]

const packageOptions = [
  { value: "Starter", label: "Starter — 1 499 zl" },
  { value: "Standard", label: "Standard — 2 999 zl" },
  { value: "Premium", label: "Premium — od 5 499 zl" },
  { value: "undecided", label: "Nie jestem zdecydowany/a" },
]

export function Contact() {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepAnimating, setStepAnimating] = useState(false)
  const [stepDirection, setStepDirection] = useState<'next' | 'prev'>('next')
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    companyName: "",
    industry: "",
    // Step 2
    hasWebsite: "",
    projectType: "",
    budget: "",
    selectedPackage: "",
    // Step 3
    email: "",
    phone: "",
    additionalInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [highlightPackage, setHighlightPackage] = useState(false)

  // Listen for package selection from pricing cards
  useEffect(() => {
    const handleSelectPackage = (e: CustomEvent<string>) => {
      const packageName = e.detail
      // Pre-select the package but DO NOT change the current step
      // User stays on Step 1 and must manually proceed to Step 2
      setFormData(prev => ({ ...prev, selectedPackage: packageName }))
      
      // Set flag to highlight when user reaches Step 2
      setHighlightPackage(true)
    }

    window.addEventListener('selectPackage', handleSelectPackage as EventListener)
    return () => window.removeEventListener('selectPackage', handleSelectPackage as EventListener)
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://formspree.io/f/xdabbpjo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.companyName,
          industry: formData.industry,
          hasWebsite: formData.hasWebsite,
          projectType: formData.projectType,
          budget: formData.budget,
          selectedPackage: formData.selectedPackage,
          email: formData.email,
          phone: formData.phone,
          additionalInfo: formData.additionalInfo,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setStepDirection('next')
      setStepAnimating(true)
      setTimeout(() => {
        const newStep = currentStep + 1
        setCurrentStep(newStep)
        setStepAnimating(false)
        
        // If moving to Step 2 and a package was pre-selected, trigger highlight animation
        if (newStep === 2 && formData.selectedPackage && highlightPackage) {
          setTimeout(() => setHighlightPackage(false), 400)
        }
      }, 200)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setStepDirection('prev')
      setStepAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setStepAnimating(false)
      }, 200)
    }
  }

  const canProceedStep1 = formData.name && formData.companyName && formData.industry
  const canProceedStep2 = formData.hasWebsite && formData.projectType && formData.budget
  const canSubmit = formData.email

  // Success state
  if (submitStatus === "success") {
    return (
      <section id="kontakt" className="border-y border-foreground bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                — Kontakt
              </p>
              <h2 className="mt-6 font-serif text-4xl font-bold italic text-foreground md:text-5xl">
                Porozmawiajmy.
              </h2>
            </div>

            {/* Right - Success Message */}
            <div className="flex flex-col justify-center">
              <div className="border border-foreground bg-background p-8">
                {/* Animated checkmark */}
                <div className="flex justify-center mb-6">
                  <svg
                    className="w-16 h-16"
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
                      className="animate-draw-circle"
                    />
                    <path
                      d="M16 27l7 7 13-14"
                      stroke="#111111"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      className="animate-draw-check"
                    />
                  </svg>
                </div>
                
                <h3 
                  className="font-serif text-2xl font-bold text-foreground text-center animate-reveal-text"
                  style={{ animationDelay: '0.9s' }}
                >
                  Wiadomosc wyslana!
                </h3>
                <p 
                  className="mt-2 text-muted-foreground text-center animate-reveal-text"
                  style={{ animationDelay: '1.2s' }}
                >
                  Odezwiemy sie w ciagu 24 godzin
                </p>
                <p 
                  className="text-muted-foreground text-center animate-reveal-text"
                  style={{ animationDelay: '1.5s' }}
                >
                  z bezplatnym demo dla Twojej branzy.
                </p>
                <p 
                  className="mt-4 text-sm text-muted-foreground/70 text-center animate-reveal-text"
                  style={{ animationDelay: '1.8s' }}
                >
                  Sprawdz skrzynke email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="kontakt" className="border-y border-foreground bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              — Kontakt
            </p>
            <h2 className="mt-6 font-serif text-4xl font-bold italic text-foreground md:text-5xl">
              Porozmawiajmy.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Odpiszemy w 24h. Demo gotowe w 48h. Zero zobowiazan.
            </p>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">lub napisz bezposrednio</p>
                <a
                  href="mailto:kontakt.veylora@outlook.com"
                  className="text-sm font-medium text-foreground transition-opacity hover:opacity-70"
                >
                  kontakt.veylora@outlook.com
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">lub zadzwon/napisz na WhatsApp:</p>
                <a
                  href="https://wa.me/48733994419"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground transition-opacity hover:opacity-70"
                >
                  +48 733 994 419
                </a>
              </div>
            </div>
          </div>

          {/* Right - Multi-step Form */}
          <div>
            {/* Progress Indicator */}
            <div className="mb-8 flex items-center justify-center gap-0">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep >= step
                        ? "bg-foreground text-background"
                        : "border border-foreground bg-transparent text-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {index < 2 && (
                    <div
                      className={`h-px w-12 transition-colors duration-300 ${
                        currentStep > step ? "bg-foreground" : "bg-foreground/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content with animations */}
            <div 
              className="transition-all duration-250"
              style={{
                opacity: stepAnimating ? 0 : 1,
                transform: stepAnimating 
                  ? `translateX(${stepDirection === 'next' ? '-25px' : '25px'})` 
                  : 'translateX(0)',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground">Opowiedz nam o sobie</h3>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Imie i nazwisko"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border-b border-foreground bg-transparent py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Nazwa firmy"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full border-b border-foreground bg-transparent py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full border-b border-foreground bg-transparent py-4 text-foreground focus:outline-none"
                    >
                      <option value="" disabled className="text-muted-foreground">
                        Branża
                      </option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry} className="bg-background text-foreground">
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceedStep1}
                    className="group flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all duration-300 hover:bg-[#333] hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <span>Dalej</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground">O Twojej stronie</h3>
                  
                  <div>
                    <p className="mb-3 text-sm text-muted-foreground">Czy masz juz strone internetowa?</p>
                    <div className="flex gap-6">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="hasWebsite"
                          value="Tak"
                          checked={formData.hasWebsite === "Tak"}
                          onChange={(e) => setFormData({ ...formData, hasWebsite: e.target.value })}
                          className="h-4 w-4 accent-foreground"
                        />
                        <span className="text-foreground">Tak</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="hasWebsite"
                          value="Nie"
                          checked={formData.hasWebsite === "Nie"}
                          onChange={(e) => setFormData({ ...formData, hasWebsite: e.target.value })}
                          className="h-4 w-4 accent-foreground"
                        />
                        <span className="text-foreground">Nie</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <select
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full border-b border-foreground bg-transparent py-4 text-foreground focus:outline-none"
                    >
                      <option value="" disabled className="text-muted-foreground">
                        Czego potrzebujesz?
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-background text-foreground">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <select
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full border-b border-foreground bg-transparent py-4 text-foreground focus:outline-none"
                    >
                      <option value="" disabled className="text-muted-foreground">
                        Budzet
                      </option>
                      {budgetOptions.map((option) => (
                        <option key={option} value={option} className="bg-background text-foreground">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Package Selection Pills */}
                  <div>
                    <p className="mb-3 text-sm text-muted-foreground">Interesuje mnie pakiet:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {packageOptions.map((pkg) => (
                        <button
                          key={pkg.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, selectedPackage: pkg.value })}
                          className={`rounded-full px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                            formData.selectedPackage === pkg.value
                              ? "bg-foreground text-background"
                              : "border border-foreground bg-transparent text-foreground hover:bg-foreground/5"
                          } ${highlightPackage && formData.selectedPackage === pkg.value ? "scale-105" : ""}`}
                          style={{
                            animation: highlightPackage && formData.selectedPackage === pkg.value 
                              ? 'packageHighlight 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' 
                              : 'none'
                          }}
                        >
                          {pkg.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="group flex items-center gap-2 rounded-full border-[1.5px] border-foreground bg-transparent px-8 py-4 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background active:scale-[0.97]"
                    >
                      <span className="transition-transform duration-200 group-hover:-translate-x-1">{"\u2190"}</span>
                      <span>Wstecz</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceedStep2}
                      className="group flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all duration-300 hover:bg-[#333] hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <span>Dalej</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground">Kontakt</h3>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Adres email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border-b border-foreground bg-transparent py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      placeholder="Numer telefonu (opcjonalnie)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border-b border-foreground bg-transparent py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Cokolwiek chcesz dodac..."
                      rows={3}
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      className="w-full resize-none border-b border-foreground bg-transparent py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="group flex items-center gap-2 rounded-full border-[1.5px] border-foreground bg-transparent px-8 py-4 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background active:scale-[0.97]"
                    >
                      <span className="transition-transform duration-200 group-hover:-translate-x-1">{"\u2190"}</span>
                      <span>Wstecz</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canSubmit || isSubmitting}
                      className="group flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all duration-300 hover:bg-[#333] hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <span>{isSubmitting ? "Wysylanie..." : "Wyslij zapytanie"}</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
                    </button>
                  </div>

                  {submitStatus === "error" && (
                    <p className="mt-4 text-sm text-red-600">
                      Cos poszlo nie tak. Napisz na kontakt.veylora@outlook.com
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes packageHighlight {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
