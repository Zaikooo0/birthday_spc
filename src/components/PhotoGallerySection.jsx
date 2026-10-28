  import React, { useState } from 'react';
import { Camera, Sparkles, MapPin, Calendar, X, Heart, Eye } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function PhotoGallerySection({ polaroids }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', ...new Set(polaroids?.map(p => p.category) || [])];

  const filteredPhotos = activeTab === 'All'
    ? polaroids
    : polaroids?.filter(p => p.category === activeTab);

  const openLightbox = (photo) => {
    sfx.playChime();
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    sfx.playPop();
    setSelectedPhoto(null);
  };

  return (
    <section id="our-memories" className="section-container">
      {/* Header */}
      <div className="section-header">
        <div className="section-tag" style={{ background: 'rgba(251, 191, 36, 0.12)', borderColor: 'rgba(251, 191, 36, 0.3)', color: '#fde047' }}>
          <Camera size={14} />
          <span>Polaroid Scrapbook Wall</span>
        </div>
        <h2 className="section-title">
          3. Our Memories & <span className="gradient-text-gold">Frozen Moments</span>
        </h2>
        <p className="section-subtitle">
          Every photo here holds a thousand unspoken jokes, endless smiles, and irreplaceable stories.
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
                setActiveTab(cat);
              }}
              style={{
                padding: '6px 18px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeTab === cat ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255, 255, 255, 0.06)',
                color: activeTab === cat ? '#fff' : '#94a3b8',
                boxShadow: activeTab === cat ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '36px 28px',
        maxWidth: '1150px',
        margin: '0 auto',
        padding: '20px 0'
      }}>
        {filteredPhotos?.map((photo) => (
          <div
            key={photo.id}
            className="polaroid-card"
            style={{
              transform: `rotate(${photo.rotation || 0}deg)`,
            }}
            onClick={() => openLightbox(photo)}
          >
            {/* Washi Tape */}
            <div className="polaroid-tape" />

            {/* Polaroid Image Wrapper */}
            <div className="polaroid-image-wrapper">
              <img 
                src={photo.image} 
                alt={photo.title}
                className="polaroid-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                gap: '8px',
                transition: 'opacity 0.25s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
              >
                <Eye size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Click to View Story</span>
              </div>
            </div>

            {/* Handwritten Caption & Date */}
            <div style={{ paddingTop: '14px', textAlign: 'center' }}>
              <div className="font-handwritten" style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#1e293b',
                lineHeight: 1.2,
                marginBottom: '4px'
              }}>
                {photo.title}
              </div>

              <div style={{
                fontSize: '0.8rem',
                color: '#64748b',
                fontStyle: 'italic',
                marginBottom: '8px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                "{photo.caption}"
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.72rem',
                color: '#94a3b8',
                borderTop: '1px dashed #e2e8f0',
                paddingTop: '6px'
              }}>
                <span>📍 {photo.location}</span>
                <span>📅 {photo.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={closeLightbox}>
          <div 
            className="glass-panel"
            style={{
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              padding: '24px',
              background: '#0d1127',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(251, 191, 36, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
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

            {/* Modal Body */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'center'
            }}>
              {/* Image Preview */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', maxHeight: '420px' }}>
                <img 
                  src={selectedPhoto.image} 
                  alt={selectedPhoto.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Memory Story details */}
              <div>
                <div className="glass-pill" style={{ marginBottom: '12px', background: 'rgba(251, 191, 36, 0.15)', color: '#fde047' }}>
                  <Sparkles size={14} />
                  <span>{selectedPhoto.category} Memory</span>
                </div>

                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px', color: '#fff' }}>
                  {selectedPhoto.title}
                </h3>

                <p className="font-serif" style={{
                  fontSize: '1.1rem',
                  color: '#fda4af',
                  fontStyle: 'italic',
                  marginBottom: '16px',
                  lineHeight: 1.4
                }}>
                  "{selectedPhoto.caption}"
                </p>

                <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {selectedPhoto.fullStory}
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.85rem',
                  color: '#94a3b8'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={16} style={{ color: '#f43f5e' }} />
                    {selectedPhoto.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={16} style={{ color: '#fbbf24' }} />
                    {selectedPhoto.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
