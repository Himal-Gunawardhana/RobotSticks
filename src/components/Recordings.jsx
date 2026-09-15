import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import WhatsAppButton from './WhatsAppButton';

// ─── Social Media Data ────────────────────────────────────────────────────────
const socialLinks = [
  {
    id: 'facebook',
    name: 'Facebook',
    handle: '@RobotSticks',
    url: 'https://www.facebook.com/share/1K4dvYTN9M/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.024 4.388 11.018 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.091 24 18.097 24 12.073z"/>
      </svg>
    ),
    color: '#1877F2',
    shadowColor: 'rgba(24, 119, 242, 0.3)',
    bg: 'linear-gradient(135deg, #1877F2 0%, #0a4fc4 100%)',
    cta: 'Follow Us',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@robotsticks',
    url: 'https://www.instagram.com/robotsticks?stkn=eGU5djZucjJmcTN2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: '#E1306C',
    shadowColor: 'rgba(225, 48, 108, 0.3)',
    bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    cta: 'Follow Us',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@robot.sticks',
    url: 'https://www.tiktok.com/@robot.sticks?_r=1&_t=ZS-99lArrvcTdX',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.25 8.25 0 004.84 1.56V6.84a4.85 4.85 0 01-1.07-.15z"/>
      </svg>
    ),
    color: '#010101',
    shadowColor: 'rgba(1, 1, 1, 0.25)',
    bg: 'linear-gradient(135deg, #010101 0%, #69C9D0 50%, #EE1D52 100%)',
    cta: 'Follow Us',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@robotsticks',
    url: 'https://youtube.com/@robotsticks?si=Vay5KMKL_5_nEE23',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: '#FF0000',
    shadowColor: 'rgba(255, 0, 0, 0.3)',
    bg: 'linear-gradient(135deg, #FF0000 0%, #cc0000 100%)',
    cta: 'Subscribe',
  },
];

// ─── Recording Data ───────────────────────────────────────────────────────────
const recordingDays = [
  {
    day: 'Day 01',
    title: 'Session 01 — September 13, 2025',
    sinhala: [
      { id: 'EN8o8Ff6sew', title: 'Age 7–10 Kids STEAM', subtitle: 'Sinhala Medium · Sep 13 · Session 01' },
      { id: 'R_ID0FWTNAA', title: 'Age 11–13 Junior', subtitle: 'Sinhala Medium · Sep 13 · Session 01' },
      { id: 'bBm_tA-w-PY', title: 'Age 14–16 Senior', subtitle: 'Sinhala Medium · Sep 13 · Session 01' },
      { id: '96sY-hhF-RU', title: 'Age 17–19 Advanced', subtitle: 'Sinhala Medium · Sep 13 · Session 01' },
    ],
    english: [
      { id: 'av0qKtQEC2U', title: 'Age 7–10 Kids STEAM', subtitle: 'English Medium · Sep 13 · Session 01' },
      { id: 'F97PFj1VKyk', title: 'Age 11–13 Junior', subtitle: 'English Medium · Sep 13 · Session 01' },
      { id: 'TQMfveRTMKw', title: 'Age 14–16 Senior', subtitle: 'English Medium · Sep 12 · Session 01' },
      { id: 'TQMfveRTMKw', title: 'Age 17–19 Advanced', subtitle: 'English Medium · Sep 12 · Session 01' },
    ],
  },
];

// ─── Video Card ───────────────────────────────────────────────────────────────
const VideoCard = ({ video, index, accentColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      style={{
        background: 'white',
        borderRadius: '1rem',
        border: '2px solid var(--glass-border)',
        boxShadow: '6px 6px 0px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000', flexShrink: 0 }}>
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
      <div style={{ padding: '1rem 1.25rem 1.25rem', flex: 1 }}>
        <div style={{
          display: 'inline-block',
          background: accentColor,
          color: 'white',
          borderRadius: '0.4rem',
          padding: '0.2rem 0.6rem',
          fontSize: '0.7rem',
          fontWeight: 700,
          fontFamily: 'Outfit, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
        }}>
          {video.subtitle.split('·')[0].trim()}
        </div>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--dark-text)', marginBottom: '0.25rem', lineHeight: 1.3 }}>
          {video.title}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'rgba(15,23,42,0.55)', fontWeight: 500 }}>
          {video.subtitle.split('·').slice(1).join('·').trim()}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Main Recordings Page ─────────────────────────────────────────────────────
