import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.1)' : 'none',
        borderBottom: '2px solid rgba(0,0,0,0.07)',
      }}
    >
      {/* Desktop bar */}
      <div className="container navbar-inner" style={{ padding: scrolled ? '0.75rem 1.5rem' : '1rem 1.5rem', transition: 'padding 0.3s' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <motion.img
            src="/Logo.svg"
            alt="RobotSticks Logo"
            style={{ height: '42px' }}
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {['About STEAM', 'Partnership', 'Packages'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              whileHover={{ scale: 1.05, color: 'var(--stickem-red)' }}
              style={{ color: 'var(--dark-text)', fontWeight: 600 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            className="btn-primary"
            onClick={() => window.location.href = '#register'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now 🚀
          </motion.button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <a href="#about" onClick={closeMenu}>About STEAM</a>
            <a href="#partnership" onClick={closeMenu}>Partnership</a>
            <a href="#packages" onClick={closeMenu}>Packages</a>
            <button className="btn-primary" onClick={() => { closeMenu(); window.location.href = '#register'; }}>
              Register Now 🚀
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
