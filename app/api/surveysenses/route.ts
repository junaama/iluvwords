import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/lib/supabase';

export async function GET(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');

  try {
    const totalAnswers = await supabase
      .from('survey_senses')
      .select('id', { count: 'exact' })
      .eq('daily_word', daily_word)
      .eq('mode', mode)
      .single()

    // Count how many times this exact description has been used
    const matchingAnswers = await supabase
      .from('survey_senses')
      .select('id', { count: 'exact' })
      .eq('daily_word', daily_word)
      .eq('mode', mode)
      .eq('input_phrase', input_phrase)
      .single()
    const rarityScore = 100 - (matchingAnswers.count / totalAnswers.count * 100)
    Response.json({ rarityScore }, {
      status: 200
    })
    // if (error) {

    // }
  }
  catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }

}

// export async function POST(
//   req: Request,
// ) {
//   const supabase = createClient()
//   try {
//     const body = await req.json();
//     const { daily_word, mode, input_phrase } = body;

//     const { count: totalAnswers, error: totalError } = await supabase
//       .from('survey_senses')
//       .select('*', { count: 'exact', head: true })
//       .eq('daily_word', daily_word)
//       .eq('mode', mode);
//     if (totalError) return new Response(JSON.stringify({ error: `Failed to post: ${totalError}` }))

//     const searchTerms = input_phrase.split(' ').filter(term => term.length > 2);
//     const searchQuery = searchTerms.join(' | ');
//     const { data: matchingData, error: matchingError } = await supabase
//       .from('survey_senses')
//       .select('id, input_phrase')
//       .eq('daily_word', daily_word)
//       .eq('mode', mode)
//       .textSearch('input_phrase', searchQuery, {
//         type: 'plain',
//         config: 'english'
//       });

//     if (matchingError) {
//       console.error('Error searching matching answers:', matchingError);
//       // Handle the error appropriately
//       return;
//     }

//     console.log('Matching Data:', matchingData);

//     // Count exact matches
//     const exactMatches = matchingData.filter(item => item.input_phrase.toLowerCase() === input_phrase.toLowerCase()).length;

//     // Count partial matches (at least half of the terms match)
//     const partialMatches = matchingData.filter(item => {
//       const itemTerms = item.input_phrase.toLowerCase().split(' ');
//       const matchingTermsCount = searchTerms.filter(term => itemTerms.includes(term.toLowerCase())).length;
//       return matchingTermsCount >= Math.ceil(searchTerms.length / 2);
//     }).length;


//     const matchingAnswers = exactMatches + partialMatches
//     // Calculate rarity score

//     const rarityScore = totalAnswers ? 100 - (matchingAnswers / totalAnswers * 100) : 0


//     const { data, error } = await supabase
//       .from('survey_senses')
//       .insert([{ daily_word: daily_word, mode: mode, input_phrase: input_phrase }])
//       .single()

//     if (error) return new Response(JSON.stringify({ error: `Failed to post: ${error}` }))

//     return new Response(JSON.stringify({ rarityScore }))
//   } catch (error) {
//     return new Response(JSON.stringify({ error: `Failed to post rarity score: ${error}` }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

// }

import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const body = await req.json();
    const { daily_word, mode, input_phrase } = body;

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
    const { data: matchingData, error: matchingError } = await supabase
      .from('survey_senses')
      .select('id, input_phrase')
      .eq('daily_word', daily_word)
      .eq('mode', mode)
      .textSearch('input_phrase', searchQuery, {
        type: 'plain',
        config: 'english'
      });

    if (matchingError) {
      return new Response(JSON.stringify({ error: `Error searching matching answers: ${matchingError.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Count exact matches
    const exactMatches = matchingData.filter(item => 
      item.input_phrase.toLowerCase() === input_phrase.toLowerCase()
    ).length;

    // Count similar matches (using stemming, so we don't need to check for partial matches manually)
    const similarMatches = matchingData.length - exactMatches;

    const matchingAnswers = matchingData.length;

    // Calculate rarity score
    const rarityScore = totalAnswers ? Math.round(100 - (matchingAnswers / totalAnswers * 100)) : 100;

    // Insert the new entry
    const { data, error } = await supabase
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