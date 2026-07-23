import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    emoji: '🌍',
    title: 'Global Recognition',
    desc: 'Validated by top experts and judges worldwide at the Hult Prize.',
    color: 'var(--stickem-green)',
  },
  {
    emoji: '🔧',
    title: 'Hands-on Learning',
    desc: 'Building real robots with safe, award-winning Stick\'Em kits.',
    color: 'var(--stickem-yellow)',
  },
  {
    emoji: '💡',
    title: 'Entrepreneurial Mindset',
    desc: 'Moving beyond tech to teach business thinking, pitching & leadership.',
    color: 'var(--stickem-red)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};
const itemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Partnership = () => {
  return (
    <section id="partnership" className="partnership-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="partnership-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Powered by{' '}
            <motion.span
              className="text-highlight-blue"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ display: 'inline-block' }}
            >
              Stick'Em
            </motion.span>{' '}
            🏆
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(15,23,42,0.75)', maxWidth: '680px', margin: '0 auto' }}>
            Bringing a golden way of learning to Sri Lanka in partnership with world-class innovators.
          </p>
        </motion.div>

        <div className="partnership-grid">
          {/* Left card */}
          <motion.div
            className="partner-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative corner circle */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '120px', height: '120px',
              borderRadius: '50%', background: 'var(--stickem-blue)', opacity: 0.07
            }} />

            <motion.div
              style={{ fontSize: '3rem', marginBottom: '1rem' }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              🥇
            </motion.div>

            <h3 style={{ fontSize: '1.7rem', marginBottom: '1rem', color: 'var(--dark-text)' }}>
              World Winners of <span style={{ color: 'var(--stickem-blue)' }}>Hult Prize</span>
            </h3>

            <p style={{ marginBottom: '1rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
              Stick'Em is the proud winner of the prestigious <strong>Hult Prize International Startup Competition</strong>,
              securing <span style={{ color: 'var(--stickem-green)', fontWeight: 700 }}>$1 Million USD</span> in funding.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'rgba(15,23,42,0.8)' }}>
              Recognized by industry experts globally, their kits provide an unparalleled foundation for robotics and entrepreneurship.
              At RobotSticks, we exclusively use Stick'Em kits.
            </p>

            <motion.img
              src="/Partners of Stick Em.png"
              alt="Partners of Stick Em"
              style={{ width: '100%', borderRadius: '0.75rem', border: '2px solid var(--glass-border)' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Right: feature list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {features.map((f) => (
              <motion.div key={f.title} className="feature-item" variants={itemVariants} whileHover={{ x: 4 }}>
                <div
                  className="feature-badge"
                  style={{ background: f.color, color: 'white', border: '2px solid rgba(0,0,0,0.1)', boxShadow: `4px 4px 0px ${f.color}55` }}
                >
                  {f.emoji}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.3rem' }}>{f.title}</h4>
                  <p style={{ color: 'rgba(15,23,42,0.7)', fontSize: '0.95rem' }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Prize badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
              whileHover={{ rotate: -2, scale: 1.02 }}
              style={{
                marginTop: '0.5rem',
                padding: '1.25rem',
                borderRadius: '1rem',
                background: 'var(--stickem-yellow)',
                border: '3px solid var(--dark-text)',
                boxShadow: '5px 5px 0px rgba(0,0,0,0.25)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>🎉</div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.1rem', color: 'var(--dark-text)' }}>
                $1 Million USD Winner
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(15,23,42,0.75)', marginTop: '0.2rem' }}>
                Hult Prize International Competition
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
