# Supabase Setup Instructions

## Step 1: Create Environment Files

### Frontend Environment File
Create a file named `.env` in the `frontend` folder with the following content:

```env
VITE_SUPABASE_URL=https://uwmsjgfxhwivbowjfeuh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bXNqZ2Z4aHdpdmJvd2pmZXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NzM5MDQsImV4cCI6MjA4MTI0OTkwNH0.SxWTODPAr0vy9nOazJ1bHaFHOX3PWZVmhUXAbhoWBh8
```

### Backend Environment File
Create a file named `.env` in the `backend` folder with the following content:

```env
PORT=5000
SUPABASE_URL=https://uwmsjgfxhwivbowjfeuh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bXNqZ2Z4aHdpdmJvd2pmZXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NzM5MDQsImV4cCI6MjA4MTI0OTkwNH0.SxWTODPAr0vy9nOazJ1bHaFHOX3PWZVmhUXAbhoWBh8
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bXNqZ2Z4aHdpdmJvd2pmZXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NzM5MDQsImV4cCI6MjA4MTI0OTkwNH0.SxWTODPAr0vy9nOazJ1bHaFHOX3PWZVmhUXAbhoWBh8
```

**Note:** For production, you should get the service_role key from Supabase Dashboard > Settings > API > service_role key (this has admin privileges and should be kept secret).

## Step 2: Set Up Database Tables

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to SQL Editor
4. Copy and paste the contents of `supabase-schema.sql` file
5. Click "Run" to execute the SQL

This will create:
- `contact_submissions` table
- `appointments` table
- Required indexes and security policies

## Step 3: Restart Development Servers

After creating the `.env` files, restart your development servers:

```bash
# Stop any running servers (Ctrl+C)
# Then restart:

# From root directory:
npm run dev

# Or separately:
# Terminal 1 - Backend:
cd backend
npm run dev

# Terminal 2 - Frontend:
cd frontend
npm run dev
```

## Step 4: Verify Connection

1. Open your browser to http://localhost:3000
2. Go to the Contact page
3. Fill out and submit the contact form
4. Check your Supabase Dashboard > Table Editor > contact_submissions to see if the data was saved

## Troubleshooting

- If you see errors about Supabase connection, make sure:
  - The `.env` files are in the correct folders (frontend/.env and backend/.env)
  - You've restarted the dev servers after creating the .env files
  - The Supabase URL and keys are correct (no extra spaces)
  - The database tables have been created in Supabase

