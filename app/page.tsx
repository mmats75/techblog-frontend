// app/page.tsx
'use client'

import Image from 'next/image'
import useSWR from 'swr'
import { fetchFromSupabase } from '@/lib/api'
import { Article } from '@/types'

const fetcher = (url: string) => fetchFromSupabase(url)

const leftAlignedCompanies = [
  // 文字が画像の左寄りにあることが多い企業をここに追加
  'Cloudflare',
  'Vercel',
]

export default function Home() {
  const { data, error, isLoading } = useSWR<Article[]>(
    'articles?select=*,companies(display_name,logo_url)&order=published_at.desc',
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
          <div key={item.id} className="flex flex-col bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
            {/* 画像 */}
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <img
                src={item.image_url || '/no-image.png'}
                alt={item.title}
                className="w-full h-full object-cover"
                onLoad={(e) => {
                  const img = e.currentTarget
                  const isLeftAligned = leftAlignedCompanies.includes(item.companies?.display_name ?? '')
                  img.classList.add(isLeftAligned ? 'object-left' : 'object-center')
                }}
              />
            </div>

            {/* コンテンツ本体 */}
            <div className="flex flex-col flex-1 p-4">
              {/* タイトル + 要約 */}
              <div className="space-y-2 flex-1">
                <h2 className="text-lg font-bold line-clamp-2 text-gray-800 dark:text-gray-100">{item.title_ja}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{item.summary_ja}</p>

                {/* タグ */}
                {item.tags_ja && item.tags_ja.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-2">
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
              </div>

              {/* フッター：日付＋ロゴ */}
              <div className="h-6 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-4">
                <span>{new Date(item.published_at).toLocaleDateString('ja-JP')}</span>
                {item.companies?.logo_url ? (
                  <img
                    src={item.companies.logo_url}
                    alt={item.companies.display_name}
                    className="h-6 w-auto ml-2 shrink-0"
                  />
                ) : (
                  <span>{item.companies?.display_name}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
