"use client";

import React, { useRef, useState, useCallback } from "react";
import LoginForm from "./components/LoginForm";
import VideoPlayer from "./components/VideoPlayer";
import DataGraph from "./components/DataGraph";
import VideoControls from "./components/VideoControls";
import Navigation from "./components/Navigation";
import TopStatsPanel from "./components/TopStatsPanel";
import BottomPanel from "./components/BottomPanel";
import NeuronsPanel from "./components/NeuronsPanel";
import FinalScorePanel from "./components/FinalScorePanel";
import SatisfactionPanel from "./components/SatisfactionPanel";
import Image from "next/image";

export default function VideoDataVisualizer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([
    "impressions",
    "clicks",
    "conversions",
    "engagement",
  ]);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleCategoryToggle = useCallback(
    (categoryId: string, active: boolean) => {
      console.log(
        `[page.tsx] Toggling category: ${categoryId}, Active: ${active}`
      );
      setActiveCategories((prev) => {
        if (active && !prev.includes(categoryId)) {
          const newState = [...prev, categoryId];
          console.log("[page.tsx] New activeCategories state:", newState);
          return newState;
        } else if (!active && prev.includes(categoryId)) {
          const newState = prev.filter((id) => id !== categoryId);
          console.log("[page.tsx] New activeCategories state:", newState);
          return newState;
        }
        return prev;
      });
    },
    []
  );

  const [isPlaying, setIsPlaying] = useState(false);

  if (!isAuthenticated) {
    return (
      <LoginForm loginDisabled={true} onAuthenticated={handleAuthentication} />
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
        <div className="w-full flex flex-col gap-16 justify-between">
          <TopStatsPanel />
          <div className="flex gap-16">
            <div className="flex flex-col gap-16 flex-10">
              <VideoPlayer ref={videoRef} />
              <DataGraph
                videoRef={videoRef}
                activeCategories={activeCategories}
                onCategoryToggle={handleCategoryToggle}
              />
            </div>
            <div className="flex flex-col gap-16 flex-12">
              <div className="w-full flex gap-16 flex-10">
                <NeuronsPanel />
                <FinalScorePanel />
              </div>
              <div className="w-full flex gap-16 flex-9">
                <VideoControls
                  videoRef={videoRef}
                  activeCategories={activeCategories}
                  onCategoryToggle={handleCategoryToggle}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <SatisfactionPanel isPlaying={isPlaying} />
              </div>
            </div>
          </div>

          <BottomPanel />
        </div>
      </div>
    </>
  );
}
