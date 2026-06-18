import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
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

  return (
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
        padding: '0 40px',
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
          CREATIVE<span style={{ color: 'var(--bg-accent-green)' }}>.</span>
        </span>
      </div>

      <nav className="main-nav">
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

      <div>
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
    </motion.header>
  );
}
