"use client"

import Link from "next/link"
import { Edit, Trash2, Calendar, MapPin } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Activity {
  id: string
  title: string
  category: string
  date: string
  location: string
  status: string
}

export default function ActivitiesClient({ initialActivities }: { initialActivities: Activity[] }) {
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kegiatan "${title}"?`)) {
      try {
        const { error } = await supabase.from("activities").delete().eq("id", id)
        if (error) throw error
        toast.success("Kegiatan berhasil dihapus")
        router.refresh()
      } catch (error: any) {
        toast.error("Gagal menghapus kegiatan: " + error.message)
      }
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Judul Kegiatan</th>
              <th className="px-6 py-4 font-semibold">Kategori</th>
              <th className="px-6 py-4 font-semibold">Tanggal</th>
              <th className="px-6 py-4 font-semibold">Lokasi</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {initialActivities?.map((activity) => (
              <tr key={activity.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  <div className="max-w-xs truncate" title={activity.title}>
                    {activity.title}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{activity.category}</td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {activity.date ? new Date(activity.date).toLocaleDateString("id-ID") : "-"}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400" />
                    {activity.location || "-"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={activity.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/activities/edit/${activity.id}`}
                      className="p-1 hover:bg-blue-50 text-blue-600 rounded"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(activity.id, activity.title)}
                      className="p-1 hover:bg-red-50 text-red-600 rounded"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {initialActivities?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  Belum ada kegiatan. Silakan tambah acara baru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    akan: "bg-blue-100 text-blue-700",
    sedang: "bg-amber-100 text-amber-700",
    selesai: "bg-green-100 text-green-700",
  }

  const labels: any = {
    akan: "Akan Datang",
    sedang: "Sedang Berlangsung",
    selesai: "Selesai",
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-slate-100"}`}>
      {labels[status] || status}
    </span>
  )
}
