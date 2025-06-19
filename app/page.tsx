// app/page.tsx
'use client'

import Image from 'next/image'
import useSWR from 'swr'
import { fetchFromSupabase } from '@/lib/api'
import { Article } from '@/types'

const fetcher = (url: string) => fetchFromSupabase(url)

export default function Home() {
  const { data, error, isLoading } = useSWR<Article[]>(
    'articles?select=*,companies(display_name)&order=published_at.desc',
    fetcher
  )

  if (error) return <div className="text-red-500">エラーが発生しました</div>
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/loading.gif" alt="Loading" width={64} height={64} unoptimized />
      </div>
    )

  return (
    <main className="p-6 mx-auto max-w-[1440px] bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Techブログ要約一覧</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((item) => (
          <div key={item.id} className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-[200px]">
              {/* ドメインが多様なためnext/Imageは用いない */}
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x200?text=No+Image'
                  e.currentTarget.onerror = null
                }}
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">{item.title_ja}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{item.summary_ja}</p>

              {/* 🔖 タグ（あれば表示） */}
              {item.tags_ja && item.tags_ja.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags_ja.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-600 text-xs font-medium px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* ✅ 日付 & 会社名 横並び */}
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{new Date(item.published_at).toLocaleDateString('ja-JP')}</span>
                {item.companies?.display_name && <span className="text-right">{item.companies.display_name}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
