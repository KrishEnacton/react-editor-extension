import ReactDOM from 'react-dom/client'
import { RootElement, injectStyles } from '../../utils'
import AddCouponSlider from './components/AddCouponSlider'

const root = RootElement('coupomated-add-coupon-slider', 'fixed', '99999999')
document.body.prepend(root)
const shadow = root.attachShadow({ mode: 'open' }) as ShadowRoot
shadow.append(injectStyles(chrome.runtime.getURL('/src/styles/output.css')))
shadow.append(
  injectStyles(chrome.runtime.getURL('/node_modules/react-datepicker/dist/react-datepicker.css')),
)
ReactDOM.createRoot(shadow as ShadowRoot).render(<AddCouponSlider />)
