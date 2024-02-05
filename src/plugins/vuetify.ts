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
    KeyboardBtn: components.VBtn,
    HexagonalBtn: components.VBtn,

  },
  defaults: {
    KeyboardBtn: { variant: 'outlined', style: 'font-size: 1.2rem; text-transform: unset !important' },
    HexagonalBtn: {
      color: 'primary',
      style: 'clip-path: polygon(25% -30%, 80% -30%, 91% 50%, 79% 140%, 23% 120%, 12% 50%);'
    },
    VTextField: {
      variant: 'outlined'
    },
    VSelect: {
      variant: 'outlined'
    }
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
