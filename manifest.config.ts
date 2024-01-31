import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version } = packageJson

const key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3V3MA9kPx9jQmm1gm94o0rqTEoDndyqSz9vEWI4Zh2/vYin5XX7D12puUJSBFi0xOoikyS1iMVYbPFShuLZT3RKkX67fBqRpXSM/cObbjd/FODYcYilFCA9AF4GRz3vAl/U0J8DWNM6SdltEeGKU7dXiGpMTAGJSr4+lkG2RzfLDu2wxmgu1N5G3GQ5LMmH1/uHW+J3sbYV6ZYsS2VEynXWftkRxdie86P5ZoU95/HdODurl+nyyIv0/VXjc74TreCSj8qkO4NR/XTnUEEjwnQEEyN/5uvcq9BIy23a43PzNBW2ctJUsqfc6RRV/XZiMheNGd9Ngq0RaSZJyGt/09wIDAQAB'

export default defineManifest(async () => ({
  manifest_version: 3,
  key,
  version,

  default_locale: 'en',
  name: '__MSG_appName__',
  description: '__MSG_appDesc__',

  icons: {
    128: 'src/assets/img/icon.png',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'src/assets/img/icon.png',
  },
  content_scripts: [
    {
      matches: [
        'https://www.npmjs.com/*',
        'https://classic.yarnpkg.com/*',
      ],
      js: ['src/pages/content/index.ts'],
      run_at: 'document_start',
    },
  ],
  options_ui: {
    open_in_tab: true,
    page: 'src/pages/options/index.html',
  },
  background: {
    service_worker: 'src/pages/background/index.ts',
    type: 'module',
  },
  permissions: ['storage'],
}))
