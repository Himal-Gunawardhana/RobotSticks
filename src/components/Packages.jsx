import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const getMonthlyPrice = (priceStr) => {
  if (!priceStr) return null;
  const num = parseInt(priceStr.replace(/,/g, ''), 10);
  return (num / 5).toLocaleString();
};

const packages = [
  {
    id: 1,
    name: 'Kids STEAM',
    tagline: '6 Months • 1st Month Free',
    grade: 'Age 7-10',
    location: 'Online / Physical (WP & SP)',
    color: '#8b5cf6',
    emoji: '🧸',
    badge: '🚀 NEW ENTRY',
    pricingOptions: [
      {
        type: 'Online Plan',
        original: '20,000',
        discounted: '15,000',
        unit: 'LKR',
        seatsMax: 60,
        seatsTaken: 45,
        seatLabel: 'Online Seats'
      },
      {
        type: 'Physical Plan',
        original: '30,000',
        discounted: '25,000',
        unit: 'LKR',
        seatsMax: 40,
        seatsTaken: 35,
        seatLabel: 'Physical Seats'
      }
    ],
    features: [
      '1st month completely FREE & Online for everyone',
      'Online Plan: Buy kit individually or share with 4 friends',
      'Physical Plan: Kits provided (1 kit per 4 students)',
      'Physical Plan: Max 40 students/class (Western & Southern Provinces)',
      'Payable in 6 easy installments',
      'Fun, interactive basics of Robotics & AI'
    ],
  },
  {
    id: 2,
    name: 'Junior Robotics & AI',
    tagline: '6 Months • 1st Month Free',
    grade: 'Age 11-13',
    location: 'Online / Physical (WP & SP)',
    color: 'var(--stickem-green)',
    emoji: '🌱',
    popular: true,
    pricingOptions: [
      {
        type: 'Online Plan',
        original: '25,000',
        discounted: '20,000',
        unit: 'LKR',
        seatsMax: 70,
        seatsTaken: 55,
        seatLabel: 'Online Seats'
      },
      {
        type: 'Physical Plan',
        original: '35,000',
        discounted: '30,000',
        unit: 'LKR',
        seatsMax: 40,
        seatsTaken: 35,
        seatLabel: 'Physical Seats'
      }
    ],
    features: [
      '1st month completely FREE & Online for everyone',
      'Online Plan: Buy kit individually or share with 4 friends',
      'Physical Plan: Kits provided (1 kit per 4 students)',
      'Physical Plan: Max 40 students/class (Western & Southern Provinces)',
      'Payable in 6 easy installments',
      'Intro to STEAM, Structures & Sensors'
    ],
  },
  {
    id: 3,
    name: 'Senior Robotics & AI',
    tagline: '6 Months • 1st Month Free',
    grade: 'Age 14-16',
    location: 'Online / Physical (WP & SP)',
    color: 'var(--stickem-blue)',
    emoji: '⚙️',
    pricingOptions: [
      {
        type: 'Online Plan',
        original: '30,000',
        discounted: '25,000',
        unit: 'LKR',
        seatsMax: 50,
        seatsTaken: 35,
        seatLabel: 'Online Seats'
      },
      {
        type: 'Physical Plan',
        original: '40,000',
        discounted: '35,000',
        unit: 'LKR',
        seatsMax: 40,
        seatsTaken: 30,
        seatLabel: 'Physical Seats'
      }
    ],
    features: [
      '1st month completely FREE & Online for everyone',
      'Online Plan: Buy kit individually or share with 4 friends',
      'Physical Plan: Kits provided (1 kit per 4 students)',
      'Physical Plan: Max 40 students/class (Western & Southern Provinces)',
      'Payable in 6 easy installments',
      'Mechanical Design & Programming Control Flow'
    ],
  },
  {
    id: 4,
    name: 'Advanced Robotics & AI',
    tagline: '6 Months • 1st Month Free',
    grade: 'Age 17-19',
    location: 'Online / Physical (WP & SP)',
    color: 'var(--stickem-red)',
    emoji: '🚀',
    pricingOptions: [
      {
        type: 'Online Plan',
        original: '30,000',
        discounted: '25,000',
        unit: 'LKR',
        seatsMax: 20,
        seatsTaken: 12,
        seatLabel: 'Online Seats'
      },
      {
        type: 'Physical Plan',
        original: '45,000',
        discounted: '40,000',
        unit: 'LKR',
        seatsMax: 40,
        seatsTaken: 8,
        seatLabel: 'Physical Seats'
      }
    ],
    features: [
      '1st month completely FREE & Online for everyone',
      'Online Plan: Buy kit individually or share with 4 friends',
      'Physical Plan: Kits provided (1 kit per 4 students)',
      'Physical Plan: Max 40 students/class (Western & Southern Provinces)',
      'Payable in 6 easy installments',
      'Strategic Project Scoping & Technical Architecture'
    ],
  }
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
  const [paymentMode, setPaymentMode] = useState('monthly');

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
          <p style={{ color: 'rgba(15,23,42,0.7)', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto', marginBottom: '2rem' }}>
            Expertly crafted programs based on world-class Stick'Em curriculum.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: paymentMode === 'monthly' ? 700 : 500, color: paymentMode === 'monthly' ? 'var(--dark-text)' : 'gray', cursor: 'pointer' }} onClick={() => setPaymentMode('monthly')}>Monthly Fee</span>
            <div 
              onClick={() => setPaymentMode(paymentMode === 'monthly' ? 'full' : 'monthly')}
              style={{ 
                width: '60px', height: '32px', background: paymentMode === 'monthly' ? '#8b5cf6' : '#25D366', 
                borderRadius: '16px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
            >
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{
                  width: '24px', height: '24px', background: 'white', borderRadius: '50%',
                  position: 'absolute', top: '4px', left: paymentMode === 'monthly' ? '4px' : '32px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              />
            </div>
            <span style={{ fontWeight: paymentMode === 'full' ? 700 : 500, color: paymentMode === 'full' ? 'var(--dark-text)' : 'gray', cursor: 'pointer' }} onClick={() => setPaymentMode('full')}>6-Month Full Fee</span>
          </div>

        </motion.div>

        {/* Horizontal Online Package */}
        {packages.filter(p => p.id === 0).map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 90 }}
            whileHover={{ y: -4, scale: 1.01 }}
            style={{ 
              borderTop: `5px solid ${pkg.color}`, 
              position: 'relative', 
              background: 'white',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
              marginBottom: '3rem',
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            className="horizontal-package"
          >
            {/* Badge */}
            {(pkg.popular || pkg.badge) && (
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                style={{
                  position: 'absolute', top: '-14px', left: '2rem',
                  background: pkg.badge ? '#8b5cf6' : 'var(--stickem-red)', color: 'white',
                  fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Outfit',
                  borderRadius: '0.4rem', padding: '0.35rem 0.85rem',
                  border: '2px solid var(--dark-text)',
                  boxShadow: '2px 2px 0px rgba(0,0,0,0.25)'
                }}
              >
                {pkg.badge || '⭐ POPULAR'}
              </motion.div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', marginTop: '1rem', alignItems: 'center' }}>
              {/* Column 1: Header */}
              <div style={{ flex: '1 1 250px' }}>
                <motion.div
                  style={{ fontSize: '3rem', marginBottom: '0.5rem' }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {pkg.emoji}
                </motion.div>
                <h3 style={{ fontSize: '1.75rem', color: pkg.color, marginBottom: '0.5rem' }}>{pkg.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{
                    background: pkg.color + '22', color: pkg.color,
                    border: `1px solid ${pkg.color}`, borderRadius: '0.4rem',
                    padding: '0.2rem 0.55rem', fontSize: '0.85rem', fontWeight: 600
                  }}>{pkg.tagline}</span>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.6)', fontWeight: 500 }}>{pkg.grade}</span>
                </div>
                {pkg.location && (
                  <div style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.7)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>📍</span> <span>{pkg.location}</span>
                  </div>
                )}
              </div>

              {/* Column 2: Features */}
              <div style={{ flex: '2 1 300px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {pkg.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: pkg.color, color: 'white', fontSize: '0.7rem',
                        fontWeight: 800, flexShrink: 0, marginTop: '2px'
                      }}>✓</span>
                      <span style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.85)' }}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Price & CTA */}
              <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pkg.pricingOptions.map((opt, i) => (
                  <div key={i} style={{ background: 'rgba(15,23,42,0.03)', padding: '1rem', borderRadius: '0.75rem', border: `1px solid ${pkg.color}33` }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: pkg.color, marginBottom: '0.4rem' }}>{opt.type}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.75rem', color: 'var(--dark-text)' }}>
                        {paymentMode === 'monthly' ? getMonthlyPrice(opt.discounted) : opt.discounted}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.55)' }}>
                        {opt.unit} {paymentMode === 'monthly' ? '/ mo' : ''}
                      </span>
                      {opt.original && (
                        <span style={{ textDecoration: 'line-through', fontSize: '0.9rem', color: 'rgba(15,23,42,0.4)', marginLeft: 'auto' }}>
                          {paymentMode === 'monthly' ? getMonthlyPrice(opt.original) : opt.original}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.04, rotate: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => window.open('https://forms.gle/6wwrdLxbqCtPyiAy5', '_blank')}
                  style={{
                    width: '100%', padding: '1rem',
                    background: pkg.color, color: 'white',
                    border: `2px solid ${pkg.color}`, borderRadius: '0.5rem',
                    fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer',
                    boxShadow: `4px 4px 0px rgba(0,0,0,0.2)`, transition: 'all 0.2s'
                  }}
                >
                  Enroll Online Now 🎓
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="packages-grid" style={{ alignItems: 'stretch' }}>
          {packages.filter(p => p.id !== 0).map((pkg, index) => (
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
              {(pkg.popular || pkg.badge) && (
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  style={{
                    position: 'absolute', top: '-14px', right: '16px',
                    background: pkg.badge ? '#8b5cf6' : 'var(--stickem-red)', color: 'white',
                    fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Outfit',
                    borderRadius: '0.4rem', padding: '0.25rem 0.65rem',
                    border: '2px solid var(--dark-text)',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.25)'
                  }}
                >
                  {pkg.badge || '⭐ POPULAR'}
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
                          {paymentMode === 'monthly' ? getMonthlyPrice(opt.discounted) : opt.discounted}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'rgba(15,23,42,0.55)' }}>
                          {opt.unit} {paymentMode === 'monthly' ? '/ mo' : ''}
                        </span>
                        {opt.original && (
                          <span style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: 'rgba(15,23,42,0.4)', marginLeft: 'auto' }}>
                            {paymentMode === 'monthly' ? getMonthlyPrice(opt.original) : opt.original}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: '4rem',
            padding: '2.5rem 2rem',
            background: 'white',
            borderRadius: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
            borderTop: '5px solid #25D366',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <h3 style={{ fontSize: '1.75rem', color: 'var(--dark-text)', margin: 0 }}>
            Looking for Group or Individual Classes?
          </h3>
          <p style={{ color: 'rgba(15,23,42,0.7)', margin: 0, maxWidth: '600px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            We also offer tailored individual and small group classes to fit your specific needs. Please contact our team via WhatsApp to discuss personalized arrangements!
          </p>
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://wa.me/message/4G4ZERPPUXOCH1', '_blank')}
            style={{
              background: '#25D366',
              color: 'white',
              border: 'none',
              borderRadius: '2rem',
              padding: '0.8rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: 'Outfit',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
              marginTop: '1rem',
              transition: 'all 0.2s'
            }}
          >
            <FaWhatsapp size={22} />
            Contact on WhatsApp
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
