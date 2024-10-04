import { Header } from "@/appcomponents/Header";
import RulesModal from "@/appcomponents/RulesModal";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-12 font-[family-name:var(--font-geist-sans)] ">
            <div className="flex gap-4 ">
                <Header gameTitle="BABEL" rules="Create and connect anagrams of today's word of the day to drop all letters."/>
            </div>
            <div className="text-2xl font-bold text-center p-4">
                BABEL
            </div>
            {children}
        </div>
    );
}