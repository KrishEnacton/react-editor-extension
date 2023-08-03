import ReactDOM from 'react-dom/client'
import { RootElement, injectStyles } from '../../utils'
import AddCouponSlider from './components/AddCouponSlider'

const root = RootElement({
  id: 'coupomated-add-coupon-slider',
  position: 'fixed',
  zIndex: '99999999',
  display: 'none',
})
document.body.prepend(root)
const shadow = root.attachShadow({ mode: 'open' }) as ShadowRoot
shadow.append(injectStyles(chrome.runtime.getURL('/src/styles/output.css')))
shadow.append(
  injectStyles(chrome.runtime.getURL('/node_modules/react-datepicker/dist/react-datepicker.css')),
)
ReactDOM.createRoot(shadow as ShadowRoot).render(<AddCouponSlider />)
