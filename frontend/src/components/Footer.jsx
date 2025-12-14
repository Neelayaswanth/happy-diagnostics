import { Link, useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate()

  const handleLinkClick = (e, path) => {
    e.preventDefault()
    // Scroll to top smoothly before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Small delay to allow smooth scroll, then navigate
    setTimeout(() => {
      navigate(path)
    }, 100)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Happy Diagnostics Center</h3>
            <p className="footer-description">
              Your trusted partner in healthcare. We provide accurate diagnostic services 
              with state-of-the-art technology and compassionate care.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={(e) => handleLinkClick(e, '/')}>Home</Link></li>
              <li><Link to="/services" onClick={(e) => handleLinkClick(e, '/services')}>Services</Link></li>
              <li><Link to="/packages" onClick={(e) => handleLinkClick(e, '/packages')}>Health Packages</Link></li>
              <li><Link to="/about" onClick={(e) => handleLinkClick(e, '/about')}>About Us</Link></li>
              <li><Link to="/contact" onClick={(e) => handleLinkClick(e, '/contact')}>Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link to="/services" onClick={(e) => handleLinkClick(e, '/services')}>Lab Tests</Link></li>
              <li><Link to="/services" onClick={(e) => handleLinkClick(e, '/services')}>Imaging</Link></li>
              <li><Link to="/services" onClick={(e) => handleLinkClick(e, '/services')}>Health Checkups</Link></li>
              <li><Link to="/services" onClick={(e) => handleLinkClick(e, '/services')}>Home Collection</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} />
                <span>123 Health Street, Medical District, City - 12345</span>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li>
                <Mail size={18} />
                <a href="mailto:info@happydiagnostics.com">info@happydiagnostics.com</a>
              </li>
              <li>
                <Clock size={18} />
                <span>Mon - Sat: 7:00 AM - 8:00 PM<br />Sunday: 8:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Happy Diagnostics Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


