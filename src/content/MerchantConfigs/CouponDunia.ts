export const CouponDuniaConfig = {
  name: 'CouponDunia',
  url: 'https://www.coupondunia.in/',
  wrapper: '.ofr-card-wrap.revert',
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
