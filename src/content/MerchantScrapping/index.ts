import { config } from '../../utils/config'
import { scrapper } from '../scrapper'

export function startScrapping(merchantConfig: any) {
  // scraping of the coupon's

  const CurrentMerchant: any = config.merchantConfigs.find((merchant) => {
    if (merchant.name === merchantConfig.name) return merchant
  })

  const value = scrapper(merchantConfig)

  console.log({ CurrentMerchant })

  // performing post processing
  if (!CurrentMerchant?.postprocess) return
  const postProcessValue = CurrentMerchant?.postprocess(value)
  console.log({ postProcessValue })
}
