import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = window.location.pathname === '/';

  const navItems = [
    { label: 'Home', href: isHome ? '#home' : '/#home' },
    { label: 'Work', href: isHome ? '#work' : '/#work' },
    { label: 'Skills', href: isHome ? '#skills' : '/#skills' },
    { label: 'Experience', href: isHome ? '#experience' : '/#experience' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="glass"
        style={{
          position: 'fixed',
          top: scrolled ? '20px' : '0px',
          left: scrolled ? '5%' : '0px',
          right: scrolled ? '5%' : '0px',
          width: scrolled ? '90%' : '100%',
          height: scrolled ? '64px' : '80px',
          borderRadius: scrolled ? '32px' : '0px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0 24px' : '0 40px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          borderLeft: scrolled ? undefined : 'none',
          borderRight: scrolled ? undefined : 'none',
          borderTop: scrolled ? undefined : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '20px',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)'
          }}>
            WELCOME<span style={{ color: 'var(--bg-accent-green)' }}>.</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Let's Talk CTA button (Desktop) */}
        <div className="desktop-nav-cta">
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="glass"
            style={{
              textDecoration: 'none',
              color: 'var(--text-dark)',
              backgroundColor: 'var(--bg-accent-green)',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 1100,
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '300px',
              background: 'rgba(8, 8, 8, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderLeft: '1px solid var(--border-color)',
              zIndex: 1050,
              padding: '100px 32px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    textDecoration: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '18px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                  whileHover={{ color: 'var(--bg-accent-green)', x: 4 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href={isHome ? '#contact' : '/#contact'}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-dark)',
                  backgroundColor: 'var(--bg-accent-green)',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#000',
              zIndex: 1040,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
