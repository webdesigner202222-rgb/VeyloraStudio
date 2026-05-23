"use client"

export function FinalCTA() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("kontakt")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-foreground py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <h2 className="font-serif text-4xl font-bold text-background md:text-5xl">
          Zamow bezplatne demo.
        </h2>
        <p className="mt-4 text-background/70">
          Bez zobowiazan. Bez zaliczki.
        </p>
        <button
          onClick={scrollToContact}
          className="group mt-10 inline-flex items-center gap-2 rounded-full border-[1.5px] border-background px-10 py-4 text-sm font-medium text-background transition-all duration-300 hover:bg-background hover:text-foreground"
        >
          <span>Napisz do nas</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">{"\u2192"}</span>
        </button>
      </div>
    </section>
  )
}
