import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Veylora — Studio Webowe | Strony internetowe dla lokalnych firm',
  description: 'Veylora to studio webowe tworzące premium strony internetowe dla restauracji, barbershopów, gabinetów i lokalnych firm. Demo w 48h. Warszawa i cała Polska.',
  keywords: 'strony internetowe, studio webowe, web design, Warszawa, strona dla restauracji, strona dla barbershopu',
  generator: 'v0.app',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://veylora.eu',
  },
  openGraph: {
    title: 'Veylora — Studio Webowe',
    description: 'Premium strony internetowe dla lokalnych firm. Demo w 48h bez zobowiązań.',
    url: 'https://veylora.eu',
    type: 'website',
    siteName: 'Veylora',
    locale: 'pl_PL',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="scroll-smooth bg-[#FAF9F6]">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
