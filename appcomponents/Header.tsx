'use client'
import { GameDropdown } from "./GameDropdown"
import Link from "next/link"
import { WordOfTheDayDropdown } from "./WordOfTheDayDropdown"
import RulesModal from "@/appcomponents/RulesModal";

type Props = {
    gameTitle?: string
    rules?: string
    hideWordDropdown?: boolean
}

export const Header = ({ gameTitle, rules, hideWordDropdown }: Props) => {
    return (
        <>
            <header className="flex items-center py-4 w-full border-b border-sky-500 border-dashed">
                <div className="flex-1">
                    <h1 className={`font-[family-name:var(--font-righteous)] text-3xl`}>
                        <Link href="/">iluvwords</Link>
                    </h1>
                </div>
                
                {!hideWordDropdown && (
                    <div className="flex-1 flex justify-center">
                        <WordOfTheDayDropdown />
                    </div>
                )}
                
                <div className="flex-1 flex gap-2" style={{justifyContent: "flex-end"}}>
                    <GameDropdown />
                    {gameTitle && rules && <RulesModal gameTitle={gameTitle} rules={rules} />}
                </div>
            </header>
        </>
    )
}