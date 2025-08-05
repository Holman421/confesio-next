import React from "react";
import BottomButton from "./BottomButton";
import Image from "next/image";
import OverviewIcon from "./icons/OverviewIcon";
import FilesIcon from "./icons/FilesIcon";
import SettingsIcon from "./icons/SettingsIcon";

const BottomPanel = () => {
  return (
    <div className="bg-panelBackground rounded-xl h-124 p-16 flex justify-between">
      <div className="flex items-center gap-16">
        <div className="h-full aspect-square bg-gradient-to-t from-[#7F98FF] rounded-md  to-[#9764FC] relative">
          <Image
            src="/images/nissan.png"
            alt="Description"
            fill
            className="object-contain rounded-full p-8"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-white">Nissan Europe</h3>
          <p>europe@nissan.com</p>
        </div>
      </div>
      <div className="flex gap-16 items-center">
        <BottomButton variant="primary">
          <div className="flex items-center gap-4">
            <OverviewIcon  className="text-white size-16" />
            <p>Overview</p>
          </div>
        </BottomButton>
        <BottomButton>
          <div className="flex items-center gap-4">
            <FilesIcon className="text-white size-16" />
            <p>Older Files</p>
          </div>
        </BottomButton>
        <BottomButton>
          <div className="flex items-center gap-4">
            <SettingsIcon className="text-white size-16" />
            <p>Projects</p>
          </div>
        </BottomButton>
      </div>
    </div>
  );
};

export default BottomPanel;