const Recordings = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--light-bg)' }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '5rem',
        background: 'linear-gradient(135deg, #0F172A 0%, #1e2d4a 50%, #2B6BA7 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {[
          { w: 400, h: 400, top: '-10%', left: '-5%', color: 'var(--stickem-blue)', op: 0.12 },
          { w: 300, h: 300, bottom: '-10%', right: '5%', color: 'var(--stickem-yellow)', op: 0.1 },
          { w: 200, h: 200, top: '30%', right: '20%', color: 'var(--stickem-red)', op: 0.08 },
        ].map((b, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: b.w, height: b.h,
              borderRadius: '50%',
              background: b.color,
              opacity: b.op,
              top: b.top, bottom: b.bottom,
              left: b.left, right: b.right,
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--stickem-yellow)', color: '#0F172A',
              borderRadius: '0.5rem', padding: '0.35rem 1rem',
              fontWeight: 700, fontSize: '0.85rem',
              border: '2px solid rgba(0,0,0,0.2)',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '1.5rem',
            }}
          >
            🎥 Class Recordings
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            Recordings by{' '}
            <span style={{ color: 'var(--stickem-yellow)' }}>RobotSticks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: 620,
              margin: '0 auto 2rem',
              lineHeight: 1.8,
            }}
          >
            Watch all your free STEAM Robotics & AI session recordings - Sinhala and English medium - right here, anytime.
          </motion.p>
        </div>
      </section>

      {/* Social Media Section */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--lighter-bg)',
        borderTop: '2px solid var(--glass-border)',
        borderBottom: '2px solid var(--glass-border)',
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--stickem-purple)', color: 'white',
              borderRadius: '0.5rem', padding: '0.35rem 1rem',
              fontWeight: 700, fontSize: '0.85rem',
              border: '2px solid rgba(0,0,0,0.15)',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '1rem',
            }}>
              📱 Follow Us
            </div>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--dark-text)',
              marginBottom: '0.75rem',
            }}>
              Stay Connected on{' '}
              <span style={{ color: 'var(--stickem-blue)' }}>Social Media</span>
            </h2>
            <p style={{ color: 'rgba(15,23,42,0.65)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>
              Follow RobotSticks for the latest updates, tips, and behind-the-scenes content.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '2rem 1.5rem',
                  borderRadius: '1.25rem',
                  background: 'white',
                  border: '2px solid var(--glass-border)',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.08)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.25s',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '5px',
                  background: s.bg,
                }} />
                <div style={{
                  width: 72, height: 72,
                  borderRadius: '50%',
                  background: s.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: `0 8px 24px ${s.shadowColor}`,
                  flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--dark-text)', marginBottom: '0.2rem' }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.55)', fontWeight: 500 }}>
                    {s.handle}
                  </div>
                </div>
                <div style={{
                  background: s.bg,
                  color: 'white',
                  borderRadius: '0.5rem',
                  padding: '0.4rem 1.25rem',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  fontFamily: 'Outfit, sans-serif',
                  border: '2px solid rgba(0,0,0,0.1)',
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.1)',
                }}>
                  {s.cta} →
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Recordings Section */}
      <section style={{ padding: '5rem 0', background: 'var(--light-bg)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--stickem-red)', color: 'white',
              borderRadius: '0.5rem', padding: '0.35rem 1rem',
              fontWeight: 700, fontSize: '0.85rem',
              border: '2px solid rgba(0,0,0,0.15)',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '1rem',
            }}>
              🎬 Watch Sessions
            </div>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--dark-text)',
              marginBottom: '0.75rem',
            }}>
              Class <span style={{ color: 'var(--stickem-red)' }}>Recordings</span>
            </h2>
            <p style={{ color: 'rgba(15,23,42,0.65)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>
              Missed a session? No worries — watch all recordings below, organized by day and medium.
            </p>
          </motion.div>

          {recordingDays.map((dayData, di) => (
            <motion.div
              key={di}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '5rem' }}
            >
              {/* Day header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--stickem-blue) 0%, var(--stickem-purple) 100%)',
                  color: 'white',
                  borderRadius: '0.75rem',
                  padding: '0.5rem 1.25rem',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: '2px solid rgba(0,0,0,0.15)',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  flexShrink: 0,
                }}>
                  📅 {dayData.day}
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--dark-text)' }}>
                    Recordings — {dayData.day}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.55)' }}>{dayData.title}</div>
                </div>
              </div>

              {/* Sinhala Medium */}
              <div style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  <div style={{ width: 6, height: 32, borderRadius: 3, background: 'var(--stickem-green)', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--dark-text)', lineHeight: 1.2 }}>
                      🇱🇰 Sinhala Medium
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.5)', marginTop: '0.1rem' }}>
                      සිංහල මාධ්‍ය — {dayData.day} Sessions
                    </p>
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1.5rem',
                }}>
                  {dayData.sinhala.map((video, vi) => (
                    <VideoCard key={`sinhala-${di}-${vi}`} video={video} index={vi} accentColor="var(--stickem-green)" />
                  ))}
                </div>
              </div>

              {/* English Medium */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  <div style={{ width: 6, height: 32, borderRadius: 3, background: 'var(--stickem-blue)', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--dark-text)', lineHeight: 1.2 }}>
                      🇬🇧 English Medium
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(15,23,42,0.5)', marginTop: '0.1rem' }}>
                      English Medium — {dayData.day} Sessions
                    </p>
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1.5rem',
                }}>
                  {dayData.english.map((video, vi) => (
                    <VideoCard key={`english-${di}-${vi}`} video={video} index={vi} accentColor="var(--stickem-blue)" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <motion.img
            src="/Logo.svg"
            alt="RobotSticks Logo"
            style={{ height: '52px' }}
            whileHover={{ rotate: -5, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
            <a href="/" style={{ color: 'rgba(15,23,42,0.6)' }}>Home</a>
            <a href="/#partnership" style={{ color: 'rgba(15,23,42,0.6)' }}>Partnership</a>
            <a href="/#packages" style={{ color: 'rgba(15,23,42,0.6)' }}>Packages</a>
            <a href="https://forms.gle/6wwrdLxbqCtPyiAy5" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(15,23,42,0.6)' }}>Register</a>
          </div>
          <p style={{ color: 'rgba(15,23,42,0.4)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} RobotSticks Academy. All rights reserved.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Recordings;
