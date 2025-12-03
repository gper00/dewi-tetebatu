"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { ArrowLeft, Clock, Users, MapPin, Star, CheckCircle, Phone } from "lucide-react"

const packagesData = [
  {
    id: 1,
    title: "Trekking Gunung Rinjani",
    image: "https://jadesta.kemenparekraf.go.id/imgpost/110517_medium.jpg",
    rating: 4.9,
    reviews: 156,
    duration: "3-4 hari",
    groupSize: "4-12 orang",
    price: 1800000,
    description: "Pendakian menantang ke puncak Gunung Rinjani dengan pemandu berpengalaman dan akomodasi lengkap.",
    highlights: [
      "Pemandu lokal berpengalaman dan berlisensi",
      "Akomodasi di basecamp dengan fasilitas lengkap",
      "Sarapan, makan siang, dan makan malam",
      "Perlengkapan camping dan sleeping bag disediakan",
      "Asuransi perjalanan termasuk",
    ],
    itinerary: [
      "Hari 1: Jemput dari hotel → Registrasi → Persiapan → Mulai pendakian (ketinggian 700m-1500m)",
      "Hari 2: Lanjut pendakian (1500m-2500m) → Istirahat dan aklimatisasi",
      "Hari 3: Early morning start → Puncak Rinjani (3726m) → Turun ke basecamp (2500m)",
      "Hari 4: Turun ke starting point → Kembali ke hotel",
    ],
    included: [
      "Pemandu wisata profesional",
      "Akomodasi di basecamp",
      "Semua makanan (sarapan, makan siang, makan malam)",
      "Perlengkapan camping",
      "Asuransi perjalanan",
      "Transportasi dari hotel",
    ],
    notIncluded: [
      "Tiket masuk Taman Nasional Rinjani (biaya sendiri)",
      "Minuman pribadi dan snack tambahan",
      "Tips untuk pemandu",
    ],
    requirements: [
      "Kondisi fisik yang baik",
      "Tidak ada masalah jantung atau paru-paru",
      "Aklimatisasi dengan ketinggian",
      "Perlengkapan pribadi: pakaian hangat, sepatu trekking, senter",
    ],
  },
  {
    id: 2,
    title: "Traditional Cooking Class",
    image: "https://jadesta.kemenparekraf.go.id/imgpost/110524_medium.jpg",
    rating: 4.8,
    reviews: 92,
    duration: "3 jam",
    groupSize: "4-6 orang",
    price: 350000,
    description: "Belajar memasak hidangan tradisional Lombok langsung dari ibu-ibu lokal di dapur mereka.",
    highlights: [
      "Belajar dari ibu-ibu lokal asli Tetebatu",
      "Kunjungan ke pasar tradisional",
      "Memasak 3-4 hidangan tradisional",
      "Makan bersama hasil masakan Anda",
      "Resep tertulis untuk dibawa pulang",
    ],
    itinerary: [
      "Pagi: Jemput dari hotel → Kunjungan pasar tradisional",
      "Masuk dapur: Pengenalan bahan-bahan lokal",
      "Cooking session: Memasak 3-4 menu tradisional",
      "Makan bersama: Menikmati hidangan bersama keluarga lokal",
      "Pulang dengan resep tertulis",
    ],
    included: [
      "Jemput/antar dari hotel",
      "Semua bahan makanan",
      "Resep tertulis dalam bahasa Indonesia/Inggris",
      "Makan bersama dengan keluarga lokal",
      "Minuman tradisional",
    ],
    notIncluded: ["Minuman alkohol", "Kemasan untuk membawa pulang makanan"],
    requirements: ["Minat untuk belajar memasak", "Nyaman bekerja di dapur tradisional", "Buka terhadap budaya lokal"],
  },
]

export default function PackageBookingPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number.parseInt(params.id as string)
  const pkg = packagesData.find((p) => p.id === id)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    participants: "1",
    notes: "",
  })

  if (!pkg) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24">
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 text-center px-4">
          <h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">Paket Tidak Ditemukan</h1>
          <Link href="/packages" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            Kembali ke Paket Wisata
          </Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Booking request untuk ${pkg.title} telah dikirim. Tim kami akan menghubungi Anda segera!`)
    router.push("/packages")
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Header */}
      <section className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 font-semibold"
          >
            <ArrowLeft size={18} />
            Kembali ke Paket
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Package Image */}
            <img
              src={pkg.image || "/placeholder.svg"}
              alt={pkg.title}
              className="w-full h-80 object-cover rounded-lg mb-8"
            />

            {/* Title & Rating */}
            <div className="mb-8">
              <h1 className="font-serif text-4xl font-bold text-slate-900 mb-4">{pkg.title}</h1>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(pkg.rating) ? "fill-yellow-500 text-yellow-500" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{pkg.rating}</span>
                  <span>({pkg.reviews} ulasan)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 text-lg mb-8 leading-relaxed">{pkg.description}</p>

            {/* Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 bg-white p-6 rounded-lg">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Clock size={20} />
                  <span className="font-semibold">Durasi</span>
                </div>
                <p className="text-slate-700">{pkg.duration}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Users size={20} />
                  <span className="font-semibold">Ukuran Grup</span>
                </div>
                <p className="text-slate-700">{pkg.groupSize}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <MapPin size={20} />
                  <span className="font-semibold">Lokasi</span>
                </div>
                <p className="text-slate-700">Tetebatu, Lombok</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Highlight Paket</h2>
              <div className="space-y-3">
                {pkg.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Jadwal Perjalanan</h2>
              <div className="space-y-4">
                {pkg.itinerary.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg border-l-4 border-emerald-600">
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Included & Not Included */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Sudah Termasuk</h3>
                <ul className="space-y-2">
                  {pkg.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Tidak Termasuk</h3>
                <ul className="space-y-2">
                  {pkg.notIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-blue-50 p-6 rounded-lg mb-12">
              <h3 className="font-bold text-slate-900 mb-4">Persyaratan & Rekomendasi</h3>
              <ul className="space-y-2">
                {pkg.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <span>✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-32">
              {/* Price */}
              <div className="mb-8">
                <p className="text-slate-600 text-sm mb-2">Harga per orang</p>
                <div className="text-4xl font-bold text-emerald-600 mb-2">Rp {(pkg.price / 1000000).toFixed(1)}jt</div>
                <p className="text-slate-500 text-sm">atau Rp {(pkg.price / 1000).toFixed(0)}K</p>
              </div>

              {/* Booking Form */}
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
                  <label className="block text-sm font-semibold text-slate-800 mb-2">Telepon</label>
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
                  <label className="block text-sm font-semibold text-slate-800 mb-2">Tanggal Diinginkan</label>
                  <input
                    type="date"
                    required
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
                    max="20"
                    required
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">Catatan Khusus</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm resize-none"
                    rows={3}
                    placeholder="Pertanyaan atau kebutuhan khusus..."
                  />
                </div>

                {/* Total */}
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-slate-600">Subtotal ({formData.participants} peserta):</span>
                    <span className="font-bold text-slate-900">
                      Rp {((pkg.price * Number.parseInt(formData.participants)) / 1000000).toFixed(1)}jt
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Ajukan Booking
                </button>
              </form>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-4">Pertanyaan sebelum booking?</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-emerald-600" />
                    <a href="tel:+6285237410597" className="text-emerald-600 hover:underline">
                      +62 852-3741-0597
                    </a>
                  </div>
                  <div className="text-slate-600">Hubungi Hermiwandi untuk info lebih lanjut</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
