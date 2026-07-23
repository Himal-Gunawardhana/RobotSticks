import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const Stats = () => {
  const statsData = [
    { label: 'Facebook Followers', value: 15400, prefix: '+', suffix: '' },
    { label: 'TikTok Followers', value: 22000, prefix: '+', suffix: '' },
    { label: 'Registered Students', value: 1250, prefix: '', suffix: '' },
    { label: 'Waitlist', value: 340, prefix: '', suffix: '+' }
  ];

  return (
    <section style={{ padding: '4rem 0', background: 'var(--darker-bg)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          textAlign: 'center'
        }}>
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card"
              style={{ padding: '2rem 1rem' }}
            >
              <h3 style={{ fontSize: '2.5rem', color: 'var(--stickem-yellow)', marginBottom: '0.5rem' }}>
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  separator="," 
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </h3>
              <p style={{ fontWeight: '500', color: 'rgba(255,255,255,0.8)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
