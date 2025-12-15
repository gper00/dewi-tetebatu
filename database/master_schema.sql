-- MASTER SCHEMA FOR DEWI TETEBATU
-- Includes: Tables, RBAC (Admin/User), RLS Policies, Triggers

-- 1. CLEANUP (Drop existing tables to ensure clean slate)
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.gallery_images CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.packages CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 2. USERS TABLE (Linked to auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. PACKAGES TABLE
CREATE TABLE public.packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  duration TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'hard')),
  category TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  doc_includes TEXT[] DEFAULT '{}', -- renamed from 'includes' to avoid keyword conflict if any, but 'includes' is fine in Postgres. using 'included' in previous schemas. let's stick to 'included'.
  included TEXT[] DEFAULT '{}',
  excluded TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- 4. ACTIVITIES TABLE
CREATE TABLE public.activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  category TEXT,
  duration TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  location TEXT,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  included TEXT[] DEFAULT '{}',
  excluded TEXT[] DEFAULT '{}',
  max_participants INTEGER,
  status TEXT DEFAULT 'akan' CHECK (status IN ('akan', 'sedang', 'selesai')),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- 5. BLOG POSTS TABLE
CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT, -- Main image
  image_url TEXT, -- Keeping both for compatibility or preference, usually one is enough. Let's alias logic in code.
  images TEXT[] DEFAULT '{}',
  category TEXT,
  author TEXT,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  read_time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 6. GALLERY IMAGES TABLE
CREATE TABLE public.gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- 7. TESTIMONIALS TABLE
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 8. CONTACT MESSAGES TABLE
CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 9. BOOKINGS TABLE
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Optional, for registered users
  item_type TEXT CHECK (item_type IN ('package', 'activity')),
  item_id UUID, -- References package or activity ID
  item_title TEXT, -- Snapshot of item title
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  booking_date DATE NOT NULL,
  number_of_people INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;


-- 10. FUNCTIONS & TRIGGERS

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Trigger to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    'user', -- Default role
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 11. RLS POLICIES

-- USERS
CREATE POLICY "Users view own data" ON public.users FOR SELECT USING (id = auth.uid());
CREATE POLICY "Admins view all users" ON public.users FOR SELECT USING (public.is_admin());
CREATE POLICY "Users update own data" ON public.users FOR UPDATE USING (id = auth.uid());
-- Note: Signup insert is handled by Trigger/Supabase Service Role usually, but if client inserts:
-- CREATE POLICY "Users insert own data" ON public.users FOR INSERT WITH CHECK (id = auth.uid());

-- PACKAGES (Public Read, Admin Write)
CREATE POLICY "Public read active packages" ON public.packages FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage packages" ON public.packages FOR ALL USING (public.is_admin());

-- ACTIVITIES (Public Read, Admin Write)
CREATE POLICY "Public read active activities" ON public.activities FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage activities" ON public.activities FOR ALL USING (public.is_admin());

-- BLOG POSTS (Public Read, Admin Write)
CREATE POLICY "Public read published posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins manage posts" ON public.blog_posts FOR ALL USING (public.is_admin());

-- GALLERY (Public Read, Admin Write)
CREATE POLICY "Public read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery_images FOR ALL USING (public.is_admin());

-- TESTIMONIALS (Public Read Approved, Users Insert, Admin Manage)
CREATE POLICY "Public read approved testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Anyone insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin());

-- CONTACT MESSAGES (Anyone Insert, Admins View)
CREATE POLICY "Anyone insert contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage contact" ON public.contact_messages FOR ALL USING (public.is_admin());

-- BOOKINGS (Users View Own, Admins Manage)
CREATE POLICY "Users view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id OR customer_email = (select email from auth.users where id = auth.uid()));
CREATE POLICY "Admins manage bookings" ON public.bookings FOR ALL USING (public.is_admin());
CREATE POLICY "Users insert bookings" ON public.bookings FOR INSERT WITH CHECK (true); -- Allow guest bookings too


-- STORAGE (If utilizing Supabase Storagebuckets 'images', 'avatars')
-- Attempt to create buckets if not exists (Requires extension/admin privs usually done in dashboard, but can try via SQL if enabled)
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;

-- Storage Policies (Simplified)
CREATE POLICY "Public view images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admins manage images" ON storage.objects FOR ALL USING (bucket_id = 'images' AND public.is_admin());
