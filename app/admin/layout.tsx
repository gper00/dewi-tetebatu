import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminSidebar from "./components/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check admin role
  if (!user) {
    redirect("/login")
  }

  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user!.id)
    .single()

  if (!userData || userData.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar userRole={userData!.role} userEmail={user!.email || ""} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 md:hidden">
          <span className="font-bold text-slate-800">Admin Dashboard</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
