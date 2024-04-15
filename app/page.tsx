import Game from "./components/Game/game";
import Layout1 from "./components/MainLayout/layout1";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between border border-blue-200">
      <Layout1 />
    </main>
  );
}
