import { Header } from "@/appcomponents/Header";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-12 font-[family-name:var(--font-geist-sans)] ">
            <Header rules="Given three words, provide a one-word clue that connects all three words. The clue should help others guess the given words, similar to the game Codenames, or reverse  NY Times Connections." gameTitle="Nexus"/>
            <div className="text-2xl font-bold text-center p-4">
                Nexus
            </div>
            {children}
        </div>
    );
}
