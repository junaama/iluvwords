'use client'
import { Header } from '@/appcomponents/Header';
import { useWordContext } from '@/context/word-context';
import { Gamemodes } from '@/lib/constants';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import VintageTextWrapper from "@/appcomponents/VintageTextWrapper";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  hover: {
    rotate: [0, 10, -10, 10, -10, 0], // This creates a jiggle effect
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

export default function Home() {
  const { wordOfTheDay, definitionOfTheDay } = useWordContext()

  return (
    <div className="items-center justify-items-center p-8 pb-16 gap-16 sm:p-20 bg-[#f0e7d5] m-auto overflow-hidden">
      <Header hideWordDropdown hideGameDropdown />
      <div className="flex flex-col  text-md gap-2">

        <div className="font-[family-name:var(--font-righteous)] text-2xl bg-gradient-to-r from-sky-300 via-orange-400 to-rose-500 inline-block text-transparent bg-clip-text">
          {wordOfTheDay}
        </div>
        <div>
          {definitionOfTheDay}
        </div>
      </div>
      <header className="header">
      </header>
      <main className="content">
        <section className="flex-1">
          <div className=" flex flex-wrap gap-8">
            {Gamemodes.map((gamemode, index) => (
              <motion.div key={index} className="flex items-center gap-4 font-bold text-2xl" initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover="hover"
                variants={variants}>

                <Image src={`/icons/${gamemode.icon}.svg`} alt="game icon" width="64" height="64" />

                {!gamemode.locked ? <VintageTextWrapper><Link href={gamemode.link}>
                  {gamemode.name}
                </Link>
                </VintageTextWrapper> : <VintageTextWrapper>{gamemode.name}</VintageTextWrapper>}
                {gamemode.locked && <Image src={`/icons/lock.svg`} alt="lock icon" width="24" height="24" />}
              </motion.div >
            ))}
          </div>
        </section>
        <section className="flex-1 border-stone-400 border p-2 border-dashed rounded-md">
          <h2>
            <VintageTextWrapper>ABOUT</VintageTextWrapper>
          </h2>
          <VintageTextWrapper as="p">
            A suite of word games based on a daily word.
          </VintageTextWrapper>
          <h3>
            <VintageTextWrapper>
              Made by <a
                href="https://twitter.com/0naama" rel="noopener noreferrer" target="_blank" className=" animate-spin hover:border-b-2 hover:border-black hover:border-dashed">Naama</a> Paulemont
            </VintageTextWrapper>
          </h3>
        </section>
      </main>
      <style jsx>{`
    .vintage-newspaper {
      font-family: 'Times New Roman', Times, serif;
     background-color: #f0e7d5;
      color: #333;
      padding: 20px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }

    .header {
      text-align: center;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }

    .content {
      display: flex;
      gap: 20px;
    }

    h2 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .puzzle-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 1px;
      border: 2px solid #333;
    }

    .puzzle-cell {
      aspect-ratio: 1;
      border: 1px solid #333;
      background-color: #fff;
    }

    p {
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 10px;
      text-align: justify;
    }

    @media (max-width: 768px) {
      .content {
        flex-direction: column;
      }
    }
  `}</style>
    </div>
  )
}