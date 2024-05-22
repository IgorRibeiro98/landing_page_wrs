import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

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
    },
    {
        path: '/login',
        component: () => layouts.blank(),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('@/modules/auth/views/Login.vue')
            }
        ],
    }
]

export default routes;
