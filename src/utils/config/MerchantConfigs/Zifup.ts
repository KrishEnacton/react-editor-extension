import { getDescription, jsToMysqlDate } from '../..'

export const ZifupConfig = {
  name: 'Zifup',
  url: 'https://zifup.com/',
  wrapper: 'div[class="flex flex-col justify-between h-full zf-cpn"]',
  additional_wrapper: '#zf-deal',
  postprocess(dataset: any) {
    return dataset
      .filter((item: any) => item.source_coupon_id || item.coupon_code)
      .map((item: any) => {
        item.title = item.title
        item.coupon_code =
          item.coupon_code !== '( No Coupon Code Required )' ? item.coupon_code : ''
        item.end_date = item.end_date.replace('Valid Till : ', '').replace(/(st|nd|th)/g, '')
        item.end_date = item.end_date ? new Date(item.end_date) : ''
        item.end_date = item.end_date ? jsToMysqlDate(item.end_date) : ''
        item.affiliate_link = item.affiliate_link
        item.description = getDescription(ZifupConfig.description.selector)
        // item.title = item.title.replace(/₹/g, "Rs.");
        return item
      })
  },
  source_coupon_id: {
    type: 'attribute',
    attribute: 'data-coupon-id',
    selector: '.zf-close-coupon-modal',
    // nth: 0,
  },
  title: {
    type: 'text',
    selector: '.zf-coupon-title',
  },
  description: { type: 'html', selector: 'ul.list-disc' },
  // discount: { type: "text", selector: ".coupon-logo ~ div" },
  coupon_code: {
    type: 'attribute',
    attribute: 'data-coupon-code',
    selector: '.zf-coupon-click[data-coupon-code]',
  },
  affiliate_link: {
    type: 'attribute',
    attribute: 'href',
    selector: 'a[rel="nofollow"]',
  },
  end_date: { type: 'text', selector: 'ul li:last-child' },
}
