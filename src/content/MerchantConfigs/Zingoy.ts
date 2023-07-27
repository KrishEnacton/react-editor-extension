export const ZingoyConfig = {
    wrapper: ".deals__content > .cf",
    source_coupon_id: {
      type: "attribute",
      attribute: "id",
      selector: 'div[class="cf"]',
      nth: 0,
    },
    title: {
      type: "text",
      selector: 'p[class="f20 plr20 fw500 ceerieblack mb4"]',
    },
    description: {
      type: "html",
      // selector: 'div[class="offer-description"]',
      selector: ".open",
    },
    discount: {
      type: "text",
      selector:
        'div [class="cashback-large roboto-medium offer-cashback-rate"]',
    },
    coupon_code: {
      type: "attribute",
      attribute: "id",
      // selector:
      //   'div[class="cf"]',
      //   nth: 0
    },
    affiliate_link: {
      type: "attribute",
      attribute: "href",
      selector: 'a[class="cwhite w100"]',
    },
    verified_at: {
      type: "text",
      selector: 'div[class="gcbl go-cpn-show go-cpy"] > span',
    },
    end_date: { type: "text", selector: 'p[class="f16 plr20 cdgrey mb5"]' },
}