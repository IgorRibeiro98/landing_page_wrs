import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import { useSystemStore } from '@/stores/system'

export const layouts = {
  default: () => import('@/layouts/Default.vue'),
  totem: () => import('@/layouts/Totem.vue'),
  queue: () => import('@/layouts/Queue.vue'),
}

const routes: RouteRecordRaw[] = []

const routeModules: any = import.meta.glob('@/modules/*/router/*.ts', { eager: true });

for (const path in routeModules) {
  routes.push(...routeModules[path].default)
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(() => {
  const { setBreadcrumbs } = useSystemStore()

  setBreadcrumbs([])
})

export default router
