-- Create packages table
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  rating DECIMAL(2, 1) DEFAULT 5.0,
  image_url TEXT,
  highlights TEXT[],
  includes TEXT[],
  excludes TEXT[],
  itinerary JSONB,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Public read access for packages
CREATE POLICY "packages_select_public"
  ON public.packages FOR SELECT
  USING (true);

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_packages_slug ON public.packages(slug);
CREATE INDEX IF NOT EXISTS idx_packages_category ON public.packages(category);
