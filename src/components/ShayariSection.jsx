import React, { useState } from 'react';
import { Feather, Sparkles, Heart, Copy, Check, Quote } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function ShayariSection({ shayariList }) {
  const [copiedId, setCopiedId] = useState(null);
  const [lovedIds, setLovedIds] = useState({});

  const handleCopy = (item) => {
    sfx.playChime();
    const fullText = item.lines.join('\n') + `\n\n— ${item.author}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleLove = (id) => {
    sfx.playPop();
    setLovedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="her-shayari" className="section-container">
      {/* Header */}
      <div className="section-header">
        <div className="section-tag" style={{ background: 'rgba(236, 72, 153, 0.12)', borderColor: 'rgba(236, 72, 153, 0.3)', color: '#f472b6' }}>
          <Feather size={14} />
          <span>Lafz Aur Jazbaat</span>
        </div>
        <h2 className="section-title">
          6. Her <span style={{
            background: 'linear-gradient(135deg, #fbcfe8, #f472b6, #db2777)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Shayari & Words</span>
        </h2>
        <p className="section-subtitle">
          Because when you speak or write, even ordinary words feel like pure poetry.
        </p>
      </div>

      {/* Shayari Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {shayariList?.map((item) => {
          const isLoved = lovedIds[item.id];
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '36px 28px',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(160deg, rgba(23, 19, 45, 0.85), rgba(12, 10, 25, 0.95))',
                border: '1px solid rgba(236, 72, 153, 0.25)',
                boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.25)';
              }}
            >
              {/* Quote Watermark */}
              <Quote 
                size={70} 
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '20px',
                  color: 'rgba(236, 72, 153, 0.08)',
                  pointerEvents: 'none'
                }} 
              />

              {/* Theme Badge */}
              <div style={{ marginBottom: '24px' }}>
                <span className="glass-pill" style={{
                  background: 'rgba(236, 72, 153, 0.12)',
                  color: '#f472b6',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}>
                  ✨ {item.theme}
                </span>
              </div>

              {/* Shayari Lines */}
              <div style={{ marginBottom: '28px' }}>
                {item.lines?.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)',
                      lineHeight: 1.8,
                      color: '#fff',
                      margin: '4px 0',
                      letterSpacing: '0.3px',
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Author & Tags */}
              <div>
                <div className="font-handwritten" style={{
                  fontSize: '1.6rem',
                  color: '#fda4af',
                  fontWeight: 700,
                  marginBottom: '12px'
                }}>
                  — {item.author}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '20px',
                  flexWrap: 'wrap'
                }}>
                  {item.tags?.map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <button
                    onClick={() => handleCopy(item)}
                    style={{
                      background: isCopied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      border: isCopied ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: isCopied ? '#6ee7b7' : '#cbd5e1',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => handleLove(item.id)}
                    style={{
                      background: isLoved ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                      border: isLoved ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: isLoved ? '#fda4af' : '#cbd5e1',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Heart size={14} fill={isLoved ? '#f43f5e' : 'none'} style={{ color: '#f43f5e' }} />
                    <span>{isLoved ? 'Saved' : 'Love'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
