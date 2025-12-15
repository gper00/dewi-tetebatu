"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2, Mail, Phone, Calendar, Eye } from "lucide-react"

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: string
  created_at: string
}

export default function ContactsClient({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      try {
        const { error } = await supabase.from("contact_messages").delete().eq("id", id)
        if (error) throw error
        toast.success("Pesan berhasil dihapus")
        if (selectedMessage?.id === id) setSelectedMessage(null)
        router.refresh()
      } catch (error: any) {
        toast.error("Gagal menghapus pesan: " + error.message)
      }
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from("contact_messages").update({ status: 'read' }).eq("id", id)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Failed to mark as read")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Message List */}
      <div className="lg:col-span-1 space-y-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Pesan Masuk</h1>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm max-h-[600px] overflow-y-auto">
          {initialMessages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Belum ada pesan masuk.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {initialMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg)
                    if (msg.status === 'new') handleMarkAsRead(msg.id)
                  }}
                  className={`p-4 cursor-pointer transition-colors hover:bg-emerald-50 ${selectedMessage?.id === msg.id ? "bg-emerald-50 border-l-4 border-emerald-500" :
                      msg.status === 'new' ? "bg-white border-l-4 border-blue-500" : "bg-white border-l-4 border-transparent"
                    }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-medium ${msg.status === 'new' ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                      {msg.name}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 truncate mb-1">{msg.subject || "(Tanpa Subjek)"}</p>
                  <p className="text-xs text-slate-400 truncate">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 sticky top-6">
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedMessage.subject || "Tanpa Subjek"}</h2>
                <div className="flex gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} className="text-emerald-600" />
                    {new Date(selectedMessage.created_at).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => handleDelete(selectedMessage.id, e)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus Pesan"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mb-8 bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  {selectedMessage.name[0]}
                </div>
                <div>
                  <p className="text-sm text-slate-500">Pengirim</p>
                  <p className="font-medium text-slate-800">{selectedMessage.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <a href={`mailto:${selectedMessage.email}`} className="font-medium text-slate-800 hover:text-emerald-600 hover:underline">{selectedMessage.email}</a>
                </div>
              </div>
              {selectedMessage.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Telepon</p>
                    <p className="font-medium text-slate-800">{selectedMessage.phone}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="prose max-w-none text-slate-700 whitespace-pre-line">
              {selectedMessage.message}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <a
                href={`mailto:${selectedMessage.email}`}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <Mail size={16} />
                Balas via Email
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl h-[400px] flex flex-col items-center justify-center text-slate-400">
            <Mail size={48} className="mb-4 opacity-50" />
            <p>Pilih pesan untuk melihat detail</p>
          </div>
        )}
      </div>
    </div>
  )
}
