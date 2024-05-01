import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/auth',
        component: () => layouts.totem(),
        children: [
            {
                path: 'callback',
                name: 'auth-callback',
                component: () => import('@/modules/auth/views/Callback.vue')
            },
        ],
    }
]

export default routes;
