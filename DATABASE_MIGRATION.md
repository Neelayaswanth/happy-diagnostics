# Database Migration Guide

## Updating Users Table for Password Authentication

Since we've changed from OTP-based authentication to password-based authentication, you need to update your database schema.

### Step 1: Add password_hash column to users table

Run this SQL in your Supabase SQL Editor:

```sql
-- Add password_hash column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Make password_hash required for new users (optional: you can keep it nullable for existing users)
-- If you want to make it required, uncomment the line below:
-- ALTER TABLE users ALTER COLUMN password_hash SET NOT NULL;
```

### Step 2: Update existing users (if any)

If you have existing users without passwords, they will need to sign up again or you can set temporary passwords. For existing users, you can:

1. Ask them to use the "Sign Up" option to set a password
2. Or manually set passwords for them (not recommended for production)

### Step 3: Verify the schema

Run this query to verify the users table structure:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

You should see:
- `id` (bigint)
- `mobile` (text)
- `password_hash` (text) - **NEW**
- `name` (text)
- `email` (text)
- `created_at` (timestamptz)

### Important Notes

- **Existing users**: Users who signed up with OTP will need to sign up again with a password
- **Password security**: Passwords are hashed using bcrypt before storage
- **Migration**: This is a breaking change - existing OTP-based sessions will not work

