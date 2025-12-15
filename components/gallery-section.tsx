import { AppImage } from '@/components/ui/app-image'
import { GalleryImage } from '@/lib/services/gallery'

interface GallerySectionProps {
  images?: GalleryImage[]
}

export default function GallerySection({ images = [] }: GallerySectionProps) {
  // Fallback if no images provided or empty
  if (!images || images.length === 0) {
    return null
  }

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

        {/* Grid - using simple grid for now as masonry requires strict layout or lib */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              className={`rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-pointer relative aspect-square ${
                // Basic pattern: made first and 6th item large if sufficient items
                (index === 0 || index === 5) ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            >
              <AppImage
                src={img.image_url}
                alt={img.title || "Gallery Image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-medium truncate w-full">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
