"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle, Clock, Loader2, Check } from "lucide-react"
import { toast } from "sonner"

interface Booking {
  id: string
  customer_name: string
  customer_email: string
  booking_date: string
  number_of_people: number
  total_price: number
  status: string
  item_title: string
  item_type: string
}

export default function BookingsClient({ initialBookings }: { initialBookings: Booking[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setLoadingId(id)
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", id)

      if (error) throw error
      toast.success("Status booking berhasil diperbarui")
      router.refresh()
    } catch (error: any) {
      toast.error("Gagal update status: " + error.message)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Item</th>
              <th className="px-6 py-4 font-semibold">Tanggal</th>
              <th className="px-6 py-4 font-semibold">Pax</th>
              <th className="px-6 py-4 font-semibold">Total</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {initialBookings?.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{booking.customer_name}</p>
                  <p className="text-slate-500 text-xs">{booking.customer_email}</p>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">
                  {booking.item_title || "Unknown Item"}
                  <span className="block text-xs text-slate-400 capitalize">{booking.item_type}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {new Date(booking.booking_date).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4 text-slate-600">{booking.number_of_people} Org</td>
                <td className="px-6 py-4 font-medium text-emerald-600">
                  Rp {booking.total_price?.toLocaleString("id-ID") || "-"}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-right">
                    {loadingId === booking.id ? (
                      <Loader2 className="animate-spin text-slate-400" size={18} />
                    ) : (
                      <>
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                              className="p-1 hover:bg-emerald-50 text-emerald-600 rounded"
                              title="Konfirmasi"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                              className="p-1 hover:bg-red-50 text-red-600 rounded"
                              title="Batalkan"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'completed')}
                            className="p-1 hover:bg-blue-50 text-blue-600 rounded"
                            title="Set Selesai"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        {booking.status !== 'pending' && booking.status !== 'cancelled' && booking.status !== 'completed' && (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {initialBookings?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  Belum ada data booking.
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
  if (status === "confirmed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <CheckCircle size={12} /> Confirmed
      </span>
    )
  }
  if (status === "cancelled") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        <XCircle size={12} /> Cancelled
      </span>
    )
  }
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        <Check size={12} /> Completed
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
      <Clock size={12} /> Pending
    </span>
  )
}
