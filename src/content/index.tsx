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
  console.log({ request })
  if (request.action === 'START_AUTO_SCRAPING') {
    console.log('auto scrape start', scrapingData(request.payload.currentMerchant))
  }
  return true
})
