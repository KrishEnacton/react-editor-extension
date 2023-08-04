import { useAPIFunctions } from '../hooks/useFunctions'
import { getCurrentMerchant, sleep } from '../utils'

const OptionsUrl: string = chrome.runtime.getURL('/options.html#/')
// chrome.runtime.onInstalled.addListener(() => {
//   console.info('chrome-ext template-react-ts background script installed')
//   chrome.tabs.create({ url: chrome.runtime.getURL('/options.html#/login') })
// })
//

chrome.action.onClicked.addListener(() => {
  tabChange()
})

const tabChange = () => {
  chrome.tabs.query({}, (tabs) => {
    if (!tabs.find((tab) => tab.url?.includes(chrome.runtime.getURL('')))) {
      chrome.tabs.create({
        url: OptionsUrl,
      })
    } else {
      chrome.tabs.query({}, (tabs: any) => {
        const tab = tabs.find((tab: any) => tab.url?.includes(chrome.runtime.getURL('')))
        chrome.tabs.update(tab.id, { active: true })
      })
    }
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const { bulkCouponsUpload, getMerchantInfo } = useAPIFunctions()
  if (request.action === 'GET_CURRENT_MERCHANT') {
    getCurrentMerchant()
      .then((currentMerchant: any) => {
        sendResponse(currentMerchant)
      })
      .catch((err) => {
        console.log(err, '==> error while getting current merchant')
      })
  }

  if (request.action === 'BULK_UPLOAD_COUPONS') {
    bulkCouponsUpload(request.payload.bulkUploadBody)
      .then((res) => {
        sendResponse(res)
      })
      .catch((err) => {
        console.log(err, '==> error while bulk uploading')
      })
  }

  if (request.action === 'GET_MERCHANT_INFO') {
    getMerchantInfo(request.payload.merchant_id)
      .then((res) => {
        sendResponse(res)
      })
      .catch((err) => {
        console.log(err, '==> error while getting merchant info')
      })
  }
  return true
})

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    await sleep(1000)
    if (tab.url) {
      const url = new URL(tab.url)
      try {
        const currentMerchant = await getCurrentMerchant(tab)
        if (url.searchParams.get('auto_scrape') && Object.values(currentMerchant).length > 0) {
          chrome.tabs.sendMessage(tabId, {
            action: 'START_AUTO_SCRAPPING',
            payload: { currentMerchant },
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export { }
