"use client"

import Link from "next/link"
import { useState } from "react"

const navLinks = [
  { href: "#realizacje", label: "Realizacje", showDot: true },
  { href: "#uslugi", label: "Usługi", showDot: false },
  { href: "#proces", label: "Proces", showDot: false },
  { href: "#kontakt", label: "Kontakt", showDot: false },
]

interface NavbarProps {
  visible: boolean
  showDot: boolean
  lineProgress: number
  logoVisible: boolean
  linksVisible: boolean[]
}

export function Navbar({ visible, showDot, lineProgress, logoVisible, linksVisible }: NavbarProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6] transition-opacity duration-[400ms]"
      style={{ 
        opacity: visible ? 1 : 0,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-serif text-xl font-bold text-foreground transition-opacity duration-200"
          style={{ opacity: logoVisible ? 1 : 0 }}
        >
          Veylora
        </Link>

        {/* Center Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <div key={link.href} className="relative">
              <Link
                href={link.href}
                className="text-sm text-foreground transition-all duration-200 hover:opacity-60"
                style={{ opacity: linksVisible?.[index] ? 1 : 0 }}
                onMouseEnter={() => link.showDot && setTooltipVisible(true)}
                onMouseLeave={() => link.showDot && setTooltipVisible(false)}
              >
                {link.label}
              </Link>
              {/* Pulsing dot for Realizacje */}
              {link.showDot && showDot && linksVisible?.[index] && (
                <span 
                  className="absolute -top-1 -right-3 h-1.5 w-1.5 rounded-full bg-foreground animate-pulse-dot"
                />
              )}
              {/* Tooltip */}
              {link.showDot && tooltipVisible && linksVisible?.[index] && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-foreground text-background text-xs px-3 py-1.5 rounded transition-opacity duration-200"
                  style={{ opacity: tooltipVisible ? 1 : 0 }}
                >
                  {"Zobacz nasze projekty \u2193"}
                </div>
              )}
            </div>
          ))}
        </div>

      </nav>
      
      {/* Bottom border line - draws from center outward */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
        style={{
          transform: `scaleX(${lineProgress})`,
          transformOrigin: 'center',
          transition: 'transform 500ms ease-out',
        }}
      />
    </header>
  )
}
