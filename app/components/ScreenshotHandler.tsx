'use client';

import React, { useEffect, useCallback } from 'react';

interface DataCategory {
  id: string;
  name: string;
  color: string;
}

interface ScreenshotHandlerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  activeCategories: string[];
}

const dataCategories: DataCategory[] = [
  { id: "impressions", name: "Impressions", color: "#3b82f6" },
  { id: "clicks", name: "Clicks", color: "#10b981" },
  { id: "conversions", name: "Conversions", color: "#ef4444" },
  { id: "engagement", name: "Engagement", color: "#f59e0b" },
];

// Dynamic import for html2canvas-pro
let html2canvas: any = null;

export default function ScreenshotHandler({ videoRef, activeCategories }: ScreenshotHandlerProps) {
  
  const updateDataDisplay = useCallback((currentVideoTime: number) => {
    const dataValuesGrid = document.getElementById("dataValuesGrid");
    if (!dataValuesGrid) return;

    let gridContent = "";
    activeCategories.forEach((categoryId) => {
      const category = dataCategories.find(cat => cat.id === categoryId);
      if (category) {
        // Generate mock value for display (this should come from actual data)
        const mockValue = Math.random() * 100;
        gridContent += `
          <div class="bg-gray-50 rounded-lg p-4 text-center border-l-4" style="border-left-color: ${category.color};">
            <div class="text-lg font-bold" style="color: ${category.color};">${mockValue.toFixed(2)}</div>
            <div class="text-sm text-gray-600">${category.name}</div>
          </div>
        `;
      }
    });
    dataValuesGrid.innerHTML = gridContent;
  }, [activeCategories]);

  const showDataDisplay = useCallback(async (currentVideoTime: number) => {
    const dataDisplaySection = document.getElementById("dataDisplaySection");
    if (!dataDisplaySection) return;

    updateDataDisplay(currentVideoTime);
    
    dataDisplaySection.style.display = "block";
    dataDisplaySection.style.opacity = "0";
    dataDisplaySection.style.transform = "translateY(-20px)";
    
    // Force reflow
    dataDisplaySection.offsetHeight;
    
    dataDisplaySection.style.opacity = "1";
    dataDisplaySection.style.transform = "translateY(0)";
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }, [updateDataDisplay]);

  const showVideoTimeOverlay = useCallback((currentTime: number, duration: number): (() => void) | undefined => {
    const video = videoRef.current;
    const videoContainer = document.querySelector('#video-data-container .w-full.rounded-xl') as HTMLElement;
    if (!video || !videoContainer) return undefined;

    // Create time overlay element
    const timeOverlay = document.createElement('div');
    timeOverlay.id = 'video-time-overlay';
    timeOverlay.style.cssText = `
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      white-space: nowrap;
    `;
    timeOverlay.textContent = `${currentTime.toFixed(2)}s / ${duration.toFixed(2)}s`;

    // Make video container relative positioned
    const originalPosition = videoContainer.style.position;
    videoContainer.style.position = 'relative';
    videoContainer.appendChild(timeOverlay);

    return () => {
      if (timeOverlay.parentNode) {
        timeOverlay.parentNode.removeChild(timeOverlay);
      }
      videoContainer.style.position = originalPosition;
    };
  }, [videoRef]);

  const hideDataDisplay = useCallback(async () => {
    const dataDisplaySection = document.getElementById("dataDisplaySection");
    if (!dataDisplaySection) return;

    dataDisplaySection.style.opacity = "0";
    dataDisplaySection.style.transform = "translateY(-20px)";
    
    await new Promise(resolve => setTimeout(resolve, 300));
    dataDisplaySection.style.display = "none";
  }, []);

  const fadeOutGraph = useCallback(async () => {
    const graphSection = document.querySelector('#video-graph-container > div:last-child') as HTMLElement;
    if (!graphSection) return;

    graphSection.style.transition = "opacity 0.3s ease-in-out";
    graphSection.style.opacity = "0";
    graphSection.style.pointerEvents = "none";
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }, []);

  const fadeInGraph = useCallback(async () => {
    const graphSection = document.querySelector('#video-graph-container > div:last-child') as HTMLElement;
    if (!graphSection) return;

    graphSection.style.opacity = "1";
    graphSection.style.pointerEvents = "auto";
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }, []);

  const takeScreenshot = useCallback(async () => {
    if (!html2canvas) {
      alert("Screenshot library is still loading. Please try again in a moment.");
      return;
    }

    try {
      const video = videoRef.current;
      const videoDataContainer = document.getElementById("video-data-container");
      
      if (!video || !videoDataContainer) {
        throw new Error("Required elements not found");
      }

      document.body.classList.add('screenshot-mode');
      
      await fadeOutGraph();
      await showDataDisplay(video.currentTime);

      // Show video time overlay
      const removeTimeOverlay = showVideoTimeOverlay(video.currentTime, video.duration);

      const videoContainer = videoDataContainer.querySelector('div:first-child') as HTMLElement;
      const originalVideoRadius = videoContainer?.style.borderRadius || '';
      const originalVideoClass = videoContainer?.className || '';
      const originalDataRadius = document.getElementById("dataDisplaySection")?.style.borderRadius || '';
      const originalDataClass = document.getElementById("dataDisplaySection")?.className || '';

      if (videoContainer) {
        videoContainer.style.borderRadius = '0';
        videoContainer.className = originalVideoClass.replace(/rounded-\w+/g, '');
      }
      
      const dataContainer = document.getElementById("dataDisplaySection");
      if (dataContainer) {
        dataContainer.style.borderRadius = '0';
        dataContainer.className = originalDataClass.replace(/rounded-\w+/g, '');
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(videoDataContainer, {
        allowTaint: true,
        useCORS: true,
        scale: 1,
        backgroundColor: '#ffffff',
        logging: false,
        width: videoDataContainer.offsetWidth,
        height: videoDataContainer.offsetHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Clean up time overlay
      if (removeTimeOverlay) {
        removeTimeOverlay();
      }

      // Restore original styles
      if (videoContainer) {
        videoContainer.style.borderRadius = originalVideoRadius;
        videoContainer.className = originalVideoClass;
      }
      
      if (dataContainer) {
        dataContainer.style.borderRadius = originalDataRadius;
        dataContainer.className = originalDataClass;
      }

      await hideDataDisplay();
      await fadeInGraph();
      document.body.classList.remove('screenshot-mode');

      canvas.toBlob((blob: Blob | null) => {
        if (!blob) {
          alert("Failed to create screenshot blob");
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `video-screenshot-${video.currentTime.toFixed(2)}s.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    } catch (error: unknown) {
      console.error("Screenshot failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Screenshot failed: ${errorMessage}`);
      
      document.body.classList.remove('screenshot-mode');
      await hideDataDisplay();
      await fadeInGraph();
    }
  }, [videoRef, fadeOutGraph, fadeInGraph, showDataDisplay, hideDataDisplay, showVideoTimeOverlay]);

  useEffect(() => {
    // Load html2canvas-pro dynamically
    const loadHtml2Canvas = async () => {
      try {
        const module = await import('html2canvas-pro');
        html2canvas = module.default || module;
      } catch (error) {
        console.error("Failed to load html2canvas-pro:", error);
      }
    };

    loadHtml2Canvas();

    // Listen for screenshot events
    const handleScreenshotEvent = () => {
      takeScreenshot();
    };

    window.addEventListener('take-screenshot', handleScreenshotEvent);

    return () => {
      window.removeEventListener('take-screenshot', handleScreenshotEvent);
    };
  }, [takeScreenshot]);

  return null; // This component doesn't render anything visible
}
