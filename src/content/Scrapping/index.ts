import { CouponType } from '../../global'
import { useAPIFunctions } from '../../hooks/useFunctions'
import { config } from '../../utils/config'
import { scrapper } from '../../content/scrapper'
import { excludeCompetitorMerchant, remove_affiliate_params } from '../../utils'

export async function startScrapping(merchantConfig: any) {
  const { bulkCouponsUpload } = useAPIFunctions()
  console.log({ merchantConfig })
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

  console.log({ FilteredCoupons })

  // updating the coupon's object parameters for API calling
  let bulkUploadBody: CouponType[] = []

  for (const coupon of FilteredCoupons) {
    bulkUploadBody.push({
      coupon_code: coupon.coupon_code != '' ? coupon.coupon_code : '',
      source: 'comp',
      discount: coupon.discount != '' ? coupon.discount : '',
      raw_description: coupon.description != '' ? coupon.description : '',
      raw_title: coupon.title != '' ? coupon.title : '',
      offer_type: !coupon.coupon_code ? 'discount' : 'counpon',
      affiliate_link: coupon.affiliate_link != '' ? coupon.affiliate_link : '',
      end_date: coupon.end_date != '' ? coupon.end_date : '',
      source_coupon_id: coupon.source_coupon_id != '' ? coupon.source_coupon_id : '',
    })
  }

  console.log({ bulkUploadBody })

  /*
   * API calling after the post processing
   */

  const bulkuploadResult = await bulkCouponsUpload(bulkUploadBody)
  console.log({ bulkuploadResult })
}
