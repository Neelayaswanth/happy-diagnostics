import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Phone, Lock, ArrowLeft, AlertCircle, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Form submitted:', { mobile, passwordLength: password.length, isSignup, name })
    
    if (!mobile || mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (isSignup && !name) {
      setError('Please enter your name')
      return
    }

    setError('')
    setLoading(true)

    try {
      // Get API base URL from environment or use localhost in development
      const apiBaseUrl = import.meta.env.DEV 
        ? 'http://localhost:5000' 
        : (import.meta.env.VITE_API_URL || '')
      
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login'
      const apiUrl = apiBaseUrl ? `${apiBaseUrl}${endpoint}` : endpoint
      
      console.log('Making API request to:', apiUrl)
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile,
          password,
          ...(isSignup && { name, email })
        }),
      })

      console.log('API Response status:', response.status)
      
      // Check if response is HTML (404 page) instead of JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response received:', text.substring(0, 200))
        throw new Error(`Server returned ${response.status}. Backend may not be running or endpoint not found.`)
      }
      
      const data = await response.json()
      console.log('API Response data:', data)

      if (!response.ok) {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => err.msg || err.message).join(', ')
          throw new Error(errorMessages || 'Validation failed')
        }
        throw new Error(data.error || 'Authentication failed')
      }

      if (data.success && data.user) {
        // Login user with our auth context
        login(data.user)

        // Redirect to the page they came from or home
        navigate(from, { replace: true })
      } else {
        throw new Error('Authentication failed')
      }
    } catch (error) {
      console.error('Authentication error:', error)
      
      // Provide more helpful error messages
      let errorMessage = 'Authentication failed. Please try again.'
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection or contact support if the problem persists.'
      } else if (error.message.includes('404') || error.message.includes('endpoint not found')) {
        errorMessage = 'Backend server is not available. Please ensure the backend is running and configured correctly.'
      } else {
        errorMessage = error.message || errorMessage
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-main">
      <div className="login-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="login-card">
          <div className="login-header">
            <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
            <p>{isSignup ? 'Create a new account' : 'Enter your credentials to continue'}</p>
          </div>

          {error && (
            <div className="login-error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="form-group">
                <label htmlFor="name">
                  <UserPlus size={20} />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            {isSignup && (
              <div className="form-group">
                <label htmlFor="email">
                  <Phone size={20} />
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="mobile">
                <Phone size={20} />
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={20} />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignup ? "Create a password (min 6 characters)" : "Enter your password"}
                minLength="6"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading || mobile.length !== 10 || password.length < 6}
              onClick={(e) => {
                console.log('Button clicked:', { 
                  loading, 
                  mobileLength: mobile.length, 
                  passwordLength: password.length,
                  disabled: loading || mobile.length !== 10 || password.length < 6
                })
                // Prevent double submission
                if (loading) {
                  e.preventDefault()
                  return false
                }
              }}
            >
              {loading ? (isSignup ? 'Creating Account...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Login')}
            </button>
            
            {/* Show why button is disabled */}
            {(mobile.length !== 10 || password.length < 6) && !loading && (
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-light)', 
                marginTop: '8px',
                textAlign: 'center'
              }}>
                {mobile.length !== 10 && <div>Mobile number must be 10 digits</div>}
                {password.length < 6 && <div>Password must be at least 6 characters</div>}
              </div>
            )}
          </form>

          <div className="login-note">
            {isSignup ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(false)
                    setError('')
                    setName('')
                    setEmail('')
                  }}
                  className="link-btn"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(true)
                    setError('')
                  }}
                  className="link-btn"
                >
                  Sign up here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login

