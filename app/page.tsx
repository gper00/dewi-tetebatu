import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import PackagesSection from "@/components/packages-section"
import ActivitiesSection from "@/components/activities-section"
import GallerySection from "@/components/gallery-section"
import TestimonialsSection from "@/components/testimonials-section"
import FooterSection from "@/components/footer-section"
import { getFeaturedPackages } from "@/lib/services/packages"
import { getFeaturedTestimonials } from "@/lib/services/testimonials"
import { getGalleryImages } from "@/lib/services/gallery"

export default async function Home() {
  const [packages, testimonials, galleryImages] = await Promise.all([
    getFeaturedPackages(),
    getFeaturedTestimonials(),
    getGalleryImages(8) // Limit to 8 for the grid (adjusted for the layout)
  ])

  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PackagesSection packages={packages} />
      <ActivitiesSection />
      <GallerySection images={galleryImages} />
      <TestimonialsSection testimonials={testimonials} />
      <FooterSection />
    </main>
  )
}
