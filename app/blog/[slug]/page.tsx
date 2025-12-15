import Link from "next/link"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import { AppImage } from "@/components/ui/app-image"
import { createServerClient } from "@/lib/supabase/server"

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const supabase = await createServerClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!post) {
    notFound()
  }

  // Handle compatibility for image field (featured_image in DB vs image_url in schema)
  const imageUrl = post.image_url || post.featured_image || "/placeholder.svg"

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
                {post.category || "Umum"}
              </span>
              <span className="text-emerald-300">{post.read_time || "5 min read"}</span>
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
              Oleh <strong>{post.author || "Admin"}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-emerald-600" />
            <span>
              {new Date(post.published_at || post.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <AppImage
            src={imageUrl}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-12"
          />

          {/* Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-slate-700 leading-relaxed space-y-6 whitespace-pre-line">
              {post.content}
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

        </div>
      </section>

      <FooterSection />
    </div>
  )
}

import { createClient } from "@supabase/supabase-js"

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("is_published", true)

  return (posts || []).map((post) => ({
    slug: post.slug,
  }))
}
