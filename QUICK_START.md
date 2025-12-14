# Quick Start Guide - Happy Diagnostics Center

## ✅ Supabase Connection Complete!

Your Supabase credentials have been configured:
- **Project URL**: https://uwmsjgfxhwivbowjfeuh.supabase.co
- **Frontend .env**: Created ✓
- **Backend .env**: Created ✓

## Next Steps:

### 1. Set Up Database Tables

You need to create the database tables in Supabase:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Open the file `supabase-schema.sql` from this project
5. Copy all the SQL code
6. Paste it into the SQL Editor
7. Click **Run** (or press Ctrl+Enter)

This will create:
- `contact_submissions` table
- `appointments` table
- Security policies for public access

### 2. Start the Development Servers

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
You should see: `🚀 Server is running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
You should see: `Local: http://localhost:3000`

### 3. Test the Connection

1. Open http://localhost:3000 in your browser
2. Navigate to the **Contact** page
3. Fill out and submit the contact form
4. Go to your Supabase Dashboard → **Table Editor** → `contact_submissions`
5. You should see your test submission!

## Troubleshooting

### If the frontend shows a black screen:
- Make sure both servers are running
- Check browser console (F12) for errors
- Try hard refresh: Ctrl+Shift+R

### If contact form doesn't save:
- Verify tables are created in Supabase
- Check backend terminal for errors
- Verify .env files are in correct locations:
  - `frontend/.env`
  - `backend/.env`

### If you see Supabase connection errors:
- Restart both servers after creating .env files
- Verify the credentials in .env files match your Supabase dashboard
- Check that Row Level Security policies are set up correctly

## Need Help?

Check the `SETUP_INSTRUCTIONS.md` file for detailed setup information.

