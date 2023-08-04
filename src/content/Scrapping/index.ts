import { config } from '../../utils/config'
import { scrapper } from '../../content/scrapper'
import {
  excludeCompetitorMerchant,
  getCouponObject,
  getToScrappedMerchantAndWebsite,
} from '../../utils'
import { CouponType } from '../../global'

export async function startScrapping(merchantConfig: any) {
  // getting currentMerchant from the merchant configs
  const CurrentMerchant: any = config.merchantConfigs.find((merchant) => {
    if (merchant.name === merchantConfig.name) return merchant
  })

  /*
   * scraping of the coupons
   */
  const value = scrapper(merchantConfig)

  // extracting description
  if (!CurrentMerchant?.postprocess) return
  const postProcessValue = CurrentMerchant?.postprocess(value)

  // excluding competitor merchants
  const FilteredCoupons = excludeCompetitorMerchant(postProcessValue)

  // updating the coupon's object parameters for API calling
  let bulkUploadBody: CouponType[] = []
  const { merchant, website } = await getToScrappedMerchantAndWebsite()

  for (const coupon of FilteredCoupons) {
    //updating coupon object conditionally
    bulkUploadBody.push(getCouponObject(coupon, website, merchant))
  }
  // sending message to background for api calling for bulk upload
  chrome.runtime.sendMessage(
    {
      action: 'BULK_UPLOAD_COUPONS',
      from: 'scrapping_function',
      payload: { bulkUploadBody },
    },
    (res) => {
      console.log(res, 'response from background')
    },
  )
}
