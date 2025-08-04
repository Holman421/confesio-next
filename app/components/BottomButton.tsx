import React from 'react'

type BottomButtonProps = {
    text: string;
}

const BottomButton = ({ text }: BottomButtonProps) => {
    return (
        <button className='bg-gradient-to-l h-fit from-[#582CFF] to-[#351A99] py-10 px-30 rounded-xl'>{text}</button>
    )
}

export default BottomButton