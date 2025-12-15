import { createServerClient } from "@/lib/supabase/server"
import AboutClient from "./about-client"

export default async function AdminAboutPage() {
  const supabase = await createServerClient()

  // Fetch all concurrent data
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

  // Process settings into object
  const settingsMap: Record<string, string> = {}
  if (settingsData) {
    settingsData.forEach((s: any) => settingsMap[s.key] = s.value)
  }

  const story = {
    title: settingsMap['about_story_title'] || "Kisah Desa Tetebatu",
    content: settingsMap['about_story_content'] || "",
    image_url: settingsMap['about_image_url'] || ""
  }

  return (
    <AboutClient
      initialStory={story}
      initialValues={values || []}
      initialTeam={team || []}
      initialAchievements={achievements || []}
    />
  )
}
