"use client"
import { useState, useEffect, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWordContext } from "@/context/word-context"
import { toast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

const modes = ["Taste", "Look", "Sound", "Feel", "Smell"]

type Stat = {
  mode: string,
  description: string,
  rarityTier: string,
  percentageGuessed: number,
  currentWord: string
};

export default function Component() {
  const { wordOfTheDay } = useWordContext()
  const [description, setDescription] = useState("")
  const [rarityTier, setRarityTier] = useState<string | null>('')
  const [percentageGuessed, setPercentageGuessed] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mode, setMode] = useState("Taste")
  const [currentModeIndex, setCurrentModeIndex] = useState(0)
  const [allStats, setAllStats] = useState<Array<Stat>>([]);
  const [gameComplete, setGameComplete] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  // Load existing data from localStorage on component mount
  useEffect(() => {
    const storedStats = localStorage.getItem("gameStats");
    const storedModeIndex = localStorage.getItem("currentModeIndex");


    if (storedStats) {
      if (JSON.parse(storedStats)[0].currentWord !== wordOfTheDay) {
        // If it doesn't match, reset the game state
        localStorage.removeItem("gameStats");
        localStorage.removeItem("currentModeIndex");
      }
      if (JSON.parse(storedStats).length >= 5) {
        setGameComplete(true)
      }
      setAllStats(JSON.parse(storedStats));
    }
    if (storedModeIndex) {
      const modeIndex = parseInt(storedModeIndex, 10);
      setCurrentModeIndex(modeIndex);
      setMode(modes[modeIndex]);
    }
    setIsPageLoading(false)
  }, []);

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
      return { rarityTier: data.rarityTier, percentageGuessed: data.percentageGuessed };
    } catch (error) {
      console.error('Error calculating rarity score:', error);
      return null;
    }
  }

  const handleSubmit = async () => {
    if (description && !isSubmitted) {
      const data = await calculateRarityScore(description);

      if (data?.percentageGuessed !== null) {
        const newStat = {
          mode,
          description,
          rarityTier: data?.rarityTier,
          percentageGuessed: data?.percentageGuessed,
          currentWord: wordOfTheDay
        };
        setRarityTier(data?.rarityTier)
        setPercentageGuessed(data?.percentageGuessed)
        setIsSubmitted(true);
        // Update the allStats array
        const updatedStats = [...allStats, newStat];
        setAllStats(updatedStats);
        localStorage.setItem("gameStats", JSON.stringify(updatedStats));

      } else {
        console.error('Failed to get rarity score');
        toast({ title: 'Error', description: 'Failed to get rarity score', variant: 'destructive' })
      }
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
      if (isSubmitted) {
        handleNextMode()
      }
    }
  }

  const handleNextMode = () => {
    const nextModeIndex = currentModeIndex + 1
    if (allStats.length < 4 || nextModeIndex < modes.length) {
      setCurrentModeIndex(nextModeIndex)
      setMode(modes[nextModeIndex])
      setDescription("")
      setPercentageGuessed(null)
      setRarityTier(null)
      setIsSubmitted(false)
      // Store the current mode index in localStorage
      localStorage.setItem("currentModeIndex", nextModeIndex.toString());

    } else {
      // Game is complete
      setIsSubmitted(true)
      setGameComplete(true)
    }
  }

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full ">
          <div className="items-center justify-center flex flex-col space-y-4 ">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[150px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-[350px]" />
            <Skeleton className="h-12 w-[350px]" />

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        {!gameComplete ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">{mode}</h1>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-center">{wordOfTheDay}</h2>
              <p className="text-gray-600 text-center mt-2">
                Describe what this word would {mode.toLowerCase()} like
              </p>
            </div>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder={`Enter your ${mode.toLowerCase()} description`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyUp={handleKeyPress}
                disabled={isSubmitted}
                className="w-full"
              />
              <Button onClick={handleSubmit} disabled={!description || isSubmitted} className="w-full">
                Submit
              </Button>
            </div>
            {percentageGuessed !== null && (
              <div className="mt-6 space-y-4">
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
            <h2 className="text-2xl font-bold ">Your Stats</h2>
            <ul className="text-left mt-4">
              {allStats.map((stat, index) => (
                <li key={index}>
                  <p className="font-semibold">{stat.mode}:</p>
                  <p>Description: {stat.description}</p>
                  <p>Rarity: {stat.rarityTier}</p>
                  <p>%: {stat.percentageGuessed.toFixed(2)}%</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}