"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Check user role for redirection
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single()

      router.refresh()

      if (profile?.role === 'admin') {
        router.push("/admin/dashboard")
      } else {
        router.push("/")
      }
    } catch (error: any) {
      setError(error.message || "Gagal masuk. Periksa email dan password Anda.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="font-serif font-bold text-2xl text-slate-800">Selamat Datang Kembali</h1>
        <p className="text-slate-600 mt-2 text-sm">Masuk untuk mengelola akun Anda</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="nama@email.com"
              required
            />
            <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
            <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Masuk"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        Belum punya akun?{" "}
        <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
          Daftar Sekarang
        </Link>
      </div>
    </div>
  )
}
