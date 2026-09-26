import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Mascot from './Mascot';

// Import bots
import bot1 from '../assets/bot1.png';
import bot2 from '../assets/bot2.png';
import bot3 from '../assets/bot3.png';
import bot4 from '../assets/bot4.png';
import bot5 from '../assets/bot5.png';

const ProgressBar = ({ taken, max, label, color }) => {
  const percentage = Math.min(100, Math.max(0, (taken / max) * 100));
  return (
    <div style={{ marginBottom: '0.4rem', fontSize: '0.75rem' }}>
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

const ProgramsOverview = () => {
  const [heroMascotVisible, setHeroMascotVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setHeroMascotVisible(true), 500);
    const timer2 = setTimeout(() => setHeroMascotVisible(false), 6500);
    const handleScroll = () => { if (window.scrollY > 100) setHeroMascotVisible(false); };
    window.addEventListener('scroll', handleScroll);
    return () => { clearTimeout(timer); clearTimeout(timer2); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const programs = [
    {
      id: 'kids-steam',
      displayId: 1,
      badge: 'Ages 7–10',
      title: 'Kids STEAM',
      hook: 'Where curious kids become young inventors.',
      tagline: '6 months · Month 1 Free',
      mascotMsg: "Let's go build something!",
      color: '#8b5cf6',
      seats: [
        { label: 'Online', taken: 45, max: 60 },
        { label: 'Physical', taken: 35, max: 40 }
      ]
    },
    {
      id: 'junior-robotics',
      displayId: 2,
      badge: 'Ages 11–13',
      title: 'Junior Robotics & AI',
      hook: 'From curious builder to confident innovator.',
      tagline: '6 months · Month 1 Free',
      mascotMsg: 'Ready to code your first robot?',
      color: 'var(--stickem-green)',
      seats: [
        { label: 'Online', taken: 55, max: 70 },
        { label: 'Physical', taken: 35, max: 40 }
      ]
    },
    {
      id: 'senior-robotics',
      displayId: 3,
      badge: 'Ages 14–16',
      title: 'Senior Robotics & AI',
      hook: 'Engineer it. Design it. Pitch it like a founder.',
      tagline: '6 months · Month 1 Free',
      mascotMsg: 'Time to engineer something real.',
      color: 'var(--stickem-blue)',
      seats: [
        { label: 'Online', taken: 35, max: 50 },
        { label: 'Physical', taken: 30, max: 40 }
      ]
    },
    {
      id: 'advanced-robotics',
      displayId: 4,
      badge: 'Ages 17–19',
      title: 'Advanced Robotics & AI',
      hook: 'Your innovation accelerator before university.',
      tagline: '6 months · Month 1 Free',
      mascotMsg: 'Let\'s ship your first product.',
      color: 'var(--stickem-red)',
      seats: [
        { label: 'Online', taken: 12, max: 20 },
        { label: 'Physical', taken: 8, max: 40 }
      ]
    }
  ];

  return (
    <div style={{ paddingTop: '70px', background: 'var(--bg-color)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* 1. Hero Section */}
      <section style={{ padding: '3rem 2rem 1rem', textAlign: 'center', position: 'relative' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--dark-text)', marginBottom: '1rem', lineHeight: 1.1 }}
        >
          Explore Our <span className="text-highlight-yellow">Programs</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontSize: '1.25rem', color: 'rgba(15,23,42,0.7)', maxWidth: '800px', margin: '0 auto 1rem', lineHeight: 1.6 }}
        >
          We currently offer <strong>4 highly interactive programs</strong>, available in both <strong>Sinhala & English</strong> mediums.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ fontSize: '1rem', color: 'rgba(15,23,42,0.6)', maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}
        >
          Click on any program below to discover what's included, view class recordings, and explore physical vs online learning options.
        </motion.p>

        {/* Hero Mascot */}
        <div onMouseEnter={() => setHeroMascotVisible(true)} onMouseLeave={() => setHeroMascotVisible(false)} style={{ position: 'absolute', bottom: '15%', right: '10%', width: '100px', height: '100px', zIndex: 10 }}>
          <Mascot isVisible={heroMascotVisible} message="Hi! Let's find the perfect class!" position="top-left" imgSrc={bot1} />
        </div>
      </section>

      {/* Program Cards Grid */}
      <section id="programs-grid" className="container" style={{ padding: '1rem 1rem 4rem' }}>
        <div className="programs-grid-layout">
          {programs.map(prog => (
            <motion.div
              key={prog.id}
              onHoverStart={() => setHoveredCard(prog.id)}
              onHoverEnd={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              style={{
                background: 'white', padding: '1.5rem', borderRadius: '1.25rem',
                border: '2px solid rgba(0,0,0,0.05)', position: 'relative',
                display: 'flex', flexDirection: 'column', height: '100%'
              }}
            >
              <div style={{ background: '#8b5cf6', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
                {prog.badge}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--dark-text)' }}>{prog.title}</h3>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(15,23,42,0.6)', marginBottom: '0.75rem' }}>{prog.hook}</p>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, background: 'rgba(0,0,0,0.05)', padding: '0.3rem 0.6rem', borderRadius: '0.4rem', marginBottom: '1.5rem', display: 'inline-block' }}>
                {prog.tagline}
              </div>
              
              <div style={{ marginTop: 'auto' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stickem-red)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    ⚠️ Space is limited!
                  </div>
                  {prog.seats.map((seat, i) => (
                    <ProgressBar key={i} taken={seat.taken} max={seat.max} label={seat.label} color={prog.color} />
                  ))}
                </div>
                <Link to={`/programs/${prog.id}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: 'transparent', border: '2px solid var(--dark-text)', color: 'var(--dark-text)', padding: '0.6rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                  View Program Details →
                </Link>
              </div>

              <Mascot isVisible={hoveredCard === prog.id} message={prog.mascotMsg} position="top-right" imgSrc={prog.displayId === 1 ? bot2 : prog.displayId === 2 ? bot3 : prog.displayId === 3 ? bot4 : bot5} style={{ top: '-10px', right: '-10px' }} />
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProgramsOverview;
