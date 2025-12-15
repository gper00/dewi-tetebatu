"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Phone } from "lucide-react"

interface BookingFormProps {
  packageId: string
  packageTitle: string
  price: number
}

export default function BookingForm({ packageId, packageTitle, price }: BookingFormProps) {
  const router = useRouter()
  const { user } = useAuth()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    participants: "1",
    notes: "",
  })

  // Pre-fill email if user is logged in
  useState(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
      }))
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const totalPrice = price * Number.parseInt(formData.participants)

      const { data, error } = await supabase
        .from("bookings")
        .insert({
          item_type: 'package',
          item_id: packageId,
          item_title: packageTitle,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          booking_date: formData.date,
          number_of_people: Number.parseInt(formData.participants),
          total_price: totalPrice,
          user_id: user?.id || null, // Optional link to user account
          status: 'pending',
          notes: formData.notes
        })
        .select()

      if (error) throw error

      alert(`Terima kasih! Booking untuk "${packageTitle}" berhasil dikirim. Kami akan segera menghubungi Anda.`)
      // Optional: Redirect to a success page or user profile
      router.refresh()
      setFormData({ ...formData, notes: "", date: "" }) // Reset generic fields

    } catch (error: any) {
      console.error("Booking error:", error)
      alert("Maaf, terjadi kesalahan saat mengirim booking: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 sticky top-32">
      {/* Price Display */}
      <div className="mb-8">
        <p className="text-slate-600 text-sm mb-2">Harga per orang</p>
        <div className="text-4xl font-bold text-emerald-600 mb-2">
          {price === 0 ? "Gratis" : `Rp ${(price / 1000).toLocaleString()}K`}
        </div>
        {price > 0 && <p className="text-slate-500 text-sm">atau Rp {price.toLocaleString()}</p>}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Nama Lengkap</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
            placeholder="Nama Anda"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Telepon / WhatsApp</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
            placeholder="+62 8xx xxxx xxxx"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Tanggal Tour</label>
          <input
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Jumlah Peserta</label>
          <input
            type="number"
            min="1"
            max="50"
            required
            value={formData.participants}
            onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Catatan Khusus (Opsional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm resize-none"
            rows={3}
            placeholder="Ada pantangan makan? Butuh jemputan?"
          />
        </div>

        {/* Total Calculation */}
        {price > 0 && (
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-slate-600">Harga x {formData.participants} pax</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 text-lg">Total Estimasi</span>
              <span className="font-bold text-emerald-700 text-lg">
                Rp {(price * Number.parseInt(formData.participants || "0")).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Memproses...
            </>
          ) : (
            "Ajukan Booking Sekarang"
          )}
        </button>
      </form>

      {/* Contact Support */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-4">Butuh bantuan segera?</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-emerald-600" />
            <a href="https://wa.me/6285237410597" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">
              Chat WhatsApp Admin
            </a>
          </div>
          <div className="text-slate-500 text-xs">Kami siap membantu rencana perjalanan Anda</div>
        </div>
      </div>
    </div>
  )
}
