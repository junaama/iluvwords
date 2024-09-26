"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

type WordContextType = {
    wordOfTheDay: string
    setWordOfTheDay: React.Dispatch<React.SetStateAction<string>>
    definitionOfTheDay: string
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
    const [definitionOfTheDay, setDefinitionOfTheDay] = useState('')
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

        const definitions = [
            "(adj) Lasting for a very short time.", 
            "(adj) Existing or being everywhere at the same time.", 
            "(n) The occurrence of events by chance in a happy or beneficial way.", 
            "(adj) Fluent and persuasive in writing or speech.", 
            "(adj) Able to withstand or recover quickly from difficult conditions.", 
            "(adj) Introducing new or original ideas.", 
            "(n) A model of excellence or perfection.", 
            "(n) The ability to understand and share the feelings of another.", 
            "(adj) Representing the most perfect or typical example of something.", 
            "(adj) Difficult to understand or interpret.", 
            "(n) Persistence in a course of action in spite of difficulty or obstacles.", 
            "(adj) Showing a disinterested and selfless concern for the well-being of others.", 
            "(adj) Giving pleasure through beauty.", 
            "(adj) Dealing with things in a practical and straightforward way.", 
            "(adj) Open to more than one interpretation.", 
            "(adj) Having or showing a kind and generous attitude towards others.", 
            "(n) A harsh, unpleasant mixture of sounds.", 
            "(adj) Showing careful and consistent effort or work.", 
            "(n) A state of intense happiness or excitement.", 
            "(adj) Treating serious issues with humor or in a way that is not meant to be taken literally.", 
            "(adj) Complicated or confusing in a way that is difficult to understand.", 
            "(n) The mental process of knowing, including aspects such as perception, reasoning, and memory.", 
            "(adj) Uncontrollably boisterous and unruly.", 
            "(adj) Causing a feeling of burden or oppression.", 
            "(adj) Spending too much time sitting or doing very little physical activity.", 
            "(adj) Being in harmony or agreement.", 
            "(v) To think very carefully and thoroughly about something.", 
            "(n) A state of being more important or influential than others.", 
            "(adj) Conforming to facts; accurate.", 
            "(adj) Twisted or turned in a way that is not normal or natural."
        ];
        // Function to get word of the day
        // function getWordOfTheDay() {
        const today = new Date();
        const dayOfMonth = today.getDate() - 1; // 0-indexed
        // return words[dayOfMonth % words.length];
        // }
        setWordOfTheDay(words[dayOfMonth % words.length])
        setDefinitionOfTheDay(definitions[dayOfMonth % words.length])
    }, [])

    return (
        <WordContext.Provider value={{ wordOfTheDay, setWordOfTheDay, definitionOfTheDay }}>
            {children}
        </WordContext.Provider>
    )
}