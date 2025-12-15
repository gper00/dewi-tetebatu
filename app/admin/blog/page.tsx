import { createServerClient } from "@/lib/supabase/server"
import BlogClient from "./blog-client"

export default async function AdminBlogPage() {
  const supabase = await createServerClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  return <BlogClient initialPosts={posts || []} />
}
