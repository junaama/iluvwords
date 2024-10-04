'use client'
import { GameDropdown } from "./GameDropdown"
import Link from "next/link"
import { WordOfTheDayDropdown } from "./WordOfTheDayDropdown"
import RulesModal from "@/appcomponents/RulesModal";

type Props = {
    gameTitle?: string
    rules?: string
}

export const Header = ({ gameTitle, rules }: Props) => {

    return (
        <>
            <header className="flex justify-between items-center py-4 w-full border-b border-sky-500 border-dashed gap-4 ">
                <h1 className={`font-[family-name:var(--font-righteous)] text-3xl`}><Link href="/">iluvwords</Link></h1>

                <div className=" flex justify-center">
                    <WordOfTheDayDropdown />
                </div>

                <div className="flex gap-2">
                    <GameDropdown />
                    {gameTitle && rules && <RulesModal gameTitle={gameTitle} rules={rules} /> }
                </div>

            </header>
        </>
    )
}