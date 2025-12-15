"use client"

import { Clock, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getActivityImage } from "@/lib/utils/image"

export default function ActivitiesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch("/api/activities?limit=4")
        if (res.ok) {
          const data = await res.json()
          setActivities(Array.isArray(data) ? data : [])
        } else {
          setActivities([])
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error)
        setActivities([])
      }
    }
    fetchActivities()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, activities.length - 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, activities.length - 1)) % Math.max(1, activities.length - 1))
  }

  return (
    <section id="activities" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Kegiatan Menarik</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Berbagai kegiatan seru yang dapat Anda nikmati selama berkunjung ke Tetebatu
          </p>
        </div>

        {activities.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 50}%)` }}
              >
                {activities.map((activity) => (
                  <div key={activity.id} className="w-1/2 flex-shrink-0 px-2">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 h-full">
                      <div className="relative h-64">
                        <img
                          src={getActivityImage(activity.images, activity.category)}
                          alt={activity.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {activity.category || 'Adventure'}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{activity.name}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {activity.short_description || activity.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-emerald-600" />
                            <span>{activity.duration}</span>
                          </div>
                          {activity.price && (
                            <div className="flex items-center gap-2">
                              <DollarSign size={16} className="text-emerald-600" />
                              <span>Rp {activity.price.toLocaleString('id-ID')}</span>
                            </div>
                          )}
                        </div>

                        <Link href={`/activities/${activity.id}`}>
                          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                            Lihat Detail
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {activities.length > 2 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">Memuat kegiatan...</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/activities"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Lihat Semua Kegiatan
          </Link>
        </div>
      </div>
    </section>
  )
}
