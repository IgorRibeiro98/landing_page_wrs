import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/totem/:id/fluxo-paciente',
        component: () => layouts.totem(),
        meta: {
            title: 'Fluxo de paciente',
            guards: [
                'auth',
            ]
        },
        children: [
            {
                path: '',
                name: 'totem.run',
                component: () => import('@patient/views/NewFlow.vue')
            },
        ],
    },
    {
        path: '/senha',
        component: () => layouts.queue(),
        meta: {
            title: 'Senha',
            guards: [
                'auth',
            ]
        },
        children: [
            {
                path: '',
                name: 'Password',
                component: () => import('@patient/views/Password.vue')
            },
        ],
    }
]

export default routes;
