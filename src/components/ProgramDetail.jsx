import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mascot from './Mascot';
import Recordings from './Recordings';

// Import bots
import bot4 from '../assets/bot4.png';
import bot6 from '../assets/bot6.png';
import bot7 from '../assets/bot7.png';
import bot8 from '../assets/bot8.png';
import bot9 from '../assets/bot9.png';
import bot10 from '../assets/bot10.png';
import kokoLogo from '../assets/koko.jpeg';

const programsData = {
  'kids-steam': {
    id: 1,
    badge: 'Ages 7–10',
    title: 'Kids STEAM',
    hook: 'Where curious kids become young inventors.',
    tagline: '6 months · Month 1 Free',
    color: '#8b5cf6',
    prices: { online: '3,000 LKR', physical: '5,000 LKR' },
    seats: {
      online: { max: 60, taken: 45, label: 'Online Seats' },
      physical: { max: 40, taken: 35, label: 'Physical Seats' }
    },
    includes: [
      'Introduction to structures and mechanisms',
      'Basic electronics and circuit building',
      'Fun weekly challenges',
      'Certificate of completion'
    ]
  },
  'junior-robotics': {
    id: 2,
    badge: 'Ages 11–13',
    title: 'Junior Robotics & AI',
    hook: 'From curious builder to confident innovator.',
    tagline: '6 months · Month 1 Free',
    color: 'var(--stickem-green)',
    prices: { online: '4,000 LKR', physical: '6,000 LKR' },
    seats: {
      online: { max: 70, taken: 55, label: 'Online Seats' },
      physical: { max: 40, taken: 35, label: 'Physical Seats' }
    },
    includes: [
      'Programming basics and logic',
      'Sensor integration and calibration',
      'Building autonomous robots',
      'Team-based problem solving'
    ]
  },
  'senior-robotics': {
    id: 3,
    badge: 'Ages 14–16',
    title: 'Senior Robotics & AI',
    hook: 'Engineer it. Design it. Pitch it like a founder.',
    tagline: '6 months · Month 1 Free',
    color: 'var(--stickem-blue)',
    prices: { online: '4,000 LKR', physical: '6,000 LKR' },
    seats: {
      online: { max: 50, taken: 35, label: 'Online Seats' },
      physical: { max: 40, taken: 30, label: 'Physical Seats' }
    },
    includes: [
      'Advanced robotics mechanics',
      'Introduction to AI and machine learning concepts',
      'Product design and pitching',
      'Real-world industry applications'
    ]
  },
  'advanced-robotics': {
    id: 4,
    badge: 'Ages 17–19',
    title: 'Advanced Robotics & AI',
    hook: 'Your innovation accelerator before university.',
    tagline: '6 months · Month 1 Free',
    color: 'var(--stickem-red)',
    prices: { online: '4,500 LKR', physical: '6,500 LKR' },
    seats: {
      online: { max: 20, taken: 12, label: 'Online Seats' },
      physical: { max: 40, taken: 8, label: 'Physical Seats' }
    },
    includes: [
      'Complex systems engineering',
      'Advanced AI and computer vision',
      'Capstone project portfolio building',
      'University and career readiness preparation'
    ]
  }
};

const faqs = [
  { q: 'Do online students need the kit from Day 1?', a: 'Month 1 is free and designed to work without a kit for the first sessions; kit ownership becomes necessary once hands-on building begins. [TO CONFIRM]' },
  { q: 'What happens if someone in my group of 4 drops out before the kit ships?', a: 'Reach out to our team and we\'ll help you find a replacement group member or adjust your order. [TO CONFIRM]' },
  { q: 'Can I switch from Online to Physical (or back) partway through the program?', a: 'Yes, subject to space availability at your chosen location. [TO CONFIRM]' },
  { q: 'Can I pay the full kit price using Koko, or only part of it?', a: 'You can split payments using Koko. [TO CONFIRM with Koko integration]' },
  { q: 'What is the Kit Buy-Back / Reimbursement policy?', a: 'For our online students, we offer a 75% reimbursement facility. If you return your Stick \'Em kit to us in good, working condition after completing the program, we will buy it back from you for 75% of its value.' }
];

const ProgressBar = ({ taken, max, label, color }) => {
  const percentage = Math.min(100, Math.max(0, (taken / max) * 100));
  return (
    <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: 'rgba(15,23,42,0.8)' }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ fontWeight: 700 }}>{taken} / {max}</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'rgba(15,23,42,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ height: '100%', background: color, borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

