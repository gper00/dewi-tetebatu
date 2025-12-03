import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Calendar, FileText, MessageSquare, Users } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createServerClient()

  // Fetch stats
  const [packagesCount, activitiesCount, blogPostsCount, bookingsCount, messagesCount] = await Promise.all([
    supabase.from("packages").select("id", { count: "exact", head: true }),
    supabase.from("activities").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
  ])

  const stats = [
    {
      title: "Total Paket",
      value: packagesCount.count || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Kegiatan",
      value: activitiesCount.count || 0,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Artikel Blog",
      value: blogPostsCount.count || 0,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Booking",
      value: bookingsCount.count || 0,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Pesan Baru",
      value: messagesCount.count || 0,
      icon: MessageSquare,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600 mt-1">Selamat datang di dashboard Desa Wisata Tetebatu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings />
        <RecentMessages />
      </div>
    </div>
  )
}

async function RecentBookings() {
  const supabase = await createServerClient()
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{booking.customer_name}</p>
                  <p className="text-sm text-gray-600">{booking.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rp {booking.total_price.toLocaleString()}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Belum ada booking</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

async function RecentMessages() {
  const supabase = await createServerClient()
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pesan Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="border-b pb-3">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium">{message.name}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      message.status === "new"
                        ? "bg-blue-100 text-blue-700"
                        : message.status === "read"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {message.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Belum ada pesan</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
