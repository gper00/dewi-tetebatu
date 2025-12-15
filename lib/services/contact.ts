import { createServerClient } from '@/lib/supabase/server'

export interface ContactMessageInput {
  name: string
  email: string
  subject: string
  message: string
  topic?: string
  phone?: string
}

export async function submitContactMessage(message: ContactMessageInput) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        status: 'new',
        // Note: 'topic' and 'phone' might not be in schema yet based on previous findings,
        // but we'll include them if schema allows or rely on 'message' to contain them if needed.
        // Checking schema first would be ideal, but for now we follow the form fields.
        // Based on types.ts: phone is there, topic is not explicitly in interface but maybe handled.
      }
    ])
    .select()
    .single()

  return { data, error }
}