const ProgramDetail = () => {
  const { programId } = useParams();
  const program = programsData[programId];

  const [showPhysicalBuddy, setShowPhysicalBuddy] = useState(false);
  const [showOnlineBuddy, setShowOnlineBuddy] = useState(false);
  const [showReceiptBuddy, setShowReceiptBuddy] = useState(false);
  const [hoveredPayment, setHoveredPayment] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showFinalBuddy, setShowFinalBuddy] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programId]);

  if (!program) {
    return <div style={{ paddingTop: '100px', textAlign: 'center' }}><h2>Program not found</h2><Link to="/programs">Back to Programs</Link></div>;
  }

  return (
    <div style={{ paddingTop: '80px', background: 'var(--bg-color)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Hero */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--lighter-bg)', borderBottom: '2px solid var(--glass-border)' }}>
        <Link to="/programs" style={{ display: 'inline-block', marginBottom: '2rem', color: 'rgba(15,23,42,0.6)', fontWeight: 600 }}>← Back to All Programs</Link>
        <br />
        <div style={{ background: program.color, color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 700, display: 'inline-block', marginBottom: '1rem' }}>
          {program.badge}
        </div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--dark-text)', marginBottom: '1rem' }}>
          {program.title}
        </motion.h1>
        <p style={{ fontSize: '1.25rem', color: 'rgba(15,23,42,0.7)', maxWidth: '600px', margin: '0 auto', fontStyle: 'italic' }}>
          {program.hook}
        </p>
      </section>

      {/* What's Included */}
      <section className="container" style={{ padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: 'var(--dark-text)' }}>What's Included in {program.title}</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '2rem', border: '2px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {program.includes.map((item, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: 'rgba(15,23,42,0.8)' }}>
                <span style={{ background: program.color, color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Physical vs Online */}
      <section id="physical-vs-online" className="container" style={{ padding: '3rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', color: 'var(--dark-text)' }}>Same class. Same teacher. Your choice.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {/* Physical Classes */}
          <motion.div
            onViewportEnter={() => setShowPhysicalBuddy(true)}
            onViewportLeave={() => setShowPhysicalBuddy(false)}
            style={{ position: 'relative', background: 'white', padding: '3rem', borderRadius: '2rem', border: '2px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.2rem', color: 'var(--dark-text)' }}>Physical Classes</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: program.color, marginBottom: '0.2rem' }}>
              {program.prices.physical} <span style={{ fontSize: '1rem', color: 'rgba(15,23,42,0.5)', fontWeight: 600 }}>/ mo</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--stickem-red)', fontWeight: 600, marginBottom: '1rem' }}>
              + 1,500 LKR one-time registration fee
            </div>
            <ProgressBar 
              taken={program.seats.physical.taken} 
              max={program.seats.physical.max} 
              label={program.seats.physical.label} 
              color={program.color} 
            />
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(15,23,42,0.8)', fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '2rem', flexGrow: 1 }}>
              <li>📍 Attend in person at Nugegoda or Gampaha.</li>
              <li>🛠️ Build using Robotsticks' own kits - <strong>no kit purchase required.</strong></li>
              <li>🤝 Work alongside classmates with hands-on guidance.</li>
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://forms.gle/6wwrdLxbqCtPyiAy5', '_blank')}
                style={{ width: '100%', padding: '0.8rem', background: program.color, color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
              >
                Enroll for Free Month 1
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://forms.gle/zqHKhAWueNHBEj4p9', '_blank')}
                style={{ width: '100%', padding: '0.8rem', background: 'transparent', color: program.color, border: `2px solid ${program.color}`, borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Register for 6-Month Full Course
              </motion.button>
            </div>
            <Mascot isVisible={showPhysicalBuddy} message="Our kits are already waiting for you here!" position="top-right" imgSrc={bot6} />
          </motion.div>

          {/* Online Classes */}
          <motion.div
            onViewportEnter={() => setShowOnlineBuddy(true)}
            onViewportLeave={() => setShowOnlineBuddy(false)}
            style={{ position: 'relative', background: 'white', padding: '3rem', borderRadius: '2rem', border: '2px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.2rem', color: 'var(--dark-text)' }}>Online Classes</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: program.color, marginBottom: '0.2rem' }}>
              {program.prices.online} <span style={{ fontSize: '1rem', color: 'rgba(15,23,42,0.5)', fontWeight: 600 }}>/ mo</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--stickem-red)', fontWeight: 600, marginBottom: '1rem' }}>
              + 1,500 LKR one-time registration fee
            </div>
            <ProgressBar 
              taken={program.seats.online.taken} 
              max={program.seats.online.max} 
              label={program.seats.online.label} 
              color={program.color} 
            />
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(15,23,42,0.8)', fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '2rem', flexGrow: 1 }}>
              <li>🎥 Join the live stream of the exact same workshop class.</li>
              <li>💬 Interact with the instructor in real time.</li>
              <li>📦 <strong>Online students must own a Stick 'Em kit</strong> to build along.</li>
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://forms.gle/6wwrdLxbqCtPyiAy5', '_blank')}
                style={{ width: '100%', padding: '0.8rem', background: program.color, color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
              >
                Enroll for Free Month 1
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://forms.gle/zqHKhAWueNHBEj4p9', '_blank')}
                style={{ width: '100%', padding: '0.8rem', background: 'transparent', color: program.color, border: `2px solid ${program.color}`, borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Register for 6-Month Full Course
              </motion.button>
            </div>
            <Mascot isVisible={showOnlineBuddy} message="Grab your kit and build right alongside us - live!" position="top-right" imgSrc={bot7} />
          </motion.div>
        </div>
      </section>

      {/* Kit & Pricing Section */}
      <section id="pricing" className="container" style={{ padding: '5rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', color: 'var(--dark-text)' }}>Need a Kit?</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'rgba(15,23,42,0.7)', lineHeight: 1.6 }}>
            Physical students use our kits in class for free. Online students need to purchase their own kit to follow along at home.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div style={{ maxWidth: '600px', width: '100%', background: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', position: 'relative' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-text)', marginBottom: '1.5rem', fontWeight: 800 }}>
              What you need for {program.title}:
            </h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📦</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--dark-text)', fontSize: '1.1rem' }}>Stick 'Em Robotics Kit</div>
                  <div style={{ color: 'rgba(15,23,42,0.6)', fontSize: '0.9rem', lineHeight: 1.4 }}>The core robotics kit required for all our programs.</div>
                </div>
              </li>
              {programId !== 'kids-steam' && (
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔌</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--dark-text)', fontSize: '1.1rem' }}>Sensor Expansion Kit</div>
                    <div style={{ color: 'rgba(15,23,42,0.6)', fontSize: '0.9rem', lineHeight: 1.4 }}>Required for this program to build advanced AI and autonomous projects.</div>
                  </div>
                </li>
              )}
            </ul>

            <div style={{ background: 'rgba(37, 211, 102, 0.08)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.75rem' }}>♻️</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--stickem-green)', fontSize: '1rem', marginBottom: '0.2rem' }}>75% Kit Buy-Back Guarantee</div>
                <div style={{ color: 'rgba(15,23,42,0.7)', fontSize: '0.85rem', lineHeight: 1.4 }}>Return your kit in good working condition after the program for 75% of its value back!</div>
              </div>
            </div>

            <Link to="/kit" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', padding: '1rem', background: program.color, color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: `0 8px 20px ${program.color}44`
                }}
              >
                Proceed to Kit Store 🛒
              </motion.button>
            </Link>
            <Mascot isVisible={true} message="Check out the exact pricing and order your kit here!" position="top-right" imgSrc={bot8} style={{ top: '-40px', right: '-40px' }} />
          </motion.div>
        </div>
      </section>

      {/* Recordings */}
      <section style={{ padding: '2rem 0', background: 'var(--lighter-bg)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ transform: 'scale(0.9)', transformOrigin: 'top center', marginTop: '-2rem', marginBottom: '-2rem' }}>
          <Recordings programId={programId} hideHeader={true} />
        </div>
      </section>

      {/* FAQ */}
      <section className="container" style={{ padding: '5rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: 'var(--dark-text)' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)} style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--dark-text)', paddingRight: '2rem' }}>{faq.q}</h4>
                <span style={{ fontSize: '1.5rem', color: 'var(--stickem-red)', transform: expandedFAQ === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>+</span>
              </div>
              {expandedFAQ === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ padding: '1.5rem', background: 'var(--lighter-bg)', borderRadius: '0 0 1rem 1rem', marginTop: '-0.5rem', border: '1px solid rgba(0,0,0,0.05)', borderTop: 'none', color: 'rgba(15,23,42,0.7)', lineHeight: 1.6 }}>
                  {faq.a}
                  <Mascot isVisible={true} message={["Good question!", "Here's the answer!", "Great thinking!"][i % 3]} position="bottom-right" imgSrc={bot4} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--dark-text)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <motion.div onViewportEnter={() => setShowFinalBuddy(true)} onViewportLeave={() => setShowFinalBuddy(false)} style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>Let's get building.</h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
            Month 1 is free, however your child joins us.
            <br />
            <span style={{ fontSize: '1rem', color: 'var(--stickem-red)', fontWeight: 600 }}>* A one-time registration fee of 1,500 LKR applies.</span>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <button onClick={() => window.open('https://forms.gle/6wwrdLxbqCtPyiAy5', '_blank')} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.15rem', background: 'var(--stickem-green)', borderColor: 'var(--stickem-green)' }}>
              Enrol for Free Month 1
            </button>
            <button onClick={() => window.open('https://forms.gle/zqHKhAWueNHBEj4p9', '_blank')} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.15rem', background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              Register for 6-Month Full Course
            </button>
            <Mascot isVisible={showFinalBuddy} message="I'll save your seat!" position="top-right" imgSrc={bot10} style={{ right: '-30px', top: '-60px' }} />
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default ProgramDetail;
