import { createClient } from '@/lib/supabase';

type SearchSimilarPhrasesResult = {
  phrase_id: number;  // TypeScript uses 'number' for both int and bigint
  input_phrase: string;
};

// export async function GET(request: Request) {
//   const supabase = createClient()
//   const { searchParams } = new URL(request.url);
//   const word = searchParams.get('word');

//   try {
//     const totalAnswers = await supabase
//       .from('survey_senses')
//       .select('id', { count: 'exact' })
//       .eq('daily_word', daily_word)
//       .eq('mode', mode)
//       .single()

//     // Count how many times this exact description has been used
//     const matchingAnswers = await supabase
//       .from('survey_senses')
//       .select('id', { count: 'exact' })
//       .eq('daily_word', daily_word)
//       .eq('mode', mode)
//       .eq('input_phrase', input_phrase)
//       .single()
//     const rarityScore = 100 - (matchingAnswers.count / totalAnswers.count * 100)
//     Response.json({ rarityScore }, {
//       status: 200
//     })
//   }
//   catch (error) {
//     return new Response(JSON.stringify({ error }), {
//       status: 500,
//     });
//   }

// }


export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const body = await req.json();
    const { daily_word, mode, input_phrase }: { daily_word: string, mode: string, input_phrase: string } = body;

    // Count total answers for this word and mode
    const { count: totalAnswers, error: totalError } = await supabase
      .from('survey_senses')
      .select('*', { count: 'exact', head: true })
      .eq('daily_word', daily_word)
      .eq('mode', mode);

    if (totalError) {
      return new Response(JSON.stringify({ error: `Failed to count total answers: ${totalError.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Prepare search terms
    const searchTerms = input_phrase.toLowerCase().split(/\s+/).filter(term => term.length > 2);
    const searchQuery = searchTerms.join(' | ');

    // Search for matching answers using text search with stemming
    const p_daily_word = daily_word, p_mode = mode, p_search_query = searchQuery;
    const { data: matchingData, error: matchingError } = await supabase
      .rpc('search_similar_phrases', {
        p_daily_word,
        p_mode,
        p_search_query
      });


    if (matchingError) {
      return new Response(JSON.stringify({ error: `Error searching matching answers: ${matchingError.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Count exact matches
    const exactMatches = matchingData.filter((item: { input_phrase: string; }) =>
      item.input_phrase.toLowerCase() === input_phrase.toLowerCase()
    ).length;

    // Count similar matches (using stemming, so we don't need to check for partial matches manually)
    const similarMatches = matchingData.length - exactMatches;
    const matchingAnswers = matchingData.length;

    // Calculate rarity score
    const rarityScore = totalAnswers ? Math.round(100 - (matchingAnswers / totalAnswers * 100)) : 100;
    const percentageGuessed = totalAnswers ? (matchingAnswers / totalAnswers * 100) : 0;

    // Determine rarity tier
    let rarityTier;
    if (matchingAnswers === 0 && totalAnswers && totalAnswers > 1) {
      rarityTier = "Unicorn";
    } else if (percentageGuessed <= 5) {
      rarityTier = "Legendary";
    } else if (percentageGuessed <= 15) {
      rarityTier = "Epic";
    } else if (percentageGuessed <= 30) {
      rarityTier = "Rare";
    } else if (percentageGuessed <= 50) {
      rarityTier = "Uncommon";
    } else {
      rarityTier = "Common";
    }

    // Insert the new entry
    const { error } = await supabase
      .from('survey_senses')
      .insert([{ daily_word, mode, input_phrase }])
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: `Failed to insert new entry: ${error.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      rarityScore,
      rarityTier,
      percentageGuessed,
      totalAnswers,
      exactMatches,
      similarMatches,
      matchingAnswers
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: `Failed to process request: ${error}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}