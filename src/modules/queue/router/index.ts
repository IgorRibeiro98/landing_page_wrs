import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/fila',
        component: () => layouts.default(),
        children: [
            {
                path: '',
                name: 'queue.view',
                component: () => import('@/modules/queue/views/Queue.vue')
            },
        ],
    }
]

export default routes;
