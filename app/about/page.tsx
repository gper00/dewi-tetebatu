import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { Users, Award, Heart, Leaf, Clock } from "lucide-react"
import Link from "next/link"

async function getActivities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/activities`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error("Failed to fetch activities:", error)
    return []
  }
}

export default async function AboutPage() {
  const activities = await getActivities()

  const teamMembers = [
    {
      name: "Hermiwandi",
      role: "Founder & Contact Person",
      image: "https://jadesta.kemenparekraf.go.id/imguser/4560.jpg",
      bio: "Pendiri Desa Wisata Tetebatu dengan visi memberdayakan komunitas lokal melalui pariwisata berkelanjutan.",
    },
    {
      name: "Ketut Widiana",
      role: "Operations Manager",
      image: "/indonesian-man-professional.jpg",
      bio: "Mengelola operasional harian dan memastikan setiap wisatawan mendapat pengalaman terbaik di Tetebatu.",
    },
    {
      name: "Ni Made Sari",
      role: "Cultural Experience Coordinator",
      image: "/indonesian-woman-professional.jpg",
      bio: "Merancang paket wisata budaya yang autentik dan mendekatkan wisatawan dengan tradisi lokal Tetebatu.",
    },
    {
      name: "Komang Surya",
      role: "Adventure Guide Lead",
      image: "/indonesian-guide-outdoor.jpg",
      bio: "Memimpin tim pemandu trekking profesional untuk petualangan aman dan berkesan di Gunung Rinjani dan sekitarnya.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Autentisitas",
      description:
        "Memberikan pengalaman wisata yang genuine dan berkesan, menampilkan kehidupan nyata masyarakat Tetebatu.",
    },
    {
      icon: Leaf,
      title: "Keberlanjutan",
      description: "Menjaga kelestarian lingkungan Gunung Rinjani dan pelestarian budaya untuk generasi mendatang.",
    },
    {
      icon: Users,
      title: "Pemberdayaan Komunitas",
      description:
        "Mendukung ekonomi lokal dan pemberdayaan masyarakat melalui keterlibatan aktif dalam setiap paket wisata.",
    },
    {
      icon: Award,
      title: "Kualitas Layanan",
      description: "Memberikan pelayanan terbaik dan memanjakan setiap tamu dengan standar internasional.",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4 text-balance">Tentang Tetebatu</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Memahami kisah, misi, dan nilai-nilai yang menginspirasi Desa Wisata Tetebatu
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <img
              src="https://jadesta.kemenparekraf.go.id/imgpost/116570.jpg"
              alt="Tetebatu Landscape"
              className="rounded-lg shadow-lg"
            />
            <div>
              <h2 className="font-serif font-bold text-4xl mb-6 text-slate-800">Kisah Desa Tetebatu</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Tetebatu adalah sebuah desa yang terletak di ketinggian 700 meter di atas permukaan laut, di Kecamatan
                Sikur, Kabupaten Lombok Timur, Nusa Tenggara Barat. Desa ini merupakan salah satu Desa yang mewakili
                Indonesia di ajang World Best Tourism Village UNWTO 2021, membuktikan komitmennya terhadap pariwisata
                berkelanjutan.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Sejak tahun 70-an, Tetebatu telah menjadi destinasi favorit wisatawan Eropa. Keunikan desa ini terletak
                pada caranya mempertahankan keaslian pedesaan melalui tradisi bertani, kearifan lokal gotong royong,
                kesejukan alam, bentangan sawah bertingkat, dan budaya masyarakat yang masih kuat terjaga. Setiap aspek
                kehidupan desa mencerminkan harmoni sempurna antara manusia dan alam.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Hari ini, Tetebatu terus berkembang sebagai model desa wisata yang memberdayakan komunitas lokal melalui
                berbagai paket wisata autentik, homestay berbasis masyarakat, dan kegiatan eco-tourism. Kami percaya
                bahwa pariwisata dapat menjadi kekuatan positif untuk pelestarian budaya, lingkungan, dan peningkatan
                kesejahteraan masyarakat lokal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif font-bold text-4xl text-center mb-12 text-slate-800">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <div key={idx} className="bg-emerald-50 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-3 text-slate-800">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif font-bold text-4xl text-center mb-4 text-slate-800">Tim Tetebatu</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Tim profesional dan berdedikasi yang siap memberikan layanan terbaik untuk pengalaman wisata Anda di
            Tetebatu
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg text-slate-800 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-emerald-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif font-bold text-4xl text-center mb-12">Pencapaian Tetebatu</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif font-bold text-5xl mb-2">300</div>
              <p className="text-emerald-100">Besar ADWI 2023</p>
            </div>
            <div>
              <div className="font-serif font-bold text-5xl mb-2">UNWTO</div>
              <p className="text-emerald-100">World Best Tourism Village 2021</p>
            </div>
            <div>
              <div className="font-serif font-bold text-5xl mb-2">10K+</div>
              <p className="text-emerald-100">Wisatawan Per Tahun</p>
            </div>
            <div>
              <div className="font-serif font-bold text-5xl mb-2">50+</div>
              <p className="text-emerald-100">Paket Wisata Tersedia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl mb-4 text-slate-800">
            Bergabunglah dengan Ribuan Wisatawan Puas
          </h2>
          <p className="text-slate-600 mb-8">
            Rasakan pengalaman wisata autentik yang tak terlupakan bersama Desa Wisata Tetebatu
          </p>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Jelajahi Paket Kami
          </button>
        </div>
      </section>

      {/* All Activities Section */}
      <section id="all-activities" className="py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif font-bold text-4xl mb-12 text-slate-800">Semua Kegiatan Tersedia</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity: any) => (
              <Link key={activity.id} href={`/activities/${activity.id}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image_url || "/placeholder.svg"}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{activity.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Clock size={16} />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          activity.status === "akan"
                            ? "bg-blue-100 text-blue-700"
                            : activity.status === "sedang"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {activity.price === 0 ? "Gratis" : `Rp ${(activity.price / 1000).toFixed(0)}K`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {activities.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-600">Belum ada kegiatan tersedia.</p>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
