import { setPageTitle } from '@/helpers/page';
import { useSystemStore } from '@/stores/system';
import { RouteMeta, RouteRecordRaw as RouteRecord, createRouter, createWebHistory } from 'vue-router';

export type Slugs = {
  acl?: string;
}

export interface Meta extends RouteMeta {
  title?: string;
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
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  const { setBreadcrumbs } = useSystemStore()
  setBreadcrumbs([])
  const meta = to.meta as Meta;

  if (meta.title) {
    setPageTitle(meta.title);
  }

  return true;

})

export function useRouter() {
  return router;
}

export default router
