import { getDescription } from '../..'
export const GrabonConfig = {
  name: 'GrabOn',
  url: 'https://www.grabon.in/',
  postprocess(dataset: any) {
    //@ts-ignore
    const scriptText = document
      .querySelector('.rating-modal ~ script')
      //@ts-ignore
      .innerText.replace(/\\u0026amp;/g, '&')
    const cj = JSON.parse(
      scriptText.split(';')[1].trim().replace('window.couponCategoryFilters = ', ''),
    )

    return dataset.map((item: any) => {
      item.end_date = item.end_date?.trim()
      // item.description = item.description.trim();
      item.coupon_code = item.coupon_code === 'ACTIVATE OFFER' ? '' : item.coupon_code
      // item.raw_categories = couponCategories[item.source_coupon_id]
      item.end_date = item.end_date?.replace('Valid till ', '').replace(/(st|nd|th)/g, '')
      item.end_date = item.end_date
        ?.trim()
        .replace('Expiring In ', '+')
        .replace('Expiring', '')
        .replace('about ', '')
      // item.end_date = item.end_date ? new Date(item.end_date) : "";
      // item.end_date = item.end_date ? jsToMysqlDate(item.end_date) : "";
      item.end_date =
        item.end_date && item.end_date !== '' && item.end_date !== undefined
          ? Date.parse(item.end_date)
            ? item.end_date
            : ''
          : ''

      item.affiliate_link =
        new URL(window.location.href).origin + '/load/coupon/?go=' + item['source_coupon_id']

      if (item.description) {
        if (item.description.querySelectorAll('table').length > 1)
          item.description.querySelector('table').remove()

        if (
          item.description.querySelector('table') &&
          item.description.querySelector('table').querySelector('thead') == null
        )
          item.description
            .querySelector('table')
            .insertAdjacentHTML(
              'afterbegin',
              '<thead><tr><th>Label</th><th>Value</th></tr></thead>',
            )
        try {
          item.description = item.description
            ? getDescription(GrabonConfig?.description?.selector)
            : ''
        } catch (error) {
          console.log(error, 'error')
        }
      }

      return item
    })
  },
  wrapper: 'section[class="gm-c"] > div > div[class="gmc-cl"] > ul > li .gc-box',
  source_coupon_id: {
    type: 'attribute',
    attribute: 'data-cid',
    selector: 'div',
    nth: 0,
  },
  title: {
    type: 'text',
    selector: 'div[class="gcbr go-cpn-show go-cpy"] > p',
  },
  description: { type: 'html', selector: '.gcb-det' },
  discount: { type: 'text', selector: '.gcbr .bank span' },
  coupon_code: {
    type: 'text',
    selector: 'div[class="gcbr go-cpn-show go-cpy"] > div[class="gcbr-r"] span[class="visible-lg"]',
  },
  raw_categories: {
    type: 'attribute',
    attribute: 'data-tags',
    selector: 'div',
  },
  tag: { type: 'attribute', attribute: 'data-tags', selector: 'div' },
  exclusive: {
    type: 'text',
    selector: 'div[class="gcbl go-cpn-show go-cpy"] > div > i',
  },
  verified_at: { type: 'text', selector: '.gcbr .gcbr-r .verified' },
  end_date: {
    type: 'text',
    selector: 'ul[class="veri"] > li[class="visible-lg c-clk"]',
  },
}
