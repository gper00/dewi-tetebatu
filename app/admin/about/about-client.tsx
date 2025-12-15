"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Save, Plus, Trash2, Edit, Trophy, Heart, Users, BookOpen } from "lucide-react"
import { AppImage } from "@/components/ui/app-image"

type Tab = "story" | "values" | "team" | "achievements"

export default function AboutClient({
  initialStory,
  initialValues,
  initialTeam,
  initialAchievements
}: {
  initialStory: any,
  initialValues: any[],
  initialTeam: any[],
  initialAchievements: any[]
}) {
  const [activeTab, setActiveTab] = useState<Tab>("story")
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  // Story State
  const [story, setStory] = useState(initialStory)

  // Values State
  const [values, setValues] = useState(initialValues)
  const [newValue, setNewValue] = useState({ title: "", description: "", icon: "Heart" })

  // Team State
  const [team, setTeam] = useState(initialTeam)
  const [newMember, setNewMember] = useState({ name: "", role: "", bio: "", image_url: "" })

  // Achievements State
  const [achievements, setAchievements] = useState(initialAchievements)
  const [newAchievement, setNewAchievement] = useState({ label: "", value: "" })

  // --- Story Handlers ---
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const updates = [
        { key: 'about_story_title', value: story.title, updated_at: new Date().toISOString() },
        { key: 'about_story_content', value: story.content, updated_at: new Date().toISOString() },
        { key: 'about_image_url', value: story.image_url, updated_at: new Date().toISOString() }
      ]
      const { error } = await supabase.from('settings').upsert(updates, { onConflict: 'key' })
      if (error) throw error
      toast.success("Cerita desa berhasil disimpan")
      router.refresh()
    } catch (error: any) {
      toast.error("Gagal menyimpan: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  // --- Values Handlers ---
  const handleAddValue = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.from('village_values').insert([newValue]).select().single()
      if (error) throw error
      setValues([...values, data])
      setNewValue({ title: "", description: "", icon: "Heart" })
      toast.success("Nilai berhasil ditambahkan")
      router.refresh()
    } catch (error: any) {
      toast.error("Gagal menambah: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteValue = async (id: string) => {
    if (!confirm("Hapus nilai ini?")) return
    try {
      await supabase.from('village_values').delete().eq('id', id)
      setValues(values.filter(v => v.id !== id))
      toast.success("Dihapus")
      router.refresh()
    } catch (e: any) { toast.error(e.message) }
  }

  // --- Team Handlers ---
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.from('team_members').insert([newMember]).select().single()
      if (error) throw error
      setTeam([...team, data])
      setNewMember({ name: "", role: "", bio: "", image_url: "" })
      toast.success("Tim berhasil ditambahkan")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Hapus anggota tim ini?")) return
    try {
      await supabase.from('team_members').delete().eq('id', id)
      setTeam(team.filter(t => t.id !== id))
      toast.success("Dihapus")
      router.refresh()
    } catch (e: any) { toast.error(e.message) }
  }

  // --- Achievements Handlers ---
  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.from('village_achievements').insert([newAchievement]).select().single()
      if (error) throw error
      setAchievements([...achievements, data])
      setNewAchievement({ label: "", value: "" })
      toast.success("Pencapaian berhasil ditambahkan")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm("Hapus pencapaian ini?")) return
    try {
      await supabase.from('village_achievements').delete().eq('id', id)
      setAchievements(achievements.filter(a => a.id !== id))
      toast.success("Dihapus")
      router.refresh()
    } catch (e: any) { toast.error(e.message) }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Tentang Kami</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 mb-6 overflow-x-auto">
        {[
          { id: "story", label: "Kisah Desa", icon: BookOpen },
          { id: "values", label: "Nilai-Nilai", icon: Heart },
          { id: "team", label: "Tim Kami", icon: Users },
          { id: "achievements", label: "Pencapaian", icon: Trophy },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

        {/* STORY TAB */}
        {activeTab === "story" && (
          <form onSubmit={handleSaveStory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul Cerita</label>
              <input
                type="text"
                value={story.title}
                onChange={(e) => setStory({ ...story, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Misal: Kisah Desa Tetebatu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gambar Utama (URL)</label>
              <input
                type="text"
                value={story.image_url}
                onChange={(e) => setStory({ ...story, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Isi Cerita</label>
              <textarea
                value={story.content}
                onChange={(e) => setStory({ ...story, content: e.target.value })}
                rows={10}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Tuliskan sejarah dan deskripsi desa..."
              />
            </div>
            <button
              disabled={loading}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Simpan Cerita
            </button>
          </form>
        )}

        {/* VALUES TAB */}
        {activeTab === "values" && (
          <div className="space-y-8">
            <form onSubmit={handleAddValue} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
              <h3 className="font-semibold text-slate-800">Tambah Nilai Baru</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Judul (misal: Keberlanjutan)"
                  value={newValue.title}
                  onChange={e => setNewValue({ ...newValue, title: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <select
                  value={newValue.icon}
                  onChange={e => setNewValue({ ...newValue, icon: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="Heart">Heart (Cinta/Autentisitas)</option>
                  <option value="Leaf">Leaf (Alam/Keberlanjutan)</option>
                  <option value="Users">Users (Komunitas)</option>
                  <option value="Award">Award (Kualitas)</option>
                  <option value="Shield">Shield (Keamanan)</option>
                </select>
              </div>
              <textarea
                placeholder="Deskripsi"
                value={newValue.description}
                onChange={e => setNewValue({ ...newValue, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                required
              />
              <button disabled={loading} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Tambah</button>
            </form>

            <div className="grid md:grid-cols-2 gap-4">
              {values.map(val => (
                <div key={val.id} className="border border-slate-200 p-4 rounded-lg flex justify-between items-start hover:shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{val.icon}</span>
                      <h4 className="font-bold text-slate-800">{val.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600">{val.description}</p>
                  </div>
                  <button onClick={() => handleDeleteValue(val.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === "team" && (
          <div className="space-y-8">
            <form onSubmit={handleAddMember} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
              <h3 className="font-semibold text-slate-800">Tambah Anggota Tim</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  placeholder="Nama Lengkap"
                  value={newMember.name}
                  onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  placeholder="Jabatan / Role"
                  value={newMember.role}
                  onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  placeholder="URL Foto"
                  value={newMember.image_url}
                  onChange={e => setNewMember({ ...newMember, image_url: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <textarea
                placeholder="Bio Singkat"
                value={newMember.bio}
                onChange={e => setNewMember({ ...newMember, bio: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
              />
              <button disabled={loading} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Tambah Member</button>
            </form>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map(member => (
                <div key={member.id} className="border border-slate-200 p-4 rounded-lg flex gap-4 items-start hover:shadow-sm overflow-hidden">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex-shrink-0 overflow-hidden">
                    <AppImage src={member.image_url} alt={member.name} width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 truncate">{member.name}</h4>
                    <p className="text-xs text-emerald-600 font-medium truncate mb-1">{member.role}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">{member.bio}</p>
                  </div>
                  <button onClick={() => handleDeleteMember(member.id)} className="text-red-500 hover:bg-red-50 p-1 rounded flex-shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === "achievements" && (
          <div className="space-y-8">
            <form onSubmit={handleAddAchievement} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
              <h3 className="font-semibold text-slate-800">Tambah Pencapaian</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Nilai (misal: 10K+)"
                  value={newAchievement.value}
                  onChange={e => setNewAchievement({ ...newAchievement, value: e.target.value })}
                  className="px-3 py-2 border rounded-lg font-bold"
                  required
                />
                <input
                  placeholder="Label (misal: Wisatawan)"
                  value={newAchievement.label}
                  onChange={e => setNewAchievement({ ...newAchievement, label: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <button disabled={loading} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Tambah Pencapaian</button>
            </form>

            <div className="grid md:grid-cols-4 gap-4">
              {achievements.map(ach => (
                <div key={ach.id} className="border border-slate-200 p-4 rounded-lg text-center hover:shadow-sm relative group">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{ach.value}</div>
                  <div className="text-xs text-slate-500">{ach.label}</div>
                  <button
                    onClick={() => handleDeleteAchievement(ach.id)}
                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
