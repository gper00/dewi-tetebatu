import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const searchParams = request.nextUrl.searchParams

    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    let query = supabase.from("packages").select("*").order("created_at", { ascending: false })

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      console.error("[v0] Error fetching packages:", error)
      return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("[v0] Unexpected error in packages API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
