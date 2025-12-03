import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/happy-woman-portrait.png',
      role: 'Wisatawan dari Australia',
      rating: 5,
      text: 'Pengalaman paling berkesan! Pemandu kami sangat ramah dan penjelasannya mendalam tentang budaya lokal.',
    },
    {
      id: 2,
      name: 'Budi Santoso',
      avatar: '/happy-man-portrait.png',
      role: 'Wisatawan dari Jakarta',
      rating: 5,
      text: 'Paket cooking class-nya luar biasa! Ibu-ibu di desa sangat baik dan mengajarkan resep asli dengan sabar.',
    },
    {
      id: 3,
      name: 'Maria Garcia',
      avatar: '/smiling-woman-portrait.png',
      role: 'Wisatawan dari Spanyol',
      rating: 5,
      text: 'Home stay experience yang authentic. Kami diterima seperti bagian dari keluarga. Sangat merekomendasikan!',
    },
  ]

  return (
    <section className="py-20 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
            Testimoni Pengunjung
          </h2>
          <p className="text-slate-600 text-lg">
            Dengarkan cerita dari wisatawan yang telah mengalami keajaiban desa kami
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-100"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 text-base leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
