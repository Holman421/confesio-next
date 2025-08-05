"use client";

import React from "react";
import ThreeDotsIcon from "./icons/ThreeDotsIcon";

interface DataCategory {
  id: string;
  name: string;
  color: string;
}

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  activeCategories: string[];
  onCategoryToggle: (categoryId: string, active: boolean) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onChangeVectorVisibility: (vectorId: string, visible: boolean) => void;
  vectors: Record<string, boolean>;
}

const dataCategories: DataCategory[] = [
  { id: "vector1", name: "TEMP Skin Temperature", color: "#3b82f6" },
  { id: "vector2", name: "EEG Brain Activity", color: "#10b981" },
  { id: "vector3", name: "GSR Skin Conductance", color: "#ef4444" },
];

export default function VideoControls({
  videoRef,
  activeCategories,
  onCategoryToggle,
  onPlay,
  onPause,
  onChangeVectorVisibility,
  vectors
}: VideoControlsProps) {
  React.useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;
    const handlePlay = () => {
      if (onPlay) onPlay();
    };
    const handlePause = () => {
      if (onPause) onPause();
    };
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [videoRef, onPlay, onPause]);
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    console.log(
      `[VideoControls.tsx] Checkbox changed for ${categoryId}. Checked: ${checked}`
    );
    onCategoryToggle(categoryId, checked);
  };

  return (
    <div className="bg-panelBackground rounded-xl border border-borderBlue p-16 flex flex-col gap-4 mt-5 lg:mt-0 flex-shrink-0">
      <div className="flex justify-between items-center gap-24">
        <h3 className="text-[18px] font-bold">Data categories</h3>
        <div className="size-38 rounded-xl bg-white/10 flex items-center justify-center">
          <ThreeDotsIcon className="text-[#7551FF] size-16" />
        </div>
      </div>
      <div id="categoryCheckboxes" className="flex flex-col gap-16">
        {dataCategories.map((category, index) => (
          <div
            key={category.id}
            className="flex items-center gap-3 cursor-pointer text-base text-gray-800"
          >
            <label
              htmlFor={`category-${category.id}`}
              className="flex items-center gap-3 cursor-pointer select-none text-lg text-white"
            >
              <input
                type="checkbox"
                id={`category-${category.id}`}
                value={category.id}
                checked={vectors[category.id] || false}
                onChange={(e) => {
                  onChangeVectorVisibility(category.id, e.target.checked);
                }}
                className="sr-only peer"
              />
              <span
                className={`relative w-24 h-14 flex items-center rounded-full transition-colors duration-300
                  ${
                    vectors[category.id]
                      ? "bg-[#582CFF]"
                      : "bg-black"
                  }
                `}
              >
                <span
                  className={`absolute left-2 top-2 w-10 h-10 bg-white rounded-full transition-all duration-300
                    ${
                      vectors[category.id]
                        ? "translate-x-12"
                        : "translate-x-0"
                    }
                  `}
                />
              </span>
              <span className="ml-6 text-[14px]/[150%]">{category.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
