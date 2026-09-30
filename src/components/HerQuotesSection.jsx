import React, { useState } from 'react';
import { MessageSquareQuote, Heart, Sparkles, MessageCircle, Volume2 } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function HerQuotesSection({ herQuotes, recipientName }) {
  const [likes, setLikes] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(herQuotes?.map(q => q.category) || [])];

  const handleLike = (id, e) => {
    e.stopPropagation();
    sfx.playPop();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredQuotes = activeFilter === 'All' 
    ? herQuotes 
    : herQuotes?.filter(q => q.category === activeFilter);

  return (
    <section id="her-words" className="section-container">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag" style={{ background: 'rgba(139, 92, 246, 0.12)', borderColor: 'rgba(139, 92, 246, 0.3)', color: '#c084fc' }}>
          <MessageSquareQuote size={14} />
          <span>Things You Said That Stayed With Me</span>
        </div>
        <h2 className="section-title">
          2. Her Words & <span className="gradient-text-purple">Iconic Lines</span>
        </h2>
        <p className="section-subtitle">
          Unfiltered advice, hilarious 2 AM roasts, and the words that made tough days so much easier.
        </p>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '28px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sfx.playPop();
                setActiveFilter(cat);
              }}
              style={{
                padding: '6px 18px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeFilter === cat ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255, 255, 255, 0.06)',
                color: activeFilter === cat ? '#fff' : '#94a3b8',
                boxShadow: activeFilter === cat ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {filteredQuotes?.map((item) => {
          const currentLikes = likes[item.id] || 0;
          return (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all 0.35s ease',
                borderLeft: '4px solid #8b5cf6'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              {/* Top Meta info */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#fff'
                    }}>
                      {recipientName ? recipientName[0] : "A"}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                        {recipientName || "Her"}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {item.date}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.75rem',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    color: '#c084fc',
                    border: '1px solid rgba(139, 92, 246, 0.25)'
                  }}>
                    {item.category}
                  </span>
                </div>

                {/* The Quote Body */}
                <p className="font-serif" style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.55,
                  color: '#ffffff',
                  marginBottom: '16px',
                  fontStyle: 'italic'
                }}>
                  “{item.quote}”
                </p>

                {/* Context Tag */}
                {item.context && (
                  <div style={{
                    fontSize: '0.82rem',
                    color: '#94a3b8',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <MessageCircle size={14} style={{ color: '#8b5cf6', flexShrink: 0 }} />
                    <span><strong>Context:</strong> {item.context}</span>
                  </div>
                )}
              </div>

              {/* Bottom Heart & Reaction Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <span style={{ fontSize: '1.1rem' }}>
                  {item.reaction || "❤️"}
                </span>

                <button
                  onClick={(e) => handleLike(item.id, e)}
                  style={{
                    background: currentLikes > 0 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                    border: currentLikes > 0 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '999px',
                    padding: '5px 12px',
                    color: currentLikes > 0 ? '#fda4af' : '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Heart size={14} fill={currentLikes > 0 ? '#f43f5e' : 'none'} style={{ color: '#f43f5e' }} />
                  <span>{currentLikes > 0 ? `${currentLikes} Loved` : 'Love this'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
