import React from 'react'
import BottomButton from './BottomButton'
import Image from 'next/image'

const BottomPanel = () => {
    return (
        <div className='bg-panelBackground rounded-xl h-124 p-16 flex justify-between'>
            <div className='flex items-center gap-16'>
                <div className="h-full aspect-square bg-gradient-to-t from-[#7F98FF] rounded-md  to-[#9764FC] relative">
                    <Image src="/images/nissan.png" alt="Description" fill className="object-contain rounded-full p-8" />
                </div>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-white'>Nissan Europe</h3>
                    <p>europe@nissan.com</p>
                </div>
            </div>
            <div className='flex gap-16 items-center'>
                <BottomButton text="Overview" />
                <BottomButton text="Older File" />
                <BottomButton text="Projects" />
            </div>
        </div>
    )
}

export default BottomPanel