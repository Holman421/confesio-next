import React from "react";
import ThreeDotsIcon from "./icons/ThreeDotsIcon";
import CustomGaugeScore from "./CustomGaugeScore";
import WomanIcon from "./icons/WomanIcon";
import MenIcon from "./icons/MenIcon";

const NeuronsPanel = () => {
  return (
    <div className="h-full bg-panelBackground rounded-2xl p-12 px-16 border flex flex-col justify-between border-borderBlue">
      <div className="flex justify-between items-center">
        <h3 className="text-[18px] font-bold">Neurons impact score</h3>
        <div className="size-38 rounded-xl bg-white/10 flex items-center justify-center">
          <ThreeDotsIcon className="text-[#7551FF] size-16" />
        </div>
      </div>
      <div className="w-full flex justify-between items-center mt-4 gap-16">
        <div className="flex flex-col gap-21 w-full">
          <div className="py-4 px-24 border border-borderBlue w-full flex flex-col rounded-xl">
            <p className="text-gray-400 text-[14px] font-medium">Invited</p>
            <p className="text-[18px] text-white font-bold py-5 whitespace-nowrap">
              145 people
            </p>
            <p className="text-[11px] text-gray-400 opacity-30 font-medium whitespace-nowrap">
              age between 18 and 35
            </p>
          </div>
          <div className="flex w-full h-full">
            <div className="h-91 aspect-square bg-[#091742] p-20 flex flex-col gap-5 relative rounded-tl-xl rounded-bl-xl">
              <p className="text-gray-400 text-[14px] font-medium">Men</p>
              <p className="text-[18px]/[140%] font-bold">65</p>
              <MenIcon className="text-white/30 h-50 w-38 absolute bottom-0 right-10" />
            </div>
            <div className="h-91 aspect-square bg-[#430a5f] p-20 flex flex-col gap-5 relative rounded-tr-xl rounded-br-xl">
              <p className="text-gray-400 text-[14px] font-medium">Women</p>
              <p className="text-[18px]/[140%] font-bold">80</p>
              <WomanIcon className="text-white/30 h-50 w-38 absolute bottom-0 right-10" />
            </div>
          </div>
        </div>
        <div>
          <CustomGaugeScore
            value={0.75}
            size={200}
            label="Total Score"
            color="#582CFF"
            displayValue="9.3"
            strokeWidth={10}
          />
        </div>
      </div>
        <p className="text-[14px]/[140%] text-gray-400">Launch: The asset delivers exceptional memory performance and maintains strong focus, making it highly</p>
    </div>
  );
};

export default NeuronsPanel;
