"use client"

import { useState, useCallback, KeyboardEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Shuffle } from "lucide-react"
import { useWordContext } from 'context/word-context'
import { worldElements } from "@/lib/constants"
import { isWordValid } from "@/lib/api"
import { isAnagram } from "@/lib/helpers"

const shuffleWord = (word: string) => {
    return word.split('').sort(() => Math.random() - 0.5).join('')
}

export default function AnagramWorldBuilder() {
    const { wordOfTheDay } = useWordContext()
    const [displayedWord, setDisplayedWord] = useState(wordOfTheDay)
    const [input, setInput] = useState("")
    const [placedElements, setPlacedElements] = useState<{ [key: string]: { x: number; y: number } }>({})
    const [selectedElement, setSelectedElement] = useState<string | null>(null)
    const [grid, setGrid] = useState<string[][]>(Array(5).fill(null).map(() => Array(5).fill(null)))

    useEffect(() => {
        setDisplayedWord(wordOfTheDay)
    }, [wordOfTheDay])

    const handleShuffle = () => {
        setDisplayedWord(shuffleWord(wordOfTheDay))
    }

    const handleGuess = useCallback(async () => {
        const guess = input.toUpperCase().trim()
        const isValidWord = await isWordValid(guess)
        if (guess && isValidWord && isAnagram(guess, wordOfTheDay) && worldElements[guess] && !placedElements[guess]) {
            setSelectedElement(guess)
            toast({
                title: "Valid Anagram!",
                description: `${guess} is a valid world structure. Place it on the grid!`,
                variant: "default",
            })
        } else if (!worldElements[guess]) {
            toast({
                title: "Invalid Element",
                description: `${guess} is not a recognized world structure.`,
                variant: "destructive",
            })
        } else if (placedElements[guess]) {
            toast({
                title: "Already Placed",
                description: `You've already placed ${guess} on the grid.`,
                variant: "destructive",
            })
        } else if (!isValidWord) {
            toast({
                title: "Invalid Word",
                description: `${guess} is not a valid word.`,
                variant: "destructive",
            })

        } else {
            toast({
                title: "Invalid Anagram",
                description: `${guess} is not a valid anagram of ${wordOfTheDay}.`,
                variant: "destructive",
            })
        }
        setInput("")
    }, [input, wordOfTheDay, placedElements])

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleGuess()
        }
    }

    const handleCellClick = (row: number, col: number) => {
        if (selectedElement && !grid[row][col]) {
            const newGrid = [...grid]
            newGrid[row][col] = selectedElement
            setGrid(newGrid)
            setPlacedElements({ ...placedElements, [selectedElement]: { x: col, y: row } })
            setSelectedElement(null)
            toast({
                title: "Element Placed",
                description: `${selectedElement} has been placed on the grid.`,
                variant: "default",
            })
        }
    }

    return (
        <div className="flex items-center justify-center pr-4">
            <Card className="w-full max-w-4xl">
                <CardContent>
                    <div className="mb-4">
                        <div className="mb-4 flex items-center justify-center">
                            <p className="text-gray-600 text-center mr-1">
                                <span className="font-bold">{displayedWord}</span>
                            </p>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleShuffle}
                                aria-label="Shuffle target word"
                            >
                                <Shuffle className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <Input
                            type="text"
                            placeholder="Enter your anagram"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={handleKeyPress}
                            className="flex-grow"
                            aria-label="Enter your anagram"
                        />
                        <Button onClick={handleGuess}>Guess</Button>
                    </div>
                    <div className="w-full aspect-square">
                        <div
                            className="grid gap-1 w-full h-full"
                            style={{
                                gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
                                gridTemplateRows: `repeat(${grid.length}, 1fr)`
                            }}
                        >
                            {grid.map((row, rowIndex) =>
                                row.map((cell, colIndex) => (
                                    <button
                                        key={`${rowIndex}-${colIndex}`}
                                        className="w-full h-full bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center overflow-hidden"
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        aria-label={`Grid cell ${rowIndex}-${colIndex}`}
                                    >
                                        {cell && (
                                            <div className="w-full h-full p-1 text-primary">
                                                <svg viewBox="0 0 24 24" className="w-full h-full">
                                                    <g dangerouslySetInnerHTML={{ __html: worldElements[cell] }} />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                    {selectedElement && (
                        <div className="text-center pt-4">
                            <p>Click on the grid to place: {selectedElement}</p>
                        </div>
                    )}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Placed Elements:</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(placedElements).map((element) => (
                                <div key={element} className="bg-black text-white px-2 py-1 rounded">
                                    {element}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}