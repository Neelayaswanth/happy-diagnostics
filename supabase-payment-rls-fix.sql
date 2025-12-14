-- Add RLS policy for updating payments (admin functionality)
-- Run this in your Supabase SQL Editor

-- Policy: Allow admin to update payments (for admin panel)
CREATE POLICY "Allow admin update payments"
  ON payments
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

