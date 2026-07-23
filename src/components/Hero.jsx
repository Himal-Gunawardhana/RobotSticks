import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="about" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: '80px',
      background: 'var(--light-bg)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Empowering the Future with <br />
            <span className="text-highlight-red">STEAM Education</span>
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'rgba(15,23,42,0.8)' }}>
            Science, Technology, Engineering, Arts, and Mathematics (STEAM) is more than just subjects. It's a way of thinking. At RobotSticks, we prepare students for tomorrow by giving them the tools to solve real-world problems today through interactive robotics and entrepreneurship.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" onClick={() => window.location.href='#register'}>Join the Academy</button>
            <button className="btn-secondary" onClick={() => window.location.href='#partnership'}>Learn More</button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          {/* Abstract Robot / STEAM graphic representation */}
          <img 
            src="/Innovations.png" 
            alt="STEAM Innovations" 
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '1rem',
              boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
              border: '4px solid var(--dark-text)',
              objectFit: 'cover'
            }} 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
