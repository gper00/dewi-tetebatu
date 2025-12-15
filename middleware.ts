import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // PROTECTED ROUTES - ADMIN
  if (url.pathname.startsWith("/admin")) {
    if (!user) {
      // Not logged in -> Redirect to Login
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }

    // Check if user is admin via public.users table or custom claim
    // For performance in middleware, often claims are better, but here we query or assume RBAC in DB.
    // However, middleware shouldn't do heavy DB queries if possible, but minimal check is okay.
    // Better pattern: Check DB for role.

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!userData || userData.role !== "admin") {
      // Not admin -> Redirect to Home or Error
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  // PROTECTED ROUTES - USER (Booking, Account)
  if (url.pathname.startsWith("/booking") || url.pathname.startsWith("/account")) {
    if (!user) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
