"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    category: "RESTAURACJA",
    packageName: "STANDARD",
    packagePrice: "2 999 zl",
    description: "Elegancka strona dla restauracji z wloskim klimatem. Zawiera: menu online, system rezerwacji stolikow, galerie wnetrza i sekcje o szefie kuchni.",
    tags: ["SEO", "Rezerwacje", "Galeria", "Mobile"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q5UEVDLVSGkWPNWoWJE5jjcD9cmP8S.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8keokO77Zx0Me21MgJoEEDkXkuzhvr.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-adDY5oAvzNEvYDhoTQeRBcUp2s3RvR.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UeuPr4l7jUV0zMAQGRdqOLhZ612cxz.png",
    ],
  },
  {
    id: 2,
    category: "BARBERSHOP",
    packageName: "STARTER",
    packagePrice: "1 499 zl",
    description: "Prestizowa strona dla premium barbershopu. Zawiera: cennik uslug, galerie realizacji, rezerwacje online i sekcje o barberach.",
    tags: ["SEO", "Rezerwacje", "Cennik", "Mobile"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MqZgvSAiJgowKOHb7pBxIXy9jVbHlz.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xw9njkxKgdjuhCLjpfc9KZ3IYGW0hj.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f3rLeXU8UWvR1ncyNi5omxrLNBMOfO.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QOJe1OBWUWcFxNrPfW4nAD7035Ud2J.png",
    ],
  },
  {
    id: 3,
    category: "DETAILING",
    packageName: "PREMIUM",
    packagePrice: "od 5 499 zl",
    description: "Nowoczesna strona dla studia detailingu. Zawiera: pakiety uslug, kalkulator wyceny, galerie realizacji i formularz kontaktowy.",
    tags: ["SEO", "Wycena", "Galeria", "Animacje", "Mobile"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iTNKIy5AU0c9yj70cjQdm8t3FEwOA1.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PhTjohhdchrOrrYsmlEccasWV8P4ai.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ek3gmWUf4LDJm9fz5dyRTAmIGO5NcE.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FANBYxvDPVhLNGLXPfcIAUCPEzk1Ab.png",
    ],
  },
]

// Initial card rotation angles
const initialRotations = [-12, -8, -5]

