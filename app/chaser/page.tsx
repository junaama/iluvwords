"use client"

import { useState, useCallback, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWordContext } from "@/context/word-context"

// This is a simplified semantic dissimilarity calculation
// In a real implementation, you'd use a proper word embedding model
const calculateDissimilarity = (word1: string, word2: string): number => {
  const set1 = new Set(word1.toLowerCase().split(''))
  const set2 = new Set(word2.toLowerCase().split(''))
  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])
  return 100 - ((intersection.size / union.size) * 100)
}

// const targetWords = ["apple", "computer", "elephant", "happiness", "ocean"]

export default function Chaser() {
    const {wordOfTheDay} = useWordContext()
  const [guesses, setGuesses] = useState<{ word: string; dissimilarity: number }[]>([])
  const [input, setInput] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [bestGuess, setBestGuess] = useState<{ word: string; dissimilarity: number } | null>(null)

  const startGame = useCallback(() => {
    // const randomWord = targetWords[Math.floor(Math.random() * targetWords.length)]
    // setTargetWord(randomWord)
    setGuesses([])
    setInput("")
    setGameOver(false)
    setBestGuess(null)
  }, [])

  const handleGuess = useCallback(() => {
    const guess = input.toLowerCase().trim()
    if (guess && !guesses.some(g => g.word === guess)) {
      const dissimilarity = calculateDissimilarity(guess, wordOfTheDay)
      const newGuess = { word: guess, dissimilarity }
      const newGuesses = [...guesses, newGuess]
      newGuesses.sort((a, b) => b.dissimilarity - a.dissimilarity)
      setGuesses(newGuesses)
      setInput("")

      if (!bestGuess || dissimilarity > bestGuess.dissimilarity) {
        setBestGuess(newGuess)
      }

      if (newGuesses.length >= 10) {
        setGameOver(true)
      }
    }
  }, [input, guesses, wordOfTheDay, bestGuess])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGuess()
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Chaser</CardTitle>
        </CardHeader>
        <CardContent>
          {!wordOfTheDay ? (
            <Button onClick={startGame} className="w-full">
              Start Game
            </Button>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600 text-center">
                  Target word: <span className="font-bold">{wordOfTheDay}</span>
                </p>
                <p className="text-gray-600 text-center mt-2">
                  Find the most semantically distant word in 10 guesses!
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your guess"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={handleKeyPress}
                  className="w-full"
                  aria-label="Enter your guess"
                  disabled={gameOver}
                />
                <Button onClick={handleGuess} className="w-full" disabled={gameOver}>
                  Guess ({10 - guesses.length} left)
                </Button>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Guesses:</h3>
                {guesses.map((guess, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-center">
                      <span className={guess === bestGuess ? "font-bold text-green-600" : ""}>
                        {guess.word}
                      </span>
                      <span>{guess.dissimilarity.toFixed(2)}% different</span>
                    </div>
                    <Progress value={guess.dissimilarity} className="w-full" />
                  </div>
                ))}
              </div>
              {gameOver && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-center text-green-600">Game Over!</h3>
                  <p className="text-center mt-2">
                    Your most distant word: {bestGuess?.word} ({bestGuess?.dissimilarity.toFixed(2)}% different)
                  </p>
                  <Button onClick={startGame} className="w-full mt-4">
                    Play Again
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}