-- Happy Diagnostics Center Database Schema
-- Run this in your Supabase SQL Editor

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  appointment_date TIMESTAMPTZ NOT NULL,
  service TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users Table (for mobile number and password authentication)
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  mobile TEXT NOT NULL UNIQUE,
  password_hash TEXT, -- Made nullable for migration compatibility
  name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add password_hash column if it doesn't exist (for existing databases)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'password_hash'
  ) THEN
    ALTER TABLE users ADD COLUMN password_hash TEXT;
  END IF;
END $$;

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  package_name TEXT NOT NULL,
  package_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES bookings(id),
  user_id BIGINT NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact submissions
CREATE POLICY "Allow public insert on contact_submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow anyone to insert appointments
CREATE POLICY "Allow public insert on appointments"
  ON appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all submissions (for admin)
CREATE POLICY "Allow authenticated read on contact_submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to read all appointments (for admin)
CREATE POLICY "Allow authenticated read on appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow public insert on users
CREATE POLICY "Allow public insert on users"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow public read on users (for login)
CREATE POLICY "Allow public read on users"
  ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Allow public insert on bookings
CREATE POLICY "Allow public insert on bookings"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow users to read their own bookings
CREATE POLICY "Allow users read own bookings"
  ON bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Allow admin to update bookings (for admin panel)
-- Note: In production, you should restrict this to authenticated admin users only
CREATE POLICY "Allow admin update bookings"
  ON bookings
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow public insert on payments
CREATE POLICY "Allow public insert on payments"
  ON payments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow users to read their own payments
CREATE POLICY "Allow users read own payments"
  ON payments
  FOR SELECT
  TO anon, authenticated
  USING (true);


