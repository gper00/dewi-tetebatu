-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
  activity_id UUID REFERENCES public.activities(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can read approved testimonials
CREATE POLICY "testimonials_select_public"
  ON public.testimonials FOR SELECT
  USING (is_approved = true);

-- Users can read their own testimonials
CREATE POLICY "testimonials_select_own"
  ON public.testimonials FOR SELECT
  USING (auth.uid() = user_id);

-- Authenticated users can insert testimonials
CREATE POLICY "testimonials_insert_authenticated"
  ON public.testimonials FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own testimonials (only if not approved yet)
CREATE POLICY "testimonials_update_own"
  ON public.testimonials FOR UPDATE
  USING (auth.uid() = user_id AND is_approved = false);

-- Users can delete their own testimonials (only if not approved yet)
CREATE POLICY "testimonials_delete_own"
  ON public.testimonials FOR DELETE
  USING (auth.uid() = user_id AND is_approved = false);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON public.testimonials(user_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_package_id ON public.testimonials(package_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_activity_id ON public.testimonials(activity_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(is_featured);
