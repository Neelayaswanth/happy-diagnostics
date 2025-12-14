import { Check, Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCart } from '../context/CartContext'
import './Packages.css'

const Packages = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 })
  const [packagesRef, packagesVisible] = useScrollAnimation({ threshold: 0.1 })
  const { addToCart, cart } = useCart()
  const packages = [
    {
      name: 'Basic Health Checkup',
      price: '99',
      popular: false,
      features: [
        'Complete Blood Count (CBC)',
        'Blood Sugar (Fasting)',
        'Lipid Profile',
        'Liver Function Test',
        'Kidney Function Test',
        'Urine Analysis',
        'ECG',
        'Doctor Consultation'
      ]
    },
    {
      name: 'Comprehensive Health Package',
      price: '299',
      popular: true,
      features: [
        'All Basic Package Tests',
        'Thyroid Function Test',
        'Vitamin D & B12',
        'HbA1c',
        'Chest X-Ray',
        'Ultrasound Abdomen',
        'Cardiac Screening',
        'Complete Urine & Stool Analysis',
        'Detailed Doctor Consultation',
        'Health Report with Recommendations'
      ]
    },
    {
      name: 'Executive Health Package',
      price: '599',
      popular: false,
      features: [
        'All Comprehensive Package Tests',
        'Complete Cardiac Workup',
        'CT Scan (Head & Chest)',
        'MRI (if required)',
        'Cancer Screening Markers',
        'Bone Density Test',
        'Stress Test',
        'Advanced Lipid Profile',
        'Hormone Panel',
        'Nutritional Assessment',
        'Executive Summary Report',
        'Follow-up Consultation'
      ]
    },
    {
      name: 'Women\'s Health Package',
      price: '249',
      popular: false,
      features: [
        'Complete Blood Count',
        'Hormone Profile',
        'Pap Smear',
        'Mammography',
        'Bone Density Test',
        'Vitamin D & Calcium',
        'Thyroid Function',
        'Pelvic Ultrasound',
        'Gynecologist Consultation',
        'Health Report'
      ]
    },
    {
      name: 'Senior Citizen Package',
      price: '349',
      popular: false,
      features: [
        'Complete Health Assessment',
        'Cardiac Evaluation',
        'Bone Health Assessment',
        'Diabetes & Hypertension Screening',
        'Kidney & Liver Function',
        'Vision & Hearing Test',
        'Neurological Screening',
        'Nutritional Assessment',
        'Geriatric Consultation',
        'Comprehensive Health Report'
      ]
    },
    {
      name: 'Diabetes Care Package',
      price: '199',
      popular: false,
      features: [
        'HbA1c',
        'Fasting & Post-Meal Blood Sugar',
        'Lipid Profile',
        'Kidney Function Test',
        'Liver Function Test',
        'Complete Blood Count',
        'ECG',
        'Eye Examination',
        'Diabetologist Consultation',
        'Diet & Lifestyle Guidance'
      ]
    },
  ]

  return (
    <main>
      <section ref={headerRef} className={`page-header ${headerVisible ? 'visible' : ''}`}>
        <div className="container">
          <h1 className="page-title fade-in-up">Health Packages</h1>
          <p className="page-subtitle fade-in-up stagger-1">
            Choose from our comprehensive health packages designed for your wellness
          </p>
        </div>
      </section>

      <section ref={packagesRef} className={`section packages-section ${packagesVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <div key={index} className={`package-card scale-in stagger-${(index % 6) + 1} ${pkg.popular ? 'popular' : ''}`}>
                {pkg.popular && (
                  <div className="popular-badge">
                    <Star size={16} />
                    <span>Most Popular</span>
                  </div>
                )}
                <h2 className="package-name">{pkg.name}</h2>
                <div className="package-price">
                  <span className="currency">$</span>
                  <span className="amount">{pkg.price}</span>
                </div>
                <ul className="package-features">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    addToCart(pkg)
                    alert(`${pkg.name} added to cart!`)
                  }}
                  className="btn btn-primary package-btn"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section info-section">
        <div className="container">
          <div className="info-content">
            <h2 className="info-title">Why Choose Our Health Packages?</h2>
            <div className="info-grid">
              <div className="info-item">
                <h3>Comprehensive Testing</h3>
                <p>All packages include a wide range of tests to give you a complete health picture.</p>
              </div>
              <div className="info-item">
                <h3>Expert Consultation</h3>
                <p>Get detailed consultation with our experienced doctors after your tests.</p>
              </div>
              <div className="info-item">
                <h3>Quick Results</h3>
                <p>Receive your test results quickly with detailed reports and recommendations.</p>
              </div>
              <div className="info-item">
                <h3>Affordable Pricing</h3>
                <p>Competitive pricing with no hidden charges. Transparent and affordable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Packages


