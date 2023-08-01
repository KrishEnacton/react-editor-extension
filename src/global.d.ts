export interface MerchantType {
  id: number
  name?: string
  website?: string
  is_flat_url?: number
  domain_name?: string
  logo?: string
  status?: string
  alexa_rank?: number
  stars?: number
  auto_select?: number
  slug: string
  featured?: number
  editor_id?: number
  free_plan?: number
  published_at: string | null
  checked_at: string | null
  direct_network_id: number | null
  coupons_count?: number
  stats: any[]
  website_merchants: any[]
}
