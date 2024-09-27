export const isWordValid = async (word: string): Promise<boolean> => {
    const res = await fetch(`/api/word?word=${word.toLowerCase()}`);
    const data = await res.json();
    return data.valid;
  };
  