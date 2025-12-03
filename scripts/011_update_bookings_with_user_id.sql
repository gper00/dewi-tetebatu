-- Add user_id to bookings table
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for user_id
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);

-- Update RLS policies for bookings
DROP POLICY IF EXISTS "bookings_select_own" ON public.bookings;
CREATE POLICY "bookings_select_own"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = user_id OR
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Users can insert bookings with their user_id
DROP POLICY IF EXISTS "bookings_insert_public" ON public.bookings;
CREATE POLICY "bookings_insert_authenticated"
  ON public.bookings FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR
    user_id IS NULL
  );
