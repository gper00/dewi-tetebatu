import { createServerClient } from '@/lib/supabase/server'

export async function getAllBlogPosts() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getFeaturedBlogPosts(limit = 3) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) throw error
  return data
}

export async function getBlogPostsByCategory(category: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .order('published_at', { ascending: false })

  if (error) throw error
  return data || []
}
