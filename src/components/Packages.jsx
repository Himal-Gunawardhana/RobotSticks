import React from 'react';
import { motion } from 'framer-motion';

const packages = [
  {
    id: 1,
    name: 'Junior Foundation',
    tagline: '3 Months',
    grade: 'Grades 6–8',
    price: 'LKR 15,000',
    unit: '/month',
    color: 'var(--stickem-green)',
    emoji: '🌱',
    features: [
      'Intro to STEAM & Safety',
      'Structures & Stability',
      'Basic Sensors & Inputs',
      'Mini Robot Friend Build',
      'Demo Day Rehearsal',
    ],
  },
  {
    id: 2,
    name: 'Junior Extended',
    tagline: '6 Months',
    grade: 'Grades 6–8',
    price: 'LKR 12,000',
    unit: '/month',
    color: 'var(--stickem-blue)',
    emoji: '🚀',
    popular: true,
    features: [
      'Design Thinking & Empathy',
      'Motion & Control Sprint',
      'Reliability Testing',
      'Storytelling & Pitches',
      'Mock Competition Simulation',
    ],
  },
  {
    id: 3,
    name: 'Senior Foundation',
    tagline: '3 Months',
    grade: 'Grades 9–11',
    price: 'LKR 18,000',
    unit: '/month',
    color: 'var(--stickem-yellow)',
    emoji: '⚙️',
    features: [
      'Mechanical Design Depth',
      'Electronics & Power Basics',
      'Programming & Control Flow',
      'Lean Entrepreneurship Intro',
      'Pitch Basics & Docs',
    ],
  },
  {
    id: 4,
    name: 'Senior Extended',
    tagline: '6 Months',
    grade: 'Grades 9–11',
    price: 'LKR 15,000',
    unit: '/month',
    color: 'var(--stickem-red)',
    emoji: '🏆',
    features: [
      'Strategic Project Scoping',
      'Technical Architecture',
      'Test, Measure, Improve',
      'Pitch Deck Drafting',
      'National/International Sim.',
    ],
  },
];

const Packages = () => {
  return (
    <section id="packages" className="packages-section">
      <div className="container">
        <motion.div
          className="packages-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Choose Your{' '}
            <motion.span
              className="text-highlight-yellow"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ display: 'inline-block' }}
            >
              Journey
            </motion.span>{' '}
            🎒
          </h2>
          <p style={{ color: 'rgba(15,23,42,0.7)', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto' }}>
            Four expertly crafted programs based on world-class Stick'Em curriculum.
          </p>
        </motion.div>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className="package-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 90 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ borderTop: `5px solid ${pkg.color}`, position: 'relative' }}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  style={{
                    position: 'absolute', top: '-14px', right: '16px',
                    background: 'var(--stickem-red)', color: 'white',
                    fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Outfit',
                    borderRadius: '0.4rem', padding: '0.25rem 0.65rem',
                    border: '2px solid var(--dark-text)',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.25)'
                  }}
                >
                  ⭐ POPULAR
                </motion.div>
              )}

              {/* Header */}
              <div style={{ marginBottom: '1.25rem' }}>
                <motion.div
                  style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {pkg.emoji}
                </motion.div>
                <h3 style={{ fontSize: '1.35rem', color: pkg.color, marginBottom: '0.3rem' }}>{pkg.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{
                    background: pkg.color + '22', color: pkg.color,
                    border: `1px solid ${pkg.color}`, borderRadius: '0.4rem',
                    padding: '0.2rem 0.55rem', fontSize: '0.78rem', fontWeight: 600
                  }}>{pkg.tagline}</span>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(15,23,42,0.6)', fontWeight: 500 }}>{pkg.grade}</span>
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.6rem', color: 'var(--dark-text)' }}>
                  {pkg.price}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.55)', marginLeft: '2px' }}>{pkg.unit}</span>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.75rem', flexGrow: 1 }}>
                {pkg.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.7rem' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: pkg.color, color: 'white', fontSize: '0.6rem',
                      fontWeight: 800, flexShrink: 0, marginTop: '2px'
                    }}>✓</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.85)' }}>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => window.location.href = '#register'}
                style={{
                  width: '100%', padding: '0.7rem',
                  background: pkg.color, color: pkg.id === 3 ? 'var(--dark-text)' : 'white',
                  border: `2px solid ${pkg.color}`, borderRadius: '0.5rem',
                  fontFamily: 'Outfit', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                  boxShadow: `4px 4px 0px rgba(0,0,0,0.2)`, transition: 'all 0.2s'
                }}
              >
                Enroll Now 🎓
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
