"use client"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { Clock, DollarSign, Users, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const activities: Record<
    string,
    {
      id: number
      title: string
      image: string
      description: string
      longDescription: string
      duration: string
      status: "Akan" | "Sedang" | "Selesai"
      price: number
      icon: string
      groupSize: string
      bestTime: string
      difficulty: string
      includes: string[]
      notIncludes: string[]
      highlights: string[]
    }
  > = {
    "1": {
      id: 1,
      title: "Trekking Gunung Rinjani",
      image: "https://jadesta.kemenparekraf.go.id/imgpost/110517_medium.jpg",
      description: "Pendakian menantang dengan pemandangan spektakuler dari gunung tertinggi di Nusa Tenggara",
      longDescription:
        "Trekking Gunung Rinjani adalah petualangan yang tidak boleh dilewatkan. Dengan ketinggian 3.726 meter, Rinjani adalah gunung tertinggi kedua di Indonesia. Perjalanan ini menantang namun memuaskan, dengan pemandangan yang spektakuler dari puncak termasuk Danau Segara Anak dan panorama Lombok yang menakjubkan.",
      duration: "3-4 hari",
      status: "Akan",
      price: 1800000,
      icon: "⛰️",
      groupSize: "4-15 orang",
      bestTime: "April-Oktober",
      difficulty: "Sulit",
      includes: ["Pemandu profesional", "Akomodasi di gunung", "Makanan selama trekking", "Peralatan safety"],
      notIncludes: ["Biaya transportasi ke basecamp", "Asuransi perjalanan", "Peralatan pribadi"],
      highlights: [
        "Pemandangan matahari terbit dari puncak",
        "Danau Segara Anak yang memukau",
        "Bintang malam yang spektakuler",
        "Pengalaman mendaki tertinggi di Lombok",
      ],
    },
    "2": {
      id: 2,
      title: "Monkey Forest Bird Watching",
      image: "https://jadesta.kemenparekraf.go.id/imgpost/110509_medium.jpg",
      description: "Jelajahi hutan monyet dan amati burung-burung langka endemik Lombok",
      longDescription:
        "Pengalaman unik mengamati monyet monyet ekor panjang di habitat alami mereka sambil mencari burung-burung endemik Lombok yang jarang ditemukan. Dipandu oleh ahli ornitologi lokal yang berpengalaman.",
      duration: "3 jam",
      status: "Sedang",
      price: 1200000,
      icon: "🐵",
      groupSize: "2-8 orang",
      bestTime: "September-Mei",
      difficulty: "Mudah",
      includes: ["Pemandu berpengalaman", "Binoculars", "Dokumentasi foto", "Minuman"],
      notIncludes: ["Makan siang", "Asuransi perjalanan"],
      highlights: [
        "Observasi monyet di habitat alami",
        "Identifikasi 30+ spesies burung",
        "Fotografi satwa liar profesional",
        "Edukasi konservasi alam",
      ],
    },
    "3": {
      id: 3,
      title: "Cycling Tour Desa",
      image: "https://jadesta.kemenparekraf.go.id/imgpost/110461_medium.jpg",
      description: "Petualangan bersepeda santai menjelajahi keindahan alam dan kehidupan desa",
      longDescription:
        "Jelajahi keindahan pedesaan Tetebatu dengan bersepeda melalui sawah bertingkat, hutan lokal, dan desa tradisional. Pengalaman yang menyenangkan untuk semua usia dan tingkat kebugaran.",
      duration: "2-3 jam",
      status: "Sedang",
      price: 250000,
      icon: "🚴",
      groupSize: "3-12 orang",
      bestTime: "Sepanjang tahun",
      difficulty: "Mudah",
      includes: ["Sepeda berkualitas", "Pemandu lokal", "Snack lokal", "Fotografi"],
      notIncludes: ["Makan siang", "Asuransi perjalanan"],
      highlights: [
        "Sawah bertingkat yang indah",
        "Pertemuan dengan petani lokal",
        "Snack tradisional di warung desa",
        "Fotografi matahari terbenam",
      ],
    },
    "4": {
      id: 4,
      title: "Traditional Cooking Class",
      image: "https://jadesta.kemenparekraf.go.id/imgpost/110524_medium.jpg",
      description: "Belajar memasak hidangan tradisional Lombok langsung dari ibu-ibu lokal",
      longDescription:
        "Kelas memasak interaktif di rumah keluarga lokal. Pelajari resep tradisional Lombok autentik dan teknik memasak dari ibu-ibu lokal yang berpengalaman. Anda akan memasak dan makan bersama keluarga.",
      duration: "3 jam",
      status: "Sedang",
      price: 350000,
      icon: "👩‍🍳",
      groupSize: "2-6 orang",
      bestTime: "Sepanjang tahun",
      difficulty: "Mudah",
      includes: ["Kelas memasak", "Semua bahan", "Makan bersama keluarga", "Resep tertulis"],
      notIncludes: ["Transportasi ke lokasi", "Minuman premium"],
      highlights: [
        "Resep autentik dari keluarga lokal",
        "Makan bersama keluarga Lombok",
        "Pembelajaran budaya langsung",
        "Membawa pulang resep dan cerita",
      ],
    },
    "5": {
      id: 5,
      title: "Air Terjun Sarang Walet",
      image: "https://jadesta.kemenparekraf.go.id/imgpost/110562_medium.jpg",
      description: "Trekking ke air terjun tersembunyi dengan kolam alami yang menyegarkan",
      longDescription:
        "Jelajahi trekking menuju air terjun tersembunyi yang dikelilingi vegetasi hijau dan kolam alami yang sempurna untuk berenang. Pengalaman menyenangkan dengan pemandangan alam yang menakjubkan.",
      duration: "2 jam",
      status: "Sedang",
      price: 150000,
      icon: "💧",
      groupSize: "2-10 orang",
      bestTime: "Sepanjang tahun",
      difficulty: "Sedang",
      includes: ["Pemandu lokal", "Peralatan safety", "Snack", "Fotografi"],
      notIncludes: ["Asuransi perjalanan", "Perlengkapan renang"],
      highlights: [
        "Air terjun tersembunyi yang indah",
        "Kolam renang alami",
        "Vegetasi hutan yang lebat",
        "Suasana tenang dan asri",
      ],
    },
    "6": {
      id: 6,
      title: "Adopsi Pohon Go-Green",
      image: "https://jadesta.kemenparekraf.go.id/imgpost/110534_medium.jpg",
      description: "Program wisata berkelanjutan dengan menanam pohon untuk masa depan lebih hijau",
      longDescription:
        "Berkontribusi pada program pelestarian lingkungan dengan menanam pohon di lahan Tetebatu. Setiap pohon yang Anda tanam akan dipelihara dan dicatat dengan nama Anda. Program ini mendukung penghijauan dan konservasi hutan.",
      duration: "2 jam",
      status: "Selesai",
      price: 0,
      icon: "🌱",
      groupSize: "5-50 orang",
      bestTime: "September-November",
      difficulty: "Mudah",
      includes: ["Bibit pohon", "Peralatan tanam", "Edukasi lingkungan", "Sertifikat"],
      notIncludes: ["Pemeliharaan jangka panjang"],
      highlights: [
        "Kontribusi penghijauan nyata",
        "Sertifikat kepemilikan pohon",
        "Edukasi konservasi lingkungan",
        "Foto bersama pohon yang ditanam",
      ],
    },
  }

  const activity = activities[params.id]

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Kegiatan tidak ditemukan</p>
      </div>
    )
  }

  const statusColor = {
    Akan: "bg-blue-100 text-blue-700",
    Sedang: "bg-amber-100 text-amber-700",
    Selesai: "bg-green-100 text-green-700",
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Back Button */}
      <div className="px-4 pt-4">
        <Link
          href="/#activities"
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          <ArrowLeft size={20} />
          Kembali ke Kegiatan
        </Link>
      </div>

      {/* Hero Image */}
      <section className="px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
            <img
              src={activity.image || "/placeholder.svg"}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-5xl mb-4">{activity.icon}</div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">{activity.title}</h1>
              </div>
              <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                <Share2 size={20} />
                Bagikan
              </button>
            </div>
            <p className="text-lg text-slate-600 mb-4">{activity.description}</p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor[activity.status]}`}>
                {activity.status}
              </span>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock size={20} className="text-emerald-600" />
                <span>{activity.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Users size={20} className="text-emerald-600" />
                <span>{activity.groupSize}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <DollarSign size={20} className="text-emerald-600" />
                <span className="font-semibold">
                  {activity.price === 0 ? "Gratis" : `Rp ${(activity.price / 1000000).toFixed(1)}jt`}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Button */}
          <div className="bg-emerald-600 text-white rounded-lg p-8 mb-12 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
              <p className="text-emerald-100">Pesan sekarang untuk pengalaman tak terlupakan</p>
            </div>
            <Link
              href={`/packages/${activity.id}`}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors whitespace-nowrap"
            >
              Pesan Sekarang
            </Link>
          </div>

          {/* Description */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="md:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Tentang Kegiatan</h2>
              <p className="text-slate-600 leading-relaxed mb-6">{activity.longDescription}</p>

              {/* Highlights */}
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">Highlights</h3>
              <ul className="space-y-3 mb-8">
                {activity.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* What's Included */}
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">Apa yang Termasuk</h3>
              <ul className="space-y-2 mb-8">
                {activity.includes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-600">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* What's Not Included */}
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">Apa yang Tidak Termasuk</h3>
              <ul className="space-y-2">
                {activity.notIncludes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-600">
                    <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Informasi Penting</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Waktu Terbaik</p>
                    <p className="font-semibold text-slate-900">{activity.bestTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Tingkat Kesulitan</p>
                    <p className="font-semibold text-slate-900">{activity.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Ukuran Kelompok</p>
                    <p className="font-semibold text-slate-900">{activity.groupSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Durasi</p>
                    <p className="font-semibold text-slate-900">{activity.duration}</p>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                <p className="text-sm text-slate-600 mb-4">
                  Tertarik dengan kegiatan ini? Hubungi kami untuk informasi lebih lanjut.
                </p>
                <Link
                  href="/contact"
                  className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2 rounded-lg font-semibold transition-colors"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
