import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Mascot from './Mascot';
import bot4 from '../assets/bot4.png';
import bot7 from '../assets/bot7.png';
import bot8 from '../assets/bot8.png';
import bot9 from '../assets/bot9.png';
import bot10 from '../assets/bot10.png';

// ─── Source-of-truth pricing ───────────────────────────────────────────────
const PRICES = {
  roboticsKit: 26881.24,
  sensorExpansion: 9408.43,
  genericSensor: 3000.00,
  shipping: 10752.49,
};

// Discount rules: (sensor_selection) × (valid code) → discount amount
const DISCOUNT_RULES = {
  none: 3000.00,        // Kit only + code
  stickem: 6000.00,     // Kit + Stick'Em sensor + code
};

const PROMO_CODE = 'ROBOTSTICKS25'; // placeholder, team to confirm

const SGD_RATE = 268.8124; // LKR per 1 SGD - team to confirm source

const programs = [
  { id: 'kids-steam', label: 'Kids STEAM (Ages 7–10)', noSensor: true },
  { id: 'junior-robotics', label: 'Junior Robotics & AI (Ages 11–13)', noSensor: false },
  { id: 'senior-robotics', label: 'Senior Robotics & AI (Ages 14–16)', noSensor: false },
  { id: 'advanced-robotics', label: 'Advanced Robotics & AI (Ages 17–19)', noSensor: false },
];

const fmt = (amount, currency, rate) => {
  if (currency === 'SGD') {
    return `SGD ${(amount / rate).toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `LKR ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// ─── Sub-components ────────────────────────────────────────────────────────

const LineItem = ({ label, amount, currency, rate, isMuted, isDiscount, isTotal }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: isTotal ? '1rem 0 0' : '0.6rem 0',
    borderTop: isTotal ? '2px solid rgba(15,23,42,0.12)' : 'none',
    marginTop: isTotal ? '0.5rem' : 0,
  }}>
    <span style={{
      fontSize: isTotal ? '1.15rem' : '0.95rem',
      fontWeight: isTotal ? 800 : isDiscount ? 700 : 500,
      color: isDiscount ? 'var(--stickem-green)' : isMuted ? 'rgba(15,23,42,0.55)' : 'var(--dark-text)',
    }}>{label}</span>
    <span style={{
      fontSize: isTotal ? '1.3rem' : '1rem',
      fontWeight: isTotal ? 800 : isDiscount ? 700 : 600,
      color: isTotal ? 'var(--stickem-green)' : isDiscount ? 'var(--stickem-green)' : 'var(--dark-text)',
      whiteSpace: 'nowrap',
      marginLeft: '1rem',
    }}>{isDiscount ? '– ' : ''}{fmt(Math.abs(amount), currency, rate)}</span>
  </div>
);

const Divider = () => (
  <div style={{ height: '1px', background: 'rgba(15,23,42,0.07)', margin: '0.25rem 0' }} />
);

