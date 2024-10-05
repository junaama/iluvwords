
export const isAnagram = (input: string, target: string): boolean => {
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
