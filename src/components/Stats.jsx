import React from 'react';
import CountUpPkg from 'react-countup';
import { motion } from 'framer-motion';

const CountUp = CountUpPkg.default || CountUpPkg;

const Stats = () => {
  const whatsappMembers = 1000;
  const waitlist = Math.floor(whatsappMembers / 2);
  const maxStudents = 160;
  const registeredStudents = 145; // Current registered students Example (approaching max)

  const statsData = [
    { label: 'Facebook Followers', value: 6500, prefix: '', suffix: '+', emoji: '👍', color: 'var(--stickem-blue)' },
    { label: 'WhatsApp Community', value: whatsappMembers, prefix: '', suffix: '+', emoji: '💬', color: 'var(--stickem-green)' },
    { 
      label: 'Registered Students', 
      value: registeredStudents, 
      max: maxStudents, 
      prefix: '', 
      suffix: ` / ${maxStudents}`, 
      emoji: '🎓', 
      color: 'var(--stickem-red)',
      isBar: true
    },
    { label: 'Students on Waitlist', value: waitlist, prefix: '', suffix: '+', emoji: '⏳', color: 'var(--stickem-yellow)' },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '0.5rem' }}>
            Growing Every <span className="text-highlight-red">Day</span> 📈
          </h2>
          <p style={{ color: 'rgba(15,23,42,0.7)', fontSize: '1.05rem' }}>Join a thriving STEAM community</p>
        </motion.div>

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.03 }}
              style={{ borderTop: `4px solid ${stat.color}` }}
            >
              <motion.div
                style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, repeatDelay: 3 }}
              >
                {stat.emoji}
              </motion.div>
              <div className="stat-value" style={{ color: stat.color }}>
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              
              {stat.isBar && (
                <div style={{ marginTop: '0.5rem', marginBottom: '0.75rem', width: '100%', height: '10px', background: 'rgba(0,0,0,0.08)', borderRadius: '5px', overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(stat.value / stat.max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    style={{ height: '100%', background: stat.color, borderRadius: '5px' }}
                  />
                </div>
              )}
              
              <div className="stat-label" style={{ marginTop: stat.isBar ? '0' : '0.5rem' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
