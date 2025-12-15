import { createServerClient } from "@/lib/supabase/server"
import TestimonialsClient from "./testimonials-client"

export default async function AdminTestimonialsPage() {
  const supabase = await createServerClient()

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  return <TestimonialsClient initialTestimonials={testimonials || []} />
}
