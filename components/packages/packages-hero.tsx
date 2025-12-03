export default function PackagesHero() {
  return (
    <section className="relative w-full pt-32 pb-20 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
          Paket Wisata Pilihan
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Temukan pengalaman wisata yang sempurna untuk Anda. Dari petualangan ekstrem hingga relaksasi santai, semua tersedia dengan layanan profesional dan panduan lokal berpengalaman.
        </p>
      </div>
    </section>
  )
}
