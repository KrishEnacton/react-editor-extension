import { getDescription, jsToMysqlDate, replace_nth } from '../..'

export const ZoutonsConfig = {
  name: 'Zoutons',
  url: 'https://zoutons.com/',
  wrapper: '.content > section:not([class]) > ul > li .offers_snippets',
  postprocess(dataset: any) {
    return dataset
      .filter((item: any) => item.source_coupon_id)
      .map((item: any) => {
        item.end_date = item?.end_date?.replace('Valid till ', '')?.replace(/(st|nd|th)/g, '')
        item.end_date = item.end_date ? new Date(item.end_date) : ''
        item.end_date = item.end_date ? jsToMysqlDate(item.end_date) : ''
        item.raw_categories = item.raw_categories?.split(' ').filter((item: any) => item)
        item.affiliate_link = item.affiliate_link
        // item.description.querySelector(".infoDiv").remove();
        // item.description.querySelector(".show_more").remove();
        item.description = item.description ? item.description.innerHTML : '' || ''
        if (!item.description.includes('thead')) {
          item.description = replace_nth(item.description, 'tbody', 'thead', 1 + '')
          item.description = replace_nth(item.description, '<tr>', '</thead><tbody><tr>', 2 + '')
        }
        item.description = item.description
          ? getDescription(ZoutonsConfig.description.selector)
          : ''
        item.description = item.description
          .toString()
          .replaceAll('|\n|', ' ')
          .replaceAll(' | ', ' ')
          .replaceAll('---', ' ')
        return item
      })
  },
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
