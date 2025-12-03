"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, UserCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const { user, profile, loading, signOut } = useAuth()

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Paket", href: "/packages" },
    { label: "Blog", href: "/blog" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-serif font-bold text-lg">TT</span>
          </div>
          <span className="font-serif font-bold text-lg text-slate-800 hidden sm:inline">Tetebatu</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-medium transition-colors text-sm ${
                isActive(item.href)
                  ? "text-emerald-600 border-b-2 border-emerald-600 pb-1"
                  : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user && profile ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    {profile.avatar_url ? (
                      <Image
                        src={profile.avatar_url || "/placeholder.svg"}
                        alt={profile.full_name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <User size={18} className="text-emerald-600" />
                      </div>
                    )}
                    <span className="font-medium text-sm text-slate-700">{profile.full_name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-emerald-50 text-slate-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserCircle size={18} />
                        <span className="text-sm">Profil Saya</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-emerald-50 text-slate-700 w-full text-left"
                      >
                        <LogOut size={18} />
                        <span className="text-sm">Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors font-medium text-sm"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </>
          )}

          <Link
            href="/booking"
            className="hidden sm:block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
          >
            Booking
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 hover:text-emerald-600 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block font-medium transition-colors py-2 ${
                  isActive(item.href)
                    ? "text-emerald-600 border-l-4 border-emerald-600 pl-2"
                    : "text-slate-600 hover:text-emerald-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {user && profile ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 py-2 text-slate-700 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <UserCircle size={18} />
                  <span>Profil Saya</span>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsOpen(false)
                  }}
                  className="flex items-center gap-2 py-2 text-slate-700 font-medium w-full text-left"
                >
                  <LogOut size={18} />
                  <span>Keluar</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 text-emerald-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="block py-2 text-emerald-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Daftar
                </Link>
              </>
            )}

            <Link
              href="/booking"
              className="block w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium mt-4 text-center"
              onClick={() => setIsOpen(false)}
            >
              Booking
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
