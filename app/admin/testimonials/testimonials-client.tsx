"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2, CheckCircle, XCircle, Star, User } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  email: string | null
  rating: number
  comment: string
  is_approved: boolean
  is_featured: boolean
  created_at: string
}

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const router = useRouter()
  const supabase = createClient()

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_approved: !currentStatus })
        .eq("id", id)

      if (error) throw error
      toast.success(currentStatus ? "Testimoni disembunyikan" : "Testimoni disetujui")
      router.refresh()
    } catch (error: any) {
      toast.error("Gagal mengubah status: " + error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
      try {
        const { error } = await supabase.from("testimonials").delete().eq("id", id)
        if (error) throw error
        toast.success("Testimoni berhasil dihapus")
        router.refresh()
      } catch (error: any) {
        toast.error("Gagal menghapus testimoni: " + error.message)
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Testimoni</h1>
        <div className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-100">
          Total: {initialTestimonials.length} | Pending: {initialTestimonials.filter(t => !t.is_approved).length}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Komentar</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialTestimonials.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "" : "text-slate-300"} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={item.comment}>
                    {item.comment}
                  </td>
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${item.is_approved
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {item.is_approved ? <CheckCircle size={12} /> : null}
                      {item.is_approved ? "Disetujui" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleStatus(item.id, item.is_approved)}
                        className={`p-2 rounded-lg transition-colors border ${item.is_approved ? 'text-amber-600 border-amber-200 hover:bg-amber-50' : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'}`}
                        title={item.is_approved ? "Sembunyikan" : "Setujui"}
                      >
                        {item.is_approved ? <XCircle size={18} /> : <CheckCircle size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {initialTestimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Belum ada testimoni masuk.
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
