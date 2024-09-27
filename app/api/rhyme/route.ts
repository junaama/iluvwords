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
        const rhymes = await getRhymes(word1);
        const isRhyme = rhymes.includes(word2.toLowerCase());
        // console.log('rhymes:', )
        return new Response(JSON.stringify({ isRhyme }), {
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
async function getRhymes(word: string) {
    const response = await fetch(`https://www.rhymezone.com/r/rhyme.cgi?Word=${word}&org1=syl&org3=n&typeofrhyme=perfect&org2=sl`);

    const html = await response.text();
    const $ = cheerio.load(html);

    const rhymes: string[] = [];
    $('a.r').each((_, element) => {
        const rhyme = $(element).text().toLowerCase();
        // Exclude words with spaces or hyphens
        if (!rhyme.includes(' ') && !rhyme.includes('-')) {
            rhymes.push(rhyme);
        }
    });

    return rhymes;
}