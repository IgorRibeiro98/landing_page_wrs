/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import * as components from 'vuetify/components';

// Composables
import { createVuetify } from 'vuetify';
import { pt } from 'vuetify/locale';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: 'pt',
    messages: { pt }
  },
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
      variant: 'outlined',
      validateOn: 'blur'
    },
    VSelect: {
      variant: 'outlined'
    },
    VRow: {
      style: 'margin: 0'
    },
    VSwitch: {
      color: 'primary'
    }
  },
  display: {
    mobileBreakpoint: 'sm'
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#f94c07',
          secondary: '#243859',
          grey: '#abacac',
          background: "#F3F3F3",
          keyboard: '#f94c07',
          scrollbar: '#757575',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#f94c07',
          secondary: '#243859',
          grey: '#abacac',
          background: "#F3F3F3",
          keyboard: '#f94c07'
        }
      }
    }
  },
})
