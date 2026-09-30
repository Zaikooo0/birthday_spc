import React, { useState } from 'react';
import { 
  MessageCircle, Moon, Smile, HeartHandshake, 
  Camera, Gamepad2, Sparkles, ChevronDown, ChevronUp, Quote
} from 'lucide-react';
import { sfx } from '../utils/audioUtils';

// Icon mapper helper
const iconMap = {
  MessageCircle: MessageCircle,
  Moon: Moon,
  Smile: Smile,
  HeartHandshake: HeartHandshake,
  Camera: Camera,
  Gamepad2: Gamepad2,
  Sparkles: Sparkles,
};

export default function TimelineSection({ timeline }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    sfx.playPop();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="our-story" className="section-container">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <Sparkles size={14} />
          <span>Chapter By Chapter</span>
        </div>
        <h2 className="section-title">
          1. Our Story & <span className="gradient-text-rose">Milestones</span>
        </h2>
        <p className="section-subtitle">
          How a bunch of random moments and everyday conversations turned into an unbreakable bond.
        </p>
      </div>

      {/* Timeline Tree */}
      <div style={{ position: 'relative', maxWidth: '880px', margin: '0 auto' }}>
        {/* Glowing Center Line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          bottom: '20px',
          left: '24px',
          width: '3px',
          background: 'linear-gradient(to bottom, #f43f5e 0%, #8b5cf6 50%, #fbbf24 100%)',
          borderRadius: '999px',
          boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)'
        }} />

        {/* Timeline Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {timeline?.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const isExpanded = expandedId === item.id;

            return (
              <div 
                key={item.id}
                style={{
                  position: 'relative',
                  paddingLeft: '64px',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Milestone Node Icon */}
                <div 
                  onClick={() => toggleExpand(item.id)}
                  style={{
                    position: 'absolute',
                    left: '4px',
                    top: '16px',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: item.tagColor ? `${item.tagColor}22` : 'rgba(244, 63, 94, 0.2)',
                    border: `2px solid ${item.tagColor || '#f43f5e'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.tagColor || '#fda4af',
                    boxShadow: `0 0 15px ${item.tagColor || '#f43f5e'}66`,
                    cursor: 'pointer',
                    zIndex: 3,
                    transition: 'transform 0.25s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <IconComponent size={20} />
                </div>

                {/* Timeline Card */}
                <div 
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    border: isExpanded ? `1px solid ${item.tagColor || '#f43f5e'}` : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isExpanded ? 'rgba(22, 27, 54, 0.9)' : 'rgba(18, 22, 43, 0.7)',
                    boxShadow: isExpanded ? `0 15px 35px ${item.tagColor || '#f43f5e'}22` : 'var(--shadow-card)'
                  }}
                  onClick={() => toggleExpand(item.id)}
                >
                  {/* Top Header info */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: item.tagColor || '#fda4af',
                        letterSpacing: '1px'
                      }}>
                        {item.chapter}
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '2px 10px',
                        borderRadius: '999px',
                        background: `${item.tagColor || '#f43f5e'}18`,
                        border: `1px solid ${item.tagColor || '#f43f5e'}33`,
                        color: item.tagColor || '#fda4af'
                      }}>
                        {item.tag}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>
                    {item.title}
                  </h3>

                  {/* Summary Text */}
                  <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '14px' }}>
                    {item.summary}
                  </p>

                  {/* Memory Quote Bubble */}
                  {item.memoryQuote && (
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderLeft: `3px solid ${item.tagColor || '#f43f5e'}`,
                      padding: '10px 14px',
                      borderRadius: '0 8px 8px 0',
                      marginBottom: '14px',
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      color: '#fde047',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Quote size={16} style={{ color: item.tagColor || '#fda4af', flexShrink: 0 }} />
                      <span>{item.memoryQuote}</span>
                    </div>
                  )}

                  {/* Expandable Details & Photo */}
                  {isExpanded && (
                    <div style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      animation: 'fadeIn 0.3s ease-in-out'
                    }}>
                      <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '16px' }}>
                        {item.detail}
                      </p>

                      {item.image && (
                        <div style={{
                          borderRadius: '12px',
                          overflow: 'hidden',
                          maxHeight: '260px',
                          position: 'relative'
                        }}>
                          <img 
                            src={item.image} 
                            alt={item.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Toggle Indicator */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '4px',
                    color: item.tagColor || '#fda4af',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    marginTop: '8px'
                  }}>
                    <span>{isExpanded ? 'Show Less' : 'Read Full Memory'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
