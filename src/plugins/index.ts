/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from './pinia'
import router from '@/router/plugin'
import bootstrap from '@/bootstrap'

// Types
import type { App } from 'vue'
import mask from './mask'

export function registerPlugins(app: App) {
  app
  .use(router)
    .use(pinia)
    .use(vuetify)
    .use(mask)
    .use(bootstrap)
}
