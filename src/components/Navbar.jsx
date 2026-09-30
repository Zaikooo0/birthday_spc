import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function Navbar({ recipientName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#our-story' },
    { name: 'Her Words', href: '#her-words' },
    { name: 'Memories', href: '#our-memories' },
    { name: 'Videos', href: '#moments-in-motion' },
    { name: 'Secret Letter', href: '#things-never-said' },
    { name: 'Shayari', href: '#her-shayari' },
    { name: 'Surprise 🎁', href: '#birthday-surprise' },
  ];

  const handleNavClick = (href) => {
    sfx.playChime();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 800,
      padding: scrolled ? '12px 24px' : '20px 24px',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div 
        className="glass-panel"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '9999px',
          background: scrolled ? 'rgba(10, 14, 30, 0.85)' : 'rgba(18, 22, 43, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        {/* Brand Logo */}
        <a 
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.05rem',
            letterSpacing: '0.2px'
          }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f43f5e, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Heart size={14} fill="#fff" />
          </div>
          <span>For <span className="gradient-text-rose">{recipientName || "You"}</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '24px'
        }}
        className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 500,
                transition: 'color 0.2s',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => e.target.style.color = '#fda4af'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '6px'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="glass-panel"
          style={{
            maxWidth: '1200px',
            margin: '10px auto 0',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            borderRadius: '16px',
            background: 'rgba(10, 14, 30, 0.95)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.7)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                color: '#f8fafc',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
