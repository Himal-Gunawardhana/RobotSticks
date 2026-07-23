import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Partnership from './components/Partnership';
import Packages from './components/Packages';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css'; // Importing an empty or specific App css if needed

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Stats />
      <Partnership />
      <Packages />
      
      {/* Registration Section */}
      <section id="register" style={{ padding: '6rem 0', background: 'var(--light-bg)', borderTop: '2px solid var(--glass-border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to <span className="text-highlight-green">Begin?</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(15,23,42,0.8)', marginBottom: '2rem' }}>
              Join RobotSticks today and start your STEAM journey. Empower your child with the skills of tomorrow, today.
            </p>
            <a href="#" className="btn-primary" style={{ display: 'inline-block', padding: '1rem 3rem', fontSize: '1.3rem' }}>
              Register Now
            </a>
          </div>
          <div>
            <img src="/Design.png" alt="STEAM Design" style={{ width: '100%', borderRadius: '1rem', border: '4px solid var(--dark-text)', boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 0', textAlign: 'center', background: 'var(--lighter-bg)', borderTop: '2px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <img src="/Logo.svg" alt="RobotSticks Logo" style={{ height: '50px' }} />
          <p style={{ color: 'rgba(15,23,42,0.5)' }}>© {new Date().getFullYear()} RobotSticks Academy. All rights reserved.</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}

export default App;
