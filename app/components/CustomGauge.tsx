'use client';

import React from 'react';

interface CustomGaugeProps {
  value: number; // 0-1 range
  color: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
  displayValue?: string;
}

export default function CustomGauge({ 
  value, 
  color, 
  size = 120, 
  strokeWidth = 8, 
  label = '', 
  displayValue = '' 
}: CustomGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - Math.min(Math.max(value, 0), 1));
  
  const center = size / 2;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.3s ease-in-out',
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div 
              className="text-lg font-bold"
              style={{ color }}
            >
              {displayValue}
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(value * 100)}%
            </div>
          </div>
        </div>
      </div>
      {label && (
        <div className="mt-2 text-center">
          <div 
            className="text-sm font-semibold"
            style={{ color }}
          >
            {label}
          </div>
        </div>
      )}
    </div>
  );
}
