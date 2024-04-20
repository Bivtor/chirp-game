'use client'
import Game from "./components/Game/game";
import Layout1 from "./components/MainLayout/layout1";
import StartQuestions from "./components/Game/Start";
import { useEffect, useState } from "react";

export interface UserInterface {
  userName: string;
  avatar: string;
  interests: string;
  bio: string;
  following: Set<UserInterface>;
  follow_requests: Set<FollowRequestInterface>;
  isPrimaryUser: boolean;
  points: number;
}

export interface FollowRequestInterface {
  accepted_request: boolean;
  user: UserInterface;
}

export default function Home() {
  const initialValues: UserInterface = { userName: '', avatar: 'yellow', interests: 'fashion', bio: '', following: new Set(), follow_requests: new Set(), isPrimaryUser: true, points: 100 };
  const [gameStarted, setGameStarted] = useState(false);
  const [formData, setFormData] = useState<UserInterface>(initialValues);

  useEffect(() => {
    if (sessionStorage.getItem('gamestarted') == "true") {
      setGameStarted(true)
    }

  }, [])


  const handleStartClick = (values: UserInterface) => {
    // callback passed to StartQuestions
    setGameStarted(true)
    // sessionStorage.setItem("gamestarted", "true");

    setFormData(values)
  };

  return (
    <main className="text-[color:var(--theme-text)] h-screen">
      {gameStarted && <Layout1 UserObject={formData} />}

      {!gameStarted && <div className="absolute top-1/4 right-auto w-1/2 h-1/2">
        <StartQuestions incomingSubmit={handleStartClick} initialValues={initialValues} />
      </div>}
    </main>
  );
}