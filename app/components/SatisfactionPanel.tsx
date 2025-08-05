import React, { useEffect, useRef, useState } from "react";
import ThreeDotsIcon from "./icons/ThreeDotsIcon";
import CustomGaugeScore from "./CustomGaugeScore";
import SatisfactionBlock from "./icons/SatisfactionBlock";

type GaugeValue = {
  value: number;
  displayValue: string;
};

interface SatisfactionPanelProps {
  isPlaying: boolean;
}

const initialGauges = [
  {
    label: "Attention on brand",
    color: "#582CFF",
    value: 0.55,
    displayValue: "8.5",
  },
  {
    label: "Focus",
    color: "#4CFF2C",
    value: 0.95,
    displayValue: "8.5",
  },
  {
    label: "Memory",
    color: "#FF2CF4",
    value: 0.7,
    displayValue: "8.5",
  },
  {
    label: "Engagement",
    color: "#FF8E2C",
    value: 0.39,
    displayValue: "159.3",
  },
];


const zeroGauges = initialGauges.map(g => ({
  ...g,
  value: 0,
  displayValue: g.label === "Engagement" ? "0.0" : "0.0"
}));

const SatisfactionPanel: React.FC<SatisfactionPanelProps> = ({ isPlaying }) => {
  const [gauges, setGauges] = useState(zeroGauges);
  const [hasAnimated, setHasAnimated] = useState(Array(initialGauges.length).fill(false));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Reset gauges to zero when not playing, restore to initialGauges when playing starts
  useEffect(() => {
    if (!isPlaying) {
      setGauges(zeroGauges);
      setHasAnimated(Array(initialGauges.length).fill(false));
    } else {
      setGauges(initialGauges);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setGauges((prev) =>
          prev.map((g, i) => {
            if (!hasAnimated[i]) return g; // Don't update until initial animation is done
            // Randomly increase or decrease value (larger delta)
            const delta = (Math.random() - 0.5) * 0.40;
            const newValue = Math.max(
              0,
              Math.min(1, parseFloat(g.value.toString()) + delta)
            );
            let displayValue: string;
            if (g.label === "Engagement") {
              const base = parseFloat(g.displayValue);
              const d = (Math.random() - 0.5) * 15;
              const newDisplay = Math.max(100, base + d).toFixed(1);
              displayValue = newDisplay;
            } else {
              const base = parseFloat(g.displayValue);
              const d = (Math.random() - 0.5) * 0.7;
              const newDisplay = Math.max(0, base + d).toFixed(1);
              displayValue = newDisplay;
            }
            return {
              ...g,
              value: parseFloat(newValue.toFixed(2)),
              displayValue,
            };
          })
        );
      }, 600);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, hasAnimated]);

  // Callback for CustomGaugeScore to notify when initial animation is done
  const handleGaugeAnimated = (idx: number) => {
    setHasAnimated((prev) => {
      if (prev[idx]) return prev;
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  // Animated values for SatisfactionBlocks
  const [eeg, setEeg] = useState(145);
  const [gsr, setGsr] = useState(63.26);
  const [rsp, setRsp] = useState(2.4);
  const [temp, setTemp] = useState(36.5);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setEeg((prev) => {
          const d = (Math.random() - 0.5) * 8; // -4 to +4
          const next = Math.max(120, Math.min(170, prev + d));
          return parseFloat(next.toFixed(1));
        });
        setGsr((prev) => {
          const d = (Math.random() - 0.5) * 6; // -3 to +3
          const next = Math.max(55, Math.min(70, prev + d));
          return parseFloat(next.toFixed(2));
        });
        setRsp((prev) => {
          const d = (Math.random() - 0.5) * 0.25; // -0.125 to +0.125
          const next = Math.max(2.1, Math.min(2.7, prev + d));
          return parseFloat(next.toFixed(3));
        });
        setTemp((prev) => {
          const d = (Math.random() - 0.5) * 0.4; // -0.2 to +0.2
          const next = Math.max(35.8, Math.min(37.2, prev + d));
          return parseFloat(next.toFixed(1));
        });
      }, 600);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <div className="size-full bg-panelBackground rounded-2xl flex flex-col border p-16 border-borderBlue">
      <div className="flex justify-between items-center">
        <h3 className="text-[18px] font-bold">Live satisfaction rate</h3>
        <div className="size-38 rounded-xl bg-white/10 flex items-center justify-center">
          <ThreeDotsIcon className="text-[#7551FF] size-16" />
        </div>
      </div>
      <div className="flex items-center w-full justify-between my-8">
        {gauges.map((g, i) => (
          <CustomGaugeScore
            key={g.label}
            value={g.value}
            size={100}
            label={g.label}
            color={g.color}
            displayValue={g.displayValue}
            strokeWidth={5}
            version="small"
            onInitialAnimationEnd={() => handleGaugeAnimated(i)}
          />
        ))}
      </div>
      <h3 className="text-[18px] font-bold">Overview of satisfaction rate</h3>
      <div className="flex justify-between mt-28">
        <SatisfactionBlock label="EEG" value={eeg} icon="brain" />
        <SatisfactionBlock label="GSR" value={gsr} icon="hand" />
        <SatisfactionBlock label="RSP" value={rsp} icon="profile" />
        <SatisfactionBlock label="TEMP" value={temp} icon="temperature" />
      </div>
    </div>
  );
};

export default SatisfactionPanel;
