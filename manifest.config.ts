import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version } = packageJson

export default defineManifest(async () => ({
  manifest_version: 3,
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
