"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Camera, Save, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function ProfilePage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, refreshProfile } = useAuth()
  const [fullName, setFullName] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
    if (profile) {
      setFullName(profile.full_name)
      if (profile.avatar_url) {
        setAvatarPreview(profile.avatar_url)
      }
    }
  }, [user, profile, authLoading, router])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const supabase = createClient()

      let avatarUrl = profile?.avatar_url

      // Upload avatar if changed
      if (avatarFile && user) {
        const fileExt = avatarFile.name.split(".").pop()
        const fileName = `${user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, avatarFile, {
          upsert: true,
        })

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName)

        avatarUrl = publicUrl
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user!.id)

      if (updateError) throw updateError

      await refreshProfile()
      setSuccess("Profile berhasil diupdate!")
      setAvatarFile(null)
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif font-bold text-3xl text-slate-900 mb-8">Profil Saya</h1>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-emerald-200 bg-emerald-50">
                  <AlertDescription className="text-emerald-800">{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview || "/placeholder.svg"}
                        alt="Avatar"
                        width={120}
                        height={120}
                        className="w-28 h-28 rounded-full object-cover border-4 border-emerald-100"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-emerald-200">
                        <User className="w-12 h-12 text-emerald-600" />
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                      <Camera size={18} />
                      <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                  </div>
                  <p className="text-sm text-slate-600">Klik ikon kamera untuk ubah foto</p>
                </div>

                {/* Email (Read only) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" value={user.email} className="pl-9" disabled />
                  </div>
                  <p className="text-xs text-slate-500">Email tidak dapat diubah</p>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Nama Anda"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                  <Save className="mr-2" size={18} />
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
