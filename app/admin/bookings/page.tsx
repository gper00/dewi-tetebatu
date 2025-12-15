import { createServerClient } from "@/lib/supabase/server"
import BookingsClient from "./bookings-client"

export default async function AdminBookingsPage() {
  const supabase = await createServerClient()
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Booking</h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          Export Data
        </button>
      </div>

      <BookingsClient initialBookings={bookings || []} />
    </div>
  )
}
