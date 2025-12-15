import { createServerClient } from '@/lib/supabase/server'
import { Database } from '@/lib/database'

export type GalleryImage = Database['public']['Tables']['gallery_images']['Row']

export async function getGalleryImages(limit = 8) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching gallery:", error)
    return []
  }
  return data || []
}
