import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/fluxo-paciente',
        component: () => layouts.totem(),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@patient/views/Flow.vue')
            },
            {
                path: 'teste',
                name: 'Teste',
                component: () => import('@patient/views/Teste.vue')
            },
        ],
    }
]

export default routes;
