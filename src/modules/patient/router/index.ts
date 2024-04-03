import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/totem/:id/fluxo-paciente',
        component: () => layouts.totem(),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@patient/views/NewFlow.vue')
            },
        ],
    }
]

export default routes;
