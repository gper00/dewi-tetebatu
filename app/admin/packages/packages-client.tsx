"use client"

import Link from "next/link"
import { Edit, Trash2, Eye, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Package {
  id: string
  title: string
  slug: string
  category: string
  price: number
  duration: string
  is_featured: boolean
  is_active: boolean
}

export default function PackagesClient({ initialPackages }: { initialPackages: Package[] }) {
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus paket "${title}"? Data tidak dapat dikembalikan.`)) {
      try {
        const { error } = await supabase.from("packages").delete().eq("id", id)
        if (error) throw error
        toast.success("Paket berhasil dihapus")
        router.refresh()
      } catch (error: any) {
        toast.error("Gagal menghapus paket: " + error.message)
      }
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Judul Paket</th>
              <th className="px-6 py-4 font-semibold">Kategori</th>
              <th className="px-6 py-4 font-semibold">Harga</th>
              <th className="px-6 py-4 font-semibold">Durasi</th>
              <th className="px-6 py-4 font-semibold text-center">Featured</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {initialPackages?.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  <div className="max-w-xs truncate" title={pkg.title}>
                    {pkg.title}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{pkg.category}</td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  Rp {pkg.price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-slate-600">{pkg.duration}</td>
                <td className="px-6 py-4 text-center">
                  {pkg.is_featured ? (
                    <CheckCircle className="inline text-emerald-500" size={18} />
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {pkg.is_active ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                      Arsip
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/packages/${pkg.id}`}
                      target="_blank"
                      className="p-1 hover:bg-slate-100 text-slate-500 rounded"
                      title="Lihat"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/packages/edit/${pkg.id}`}
                      className="p-1 hover:bg-blue-50 text-blue-600 rounded"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(pkg.id, pkg.title)}
                      className="p-1 hover:bg-red-50 text-red-600 rounded"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {initialPackages?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  Belum ada paket wisata. Silakan tambah paket baru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
