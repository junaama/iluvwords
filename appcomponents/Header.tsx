'use client'
import { GameDropdown } from "./GameDropdown"
import Link from "next/link"
import RulesModal from "@/appcomponents/RulesModal";
import { useWordContext } from "@/context/word-context";

type Props = {
    gameTitle?: string
    rules?: string
    hideWordDropdown?: boolean
    hideGameDropdown?: boolean
}

export const Header = ({ gameTitle, rules, hideWordDropdown, hideGameDropdown }: Props) => {
    const { wordOfTheDay, definitionOfTheDay } = useWordContext()
    return (
        <>
            <header className="flex flex-col  bg-gray-100 ">
                <div className="flex justify-between items-center">
                    <div className="w-1/2 " >
                        <h1 className={`font-[family-name:var(--font-righteous)] text-3xl`}>
                            <Link href="/">iluvwords</Link>
                        </h1>
                    </div>
                    <div className="w-1/2  ">
                        {!hideGameDropdown && <GameDropdown />}
                        {gameTitle && rules && <RulesModal gameTitle={gameTitle} rules={rules} />}
                    </div>
                </div>
                {!hideWordDropdown && <div className="w-full flex flex-col   gap-2 " >
                    <div className="font-[family-name:var(--font-righteous)] text-2xl bg-gradient-to-r from-sky-300 via-orange-400 to-rose-500 inline-block text-transparent bg-clip-text">
                        {wordOfTheDay}
                    </div>
                    <p className="mx-auto">{definitionOfTheDay}</p>
                </div>
                }
            </header>
        </>
    )
}