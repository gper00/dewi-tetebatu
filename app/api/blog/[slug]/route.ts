import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const supabase = await createServerClient()

    // Get the blog post
    const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

    if (error) {
      console.error("[v0] Error fetching blog post:", error)
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Increment view count
    await supabase
      .from("blog_posts")
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq("slug", slug)

    return NextResponse.json({ data })
  } catch (error) {
    console.error("[v0] Unexpected error in blog detail API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
