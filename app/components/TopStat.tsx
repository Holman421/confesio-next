import React from 'react'

import BrainIcon from './icons/BrainIcon';
import EyeIcon from './icons/EyeIcon';
import HeadIcon from './icons/HeadIcon';
import LightbulbIcon from './icons/LightbulbIcon';

type IconType = 'brain' | 'eye' | 'head' | 'lightbulb';

type TopStatProps = {
  title: string;
  originalPercentage: number;
  newPercentage: number;
  iconType: IconType;
}

const TopStat: React.FC<TopStatProps> = ({ title, originalPercentage, newPercentage, iconType }) => {
  const getIconComponent = (type: IconType) => {
    const iconMap = {
      brain: BrainIcon,
      eye: EyeIcon,
      head: HeadIcon,
      lightbulb: LightbulbIcon,
    };
    return iconMap[type];
  };

  const isPositive = newPercentage >= 0;
  const percentageSign = isPositive ? '+' : '-';
  const percentageColor = isPositive ? 'text-[#01B574]' : 'text-[#E31A1A]';

  return (
    <div className='h-76 rounded-xl p-16 flex border-borderBlue border justify-between w-full bg-panelBackground'>
      <div className='flex flex-col'>
        <h3 className="font-semibold text-gray-400 text-[14px]">{title}</h3>
        <div className='flex gap-6 items-center'>
          <p className="text-[18px] text-white">{originalPercentage}%</p>
          <p className={`text-[14px] ${percentageColor}`}>
            {percentageSign}{Math.abs(newPercentage)}%
          </p>
        </div>
      </div>
      <div className='bg-gradient-to-t from-[#004699] to-[#582CFF] p-8 rounded-xl h-full aspect-square flex items-center justify-center'>
        {(() => {
          const Icon = getIconComponent(iconType);
          return Icon ? <Icon className='size-full' /> : null;
        })()}
      </div>
    </div>
  )
}

export default TopStat