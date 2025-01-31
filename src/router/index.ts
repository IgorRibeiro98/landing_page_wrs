import { setPageTitle } from '@/helpers/page';
import guards from '@/router/guards';
import { useSystemStore } from '@/stores/system';
import { RouteMeta, RouteRecordRaw as RouteRecord, createRouter, createWebHashHistory } from 'vue-router';

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
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/components/NotFound.vue'),
    meta: {
      layout: layouts.blank(),
    }
  }
]

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

      if (result === false) return { name: from.name || 'not-found', query: { guardError: guard} };
      return result;
    }
  }
  return true;

})

export function useRouter() {
  return router;
}

export default router
