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
  coupon_categories?: any[]
  website_merchants: any[]
}
export interface CouponType {
  coupon_code?: string
  merchant_name?: string
  source?: string
  source_id?: string
  source_coupon_id?: string
  merchant_id?: string
  raw_title?: string
  raw_description?: string
  offer_type?: string
  discount?: string
  affiliate_link?: string
  end_date?: number
  categories?: string[] | null
}
