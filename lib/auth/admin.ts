import { createServerClient } from "@/lib/supabase/server"

export async function getAdminUser() {
  const supabase = await createServerClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).eq("role", "admin").single()

  if (!userData) {
    return null
  }

  return {
    ...user,
    role: userData.role,
    full_name: userData.full_name,
  }
}

export async function requireAdmin() {
  const adminUser = await getAdminUser()

  if (!adminUser) {
    throw new Error("Unauthorized: Admin access required")
  }

  return adminUser
}
