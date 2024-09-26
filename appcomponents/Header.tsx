import { GameDropdown } from "./GameDropdown"

export const Header = () => {
    return (
        <header className="flex justify-between items-center py-4 w-full border-b border-sky-500 border-dashed gap-4 ">
            <h1 className={` font-[family-name:var(--font-righteous)] text-3xl `}>iluvwords</h1>
            <GameDropdown />
        </header>
    )
}