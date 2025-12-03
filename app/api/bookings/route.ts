import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["booking_type", "item_id", "name", "email", "phone", "booking_date", "number_of_people"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Get the item (package or activity) to calculate price
    let itemPrice = 0
    if (body.booking_type === "package") {
      const { data: packageData } = await supabase.from("packages").select("price").eq("id", body.item_id).single()
      itemPrice = packageData?.price || 0
    } else if (body.booking_type === "activity") {
      const { data: activityData } = await supabase.from("activities").select("price").eq("id", body.item_id).single()
      itemPrice = activityData?.price || 0
    }

    const totalPrice = itemPrice * body.number_of_people

    // Create booking
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        booking_type: body.booking_type,
        item_id: body.item_id,
        name: body.name,
        email: body.email,
        phone: body.phone,
        booking_date: body.booking_date,
        number_of_people: body.number_of_people,
        special_requests: body.special_requests || null,
        total_price: totalPrice,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating booking:", error)
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
    }

    // Update activity participants if booking for activity
    if (body.booking_type === "activity") {
      await supabase.rpc("increment_activity_participants", {
        activity_id: body.item_id,
        increment_by: body.number_of_people,
      })
    }

    return NextResponse.json(
      {
        data,
        message: "Booking created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Unexpected error in bookings API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const searchParams = request.nextUrl.searchParams

    const email = searchParams.get("email")
    const status = searchParams.get("status")

    let query = supabase.from("bookings").select("*").order("created_at", { ascending: false })

    if (email) {
      query = query.eq("email", email)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("[v0] Error fetching bookings:", error)
      return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("[v0] Unexpected error in bookings GET API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
