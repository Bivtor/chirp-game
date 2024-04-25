import { ScoreInterace } from '@/app/page'
import React from 'react'
import Gauge from './Gauge';

const Trustometer: React.FC<{ score: ScoreInterace, startButtonHandler: () => void, showButton: boolean, buttonText: string }> = ({ score, startButtonHandler, buttonText, showButton }) => {
    function getScoreMessage(score: number) {
        switch (true) {
            case (score >= 180 && score <= 200):
                return "Incredible!";
            case (score >= 160 && score < 180):
                return "Amazing!";
            case (score >= 140 && score < 160):
                return "Great!";
            case (score >= 120 && score < 140):
                return "Good";
            case (score >= 100 && score < 120):
                return "Nice";
            case (score >= 80 && score < 100):
                return "Almost there";
            case (score >= 60 && score < 80):
                return "Hmmm, where did you go wrong?";
            case (score >= 40 && score < 60):
                return "Uh oh";
            case (score >= 20 && score < 40):
                return "Oops";
            case (score >= 0 && score < 20):
                return "Let's try that again";
            default:
                return "Invalid score";
        }
    }

    return (
        <div className='font-montserrat flex flex-col items-center justify-start gap-4 py-5 text-[color:var(--theme-text)] '>
            <div className="flex flex-row text-4xl font-montserrat">
                <p className="text-chirp-c">T</p>
                <p className="text-chirp-h">r</p>
                <p className="text-chirp-i">u</p>
                <p className="text-chirp-r">s</p>
                <p className="text-chirp-p">t</p>
                <p>ometer</p>
            </div>

            <div>
                <Gauge value={score.score} />
            </div>

            <h2 className='font-bold text-chirp-c'>
                {score.score}
            </h2>

            {score.stage > 0 && (<h3 className='text-2xl text-chirp-h text-center'>
                {getScoreMessage(score.score)}
            </h3>)}

            {showButton && <h3 onClick={startButtonHandler} className='hover:text-chirp-p hover:cursor-pointer text-lg text-center'>
                {buttonText}
            </h3>}

        </div>
    )
}

export default Trustometer;