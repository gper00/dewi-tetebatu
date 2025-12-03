-- Create admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index
CREATE INDEX idx_admin_users_email ON public.admin_users(email);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only authenticated users can read their own data
CREATE POLICY "Admin users can read own data"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = user_email
  );
END;
$$;

-- Insert default admin user (change password after first login!)
-- Password: admin123 (MUST BE CHANGED!)
INSERT INTO public.admin_users (email, full_name, role)
VALUES ('admin@tetebatu.com', 'Admin Tetebatu', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Also need to create this user in Supabase Auth
-- This will be done via the admin panel or manually in Supabase dashboard
