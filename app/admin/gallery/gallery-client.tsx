"use client"

import Link from "next/link"
import { Trash2, Plus, Image as ImageIcon, Pencil } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AppImage } from "@/components/ui/app-image"

interface GalleryItem {
  id: string
  title: string
  image_url: string
  category: string
  created_at: string
}

export default function GalleryClient({ initialItems }: { initialItems: GalleryItem[] }) {
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus gambar ini?")) {
      try {
        const { error } = await supabase.from("gallery_images").delete().eq("id", id)
        if (error) throw error
        toast.success("Gambar berhasil dihapus")
        router.refresh()
      } catch (error: any) {
        toast.error("Gagal menghapus gambar: " + error.message)
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Galeri</h1>
        <Link
          href="/admin/gallery/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Tambah Gambar
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {initialItems?.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group">
            <div className="relative aspect-[4/3] bg-slate-100">
              <AppImage
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Link
                  href={`/admin/gallery/edit/${item.id}`}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  title="Edit"
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <p className="text-white text-sm font-medium truncate">{item.title}</p>
                <p className="text-slate-300 text-xs truncate capitalize">{item.category || "General"}</p>
              </div>
            </div>
          </div>
        ))}

        {initialItems?.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
            <ImageIcon className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p>Belum ada gambar di galeri.</p>
          </div>
        )}
      </div>
    </div>
  )
}
