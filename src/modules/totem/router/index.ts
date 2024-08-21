import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/tipo-atendimento',
    component: () => layouts.default(),
    meta: {
      title: 'Tipo de Atendimento',
      guards: [
        'auth',
      ]
    },
    children: [
      {
        path: '',
        name: 'attendance-type.view',
        component: () => import('@/modules/totem/views/AttendanceType.vue')
      },
    ],
  },
  {
    path: '/totem',
    component: () => layouts.default(),
    meta: {
      title: 'Totem',
      slugs: {
        acl: "totem.view"
      },
      guards: [
        'auth',
        'acl',
      ]
    },
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
        path: ':id/screens',
        name: 'screen.totem.manager',
        component: () => import('@/modules/totem/views/ScreenTotemManager.vue'),
      },
      {
        path: ':id/screens/:screenId',
        name: 'screen.detail',
        component: () => import('@/modules/totem/views/TotemScreenDetail.vue')
      },
      {
        path: ':id/queues',
        name: 'queue.detail',
        component: () => import('@/modules/totem/views/QueueTotem.vue')
      },
    ]
  }
]

export default routes;
