"use client"

const items = [
  "Barbershopy",
  "Restauracje",
  "Detailing",
  "Kancelarie",
  "Silownie",
  "Gabinety",
  "Nieruchomosci",
]

export function Marquee() {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("realizacje")
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="border-y border-foreground bg-background py-4 overflow-hidden">
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0">
          {[...items, ...items].map((item, index) => (
            <button
              key={index}
              onClick={scrollToPortfolio}
              className="mx-8 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-60"
            >
              {item} {"\u00B7"}
            </button>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0" aria-hidden="true">
          {[...items, ...items].map((item, index) => (
            <button
              key={index}
              onClick={scrollToPortfolio}
              className="mx-8 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-60"
              tabIndex={-1}
            >
              {item} {"\u00B7"}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
