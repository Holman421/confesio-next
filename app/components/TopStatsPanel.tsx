import React from 'react'
import TopStat from './TopStat'

const TopStatsPanel = () => {
    return (
        <div className="w-full gap-24 flex">
            <TopStat
                title="Attention on brand"
                originalPercentage={10}
                newPercentage={20}
                iconType={1}
            />
            <TopStat
                title="Focus"
                originalPercentage={30}
                newPercentage={40}
                iconType={2}
            />
            <TopStat
                title="Memory"
                originalPercentage={50}
                newPercentage={-60}
                iconType={3}
            />
            <TopStat
                title="Cognitive demand"
                originalPercentage={70}
                newPercentage={80}
                iconType={4}
            />
        </div>
    )
}

export default TopStatsPanel