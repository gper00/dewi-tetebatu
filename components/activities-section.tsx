"use client"

import { Clock, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function ActivitiesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    async function fetchActivities() {
      try {
        console.log("[v0] Fetching activities...")
        const res = await fetch("/api/activities?limit=2")
        if (res.ok) {
          const data = await res.json()
          console.log("[v0] Activities fetched:", data)
          setActivities(Array.isArray(data) ? data : [])
        } else {
          console.error("[v0] Failed to fetch activities, status:", res.status)
          setActivities([])
        }
      } catch (error) {
        console.error("[v0] Failed to fetch activities:", error)
        setActivities([]) // Set empty array on error
      }
    }
    fetchActivities()
  }, [])

  const statusColor = {
    akan: "bg-blue-100 text-blue-700",
    sedang: "bg-amber-100 text-amber-700",
    selesai: "bg-green-100 text-green-700",
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activities.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activities.length) % activities.length)
  }

  if (activities.length === 0) {
    return null
  }

  return (
    <section id="activities" className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Kegiatan Unggulan</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Pilihan aktivitas premium yang akan membuat pengalaman wisata Anda tak terlupakan
          </p>
        </div>

        <div className="relative mb-8">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {activities.map((activity) => (
                <div key={activity.id} className="min-w-full">
                  <Link href={`/activities/${activity.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl">
                        <img
                          src={activity.image_url || "/placeholder.svg"}
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                        {/* Content overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                          <h3 className="text-white font-serif text-3xl font-bold mb-2">{activity.title}</h3>
                          <p className="text-emerald-100 mb-4">{activity.description}</p>

                          {/* Details */}
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-white">
                              <Clock size={20} />
                              <span>{activity.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                              <DollarSign size={20} />
                              <span>
                                {activity.price === 0 ? "Gratis" : `Rp ${(activity.price / 1000).toFixed(0)}K`}
                              </span>
                            </div>
                            <span
                              className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor[activity.status as keyof typeof statusColor] || statusColor.sedang}`}
                            >
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {activities.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 rounded-full p-3 transition-all z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 rounded-full p-3 transition-all z-10"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-3 mt-8">
                {activities.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-3 rounded-full transition-all ${
                      idx === currentSlide ? "bg-emerald-600 w-8" : "bg-slate-300 w-3"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* CTA Link to all activities */}
        <div className="text-center mt-12">
          <Link
            href="/about#all-activities"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Lihat Semua Kegiatan
          </Link>
        </div>
      </div>
    </section>
  )
}
