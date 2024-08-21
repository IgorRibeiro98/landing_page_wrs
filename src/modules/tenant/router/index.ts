import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/tenant',
        component: () => layouts.default(),
        meta: {
            title: 'Tenant',
            guards: [
                'auth',
            ]
        },
        children: [
            {
                path: 'create',
                name: 'tenant.create',
                component: () => import('@/modules/tenant/views/CreateTenant.vue')
            },
        ],
    },
]

export default routes;
