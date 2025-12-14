# Troubleshooting Blank Screen

If you're seeing a blank screen, try these steps:

## 1. Check Browser Console
- Open browser DevTools (F12)
- Go to Console tab
- Look for any red error messages
- Share the error message if you see one

## 2. Check the Correct URL
- The dev server might be running on port 3001 instead of 3000
- Try: http://localhost:3001
- Or: http://localhost:3000

## 3. Hard Refresh
- Press Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
- This clears cached files

## 4. Check if Dev Server is Running
- Look at the terminal where you ran `npm run dev`
- You should see: "Local: http://localhost:XXXX"
- Make sure there are no error messages

## 5. Restart Dev Server
```bash
# Stop the server (Ctrl+C)
# Then restart:
cd frontend
npm run dev
```

## 6. Check Network Tab
- Open DevTools (F12)
- Go to Network tab
- Refresh the page
- Check if any files failed to load (red status)

## Common Issues:
- **Port conflict**: Server might be on 3001 instead of 3000
- **JavaScript error**: Check console for errors
- **Missing dependencies**: Run `npm install` in frontend folder
- **Cached files**: Hard refresh the browser

