import React from 'react';
import { motion } from 'framer-motion';

const Packages = () => {
  const packages = [
    {
      id: 1,
      name: 'Junior Foundation',
      duration: '3 Months (Grades 6-8)',
      price: 'LKR 15,000/mo',
      color: 'var(--stickem-green)',
      features: [
        'Intro to STEAM & Safety',
        'Structures & Stability',
        'Basic Sensors & Inputs',
        'Mini Robot Friend Build',
        'Demo Day Rehearsal'
      ]
    },
    {
      id: 2,
      name: 'Junior Extended',
      duration: '6 Months (Grades 6-8)',
      price: 'LKR 12,000/mo',
      color: 'var(--stickem-blue)',
      features: [
        'Design Thinking & Empathy',
        'Motion & Control Sprint',
        'Reliability Testing',
        'Storytelling & Pitches',
        'Mock Competition Simulation'
      ]
    },
    {
      id: 3,
      name: 'Senior Foundation',
      duration: '3 Months (Grades 9-11)',
      price: 'LKR 18,000/mo',
      color: 'var(--stickem-yellow)',
      features: [
        'Mechanical Design Depth',
        'Electronics & Power Basics',
        'Programming & Control Flow',
        'Lean Entrepreneurship Intro',
        'Pitch Basics & Documentation'
      ]
    },
    {
      id: 4,
      name: 'Senior Extended',
      duration: '6 Months (Grades 9-11)',
      price: 'LKR 15,000/mo',
      color: 'var(--stickem-red)',
      features: [
        'Strategic Project Scoping',
        'Technical Architecture',
        'Test, Measure, Improve',
        'Pitch Deck Drafting',
        'National/International Simulation'
      ]
    }
  ];

  return (
    <section id="packages" style={{ padding: '6rem 0', background: 'var(--lighter-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Choose Your <span className="text-highlight-yellow">Journey</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(15,23,42,0.8)' }}>
            Four expertly crafted packages based on world-class curriculum.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card"
              style={{
                padding: '2rem',
                borderTop: `4px solid ${pkg.color}`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.3s ease'
              }}
              whileHover={{ y: -10 }}
            >
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: pkg.color }}>{pkg.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.7)', marginBottom: '1.5rem' }}>{pkg.duration}</p>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>{pkg.price}</div>
              
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flexGrow: 1 }}>
                {pkg.features.map((feature, i) => (
                  <li key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: pkg.color }}>✓</span>
                    <span style={{ fontSize: '0.95rem', color: 'rgba(15,23,42,0.9)' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className="btn-primary" 
                style={{ width: '100%', backgroundColor: pkg.color, color: pkg.id === 3 ? 'var(--dark-text)' : 'white', border: `2px solid ${pkg.color}` }}
                onClick={() => window.location.href='#register'}
              >
                Enroll Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
