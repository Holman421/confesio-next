'use client';

import React, { useRef, useState } from 'react';
import LoginForm from './components/LoginForm';
import VideoPlayer from './components/VideoPlayer';
import DataGraph from './components/DataGraph';
import VideoControls from './components/VideoControls';
import Navigation from './components/Navigation';
import TopStatsPanel from './components/TopStatsPanel';
import BottomPanel from './components/BottomPanel';
import NeuronsPanel from './components/NeuronsPanel';
import FinalScorePanel from './components/FinalScorePanel';
import SatisfactionPanel from './components/SatisfactionPanel';
import Image from 'next/image';

export default function VideoDataVisualizer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([
    'impressions', 'clicks', 'conversions', 'engagement'
  ]);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleCategoryToggle = (categoryId: string, active: boolean) => {
    setActiveCategories(prev => {
      if (active && !prev.includes(categoryId)) {
        return [...prev, categoryId];
      } else if (!active && prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      }
      return prev;
    });
  };

  if (!isAuthenticated) {
    return (
      <LoginForm
        loginDisabled={true}
        onAuthenticated={handleAuthentication}
      />
    );
  }

  return (
    <>
      <div className="font-sans h-screen px-48 py-16 flex gap-16">
        <Image
          src="/images/background.jpg"
          alt="Confesio Background"
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
          width={1920}
          height={1080}
        />
        <Navigation />
        <div className='w-full flex flex-col gap-16'>
          <TopStatsPanel />
          <div className='w-full flex-1 flex gap-16'>
            <VideoPlayer ref={videoRef} />
            <NeuronsPanel />
            <FinalScorePanel />
          </div>
          <div className='w-full flex gap-16'>
            <DataGraph
              videoRef={videoRef}
              activeCategories={activeCategories}
              onCategoryToggle={handleCategoryToggle}
            />
            <VideoControls
              videoRef={videoRef}
              activeCategories={activeCategories}
              onCategoryToggle={handleCategoryToggle}
            />
            <SatisfactionPanel />

          </div>
          <div className='w-full'>
            <BottomPanel />
          </div>

        </div>

      </div>
    </>
  );
}
