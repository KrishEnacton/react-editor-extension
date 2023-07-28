import { CouponDuniaConfig } from "./MerchantConfigs/CouponDunia";
import { ZifupConfig } from "./MerchantConfigs/Zifup";
import { ZoutonsConfig } from "./MerchantConfigs/Zoutons";
import { GrabonConfig } from "./MerchantConfigs/Grabon";
import { ZingoyConfig } from "./MerchantConfigs/Zingoy";


export const MerchantConfigs = [
  CouponDuniaConfig,
  ZifupConfig,
  ZoutonsConfig,
  GrabonConfig,
  ZingoyConfig
]

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('check in content',)
  if(request.action === 'COUPONDUNIA_START_SCRAPPING') {
    console.log('COUPONDUNIA_START_SCRAPPING')
  }
  if(request.action === 'GRABON_START_SCRAPPING') {
    console.log('GRABON_START_SCRAPPING')
  }
})