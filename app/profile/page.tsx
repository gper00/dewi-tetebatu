"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Save, Lock, User, Key } from "lucide-react"
import Navbar from "@/components/navbar"

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Profile Form
  const [profileData, setProfileData] = useState({
    full_name: "",
    avatar_url: "",
    email: "",
  })

  // Password Form
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)
      // Fetch public profile
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profile) {
        setProfileData({
          full_name: profile.full_name || "",
          avatar_url: profile.avatar_url || "",
          email: profile.email || "",
        })
      }
    }
    fetchProfile()
  }, [router, supabase])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user) throw new Error("No user found")

      // Update public.users table
      const { error: profileError } = await supabase
        .from("users")
        .update({
          full_name: profileData.full_name,
          avatar_url: profileData.avatar_url,
        })
        .eq("id", user.id)

      if (profileError) throw profileError

      // Update auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: profileData.full_name, avatar_url: profileData.avatar_url }
      })

      if (authError) throw authError

      toast.success("Profil berhasil diperbarui")
      router.refresh()
    } catch (error: any) {
      toast.error("Gagal update profil: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Password konfirmasi tidak cocok")
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password minimal 6 karakter")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      })

      if (error) throw error

      toast.success("Password berhasil diubah")
      setPasswordData({ newPassword: "", confirmPassword: "" })
    } catch (error: any) {
      toast.error("Gagal ubah password: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-serif font-bold text-slate-800">Profil Saya</h1>
            <p className="text-slate-600">Kelola informasi akun Anda</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <User size={20} />
                </div>
                <h2 className="font-bold text-lg text-slate-800">Informasi Pribadi</h2>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="text"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">URL Foto (Optional)</label>
                  <input
                    type="url"
                    value={profileData.avatar_url}
                    onChange={(e) => setProfileData({ ...profileData, avatar_url: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    Simpan Profil
                  </button>
                </div>
              </form>
            </div>

            {/* Security Settings */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <Lock size={20} />
                </div>
                <h2 className="font-bold text-lg text-slate-800">Keamanan & Password</h2>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password Baru</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Min. 6 karakter"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Ulangi password"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !passwordData.newPassword}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Lock size={16} />}
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
