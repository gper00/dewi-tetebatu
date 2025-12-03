import Link from 'next/link'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="bg-emerald-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="font-serif font-bold text-emerald-900 text-lg">TT</span>
              </div>
              <span className="font-serif font-bold text-lg">Tetebatu</span>
            </div>
            <p className="text-emerald-200 text-sm leading-relaxed mb-6">
              Desa wisata autentik dengan pariwisata berkelanjutan yang memberdayakan komunitas lokal.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://www.facebook.com/pemerintah" target="_blank" rel="noopener noreferrer" className="bg-emerald-800 hover:bg-emerald-700 p-3 rounded-lg transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/desatetebatu" target="_blank" rel="noopener noreferrer" className="bg-emerald-800 hover:bg-emerald-700 p-3 rounded-lg transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com/desatetebatu" target="_blank" rel="noopener noreferrer" className="bg-emerald-800 hover:bg-emerald-700 p-3 rounded-lg transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Menu</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-emerald-200 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/packages" className="text-emerald-200 hover:text-white transition-colors">Paket Wisata</Link></li>
              <li><Link href="/blog" className="text-emerald-200 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-emerald-200 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="text-emerald-200 hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Kontak</h3>
            <div className="space-y-4 text-sm text-emerald-200">
              <div className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 text-yellow-500" />
                <p>Tetebatu, Sikur<br />Kabupaten Lombok Timur<br />Nusa Tenggara Barat 83355</p>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="flex-shrink-0 text-yellow-500" />
                <p>+62 852-3741-0597<br /><span className="text-xs text-emerald-300">(Hermiwandi)</span></p>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="flex-shrink-0 text-yellow-500" />
                <p>wandihermi675@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-emerald-200 text-sm mb-4">Dapatkan penawaran eksklusif dan update terbaru dari Tetebatu</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-2 rounded-lg bg-emerald-800 border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-emerald-900 font-bold px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-800 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-emerald-200 text-sm">
            <p>&copy; 2025 Desa Wisata Tetebatu. Semua hak dilindungi.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
