'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Gamemodes } from '@/lib/constants';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export const GameDropdown = () => {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image src="/icons/puzzle.svg" alt="gamemode dropdown" width="32" height="32" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Games</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Gamemodes.filter(gamemode => !gamemode.locked).map((gamemode, index) => (
                    <DropdownMenuItem key={index} onSelect={() => router.push(gamemode.link)} className="gap-4 font-bold ">
                        <Image src={`/icons/${gamemode.icon}.svg`} alt="gamemode dropdown" width="32" height="32" />
                        {gamemode.name}
                    </DropdownMenuItem>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}