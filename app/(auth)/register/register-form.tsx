"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Lock, Mail, Loader2, AlertCircle, CheckCircle2, User } from "lucide-react"

export default function RegisterForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) throw error
      setSuccess(true)
    } catch (error: any) {
      setError(error.message || "Gagal mendaftar. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="font-serif font-bold text-2xl text-slate-800">Buat Akun Baru</h1>
        <p className="text-slate-600 mt-2 text-sm">Bergabunglah dengan komunitas Dewi Tetebatu</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg flex items-start gap-3 mb-6 border border-emerald-100">
          <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">Pendaftaran Berhasil!</p>
            <p className="text-xs mt-1">
              Silakan cek email Anda (<strong>{email}</strong>) lalu klik link konfirmasi untuk mengaktifkan akun.
            </p>
          </div>
        </div>
      )}

      {!success && (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Nama Lengkap Anda"
                required
              />
              <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
          </div>

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
                minLength={6}
                required
              />
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
            <p className="text-xs text-slate-500 mt-1">Minimal 6 karakter</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                minLength={6}
                required
              />
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Daftar"}
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-slate-600">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
          Masuk
        </Link>
      </div>
    </div>
  )
}
