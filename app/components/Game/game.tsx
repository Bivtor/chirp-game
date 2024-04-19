'use client'
import { useState } from "react";


export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartClick = () => {
        // Call the onStart function passed from parent component
        setGameStarted(true)
    };

    return (
        <div className="flex justify-center items-center rounded-lg w-full min-h-screen text-[color:var(--theme-text)]">
            {!gameStarted ? (
                <button onClick={handleStartClick} className=" text-[color:var(--theme-text)] font-bold py-2 px-4 rounded transition-opacity duration-1000 ease-in-out opacity-100 hover:opacity-0">
                    Start Game

                </button>
            ) : (
                <div>
                    game
                    {/* Place your game component here */}
                </div>
            )}
        </div>
    );
}
