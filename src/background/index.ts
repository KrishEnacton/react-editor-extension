import { getCurrentMerchant, sleep } from '../utils'

// chrome.runtime.onInstalled.addListener(() => {
//   console.info('chrome-ext template-react-ts background script installed')
//   chrome.tabs.create({ url: chrome.runtime.getURL('/options.html#/login') })
// })

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'GET_CURRENT_MERCHANT') {
    getCurrentMerchant().then((currentMerchant: any) => {
      sendResponse(currentMerchant)
    })
  }
  return true
})

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    await sleep(1000)
    if (tab.url) {
      const url = new URL(tab.url)
      const currentMerchant = await getCurrentMerchant(tab)
      if (url.searchParams.get('auto_scrape') && Object.values(currentMerchant).length > 0) {
        chrome.tabs.sendMessage(tabId, {
          action: 'START_AUTO_SCRAPPING',
          payload: { currentMerchant },
        })
      }
    }
  }
})

export {}
