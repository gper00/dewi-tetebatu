import { createServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import PackagesTable from "@/components/admin/packages-table"

export default async function AdminPackagesPage() {
  const supabase = await createServerClient()

  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paket Wisata</h1>
          <p className="text-gray-600 mt-1">Kelola semua paket wisata</p>
        </div>
        <Link href="/admin/packages/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Paket
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="text-red-600">Error loading packages: {error.message}</div>
      ) : (
        <PackagesTable packages={packages || []} />
      )}
    </div>
  )
}
