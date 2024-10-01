// https://www.thesaurus.com/browse/tortile 

import * as cheerio from 'cheerio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const word1 = searchParams.get('word1');
    const word2 = searchParams.get('word2');

    if (!word1 || !word2) {
        return new Response(JSON.stringify({ error: 'Both words are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try {
        const synonyms = await getSynonyms(word1);
        const isSynonym = synonyms.includes(word2.toLowerCase());
        return new Response(JSON.stringify({ isSynonym }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: `Failed to check rhyme: ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function getSynonyms(word: string) {
    const response = await fetch(`https://www.thesaurus.com/browse/${word}`);
    const body = await response.text();
    const $ = cheerio.load(body);
    const synonyms: string[] = [];
    $('.Bf5RRqL5MiAp4gB8wAZa').each((i, el) => {
        synonyms.push($(el).text());
    });
    $('.CPTwwN0qNO__USQgCKp8').each((i, el) => {
        synonyms.push($(el).text());
    });
    $('.u7owlPWJz16NbHjXogfX').each((i, el) => {
        synonyms.push($(el).text());
    });
    return synonyms;
}

