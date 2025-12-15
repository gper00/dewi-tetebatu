import { type NextRequest, NextResponse } from "next/server"
import { submitContactMessage } from "@/lib/services/contact"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, topic, phone } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await submitContactMessage({
      name,
      email,
      subject,
      message,
      topic,
      phone
    })

    if (error) {
      console.error("Error creating contact message:", error)
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json(
      {
        data,
        message: "Message sent successfully",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Unexpected error in contact API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
