// app/page.tsx
'use client'

import Image from 'next/image'
import useSWR from 'swr'
import { fetchFromSupabase } from '@/lib/api'

const fetcher = (url: string) => fetchFromSupabase(url)

export default function Home() {
  const { data, error, isLoading } = useSWR('articles?select=*', fetcher)

  if (error) return <div className="text-red-500">エラーが発生しました</div>
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/loading.gif" alt="Loading" width={64} height={64} unoptimized />
      </div>
    )

  return (
    <main className="p-6 mx-auto max-w-[1440px]">
      <h1 className="text-2xl font-bold mb-6">Techブログ要約一覧</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-[200px]">
              <img
                src={item.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-800 truncate">{item.title}</h2>
              <p className="text-sm text-gray-700 line-clamp-3">{item.summary_ja}</p>
              <p className="text-xs text-gray-500">{new Date(item.published_at).toLocaleDateString('ja-JP')}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
