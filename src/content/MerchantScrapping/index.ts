import { excludeCompetitorMerchant } from '../../utils'
import { config } from '../../utils/config'
import { scrapper } from '../scrapper'

export function startScrapping(merchantConfig: any) {
  console.log({ merchantConfig })
  // scraping of the coupon's
  const CurrentMerchant: any = config.merchantConfigs.find((merchant) => {
    if (merchant.name === merchantConfig.name) return merchant
  })

  const value = scrapper(merchantConfig)

  // performing post processing

  // extracting description
  if (!CurrentMerchant?.postprocess) return
  const postProcessValue = CurrentMerchant?.postprocess(value)
  console.log({ postProcessValue })

  // excluding competitor merchants
  const FilteredCoupons = excludeCompetitorMerchant(postProcessValue)

  console.log({ FilteredCoupons })
}
