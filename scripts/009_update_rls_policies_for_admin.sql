-- Update RLS policies to work with unified users table
-- This script updates all tables to allow admin access

-- Drop old is_admin function that used email parameter
DROP FUNCTION IF EXISTS public.is_admin(text);

-- Create new is_admin function for unified users table with role check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Packages: Admin can do everything
DROP POLICY IF EXISTS "packages_select_public" ON public.packages;
DROP POLICY IF EXISTS "Anyone can view available packages" ON public.packages;
DROP POLICY IF EXISTS "Admin can insert packages" ON public.packages;
DROP POLICY IF EXISTS "Admin can update packages" ON public.packages;
DROP POLICY IF EXISTS "Admin can delete packages" ON public.packages;

-- Updated to use new is_admin() function
CREATE POLICY "Anyone can view available packages"
  ON public.packages
  FOR SELECT
  USING (available = true OR public.is_admin());

CREATE POLICY "Admin can insert packages"
  ON public.packages
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update packages"
  ON public.packages
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can delete packages"
  ON public.packages
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Activities: Admin can do everything
DROP POLICY IF EXISTS "activities_select_public" ON public.activities;
DROP POLICY IF EXISTS "Anyone can view activities" ON public.activities;
DROP POLICY IF EXISTS "Admin can insert activities" ON public.activities;
DROP POLICY IF EXISTS "Admin can update activities" ON public.activities;
DROP POLICY IF EXISTS "Admin can delete activities" ON public.activities;

-- Updated to use new is_admin() function
CREATE POLICY "Anyone can view activities"
  ON public.activities
  FOR SELECT
  USING (true);

CREATE POLICY "Admin can insert activities"
  ON public.activities
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update activities"
  ON public.activities
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can delete activities"
  ON public.activities
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Blog Posts: Admin can do everything
DROP POLICY IF EXISTS "blog_posts_select_public" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can delete blog posts" ON public.blog_posts;

-- Updated to use new is_admin() function
CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts
  FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admin can insert blog posts"
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update blog posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can delete blog posts"
  ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Bookings: Admin can view all and users can view their own
DROP POLICY IF EXISTS "bookings_select_public" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view own bookings or admin can view all" ON public.bookings;
DROP POLICY IF EXISTS "Admin can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin can delete bookings" ON public.bookings;

-- Updated to use new is_admin() function
CREATE POLICY "Anyone can insert bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own bookings or admin can view all"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR 
    public.is_admin()
  );

CREATE POLICY "Admin can update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can delete bookings"
  ON public.bookings
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Contact Messages: Admin can view and manage all
DROP POLICY IF EXISTS "contact_messages_select_public" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can submit contact message" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can view all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can delete contact messages" ON public.contact_messages;

-- Updated to use new is_admin() function
CREATE POLICY "Anyone can submit contact message"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can view all contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (public.is_admin());
