import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: () => layouts.default(),
        meta: {
            guards: [
                'auth',
            ]
        },
        children: [
          {
              path: '',
              name: 'home',
              component: () => import('@/modules/home/views/Home.vue')
          },
      ],
    }
]

export default routes;
