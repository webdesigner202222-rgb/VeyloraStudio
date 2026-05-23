import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-foreground bg-background py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
            Veylora
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-8">
            <Link
              href="#realizacje"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              Realizacje
            </Link>
            <Link
              href="#uslugi"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              Uslugi
            </Link>
            <Link
              href="#proces"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              Proces
            </Link>
            <Link
              href="#kontakt"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              Kontakt
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-opacity hover:opacity-60"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-opacity hover:opacity-60"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 114 0v4M11 10v7" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-opacity hover:opacity-60"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M4 4l6.5 8L4 20h2l5.5-7 4.5 7h6l-7-9 6-8h-2l-5 6.5L9 4H4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-foreground/20 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Veylora {"\u00A9"} 2026 — Studio webowe, Bielsko-Biala
          </p>
        </div>
      </div>
    </footer>
  )
}
