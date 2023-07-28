import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'React Editor coupon scrapper',
  description: 'Coupomated Editor Extension',
  version: '0.0.1',
  manifest_version: 3,
  icons: {
    '16': 'img/icon16.png',
    '19': 'img/icon19.png',
    '40': 'img/icon40.png',
    '48': 'img/icon48.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/icon48.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.tsx'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'img/icon16.png',
        'img/icon19.png',
        'img/icon40.png',
        'img/icon48.png',
        'src/styles/output.css',
      ],
      matches: ['<all_urls>'],
      use_dynamic_url: true,
    },
  ],
  permissions: ['tabs', 'storage', 'activeTab'],
})
