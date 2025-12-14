import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, Mail, ShoppingCart, User, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { getCartCount } = useCart()
  const { user, logout, hasOrders, loading: authLoading } = useAuth()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="container">
          <div className="navbar-contact">
            <a href="tel:+1234567890" className="contact-item">
              <Phone size={16} />
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@happydiagnostics.com" className="contact-item">
              <Mail size={16} />
              <span>info@happydiagnostics.com</span>
            </a>
          </div>
        </div>
      </div>
      <div className="navbar-main">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-logo" title="Happy Labs - Happy Diagnostics Center">
              <span className="logo-text">Happy Diagnostics</span>
              <span className="logo-subtitle">Center</span>
              <span style={{ display: 'none' }}>Happy Labs</span>
            </Link>
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
              <li>
                <Link 
                  to="/" 
                  className={isActive('/') ? 'active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className={isActive('/services') ? 'active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/packages" 
                  className={isActive('/packages') ? 'active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  Health Packages
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={isActive('/about') ? 'active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={isActive('/contact') ? 'active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>
              {/* Show Orders and Payment History only if user is logged in and has orders */}
              {user && hasOrders && (
                <>
                  <li>
                    <Link 
                      to="/orders" 
                      className={isActive('/orders') ? 'active' : ''}
                      onClick={() => setIsOpen(false)}
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/payment-history" 
                      className={isActive('/payment-history') ? 'active' : ''}
                      onClick={() => setIsOpen(false)}
                    >
                      Payment History
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link 
                  to="/cart" 
                  className={`cart-link ${isActive('/cart') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {getCartCount() > 0 && (
                    <span className="cart-badge">{getCartCount()}</span>
                  )}
                </Link>
              </li>
              {/* User section */}
              {user ? (
                <li className="navbar-user-section">
                  <Link
                    to="/profile"
                    className={`user-info ${isActive('/profile') ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} />
                    <span className="user-mobile">{user.name || user.mobile}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="logout-btn"
                    title="Logout"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </li>
              ) : (
                <li>
                  <Link 
                    to="/login" 
                    className={isActive('/login') ? 'active' : ''}
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} />
                    <span>Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
