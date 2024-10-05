"use client"

import { useState, useEffect, useCallback, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useWordContext } from "@/context/word-context"
import { isSynonymValid } from "@/lib/api"
import { toast } from "@/hooks/use-toast"


export default function Copycat() {
  const { wordOfTheDay } = useWordContext()
  const [guessedSynonyms, setGuessedSynonyms] = useState<{ word: string; correct: boolean }[]>([])

  const [input, setInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)

  const startGame = useCallback(() => {
    setGuessedSynonyms([])
    setInput("")
    setTimeLeft(60)
    setScore(0)
    setGameActive(true)
  }, [])

  const endGame = useCallback(() => {
    setGameActive(false)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      endGame()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameActive, endGame])
  
  const handleGuess = useCallback(async () => {
    const guess = input.toLowerCase().trim()
    const isValidSynonym = await isSynonymValid(wordOfTheDay, guess)
    const isDuplicate = guessedSynonyms.some(guessed => guessed.word === guess)

    if (!isDuplicate) {
      setGuessedSynonyms([...guessedSynonyms, { word: guess, correct: isValidSynonym }])

      if (isValidSynonym) {
        setScore(score + 1)
        setTimeLeft(timeLeft + 2)
      }
    } else {
      toast({
        title: "Duplicate",
        description: `${guess} has already been guessed.`,
        variant: "default",
      })
    }
    setInput("")
  }, [input, guessedSynonyms, score, timeLeft])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGuess()
    }
  }

  return (
    <div className="flex items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg  w-full">
        {!gameActive ? (
          <Button onClick={startGame} className="w-full">
            Start Game
          </Button>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-center">{wordOfTheDay}</h2>
              <p className="text-gray-600 text-center mt-2">Guess as many synonyms as you can!</p>
            </div>
            <div className="mb-4">
              <Progress value={(timeLeft / 60) * 100} className="w-full" />
              <p className="text-center mt-2">Time left: {timeLeft}s</p>
            </div>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter a synonym"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleKeyPress}
                className="w-full"
              />
              <Button onClick={handleGuess} className="w-full">
                Guess
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Guessed Synonyms:</h3>
              {guessedSynonyms.map((guess, index) => (
                <span
                  key={index}
                  className={`inline-block px-2 py-1 rounded-full text-sm mr-2 mb-2 ${guess.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                  {guess.word}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Score: {score}</h3>
            </div>
          </>
        )}
        {!gameActive && score > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-center">Game Over!</h3>
            <p className="text-center mt-2">Your final score: {score}</p>
          </div>
        )}
      </div>
    </div>
  )
}