'use client';

import React, { useState, useEffect } from 'react';

interface DataCategory {
  id: string;
  name: string;
  color: string;
}

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  activeCategories: string[];
  onCategoryToggle: (categoryId: string, active: boolean) => void;
}

const dataCategories: DataCategory[] = [
  { id: "impressions", name: "Impressions", color: "#3b82f6" },
  { id: "clicks", name: "Clicks", color: "#10b981" },
  { id: "conversions", name: "Conversions", color: "#ef4444" },
  { id: "engagement", name: "Engagement", color: "#f59e0b" },
];

export default function VideoControls({ videoRef, activeCategories, onCategoryToggle }: VideoControlsProps) {
  const [playButtonText, setPlayButtonText] = useState('Play');

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlayButtonText('Pause');
    } else {
      video.pause();
      setPlayButtonText('Play');
    }
  };

  const handleReset = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setPlayButtonText('Play');

    // Reset all categories to active
    dataCategories.forEach((category) => {
      if (!activeCategories.includes(category.id)) {
        onCategoryToggle(category.id, true);
      }
    });
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    onCategoryToggle(categoryId, checked);
  };

  // Update play button text based on video state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setPlayButtonText(video.paused ? 'Play' : 'Pause');
    };

    const handleEnded = () => {
      setPlayButtonText('Play');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', () => setPlayButtonText('Play'));
    video.addEventListener('play', () => setPlayButtonText('Pause'));

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', () => setPlayButtonText('Play'));
      video.removeEventListener('play', () => setPlayButtonText('Pause'));
    };
  }, [videoRef]);

  return (
    <div className="bg-panelBackground rounded-xl shadow-xl p-5 w-full max-w-xs flex flex-col gap-4 mt-5 lg:mt-0 flex-shrink-0">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Data Categories</h2>
      <div id="categoryCheckboxes" className="flex flex-col gap-3">
        {dataCategories.map((category) => (
          <div key={category.id} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              id={`category-${category.id}`}
              value={category.id}
              checked={activeCategories.includes(category.id)}
              onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
              className="w-4 h-4 rounded border-2 border-gray-400 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors duration-200"
              style={{ accentColor: category.color }}
            />
            <label
              htmlFor={`category-${category.id}`}
              className="cursor-pointer select-none"
              style={{ color: category.color }}
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <button
          onClick={handlePlayPause}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 text-center"
        >
          {playButtonText}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 text-center"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
