"use client"

import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"
import { AppImage } from "@/components/ui/app-image"

interface BlogPost {
  id: string
  title: string
  category: string
  status: string // e.g., 'published', 'draft' -- Schema uses is_published boolean, I should map that on server or handle here
  is_published: boolean
  published_at: string | null
  image_url?: string
  featured_image?: string
}

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id)
        if (error) throw error
        toast.success("Artikel berhasil dihapus")
        router.refresh()
      } catch (error: any) {
        toast.error("Gagal menghapus artikel: " + error.message)
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Blog</h1>
        <Link
          href="/admin/blog/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Buat Artikel Baru
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Judul Artikel</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal Publish</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative flex-shrink-0 rounded bg-slate-100 overflow-hidden">
                        <AppImage
                          src={post.image_url || post.featured_image || null}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-slate-800 line-clamp-1 max-w-[200px]">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 capitalize">{post.category || "-"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${post.is_published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Link to public view if published, else mostly useless but ok */}
                      {post.is_published && (
                        <Link
                          href={`/blog/${post.slug}`} // Assuming slug exists on post object from fetching
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                          title="Lihat"
                        >
                          <Eye size={18} />
                        </Link>
                      )}

                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {initialPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Belum ada artikel. Klik tombol "Buat Artikel Baru" untuk memulai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
