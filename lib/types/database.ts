export type Package = {
  id: string
  slug: string
  title: string
  description: string
  price: number
  duration: string
  difficulty: string
  category: string
  rating: number
  image_url: string | null
  highlights: string[]
  includes: string[]
  excludes: string[]
  itinerary?: any
  available: boolean
  created_at: string
  updated_at: string
}

export type Activity = {
  id: string
  slug: string
  title: string
  description: string
  status: "akan" | "sedang" | "selesai"
  date: string
  duration: string
  price: number
  location: string
  image_url: string | null
  highlights: string[]
  includes: string[]
  max_participants: number | null
  current_participants: number
  created_at: string
  updated_at: string
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  author_role: string | null
  image_url: string | null
  tags: string[]
  published: boolean
  views: number
  created_at: string
  updated_at: string
}

export type Booking = {
  id: string
  package_id: string | null
  activity_id: string | null
  booking_type: "package" | "activity"
  full_name: string
  email: string
  phone: string
  date: string
  participants: number
  special_requests: string | null
  total_price: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  created_at: string
  updated_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: string
}
