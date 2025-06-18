# Tech ブログまとめビューア

## 🌐 概要（日本語）

このアプリは、海外テック企業の技術ブログの概要をカード形式で日本語を表示します。サムネイル画像、日本語要約、公開日などの情報を視覚的にわかりやすく整理しています。

### 🔧 主な技術スタック

- Next.js（App Router）
- Tailwind CSS
- SWR（データ取得）
- Supabase（REST API として使用）

### ✅ 現状の機能

- 海外テック企業の技術ブログ記事を取得し、Supabase に保存
- OpenAI API により日本語要約とタグを生成、RAG 検索のために記事本文をベクトル DB に保存
- Supabase から記事データを取得し、日本語要約・公開日・サムネイル画像を表示

### 🚀 今後の予定

- 記事の検索・タグフィルタ
- 本文プレビュー表示 or 詳細ページ遷移
- 記事収集パイプラインの自動化

### 📂 環境変数設定

`.env.local` に以下のように記載してください：

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_API_KEY=...
```

---

## 🌐 Overview（English）

This app displays summaries of technical blog posts from international tech companies in Japanese, using a clean card-style UI. Each card shows a thumbnail image, Japanese summary, and publication date in a visually organized layout.

### 🔧 Tech Stack

- Next.js (App Router)
- Tailwind CSS
- SWR for data fetching
- Supabase as backend (via REST API)

### ✅ Current Features

- Fetch blog articles from various international tech companies and store them in Supabase
- Use OpenAI API to generate Japanese summaries and tags; store the original content in a vector database for RAG search
- Retrieve article data from Supabase and display Japanese summaries, publication dates, and thumbnails

### 🚀 Planned Features

- Keyword/tag-based search and filtering
- Preview of full article content or navigation to a detail page
- Automated article ingestion pipeline from RSS feeds or web scraping

### 📂 Environment Variables

Create a .env.local file with the following settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_API_KEY=...
```
