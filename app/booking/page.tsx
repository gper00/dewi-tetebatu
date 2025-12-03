"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { Calendar, Users, Phone, Mail, MapPin, Send } from "lucide-react"

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    participants: "1",
    packageType: "trekking",
    notes: "",
  })

  const packages = [
    {
      id: "trekking",
      name: "Trekking Gunung Rinjani",
      price: 1800000,
      duration: "3-4 hari",
    },
    {
      id: "cooking",
      name: "Traditional Cooking Class",
      price: 350000,
      duration: "3 jam",
    },
    {
      id: "cycling",
      name: "Cycling Tour Desa",
      price: 250000,
      duration: "2-3 jam",
    },
    {
      id: "forest",
      name: "Monkey Forest Bird Watching",
      price: 1200000,
      duration: "3 jam",
    },
    {
      id: "waterfall",
      name: "Air Terjun Sarang Walet",
      price: 150000,
      duration: "2 jam",
    },
    {
      id: "gogreen",
      name: "Adopsi Pohon Go-Green",
      price: 150000,
      duration: "2 jam",
    },
  ]

  const selectedPackage = packages.find((p) => p.id === formData.packageType)
  const totalPrice = (selectedPackage?.price || 0) * Number.parseInt(formData.participants)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      alert(`Booking request telah dikirim ke ${formData.email}. Tim kami akan menghubungi Anda segera!`)
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">Booking Paket Wisata</h1>
          <p className="text-emerald-100 text-lg">Pesan pengalaman wisata impian Anda di Desa Tetebatu</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-600"}`}
            >
              1
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? "bg-emerald-600" : "bg-slate-300"}`} />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-600"}`}
            >
              2
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">
              {step === 1 ? "Pilih Paket & Detail" : "Informasi Kontak"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  {/* Package Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-4">Pilih Paket Wisata</label>
                    <div className="grid gap-3">
                      {packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, packageType: pkg.id })}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            formData.packageType === pkg.id
                              ? "border-emerald-600 bg-emerald-50"
                              : "border-slate-200 hover:border-emerald-300"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-slate-900">{pkg.name}</h3>
                              <p className="text-sm text-slate-600 mt-1">{pkg.duration}</p>
                            </div>
                            <span className="font-bold text-emerald-600">Rp {(pkg.price / 1000000).toFixed(1)}jt</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Tanggal Diinginkan</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3 text-emerald-600" size={18} />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Participants */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Jumlah Peserta</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-3 text-emerald-600" size={18} />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        required
                        value={formData.participants}
                        onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Catatan Khusus (Opsional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                      rows={4}
                      placeholder="Pertanyaan khusus, kebutuhan diet, atau informasi lainnya..."
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      placeholder="Nama Anda"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3 text-emerald-600" size={18} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Nomor Telepon</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3 text-emerald-600" size={18} />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        placeholder="+62 8xx xxxx xxxx"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Ringkasan Booking</h3>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Paket:</span>
                        <span className="font-semibold text-slate-900">{selectedPackage?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tanggal:</span>
                        <span className="font-semibold text-slate-900">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Peserta:</span>
                        <span className="font-semibold text-slate-900">{formData.participants} orang</span>
                      </div>
                      <div className="border-t border-emerald-200 pt-2 mt-2 flex justify-between">
                        <span className="text-slate-600 font-semibold">Total:</span>
                        <span className="font-bold text-emerald-600 text-lg">
                          Rp {(totalPrice / 1000000).toFixed(1)}jt
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Kembali
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {step === 1 ? "Lanjut" : "Kirim Booking"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-8 bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Butuh Bantuan?</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-600 flex-shrink-0" />
                <a href="tel:+6285237410597" className="hover:text-emerald-600">
                  +62 852-3741-0597 (Hermiwandi)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-600 flex-shrink-0" />
                <a href="mailto:wandihermi675@gmail.com" className="hover:text-emerald-600">
                  wandihermi675@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-emerald-600 flex-shrink-0" />
                <span>Tetebatu, Lombok Timur, NTB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
