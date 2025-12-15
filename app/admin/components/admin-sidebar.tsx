"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Calendar, Image as ImageIcon, Users, LogOut, Settings, FileText, MessageSquare, Star, Info } from "lucide-react"

export default function AdminSidebar({ userRole, userEmail }: { userRole: string, userEmail: string }) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
    { href: "/admin/packages", icon: Package, label: "Paket Wisata" },
    { href: "/admin/activities", icon: Users, label: "Kegiatan" },
    { href: "/admin/blog", icon: FileText, label: "Blog" },
    { href: "/admin/gallery", icon: ImageIcon, label: "Galeri" },
    { href: "/admin/contacts", icon: MessageSquare, label: "Pesan" },
    { href: "/admin/testimonials", icon: Star, label: "Testimoni" },
    { href: "/admin/about", icon: Info, label: "Tentang Kami" },
    { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
  ]

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 hidden md:flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 text-emerald-400 font-serif font-bold text-xl">
          Dewi Tetebatu
        </Link>
        <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20"
                : "hover:bg-slate-800 hover:text-white"
                }`}
            >
              <item.icon size={20} className={active ? "text-white" : "text-slate-400 group-hover:text-white"} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
            {userRole[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
          </div>
        </div>
        <form action="/auth/signout" method="post">
          <button type="submit" className="w-full flex items-center gap-2 text-slate-400 hover:text-white px-2 py-2 rounded transition-colors text-sm hover:bg-slate-800">
            <LogOut size={16} />
            Keluar
          </button>
        </form>
      </div>
    </aside>
  )
}
