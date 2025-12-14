import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, AlertCircle } from 'lucide-react'
import { supabase } from '../../config/supabase'
import './Admin.css'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Check admin credentials (in production, use proper authentication)
      // For demo: admin/admin123
      if (username === 'admin' && password === 'admin123') {
        // Store admin session
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_username', username)
        localStorage.setItem('admin_login_time', new Date().toISOString())
        
        navigate('/admin/dashboard')
      } else {
        setError('Invalid username or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>Happy Diagnostics Center</p>
        </div>
        
        {error && (
          <div className="admin-error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label>
              <User size={20} />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={20} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-large"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="admin-login-note">
          <p><strong>Demo Credentials:</strong></p>
          <p>Username: <code>admin</code></p>
          <p>Password: <code>admin123</code></p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

