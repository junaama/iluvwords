'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useWordContext } from '@/context/word-context';

export const WordOfTheDayDropdown = () => {
    const { wordOfTheDay, definitionOfTheDay } = useWordContext()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="font-[family-name:var(--font-righteous)] text-3xl bg-gradient-to-r from-sky-300 via-amber-200 to-rose-500 inline-block text-transparent bg-clip-text">
                    {wordOfTheDay}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <div>
                    {definitionOfTheDay}
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}