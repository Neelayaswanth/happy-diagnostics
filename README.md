# Happy Diagnostics Center - Website

A modern, full-stack website for Happy Diagnostics Center built with React, Express, and Supabase.

## Features

- 🏠 **Homepage** - Beautiful landing page with hero section, services overview, and features
- 🩺 **Services** - Comprehensive list of diagnostic services
- 📦 **Health Packages** - Various health checkup packages with pricing
- ℹ️ **About Us** - Information about the center, mission, and values
- 📞 **Contact** - Contact form with Supabase integration
- 📱 **Responsive Design** - Mobile-friendly design that works on all devices
- 🎨 **Modern UI** - Clean, professional design with smooth animations

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Backend**: Express.js, Node.js
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS3 with modern design patterns

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies for all projects:**
   ```bash
   npm run install:all
   ```

   Or install separately:
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up Supabase:**

   - Create a new project at [supabase.com](https://supabase.com)
   - Create the following tables:

   **contact_submissions table:**
   ```sql
   CREATE TABLE contact_submissions (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

   **appointments table:**
   ```sql
   CREATE TABLE appointments (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     appointment_date TIMESTAMPTZ NOT NULL,
     service TEXT NOT NULL,
     message TEXT,
     status TEXT DEFAULT 'pending',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

4. **Configure environment variables:**

   **Backend (.env):**
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   ```

   **Frontend (.env):**
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development servers:**

   ```bash
   # Run both frontend and backend concurrently
   npm run dev

   # Or run separately:
   # Frontend (from root)
   npm run dev:frontend

   # Backend (from root)
   npm run dev:backend
   ```

6. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
happy-diagnostics-center/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── config/         # Configuration files
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
├── backend/
│   ├── server.js           # Express server
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## Available Scripts

- `npm run dev` - Run both frontend and backend
- `npm run dev:frontend` - Run frontend only
- `npm run dev:backend` - Run backend only
- `npm run install:all` - Install all dependencies

## Customization

### Update Contact Information

Edit the following files to update contact details:
- `frontend/src/components/Navbar.jsx` - Top bar contact info
- `frontend/src/components/Footer.jsx` - Footer contact info
- `frontend/src/pages/Contact.jsx` - Contact page details

### Update Services and Packages

- Services: `frontend/src/pages/Services.jsx`
- Packages: `frontend/src/pages/Packages.jsx`

### Styling

All styles are in CSS files within each component directory. Main color variables are defined in `frontend/src/index.css`.

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `cd frontend && npm run build`
2. Deploy the `dist` folder

### Backend (Railway/Heroku/Render)
1. Set environment variables
2. Deploy the backend folder
3. Update frontend API URLs for production

## License

ISC

## Support

For support, email info@happydiagnostics.com or contact through the website.


