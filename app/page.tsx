import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import PackagesSection from "@/components/packages-section"
import ActivitiesSection from "@/components/activities-section"
import GallerySection from "@/components/gallery-section"
import TestimonialsSection from "@/components/testimonials-section"
import FooterSection from "@/components/footer-section"

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PackagesSection />
      <ActivitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  )
}
