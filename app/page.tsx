'use client'
import Game from "./components/Game/game";
import Layout1 from "./components/MainLayout/layout1";
import StartQuestions from "./components/Game/Start";
import { useEffect, useState } from "react";

export interface UserValues {
  userName: string;
  avatar: string;
  interests: string;
  bio: string;
}

export default function Home() {
  const initialValues: UserValues = { userName: '', avatar: 'yellow', interests: 'fashion', bio: '' };
  const [gameStarted, setGameStarted] = useState(false);
  const [formData, setFormData] = useState<UserValues>(initialValues);

  useEffect(() => {
    if (sessionStorage.getItem('gamestarted') == "true") {
      setGameStarted(true)
    }

  }, [])


  const handleStartClick = (values: UserValues) => {
    // callback passed to StartQuestions
    setGameStarted(true)
    // sessionStorage.setItem("gamestarted", "true");

    setFormData(values)

    // sessionStorage.setItem("username", `${values.userName}`);
    // sessionStorage.setItem("bio", `${values.bio}`);
    // sessionStorage.setItem("avatar", `${values.avatar}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-[color:var(--theme-text)]">
      {gameStarted && <Layout1 UserObject={formData} />}

      {!gameStarted && <div className="absolute top-1/4 right-auto w-1/2 h-1/2">
        <StartQuestions incomingSubmit={handleStartClick} initialValues={initialValues} />
      </div>}
    </main>
  );
}