# Troubleshooting Signup and Login Issues

## Common Issues and Solutions

### 1. "User with this mobile number already exists" (Signup)

**Problem:** You're trying to sign up with a mobile number that's already registered.

**Solution:**
- Use the "Login" option instead of "Sign Up"
- Or use a different mobile number

### 2. "Invalid mobile number or password" (Login)

**Possible causes:**
- Wrong mobile number
- Wrong password
- User doesn't exist in database
- User exists but doesn't have a password_hash set

**Solutions:**
- Double-check your mobile number and password
- Try signing up again if you haven't set a password yet
- Check the database to see if your user exists

### 3. "Failed to create user account" or "Failed to fetch user"

**Possible causes:**
- Database connection issue
- Missing `password_hash` column in users table
- Supabase credentials not configured correctly

**Solutions:**

1. **Check if password_hash column exists:**
   - Go to Supabase Dashboard → SQL Editor
   - Run this query:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'users';
   ```
   - You should see `password_hash` in the list
   - If not, run this:
   ```sql
   ALTER TABLE users ADD COLUMN password_hash TEXT;
   ```

2. **Verify Supabase connection:**
   - Check `backend/.env` file exists and has correct values:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   - Restart the backend server after updating .env

3. **Check backend server is running:**
   - Look for: `🚀 Server is running on http://localhost:5000`
   - If not running, start it: `cd backend && npm run dev`

### 4. "Validation failed" errors

**Problem:** Input validation is failing.

**Solutions:**
- Mobile number must be exactly 10 digits
- Password must be at least 6 characters
- Name is required for signup
- Email is optional but must be valid format if provided

### 5. Network/CORS errors

**Problem:** Frontend can't reach backend API.

**Solutions:**
- Ensure backend is running on port 5000
- Check `frontend/vite.config.js` has proxy configuration:
  ```js
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
  ```
- Try accessing backend directly: http://localhost:5000/api/health

### 6. Database Migration Required

If you're upgrading from OTP to password authentication:

1. **Add password_hash column:**
   ```sql
   ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
   ```

2. **For existing users without passwords:**
   - They need to sign up again with a password
   - Or you can manually set passwords (not recommended)

## Testing the Authentication

### Test Signup:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "mobile": "9876543210",
    "password": "test123",
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### Test Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mobile": "9876543210",
    "password": "test123"
  }'
```

## Check Backend Logs

Look at the backend terminal output for:
- Error messages
- Database connection status
- Request logs

## Check Browser Console

Open browser DevTools (F12) and check:
- Network tab for failed API requests
- Console tab for JavaScript errors
- Application tab → Local Storage for stored user data

