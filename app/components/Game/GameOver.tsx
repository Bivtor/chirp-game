import { PrimaryUserInterface } from "@/app/page";


const GameOver: React.FC<{ usr: PrimaryUserInterface }> = ({ usr }) => {
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
                return "Broke the scale!!";
        }
    }
    return (
        <div className="text-[color:var(--theme-text)] flex flex-col justify-center content-center gap-6">
            <h2 className="text-chirp-h text-3xl text-center">
                Game Over
            </h2>
            <h2 className="text-chirp-c text-3xl text-center">
                {usr.score.score}
            </h2>
            <h3 className="text-chirp-p text-2xl text-center">
                {getScoreMessage(usr.score.score)}
            </h3>
        </div>

    )
}

export default GameOver;