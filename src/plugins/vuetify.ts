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
    VDialog: {
      scrim: 'black'
    },
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
          keyboard: '#f94c07',
          scrollbar: '#757575',
          'nav-color': '#072b47',
          'nav-color-accent': '#a4b1bb',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#f94c07',
          secondary: '#243859',
          success: '#23B86A',
          error: '#FF453A',
          info: '#32ADE6',
          warning: "#FF9F0A",
          background: "#2C2C2E",
          surface: "#3A3A3C",
          'surface-variant': '#3A3A3C',
          'surface-lighten': '#444444',
          'on-surface-lighten': '#EEEEE2',
          'on-background': '#EEEEE2',
          'on-surface': '#EEEEE2',
          'on-surface-variant': '#EEEEE2',
          'on-analytics-primary': '#EEEEE2',
          'on-analytics-secondary': '#101010',
          scrollbar: '#BDBDBD',
          keyboard: '#f94c07',
          'nav-color': '#072b47',
          'nav-color-accent': '#a4b1bb'
        }
      }
    }
  },
})