// ─── Main Component ────────────────────────────────────────────────────────
const KitCheckout = () => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [sensorOption, setSensorOption] = useState('none'); // 'none' | 'stickem' | 'generic'
  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState(null); // null | 'valid' | 'invalid' | 'not_active'
  const [promoApplied, setPromoApplied] = useState(false);
  const [currency, setCurrency] = useState('LKR');
  const [mascotMsg, setMascotMsg] = useState(null);
  const [isMascotVisible, setIsMascotVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const isKidsSteam = selectedProgram === 'kids-steam';
  const showSensorOptions = selectedProgram && !isKidsSteam;

  // Reset sensor if Kids STEAM selected
  useEffect(() => {
    if (isKidsSteam) setSensorOption('none');
  }, [isKidsSteam]);

  // ─── Price Calculation ────────────────────────────────────────────────
  const calc = useCallback(() => {
    const kitPrice = PRICES.roboticsKit;
    const sensorPrice = sensorOption === 'stickem' ? PRICES.sensorExpansion
      : sensorOption === 'generic' ? PRICES.genericSensor : 0;
    const shipping = PRICES.shipping;
    const subtotal = kitPrice + sensorPrice + shipping;
    const discount = promoApplied ? DISCOUNT_RULES[sensorOption] : 0;
    const total = subtotal - discount;
    return { kitPrice, sensorPrice, shipping, subtotal, discount, total };
  }, [sensorOption, promoApplied]);

  const prices = calc();

  // ─── Promo Code Logic ─────────────────────────────────────────────────
  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === PROMO_CODE) {
      setPromoApplied(true);
      setPromoStatus('valid');
      setMascotMsg('Promo code applied! You saved money 🎉');
      setIsMascotVisible(true);
      setTimeout(() => setIsMascotVisible(false), 4000);
    } else if (code.length > 0) {
      setPromoApplied(false);
      setPromoStatus('invalid');
    } else {
      setPromoStatus(null);
    }
  };

  const removePromo = () => {
    setPromoInput('');
    setPromoApplied(false);
    setPromoStatus(null);
  };

  const handleOrder = () => {
    const programName = programs.find(p => p.id === selectedProgram)?.label || 'Not enrolled / Standalone purchase';
    
    let text = `Hello Robotsticks Team! 👋\nI would like to place a kit order:\n\n`;
    text += `*Program:* ${programName}\n`;
    text += `*Robotics Kit:* Stick 'Em Robotics Kit\n`;
    
    if (sensorOption === 'stickem') {
      text += `*Sensor Kit:* Stick 'Em Sensor Expansion Kit\n`;
    } else if (sensorOption === 'generic') {
      text += `*Sensor Kit:* Generic Sensor Kit\n`;
    } else {
      text += `*Sensor Kit:* None\n`;
    }

    if (promoApplied) {
      text += `*Promo Code:* ${PROMO_CODE} (Discount applied)\n`;
    }

    text += `\n*Total Due:* ${fmt(prices.total, currency, SGD_RATE)}\n\n`;
    text += `Please let me know how to proceed with the payment!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/message/4G4ZERPPUXOCH1?text=${encodedText}`, '_blank');
  };

  const programNoSensor = programs.find(p => p.id === selectedProgram)?.noSensor;

  return (
    <div style={{ paddingTop: '80px', background: 'var(--bg-color)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: '4rem 2rem 2rem', textAlign: 'center', background: 'var(--lighter-bg)', borderBottom: '2px solid var(--glass-border)' }}>
        <Link to="/programs" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'rgba(15,23,42,0.6)', fontWeight: 600, fontSize: '0.95rem' }}>
          ← Back to Programs
        </Link>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#8b5cf6', color: 'white', borderRadius: '2rem', padding: '0.4rem 1rem', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', marginLeft: '1rem' }}
        >
          🛒 Kit Store
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--dark-text)', marginBottom: '1rem', lineHeight: 1.1 }}
        >
          Get Your <span className="text-highlight-yellow">Stick 'Em Kit</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.15rem', color: 'rgba(15,23,42,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
        >
          Transparent, itemized pricing. No hidden fees. Online students can apply their promo code for an instant discount.
        </motion.p>
      </section>

      <div className="container" style={{ padding: '3rem 1rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* ─── LEFT COLUMN: Selector + Products ──────────────────────── */}
          <div style={{ flex: '1 1 500px' }}>

            {/* Program Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', marginBottom: '1.5rem', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-text)', marginBottom: '1rem', fontWeight: 700 }}>
                📚 Which program is your child enrolled in?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {programs.map(p => (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => {
                      setSelectedProgram(p.id);
                      if (p.noSensor) {
                        setSensorOption('none');
                      } else {
                        setSensorOption('generic');
                      }
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer',
                      border: selectedProgram === p.id ? '2px solid #8b5cf6' : '2px solid rgba(0,0,0,0.07)',
                      background: selectedProgram === p.id ? 'rgba(139,92,246,0.06)' : 'transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', border: '2px solid',
                      borderColor: selectedProgram === p.id ? '#8b5cf6' : 'rgba(0,0,0,0.2)',
                      background: selectedProgram === p.id ? '#8b5cf6' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transition: 'all 0.2s'
                    }}>
                      {selectedProgram === p.id && <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />}
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: selectedProgram === p.id ? 700 : 500, color: selectedProgram === p.id ? '#8b5cf6' : 'var(--dark-text)' }}>
                      {p.label}
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                    setSelectedProgram('none');
                    setSensorOption('none');
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer',
                    border: selectedProgram === 'none' ? '2px solid #8b5cf6' : '2px solid rgba(0,0,0,0.07)',
                    background: selectedProgram === 'none' ? 'rgba(139,92,246,0.06)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', border: '2px solid',
                    borderColor: selectedProgram === 'none' ? '#8b5cf6' : 'rgba(0,0,0,0.2)',
                    background: selectedProgram === 'none' ? '#8b5cf6' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s'
                  }}>
                    {selectedProgram === 'none' && <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />}
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: selectedProgram === 'none' ? 700 : 500, color: selectedProgram === 'none' ? '#8b5cf6' : 'var(--dark-text)' }}>
                    Not enrolled / Standalone purchase
                  </span>
                </motion.div>
              </div>
              {isKidsSteam && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(139,92,246,0.08)', borderRadius: '0.75rem', border: '1px solid rgba(139,92,246,0.2)', fontSize: '0.85rem', color: '#8b5cf6', fontWeight: 600 }}>
                  ℹ️ Kids STEAM (ages 7–10) does not require a sensor kit. Only the Robotics Kit applies.
                </motion.div>
              )}
            </motion.div>

            {/* Robotics Kit Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', marginBottom: '1.5rem', border: '2px solid #8b5cf6' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'inline-block', background: '#8b5cf6', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Always Included
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-text)', marginBottom: '0.25rem' }}>Stick 'Em Robotics Kit</h3>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8b5cf6' }}>
                    {fmt(PRICES.roboticsKit, currency, SGD_RATE)}
                  </div>
                </div>
                <div style={{ fontSize: '2.5rem' }}>🤖</div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.7)', lineHeight: 1.6, margin: 0 }}>
                Empower your child to become a young innovator with Stick 'Em, the ultimate robotics and STEAM learning kit. Design and build robots, gadgets, and interactive creations - perfect for creative play, home-based learning, and future-ready skill development.
              </p>
            </motion.div>

            {/* Sensor Options */}
            <AnimatePresence>
              {showSensorOptions && (
                <motion.div
                  key="sensor-options"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark-text)', marginBottom: '1rem' }}>
                    ➕ Add a Sensor Kit (optional)
                  </h3>

                  {/* No sensor */}
                  <SensorCard
                    selected={sensorOption === 'none'}
                    onClick={() => setSensorOption('none')}
                    badge="Basic Setup"
                    badgeColor="#64748b"
                    icon="🔌"
                    title="No Sensor Kit"
                    price={null}
                    priceFmt={null}
                    description="Just the Robotics Kit - sufficient for introductory-level builds and Month 1."
                  />

                  {/* Stick'Em Sensor */}
                  <SensorCard
                    selected={sensorOption === 'stickem'}
                    onClick={() => setSensorOption('stickem')}
                    badge="Recommended"
                    badgeColor="var(--stickem-green)"
                    icon="🧩"
                    title="Stick 'Em Sensor Expansion Kit"
                    priceFmt={fmt(PRICES.sensorExpansion, currency, SGD_RATE)}
                    description="Upgrade your Stick 'Em Robotics Kit with our powerful Sensor Expansion Kit. Easily integrate sensors like ultrasonic distance detectors, light sensors, touch inputs, and motion-tracking gyroscopes into your creations. Turn simple robots into smart, interactive inventions."
                  />

                  {/* Generic Sensor */}
                  <SensorCard
                    selected={sensorOption === 'generic'}
                    onClick={() => setSensorOption('generic')}
                    badge="Budget Option"
                    badgeColor="var(--stickem-blue)"
                    icon="📡"
                    title="Generic Sensor Kit"
                    priceFmt={fmt(PRICES.genericSensor, currency, SGD_RATE)}
                    description="A functional sensor kit covering the essentials needed for Robotsticks practical sessions - distance, light, and touch sensing. Not the Stick 'Em branded version, but built to work seamlessly with your Robotics Kit for class activities."
                    disclaimer="Spec/contents to be confirmed before launch."
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── RIGHT COLUMN: Breakdown Card ──────────────────────────── */}
          <div style={{ flex: '0 1 380px', position: 'sticky', top: '100px' }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', position: 'relative' }}
            >
              <Mascot isVisible={isMascotVisible} message={mascotMsg} position="top-right" imgSrc={bot10} />

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🧾 Price Breakdown
              </h3>

              {/* Currency Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0.6rem 0.75rem', background: 'rgba(0,0,0,0.03)', borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.6)', fontWeight: 600 }}>Currency:</span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {['LKR', 'SGD'].map(c => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      style={{
                        padding: '0.3rem 0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                        background: currency === c ? '#8b5cf6' : 'white', color: currency === c ? 'white' : 'rgba(15,23,42,0.6)', boxShadow: currency === c ? '0 2px 8px rgba(139,92,246,0.3)' : 'none'
                      }}
                    >{c}</button>
                  ))}
                </div>
                {currency === 'SGD' && (
                  <span style={{ fontSize: '0.72rem', color: 'rgba(15,23,42,0.45)', marginLeft: 'auto' }}>1 SGD = {SGD_RATE.toFixed(4)} LKR*</span>
                )}
              </div>
              {currency === 'SGD' && (
                <div style={{ fontSize: '0.72rem', color: 'rgba(15,23,42,0.45)', marginBottom: '1rem', textAlign: 'right', fontStyle: 'italic' }}>
                  * Exchange rate to be confirmed by team
                </div>
              )}

              {/* Line Items */}
              <div>
                <LineItem label="Stick 'Em Robotics Kit" amount={prices.kitPrice} currency={currency} rate={SGD_RATE} />
                {sensorOption === 'stickem' && (
                  <LineItem label="Stick 'Em Sensor Expansion Kit" amount={prices.sensorPrice} currency={currency} rate={SGD_RATE} />
                )}
                {sensorOption === 'generic' && (
                  <LineItem label="Generic Sensor Kit" amount={prices.sensorPrice} currency={currency} rate={SGD_RATE} />
                )}
                <LineItem label="Shipping + VAT" amount={prices.shipping} currency={currency} rate={SGD_RATE} isMuted />
                <Divider />
                <LineItem label="Subtotal" amount={prices.subtotal} currency={currency} rate={SGD_RATE} />
                {promoApplied && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <LineItem
                      label={`Promo code (${PROMO_CODE}): Enrolled Student`}
                      amount={prices.discount}
                      currency={currency}
                      rate={SGD_RATE}
                      isDiscount
                    />
                  </motion.div>
                )}
                <LineItem label="Total due" amount={prices.total} currency={currency} rate={SGD_RATE} isTotal />
              </div>

              {/* Promo Code Field */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--dark-text)', marginBottom: '0.6rem' }}>
                  🎟️ Promo Code
                </div>
                {promoApplied ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(37,211,102,0.1)', border: '1px solid var(--stickem-green)', borderRadius: '0.75rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--stickem-green)', flexGrow: 1 }}>✓ {PROMO_CODE} applied!</span>
                    <button onClick={removePromo} style={{ background: 'none', border: 'none', color: 'rgba(15,23,42,0.4)', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', padding: 0 }}>✕</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      value={promoInput}
                      onChange={e => { setPromoInput(e.target.value); setPromoStatus(null); }}
                      onKeyDown={e => e.key === 'Enter' && applyPromo()}
                      placeholder="Enter code"
                      style={{
                        flexGrow: 1, padding: '0.7rem 1rem', borderRadius: '0.6rem', fontFamily: 'Outfit', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
                        border: promoStatus === 'invalid' ? '2px solid var(--stickem-red)' : '2px solid rgba(0,0,0,0.1)',
                        outline: 'none', color: 'var(--dark-text)', background: 'white'
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={applyPromo}
                      style={{ padding: '0.7rem 1.1rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '0.6rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      Apply
                    </motion.button>
                  </div>
                )}

                {/* Promo status messages */}
                <AnimatePresence>
                  {promoStatus === 'invalid' && !promoApplied && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ marginTop: '0.5rem', padding: '0.6rem 0.85rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.6rem', fontSize: '0.82rem', color: 'var(--stickem-red)', fontWeight: 600 }}
                    >
                      ✕ Invalid or unrecognised code. Check for typos, or contact the team if you believe this is an error.
                    </motion.div>
                  )}
                  {promoStatus === 'not_active' && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ marginTop: '0.5rem', padding: '0.6rem 0.85rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '0.6rem', fontSize: '0.82rem', color: '#b45309', fontWeight: 600 }}
                    >
                      ⏳ This code isn't active yet - it unlocks after your first month's tuition is paid.
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'rgba(15,23,42,0.5)', lineHeight: 1.5 }}>
                  Enrolled students receive their promo code via email. Physical students: code is issued after Month 1 tuition is paid.
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOrder}
                  style={{ width: '100%', padding: '0.9rem', background: 'var(--dark-text)', color: 'white', border: 'none', borderRadius: '0.85rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(15,23,42,0.2)' }}
                >
                  Proceed to Order via WhatsApp
                </motion.button>
                <div style={{ fontSize: '0.78rem', color: 'rgba(15,23,42,0.5)', textAlign: 'center', lineHeight: 1.5 }}>
                  Kit orders are currently processed via WhatsApp. Online payment coming soon.
                </div>
              </div>

              {/* Koko Option */}
              <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '0.75rem', border: '1px dashed rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem' }}>💳</span>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--dark-text)' }}>Pay in installments with Koko</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(15,23,42,0.5)' }}>Coming soon - mention this when ordering via WhatsApp</div>
                </div>
                <span style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--stickem-red)', padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '0.65rem', fontWeight: 700, marginLeft: 'auto', whiteSpace: 'nowrap' }}>Pending</span>
              </div>
            </motion.div>

            {/* Buy-Back Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginTop: '1.25rem', background: 'rgba(37, 211, 102, 0.1)', border: '1px solid var(--stickem-green)', borderRadius: '1.25rem', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}
            >
              <div style={{ fontSize: '1.6rem' }}>♻️</div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark-text)', marginBottom: '0.25rem' }}>75% Kit Buy-Back Guarantee</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(15,23,42,0.7)', lineHeight: 1.5 }}>
                  Return your kit to us in good working condition after completing the program and we'll buy it back for <strong>75% of its value</strong>.
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Pricing Paths Reference Table ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: '4rem', background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>All Pricing Scenarios</h2>
          <p style={{ color: 'rgba(15,23,42,0.6)', fontSize: '0.95rem', marginBottom: '2rem' }}>Full transparency - every combination and its exact cost.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '2px solid rgba(0,0,0,0.08)' }}>
                  {['Path', 'What\'s in the Cart', 'Promo Code?', 'Total Due'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--dark-text)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { path: 'A', cart: "Robotics Kit only", code: 'No', total: 37633.73, color: null },
                  { path: 'B', cart: "Robotics Kit + Stick 'Em Sensor Kit", code: 'No', total: 47042.16, color: null },
                  { path: 'C', cart: "Robotics Kit + Stick 'Em Sensor Kit", code: '✓ Yes (-6,000)', total: 41042.16, color: 'var(--stickem-green)' },
                  { path: 'D', cart: "Robotics Kit only", code: '✓ Yes (-3,000)', total: 34633.73, color: 'var(--stickem-green)' },
                  { path: 'E', cart: "Robotics Kit + Generic Sensor Kit", code: '✓ Yes (-4,500)', total: 36133.73, color: 'var(--stickem-green)' },
                ].map((row, i) => (
                  <tr key={row.path} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#8b5cf6' }}>Path {row.path}</td>
                    <td style={{ padding: '0.85rem 1rem', color: 'rgba(15,23,42,0.8)' }}>{row.cart}</td>
                    <td style={{ padding: '0.85rem 1rem', color: row.color || 'rgba(15,23,42,0.6)', fontWeight: row.color ? 700 : 500 }}>{row.code}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '1rem', color: row.color || 'var(--dark-text)', whiteSpace: 'nowrap' }}>
                      {fmt(row.total, currency, SGD_RATE)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', background: 'rgba(139,92,246,0.06)', borderRadius: '0.75rem', fontSize: '0.82rem', color: 'rgba(15,23,42,0.6)', lineHeight: 1.6 }}>
            <strong style={{ color: '#8b5cf6' }}>Note on Kids STEAM:</strong> Kids STEAM (ages 7–10) does not require a sensor kit - only Path A or D applies. Sensor kit options are not shown for this program.
          </div>
        </motion.div>

        {/* Physical Student Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: '2rem', background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}
        >
          <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>🏫</div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>Physical Class Students - Do I Need to Buy a Kit?</h3>
            <p style={{ color: 'rgba(15,23,42,0.7)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
              <strong>No - Robotsticks provides all kits in the classroom.</strong> You only need to purchase a kit if you want to practice at home or continue building outside of class hours. If you do purchase one, your promo code (issued after your first month's tuition payment) will apply the same discounts as Online students.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Sensor Card Sub-component ─────────────────────────────────────────────
const SensorCard = ({ selected, onClick, badge, badgeColor, icon, title, priceFmt, description, disclaimer }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    onClick={onClick}
    style={{
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
      padding: '1.25rem', borderRadius: '1rem', cursor: 'pointer', marginBottom: '0.75rem',
      border: selected ? `2px solid ${badgeColor}` : '2px solid rgba(0,0,0,0.07)',
      background: selected ? `${badgeColor}0d` : 'white',
      transition: 'all 0.2s'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${selected ? badgeColor : 'rgba(0,0,0,0.2)'}`, background: selected ? badgeColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
          {selected && <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />}
        </div>
        <span style={{ fontSize: '1.1rem' }}>{icon}</span>
        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark-text)' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ background: badgeColor, color: 'white', padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>{badge}</span>
        {priceFmt && <span style={{ fontSize: '1rem', fontWeight: 800, color: badgeColor }}>{priceFmt}</span>}
      </div>
    </div>
    <p style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.65)', lineHeight: 1.5, margin: 0, paddingLeft: '1.75rem' }}>{description}</p>
    {disclaimer && <p style={{ fontSize: '0.75rem', color: 'rgba(15,23,42,0.4)', fontStyle: 'italic', margin: 0, paddingLeft: '1.75rem' }}>⚠️ {disclaimer}</p>}
  </motion.div>
);

export default KitCheckout;
