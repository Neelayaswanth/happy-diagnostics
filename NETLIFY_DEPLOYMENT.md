# Netlify Deployment Guide

## Quick Fix for 404 Errors

The site is now configured with:
- `netlify.toml` - Build configuration
- `frontend/public/_redirects` - SPA routing redirects

## Netlify Configuration Steps

### 1. Build Settings in Netlify Dashboard

Go to your Netlify site settings and configure:

**Build command:**
```
cd frontend && npm install && npm run build
```

**Publish directory:**
```
frontend/dist
```

**OR** - The `netlify.toml` file should handle this automatically if you're deploying from GitHub.

### 2. Environment Variables

Add these environment variables in Netlify Dashboard → Site settings → Environment variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Deploy

If you've already connected to GitHub:
- Push the latest changes (with `netlify.toml` and `_redirects` files)
- Netlify will automatically rebuild
- The 404 errors should be fixed

### 4. Verify

After deployment, test these URLs:
- https://happylabs.netlify.app/
- https://happylabs.netlify.app/services
- https://happylabs.netlify.app/packages
- https://happylabs.netlify.app/about
- https://happylabs.netlify.app/contact

All routes should work now!

## Troubleshooting

### Still getting 404?

1. **Check Build Logs**: Make sure the build is successful
2. **Verify `_redirects` file**: Should be in `frontend/public/_redirects` and will be copied to `dist` during build
3. **Clear Netlify Cache**: Site settings → Build & deploy → Clear cache and retry deploy
4. **Check `netlify.toml`**: Make sure it's in the root of your repository

### Backend API Issues

**IMPORTANT:** The backend (Express server) needs to be deployed separately. Netlify only hosts the frontend.

**Current Issue:** Login/authentication will fail with "Failed to fetch" because the backend isn't deployed.

**Solutions:**

1. **Deploy Backend Separately** (Recommended):
   - Deploy backend to Render, Railway, Heroku, or similar
   - Get the backend URL (e.g., `https://your-backend.railway.app`)
   - Add environment variable in Netlify: `VITE_API_URL=https://your-backend.railway.app`
   - Redeploy frontend

2. **Quick Test (Local Development Only)**:
   - Run backend locally: `cd backend && npm run dev`
   - Frontend will connect to `http://localhost:5000` automatically in dev mode

3. **Use Netlify Functions** (Alternative):
   - Convert Express routes to Netlify Functions
   - More complex but keeps everything in one place

## Current Setup

- ✅ Frontend: React + Vite (deployed to Netlify)
- ⚠️ Backend: Express (needs separate deployment)
- ✅ Database: Supabase (cloud-hosted)

