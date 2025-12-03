import Navbar from '@/components/navbar'
import PackagesHero from '@/components/packages/packages-hero'
import PackagesFilter from '@/components/packages/packages-filter'
import PackagesGrid from '@/components/packages/packages-grid'
import PackagesCTA from '@/components/packages/packages-cta'
import FooterSection from '@/components/footer-section'

export const metadata = {
  title: 'Paket Wisata | Desa Wisata',
  description: 'Jelajahi berbagai paket wisata menarik dengan pemandu lokal berpengalaman. Petualangan tak terlupakan menanti Anda.',
}

export default function PackagesPage() {
  return (
    <main className="w-full">
      <Navbar />
      <PackagesHero />
      <PackagesFilter />
      <PackagesGrid />
      <PackagesCTA />
      <FooterSection />
    </main>
  )
}
