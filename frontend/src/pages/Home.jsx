import { Link } from 'react-router-dom'
import { CheckCircle, Clock, Shield, Users, TestTube, Heart, Brain, Stethoscope } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Home.css'

const Home = () => {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 })
  const [servicesRef, servicesVisible] = useScrollAnimation({ threshold: 0.1 })
  const [featuresRef, featuresVisible] = useScrollAnimation({ threshold: 0.1 })
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.2 })
  const services = [
    { icon: TestTube, title: 'Lab Tests', description: 'Comprehensive laboratory testing with accurate results' },
    { icon: Heart, title: 'Cardiac Care', description: 'Advanced cardiac diagnostic services' },
    { icon: Brain, title: 'Neurology', description: 'Specialized neurological assessments' },
    { icon: Stethoscope, title: 'General Health', description: 'Complete health checkup packages' },
  ]

  const features = [
    { icon: Clock, title: 'Quick Results', description: 'Fast turnaround time for all tests' },
    { icon: Shield, title: 'Accurate Reports', description: 'Precision in every diagnosis' },
    { icon: Users, title: 'Expert Team', description: 'Experienced healthcare professionals' },
    { icon: CheckCircle, title: 'Quality Assured', description: 'ISO certified diagnostic center' },
  ]

  return (
    <main>
      {/* SEO: Hidden text for search engines */}
      <div style={{ display: 'none' }}>
        <h1>Happy Labs - Happy Diagnostics Center</h1>
        <p>Happy Labs, also known as Happy Diagnostics Center, is your trusted partner in healthcare diagnostics. We provide advanced diagnostic services, lab tests, health packages, and comprehensive medical testing with cutting-edge technology.</p>
      </div>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div ref={heroRef} className={`hero-content ${heroVisible ? 'visible' : ''}`}>
            <h1 className="hero-title">
              Your Trusted Partner in
              <span className="highlight"> Healthcare Diagnostics</span>
            </h1>
            <p className="hero-subtitle">
              Advanced diagnostic services with cutting-edge technology and compassionate care. 
              Your health is our priority.
            </p>
            <div className="hero-buttons">
              <Link to="/packages" className="btn btn-primary hero-btn-1">
                View Health Packages
              </Link>
              <Link to="/contact" className="btn btn-outline hero-btn-2">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className={`section services-section ${servicesVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title fade-in-up">Our Services</h2>
          <p className="section-subtitle fade-in-up stagger-1">
            Comprehensive diagnostic services to meet all your healthcare needs
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className={`service-card scale-in stagger-${index + 1} ${servicesVisible ? 'visible' : ''}`}>
                <div className="service-icon">
                  <service.icon size={40} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to="/services" className="service-link">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className={`section features-section ${featuresVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title fade-in-up">Why Choose Us</h2>
          <p className="section-subtitle fade-in-up stagger-1">
            We are committed to providing the highest quality diagnostic services
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card slide-in-${index % 2 === 0 ? 'left' : 'right'} stagger-${index + 1} ${featuresVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <feature.icon size={48} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className={`cta-section ${ctaVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="cta-content scale-in">
            <h2 className="cta-title">Ready to Take Care of Your Health?</h2>
            <p className="cta-subtitle">
              Book an appointment today and get started on your wellness journey
            </p>
            <Link to="/contact" className="btn btn-secondary btn-large pulse-btn">
              Book Appointment Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home


