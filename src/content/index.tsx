import ReactDOM from 'react-dom/client'
import { RootElement, injectStyles } from '../utils'
import Modal from './Modal/components/Modal'
import { startScrapping } from './MerchantScrapping'
import { config } from '../utils/config'

chrome.runtime.sendMessage({ action: 'GET_CURRENT_MERCHANT' }, (response) => {
  if (!response) return
  const root = RootElement()
  document.body.prepend(root)
  const shadow = root.attachShadow({ mode: 'open' }) as ShadowRoot
  shadow.append(injectStyles())
  ReactDOM.createRoot(shadow as ShadowRoot).render(<Modal merchantConfig={response} />)
})

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
