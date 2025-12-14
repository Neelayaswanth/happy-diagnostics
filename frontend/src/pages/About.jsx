import { Award, Users, Target, Heart, UsersRound, TrendingUp, Clock, Sparkles } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './About.css'

const About = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 })
  const [storyRef, storyVisible] = useScrollAnimation({ threshold: 0.1 })
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.1 })
  const [valuesRef, valuesVisible] = useScrollAnimation({ threshold: 0.1 })
  const [journeyRef, journeyVisible] = useScrollAnimation({ threshold: 0.1 })
  const [missionRef, missionVisible] = useScrollAnimation({ threshold: 0.1 })
  
  const stats = [
    { icon: Users, number: '50,000+', label: 'Happy Patients' },
    { icon: Award, number: '8+', label: 'Years of Excellence' },
    { icon: Target, number: '150+', label: 'Tests Available' },
    { icon: Heart, number: '98%', label: 'Patient Satisfaction' },
  ]

  const journey = [
    { icon: UsersRound, year: '2016', title: 'The Beginning', description: 'A group of five friends, all healthcare professionals, came together with a shared vision to make quality diagnostics accessible to everyone.' },
    { icon: TrendingUp, year: '2018', title: 'First Milestone', description: 'Opened our first diagnostic center with state-of-the-art equipment, serving over 1,000 patients in the first year.' },
    { icon: Award, year: '2020', title: 'Recognition', description: 'Received ISO certification and became a trusted name in the community, expanding our services and team.' },
    { icon: Sparkles, year: '2024', title: 'Today', description: 'Serving thousands of patients monthly with advanced technology, compassionate care, and unwavering commitment to excellence.' },
  ]

  const values = [
    {
      title: 'Accuracy',
      description: 'We ensure the highest level of accuracy in all our diagnostic tests and reports.'
    },
    {
      title: 'Compassion',
      description: 'We provide compassionate care and support to all our patients throughout their journey.'
    },
    {
      title: 'Innovation',
      description: 'We continuously invest in the latest technology and equipment for better diagnosis.'
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of ethics and transparency in all our operations.'
    },
  ]

  return (
    <main>
      <section ref={headerRef} className={`page-header ${headerVisible ? 'visible' : ''}`}>
        <div className="container">
          <h1 className="page-title fade-in-up">About Us</h1>
          <p className="page-subtitle fade-in-up stagger-1">
            Your trusted partner in healthcare diagnostics
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className={`section story-section ${storyVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="about-content">
            <div className="story-header fade-in-up">
              <h2 className="about-title">Our Story: A Journey of Passion and Dedication</h2>
              <p className="story-intro">
                Every great venture begins with a dream, and ours started with a simple conversation among friends.
              </p>
            </div>
            
            <div className="story-content">
              <div className="story-text fade-in stagger-1">
                <h3 className="story-subtitle">The Beginning: A Dream Shared by Friends</h3>
                <p className="about-paragraph">
                  In 2016, five close friends—all healthcare professionals with years of experience in diagnostics, 
                  pathology, radiology, and laboratory sciences—sat together over coffee, discussing a shared frustration: 
                  the lack of accessible, affordable, and compassionate diagnostic services in their community. They 
                  noticed that many people were either traveling long distances for quality diagnostics or settling 
                  for subpar services due to limited options.
                </p>
                <p className="about-paragraph">
                  What started as a casual conversation soon turned into a passionate mission. These friends—Dr. Sarah 
                  Mitchell (Pathologist), Dr. James Chen (Radiologist), Dr. Priya Sharma (Clinical Biochemist), 
                  Michael Rodriguez (Lab Technologist), and Emily Watson (Healthcare Administrator)—decided to 
                  combine their expertise, savings, and unwavering determination to create something meaningful.
                </p>
              </div>

              <div className="story-text fade-in stagger-2">
                <h3 className="story-subtitle">Building from the Ground Up</h3>
                <p className="about-paragraph">
                  Starting a diagnostic center from scratch was no easy feat. With limited capital but unlimited 
                  passion, the team worked day and night. They personally visited equipment manufacturers, negotiated 
                  deals, designed the facility layout, and even painted walls themselves. Weekends were spent 
                  researching the latest diagnostic technologies, and evenings were dedicated to creating protocols 
                  that would ensure accuracy and patient comfort.
                </p>
                <p className="about-paragraph">
                  The early days were challenging—long hours, financial constraints, and the pressure of building 
                  something from nothing. But their friendship and shared vision kept them going. They believed 
                  that quality healthcare shouldn't be a luxury, and this belief fueled their hard work every single day.
                </p>
              </div>

              <div className="story-text fade-in stagger-3">
                <h3 className="story-subtitle">The First Patient: A Moment of Truth</h3>
                <p className="about-paragraph">
                  When Happy Diagnostics Center opened its doors in 2018, the first patient was a nervous elderly 
                  woman who had traveled 30 miles because she couldn't afford the expensive tests at other centers. 
                  The team treated her with such care and compassion that she left with tears of gratitude. That 
                  moment confirmed they were on the right path—combining medical excellence with genuine human 
                  connection.
                </p>
                <p className="about-paragraph">
                  Word spread quickly. Patients appreciated not just the accuracy of results, but the warmth, 
                  patience, and personal attention they received. The founders made it a point to be present, to 
                  listen, and to ensure every patient felt valued and cared for.
                </p>
              </div>

              <div className="story-text fade-in stagger-4">
                <h3 className="story-subtitle">Growth Through Excellence</h3>
                <p className="about-paragraph">
                  Today, Happy Diagnostics Center stands as a testament to what passion, hard work, and friendship 
                  can achieve. We've grown from a small facility with basic equipment to a state-of-the-art diagnostic 
                  center offering over 150 different tests. Our team has expanded from five friends to a dedicated 
                  workforce of 50+ professionals, but our core values remain unchanged.
                </p>
                <p className="about-paragraph">
                  We continue to invest in cutting-edge technology—from advanced MRI and CT scanners to automated 
                  laboratory systems and digital pathology solutions. But technology alone doesn't make us special. 
                  It's our commitment to treating every patient like family, our attention to detail, and our 
                  unwavering dedication to accuracy that sets us apart.
                </p>
              </div>

              <div className="story-text fade-in stagger-5">
                <h3 className="story-subtitle">What Makes Us Different</h3>
                <p className="about-paragraph">
                  At Happy Diagnostics Center, we're not just a business—we're a family. The founders still work 
                  on the floor, interacting with patients, reviewing cases, and ensuring quality. This hands-on 
                  approach means that the same passion and care that started this journey continues to drive us 
                  every day.
                </p>
                <p className="about-paragraph">
                  We understand that a diagnostic test isn't just a procedure—it's a moment of anxiety, hope, and 
                  sometimes fear. That's why we've created an environment that's not just clinically excellent, 
                  but also warm, welcoming, and supportive. Our staff is trained not just in medical procedures, but 
                  in empathy and patient communication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section ref={journeyRef} className={`section journey-section ${journeyVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title fade-in-up">Our Journey</h2>
          <p className="section-subtitle fade-in-up stagger-1">
            From a dream shared by friends to a trusted healthcare partner
          </p>
          <div className="journey-timeline">
            {journey.map((milestone, index) => (
              <div key={index} className={`journey-item fade-in stagger-${index + 1} ${journeyVisible ? 'visible' : ''}`}>
                <div className="journey-icon">
                  <milestone.icon size={32} />
                </div>
                <div className="journey-year">{milestone.year}</div>
                <h3 className="journey-title">{milestone.title}</h3>
                <p className="journey-description">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className={`section stats-section ${statsVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card scale-in stagger-${index + 1} ${statsVisible ? 'visible' : ''}`}>
                <div className="stat-icon">
                  <stat.icon size={48} />
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={valuesRef} className={`section values-section ${valuesVisible ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title fade-in-up">Our Values</h2>
          <p className="section-subtitle fade-in-up stagger-1">
            The principles that guide everything we do
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className={`value-card fade-in stagger-${index + 1} ${valuesVisible ? 'visible' : ''}`}>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="section services-detail-section">
        <div className="container">
          <h2 className="section-title fade-in-up">Comprehensive Diagnostic Services</h2>
          <p className="section-subtitle fade-in-up stagger-1">
            State-of-the-art technology meets compassionate care
          </p>
          <div className="services-detail-content">
            <div className="service-detail-item fade-in stagger-1">
              <h3 className="service-detail-title">Laboratory Services</h3>
              <p className="service-detail-text">
                Our fully automated laboratory is equipped with the latest analyzers and diagnostic 
                equipment. We perform over 100 different tests including complete blood counts, lipid 
                profiles, liver and kidney function tests, thyroid assessments, diabetes screening, 
                and specialized tests for various conditions. All tests are conducted following 
                international quality standards with quick turnaround times.
              </p>
            </div>
            <div className="service-detail-item fade-in stagger-2">
              <h3 className="service-detail-title">Imaging & Radiology</h3>
              <p className="service-detail-text">
                Our radiology department features advanced imaging technology including digital X-rays, 
                high-resolution ultrasound, CT scans, MRI, mammography, and bone density scanning. 
                Our experienced radiologists ensure accurate interpretation of every scan, providing 
                detailed reports that help in early detection and precise diagnosis.
              </p>
            </div>
            <div className="service-detail-item fade-in stagger-3">
              <h3 className="service-detail-title">Cardiac Diagnostics</h3>
              <p className="service-detail-text">
                We offer comprehensive cardiac health assessments including ECG, echocardiography, 
                stress tests, and Holter monitoring. Our cardiac diagnostic services help in early 
                detection of heart conditions, enabling timely intervention and better outcomes.
              </p>
            </div>
            <div className="service-detail-item fade-in stagger-4">
              <h3 className="service-detail-title">Specialized Testing</h3>
              <p className="service-detail-text">
                From cancer screening markers to genetic testing, from neurological assessments to 
                endocrinology panels, we offer a wide range of specialized diagnostic services. Our 
                team continuously updates our test menu to include the latest diagnostic innovations.
              </p>
            </div>
            <div className="service-detail-item fade-in stagger-5">
              <h3 className="service-detail-title">Home Collection Services</h3>
              <p className="service-detail-text">
                Understanding that some patients find it difficult to visit our center, we offer 
                convenient home collection services. Our trained phlebotomists visit your home at 
                your preferred time, ensuring sample collection with the same care and precision 
                as in our facility.
              </p>
            </div>
            <div className="service-detail-item fade-in stagger-6">
              <h3 className="service-detail-title">Health Packages</h3>
              <p className="service-detail-text">
                We've designed comprehensive health checkup packages for different age groups and 
                needs—from basic health screenings to executive health packages. These packages 
                are cost-effective and provide a complete picture of your health status, helping 
                you take proactive steps towards wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={missionRef} className={`section mission-section ${missionVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="mission-content">
            <h2 className="mission-title fade-in-up">Our Mission & Vision</h2>
            <div className="mission-grid">
              <div className={`mission-card fade-in stagger-1 ${missionVisible ? 'visible' : ''}`}>
                <h3 className="mission-card-title">Our Mission</h3>
                <p className="mission-card-text">
                  To provide accurate, affordable, and accessible diagnostic services that empower 
                  individuals to take control of their health. We strive to deliver exceptional 
                  patient care while maintaining the highest standards of medical excellence. Our 
                  mission is to make quality diagnostics available to everyone, regardless of their 
                  background or financial situation.
                </p>
              </div>
              <div className={`mission-card fade-in stagger-2 ${missionVisible ? 'visible' : ''}`}>
                <h3 className="mission-card-title">Our Vision</h3>
                <p className="mission-card-text">
                  To become the most trusted and preferred diagnostic center in our region, known 
                  for our commitment to quality, innovation, and patient satisfaction. We envision 
                  a future where quality healthcare is accessible to all, where technology and 
                  compassion work hand in hand, and where every patient feels valued and cared for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About


