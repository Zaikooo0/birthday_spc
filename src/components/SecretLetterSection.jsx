import React, { useState } from 'react';
import { Mail, Sparkles, Heart, Feather, RotateCcw } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function SecretLetterSection({ secretLetter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    sfx.playEnvelopeOpen();
    setIsOpen(true);
  };

  const handleCloseLetter = () => {
    sfx.playPop();
    setIsOpen(false);
  };

  return (
    <section id="things-never-said" className="section-container">
      {/* Header */}
      <div className="section-header">
        <div className="section-tag" style={{ background: 'rgba(244, 63, 94, 0.12)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#fda4af' }}>
          <Mail size={14} />
          <span>From The Heart</span>
        </div>
        <h2 className="section-title">
          5. Things I <span className="gradient-text-rose">Never Said</span>
        </h2>
        <p className="section-subtitle">
          Some feelings are too deep for ordinary text messages. Here is a letter straight from the heart.
        </p>
      </div>

      {/* Main Interactive Envelope Container */}
      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
        {!isOpen ? (
          /* Closed Wax Sealed Envelope */
          <div
            onClick={handleOpenLetter}
            className="glass-panel"
            style={{
              padding: '60px 32px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, rgba(30, 24, 53, 0.9), rgba(18, 15, 36, 0.95))',
              border: '1.5px solid rgba(244, 63, 94, 0.35)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 45px rgba(244, 63, 94, 0.25)',
              position: 'relative',
              borderRadius: '24px',
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
              e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.35)';
            }}
          >
            {/* Wax Seal Stamp */}
            <div style={{
              width: '84px',
              height: '84px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #f43f5e 0%, #be123c 60%, #881337 100%)',
              boxShadow: '0 8px 25px rgba(244, 63, 94, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              animation: 'pulseGlow 2.5s infinite ease-in-out'
            }}>
              <Heart size={26} fill="#ffffff" />
              <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '1px', marginTop: '2px' }}>
                {secretLetter?.sealText || "FOR YOU"}
              </span>
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
              {secretLetter?.envelopeTitle || "Open this when you're ready…"}
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 28px' }}>
              Tap on the seal to break the wax and unfold the secret letter.
            </p>

            <button className="btn-primary" style={{ padding: '12px 32px' }}>
              <Feather size={18} />
              <span>Break Seal & Read</span>
            </button>
          </div>
        ) : (
          /* Unfolded Handwritten Parchment Letter */
          <div
            style={{
              background: 'linear-gradient(145deg, #fffdf8 0%, #fdf6e7 100%)',
              color: '#292524',
              borderRadius: '20px',
              padding: 'clamp(28px, 5vw, 48px)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.8), 0 0 50px rgba(251, 191, 36, 0.3)',
              position: 'relative',
              animation: 'unfoldLetter 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              border: '8px double #e7dfcb'
            }}
          >
            {/* Top Vintage Date & Stamp */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #d6ceb8',
              paddingBottom: '16px',
              marginBottom: '24px'
            }}>
              <span className="font-handwritten" style={{ fontSize: '1.4rem', color: '#78350f', fontWeight: 700 }}>
                📅 {secretLetter?.date || "1st October"}
              </span>

              <div style={{
                border: '2px dashed #b45309',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#b45309',
                letterSpacing: '1px'
              }}>
                SEALED WITH LOVE ❤️
              </div>
            </div>

            {/* Salutation */}
            <h3 className="font-handwritten" style={{
              fontSize: '2.4rem',
              color: '#881337',
              marginBottom: '20px',
              fontWeight: 700
            }}>
              {secretLetter?.salutation || "Dearest Bestie,"}
            </h3>

            {/* Letter Body Paragraphs */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.12rem',
              lineHeight: 1.8,
              color: '#332924'
            }}>
              {secretLetter?.paragraphs?.map((p, idx) => (
                <p key={idx} style={{ textIndent: '24px' }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Closing & Signature */}
            <div style={{
              marginTop: '36px',
              paddingTop: '20px',
              borderTop: '1px dashed #d6ceb8',
              textAlign: 'right'
            }}>
              <p className="font-handwritten" style={{ fontSize: '1.6rem', color: '#78350f', margin: 0 }}>
                {secretLetter?.closing || "Always in your corner,"}
              </p>
              <p className="font-handwritten" style={{
                fontSize: '2.2rem',
                fontWeight: 700,
                color: '#be123c',
                margin: '4px 0 0 0'
              }}>
                {secretLetter?.signature || "Your Best Friend Forever ❤️"}
              </p>
            </div>

            {/* Post Script */}
            {secretLetter?.postScript && (
              <div style={{
                marginTop: '20px',
                background: '#fef3c7',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '0.92rem',
                color: '#92400e',
                fontStyle: 'italic',
                borderLeft: '3px solid #f59e0b'
              }}>
                {secretLetter.postScript}
              </div>
            )}

            {/* Re-seal Button */}
            <div style={{ marginTop: '28px', textAlign: 'center' }}>
              <button
                onClick={handleCloseLetter}
                style={{
                  background: '#1e293b',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                <RotateCcw size={16} />
                <span>Re-seal & Fold Letter</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes unfoldLetter {
          0% {
            opacity: 0;
            transform: scale(0.9) rotateX(20deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
          }
        }
      `}</style>
    </section>
  );
}
