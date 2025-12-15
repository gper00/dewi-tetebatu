"use client"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    topic: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", topic: "", message: "" })
    } catch (error: any) {
      console.error("Form submission error:", error)
      setStatus("error")
      setErrorMessage(error.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <div>
      <h2 className="font-serif font-bold text-3xl mb-8 text-slate-800">Kirim Pesan kepada Kami</h2>

      {status === "success" ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h3 className="font-bold text-xl text-slate-800 mb-2">Pesan Terkirim!</h3>
          <p className="text-slate-600 mb-6">
            Terima kasih telah menghubungi kami. Tim kami akan segera membalas pesan Anda.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-emerald-600 font-semibold hover:underline"
          >
            Kirim pesan lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              {errorMessage}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                required
                className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Anda"
                required
                className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
              />
            </div>
          </div>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subjek"
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
          />

          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm text-slate-600"
          >
            <option value="">-- Pilih Topik --</option>
            <option value="booking">Pertanyaan Booking</option>
            <option value="paket">Informasi Paket</option>
            <option value="grup">Reservasi Grup</option>
            <option value="kerjasama">Kerjasama</option>
            <option value="other">Lainnya</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Pesan Anda"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm resize-none"
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {status === "submitting" ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </form>
      )}
    </div>
  )
}
