import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { Users, Award, Heart, Leaf, Clock, MapPin, Shield } from "lucide-react"
import Link from "next/link"
import { getAllActivities } from "@/lib/services/activities"
import { AppImage } from "@/components/ui/app-image"
import { createServerClient } from "@/lib/supabase/server"

// Helper to map icon string to Lucide component
const IconMap: Record<string, any> = {
  Heart, Leaf, Users, Award, Shield, MapPin
}

async function getAboutData() {
  const supabase = await createServerClient()
  const [
    { data: settingsData },
    { data: values },
    { data: team },
    { data: achievements }
  ] = await Promise.all([
    supabase.from('settings').select('*').in('key', ['about_story_title', 'about_story_content', 'about_image_url']),
    supabase.from('village_values').select('*').order('created_at', { ascending: true }),
    supabase.from('team_members').select('*').order('created_at', { ascending: true }),
    supabase.from('village_achievements').select('*').order('created_at', { ascending: true })
  ])

  const settingsMap: Record<string, string> = {}
  if (settingsData) {
    settingsData.forEach((s: any) => settingsMap[s.key] = s.value)
  }

  return {
    story: {
      title: settingsMap['about_story_title'] || "Kisah Desa Tetebatu",
      content: settingsMap['about_story_content'] || "Tetebatu adalah desa wisata yang indah...",
      image_url: settingsMap['about_image_url'] || "https://jadesta.kemenparekraf.go.id/imgpost/116570.jpg"
    },
    values: values || [],
    team: team || [],
    achievements: achievements || []
  }
}

export default async function AboutPage() {
  const { story, values, team, achievements } = await getAboutData()

  let activities = []
  try {
    activities = await getAllActivities()
  } catch (error) {
    console.error("Error in About Page:", error)
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4 text-balance">Tentang Tetebatu</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Memahami kisah, misi, dan nilai-nilai yang menginspirasi Desa Wisata Tetebatu
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
              <AppImage
                src={story.image_url}
                alt={story.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif font-bold text-4xl mb-6 text-slate-800">{story.title}</h2>
              <div className="text-slate-600 mb-4 leading-relaxed whitespace-pre-line">
                {story.content}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      {values.length > 0 && (
        <section className="bg-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif font-bold text-4xl text-center mb-12 text-slate-800">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value: any, idx: number) => {
                const Icon = IconMap[value.icon] || Heart
                return (
                  <div key={value.id} className="bg-emerald-50 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-3 text-slate-800">{value.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif font-bold text-4xl text-center mb-4 text-slate-800">Tim Tetebatu</h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Tim profesional dan berdedikasi yang siap memberikan layanan terbaik untuk pengalaman wisata Anda di
              Tetebatu
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member: any) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-64 overflow-hidden relative">
                    <AppImage src={member.image_url} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-lg text-slate-800 mb-1">{member.name}</h3>
                    <p className="text-emerald-600 font-semibold text-sm mb-3">{member.role}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <section className="bg-emerald-600 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif font-bold text-4xl text-center mb-12">Pencapaian Tetebatu</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {achievements.map((ach: any) => (
                <div key={ach.id}>
                  <div className="font-serif font-bold text-5xl mb-2">{ach.value}</div>
                  <p className="text-emerald-100">{ach.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-emerald-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl mb-4 text-slate-800">
            Bergabunglah dengan Ribuan Wisatawan Puas
          </h2>
          <p className="text-slate-600 mb-8">
            Rasakan pengalaman wisata autentik yang tak terlupakan bersama Desa Wisata Tetebatu
          </p>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Jelajahi Paket Kami
          </button>
        </div>
      </section>

      {/* All Activities Section */}
      <section id="all-activities" className="py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif font-bold text-4xl mb-12 text-slate-800">Semua Kegiatan Tersedia</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity: any) => (
              <Link key={activity.id} href={`/activities/${activity.id}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden">
                    <AppImage
                      src={activity.image_url}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{activity.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Clock size={16} />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${(activity.status || "akan") === "akan"
                          ? "bg-blue-100 text-blue-700"
                          : activity.status === "sedang"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {(activity.status || "akan").charAt(0).toUpperCase() + (activity.status || "akan").slice(1)}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {activity.price === 0 ? "Gratis" : `Rp ${(activity.price / 1000).toFixed(0)}K`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {activities.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-600">Belum ada kegiatan tersedia.</p>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
