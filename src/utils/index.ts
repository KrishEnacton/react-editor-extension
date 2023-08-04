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
import { useStorage } from '../hooks/useStorage'

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

export function RootElement({
  id,
  position,
  zIndex,
  display,
}: {
  id: string
  position: string
  zIndex: string
  display?: string
}) {
  let rootElement = document.createElement('div')
  rootElement.id = id
  if (display) {
    rootElement.style.display = display
  }
  rootElement.style.position = position
  rootElement.style.zIndex = zIndex
  return rootElement
}

export function injectStyles(href: string) {
  let linkElement = document.createElement('link')
  linkElement.rel = 'stylesheet'
  linkElement.type = 'text/css'
  linkElement.href = href
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

export function openTabInBackground(website_merchants: any) {
  website_merchants.map((website_merchant: any) => {
    let newUrl
    if (!website_merchant.url.includes('?')) {
      newUrl =
        website_merchant.url +
        `?auto_scrape=1&website_id=${website_merchant.website_id}&merchant_id=${website_merchant.merchant_id}`
    } else
      newUrl =
        website_merchant.url +
        `&auto_scrape=1&website_id=${website_merchant.website_id}&merchant_id=${website_merchant.merchant_id}`

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
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  // { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
export const teams = [
  // { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  // { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  // { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
export const userNavigation = [
  // { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

export function parseDateToTimestamp(dateStr: string) {
  // Helper function to convert month name to month number
  const getMonthNumber = (monthName: any) => {
    const months: any = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    }
    return months[monthName]
  }

  // Function to parse the date string and convert it to timestamp
  const parseDate = (dateStr: string) => {
    const dateTimeRegex = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
    const shortDateRegex = /^(\d{1,2}) ([A-Za-z]{3}), (\d{2})$/
    const relativeDateRegex = /^\+(\d+) days$/

    let match: any

    if (dateStr.match(dateTimeRegex)) {
      match = dateStr.match(dateTimeRegex)
      const [, year, month, day, hour, minute, second] = match
      return new Date(year, month - 1, day, hour, minute, second).getTime() / 1000
    }

    if (dateStr.match(shortDateRegex)) {
      match = dateStr.match(shortDateRegex)
      const [, day, monthName, year] = match
      return new Date(year, getMonthNumber(monthName), day).getTime() / 1000
    }

    if (dateStr.match(relativeDateRegex)) {
      match = dateStr.match(relativeDateRegex)
      const [, daysToAdd] = match
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() + parseInt(daysToAdd))
      return currentDate.getTime() / 1000
    }

    return NaN // Invalid date format
  }

  return parseDate(dateStr)
}

export function getEditorToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get('editor_info').then((res) => {
      resolve(res.editor_info.token)
    })
  })
}

export function getHeaders(editor_token?: string) {
  return new Promise((resolve) => {
    getEditorToken().then((token: any) => {
      if (token != '') {
        resolve({
          Authentication: `Bearer ${editor_token && editor_token != '' ? editor_token : token}`,
          'Content-Type': 'application/json',
        })
      }
    })
  })
}

export async function getToScrappedMerchantAndWebsite() {
  const { getStorage } = useStorage()
  const merchant = (await getStorage('user_merchants')).user_merchants.find((merchant: any) => {
    if (new URL(window.location.href).pathname.includes(merchant.domain_name.split('.')[0]))
      return merchant
  })
  const website = merchant.website_merchants.find((website: any) => {
    if (new URL(website.url).hostname == new URL(window.location.href).hostname) {
      return website
    }
  })
  return {
    merchant,
    website,
  }
}

export function getCouponObject(coupon: any, website: any, merchant: any) {
  return {
    coupon_code: coupon.coupon_code && coupon.coupon_code !== '' ? coupon.coupon_code : '',
    source: 'comp',
    source_id: website?.website_id.toString(),
    merchant_id: merchant?.id.toString() ?? '',
    merchant_name: merchant?.name ?? '',
    discount: coupon?.discount != '' ? coupon.discount : '',
    raw_description: coupon?.description != '' ? coupon.description : '',
    raw_title: coupon?.title != '' ? coupon.title : '',
    offer_type:
      coupon.title != '' && coupon.title != null && coupon.title.includes('cashback')
        ? 'cashback'
        : 'discount',
    affiliate_link: coupon.affiliate_link != '' ? coupon.affiliate_link : '',
    expiries_at: coupon?.end_date != '' ? parseDateToTimestamp(coupon.end_date) : 0,
    source_coupon_id: coupon?.source_coupon_id != '' ? coupon.source_coupon_id : '',
    categories: null,
  }
}
