import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/user',
        component: () => layouts.default(),
        meta: {
            title: 'Usuário',
            slugs: {
                acl: "totem.view"
            },
            guards: [
                'auth',
                'acl',
            ]
        },
        // children: [
        //     {
        //         path: '',
        //         name: 'user.view',
        //         component: () => import('@/modules/user/views/User.vue')
        //     },
        // ]
    }
]

export default routes;
