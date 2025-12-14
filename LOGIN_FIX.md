# Login "Failed to Fetch" Error - Fix Guide

## Problem
Login shows "Failed to fetch" error because the backend API server isn't deployed or accessible.

## Root Cause
The frontend is deployed to Netlify, but the backend (Express server) is not. When you try to login, the frontend tries to call `http://localhost:5000/api/auth/login`, which doesn't exist in production.

## Solutions

### Option 1: Deploy Backend (Recommended for Production)

1. **Deploy Backend to a Hosting Service:**
   - **Render** (Free tier available): https://render.com
   - **Railway**: https://railway.app
   - **Heroku**: https://heroku.com
   - **Fly.io**: https://fly.io

2. **After Deploying Backend:**
   - Get your backend URL (e.g., `https://happy-diagnostics-backend.railway.app`)
   - Go to Netlify Dashboard → Site settings → Environment variables
   - Add: `VITE_API_URL=https://your-backend-url.com`
   - Redeploy your frontend

3. **Backend Environment Variables:**
   Make sure your backend has these environment variables set:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   PORT=5000
   ```

### Option 2: Test Locally (For Development)

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Test Login:**
   - Open http://localhost:3000
   - Login should work now

### Option 3: Quick Backend Deployment (Railway Example)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Deploy:**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Set Environment Variables in Railway:**
   - SUPABASE_URL
   - SUPABASE_SERVICE_KEY
   - PORT (defaults to 5000)

5. **Get Backend URL:**
   - Railway will provide a URL like `https://your-project.railway.app`
   - Add this to Netlify as `VITE_API_URL`

## Current Status

✅ **Fixed:**
- Login page now uses environment variables for API URL
- Better error messages
- Works in development mode (localhost)

⚠️ **Needs Action:**
- Deploy backend to a hosting service
- Set `VITE_API_URL` in Netlify environment variables

## Testing

After deploying backend:
1. Check backend is running: Visit `https://your-backend-url.com/api/health`
2. Should see: `{"status":"ok","message":"Happy Diagnostics Center API is running"}`
3. Try login on your Netlify site
4. Should work now!

## Need Help?

If you're still having issues:
1. Check browser console for detailed error messages
2. Verify backend is accessible (test the `/api/health` endpoint)
3. Check CORS settings in backend (should allow your Netlify domain)
4. Verify environment variables are set correctly

