import { createServerClient } from "@/lib/supabase/server"
import GalleryClient from "./gallery-client"

export default async function AdminGalleryPage() {
  const supabase = await createServerClient()
  const { data: gallery } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })

  return <GalleryClient initialItems={gallery || []} />
}
