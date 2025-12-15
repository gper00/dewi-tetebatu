"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Save, ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function EditPackagePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    short_description: "",
    price: "",
    duration: "",
    difficulty: "easy",
    category: "Trekking",
    image_url: "",
    is_featured: false,
    is_active: true,
  })

  const [includes, setIncludes] = useState<string[]>([])
  const [newInclude, setNewInclude] = useState("")

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const { data, error } = await supabase
          .from("packages")
          .select("*")
          .eq("id", params.id)
          .single()

        if (error) throw error

        if (data) {
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            description: data.description || "",
            short_description: data.short_description || "",
            price: data.price.toString() || "",
            duration: data.duration || "",
            difficulty: data.difficulty || "easy",
            category: data.category || "Trekking",
            image_url: data.image_url || (data.images && data.images[0]) || "",
            is_featured: data.is_featured || false,
            is_active: data.is_active || true,
          })
          setIncludes(data.included || data.doc_includes || [])
        }
      } catch (error: any) {
        alert("Error fetching package: " + error.message)
        router.push("/admin/packages")
      } finally {
        setFetching(false)
      }
    }

    fetchPackage()
  }, [params.id, router, supabase])

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    // Don't auto-update slug on edit unless empty or explicit, to avoid breaking links
    // setFormData({ ...formData, title, slug: generateSlug(title) })
    setFormData({ ...formData, title })
  }

  const handleAddInclude = () => {
    if (newInclude.trim()) {
      setIncludes([...includes, newInclude.trim()])
      setNewInclude("")
    }
  }

  const handleRemoveInclude = (index: number) => {
    setIncludes(includes.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("packages")
        .update({
          ...formData,
          price: Number(formData.price),
          included: includes,
          images: formData.image_url ? [formData.image_url] : [],
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      router.push("/admin/packages")
      router.refresh()
    } catch (error: any) {
      alert("Error updating package: " + error.message)
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
          href="/admin/packages"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Edit Paket Wisata</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul Paket</label>
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
                <option value="Trekking">Trekking</option>
                <option value="Nature">Nature</option>
                <option value="Culture">Culture</option>
                <option value="Camping">Camping</option>
                <option value="Culinary">Culinary</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Harga (IDR)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Durasi</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 2 Hari 1 Malam"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kesulitan</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
            <input
              type="text"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              maxLength={150}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Lengkap</label>
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

        {/* Inclusions */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Termasuk (Paket)</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newInclude}
              onChange={(e) => setNewInclude(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Makan Siang"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddInclude())}
            />
            <button
              type="button"
              onClick={handleAddInclude}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {includes.map((item, idx) => (
              <span key={idx} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {item}
                <button type="button" onClick={() => handleRemoveInclude(idx)} className="hover:text-red-500">
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
            <span className="text-sm font-medium text-slate-700">Aktif (Tampilkan)</span>
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
