"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useWordContext } from 'context/word-context'
import RulesModal from "@/appcomponents/RulesModal"

const wordSets = [
  ["apple", "core", "computer"],
  ["book", "cover", "judge"],
  ["water", "bridge", "under"],
  ["fire", "alarm", "clock"],
  ["snow", "ball", "game"],
]

export default function Nexus() {
  const { wordOfTheDay } = useWordContext()
  const { toast } = useToast()
  const [currentWords, setCurrentWords] = useState<string[]>([])
  const [userClue, setUserClue] = useState("")
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)

  useEffect(() => {
    generateNewWords()
  }, [wordOfTheDay])

  const generateNewWords = () => {
    const randomSet = wordSets[Math.floor(Math.random() * wordSets.length)]
    const randomIndex = Math.floor(Math.random() * 3)
    const newWords = [...randomSet]
    newWords[randomIndex] = wordOfTheDay.toLowerCase()
    setCurrentWords(newWords)
  }

  const handleSubmit = () => {
    if (userClue.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a clue.",
        variant: "destructive",
      })
      return
    }

    // Add logic here to evaluate the clue
    setScore(score + 1)
    setRound(round + 1)
    toast({
      title: "Clue Accepted!",
      description: `Great job! Your clue was "${userClue}".`,
    })
    setUserClue("")
    generateNewWords()
  }

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        {/* <CardHeader className="flex flex-row items-center justify-between"> */}
          {/* <CardTitle className="text-2xl font-bold">Nexus</CardTitle> */}
          {/* <div className="flex gap-2"> */}
            {/* <RulesModal
              gameTitle="Word Nexus"
              rules="Given three words, provide a one-word clue that connects all three words. The clue should help others guess the given words, similar to the game Codenames, or reverse  NY Times Connections."
            /> */}
          {/* </div> */}
        {/* </CardHeader> */}
        <CardContent className="py-8">
          <div className="mb-6">
            {/* <h2 className="text-lg font-semibold mb-2">Words to Connect:</h2> */}
            <div className="flex justify-center gap-4">
              {currentWords.map((word, index) => (
                <span key={index} className="text-xl font-bold bg-primary/10 px-3 py-1 rounded">
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your one-word clue"
              value={userClue}
              onChange={(e) => setUserClue(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleSubmit} className="w-full">
              Submit Clue
            </Button>
          </div>
          <div className="mt-6 text-center">
            <p>Round: {round}</p>
            <p>Score: {score}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}