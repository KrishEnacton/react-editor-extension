import { config } from '../utils/config'
import { startScrapping } from './Scrapping'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'START_AUTO_SCRAPPING') {
    document.querySelector('#coupomated-injected-modal')?.remove()
    const CurrentMerchant: any = config.merchantConfigs.find((merchant) => {
      if (merchant.name === request.payload.currentMerchant.name) return merchant
    })
    startScrapping(CurrentMerchant)
  }
  return true
})
