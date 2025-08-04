'use client';

import React, { useRef, useState } from 'react';
import LoginForm from './components/LoginForm';
import VideoPlayer from './components/VideoPlayer';
import DataGraph from './components/DataGraph';
import VideoControls from './components/VideoControls';
import GaugePanel from './components/GaugePanel';
import ScreenshotHandler from './components/ScreenshotHandler';
import DataCircle from './components/DataCircle';

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
      <div className="font-sans bg-gray-100 min-h-screen">
        {/* Main App */}
        <div className="main-content-area flex gap-4 flex-col lg:flex-row items-start justify-center p-5 min-h-screen">
          <div className="flex flex-col items-center flex-grow max-w-4xl">
            <div id="video-graph-container" className="w-full">
              <VideoPlayer ref={videoRef} />
              <DataGraph 
                videoRef={videoRef} 
                activeCategories={activeCategories}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <VideoControls 
              videoRef={videoRef}
              activeCategories={activeCategories}
              onCategoryToggle={handleCategoryToggle}
            />
            
            {/* <GaugePanel 
              videoRef={videoRef}
              activeCategories={activeCategories}
            /> */}

            <DataCircle score={9.3} />
          </div>
        </div>

        <ScreenshotHandler 
          videoRef={videoRef}
          activeCategories={activeCategories}
        />
      </div>
    </>
  );
}
