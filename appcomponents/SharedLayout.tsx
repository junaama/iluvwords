'use client'
import React from 'react'
import { Header } from "@/appcomponents/Header";
import VintageTextWrapper from "@/appcomponents/VintageTextWrapper";

export default function Layout({
  children,
  gameMode,
  rules
}: Readonly<{
  children: React.ReactNode;
  gameMode: string;
  rules: string[]
}>) {
  return (
    <div className="items-center justify-items-center p-8 pb-16 gap-16 sm:p-20 bg-[#f0e7d5] m-auto relative overflow-hidden">
      <Header />
      <header className="header">
      </header>
      <main className="content">
        <section className="flex-1">
          <h2>
            <VintageTextWrapper>{gameMode}</VintageTextWrapper>
          </h2>
          {children}
        </section>
        <section className="flex-1 border-stone-400 border p-2 border-dashed rounded-md">
          <h2>
            <VintageTextWrapper>RULES</VintageTextWrapper>
          </h2>
          
          {rules.map((rule, index) => (
            <VintageTextWrapper key={index} as="p">
              {rule}
            </VintageTextWrapper>
          ))}
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