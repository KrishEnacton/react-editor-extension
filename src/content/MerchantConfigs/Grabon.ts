export const GrabonConfig = {
    name: "Grabon",
    url: "https://www.grabon.in/",
    wrapper:
      'section[class="gm-c"] > div > div[class="gmc-cl"] > ul > li .gc-box',
    source_coupon_id: {
      type: "attribute",
      attribute: "data-cid",
      selector: "div",
      nth: 0,
    },
    title: {
      type: "text",
      selector: 'div[class="gcbr go-cpn-show go-cpy"] > p',
    },
    description: { type: "html", selector: ".gcb-det" },
    discount: { type: "text", selector: ".gcbr .bank span" },
    coupon_code: {
      type: "text",
      selector:
        'div[class="gcbr go-cpn-show go-cpy"] > div[class="gcbr-r"] span[class="visible-lg"]',
    },
    raw_categories: {
      type: "attribute",
      attribute: "data-tags",
      selector: "div",
    },
    tag: { type: "attribute", attribute: "data-tags", selector: "div" },
    exclusive: {
      type: "text",
      selector: 'div[class="gcbl go-cpn-show go-cpy"] > div > i',
    },
    verified_at: { type: "text", selector: ".gcbr .gcbr-r .verified" },
    end_date: {
      type: "text",
      selector: 'ul[class="veri"] > li[class="visible-lg c-clk"]',
    }
}