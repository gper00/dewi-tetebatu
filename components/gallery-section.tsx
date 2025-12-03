export default function GallerySection() {
  const images = [
    { id: 1, query: 'mountain landscape sunset golden hour', size: 'md:col-span-2 md:row-span-2' },
    { id: 2, query: 'happy tourists group smiling adventure', size: '' },
    { id: 3, query: 'traditional food preparation cooking', size: '' },
    { id: 4, query: 'rice field plantation rural nature', size: 'md:col-span-2' },
    { id: 5, query: 'village street architecture traditional', size: '' },
    { id: 6, query: 'sunset over mountain peaks clouds', size: 'md:row-span-2' },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
            Galeri Pengalaman
          </h2>
          <p className="text-slate-600 text-lg">
            Menciptakan Momen Tak Terlupakan Bersama Kami
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-max">
          {images.map((img) => (
            <div
              key={img.id}
              className={`${img.size} rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-pointer`}
            >
              <img
                src={`/.jpg?height=300&width=300&query=${img.query}`}
                alt={`Gallery ${img.id}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
