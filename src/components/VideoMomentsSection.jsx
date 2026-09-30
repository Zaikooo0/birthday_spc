import React, { useState } from 'react';
import { Film, Play, Clock, Sparkles, X, Heart } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function VideoMomentsSection({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null);

  const openVideo = (video) => {
    sfx.playChime();
    setActiveVideo(video);
  };

  const closeVideo = () => {
    sfx.playPop();
    setActiveVideo(null);
  };

  return (
    <section id="moments-in-motion" className="section-container">
      {/* Header */}
      <div className="section-header">
        <div className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.12)', borderColor: 'rgba(6, 182, 212, 0.3)', color: '#67e8f9' }}>
          <Film size={14} />
          <span>Cinematic Reel Vault</span>
        </div>
        <h2 className="section-title">
          4. Moments in <span style={{
            background: 'linear-gradient(135deg, #a5f3fc, #38bdf8, #0284c7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Motion</span>
        </h2>
        <p className="section-subtitle">
          Because some laughter and madness can only be captured in video.
        </p>
      </div>

      {/* Video Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {videos?.map((item) => (
          <div
            key={item.id}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => openVideo(item)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            }}
          >
            {/* Thumbnail Poster */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '60%', // 16:9 aspect
              background: '#090d1f',
              overflow: 'hidden'
            }}>
              <img 
                src={item.poster} 
                alt={item.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
              />

              {/* Dark Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 9, 19, 0.85) 0%, transparent 60%)'
              }} />

              {/* Tag Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: `${item.badgeColor || '#ec4899'}cc`,
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                backdropFilter: 'blur(8px)'
              }}>
                {item.tag}
              </div>

              {/* Duration badge */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(0,0,0,0.7)',
                color: '#cbd5e1',
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Clock size={12} />
                <span>{item.duration}</span>
              </div>

              {/* Play Button Overlay */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(244, 63, 94, 0.85)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 0 25px rgba(244, 63, 94, 0.6)',
                transition: 'all 0.3s'
              }}>
                <Play size={24} style={{ marginLeft: '3px' }} fill="#ffffff" />
              </div>
            </div>

            {/* Video Card Text */}
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '12px' }}>
                {item.description}
              </p>
              <div style={{
                fontSize: '0.82rem',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600
              }}>
                <Sparkles size={14} />
                <span>Click to Watch Reel</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div className="modal-overlay" onClick={closeVideo}>
          <div 
            className="glass-panel"
            style={{
              maxWidth: '800px',
              width: '100%',
              padding: '24px',
              background: '#090d1f',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 50px rgba(56, 189, 248, 0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            {/* Title Header */}
            <div style={{ marginBottom: '16px', paddingRight: '40px' }}>
              <div className="glass-pill" style={{ marginBottom: '8px', background: `${activeVideo.badgeColor || '#ec4899'}22`, color: activeVideo.badgeColor || '#fda4af' }}>
                {activeVideo.tag}
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>
                {activeVideo.title}
              </h3>
            </div>

            {/* HTML5 Video Player */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#000',
              marginBottom: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
            }}>
              <video 
                src={activeVideo.videoUrl}
                controls
                autoPlay
                poster={activeVideo.poster}
                style={{ width: '100%', maxHeight: '420px', display: 'block' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Memory Note */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '12px 16px',
              borderRadius: '10px',
              borderLeft: '3px solid #38bdf8',
              fontSize: '0.92rem',
              color: '#e2e8f0',
              lineHeight: 1.5
            }}>
              💭 <strong>Memory note:</strong> {activeVideo.memoryNote}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
