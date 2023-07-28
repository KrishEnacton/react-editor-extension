import { getCurrentMerchant } from '../utils'

// chrome.runtime.onInstalled.addListener(() => {
//   console.info('chrome-ext template-react-ts background script installed')
//   chrome.tabs.create({ url: chrome.runtime.getURL('/options.html#/login') })
// })


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'getCurrentMerchant') {
    getCurrentMerchant().then((currentMerchant: any) => {
      sendResponse(currentMerchant)
    })
  }
  return true
})

export {}
