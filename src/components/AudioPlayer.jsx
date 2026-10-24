import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc3, Play, Pause, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audioUtils';

export default function AudioPlayer({ musicConfig }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);
  const videoWasPlayingMusic = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current || !musicConfig?.autoPlayPrompt) return;

    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Browser autoplay policy may block automatic playback.
        // The Play button remains available.
      });
  }, [musicConfig?.autoPlayPrompt]);

  useEffect(() => {
    const handleVideoPlay = () => {
      if (!audioRef.current) return;

      videoWasPlayingMusic.current = !audioRef.current.paused;
      if (videoWasPlayingMusic.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleVideoStop = () => {
      if (!audioRef.current || !videoWasPlayingMusic.current) return;

      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      videoWasPlayingMusic.current = false;
    };

    window.addEventListener('birthday-video-play', handleVideoPlay);
    window.addEventListener('birthday-video-stop', handleVideoStop);

    return () => {
      window.removeEventListener('birthday-video-play', handleVideoPlay);
      window.removeEventListener('birthday-video-stop', handleVideoStop);
    };
  }, []);

  const togglePlay = () => {
    sfx.playChime();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio play allowed on user click", err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 900,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <audio
        ref={audioRef}
        src={musicConfig?.audioUrl}
        loop
        preload="auto"
        autoPlay
      />

      {/* Floating Music Widget */}
      <div 
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          borderRadius: '9999px',
          border: isPlaying ? '1px solid rgba(244, 63, 94, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: isPlaying ? '0 0 25px rgba(244, 63, 94, 0.35)' : '0 10px 25px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease',
          background: 'rgba(15, 18, 37, 0.85)'
        }}
      >
        {/* Spinning Vinyl Icon */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isPlaying ? '#fda4af' : '#94a3b8',
            transition: 'color 0.2s'
          }}
        >
          <Disc3 
            size={24} 
            style={{
              animation: isPlaying ? 'spin 4s linear infinite' : 'none',
              transformOrigin: 'center'
            }} 
          />
        </button>

        {/* Music Info */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '140px' }}>
          <span style={{ 
            fontSize: '0.78rem', 
            fontWeight: 600, 
            color: '#f8fafc',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {musicConfig?.title || "Special Song"}
          </span>
          <span style={{ fontSize: '0.68rem', color: '#fda4af', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={10} />
            {isPlaying ? "Playing for You" : "Click to Play"}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          style={{
            background: isPlaying ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
        </button>

        {/* Volume Button & Slider */}
        <div 
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <button
            onClick={toggleMute}
            style={{
              background: 'none',
              border: 'none',
              color: isMuted ? '#ef4444' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {showVolume && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '10px',
              padding: '8px 12px',
              background: 'rgba(15, 23, 42, 0.95)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (val > 0 && isMuted) setIsMuted(false);
                }}
                style={{ width: '80px', accentColor: '#f43f5e', cursor: 'pointer' }}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
