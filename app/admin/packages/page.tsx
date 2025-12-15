import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Plus } from "lucide-react"
import PackagesClient from "./packages-client"

export default async function AdminPackagesPage() {
  const supabase = await createServerClient()
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Paket Wisata</h1>
        <Link
          href="/admin/packages/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Tambah Paket
        </Link>
      </div>

      <PackagesClient initialPackages={packages || []} />
    </div>
  )
}
