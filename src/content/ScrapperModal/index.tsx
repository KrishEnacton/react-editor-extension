import ReactDOM from 'react-dom/client'
import { RootElement, injectStyles } from '../../utils'
import ScrapperModal from './components/ScrapperModal'

chrome.runtime.sendMessage({ action: 'GET_CURRENT_MERCHANT' }, (response) => {
  if (!response) return
  const root = RootElement('coupomated-injected-modal', 'fixed', '99999999')
  document.body.prepend(root)
  const shadow = root.attachShadow({ mode: 'open' }) as ShadowRoot
  shadow.append(injectStyles(chrome.runtime.getURL('/src/styles/output.css')))
  ReactDOM.createRoot(shadow as ShadowRoot).render(<ScrapperModal merchantConfig={response} />)
})
