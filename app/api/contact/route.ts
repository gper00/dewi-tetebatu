import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject,
        message: body.message,
        status: "new",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating contact message:", error)
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json(
      {
        data,
        message: "Message sent successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Unexpected error in contact API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
