import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus } from "lucide-react"
import ActivitiesClient from "./activities-client"

export default async function AdminActivitiesPage() {
  const supabase = await createServerClient()
  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: true })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Kegiatan & Event</h1>
        <Link
          href="/admin/activities/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Tambah Kegiatan
        </Link>
      </div>

      <ActivitiesClient initialActivities={activities || []} />
    </div>
  )
}
