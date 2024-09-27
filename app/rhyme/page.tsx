"use client"

import { useState, useEffect, useCallback, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { useWordContext } from "@/context/word-context"
import { isRhymeValid } from "@/lib/api"

export default function Rhyme() {
  const { wordOfTheDay } = useWordContext()
  const [guessedRhymes, setGuessedRhymes] = useState<{ word: string; correct: boolean }[]>([])
  const [input, setInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)

  const startGame = useCallback(() => {

    setGuessedRhymes([])
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
    } else if (timeLeft <= 0) {
      endGame()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameActive, endGame])

  const handleGuess = useCallback(async () => {
    const guess = input.toLowerCase().trim()
    const isValidRhyme = await isRhymeValid(guess, wordOfTheDay)
    if (guess) {
      // const isCorrect = rhymes.includes(guess)
      setGuessedRhymes([...guessedRhymes, { word: guess, correct: isValidRhyme }])
      if (isValidRhyme) {
        setScore(score + 1)
        toast({
          title: "Correct!",
          description: `${guess} is a correct rhyme. +1 point!`,
          variant: "default",
        })
      } else {
        setTimeLeft(prevTime => Math.max(prevTime - 2, 0))
        toast({
          title: "Incorrect",
          description: `${guess} is not a correct rhyme. -2 seconds!`,
          variant: "destructive",
        })
      }
    } 
    setInput("")
  }, [input, guessedRhymes, score])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGuess()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Rhyme</h1>
        {!gameActive ? (
          <Button onClick={startGame} className="w-full">
            Start Game
          </Button>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-center">{wordOfTheDay}</h2>
              <p className="text-gray-600 text-center mt-2">List words that rhyme with this!</p>
            </div>
            <div className="mb-4">
              <Progress value={(timeLeft / 60) * 100} className="w-full" />
              <p className="text-center mt-2">Time left: {timeLeft}s</p>
            </div>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter a rhyming word"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleKeyPress}
                className="w-full"
                aria-label="Enter a rhyming word"
              />
              <Button onClick={handleGuess} className="w-full">
                Submit
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Guessed Rhymes:</h3>
              <div className="mt-1 flex flex-wrap">
                {guessedRhymes.map((guess, index) => (
                  <span
                    key={index}
                    className={`inline-block px-2 py-1 rounded-full text-sm mr-2 mb-2 ${
                      guess.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {guess.word}
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
            <Button onClick={startGame} className="w-full mt-4">
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}