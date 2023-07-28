import { toast } from 'react-toastify'
import { config } from './config'
import { scrapper } from '../content/scrapper'

export function notify(message: string, type: 'error' | 'warning' | 'info' | 'success') {
  if (type === 'error') {
    toast(message, { type })
  }
  if (type === 'warning') {
    toast(message, { type })
  }
  if (type === 'info') {
    toast(message, { type })
  }
  if (type === 'success') {
    toast(message, { type })
  }
}

export function RootElement() {
  let rootElement = document.createElement('div')
  rootElement.id = 'coupomated-injected-modal'
  rootElement.style.position = 'fixed'
  rootElement.style.zIndex = '99999999'
  return rootElement
}

export function injectStyles() {
  let linkElement = document.createElement('link')
  linkElement.rel = 'stylesheet'
  linkElement.type = 'text/css'
  linkElement.href = chrome.runtime.getURL('/src/styles/output.css')
  return linkElement
}

export function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      if (tabs[0]) {
        resolve(tabs[0])
      } else {
        reject('No active tab')
      }
    })
  })
}

export function getCurrentMerchant(tab?: chrome.tabs.Tab | undefined) {
  return new Promise((resolve, reject) => {
    if (tab) {
      const merchants = Object.values(config.merchantConfigs)
      if (!tab.url) return
      const currentTabUrl = new URL(tab.url)
      const currentMerchant: any = merchants.find((merchant: any) => {
        if (!merchant.url) return
        const merchantUrl = new URL(merchant.url)
        if (merchantUrl.hostname === currentTabUrl.hostname) return merchant
      })
      if (!currentMerchant) {
        reject('No merchant found')
      }
      resolve(currentMerchant)
    } else {
      getCurrentTab().then((tab: any) => {
        const merchants = Object.values(config.merchantConfigs)
        const currentTabUrl = new URL(tab.url)
        const currentMerchant: any = merchants.find((merchant: any) => {
          if (!merchant.url) return
          const merchantUrl = new URL(merchant.url)
          if (merchantUrl.hostname === currentTabUrl.hostname) return merchant
        })
        if (!currentMerchant) {
          reject('No merchant found')
        }
        resolve(currentMerchant)
      })
    }
  }) as Promise<any>
}

export function scrapingData(config: any) {
  return scrapper(config)
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
