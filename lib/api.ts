export const isWordValid = async (word: string): Promise<boolean> => {
    const res = await fetch(`/api/word?word=${word.toLowerCase()}`);
    const data = await res.json();
    return data.valid;
  };
  
  export const isRhymeValid = async (word1: string, word2: string): Promise<boolean> => {
    const res = await fetch(`/api/rhyme?word1=${word1.toLowerCase()}&word2=${word2.toLowerCase()}`);
    const data = await res.json();
    return data.isRhyme;
  }