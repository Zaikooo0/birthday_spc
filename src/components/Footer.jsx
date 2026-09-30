import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function Footer({ recipientName }) {
  const scrollToTop = () => {
    sfx.playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(5, 7, 18, 0.95)',
      padding: '48px 24px 80px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f43f5e, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 0 20px rgba(244, 63, 94, 0.4)'
        }}>
          <Heart size={20} fill="#fff" />
        </div>

        <p className="font-serif" style={{ fontSize: '1.25rem', color: '#f8fafc', fontStyle: 'italic', margin: 0 }}>
          "Some friendships are not measured in time, but in moments that stay forever."
        </p>

        <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
          Handcrafted with endless love, laughter, and inside jokes for <strong style={{ color: '#fda4af' }}>{recipientName || "Bestie"}</strong>.
        </p>

        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
          ✨ 1st October • A Little Piece of Our Story ✨
        </div>

        <button
          onClick={scrollToTop}
          style={{
            marginTop: '12px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#cbd5e1',
            padding: '8px 20px',
            borderRadius: '999px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.82rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)';
            e.currentTarget.style.color = '#fda4af';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = '#cbd5e1';
          }}
        >
          <ArrowUp size={14} />
          <span>Back to Beginning</span>
        </button>
      </div>
    </footer>
  );
}
