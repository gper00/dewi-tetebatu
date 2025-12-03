-- Create activities table
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('akan', 'sedang', 'selesai')),
  date DATE NOT NULL,
  duration TEXT NOT NULL,
  price DECIMAL(10, 2) DEFAULT 0,
  location TEXT NOT NULL,
  image_url TEXT,
  highlights TEXT[],
  includes TEXT[],
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Public read access for activities
CREATE POLICY "activities_select_public"
  ON public.activities FOR SELECT
  USING (true);

-- Create index for slug and status lookups
CREATE INDEX IF NOT EXISTS idx_activities_slug ON public.activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_status ON public.activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_date ON public.activities(date);
