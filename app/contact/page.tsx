import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import MapSection from "@/components/map-section"
import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import MapSection from "@/components/map-section"
import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { getSiteSettings } from "@/lib/services/settings"

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const latitude = parseFloat(settings.map_latitude || "-8.4667")
  const longitude = parseFloat(settings.map_longitude || "116.3333")

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4 text-balance">Hubungi Kami</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Ada pertanyaan? Hubungi tim {settings.site_name || 'Tetebatu'} untuk merencanakan pengalaman wisata terbaik Anda
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-slate-800">Lokasi Kami</h3>
              <p className="text-slate-600 text-sm whitespace-pre-line">
                {settings.address || 'Tetebatu, Lombok Timur'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-slate-800">Telepon</h3>
              <p className="text-slate-600 text-sm">
                {settings.contact_phone || '-'}
                <br />
                <span className="text-xs text-slate-500">{settings.contact_person} (Contact Person)</span>
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-slate-800">Email</h3>
              <p className="text-slate-600 text-sm">
                {settings.contact_email || '-'}
                <br />
                <span className="text-xs text-slate-500">Balas dalam 24 jam</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Map & Operating Hours */}
            <div>
              <MapSection latitude={latitude} longitude={longitude} zoom={13} />

              {/* Operating Hours */}
              <div className="bg-white rounded-lg p-8 shadow-sm mt-8">
                <h3 className="font-serif font-bold text-2xl mb-6 text-slate-800">Jam Operasional</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Senin - Minggu</span>
                    <span className="text-slate-800 font-semibold">24 Jam</span>
                  </div>
                  <div className="flex items-start gap-3 pt-4 bg-emerald-50 p-4 rounded-lg">
                    <Clock className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 mb-1">Layanan 24/7</p>
                      <p className="text-sm text-slate-600">
                        Hubungi kami kapan saja untuk booking dan informasi wisata
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-emerald-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-bold text-3xl text-center mb-12 text-slate-800">Pertanyaan Umum</h2>
          <div className="space-y-4">
            {[
              {
                q: "Bagaimana cara melakukan booking paket wisata?",
                a: "Anda dapat menghubungi kami via telepon, email, atau mengisi form kontak di website kami. Tim kami akan mengkonfirmasi reservasi Anda dalam 24 jam.",
              },
              {
                q: "Apakah ada diskon untuk grup besar?",
                a: "Ya, kami menawarkan diskon khusus untuk kelompok. Silakan hubungi kami untuk negosiasi harga terbaik untuk grup Anda.",
              },
              {
                q: "Apa yang harus saya bawa untuk kegiatan outdoor?",
                a: "Bawa pakaian santai, sepatu trekking, tabir surya, topi, dan banyak air minum. Untuk trekking gunung, bawa jaket, senter, dan perlengkapan tidur.",
              },
              {
                q: "Apakah tersedia akomodasi homestay?",
                a: "Ya, {settings.site_name || 'Tetebatu'} memiliki berbagai pilihan homestay berkualitas. Tim kami dapat membantu Anda memilih akomodasi sesuai budget dan preferensi.",
              },
              {
                q: "Bagaimana dengan transportasi dari bandara?",
                a: "Kami dapat mengatur transfer dari Bandara Internasional Lombok. Jarak dari bandara ke Tetebatu sekitar 60km, perjalanan sekitar 2 jam.",
              },
            ].map((item, idx) => (
              <details key={idx} className="bg-white rounded-lg p-6 group">
                <summary className="cursor-pointer font-semibold text-slate-800 flex justify-between items-center">
                  {item.q.replace("{settings.site_name || 'Tetebatu'}", settings.site_name || 'Tetebatu')}
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="text-slate-600 mt-4 text-sm leading-relaxed">{item.a.replace("{settings.site_name || 'Tetebatu'}", settings.site_name || 'Tetebatu')}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
