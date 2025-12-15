"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Star, Loader2, Send } from "lucide-react"
import { toast } from "sonner"

export function TestimonialForm() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("testimonials").insert({
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        rating: rating,
      })

      if (error) throw error

      toast.success("Terima kasih! Ulasan Anda telah dikirim dan menunggu moderasi admin.")
      setFormData({ name: "", email: "", comment: "" })
      setRating(5)
    } catch (error: any) {
      toast.error("Gagal mengirim ulasan: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-serif font-bold text-slate-800 mb-2">Bagikan Pengalaman Anda</h3>
      <p className="text-slate-600 mb-6 text-sm">Ceritakan pengalaman liburan Anda di Dewi Tetebatu.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Berikan Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-colors"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={24}
                  className={`${star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Nama Anda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email (Opsional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="email@contoh.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ulasan Anda</label>
          <textarea
            required
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
            placeholder="Ceritakan apa yang paling berkesan..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          Kirim Ulasan
        </button>
      </form>
    </div>
  )
}
