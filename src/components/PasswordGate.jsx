import React, { useState } from 'react';
import { Lock, Unlock, KeyRound, Sparkles, Heart, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function PasswordGate({ recipient, onUnlock }) {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctCode = (recipient?.passcode || '0110').trim().toLowerCase();
    const userEntered = inputCode.trim().toLowerCase();

    if (
      userEntered === correctCode || 
      userEntered === '0110' || 
      userEntered === '1001' || 
      userEntered === 'ritika' || 
      userEntered === 'buggi' || 
      userEntered === 'birthday' || 
      userEntered === 'bestie'
    ) {
      sfx.playChime();
      onUnlock();
    } else {
      sfx.playPop();
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleBypass = () => {
    sfx.playChime();
    onUnlock();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'radial-gradient(circle at center, #11142e 0%, #050713 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '40px 32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(244, 63, 94, 0.2)'
        }}
      >
        {/* Glowing Orb in background */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Lock Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          margin: '0 auto 20px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(139, 92, 246, 0.2))',
          border: '1px solid rgba(244, 63, 94, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fda4af',
          boxShadow: '0 0 25px rgba(244, 63, 94, 0.3)'
        }}>
          <Lock size={32} />
        </div>

        {/* Title & Emotional Tag */}
        <div className="glass-pill" style={{ marginBottom: '16px', color: '#fda4af' }}>
          <Sparkles size={14} />
          <span>Private Memory Vault</span>
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px' }}>
          This isn’t just a website.
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '0.98rem', marginBottom: '28px', lineHeight: 1.6 }}>
          It’s a little corner of the universe made entirely of <strong style={{ color: '#fda4af' }}>our memories</strong>.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter secret code..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '14px 44px 14px 16px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: error ? '1.5px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1.05rem',
                letterSpacing: '2px',
                textAlign: 'center',
                outline: 'none',
                transition: 'all 0.3s'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p style={{ color: '#f87171', fontSize: '0.85rem', margin: '-6px 0 0 0' }}>
              Oops! Galat passcode hai. Dobara try karo ya hint dekho!
            </p>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            <span>Enter Our Story</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Actions / Hint */}
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fda4af',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'underline'
            }}
          >
            <KeyRound size={14} />
            {showHint ? "Hide Passcode Hint" : "Need a hint?"}
          </button>

          {showHint && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              color: '#cbd5e1',
              border: '1px dashed rgba(254, 240, 138, 0.3)',
              maxWidth: '90%'
            }}>
              💡 {recipient?.passcodeHint || "Default code is: 1001"}
            </div>
          )}

          <button
            type="button"
            onClick={handleBypass}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              fontSize: '0.8rem',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#94a3b8'}
            onMouseLeave={(e) => e.target.style.color = '#64748b'}
          >
            Direct Unlock / Preview Website →
          </button>
        </div>
      </div>
    </div>
  );
}
