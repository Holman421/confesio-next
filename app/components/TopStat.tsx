import React from 'react'
import Image from 'next/image'

type TopStatProps = {
  title: string;
  originalPercentage: number;
  newPercentage: number;
  iconType: 1 | 2 | 3 | 4;
}

const TopStat: React.FC<TopStatProps> = ({ title, originalPercentage, newPercentage, iconType }) => {
  const getIcon = (type: 1 | 2 | 3 | 4) => {
    const iconMap = {
      1: '/svg/topIcon1.svg',
      2: '/svg/topIcon2.svg',
      3: '/svg/topIcon3.svg',
      4: '/svg/topIcon4.svg'
    };
    return iconMap[type];
  };

  const isPositive = newPercentage >= 0;
  const percentageSign = isPositive ? '+' : '-';
  const percentageColor = isPositive ? 'text-green-300' : 'text-red-400';

  return (
    <div className='h-76 rounded-xl p-16 flex justify-between w-full bg-panelBackground'>
      <div className='flex flex-col'>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className='flex gap-2'>
          <p className="text-sm text-gray-300">{originalPercentage}%</p>
          <p className={`text-sm ${percentageColor}`}>
            {percentageSign}{Math.abs(newPercentage)}%
          </p>
        </div>
      </div>
      <div className='bg-gradient-to-t from-[#004699] to-[#582CFF] p-8 rounded-md h-full aspect-square flex items-center justify-center'>
        <Image
          src={getIcon(iconType)}
          alt={`${title} icon`}
          className='size-full'
          width={40}
          height={40}
        />
      </div>
    </div>
  )
}

export default TopStat