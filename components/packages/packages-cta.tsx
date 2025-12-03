export default function PackagesCTA() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
          Paket Tidak Sesuai?
        </h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Kami dapat membuat paket wisata custom sesuai kebutuhan dan budget Anda. Hubungi kami untuk konsultasi gratis.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-emerald-600 hover:bg-slate-50 font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg">
            Hubungi Kami
          </button>
          <button className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-xl transition-all duration-300">
            Lihat FAQ
          </button>
        </div>
      </div>
    </section>
  )
}
