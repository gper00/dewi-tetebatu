import Link from "next/link"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { ArrowRight, Calendar, User } from "lucide-react"

async function getBlogPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blog?limit=10`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4 text-balance">Blog Tetebatu</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Cerita inspiratif, tips petualangan, dan pengalaman wisata autentik dari Desa Wisata Tetebatu
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          {blogPosts.length > 0 && (
            <div className="mb-16 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={blogPosts[0].image_url || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                      {blogPosts[0].category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(blogPosts[0].created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-3xl mb-3 text-slate-800">{blogPosts[0].title}</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <User size={16} />
                      {blogPosts[0].author}
                    </span>
                    <Link
                      href={`/blog/${blogPosts[0].slug}`}
                      className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                      Baca Selengkapnya
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post: any) => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img src={post.image_url || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500">{post.views || 0} views</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2 text-slate-800 line-clamp-2">{post.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors"
                  >
                    Baca <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">Belum ada artikel blog.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-emerald-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl mb-4 text-slate-800">
            Jangan Lewatkan Cerita Terbaru dari Tetebatu
          </h2>
          <p className="text-slate-600 mb-8">
            Subscribe untuk mendapatkan update blog, tips petualangan, dan penawaran eksklusif langsung ke email Anda
          </p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="Email Anda"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
