export default function HeroSection() {
  return (
    <section className="relative w-full h-screen md:h-[600px] bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 opacity-40 z-0"
        style={{
          backgroundImage: 'url(https://jadesta.kemenparekraf.go.id/imgpost/116570.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Desa Wisata Tetebatu
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
          Jelajahi keindahan alam di ketinggian 700 meter, bertemu budaya autentik, dan rasakan pengalaman hidup pedesaan yang sesungguhnya bersama pemandu lokal berpengalaman.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-emerald-900 font-bold px-8 py-3 rounded-lg transition-colors">
            Lihat Paket Wisata
          </button>
          <button className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-3 rounded-lg transition-colors">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
