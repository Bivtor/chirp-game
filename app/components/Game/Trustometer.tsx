import { ScoreInterace } from '@/app/page'
import React from 'react'

const Trustometer: React.FC<{ score: ScoreInterace, startButtonHandler: () => void }> = ({ score, startButtonHandler }) => {
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

            <h3 onClick={startButtonHandler} className='hover:text-chirp-p hover:cursor-pointer'>
                Start
            </h3>



        </div>
    )
}

export default Trustometer