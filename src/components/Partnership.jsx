import React from 'react';
import { motion } from 'framer-motion';

const Partnership = () => {
  return (
    <section id="partnership" style={{ padding: '6rem 0', background: 'var(--dark-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Powered by <span className="text-highlight-blue">Stick'Em</span>
          </h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
            Bringing a golden way of learning to Sri Lanka in partnership with world-class innovators.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--stickem-blue)', borderRadius: '50%', opacity: 0.1 }}></div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>World Winners of Hult Prize</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              Stick'Em is the proud winner of the prestigious Hult Prize International Startup Competition, securing <strong>$1 Million USD</strong> in funding.
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              Recognized by industry experts globally, their kits provide an unparalleled foundation for robotics and entrepreneurship. At RobotSticks, we exclusively use Stick'Em kits to ensure our students receive the absolute best STEAM education available.
            </p>
            <img src="/Partners of Stick Em.png" alt="Partners of Stick Em" style={{ width: '100%', borderRadius: '0.5rem', border: '2px solid var(--dark-bg)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--stickem-green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', border: '2px solid var(--darker-bg)' }}>1</div>
              <div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Global Recognition</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Validated by top experts worldwide.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--stickem-yellow)', color: 'var(--dark-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', border: '2px solid var(--darker-bg)' }}>2</div>
              <div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Hands-on Learning</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Building real robots with safe, durable kits.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--stickem-red)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', border: '2px solid var(--darker-bg)' }}>3</div>
              <div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Entrepreneurial Mindset</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Moving beyond tech to teach business and pitches.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
