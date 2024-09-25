'use client'
import { Header } from '@/appcomponents/Header';
import { Gamemodes } from '@/lib/constants';
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        {Gamemodes.map((gamemode, index) => (
          <div key={index} className="flex items-center gap-4 font-bold text-2xl">
            <Image src={`/icons/${gamemode.icon}.svg`} alt="game icon" width="64" height="64" />
            <Link href={gamemode.link}>
              {gamemode.name}
            </Link>
          </div>
        ))}


      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center border-t border-sky-500 border-dashed">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >

          FAQ
        </a>
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
