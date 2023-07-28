import ReactDOM from 'react-dom/client'
import { RootElement, injectStyles, scrapingData } from '../utils'
import Modal from './Modal/components/Modal'

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
    const scrappedData = scrapingData(request.payload.currentMerchant)
    document.querySelector('#coupomated-injected-modal')?.remove()
  }
  return true
})
