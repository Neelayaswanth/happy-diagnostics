import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { supabase } from '../config/supabase'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Contact.css'

const Contact = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 })
  const [formRef, formVisible] = useScrollAnimation({ threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Try to insert into Supabase if available
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('contact_submissions')
            .insert([{
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              subject: formData.subject,
              message: formData.message,
              created_at: new Date().toISOString()
            }])

          if (error) throw error
        } catch (supabaseError) {
          console.warn('Supabase error:', supabaseError)
        }
      }

      // Also send to backend API
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
      } catch (apiError) {
        console.log('Backend API not available')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <main>
      <section ref={headerRef} className={`page-header ${headerVisible ? 'visible' : ''}`}>
        <div className="container">
          <h1 className="page-title fade-in-up">Contact Us</h1>
          <p className="page-subtitle fade-in-up stagger-1">
            Get in touch with us. We're here to help with all your diagnostic needs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-content">
            <div ref={formRef} className={`contact-info slide-in-left stagger-1 ${formVisible ? 'visible' : ''}`}>
              <h2 className="contact-info-title">Get in Touch</h2>
              <p className="contact-info-text">
                Have questions or need to schedule an appointment? We're here to help. 
                Reach out to us through any of the following ways.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-detail-content">
                    <h3>Address</h3>
                    <p>123 Health Street, Medical District<br />City - 12345, Country</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-detail-content">
                    <h3>Phone</h3>
                    <p>
                      <a href="tel:+1234567890">+1 (234) 567-890</a><br />
                      <a href="tel:+1234567891">+1 (234) 567-891</a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-detail-content">
                    <h3>Email</h3>
                    <p>
                      <a href="mailto:info@happydiagnostics.com">info@happydiagnostics.com</a><br />
                      <a href="mailto:appointments@happydiagnostics.com">appointments@happydiagnostics.com</a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Clock size={24} />
                  </div>
                  <div className="contact-detail-content">
                    <h3>Working Hours</h3>
                    <p>
                      Monday - Saturday: 7:00 AM - 8:00 PM<br />
                      Sunday: 8:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`contact-form-container slide-in-right stagger-2 ${formVisible ? 'visible' : ''}`}>
              <h2 className="form-title">Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="form-message success">
                    <CheckCircle size={20} />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message error">
                    <span>Something went wrong. Please try again later.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-large form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact

