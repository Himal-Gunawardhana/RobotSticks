import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Partnership from './components/Partnership';
import Packages from './components/Packages';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

// Animated STEAM icon row
const SteamIcons = () => {
  const icons = [
    { emoji: '🔬', label: 'Science' },
    { emoji: '💻', label: 'Technology' },
    { emoji: '⚙️', label: 'Engineering' },
    { emoji: '🎨', label: 'Arts' },
    { emoji: '📐', label: 'Mathematics' },
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 3rem)', flexWrap: 'wrap', padding: '2.5rem 1rem 0' }}>
      {icons.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          whileHover={{ y: -6, scale: 1.1 }}
          style={{ textAlign: 'center', cursor: 'default' }}
        >
          <motion.div
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.3rem' }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {item.emoji}
          </motion.div>
          <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.9rem', color: 'var(--dark-text)' }}>
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />

      {/* STEAM Icons strip */}
      <section style={{ padding: '2rem 0 3rem', background: 'var(--lighter-bg)', borderTop: '2px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontWeight: 600, color: 'rgba(15,23,42,0.6)', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            What is STEAM?
          </motion.p>
          <SteamIcons />
        </div>
      </section>

      <Stats />
      <Partnership />
      <Packages />

      {/* Registration Section */}
      <section id="register" className="register-section">
        <div className="container register-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--stickem-green)', color: 'white',
                borderRadius: '0.5rem', padding: '0.35rem 0.9rem',
                fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem',
                border: '2px solid var(--dark-text)', boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
              }}
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎉 Limited Spots Available!
            </motion.div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
              Ready to <span className="text-highlight-green">Begin?</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(15,23,42,0.75)', marginBottom: '2rem', lineHeight: 1.8 }}>
              Join RobotSticks today and start your STEAM journey. Empower your child with the skills of tomorrow, today.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.a
                href="#"
                className="btn-primary"
                whileHover={{ scale: 1.07, rotate: -1 }}
                whileTap={{ scale: 0.94 }}
                style={{ padding: '0.9rem 2.5rem', fontSize: '1.15rem' }}
              >
                Register Now 🚀
              </motion.a>
              <motion.a
                href={`https://wa.me/94767863340`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07, rotate: 1 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.9rem 1.5rem', fontSize: '1rem', fontWeight: 600,
                  background: '#25D366', color: 'white', borderRadius: '0.5rem',
                  border: '2px solid #1DA851', boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
                  fontFamily: 'Outfit', cursor: 'pointer'
                }}
              >
                💬 WhatsApp Us
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
          >
            <motion.img
              src="/Design.png"
              alt="STEAM Design"
              style={{
                width: '100%', borderRadius: '1rem',
                border: '4px solid var(--dark-text)',
                boxShadow: '10px 10px 0px rgba(0,0,0,0.15)',
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <motion.img
            src="/Logo.svg"
            alt="RobotSticks Logo"
            style={{ height: '52px' }}
            whileHover={{ rotate: -5, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
            <a href="#about" style={{ color: 'rgba(15,23,42,0.6)' }}>About STEAM</a>
            <a href="#partnership" style={{ color: 'rgba(15,23,42,0.6)' }}>Partnership</a>
            <a href="#packages" style={{ color: 'rgba(15,23,42,0.6)' }}>Packages</a>
            <a href="#register" style={{ color: 'rgba(15,23,42,0.6)' }}>Register</a>
          </div>
          <p style={{ color: 'rgba(15,23,42,0.4)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} RobotSticks Academy. All rights reserved.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}

export default App;
