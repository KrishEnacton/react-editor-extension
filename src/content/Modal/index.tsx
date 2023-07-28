import ReactDOM from 'react-dom/client'
import Modal from './components/Modal'
import { RootElement, injectStyles } from '../../utils'

chrome.runtime.sendMessage({ type: 'getCurrentMerchant' }, (response) => {
  console.log('response', response)
  if (!response) return
  const root = RootElement()
  document.body.prepend(root)
  const shadow = root.attachShadow({ mode: 'open' }) as ShadowRoot
  shadow.append(injectStyles())
  ReactDOM.createRoot(shadow as ShadowRoot).render(<Modal />)
})
