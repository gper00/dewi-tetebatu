'use client'

import { useState } from 'react'

const categories = [
  { id: 'all', label: 'Semua Paket', icon: '🎯' },
  { id: 'trekking', label: 'Trekking', icon: '🥾' },
  { id: 'cultural', label: 'Budaya', icon: '🏛️' },
  { id: 'culinary', label: 'Kuliner', icon: '🍜' },
  { id: 'adventure', label: 'Petualangan', icon: '⛰️' },
  { id: 'relaxation', label: 'Relaksasi', icon: '🧘' },
]

export default function PackagesFilter() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
