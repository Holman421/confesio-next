import React from "react";
import BrainIcon from "./BrainIcon";
import HandIcon from "./HandIcon";
import ProfileIcon from "./ProfileIcon";
import TemperatureIcon from "./TemperatureIcon";

type SatisfactionBlockProps = {
  label: string;
  value: number;
  icon: "brain" | "hand" | "profile" | "temperature";
};

const SatisfactionBlock = ({ label, value, icon }: SatisfactionBlockProps) => {
  const getIcon = () => {
    switch (icon) {
      case "brain":
        return <BrainIcon className="text-white size-12" />;
      case "hand":
        return <HandIcon className="text-white size-12" />;
      case "profile":
        return <ProfileIcon className="text-white size-12" />;
      case "temperature":
        return <TemperatureIcon className="text-white size-12" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-80">
      <div className="flex items-end gap-4">
        <div className="bg-[#582CFF] rounded-xl size-20 flex items-center justify-center">
          {getIcon()}
        </div>
        <p className="text-[14px] text-gray-400 font-medium">{label}</p>
      </div>
      <div className="w-full flex flex-col">
        <p className="text-[14px] text-white font-bold">{value}</p>
        <div className="w-full h-2 bg-[#351A99] rounded-full"></div>
      </div>
    </div>
  );
};

export default SatisfactionBlock;
