import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/user',
        component: () => layouts.default(),
        meta: {
            title: 'Usuário',
            guards: [
                'auth',
            ]
        },
        children: [
            {
                path: 'my',
                name: 'user.self',
                component: () => import('@/modules/user/views/Profile.vue'),
                meta: {
                    title: 'Perfil',
                    guards: [
                        'auth',
                    ]
                },
            },
        ]
    }
]

export default routes;
