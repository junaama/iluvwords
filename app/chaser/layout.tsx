import { Header } from "@/appcomponents/Header";
import { Gamemodes } from "@/lib/constants";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chaserGamemode = Gamemodes.find(mode => mode.name === "Chaser");
  const isLocked = chaserGamemode?.locked;

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <Header />
      <div className="text-2xl font-bold text-center p-4">
        Chaser
      </div>
      {isLocked ? (
        <div className="text-center text-xl">
          This gamemode is currently locked.
        </div>
      ) : (
        children
      )}
    </div>
  );
}