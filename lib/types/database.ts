// Updated Database Types for Dewi Tetebatu

export type Package = {
  id: string
  slug: string
  title: string
  description: string
  short_description: string | null
  price: number
  duration: string
  difficulty: 'mudah' | 'sedang' | 'sulit'
  category: string
  rating: number
  image_url: string | null
  gallery_images: string[]
  highlights: string[]
  includes: string[]
  excludes: string[]
  itinerary: any
  is_featured: boolean
  available: boolean
  created_at: string
  updated_at: string
}

export type Activity = {
  id: string
  slug: string
  title: string
  description: string
  short_description: string | null
  status: 'akan' | 'sedang' | 'selesai'
  date: string
  duration: string
  price: number
  location: string
  image_url: string | null
  gallery_images: string[]
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

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

export type Testimonial = {
  id: string
  name: string
  role: string | null
  comment: string
  rating: number
  image_url: string | null
  package_id: string | null
  activity_id: string | null
  approved: boolean
  created_at: string
}

export type GalleryImage = {
  id: string
  title: string
  description: string | null
  image_url: string
  category: string
  package_id: string | null
  activity_id: string | null
  featured: boolean
  created_at: string
}

export type Setting = {
  key: string
  value: string
  type: 'string' | 'number' | 'boolean' | 'json'
  description: string | null
  updated_at: string
}

export type User = {
  id: string
  email: string
  name: string
  phone: string | null
  avatar_url: string | null
  email_verified: boolean
  created_at: string
  updated_at: string
}

export type AdminUser = {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
  active: boolean
  last_login: string | null
  created_at: string
  updated_at: string
}

export type Booking = {
  id: string
  user_id: string
  package_id: string | null
  activity_id: string | null
  booking_type: 'package' | 'activity'
  participants: number
  booking_date: string
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  customer_info: any
  special_requests: string | null
  created_at: string
  updated_at: string
}
