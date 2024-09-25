"use client"

import { useState, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Component() {
  const word = "Sunshine"
  const [description, setDescription] = useState("")
  const [rarityScore, setRarityScore] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mode, setMode] = useState("Taste")

  const getProgressBarColor = (score: number) => {
    if (score < 45) return "bg-green-500"
    if (score < 90) return "bg-yellow-500"
    return "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
  }

  const handleSubmit = () => {
    // In a real application, this would be an API call to check the rarity of the description
    if (description && !isSubmitted) {
      // ... rest of the function

      const simulatedRarityScore = Math.floor(Math.random() * 100) + 1
      setRarityScore(simulatedRarityScore)
      setIsSubmitted(true)
    }
  }
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  const handleNextMode = () => {
    const modes = ["Taste", "Look", "Sound", "Feel", "Smell"]
    const currentModeIndex = modes.indexOf(mode)
    const nextModeIndex = (currentModeIndex + 1) % modes.length
    const newMode = modes[nextModeIndex]
    setMode(newMode)
    setDescription("")
    setRarityScore(null)
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">{mode}</h1>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center">{word}</h2>
          <p className="text-gray-600 text-center mt-2">Describe what this word would {mode.toLowerCase()} like</p>
        </div>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your taste description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSubmitted}
            className="w-full"
          />
          <Button
            onClick={handleSubmit}
            disabled={!description || isSubmitted}
            className="w-full"
          >
            Submit
          </Button>
        </div>
        {rarityScore !== null && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-center">Rarity Score</h3>
            {/* <Progress value={rarityScore} className="w-full" /> */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={cn("h-3 rounded-full transition-all duration-500", getProgressBarColor(rarityScore))}
                style={{ width: `${rarityScore}%` }}
              ></div>
            </div>
            <p className="text-center text-2xl font-bold">{rarityScore}%</p>
            <p className="text-center text-gray-600">
              {rarityScore < 45
                ? "Common description. Try to be more creative!"
                : rarityScore < 90
                  ? "Interesting description! You're on the right track."
                  : "Wow! That's a unique way to describe it!"}
            </p>
            <Button onClick={handleNextMode} className="w-full">
              Next Mode
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}