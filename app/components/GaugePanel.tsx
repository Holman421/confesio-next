'use client';

import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

interface DataCategory {
  id: string;
  name: string;
  color: string;
}

interface GaugePanelProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  activeCategories: string[];
}

const dataCategories: DataCategory[] = [
  { id: "impressions", name: "Impressions", color: "#3b82f6" },
  { id: "clicks", name: "Clicks", color: "#10b981" },
  { id: "conversions", name: "Conversions", color: "#ef4444" },
  { id: "engagement", name: "Engagement", color: "#f59e0b" },
];

// Generate mock data based on video time
const generateCurrentValue = (categoryId: string, currentTime: number): number => {
  let baseValue = 0;
  let amplitude = 0;
  let frequency = 0;
  let noiseFactor = 0;

  switch (categoryId) {
    case "impressions":
      baseValue = 500;
      amplitude = 400;
      frequency = 0.5;
      noiseFactor = 50;
      break;
    case "clicks":
      baseValue = 50;
      amplitude = 40;
      frequency = 1.0;
      noiseFactor = 10;
      break;
    case "conversions":
      baseValue = 5;
      amplitude = 4;
      frequency = 0.2;
      noiseFactor = 2;
      break;
    case "engagement":
      baseValue = 100;
      amplitude = 80;
      frequency = 0.7;
      noiseFactor = 20;
      break;
    default:
      baseValue = 100;
      amplitude = 50;
      frequency = 1;
      noiseFactor = 10;
  }

  const value = Math.max(
    0,
    baseValue +
      amplitude * Math.sin((currentTime * frequency * Math.PI) / 2) +
      (Math.random() - 0.5) * noiseFactor
  );

  return parseFloat(value.toFixed(2));
};

// Normalize values for gauge display (0-1 range)
const normalizeValue = (categoryId: string, value: number): number => {
  switch (categoryId) {
    case "impressions":
      return Math.min(1, value / 1000); // Max 1000
    case "clicks":
      return Math.min(1, value / 100); // Max 100
    case "conversions":
      return Math.min(1, value / 10); // Max 10
    case "engagement":
      return Math.min(1, value / 200); // Max 200
    default:
      return Math.min(1, value / 200);
  }
};

export default function GaugePanel({ videoRef, activeCategories }: GaugePanelProps) {
  const [currentValues, setCurrentValues] = useState<Record<string, number>>({});
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);

  // Update values based on video time
  useEffect(() => {
    const updateValues = () => {
      const video = videoRef.current;
      if (!video) return;

      const currentTime = video.currentTime;
      
      // Only update if time has changed significantly (prevent too frequent updates)
      if (Math.abs(currentTime - lastUpdateTime) < 0.1) return;

      const newValues: Record<string, number> = {};
      dataCategories.forEach(category => {
        newValues[category.id] = generateCurrentValue(category.id, currentTime);
      });

      setCurrentValues(newValues);
      setLastUpdateTime(currentTime);
    };

    const video = videoRef.current;
    if (!video) return;

    // Update immediately
    updateValues();

    // Add event listeners
    video.addEventListener('timeupdate', updateValues);
    video.addEventListener('loadedmetadata', updateValues);

    return () => {
      video.removeEventListener('timeupdate', updateValues);
      video.removeEventListener('loadedmetadata', updateValues);
    };
  }, [videoRef, lastUpdateTime]);

  // Initialize values on mount
  useEffect(() => {
    const initialValues: Record<string, number> = {};
    dataCategories.forEach(category => {
      initialValues[category.id] = generateCurrentValue(category.id, 0);
    });
    setCurrentValues(initialValues);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-xl p-5 w-full max-w-xs flex flex-col gap-4 mt-5 flex-shrink-0">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Real-time Metrics</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {activeCategories.map((categoryId) => {
          const category = dataCategories.find(cat => cat.id === categoryId);
          if (!category) return null;

          const currentValue = currentValues[categoryId] || 0;
          const normalizedValue = normalizeValue(categoryId, currentValue);

          return (
            <div key={categoryId} className="flex flex-col items-center">
              <div className="w-full max-w-[200px]">
                <GaugeChart
                  id={`gauge-${categoryId}`}
                  nrOfLevels={3}
                  colors={["#ff4444", "#ffaa00", category.color]}
                  arcWidth={0.3}
                  percent={normalizedValue}
                  textColor={category.color}
                  animDelay={0}
                  animateDuration={300}
                  hideText={false}
                  formatTextValue={() => currentValue.toFixed(1)}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="text-center mt-2">
                <div 
                  className="text-sm font-semibold"
                  style={{ color: category.color }}
                >
                  {category.name}
                </div>
                <div className="text-xs text-gray-500">
                  {currentValue.toFixed(1)} / {
                    categoryId === 'impressions' ? '1000' :
                    categoryId === 'clicks' ? '100' :
                    categoryId === 'conversions' ? '10' : '200'
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeCategories.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <div className="text-sm">No categories selected</div>
          <div className="text-xs">Enable categories above to see gauges</div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <div>Live data synchronized</div>
          <div>with video timeline</div>
        </div>
      </div>
    </div>
  );
}
