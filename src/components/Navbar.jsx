import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
        background: scrolled ? 'rgba(4, 41, 58, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/Logo.svg" alt="RobotSticks Logo" style={{ height: '40px' }} />
            <h1 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--stickem-yellow)' }}>
              RobotSticks
            </h1>
          </div>
        </a>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ fontWeight: 500, transition: 'color 0.3s', color: 'white' }}>About STEAM</a>
          <a href="#partnership" style={{ fontWeight: 500, transition: 'color 0.3s', color: 'white' }}>Partnership</a>
          <a href="#packages" style={{ fontWeight: 500, transition: 'color 0.3s', color: 'white' }}>Packages</a>
          <button className="btn-primary" onClick={() => window.location.href='#register'}>
            Register Now
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
