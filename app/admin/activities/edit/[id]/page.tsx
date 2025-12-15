"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Save, ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function EditActivityPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Culture",
    duration: "",
    price: "",
    location: "Tetebatu",
    image_url: "",
    status: "akan",
    date: "",
    is_featured: false,
    is_active: true,
  })

  const [highlights, setHighlights] = useState<string[]>([])
  const [newHighlight, setNewHighlight] = useState("")

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select("*")
          .eq("id", params.id)
          .single()

        if (error) throw error

        if (data) {
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            description: data.description || "",
            category: data.category || "Culture",
            duration: data.duration || "",
            price: data.price ? data.price.toString() : "",
            location: data.location || "",
            image_url: data.image_url || (data.images && data.images[0]) || "",
            status: data.status || "akan",
            date: data.date || "",
            is_featured: data.is_featured || false,
            is_active: data.is_active || true,
          })
          setHighlights(data.highlights || [])
        }
      } catch (error: any) {
        alert("Error fetching activity: " + error.message)
        router.push("/admin/activities")
      } finally {
        setFetching(false)
      }
    }

    fetchActivity()
  }, [params.id, router, supabase])

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    // Don't auto-update slug on edit
    setFormData({ ...formData, title })
  }

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()])
      setNewHighlight("")
    }
  }

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("activities")
        .update({
          ...formData,
          price: Number(formData.price),
          highlights: highlights,
          images: formData.image_url ? [formData.image_url] : [],
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      router.push("/admin/activities")
      router.refresh()
    } catch (error: any) {
      alert("Error updating activity: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-emerald-600" size={32} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/activities"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Edit Kegiatan / Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul Event/Aktivfitas</label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Culture">Budaya (Culture)</option>
                <option value="Workshop">Workshop</option>
                <option value="Market">Pasar (Market)</option>
                <option value="Nature">Alam (Nature)</option>
                <option value="Music">Musik</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Harga (IDR)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="0 jika gratis"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="akan">Akan Datang</option>
                  <option value="sedang">Sedang Berlangsung</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
            ></textarea>
          </div>
        </div>

        {/* Media */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar Utama</label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="https://..."
          />
        </div>

        {/* Highlights */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Highlight (Poin Menarik)</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Pertunjukan Tarian"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddHighlight())}
            />
            <button
              type="button"
              onClick={handleAddHighlight}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((item, idx) => (
              <span key={idx} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {item}
                <button type="button" onClick={() => handleRemoveHighlight(idx)} className="hover:text-red-500">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="flex gap-6 pt-4 border-t border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-slate-700">Aktif (Tampilkan di web)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-slate-700">Featured (Unggulan)</span>
          </label>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  )
}
