'use client'
import { Header } from '@/appcomponents/Header';
import { useWordContext } from '@/context/word-context';
import { Gamemodes } from '@/lib/constants';
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  const { wordOfTheDay, definitionOfTheDay } = useWordContext()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center ">
        <div className="flex flex-col items-center text-xl gap-4 p-8">
          <div className="font-[family-name:var(--font-righteous)] text-4xl bg-gradient-to-r from-sky-300 via-amber-200 to-rose-500 inline-block text-transparent bg-clip-text">
            {wordOfTheDay}
          </div>
          <div>
            {definitionOfTheDay}
          </div>
        </div>
        <div className="container space-y-8 columns-1 md:columns-3 gap-8">


          {Gamemodes.map((gamemode, index) => (
            <div key={index} className="flex items-center gap-4 font-bold text-2xl">
              <Image src={`/icons/${gamemode.icon}.svg`} alt="game icon" width="64" height="64" />
              {!gamemode.locked ? <Link href={gamemode.link}>
                {gamemode.name}
              </Link> : <div>{gamemode.name}</div> }
              {gamemode.locked && <Image src={`/icons/lock.svg`} alt="lock icon" width="24" height="24" />}
            </div>
          ))}
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center border-t border-sky-500 border-dashed">
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >

          FAQ
        </a> */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://twitter.com/0naama"
          target="_blank"
          rel="noopener noreferrer"
        >

          Made by Naama
        </a>

      </footer>
    </div>
  );
}
