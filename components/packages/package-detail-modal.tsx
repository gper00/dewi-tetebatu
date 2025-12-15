'use client'

import { useEffect } from 'react'
import { AppImage } from '@/components/ui/app-image'

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

export default function PackageDetailModal({
  package: pkg,
  onClose,
}: {
  package: Package
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 font-serif">{pkg.name}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <AppImage
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-64 object-cover rounded-2xl"
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <p className="text-slate-600 text-sm mb-2">Rating</p>
              <p className="text-2xl font-bold text-emerald-700">⭐ {pkg.rating}</p>
              <p className="text-xs text-slate-600 mt-1">{pkg.reviews} review</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <p className="text-slate-600 text-sm mb-2">Durasi</p>
              <p className="text-lg font-bold text-slate-900">{pkg.duration}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-slate-600 text-sm mb-2">Level</p>
              <p className="text-lg font-bold text-slate-900">{pkg.difficulty}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-slate-600 text-sm mb-2">Max Peserta</p>
              <p className="text-lg font-bold text-slate-900">{pkg.groupSize}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Deskripsi</h3>
            <p className="text-slate-600 leading-relaxed">{pkg.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Highlight</h3>
            <ul className="space-y-2">
              {pkg.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-600">
                  <span className="text-emerald-600 text-xl">✓</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Includes */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Yang Termasuk</h3>
            <div className="grid grid-cols-2 gap-3">
              {pkg.includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600 bg-slate-50 p-3 rounded-lg">
                  <span className="text-yellow-500">✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Price & Booking */}
          <div className="bg-gradient-to-r from-emerald-50 to-yellow-50 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-slate-600 text-sm mb-1">Harga Per Peserta</p>
                <p className="text-3xl font-bold text-emerald-700">
                  Rp {pkg.price.toLocaleString()}
                </p>
              </div>
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg">
              Pesan Sekarang via WhatsApp
            </button>
            <p className="text-center text-slate-600 text-xs mt-3">
              Hubungi kami untuk info lebih lanjut dan negosiasi grup
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
