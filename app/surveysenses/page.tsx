"use client"
import { useState, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWordContext } from "@/context/word-context"
import { toast } from "@/hooks/use-toast"

const modes = ["Taste", "Look", "Sound", "Feel", "Smell"]

export default function Component() {
  const { wordOfTheDay } = useWordContext()
  const [description, setDescription] = useState("")
  const [rarityScore, setRarityScore] = useState<number | null>(null)
  const [rarityTier, setRarityTier] = useState<string | null>('')
  const [percentageGuessed, setPercentageGuessed] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mode, setMode] = useState("Taste")
  const [currentModeIndex, setCurrentModeIndex] = useState(0)


  const calculateRarityScore = async (description: string) => {
    try {
      const response = await fetch('/api/surveysenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ daily_word: wordOfTheDay, mode, input_phrase: description }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate rarity score');
      }
      const data = await response.json();
      return {rarityScore: data.rarityScore, rarityTier: data.rarityTier, percentageGuessed: data.percentageGuessed};
    } catch (error) {
      console.error('Error calculating rarity score:', error);
      return null;
    }
  }

  const handleSubmit = async () => {
    if (description && !isSubmitted) {
      const data = await calculateRarityScore(description);

      if (data?.percentageGuessed !== null) {
        setRarityScore(data?.rarityScore);
        setRarityTier(data?.rarityTier)
        setPercentageGuessed(data?.percentageGuessed)
        setIsSubmitted(true);

      } else {
        console.error('Failed to get rarity score');
        toast({ title: 'Error', description: 'Failed to get rarity score', variant: 'destructive' })
      }
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleNextMode = () => {
    const nextModeIndex = currentModeIndex + 1
    if (nextModeIndex < modes.length) {
      setCurrentModeIndex(nextModeIndex)
      setMode(modes[nextModeIndex])
      setDescription("")
      setRarityScore(null)
      setPercentageGuessed(null)
      setRarityTier(null)
      setIsSubmitted(false)
    } else {
      // Game is complete
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      {currentModeIndex < modes.length ? (
          <>
        <h1 className="text-3xl font-bold text-center mb-6">{mode}</h1>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center">{wordOfTheDay}</h2>
          <p className="text-gray-600 text-center mt-2">Describe what this word would {mode.toLowerCase()} like</p>
        </div>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your taste description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyUp={handleKeyPress}
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
        {percentageGuessed !== null && (
          <div className="mt-6 space-y-4">
            {/* <h3 className="text-xl font-semibold text-center">Rarity Score</h3>
            <p className="text-center text-2xl font-bold">{rarityScore}% of people said that </p>
            <p className="text-center text-gray-600">
              {rarityScore < 45
                ? "Wow! That's a unique way to describe it!"
                : rarityScore < 90
                  ? "Interesting description! You're on the right track."
                  : "Common description. Try to be more creative!"}
            </p> */}
              <h3 className="text-xl font-semibold text-center">Rarity</h3>
  <p className="text-center text-2xl font-bold">{rarityTier}</p>
  <p className="text-center text-lg">
    {percentageGuessed.toFixed(2)}% of people said that
  </p>
  <p className="text-center text-gray-600">
    {rarityTier === "Unicorn" && "Incredible! You're the only one who thought of this!"}
    {rarityTier === "Legendary" && "Wow! That's an extremely rare description!"}
    {rarityTier === "Epic" && "Amazing! Your description is quite unique."}
    {rarityTier === "Rare" && "Great job! Your description is uncommon."}
    {rarityTier === "Uncommon" && "Nice! Your description is somewhat unique."}
    {rarityTier === "Common" && "Interesting description, but it's fairly common. Try to be more creative!"}
  </p>
              {currentModeIndex < modes.length - 1 ? (
                  <Button onClick={handleNextMode} className="w-full">
                    Next Mode
                  </Button>
                ) : (
                  <Button onClick={handleNextMode} className="w-full">
                    Complete Game
                  </Button>
                )}
          </div>
        )}
        </>
      ) : (
        <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Game Complete!</h1>
        <p className="text-xl">Thank you for playing!</p>
      </div>
      )}
      </div>
    </div>
  )
}