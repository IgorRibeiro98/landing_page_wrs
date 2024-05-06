import { RouteRecordRaw as RouteRecord, createRouter, createWebHashHistory, RouteMeta } from 'vue-router'
import { useSystemStore } from '@/stores/system'
import { setPageTitle } from '@/helpers/page';
import guards from '@/router/guards';

export type AuthorizaGuard = 'acl';
export type Guard = 'auth' | AuthorizaGuard;
export type Slugs = {
  acl?: string;
}

export interface Meta extends RouteMeta {
  title?: string;
  guards?: Guard[];
  slugs?: Slugs;
}

export type RouteRecordRaw = RouteRecord & {
  meta?: Meta
};

interface ModuleMap {
  [key: string]: {
    default: RouteRecordRaw[]
  }
}

export const layouts = {
  default: () => import('@/layouts/Default.vue'),
  blank: () => import('@/layouts/Blank.vue'),
  totem: () => import('@/layouts/Totem.vue'),
  queue: () => import('@/layouts/Queue.vue'),
}


const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/components/NotFound.vue'),
    meta: {
      layout: layouts.blank(),
    }
  }
]

const routeModules: ModuleMap = import.meta.glob('@/modules/*/router/*.ts', { eager: true });

for (const path in routeModules) {
  routes.push(...routeModules[path].default)
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const { setBreadcrumbs } = useSystemStore()
  setBreadcrumbs([])
  const meta = to.meta as Meta;

  if (meta.title) {
    setPageTitle(meta.title);
  }

  if (meta.guards?.length) {
    for (const guard of meta.guards) {
      const result = guards[guard](to, from);
      if (result === true) continue;
      if (result === false) return { name: from.name || 'not-found' };
      return result;
    }
  }
  return true;

})



export default router
