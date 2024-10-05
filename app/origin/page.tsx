"use client"

import { useState } from 'react'
import DragDropOrigins from '@/appcomponents/DragDropOrigins'
import MetalButton from '@/appcomponents/MetalButton'

interface Word {
  id: string
  text: string
}

export default function WordOriginGame() {
  const correctOrder = ["ergon", "energein", "energetikos"]; // Correct order of words
  const tempWords = ["energein", "ergon", "energetikos"]
  const givenWord = "energetic"
  // const [originWords, setOriginWords] = useState<Word[]>([
  //   { id: "word1", text: "ergon" },
  //   { id: "word2", text: "energetikos" },
  //   { id: "word3", text: "energein" },
  // ])
  const [timeline, setTimeline] = useState<(Word | null)[]>([null, null, null])

  const handleSubmit = () => {
    const userOrder = timeline.filter(Boolean).map((word) => word?.text);
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
      alert("Correct order!");
    } else {
      alert("Incorrect order. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <h1 className="text-3xl font-bold mb-8">Origin</h1>
    
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="text-2xl font-semibold mb-6 text-center">{givenWord}</div>
        <DragDropOrigins originWords={tempWords} />

        <div className="flex justify-center p-4">
          <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" onClick={handleSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}