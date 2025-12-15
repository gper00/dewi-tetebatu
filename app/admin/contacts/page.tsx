import { createServerClient } from "@/lib/supabase/server"
import ContactsClient from "./contacts-client"

export default async function AdminContactsPage() {
  const supabase = await createServerClient()

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return <ContactsClient initialMessages={messages || []} />
}
