import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import trophy from '../assets/trophy.png';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🏆',
      title: 'Achievement Tracking',
      description: 'Comprehensive record of awards, recognitions, and participation certificates',
      color: 'var(--accent)'
    },
    {
      icon: '⭐',
      title: 'Digital Portfolio',
      description: 'Build and showcase your extracurricular profile beyond academics',
      color: 'var(--secondary)'
    },
    {
      icon: '📊',
      title: 'Visual Analytics',
      description: 'Interactive charts and insights to track your achievement journey',
      color: 'var(--primary)'
    },
    {
      icon: '🎯',
      title: 'Participation History',
      description: 'Timeline view of all your club activities, events, and competitions',
      color: 'var(--success)'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="trophy-animation">
  <img 
    src={trophy} 
    alt="Achievement Trophy" 
    className="trophy-img"
  />
</motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Student Achievement Platform
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Empower Your Success Beyond the Classroom
        </motion.p>

        <motion.div
          className="hero-badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="badge">🥇 Awards</span>
          <span className="badge">⭐ Recognition</span>
          <span className="badge">🎯 Participation</span>
        </motion.div>

        <motion.div
          className="cta-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Login <span style={{ marginLeft: '10px' }}>→</span>
          </button>

          <button className="btn-secondary" onClick={() => navigate('/register')}>
            Register
          </button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Platform Features
        </motion.h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="feature-icon" style={{ borderColor: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {[
            { label: 'Active Students', value: '500+' },
            { label: 'Achievements', value: '1.2k' },
            { label: 'Events Tracked', value: '250+' },
            { label: 'Awards', value: '400+' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          {[
            { step: '01', title: 'Secure Login', desc: 'Access your personalized dashboard with role-based authentication.' },
            { step: '02', title: 'Add Achievements', desc: 'Record awards, certificates, and participation details easily.' },
            { step: '03', title: 'Track Progress', desc: 'Monitor growth with real-time analytics and visual reports.' },
            { step: '04', title: 'Showcase Portfolio', desc: 'Display and share your achievement portfolio.' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="step-number">{item.step}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Launch?</h2>
          <p>Join hundreds of students building their digital success portfolio.</p>
          <button className="btn-cta" onClick={() => navigate('/register')}>
            Get Started Now
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Student Achievement Platform</h3>
            <p>Empowering students to track and showcase their extracurricular excellence in a digital age.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>support@sap.edu</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
