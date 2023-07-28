export const ZoutonsConfig = {
  name: 'Zoutons',
  url: 'https://www.zoutons.com/',
  wrapper: '.content > section:not([class]) > ul > li .offers_snippets',
  source_coupon_id: {
    type: 'attribute',
    attribute: 'data-coupon-id',
    selector: 'div',
    nth: 0,
  },
  title: { type: 'text', selector: 'h3' },
  description: {
    type: 'html',
    selector: 'span[class="dec_area"]',
  },
  coupon_code: {
    type: 'text',
    selector: 'span[class="blur not"]',
  },
  affiliate_link: {
    type: 'attribute',
    attribute: 'data-aff',
    selector: 'div[class="coupon-btn"]',
  },
  raw_categories: {
    type: 'attribute',
    attribute: 'class',
    selector: 'div',
  },
  end_date: {
    type: 'text',
    selector: 'span[class="meta b"]',
  },
}
