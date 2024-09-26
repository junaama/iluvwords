"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

type WordContextType = {
    wordOfTheDay: string
    setWordOfTheDay: React.Dispatch<React.SetStateAction<string>>
}

const WordContext = createContext<WordContextType | undefined>(undefined)

export const useWordContext = () => {
    const context = useContext(WordContext)
    if (!context) {
        throw new Error('useWordContext must be used within a WordProvider')
    }
    return context
}

export const WordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wordOfTheDay, setWordOfTheDay] = useState('')

    useEffect(() => {
        // In a real application, this would fetch from an API or database
        // const words = ['COGNITION', 'SERENDIPITY', 'ELOQUENT', 'EPHEMERAL', 'LABYRINTHINE']
        const words = [
            "EPHEMERAL", "UBIQUITOUS", "SERENDIPITY", "ELOQUENT", "RESILIENT",
            "INNOVATIVE", "PARADIGM", "EMPATHY", "QUINTESSENTIAL", "ENIGMATIC",
            "PERSEVERANCE", "ALTRUISTIC", "AESTHETIC", "PRAGMATIC", "AMBIGUOUS",
            "BENEVOLENT", "CACOPHONY", "DILIGENT", "EUPHORIA", 
            "FACETIOUS", "LABYRINTHINE", "COGNITION", "RAMBUNCTIOUS",
            "ONEROUS", "SEDENTARY", "CONGRUOUS", "EXCOGITATE", 
            "PREPONDERANCE", "VERIDICAL", "TORTILE"
        ];


        // Function to get word of the day
        function getWordOfTheDay() {
            const today = new Date();
            const dayOfMonth = today.getDate() - 1; // 0-indexed
            return words[dayOfMonth % words.length];
        }
        setWordOfTheDay(getWordOfTheDay())
    }, [])

    return (
        <WordContext.Provider value={{ wordOfTheDay, setWordOfTheDay }}>
            {children}
        </WordContext.Provider>
    )
}