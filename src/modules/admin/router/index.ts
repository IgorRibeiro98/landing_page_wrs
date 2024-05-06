import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        redirect: {
          name: 'totem.view'
        },
        component: () => layouts.blank(),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@admin/views/Login.vue')
            }
        ],
    }
]

export default routes;
