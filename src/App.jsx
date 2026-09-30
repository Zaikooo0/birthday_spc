import React, { useState } from 'react';
import { configData } from './config/memoriesData';
import StarBackground from './components/StarBackground';
import AudioPlayer from './components/AudioPlayer';
import PasswordGate from './components/PasswordGate';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import HerQuotesSection from './components/HerQuotesSection';
import PhotoGallerySection from './components/PhotoGallerySection';
import VideoMomentsSection from './components/VideoMomentsSection';
import SecretLetterSection from './components/SecretLetterSection';
import ShayariSection from './components/ShayariSection';
import SurpriseSection from './components/SurpriseSection';
import Footer from './components/Footer';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleExploreClick = () => {
    const el = document.querySelector('#our-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#070913' }}>
      {/* Dynamic Star & Firefly Canvas Background */}
      <StarBackground />

      {/* Password Gate Screen */}
      {!isUnlocked ? (
        <PasswordGate 
          recipient={configData.recipient} 
          onUnlock={handleUnlock} 
        />
      ) : (
        <>
          {/* Top Floating Glass Navbar */}
          <Navbar recipientName={configData.recipient.name} />

          {/* Floating Ambient Music Controller */}
          <AudioPlayer musicConfig={configData.music} />

          {/* Main Website Sections */}
          <main>
            {/* Hero Screen */}
            <HeroSection 
              heroConfig={configData.hero} 
              recipient={configData.recipient} 
              onExploreClick={handleExploreClick} 
            />

            {/* 1. Our Story (Interactive Timeline) */}
            <TimelineSection timeline={configData.timeline} />

            {/* 2. Her Words ("Things You Said That Stayed With Me") */}
            <HerQuotesSection 
              herQuotes={configData.herQuotes} 
              recipientName={configData.recipient.name} 
            />

            {/* 3. Our Memories (Polaroid Scrapbook Wall) */}
            <PhotoGallerySection polaroids={configData.polaroids} />

            {/* 4. Moments in Motion (Cinematic Video Reels) */}
            <VideoMomentsSection videos={configData.videos} />

            {/* 5. Things I Never Said (Interactive Wax-Sealed Handwritten Letter) */}
            <SecretLetterSection secretLetter={configData.secretLetter} />

            {/* 6. Her Shayari (Poetic Verses & Typography) */}
            <ShayariSection shayariList={configData.shayariList} />

            {/* 7. Birthday Surprise (Cake, Candles, Fireworks, Wishes) */}
            <SurpriseSection 
              surprise={configData.surprise} 
              recipient={configData.recipient} 
            />
          </main>

          {/* Heartfelt Footer */}
          <Footer recipientName={configData.recipient.name} />
        </>
      )}
    </div>
  );
}
