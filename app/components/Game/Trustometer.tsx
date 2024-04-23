import { ScoreInterace } from '@/app/page'
import React, { useState } from 'react'

const Trustometer: React.FC<{ score: ScoreInterace, startButtonHandler: () => void, showButton: boolean, buttonText: string }> = ({ score, startButtonHandler, buttonText, showButton }) => {

    return (
        <div className='font-montserrat flex flex-col items-center justify-start gap-4 py-5 text-[color:var(--theme-text)] h-screen'>
            <h1>
                Trustometer
            </h1>

            <h2 className='font-bold text-chirp-c'>
                {score.score}
            </h2>

            <h3 className='text-center	'>
                Here you can find your score
            </h3>

            {showButton && <h3 onClick={startButtonHandler} className='hover:text-chirp-p hover:cursor-pointer'>
                {buttonText}
            </h3>}



        </div>
    )
}

export default Trustometer