import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, User, Phone, Mail, Save, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../config/supabase'
import { useAuth } from '../context/AuthContext'
import './UserProfile.css'

const UserProfile = () => {
  const navigate = useNavigate()
  const { user, loading: authLoading, login } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // User details state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  })

  useEffect(() => {
    if (authLoading) return
    
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/profile' } } })
      return
    }
    
    fetchUserDetails()
  }, [user, authLoading, navigate])

  const fetchUserDetails = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (fetchError) throw fetchError

      if (data) {
        setFormData({
          name: data.name || '',
          email: data.email || '',
          mobile: data.mobile || ''
        })
      }
    } catch (err) {
      console.error('Error fetching user details:', err)
      setError('Failed to load user details')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear messages when user starts typing
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      // Validate mobile number if changed
      if (formData.mobile && formData.mobile.length !== 10) {
        throw new Error('Mobile number must be 10 digits')
      }

      // Validate email format if provided
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Update user details in database
      const { data, error: updateError } = await supabase
        .from('users')
        .update({
          name: formData.name || null,
          email: formData.email || null,
          mobile: formData.mobile
        })
        .eq('id', user.id)
        .select()
        .single()

      if (updateError) throw updateError

      // Update auth context with new user data
      login(data)

      setSuccess('Profile updated successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      console.error('Error updating profile:', err)
      setError(err.message || 'Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <main className="user-profile-main">
        <div className="user-profile-container">
          <div className="loading">Loading...</div>
        </div>
      </main>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  if (loading) {
    return (
      <main className="user-profile-main">
        <div className="user-profile-container">
          <div className="loading">Loading profile...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="user-profile-main">
      <div className="user-profile-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="profile-header">
          <div className="profile-icon">
            <User size={48} />
          </div>
          <h1>My Profile</h1>
          <p>Update your personal information</p>
        </div>

        {error && (
          <div className="alert-message error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert-message success">
            <CheckCircle size={20} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">
                <User size={18} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={18} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">
                <Phone size={18} />
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
              />
              <small className="form-hint">Mobile number is required and cannot be changed</small>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary btn-large"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
            <Link to="/orders" className="btn btn-outline btn-large">
              View My Orders
            </Link>
          </div>
        </form>

        <div className="profile-info-box">
          <h3>Account Information</h3>
          <div className="info-row">
            <span className="info-label">User ID:</span>
            <span className="info-value">#{user.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Member Since:</span>
            <span className="info-value">
              {user.created_at 
                ? new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'N/A'
              }
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserProfile

