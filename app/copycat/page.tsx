"use client"

import { useState, useEffect, useCallback, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useWordContext } from "@/context/word-context"
import {isSynonymValid} from "@/lib/api"

// This would typically come from an API or a larger dataset
// const wordSynonyms: { [key: string]: string[] } = {
//   "big": ["large", "huge", "enormous", "gigantic", "vast", "immense", "massive"],
//   "happy": ["joyful", "content", "delighted", "cheerful", "merry", "ecstatic", "glad"],
//   "fast": ["quick", "speedy", "swift", "rapid", "hasty", "expeditious", "brisk"]
// }

export default function Copycat() {
   const {wordOfTheDay} = useWordContext()
  // const [synonyms, setSynonyms] = useState<string[]>([])
  const [guessedSynonyms, setGuessedSynonyms] = useState<string[]>([])
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)

  const startGame = useCallback(() => {
    // const words = Object.keys(wordSynonyms)
    // const randomWord = words[Math.floor(Math.random() * words.length)]
    // setCurrentWord(randomWord)
    // setSynonyms(wordSynonyms["big"])
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
    if (isValidSynonym && !guessedSynonyms.includes(guess)) {
      setGuessedSynonyms([...guessedSynonyms, guess])
      setScore(score + 1)
      setTimeLeft(timeLeft + 2)
    } else {
      setWrongGuesses([...wrongGuesses, guess])
      setTimeLeft(timeLeft - 2)
    }
    setInput("")
  }, [input, guessedSynonyms, score, timeLeft])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGuess()
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Copycat</h1>
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
            {/* <div className="mt-4">
              <h3 className="font-semibold">Guessed Synonyms:</h3>
              <p>{guessedSynonyms.join(", ")}</p>
            </div> */}
             <div className="mt-4">
            <h3 className="font-semibold mb-2">Guessed Synonyms:</h3>
            <div className="flex flex-wrap gap-2">
              {guessedSynonyms.map((synonym, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {synonym}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Wrong Guesses:</h3>
            <div className="flex flex-wrap gap-2">
              {wrongGuesses.map((guess, index) => (
                <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                  {guess}
                </span>
              ))}
            </div>
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
            {/* <Button onClick={startGame} className="w-full mt-4">
              Play Again
            </Button> */}
          </div>
        )}
      </div>
    </div>
  )
}