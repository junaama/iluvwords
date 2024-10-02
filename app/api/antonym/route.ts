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
        const antonyms = await scrapeAntonyms(word1);
        const isAntonym = antonyms.includes(word2.toLowerCase());
        // console.log('rhymes:', )
        return new Response(JSON.stringify({ isAntonym }), {
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
// Function to scrape antonyms
async function scrapeAntonyms(word: string) {

    const data = await fetch(`https://cwsl.ca/${word}`);
    const body = await data.text();
    const $ = cheerio.load(body);
    const antonyms: string[] = [];

    $(`h3.title:contains(${word.toUpperCase()} Antonyms)`).closest('.widget.LinkList').find('.widget-content').each((idx, antelem) => {
        $(antelem).find('a').each((idx, antElem) => {
            antonyms.push($(antElem).text().trim())
        })

    })

    $(`h3.title:contains("${word.toUpperCase()} antonyms")`).closest('.widget.LinkList').find('.widget-content').each((idx, antelem) => {
        $(antelem).find('a').each((idx, antElem) => {
            antonyms.push($(antElem).text().trim())
        })

    })
    return antonyms
}
