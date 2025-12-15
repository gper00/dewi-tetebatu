import { createServerClient } from '@/lib/supabase/server'

export async function getFeaturedTestimonials() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getAllTestimonials() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}
