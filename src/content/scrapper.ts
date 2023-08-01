import { CouponDuniaConfig } from '../utils/config/MerchantConfigs/CouponDunia'

export const scrapper = (config: any) => {
  let dataSet = Array.from(document.querySelectorAll(config.wrapper)).map((htmlElem, index) => {
    let elemData: any = {}
    for (const key in config) {
      if (config[key] && typeof config[key] == 'object') {
        elemData[key] = getElemData(htmlElem, config[key])
      }
    }
    elemData['key'] = index
    htmlElem.style.backgroundColor = '#d1ecf1'
    if (config['wrapper'] == CouponDuniaConfig.wrapper) {
      htmlElem.querySelector('div[class="offer-card-main"]').style.backgroundColor = '#d1ecf1'
    }
    return elemData
  })
  return dataSet
}

const getElemData = (htmlElem: any, elemConfig: any) => {
  const elem = elemConfig.nth == 0 ? htmlElem : htmlElem.querySelector(elemConfig.selector)
  if (!elem) {
    return null
  }
  switch (elemConfig.type) {
    case 'text':
      return elem.innerText?.length ? elem.innerText : null
    case 'attribute':
      return elem.getAttribute(elemConfig.attribute)
    case 'html':
      return elem
    case 'node':
      return elem
    default:
      throw new Error('Unspecified type for element data. It must be either text or attribute')
  }
}
