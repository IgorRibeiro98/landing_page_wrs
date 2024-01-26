/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import * as components from 'vuetify/components'

// Composables
import { createVuetify } from 'vuetify'


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  aliases: {
    KeyboardBtn: components.VBtn
  },
  defaults: {
    KeyboardBtn: { variant: 'outlined', style: 'font-size: 1.2rem; text-transform: unset !important' },
  },
  display: {
    mobileBreakpoint: 'md'
  },
  theme: {
    defaultTheme: 'saludti',
    themes: {
      saludti: {
        colors: {
          primary: '#706dff',
          secondary: '#222390',
          'secondary-1': '#222390',
          'secondary-2': '#e4f6f7',
          grey: '#abacac'
        }
      }
    }
  },

})
