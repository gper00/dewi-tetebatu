import { Star, Clock, Users } from "lucide-react"
import Link from "next/link"
import { Package } from "@/lib/types/database"
import { getPackageImage } from "@/lib/utils/image"

interface PackagesSectionProps {
  packages: Package[]
}

export default function PackagesSection({ packages }: PackagesSectionProps) {
  return (
    <section id="packages" className="py-20 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Paket Wisata Unggulan</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan minat Anda dan buat kenangan indah bersama kami
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getPackageImage(pkg.gallery_images)}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {pkg.is_featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
                    Popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.title}</h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < 4 ? "fill-yellow-500 text-yellow-500" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">4.8</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{pkg.short_description}</p>

                {/* Details */}
                <div className="space-y-2 mb-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-emerald-600" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-emerald-600 font-bold text-lg">
                      Rp {pkg.price?.toLocaleString('id-ID')}
                    </span>
                    <p className="text-slate-400 text-xs">/per orang</p>
                  </div>
                  <Link href={`/packages/${pkg.id}`}>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Booking
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Lihat Semua Paket
          </Link>
        </div>
      </div>
    </section>
  )
}
