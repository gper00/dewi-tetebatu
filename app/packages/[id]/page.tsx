import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import BookingForm from "@/components/packages/booking-form"
import { AppImage } from "@/components/ui/app-image"
import { ArrowLeft, Clock, Users, MapPin, Star, CheckCircle, Phone } from "lucide-react"
import { createServerClient } from "@/lib/supabase/server"

async function getPackage(id: string) {
  const supabase = await createServerClient()

  // Try to find by UUID first
  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single()

  if (pkg) return pkg

  // If not UUID, maybe it's checking legacy ID (if any) or simply returning null
  // In our new schema, IDs are UUIDs. If user visits /packages/1 (legacy), it might fail if we don't have mapping or if ID is uuid.
  // Assuming links use the new UUIDs. If testing manual URL with integer, it returns null.

  return null
}

export default async function PackageDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const pkg = await getPackage(params.id)

  if (!pkg) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24">
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 text-center px-4">
          <h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">Paket Tidak Ditemukan</h1>
          <p className="text-slate-600 mb-8">Maaf, paket wisata yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link href="/packages" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors bg-white font-medium">
            <ArrowLeft size={18} /> Kembali ke Daftar Paket
          </Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  // Parse arrays if they are strings (rare with Supabase client but possible if raw JSON)
  // Our schema defines them as arrays TEXT[], so they should come as arrays.
  const highlights = pkg.highlights || []
  const included = pkg.included || pkg.doc_includes || [] // handle legacy/schema naming
  const excluded = pkg.excluded || []

  // Itinerary might be in description (simple) or we might not have a dedicated column in new schema unless added.
  // Schema has: description, short_description. Itinerary isn't explicitly in the CREATE TABLE shown in master_schema.sql (unless I missed it or it acts as JSON).
  // Schema: packages table has no 'itinerary' column.
  // Workaround: We'll assume description contains it or just show description.
  // Or we can assume 'itinerary' was part of a planned update.
  // Let's just render Description for now.

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
            <div className="relative h-96 w-full mb-8 overflow-hidden rounded-xl shadow-md">
              <AppImage
                src={pkg.image_url || ((pkg.images && pkg.images.length > 0) ? pkg.images[0] : null)}
                alt={pkg.title}
                fill
                className="object-cover"
              />
            </div>

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
                        className={i < Math.floor(pkg.rating || 5) ? "fill-yellow-500 text-yellow-500" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{pkg.rating || 5.0}</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase">
                  {pkg.category || "Tour"}
                </span>
                <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase ${pkg.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                    pkg.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                  {pkg.difficulty || "Semua Umur"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate max-w-none mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tentang Paket Ini</h3>
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">{pkg.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Clock size={20} />
                  <span className="font-semibold">Durasi</span>
                </div>
                <p className="text-slate-700 font-medium">{pkg.duration || "Fleksibel"}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <MapPin size={20} />
                  <span className="font-semibold">Lokasi Start</span>
                </div>
                <p className="text-slate-700 font-medium">Tetebatu, Lombok Timur</p>
              </div>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Highlight Paket</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                      <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included & Not Included */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Sudah Termasuk
                </h3>
                <ul className="space-y-3">
                  {included.length > 0 ? included.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                      <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) : (
                    <li className="text-slate-500 italic text-sm">Informasi tidak tersedia</li>
                  )}
                </ul>
              </div>
              <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  Tidak Termasuk
                </h3>
                <ul className="space-y-3">
                  {excluded.length > 0 ? excluded.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  )) : (
                    <li className="text-slate-500 italic text-sm">Pengeluaran pribadi lainnya</li>
                  )}
                </ul>
              </div>
            </div>

          </div>

          {/* Booking Sidebar */}
          <div>
            <BookingForm
              packageId={pkg.id}
              packageTitle={pkg.title}
              price={pkg.price}
            />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
