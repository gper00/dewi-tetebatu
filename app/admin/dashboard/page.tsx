import { createServerClient } from "@/lib/supabase/server"
import { Users, Package, Calendar, Star } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createServerClient()

  // Fetch stats (Parallel fetching)
  const [packages, bookings, testimonials, activities] = await Promise.all([
    supabase.from("packages").select("id", { count: "exact" }),
    supabase.from("bookings").select("id", { count: "exact" }).eq("status", "pending"),
    supabase.from("testimonials").select("id", { count: "exact" }).eq("is_approved", false),
    supabase.from("activities").select("id", { count: "exact" }),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500">Selamat datang di panel admin Dewi Tetebatu.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Booking Pending"
          value={bookings.count || 0}
          icon={<Calendar className="text-amber-600" size={24} />}
          bg="bg-amber-50"
          border="border-amber-100"
        />
        <StatCard
          title="Paket Aktif"
          value={packages.count || 0}
          icon={<Package className="text-emerald-600" size={24} />}
          bg="bg-emerald-50"
          border="border-emerald-100"
        />
        <StatCard
          title="Kegiatan"
          value={activities.count || 0}
          icon={<Users className="text-blue-600" size={24} />}
          bg="bg-blue-50"
          border="border-blue-100"
        />
        <StatCard
          title="Review Baru"
          value={testimonials.count || 0}
          icon={<Star className="text-purple-600" size={24} />}
          bg="bg-purple-50"
          border="border-purple-100"
        />
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-lg text-slate-800 mb-4">Kegiatan Terbaru</h2>
        <div className="text-center py-8 text-slate-500">
          Belum ada kegiatan tercatat hari ini.
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, bg, border }: any) {
  return (
    <div className={`p-6 rounded-xl border ${bg} ${border}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-slate-600">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  )
}
