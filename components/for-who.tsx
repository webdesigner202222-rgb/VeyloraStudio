"use client"

const pills = [
  "Restauracjami",
  "Barbershopami",
  "Gabinetami",
  "Detailingiem",
  "Kancelariami",
  "Siłowniami",
  "Salonami beauty",
  "Firmami budowlanymi",
  "Szkołami",
  "Sklepami",
  "I wieloma innymi",
]

const columns = [
  {
    title: "Nie masz strony?",
    desc: "Zaczynamy od zera. Projektujemy, budujemy i wdrażamy — Ty tylko akceptujesz efekty.",
  },
  {
    title: "Masz starą stronę?",
    desc: "Robimy redesign który sprawi że klienci przestaną wybierać konkurencję.",
  },
  {
    title: "Chcesz więcej klientów?",
    desc: "Optymalizujemy pod Google i tworzymy strony które aktywnie przyciągają zapytania.",
  },
]

export function ForWho() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          — Dla kogo
        </p>

        {/* Headline */}
        <h2 className="mt-4 font-serif text-2xl font-bold text-foreground md:text-3xl">
          Strony dla każdej lokalnej firmy.
        </h2>

        {/* Subheading */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Nie ograniczamy się do jednej branży. Jeśli prowadzisz lokalny biznes i chcesz profesjonalnie wyglądać online — jesteśmy dla Ciebie.
        </p>

        {/* 3-column grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {col.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {col.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-foreground/20" />

        {/* Pills section */}
        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Współpracujemy m.in. z:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <span
                key={pill}
                className="border border-foreground/30 px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
