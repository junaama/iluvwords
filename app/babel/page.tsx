"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { useWordContext } from "@/context/word-context"
import { motion } from 'framer-motion'

const GRID_SIZE = 8
const MIN_WORD_LENGTH = 3

const generateGrid = (word: string, size: number) => {
  const letters = word.split('')
  return Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => letters[Math.floor(Math.random() * letters.length)])
  )
}

const isWordValid = async (word: string) => {
  const res = await fetch(`/api/word?word=${word.toLowerCase()}`)
  const data = await res.json()
  return data.valid
}

const isAdjacent = (cell1: [number, number], cell2: [number, number]) => {
  const [row1, col1] = cell1
  const [row2, col2] = cell2
  return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1
}

export default function WordCrushSaga() {
  const { wordOfTheDay } = useWordContext()
  const [grid, setGrid] = useState<(string | null)[][]>([])
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([])
  const [score, setScore] = useState(0)
  const [isGameWon, setGameWon] = useState(false)

  useEffect(() => {
    setGrid(generateGrid(wordOfTheDay, GRID_SIZE))
  }, [wordOfTheDay])

  useEffect(() => {
    if (score > 0) {
      const allCleared = grid.every(row => row.every(cell => cell === null))
      if (allCleared) {
        setGameWon(true)
      }
    }
  }, [score, grid])

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === null) return

    const newSelectedCells = [...selectedCells]
    const cellIndex = newSelectedCells.findIndex(([r, c]) => r === row && c === col)

    if (cellIndex !== -1) {
      newSelectedCells.splice(cellIndex)
    } else if (newSelectedCells.length === 0 || isAdjacent(newSelectedCells[newSelectedCells.length - 1], [row, col])) {
      newSelectedCells.push([row, col])
    } else {
      toast({
        title: "Invalid selection",
        description: "You can only select adjacent letters.",
        variant: "destructive",
      })
      return
    }

    setSelectedCells(newSelectedCells)
  }

  const checkWord = useCallback(async () => {
    const word = selectedCells.map(([row, col]) => grid[row][col]).join('')
    if (word.length < MIN_WORD_LENGTH) {
      toast({
        title: "Word too short",
        description: `Words must be at least ${MIN_WORD_LENGTH} letters long.`,
        variant: "destructive",
      })
      return
    }

    if (await isWordValid(word)) {
      setScore(score + word.length)
      const newGrid = grid.map(row => [...row])

      // Remove selected letters
      selectedCells.forEach(([row, col]) => {
        newGrid[row][col] = null
      })

      // Make letters fall from the top
      for (let col = 0; col < GRID_SIZE; col++) {
        let emptyRow = GRID_SIZE - 1
        for (let row = GRID_SIZE - 1; row >= 0; row--) {
          if (newGrid[row][col] !== null) {
            if (row !== emptyRow) {
              newGrid[emptyRow][col] = newGrid[row][col]
              newGrid[row][col] = null
            }
            emptyRow--
          }
        }
      }

      setGrid(newGrid)
      setSelectedCells([])
      toast({
        title: "Valid word!",
        description: `You found "${word}". +${word.length} points!`,
        variant: "default",
      })
    } else {
      setSelectedCells([])
      toast({
        title: "Invalid word",
        description: `"${word}" is not a valid word.`,
        variant: "destructive",
      })
    }
  }, [grid, selectedCells, score])

  const handleFinish = () => {
    setGameWon(true)
    toast({
      title: "Game Finished",
      description: `You've ended the game. Final score: ${score}`,
      variant: "default",
    })
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-8 gap-1 mb-4">
            {grid.map((row, rowIndex) => (
              row.map((letter, colIndex) => (
                <motion.button
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    aspect-square flex items-center justify-center
                    text-xs sm:text-sm md:text-base font-bold border border-gray-300 rounded
                    ${letter === null
                      ? 'bg-transparent border-none'
                      : selectedCells.some(([r, c]) => r === rowIndex && c === colIndex)
                        ? 'bg-blue-400 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }
                  `}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={isGameWon || letter === null}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {letter}
                </motion.button>
              ))
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <p className="text-lg font-semibold">Score: {score}</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <Button 
                onClick={checkWord} 
                disabled={selectedCells.length < MIN_WORD_LENGTH || isGameWon}
                className="w-full sm:w-auto"
              >
                Check Word
              </Button>
              <Button 
                onClick={handleFinish} 
                disabled={isGameWon || !score}
                className="w-full sm:w-auto"
                variant="secondary"
              >
                Finish
              </Button>
            </div>
          </div>
          {isGameWon && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">Game Finished!</h2>
              <p>Final score: {score}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}