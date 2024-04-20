import React from 'react'

export interface ScoreInterace {
    score: number;
    interest: string;
    stage: number;
    notifications: number;
}

const Trustometer: React.FC<{ score: ScoreInterace }> = ({ score }) => {
    return (
        <div className='flex flex-col items-center justify-start gap-4 py-5 text-[color:var(--theme-text)] h-screen'>
            <h1>
                Trustometer
            </h1>

            <h2 className='font-bold text-red-600'>
                {score.score}
            </h2>

            <h3 className='text-center	'>
                Here you can find your score
            </h3>

            <h3 className='text-center	'>
                Add
            </h3>

            <h3 className='text-center	'>
                Look at your notifications panel to begin!
            </h3>

        </div>
    )
}

export default Trustometer