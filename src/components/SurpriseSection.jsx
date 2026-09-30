import React, { useState } from 'react';
import { Gift, Sparkles, Heart, PartyPopper, Flame, Send, FlameKindling, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audioUtils';

export default function SurpriseSection({ surprise, recipient }) {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [userWish, setUserWish] = useState('');
  const [wishesSent, setWishesSent] = useState([]);
  const [countdown, setCountdown] = useState(null);

  // Trigger high-impact Confetti & Fireworks
  const triggerFireworks = () => {
    sfx.playCelebration();

    // Multistage confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f43f5e', '#fbbf24', '#8b5cf6']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#38bdf8', '#ec4899', '#ffffff']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ffd700', '#ff69b4', '#00ffff']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleOpenGift = () => {
    sfx.playPop();
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCountdown(null);
          setIsUnwrapped(true);
          triggerFireworks();
          return null;
        }
        sfx.playPop();
        return prev - 1;
      });
    }, 700);
  };

  const handleBlowCandles = () => {
    sfx.playBlowCandle();
    setCandlesLit(false);
    setTimeout(() => {
      triggerFireworks();
    }, 300);
  };

  const handleRelightCandles = () => {
    sfx.playChime();
    setCandlesLit(true);
  };

  const handleSendWish = (e) => {
    e.preventDefault();
    if (!userWish.trim()) return;
    sfx.playChime();
    setWishesSent(prev => [...prev, userWish]);
    setUserWish('');
    triggerFireworks();
  };

  return (
    <section id="birthday-surprise" className="section-container" style={{ paddingBottom: '140px' }}>
      {/* Header */}
      <div className="section-header">
        <div className="section-tag" style={{ background: 'rgba(245, 158, 11, 0.12)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}>
          <PartyPopper size={14} />
          <span>The Grand Finale</span>
        </div>
        <h2 className="section-title">
          7. Birthday <span className="gradient-text-gold">Surprise & Wish</span>
        </h2>
        <p className="section-subtitle">
          {surprise?.giftBoxTitle || "One last thing for you..."}
        </p>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
        {!isUnwrapped ? (
          /* Locked Mystery Gift Box */
          <div
            className="glass-panel"
            style={{
              padding: '64px 32px',
              border: '2px solid rgba(251, 191, 36, 0.4)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(251, 191, 36, 0.25)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 28px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              boxShadow: '0 10px 30px rgba(245, 158, 11, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              animation: 'floatGentle 3.5s infinite ease-in-out'
            }}>
              {countdown ? (
                <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>{countdown}</span>
              ) : (
                <Gift size={52} />
              )}
            </div>

            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '14px', color: '#fff' }}>
              Are you ready for your final surprise?
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 32px' }}>
              Click below to unlock the birthday celebration, confetti burst, and cake cutting!
            </p>

            <button
              onClick={handleOpenGift}
              disabled={countdown !== null}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
                boxShadow: '0 4px 25px rgba(245, 158, 11, 0.5)',
                padding: '16px 40px',
                fontSize: '1.15rem'
              }}
            >
              <PartyPopper size={22} />
              <span>{surprise?.unlockButtonText || "Open Your Birthday Surprise 🎁"}</span>
            </button>
          </div>
        ) : (
          /* Unwrapped Birthday Celebration Chamber */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', animation: 'fadeIn 0.6s ease' }}>
            {/* Grand Confetti Header Card */}
            <div 
              className="glass-panel"
              style={{
                padding: '40px 24px',
                border: '1.5px solid rgba(244, 63, 94, 0.4)',
                background: 'radial-gradient(ellipse at center, rgba(30, 20, 50, 0.95), rgba(12, 10, 25, 0.95))',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(244, 63, 94, 0.3)'
              }}
            >
              <h2 className="gradient-text-rose" style={{
                fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                fontWeight: 900,
                marginBottom: '12px'
              }}>
                {surprise?.confettiMessage || `HAPPY BIRTHDAY ${recipient?.name?.toUpperCase()}! 👑✨`}
              </h2>

              <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 28px' }}>
                {surprise?.finalBlessing || "May all your secret wishes, unspoken prayers, and wildest dreams come true this year!"}
              </p>

              <button 
                onClick={triggerFireworks} 
                className="btn-secondary"
                style={{ background: 'rgba(244, 63, 94, 0.2)', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#fda4af' }}
              >
                <Sparkles size={18} />
                <span>Launch More Fireworks 🎆</span>
              </button>
            </div>

            {/* Interactive Birthday Cake with Candles */}
            <div 
              className="glass-panel"
              style={{
                padding: '36px 24px',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                position: 'relative'
              }}
            >
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px', color: '#fde047' }}>
                {candlesLit ? "Blow the candles and make a wish! 🎂" : "Wish Made! The candles are blown ✨"}
              </h3>

              {/* Visual Birthday Cake */}
              <div style={{
                position: 'relative',
                width: '240px',
                margin: '0 auto 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                {/* Candles Row */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '8px', zIndex: 2 }}>
                  {[1, 2, 3].map((c) => (
                    <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Candle Flame */}
                      {candlesLit ? (
                        <div 
                          className="candle-flame"
                          style={{
                            width: '14px',
                            height: '24px',
                            background: 'radial-gradient(ellipse at bottom, #fff 0%, #fbbf24 45%, #ef4444 90%)',
                            borderRadius: '50% 50% 35% 35%',
                            marginBottom: '2px',
                            cursor: 'pointer'
                          }}
                          onClick={handleBlowCandles}
                        />
                      ) : (
                        <div style={{
                          width: '8px',
                          height: '16px',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          marginBottom: '2px',
                          filter: 'blur(2px)'
                        }} />
                      )}

                      {/* Candle Stick */}
                      <div style={{
                        width: '10px',
                        height: '36px',
                        background: c % 2 === 0 ? 'linear-gradient(to bottom, #fda4af, #f43f5e)' : 'linear-gradient(to bottom, #93c5fd, #3b82f6)',
                        borderRadius: '3px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                      }} />
                    </div>
                  ))}
                </div>

                {/* Cake Top Layer */}
                <div style={{
                  width: '170px',
                  height: '45px',
                  background: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%)',
                  borderRadius: '16px 16px 0 0',
                  border: '2px solid rgba(255,255,255,0.4)',
                  boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.6)',
                  position: 'relative'
                }}>
                  {/* Frosting drips */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: 0,
                    width: '100%',
                    height: '10px',
                    background: '#fff',
                    borderRadius: '0 0 10px 10px',
                    opacity: 0.9
                  }} />
                </div>

                {/* Cake Base Layer */}
                <div style={{
                  width: '220px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #831843 0%, #500724 100%)',
                  borderRadius: '0 0 16px 16px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fde047',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
                }}>
                  👑 {recipient?.name || "Bestie"} 👑
                </div>
              </div>

              {/* Candle Action Button */}
              {candlesLit ? (
                <button
                  onClick={handleBlowCandles}
                  className="btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
                    boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)'
                  }}
                >
                  <Flame size={18} />
                  <span>Click to Blow Out Candles 💨</span>
                </button>
              ) : (
                <button
                  onClick={handleRelightCandles}
                  className="btn-secondary"
                >
                  <FlameKindling size={16} />
                  <span>Relight Candles 🕯️</span>
                </button>
              )}
            </div>

            {/* Sky Lantern / Wish Generator */}
            <div 
              className="glass-panel"
              style={{
                padding: '36px 24px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#c084fc' }}>
                Release a Sky Lantern into the Cosmos 🏮✨
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '20px' }}>
                Type your personal birthday wish, promise, or dream:
              </p>

              <form onSubmit={handleSendWish} style={{ display: 'flex', gap: '10px', maxWidth: '540px', margin: '0 auto 20px' }}>
                <input
                  type="text"
                  placeholder="I wish for infinite happiness, health, and travels..."
                  value={userWish}
                  onChange={(e) => setUserWish(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '12px 24px' }}
                >
                  <Send size={16} />
                  <span>Release</span>
                </button>
              </form>

              {/* Floating Wishes List */}
              {wishesSent.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '540px', margin: '0 auto' }}>
                  {wishesSent.map((wish, wIdx) => (
                    <div
                      key={wIdx}
                      style={{
                        background: 'rgba(251, 191, 36, 0.1)',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        borderRadius: '12px',
                        padding: '10px 16px',
                        color: '#fde047',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        animation: 'fadeIn 0.4s ease'
                      }}
                    >
                      <Sparkles size={14} />
                      <span>🏮 "{wish}" — Floating into the starlit sky!</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
