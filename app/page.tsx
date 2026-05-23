import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { ForWho } from "@/components/for-who"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Divider between Hero and Services */}
      <div className="w-full h-px bg-[#E0E0E0]" />
      <Marquee />
      <ForWho />
      <Process />
      <Testimonials />
      <Services />
      <Portfolio />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
