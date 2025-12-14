# Quick Fix for Signup/Login Issues

## Step 1: Verify Database Schema

Run this SQL in your Supabase SQL Editor to ensure the `password_hash` column exists:

```sql
-- Check if password_hash column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'password_hash';

-- If it doesn't exist, add it:
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
```

## Step 2: Verify Backend is Running

1. Check if backend is running on port 5000:
   - Look for: `🚀 Server is running on http://localhost:5000`
   - If not, start it: `cd backend && npm run dev`

2. Test the health endpoint:
   - Open: http://localhost:5000/api/health
   - Should return: `{"status":"ok","message":"Happy Diagnostics Center API is running"}`

## Step 3: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to sign up or login
4. Look for the API request:
   - Should be: `POST /api/auth/signup` or `POST /api/auth/login`
   - Check the response status and body

## Step 4: Common Error Messages

### "User with this mobile number already exists"
- **Solution:** Use Login instead of Sign Up, or use a different mobile number

### "Invalid mobile number or password"
- **Solution:** 
  - Check mobile number is exactly 10 digits
  - Check password is correct
  - If user exists but has no password, sign up again

### "Database schema error: password_hash column not found"
- **Solution:** Run the SQL migration from Step 1

### "Failed to fetch" or Network Error
- **Solution:**
  - Ensure backend is running
  - Check `frontend/vite.config.js` has proxy configuration
  - Restart both frontend and backend servers

## Step 5: Test with cURL (Optional)

Test signup:
```bash
curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d "{\"mobile\":\"9876543210\",\"password\":\"test123\",\"name\":\"Test User\"}"
```

Test login:
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"mobile\":\"9876543210\",\"password\":\"test123\"}"
```

## Still Not Working?

1. Check backend terminal for error messages
2. Check browser console for JavaScript errors
3. Verify `.env` files are correct in both `frontend` and `backend` folders
4. Restart both servers after making changes

