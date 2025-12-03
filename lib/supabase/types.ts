export interface Package {
  id: string
  title: string
  slug: string
  description: string
  price: number
  duration: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  rating: number
  image_url: string
  highlights: string[]
  included: string[]
  excluded: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  title: string
  slug: string
  description: string
  date: string
  duration: string
  status: "akan" | "sedang" | "selesai"
  price: number
  max_participants: number
  current_participants: number
  location: string
  image_url: string
  highlights: string[]
  included: string[]
  excluded: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  author_avatar: string
  category: string
  tags: string[]
  image_url: string
  published_at: string
  view_count: number
  reading_time: number
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  booking_type: "package" | "activity"
  item_id: string
  name: string
  email: string
  phone: string
  booking_date: string
  number_of_people: number
  special_requests?: string
  status: "pending" | "confirmed" | "cancelled"
  total_price: number
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  created_at: string
}
