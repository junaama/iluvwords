import { createClient } from '@/lib/supabase';

export async function GET(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');
  const { data, error } = await supabase
    .from('words')
    .select('*')
    .eq('word', word);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ valid: data.length > 0 }), {
    status: 200,
  });
}
