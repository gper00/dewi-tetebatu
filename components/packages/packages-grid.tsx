"use client"

import { useState, useEffect } from "react"
import PackageCard from "./package-card"

export default function PackagesGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPackages() {
      try {
        const url = activeCategory === "all" ? "/api/packages" : `/api/packages?category=${activeCategory}`

        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setPackages(data)
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [activeCategory])

  if (loading) {
    return (
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">Memuat paket wisata...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">Tidak ada paket dalam kategori ini.</p>
          </div>
        )}
      </div>
    </section>
  )
}
