import { type App } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'

import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'
import '../assets/styles/font.sass'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: { fa },
  },
})

export function registerPlugins (app: App) {
  app.use(vuetify)
}
