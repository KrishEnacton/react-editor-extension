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
    console.log('called', tab.url)
    if (tab.url) {
      const url = new URL(tab.url)
      console.log('data:', url.searchParams.get('autoscrape'))
      if (url.searchParams.get('autoscrape')) {
        chrome.tabs.sendMessage(tabId, { action: 'START_AUTO_SCRAPING' })
      }
    }
  }
})

export {}
