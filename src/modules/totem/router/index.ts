import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
  {
    path: '/totem',
    component: () => layouts.default(),
    children: [
      {
        path: '',
        name: 'totem.view',
        component: () => import('@/modules/totem/views/Totem.vue')
      },
      {
        path: ':id',
        name: 'totem.detail',
        component: () => import('@/modules/totem/views/TotemDetail.vue'),
      },
      {
        path: ':id/screens/:screenId',
        name: 'screen.detail',
        component: () => import('@/modules/totem/views/TotemScreenDetail.vue')
      }
    ]
  }
]

export default routes;
