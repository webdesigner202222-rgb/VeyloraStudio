"use client"

const benefits = [
  {
    title: "30% taniej",
    desc: "na pierwszy projekt",
  },
  {
    title: "Priorytet",
    desc: "w kolejce realizacji",
  },
  {
    title: "Twój wpływ",
    desc: "na kształt naszej oferty",
  },
]

export function Testimonials() {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("kontakt")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20" style={{ backgroundColor: '#F0EDE8' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          — Pierwsze miejsca
        </p>

        {/* Headline */}
        <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          Dołącz jako jeden z pierwszych.
        </h2>

        {/* Body text */}
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed">
          Veylora dopiero startuje. Pierwsze 5 firm otrzymuje 30% zniżki na realizację oraz priorytetowe miejsce w kolejce.
        </p>

        {/* Benefits - 3 columns, no cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col">
              <p className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                {benefit.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <button
            onClick={handleScrollToContact}
            className="group rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:bg-[#333] hover:scale-[1.02] inline-flex items-center gap-2"
          >
            <span>Zarezerwuj miejsce</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
