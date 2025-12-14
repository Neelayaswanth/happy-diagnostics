-- Fix Row Level Security Policies for Admin Operations
-- Run this in your Supabase SQL Editor to allow admin to update bookings

-- Drop existing update policy if it exists
DROP POLICY IF EXISTS "Allow admin update bookings" ON bookings;

-- Create policy to allow updates (for admin panel)
-- This allows both anon and authenticated users to update
-- In production, you should restrict this to authenticated admin users only
CREATE POLICY "Allow admin update bookings"
  ON bookings
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Also allow updates to payments if needed
DROP POLICY IF EXISTS "Allow admin update payments" ON payments;

CREATE POLICY "Allow admin update payments"
  ON payments
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Verify the policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('bookings', 'payments')
ORDER BY tablename, policyname;

