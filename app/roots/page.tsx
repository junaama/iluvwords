"use client"

import { useState, useCallback, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

type WordSet = {
  mainWord: string;
  root: string;
  relatedWords: string[];
}

const wordSets: WordSet[] = [
  {
    mainWord: "cognition",
    root: "cogn",
    relatedWords: ["recognize", "incognito", "cognizant", "precognition", "cognitive"]
  },
  {
    mainWord: "biology",
    root: "bio",
    relatedWords: ["biography", "biosphere", "symbiosis", "antibiotic", "biome"]
  },
  {
    mainWord: "telephone",
    root: "phon",
    relatedWords: ["symphony", "phonetic", "microphone", "phonology", "euphony"]
  },
  {
    mainWord: "democracy",
    root: "demo",
    relatedWords: ["demographic", "epidemic", "demagogue", "endemic", "pandemic"]
  },
  {
    mainWord: "telescope",
    root: "scop",
    relatedWords: ["microscope", "periscope", "kaleidoscope", "endoscope", "stethoscope"]
  }
]

export default function RootWordExplorer() {
  const [currentSet, setCurrentSet] = useState<WordSet>(wordSets[Math.floor(Math.random() * wordSets.length)])
  const [input, setInput] = useState("")
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [score, setScore] = useState(0)

  const handleSubmit = useCallback(() => {
    const word = input.trim().toLowerCase()
    if (word && currentSet.relatedWords.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word])
      setScore(score + 1)
      setInput("")
      toast({
        title: "Correct!",
        description: `"${word}" is related to "${currentSet.mainWord}" through the root "${currentSet.root}".`,
        variant: "default",
      })
      if (foundWords.length + 1 === currentSet.relatedWords.length) {
        toast({
          title: "Congratulations!",
          description: "You've found all related words! Moving to the next set.",
          variant: "default",
        })
        setCurrentSet(wordSets[Math.floor(Math.random() * wordSets.length)])
        setFoundWords([])
      }
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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