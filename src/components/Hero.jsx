import React from 'react';
import { motion } from 'framer-motion';

// Floating colourful bubble
const Bubble = ({ size, color, top, left, delay, duration }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      top,
      left,
      opacity: 0.18,
      zIndex: 0,
      pointerEvents: 'none',
    }}
    animate={{ y: [0, -20, 0], x: [0, 8, 0], rotate: [0, 15, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);


const Hero = () => {
  const bubbles = [
    { size: '90px',  color: 'var(--stickem-yellow)',  top: '15%', left: '8%',  delay: 0,   duration: 5 },
    { size: '60px',  color: 'var(--stickem-red)',     top: '70%', left: '5%',  delay: 1,   duration: 6 },
    { size: '50px',  color: 'var(--stickem-green)',   top: '30%', left: '90%', delay: 0.5, duration: 4.5 },
    { size: '75px',  color: 'var(--stickem-blue)',    top: '80%', left: '88%', delay: 1.5, duration: 5.5 },
    { size: '40px',  color: 'var(--stickem-purple)',  top: '10%', left: '75%', delay: 2,   duration: 4 },
    { size: '55px',  color: 'var(--stickem-lightblue)', top: '60%', left: '92%', delay: 0.8, duration: 6.5 },
  ];


  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
    })
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.7, rotate: -8 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 100, damping: 14, delay: 0.3 } }
  };

  return (
    <section id="about" className="hero-section" style={{ position: 'relative' }}>
      {/* Decorative bubbles */}
      {bubbles.map((b, i) => <Bubble key={i} {...b} />)}


      <div className="container hero-grid" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left: text */}
        <div>
          <motion.div
            custom={0} variants={textVariants} initial="hidden" animate="visible"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--lighter-bg)', border: '2px solid var(--glass-border)',
              borderRadius: '2rem', padding: '0.4rem 1rem', marginBottom: '1.25rem',
              fontWeight: 600, fontSize: '0.9rem', color: 'var(--stickem-blue)'
            }}
          >
            <motion.span animate={{ rotate: [0, 20, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>🤖</motion.span>
            STEAM Education for Sri Lanka
          </motion.div>

          <motion.h1 className="hero-title" custom={1} variants={textVariants} initial="hidden" animate="visible">
            Empowering the Future with{' '}
            <motion.span
              className="text-highlight-red"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              STEAM Education
            </motion.span>
          </motion.h1>

          <motion.p className="hero-desc" custom={2} variants={textVariants} initial="hidden" animate="visible">
            Science, Technology, Engineering, Arts & Mathematics — it's more than subjects, it's a <strong>way of thinking</strong>. At RobotSticks, we prepare students for tomorrow by giving them hands-on robotics tools and an entrepreneurial mindset.
          </motion.p>

          <motion.div className="hero-buttons" custom={3} variants={textVariants} initial="hidden" animate="visible">
            <motion.button
              className="btn-primary"
              onClick={() => window.open('https://forms.gle/6wwrdLxbqCtPyiAy5', '_blank')}
              whileHover={{ scale: 1.07, rotate: -1 }}
              whileTap={{ scale: 0.94 }}
            >
              Join the Academy 🎓
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={() => window.location.href = '#partnership'}
              whileHover={{ scale: 1.07, rotate: 1 }}
              whileTap={{ scale: 0.94 }}
            >
              Learn More ✨
            </motion.button>
          </motion.div>

          {/* Mini badges */}
          <motion.div
            custom={4} variants={textVariants} initial="hidden" animate="visible"
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}
          >
            {[
              { emoji: '🏆', text: 'Award-winning Kits', color: 'var(--stickem-yellow)' },
              { emoji: '🧠', text: 'Critical Thinking',   color: 'var(--stickem-blue)'   },
              { emoji: '🚀', text: 'Future Leaders',      color: 'var(--stickem-red)'    },
            ].map(({ emoji, text, color }) => (
              <motion.span
                key={text}
                whileHover={{ y: -3, scale: 1.05 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'white', border: `2px solid ${color}`,
                  borderRadius: '0.5rem', padding: '0.35rem 0.75rem',
                  fontSize: '0.85rem', fontWeight: 600, boxShadow: `3px 3px 0px ${color}40`
                }}
              >
                <span>{emoji}</span> {text}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right: image with fun frame */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative' }}
        >
          {/* Colourful border frame */}
          <div style={{
            position: 'absolute', inset: '-8px',
            borderRadius: '1.2rem',
            border: '4px solid transparent',
            background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, var(--stickem-yellow), var(--stickem-red), var(--stickem-blue), var(--stickem-green)) border-box`,
            zIndex: 0,
          }} />
          <motion.img
            src="/Innovations.png"
            alt="STEAM Innovations"
            style={{
              width: '100%', height: 'auto',
              borderRadius: '1rem',
              boxShadow: '8px 8px 0px rgba(0,0,0,0.15)',
              display: 'block', position: 'relative', zIndex: 1,
              objectFit: 'cover'
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating sticker badges */}
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '-20px', right: '-16px', zIndex: 2,
              background: 'var(--stickem-yellow)', color: 'var(--dark-text)',
              borderRadius: '50%', width: '68px', height: '68px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', fontWeight: 800, textAlign: 'center', lineHeight: 1.2,
              border: '3px solid var(--dark-text)', boxShadow: '3px 3px 0px rgba(0,0,0,0.3)'
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🥇</span>
            #1 STEAM
          </motion.div>

          <motion.div
            animate={{ rotate: [0, -8, 8, 0], y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute', bottom: '-16px', left: '-12px', zIndex: 2,
              background: 'var(--stickem-green)', color: 'white',
              borderRadius: '0.5rem', padding: '0.4rem 0.7rem',
              fontSize: '0.75rem', fontWeight: 700,
              border: '2px solid var(--dark-text)', boxShadow: '3px 3px 0px rgba(0,0,0,0.25)'
            }}
          >
            🤖 Build Robots!
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
