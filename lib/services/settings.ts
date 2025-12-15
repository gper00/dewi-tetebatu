import { createServerClient } from '@/lib/supabase/server'
import { Database } from '@/lib/database'

export type SiteSetting = {
  key: string
  value: string
  label?: string
  type?: string
  description?: string
}

const DEFAULT_SETTINGS: Record<string, string> = {
  site_name: "Desa Wisata Tetebatu",
  address: "Tetebatu, Sikur, Kabupaten Lombok Timur, Nusa Tenggara Barat 83355",
  contact_phone: "+62 852-3741-0597",
  contact_person: "Hermiwandi",
  contact_email: "wandihermi675@gmail.com",
  social_facebook: "https://facebook.com/desatetebatu",
  social_instagram: "https://instagram.com/desatetebatu",
  social_twitter: "https://twitter.com/desatetebatu",
  map_url: "https://maps.google.com/...",
  map_latitude: "-8.4667",
  map_longitude: "116.3333"
}

export async function getSiteSettings() {
  const supabase = await createServerClient()

  // Try to fetch settings
  const { data, error } = await supabase
    .from('settings')
    .select('*')

  if (error || !data) {
    console.warn("Could not fetch settings, using defaults", error)
    return DEFAULT_SETTINGS
  }

  // Convert array to object
  const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS }

  data.forEach((item: any) => {
    if (item.value) {
      settingsMap[item.key] = item.value
    }
  })

  return settingsMap
}
