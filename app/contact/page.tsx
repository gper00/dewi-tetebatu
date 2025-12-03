import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import MapSection from "@/components/map-section"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4 text-balance">Hubungi Kami</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Ada pertanyaan? Hubungi tim Tetebatu untuk merencanakan pengalaman wisata terbaik Anda
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
              <p className="text-slate-600 text-sm">
                Tetebatu, Sikur
                <br />
                Kabupaten Lombok Timur
                <br />
                Nusa Tenggara Barat 83355
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-slate-800">Telepon</h3>
              <p className="text-slate-600 text-sm">
                +62 852-3741-0597
                <br />
                <span className="text-xs text-slate-500">Hermiwandi (Contact Person)</span>
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2 text-slate-800">Email</h3>
              <p className="text-slate-600 text-sm">
                wandihermi675@gmail.com
                <br />
                <span className="text-xs text-slate-500">Balas dalam 24 jam</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif font-bold text-3xl mb-8 text-slate-800">Kirim Pesan kepada Kami</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Anda"
                    className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subjek"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                />

                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm text-slate-600">
                  <option value="">-- Pilih Topik --</option>
                  <option value="booking">Pertanyaan Booking</option>
                  <option value="paket">Informasi Paket</option>
                  <option value="grup">Reservasi Grup</option>
                  <option value="kerjasama">Kerjasama</option>
                  <option value="other">Lainnya</option>
                </select>

                <textarea
                  placeholder="Pesan Anda"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Kirim Pesan
                </button>
              </form>
            </div>

            {/* Map & Operating Hours */}
            <div>
              <MapSection latitude={-8.4667} longitude={116.3333} zoom={13} />

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
                q: "Apa yang harus saya bawa untuk aktivitas outdoor?",
                a: "Bawa pakaian santai, sepatu trekking, tabir surya, topi, dan banyak air minum. Untuk trekking gunung, bawa jaket, senter, dan perlengkapan tidur.",
              },
              {
                q: "Apakah tersedia akomodasi homestay?",
                a: "Ya, Tetebatu memiliki berbagai pilihan homestay berkualitas. Tim kami dapat membantu Anda memilih akomodasi sesuai budget dan preferensi.",
              },
              {
                q: "Bagaimana dengan transportasi dari bandara?",
                a: "Kami dapat mengatur transfer dari Bandara Internasional Lombok. Jarak dari bandara ke Tetebatu sekitar 60km, perjalanan sekitar 2 jam.",
              },
            ].map((item, idx) => (
              <details key={idx} className="bg-white rounded-lg p-6 group">
                <summary className="cursor-pointer font-semibold text-slate-800 flex justify-between items-center">
                  {item.q}
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="text-slate-600 mt-4 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
