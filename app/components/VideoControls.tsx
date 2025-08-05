'use client';

import React from 'react';

interface DataCategory {
  id: string;
  name: string;
  color: string;
}

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>; // Kept for compatibility, but not used
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
  const handleReset = () => {
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

  return (
    <div className="bg-panelBackground rounded-xl shadow-xl p-5 w-full max-w-xs flex flex-col gap-4 mt-5 lg:mt-0 flex-shrink-0">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Data Categories</h2>
      <div id="categoryCheckboxes" className="flex flex-col gap-3">
        {dataCategories.map((category) => (
          <div key={category.id} className="flex items-center gap-3 cursor-pointer text-base font-semibold text-gray-800">
            <input
              type="checkbox"
              id={`category-${category.id}`}
              value={category.id}
              checked={activeCategories.includes(category.id)}
              onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
              className={`w-6 h-6 rounded border-2 cursor-pointer transition-colors duration-200 shadow-lg
                ${activeCategories.includes(category.id)
                  ? 'bg-white border-[3px] border-black ring-2 ring-offset-2 ring-black'
                  : 'bg-gray-200 border-gray-400'}
              `}
              style={{
                accentColor: category.color,
                boxShadow: `0 0 0 2px ${category.color}55`,
                outline: activeCategories.includes(category.id) ? `2px solid ${category.color}` : undefined,
                backgroundColor: activeCategories.includes(category.id) ? category.color : '#f3f4f6',
                borderColor: activeCategories.includes(category.id) ? '#000' : '#9ca3af',
              }}
            />
            <label
              htmlFor={`category-${category.id}`}
              className="cursor-pointer select-none text-lg font-bold"
              style={{ color: category.color, textShadow: `0 1px 4px #fff8` }}
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 text-center text-lg font-semibold"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
