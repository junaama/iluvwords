"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { useWordContext } from 'context/word-context'

const affixes = [
  { prefix: "pro-", meaning: "in favor of" },
  { prefix: "anti-", meaning: "against" },
  { prefix: "super-", meaning: "above or beyond" },
  { prefix: "hyper-", meaning: "excessive" },
  { prefix: "mega-", meaning: "very large or prominent" },
  { suffix: "-ify", meaning: "to make or become" },
  { suffix: "-esque", meaning: "in the style of" },
  { suffix: "-itis", meaning: "inflammatory disease of" },
  { suffix: "-phobia", meaning: "fear or aversion to" },
  { suffix: "-aholic", meaning: "one who has a compulsion for" },
]

const generateNeologism = (baseWord: string) => {
  const affix = affixes[Math.floor(Math.random() * affixes.length)]
  if ('prefix' in affix) {
    return { word: `${affix.prefix}${baseWord}`, affix }
  } else {
    return { word: `${baseWord}${affix.suffix}`, affix }
  }
}

const validateDefinition = (definition: string, neologism: ReturnType<typeof generateNeologism>, baseWord: string) => {
  const { affix } = neologism
  const affixMeaning = 'prefix' in affix ? affix.meaning : affix.meaning
  const lowercaseDefinition = definition.toLowerCase()

  // Check if the definition includes the base word or a related form
  const includesBaseWord = lowercaseDefinition.includes(baseWord.toLowerCase()) || 
    lowercaseDefinition.includes(baseWord.toLowerCase().slice(0, -3)) // Check for root word without suffix

  // Check if the definition reflects the meaning of the affix
  const reflectsAffixMeaning = affixMeaning.split(' ').some(word => 
    lowercaseDefinition.includes(word) && word.length > 3
  )

  // Check if the definition is long enough to be meaningful
  const isLongEnough = definition.split(' ').length >= 5

  return includesBaseWord && reflectsAffixMeaning && isLongEnough
}

export default function NeologismDefiner() {
  const { wordOfTheDay } = useWordContext()
  const neologism = generateNeologism(wordOfTheDay)
  const [definition, setDefinition] = useState("")
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = useCallback(() => {
    if (validateDefinition(definition, neologism, wordOfTheDay)) {
      setScore(score + 1)
      toast({
        title: "Excellent!",
        description: "Your definition is plausible and creative!",
        variant: "default",
      })
    } else {
      toast({
        title: "Not quite",
        description: "Your definition doesn't seem to fit the neologism. Try again!",
        variant: "destructive",
      })
    }
    setAttempts(attempts + 1)
    setDefinition("")
  }, [definition, neologism, wordOfTheDay, score, attempts])

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Neologism Definer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            Define the following neologism based on today's word:
            <span className="font-bold text-xl block mt-2">{neologism.word}</span>
          </p>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleSubmit} className="w-full">
              Submit Definition
            </Button>
          </div>
          <div className="mt-4 text-center">
            <p>Score: {score}</p>
            <p>Attempts: {attempts}</p>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Hint: Consider the meaning of "{neologism.affix.prefix || neologism.affix.suffix}" 
              ({neologism.affix.meaning}) and how it modifies "{wordOfTheDay}".</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}