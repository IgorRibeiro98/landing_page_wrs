import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/fluxo-paciente',

        // component: () => layouts.default(),
        // children: [
        //     {
        //         path: '',
        //         name: 'admin-home',
        //         component: () => import('@admin/views/Home.vue')
        //     }
        // ],
    }
]

export default routes;
