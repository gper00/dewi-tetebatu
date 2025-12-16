"use client"

import { useState } from 'react'
import { Star, PlusCircle, X } from 'lucide-react'
import { Testimonial } from "@/lib/types/database"
import { TestimonialForm } from '@/components/testimonials/testimonial-form'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <section id="testimonials" className="py-20 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
            Testimoni Pengunjung
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Dengarkan cerita dari wisatawan yang telah mengalami keajaiban desa kami.
            Apakah Anda pernah berkunjung? Bagikan pengalaman Anda!
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-all hover:shadow-md"
          >
            {showForm ? (
              <>
                <X size={18} />
                Tutup Formulir
              </>
            ) : (
              <>
                <PlusCircle size={18} />
                Tulis Ulasan Saya
              </>
            )}
          </button>
        </div>

        {/* Submission Form (Collapsible) */}
        {showForm && (
          <div className="max-w-xl mx-auto mb-16 animate-in fade-in slide-in-from-top-4 duration-300">
            <TestimonialForm />
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-100 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 text-base leading-relaxed mb-6 italic flex-grow">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">
                  {testimonial.name?.charAt(0) || "G"}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(testimonial.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-400">Belum ada ulasan yang ditampilkan.</p>
          </div>
        )}
      </div>
    </section>
  )
}
