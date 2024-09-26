"use client"

import { useState, useCallback, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { useWordContext } from 'context/word-context'

type WordSet = {
  mainWord: string;
  root: string;
  relatedWords: string[];
}

const wordSets: { [key: string]: WordSet } = {
  "COGNITION": {
    mainWord: "COGNITION",
    root: "cogn",
    relatedWords: ["recognize", "incognito", "cognizant", "precognition", "cognitive"]
  },
  "SERENDIPITY": {
    mainWord: "SERENDIPITY",
    root: "serend",
    relatedWords: ["serendipitous", "serendipitously"]
  },
  "ELOQUENT": {
    mainWord: "ELOQUENT",
    root: "loqu",
    relatedWords: ["loquacious", "colloquial", "eloquence", "soliloquy", "circumlocution"]
  },
  "EPHEMERAL": {
    mainWord: "EPHEMERAL",
    root: "eph",
    relatedWords: ["ephemera", "ephemerality", "ephemeron"]
  },
  "LABYRINTHINE": {
    mainWord: "LABYRINTHINE",
    root: "labyrinth",
    relatedWords: ["labyrinth", "labyrinthian", "labyrinthitis"]
  }
}

export default function RootWordExplorer() {
  const { wordOfTheDay } = useWordContext()
  const currentSet = wordSets[wordOfTheDay] || {
    mainWord: wordOfTheDay,
    root: wordOfTheDay.toLowerCase().slice(0, 4), // Fallback to first 4 letters as root
    relatedWords: []
  }
  const [input, setInput] = useState("")
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [score, setScore] = useState(0)

  const handleSubmit = useCallback(() => {
    const word = input.trim().toLowerCase()
    if (word && currentSet.relatedWords.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word])
      setScore(score + word.length)
      setInput("")
      toast({
        title: "Correct!",
        description: `"${word}" is related to "${currentSet.mainWord}" through the root "${currentSet.root}".`,
        variant: "default",
      })
    } else if (foundWords.includes(word)) {
      toast({
        title: "Already found",
        description: `You've already found "${word}". Try another word!`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Incorrect",
        description: `"${word}" is not related to "${currentSet.mainWord}" through the root "${currentSet.root}".`,
        variant: "destructive",
      })
    }
    setInput("")
  }, [input, currentSet, foundWords, score])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Root Word Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-xl font-semibold">Main Word: <span className="text-blue-600">{currentSet.mainWord}</span></p>
            <p className="text-lg">Root: <span className="text-green-600">{currentSet.root}</span></p>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter a related word"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
            />
            <Button onClick={handleSubmit} className="w-full">
              Submit Word
            </Button>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Found Words:</h3>
            <div className="flex flex-wrap gap-2">
              {foundWords.map((word, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 text-center">
            <p>Score: {score}</p>
            <p>Words left to find: {currentSet.relatedWords.length - foundWords.length}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}