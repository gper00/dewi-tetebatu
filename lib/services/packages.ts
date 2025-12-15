import { createServerClient } from '@/lib/supabase/server'

export async function getFeaturedPackages() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getAllPackages() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getPackageById(id: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getPackageBySlug(slug: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}
