# Supabase Phone OTP Setup Guide

This guide will help you configure Supabase to send real-time OTP via SMS to users' phone numbers.

## Prerequisites

1. A Supabase project (already set up)
2. Supabase project URL and anon key (already configured in `.env`)

## Step 1: Enable Phone Authentication in Supabase

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Find **Phone** in the list of providers
5. Enable the **Phone** provider
6. Configure the following settings:
   - **Enable phone provider**: Toggle ON
   - **Confirm phone**: Toggle ON (recommended for production)

## Step 2: Configure SMS Provider

Supabase uses Twilio by default for SMS delivery. You have two options:

### Option A: Use Twilio (Recommended for Production)

1. Sign up for a Twilio account: https://www.twilio.com
2. Get your Twilio credentials:
   - Account SID
   - Auth Token
   - Phone Number (Twilio phone number)
3. In Supabase Dashboard:
   - Go to **Settings** → **Auth** → **SMS**
   - Enter your Twilio credentials
   - Save the configuration

### Option B: Use Supabase's Test Mode (For Development)

For testing purposes, Supabase provides a test mode where OTPs are logged in the dashboard:

1. In Supabase Dashboard:
   - Go to **Settings** → **Auth** → **SMS**
   - Enable **Test Mode** (for development only)
   - In test mode, OTPs will appear in the Supabase logs instead of being sent via SMS

## Step 3: Configure Phone Number Format

The application currently uses **India (+91)** as the default country code. To change this:

1. Open `frontend/src/pages/Login.jsx`
2. Find the `formatPhoneNumber` function
3. Change `+91` to your desired country code (e.g., `+1` for US, `+44` for UK)

Example:
```javascript
const formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `+1${digits}` // US country code
  }
  // ... rest of the function
}
```

## Step 4: Test the OTP Flow

1. Start your frontend: `cd frontend && npm run dev`
2. Navigate to the login page
3. Enter a 10-digit phone number
4. Click "Send OTP"
5. Check:
   - **If using Twilio**: Check your phone for SMS
   - **If using Test Mode**: Check Supabase Dashboard → **Logs** → **Auth Logs** for the OTP

## Step 5: Verify Environment Variables

Make sure your `.env` file in the `frontend` directory has:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

### OTP Not Received

1. **Check Supabase Logs**: Go to Supabase Dashboard → **Logs** → **Auth Logs** to see if there are any errors
2. **Verify Phone Format**: Ensure the phone number is in E.164 format (e.g., +919876543210)
3. **Check Twilio Balance**: If using Twilio, ensure you have sufficient credits
4. **Test Mode**: For development, use test mode to see OTPs in logs

### "Invalid phone number" Error

- Ensure the phone number is in the correct format
- Check that the country code is correct
- Verify that phone authentication is enabled in Supabase

### "OTP verification failed" Error

- Ensure you're entering the correct 6-digit OTP
- Check that the OTP hasn't expired (OTPs expire after a few minutes)
- Verify the OTP in Supabase logs if using test mode

## Production Considerations

1. **Rate Limiting**: Supabase has rate limits for OTP sending. Consider implementing your own rate limiting for production.
2. **Cost**: SMS delivery via Twilio has costs. Monitor your usage in the Twilio dashboard.
3. **Security**: Always use HTTPS in production to protect user data.
4. **Error Handling**: Implement proper error messages for users when OTP fails.

## Additional Resources

- [Supabase Phone Auth Documentation](https://supabase.com/docs/guides/auth/phone-login)
- [Twilio Documentation](https://www.twilio.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/reference/javascript/auth-signinwithotp)

