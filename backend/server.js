import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Warning: Supabase credentials not found. Some features may not work.')
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

if (supabase) {
  console.log('✅ Supabase client initialized successfully')
} else {
  console.warn('⚠️  Supabase client not initialized. Check your .env file.')
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Happy Diagnostics Center API is running' })
})

// Contact form submission
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { name, email, phone, subject, message } = req.body

      // Insert into Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name,
            email,
            phone,
            subject,
            message,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ error: 'Failed to save contact submission' })
      }

      res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: data[0],
      })
    } catch (error) {
      console.error('Server error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

// Get contact submissions (admin endpoint - should be protected in production)
app.get('/api/contact', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch contact submissions' })
    }

    res.json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Appointment booking (placeholder for future implementation)
app.post(
  '/api/appointments',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('service').trim().notEmpty().withMessage('Service is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { name, email, phone, date, service, message } = req.body

      // Insert into Supabase
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            name,
            email,
            phone,
            appointment_date: date,
            service,
            message: message || '',
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ error: 'Failed to book appointment' })
      }

      res.status(201).json({
        success: true,
        message: 'Appointment booked successfully',
        data: data[0],
      })
    } catch (error) {
      console.error('Server error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

// Get appointments (admin endpoint)
app.get('/api/appointments', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch appointments' })
    }

    res.json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// User Signup endpoint
app.post(
  '/api/auth/signup',
  [
    body('mobile').trim().isLength({ min: 10, max: 10 }).withMessage('Valid 10-digit mobile number required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      if (!supabase) return res.status(500).json({ error: 'Supabase not initialized' })

      const { mobile, password, name, email } = req.body

      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('mobile', mobile)
        .single()

      // If user exists (and it's not a "not found" error)
      if (existingUser) {
        return res.status(400).json({ error: 'User with this mobile number already exists' })
      }

      // If error is not "not found", it's a real error
      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing user:', checkError)
        return res.status(500).json({ error: 'Failed to check user existence' })
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10)

      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{
          mobile: mobile,
          password_hash: passwordHash,
          name: name || null,
          email: email || null,
          created_at: new Date().toISOString()
        }])
        .select('id, mobile, name, email, created_at')
        .single()

      if (createError) {
        console.error('Error creating user:', createError)
        // Provide more detailed error message
        if (createError.code === '23505') { // Unique constraint violation
          return res.status(400).json({ error: 'User with this mobile number already exists' })
        }
        if (createError.code === '42703') { // Column doesn't exist
          return res.status(500).json({ 
            error: 'Database schema error: password_hash column not found. Please run the database migration.' 
          })
        }
        return res.status(500).json({ 
          error: 'Failed to create user account',
          details: createError.message 
        })
      }

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        user: newUser
      })
    } catch (error) {
      console.error('Error in signup:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

// User Login endpoint
app.post(
  '/api/auth/login',
  [
    body('mobile').trim().isLength({ min: 10, max: 10 }).withMessage('Valid 10-digit mobile number required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      if (!supabase) return res.status(500).json({ error: 'Supabase not initialized' })

      const { mobile, password } = req.body

      // Find user by mobile number
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('mobile', mobile)
        .single()

      // If user not found or other error
      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // User not found
          return res.status(401).json({ error: 'Invalid mobile number or password' })
        }
        console.error('Error fetching user:', fetchError)
        return res.status(500).json({ error: 'Failed to fetch user' })
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid mobile number or password' })
      }

      // Check if user has a password hash (for existing users who might not have one)
      if (!user.password_hash) {
        return res.status(401).json({ 
          error: 'This account does not have a password set. Please sign up again to set a password.' 
        })
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash)

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid mobile number or password' })
      }

      // Return user data (excluding password hash)
      const { password_hash, ...userData } = user

      res.json({
        success: true,
        message: 'Login successful',
        user: userData
      })
    } catch (error) {
      console.error('Error in login:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

// Admin API Routes
app.get('/api/admin/stats', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    // Get all stats
    const [bookings, payments, users, contacts] = await Promise.all([
      supabase.from('bookings').select('*'),
      supabase.from('payments').select('*'),
      supabase.from('users').select('*'),
      supabase.from('contact_submissions').select('*'),
    ])

    const totalRevenue = payments.data?.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0) || 0
    const pendingBookings = bookings.data?.filter(b => b.status === 'pending').length || 0

    res.json({
      success: true,
      stats: {
        totalBookings: bookings.data?.length || 0,
        pendingBookings,
        totalRevenue,
        totalUsers: users.data?.length || 0,
        totalPayments: payments.data?.length || 0,
        totalContacts: contacts.data?.length || 0,
      },
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// Get all bookings (admin)
app.get('/api/admin/bookings', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        users (
          mobile,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

// Update booking status (admin)
app.patch('/api/admin/bookings/:id/status', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    const { id } = req.params
    const { status } = req.body

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error updating booking:', error)
    res.status(500).json({ error: 'Failed to update booking' })
  }
})

// Get all payments (admin)
app.get('/api/admin/payments', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        bookings (
          package_name
        ),
        users (
          mobile,
          name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching payments:', error)
    res.status(500).json({ error: 'Failed to fetch payments' })
  }
})

// Get all contact submissions (admin)
app.get('/api/admin/contacts', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ error: 'Failed to fetch contacts' })
  }
})

// Get all users (admin)
app.get('/api/admin/users', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Update user profile
app.patch('/api/users/:id', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Database not configured' })
    }

    const { id } = req.params
    const { name, email, mobile } = req.body

    // Validate mobile if provided
    if (mobile && mobile.length !== 10) {
      return res.status(400).json({ error: 'Mobile number must be 10 digits' })
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const updateData = {}
    if (name !== undefined) updateData.name = name || null
    if (email !== undefined) updateData.email = email || null
    if (mobile !== undefined) updateData.mobile = mobile

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Failed to update user profile' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
})


