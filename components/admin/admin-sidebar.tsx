"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Calendar, FileText, MessageSquare, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Paket Wisata",
    href: "/admin/packages",
    icon: Package,
  },
  {
    title: "Kegiatan",
    href: "/admin/activities",
    icon: Calendar,
  },
  {
    title: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Booking",
    href: "/admin/bookings",
    icon: Users,
  },
  {
    title: "Pesan Kontak",
    href: "/admin/messages",
    icon: MessageSquare,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">Tetebatu Admin</h1>
        <p className="text-sm text-gray-400 mt-1">Desa Wisata</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Lihat Website</span>
        </Link>
      </div>
    </div>
  )
}
