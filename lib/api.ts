// lib/api.ts
export async function fetchFromSupabase(path: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_API_KEY!}`,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data from Supabase')
  }
  return res.json()
}
