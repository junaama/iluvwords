'use client'
import React from 'react'
import { Header } from "@/appcomponents/Header";
import VintageTextWrapper from "@/appcomponents/VintageTextWrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="items-center justify-items-center p-8 pb-16 gap-16 sm:p-20 bg-[#f0e7d5] m-auto relative overflow-hidden">
      <Header />
      <header className="header">
      </header>
      <main className="content">
        <section className="flex-1">
          <h2>
            <VintageTextWrapper>Lexicity</VintageTextWrapper>
          </h2>
          {children}
        </section>
        <section className="flex-1 border-stone-400 border p-2 border-dashed rounded-md">
          <h2>
            <VintageTextWrapper>RULES</VintageTextWrapper>
          </h2>
          <VintageTextWrapper as="p">
            Form anagrams from the Word of The Day that map to names of world structures.
          </VintageTextWrapper>
          <VintageTextWrapper as="p">
            <p>Example:</p>
            If the Word of The Day is RAMBUNCTIOUS, valid anagrams and structures could be BARN, COURT, TRAM, TRAIN and so on.

          </VintageTextWrapper>
          <VintageTextWrapper as="p">
            If you&apos;ve found all the words you could, come back tomorrow to continue building your city! Each city resets every Sunday at midnight.
          </VintageTextWrapper>
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

    .vintage-newspaper::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    
      opacity: 0.1;
      pointer-events: none;
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