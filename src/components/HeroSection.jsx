import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, ArrowDown, Calendar, Clock } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function HeroSection({ heroConfig, recipient, onExploreClick }) {
  const sentences = heroConfig?.typewriterSentences || [
    "Some people become a memory…",
    "Some people become a part of your story.",
    "Happy Birthday to my favorite human! ❤️"
  ];

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  // Typewriter effect logic
  useEffect(() => {
    const currentFullSentence = sentences[sentenceIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentFullSentence.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullSentence.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing sentence, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullSentence.slice(0, displayText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setSentenceIndex((prev) => (prev + 1) % sentences.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, sentenceIndex, sentences, typingSpeed]);

  // Calculate Friendship Days
  const friendshipDays = (() => {
    try {
      const start = new Date(recipient?.friendshipStartDate || '2023-04-15');
      const now = new Date();
      const diffTime = Math.abs(now - start);
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return 500;
    }
  })();

  const handleEnterClick = () => {
    sfx.playChime();
    onExploreClick();
  };

  return (
    <section 
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: '120px 20px 80px',
        zIndex: 2
      }}
    >
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(90vw, 600px)',
        height: '350px',
        background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.18) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 75%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: -1
      }} />

      {/* Special Day Pill */}
      <div className="glass-pill" style={{ marginBottom: '24px', animation: 'floatGentle 4s ease-in-out infinite' }}>
        <Sparkles size={16} style={{ color: '#fbbf24' }} />
        <span style={{ color: '#fda4af', fontWeight: 600 }}>{heroConfig?.badge || "1st October • A Very Special Day"}</span>
      </div>

      {/* Main Recipient Birthday Title */}
      <h1 style={{
        fontSize: 'clamp(2.4rem, 6.5vw, 4.8rem)',
        fontWeight: 900,
        marginBottom: '16px',
        letterSpacing: '-1px',
        maxWidth: '950px'
      }}>
        Happy Birthday, <span className="gradient-text-rose">{recipient?.name || "Bestie"}</span>
        <span style={{ display: 'inline-block', marginLeft: '12px', animation: 'pulseGlow 2s infinite' }}>❤️</span>
      </h1>

      {/* Sub-tagline / Nickname */}
      <p style={{
        fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
        color: '#cbd5e1',
        maxWidth: '650px',
        marginBottom: '32px',
        fontWeight: 400
      }}>
        {heroConfig?.tagline || "To the person who turns ordinary moments into unforgettable memories..."}
      </p>

      {/* Animated Typewriter Card */}
      <div 
        className="glass-panel"
        style={{
          padding: '20px 32px',
          maxWidth: '680px',
          width: '100%',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        <p className="font-serif" style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
          fontStyle: 'italic',
          color: '#fde047',
          lineHeight: 1.5,
          margin: 0
        }}>
          "{displayText}"
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            backgroundColor: '#f43f5e',
            marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'blink 0.9s infinite'
          }}></span>
        </p>
      </div>

      {/* Live Friendship Badges */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '44px'
      }}>
        <div className="glass-pill" style={{ background: 'rgba(244, 63, 94, 0.08)' }}>
          <Heart size={14} style={{ color: '#f43f5e' }} />
          <span><strong>{friendshipDays}+ Days</strong> of Pure Friendship</span>
        </div>
        <div className="glass-pill" style={{ background: 'rgba(139, 92, 246, 0.08)' }}>
          <Clock size={14} style={{ color: '#a78bfa' }} />
          <span><strong>Infinite</strong> Inside Jokes & Laughs</span>
        </div>
      </div>

      {/* Enter Button */}
      <button 
        onClick={handleEnterClick}
        className="btn-primary"
        style={{
          fontSize: '1.15rem',
          padding: '16px 40px',
          gap: '12px'
        }}
      >
        <span>{heroConfig?.buttonText || "Enter Our Story →"}</span>
        <ArrowDown size={20} />
      </button>

      {/* Floating Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        opacity: 0.6,
        fontSize: '0.75rem',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        <span>Scroll to Relive</span>
        <div style={{
          width: '20px',
          height: '32px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6px'
        }}>
          <div style={{
            width: '4px',
            height: '6px',
            backgroundColor: '#fda4af',
            borderRadius: '2px',
            animation: 'scrollPulse 1.8s infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollPulse {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