export function Portfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [contentTransitioning, setContentTransitioning] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxVisible, setLightboxVisible] = useState(false)
  
  // Casino deal animation state
  const [dealtCards, setDealtCards] = useState<boolean[]>([false, false, false])
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null

  // Casino deal animation with IntersectionObserver
  useEffect(() => {
    if (hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            // Staggered deal: Card 1 at 0ms, Card 2 at 220ms, Card 3 at 440ms
            setTimeout(() => {
              setDealtCards(prev => [true, prev[1], prev[2]])
            }, 0)
            
            setTimeout(() => {
              setDealtCards(prev => [prev[0], true, prev[2]])
            }, 220)
            
            setTimeout(() => {
              setDealtCards(prev => [prev[0], prev[1], true])
            }, 440)
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

  const openModal = (index: number) => {
    setActiveProjectIndex(index)
    setTimeout(() => setModalVisible(true), 10)
  }

  const closeModal = () => {
    setModalVisible(false)
    setTimeout(() => setActiveProjectIndex(null), 250)
  }

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc)
    setTimeout(() => setLightboxVisible(true), 10)
  }

  const closeLightbox = () => {
    setLightboxVisible(false)
    setTimeout(() => setLightboxImage(null), 350)
  }

  // Click animation for buttons
  const handleButtonClick = (callback: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    button.style.transform = 'scale(0.88)'
    button.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
    setTimeout(() => {
      button.style.transform = 'scale(1)'
    }, 200)
    callback()
  }

  const goToProject = (direction: 'prev' | 'next') => {
    if (activeProjectIndex === null) return
    
    setContentTransitioning(true)
    
    setTimeout(() => {
      if (direction === 'next') {
        setActiveProjectIndex((activeProjectIndex + 1) % projects.length)
      } else {
        setActiveProjectIndex((activeProjectIndex - 1 + projects.length) % projects.length)
      }
      
      setTimeout(() => setContentTransitioning(false), 50)
    }, 200)
  }

  // Block body scroll when modal or lightbox is open
  useEffect(() => {
    if (activeProjectIndex !== null || lightboxImage !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeProjectIndex, lightboxImage])

  return (
    <>
      <section id="realizacje" className="py-20" ref={sectionRef}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Label */}
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            — Realizacje
          </p>

          {/* Headline */}
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Przyklady stron ktore tworzymy
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Demo stron ktore mozemy zbudowac dla Twojej firmy
          </p>

          {/* Project Cards - 3 in a row with align-items: stretch for equal height */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => openModal(index)}
                className="deal-card group w-full border border-foreground text-left transition-all duration-300 hover:border-2 hover:-translate-y-1 hover:shadow-md flex flex-col"
                style={{
                  // Initial state: off-screen left, rotated
                  opacity: dealtCards[index] ? 1 : 0,
                  transform: dealtCards[index] 
                    ? 'translateX(0) rotate(0deg)' 
                    : `translateX(-120vw) rotate(${initialRotations[index]}deg)`,
                  transformOrigin: 'bottom center',
                  transition: dealtCards[index] 
                    ? 'opacity 0.08s ease-out, transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)' 
                    : 'none',
                  // Animation class added when dealt
                  animation: dealtCards[index] ? `cardSettle${index + 1} 0.18s ease-out 0.42s` : 'none',
                }}
              >
                {/* Image area - 320px height with padding, flex-shrink-0 */}
                <div className="p-4 shrink-0">
                  <div className="relative h-[320px] w-full overflow-hidden bg-[#2A2A2A]">
                    <Image
                      src={project.images[0]}
                      alt={`${project.category} preview`}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
                  </div>
                </div>

                {/* Spacer to push bottom strip down */}
                <div className="flex-1" />

                {/* Bottom strip - 120px height with arrows inside */}
                <div className="flex h-[120px] items-center border-t border-foreground bg-background px-6 mt-auto shrink-0">
                  {/* Left arrow */}
                  <div className="w-8 h-8 flex items-center justify-center text-foreground/40">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Center content - project name left, package right */}
                  <div className="flex-1 flex items-center justify-between px-4">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      {project.packageName}
                    </span>
                  </div>

                  {/* Right arrow */}
                  <div className="w-8 h-8 flex items-center justify-center text-foreground/40">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeProjectIndex !== null && activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: modalVisible ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0)',
            transition: 'background-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          onClick={closeModal}
        >
          <div
            className="relative flex max-h-[85vh] w-[600px] flex-col overflow-hidden bg-background mx-4"
            style={{
              borderRadius: '20px',
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible 
                ? 'scale(1) translateY(0)' 
                : 'scale(0.92) translateY(20px)',
              transition: 'all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 text-2xl leading-none text-foreground transition-opacity hover:opacity-70"
            >
              {"\u00D7"}
            </button>

            {/* Navigation arrows inside modal */}
            <button
              onClick={handleButtonClick(() => goToProject('prev'))}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-background/90 text-foreground text-xl shadow-lg hover:bg-background transition-all duration-200"
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              aria-label="Poprzedni projekt"
            >
              {"\u2190"}
            </button>
            <button
              onClick={handleButtonClick(() => goToProject('next'))}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-background/90 text-foreground text-xl shadow-lg hover:bg-background transition-all duration-200"
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              aria-label="Nastepny projekt"
            >
              {"\u2192"}
            </button>

            {/* Modal header - sticky */}
            <div 
              className="shrink-0 border-b border-foreground px-6 py-4 transition-opacity duration-200"
              style={{ opacity: contentTransitioning ? 0 : 1 }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
                {activeProject.category}
              </p>
              <p className="mt-1 text-xs italic" style={{ color: "#999" }}>
                Projekt koncepcyjny
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Pakiet {activeProject.packageName.charAt(0) + activeProject.packageName.slice(1).toLowerCase()} — {activeProject.packagePrice}
              </p>
              
              {/* Description */}
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {activeProject.description}
              </p>
              
              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="border border-foreground px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal body - scrollable gallery */}
            <div 
              className="flex-1 overflow-y-auto p-4 transition-all duration-300"
              style={{
                opacity: contentTransitioning ? 0 : 1,
                transform: contentTransitioning ? 'translateX(20px)' : 'translateX(0)',
              }}
            >
              <div className="flex flex-col gap-4">
                {activeProject.images.map((src, index) => (
                  <div
                    key={index}
                    className="relative w-full overflow-hidden rounded-lg border border-border group cursor-pointer"
                    onClick={() => openLightbox(src)}
                  >
                    <Image
                      src={src}
                      alt={`${activeProject.category} screenshot ${index + 1}`}
                      width={1200}
                      height={800}
                      className="h-auto w-full object-cover"
                    />
                    {/* Magnifying glass icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                      <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project indicator dots */}
            <div className="shrink-0 flex justify-center gap-2 py-3 border-t border-foreground/10">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setContentTransitioning(true)
                    setTimeout(() => {
                      setActiveProjectIndex(index)
                      setTimeout(() => setContentTransitioning(false), 50)
                    }, 200)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeProjectIndex === index
                      ? 'bg-foreground'
                      : 'bg-foreground/30'
                  }`}
                  aria-label={`Projekt ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center cursor-pointer"
          style={{
            backgroundColor: lightboxVisible ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0)',
            transition: 'background-color 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            style={{
              opacity: lightboxVisible ? 1 : 0,
              transform: lightboxVisible ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            <Image
              src={lightboxImage}
              alt="Fullscreen preview"
              width={1920}
              height={1080}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* Close hint */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs">
            Kliknij aby zamknac
          </p>
        </div>
      )}

      {/* CSS Keyframes for card settle animation */}
      <style jsx>{`
        @keyframes cardSettle1 {
          0% { transform: rotate(0deg); }
          40% { transform: rotate(2deg); }
          70% { transform: rotate(-1deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes cardSettle2 {
          0% { transform: rotate(0deg); }
          40% { transform: rotate(2deg); }
          70% { transform: rotate(-1deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes cardSettle3 {
          0% { transform: rotate(0deg); }
          40% { transform: rotate(2deg); }
          70% { transform: rotate(-1deg); }
          100% { transform: rotate(0deg); }
        }
        
        @media (max-width: 768px) {
          .deal-card {
            --initial-translate: -60vw;
          }
        }
      `}</style>
    </>
  )
}
