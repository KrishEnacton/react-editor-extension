import ReactDOM from 'react-dom/client'
import { RootElement, injectStyles } from '../utils'
import Modal from './Modal/components/Modal'

chrome.runtime.sendMessage({ action: 'GET_CURRENT_MERCHANT' }, (response) => {
  if (!response) return
  const root = RootElement()
  document.body.prepend(root)
  const shadow = root.attachShadow({ mode: 'open' }) as ShadowRoot
  shadow.append(injectStyles())
  ReactDOM.createRoot(shadow as ShadowRoot).render(<Modal />)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log({ request })
  if (request.action === 'START_AUTO_SCRAPING') {
    alert('auto scrape start')
    // TODO: call auto scrape function
  }
  return true
})
