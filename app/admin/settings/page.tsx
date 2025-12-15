"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Save, Globe, Phone, MapPin, ExternalLink, Facebook, Instagram, Twitter } from "lucide-react"

export default function AdminSettingsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: "",
    address: "",
    contact_phone: "",
    contact_person: "",
    contact_email: "",
    social_facebook: "",
    social_instagram: "",
    social_twitter: "",
    map_url: "",
    map_latitude: "",
    map_longitude: ""
  })

  // Load existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      setFetching(true)
      try {
        const { data, error } = await supabase.from('settings').select('*')

        if (error) {
          // If table doesn't exist or permissions fail, we might see error here.
          // We can ignore or toast.
          console.error("Fetch settings error:", error)
        }

        if (data) {
          const newSettings: Record<string, string> = { ...settings }
          data.forEach((item: any) => {
            newSettings[item.key] = item.value
          })
          setSettings(newSettings)
        }
      } finally {
        setFetching(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Upsert each setting
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        type: 'string', // Default
        updated_at: new Date().toISOString()
      }))

      const { error } = await supabase.from('settings').upsert(updates, { onConflict: 'key' })

      if (error) throw error

      toast.success("Pengaturan website berhasil disimpan")
      router.refresh()
    } catch (error: any) {
      toast.error("Gagal menyimpan: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-emerald-600" size={32} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Pengaturan Website</h1>
        <p className="text-slate-600">Kelola informasi desa, kontak, dan sosial media yang tampil di website.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* General Info */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <Globe className="text-emerald-600" size={20} />
            Informasi Umum
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Website / Desa</label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => handleChange('site_name', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Desa Wisata Tetebatu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap</label>
              <textarea
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
                placeholder="Alamat lengkap..."
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <Phone className="text-emerald-600" size={20} />
            Kontak
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nomor Telepon (WhatsApp)</label>
              <input
                type="text"
                value={settings.contact_phone}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="+62..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={settings.contact_person}
                onChange={(e) => handleChange('contact_person', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Nama CP"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Resmi</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="email@example.com"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <ExternalLink className="text-emerald-600" size={20} />
            Sosial Media
          </h2>
          <div className="grid gap-4">
            <div className="relative">
              <div className="absolute left-3 top-2.5 text-slate-400">
                <Facebook size={18} />
              </div>
              <input
                type="url"
                value={settings.social_facebook}
                onChange={(e) => handleChange('social_facebook', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="URL Facebook"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-2.5 text-slate-400">
                <Instagram size={18} />
              </div>
              <input
                type="url"
                value={settings.social_instagram}
                onChange={(e) => handleChange('social_instagram', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="URL Instagram"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-2.5 text-slate-400">
                <Twitter size={18} />
              </div>
              <input
                type="url"
                value={settings.social_twitter}
                onChange={(e) => handleChange('social_twitter', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="URL Twitter / X"
              />
            </div>
          </div>
        </div>

        {/* Maps */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <MapPin className="text-emerald-600" size={20} />
            Peta Lokasi
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Koordinat Latitude</label>
              <input
                type="text"
                value={settings.map_latitude}
                onChange={(e) => handleChange('map_latitude', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="-8.XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Koordinat Longitude</label>
              <input
                type="text"
                value={settings.map_longitude}
                onChange={(e) => handleChange('map_longitude', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="116.XXXX"
              />
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-10">
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-70 disabled:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Simpan Semua Pengaturan
          </button>
        </div>
      </form>
    </div>
  )
}
