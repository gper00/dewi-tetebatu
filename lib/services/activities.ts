import { createServerClient } from '@/lib/supabase/server'

export async function getAllActivities() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getFeaturedActivities(limit = 3) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getActivityById(id: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) throw error
  return data
}
