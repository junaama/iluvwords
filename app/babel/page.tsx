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
  const grid = Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => letters[Math.floor(Math.random() * letters.length)])
  )
  return grid
}

const isWordValid = async (word: string) => {
  const res = await fetch(`/api/word?word=${word.toLowerCase()}`);
  const data = await res.json();
  return data.valid;
};


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
  const [pressedButton, setPressedButton] = useState<{ col: number, row: number } | null>(null);

  const buttonVariants = {
    normal: { scale: 1 },
    pressed: { scale: 0.95 },
    released: { scale: 1.05 }
  }
  const handlePress = (colIndex: number, rowIndex: number) => {
    setPressedButton({ col: colIndex, row: rowIndex });
  }

  const handleRelease = () => {
    setPressedButton(null);  // Clear pressed button state when the button is released

  }

  useEffect(() => {
    setGrid(generateGrid(wordOfTheDay, GRID_SIZE))
  }, [wordOfTheDay])

  useEffect(() => {
    if (score) {
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
      setSelectedCells([])
      toast({
        title: "Invalid word",
        description: `"${word}" is not a valid word.`,
        variant: "destructive",
      })
    }
  }, [grid, selectedCells, score])


  return (
    <div className="flex items-center justify-center ">
      <Card className="w-full ">
        <CardContent className="p-4">
          <div className="flex justify-between space-x-1">
            {grid.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col space-y-1">
                {column.map((letter, rowIndex) => (
                  <motion.button
                    animate={pressedButton?.col === colIndex && pressedButton?.row === rowIndex ? "pressed" : "released"}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }}
                    initial="normal"
                    onMouseDown={() => handlePress(colIndex, rowIndex)}
                    onMouseUp={handleRelease}
                    onMouseLeave={handleRelease}
                    onTouchStart={() => handlePress(colIndex, rowIndex)}
                    onTouchEnd={handleRelease}
                    whileTap="pressed"
                    whileHover={{ scale: 1.02 }}
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                  w-12 h-12 flex items-center justify-center
                  text-lg font-bold border border-gray-300
                  ${letter === null
                        ? 'bg-transparent border-none'
                        : selectedCells.some(([r, c]) => r === colIndex && c === rowIndex)
                          ? 'bg-blue-400 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }
                `}
                    onClick={() => handleCellClick(colIndex, rowIndex)}
                    disabled={isGameWon || letter === null}
                    variants={buttonVariants}
                  >
                    {letter}
                  </motion.button>
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-4 py-4">
            <p>Score: {score}</p>
            <Button onClick={checkWord} disabled={selectedCells.length < MIN_WORD_LENGTH || isGameWon}>
              Check Word
            </Button>
            <Button onClick={() => setGameWon(true)} disabled={!score}>
              Finish
            </Button>
          </div>
          {isGameWon && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">Puzzle Completed!</h2>
              <p>You&apos;ve cleared all the letters (you could). Final score: {score}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}