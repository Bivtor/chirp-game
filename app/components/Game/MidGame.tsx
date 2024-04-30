import { PrimaryUserInterface } from "@/app/page";


const MidGame: React.FC<{ usr: PrimaryUserInterface, trustStartButtonHandler: () => void }> = ({ usr, trustStartButtonHandler }) => {

    const trustStartButtonHandlerLocal = () => {
        trustStartButtonHandler()

    }
    return (
        <div className="text-[color:var(--theme-text)] flex flex-col py-20 content-center gap-6 font-montserrat h-full w-full px-6">
            <div className="text-chirp-h text-lg text-center italic leading-8">
                <span className="text-chirp-c">Think about some red flags in the follow requests you accepted:<br /></span>

                Did they use alienating language (us vs. them)?<br />
                Did they try and sell something or profit off of their followers in a sneaky way?<br />
                Did they make large claims without backing them up with facts?<br />



                <h3 onClick={trustStartButtonHandlerLocal} className='text-chirp-c hover:text-chirp-p hover:cursor-pointer text-center'>
                    Okay
                </h3>
            </div>
        </div>

    )
}

export default MidGame;