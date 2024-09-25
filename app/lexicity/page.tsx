"use client"

import { useState, useCallback, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Shuffle } from "lucide-react"

// World-building elements and their corresponding SVG representations
const worldElements: { [key: string]: string } = {
    BARN: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 20V8L12 2L21 8V20H3Z" /></svg>`,
    COURT: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><line x1="2" y1="12" x2="22" y2="12" stroke="white" /></svg>`,
    TRAIN: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="8" width="16" height="12" /><circle cx="7" cy="20" r="2" /><circle cx="17" cy="20" r="2" /></svg>`,
    HOUSE: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12 L12 2 L22 12 L22 22 L2 22 Z" /></svg>`,
    MUSEUM: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" /><rect x="7" y="7" width="10" height="10" /></svg>`,
    ROOM: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" /><line x1="4" y1="8" x2="20" y2="8" stroke="white" /></svg>`,
    STUDIO: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" /><circle cx="12" cy="12" r="4" /></svg>`,
}

const isAnagram = (input: string, target: string): boolean => {
    // Create frequency maps for input and target words
    const inputMap: Record<string, number> = {}
    const targetMap: Record<string, number> = {}

    // Populate frequency map for input word
    for (const char of input.toLowerCase()) {
        inputMap[char] = (inputMap[char] || 0) + 1
    }

    // Populate frequency map for target word
    for (const char of target.toLowerCase()) {
        targetMap[char] = (targetMap[char] || 0) + 1
    }

    // Check if input is a subanagram of target
    for (const char in inputMap) {
        if (!targetMap[char] || inputMap[char] > targetMap[char]) {
            return false // Input has a letter not in target, or more of it than target
        }
    }

    return true // All letters of input are in target with correct frequencies
}

const shuffleWord = (word: string) => {
    return word.split('').sort(() => Math.random() - 0.5).join('')
}

export default function AnagramWorldBuilder() {
    const [targetWord] = useState("RAMBUNCTIOUS")
    const [displayedWord, setDisplayedWord] = useState(targetWord)
    const [input, setInput] = useState("")
    const [placedElements, setPlacedElements] = useState<{ [key: string]: { x: number; y: number } }>({})
    const [selectedElement, setSelectedElement] = useState<string | null>(null)
    const [grid, setGrid] = useState<string[][]>(Array(6).fill(null).map(() => Array(6).fill(null)))

    const handleShuffle = () => {
        setDisplayedWord(shuffleWord(targetWord))
    }

    const handleGuess = useCallback(() => {
        const guess = input.toUpperCase().trim()
        if (guess && isAnagram(guess, targetWord) && worldElements[guess] && !placedElements[guess]) {
            setSelectedElement(guess)
            toast({
                title: "Valid Anagram!",
                description: `${guess} is a valid world-building element. Place it on the grid!`,
                variant: "default",
            })
        } else if (!worldElements[guess]) {
            toast({
                title: "Invalid Element",
                description: `${guess} is not a recognized world-building element.`,
                variant: "destructive",
            })
        } else if (placedElements[guess]) {
            toast({
                title: "Already Placed",
                description: `You've already placed ${guess} on the grid.`,
                variant: "destructive",
            })
        } else {
            toast({
                title: "Invalid Anagram",
                description: `${guess} is not a valid anagram of ${targetWord}.`,
                variant: "destructive",
            })
        }
        setInput("")
    }, [input, targetWord, placedElements])

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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Anagram World Builder</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <div className="mb-4 flex items-center justify-center">
                            <p className="text-gray-600 text-center mr-2">
                                Target word: <span className="font-bold">{displayedWord}</span>
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
                        <p className="text-gray-600 text-center mt-2">
                            Form anagrams that are world-building elements and place them on the grid!
                        </p>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <Input
                            type="text"
                            placeholder="Enter your anagram"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-grow"
                            aria-label="Enter your anagram"
                        />
                        <Button onClick={handleGuess}>Guess</Button>
                    </div>
                    <div className="grid grid-cols-6 gap-2 mb-4">
                        {grid.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    className="w-16 h-16 bg-white border border-gray-300 flex items-center justify-center"
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    aria-label={`Grid cell ${rowIndex}-${colIndex}`}
                                >
                                    {cell && (
                                        <div
                                            className="w-12 h-12 text-blue-500"
                                            dangerouslySetInnerHTML={{ __html: worldElements[cell] }}
                                        />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                    {selectedElement && (
                        <div className="text-center">
                            <p>Click on the grid to place: {selectedElement}</p>
                        </div>
                    )}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Placed Elements:</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(placedElements).map((element) => (
                                <div key={element} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
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