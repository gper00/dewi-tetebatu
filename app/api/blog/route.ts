import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const searchParams = request.nextUrl.searchParams

    const category = searchParams.get("category")
    const limit = searchParams.get("limit")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const perPage = Number.parseInt(searchParams.get("per_page") || "10")

    let query = supabase.from("blog_posts").select("*", { count: "exact" }).order("published_at", { ascending: false })

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (limit) {
      query = query.limit(Number.parseInt(limit))
    } else {
      const from = (page - 1) * perPage
      const to = from + perPage - 1
      query = query.range(from, to)
    }

    const { data, error, count } = await query

    if (error) {
      console.error("[v0] Error fetching blog posts:", error)
      return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        per_page: perPage,
        total: count,
        total_pages: Math.ceil((count || 0) / perPage),
      },
    })
  } catch (error) {
    console.error("[v0] Unexpected error in blog API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
