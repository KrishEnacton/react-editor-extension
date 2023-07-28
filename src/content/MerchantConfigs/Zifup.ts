export const ZifupConfig = {
  name: 'Zifup',
  url: 'https://zifup.com/',
  wrapper: 'div[class="flex flex-col justify-between h-full zf-cpn"]',
  additional_wrapper: '#zf-deal',
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
