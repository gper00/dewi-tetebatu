import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const searchParams = request.nextUrl.searchParams

    const status = searchParams.get("status")
    const limit = searchParams.get("limit")

    let query = supabase.from("activities").select("*").order("date", { ascending: true })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (!status || status === "all") {
      query = query.in("status", ["akan", "sedang"])
    }

    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      console.error("[v0] Error fetching activities:", error)
      return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Unexpected error in activities API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
