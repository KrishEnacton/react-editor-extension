import { toast } from 'react-toastify'
import { config } from './config'
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

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
      if (tabs.length > 0) {
        resolve(tabs[0])
      } else {
        reject('No active tab')
      }
    })
  })
}

export function getCurrentMerchant(tab?: chrome.tabs.Tab | undefined) {
  return new Promise((resolve, reject) => {
    const findCurrentMerchant = (tabUrl: URL) => {
      const merchants = Object.values(config.merchantConfigs)
      const currentMerchant = merchants.find((merchant: any) => {
        if (!merchant.url) return
        const merchantUrl = new URL(merchant.url)
        return merchantUrl.hostname === tabUrl.hostname
      })
      return currentMerchant
    }

    if (tab) {
      if (!tab.url) return reject('No tab URL')
      const currentTabUrl = new URL(tab.url)
      const currentMerchant = findCurrentMerchant(currentTabUrl)
      if (!currentMerchant) return reject('No merchant found')
      resolve(currentMerchant)
    } else {
      getCurrentTab().then((tab: any) => {
        if (!tab.url) return reject('No tab URL')
        const currentTabUrl = new URL(tab.url)
        const currentMerchant = findCurrentMerchant(currentTabUrl)
        if (!currentMerchant) return reject('No merchant found')
        resolve(currentMerchant)
      })
    }
  }) as Promise<any>
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function getDescription(description: string) {
  //@ts-ignore
  return [...document.querySelector(description).querySelectorAll('li')]
    .map((li) => li.innerText)
    .join('')
}

export function excludeCompetitorMerchant(coupons: any) {
  if (!coupons || coupons.length == 0) return []
  const filteredValue = coupons.filter((coupon: any) => {
    if (coupon.coupon_code == '') return coupon

    const isIncluded: any = config.coupon_rejection_keywords.filter((key: string) => {
      if (new RegExp(`${key}`, 'gi').test(coupon.coupon_code)) {
        return key
      }
    })
    if (isIncluded?.length == 0) return coupon
  })
  return filteredValue
}

export function remove_affiliate_params(clean_url: string) {
  const url = new URL(clean_url)
  const strip_parameters = config.affiliate_params
  const obj = Object.fromEntries(new URLSearchParams(url.search))
  let final_url

  Object.keys(obj).forEach((key) => {
    if (strip_parameters.includes(key) || strip_parameters.includes(obj[key])) {
      delete obj[key]
    }
  })

  const queryString = getParsedQuery(obj)

  final_url = clean_url?.split('?')[0] + (queryString?.length > 2 ? `?${queryString}` : '')

  return final_url
}

function getParsedQuery(params: any) {
  return Object.keys(params)
    .filter((e) => params[e] !== null)
    .map((key) => {
      if (Array.isArray(params[key])) {
        if (params[key].length) {
          const prefix = `${key}=`
          // const arrData = params[key].join(`&${key}=`);
          const arrData = params[key].join(`&${key}=`)
          return prefix + arrData
        } else {
          return 'null'
        }
      } else if (typeof params[key] === 'object') {
        return Object.keys(params[key])
          .map((objectKey) => {
            if (Array.isArray(params[key][objectKey])) {
              if (params[key][objectKey].length) {
                const prefix = `${key}[${objectKey}][]=`
                const arrData = params[key][objectKey].join(`&${key}[${objectKey}][]=`)
                return prefix + arrData
              } else {
                return 'null'
              }
            } else if (params[key][objectKey] !== null) {
              return `${key}[${objectKey}]=${params[key][objectKey]}`
            } else {
              return null
            }
          })
          .filter((e) => e !== 'null')
          .join('&')
      } else {
        return `${key}=${params[key]}`
      }
    })
    .filter((e) => e !== 'null')
    .join('&')
}

export function openTabInBackground(urls: string[]) {
  urls.map((url) => {
    let newUrl
    if (url.includes('?')) {
      newUrl = url + '?auto_scrape=1'
    } else newUrl = url + '&auto_scrape=1'
    chrome.tabs.create({ url: newUrl, active: false })
  })
}

export const replace_nth = function (s: string, f: string, r: string, n: string) {
  // From the given string s, replace f with r of nth occurrence
  return s.replace(RegExp('^(?:.*?' + f + '){' + n + '}'), (x) => x.replace(RegExp(f + '$'), r))
}

export function jsToMysqlDate(d: Date) {
  return `${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

export const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
export const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
export const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]
