import ReactDOM from 'react-dom/client'
import { RootElement, injectStyles } from '../../utils'
import AddButton from './components/AddButton'

const root = RootElement('coupomated-add-button', 'fixed', '99999999')
document.body.prepend(root)
const shadow = root.attachShadow({ mode: 'open' }) as ShadowRoot
shadow.append(injectStyles(chrome.runtime.getURL('/src/styles/output.css')))
ReactDOM.createRoot(shadow as ShadowRoot).render(<AddButton />)
