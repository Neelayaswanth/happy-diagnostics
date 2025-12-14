import { TestTube, Heart, Brain, Eye, Bone, Microscope, X, Activity } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Services.css'

const Services = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 })
  const services = [
    {
      icon: TestTube,
      title: 'Laboratory Tests',
      description: 'Complete range of blood tests, urine analysis, and other diagnostic tests with accurate results.',
      features: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Tests', 'Kidney Function Tests', 'Thyroid Tests', 'Diabetes Screening']
    },
    {
      icon: Heart,
      title: 'Cardiac Diagnostics',
      description: 'Comprehensive cardiac health assessment with advanced imaging and monitoring.',
      features: ['ECG', 'Echocardiography', 'Stress Test', 'Holter Monitoring', 'Cardiac CT', 'Cardiac MRI']
    },
    {
      icon: Brain,
      title: 'Neurological Services',
      description: 'Specialized neurological assessments and imaging for brain and nervous system disorders.',
      features: ['EEG', 'EMG', 'Brain MRI', 'CT Scan', 'Neurological Consultation', 'Cognitive Assessment']
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'Complete eye care services including vision tests and eye health diagnostics.',
      features: ['Vision Testing', 'Retinal Imaging', 'Glaucoma Screening', 'Eye Pressure Test', 'Color Vision Test', 'Refraction']
    },
    {
      icon: Bone,
      title: 'Orthopedic Diagnostics',
      description: 'Bone and joint health assessment with advanced imaging techniques.',
      features: ['X-Ray', 'Bone Density Scan', 'Joint MRI', 'Arthroscopy', 'Sports Medicine', 'Fracture Assessment']
    },
    {
      icon: Microscope,
      title: 'Pathology Services',
      description: 'Comprehensive pathology services including histopathology and cytology.',
      features: ['Biopsy Analysis', 'Cytology', 'Histopathology', 'Immunohistochemistry', 'Molecular Pathology', 'Cancer Screening']
    },
    {
      icon: X,
      title: 'Radiology & Imaging',
      description: 'State-of-the-art imaging services for accurate diagnosis.',
      features: ['X-Ray', 'CT Scan', 'MRI', 'Ultrasound', 'Mammography', 'DEXA Scan']
    },
    {
      icon: Activity,
      title: 'Preventive Health',
      description: 'Comprehensive health checkups and preventive care packages.',
      features: ['Annual Health Checkup', 'Executive Health Package', 'Women\'s Health', 'Men\'s Health', 'Senior Health', 'Child Health']
    },
  ]

  const [servicesRef, servicesVisible] = useScrollAnimation({ threshold: 0.1 })

  return (
    <main>
      <section ref={headerRef} className={`page-header ${headerVisible ? 'visible' : ''}`}>
        <div className="container">
          <h1 className="page-title fade-in-up">Our Services</h1>
          <p className="page-subtitle fade-in-up stagger-1">
            Comprehensive diagnostic services with advanced technology and expert care
          </p>
        </div>
      </section>

      <section ref={servicesRef} className={`section services-section ${servicesVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="services-list">
            {services.map((service, index) => (
              <div key={index} className={`service-item slide-in-${index % 2 === 0 ? 'left' : 'right'} stagger-${(index % 4) + 1}`}>
                <div className="service-item-icon">
                  <service.icon size={48} />
                </div>
                <div className="service-item-content">
                  <h2 className="service-item-title">{service.title}</h2>
                  <p className="service-item-description">{service.description}</p>
                  <div className="service-features">
                    <h3 className="features-title">Available Tests:</h3>
                    <ul className="features-list">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Need More Information?</h2>
            <p className="cta-subtitle">
              Contact us to learn more about our services or book an appointment
            </p>
            <a href="/contact" className="btn btn-primary btn-large">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Services


