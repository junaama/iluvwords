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
                {Gamemodes.map((gamemode, index) => (
                    <DropdownMenuItem onSelect={() => router.push(gamemode.link)}>
                        {gamemode.name}
                    </DropdownMenuItem>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}