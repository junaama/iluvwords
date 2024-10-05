"use client"
import DragDropOrigins from '@/appcomponents/DragDropOrigins'

export default function WordOriginGame() {
  const correctOrder = ["ergon", "energein", "energetikos"]; // Correct order of words
  const tempWords = ["energein", "ergon", "energetikos"]
  const givenWord = "energetic"

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-full">
        <div className="text-2xl font-semibold mb-6 text-center">{givenWord}</div>
        <DragDropOrigins originWords={tempWords} correctOrder={correctOrder} />

      </div>
    </div>
  )
}