import React from 'react';
import { motion } from 'framer-motion';

const packages = [
  {
    id: 1,
    name: 'Junior Foundation',
    tagline: '3 Months',
    grade: 'Grades 6–9',
    location: 'Home visits around Colombo',
    color: 'var(--stickem-green)',
    emoji: '🌱',
    pricingOptions: [
      {
        type: 'Individual (Max 1 Student)',
        original: '5,000',
        discounted: '4,000',
        unit: 'LKR/hr',
        seatsMax: 5,
        seatsTaken: 1,
        seatLabel: 'Individual Seats'
      },
      {
        type: 'Group (< 5 Students)',
        original: '4,000',
        discounted: '3,000',
        unit: 'LKR/hr/student',
        seatsMax: 5,
        seatsTaken: 2,
        seatLabel: 'Group Classes'
      }
    ],
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
    grade: 'Grades 6–9',
    location: 'Nugegoda (Siyochem Smart Classroom)',
    schedule: 'Starts Sep 1st week 2026 • Sat/Sun • Max 2 hrs/class',
    color: 'var(--stickem-blue)',
    emoji: '🚀',
    popular: true,
    pricingOptions: [
      {
        type: 'Class Enrollment',
        original: '3,000',
        discounted: '2,000',
        unit: 'LKR/hr/student',
        seatsMax: 80,
        seatsTaken: 12,
        seatLabel: 'Total Seats'
      }
    ],
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
    grade: 'Grades 9–12',
    location: 'Home visits around Colombo',
    color: 'var(--stickem-yellow)',
    emoji: '⚙️',
    pricingOptions: [
      {
        type: 'Individual (Max 1 Student)',
        original: '5,000',
        discounted: '4,000',
        unit: 'LKR/hr',
        seatsMax: 5,
        seatsTaken: 3,
        seatLabel: 'Individual Seats'
      },
      {
        type: 'Group (< 5 Students)',
        original: '4,000',
        discounted: '3,000',
        unit: 'LKR/hr/student',
        seatsMax: 5,
        seatsTaken: 2,
        seatLabel: 'Group Classes'
      }
    ],
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
    grade: 'Grades 9–12',
    location: 'Nugegoda (Siyochem Smart Classroom)',
    schedule: 'Starts Sep 1st week 2026 • Sat/Sun • Max 2 hrs/class',
    color: 'var(--stickem-red)',
    emoji: '🏆',
    pricingOptions: [
      {
        type: 'Class Enrollment',
        original: '3,000',
        discounted: '2,000',
        unit: 'LKR/hr/student',
        seatsMax: 80,
        seatsTaken: 10,
        seatLabel: 'Total Seats'
      }
    ],
    features: [
      'Strategic Project Scoping',
      'Technical Architecture',
      'Test, Measure, Improve',
      'Pitch Deck Drafting',
      'National/International Sim.',
    ],
  },
];

const ProgressBar = ({ taken, max, label, color }) => {
  const percentage = Math.min(100, Math.max(0, (taken / max) * 100));
  return (
    <div style={{ marginBottom: '0.4rem', fontSize: '0.8rem', marginTop: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', color: 'rgba(15,23,42,0.8)' }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ fontWeight: 700 }}>{taken} / {max}</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(15,23,42,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ height: '100%', background: color, borderRadius: '3px' }}
        />
      </div>
    </div>
  );
};

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

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.8rem',
              padding: '1rem 1.5rem',
              maxWidth: '600px',
              margin: '1.5rem auto 0',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              textAlign: 'left',
              boxShadow: '0 4px 6px rgba(239, 68, 68, 0.05)'
            }}
          >
            <div style={{ fontSize: '2.2rem' }}>🚨</div>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--stickem-red)', marginBottom: '0.2rem', fontSize: '1.1rem' }}>
                Registration Fee: 5,000 LKR / Student
              </div>
              <div style={{ fontSize: '0.95rem', color: 'rgba(15,23,42,0.8)', fontWeight: 500 }}>
                Please secure your spot immediately! Very limited seats are available and they are filling up fast.
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="packages-grid" style={{ alignItems: 'stretch' }}>
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className="package-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 90 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ borderTop: `5px solid ${pkg.color}`, position: 'relative', display: 'flex', flexDirection: 'column' }}
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

              {/* Price & Options */}
              <div style={{ marginBottom: '1.25rem' }}>
                {pkg.location && (
                  <div style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.7)', marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <span>📍</span>
                    <span>{pkg.location}</span>
                  </div>
                )}
                {pkg.schedule && (
                  <div style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.7)', marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <span>🗓️</span>
                    <span>{pkg.schedule}</span>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                  {pkg.pricingOptions.map((opt, i) => (
                    <div key={i} style={{ background: 'rgba(15,23,42,0.03)', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${pkg.color}33` }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: pkg.color, marginBottom: '0.2rem' }}>{opt.type}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                        <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', color: 'var(--dark-text)' }}>
                          {opt.discounted}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'rgba(15,23,42,0.55)' }}>{opt.unit}</span>
                        {opt.original && (
                          <span style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: 'rgba(15,23,42,0.4)', marginLeft: 'auto' }}>
                            {opt.original}
                          </span>
                        )}
                      </div>
                      <ProgressBar taken={opt.seatsTaken} max={opt.seatsMax} label={opt.seatLabel} color={pkg.color} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', flexGrow: 1 }}>
                {pkg.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: pkg.color, color: 'white', fontSize: '0.6rem',
                      fontWeight: 800, flexShrink: 0, marginTop: '2px'
                    }}>✓</span>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.85)' }}>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => window.open('https://forms.gle/6wwrdLxbqCtPyiAy5', '_blank')}
                style={{
                  width: '100%', padding: '0.7rem',
                  background: pkg.color, color: pkg.id === 3 ? 'var(--dark-text)' : 'white',
                  border: `2px solid ${pkg.color}`, borderRadius: '0.5rem',
                  fontFamily: 'Outfit', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                  boxShadow: `4px 4px 0px rgba(0,0,0,0.2)`, transition: 'all 0.2s',
                  marginTop: 'auto'
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
