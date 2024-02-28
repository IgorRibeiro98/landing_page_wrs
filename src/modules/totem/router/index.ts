import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => layouts.default(),
        children: [
            {
                path: '',
                name: 'totem.view',
                component: () => import('@/modules/totem/views/Totem.vue')
            },
        ],
    }
]

export default routes;
