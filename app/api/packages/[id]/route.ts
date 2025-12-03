import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("packages").select("*").eq("id", id).single()

    if (error) {
      console.error("[v0] Error fetching package:", error)
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("[v0] Unexpected error in package detail API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
