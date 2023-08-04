import { CouponType } from '../../global'
import { useAPIFunctions } from '../../hooks/useFunctions'
import { config } from '../../utils/config'
import { scrapper } from '../../content/scrapper'
import { excludeCompetitorMerchant, parseDateToTimestamp } from '../../utils'
import { useStorage } from '../../hooks/useStorage'

export async function startScrapping(merchantConfig: any) {
  const { getMerchantInfo } = useAPIFunctions()
  const { getStorage } = useStorage()
  const CurrentMerchant: any = config.merchantConfigs.find((merchant) => {
    if (merchant.name === merchantConfig.name) return merchant
  })

  /*
   * scraping of the coupons
   */
  const value = scrapper(merchantConfig)

  /*
   * performing post processing
   */

  // extracting description
  if (!CurrentMerchant?.postprocess) return
  const postProcessValue = CurrentMerchant?.postprocess(value)

  // excluding competitor merchants
  const FilteredCoupons = excludeCompetitorMerchant(postProcessValue)

  // updating the coupon's object parameters for API calling
  let bulkUploadBody: CouponType[] = []

  for (const coupon of FilteredCoupons) {
    const urlParams = new URL(window.location.href).searchParams
    const merchant_id = urlParams.get('merchant_id')?.toString()
    if (merchant_id != null) {
      chrome.runtime.sendMessage(
        {
          action: 'GET_MERCHANT_INFO',
          from: 'scrapping_funtion',
          payload: { merchant_id },
        },
        (merchant) => {
          bulkUploadBody.push({
            coupon_code: coupon.coupon_code != '' ? coupon.coupon_code : '',
            source: 'comp',
            source_id: urlParams.get('website_id')?.toString(),
            merchant_id: merchant.id,
            merchant_name: merchant?.name ?? '',
            discount: coupon.discount != '' ? coupon.discount : '',
            raw_description: coupon.description != '' ? coupon.description : '',
            raw_title: coupon.title != '' ? coupon.title : '',
            offer_type:
              coupon.title != '' && coupon.title != null && !coupon.title.includes('cashback')
                ? 'cashback'
                : 'discount',
            affiliate_link: coupon.affiliate_link != '' ? coupon.affiliate_link : '',
            end_date: coupon.end_date != '' ? parseDateToTimestamp(coupon.end_date) : 0,
            source_coupon_id: coupon.source_coupon_id != '' ? coupon.source_coupon_id : '',
            categories: null,
          })

          /*
           * API calling after the post processing
           */

          chrome.runtime.sendMessage(
            {
              action: 'BULK_UPLOAD_COUPONS',
              from: 'scrapping_function',
              payload: { bulkUploadBody },
            },
            (res) => {
              console.log(res, 'from background')
            },
          )
        },
      )
    }
  }
}
