import { Header } from "@/appcomponents/Header";
import { Gamemodes } from "@/lib/constants";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const nexusGamemode = Gamemodes.find(mode => mode.name === "Nexus");
    const isLocked = nexusGamemode?.locked;

    return (
        <div className="items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-12 font-[family-name:var(--font-geist-sans)] ">
            <Header rules="Given three words, provide a one-word clue that connects all three words. The clue should help others guess the given words, similar to the game Codenames, or reverse  NY Times Connections." gameTitle="Nexus"/>
            <div className="text-2xl font-bold text-center p-4">
                Nexus
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
