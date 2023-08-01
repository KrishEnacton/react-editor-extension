import { getDescription } from '../..'

export const CouponDuniaConfig = {
  name: 'CouponDunia',
  url: 'https://www.coupondunia.in/',
  wrapper: '.ofr-card-wrap.revert',
  postprocess: (dataset: any) => {
    return dataset.map((item: any) => {
      item.affiliate_link =
        new URL(window.location.href).origin +
        '/load-offer/' +
        item['source_coupon_id'] +
        '?adBlocker=false'
      item.raw_categories = item.raw_categories?.split(',')
      item.exclusive = item.exclusive ? true : false
      item.verified_at = item.verified_at?.replace('Verified ', '')
      item.end_date = item.end_date
        ? Date.parse(item.end_date)
          ? new Date(item.end_date)
          : item.end_date.replace('Expiring in ', '')
        : ''
      item.description = item.description
        ? getDescription(CouponDuniaConfig?.description?.selector)
        : ''
      return item
    })
  },
  source_coupon_id: {
    type: 'attribute',
    attribute: 'data-offer-id',
    selector: '.offer-desc',
  },
  title: { type: 'text', selector: 'div > .offer-desc' },
  description: {
    type: 'html',
    selector: '.more-desc',
  },
  discount: {
    type: 'text',
    selector: '.tile-wrapper > div > span.offer-big-font',
  },
  coupon_code: {
    type: 'attribute',
    attribute: 'data-offer-value',
    selector: '.get-offer-code',
  },
  raw_categories: {
    type: 'attribute',
    attribute: 'data-offer-value',
    selector: '.category-meta.cHide',
  },
  exclusive: { type: 'text', selector: '.cd-exclusive' },
  verified_at: { type: 'text', selector: '.coupon-verification' },
  end_date: { type: 'text', selector: '.expiry-txt' },
  offer_link: {
    type: 'attribute',
    attribute: 'data-offer-value',
    selector: '.get-codebtn-holder',
  },
}
