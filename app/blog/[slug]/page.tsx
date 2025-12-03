"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    slug: "trekking-gunung-rinjani-dari-tetebatu",
    title: "Petualangan Trekking Gunung Rinjani dari Tetebatu",
    excerpt:
      "Rasakan sensasi mendaki salah satu gunung terindah Indonesia dengan pemandangan spektakuler dari Tetebatu. Panduan lengkap untuk pendaki pemula.",
    content: `Gunung Rinjani menawarkan pengalaman mendaki yang tak terlupakan dengan pemandangan alam yang memukau dari berbagai ketinggian. Dari Tetebatu, pendakian dapat dimulai melalui rute alternatif yang lebih menantang namun memberikan pemandangan yang unik.

Rute dari Tetebatu dimulai dari ketinggian 700 MDPL dan terus menanjak menuju puncak yang berada di 3.726 meter. Perjalanan ini biasanya memakan waktu 3-4 hari dengan pemandu lokal yang berpengalaman.

Persiapan sangat penting sebelum mendaki. Pastikan Anda membawa perlengkapan yang tepat seperti:
- Sepatu trekking yang nyaman
- Jaket anti angin
- Senter dengan baterai tambahan
- Tas tidur berkualitas
- Perlengkapan memasak dan makanan ringan

Salah satu keunggulan mendaki dari Tetebatu adalah Anda akan melintasi hutan tropis yang indah, melihat beragam jenis burung, dan bermalam di lokasi dengan pemandangan yang spektakuler.

Jangan lupa untuk selalu mengikuti instruksi pemandu dan menjaga kebersihan lingkungan selama perjalanan. Desa Tetebatu memiliki beberapa pemandu berpengalaman yang siap membantu Anda mewujudkan petualangan mendaki impian.`,
    author: "Hermiwandi",
    date: "18 November 2024",
    category: "Petualangan",
    image: "https://jadesta.kemenparekraf.go.id/imgpost/110517_medium.jpg",
    readTime: "8 min read",
  },
  {
    id: 2,
    slug: "kuliner-tradisional-tetebatu-cita-rasa-autentik",
    title: "Kuliner Tradisional Tetebatu: Cita Rasa Autentik Lombok",
    excerpt:
      "Pelajari resep masakan tradisional Lombok dari ibu-ibu Tetebatu yang telah menjaga warisan kuliner selama puluhan tahun.",
    content: `Tetebatu memiliki kekayaan kuliner yang unik dan autentik, hasil dari tradisi turun-temurun masyarakat Lombok. Setiap hidangan memiliki cerita dan makna yang mendalam dalam budaya lokal.

Hidangan khas Lombok yang harus Anda coba:

1. Plecing Kangkung - Sayuran kangkung rebus dengan sambal pedas yang kaya rasa

2. Ikan Bakar Sambal Matah - Ikan segar bakar dengan sambal matah berisi cabai, bawang merah, dan daun serai

3. Lumpia Seribu - Snack tradisional yang gurih dan renyah

4. Satay Ayam dengan Sambal Terasi - Daging ayam tusuk dengan sambal kental yang menggugah selera

Pengalaman memasak tradisional Lombok tidak hanya tentang rasa, tetapi juga tentang proses dan kebersamaan. Masyarakat Tetebatu senang berbagi pengetahuan kuliner mereka kepada wisatawan yang ingin belajar.

Kelas memasak di Tetebatu biasanya dimulai pagi hari di rumah-rumah lokal, diawali dengan kunjungan ke pasar tradisional untuk memilih bahan-bahan segar. Ini memberikan pengalaman autentik yang tidak akan Anda dapatkan di tempat lain.`,
    author: "Siti Nurhaliza",
    date: "15 November 2024",
    category: "Kuliner",
    image: "https://jadesta.kemenparekraf.go.id/imgpost/110524_medium.jpg",
    readTime: "6 min read",
  },
  {
    id: 3,
    slug: "hutan-monyet-tetebatu-ekosistem-unik",
    title: "Hutan Monyet Tetebatu: Ekosistem Unik Lombok Timur",
    excerpt:
      "Jelajahi monkey forest Tetebatu dan amati lutung hitam endemik sambil menikmati keindahan flora dan fauna yang belum terjamah.",
    content: `Hutan Monyet Tetebatu adalah salah satu destinasi ekowisata terbaik di Lombok Timur. Terletak di bagian utara desa, hutan ini menjadi rumah bagi ratusan lutung hitam (Trachypithecus Auratus) yang merupakan spesies endemik yang langka dan dilindungi.

Ketika memasuki hutan, Anda akan disambut dengan:
- Nyanyian merdu berbagai jenis burung
- Deretan pohon-pohon tinggi yang tersusun rapi
- Suasana alam yang sejuk dan asri
- Kehidupan satwa liar dalam habitat alaminya

Lutung hitam Tetebatu adalah primata yang sangat menarik. Mereka hidup dalam kelompok sosial yang terstruktur dengan baik, dan dapat diamati dengan aman dari jarak yang sesuai.

Kegiatan di Hutan Monyet:
1. Bird Watching - Mengamati berbagai jenis burung yang hidup di hutan
2. Photography - Mengabadikan momen-momen indah dengan fauna lokal
3. Nature Walking - Berjalan santai sambil belajar tentang ekosistem hutan
4. Educational Talk - Mendengarkan penjelasan dari pemandu tentang konservasi

Kunjungan ke Hutan Monyet Tetebatu tidak hanya memberikan pengalaman wisata yang berkesan, tetapi juga berkontribusi pada program konservasi alam dan pemberdayaan masyarakat lokal.`,
    author: "Budi Santoso",
    date: "12 November 2024",
    category: "Budaya Alam",
    image: "https://jadesta.kemenparekraf.go.id/imgpost/110509_medium.jpg",
    readTime: "7 min read",
  },
  {
    id: 4,
    slug: "wisata-berkelanjutan-tetebatu-pemberdayaan-lokal",
    title: "Wisata Berkelanjutan di Tetebatu: Memberdayakan Komunitas Lokal",
    excerpt:
      "Bagaimana Tetebatu menjadi model wisata berkelanjutan yang memberikan dampak positif bagi perekonomian dan pelestarian budaya masyarakat.",
    content: `Tetebatu telah menjadi model wisata berkelanjutan yang menginspirasi banyak desa wisata lainnya di Indonesia. Pendekatan mereka mengutamakan keberlanjutan lingkungan, ekonomi lokal, dan pelestarian budaya.

Model Wisata Berkelanjutan Tetebatu:

1. Community-Based Tourism
   - Masyarakat lokal menjadi pelaku utama dalam pariwisata
   - Keuntungan ekonomi langsung untuk warga melalui homestay, pemandu wisata, dan kerajinan

2. Pelestarian Lingkungan
   - Program penanaman pohon bersama wisatawan
   - Menjaga kelestarian hutan dan satwa liar
   - Mengelola limbah dengan baik

3. Preservasi Budaya
   - Menjaga tradisi lokal dan adat istiadat
   - Mengajarkan kesenian tradisional kepada wisatawan
   - Mendukung kerajinan tangan lokal

4. Pendidikan dan Pemberdayaan
   - Pelatihan pemandu wisata lokal
   - Kelas bahasa untuk meningkatkan komunikasi
   - Workshop keterampilan untuk masyarakat

Hasil yang Dicapai:
- Pengakuan internasional sebagai Best Tourism Village UNWTO 2021
- 300 Besar ADWI (Anugerah Desa Wisata Indonesia) 2023
- Peningkatan kesejahteraan masyarakat lokal
- Pelestarian lingkungan yang optimal

Tetebatu membuktikan bahwa pariwisata yang baik bukan hanya tentang keuntungan ekonomi, tetapi juga tentang keberlanjutan jangka panjang untuk generasi mendatang.`,
    author: "Dewi Lestari",
    date: "10 November 2024",
    category: "Sustainability",
    image: "https://jadesta.kemenparekraf.go.id/imgpost/112031.jpg",
    readTime: "9 min read",
  },
]

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24">
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 text-center px-4">
          <h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">Artikel Tidak Ditemukan</h1>
          <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            Kembali ke Blog
          </Link>
        </div>
        <FooterSection />
      </div>
    )
  }

  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 2)

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 font-semibold"
          >
            <ArrowLeft size={18} />
            Kembali ke Blog
          </Link>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <span className="text-emerald-300">{post.readTime}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-balance">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Article Meta */}
      <section className="bg-white border-b border-slate-200 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-8 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <User size={18} className="text-emerald-600" />
            <span>
              Oleh <strong>{post.author}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-emerald-600" />
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-12"
          />

          {/* Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-slate-700 leading-relaxed space-y-6">
              {post.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Share Section */}
          <div className="border-t border-slate-200 pt-8 mb-12">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-800">Bagikan artikel:</span>
              <div className="flex gap-3">
                <button
                  className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                  title="Share on Facebook"
                >
                  f
                </button>
                <button
                  className="p-3 bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-lg transition-colors"
                  title="Share on Twitter"
                >
                  𝕏
                </button>
                <button
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                  title="Copy link"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-slate-200 pt-12">
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-8">Artikel Terkait</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{relatedPost.date}</span>
                        <span className="text-emerald-600 group-hover:underline font-semibold">Baca →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
