export type Article = {
  id: number
  title: string
  title_ja: string
  summary_ja: string
  published_at: string
  image_url?: string
  tags_ja?: string[]
  companies?: {
    display_name: string
    logo_url?: string
  }
}
