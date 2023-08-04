// https://zifup.com/goto/?coupon=24727904
// https://www.grabon.in/load/coupon/?go=132524
// https://www.zingoy.com/visitstore/amazon/103836
// https://click.linksynergy.com/deeplink?id=7/YFW2ncH04&mid=47901&u1=zoutons&murl=https%3A%2F%2Fwww.udemy.com%2Fcourses%2Fsearch%2F%3Fsrc%3Dukw%26q%3Dfree%2Bcourses"
// https://www.coupondunia.in/load-offer/2q3kAiAtns?adBlocker=false

// @ts-ignore
import DomParser from 'dom-parser'

export async function cleanLink(link: string, merchant_name: string) {
  if (!validateURL(link)) return false
  const comp_link = await level_one(link, merchant_name)
  if (!comp_link) return false
  const plan_link = level_two(comp_link)
  return plan_link
}

async function level_one(link: string, merchant_name: string) {
  const res = await fetch(link)
  const text = await res.text()
  switch (merchant_name) {
    case 'grabon':
      return link
    case 'coupondunia':
      const inputString = res.headers.get('refresh') || ''
      const cpMatch = inputString.match(/url\s*=\s*(.*?)(?=\s|;|$)/i)
      return cpMatch ? decodeURIComponent(cpMatch[1]) : null
    case 'zingoy':
      const zinMeta = text.match(/"(https:\/\/links\.zingoy\.com\?ref=[^"]*)"/)
      return zinMeta ? decodeURIComponent(zinMeta[1]) : null
    case 'zoutons':
      return link
    case 'zifup':
      const zifMatch = text.match(/window\.location\.href\s*=\s*'([^']+)'/)
      return zifMatch ? zifMatch[1] : null
    default:
      return null
  }
}

function level_two(url: string) {
  const urlParams = new URLSearchParams(url)
  const isValidUrl = (u: string) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(u)
  for (const value of urlParams.values()) {
    if (isValidUrl(value)) {
      console.log({ true: value })
      return value
    }
  }
  console.log({ false: url })

  return url
}

function validateURL(url: string) {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

// console.log({
//   zingoy: await cleanLink('https://www.zingoy.com/visitstore/amazon/103836', 'zingoy'),
// })
// console.log({ grabon: await cleanLink('https://www.grabon.in/load/coupon/?go=132524', 'grabon') })
// console.log({ zifup: await cleanLink('https://zifup.com/goto/?coupon=24727904', 'zifup') })
// console.log({
//   coupondunia: await cleanLink(
//     'https://www.coupondunia.in/load-offer/2q3kAiAtns?adBlocker=false',
//     'coupondunia',
//   ),
// })
// console.log({
//   zoutons: await cleanLink(
//     'https://click.linksynergy.com/deeplink?id=7/YFW2ncH04&mid=47901&u1=zoutons&murl=https%3A%2F%2Fwww.udemy.com%2Fcourses%2Fsearch%2F%3Fsrc%3Dukw%26q%3Dfree%2Bcourses"',
//     'zoutons',
//   ),
// })
