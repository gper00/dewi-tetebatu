-- Function to increment activity participants
CREATE OR REPLACE FUNCTION increment_activity_participants(
  activity_id uuid,
  increment_by integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE activities
  SET current_participants = current_participants + increment_by
  WHERE id = activity_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_activity_participants TO authenticated;
GRANT EXECUTE ON FUNCTION increment_activity_participants TO anon;
