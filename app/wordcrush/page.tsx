"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { useWordContext } from "@/context/word-context"

const TARGET_WORD = "DEVELOPER"
const GRID_SIZE = 8
const MIN_WORD_LENGTH = 3

const generateGrid = (word: string, size: number) => {
  const letters = word.split('')
  const grid = Array(size).fill(null).map(() => 
    Array(size).fill(null).map(() => letters[Math.floor(Math.random() * letters.length)])
  )
  return grid
}

const isValidWord = (word: string) => {
  // In a real application, this would check against a dictionary API
  const validWords = ["LOVE", "DEER", "POLE", "LEPER", "LEVER", "PEEL", "PEER", "LOPE", "ROPE", "ROLE", "OVER", "DOVE", "PROVE", "DROVE", "ROPED", "LOVED", "DEVELOP", "LODE", "PEE", "PER", "RED", "RODE"]
  return validWords.includes(word)
}

const isAdjacent = (cell1: [number, number], cell2: [number, number]) => {
  const [row1, col1] = cell1
  const [row2, col2] = cell2
  return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1
}

export default function WordCrushSaga() {
  const { wordOfTheDay } = useWordContext()
  const [grid, setGrid] = useState<(string | null)[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)))
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([])
  const [score, setScore] = useState(0)
  const [isGameWon, setGameWon] = useState(false)

  useEffect(() => {
    setGrid(generateGrid(wordOfTheDay, GRID_SIZE))
  }, [wordOfTheDay])

  useEffect(()=> {
    if(score) {
        setGameWon(grid.every(row => row.every(cell => cell === null)))
    }
  }, [score])

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === null) return // Ignore clicks on empty cells

    const newSelectedCells = [...selectedCells]
    const cellIndex = newSelectedCells.findIndex(([r, c]) => r === row && c === col)

    if (cellIndex !== -1) {
      // If cell is already selected, deselect it and all cells after it
      newSelectedCells.splice(cellIndex)
    } else {
      // If cell is not selected, check if it's adjacent to the last selected cell
      if (newSelectedCells.length === 0 || isAdjacent(newSelectedCells[newSelectedCells.length - 1], [row, col])) {
        newSelectedCells.push([row, col])
      } else {
        toast({
          title: "Invalid selection",
          description: "You can only select adjacent letters.",
          variant: "destructive",
        })
        return
      }
    }

    setSelectedCells(newSelectedCells)
  }

  const checkWord = useCallback(() => {
    const word = selectedCells.map(([row, col]) => grid[row][col]).join('')
    if (word.length < MIN_WORD_LENGTH) {
      toast({
        title: "Word too short",
        description: `Words must be at least ${MIN_WORD_LENGTH} letters long.`,
        variant: "destructive",
      })
      return
    }
    if (isValidWord(word)) {
      setScore(score + word.length)
      const newGrid = grid.map(row => [...row])
      
      // Remove selected letters
      selectedCells.forEach(([row, col]) => {
        newGrid[row][col] = null
      })

      // Make letters fall
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
      toast({
        title: "Invalid word",
        description: `"${word}" is not a valid word.`,
        variant: "destructive",
      })
    }
  }, [grid, selectedCells, score])


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Word Crush Saga</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">Target Word: {wordOfTheDay}</p>
          <div className="grid grid-cols-8 gap-1 mb-4">
            {grid.map((row, rowIndex) =>
              row.map((letter, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 rounded-md flex items-center justify-center text-lg font-bold ${
                    letter === null
                      ? 'bg-gray-100'
                      : selectedCells.some(([r, c]) => r === rowIndex && c === colIndex)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={isGameWon || letter === null}
                >
                  {letter}
                </button>
              ))
            )}
          </div>
          <div className="flex justify-between items-center mb-4">
            <p>Score: {score}</p>
            <Button onClick={checkWord} disabled={selectedCells.length < MIN_WORD_LENGTH || isGameWon}>
              Check Word
            </Button>
          </div>
          {isGameWon && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">Congratulations!</h2>
              <p>You&apos;ve cleared all the letters. Final score: {score}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}