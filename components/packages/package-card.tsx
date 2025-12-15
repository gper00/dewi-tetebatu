"use client"

import { useState } from "react"
import Link from "next/link"
import { AppImage } from "@/components/ui/app-image"
import PackageDetailModal from "./package-detail-modal"

interface Package {
  id: number
  name: string
  category: string
  image: string
  rating: number
  reviews: number
  duration: string
  difficulty: string
  groupSize: string
  price: number
  description: string
  highlights: string[]
  includes: string[]
}

export default function PackageCard({ package: pkg }: { package: Package }) {
  const [showDetails, setShowDetails] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-700"
      case "Sedang":
        return "bg-yellow-100 text-yellow-700"
      case "Sulit":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <AppImage
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Badge Container */}
          <div className="absolute top-4 left-4 right-4 flex gap-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(pkg.difficulty)}`}>
              {pkg.difficulty}
            </span>
            <span className="ml-auto bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700">
              ⭐ {pkg.rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 font-serif">{pkg.name}</h3>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-3 mb-4 text-xs py-4 border-y border-slate-100">
            <div className="text-center">
              <p className="text-slate-500 mb-1">⏱️ Durasi</p>
              <p className="font-semibold text-slate-800">{pkg.duration}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 mb-1">👥 Grup</p>
              <p className="font-semibold text-slate-800 text-xs line-clamp-2">{pkg.groupSize}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 mb-1">⭐ Review</p>
              <p className="font-semibold text-slate-800">{pkg.reviews}</p>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div>
              <p className="text-slate-500 text-xs">Mulai dari</p>
              <p className="text-2xl font-bold text-emerald-600">Rp {pkg.price.toLocaleString()}</p>
            </div>
            <Link
              href={`/packages/${pkg.id}`}
              className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg"
            >
              Booking
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {showDetails && <PackageDetailModal package={pkg} onClose={() => setShowDetails(false)} />}
    </>
  )
}
