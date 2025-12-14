# How to Restart Backend Server

## The Issue
The backend server is running but doesn't have the `/api/auth/signup` and `/api/auth/login` routes registered. This means the server is running an old version of the code.

## Solution: Restart the Backend Server

### Step 1: Stop the Current Server
1. Go to the terminal where the backend is running
2. Press `Ctrl + C` to stop the server

### Step 2: Restart the Server
```bash
cd backend
npm run dev
```

Or if using `node` directly:
```bash
cd backend
node server.js
```

### Step 3: Verify Routes are Loaded
You should see in the console:
```
🚀 Server is running on http://localhost:5000
📡 API endpoints available at http://localhost:5000/api
✅ Supabase client initialized successfully
```

### Step 4: Test the Endpoint
After restarting, try signing up again. The routes should now be available.

## Alternative: Check if Server Auto-Reloads
If you're using `npm run dev` with `--watch`, the server should auto-reload when files change. But sometimes you need to manually restart.

## Still Not Working?
1. Check that `backend/server.js` has the routes:
   - Line ~185: `app.post('/api/auth/signup', ...)`
   - Line ~268: `app.post('/api/auth/login', ...)`

2. Check backend terminal for any error messages

3. Verify the server is actually running the latest code by checking the console output

